// Minimal MCP server (Streamable HTTP transport, stateless JSON responses).
// Tools: get_company_info, list_services, submit_enquiry.
import { readEnquiry, sendEnquiry, rateLimited } from "../lib/enquiry";
import { company, siteUrl, pharma, cleanroom, supply, team, regulators, standardsDetail, enquiry } from "../site";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const SERVER_INFO = { name: "steriqual-solutions", title: "SteriQual Solutions", version: "1.0.0" };
const SUPPORTED = ["2025-11-25", "2025-06-18", "2025-03-26"];

const CORS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, GET, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Accept, Mcp-Session-Id, Mcp-Protocol-Version",
  "Access-Control-Expose-Headers": "Mcp-Session-Id",
};

const TOOLS = [
  {
    name: "get_company_info",
    title: "Get company information",
    description:
      "Returns SteriQual Solutions' profile: what the company does, location, sectors served, leadership, regulatory audits faced, standards it works to, and how to make contact.",
    inputSchema: { type: "object", properties: {}, additionalProperties: false },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "list_services",
    title: "List services",
    description:
      "Lists SteriQual's services with descriptions. Optionally filter by area: 'pharmaceutical' (GMP and investigation services), 'cleanroom' (ISO 14644 qualification tests) or 'consumables' (lab consumables and equipment supply).",
    inputSchema: {
      type: "object",
      properties: {
        area: { type: "string", enum: ["pharmaceutical", "cleanroom", "consumables"], description: "Optional service area to filter by." },
      },
      additionalProperties: false,
    },
    annotations: { readOnlyHint: true, openWorldHint: false },
  },
  {
    name: "submit_enquiry",
    title: "Submit an enquiry",
    description:
      "Sends an enquiry to the SteriQual team on behalf of a user. The company receives it by email and the user gets a confirmation email. Only call this when the user has asked to contact SteriQual and has confirmed their details.",
    inputSchema: {
      type: "object",
      properties: {
        name: { type: "string", description: "Full name of the person enquiring." },
        email: { type: "string", format: "email", description: "Work email; a confirmation is sent here." },
        phone: { type: "string", description: "Phone number with country code, e.g. +91 98765 43210." },
        company: { type: "string", description: "Company name (optional)." },
        sector: { type: "string", enum: enquiry.sectors, description: "Industry sector." },
        service: { type: "string", enum: enquiry.services, description: "Service required." },
        message: { type: "string", minLength: 10, description: "The requirement: facility, activity needed and timelines." },
      },
      required: ["name", "email", "phone", "sector", "service", "message"],
      additionalProperties: false,
    },
    annotations: { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true },
  },
];

function companyInfo() {
  return {
    name: company.name,
    website: siteUrl,
    summary:
      "GMP technical consultation, qualification solutions and training for pharmaceutical, semiconductor and controlled cleanroom environments, plus supply of sterile and depyrogenated laboratory consumables and QC instruments.",
    location: `${company.legalName}, ${company.address}`,
    sectors: ["Pharmaceutical and biopharmaceutical", "Semiconductor and microelectronics", "Controlled cleanroom environments", "Sterile and depyrogenated consumables supply chain"],
    experience: ["16+ years industrial QC microbiology and aseptic processing", "12 years pharmaceutical instrumentation engineering"],
    regulatoryAuditsFaced: regulators.map((r) => `${r.code} (${r.name})`),
    standards: standardsDetail.map((s) => `${s.name}: ${s.text}`),
    leadership: team.map((p) => ({ name: p.name, role: p.role, qualification: p.credential, experience: p.years, expertise: p.expertise })),
    contact: {
      enquiryForm: `${siteUrl}/contact-us`,
      email: company.email,
      phones: company.phones,
      ...(company.hours ? { hours: company.hours } : {}),
    },
  };
}

function services(area?: string) {
  const all = {
    pharmaceutical: { title: pharma.title, summary: pharma.short, services: pharma.services.map(({ title, text }) => ({ title, description: text })), note: pharma.note },
    cleanroom: { title: cleanroom.title, summary: cleanroom.short, services: cleanroom.tests.map(({ title, text, tag }) => ({ title, description: text, standard: tag })) },
    consumables: { title: supply.title, summary: supply.short, services: supply.items.map(({ title, text }) => ({ title, description: text })) },
  } as const;
  if (area && area in all) return { [area]: all[area as keyof typeof all] };
  return all;
}

async function submitEnquiry(args: Record<string, unknown>) {
  const data = readEnquiry((k) => args[k]);
  data.page = `${siteUrl}/mcp`;
  if (rateLimited(`e:${data.email}`)) return { isError: true, text: "Enquiry not sent: too many enquiries from this email in the last hour." };
  const r = await sendEnquiry(data);
  if (!r.ok) return { isError: true, text: `Enquiry not sent: ${r.error}` };
  return {
    isError: false,
    text: `Enquiry sent (reference ${r.ref}). SteriQual's team will contact ${data.name} soon, and a confirmation email is on its way to ${data.email}.`,
  };
}

type RpcRequest = { jsonrpc: "2.0"; id?: string | number | null; method: string; params?: Record<string, unknown> };

async function handle(msg: RpcRequest) {
  const ok = (result: unknown) => ({ jsonrpc: "2.0", id: msg.id ?? null, result });
  const err = (code: number, message: string) => ({ jsonrpc: "2.0", id: msg.id ?? null, error: { code, message } });

  switch (msg.method) {
    case "initialize": {
      const requested = String(msg.params?.protocolVersion ?? "");
      return ok({
        protocolVersion: SUPPORTED.includes(requested) ? requested : SUPPORTED[0],
        capabilities: { tools: { listChanged: false } },
        serverInfo: SERVER_INFO,
        instructions:
          "Tools for SteriQual Solutions, a GMP consulting, cleanroom qualification and lab-supply company in Ahmedabad, India. Use get_company_info and list_services to answer questions; use submit_enquiry only after the user confirms they want to contact SteriQual.",
      });
    }
    case "ping":
      return ok({});
    case "tools/list":
      return ok({ tools: TOOLS });
    case "tools/call": {
      const name = String(msg.params?.name ?? "");
      const args = (msg.params?.arguments ?? {}) as Record<string, unknown>;
      if (name === "get_company_info") return ok({ content: [{ type: "text", text: JSON.stringify(companyInfo(), null, 2) }], structuredContent: companyInfo() });
      if (name === "list_services") {
        const data = services(typeof args.area === "string" ? args.area : undefined);
        return ok({ content: [{ type: "text", text: JSON.stringify(data, null, 2) }], structuredContent: data });
      }
      if (name === "submit_enquiry") {
        const r = await submitEnquiry(args);
        return ok({ content: [{ type: "text", text: r.text }], isError: r.isError });
      }
      return err(-32602, `Unknown tool: ${name}`);
    }
    case "resources/list":
      return ok({ resources: [] });
    case "prompts/list":
      return ok({ prompts: [] });
    default:
      return err(-32601, `Method not found: ${msg.method}`);
  }
}

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return Response.json({ jsonrpc: "2.0", id: null, error: { code: -32700, message: "Parse error" } }, { status: 400, headers: CORS });
  }
  const messages = Array.isArray(payload) ? payload : [payload];
  const results = [];
  for (const m of messages as RpcRequest[]) {
    if (!m || m.jsonrpc !== "2.0" || typeof m.method !== "string") {
      results.push({ jsonrpc: "2.0", id: (m as RpcRequest)?.id ?? null, error: { code: -32600, message: "Invalid request" } });
      continue;
    }
    // Notifications (no id) get no response body.
    if (m.id === undefined || m.id === null) continue;
    results.push(await handle(m));
  }
  if (results.length === 0) return new Response(null, { status: 202, headers: CORS });
  return Response.json(Array.isArray(payload) ? results : results[0], { headers: CORS });
}

export function GET() {
  // This server does not open server-sent event streams.
  return new Response("Method Not Allowed. POST JSON-RPC messages to this endpoint.\n", {
    status: 405,
    headers: { ...CORS, Allow: "POST, OPTIONS", "Content-Type": "text/plain; charset=utf-8" },
  });
}

export function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS });
}

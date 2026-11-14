"use client";
import { useEffect } from "react";
import { company, siteUrl, pharma, cleanroom, supply, team, regulators, enquiry } from "../site";

type Tool = {
  name: string;
  description: string;
  inputSchema: Record<string, unknown>;
  annotations?: Record<string, boolean>;
  execute: (input: Record<string, unknown>, ctx?: { signal?: AbortSignal }) => Promise<string>;
};
type ModelContext = { registerTool: (tool: Tool, opts?: { signal?: AbortSignal }) => unknown };

/** Registers WebMCP tools so in-browser AI agents can read the site and send enquiries. */
export default function WebMcp() {
  useEffect(() => {
    const ctx = ((document as unknown as { modelContext?: ModelContext }).modelContext ??
      (navigator as unknown as { modelContext?: ModelContext }).modelContext) as ModelContext | undefined;
    if (!ctx?.registerTool) return;
    const ctrl = new AbortController();

    const tools: Tool[] = [
      {
        name: "get_company_info",
        description: "Get SteriQual Solutions' profile: services, sectors, location, leadership, regulatory audits faced and contact routes.",
        inputSchema: { type: "object", properties: {} },
        annotations: { readOnlyHint: true },
        execute: async () =>
          JSON.stringify({
            name: company.name,
            location: company.address || company.city,
            website: siteUrl,
            serviceAreas: [pharma.title, cleanroom.title, supply.title],
            regulatoryAuditsFaced: regulators.map((r) => r.code),
            leadership: team.map((p) => `${p.name}, ${p.role}`),
            contact: { enquiryForm: `${siteUrl}/contact-us`, email: company.email || undefined, phone: company.phone || undefined },
          }),
      },
      {
        name: "list_services",
        description: "List SteriQual's services with descriptions. Optional area: pharmaceutical, cleanroom or consumables.",
        inputSchema: { type: "object", properties: { area: { type: "string", enum: ["pharmaceutical", "cleanroom", "consumables"] } } },
        annotations: { readOnlyHint: true },
        execute: async ({ area }) => {
          const all: Record<string, { title: string; services: { title: string; text: string }[] }> = {
            pharmaceutical: { title: pharma.title, services: pharma.services },
            cleanroom: { title: cleanroom.title, services: cleanroom.tests },
            consumables: { title: supply.title, services: supply.items },
          };
          const pick = typeof area === "string" && all[area] ? { [area]: all[area] } : all;
          return JSON.stringify(pick);
        },
      },
      {
        name: "submit_enquiry",
        description:
          "Send an enquiry to the SteriQual team. The company is emailed and the user receives a confirmation email. Use only after the user confirms their details.",
        inputSchema: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string", format: "email" },
            phone: { type: "string" },
            company: { type: "string" },
            sector: { type: "string", enum: enquiry.sectors },
            service: { type: "string", enum: enquiry.services },
            message: { type: "string", minLength: 10 },
          },
          required: ["name", "email", "phone", "sector", "service", "message"],
        },
        annotations: { readOnlyHint: false },
        execute: async (input) => {
          const res = await fetch("/mcp", {
            method: "POST",
            headers: { "Content-Type": "application/json", Accept: "application/json, text/event-stream" },
            body: JSON.stringify({ jsonrpc: "2.0", id: 1, method: "tools/call", params: { name: "submit_enquiry", arguments: input } }),
          });
          const json = await res.json();
          return json?.result?.content?.[0]?.text ?? json?.error?.message ?? "Enquiry could not be sent.";
        },
      },
    ];

    for (const t of tools) {
      try {
        ctx.registerTool(t, { signal: ctrl.signal });
      } catch {
        /* a tool with this name may already exist after a fast refresh */
      }
    }
    return () => ctrl.abort();
  }, []);

  return null;
}

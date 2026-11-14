import { readEnquiry, sendEnquiry, rateLimited } from "../../lib/enquiry";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(req: Request) {
  let get: (k: string) => unknown;
  const type = req.headers.get("content-type") ?? "";
  try {
    if (type.includes("application/json")) {
      const json = (await req.json()) as Record<string, unknown>;
      get = (k) => json[k];
    } else {
      const form = await req.formData();
      get = (k) => form.get(k);
    }
  } catch {
    return Response.json({ ok: false, error: "The enquiry could not be read." }, { status: 400 });
  }

  // Spam bots fill the hidden field: pretend success, send nothing.
  if (String(get("website") ?? "")) return Response.json({ ok: true, ref: "" });

  const data = readEnquiry(get);
  const ip = (req.headers.get("x-forwarded-for") ?? "").split(",")[0].trim();
  if (rateLimited(`e:${data.email}`, ip ? `i:${ip}` : "")) {
    return Response.json({ ok: false, error: "Too many enquiries in a short time. Please try again in an hour." }, { status: 429 });
  }

  const result = await sendEnquiry(data);
  if (!result.ok) return Response.json({ ok: false, error: result.error }, { status: result.status });
  return Response.json({ ok: true, ref: result.ref });
}

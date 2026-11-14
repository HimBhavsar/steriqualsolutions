import { markdownPages } from "../../lib/markdown";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return Object.keys(markdownPages).map((page) => ({ page }));
}

export async function GET(req: Request, { params }: { params: Promise<{ page: string }> }) {
  const { page } = await params;
  const make = markdownPages[page];
  if (!make) return new Response("Not found\n", { status: 404, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  return new Response(make(), {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      // Markdown served at a page URL (Accept: text/markdown) must never be cached for browsers.
      "Cache-Control": req.headers.get("x-md-negotiated") ? "private, no-store" : "public, max-age=3600",
      Vary: "Accept",
      Link: `<https://steriqualsolutions.com${page === "index" ? "/" : `/${page}`}>; rel="canonical"`,
    },
  });
}

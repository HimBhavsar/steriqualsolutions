import { NextResponse, type NextRequest } from "next/server";

// Page path -> Markdown file name (served at /<name>.md).
const PAGES: Record<string, string> = {
  "/": "index",
  "/about-us": "about-us",
  "/services": "services",
  "/products": "products",
  "/contact-us": "contact-us",
  "/privacy-policy": "privacy-policy",
  "/terms-of-use": "terms-of-use",
};
const MD_NAMES = new Set(Object.values(PAGES));

function linkHeader(md: string) {
  return [
    `</${md}.md>; rel="alternate"; type="text/markdown"`,
    `</llms.txt>; rel="describedby"; type="text/plain"`,
    `</.well-known/mcp/server-card.json>; rel="service-desc"; type="application/json"`,
    `</sitemap.xml>; rel="sitemap"; type="application/xml"`,
  ].join(", ");
}

function wantsMarkdown(req: NextRequest) {
  const accept = req.headers.get("accept") ?? "";
  // Browsers list text/html first; agents that ask for Markdown get Markdown.
  return accept.includes("text/markdown") && !/^\s*text\/html/i.test(accept);
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // /about-us.md, /index.md ... -> Markdown route
  const mdMatch = pathname.match(/^\/([a-z-]+)\.md$/);
  if (mdMatch && MD_NAMES.has(mdMatch[1])) {
    return NextResponse.rewrite(new URL(`/md/${mdMatch[1]}`, req.url));
  }

  const md = PAGES[pathname];
  if (!md) return NextResponse.next();

  if (wantsMarkdown(req)) {
    const headers = new Headers(req.headers);
    headers.set("x-md-negotiated", "1");
    const res = NextResponse.rewrite(new URL(`/md/${md}`, req.url), { request: { headers } });
    res.headers.set("Vary", "Accept");
    res.headers.set("Link", linkHeader(md));
    return res;
  }

  const res = NextResponse.next();
  res.headers.set("Link", linkHeader(md));
  res.headers.append("Vary", "Accept");
  return res;
}

export const config = {
  matcher: ["/", "/about-us", "/services", "/products", "/contact-us", "/privacy-policy", "/terms-of-use", "/:name.md"],
};

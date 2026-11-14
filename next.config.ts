import type { NextConfig } from "next";

// The live site runs as a Next.js server on Hostinger, which lets us send
// agent-friendly headers, serve Markdown versions of pages and host the MCP endpoint.
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  async headers() {
    return [
      {
        // Pages can be served as HTML or Markdown, so caches must key on Accept.
        source: "/:path(|about-us|services|products|contact-us|privacy-policy|terms-of-use)",
        headers: [{ key: "Vary", value: "Accept" }],
      },
      {
        source: "/.well-known/mcp/server-card.json",
        headers: [
          { key: "Content-Type", value: "application/json; charset=utf-8" },
          { key: "Access-Control-Allow-Origin", value: "*" },
        ],
      },
    ];
  },
};

export default nextConfig;

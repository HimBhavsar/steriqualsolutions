import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import WebMcp from "./components/WebMcp";
import { siteUrl, siteDescription } from "./site";

const description = siteDescription;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  applicationName: "SteriQual Solutions",
  title: {
    default: "SteriQual Solutions | Pharma Microbiology & GMP Consulting",
    template: "%s | SteriQual Solutions",
  },
  description,
  keywords: [
    "Equipment qualification and CSV",
    "Water system and area qualification",
    "Pharma and semiconductor cleanroom qualification",
    "Mock auditing and QC microbiology training",
    "Microbiology SOP and study protocol preparation",
    "Contamination Control Strategy (CCS)",
    "Risk-based environmental monitoring",
    "Microbial failure investigations and CAPA",
    "Sterile and depyrogenated consumables",
    "Laboratory instruments and equipment",
  ],
  openGraph: {
    title: "SteriQual Solutions | Pharma Microbiology & GMP Consulting",
    description,
    type: "website",
    url: siteUrl,
    siteName: "SteriQual Solutions",
    locale: "en_IN",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "SteriQual Solutions Pvt. Ltd." }],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
};

// Render pages per request so the Markdown/HTML choice (Accept header) is never mixed up by a cache.
export const dynamic = "force-dynamic";

export const viewport: Viewport = {
  themeColor: "#0D1B3D",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <WebMcp />
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "SteriQual Plant Services | Coming Soon",
  description:
    "SteriQual Plant Services — website coming soon. Pharma, semiconductor and cleanroom solutions.",
};

export const viewport: Viewport = {
  themeColor: "#153e75",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}

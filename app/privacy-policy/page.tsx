import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import LegalDoc from "../components/LegalDoc";
import JsonLd from "../components/JsonLd";
import { privacyText } from "../lib/markdown";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How SteriQual Solutions collects, uses and protects the information you share through this website.",
  alternates: { canonical: "/privacy-policy", types: { "text/markdown": "/privacy-policy.md" } },
};

export default function Privacy() {
  return (
    <>
      <JsonLd path="/privacy-policy" />
      <PageHero kicker="Legal" title="Privacy Policy" />
      <section className="section">
        <div className="wrap">
          <LegalDoc md={privacyText()} />
        </div>
      </section>
    </>
  );
}

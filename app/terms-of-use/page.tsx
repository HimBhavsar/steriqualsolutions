import type { Metadata } from "next";
import PageHero from "../components/PageHero";
import LegalDoc from "../components/LegalDoc";
import JsonLd from "../components/JsonLd";
import { termsText } from "../lib/markdown";

export const metadata: Metadata = {
  title: "Terms of Use",
  description: "Terms for using the SteriQual Solutions website.",
  alternates: { canonical: "/terms-of-use", types: { "text/markdown": "/terms-of-use.md" } },
};

export default function Terms() {
  return (
    <>
      <JsonLd path="/terms-of-use" />
      <PageHero kicker="Legal" title="Terms of Use" />
      <section className="section">
        <div className="wrap">
          <LegalDoc md={termsText()} />
        </div>
      </section>
    </>
  );
}

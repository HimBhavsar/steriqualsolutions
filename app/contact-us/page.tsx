import type { Metadata } from "next";
import { Suspense } from "react";
import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import HeroCards, { type HeroCard } from "../components/HeroCards";
import ContactForm from "./ContactForm";
import { company, heroPhotos } from "../site";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Share your facility requirement with SteriQual Solutions for GMP consulting, cleanroom and equipment qualification, training, consumables or equipment supply.",
  alternates: { canonical: "/contact-us", types: { "text/markdown": "/contact-us.md" } },
};

const I = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const icon = (d: React.ReactNode) => (
  <span className="tile">
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {d}
    </svg>
  </span>
);

export default function Contact() {
  const cards: HeroCard[] = [
    {
      href: "#enquiry",
      visual: icon(
        <>
          <path d="M4 5h16v11H8l-4 4z" {...I} />
          <path d="M8 9h8M8 12h5" {...I} />
        </>,
      ),
      top: "Enquiry form",
      title: "Two short steps",
    },
    {
      visual: icon(
        <>
          <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" {...I} />
          <circle cx="12" cy="9.5" r="2.5" {...I} />
        </>,
      ),
      top: "Office",
      title: company.address || company.city,
    },
    {
      visual: icon(<path d="M4 20h16M6 20V9l6-4 6 4v11M10 20v-5h4v5" {...I} />),
      top: "We work with",
      title: "Pharma, semiconductor, consumables & equipment",
    },
  ];
  if (company.email)
    cards.push({
      href: `mailto:${company.email}`,
      visual: icon(
        <>
          <rect x="3" y="5" width="18" height="14" rx="2" {...I} />
          <path d="M4 7l8 6 8-6" {...I} />
        </>,
      ),
      top: "Email",
      title: company.email,
    });
  if (company.phone)
    cards.push({
      href: `tel:${company.phone.replace(/\s/g, "")}`,
      visual: icon(<path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" {...I} />),
      top: "Phone",
      title: company.phone,
    });

  return (
    <>
      <JsonLd path="/contact-us" />
      <PageHero kicker="Contact SteriQual" title="Let’s start with a conversation." image={heroPhotos.contact}>
        <p>
          Share what you’re working on. Our technical team will be in touch to design a tailored compliance or
          supply solution for your facility.
        </p>
      </PageHero>
      <HeroCards label="Ways to reach us" items={cards.slice(0, 4)} />
      <section className="section contact" id="enquiry">
        <div className="wrap">
          <div className="contact-head">
            <h2 className="display">Tell us about your requirements.</h2>
            <p className="lead">
              Use the form to share a few details. We’ll follow up with you to learn more.
              {company.hours && <> Working hours: {company.hours}.</>}
            </p>
          </div>
          <Suspense fallback={<div className="contact-form" />}>
            <ContactForm />
          </Suspense>
        </div>
      </section>
    </>
  );
}

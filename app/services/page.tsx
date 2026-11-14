import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import HeroCards from "../components/HeroCards";
import CleanroomExplorer from "../components/CleanroomExplorer";
import ServiceAccordion, { ServiceIcon } from "../components/ServiceAccordion";
import { PetriDish, SamplingPlan, Supplies } from "../components/Illustrations";
import { pharma, cleanroom, supply, heroPhotos } from "../site";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Contamination control strategy, microbial investigations, APS troubleshooting, water system and equipment qualification with CSV, mock audits, training, and ISO 14644 cleanroom testing.",
  alternates: { canonical: "/services", types: { "text/markdown": "/services.md" } },
};

const areas = [
  { id: pharma.id, label: "Pharmaceutical GMP & investigations", count: `${pharma.services.length} services`, Illo: PetriDish },
  { id: cleanroom.id, label: "Cleanroom qualification & testing", count: `${cleanroom.tests.length} ISO 14644 tests`, Illo: SamplingPlan },
  { id: supply.id, label: "Laboratory consumables & equipment", count: "Supply and custom design", Illo: Supplies },
];

const flow = [
  { title: "Excursion, deviation or OOS", text: "An EM excursion, operational failure, media fill failure or out-of-specification result." },
  { title: "Root-cause identification", text: "A deep-dive investigation into what actually went wrong, backed by microbiology." },
  { title: "CAPA implementation", text: "Corrective and preventive actions, with robust remediation plans that hold up in an audit." },
];

export default function Services() {
  return (
    <>
      <JsonLd path="/services" />
      <PageHero kicker="What we do" title="Tailored compliance for critical environments." image={heroPhotos.services}>
        <p>
          Providing specialized cleanroom qualification, equipment validation, and expert microbiological
          consultation designed to meet strict international standards.
        </p>
      </PageHero>

      <HeroCards
        label="Service areas"
        items={areas.map(({ id, label, count, Illo }) => ({ href: `#${id}`, visual: <Illo className="area-illo" />, top: count, title: label }))}
      />

      <section className="section svc-lead">
        <div className="wrap svc-lead-grid">
          <h2 className="display">Specialized services for high&#8209;precision sectors.</h2>
          <p className="lead">
            We deliver tailored compliance and contamination control strategies for your workflows. From equipment
            qualification including CSV to sterile and depyrogenated laboratory consumables, we ensure your
            operations achieve absolute regulatory alignment.
          </p>
        </div>
      </section>

      <section className="section pharma" id={pharma.id} aria-labelledby="pharma-title">
        <div className="wrap pharma-grid">
          <div className="pharma-side">
            <p className="svc-sector">Pharmaceutical</p>
            <h2 id="pharma-title" className="display">{pharma.title}</h2>
            <p>{pharma.short}</p>
            <div className="std-note">
              <span>Aligned with</span>
              <ul>
                {["ISO", "USFDA", "EMA", "PIC/S", "Drugs and Cosmetics Act"].map((x) => (
                  <li key={x}>{x}</li>
                ))}
              </ul>
            </div>
            <Link className="btn btn-ribbon" href="/contact-us?service=GMP%20technical%20consulting">
              Discuss a GMP requirement
            </Link>
          </div>
          <ServiceAccordion items={pharma.services} />
        </div>

        <div className="wrap investigation">
          <div className="investigation-head">
            <span className="inv-icon">
              <ServiceIcon name="investigation" />
            </span>
            <div>
              <h3>How a microbial failure investigation runs</h3>
              <p>From the first excursion to a CAPA your inspector can follow.</p>
            </div>
          </div>
          <ol className="flow">
            {flow.map((f) => (
              <li key={f.title}>
                <b>{f.title}</b>
                <span>{f.text}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section clean" id={cleanroom.id} aria-labelledby="clean-title">
        <div className="wrap">
          <header className="clean-head">
            <div>
              <p className="svc-sector">Cleanroom for Semiconductor and PharmaSuticals</p>
              <h2 id="clean-title" className="display">{cleanroom.title}</h2>
            </div>
            <p>{cleanroom.short}</p>
          </header>
          <p className="explorer-hint">Select a test to see which part of the cleanroom it checks.</p>
          <CleanroomExplorer />
        </div>
      </section>

      <section className="section supply-band" id={supply.id} aria-labelledby="supply-title">
        <div className="wrap supply-band-grid">
          <div className="supply-copy">
            <p className="svc-sector">Supply</p>
            <h2 id="supply-title" className="display">{supply.title}</h2>
            <p>{supply.short}</p>
            <Link className="btn btn-ribbon" href="/products">
              View consumables &amp; equipment
            </Link>
          </div>
          <ul className="supply-cards">
            {supply.items.map((s) => (
              <li key={s.title}>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand title="Let’s discuss your project and design a tailored solution that fits your system perfectly." />
    </>
  );
}

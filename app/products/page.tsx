import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import { Supplies, Instrument } from "../components/Illustrations";
import { Check } from "../components/Graphics";
import Sheet from "../components/Sheet";
import { supply, heroPhotos } from "../site";

export const metadata: Metadata = {
  title: "Laboratory Consumables and Equipment",
  description:
    "Sterile, non-sterile and depyrogenated microbiological consumables, plus supply and custom design of pharmaceutical QC laboratory instruments.",
  alternates: { canonical: "/products", types: { "text/markdown": "/products.md" } },
};

const consumables = supply.items[0];
const equipment = supply.items[1];

const grades = [
  { name: "Sterile", text: "Free from viable microorganisms, for aseptic and microbiological work.", mark: "S" },
  { name: "Non-sterile", text: "For routine laboratory work where sterility is not required.", mark: "N" },
  { name: "Depyrogenated", text: "Treated to remove pyrogens such as bacterial endotoxins, for endotoxin-sensitive testing.", mark: "D" },
];

const capabilities = [
  { name: "Sourcing", text: "We find the right specialized instrument for your QC application." },
  { name: "Supply", text: "We supply the instrument to your laboratory." },
  { name: "Custom design", text: "We engineer instruments tailored completely to your unique requirements." },
];

export default function Products() {
  return (
    <>
      <JsonLd path="/products" />
      <PageHero kicker="Products" title={supply.title} image={heroPhotos.products}>
        <p>{supply.short}</p>
      </PageHero>

      <section className="section prod-intro">
        <div className="wrap prod-intro-grid">
          <h2 className="display">Two ways we equip your QC laboratory</h2>
          <nav className="prod-jump" aria-label="Product lines">
            <a href="#consumables">
              <Supplies className="prod-jump-illo" />
              <span>
                <b>{consumables.title}</b>
                Sterile, non-sterile and depyrogenated
              </span>
            </a>
            <a href="#equipment">
              <Instrument className="prod-jump-illo" />
              <span>
                <b>{equipment.title}</b>
                Sourcing, supply and custom engineering
              </span>
            </a>
          </nav>
        </div>
      </section>

      <section className="section prod" id="consumables" aria-labelledby="cons-title">
        <div className="wrap prod-grid">
          <div className="prod-visual">
            <Supplies />
          </div>
          <div className="prod-copy">
            <h2 id="cons-title" className="display">{consumables.title}</h2>
            <p className="lead">{consumables.text}</p>
            <Sheet
              title="Microbiological consumables"
              rows={[
                ["Grades", "Sterile, non-sterile, depyrogenated"],
                ["For", "Pharmaceutical QC microbiology laboratories"],
                ["Compliance", "Meets the applicable regulatory requirements"],
                ["Supply", "Reliable, repeat distribution"],
              ]}
              cta="Request consumables"
              href="/contact-us?service=Laboratory%20consumables"
            />
          </div>
        </div>
        <div className="wrap">
          <ul className="grades" aria-label="Consumable grades">
            {grades.map((g) => (
              <li key={g.name}>
                <span className="grade-mark" aria-hidden="true">
                  {g.mark}
                </span>
                <div>
                  <h3>{g.name}</h3>
                  <p>{g.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section prod prod-dark" id="equipment" aria-labelledby="equip-title">
        <div className="wrap prod-grid prod-grid-flip">
          <div className="prod-visual">
            <Instrument />
          </div>
          <div className="prod-copy">
            <h2 id="equip-title" className="display">{equipment.title}</h2>
            <p className="lead">{equipment.text}</p>
            <Sheet
              title="QC laboratory instruments"
              rows={[
                ["Scope", "Sourcing, supply and custom engineering"],
                ["For", "Pharmaceutical QC laboratories"],
                ["Design", "Tailored to your exact requirements"],
              ]}
              cta="Discuss equipment needs"
              href="/contact-us?service=Equipment%20supply"
            />
          </div>
        </div>
        <div className="wrap">
          <ul className="caps" aria-label="Equipment capabilities">
            {capabilities.map((c) => (
              <li key={c.name}>
                <h3>{c.name}</h3>
                <p>{c.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section quote">
        <div className="wrap quote-card">
          <div>
            <h2 className="display">Getting an accurate quote</h2>
            <p>A few details in your enquiry help us respond faster.</p>
            <Link className="btn btn-light" href="/contact-us?service=Laboratory%20consumables">
              Request a quote
            </Link>
          </div>
          <ul className="quote-list">
            {[
              "The items or instruments you need, with any part numbers you already use",
              "Approximate quantities and how often you reorder",
              "Sterility or depyrogenation requirements",
              "The specifications or regulatory requirements they must meet",
              "Your delivery location and timeline",
            ].map((x) => (
              <li key={x}>
                <Check /> {x}
              </li>
            ))}
          </ul>
        </div>
      </section>

    </>
  );
}

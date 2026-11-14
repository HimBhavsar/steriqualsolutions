"use client";
import Link from "next/link";
import { useState } from "react";
import { PetriDish, SamplingPlan, Supplies } from "./Illustrations";
import { pharma, cleanroom, supply } from "../site";

const lines = [
  {
    id: pharma.id,
    tab: "Pharmaceutical",
    title: pharma.title,
    short: pharma.short,
    count: `${pharma.services.length} services`,
    href: `/services#${pharma.id}`,
    link: "Explore pharmaceutical services",
    picks: pharma.services.slice(0, 6).map((s) => s.title),
    Illo: PetriDish,
  },
  {
    id: cleanroom.id,
    tab: "Cleanroom",
    title: cleanroom.title,
    short: cleanroom.short,
    count: `${cleanroom.tests.length} ISO 14644 tests`,
    href: `/services#${cleanroom.id}`,
    link: "Explore cleanroom tests",
    picks: cleanroom.tests.slice(0, 6).map((s) => s.title),
    Illo: SamplingPlan,
  },
  {
    id: supply.id,
    tab: "Consumables & equipment",
    title: supply.title,
    short: supply.short,
    count: "Supply and custom design",
    href: "/products",
    link: "Explore consumables & equipment",
    picks: ["Sterile consumables", "Non-sterile consumables", "Depyrogenated consumables", "QC laboratory instruments", "Custom-engineered equipment"],
    Illo: Supplies,
  },
];

export default function LineExplorer() {
  const [active, setActive] = useState(0);
  const cur = lines[active];
  const Illo = cur.Illo;
  return (
    <div className="lx">
      <div className="lx-tabs" role="tablist" aria-label="Service areas">
        {lines.map((l, i) => (
          <button
            key={l.id}
            role="tab"
            id={`lx-tab-${i}`}
            aria-selected={i === active}
            aria-controls="lx-panel"
            className={i === active ? "is-active" : ""}
            onClick={() => setActive(i)}
            onMouseEnter={() => setActive(i)}
          >
            <span className="lx-name">{l.title}</span>
          </button>
        ))}
      </div>
      <div className="lx-panel" id="lx-panel" role="tabpanel" aria-labelledby={`lx-tab-${active}`} key={cur.id}>
        <div className="lx-visual">
          <Illo />
        </div>
        <div className="lx-body">
          <p className="lx-short">{cur.short}</p>
          <ul className="lx-picks">
            {cur.picks.map((p) => (
              <li key={p}>{p}</li>
            ))}
          </ul>
          <Link className="btn btn-ribbon" href={cur.href}>
            {cur.link}
          </Link>
        </div>
      </div>
    </div>
  );
}

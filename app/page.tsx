import type { Metadata } from "next";
import Link from "next/link";
import JsonLd from "./components/JsonLd";
import Airflow from "./components/Airflow";
import { Ribbon } from "./components/Illustrations";
import LineExplorer from "./components/LineExplorer";
import Sheet from "./components/Sheet";
import CtaBand from "./components/CtaBand";
import { Flag, Avatar, Check } from "./components/Graphics";
import { regulators, standardsDetail, team } from "./site";

export const metadata: Metadata = {
  alternates: { canonical: "/", types: { "text/markdown": "/index.md" } },
};

const approach = [
  {
    title: "Microbiology-driven",
    text: "Bringing 16+ years of core industrial QC expertise to identify, isolate and mitigate cleanroom contamination vectors effectively.",
  },
  {
    title: "Audit-ready blueprints",
    text: "Building rigorous, technically sound validation protocols and computer system validation frameworks shaped around global regulatory expectations.",
  },
  {
    title: "Data-reliability focused",
    text: "Delivering meticulous, traceably documented procedures and specialized training structures that robustly eliminate laboratory subjectivity and human error.",
  },
];

export default function Home() {
  return (
    <>
      <JsonLd path="/" />
      <section className="hero">
        <div className="hero-visual">
          <Airflow />
          <span className="hero-note note-filter">HEPA filtration: particles are captured</span>
          <span className="hero-note note-flow">Unidirectional airflow</span>
          <span className="hero-note note-zone">Critical zone</span>
        </div>
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <p className="kicker kicker-light">
              <Ribbon className="kicker-mark" />
              Your partner in compliance
            </p>
            <h1>GMP technical consultation, qualification solutions and training</h1>
            <p className="lede">
              Providing cleanroom qualification for pharmaceutical and semiconductor industries, equipment
              qualification and CSV, GMP consultation, mock audits, and robust contamination control strategies.
            </p>
            <div className="actions">
              <Link className="btn btn-ribbon" href="/contact-us">
                Get expert advice
              </Link>
              <Link className="btn btn-ghost-light" href="/services">
                Explore services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="trust" aria-labelledby="trust-title">
        <div className="wrap">
          <div className="trust-head">
            <h2 id="trust-title">Regulatory audits faced and defended</h2>
            <p>Hands-on experience facing inspections from global regulators, built into every protocol we write.</p>
          </div>
          <ul className="regulators">
            {regulators.map((r) => (
              <li key={r.code}>
                <Flag code={r.flag} />
                <div>
                  <b>{r.code}</b>
                  <span>{r.name}</span>
                </div>
                <em>
                  <Check /> Audit faced <i>{r.region}</i>
                </em>
              </li>
            ))}
          </ul>
          <div className="standards">
            <h3>Work aligned with</h3>
            <ul>
              {standardsDetail.map((s) => (
                <li key={s.name}>
                  <span className="std-area">{s.area}</span>
                  <b>{s.name}</b>
                  <p>{s.text}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section intro">
        <div className="wrap intro-grid">
          <h2 className="display">Where microbiology expertise meets rigorous GMP</h2>
          <div className="intro-body">
            <p className="lead">
              Based in Ahmedabad, SteriQual Solutions Pvt. Ltd. provides specialized technical consulting for
              pharmaceutical, semiconductor and controlled cleanroom environments.
            </p>
            <p>
              We leverage more than 16 years of industrial QC microbiology experience to design robust facility
              qualifications and audit-ready contamination control workflows, bridging the gap between complex
              regulatory mandates and practical everyday laboratory operations.
            </p>
            <p>
              We partner closely with your team to eliminate compliance gaps, offering tailored consulting, robust
              contamination control strategies, and training designed to withstand strict global regulatory
              inspections and protect patient safety.
            </p>
            <Sheet
              className="intro-sheet"
              label="At a glance"
              title="Expertise behind every project"
              rows={[
                ["QC microbiology", "16+ years, industrial and aseptic processing"],
                ["Instrumentation", "12 years, pharmaceutical equipment engineering"],
                [
                  "Audits faced",
                  <span className="sheet-flags" key="a">
                    {regulators.map((r) => (
                      <span key={r.code}>
                        <Flag code={r.flag} /> {r.code}
                      </span>
                    ))}
                  </span>,
                ],
              ]}
            />
            <Link className="link" href="/about-us">
              About SteriQual
            </Link>
          </div>
        </div>
      </section>

      <section className="section lines" aria-labelledby="lines-title">
        <div className="wrap">
          <div className="lines-head">
            <h2 id="lines-title" className="display">Specialized services for high‑precision sectors</h2>
            <p>
              From equipment qualification including CSV to sterile and depyrogenated laboratory consumables, we
              deliver tailored compliance and contamination control strategies for your workflows.
            </p>
          </div>
          <LineExplorer />
        </div>
      </section>

      <section className="section approach">
        <div className="wrap approach-grid">
          <div className="approach-head">
            <h2 className="display">Practical compliance strategies built for your critical facility needs</h2>
            <p>
              We provide highly tailored solutions for any compliance activity, aligning our validation and
              contamination control strategies with your unique facility workflows and regulatory requirements.
            </p>
            <Link className="btn btn-ribbon" href="/contact-us">
              Collaborate with us
            </Link>
          </div>
          <ul className="approach-list">
            {approach.map((a, i) => (
              <li key={a.title}>
                <span className={`glyph glyph-${i}`} aria-hidden="true" />
                <div>
                  <h3>{a.title}</h3>
                  <span className="bar" aria-hidden="true" />
                  <p>{a.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section people" aria-labelledby="people-title">
        <div className="wrap">
          <div className="people-head">
            <h2 id="people-title" className="display">The specialists you work with</h2>
            <Link className="link" href="/about-us#leadership">
              Full profiles
            </Link>
          </div>
          <div className="people-grid">
            {team.map((p) => (
              <article className="person-mini" key={p.name}>
                <div className="pm-head">
                  <Avatar initials={p.initials} />
                  <div>
                    <h3>{p.name}</h3>
                    <p className="role">{p.role}</p>
                  </div>
                </div>
                <div className="pm-body">
                  <p className="exp">
                    <b>{p.years}</b> {p.field}
                  </p>
                  <ul className="tags">
                    {p.expertise.map((e) => (
                      <li key={e}>{e}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="Ready to build an audit-ready system?"
        text="Let’s talk about your project and find the perfect solution for your facility."
      />
    </>
  );
}

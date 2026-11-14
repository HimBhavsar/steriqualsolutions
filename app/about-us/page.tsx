import type { Metadata } from "next";
import JsonLd from "../components/JsonLd";
import PageHero from "../components/PageHero";
import CtaBand from "../components/CtaBand";
import { Avatar, Flag, ValueIcon, Check } from "../components/Graphics";
import HeroCards from "../components/HeroCards";
import Sheet from "../components/Sheet";
import ValuesOrbit from "../components/ValuesOrbit";
import { ServiceIcon } from "../components/ServiceAccordion";
import { team, regulators, heroPhotos } from "../site";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "SteriQual Solutions is an Ahmedabad-based GMP and contamination control consultancy led by specialists in QC microbiology and pharmaceutical instrumentation.",
  alternates: { canonical: "/about-us", types: { "text/markdown": "/about-us.md" } },
};

const focus = [
  "Pharmaceutical and biopharmaceutical sectors",
  "Semiconductor and microelectronics manufacturing",
  "Controlled cleanroom environments",
  "Sterile and depyrogenated consumables supply chain",
];

const values = [
  {
    icon: "science",
    title: "True science",
    text: "We base every solution, protocol and failure check on clear facts and proven microbiology principles.",
  },
  {
    icon: "global",
    title: "Global standards",
    text: "We keep your facility ready for strict international audits like USFDA, EMA and current GMP guidelines.",
  },
  {
    icon: "practical",
    title: "Practical support",
    text: "We design easy-to-use workflows, protocols and reports that fit smoothly into your daily plant routines.",
  },
  {
    icon: "tailored",
    title: "Tailored solutions",
    text: "Beyond the predefined checklist, we provide a customized solution that fits your system.",
  },
];

export default function About() {
  return (
    <>
      <JsonLd path="/about-us" />
      <PageHero kicker="About SteriQual" title="Specialized expertise in critical environment compliance." image={heroPhotos.about}>
        <p>
          Bridging complex global regulatory mandates with practical, science-backed facility validation and
          contamination control strategies.
        </p>
      </PageHero>

      <HeroCards
        label="SteriQual at a glance"
        items={[
          { visual: <span className="tile"><ValueIcon name="science" /></span>, top: "QC microbiology", title: "16+ years hands-on" },
          { visual: <span className="tile"><ServiceIcon name="equipment" /></span>, top: "Instrumentation engineering", title: "12 years in pharma equipment" },
          {
            visual: (
              <span className="tile tile-flags">
                {regulators.map((r) => (
                  <Flag key={r.code} code={r.flag} />
                ))}
              </span>
            ),
            top: "Audits faced",
            title: "USFDA, EMA, INVIMA",
          },
          {
            visual: (
              <span className="tile">
                <svg viewBox="0 0 32 32" aria-hidden="true">
                  <path d="M16 28s-9-8-9-15a9 9 0 0 1 18 0c0 7-9 15-9 15z" fill="none" stroke="currentColor" strokeWidth="1.8" />
                  <circle cx="16" cy="13" r="3.2" fill="none" stroke="currentColor" strokeWidth="1.8" />
                </svg>
              </span>
            ),
            top: "Based in",
            title: "Ahmedabad, Gujarat",
          },
        ]}
      />

      <section className="section who">
        <div className="wrap who-grid">
          <div className="who-main">
            <h2 className="display">Grounded in science. Driven by regulatory excellence.</h2>
            <p className="lead">
              Founded in Ahmedabad, SteriQual Solutions Pvt. Ltd. was established to address the critical need for
              robust, technically sound compliance and contamination control strategies in high-precision industries.
              We bridge the gap between complex regulatory mandates and everyday laboratory operations.
            </p>
            <p>
              With a foundation built on advanced postgraduate microbiology credentials and over 16 years of hands-on
              quality control and aseptic processing experience, we deliver precision-driven qualification,
              validation and contamination control strategies designed to ensure absolute regulatory alignment.
            </p>
            <p>
              Our technical framework is backed by extensive, firsthand experience managing complex facility and
              system audits from leading global regulatory bodies, including the USFDA, EMA and INVIMA.
            </p>
            <p>
              Beyond standard compliance support, we provide deep-dive technical expertise in microbial excursion
              investigations, operational deviations, aseptic processing simulation (APS) failures and
              out-of-specification (OOS) results, ensuring robust root-cause identification and CAPA implementation.
            </p>
          </div>
          <div className="who-side">
            <Sheet
              label="Company profile"
              title="SteriQual Solutions Pvt. Ltd."
              rows={[
                ["Based in", "Ahmedabad, Gujarat, India"],
                [
                  "Areas of focus",
                  <ul className="sheet-list" key="f">
                    {focus.map((f) => (
                      <li key={f}>{f}</li>
                    ))}
                  </ul>,
                ],
                ["Expertise", "QC microbiology, aseptic processing, equipment and instrumentation compliance"],
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
              cta="Talk to our team"
              href="/contact-us"
            />
          </div>
        </div>
      </section>

      <section className="section purpose" aria-label="Vision and mission">
        <div className="wrap purpose-grid">
          <article className="purpose-card">
            <div className="purpose-icon">
              <img src="/brand/mark-q-white.svg" alt="" width="40" height="38" />
            </div>
            <h2>Our vision</h2>
            <p className="purpose-statement">
              To be the most trusted quality partner for cleanrooms worldwide, known for simple compliance and
              accurate data.
            </p>
            <ul className="purpose-pillars" aria-label="What the vision stands for">
              <li>Trusted quality partner</li>
              <li>Simple compliance</li>
              <li>Accurate data</li>
            </ul>
          </article>
          <article className="purpose-card">
            <div className="purpose-icon">
              <svg viewBox="0 0 40 40" aria-hidden="true">
                <path d="M20 4l13 5v10c0 8.4-5.6 14.6-13 17-7.4-2.4-13-8.6-13-17V9z" fill="none" stroke="#fff" strokeWidth="2.2" strokeLinejoin="round" />
                <path d="M13.5 20.5l4.5 4.5 8.5-9.5" fill="none" stroke="#02A6E0" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h2>Our mission</h2>
            <p className="purpose-statement">
              To protect product quality and patient safety by providing premium sterile supplies, clear facility
              qualifications, and fast expert solutions for contamination issues.
            </p>
            <ul className="purpose-pillars" aria-label="How we deliver the mission">
              <li>Premium sterile supplies</li>
              <li>Clear facility qualifications</li>
              <li>Fast contamination solutions</li>
            </ul>
          </article>
        </div>
      </section>

      <section className="section values" aria-labelledby="values-title">
        <div className="wrap">
          <div className="values-head">
            <h2 id="values-title" className="display">Our core values</h2>
            <p>The principles behind every protocol, investigation and report we deliver.</p>
          </div>
          <ValuesOrbit values={values} />
        </div>
      </section>

      <section className="section leadership" id="leadership" aria-labelledby="lead-title">
        <div className="wrap">
          <h2 id="lead-title" className="display">Leadership</h2>
          <div className="leaders">
            {team.map((p) => (
              <article className="leader" key={p.name}>
                <div className="leader-top">
                  <Avatar initials={p.initials} size="lg" />
                  <div>
                    <h3>{p.name}</h3>
                    <p className="role">{p.role}</p>
                  </div>
                </div>
                <dl className="leader-facts">
                  <div>
                    <dt>Experience</dt>
                    <dd>{p.years}</dd>
                  </div>
                  <div>
                    <dt>Qualification</dt>
                    <dd>{p.credential}</dd>
                  </div>
                </dl>
                <p className="leader-bio">{p.bio}</p>
                <ul className="tags" aria-label={`${p.name}: areas of expertise`}>
                  {p.expertise.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section highlights">
        <div className="wrap highlights-grid">
          <div>
            <h2 className="display">Experience that stands up in an inspection</h2>
            <p className="lead">
              SteriQual Solutions brings over 16 years of hands-on expertise in pharmaceutical microbiology to deliver
              precision-driven, tailored compliance solutions.
            </p>
            <p>
              Our team specializes in developing risk-based environmental monitoring programs and robust
              contamination control strategies (CCS). By combining this scientific insight with 12 years of core
              instrumentation engineering experience under our leadership, we bridge the gap between complex
              equipment qualification, computer systems validation (CSV) and plant operations.
            </p>
            <p>
              Our technical frameworks are built to withstand strict international standards, backed by a proven
              track record of directly facing and successfully defending facilities during rigorous global audits.
            </p>
          </div>
          <aside className="dossier" aria-label="Track record summary">
            <div className="dossier-stamp" aria-hidden="true">
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="stamp-circle" d="M60 60 m-44 0 a44 44 0 1 1 88 0 a44 44 0 1 1 -88 0" />
                </defs>
                <circle cx="60" cy="60" r="56" fill="none" stroke="currentColor" strokeWidth="2" />
                <circle cx="60" cy="60" r="36" fill="none" stroke="currentColor" strokeWidth="1.2" />
                <text fontSize="10.5" fontWeight="700" letterSpacing="2.6" fill="currentColor">
                  <textPath href="#stamp-circle">AUDIT READY • INSPECTION PROVEN •</textPath>
                </text>
                <path d="M47 61l9 9 17-19" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <h3>Track record</h3>
            <dl>
              <div>
                <dt>Pharmaceutical microbiology</dt>
                <dd>16+ years</dd>
              </div>
              <div>
                <dt>Instrumentation engineering</dt>
                <dd>12 years</dd>
              </div>
              <div>
                <dt>Regulatory audits faced</dt>
                <dd className="dossier-regs">
                  {regulators.map((r) => (
                    <span key={r.code}>
                      <Flag code={r.flag} /> {r.code}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
            <ul className="dossier-list">
              {[
                "Risk-based environmental monitoring programs",
                "Contamination control strategy (CCS)",
                "Equipment qualification and CSV",
              ].map((x) => (
                <li key={x}>
                  <Check /> {x}
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>

      <CtaBand
        title="Ready to build an audit-ready system?"
        text="Let’s talk about your project and find the perfect solution for your facility."
      />
    </>
  );
}

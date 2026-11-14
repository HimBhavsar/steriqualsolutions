"use client";
import { useState } from "react";
import type { Service } from "../site";

const I = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function ServiceIcon({ name }: { name?: string }) {
  const p: Record<string, React.ReactNode> = {
    ccs: (
      <>
        <path d="M16 4l10 4v7c0 6.5-4.4 11.3-10 13-5.6-1.7-10-6.5-10-13V8z" {...I} />
        <path d="M11 14h10M11 18h7" {...I} />
      </>
    ),
    investigation: (
      <>
        <circle cx="14" cy="14" r="8" {...I} />
        <path d="M20 20l7 7" {...I} />
        <circle cx="12" cy="13" r="1.5" fill="currentColor" />
        <circle cx="16.5" cy="15.5" r="1.2" fill="currentColor" />
      </>
    ),
    aps: (
      <>
        <path d="M12 4h8M13 4v4l-4 5v13a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V13l-4-5V4" {...I} />
        <path d="M9 18h14" {...I} />
      </>
    ),
    water: (
      <>
        <path d="M16 4c5 6.5 8 10.6 8 14.5a8 8 0 0 1-16 0C8 14.6 11 10.5 16 4z" {...I} />
        <path d="M12.5 19.5a3.5 3.5 0 0 0 3.5 3.5" {...I} />
      </>
    ),
    equipment: (
      <>
        <rect x="4" y="6" width="24" height="16" rx="2" {...I} />
        <path d="M12 27h8M16 22v5M11 14l3.5 3.5L21 11" {...I} />
      </>
    ),
    audit: (
      <>
        <rect x="7" y="6" width="18" height="22" rx="2" {...I} />
        <path d="M12 6V4h8v2M11.5 14l2 2 4-4M11.5 22h9" {...I} />
      </>
    ),
    sop: (
      <>
        <path d="M9 4h10l6 6v18H9z" {...I} />
        <path d="M19 4v6h6M13 16h8M13 20h8M13 24h5" {...I} />
      </>
    ),
    training: (
      <>
        <path d="M3 12l13-6 13 6-13 6z" {...I} />
        <path d="M9 15v6c2 2 4.5 3 7 3s5-1 7-3v-6M29 12v7" {...I} />
      </>
    ),
  };
  return <svg viewBox="0 0 32 32" aria-hidden="true">{p[name ?? ""] ?? p.ccs}</svg>;
}

export default function ServiceAccordion({ items }: { items: Service[] }) {
  const [open, setOpen] = useState(0);
  return (
    <ul className="acc">
      {items.map((s, i) => {
        const isOpen = open === i;
        return (
          <li key={s.title} className={isOpen ? "is-open" : ""}>
            <h3>
              <button type="button" aria-expanded={isOpen} aria-controls={`acc-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}>
                <span className="acc-icon">
                  <ServiceIcon name={s.key} />
                </span>
                <span className="acc-title">{s.title}</span>
                <span className="acc-toggle" aria-hidden="true" />
              </button>
            </h3>
            <div id={`acc-${i}`} className="acc-body" role="region" hidden={!isOpen}>
              <p>{s.text}</p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}

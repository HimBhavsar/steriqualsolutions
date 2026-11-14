import type { ReactNode } from "react";

export type HeroCard = { href?: string; visual: ReactNode; top: string; title: ReactNode };

/** White cards that overlap the bottom edge of a page hero. */
export default function HeroCards({ items, label }: { items: HeroCard[]; label: string }) {
  return (
    <section className="areas" aria-label={label}>
      <div className={`wrap areas-grid areas-${items.length}`}>
        {items.map((c, i) => {
          const inner = (
            <>
              <span className="area-visual">{c.visual}</span>
              <span className="area-count">{c.top}</span>
              <span className="area-label">{c.title}</span>
              {c.href && <span className="area-go" aria-hidden="true" />}
            </>
          );
          return c.href ? (
            <a key={i} href={c.href} className="area-card">
              {inner}
            </a>
          ) : (
            <div key={i} className="area-card is-static">
              {inner}
            </div>
          );
        })}
      </div>
    </section>
  );
}

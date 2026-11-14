import Link from "next/link";
import type { ReactNode } from "react";

/** Datasheet card: a dark header with the brand icon, then labelled rows. */
export default function Sheet({
  label = "Datasheet",
  title,
  rows,
  cta,
  href,
  className = "",
}: {
  label?: string;
  title: string;
  rows: [string, ReactNode][];
  cta?: string;
  href?: string;
  className?: string;
}) {
  return (
    <div className={`sheet ${className}`}>
      <div className="sheet-head">
        <img src="/brand/logo-icon.svg" alt="" width="34" height="34" />
        <div>
          <span>{label}</span>
          <b>{title}</b>
        </div>
      </div>
      <dl className="sheet-rows">
        {rows.map(([k, v]) => (
          <div key={k}>
            <dt>{k}</dt>
            <dd>{v}</dd>
          </div>
        ))}
      </dl>
      {cta && href && (
        <Link className="btn btn-ribbon sheet-cta" href={href}>
          {cta}
        </Link>
      )}
    </div>
  );
}

import type { ReactNode } from "react";
import { Ribbon } from "./Illustrations";

export default function PageHero({
  kicker,
  title,
  image,
  children,
}: {
  kicker?: string;
  title: string;
  image?: string;
  children?: ReactNode;
}) {
  return (
    <section className={`page-hero${image ? " has-photo" : ""}`}>
      {image && (
        <div className="page-hero-photo" aria-hidden="true">
          <img src={image} alt="" fetchPriority="high" />
        </div>
      )}
      <div className="page-hero-flow" aria-hidden="true" />
      <div className="wrap page-hero-inner">
        {kicker && (
          <p className="kicker kicker-light">
            <Ribbon className="kicker-mark" />
            {kicker}
          </p>
        )}
        <h1>{title}</h1>
        {children && <div className="lede">{children}</div>}
      </div>
    </section>
  );
}

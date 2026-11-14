"use client";
import { useState } from "react";
import { ValueIcon } from "./Graphics";

type Value = { icon: string; title: string; text: string };

/** Four values arranged around the SteriQual Q, like readings around a sample. */
export default function ValuesOrbit({ values }: { values: Value[] }) {
  const [active, setActive] = useState(0);
  const pos = ["tl", "tr", "bl", "br"];
  return (
    <div className={`orbit orbit-on-${active}`}>
      <svg className="orbit-lines" viewBox="0 0 1000 560" preserveAspectRatio="none" aria-hidden="true">
        {[
          [500, 280, 300, 110],
          [500, 280, 700, 110],
          [500, 280, 300, 450],
          [500, 280, 700, 450],
        ].map(([x1, y1, x2, y2], i) => (
          <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={i === active ? "is-on" : ""} vectorEffect="non-scaling-stroke" />
        ))}
      </svg>
      <div className="orbit-core" aria-hidden="true">
        <span className="ring r1" />
        <span className="ring r2" />
        <span className="ring r3" />
        <img src="/brand/logo-icon.svg" alt="" width="84" height="84" />
      </div>
      {values.map((v, i) => (
        <button
          key={v.title}
          type="button"
          className={`orbit-card orbit-${pos[i]}${i === active ? " is-active" : ""}`}
          aria-pressed={i === active}
          onMouseEnter={() => setActive(i)}
          onFocus={() => setActive(i)}
          onClick={() => setActive(i)}
        >
          <span className="value-icon">
            <ValueIcon name={v.icon} />
          </span>
          <span className="orbit-text">
            <b>{v.title}</b>
            <span>{v.text}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

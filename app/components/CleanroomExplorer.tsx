"use client";
import { useState } from "react";
import { cleanroom } from "../site";

/**
 * A cleanroom cross-section. Choosing a test highlights the part of the room it checks.
 */
export default function CleanroomExplorer() {
  const tests = cleanroom.tests;
  const [active, setActive] = useState(tests[0].key!);
  const current = tests.find((t) => t.key === active)!;
  const on = (k: string) => (active === k ? "is-on" : "");

  return (
    <div className="explorer">
      <div className="explorer-stage">
        <svg viewBox="24 22 600 386" className={`room room-${active}`} role="img" aria-label={`Cleanroom diagram highlighting: ${current.title}`}>
          <defs>
            <linearGradient id="ex-rib" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="#0A3DAE" />
              <stop offset="1" stopColor="#02A6E0" />
            </linearGradient>
            <filter id="ex-glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="4" result="b" />
              <feMerge>
                <feMergeNode in="b" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <marker id="ex-arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
              <path d="M0 0L10 5L0 10z" fill="currentColor" />
            </marker>
          </defs>

          {/* building shell */}
          <rect x="40" y="30" width="560" height="44" rx="4" className="shell-fill" />
          <path d="M60 74V380H500V74M500 380H600V150" className="wall" />
          <path d="M30 380H612" className="floor" />
          <text x="66" y="56" className="lbl">Supply air plenum</text>
          <text x="512" y="372" className="lbl">Adjacent area</text>

          {/* HEPA filters */}
          <g className={`part part-filter ${on("filter")}`}>
            {[110, 230, 350].map((x) => (
              <g key={x}>
                <rect x={x} y="74" width="90" height="18" rx="2" />
                {Array.from({ length: 9 }).map((_, i) => (
                  <path key={i} d={`M${x + 6 + i * 10} 76v14`} />
                ))}
              </g>
            ))}
            <path d="M246 106h58" className="probe" />
            <circle cx="246" cy="106" r="4" className="dot" />
          </g>

          {/* airflow velocity arrows */}
          <g className={`part part-velocity ${on("velocity")}`}>
            {[130, 175, 250, 295, 370, 415].map((x) => (
              <path key={x} d={`M${x} 104V176`} markerEnd="url(#ex-arrow)" />
            ))}
            <g transform="translate(395 196)">
              <circle r="11" />
              <path d="M0 0l6-5" />
            </g>
          </g>

          {/* airflow visualisation (smoke) */}
          <g className={`part part-visual ${on("visual")}`}>
            {[150, 200, 270, 320, 390].map((x, i) => (
              <path key={x} d={`M${x} 196 C ${x + 4} 230, ${x - 4} 260, ${x + (i % 2 ? 3 : -3)} 300`} className="smoke" />
            ))}
          </g>

          {/* workbench / critical zone */}
          <path d="M200 300h170M215 300v80M355 300v80" className="bench" />
          <text x="204" y="292" className="lbl">Critical zone</text>

          {/* particle counter */}
          <g className={`part part-particles ${on("particles")}`}>
            <rect x="86" y="306" width="54" height="40" rx="5" />
            <path d="M96 318h34M96 328h22" />
            <path d="M113 306V268h22" />
            <circle cx="140" cy="268" r="4" className="dot" />
            <path d="M92 346v20M134 346v20" />
            {[
              [160, 240], [178, 226], [150, 222], [170, 252],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="2.4" className="dot" />
            ))}
          </g>

          {/* temperature & humidity sensor */}
          <g className={`part part-climate ${on("climate")}`}>
            <rect x="466" y="200" width="26" height="44" rx="4" />
            <path d="M479 210v20" />
            <circle cx="479" cy="233" r="4" className="dot" />
            <path d="M472 252c3-5 4-6 7-10 3 4 4 5 7 10a7 7 0 0 1-14 0z" />
          </g>

          {/* pressure differential: door + gauge */}
          <g className={`part part-pressure ${on("pressure")}`}>
            <path d="M500 270v110" className="door" />
            <path d="M508 300h56" markerEnd="url(#ex-arrow)" />
            <path d="M508 330h56" markerEnd="url(#ex-arrow)" />
            <g transform="translate(550 200)">
              <circle r="18" />
              <path d="M0 0l9-9" />
              <text x="-14" y="38" className="lbl strong">Δp</text>
            </g>
            <text x="440" y="398" className="lbl">Higher</text>
            <text x="540" y="398" className="lbl">Lower</text>
          </g>

          {/* recovery: particle spike + clock */}
          <g className={`part part-recovery ${on("recovery")}`}>
            {[
              [290, 220], [300, 232], [282, 238], [310, 218], [296, 210], [318, 236], [276, 222], [306, 246],
            ].map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r="3" className="dot" />
            ))}
            <g transform="translate(344 222)">
              <circle r="13" />
              <path d="M0 -7V0l5 4" />
            </g>
          </g>

          {/* containment leak: joints and panels */}
          <g className={`part part-leak ${on("leak")}`}>
            <path d="M60 92h12M488 92h12M60 380h12M488 380h12" className="joint" />
            <circle cx="66" cy="86" r="9" className="ring" />
            <circle cx="494" cy="86" r="9" className="ring" />
            <path d="M66 98v16M494 98v16" strokeDasharray="3 4" />
          </g>
        </svg>
      </div>

      <div className="explorer-panel">
        <ul className="test-list" aria-label="Cleanroom tests">
          {tests.map((t) => (
            <li key={t.key}>
              <button type="button" className={active === t.key ? "is-active" : ""} aria-pressed={active === t.key} onClick={() => setActive(t.key!)} onMouseEnter={() => setActive(t.key!)} onFocus={() => setActive(t.key!)}>
                <span>{t.title}</span>
                <em>{t.tag}</em>
              </button>
            </li>
          ))}
        </ul>
        <div className="test-detail" aria-live="polite">
          <span className="std">{current.tag}</span>
          <h3>{current.title}</h3>
          <p>{current.text}</p>
        </div>
      </div>
    </div>
  );
}

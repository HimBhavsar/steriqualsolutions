/* Line illustrations drawn in the SteriQual palette. Decorative only. */

const S = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function RibbonDefs({ id }: { id: string }) {
  return (
    <defs>
      <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#0A3DAE" />
        <stop offset="1" stopColor="#02A6E0" />
      </linearGradient>
    </defs>
  );
}

/** Settle plate with colonies: microbiology & GMP investigations. */
export function PetriDish({ className = "" }: { className?: string }) {
  return (
    <svg className={`illo ${className}`} viewBox="0 0 240 180" aria-hidden="true">
      <RibbonDefs id="rb-petri" />
      <ellipse cx="120" cy="104" rx="92" ry="40" {...S} />
      <path d="M28 104v12c0 22 41 40 92 40s92-18 92-40v-12" {...S} />
      <ellipse cx="120" cy="100" rx="80" ry="33" {...S} strokeOpacity=".45" />
      {[
        [86, 96, 6], [104, 110, 3.5], [140, 92, 4.5], [158, 108, 3], [122, 86, 2.5], [96, 82, 2.2], [150, 120, 2.4], [70, 108, 2.4],
      ].map(([x, y, r], i) => (
        <ellipse key={i} cx={x} cy={y} rx={r * 1.3} ry={r * 0.7} fill="#02A6E0" fillOpacity={i === 0 ? 0.9 : 0.45} />
      ))}
      <circle cx="86" cy="96" r="16" {...S} stroke="#02A6E0" strokeDasharray="3 4" />
      <path d="M100 84 L150 30" {...S} stroke="#02A6E0" />
      <path d="M150 30 h46" {...S} stroke="#02A6E0" />
      <path d="M38 34 L78 34 L98 58 L58 58 Z" fill="url(#rb-petri)" opacity=".9" />
    </svg>
  );
}

/** Room plan with particle sampling locations: cleanroom qualification. */
export function SamplingPlan({ className = "" }: { className?: string }) {
  const pts = [
    [62, 70], [120, 70], [178, 70], [62, 118], [120, 118], [178, 118],
  ];
  return (
    <svg className={`illo ${className}`} viewBox="0 0 240 180" aria-hidden="true">
      <RibbonDefs id="rb-plan" />
      <rect x="30" y="40" width="180" height="110" rx="4" {...S} />
      <path d="M30 95h18M192 95h18M120 40v14M120 136v14" {...S} strokeOpacity=".4" />
      {Array.from({ length: 6 }).map((_, i) => (
        <path key={i} d={`M${48 + i * 29} 24v10`} {...S} stroke="#02A6E0" />
      ))}
      <path d="M44 22h152" {...S} stroke="#02A6E0" strokeOpacity=".6" />
      {pts.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r={i === 4 ? 13 : 9} {...S} stroke={i === 4 ? "#02A6E0" : "currentColor"} strokeOpacity={i === 4 ? 1 : 0.5} />
          <circle cx={x} cy={y} r="2.6" fill={i === 4 ? "#02A6E0" : "currentColor"} />
        </g>
      ))}
      <path d="M133 118 L176 160 H214" {...S} stroke="#02A6E0" />
      <path d="M150 154 L176 154 L196 176 L170 176 Z" fill="url(#rb-plan)" />
    </svg>
  );
}

/** Vials, a sterile pouch and pipette tips: consumables and equipment. */
export function Supplies({ className = "" }: { className?: string }) {
  return (
    <svg className={`illo ${className}`} viewBox="0 0 240 180" aria-hidden="true">
      <RibbonDefs id="rb-sup" />
      {[40, 70, 100].map((x, i) => (
        <g key={x}>
          <rect x={x} y="60" width="22" height="90" rx="6" {...S} />
          <rect x={x - 2} y="50" width="26" height="12" rx="2" {...S} fill={i === 1 ? "url(#rb-sup)" : "none"} stroke={i === 1 ? "none" : "currentColor"} />
          <path d={`M${x + 4} ${110 - i * 12}h14`} {...S} stroke="#02A6E0" />
          <rect x={x + 4} y={112 - i * 12} width="14" height={34 + i * 12} rx="3" fill="#02A6E0" fillOpacity=".25" />
        </g>
      ))}
      <path d="M140 46h70l-6 104h-58z" {...S} />
      <path d="M140 46l8-14h54l8 14" {...S} />
      <path d="M152 70h46M152 82h30" {...S} strokeOpacity=".5" />
      <rect x="152" y="98" width="46" height="30" rx="3" {...S} stroke="#02A6E0" strokeDasharray="4 4" />
      <path d="M163 113l7 7 14-14" {...S} stroke="#02A6E0" />
    </svg>
  );
}

/** Benchtop QC instrument for the equipment page. */
export function Instrument({ className = "" }: { className?: string }) {
  return (
    <svg className={`illo ${className}`} viewBox="0 0 240 180" aria-hidden="true">
      <RibbonDefs id="rb-ins" />
      <rect x="26" y="40" width="188" height="104" rx="8" {...S} />
      <rect x="40" y="54" width="92" height="56" rx="4" {...S} />
      <path d="M48 98 L66 80 L80 90 L98 66 L124 74" {...S} stroke="#02A6E0" />
      <circle cx="164" cy="74" r="20" {...S} />
      <circle cx="164" cy="74" r="7" fill="#02A6E0" fillOpacity=".5" />
      <path d="M150 112h50M150 124h34" {...S} strokeOpacity=".5" />
      <path d="M40 124h40" {...S} />
      <path d="M44 144v14M196 144v14" {...S} />
      <path d="M150 20 L188 20 L208 40 L170 40 Z" fill="url(#rb-ins)" />
    </svg>
  );
}

/** Pressure cascade across adjoining rooms. Air always moves from higher to lower pressure. */
export function PressureCascade() {
  const rooms = [
    { name: "General area", p: 1 },
    { name: "Change room", p: 2 },
    { name: "Buffer zone", p: 3 },
    { name: "Aseptic core", p: 4 },
  ];
  const W = 760, x0 = 20, rw = 172, gap = 8;
  return (
    <svg className="cascade" viewBox={`0 0 ${W} 230`} role="img" aria-labelledby="cascade-title">
      <title id="cascade-title">
        Pressure cascade: pressure rises from the general area to the aseptic core, so air always flows outward, away from the cleanest room.
      </title>
      <RibbonDefs id="rb-casc" />
      {rooms.map((r, i) => {
        const x = x0 + i * (rw + gap);
        const fillOp = 0.06 + i * 0.07;
        return (
          <g key={r.name}>
            <rect x={x} y="40" width={rw} height="130" rx="6" fill="#02A6E0" fillOpacity={fillOp} stroke="#0D1B3D" strokeOpacity=".35" />
            <text x={x + 16} y="70" className="cascade-room">{r.name}</text>
            <g transform={`translate(${x + 16},92)`}>
              {Array.from({ length: 4 }).map((_, k) => (
                <rect key={k} x={k * 14} y="0" width="10" height="26" rx="2" fill={k < r.p ? "url(#rb-casc)" : "#0D1B3D"} fillOpacity={k < r.p ? 1 : 0.12} />
              ))}
            </g>
            <text x={x + 16} y="150" className="cascade-p">{"+".repeat(r.p)} pressure</text>
            {i > 0 && (
              <g className="cascade-arrow" transform={`translate(${x - gap / 2},105)`}>
                <path d="M14 0 H-14 M-8 -6 L-14 0 L-8 6" fill="none" stroke="#0A3DAE" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
              </g>
            )}
          </g>
        );
      })}
      <text x={x0} y="24" className="cascade-cap">Air moves from higher to lower pressure, away from the cleanest room</text>
      <text x={x0} y="206" className="cascade-cap muted">Illustrative layout. Actual zoning and differentials depend on your facility design.</text>
    </svg>
  );
}

/** The slash from the Q in the logo, used as the brand's signature mark. */
export function Ribbon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 200 120" aria-hidden="true" preserveAspectRatio="none">
      <RibbonDefs id={`rb-${className || "x"}`} />
      <path d="M0 0 H70 L200 120 H130 Z" fill={`url(#rb-${className || "x"})`} />
    </svg>
  );
}

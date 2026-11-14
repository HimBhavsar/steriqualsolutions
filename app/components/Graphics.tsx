/* Flags, value icons and the person avatar. */

export function Flag({ code, className = "" }: { code: string; className?: string }) {
  if (code === "us") {
    return (
      <svg className={`flag ${className}`} viewBox="0 0 76 40" aria-hidden="true">
        {Array.from({ length: 13 }).map((_, i) => (
          <rect key={i} y={(i * 40) / 13} width="76" height={40 / 13 + 0.2} fill={i % 2 ? "#fff" : "#B22234"} />
        ))}
        <rect width="30.4" height={(40 / 13) * 7} fill="#3C3B6E" />
        {Array.from({ length: 5 }).map((_, r) =>
          Array.from({ length: r % 2 ? 5 : 6 }).map((_, c) => (
            <circle key={`${r}-${c}`} cx={(r % 2 ? 5 : 2.5) + c * 5} cy={2.4 + r * 4.9} r="0.95" fill="#fff" />
          )),
        )}
      </svg>
    );
  }
  if (code === "eu") {
    return (
      <svg className={`flag ${className}`} viewBox="0 0 60 40" aria-hidden="true">
        <rect width="60" height="40" fill="#003399" />
        {Array.from({ length: 12 }).map((_, i) => {
          const a = (i / 12) * Math.PI * 2;
          const x = 30 + Math.sin(a) * 13.3;
          const y = 20 - Math.cos(a) * 13.3;
          return (
            <polygon
              key={i}
              fill="#FFCC00"
              points={Array.from({ length: 10 })
                .map((_, k) => {
                  const r = k % 2 ? 0.9 : 2.2;
                  const t = (k / 10) * Math.PI * 2 - Math.PI / 2;
                  return `${(x + Math.cos(t) * r).toFixed(2)},${(y + Math.sin(t) * r).toFixed(2)}`;
                })
                .join(" ")}
            />
          );
        })}
      </svg>
    );
  }
  return (
    <svg className={`flag ${className}`} viewBox="0 0 60 40" aria-hidden="true">
      <rect width="60" height="20" fill="#FCD116" />
      <rect y="20" width="60" height="10" fill="#003893" />
      <rect y="30" width="60" height="10" fill="#CE1126" />
    </svg>
  );
}

const L = { fill: "none", stroke: "currentColor", strokeWidth: 1.7, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

export function ValueIcon({ name }: { name: string }) {
  switch (name) {
    case "science":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M12 4h8M13.5 4v8L6.5 25a2 2 0 0 0 1.8 3h15.4a2 2 0 0 0 1.8-3L18.5 12V4" {...L} />
          <path d="M9.5 20h13" {...L} />
          <circle cx="14" cy="24" r="1.3" fill="currentColor" />
          <circle cx="18.5" cy="22.5" r="1" fill="currentColor" />
        </svg>
      );
    case "global":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle cx="16" cy="16" r="11" {...L} />
          <path d="M5 16h22M16 5c3.2 3.2 4.8 6.8 4.8 11S19.2 23.8 16 27c-3.2-3.2-4.8-6.8-4.8-11S12.8 8.2 16 5z" {...L} />
        </svg>
      );
    case "practical":
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <rect x="4" y="5" width="9" height="9" rx="2" {...L} />
          <rect x="19" y="18" width="9" height="9" rx="2" {...L} />
          <path d="M13 9.5h5a3 3 0 0 1 3 3V18M19 22.5h-5a3 3 0 0 1-3-3V14" {...L} />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path d="M6 9h6a3 3 0 1 1 6 0h6v6a3 3 0 1 0 0 6v6H18a3 3 0 1 0-6 0H6v-6a3 3 0 1 1 0-6z" {...L} />
        </svg>
      );
  }
}

/** Initials in a ringed circle, a stand-in until real portraits are supplied. */
export function Avatar({ initials, size = "md" }: { initials: string; size?: "md" | "lg" }) {
  return (
    <div className={`avatar avatar-${size}`} aria-hidden="true">
      <span>{initials}</span>
    </div>
  );
}

export function Check() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className="tick">
      <path d="M3.5 8.5l3 3 6-7" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

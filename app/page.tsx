function BrandMark() {
  return (
    <svg
      className="brand-mark"
      viewBox="0 0 64 64"
      role="img"
      aria-label="SteriQual mark"
    >
      <rect x="1" y="1" width="62" height="62" rx="15" fill="#153e75" />
      <path
        d="M15 21h23c7 0 11 4 11 10s-4 10-11 10H27"
        fill="none"
        stroke="#fff"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="m35 36 10 11"
        fill="none"
        stroke="#4f91c6"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M17 28c4-5 9-6 14-4"
        fill="none"
        stroke="#4f91c6"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CleanroomIllustration() {
  return (
    <svg
      className="illustration"
      viewBox="0 0 360 340"
      role="img"
      aria-label="Illustration of a cleanroom facility"
    >
      <defs>
        <linearGradient id="building" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#ffffff" />
          <stop offset="1" stopColor="#d8e9f7" />
        </linearGradient>
        <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#a8d5f1" />
          <stop offset="1" stopColor="#e8f6ff" />
        </linearGradient>
      </defs>
      <ellipse cx="180" cy="300" rx="138" ry="18" fill="#153e75" opacity=".09" />
      <path
        d="M48 112 180 48l132 64v174H48Z"
        fill="url(#building)"
        stroke="#a8bfd3"
        strokeWidth="2"
      />
      <path
        d="m48 112 132-64 132 64"
        fill="none"
        stroke="#2468a6"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      <path d="M68 122h224v13H68Z" fill="#2468a6" />
      <path
        d="M78 151h204v119H78Z"
        fill="#fff"
        stroke="#c1d3e2"
        strokeWidth="2"
      />
      <path
        d="M92 164h57v91H92Z"
        fill="url(#glass)"
        stroke="#91b6d2"
        strokeWidth="2"
      />
      <path
        d="M158 164h57v91h-57Z"
        fill="url(#glass)"
        stroke="#91b6d2"
        strokeWidth="2"
      />
      <path
        d="M224 164h44v91h-44Z"
        fill="#eaf4fb"
        stroke="#91b6d2"
        strokeWidth="2"
      />
      <path d="M120 164v91M186 164v91M246 164v91" stroke="#fff" strokeWidth="3" />
      <path
        d="M105 181h31M171 181h31M233 181h25"
        stroke="#fff"
        strokeWidth="3"
        strokeLinecap="round"
        opacity=".8"
      />
      <rect x="145" y="214" width="70" height="56" rx="2" fill="#153e75" />
      <rect x="153" y="222" width="54" height="40" fill="#d7edf9" />
      <path d="M153 242h54M180 222v40" stroke="#91b6d2" strokeWidth="2" />
      <rect x="82" y="139" width="196" height="8" rx="4" fill="#4f91c6" />
      <path
        d="M100 95h28M232 95h28"
        stroke="#fff"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".9"
      />
      <circle cx="282" cy="76" r="22" fill="#fff" stroke="#c8ddeb" strokeWidth="2" />
      <path
        d="M270 76h24M282 64v24"
        stroke="#4f91c6"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M18 188h25M25 199h18M18 210h25"
        stroke="#4f91c6"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".65"
      />
      <path
        d="M318 190h24M325 201h17M318 212h24"
        stroke="#4f91c6"
        strokeWidth="4"
        strokeLinecap="round"
        opacity=".65"
      />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <header className="topbar">
        <div className="brand" aria-label="SteriQual Plant Services">
          {/* <BrandMark /> */}
          <div>
            <div className="brand-name">SteriQual</div>
            <div className="brand-subtitle">PLANT SERVICES</div>
          </div>
        </div>
        <div className="status">
          <span className="status-dot" />
          Website under development
        </div>
      </header>

      <main>
        <section className="copy">
          <div className="eyebrow">A new standard is on the way</div>
          <h1>
            We’re coming <span>live soon.</span>
          </h1>
          <p className="lead">
            Our website is currently under development. We’re working on
            bringing you a better way to explore our plant services and
            solutions for the pharma, semiconductor, and cleanroom industries.
          </p>
          <div className="services" aria-label="Industries served">
            <span className="service">PHARMA</span>
            <span className="service">SEMICONDUCTOR</span>
            <span className="service">CLEANROOM</span>
          </div>
        </section>

        <section
          className="visual"
          aria-label="Cleanroom and precision engineering illustration"
        >
          <div className="orb" />
          <div className="floating-card card-one">
            Precision-focused
            <small>Built around quality</small>
          </div>
          <div className="floating-card card-two">
            Clean environments
            <small>Reliable plant solutions</small>
          </div>
          <CleanroomIllustration />
        </section>
      </main>

      <footer className="footer">
        <strong>SteriQual Plant Services</strong>
        &nbsp;•&nbsp; Pharma | Semiconductor | Cleanroom
        <br />
        <span className="copyright">
          © {new Date().getFullYear()} SteriQual Plant Services. All rights
          reserved.
        </span>
      </footer>
    </>
  );
}

import Link from "next/link";
import { company, nav, cleanroom, pharma, supply, telHref, mapLink } from "../site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="wrap footer-top">
        <div className="footer-brand">
          <img src="/brand/logo-full-white.svg" alt="SteriQual Solutions Pvt. Ltd." width="220" height="61" />
          <p>
            GMP technical consultation, qualification solutions and training for pharmaceutical, semiconductor and
            controlled cleanroom environments.
          </p>
        </div>
        <div className="footer-col">
          <h2>Company</h2>
          {nav.map((n) => (
            <Link key={n.href} href={n.href}>
              {n.label}
            </Link>
          ))}
        </div>
        <div className="footer-col">
          <h2>What we do</h2>
          <Link href={`/services#${pharma.id}`}>Pharmaceutical GMP</Link>
          <Link href={`/services#${cleanroom.id}`}>Cleanroom qualification</Link>
          <Link href="/products">{supply.title}</Link>
        </div>
        <div className="footer-col">
          <h2>Reach us</h2>
          <address className="footer-address">
            <b>{company.legalName}</b>
            <br />
            504 Yash Aqua, Vijay Char Rasta,
            <br />
            Navrangpura, Ahmedabad 380009,
            <br />
            Gujarat, India
          </address>
          <a href={mapLink} target="_blank" rel="noopener noreferrer">
            Get directions
          </a>
          <a href={`mailto:${company.email}`}>{company.email}</a>
          {company.phones.map((p) => (
            <a key={p} href={telHref(p)}>
              {p}
            </a>
          ))}
          {company.linkedin && <a href={company.linkedin}>LinkedIn</a>}
          <Link className="footer-cta" href="/contact-us">
            Send an enquiry
          </Link>
        </div>
      </div>
      <div className="wrap footer-base">
        <small>
          © {year} {company.name}
        </small>
        <nav className="footer-legal" aria-label="Legal">
          <Link href="/privacy-policy">Privacy Policy</Link>
          <Link href="/terms-of-use">Terms of Use</Link>
          <a href="/llms.txt">llms.txt</a>
        </nav>
      </div>
    </footer>
  );
}

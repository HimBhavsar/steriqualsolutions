import Link from "next/link";
import { company, nav, cleanroom, pharma, supply } from "../site";

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
          <Link href="/">Home</Link>
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
          <p>{company.address || company.city}</p>
          {company.email && <a href={`mailto:${company.email}`}>{company.email}</a>}
          {company.phone && <a href={`tel:${company.phone.replace(/\s/g, "")}`}>{company.phone}</a>}
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

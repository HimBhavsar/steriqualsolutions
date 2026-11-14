"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav, company, telHref } from "../site";

export default function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header className={`site-header${solid ? " is-solid" : ""}${open ? " is-open" : ""}`}>
      <div className="topbar">
        <div className="wrap topbar-row">
          <a href={`mailto:${company.email}`} className="topbar-item">
            <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M4 7l8 6 8-6" /></svg>
            {company.email}
          </a>
          {company.phones.map((p) => (
            <a key={p} href={telHref(p)} className="topbar-item">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" /></svg>
              {p}
            </a>
          ))}
          <span className="topbar-item topbar-place">
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
            Navrangpura, Ahmedabad
          </span>
        </div>
      </div>
      <div className="wrap header-row">
        <Link className="brand" href="/" aria-label="SteriQual Solutions, home">
          <img className="brand-light" src="/brand/logo-full-white.svg" alt="" width="180" height="50" />
          <img className="brand-dark" src="/brand/logo-full-navy.svg" alt="" width="180" height="50" />
        </Link>
        <nav className="main-nav" aria-label="Main">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
              {n.label}
            </Link>
          ))}
        </nav>
        <Link className="btn btn-ribbon header-cta" href="/contact-us">
          Get expert advice
        </Link>
        <button
          className="menu-toggle"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">{open ? "Close menu" : "Open menu"}</span>
          <i />
          <i />
        </button>
      </div>
      <nav id="mobile-nav" className="mobile-nav" aria-label="Mobile" hidden={!open}>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
            {n.label}
          </Link>
        ))}
        <Link className="btn btn-ribbon" href="/contact-us">
          Get expert advice
        </Link>
        <div className="mobile-contact">
          <a href={`mailto:${company.email}`}>{company.email}</a>
          {company.phones.map((p) => (
            <a key={p} href={telHref(p)}>
              {p}
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
}

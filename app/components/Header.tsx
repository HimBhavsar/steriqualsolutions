"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { nav } from "../site";

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
        <Link href="/" aria-current={pathname === "/" ? "page" : undefined}>
          Home
        </Link>
        {nav.map((n) => (
          <Link key={n.href} href={n.href} aria-current={pathname === n.href ? "page" : undefined}>
            {n.label}
          </Link>
        ))}
        <Link className="btn btn-ribbon" href="/contact-us">
          Get expert advice
        </Link>
      </nav>
    </header>
  );
}

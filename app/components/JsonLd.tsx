import { company, mapLink, siteUrl, siteDescription, pharma, cleanroom, supply, team } from "../site";

const ORG_ID = `${siteUrl}/#organization`;
const SITE_ID = `${siteUrl}/#website`;

function contactPoints() {
  return company.phones.map((telephone) => ({
    "@type": "ContactPoint",
    contactType: "customer service",
    telephone,
    email: company.email,
    url: `${siteUrl}/contact-us`,
    areaServed: "Worldwide",
    availableLanguage: ["English", "Hindi", "Gujarati"],
  }));
}

/** Organization + local business + website: rendered on every page. */
export function siteGraph() {
  const sameAs = [...company.sameAs, company.linkedin].filter(Boolean);
  const org: Record<string, unknown> = {
    "@type": ["Organization", "ProfessionalService"],
    "@id": ORG_ID,
    name: company.name,
    legalName: company.legalName,
    alternateName: "SteriQual",
    url: siteUrl,
    logo: { "@type": "ImageObject", url: `${siteUrl}/icon-512.png`, width: 512, height: 512 },
    image: `${siteUrl}/og-image.png`,
    description: siteDescription,
    slogan: "Your partner in compliance",
    address: {
      "@type": "PostalAddress",
      streetAddress: company.streetAddress,
      postalCode: company.postalCode,
      addressLocality: company.locality,
      addressRegion: company.region,
      addressCountry: company.country,
    },
    areaServed: "Worldwide",
    knowsAbout: [
      "Good Manufacturing Practice (GMP)",
      "Cleanroom qualification",
      "ISO 14644",
      "Contamination Control Strategy",
      "Computer Systems Validation",
      "QC microbiology",
      "Aseptic processing simulation",
      "Water system qualification",
      "Depyrogenated laboratory consumables",
    ],
    contactPoint: contactPoints(),
    employee: team.map((p) => ({ "@id": `${siteUrl}/about-us#${p.initials.toLowerCase()}` })),
  };
  org.email = company.email;
  org.telephone = company.phones[0];
  org.hasMap = mapLink;
  if (sameAs.length) org.sameAs = sameAs;

  return [
    org,
    {
      "@type": "WebSite",
      "@id": SITE_ID,
      url: siteUrl,
      name: "SteriQual Solutions",
      description: siteDescription,
      publisher: { "@id": ORG_ID },
      inLanguage: "en-IN",
    },
  ];
}

function breadcrumb(path: string, name: string) {
  return {
    "@type": "BreadcrumbList",
    "@id": `${siteUrl}${path}#breadcrumb`,
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name, item: `${siteUrl}${path}` },
    ],
  };
}

function webPage(type: string, path: string, name: string, extra: Record<string, unknown> = {}) {
  return {
    "@type": type,
    "@id": `${siteUrl}${path}#webpage`,
    url: `${siteUrl}${path}`,
    name,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
    inLanguage: "en-IN",
    ...(path !== "/" ? { breadcrumb: { "@id": `${siteUrl}${path}#breadcrumb` } } : {}),
    ...extra,
  };
}

function serviceNodes() {
  const make = (id: string, name: string, description: string, items: { title: string; text: string }[], category: string) => ({
    "@type": "Service",
    "@id": `${siteUrl}/services#${id}`,
    name,
    description,
    serviceType: category,
    provider: { "@id": ORG_ID },
    areaServed: "Worldwide",
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name,
      itemListElement: items.map((s) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: s.title, description: s.text } })),
    },
  });
  return [
    make(pharma.id, pharma.title, pharma.short, pharma.services, "GMP consulting and validation"),
    make(cleanroom.id, cleanroom.title, cleanroom.short, cleanroom.tests, "Cleanroom qualification and testing"),
    make(supply.id, supply.title, supply.short, supply.items, "Laboratory consumables and equipment supply"),
  ];
}

const graphs: Record<string, () => Record<string, unknown>[]> = {
  "/": () => [webPage("WebPage", "/", "SteriQual Solutions | Pharma Microbiology & GMP Consulting", { hasPart: serviceNodes().map((s) => ({ "@id": s["@id"] })) }), ...serviceNodes()],
  "/about-us": () => [
    webPage("AboutPage", "/about-us", "About SteriQual Solutions"),
    breadcrumb("/about-us", "About Us"),
    ...team.map((p) => ({
      "@type": "Person",
      "@id": `${siteUrl}/about-us#${p.initials.toLowerCase()}`,
      name: p.name,
      jobTitle: p.role,
      description: p.bio,
      hasCredential: p.credential,
      knowsAbout: p.expertise,
      worksFor: { "@id": ORG_ID },
    })),
  ],
  "/services": () => [webPage("WebPage", "/services", "Services"), breadcrumb("/services", "Services"), ...serviceNodes()],
  "/products": () => [
    webPage("WebPage", "/products", supply.title),
    breadcrumb("/products", "Products"),
    {
      "@type": "OfferCatalog",
      "@id": `${siteUrl}/products#catalog`,
      name: supply.title,
      description: supply.short,
      itemListElement: supply.items.map((s) => ({ "@type": "Offer", seller: { "@id": ORG_ID }, itemOffered: { "@type": "Service", name: s.title, description: s.text } })),
    },
  ],
  "/contact-us": () => [webPage("ContactPage", "/contact-us", "Contact SteriQual"), breadcrumb("/contact-us", "Contact Us")],
  "/privacy-policy": () => [webPage("WebPage", "/privacy-policy", "Privacy Policy"), breadcrumb("/privacy-policy", "Privacy Policy")],
  "/terms-of-use": () => [webPage("WebPage", "/terms-of-use", "Terms of Use"), breadcrumb("/terms-of-use", "Terms of Use")],
};

/** JSON-LD for one page: the site-wide graph plus that page's own nodes. */
export default function JsonLd({ path }: { path: string }) {
  const data = { "@context": "https://schema.org", "@graph": [...siteGraph(), ...(graphs[path]?.() ?? [])] };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

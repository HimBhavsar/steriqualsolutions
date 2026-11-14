// Markdown versions of each page, for AI agents (served at /<page>.md and via Accept: text/markdown).
import { company, siteUrl, siteDescription, pages, pharma, cleanroom, supply, team, regulators, standardsDetail, enquiry } from "../site";

const contactLines = () =>
  [
    `- Office: ${company.address || company.city}`,
    company.email && `- Email: ${company.email}`,
    company.phone && `- Phone: ${company.phone}`,
    company.hours && `- Working hours: ${company.hours}`,
    `- Enquiry form: ${siteUrl}/contact-us`,
  ]
    .filter(Boolean)
    .join("\n");

const header = (title: string, path: string) => `# ${title}\n\n> ${siteDescription}\n\nCanonical: ${siteUrl}${path === "/" ? "/" : path}\n`;

const nav = () => pages.map((p) => `- [${p.title}](${siteUrl}/${p.md}.md)`).join("\n");

function home() {
  return `${header("SteriQual Solutions Pvt. Ltd.", "/")}
## Your partner in compliance

GMP technical consultation, qualification solutions and training. SteriQual provides cleanroom qualification for pharmaceutical and semiconductor industries, equipment qualification and CSV, GMP consultation, mock audits, and robust contamination control strategies.

## Regulatory audits faced and defended

${regulators.map((r) => `- **${r.code}**: ${r.name} (${r.region})`).join("\n")}

## Work aligned with

${standardsDetail.map((s) => `- **${s.name}** (${s.area}): ${s.text}`).join("\n")}

## Where microbiology expertise meets rigorous GMP

Based in Ahmedabad, SteriQual Solutions Pvt. Ltd. provides specialized technical consulting for pharmaceutical, semiconductor and controlled cleanroom environments. We leverage more than 16 years of industrial QC microbiology experience to design robust facility qualifications and audit-ready contamination control workflows.

## Service areas

- [${pharma.title}](${siteUrl}/services.md): ${pharma.short}
- [${cleanroom.title}](${siteUrl}/services.md): ${cleanroom.short}
- [${supply.title}](${siteUrl}/products.md): ${supply.short}

## Our approach

- **Microbiology-driven**: 16+ years of core industrial QC expertise to identify, isolate and mitigate cleanroom contamination vectors.
- **Audit-ready blueprints**: rigorous validation protocols and computer system validation frameworks shaped around global regulatory expectations.
- **Data-reliability focused**: traceably documented procedures and training structures that eliminate laboratory subjectivity and human error.

## Contact

${contactLines()}

## Pages

${nav()}
`;
}

function about() {
  return `${header("About SteriQual Solutions", "/about-us")}
## Specialized expertise in critical environment compliance

Founded in Ahmedabad, SteriQual Solutions Pvt. Ltd. was established to address the critical need for robust, technically sound compliance and contamination control strategies in high-precision industries.

With a foundation built on advanced postgraduate microbiology credentials and over 16 years of hands-on quality control and aseptic processing experience, we deliver precision-driven qualification, validation and contamination control strategies. Our technical framework is backed by firsthand experience managing facility and system audits from the USFDA, EMA and INVIMA.

We also provide deep-dive expertise in microbial excursion investigations, operational deviations, aseptic processing simulation (APS) failures and out-of-specification (OOS) results, with robust root-cause identification and CAPA implementation.

## Areas of focus

- Pharmaceutical and biopharmaceutical sectors
- Semiconductor and microelectronics manufacturing
- Controlled cleanroom environments
- Sterile and depyrogenated consumables supply chain

## Vision

To be the most trusted quality partner for cleanrooms worldwide, known for simple compliance and accurate data.

## Mission

To protect product quality and patient safety by providing premium sterile supplies, clear facility qualifications, and fast expert solutions for contamination issues.

## Core values

- **True science**: every solution, protocol and failure check is based on clear facts and proven microbiology principles.
- **Global standards**: facilities kept ready for strict international audits like USFDA, EMA and current GMP guidelines.
- **Practical support**: easy-to-use workflows, protocols and reports that fit daily plant routines.
- **Tailored solutions**: customized solutions beyond the predefined checklist.

## Leadership

${team.map((p) => `### ${p.name}\n\n${p.role}. ${p.credential}, ${p.years} (${p.field}).\n\n${p.bio}\n\nExpertise: ${p.expertise.join(", ")}.`).join("\n\n")}
`;
}

function services() {
  return `${header("Services", "/services")}
## ${pharma.title}

${pharma.short}

${pharma.services.map((s) => `- **${s.title}**: ${s.text}`).join("\n")}

${pharma.note}

## ${cleanroom.title}

${cleanroom.short}

${cleanroom.tests.map((t) => `- **${t.title}** (${t.tag}): ${t.text}`).join("\n")}

## ${supply.title}

${supply.short}

${supply.items.map((s) => `- **${s.title}**: ${s.text}`).join("\n")}

Request any service: ${siteUrl}/contact-us
`;
}

function products() {
  return `${header(supply.title, "/products")}
${supply.short}

## ${supply.items[0].title}

${supply.items[0].text}

Grades: sterile, non-sterile and depyrogenated microbiological consumables for pharmaceutical QC laboratories.

## ${supply.items[1].title}

${supply.items[1].text}

Capabilities: sourcing, supply and custom design of QC laboratory instruments.

## Getting an accurate quote

Include the items or instruments you need, approximate quantities, sterility or depyrogenation requirements, specifications they must meet, and your delivery location and timeline.

Request a quote: ${siteUrl}/contact-us
`;
}

function contact() {
  return `${header("Contact SteriQual", "/contact-us")}
Share what you're working on. Our technical team will be in touch to design a tailored compliance or supply solution for your facility.

${contactLines()}

## Enquiry form fields

- Full name (required)
- Work email (required)
- Phone number (required)
- Company name (optional)
- Industry sector (required): ${enquiry.sectors.join(", ")}
- Service required (required): ${enquiry.services.join(", ")}
- How can we help? (required)

Agents can also submit an enquiry with the \`submit_enquiry\` tool on the MCP server at ${siteUrl}/mcp.
`;
}

export function privacyText() {
  return `${header("Privacy Policy", "/privacy-policy")}
${company.name} ("SteriQual", "we") respects your privacy. This policy explains what we collect through this website and how we use it.

## What we collect

- **Enquiry details** you submit through the contact form: name, work email, phone number, company, industry sector, the service you need and your message.
- **Basic technical data** that web servers record automatically, such as your IP address, browser type and the pages you visit.

We do not use advertising trackers on this website.

## How we use it

- To respond to your enquiry and send you a confirmation email.
- To prepare proposals, quotes or supply offers you ask for.
- To keep a record of enquiries so our team can follow up.
- To keep the website secure and working.

We do not sell your information.

## Where it is stored

Enquiries are stored in our Google account (Google Sheets and Gmail). The website is hosted by Hostinger. These providers process data on our behalf.

## How long we keep it

We keep enquiry records for as long as needed to respond and for our business records, and then delete them.

## Your choices

You can ask us to access, correct or delete your information by contacting us${company.email ? ` at ${company.email}` : " through the contact form"}.

## Changes

We may update this policy. The current version is always on this page.
`;
}

export function termsText() {
  return `${header("Terms of Use", "/terms-of-use")}
These terms apply to your use of ${siteUrl} ("the website"), operated by ${company.name}, ${company.city}.

## Information on this website

The website describes our consulting, qualification, training and supply services. It is general information, not professional advice for your facility. Specific scope, deliverables and prices are confirmed in a written proposal or quotation.

## Enquiries

Submitting an enquiry does not create a contract. A contract exists only once both parties agree to a written proposal, quotation or purchase order.

## Intellectual property

The text, graphics, logos and design of this website belong to ${company.name}. You may not copy or reuse them without our written permission.

## Third-party standards and names

Names of regulators and standards (such as USFDA, EMA, INVIMA, PIC/S and ISO) are used only to describe the regulatory context of our work. They do not imply endorsement by those organisations.

## Liability

We take care to keep this website accurate, but we do not guarantee that it is complete or error-free. We are not liable for losses arising from reliance on general website content.

## Governing law

These terms are governed by the laws of India, and the courts of Ahmedabad, Gujarat have jurisdiction.

## Contact

Questions about these terms: ${company.email || `${siteUrl}/contact-us`}.
`;
}

export const markdownPages: Record<string, () => string> = {
  index: home,
  "about-us": about,
  services,
  products,
  "contact-us": contact,
  "privacy-policy": privacyText,
  "terms-of-use": termsText,
};

export function llmsTxt() {
  return `# SteriQual Solutions Pvt. Ltd.

> ${siteDescription}

SteriQual Solutions is a GMP technical consulting, qualification and training company based in ${company.city}. It serves pharmaceutical and biopharmaceutical manufacturers, semiconductor and microelectronics facilities, and controlled cleanroom environments, and supplies sterile and depyrogenated laboratory consumables and QC instruments. The team has faced and defended regulatory audits from the USFDA, EMA and INVIMA.

Every page is available as Markdown by adding \`.md\` to its path, or by requesting it with \`Accept: text/markdown\`.

## Pages

- [Home](${siteUrl}/index.md): overview, regulatory experience, service areas and approach
- [About Us](${siteUrl}/about-us.md): company background, vision, mission, values and leadership
- [Services](${siteUrl}/services.md): pharmaceutical GMP and investigation services, and ISO 14644 cleanroom tests
- [Laboratory Consumables and Equipment](${siteUrl}/products.md): sterile, non-sterile and depyrogenated consumables; QC instrument supply and custom design
- [Contact Us](${siteUrl}/contact-us.md): how to send an enquiry

## Agent tools

- [MCP server](${siteUrl}/mcp): Streamable HTTP endpoint with tools \`get_company_info\`, \`list_services\` and \`submit_enquiry\`
- [MCP server card](${siteUrl}/.well-known/mcp/server-card.json)

## Optional

- [Privacy Policy](${siteUrl}/privacy-policy.md)
- [Terms of Use](${siteUrl}/terms-of-use.md)
- [Sitemap](${siteUrl}/sitemap.xml)
`;
}

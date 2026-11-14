// Server-only: validates an enquiry and emails it through the company's SMTP mailbox (Hostinger).
// Used by the contact form (/api/enquiry) and the MCP submit_enquiry tool.
import nodemailer from "nodemailer";
import { company, siteUrl, enquiry as options } from "../site";
import { LOGO_PNG_BASE64 } from "./emailLogo";

export type Enquiry = {
  name: string;
  email: string;
  phone: string;
  company: string;
  sector: string;
  service: string;
  message: string;
  page: string;
};

export type SendResult = { ok: true; ref: string } | { ok: false; error: string; status: number };

const env = (k: string) => (process.env[k] ?? "").trim();

/** Turns raw form/JSON input into a clean enquiry. */
export function readEnquiry(get: (k: string) => unknown): Enquiry {
  const s = (k: string, max: number) => String(get(k) ?? "").trim().slice(0, max);
  return {
    name: s("name", 120),
    email: s("email", 254).toLowerCase(),
    phone: s("phone", 20),
    company: s("company", 160),
    sector: s("sector", 60),
    service: s("service", 80),
    message: s("message", 4000),
    page: s("page", 300),
  };
}

export function validate(d: Enquiry): string[] {
  const p: string[] = [];
  if (!d.name) p.push("Name is required");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d.email)) p.push("A valid email is required");
  if (!/^[0-9+()\- ]{7,20}$/.test(d.phone)) p.push("A valid phone number is required");
  if (!options.sectors.includes(d.sector)) p.push(`Sector must be one of: ${options.sectors.join(", ")}`);
  if (!options.services.includes(d.service)) p.push(`Service must be one of: ${options.services.join(", ")}`);
  if (d.message.length < 10) p.push("Message must be at least 10 characters");
  return p;
}

/** Simple in-memory limit: at most 5 enquiries per hour from one email or IP. */
const hits = new Map<string, number[]>();
export function rateLimited(...keys: string[]) {
  const now = Date.now();
  let blocked = false;
  for (const k of keys.filter(Boolean)) {
    const list = (hits.get(k) ?? []).filter((t) => now - t < 3_600_000);
    list.push(now);
    hits.set(k, list);
    if (list.length > 5) blocked = true;
  }
  if (hits.size > 5000) hits.clear();
  return blocked;
}

function makeRef() {
  const d = new Date(Date.now() + 5.5 * 3600_000); // IST
  const ymd = d.toISOString().slice(2, 10).replace(/-/g, "");
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase();
  return `SQ-${ymd}-${rand}`;
}

// ---------------------------------------------------------------- email templates
const esc = (s: string) =>
  String(s || "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#39;");
const nl2br = (s: string) => esc(s).replace(/\n/g, "<br>");

function row(label: string, valueHtml: string, shaded = false) {
  const bg = shaded ? "#F7F9FC" : "#FFFFFF";
  return `<tr><td style="width:34%;padding:11px 14px;font-size:13px;font-weight:bold;color:#0A3DAE;vertical-align:top;border-bottom:1px solid #E1E7F0;background:${bg};">${label}</td><td style="padding:11px 14px;font-size:14px;line-height:1.5;color:#0D1B3D;vertical-align:top;border-bottom:1px solid #E1E7F0;background:${bg};">${valueHtml}</td></tr>`;
}

function layout(title: string, intro: string, rows: string, footer: string) {
  const phone = company.phone ? ` &middot; ${esc(company.phone)}` : "";
  return `<!doctype html><html><body style="margin:0;padding:0;"><div style="margin:0;padding:24px 12px;background:#F2F6FB;font-family:Arial,Helvetica,sans-serif;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#FFFFFF;border-radius:12px;overflow:hidden;border:1px solid #E1E7F0;">
<tr><td style="background:#0D1B3D;padding:22px 28px;"><img src="cid:sqlogo" alt="SteriQual Solutions Pvt. Ltd." width="170" style="display:block;border:0;max-width:170px;height:auto;color:#FFFFFF;font-size:20px;font-weight:bold;"></td></tr>
<tr><td style="height:4px;background:#02A6E0;font-size:0;line-height:0;">&nbsp;</td></tr>
<tr><td style="padding:30px 28px 8px;"><h1 style="margin:0 0 12px;font-size:22px;line-height:1.3;color:#0D1B3D;">${title}</h1><div style="font-size:15px;line-height:1.6;color:#4A4A4A;">${intro}</div></td></tr>
<tr><td style="padding:12px 28px 8px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:1px solid #E1E7F0;border-radius:10px;overflow:hidden;">${rows}</table></td></tr>
<tr><td style="padding:16px 28px 28px;font-size:14px;line-height:1.6;color:#4A4A4A;">${footer}</td></tr>
<tr><td style="background:#0D1B3D;padding:16px 28px;font-size:12px;line-height:1.6;color:#A9B6CF;">${esc(company.name)} &middot; ${esc(company.address || company.city)}${phone}<br><a href="${siteUrl}" style="color:#8FD7F2;text-decoration:none;">${siteUrl.replace(/^https?:\/\//, "")}</a></td></tr>
</table></div></body></html>`;
}

export function companyEmail(ref: string, d: Enquiry) {
  const first = d.name.split(" ")[0];
  const rows =
    row("Reference", esc(ref), true) +
    row("Name", esc(d.name)) +
    row("Email", `<a href="mailto:${esc(d.email)}" style="color:#0A3DAE;">${esc(d.email)}</a>`, true) +
    row("Phone", `<a href="tel:${esc(d.phone.replace(/\s/g, ""))}" style="color:#0A3DAE;">${esc(d.phone)}</a>`) +
    row("Company", esc(d.company || "—"), true) +
    row("Sector", esc(d.sector)) +
    row("Service", esc(d.service), true) +
    row("Requirement", nl2br(d.message));
  const html = layout(
    "New website enquiry",
    `A new enquiry has arrived from the SteriQual website. Reply to this email to answer <b>${esc(d.name)}</b> directly.`,
    rows,
    `<a href="mailto:${esc(d.email)}?subject=${encodeURIComponent(`Re: Your enquiry ${ref}`)}" style="display:inline-block;background:#0A3DAE;color:#FFFFFF;text-decoration:none;font-weight:bold;padding:12px 20px;border-radius:6px;">Reply to ${esc(first)}</a>` +
      (d.page ? `<br><br><span style="font-size:12px;color:#6B7487;">Sent from: ${esc(d.page)}</span>` : ""),
  );
  const text = [
    `New website enquiry (${ref})`, "",
    `Name: ${d.name}`, `Email: ${d.email}`, `Phone: ${d.phone}`, `Company: ${d.company || "-"}`,
    `Sector: ${d.sector}`, `Service: ${d.service}`, "", "Requirement:", d.message,
  ].join("\n");
  const subject = `New enquiry: ${d.service} – ${d.name}${d.company ? ` (${d.company})` : ""} [${ref}]`;
  return { subject, html, text };
}

export function customerEmail(ref: string, d: Enquiry) {
  const first = d.name.split(" ")[0];
  const rows =
    row("Reference", esc(ref), true) +
    row("Sector", esc(d.sector)) +
    row("Service", esc(d.service), true) +
    row("Company", esc(d.company || "—")) +
    row("Your requirement", nl2br(d.message), true);
  const html = layout(
    `Thank you, ${esc(first)}!`,
    "Thank you for reaching out. Inquiry received. Our team will connect with you soon.<br><br>Here is a copy of what you sent us. Keep the reference number handy if you contact us about it.",
    rows,
    `If you need to add anything, simply reply to this email.<br><br>Warm regards,<br><b style="color:#0D1B3D;">Team ${esc(company.name)}</b><br><span style="color:#0A3DAE;">Your partner in compliance</span>`,
  );
  const text = [
    `Dear ${d.name},`, "",
    "Thank you for reaching out. Inquiry received. Our team will connect with you soon.", "",
    `Reference: ${ref}`, `Sector: ${d.sector}`, `Service: ${d.service}`, `Company: ${d.company || "-"}`, "",
    "Your requirement:", d.message, "",
    "If you need to add anything, simply reply to this email.", "",
    "Warm regards,", `Team ${company.name}`, siteUrl,
  ].join("\n");
  return { subject: `We’ve received your enquiry – ${company.name} [${ref}]`, html, text };
}

// ---------------------------------------------------------------- sending
export function mailConfigured() {
  return Boolean(env("SMTP_USER") && env("SMTP_PASS") && env("ENQUIRY_TO"));
}

function transport() {
  const port = Number(env("SMTP_PORT") || 465);
  return nodemailer.createTransport({
    host: env("SMTP_HOST") || "smtp.hostinger.com",
    port,
    secure: port === 465, // 465 = SSL; 587 = STARTTLS
    auth: { user: env("SMTP_USER"), pass: env("SMTP_PASS") },
    connectionTimeout: 15_000,
    greetingTimeout: 15_000,
    socketTimeout: 20_000,
  });
}

/** Saves the enquiry to the Google Sheet (the Apps Script only stores rows; it sends no email). */
async function logToSheet(ref: string, d: Enquiry) {
  const url = env("ENQUIRY_SHEET_WEBHOOK");
  if (!url) return;
  try {
    const body = new URLSearchParams({ ...d, ref, secret: env("ENQUIRY_SHEET_SECRET") });
    await fetch(url, { method: "POST", body, redirect: "follow", signal: AbortSignal.timeout(8000) });
  } catch (e) {
    console.error("Sheet log failed:", e);
  }
}

export async function sendEnquiry(d: Enquiry): Promise<SendResult> {
  const problems = validate(d);
  if (problems.length) return { ok: false, error: problems.join(". ") + ".", status: 400 };
  if (!mailConfigured()) {
    return { ok: false, error: "Online enquiries aren’t switched on yet. Please contact the SteriQual team directly.", status: 503 };
  }

  const ref = makeRef();
  const fromAddress = env("SMTP_FROM") || env("SMTP_USER");
  const companyTo = env("ENQUIRY_TO");
  const replyToCompany = env("REPLY_TO") || companyTo.split(",")[0].trim();
  const logo = { filename: "steriqual-logo.png", content: Buffer.from(LOGO_PNG_BASE64, "base64"), cid: "sqlogo", contentType: "image/png" };
  const t = transport();

  // 1) Alert to the company. If this fails, the enquiry is not considered sent.
  const a = companyEmail(ref, d);
  try {
    await t.sendMail({
      from: { name: "SteriQual Website", address: fromAddress },
      to: companyTo,
      ...(env("ENQUIRY_CC") ? { cc: env("ENQUIRY_CC") } : {}),
      replyTo: { name: d.name, address: d.email },
      subject: a.subject,
      html: a.html,
      text: a.text,
      attachments: [logo],
    });
  } catch (e) {
    console.error("Company alert email failed:", e);
    return { ok: false, error: "Your enquiry wasn’t sent because our mail server didn’t respond. Please try again in a few minutes.", status: 502 };
  }

  // 2) Thank-you to the customer. A failure here is logged but the enquiry still counts as received.
  const c = customerEmail(ref, d);
  try {
    await t.sendMail({
      from: { name: company.name, address: fromAddress },
      to: { name: d.name, address: d.email },
      replyTo: replyToCompany,
      subject: c.subject,
      html: c.html,
      text: c.text,
      attachments: [logo],
    });
  } catch (e) {
    console.error("Customer confirmation email failed:", e);
  }

  await logToSheet(ref, d);
  return { ok: true, ref };
}

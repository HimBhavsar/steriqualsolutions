"use client";
import { useRef, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { enquiry } from "../site";

type Status = { kind: "idle" | "ok" | "error"; text: string };
type Draft = { sector: string; service: string; message: string; name: string; company: string; email: string };
const THANKS = "Thank you for reaching out. Inquiry received. Our team will connect with you soon.";

export default function ContactForm() {
  const params = useSearchParams();
  const preset = enquiry.services.includes(params.get("service") ?? "") ? (params.get("service") as string) : "";
  const [status, setStatus] = useState<Status>({ kind: "idle", text: "" });
  const [busy, setBusy] = useState(false);
  const [ref, setRef] = useState("");
  const [step, setStep] = useState(1);
  const [draft, setDraft] = useState<Draft>({ sector: "", service: preset, message: "", name: "", company: "", email: "" });
  const stepOne = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  function read() {
    const f = formRef.current;
    if (!f) return;
    const d = new FormData(f);
    setDraft({
      sector: String(d.get("sector") ?? ""),
      service: String(d.get("service") ?? ""),
      message: String(d.get("message") ?? ""),
      name: String(d.get("name") ?? ""),
      company: String(d.get("company") ?? ""),
      email: String(d.get("email") ?? ""),
    });
  }

  function next() {
    const box = stepOne.current;
    if (!box) return;
    const fields = Array.from(box.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>("input, textarea"));
    const bad = fields.find((el) => !el.checkValidity());
    if (bad) {
      bad.reportValidity();
      return;
    }
    setStep(2);
    requestAnimationFrame(() => formRef.current?.querySelector<HTMLInputElement>('input[name="name"]')?.focus());
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (step === 1) return next();
    setStatus({ kind: "idle", text: "" });
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    if (data.get("website")) {
      setStatus({ kind: "ok", text: THANKS });
      return;
    }
    setBusy(true);
    try {
      data.append("page", window.location.href);
      const response = await fetch("/api/enquiry", { method: "POST", body: data, headers: { Accept: "application/json" } });
      const json = (await response.json().catch(() => ({}))) as { ok?: boolean; ref?: string; error?: string };
      if (!response.ok || !json.ok) {
        setStatus({ kind: "error", text: json.error || "Your enquiry wasn’t sent. Please try again in a few minutes." });
        return;
      }
      setRef(json.ref ?? "");
      setStatus({ kind: "ok", text: THANKS });
    } catch {
      setStatus({ kind: "error", text: "Your enquiry wasn’t sent. Check your connection and try again." });
    } finally {
      setBusy(false);
    }
  }

  function reset() {
    formRef.current?.reset();
    setDraft({ sector: "", service: "", message: "", name: "", company: "", email: "" });
    setStep(1);
    setStatus({ kind: "idle", text: "" });
  }

  const empty = <em className="muted">Not added yet</em>;
  const done = status.kind === "ok";

  return (
    <div className="enquiry">
      {done ? (
        <div className="contact-form form-done" role="status" aria-live="polite">
          <span className="done-icon" aria-hidden="true">
            <svg viewBox="0 0 24 24">
              <path d="M5 12.5l4.5 4.5L19 7.5" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </span>
          <h3>Enquiry received</h3>
          <p>{status.text}</p>
          {ref && (
            <p className="form-privacy">
              Your reference number is <b>{ref}</b>.
            </p>
          )}
          {draft.email && (
            <p className="form-privacy">
              We’ve also emailed a confirmation to <b>{draft.email}</b>.
            </p>
          )}
          <button className="btn btn-outline" type="button" onClick={reset}>
            Send another enquiry
          </button>
        </div>
      ) : (
        <form
          ref={formRef}
          className="contact-form"
          onSubmit={submit}
          onInput={read}
          onChange={read}
          {...({
            toolname: "submit_enquiry_form",
            tooldescription:
              "Send an enquiry to SteriQual Solutions about GMP consulting, cleanroom or equipment qualification, training, mock audits, lab consumables or equipment supply.",
          } as Record<string, string>)}
        >
          <div className="form-head">
            <h3>Send an enquiry</h3>
            <ol className="stepper" aria-label="Form progress">
              <li className={step === 1 ? "is-current" : "is-done"} aria-current={step === 1 ? "step" : undefined}>
                <span>1</span> Your requirement
              </li>
              <li className={step === 2 ? "is-current" : ""} aria-current={step === 2 ? "step" : undefined}>
                <span>2</span> Your details
              </li>
            </ol>
            <div className="progress" aria-hidden="true">
              <i style={{ width: step === 1 ? "50%" : "100%" }} />
            </div>
          </div>

          <div ref={stepOne} className="form-step" hidden={step !== 1}>
            <fieldset className="choice">
              <legend>Industry sector</legend>
              <div className="pills">
                {enquiry.sectors.map((s, i) => (
                  <label key={s} className="pill">
                    <input type="radio" name="sector" {...({ toolparamdescription: "Industry sector of the enquirer." } as Record<string, string>)} value={s} required={i === 0} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <fieldset className="choice">
              <legend>Service required</legend>
              <div className="pills">
                {enquiry.services.map((s, i) => (
                  <label key={s} className="pill">
                    <input type="radio" name="service" {...({ toolparamdescription: "Service the enquirer needs." } as Record<string, string>)} value={s} required={i === 0} defaultChecked={s === preset} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
            </fieldset>
            <label className="field">
              <span>How can we help?</span>
              <textarea
                name="message" {...({ toolparamdescription: "The requirement: facility, activity needed and timelines." } as Record<string, string>)}
                required
                minLength={10}
                maxLength={4000}
                rows={5}
                placeholder="Tell us about your facility, the activity you need support with, and any timelines."
              />
            </label>
            <div className="form-foot">
              <button className="btn btn-ribbon" type="button" onClick={next}>
                Continue to your details
              </button>
              <p className="form-privacy">Step 1 of 2</p>
            </div>
          </div>

          <div className="form-step" hidden={step !== 2}>
            <div className="field-row">
              <label className="field">
                <span>Full name</span>
                <input autoComplete="name" name="name" {...({ toolparamdescription: "Full name of the person enquiring." } as Record<string, string>)} required={step === 2} maxLength={120} placeholder="Your name" />
              </label>
              <label className="field">
                <span>Work email</span>
                <input autoComplete="email" name="email" {...({ toolparamdescription: "Work email; a confirmation is sent here." } as Record<string, string>)} type="email" required={step === 2} maxLength={254} placeholder="you@company.com" />
              </label>
            </div>
            <div className="field-row">
              <label className="field">
                <span>Phone number</span>
                <input
                  autoComplete="tel"
                  name="phone" {...({ toolparamdescription: "Phone number with country code." } as Record<string, string>)}
                  type="tel"
                  inputMode="tel"
                  required={step === 2}
                  pattern="[0-9+()\- ]{7,20}"
                  title="Use digits, spaces, +, - or brackets"
                  maxLength={20}
                  placeholder="+91"
                />
              </label>
              <label className="field">
                <span>
                  Company name <em>Optional</em>
                </span>
                <input autoComplete="organization" name="company" {...({ toolparamdescription: "Company name (optional)." } as Record<string, string>)} maxLength={160} placeholder="Company name" />
              </label>
            </div>
            <label className="honeypot" aria-hidden="true">
              Leave this field empty
              <input tabIndex={-1} autoComplete="off" name="website" />
            </label>
            <div className="form-foot">
              <button className="btn btn-outline" type="button" onClick={() => setStep(1)}>
                Back
              </button>
              <button className="btn btn-ribbon" type="submit" disabled={busy}>
                {busy ? "Sending enquiry…" : "Send enquiry"}
              </button>
            </div>
            <p className="form-privacy">Your details will only be used to respond to your enquiry.</p>
            {status.kind === "error" && (
              <p className="form-status error" role="alert">
                {status.text}
              </p>
            )}
          </div>
        </form>
      )}

      <aside className="enquiry-side" aria-label="Your enquiry so far">
        <div className="sheet live-sheet">
          <div className="sheet-head">
            <img src="/brand/logo-icon.svg" alt="" width="34" height="34" />
            <div>
              <span>Live summary</span>
              <b>Your enquiry</b>
            </div>
            <i className={`live-dot${done ? " is-done" : ""}`} aria-hidden="true" />
          </div>
          <dl className="sheet-rows">
            <div>
              <dt>Sector</dt>
              <dd>{draft.sector || empty}</dd>
            </div>
            <div>
              <dt>Service</dt>
              <dd>{draft.service || empty}</dd>
            </div>
            <div>
              <dt>Requirement</dt>
              <dd>{draft.message ? (draft.message.length > 110 ? draft.message.slice(0, 110) + "…" : draft.message) : empty}</dd>
            </div>
            <div>
              <dt>Contact</dt>
              <dd>{draft.name ? [draft.name, draft.company].filter(Boolean).join(", ") : empty}</dd>
            </div>
          </dl>
        </div>
        <div className="next-steps">
          <h3>What happens after you send it</h3>
          <ol>
            <li>
              <b>We review your requirement</b>
              <span>A specialist reads your enquiry and checks the scope.</span>
            </li>
            <li>
              <b>We get in touch</b>
              <span>We call or email to understand your facility and timelines.</span>
            </li>
            <li>
              <b>You receive a tailored proposal</b>
              <span>A clear plan, quote or supply offer built around your system.</span>
            </li>
          </ol>
        </div>
      </aside>
    </div>
  );
}

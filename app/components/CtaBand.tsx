import Link from "next/link";
import { Ribbon } from "./Illustrations";

export default function CtaBand({
  title,
  text,
  button = "Get expert advice",
}: {
  title: string;
  text?: string;
  button?: string;
}) {
  return (
    <section className="cta">
      <div className="wrap cta-inner">
        <div>
          <h2 className="display">{title}</h2>
          {text && <p>{text}</p>}
        </div>
        <Link className="btn btn-light" href="/contact-us">
          {button}
        </Link>
      </div>
      <Ribbon className="cta-ribbon" />
    </section>
  );
}

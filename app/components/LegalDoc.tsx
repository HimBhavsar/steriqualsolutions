/** Renders the simple Markdown used for the legal pages (headings, lists, bold, paragraphs). */
function inline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((p, i) => (p.startsWith("**") ? <b key={i}>{p.slice(2, -2)}</b> : p));
}

export default function LegalDoc({ md }: { md: string }) {
  // Drop the title, summary quote and canonical line (shown by the page hero instead).
  const body = md.split("\n").filter((l) => !l.startsWith("# ") && !l.startsWith("> ") && !l.startsWith("Canonical:"));
  const blocks: React.ReactNode[] = [];
  let list: string[] = [];
  const flush = () => {
    if (list.length) blocks.push(<ul key={`u${blocks.length}`}>{list.map((li, i) => <li key={i}>{inline(li)}</li>)}</ul>);
    list = [];
  };
  for (const line of body) {
    if (line.startsWith("- ")) { list.push(line.slice(2)); continue; }
    flush();
    if (line.startsWith("## ")) blocks.push(<h2 key={`h${blocks.length}`}>{line.slice(3)}</h2>);
    else if (line.trim()) blocks.push(<p key={`p${blocks.length}`}>{inline(line)}</p>);
  }
  flush();
  return <div className="legal">{blocks}</div>;
}

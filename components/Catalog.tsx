"use client";

import { useMemo, useState } from "react";
import type { DesignEntry } from "../data/designs";
import { SectionLabel } from "./SiteChrome";

export function Catalog({ designs, families }: { designs: DesignEntry[]; families: string[] }) {
  const [family, setFamily] = useState("All");
  const [query, setQuery] = useState("");
  const shown = useMemo(() => designs.filter((design) => {
    const familyMatch = family === "All" || design.family === family;
    const haystack = `${design.title} ${design.subtitle} ${design.tags.join(" ")}`.toLowerCase();
    return familyMatch && haystack.includes(query.toLowerCase());
  }), [designs, family, query]);

  return (
    <section className="explore-section" id="explore">
      <SectionLabel title="DESIGN LANGUAGE LIBRARY" meta={`${String(shown.length).padStart(2, "0")} / 100`} />
      <div className="catalog-controls">
        <div className="family-tabs">{families.map((item) => <button type="button" key={item} className={family === item ? "active" : ""} onClick={() => setFamily(item)}>{item}</button>)}</div>
        <label className="search-box"><span>⌕</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search styles, use cases, or keywords" aria-label="Search designs" /></label>
      </div>
      <div className="design-grid">
        {shown.map((design) => {
          const card = <>
            <div className={`design-preview preview-${design.preview}`}>
              <div className="preview-ui"><i /><i /><i /></div>
              <span className="design-number">{design.id}</span>
              {design.status === "live" ? <span className="live-badge">LIVE</span> : <span className="queue-badge">IN QUEUE</span>}
              <div className="preview-title"><small>{design.family}</small><strong>{design.title}</strong></div>
            </div>
            <div className="card-info"><div><h3>{design.title}</h3><p>{design.subtitle}</p></div><span>{design.status === "live" ? "VIEW DESIGN ↗" : "COMING"}</span></div>
            <div className="tag-row">{design.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          </>;
          const className = `design-card ${design.status === "live" ? "is-featured" : "is-queued"}`;
          return design.href ? <a className={className} href={design.href} key={design.id}>{card}</a> : <article className={className} key={design.id}>{card}</article>;
        })}
      </div>
      {shown.length === 0 && <div className="empty-state">No matching design language. Try another keyword.</div>}
    </section>
  );
}

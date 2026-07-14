import type { ReactNode } from "react";

import { CopyPrompt } from "./CopyPrompt";
import { SectionLabel } from "./SiteChrome";

export type ProductLoopStep = {
  label: string;
  title: string;
  description: string;
};

export type SourceArtifact = {
  kind: string;
  title: string;
  attribution: string;
  attributionUrl?: string;
  description: string;
  content: string;
  facts: string[];
  copyLabel?: string;
};

export type TransformationNote = {
  label: string;
  title: string;
  description: string;
};

export type PromptStatus = {
  version: string;
  state: string;
  note: string;
};

export type ValidationItem = {
  label: string;
  value: string;
  state: "passed" | "pending" | "documented";
};

export function ProductModelSection({
  problem,
  promise,
  outcome,
  loop,
}: {
  problem: string;
  promise: string;
  outcome: string;
  loop: ProductLoopStep[];
}) {
  return (
    <section className="product-model-section">
      <SectionLabel index="01" title="PRODUCT MODEL" meta="WHY IT EXISTS" />
      <div className="product-model-lead">
        <div>
          <span>STARTING PROBLEM</span>
          <h2>{problem}</h2>
        </div>
        <div>
          <span>PRODUCT PROMISE</span>
          <p>{promise}</p>
          <b>{outcome}</b>
        </div>
      </div>
      <div className="product-loop" aria-label="Product loop">
        {loop.map((step, index) => (
          <article key={step.label}>
            <small>{String(index + 1).padStart(2, "0")} · {step.label}</small>
            <h3>{step.title}</h3>
            <p>{step.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SourcePromptSection({
  source,
  prompt,
  promptStatus,
  transformations,
  title,
  description,
}: {
  source: SourceArtifact;
  prompt: string;
  promptStatus: PromptStatus;
  transformations: TransformationNote[];
  title: ReactNode;
  description: string;
}) {
  return (
    <section className="prompt-section">
      <SectionLabel index="03" title="SOURCE & PROMPT" meta="ORIGINAL + DISTILLED" />
      <div className="prompt-lead">
        <div>
          <span>REUSE CONTRACT</span>
          <h2>{title}</h2>
        </div>
        <div>
          <p>{description}</p>
          <div className="prompt-status">
            <span>{promptStatus.version}</span>
            <b>{promptStatus.state}</b>
            <p>{promptStatus.note}</p>
          </div>
        </div>
      </div>

      <div className="prompt-comparison">
        <article className="artifact-panel artifact-source">
          <header>
            <span>ORIGINAL INPUT</span>
            <b>{source.kind}</b>
          </header>
          <h3>{source.title}</h3>
          <p>{source.description}</p>
          <ul>
            {source.facts.map((fact) => <li key={fact}>{fact}</li>)}
          </ul>
          <pre><code>{source.content}</code></pre>
          <footer>
            {source.attributionUrl ? <a href={source.attributionUrl} target="_blank" rel="noreferrer">{source.attribution} ↗</a> : <span>{source.attribution}</span>}
            <CopyPrompt prompt={source.content} idleLabel={source.copyLabel || "COPY ORIGINAL"} copiedLabel="ORIGINAL COPIED ✓" />
          </footer>
        </article>

        <article className="artifact-panel artifact-distilled">
          <header>
            <span>OPTIMIZED PROMPT</span>
            <b>{promptStatus.version}</b>
          </header>
          <h3>Productized design instructions</h3>
          <p>Written after the working product was built, then organized into goal, visual language, layout, interaction, motion, accessibility, use cases, and limits.</p>
          <pre><code>{prompt}</code></pre>
          <footer>
            <span>{promptStatus.state}</span>
            <CopyPrompt prompt={prompt} />
          </footer>
        </article>
      </div>

      <div className="transformation-grid" aria-label="Transformation notes">
        {transformations.map((item) => (
          <article key={item.label}>
            <small>{item.label}</small>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function UseCaseSection({
  useCases,
  avoidCases,
}: {
  useCases: string[];
  avoidCases: string[];
}) {
  return (
    <section className="usage-section">
      <SectionLabel index="04" title="WHEN TO USE" meta="FIT + LIMITS" />
      <div className="usage-columns">
        <div><h3>Use it for</h3><ul>{useCases.map((item) => <li key={item}>{item}</li>)}</ul></div>
        <div><h3>Avoid it for</h3><ul>{avoidCases.map((item) => <li key={item}>{item}</li>)}</ul></div>
      </div>
    </section>
  );
}

export function EvidenceSection({
  validation,
  sourceNote,
  reuseBoundary,
}: {
  validation: ValidationItem[];
  sourceNote: ReactNode;
  reuseBoundary: string;
}) {
  return (
    <section className="evidence-section">
      <SectionLabel index="05" title="EVIDENCE & REUSE" meta="STATUS + PROVENANCE" />
      <div className="evidence-grid">
        <div className="validation-ledger">
          {validation.map((item) => (
            <div key={item.label}>
              <span>{item.label}</span>
              <b data-state={item.state}>{item.value}</b>
            </div>
          ))}
        </div>
        <div className="provenance-note">
          <span>SOURCE NOTE</span>
          <p>{sourceNote}</p>
          <span>REUSE BOUNDARY</span>
          <p>{reuseBoundary}</p>
        </div>
      </div>
    </section>
  );
}

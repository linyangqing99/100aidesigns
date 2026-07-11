import type { ReactNode } from "react";
import Link from "next/link";

const GITHUB_URL = "https://github.com/linyangqing99/100aidesigns";
const REFERENCE_URL = "https://21st.dev";

export type SiteHeaderProps = {
  context?: "home" | "detail";
};

/**
 * Shared collection header. `context` keeps fragment links valid on both the
 * home page and nested design pages without requiring client-side routing.
 */
export function SiteHeader({ context = "home" }: SiteHeaderProps) {
  const homeHref = context === "home" ? "#top" : "/";
  const indexHref = context === "home" ? "#explore" : "/#explore";
  const methodHref = context === "home" ? "#system" : "/#system";

  return (
    <header className="site-header">
      <Link className="wordmark" href={homeHref} aria-label="100 AI Designs home">
        <b>100</b>
        <span>
          AI
          <br />
          DESIGNS
        </span>
      </Link>

      <nav aria-label="Primary navigation">
        <Link href={indexHref}>Designs</Link>
        <Link href={methodHref}>Method</Link>
        <a href={REFERENCE_URL} target="_blank" rel="noreferrer">
          Reference ↗
        </a>
      </nav>

      <Link className="mobile-index-link" href={indexHref}>
        INDEX ↓
      </Link>

      <a className="github-pill" href={GITHUB_URL} target="_blank" rel="noreferrer">
        GITHUB ↗
      </a>
    </header>
  );
}

export type SiteFooterProps = {
  progressText: string;
};

export function SiteFooter({ progressText }: SiteFooterProps) {
  return (
    <footer className="site-footer">
      <div className="wordmark footer-mark" aria-label="100 AI Designs">
        <b>100</b>
        <span>
          AI
          <br />
          DESIGNS
        </span>
      </div>
      <p>
        Inspired by the discovery model of{" "}
        <a href={REFERENCE_URL} target="_blank" rel="noreferrer">
          21st.dev
        </a>
        . Built independently as an AI design research archive.
      </p>
      <span>{progressText}</span>
    </footer>
  );
}

export type DetailHeaderProps = {
  designId: string;
  liveUrl: string;
  total?: number;
  liveLabel?: string;
};

export function DetailHeader({
  designId,
  liveUrl,
  total = 100,
  liveLabel = "OPEN LIVE EXPERIENCE",
}: DetailHeaderProps) {
  return (
    <header className="detail-header">
      <Link href="/#explore">← ALL DESIGNS</Link>
      <span>
        DESIGN {designId} / {total}
      </span>
      <a href={liveUrl} target="_blank" rel="noreferrer">
        {liveLabel} ↗
      </a>
    </header>
  );
}

export type DetailFooterProps = {
  designId: string;
  total?: number;
  nextLabel?: string;
  nextHref?: string;
};

export function DetailFooter({
  designId,
  total = 100,
  nextLabel = "NEXT: EDITORIAL GRID →",
  nextHref,
}: DetailFooterProps) {
  const next = nextHref ? <Link href={nextHref}>{nextLabel}</Link> : <span>{nextLabel}</span>;

  return (
    <footer className="detail-footer">
      <Link href="/#explore">← DESIGN LIBRARY</Link>
      <span>
        {designId} / {total}
      </span>
      {next}
    </footer>
  );
}

export type SectionLabelProps = {
  title: string;
  index?: string;
  meta?: ReactNode;
  id?: string;
  className?: string;
};

export function SectionLabel({
  title,
  index,
  meta,
  id,
  className = "",
}: SectionLabelProps) {
  const classes = ["section-label", className].filter(Boolean).join(" ");

  return (
    <div className={classes} id={id}>
      {index ? <span>{index}</span> : null}
      <p>{title}</p>
      {meta ? <b>{meta}</b> : null}
    </div>
  );
}

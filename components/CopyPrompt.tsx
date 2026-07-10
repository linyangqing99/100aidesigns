"use client";

import { useState } from "react";

export function CopyPrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(prompt);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return <button type="button" className="copy-button" onClick={copy}>{copied ? "已复制 ✓" : "复制提示词"}</button>;
}

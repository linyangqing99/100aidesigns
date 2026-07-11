"use client";

import { useState } from "react";

export function CopyPrompt({ prompt }: { prompt: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    const textArea = document.createElement("textarea");
    textArea.value = prompt;
    textArea.setAttribute("readonly", "");
    textArea.style.position = "fixed";
    textArea.style.opacity = "0";
    document.body.appendChild(textArea);
    textArea.select();
    let didCopy = document.execCommand("copy");
    textArea.remove();
    if (!didCopy) {
      try {
        await navigator.clipboard.writeText(prompt);
        didCopy = true;
      } catch {
        didCopy = false;
      }
    }
    if (!didCopy) return;
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return <button type="button" className="copy-button" onClick={copy}>{copied ? "COPIED ✓" : "COPY PROMPT"}</button>;
}

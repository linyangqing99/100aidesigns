"use client";

import { useState } from "react";

type CopyPromptProps = {
  prompt: string;
  idleLabel?: string;
  copiedLabel?: string;
  errorLabel?: string;
};

export function CopyPrompt({
  prompt,
  idleLabel = "COPY PROMPT",
  copiedLabel = "COPIED ✓",
  errorLabel = "COPY FAILED · TRY AGAIN",
}: CopyPromptProps) {
  const [state, setState] = useState<"idle" | "copied" | "error">("idle");
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
    if (!didCopy) {
      setState("error");
      window.setTimeout(() => setState("idle"), 2400);
      return;
    }
    setState("copied");
    window.setTimeout(() => setState("idle"), 1800);
  };
  const label = state === "copied" ? copiedLabel : state === "error" ? errorLabel : idleLabel;
  return <button type="button" className="copy-button" data-copy-state={state} onClick={copy}>{label}</button>;
}

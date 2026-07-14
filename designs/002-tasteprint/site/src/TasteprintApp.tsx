import { useEffect, useMemo, useRef, useState } from "react";

type GalleryItem = {
  id: string;
  src: string;
  label: string;
  note: string;
  traits: string[];
  palette: string[];
};

const items: GalleryItem[] = [
  { id: "1", src: "/art/quiet-voltage.svg", label: "Quiet Voltage", note: "WARM LIGHT · HARD EDGE", traits: ["restrained", "tactile", "architectural"], palette: ["#E9E3D6", "#2B2A26", "#C04D2D"] },
  { id: "2", src: "/art/concrete-poem.svg", label: "Concrete Poem", note: "MONOLITH · OPEN SKY", traits: ["monumental", "precise", "quiet"], palette: ["#B6B5AD", "#D9D8D0", "#30312E"] },
  { id: "3", src: "/art/soft-rebellion.svg", label: "Soft Rebellion", note: "PETAL · SATURATION · GRAIN", traits: ["romantic", "saturated", "human"], palette: ["#E9A5B0", "#F0D9D4", "#8D3049"] },
  { id: "4", src: "/art/night-signal.svg", label: "Night Signal", note: "DARK FIELD · COLD GLOW", traits: ["cinematic", "mysterious", "electric"], palette: ["#0B151B", "#466470", "#D7E6E5"] },
  { id: "5", src: "/art/after-rain.svg", label: "After Rain", note: "ORGANIC · DISTANT · STILL", traits: ["organic", "reflective", "atmospheric"], palette: ["#6F7D67", "#C5C4AE", "#293229"] },
  { id: "6", src: "/art/open-structure.svg", label: "Open Structure", note: "RHYTHM · SCALE · AIR", traits: ["structural", "airy", "graphic"], palette: ["#DAD7CB", "#7D857D", "#20231F"] },
  { id: "7", src: "/art/useful-warmth.svg", label: "Useful Warmth", note: "UTILITY · WOOD · DAYLIGHT", traits: ["useful", "warm", "lived-in"], palette: ["#D5B589", "#EEE7D9", "#4B4135"] },
  { id: "8", src: "/art/human-system.svg", label: "Human System", note: "ORDER · MOTION · TRACE", traits: ["collaborative", "systematic", "alive"], palette: ["#C8C4B6", "#5A665F", "#E46B3C"] },
];

const layouts = ["northWest", "northEast", "midWest", "midEast", "southWest", "southMidLeft", "southMidRight", "southEast"];

function shuffle<T>(values: T[]) {
  const next = [...values];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const target = Math.floor(Math.random() * (index + 1));
    [next[index], next[target]] = [next[target], next[index]];
  }
  return next;
}

export function TasteprintApp() {
  const [orderedItems, setOrderedItems] = useState(items);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [copyState, setCopyState] = useState<"idle" | "copied" | "error">("idle");
  const [announcement, setAnnouncement] = useState("Choose three visual studies.");
  const dialogRef = useRef<HTMLElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const wasResultOpen = useRef(false);

  const selectedItems = selectedIds
    .map((id) => items.find((item) => item.id === id))
    .filter((item): item is GalleryItem => Boolean(item));

  const result = useMemo(() => {
    const traits = Array.from(new Set(selectedItems.flatMap((item) => item.traits))).slice(0, 5);
    const palette = selectedItems.flatMap((item) => item.palette).slice(0, 5);
    const name = selectedItems.length
      ? `${selectedItems[0].label} / ${selectedItems[1]?.label ?? "Study"}`
      : "Untitled direction";
    const prompt = `Create a ${traits.join(", ")} visual direction inspired by ${selectedItems.map((item) => item.label).join(", ")}. Use a restrained palette built from ${palette.join(", ")}. Pair expressive editorial typography with clean functional labels. Let imagery carry the emotion, keep the layout asymmetrical with generous breathing room, and use slow focus transitions to reveal hierarchy. Avoid generic gradient-heavy UI, decorative glass cards, and motion without feedback value.`;
    return { traits, palette, name, prompt };
  }, [selectedItems]);

  useEffect(() => {
    if (!showResult) return;
    const dialog = dialogRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setShowResult(false);
        return;
      }
      if (event.key !== "Tab" || !dialog) return;
      const controls = Array.from(dialog.querySelectorAll<HTMLElement>("button, a[href], [tabindex]:not([tabindex='-1'])"));
      const first = controls[0];
      const last = controls.at(-1);
      if (!first || !last) return;
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [showResult]);

  useEffect(() => {
    if (showResult) {
      wasResultOpen.current = true;
      return;
    }
    if (!wasResultOpen.current) return;
    wasResultOpen.current = false;
    const timer = window.setTimeout(() => triggerRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [showResult]);

  function toggleSelection(id: string) {
    setCopyState("idle");
    setSelectedIds((current) => {
      if (current.includes(id)) {
        const next = current.filter((item) => item !== id);
        setAnnouncement(`Removed selection. ${next.length} of 3 kept.`);
        return next;
      }
      if (current.length === 3) {
        setAnnouncement("Three studies are already selected. Remove one before adding another.");
        return current;
      }
      const next = [...current, id];
      setAnnouncement(next.length === 3 ? "Three studies selected. Your tasteprint is ready." : `${next.length} of 3 studies selected.`);
      return next;
    });
  }

  async function copyPrompt() {
    setCopyState("idle");
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(result.prompt);
      } else {
        const field = document.createElement("textarea");
        field.value = result.prompt;
        field.style.position = "fixed";
        field.style.opacity = "0";
        document.body.appendChild(field);
        field.select();
        const copied = document.execCommand("copy");
        field.remove();
        if (!copied) throw new Error("Copy command failed");
      }
      setCopyState("copied");
      window.setTimeout(() => setCopyState("idle"), 1800);
    } catch {
      setCopyState("error");
    }
  }

  return (
    <div className="studio">
      <div className="appBody" inert={showResult || undefined} aria-hidden={showResult || undefined}>
        <header className="topbar">
          <a className="brand" href="#top" aria-label="Tasteprint home">
            <span className="brandMark">T/P</span>
            <span>TASTEPRINT<small>VISUAL DIRECTION LAB</small></span>
          </a>
          <div className="step" aria-label={`Step ${showResult ? 3 : selectedIds.length === 3 ? 2 : 1} of 3`}>
            <span>01</span><i /><span className={selectedIds.length === 3 ? "stepActive" : ""}>02</span><i /><span className={showResult ? "stepActive" : ""}>03</span>
          </div>
          <a className="exit" href="https://100ai.design/designs/002-tasteprint">100 AI DESIGNS ↗</a>
        </header>

        <main id="top">
          <section className="intro">
            <p className="eyebrow">AN INSTINCT, MADE LEGIBLE · CASE 002</p>
            <h1>Your eye already knows.<br /><em>Make it legible.</em></h1>
            <p className="lede">Choose three images you would save without overthinking. We’ll turn the pattern between them into a usable creative direction.</p>
          </section>

          <section className="workspace" aria-label="Visual taste selection">
            <aside className="noteCard noteLeft">
              <span>HOW IT WORKS</span>
              <p>Don’t pick what looks impressive. Pick what feels like <em>you</em>.</p>
              <small>HOVER OR FOCUS<br />PRESS TO KEEP</small>
            </aside>
            <aside className="noteCard noteRight">
              <span>YOUR SIGNAL</span>
              <strong>{selectedIds.length}<small>/3</small></strong>
              <p>{selectedIds.length === 0 ? "Waiting for your first instinct." : selectedIds.length < 3 ? "A direction is beginning to form." : "Your tasteprint is ready to read."}</p>
            </aside>

            <div className="galleryGrid">
              {orderedItems.map((item, index) => {
                const selectionIndex = selectedIds.indexOf(item.id);
                const selected = selectionIndex > -1;
                const dimmed = Boolean(hoveredId && hoveredId !== item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={["imageCard", layouts[index], dimmed ? "dimmed" : "", selected ? "selected" : ""].filter(Boolean).join(" ")}
                    aria-label={`${selected ? "Remove" : "Select"} ${item.label}: ${item.note}`}
                    aria-pressed={selected}
                    onClick={() => toggleSelection(item.id)}
                    onFocus={() => setHoveredId(item.id)}
                    onBlur={() => setHoveredId(null)}
                    onPointerEnter={(event) => event.pointerType !== "touch" && setHoveredId(item.id)}
                    onPointerLeave={() => setHoveredId(null)}
                  >
                    <img src={item.src} alt="" />
                    <span className="imageShade" />
                    <span className="cardIndex">{item.id.padStart(2, "0")}</span>
                    {selected ? <span className="pickIndex">0{selectionIndex + 1}</span> : null}
                    <span className="cardLabel"><b>{item.label}</b><small>{item.note}</small></span>
                  </button>
                );
              })}
            </div>
          </section>

          <button className="shuffleButton" type="button" onClick={() => setOrderedItems((current) => shuffle(current))}>SHUFFLE THE DECK ↻</button>
        </main>

        <aside className="selectionDock" aria-label="Selected images">
          <div className="selectionCopy"><span>YOUR THREE</span><p>{selectedItems.length ? selectedItems.map((item) => item.label).join(" · ") : "Nothing selected yet"}</p></div>
          <div className="slots" aria-hidden="true">
            {[0, 1, 2].map((index) => {
              const item = selectedItems[index];
              return <span key={index} className={item ? "filledSlot" : ""} style={item ? { backgroundImage: `url(${item.src})` } : undefined}>{item ? `0${index + 1}` : "+"}</span>;
            })}
          </div>
          <button ref={triggerRef} className="buildButton" type="button" disabled={selectedIds.length !== 3} onClick={() => setShowResult(true)}>READ MY TASTEPRINT <span>↗</span></button>
        </aside>
        <p className="srOnly" aria-live="polite">{announcement}</p>
      </div>

      {showResult ? (
        <div className="resultBackdrop" onMouseDown={(event) => event.target === event.currentTarget && setShowResult(false)}>
          <section ref={dialogRef} className="resultCard" role="dialog" aria-modal="true" aria-labelledby="tasteprint-title" tabIndex={-1}>
            <div className="resultHeader"><span>TASTEPRINT · 2026</span><button type="button" onClick={() => setShowResult(false)}>CLOSE ×</button></div>
            <div className="resultGrid">
              <div className="resultLead">
                <p>YOUR VISUAL DIRECTION</p>
                <h2 id="tasteprint-title">{result.name}</h2>
                <blockquote>“{result.traits.slice(0, 3).join(". ")}.<br />With one deliberate interruption.”</blockquote>
                <div className="traitList">{result.traits.map((trait) => <span key={trait}>{trait}</span>)}</div>
              </div>
              <div className="resultRecipe">
                <div className="palette">{result.palette.map((color, index) => <span key={`${color}-${index}`} style={{ background: color }}><i>{color}</i></span>)}</div>
                <dl>
                  <div><dt>TYPE</dt><dd>Expressive editorial face<br />+ compact utility labels</dd></div>
                  <div><dt>COMPOSITION</dt><dd>Asymmetrical, image-led,<br />generous negative space</dd></div>
                  <div><dt>MOTION</dt><dd>Slow focus shifts;<br />no decorative bounce</dd></div>
                </dl>
                <div className="promptBox">
                  <span>AI CREATIVE PROMPT</span><p>{result.prompt}</p>
                  <button type="button" onClick={copyPrompt}>{copyState === "copied" ? "COPIED ✓" : copyState === "error" ? "COPY FAILED — TRY AGAIN" : "COPY PROMPT ↗"}</button>
                </div>
              </div>
            </div>
          </section>
        </div>
      ) : null}
    </div>
  );
}

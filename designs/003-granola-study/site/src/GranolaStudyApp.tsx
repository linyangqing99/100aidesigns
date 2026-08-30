"use client";

import "@fontsource-variable/dm-sans";
import "@fontsource-variable/newsreader";

import { ArrowUp, CheckCircle, LockKey, Paperclip, Robot, SlidersHorizontal, UsersThree, Waveform } from "@phosphor-icons/react";
import { FormEvent, useEffect, useRef, useState } from "react";

import styles from "./GranolaStudy.module.css";

type FlowKey = "before" | "during" | "after";
type DemoState = "idle" | "loading" | "success" | "error";

const flowContent: Record<FlowKey, { title: string; body: string; image: string; alt: string }> = {
  before: {
    title: "Walk in prepared",
    body: "Afterword gathers the last decision, open questions, and useful context before the call begins.",
    image: "before-call.png",
    alt: "An original pre-meeting brief for a quarterly planning conversation",
  },
  during: {
    title: "Stay in the conversation",
    body: "Write as much or as little as you like. The note keeps decisions and follow-ups connected to the discussion.",
    image: "hero-notes.png",
    alt: "An original meeting note beside a two-person video call",
  },
  after: {
    title: "Leave with the next move",
    body: "Turn the finished note into decisions, a follow-up, and a practical plan without another pass through the transcript.",
    image: "after-call.png",
    alt: "An original post-meeting note with three follow-up actions",
  },
};

const demoQuestions = [
  { prompt: "What did I promise to do in my meetings this week?", topic: "Team stand-ups" },
  { prompt: "Which customer needs a follow-up before Friday?", topic: "Customer calls" },
  { prompt: "What changed about the September launch?", topic: "Launch reviews" },
];

const studyFacts = [
  ["Hero", "A layered product scene stays pinned while its note, call, and material layers move at different speeds"],
  ["Rhythm", "Large quiet fields are interrupted by dense proof and product moments"],
  ["Type", "Newsreader carries the editorial promises while DM Sans handles controls and detail"],
  ["Motion", "Scroll position advances a real product state instead of decorating the page"],
];

export function GranolaStudyApp({ assetBase = "/assets" }: { assetBase?: string }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [flow, setFlow] = useState<FlowKey>("before");
  const [question, setQuestion] = useState("");
  const [typedQuestion, setTypedQuestion] = useState("");
  const [demoQuestionIndex, setDemoQuestionIndex] = useState(0);
  const [autoTyping, setAutoTyping] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  const [demoState, setDemoState] = useState<DemoState>("idle");
  const [toolNotice, setToolNotice] = useState("");
  const chatSectionRef = useRef<HTMLElement | null>(null);
  const typingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const resultTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const section = chatSectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setChatVisible(entry.isIntersecting),
      { rootMargin: "-15% 0px -15% 0px", threshold: 0.15 },
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (!chatVisible || !autoTyping) return;

    const fullPrompt = demoQuestions[demoQuestionIndex].prompt;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduceMotion) {
      typingTimerRef.current = setTimeout(() => setTypedQuestion(fullPrompt), 0);
      return () => {
        if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
      };
    }

    let cursor = 0;

    function erase() {
      cursor -= 1;
      setTypedQuestion(fullPrompt.slice(0, cursor));
      if (cursor > 0) {
        typingTimerRef.current = setTimeout(erase, 16);
      } else {
        setDemoQuestionIndex((index) => (index + 1) % demoQuestions.length);
      }
    }

    function typeNext() {
      cursor += 1;
      setTypedQuestion(fullPrompt.slice(0, cursor));
      if (cursor < fullPrompt.length) {
        typingTimerRef.current = setTimeout(typeNext, 42);
      } else {
        typingTimerRef.current = setTimeout(erase, 2100);
      }
    }

    typingTimerRef.current = setTimeout(typeNext, 420);
    return () => {
      if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    };
  }, [autoTyping, chatVisible, demoQuestionIndex]);

  useEffect(() => () => {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);
  }, []);

  function beginManualQuestion() {
    if (!autoTyping) return;
    setQuestion(typedQuestion);
    setAutoTyping(false);
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
  }

  function askMemory(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (resultTimerRef.current) clearTimeout(resultTimerRef.current);

    const submittedQuestion = (autoTyping ? typedQuestion : question).trim();
    if (!submittedQuestion) {
      setDemoState("error");
      return;
    }

    setDemoState("loading");
    resultTimerRef.current = setTimeout(() => setDemoState("success"), 720);
  }

  function changeContext() {
    if (typingTimerRef.current) clearTimeout(typingTimerRef.current);
    setAutoTyping(true);
    setDemoState("idle");
    setToolNotice("");
    setDemoQuestionIndex((index) => (index + 1) % demoQuestions.length);
  }

  const activeFlow = flowContent[flow];
  const visibleQuestion = autoTyping ? typedQuestion : question;
  const activeDemoQuestion = demoQuestions[demoQuestionIndex];

  return (
    <div className={styles.study}>
      <header className={styles.header}>
        <a className={styles.brand} href="#top" aria-label="Afterword home">
          <span aria-hidden="true">a</span>
          <strong>afterword</strong>
        </a>
        <nav className={menuOpen ? styles.navOpen : ""} aria-label="Primary navigation">
          <a href="#workflow" onClick={() => setMenuOpen(false)}>Workflow</a>
          <a href="#memory" onClick={() => setMenuOpen(false)}>Memory</a>
          <a href="#study-notes" onClick={() => setMenuOpen(false)}>Study notes</a>
        </nav>
        <a className={styles.headerAction} href="#memory">Try the flow</a>
        <button
          className={styles.menuButton}
          type="button"
          aria-label="Toggle navigation"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((open) => !open)}
        >
          {menuOpen ? "Close" : "Menu"}
        </button>
      </header>

      <main>
        <div className={styles.heroStory} id="top">
          <div className={styles.heroScrollCopy}>
            <section className={styles.hero} aria-labelledby="hero-title">
              <div className={styles.heroCopy}>
                <h1 id="hero-title" aria-label="The meeting memory for work that moves">
                  <span aria-hidden="true">The meeting memory</span>
                  <span aria-hidden="true">for work that moves</span>
                </h1>
                <p>Notes, decisions and follow-through. No bot in the room.</p>
                <a className={styles.primaryAction} href="#memory">Try the flow</a>
              </div>
            </section>

            <section className={styles.heroOutcome} aria-labelledby="promise-title">
              <div>
                <h2 id="promise-title">Notes, enhanced instantly.</h2>
                <div className={styles.promiseList}>
                  <p>
                    <span className={styles.promiseIcon}><Robot size={34} weight="regular" aria-hidden="true" /></span>
                    <span><strong>No meeting bot</strong><small>Capture the conversation from your own device.</small></span>
                  </p>
                  <p>
                    <span className={styles.promiseIcon}><LockKey size={34} weight="regular" aria-hidden="true" /></span>
                    <span><strong>Private first</strong><small>Keep the note personal until you decide to share it.</small></span>
                  </p>
                  <p>
                    <span className={styles.promiseIcon}><CheckCircle size={34} weight="regular" aria-hidden="true" /></span>
                    <span><strong>Useful next</strong><small>Move from memory to an action without rereading everything.</small></span>
                  </p>
                </div>
              </div>
            </section>
          </div>

          <div className={styles.heroStickyStage}>
            <figure className={styles.heroVisualScene}>
              <span className={styles.sceneSignal} aria-hidden="true" />
              <span className={styles.scenePaper} aria-hidden="true" />
              <span className={styles.sceneTexture} aria-hidden="true">
                <img src={`${assetBase}/hero-notes.png`} alt="" />
              </span>
              <article className={styles.noteWindow} aria-label="A live Afterword note transcribing a launch review">
                <header>
                  <div>
                    <strong>Launch review</strong>
                    <span>Today&nbsp;&nbsp;4</span>
                  </div>
                  <i>AW</i>
                </header>
                <div className={styles.noteCanvas}>
                  <div className={styles.draftNotes}>
                    <p>confirm launch scope</p>
                    <p>mobile capture first</p>
                    <p>ask Mira about pricing</p>
                    <p className={styles.heroTypedLine}>send launch brief by Friday<span aria-hidden="true" /></p>
                  </div>
                </div>
              </article>
              <span className={styles.scenePeople} aria-hidden="true">
                <img src={`${assetBase}/hero-notes.png`} alt="" />
              </span>
              <span className={styles.transcribingPill}>
                <Waveform size={25} weight="bold" aria-hidden="true" />
                Transcribing
              </span>
              <figcaption className={styles.srOnly}>A layered live product preview that becomes smaller and more focused as the page scrolls.</figcaption>
            </figure>
          </div>
        </div>

        <section className={styles.darkStatement}>
          <h2>For people who make the decision, then do the work.</h2>
          <p>One place for the context before a call and the follow-through after it.</p>
        </section>

        <section className={styles.workflow} id="workflow" aria-labelledby="workflow-title">
          <div className={styles.workflowIntro}>
            <h2 id="workflow-title">Before, during and after every call</h2>
            <div className={styles.flowTabs} role="tablist" aria-label="Meeting stages">
              {(["before", "during", "after"] as FlowKey[]).map((key) => (
                <button
                  key={key}
                  type="button"
                  role="tab"
                  aria-selected={flow === key}
                  onClick={() => setFlow(key)}
                >
                  {key === "before" ? "Before the call" : key === "during" ? "During the call" : "After the call"}
                </button>
              ))}
            </div>
          </div>
          <article className={styles.flowPanel} role="tabpanel">
            <div>
              <h3>{activeFlow.title}</h3>
              <p>{activeFlow.body}</p>
            </div>
            <img src={`${assetBase}/${activeFlow.image}`} alt={activeFlow.alt} />
          </article>
        </section>

        <section ref={chatSectionRef} className={styles.memory} id="memory" aria-labelledby="memory-title">
          <div className={styles.memoryHeading}>
            <p>Afterword Chat</p>
            <h2 id="memory-title" aria-label="Perfect meeting memory">
              <span aria-hidden="true">Perfect</span>
              <span aria-hidden="true">meeting</span>
              <span aria-hidden="true">memory</span>
            </h2>
          </div>

          <form className={styles.chatComposer} onSubmit={askMemory} noValidate>
            <label className={styles.srOnly} htmlFor="memory-question">Ask your meetings</label>
            <div className={styles.chatInputWrap}>
              <textarea
                id="memory-question"
                className={autoTyping ? styles.autoInput : ""}
                rows={3}
                value={visibleQuestion}
                onFocus={beginManualQuestion}
                onChange={(event) => {
                  setQuestion(event.target.value);
                  setAutoTyping(false);
                  setDemoState("idle");
                }}
                placeholder="Ask your meetings"
                aria-label="Ask your meetings"
                aria-describedby="memory-result"
              />
              {autoTyping && (
                <span className={styles.typingMirror} aria-hidden="true">
                  {typedQuestion}<i />
                </span>
              )}
            </div>

            <button className={styles.contextChip} type="button" onClick={changeContext}>
              <span><UsersThree size={22} weight="regular" aria-hidden="true" /></span>
              {activeDemoQuestion.topic}
            </button>

            <div className={styles.chatFooter}>
              <div>
                <button
                  className={styles.iconButton}
                  type="button"
                  aria-label="Attach meeting context"
                  onClick={() => setToolNotice("Your recent meeting notes are attached.")}
                >
                  <Paperclip size={25} weight="regular" aria-hidden="true" />
                </button>
                <button className={styles.iconButton} type="button" aria-label="Change meeting context" onClick={changeContext}>
                  <SlidersHorizontal size={25} weight="regular" aria-hidden="true" />
                </button>
              </div>
              <button className={styles.sendButton} type="submit" aria-label="Ask Afterword">
                <ArrowUp size={23} weight="bold" aria-hidden="true" />
              </button>
            </div>

            <div className={styles.memoryResult} id="memory-result" aria-live="polite" data-state={demoState}>
              {toolNotice && demoState === "idle" && <p>{toolNotice}</p>}
              {!toolNotice && demoState === "idle" && <p>Choose a context or type your own question.</p>}
              {demoState === "loading" && <div className={styles.skeleton}><i /><i /><i /></div>}
              {demoState === "error" && <p>Please enter a question first.</p>}
              {demoState === "success" && (
                <p><strong>You promised to send the launch brief by Friday.</strong> The promise came from Tuesday&apos;s team stand-up, after the scope was reduced to three launch priorities.</p>
              )}
            </div>
          </form>
        </section>

        <section className={styles.studyNotes} id="study-notes" aria-labelledby="study-title">
          <div className={styles.studyHeading}>
            <p className={styles.sectionLabel}>Reproduction notes</p>
            <h2 id="study-title">What this study carried forward</h2>
            <p>The replica now carries the source page&apos;s typography roles, sticky first-screen narrative, and typed chat rhythm while the product, copy, and imagery remain original.</p>
          </div>
          <div className={styles.factGrid}>
            {studyFacts.map(([label, value]) => (
              <article key={label}>
                <h3>{label}</h3>
                <p>{value}</p>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.finalCta}>
          <div>
            <h2>A quiet record of the work behind the call</h2>
            <p>Use the flow, then read the full reproduction audit in 100 AI Designs.</p>
          </div>
          <a className={styles.primaryAction} href="/designs/003-granola-study">Read the audit</a>
        </section>
      </main>

      <footer className={styles.footer}>
        <a className={styles.brand} href="#top"><span aria-hidden="true">a</span><strong>afterword</strong></a>
        <p>Original transfer exercise for 100 AI Designs.</p>
      </footer>
    </div>
  );
}

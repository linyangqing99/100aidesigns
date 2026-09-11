import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUpRight, ArrowRight, ArrowLeft, X, Plus, Minus, Sun, Moon, DownloadSimple, Check } from '@phosphor-icons/react';

const art = (file: string) => `${import.meta.env.BASE_URL}art/${file}.webp`;
const projects = [
  { title: 'Soft Signal', kind: 'Visual identity', file: 'soft-signal', alt: 'A translucent orange resin ribbon curves into an intricate sculptural loop.', tagline: 'A softer kind of statement.', description: 'An identity imagined as an object. One continuous orange ribbon gives a familiar material a surprising silhouette, carrying the idea from a small mark to a room-sized presence.', details: ['Translucent resin', 'Continuous form', 'Identity in three dimensions'] },
  { title: 'The Fold', kind: 'Object study', file: 'the-fold', alt: 'A sculptural chair with a curved brushed aluminum seat and cantilevered frame.', tagline: 'One line. A new place to sit.', description: 'A furniture concept that follows a single surface from backrest to seat. Cool aluminum and an unexpected warm reflection make a useful object feel almost weightless.', details: ['Brushed aluminum', 'Single-surface construction', 'Furniture concept'] },
  { title: 'Somewhere Else', kind: 'Spatial study', file: 'somewhere-else', alt: 'An orange ribbed glass circular doorway opens into a tranquil concrete gallery.', tagline: 'An invitation to step through.', description: 'A gallery concept built around one threshold. The orange glass changes the light before the visitor enters, making a simple doorway the most memorable part of the room.', details: ['Ribbed glass', 'Light as material', 'Gallery concept'] },
];

function App() {
  const [project, setProject] = useState<number | null>(null);
  const [briefOpen, setBriefOpen] = useState(false);
  const [selected, setSelected] = useState('Visual identity');
  const [saved, setSaved] = useState(false);
  const [menu, setMenu] = useState(false);
  const [dark, setDark] = useState(() => window.matchMedia('(prefers-color-scheme: dark)').matches);
  const [activeService, setActiveService] = useState<number | null>(0);
  const projectDialog = useRef<HTMLDialogElement>(null);
  const briefDialog = useRef<HTMLDialogElement>(null);
  const previousFocus = useRef<HTMLElement | null>(null);

  useEffect(() => { document.documentElement.dataset.theme = dark ? 'dark' : 'light'; }, [dark]);
  useEffect(() => {
    const dialog = project !== null ? projectDialog.current : briefOpen ? briefDialog.current : null;
    if (!dialog) return;
    const activeElement = document.activeElement as HTMLElement;
    previousFocus.current = activeElement?.offsetParent !== null ? activeElement : document.querySelector('.menu-toggle');
    dialog.showModal();
    const priorOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      dialog.close();
      document.body.style.overflow = priorOverflow;
      previousFocus.current?.focus();
    };
  }, [project !== null, briefOpen]);
  useEffect(() => {
    if (!menu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') { setMenu(false); (document.querySelector('.menu-toggle') as HTMLButtonElement)?.focus(); }
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [menu]);
  useEffect(() => {
    const nodes = document.querySelectorAll('.reveal');
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add('seen'); observer.unobserve(entry.target); }
    }), { threshold: 0.08 });
    nodes.forEach(node => { node.classList.add('will-reveal'); observer.observe(node); });
    return () => observer.disconnect();
  }, []);

  const startBrief = (kind = 'Visual identity') => { setSelected(kind); setSaved(false); setMenu(false); setBriefOpen(true); };
  const downloadBrief = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get('name')).trim();
    const idea = String(data.get('idea')).trim();
    const invalidField = !name ? event.currentTarget.elements.namedItem('name') : idea.length < 10 ? event.currentTarget.elements.namedItem('idea') : null;
    if (invalidField instanceof HTMLInputElement || invalidField instanceof HTMLTextAreaElement) {
      invalidField.setCustomValidity(!name ? 'Give your idea a name.' : 'Tell us a little more, at least 10 characters.');
      invalidField.reportValidity();
      return;
    }
    const content = `# ${name}\n\n## Creative direction\n${selected}\n\n## The idea\n${idea}\n\n## Desired feeling\n${String(data.get('feeling'))}\n\n## Starting points\n- Who should this reach?\n- What should they do next?\n- What must stay recognizable?\n\nCreated with the OFFSCRIPT concept studio. This file is yours to edit.\n`;
    const url = URL.createObjectURL(new Blob([content], { type: 'text/markdown;charset=utf-8' }));
    const anchor = document.createElement('a');
    anchor.href = url; anchor.download = 'offscript-creative-brief.md'; anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
    setSaved(true);
  };

  return <>
    <a className="skip" href="#main">Skip to content</a>
    <header className="header">
      <a href="#" className="wordmark" aria-label="OFFSCRIPT home">offscript<span className="brand-corner" aria-hidden="true">↗</span></a>
      <nav id="main-nav" className={menu ? 'nav mobile-open' : 'nav'} aria-label="Main navigation">
        <a href="#work" onClick={() => setMenu(false)}>Work</a>
        <a href="#studio" onClick={() => setMenu(false)}>Studio</a>
        <button className="nav-brief" onClick={() => startBrief()}>Start a brief <ArrowUpRight size={17} /></button>
      </nav>
      <div className="header-tools">
        <button className="icon-button theme-toggle" onClick={() => setDark(!dark)} aria-label={dark ? 'Switch to light theme' : 'Switch to dark theme'}>{dark ? <Sun size={19} /> : <Moon size={19} />}</button>
        <button className="menu-toggle" aria-expanded={menu} aria-controls="main-nav" aria-label={menu ? 'Close menu' : 'Open menu'} onClick={() => setMenu(!menu)}>{menu ? <X size={22} /> : <Plus size={22} />}</button>
      </div>
    </header>
    <main id="main">
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-heading"><h1 id="hero-title">Ideas, off script<span>.</span></h1></div>
        <div className="hero-intro"><p>A design playground for objects, spaces,<br className="desktop-break" /> and identities that refuse to blend in.</p><a href="#work" className="text-link">Explore the work <ArrowRight size={24} /></a></div>
        <button className="hero-art" onClick={() => setProject(0)} aria-label="View Soft Signal project">
          <img src={art('soft-signal')} width="1536" height="1024" alt={projects[0].alt} fetchPriority="high" />
        </button>
        <div className="hero-caption"><span>Soft Signal</span><span>Visual identity / Concept study</span><button className="icon-button" onClick={() => setProject(0)} aria-label="Open Soft Signal details"><ArrowUpRight size={25} /></button></div>
      </section>

      <section className="work section-space" id="work" aria-labelledby="work-title">
        <div className="work-heading reveal"><h2 id="work-title">Different starts<br />with a little curiosity.</h2><p>Two more ways to look at the familiar.</p></div>
        <div className="work-grid">
          {projects.slice(1).map((p, index) => <article key={p.title} className={`project-card reveal project-${index}`}>
            <button className="project-image" onClick={() => setProject(index + 1)} aria-label={`View ${p.title} project`}><img src={art(p.file)} width="1448" height="1086" alt={p.alt} loading="lazy" /></button>
            <div className="project-caption"><div><h3><button onClick={() => setProject(index + 1)}>{p.title}</button></h3><p>{p.kind}</p></div><button className="icon-button" onClick={() => setProject(index + 1)} aria-label={`Open ${p.title} details`}><ArrowUpRight size={26} /></button></div>
          </article>)}
        </div>
      </section>

      <section className="studio section-space" id="studio" aria-labelledby="studio-title">
        <div className="studio-statement reveal"><p className="eyebrow">The studio</p><h2 id="studio-title">A strange thought.<br />A strong point of view.<br /><span>Something worth making.</span></h2></div>
        <div className="studio-bottom reveal"><p className="studio-copy">OFFSCRIPT is a fictional studio with a real appetite for experimentation. These concept studies explore what happens when material, form, and a little nerve come together.</p>
          <div className="services">
            {[
              ['Identity', 'A visual world with a point of view. Marks, materials, and art direction that hold together across every touchpoint.'],
              ['Objects', 'Familiar things, reconsidered. Sculptural product concepts that start with a material and follow an unexpected line.'],
              ['Spaces', 'Rooms that make you feel something. Light, thresholds, and installations with one clear, memorable gesture.'],
            ].map(([name, text], index) => <div className="service" key={name}><h3><button aria-expanded={activeService === index} aria-controls={`service-${index}`} onClick={() => setActiveService(activeService === index ? null : index)}>{name}{activeService === index ? <Minus size={22} /> : <Plus size={22} />}</button></h3><div id={`service-${index}`} hidden={activeService !== index}><p>{text}</p></div></div>)}
          </div>
        </div>
      </section>

      <section className="invitation section-space reveal" aria-labelledby="invitation-title"><h2 id="invitation-title">Bring the<br /><span>what if.</span></h2><div className="invitation-action"><p>Give your next idea a starting point.<br />Make a brief, then make it your own.</p><button className="primary-button" onClick={() => startBrief()}>Start a brief <ArrowUpRight size={23} /></button></div></section>
    </main>
    <footer className="footer"><a href="#" className="wordmark">offscript<span className="brand-corner" aria-hidden="true">↗</span></a><p>A fictional studio. Original AI-generated concept studies.</p><a href="https://100ai.design/designs/013-offscript" className="source-link">View the design case <ArrowUpRight size={15} /></a></footer>

    <dialog ref={projectDialog} className="project-dialog" aria-labelledby="project-title" onCancel={() => setProject(null)} onClick={event => { if (event.target === event.currentTarget) setProject(null); }}>
      {project !== null && <div className="dialog-content"><div className="dialog-top"><span>Concept study</span><button className="icon-button" onClick={() => setProject(null)} aria-label="Close project"><X size={25} /></button></div><img className="dialog-art" src={art(projects[project].file)} alt={projects[project].alt} width="1448" height="1086" /><div className="project-story"><p className="project-kind">{projects[project].kind}</p><h2 id="project-title">{projects[project].title}</h2><h3>{projects[project].tagline}</h3><p>{projects[project].description}</p><ul>{projects[project].details.map(detail => <li key={detail}>{detail}</li>)}</ul></div><div className="project-pagination"><button onClick={() => setProject((project + projects.length - 1) % projects.length)}><ArrowLeft size={20} /> Previous project</button><button onClick={() => setProject((project + 1) % projects.length)}>Next project <ArrowRight size={20} /></button></div></div>}
    </dialog>

    <dialog ref={briefDialog} className="brief-dialog" aria-labelledby="brief-title" onCancel={() => setBriefOpen(false)} onClick={event => { if (event.target === event.currentTarget) setBriefOpen(false); }}>
      <div className="brief-content"><div className="dialog-top"><span>Your next idea</span><button className="icon-button" onClick={() => setBriefOpen(false)} aria-label="Close brief"><X size={25} /></button></div><h2 id="brief-title">Start with<br />a what if.</h2><p className="form-intro">A few thoughts are enough. Download your brief and take it from there.</p><form onSubmit={downloadBrief} onChange={event => { setSaved(false); if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) event.target.setCustomValidity(''); }}>
        <label htmlFor="project-name">What are you calling it?</label><input id="project-name" name="name" required maxLength={100} placeholder="A name, a working title, anything" />
        <fieldset><legend>What are you making?</legend><div className="direction-options">{['Visual identity', 'Object', 'Space'].map(kind => <label key={kind} className={selected === kind ? 'selected' : ''}><input type="radio" name="direction" value={kind} checked={selected === kind} onChange={() => setSelected(kind)} />{kind}</label>)}</div></fieldset>
        <label htmlFor="idea">Tell us the interesting bit.</label><textarea id="idea" name="idea" required minLength={10} maxLength={2000} rows={3} placeholder="What could this be? Who is it for?" />
        <label htmlFor="feeling">How should it feel?</label><select id="feeling" name="feeling"><option>Unexpected & playful</option><option>Quiet & considered</option><option>Bold & expressive</option><option>Warm & tactile</option></select>
        <button className="primary-button download" type="submit">{saved ? 'Download again' : 'Download my brief'} <DownloadSimple size={20} /></button><p className="form-status" role="status">{saved ? <><Check size={17} /> Your brief is ready. Make something interesting.</> : 'Saved as a Markdown file. No signup needed.'}</p>
      </form></div>
    </dialog>
  </>;
}

export default App;

/* =====================================================================
 * shared.jsx — shared components for Richard & Beatrice's wedding invite.
 * Loaded via <script type="text/babel">; exposes everything on `window`.
 * ===================================================================== */
const { useState, useEffect, useRef } = React;

/* --- Wedding configuration -------------------------------------------
 * Everything the client confirmed lives here. To set the venue once it's
 * known, edit `venueName` / `venueAddress` / `mapQuery` below.
 * ------------------------------------------------------------------- */
const WEDDING = {
  groom: "Richard",
  bride: "Beatrice",
  groomFull: "Richard Cobbinah",
  brideFull: "Beatrice Ekua Sikapa Baah",

  date: new Date("2026-07-04T10:00:00"),
  dateDisplay: "04 · July · 2026",
  dateLong: "The Fourth of July, 2026",
  timeDisplay: "10:00 in the morning",

  hashtag: "#foreverrichbea",
  quote: "Just the two of us",
  officiant: "MC Free Soul",
  rsvpBy: "15th June 2026",

  // Venue — placeholder until the client confirms. Edit these three lines.
  venueName: "Venue to be confirmed",
  venueAddress: "Accra, Ghana",
  mapQuery: "Accra, Ghana",

  // Background music
  musicTitle: "Just the Two of Us",
  musicArtist: "Bill Withers",

  contacts: [
    { role: "For Guest Enquiries", name: "Elizabeth Donkor", phone: "0533621517" },
    { role: "For Guest Enquiries", name: "Ebenezer Cobbinah", phone: "" },
  ],
};
window.WEDDING = WEDDING;

/* =====================================================================
 * Reveal — fade + lift children in on scroll (IntersectionObserver).
 * ===================================================================== */
function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { el.classList.add("is-in"); io.unobserve(el); }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={`reveal ${className}`} data-delay={delay || undefined} {...rest}>
      {children}
    </Tag>
  );
}

/* =====================================================================
 * Ornaments — decorative gold flourishes (currentColor-aware SVG).
 * ===================================================================== */
function Ornament({ size = 80 }) {
  return (
    <svg className="ornament" width={size} height={size * 0.35} viewBox="0 0 200 70"
      fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M10 35 L70 35" />
      <path d="M40 35 Q50 25 55 32 Q60 38 65 30" strokeWidth="0.9" />
      <path d="M30 35 Q40 45 45 38 Q50 32 55 40" strokeWidth="0.9" />
      <path d="M100 22 L112 35 L100 48 L88 35 Z" fill="currentColor" fillOpacity="0.18" />
      <circle cx="100" cy="35" r="2" fill="currentColor" />
      <path d="M130 35 L190 35" />
      <path d="M135 35 Q140 25 145 32 Q150 38 155 30" strokeWidth="0.9" />
      <path d="M145 35 Q155 45 160 38 Q165 32 170 40" strokeWidth="0.9" />
    </svg>
  );
}
function OrnamentSm() {
  return (
    <svg className="ornament ornament-sm" viewBox="0 0 80 20" fill="none" stroke="currentColor" strokeWidth="1" aria-hidden="true">
      <path d="M5 10 L30 10" />
      <path d="M40 4 L46 10 L40 16 L34 10 Z" fill="currentColor" fillOpacity="0.2" />
      <circle cx="40" cy="10" r="1.4" fill="currentColor" />
      <path d="M50 10 L75 10" />
    </svg>
  );
}

/* =====================================================================
 * SectionHead — eyebrow + ornament + display title + lede.
 * ===================================================================== */
function SectionHead({ eyebrow, title, lede, ornament = true }) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      {ornament && <Ornament />}
      <h2 className="display-h">{title}</h2>
      {lede && <p className="section-lede">{lede}</p>}
    </Reveal>
  );
}

/* =====================================================================
 * Topnav — transparent over hero, solid blush on scroll.
 * ===================================================================== */
function Topnav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const go = (id) => (e) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
  };
  return (
    <nav className={`topnav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="topnav__brand" href="#top" onClick={go("top")}>
        {WEDDING.groom} <span style={{ color: "var(--rose)" }}>&</span> {WEDDING.bride}
      </a>
      <div className="topnav__links">
        <a href="#details" onClick={go("details")}>Details</a>
        <a href="#rsvp" onClick={go("rsvp")}>RSVP</a>
        <a href="#guestbook" onClick={go("guestbook")}>Guestbook</a>
        <a href="#contact" onClick={go("contact")}>Contact</a>
      </div>
    </nav>
  );
}

/* =====================================================================
 * Countdown — animated digits to the wedding date.
 * ===================================================================== */
function computeT(target) {
  const diff = Math.max(0, target.getTime() - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff % 86400000) / 3600000),
    mins: Math.floor((diff % 3600000) / 60000),
    secs: Math.floor((diff % 60000) / 1000),
  };
}
function CountdownCell({ value, label }) {
  const [bump, setBump] = useState(false);
  const last = useRef(value);
  useEffect(() => {
    if (last.current !== value) {
      setBump(true);
      const t = setTimeout(() => setBump(false), 350);
      last.current = value;
      return () => clearTimeout(t);
    }
  }, [value]);
  return (
    <div className="countdown__cell">
      <span className={`countdown__num ${bump ? "bump" : ""}`}>{String(value).padStart(2, "0")}</span>
      <span className="countdown__label">{label}</span>
    </div>
  );
}
function Countdown({ target = WEDDING.date }) {
  const [t, setT] = useState(() => computeT(target));
  useEffect(() => {
    const i = setInterval(() => setT(computeT(target)), 1000);
    return () => clearInterval(i);
  }, [target]);
  return (
    <div className="countdown" aria-label="Time until the wedding">
      <CountdownCell value={t.days} label="Days" />
      <div className="countdown__sep">·</div>
      <CountdownCell value={t.hours} label="Hours" />
      <div className="countdown__sep">·</div>
      <CountdownCell value={t.mins} label="Minutes" />
      <div className="countdown__sep">·</div>
      <CountdownCell value={t.secs} label="Seconds" />
    </div>
  );
}

/* =====================================================================
 * MusicPlayer — floating player. Autoplays on envelope open (the click
 * is a user gesture, satisfying browser autoplay policy).
 * Drop your audio at music/track.mp3 and it will play.
 * ===================================================================== */
function MusicPlayer() {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.__weddingStartMusic = () => {
      setVisible(true);
      const a = audioRef.current;
      if (!a) return;
      a.play().then(() => setPlaying(true)).catch(() => {});
    };
    return () => { delete window.__weddingStartMusic; };
  }, []);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (a.paused) a.play().then(() => setPlaying(true)).catch(() => {});
    else { a.pause(); setPlaying(false); }
  };

  if (!visible) return null;

  return (
    <div className={`music ${playing ? "" : "is-paused"} ${collapsed ? "is-collapsed" : ""}`}>
      <audio ref={audioRef} src="music/track.mp3" loop preload="none"></audio>
      <button className="music__close" aria-label="Minimize music" onClick={() => setCollapsed((v) => !v)}>
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          {collapsed
            ? <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
            : <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />}
        </svg>
      </button>
      <div className="music__info">
        <div className="music__title">{WEDDING.musicTitle}</div>
        <div className="music__sub">
          <span className="music__bars" aria-hidden="true"><span></span><span></span><span></span></span>
          &nbsp;&nbsp;{WEDDING.musicArtist}
        </div>
      </div>
      <button className="music__btn" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
        {playing
          ? <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14" rx="1" /><rect x="14" y="5" width="4" height="14" rx="1" /></svg>
          : <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4l13 8-13 8V4z" /></svg>}
      </button>
    </div>
  );
}

/* =====================================================================
 * EnvelopeIntro — open-to-reveal overlay; starts the music on click.
 * ===================================================================== */
function EnvelopeIntro() {
  const [stage, setStage] = useState("closed");
  const monogram = (WEDDING.groom[0] || "R") + "\u2009&\u2009" + (WEDDING.bride[0] || "B");

  useEffect(() => {
    if (stage !== "open") document.body.classList.add("intro-locked");
    else document.body.classList.remove("intro-locked");
    return () => document.body.classList.remove("intro-locked");
  }, [stage]);

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    if (typeof window.__weddingStartMusic === "function") window.__weddingStartMusic();
    if (typeof window.__weddingHeroReveal === "function") window.__weddingHeroReveal();
    setTimeout(() => setStage("open"), 2600);
  };

  if (stage === "open") return null;

  return (
    <div className={`intro ${stage === "opening" ? "is-opening" : ""}`}
      role="button" tabIndex={0} onClick={open}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") open(); }}>
      <p className="intro__eyebrow">You are cordially invited</p>
      <div className="envelope-wrap">
        <div className="envelope">
          <div className="envelope__body"></div>
          <div className="envelope__card">
            <p className="envelope__card-eyebrow">We're getting married</p>
            <h2 className="envelope__card-names">
              {WEDDING.groom}<span className="amp">&amp;</span>{WEDDING.bride}
            </h2>
            <p className="envelope__card-date">{WEDDING.dateDisplay}</p>
          </div>
          <div className="envelope__flap"></div>
          <div className="envelope__seal" aria-hidden="true">{monogram}</div>
        </div>
      </div>
      <p className="intro__hint">Tap to open</p>
    </div>
  );
}

/* =====================================================================
 * Icon — small stroke icons.
 * ===================================================================== */
function Icon({ name, size = 20 }) {
  const c = { width: size, height: size, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" };
  switch (name) {
    case "heart": return <svg {...c}><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" /></svg>;
    case "arrow": return <svg {...c}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
    case "pin": return <svg {...c}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
    case "calendar": return <svg {...c}><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>;
    case "clock": return <svg {...c}><circle cx="12" cy="12" r="9" /><polyline points="12 7 12 12 15 14" /></svg>;
    case "rings": return <svg {...c}><circle cx="9" cy="14" r="6" /><circle cx="17" cy="10" r="5" /><path d="M9 3l1 3M14 3l-1 3" /></svg>;
    case "phone": return <svg {...c}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.86 19.86 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.86 19.86 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>;
    default: return null;
  }
}

Object.assign(window, {
  Reveal, Ornament, OrnamentSm, SectionHead, Topnav, Countdown, MusicPlayer, EnvelopeIntro, Icon,
});

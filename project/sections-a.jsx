/* =====================================================================
 * sections-a.jsx — Hero (type-only, animated) + Quote interlude.
 * Relies on globals from shared.jsx.
 * ===================================================================== */
const { useRef: useRefA, useEffect: useEffectA, useState: useStateA } = React;

/* =====================================================================
 * HeroBeach — animated sunset beachfront: a house on stilts with lit
 * windows and palms on the shore, fronted by layered sea waves that
 * scroll and bob like rolling tides. The whole scene slowly zooms.
 * ===================================================================== */
function wavePath(base, amp) {
  const up = (base - amp).toFixed(0), dn = (base + amp).toFixed(0), b = base.toFixed(0);
  return `M0 ${b} C90 ${up} 270 ${up} 360 ${b} C450 ${dn} 630 ${dn} 720 ${b}` +
         ` C810 ${up} 990 ${up} 1080 ${b} C1170 ${dn} 1350 ${dn} 1440 ${b} L1440 220 L0 220 Z`;
}
function Wave({ cls, fill, base, amp, op }) {
  const d = wavePath(base, amp);
  return (
    <div className={`wave ${cls}`}>
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none"><path d={d} fill={fill} fillOpacity={op} /></svg>
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none"><path d={d} fill={fill} fillOpacity={op} /></svg>
    </div>
  );
}
function HeroBeach() {
  return (
    <div className="hero__scene" aria-hidden="true">
      <div className="scene-zoom">
        {/* shore: beach house on stilts + palms, in silhouette */}
        <div className="scene-silhouette">
          <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax meet">
            <g fill="#2a0b11">
              {/* left palm */}
              <path d="M486 400 C470 330 470 270 478 226 L470 226 C460 280 458 340 470 400 Z" />
              <g stroke="#2a0b11" strokeWidth="7" fill="none" strokeLinecap="round">
                <path d="M476 232 C440 210 405 206 380 216" />
                <path d="M476 232 C452 198 432 178 408 168" />
                <path d="M476 232 C500 206 528 198 556 204" />
                <path d="M476 232 C496 200 520 184 548 178" />
                <path d="M476 232 C474 200 470 178 466 158" />
              </g>
              {/* right palm */}
              <path d="M958 400 C942 330 942 270 950 226 L942 226 C932 280 930 340 942 400 Z" />
              <g stroke="#2a0b11" strokeWidth="7" fill="none" strokeLinecap="round">
                <path d="M948 232 C984 210 1019 206 1044 216" />
                <path d="M948 232 C972 198 992 178 1016 168" />
                <path d="M948 232 C924 206 896 198 868 204" />
                <path d="M948 232 C928 200 904 184 876 178" />
                <path d="M948 232 C950 200 954 178 958 158" />
              </g>
              {/* stilts */}
              <rect x="636" y="300" width="9" height="100" />
              <rect x="690" y="300" width="9" height="100" />
              <rect x="745" y="300" width="9" height="100" />
              <rect x="799" y="300" width="9" height="100" />
              {/* deck + body */}
              <rect x="612" y="292" width="220" height="12" />
              <rect x="628" y="214" width="188" height="86" />
              {/* pitched roof */}
              <path d="M604 214 L722 150 L840 214 Z" />
              <rect x="700" y="120" width="10" height="34" />
            </g>
            {/* warm lit windows + door */}
            <g fill="#F0C870">
              <rect x="652" y="236" width="34" height="34" rx="2" />
              <rect x="758" y="236" width="34" height="34" rx="2" />
              <rect x="706" y="250" width="32" height="50" rx="2" />
            </g>
          </svg>
        </div>

        {/* sun reflection on the water */}
        <div className="scene-reflection"></div>

        {/* sea — layered scrolling tides */}
        <div className="sea">
          <Wave cls="wv1" fill="#E0BC7C" base={64} amp={12} op={0.4} />
          <Wave cls="wv2" fill="#a83a47" base={54} amp={20} op={0.85} />
          <Wave cls="wv3" fill="#6e1f2a" base={48} amp={26} op={1} />
          <Wave cls="wv4" fill="#43141c" base={44} amp={32} op={1} />
          <div className="sea-shimmer"></div>
        </div>
      </div>
    </div>
  );
}

/* =====================================================================
 * HeroBackdrop — canvas animation over the scene: twinkling gold sparkle
 * on the air/water, plus a few gulls drifting slowly across the sky.
 * Lightweight; respects reduced motion.
 * ===================================================================== */
function HeroBackdrop() {
  const canvasRef = useRefA(null);
  useEffectA(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvas.getContext("2d");
    let w = 0, h = 0, dpr = 1, raf = 0;
    const dust = [], birds = [];
    const small = window.innerWidth < 640;
    const N_DUST = reduce ? 0 : (small ? 28 : 48);
    const N_BIRD = reduce ? 0 : (small ? 4 : 6);

    const rand = (a, b) => a + Math.random() * (b - a);
    const mkDust = (init) => ({
      x: Math.random() * w, y: init ? Math.random() * h : h + 10,
      r: rand(0.4, 2), s: rand(0.08, 0.4), tw: rand(0, Math.PI * 2), tws: rand(0.01, 0.05),
    });
    const mkBird = (init) => ({
      x: init ? Math.random() * w : -30, y: rand((window.innerHeight || 700) * 0.08, (window.innerHeight || 700) * 0.34),
      r: rand(9, 16), s: rand(0.25, 0.55), bob: rand(0, Math.PI * 2), bobs: rand(0.01, 0.025),
    });

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvas.clientWidth; h = canvas.clientHeight;
      canvas.width = Math.max(1, w * dpr); canvas.height = Math.max(1, h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < N_DUST; i++) dust.push(mkDust(true));
    for (let i = 0; i < N_BIRD; i++) birds.push(mkBird(true));

    function frame() {
      ctx.clearRect(0, 0, w, h);
      // gold sparkle
      for (const d of dust) {
        d.y -= d.s; d.tw += d.tws;
        if (d.y < -6) { d.y = h + 6; d.x = Math.random() * w; }
        const alpha = 0.2 + 0.5 * ((Math.sin(d.tw) + 1) / 2);
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(224,196,140," + alpha.toFixed(3) + ")";
        ctx.fill();
      }
      // gulls drifting across the sky
      ctx.strokeStyle = "rgba(40,12,18,0.55)";
      ctx.lineWidth = 2;
      ctx.lineCap = "round";
      for (const b of birds) {
        b.x += b.s; b.bob += b.bobs;
        if (b.x > w + 30) { b.x = -30; b.y = rand(h * 0.08, h * 0.34); }
        const yy = b.y + Math.sin(b.bob) * 6;
        const r = b.r, flap = 0.5 + 0.18 * Math.sin(b.bob * 3);
        ctx.beginPath();
        ctx.moveTo(b.x - r, yy);
        ctx.quadraticCurveTo(b.x - r * 0.35, yy - r * flap, b.x, yy);
        ctx.quadraticCurveTo(b.x + r * 0.35, yy - r * flap, b.x + r, yy);
        ctx.stroke();
      }
      raf = requestAnimationFrame(frame);
    }
    if (!reduce) raf = requestAnimationFrame(frame);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas className="hero__anim" ref={canvasRef} aria-hidden="true"></canvas>;
}

/* =====================================================================
 * Hero — no photo. Animated deep-red field, floating gold frame, names,
 * date, countdown, CTA. Backdrop blooms to life when the card opens.
 * ===================================================================== */
function Hero() {
  const [revealed, setRevealed] = useStateA(false);
  useEffectA(() => {
    window.__weddingHeroReveal = () => setRevealed(true);
    const fallback = setTimeout(() => setRevealed(true), 4000); // safety if intro skipped
    return () => { clearTimeout(fallback); delete window.__weddingHeroReveal; };
  }, []);

  const toRsvp = (e) => {
    e.preventDefault();
    const el = document.getElementById("rsvp");
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  };
  return (
    <header className={`hero ${revealed ? "is-revealed" : ""}`} id="top">
      <div className="hero__glow" aria-hidden="true">
        <span className="g1"></span>
        <span className="g2"></span>
      </div>
      <HeroBeach />
      <HeroBackdrop />
      <div className="hero__sweep" aria-hidden="true"></div>
      <div className="hero__frame" aria-hidden="true"></div>
      <div className="hero__inner">
        <p className="hero__eyebrow">We're getting married</p>
        <h1 className="hero__names">
          {WEDDING.groom}
          <span className="hero__amp">&amp;</span>
          {WEDDING.bride}
        </h1>

        <div className="hero__ornament">
          <span className="line"></span>
          <Ornament size={56} />
          <span className="line"></span>
        </div>

        <p className="hero__date">{WEDDING.dateDisplay}</p>

        <Countdown />

        <div className="hero__cta">
          <a className="btn btn--on-dark" href="#rsvp" onClick={toRsvp}>
            Confirm Attendance <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="tick"></span>
      </div>
    </header>
  );
}

/* =====================================================================
 * Quote — full-bleed champagne interlude with the couple's chosen line.
 * ===================================================================== */
function Quote() {
  return (
    <section className="quote">
      <Reveal>
        <span className="quote__mark" aria-hidden="true">&ldquo;</span>
        <p className="quote__text">{WEDDING.quote}</p>
        <p className="quote__sub">{WEDDING.groom} &amp; {WEDDING.bride}</p>
      </Reveal>
    </section>
  );
}

Object.assign(window, { Hero, Quote });

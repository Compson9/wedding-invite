/* =====================================================================
 * sections-b.jsx — Details (When & Where + Map), RSVP, Guestbook,
 * Contact, Footer. Relies on globals from shared.jsx.
 * ===================================================================== */
const { useState: useStateB } = React;

/* =====================================================================
 * Details — When (date + time) and Where (venue), plus an interactive
 * Google Map. Clicking the map or the button opens Google Maps.
 * ===================================================================== */
function Details() {
  const q = encodeURIComponent(WEDDING.mapQuery);
  const embed = `https://maps.google.com/maps?q=${q}&z=13&output=embed`;
  const openMaps = `https://www.google.com/maps/search/?api=1&query=${q}`;

  return (
    <section className="section" id="details">
      <SectionHead
        eyebrow="Join Us"
        title="The Celebration"
        lede="We would be honoured to have you with us as we say “I do.”"
      />

      <Reveal className="details details--2">
        <div className="detail-card">
          <div className="detail-card__icon"><Icon name="calendar" size={30} /></div>
          <p className="detail-card__label">When</p>
          <h3 className="detail-card__title">{WEDDING.dateLong}</h3>
          <p className="detail-card__body">{WEDDING.timeDisplay}</p>
          <p className="detail-card__note">Officiated by {WEDDING.officiant}</p>
        </div>

        <div className="detail-card">
          <div className="detail-card__icon"><Icon name="pin" size={30} /></div>
          <p className="detail-card__label">Where</p>
          <h3 className="detail-card__title">{WEDDING.venueName}</h3>
          <p className="detail-card__body">{WEDDING.venueAddress}</p>
          <p className="detail-card__note">Tap the map below for directions</p>
        </div>
      </Reveal>

      <Reveal className="map" delay={1}>
        <a href={openMaps} target="_blank" rel="noreferrer" aria-label="Open location in Google Maps">
          <iframe
            className="map__frame"
            src={embed}
            title="Wedding location map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            tabIndex={-1}
          ></iframe>
        </a>
        <div className="map__bar">
          <div className="map__place">
            <div className="map__place-name">{WEDDING.venueName}</div>
            <div className="map__place-addr">{WEDDING.venueAddress}</div>
          </div>
          <a className="btn btn--ghost" href={openMaps} target="_blank" rel="noreferrer">
            <Icon name="pin" size={14} /> Open in Google Maps
          </a>
        </div>
      </Reveal>
    </section>
  );
}

/* =====================================================================
 * RSVP — dark band. Records to localStorage; swaps to a thank-you.
 * ===================================================================== */
function RSVP() {
  const [name, setName] = useStateB("");
  const [phone, setPhone] = useStateB("");
  const [attending, setAttending] = useStateB(null);
  const [message, setMessage] = useStateB("");
  const [sent, setSent] = useStateB(false);

  const submit = (e) => {
    e.preventDefault();
    if (!name || attending === null) return;
    const payload = { name, phone, attending, message, ts: Date.now() };
    try {
      const all = JSON.parse(localStorage.getItem("rsvp-list") || "[]");
      all.push(payload);
      localStorage.setItem("rsvp-list", JSON.stringify(all));
    } catch (e) {}
    console.log("[RSVP]", payload);
    setSent(true);
  };

  return (
    <section className="section--dark">
      <div className="section" id="rsvp">
        <SectionHead
          eyebrow="Be Our Guest"
          title="RSVP"
          lede={`Kindly let us know if you will be joining us by ${WEDDING.rsvpBy}.`}
        />
        <Reveal>
          <form className="rsvp" onSubmit={submit}>
            {sent ? (
              <div className="rsvp__thanks">
                <OrnamentSm />
                <h3>{attending === "yes" ? "We can't wait to celebrate with you." : "Thank you for letting us know."}</h3>
                <p>
                  {attending === "yes"
                    ? "Your response has been recorded. See you on the day!"
                    : "We'll miss you, but thank you for the thought."}
                </p>
              </div>
            ) : (
              <>
                <div className="rsvp__field">
                  <label className="rsvp__label">Full Name</label>
                  <input className="rsvp__input" type="text" value={name}
                    onChange={(e) => setName(e.target.value)} placeholder="Your full name" required />
                </div>
                <div className="rsvp__field">
                  <label className="rsvp__label">Phone Number</label>
                  <input className="rsvp__input" type="tel" value={phone}
                    onChange={(e) => setPhone(e.target.value)} placeholder="So we can reach you" />
                </div>
                <div className="rsvp__field">
                  <label className="rsvp__label">Will you be attending?</label>
                  <div className="rsvp__choices">
                    <button type="button" className={`rsvp__choice ${attending === "yes" ? "is-active" : ""}`}
                      onClick={() => setAttending("yes")}>Joyfully Accept</button>
                    <button type="button" className={`rsvp__choice ${attending === "no" ? "is-active" : ""}`}
                      onClick={() => setAttending("no")}>Regretfully Decline</button>
                  </div>
                </div>
                <div className="rsvp__field">
                  <label className="rsvp__label">A Note for the Couple</label>
                  <textarea className="rsvp__textarea" value={message}
                    onChange={(e) => setMessage(e.target.value)} placeholder="Share your well wishes…" rows={3}></textarea>
                </div>
                <button className="btn btn--gold rsvp__submit" type="submit">
                  Send RSVP <Icon name="arrow" size={14} />
                </button>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

/* =====================================================================
 * Guestbook — guests leave messages (local only). No seeded fakes.
 * ===================================================================== */
function Guestbook() {
  const [name, setName] = useStateB("");
  const [msg, setMsg] = useStateB("");
  const [entries, setEntries] = useStateB(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("guestbook") || "null");
      if (Array.isArray(saved)) return saved;
    } catch (e) {}
    return [];
  });

  const submit = (e) => {
    e.preventDefault();
    if (!name || !msg) return;
    const next = [{ name, msg, when: "just now" }, ...entries];
    setEntries(next);
    try { localStorage.setItem("guestbook", JSON.stringify(next)); } catch (e) {}
    setName(""); setMsg("");
  };

  return (
    <section className="section" id="guestbook">
      <SectionHead
        eyebrow="Leave a Note"
        title="Guestbook"
        lede="A word, a wish, a blessing — we would love to read it."
      />
      <div className="guestbook">
        <Reveal>
          <form className="guestbook__form" onSubmit={submit}>
            <input className="rsvp__input" type="text" value={name}
              onChange={(e) => setName(e.target.value)} placeholder="Your name" required />
            <textarea className="rsvp__textarea" value={msg}
              onChange={(e) => setMsg(e.target.value)} placeholder="A message for Richard & Beatrice…" rows={3} required></textarea>
            <button className="btn btn--primary" type="submit" style={{ marginTop: "1rem", width: "100%" }}>
              Sign the Guestbook <Icon name="arrow" size={14} />
            </button>
          </form>
        </Reveal>

        <div className="guestbook__list">
          {entries.length === 0 ? (
            <p className="guestbook__empty">Be the first to leave a message.</p>
          ) : (
            entries.map((e, i) => (
              <Reveal key={i} className="gb-entry" delay={Math.min(i, 3)}>
                <p className="gb-entry__msg">“{e.msg}”</p>
                <p className="gb-entry__meta">— {e.name} · {e.when}</p>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

/* =====================================================================
 * Contact — points of contact for guest enquiries.
 * ===================================================================== */
function Contact() {
  return (
    <section className="section--dark">
      <div className="section" id="contact">
        <SectionHead
          eyebrow="Questions?"
          title="Get in Touch"
          lede="Please reach out to either of our coordinators for anything you need."
        />
        <Reveal className="contact">
          <div className="contact__cards">
            {WEDDING.contacts.map((c, i) => (
              <div className="contact-card" key={i}>
                <p className="contact-card__role">{c.role}</p>
                <p className="contact-card__name">{c.name}</p>
                {c.phone && (
                  <a className="contact-card__phone" href={`tel:${c.phone.replace(/[^+\d]/g, "")}`}>
                    <Icon name="phone" size={14} /> {c.phone}
                  </a>
                )}
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* =====================================================================
 * Footer — closing names, date, hashtag.
 * ===================================================================== */
function Footer() {
  return (
    <footer className="footer">
      <Reveal>
        <OrnamentSm />
        <h2 className="footer__names">{WEDDING.groom} &amp; {WEDDING.bride}</h2>
        <p className="footer__date">{WEDDING.dateLong}</p>
        <p className="footer__hash">{WEDDING.hashtag}</p>
      </Reveal>
    </footer>
  );
}

Object.assign(window, { Details, RSVP, Guestbook, Contact, Footer });

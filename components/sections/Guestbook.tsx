"use client";

import { FormEvent, useEffect, useState } from "react";
import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { whatsappUrl } from "@/data/integration";

type GuestbookEntry = {
  name: string;
  msg: string;
  when: string;
};

export function Guestbook() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [sent, setSent] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("guestbook-whatsapp-list") || "[]");
      if (Array.isArray(saved)) setEntries(saved);
    } catch {
      // Local storage is a convenience only; WhatsApp remains the source of delivery.
    }
  }, []);

  const whatsappMessage = [
    "Hello, I would like to leave a guestbook message for Richard & Beatrice.",
    "",
    `Name: ${name || "[your name]"}`,
    `Message: ${msg || "[your message]"}`,
  ].join("\n");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !msg) return;

    const payload: GuestbookEntry = { name, msg, when: "just now" };
    const next = [payload, ...entries];
    setEntries(next);
    try {
      localStorage.setItem("guestbook-whatsapp-list", JSON.stringify(next));
    } catch {
      // Local storage is a convenience only; WhatsApp remains the source of delivery.
    }
    window.open(whatsappUrl(whatsappMessage), "_blank", "noopener,noreferrer");
    setSent(true);
    setName("");
    setMsg("");
  };

  return (
    <section className="section" id="guestbook">
      <SectionHead
        eyebrow="Leave a Note"
        title="Guestbook"
        lede="A word, a wish, a blessing - we would love to read it."
      />
      <div className="guestbook">
        <Reveal>
          <form className="guestbook__form" onSubmit={submit}>
            <input
              className="rsvp__input"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              required
            />
            <textarea
              className="rsvp__textarea"
              value={msg}
              onChange={(event) => setMsg(event.target.value)}
              placeholder="A message for Richard & Beatrice..."
              rows={3}
              required
            />
            {sent && (
              <p className="form-status form-status--success">
                WhatsApp has opened with your message. Please tap send there so we receive it.
              </p>
            )}
            <div className="form-actions">
              <button className="btn btn--primary guestbook__submit" type="submit">
                Send Guestbook Message <Icon name="arrow" size={14} />
              </button>
            </div>
          </form>
        </Reveal>

        <div className="guestbook__list">
          {entries.length === 0 ? (
            <p className="guestbook__empty">Messages sent from this device will appear here.</p>
          ) : (
            entries.map((entry, index) => (
              <Reveal key={`${entry.name}-${entry.when}-${index}`} className="gb-entry" delay={Math.min(index, 3)}>
                <p className="gb-entry__msg">&ldquo;{entry.msg}&rdquo;</p>
                <p className="gb-entry__meta">- {entry.name} &middot; {entry.when}</p>
              </Reveal>
            ))
          )}
        </div>
      </div>
    </section>
  );
}

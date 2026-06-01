"use client";

import { FormEvent, useEffect, useState } from "react";
import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { whatsappUrl } from "@/data/integration";

export function Guestbook() {
  const [name, setName] = useState("");
  const [msg, setMsg] = useState("");
  const [sent, setSent] = useState(false);

  useEffect(() => {
    localStorage.removeItem("guestbook");
    localStorage.removeItem("guestbook-whatsapp-list");
    localStorage.removeItem("guestbook-fallback-list");
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
      </div>
    </section>
  );
}

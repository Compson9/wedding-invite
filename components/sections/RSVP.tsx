"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/shared/Icon";
import { OrnamentSm } from "@/components/shared/Ornament";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { whatsappUrl } from "@/data/integration";
import { wedding } from "@/data/wedding";

type RsvpPayload = {
  name: string;
  phone: string;
  ts: number;
};

export function RSVP() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [sent, setSent] = useState(false);

  const whatsappMessage = [
    "Hello, I am sending my RSVP for Richard & Beatrice's wedding.",
    "",
    `Name: ${name || "[your name]"}`,
    `Phone: ${phone || "-"}`,
    "Response: I joyfully accept the invitation.",
  ].join("\n");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || !phone) return;

    const payload: RsvpPayload = { name, phone, ts: Date.now() };
    try {
      const all = JSON.parse(localStorage.getItem("rsvp-whatsapp-list") || "[]") as RsvpPayload[];
      all.push(payload);
      localStorage.setItem("rsvp-whatsapp-list", JSON.stringify(all));
    } catch {
      // Local storage is a convenience only; WhatsApp remains the source of delivery.
    }

    window.open(whatsappUrl(whatsappMessage), "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <section className="section--dark">
      <div className="section" id="rsvp">
        <SectionHead
          eyebrow="Be Our Guest"
          title="RSVP"
          lede={`Kindly accept the invitation by ${wedding.rsvpBy}. Your RSVP will be sent directly on WhatsApp.`}
        />
        <Reveal>
          <form className="rsvp" onSubmit={submit}>
            {sent ? (
              <div className="rsvp__thanks">
                <OrnamentSm />
                <h3>We can't wait to celebrate with you.</h3>
                <p>WhatsApp has opened with your RSVP. Please tap send there so we receive it.</p>
                <a className="btn btn--whatsapp rsvp__fallback" href={whatsappUrl(whatsappMessage)} target="_blank" rel="noreferrer">
                  Open WhatsApp Again
                </a>
              </div>
            ) : (
              <>
                <div className="rsvp__field">
                  <label className="rsvp__label" htmlFor="rsvp-name">Full Name</label>
                  <input
                    id="rsvp-name"
                    className="rsvp__input"
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    placeholder="Your full name"
                    required
                  />
                </div>
                <div className="rsvp__field">
                  <label className="rsvp__label" htmlFor="rsvp-phone">Phone Number</label>
                  <input
                    id="rsvp-phone"
                    className="rsvp__input"
                    type="tel"
                    value={phone}
                    onChange={(event) => setPhone(event.target.value)}
                    placeholder="So we can reach you"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button className="btn btn--gold rsvp__submit" type="submit">
                    Accept Invite on WhatsApp <Icon name="arrow" size={14} />
                  </button>
                </div>
              </>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

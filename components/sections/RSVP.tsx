"use client";

import { FormEvent, useState } from "react";
import { Icon } from "@/components/shared/Icon";
import { OrnamentSm } from "@/components/shared/Ornament";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { whatsappUrl } from "@/data/integration";
import { wedding } from "@/data/wedding";

type Attendance = "yes" | "no";

type RsvpPayload = {
  name: string;
  phone: string;
  attending: Attendance;
  message: string;
  ts: number;
};

export function RSVP() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [attending, setAttending] = useState<Attendance | null>(null);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const whatsappMessage = [
    "Hello, I am sending my RSVP for Richard & Beatrice's wedding.",
    "",
    `Name: ${name || "[your name]"}`,
    `Phone: ${phone || "-"}`,
    `Attending: ${attending === "yes" ? "Joyfully Accept" : attending === "no" ? "Regretfully Decline" : "[yes/no]"}`,
    `Message: ${message || "-"}`,
  ].join("\n");

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!name || attending === null) return;

    const payload: RsvpPayload = { name, phone, attending, message, ts: Date.now() };
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
          lede={`Kindly let us know if you will be joining us by ${wedding.rsvpBy}.`}
        />
        <Reveal>
          <form className="rsvp" onSubmit={submit}>
            {sent ? (
              <div className="rsvp__thanks">
                <OrnamentSm />
                <h3>{attending === "yes" ? "We can't wait to celebrate with you." : "Thank you for letting us know."}</h3>
                <p>
                  {attending === "yes"
                    ? "WhatsApp has opened with your RSVP. Please tap send there so we receive it."
                    : "WhatsApp has opened with your response. Please tap send there so we receive it."}
                </p>
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
                  />
                </div>
                <div className="rsvp__field">
                  <span className="rsvp__label">Will you be attending?</span>
                  <div className="rsvp__choices">
                    <button
                      type="button"
                      className={`rsvp__choice ${attending === "yes" ? "is-active" : ""}`}
                      onClick={() => setAttending("yes")}
                    >
                      Joyfully Accept
                    </button>
                    <button
                      type="button"
                      className={`rsvp__choice ${attending === "no" ? "is-active" : ""}`}
                      onClick={() => setAttending("no")}
                    >
                      Regretfully Decline
                    </button>
                  </div>
                </div>
                <div className="rsvp__field">
                  <label className="rsvp__label" htmlFor="rsvp-message">A Note for the Couple</label>
                  <textarea
                    id="rsvp-message"
                    className="rsvp__textarea"
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Share your well wishes..."
                    rows={3}
                  />
                </div>
                <div className="form-actions">
                  <button className="btn btn--gold rsvp__submit" type="submit">
                    Send RSVP on WhatsApp <Icon name="arrow" size={14} />
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

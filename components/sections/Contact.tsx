import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { wedding } from "@/data/wedding";

export function Contact() {
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
            {wedding.contacts.map((contact) => (
              <div className="contact-card" key={`${contact.name}-${contact.phone}`}>
                <p className="contact-card__role">{contact.role}</p>
                <p className="contact-card__name">{contact.name}</p>
                <div className="contact-card__links">
                  {contact.phone && (
                    <a className="contact-card__phone" href={`tel:${contact.phone.replace(/[^+\d]/g, "")}`}>
                      <Icon name="phone" size={14} /> {contact.phone}
                    </a>
                  )}
                  {contact.email && (
                    <a className="contact-card__phone" href={`mailto:${contact.email}`}>
                      {contact.email}
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

import { Icon } from "@/components/shared/Icon";
import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { wedding } from "@/data/wedding";

export function Details() {
  const query = encodeURIComponent(wedding.mapQuery);
  const embed = `https://maps.google.com/maps?q=${query}&z=13&output=embed`;
  const openMaps = `https://www.google.com/maps/search/?api=1&query=${query}`;

  return (
    <section className="section" id="details">
      <SectionHead
        eyebrow="Join Us"
        title="The Celebration"
        lede="We would be honoured to have you with us as we say I do."
      />

      <Reveal className="details details--2">
        <div className="detail-card">
          <div className="detail-card__icon"><Icon name="calendar" size={30} /></div>
          <p className="detail-card__label">When</p>
          <h3 className="detail-card__title">{wedding.dateLong}</h3>
          <p className="detail-card__body">{wedding.timeDisplay}</p>
          <p className="detail-card__note">Officiated by {wedding.officiant}</p>
        </div>

        <div className="detail-card">
          <div className="detail-card__icon"><Icon name="pin" size={30} /></div>
          <p className="detail-card__label">Where</p>
          <h3 className="detail-card__title">{wedding.venueName}</h3>
          <p className="detail-card__body">{wedding.venueAddress}</p>
          <p className="detail-card__note">Tap the map below for directions</p>
        </div>
      </Reveal>

      <Reveal className="map" delay={1}>
        <iframe
          className="map__frame"
          src={embed}
          title="Wedding location map"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          tabIndex={-1}
        />
        <div className="map__bar">
          <div className="map__place">
            <div className="map__place-name">{wedding.venueName}</div>
            <div className="map__place-addr">{wedding.venueAddress}</div>
          </div>
          <a className="btn btn--ghost" href={openMaps} target="_blank" rel="noreferrer">
            <Icon name="pin" size={14} /> Open in Google Maps
          </a>
        </div>
      </Reveal>
    </section>
  );
}

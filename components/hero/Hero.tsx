"use client";

import { MouseEvent, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/shared/Icon";
import { Ornament } from "@/components/shared/Ornament";
import { wedding } from "@/data/wedding";
import { computeCountdown } from "@/lib/countdown";
import { HeroBackdrop } from "./HeroBackdrop";

type CountdownCellProps = {
  value: number;
  label: string;
};

function CountdownCell({ value, label }: CountdownCellProps) {
  const [bump, setBump] = useState(false);
  const last = useRef(value);

  useEffect(() => {
    if (last.current === value) return;

    setBump(true);
    const timer = window.setTimeout(() => setBump(false), 350);
    last.current = value;
    return () => window.clearTimeout(timer);
  }, [value]);

  return (
    <div className="countdown__cell">
      <span className={`countdown__num ${bump ? "bump" : ""}`}>{String(value).padStart(2, "0")}</span>
      <span className="countdown__label">{label}</span>
    </div>
  );
}

function Countdown({ target = wedding.date }: { target?: Date }) {
  const [mounted, setMounted] = useState(false);
  const [time, setTime] = useState(() => ({
    days: 0,
    hours: 0,
    mins: 0,
    secs: 0,
  }));

  useEffect(() => {
    setMounted(true);
    setTime(computeCountdown(target));
    const interval = window.setInterval(() => setTime(computeCountdown(target)), 1000);
    return () => window.clearInterval(interval);
  }, [target]);

  if (!mounted) {
    return (
      <div className="countdown" aria-label="Time until the wedding">
        <CountdownCell value={0} label="Days" />
        <div className="countdown__sep">&middot;</div>
        <CountdownCell value={0} label="Hours" />
        <div className="countdown__sep">&middot;</div>
        <CountdownCell value={0} label="Minutes" />
        <div className="countdown__sep">&middot;</div>
        <CountdownCell value={0} label="Seconds" />
      </div>
    );
  }

  return (
    <div className="countdown" aria-label="Time until the wedding">
      <CountdownCell value={time.days} label="Days" />
      <div className="countdown__sep">&middot;</div>
      <CountdownCell value={time.hours} label="Hours" />
      <div className="countdown__sep">&middot;</div>
      <CountdownCell value={time.mins} label="Minutes" />
      <div className="countdown__sep">&middot;</div>
      <CountdownCell value={time.secs} label="Seconds" />
    </div>
  );
}

export function Hero() {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    window.__weddingHeroReveal = () => setRevealed(true);
    const fallback = window.setTimeout(() => setRevealed(true), 4000);
    return () => {
      window.clearTimeout(fallback);
      delete window.__weddingHeroReveal;
    };
  }, []);

  const toRsvp = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const el = document.getElementById("rsvp");
    if (el) window.scrollTo({ top: el.offsetTop - 60, behavior: "smooth" });
  };

  return (
    <header className={`hero ${revealed ? "is-revealed" : ""}`} id="top">
      <div className="hero__glow" aria-hidden="true">
        <span className="g1" />
        <span className="g2" />
      </div>
      <div className="hero__photo" aria-hidden="true" />
      <HeroBackdrop />
      <div className="hero__sweep" aria-hidden="true" />
      <div className="hero__frame" aria-hidden="true" />
      <div className="hero__inner">
        <p className="hero__eyebrow">We're getting married</p>
        <h1 className="hero__names">
          {wedding.groom}
          <span className="hero__amp">&amp;</span>
          {wedding.bride}
        </h1>

        <div className="hero__ornament">
          <span className="line" />
          <Ornament size={56} />
          <span className="line" />
        </div>

        <p className="hero__date">{wedding.dateDisplay}</p>
        <Countdown />

        <div className="hero__cta">
          <a className="btn btn--on-dark" href="#rsvp" onClick={toRsvp}>
            Confirm Attendance <Icon name="arrow" size={14} />
          </a>
        </div>
      </div>

      <div className="hero__scroll" aria-hidden="true">
        <span>Scroll</span>
        <span className="tick" />
      </div>
    </header>
  );
}

"use client";

import { MouseEvent, useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

export function Topnav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (id: string) => (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const el = document.getElementById(id);
    if (el) window.scrollTo({ top: el.offsetTop - 40, behavior: "smooth" });
  };

  return (
    <nav className={`topnav ${scrolled ? "is-scrolled" : ""}`}>
      <a className="topnav__brand" href="#top" onClick={go("top")}>
        {wedding.groom} <span style={{ color: "var(--rose)" }}>&amp;</span> {wedding.bride}
      </a>
      <div className="topnav__links">
        <a href="#details" onClick={go("details")}>Details</a>
        <a href="#program" onClick={go("program")}>Program</a>
        <a href="#registry" onClick={go("registry")}>Gifts</a>
        <a href="#rsvp" onClick={go("rsvp")}>RSVP</a>
        <a href="#contact" onClick={go("contact")}>Contact</a>
      </div>
    </nav>
  );
}

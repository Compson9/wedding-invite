"use client";

import { KeyboardEvent, useEffect, useState } from "react";
import { wedding } from "@/data/wedding";

type IntroStage = "closed" | "opening" | "open";

export function EnvelopeIntro() {
  const [stage, setStage] = useState<IntroStage>("closed");
  const monogram = `${wedding.groom[0] || "R"}\u2009&\u2009${wedding.bride[0] || "B"}`;

  useEffect(() => {
    if (stage !== "open") document.body.classList.add("intro-locked");
    else document.body.classList.remove("intro-locked");
    return () => document.body.classList.remove("intro-locked");
  }, [stage]);

  const open = () => {
    if (stage !== "closed") return;
    setStage("opening");
    window.__weddingStartMusic?.();
    window.__weddingHeroReveal?.();
    window.setTimeout(() => setStage("open"), 2600);
  };

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") open();
  };

  if (stage === "open") return null;

  return (
    <div
      className={`intro ${stage === "opening" ? "is-opening" : ""}`}
      role="button"
      tabIndex={0}
      onClick={open}
      onKeyDown={onKeyDown}
    >
      <p className="intro__eyebrow">You are cordially invited</p>
      <div className="envelope-wrap">
        <div className="envelope">
          <div className="envelope__body" />
          <div className="envelope__card">
            <p className="envelope__card-eyebrow">We're getting married</p>
            <h2 className="envelope__card-names">
              {wedding.groom}<span className="amp">&amp;</span>{wedding.bride}
            </h2>
            <p className="envelope__card-date">{wedding.dateDisplay}</p>
          </div>
          <div className="envelope__flap" />
          <div className="envelope__seal" aria-hidden="true">{monogram}</div>
        </div>
      </div>
      <p className="intro__hint">Tap to open</p>
    </div>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { wedding } from "@/data/wedding";

export function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    window.__weddingStartMusic = () => {
      setVisible(true);
      const audio = audioRef.current;
      if (!audio) return;
      audio.play().then(() => setPlaying(true)).catch(() => undefined);
    };

    return () => {
      delete window.__weddingStartMusic;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.play().then(() => setPlaying(true)).catch(() => undefined);
    } else {
      audio.pause();
      setPlaying(false);
    }
  };

  return (
    <>
      <audio ref={audioRef} src="/music/track.mp3" loop preload="auto" />
      {visible && (
        <div className={`music ${playing ? "" : "is-paused"} ${collapsed ? "is-collapsed" : ""}`}>
          <button
            className="music__close"
            aria-label="Minimize music"
            onClick={() => setCollapsed((value) => !value)}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {collapsed ? (
                <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
              ) : (
                <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              )}
            </svg>
          </button>
          <div className="music__info">
            <div className="music__title">{wedding.musicTitle}</div>
            <div className="music__sub">
              <span className="music__bars" aria-hidden="true"><span /><span /><span /></span>
              &nbsp;&nbsp;{wedding.musicArtist}
            </div>
          </div>
          <button className="music__btn" onClick={toggle} aria-label={playing ? "Pause" : "Play"}>
            {playing ? (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <rect x="6" y="5" width="4" height="14" rx="1" />
                <rect x="14" y="5" width="4" height="14" rx="1" />
              </svg>
            ) : (
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4l13 8-13 8V4z" />
              </svg>
            )}
          </button>
        </div>
      )}
    </>
  );
}

"use client";

import { useEffect, useRef } from "react";

type Dust = {
  x: number;
  y: number;
  r: number;
  s: number;
  tw: number;
  tws: number;
};

type Bird = {
  x: number;
  y: number;
  r: number;
  s: number;
  bob: number;
  bobs: number;
};

export function HeroBackdrop() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const canvasEl = canvas;

    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    const ctx = canvasEl.getContext("2d");
    if (!ctx) return;
    const context = ctx;

    let w = 0;
    let h = 0;
    let dpr = 1;
    let raf = 0;
    const dust: Dust[] = [];
    const birds: Bird[] = [];
    const small = window.innerWidth < 640;
    const dustCount = reduce ? 0 : small ? 28 : 48;
    const birdCount = reduce ? 0 : small ? 4 : 6;
    const rand = (a: number, b: number) => a + Math.random() * (b - a);

    const mkDust = (init: boolean): Dust => ({
      x: Math.random() * w,
      y: init ? Math.random() * h : h + 10,
      r: rand(0.4, 2),
      s: rand(0.08, 0.4),
      tw: rand(0, Math.PI * 2),
      tws: rand(0.01, 0.05),
    });

    const mkBird = (init: boolean): Bird => ({
      x: init ? Math.random() * w : -30,
      y: rand((window.innerHeight || 700) * 0.08, (window.innerHeight || 700) * 0.34),
      r: rand(9, 16),
      s: rand(0.25, 0.55),
      bob: rand(0, Math.PI * 2),
      bobs: rand(0.01, 0.025),
    });

    function resize() {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = canvasEl.clientWidth;
      h = canvasEl.clientHeight;
      canvasEl.width = Math.max(1, w * dpr);
      canvasEl.height = Math.max(1, h * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    resize();
    window.addEventListener("resize", resize);

    for (let i = 0; i < dustCount; i += 1) dust.push(mkDust(true));
    for (let i = 0; i < birdCount; i += 1) birds.push(mkBird(true));

    function frame() {
      context.clearRect(0, 0, w, h);

      for (const dot of dust) {
        dot.y -= dot.s;
        dot.tw += dot.tws;
        if (dot.y < -6) {
          dot.y = h + 6;
          dot.x = Math.random() * w;
        }
        const alpha = 0.2 + 0.5 * ((Math.sin(dot.tw) + 1) / 2);
        context.beginPath();
        context.arc(dot.x, dot.y, dot.r, 0, Math.PI * 2);
        context.fillStyle = `rgba(224,196,140,${alpha.toFixed(3)})`;
        context.fill();
      }

      context.strokeStyle = "rgba(40,12,18,0.55)";
      context.lineWidth = 2;
      context.lineCap = "round";

      for (const bird of birds) {
        bird.x += bird.s;
        bird.bob += bird.bobs;
        if (bird.x > w + 30) {
          bird.x = -30;
          bird.y = rand(h * 0.08, h * 0.34);
        }
        const yy = bird.y + Math.sin(bird.bob) * 6;
        const flap = 0.5 + 0.18 * Math.sin(bird.bob * 3);
        context.beginPath();
        context.moveTo(bird.x - bird.r, yy);
        context.quadraticCurveTo(bird.x - bird.r * 0.35, yy - bird.r * flap, bird.x, yy);
        context.quadraticCurveTo(bird.x + bird.r * 0.35, yy - bird.r * flap, bird.x + bird.r, yy);
        context.stroke();
      }

      raf = requestAnimationFrame(frame);
    }

    if (!reduce) raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas className="hero__anim" ref={canvasRef} aria-hidden="true" />;
}

function wavePath(base: number, amp: number) {
  const up = (base - amp).toFixed(0);
  const down = (base + amp).toFixed(0);
  const mid = base.toFixed(0);

  return `M0 ${mid} C90 ${up} 270 ${up} 360 ${mid} C450 ${down} 630 ${down} 720 ${mid} C810 ${up} 990 ${up} 1080 ${mid} C1170 ${down} 1350 ${down} 1440 ${mid} L1440 220 L0 220 Z`;
}

type WaveProps = {
  cls: string;
  fill: string;
  base: number;
  amp: number;
  op: number;
};

function Wave({ cls, fill, base, amp, op }: WaveProps) {
  const d = wavePath(base, amp);

  return (
    <div className={`wave ${cls}`}>
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none"><path d={d} fill={fill} fillOpacity={op} /></svg>
      <svg viewBox="0 0 1440 220" preserveAspectRatio="none"><path d={d} fill={fill} fillOpacity={op} /></svg>
    </div>
  );
}

export function HeroBeach() {
  return (
    <div className="hero__scene" aria-hidden="true">
      <div className="scene-zoom">
        <div className="scene-silhouette">
          <svg viewBox="0 0 1440 400" preserveAspectRatio="xMidYMax meet">
            <g fill="#2a0b11">
              <path d="M486 400 C470 330 470 270 478 226 L470 226 C460 280 458 340 470 400 Z" />
              <g stroke="#2a0b11" strokeWidth="7" fill="none" strokeLinecap="round">
                <path d="M476 232 C440 210 405 206 380 216" />
                <path d="M476 232 C452 198 432 178 408 168" />
                <path d="M476 232 C500 206 528 198 556 204" />
                <path d="M476 232 C496 200 520 184 548 178" />
                <path d="M476 232 C474 200 470 178 466 158" />
              </g>
              <path d="M958 400 C942 330 942 270 950 226 L942 226 C932 280 930 340 942 400 Z" />
              <g stroke="#2a0b11" strokeWidth="7" fill="none" strokeLinecap="round">
                <path d="M948 232 C984 210 1019 206 1044 216" />
                <path d="M948 232 C972 198 992 178 1016 168" />
                <path d="M948 232 C924 206 896 198 868 204" />
                <path d="M948 232 C928 200 904 184 876 178" />
                <path d="M948 232 C950 200 954 178 958 158" />
              </g>
              <rect x="636" y="300" width="9" height="100" />
              <rect x="690" y="300" width="9" height="100" />
              <rect x="745" y="300" width="9" height="100" />
              <rect x="799" y="300" width="9" height="100" />
              <rect x="612" y="292" width="220" height="12" />
              <rect x="628" y="214" width="188" height="86" />
              <path d="M604 214 L722 150 L840 214 Z" />
              <rect x="700" y="120" width="10" height="34" />
            </g>
            <g fill="#F0C870">
              <rect x="652" y="236" width="34" height="34" rx="2" />
              <rect x="758" y="236" width="34" height="34" rx="2" />
              <rect x="706" y="250" width="32" height="50" rx="2" />
            </g>
          </svg>
        </div>

        <div className="scene-reflection" />

        <div className="sea">
          <Wave cls="wv1" fill="#E0BC7C" base={64} amp={12} op={0.4} />
          <Wave cls="wv2" fill="#a83a47" base={54} amp={20} op={0.85} />
          <Wave cls="wv3" fill="#6e1f2a" base={48} amp={26} op={1} />
          <Wave cls="wv4" fill="#43141c" base={44} amp={32} op={1} />
          <div className="sea-shimmer" />
        </div>
      </div>
    </div>
  );
}

type OrnamentProps = {
  size?: number;
};

export function Ornament({ size = 80 }: OrnamentProps) {
  return (
    <svg
      className="ornament"
      width={size}
      height={size * 0.35}
      viewBox="0 0 200 70"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M10 35 L70 35" />
      <path d="M40 35 Q50 25 55 32 Q60 38 65 30" strokeWidth="0.9" />
      <path d="M30 35 Q40 45 45 38 Q50 32 55 40" strokeWidth="0.9" />
      <path d="M100 22 L112 35 L100 48 L88 35 Z" fill="currentColor" fillOpacity="0.18" />
      <circle cx="100" cy="35" r="2" fill="currentColor" />
      <path d="M130 35 L190 35" />
      <path d="M135 35 Q140 25 145 32 Q150 38 155 30" strokeWidth="0.9" />
      <path d="M145 35 Q155 45 160 38 Q165 32 170 40" strokeWidth="0.9" />
    </svg>
  );
}

export function OrnamentSm() {
  return (
    <svg
      className="ornament ornament-sm"
      viewBox="0 0 80 20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
      aria-hidden="true"
    >
      <path d="M5 10 L30 10" />
      <path d="M40 4 L46 10 L40 16 L34 10 Z" fill="currentColor" fillOpacity="0.2" />
      <circle cx="40" cy="10" r="1.4" fill="currentColor" />
      <path d="M50 10 L75 10" />
    </svg>
  );
}

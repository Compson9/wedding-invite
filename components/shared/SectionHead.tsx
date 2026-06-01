import { Ornament } from "@/components/shared/Ornament";
import { Reveal } from "@/components/shared/Reveal";

type SectionHeadProps = {
  eyebrow: string;
  title: string;
  lede?: string;
  ornament?: boolean;
};

export function SectionHead({ eyebrow, title, lede, ornament = true }: SectionHeadProps) {
  return (
    <Reveal className="section-head">
      <p className="eyebrow">{eyebrow}</p>
      {ornament && <Ornament />}
      <h2 className="display-h">{title}</h2>
      {lede && <p className="section-lede">{lede}</p>}
    </Reveal>
  );
}

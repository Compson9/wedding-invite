import { Reveal } from "@/components/shared/Reveal";
import { wedding } from "@/data/wedding";

export function Quote() {
  return (
    <section className="quote">
      <Reveal>
        <span className="quote__mark" aria-hidden="true">&ldquo;</span>
        <p className="quote__text">{wedding.quote}</p>
        <p className="quote__sub">{wedding.quoteRef}</p>
      </Reveal>
    </section>
  );
}

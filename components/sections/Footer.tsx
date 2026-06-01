import { OrnamentSm } from "@/components/shared/Ornament";
import { Reveal } from "@/components/shared/Reveal";
import { wedding } from "@/data/wedding";

export function Footer() {
  return (
    <footer className="footer">
      <Reveal>
        <OrnamentSm />
        <h2 className="footer__names">{wedding.groom} &amp; {wedding.bride}</h2>
        <p className="footer__date">{wedding.dateLong}</p>
        <p className="footer__hash">{wedding.hashtag}</p>
      </Reveal>
    </footer>
  );
}

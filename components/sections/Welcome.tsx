import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { wedding } from "@/data/wedding";

export function Welcome() {
  return (
    <section className="section section--welcome" id="welcome">
      <SectionHead eyebrow="With Love" title="Welcome" lede={wedding.welcomeMessage} />
      <Reveal className="welcome-note">
        <p className="welcome-note__names">{wedding.groomFull} &amp; {wedding.brideFull}</p>
        <p className="welcome-note__line">Thank you for celebrating this day with us.</p>
      </Reveal>
    </section>
  );
}

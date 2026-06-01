import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { wedding } from "@/data/wedding";

export function Registry() {
  return (
    <section className="section section--registry" id="registry">
      <SectionHead
        eyebrow="Gift Registry"
        title="With Thanks"
        lede="Your presence is the greatest gift. If you would like to bless us further, kindly use the Mobile Money details below."
      />
      <Reveal className="registry">
        <div className="registry__label">Mobile Money</div>
        <div className="registry__numbers">
          {wedding.giftRegistry.map((number) => (
            <a className="registry__number" href={`tel:${number}`} key={number}>{number}</a>
          ))}
        </div>
      </Reveal>
    </section>
  );
}

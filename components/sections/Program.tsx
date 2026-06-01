import { Reveal } from "@/components/shared/Reveal";
import { SectionHead } from "@/components/shared/SectionHead";
import { wedding } from "@/data/wedding";

export function Program() {
  return (
    <section className="section" id="program">
      <SectionHead
        eyebrow="The Day"
        title="Order of Programme"
        lede="A graceful morning of family, tradition, blessing, and celebration."
      />
      <div className="program-list">
        {wedding.program.map((item, index) => (
          <Reveal className="program-item" delay={Math.min(index, 3)} key={`${item.time}-${item.title}`}>
            <div className="program-item__time">{item.time}</div>
            <div className="program-item__body">
              <h3>{item.title}</h3>
              <p>{item.note}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

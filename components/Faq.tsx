import { faq } from "@/content/site";
import Accordion from "./Accordion";
import SectionHeading from "./SectionHeading";

export default function Faq() {
  return (
    <section id="duvidas" aria-labelledby="duvidas-title" className="section bg-offwhite">
      <div className="container-lg grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <SectionHeading id="duvidas-title" label={faq.label} title={faq.title} />
        <Accordion items={faq.items.map((item) => ({ title: item.q, content: <p>{item.a}</p> }))} />
      </div>
    </section>
  );
}

import { Info } from "lucide-react";
import { audience } from "@/content/site";
import SectionHeading from "./SectionHeading";

export default function Audience() {
  return (
    <section id="para-quem" aria-labelledby="para-quem-title" className="section bg-white">
      <div className="container-lg">
        <SectionHeading id="para-quem-title" label={audience.label} title={audience.title} intro={audience.text} />
        <ul className="mt-8 flex flex-wrap gap-2.5" aria-label="Tipos de empresa atendidos">
          {audience.chips.map((chip) => (
            <li
              key={chip}
              className="inline-flex min-h-[40px] items-center rounded-full border border-line bg-offwhite px-4 text-[0.9375rem] font-semibold text-navy"
            >
              {chip}
            </li>
          ))}
        </ul>
        <p className="mt-6 flex items-center gap-2 text-sm text-muted">
          <Info size={18} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />
          {audience.notice}
        </p>
      </div>
    </section>
  );
}

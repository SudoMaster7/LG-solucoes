import { Info } from "lucide-react";
import { documents } from "@/content/site";
import Accordion from "./Accordion";
import SectionHeading from "./SectionHeading";

export default function Documents() {
  return (
    <section id="documentos" aria-labelledby="documentos-title" className="section bg-offwhite">
      <div className="container-lg grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <SectionHeading id="documentos-title" label={documents.label} title={documents.title} intro={documents.intro} />
        <div>
          <Accordion items={documents.items.map((d) => ({ title: d.type, content: <p>{d.docs}</p> }))} />
          <p className="mt-4 flex items-start gap-2 text-sm text-muted">
            <Info size={18} strokeWidth={1.75} aria-hidden="true" className="mt-0.5 shrink-0 text-navy" />
            {documents.note}
          </p>
        </div>
      </div>
    </section>
  );
}

import { benefits } from "@/content/site";
import Icon from "./Icon";
import SectionHeading from "./SectionHeading";

export default function Benefits() {
  return (
    <section id="beneficios" aria-labelledby="beneficios-title" className="section bg-offwhite">
      <div className="container-lg">
        <SectionHeading id="beneficios-title" label={benefits.label} title={benefits.title} />
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5 lg:grid-cols-3">
          {benefits.items.map((item) => (
            <li key={item.title} className="card flex flex-col">
              <span className="inline-flex h-12 w-12 items-center justify-center rounded-btn border border-line text-brand">
                <Icon name={item.icon} size={24} />
              </span>
              <h3 className="text-h3 mt-5">{item.title}</h3>
              <p className="mt-2 text-muted">{item.text}</p>
              {"note" in item && item.note && (
                <div className="mt-auto pt-4">
                  <p className="border-t border-line pt-3 text-sm text-muted">{item.note}</p>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

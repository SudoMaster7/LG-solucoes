import { SHOW_TESTIMONIALS, testimonials } from "@/content/site";
import SectionHeading from "./SectionHeading";

/**
 * Depoimentos. Fica oculto enquanto SHOW_TESTIMONIALS = false ou a lista estiver vazia.
 * Use apenas depoimentos reais, com autorização por escrito. Nunca inventar.
 */
export default function Testimonials() {
  if (!SHOW_TESTIMONIALS || testimonials.length === 0) return null;
  return (
    <section id="depoimentos" aria-labelledby="depoimentos-title" className="section bg-offwhite">
      <div className="container-lg">
        <SectionHeading id="depoimentos-title" label="DEPOIMENTOS" title="Quem já abriu a conta com a LG" />
        <ul className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <li key={t.name} className="card">
              <blockquote>
                <p className="text-ink">“{t.text}”</p>
                <footer className="mt-4 text-sm">
                  <span className="font-semibold text-navy">{t.name}</span>
                  <span className="text-muted"> · {t.company}</span>
                </footer>
              </blockquote>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

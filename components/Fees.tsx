import { Check } from "lucide-react";
import { fees } from "@/content/site";
import SectionHeading from "./SectionHeading";
import TrackOnView from "./TrackOnView";

export default function Fees() {
  return (
    <section id="tarifas" aria-labelledby="tarifas-title" className="section bg-offwhite">
      <TrackOnView event="ViewContent" params={{ content_name: "tarifas" }}>
        <div className="container-lg">
          <SectionHeading id="tarifas-title" label={fees.label} title={fees.title} />

          {/* Mobile e tablet: lista de cards (sem rolagem lateral) */}
          <ul className="mt-8 grid grid-cols-1 gap-3 md:grid-cols-2 lg:hidden">
            {fees.items.map((item) => (
              <li key={item.service} className="rounded-card border border-line bg-white p-4">
                <p className="font-semibold text-navy">{item.service}</p>
                <p className={`mt-1 flex items-start gap-2 ${item.free ? "font-semibold text-brand-hover" : "text-ink"}`}>
                  {item.free && <Check size={18} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0" />}
                  {item.value}
                </p>
              </li>
            ))}
          </ul>

          {/* Desktop: tabela */}
          <div className="mt-10 hidden overflow-hidden rounded-card border border-line bg-white lg:block">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">{fees.title}</caption>
              <thead>
                <tr className="bg-navy text-white">
                  <th scope="col" className="px-6 py-4 font-semibold">
                    {fees.columns.service}
                  </th>
                  <th scope="col" className="px-6 py-4 font-semibold">
                    {fees.columns.value}
                  </th>
                </tr>
              </thead>
              <tbody>
                {fees.items.map((item, i) => (
                  <tr key={item.service} className={i % 2 ? "bg-offwhite/60" : "bg-white"}>
                    <th scope="row" className="border-t border-line px-6 py-4 font-semibold text-navy">
                      {item.service}
                    </th>
                    <td
                      className={`border-t border-line px-6 py-4 ${item.free ? "font-semibold text-brand-hover" : "text-ink"}`}
                    >
                      <span className="inline-flex items-center gap-2">
                        {item.free && <Check size={18} strokeWidth={1.75} aria-hidden="true" />}
                        {item.value}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-5 text-sm text-muted">{fees.footnote}</p>
        </div>
      </TrackOnView>
    </section>
  );
}

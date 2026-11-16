import Image from "next/image";
import { Check, Handshake, ShieldCheck, Smartphone, Users } from "lucide-react";
import { trust } from "@/content/site";
import { CoraLogo, LgLogo, LgSymbol } from "./Brand";
import SectionHeading from "./SectionHeading";

export default function WhyTrust() {
  const { partnership, remote, security, about } = trust;
  return (
    <section id="confianca" aria-labelledby="confianca-title" className="section bg-white">
      <div className="container-lg">
        <SectionHeading id="confianca-title" label={trust.label} title={trust.title} />

        <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-5">
          <article className="card">
            <div className="flex items-center gap-3">
              <Handshake size={24} strokeWidth={1.75} aria-hidden="true" className="text-brand" />
              <h3 className="text-h3">{partnership.title}</h3>
            </div>
            <p className="mt-3 text-muted">{partnership.text}</p>
            <div className="mt-5 flex flex-wrap items-center gap-4 rounded-btn bg-offwhite px-4 py-3">
              <LgLogo height={32} />
              <span aria-hidden="true" className="text-lg font-semibold text-muted">
                ×
              </span>
              <CoraLogo height={24} />
            </div>
          </article>

          <article className="card">
            <div className="flex items-center gap-3">
              <Smartphone size={24} strokeWidth={1.75} aria-hidden="true" className="text-brand" />
              <h3 className="text-h3">{remote.title}</h3>
            </div>
            <p className="mt-3 text-muted">{remote.text}</p>
          </article>

          <article className="on-dark rounded-card bg-navy p-6 text-white md:col-span-2 md:p-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-btn border border-gold/60 text-gold">
                <ShieldCheck size={26} strokeWidth={1.75} aria-hidden="true" />
              </span>
              <h3 className="text-h3 text-white">{security.title}</h3>
            </div>
            <ul className="mt-5 grid gap-3 md:grid-cols-3 md:gap-6">
              {security.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-white/90">
                  <Check size={20} strokeWidth={1.75} aria-hidden="true" className="mt-1 shrink-0 text-gold" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </article>

          <article className="card flex flex-col gap-5 sm:flex-row sm:items-center md:col-span-2">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center overflow-hidden rounded-card bg-offwhite">
              {about.photo ? (
                <Image src={about.photo} alt="Lucas e Guilherme, sócios da LG" width={96} height={96} sizes="96px" className="h-full w-full object-cover" />
              ) : (
                <LgSymbol size={64} />
              )}
            </div>
            <div>
              <div className="flex items-center gap-3">
                <Users size={24} strokeWidth={1.75} aria-hidden="true" className="text-brand" />
                <h3 className="text-h3">{about.title}</h3>
              </div>
              <p className="mt-2 text-muted">{about.text}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

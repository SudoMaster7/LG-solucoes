import type { ReactNode } from "react";

/** Layout das páginas institucionais (privacidade, termos). */
export default function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <main id="conteudo" tabIndex={-1} className="outline-none">
      <div className="on-dark bg-navy text-white">
        <div className="container-lg pb-12 pt-28 lg:pt-36">
          <p className="eyebrow text-gold">LG Soluções Financeiras</p>
          <h1 className="text-h1 mt-4 text-white">{title}</h1>
          <p className="mt-3 text-white/80">Última atualização: {updated}</p>
        </div>
      </div>
      <article className="container-lg legal py-12 md:py-16">
        <div className="max-w-[48rem] space-y-5 text-ink [&_h2]:mt-10 [&_h2]:text-h3 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
          {children}
        </div>
      </article>
    </main>
  );
}

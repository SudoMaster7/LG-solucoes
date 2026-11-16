import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { company } from "@/content/site";

export const metadata: Metadata = {
  title: "Termos de uso | LG Soluções Financeiras",
  description: "Termos de uso do site da LG Soluções Financeiras.",
  alternates: { canonical: "/termos" },
};

export default function TermosPage() {
  return (
    <LegalPage title="Termos de uso" updated="[REVISAR] novembro de 2026">
      <p className="rounded-btn border border-dashed border-muted/60 bg-offwhite p-4 text-sm font-semibold text-navy">
        [REVISAR] Texto-base. Revise com a LG (e, se possível, com um advogado) antes de publicar.
      </p>

      <h2>1. Sobre a LG</h2>
      <p>
        A {company.name} é parceira da Cora na abertura de contas PJ. A LG não é uma instituição financeira. A conta PJ
        é oferecida pela Cora, instituição financeira autorizada pelo Banco Central do Brasil.
      </p>

      <h2>2. O que a LG faz</h2>
      <p>
        A LG orienta e acompanha empresas na abertura da conta PJ na Cora, com atendimento pelo WhatsApp. O atendimento
        da LG para abrir a conta não tem custo para o cliente. A LG nunca pede senha, código de acesso ou depósito.
      </p>

      <h2>3. Aprovação, tarifas e crédito</h2>
      <p>
        A aprovação da conta é decisão exclusiva da Cora. A concessão de crédito e a função crédito do cartão estão
        sujeitas a análise da Cora. As tarifas mostradas neste site são informativas e foram conferidas na data indicada;
        a tabela vigente é a publicada pela Cora em cora.com.br.
      </p>

      <h2>4. Uso do site</h2>
      <p>
        O conteúdo deste site é informativo. É proibido copiar, reproduzir ou usar as marcas da LG sem autorização. As
        marcas da Cora pertencem à Cora e são usadas aqui na condição de parceira.
      </p>

      <h2>5. Privacidade</h2>
      <p>
        O tratamento de dados pessoais segue a nossa <a href="/privacidade" className="font-semibold text-navy underline">Política de privacidade</a>.
      </p>

      <h2>6. Contato e foro</h2>
      <p>
        Dúvidas: {company.email}. Fica eleito o foro da comarca do {company.city} [REVISAR], salvo disposição legal em
        contrário.
      </p>
    </LegalPage>
  );
}

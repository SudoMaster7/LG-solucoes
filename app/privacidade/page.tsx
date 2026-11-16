import type { Metadata } from "next";
import LegalPage from "@/components/LegalPage";
import { company, whatsappAgents } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de privacidade | LG Soluções Financeiras",
  description: "Como a LG Soluções Financeiras coleta, usa e protege os seus dados.",
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <LegalPage title="Política de privacidade" updated="[REVISAR COM A LG] novembro de 2026">
      <p className="rounded-btn border border-dashed border-muted/60 bg-offwhite p-4 text-sm font-semibold text-navy">
        [REVISAR COM A LG] Texto-base. Revise com a LG (e, se possível, com um advogado) antes de publicar.
      </p>

      <p>
        Esta política explica como a {company.name} (“LG”, “nós”) trata os dados pessoais de quem visita este site,
        de acordo com a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
      </p>

      <h2>1. Quem é o controlador</h2>
      <p>
        {company.legalName}, CNPJ {company.cnpj}, com atendimento remoto a partir do {company.city}. Contato:{" "}
        {company.email}.
      </p>

      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li>
          <strong>Origem da visita:</strong> parâmetros de campanha da URL (utm_source, utm_medium, utm_campaign,
          utm_content) e o identificador de clique da Meta (fbclid). Ficam guardados no seu navegador durante a sessão.
        </li>
        <li>
          <strong>Atendente sorteado:</strong> um identificador do atendente de WhatsApp, guardado no seu navegador
          (localStorage) para que você sempre fale com a mesma pessoa.
        </li>
        <li>
          <strong>Cliques e visualizações:</strong> se você aceitar os cookies, registramos pelo Pixel da Meta a visita
          à página, a visualização da seção de tarifas e os cliques nos botões de WhatsApp.
        </li>
        <li>
          <strong>Dados do formulário (quando ativo):</strong> nome, empresa, CNPJ, cargo, telefone, e-mail, estado,
          cidade, segmento e tipo de empresa.
        </li>
        <li>
          <strong>Conversa no WhatsApp:</strong> as mensagens que você nos envia pelo WhatsApp, para atender o seu
          pedido.
        </li>
      </ul>

      <h2>3. Para que usamos</h2>
      <ul>
        <li>Responder ao seu contato e conduzir a abertura da sua conta PJ na Cora;</li>
        <li>Saber de qual anúncio cada contato veio, para medir e melhorar as nossas campanhas;</li>
        <li>Cumprir obrigações legais.</li>
      </ul>
      <p>
        A LG não pede, não recebe e não guarda senhas, códigos de acesso ou documentos para a abertura da conta. O
        cadastro e os documentos são enviados direto no app ou site oficial da Cora, que trata esses dados conforme a
        política de privacidade dela.
      </p>

      <h2>4. Cookies e rastreamento</h2>
      <p>
        O Pixel da Meta só é carregado se você clicar em “Aceitar” no aviso de cookies. Se clicar em “Recusar”, nenhum
        rastreamento de anúncios é carregado. A sua escolha fica salva no navegador. Para mudar de ideia, limpe os
        dados deste site no seu navegador e o aviso aparecerá de novo.
      </p>

      <h2>5. Com quem compartilhamos</h2>
      <ul>
        <li>Meta Platforms (Pixel e, se ativada, Conversions API), somente após o seu aceite;</li>
        <li>Cora, quando você decide abrir a conta, pelo próprio app ou site oficial da Cora;</li>
        <li>Prestadores de hospedagem e de CRM usados pela LG [REVISAR COM A LG: listar].</li>
      </ul>

      <h2>6. Por quanto tempo guardamos</h2>
      <ul>
        <li>Dados de origem da visita: até o fim da sessão no navegador;</li>
        <li>Atendente sorteado e escolha de cookies: até você limpar os dados do navegador;</li>
        <li>Dados de contato e do formulário: até 24 meses após o último contato [REVISAR COM A LG], ou pelo prazo exigido em lei.</li>
      </ul>

      <h2>7. Seus direitos</h2>
      <p>
        Você pode pedir a confirmação, o acesso, a correção, a portabilidade ou a exclusão dos seus dados, além de
        revogar o consentimento, a qualquer momento. Envie o pedido para {company.email} ou pelo WhatsApp{" "}
        {whatsappAgents.map((a) => a.display).join(" ou ")}. Respondemos em até 15 dias.
      </p>

      <h2>8. Alterações</h2>
      <p>Esta política pode ser atualizada. A data da última versão fica no topo desta página.</p>
    </LegalPage>
  );
}

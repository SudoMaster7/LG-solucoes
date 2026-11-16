/**
 * ============================================================
 *  CONTEÚDO DO SITE — LG Soluções Financeiras
 * ============================================================
 *  Todos os textos, números, tarifas e flags ficam aqui.
 *  Para mudar algo no site, edite este arquivo e publique de novo.
 *  Textos entre [COLCHETES] são placeholders pendentes.
 * ============================================================
 */

/* ------------------------------------------------------------
 * FLAGS (liga/desliga)
 * ------------------------------------------------------------ */

/** Mostra a seção de depoimentos. Só ligue com depoimentos reais e autorizados. */
export const SHOW_TESTIMONIALS = false;

/** Mostra CNPJ e razão social no rodapé. Ligue quando o CNPJ existir. */
export const SHOW_COMPANY_ID = false;

/** Mostra o formulário de lead antes do WhatsApp. */
export const ENABLE_LEAD_FORM = false;

/** Mostra o logo oficial da Cora (/public/parceiros/logo-cora.svg, do kit de marca). */
export const HAS_CORA_LOGO_FILE = true;

/**
 * Distribuição dos atendentes de WhatsApp:
 *  - "random"          → sorteio 50/50, fixo por visitante (localStorage)
 *  - "fixed:<id>"      → todo mundo vai para um atendente, ex.: "fixed:atendente-1"
 * Pode ser sobrescrito pela variável de ambiente NEXT_PUBLIC_WHATSAPP_ROUTING.
 */
export const WHATSAPP_ROUTING: string =
  process.env.NEXT_PUBLIC_WHATSAPP_ROUTING || "random";

/* ------------------------------------------------------------
 * EMPRESA E CONTATO
 * ------------------------------------------------------------ */

export const company = {
  name: "LG Soluções Financeiras",
  legalName: "[RAZÃO SOCIAL]",
  cnpj: "[CNPJ]",
  email: "Lgsolucoesfinanceiras20@gmail.com",
  /** URL pública. Ordem: NEXT_PUBLIC_SITE_URL → domínio de produção da Vercel → placeholder. */
  domain:
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
      : "https://[DOMÍNIO]"),
  /** Usuário do Instagram sem @ (ex.: "lgfinancas"). Vazio = não aparece no site. */
  instagram: "lgsolucoes.financeiras",
  city: "Rio de Janeiro",
  tagline: "Parceira Cora na abertura de contas PJ.",
  year: 2026,
};

export const whatsappAgents = [
  { id: "atendente-1", number: "5521984190333", display: "(21) 98419-0333" },
  { id: "atendente-2", number: "5521979902815", display: "(21) 97990-2815" },
];

export const whatsappMessage =
  "Olá! Vim pelo site e quero abrir a conta PJ da minha empresa no Cora.";

/** Data em que as tarifas da Cora foram conferidas. Atualize ao revisar a tabela. */
export const feesCheckedAt = "novembro de 2026";

/* ------------------------------------------------------------
 * SEO
 * ------------------------------------------------------------ */

export const seo = {
  title: "Conta PJ gratuita no Cora | LG Soluções Financeiras",
  description:
    "Abra a conta PJ da sua empresa no Cora com o atendimento da LG: sem mensalidade, Pix ilimitado e cartão sem anuidade. Atendimento pelo WhatsApp em todo o Brasil.",
};

/* ------------------------------------------------------------
 * NAVEGAÇÃO
 * ------------------------------------------------------------ */

export const nav = [
  { label: "Benefícios", href: "#beneficios" },
  { label: "Como funciona", href: "#como-funciona" },
  { label: "Tarifas", href: "#tarifas" },
  { label: "Dúvidas", href: "#duvidas" },
];

export const headerCta = { full: "Falar no WhatsApp", compact: "WhatsApp" };

/* ------------------------------------------------------------
 * HERO
 * ------------------------------------------------------------ */

export const hero = {
  label: "CONTA PJ NO CORA",
  title: "A gente resolve a conta da sua empresa.",
  subtitle:
    "Abra sua conta PJ gratuita no Cora com o acompanhamento da LG: sem mensalidade, Pix ilimitado e cartão sem anuidade. Tudo pelo WhatsApp, de qualquer lugar do Brasil.",
  cta: "Abrir minha conta pelo WhatsApp",
  support: [
    "Atendimento com pessoas reais",
    "A LG não cobra nada para abrir a sua conta",
  ],
  partnerSeal: "Parceiro Cora",
};

/* ------------------------------------------------------------
 * BARRA DE CONFIANÇA
 * ------------------------------------------------------------ */

export const trustBar = [
  { icon: "wallet", text: "Conta sem mensalidade" },
  { icon: "arrowLeftRight", text: "Pix e TED ilimitados e gratuitos" },
  { icon: "creditCard", text: "Cartão Visa sem anuidade" },
  { icon: "landmark", text: "Cora: instituição regulada pelo Banco Central" },
] as const;

/* ------------------------------------------------------------
 * BENEFÍCIOS
 * ------------------------------------------------------------ */

export const benefits = {
  label: "BENEFÍCIOS",
  title: "O que a sua empresa ganha com a conta",
  items: [
    {
      icon: "badgeCheck",
      title: "Conta PJ gratuita",
      text: "Abertura e manutenção sem custo.",
    },
    {
      icon: "arrowLeftRight",
      title: "Pix e TED ilimitados",
      text: "Envie e receba sem tarifa.",
    },
    {
      icon: "receipt",
      title: "Boletos gratuitos",
      text: "Emissão ilimitada, com opção de QR Code Pix, multa, juros e desconto. Até 100 boletos pagos por mês sem custo.",
    },
    {
      icon: "creditCard",
      title: "Cartão Visa PJ sem anuidade",
      text: "Débito e crédito, cartões virtuais ilimitados para sócios e equipe.",
      note: "Função crédito sujeita a análise da Cora.",
    },
    {
      icon: "chart",
      title: "Gestão financeira no app",
      text: "Entradas, saídas e saldo em tempo real, além de acesso para o contador.",
    },
    {
      icon: "fileBadge",
      title: "Certificado digital gratuito",
      text: "Ao abrir e movimentar a conta, empreendedores com CNH podem ganhar um certificado digital e-CNPJ. Consulte as condições.",
    },
  ],
} as const;

/* ------------------------------------------------------------
 * COMO FUNCIONA
 * ------------------------------------------------------------ */

export const howItWorks = {
  label: "COMO FUNCIONA",
  title: "Três passos até a conta liberada",
  steps: [
    {
      title: "Você chama a LG no WhatsApp.",
      text: "A gente confere se a sua empresa pode abrir a conta e tira suas dúvidas.",
    },
    {
      title: "A gente acompanha o cadastro.",
      text: "Você preenche os dados no app ou no site da Cora, envia os documentos e faz uma selfie de segurança. O formulário leva cerca de 10 minutos.",
    },
    {
      title: "Conta aprovada.",
      text: "A aprovação costuma sair em minutos e pode levar até 5 dias úteis. A LG acompanha até a conta estar liberada.",
    },
  ],
  cta: "Começar agora no WhatsApp",
};

/* ------------------------------------------------------------
 * DOCUMENTOS
 * ------------------------------------------------------------ */

export const documents = {
  label: "DOCUMENTOS",
  title: "Documentos necessários",
  intro:
    "Tenha em mãos o CNPJ ativo e um documento com foto (RG ou CNH) da pessoa responsável. Conforme o tipo de empresa, a Cora também pede:",
  items: [
    {
      type: "ME, EPP, LTDA, SLU, EI",
      docs: "Contrato social ou documento de constituição atualizado.",
    },
    { type: "S/A", docs: "Estatuto social e ata de eleição da diretoria." },
    {
      type: "Associações, ONGs, instituições religiosas",
      docs: "Estatuto, ata de fundação e ata de eleição da diretoria.",
    },
    {
      type: "Cooperativas, Inova Simples, S/S, escritórios de advocacia",
      docs: "Documento de constituição. A LG orienta caso a caso pelo WhatsApp.",
    },
  ],
  note: "A Cora pode solicitar documentos adicionais durante a análise.",
};

/* ------------------------------------------------------------
 * PARA QUEM É
 * ------------------------------------------------------------ */

export const audience = {
  label: "PARA QUEM É",
  title: "Empresas de todo o Brasil",
  text: "Atendemos empresas de todos os portes e segmentos, em todo o Brasil.",
  chips: [
    "EI",
    "SLU",
    "LTDA",
    "S/S",
    "S/A",
    "Cooperativas",
    "Escritórios de advocacia",
    "Instituições religiosas",
    "ONGs e associações",
    "Inova Simples",
    "ME/EPP",
  ],
  notice: "No momento a LG não atende MEI.",
};

/* ------------------------------------------------------------
 * TARIFAS
 * ------------------------------------------------------------ */

export const fees = {
  label: "TARIFAS, SEM LETRA MIÚDA",
  title: "O que é gratuito e o que tem custo",
  columns: { service: "Serviço", value: "Valor" },
  items: [
    { service: "Abertura e manutenção da conta", value: "Grátis", free: true },
    { service: "Pix (enviar e receber)", value: "Grátis e ilimitado", free: true },
    { service: "TED", value: "Grátis e ilimitado", free: true },
    { service: "Emissão de boletos", value: "Grátis e ilimitada", free: true },
    {
      service: "Boletos pagos (compensados)",
      value: "Grátis até 100 por mês; acima disso, R$ 1,90 cada",
      free: false,
    },
    { service: "Pagamento de contas e tributos", value: "Grátis", free: true },
    { service: "Cartão de débito e crédito Visa", value: "Sem anuidade", free: true },
    { service: "Saque no Banco24Horas", value: "R$ 9,90 por saque", free: false },
    {
      service: "Atendimento da LG para abrir a conta",
      value: "Grátis para você",
      free: true,
    },
  ],
  footnote: `Tarifas da Cora (plano padrão) conferidas em ${feesCheckedAt}. Consulte a tabela vigente em cora.com.br.`,
};

/* ------------------------------------------------------------
 * POR QUE CONFIAR
 * ------------------------------------------------------------ */

export const trust = {
  label: "POR QUE CONFIAR NA LG",
  title: "Transparência do primeiro contato até a conta liberada",
  partnership: {
    title: "Parceria oficial",
    text: "Sua conta PJ é aberta no Cora, banco digital para empresas, regulado pelo Banco Central. A LG é parceira: cuidamos da abertura e do atendimento.",
  },
  remote: {
    title: "Atendimento remoto, como o próprio banco",
    text: "A conta é 100% digital. Você resolve tudo pelo celular, de qualquer estado, sem ir a uma agência.",
  },
  security: {
    title: "Segurança em primeiro lugar",
    items: [
      "A LG nunca pede senha, código de acesso ou depósito para abrir sua conta.",
      "O cadastro e os documentos são enviados direto no app ou site oficial da Cora.",
      "Na dúvida, confira o app oficial da Cora na App Store ou no Google Play.",
    ],
  },
  about: {
    title: "Quem somos",
    text: "LG são Lucas e Guilherme, dois sócios com o mesmo propósito: facilitar a vida financeira das empresas.",
    /** Caminho da foto dos sócios. Deixe vazio para usar o símbolo da marca. */
    photo: "" as string, // [FOTO DOS SÓCIOS]
  },
};

/* ------------------------------------------------------------
 * DEPOIMENTOS — só com autorização real. NUNCA inventar.
 * Ficam ocultos enquanto SHOW_TESTIMONIALS = false.
 * ------------------------------------------------------------ */

export const testimonials: { name: string; company: string; text: string }[] = [];

/* ------------------------------------------------------------
 * PERGUNTAS FREQUENTES
 * ------------------------------------------------------------ */

export const faq = {
  label: "DÚVIDAS FREQUENTES",
  title: "Perguntas que a gente mais recebe",
  items: [
    {
      q: "Em qual banco a conta é aberta?",
      a: "No Cora, banco digital para empresas, autorizado e regulado pelo Banco Central do Brasil.",
    },
    {
      q: "Vocês são o Cora?",
      a: "Não. A LG Soluções Financeiras é parceira do Cora: cuidamos da abertura da sua conta e do seu atendimento.",
    },
    {
      q: "Quanto custa?",
      a: "A conta não tem mensalidade, e o cartão não tem anuidade. O atendimento da LG para abrir a conta não tem custo para você. Veja os poucos serviços cobrados na seção de tarifas.",
    },
    {
      q: "Preciso ir a alguma agência?",
      a: "Não. Tudo é feito pelo celular, com o acompanhamento da LG pelo WhatsApp.",
    },
    {
      q: "Quanto tempo leva?",
      a: "O cadastro leva cerca de 10 minutos. A aprovação costuma sair em minutos e pode levar até 5 dias úteis.",
    },
    {
      q: "Quais documentos preciso?",
      a: "CNPJ ativo, documento com foto do responsável e o documento de constituição da empresa. Veja a lista completa por tipo de empresa.",
    },
    {
      q: "Vocês atendem a minha cidade?",
      a: "Sim, empresas de todos os estados do Brasil.",
    },
    {
      q: "MEI pode abrir conta com vocês?",
      a: "No momento a LG não atende MEI.",
    },
    {
      q: "O cartão de crédito é garantido?",
      a: "O cartão é sem anuidade. A função crédito depende de análise da Cora.",
    },
    {
      q: "É seguro passar meus dados?",
      a: "Seus documentos são enviados direto no app ou site oficial da Cora. A LG nunca pede senhas, códigos ou depósitos.",
    },
  ],
};

/* ------------------------------------------------------------
 * CTA FINAL
 * ------------------------------------------------------------ */

export const finalCta = {
  title: "Vamos abrir a conta da sua empresa?",
  text: "Chame a LG no WhatsApp e tire suas dúvidas agora.",
  cta: "Falar no WhatsApp agora",
};

/* ------------------------------------------------------------
 * RODAPÉ
 * ------------------------------------------------------------ */

export const footer = {
  legal:
    "A LG Soluções Financeiras é parceira da Cora e não é uma instituição financeira. A conta PJ é oferecida pela Cora, instituição financeira autorizada pelo Banco Central do Brasil. Concessão de crédito sujeita a análise.",
  links: [
    { label: "Política de privacidade", href: "/privacidade" },
    { label: "Termos de uso", href: "/termos" },
  ],
};

/* ------------------------------------------------------------
 * COOKIES (LGPD)
 * ------------------------------------------------------------ */

export const cookieBanner = {
  text: "Usamos cookies para medir os acessos e os cliques vindos dos anúncios. Você pode aceitar ou recusar.",
  accept: "Aceitar",
  reject: "Recusar",
  more: "Saiba mais",
};

/* ------------------------------------------------------------
 * FORMULÁRIO DE LEAD (ativo só com ENABLE_LEAD_FORM = true)
 * ------------------------------------------------------------ */

export const leadForm = {
  title: "Conte um pouco sobre a sua empresa",
  text: "Assim a gente já chega na conversa sabendo como ajudar.",
  submit: "Enviar e abrir o WhatsApp",
  meiMessage: "No momento a LG não atende MEI.",
  companyTypes: [
    "MEI",
    "EI",
    "SLU",
    "LTDA",
    "S/S",
    "S/A",
    "ME/EPP",
    "Cooperativa",
    "Escritório de advocacia",
    "Instituição religiosa",
    "ONG ou associação",
    "Inova Simples",
  ],
  segments: [
    "Comércio",
    "Serviços",
    "Indústria",
    "Saúde",
    "Tecnologia",
    "Educação",
    "Jurídico",
    "Terceiro setor",
    "Outro",
  ],
  states: [
    "AC", "AL", "AP", "AM", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG",
    "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO",
  ],
};

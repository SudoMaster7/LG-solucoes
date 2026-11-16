import { WHATSAPP_ROUTING, whatsappAgents, whatsappMessage } from "@/content/site";

export type Agent = (typeof whatsappAgents)[number];
export type Attribution = Partial<
  Record<"utm_source" | "utm_medium" | "utm_campaign" | "utm_content" | "fbclid", string>
>;

const AGENT_KEY = "lg_wa_agent";
const UTM_KEY = "lg_utm";
const UTM_FIELDS = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "fbclid"] as const;

// Cache por carregamento: se o storage falhar, todos os botões da página usam o mesmo sorteio.
let cachedAgent: Agent | null = null;

function fixedAgent(): Agent | null {
  if (!WHATSAPP_ROUTING.startsWith("fixed:")) return null;
  const id = WHATSAPP_ROUTING.slice("fixed:".length);
  return whatsappAgents.find((a) => a.id === id) ?? null;
}

/** Atendente usado na renderização no servidor (antes do JS rodar). */
export function defaultAgent(): Agent {
  return fixedAgent() ?? whatsappAgents[0];
}

/** Atendente do visitante: fixo pela configuração, ou sorteado 50/50 e lembrado no localStorage. */
export function resolveAgent(): Agent {
  const fixed = fixedAgent();
  if (fixed) return fixed;
  if (cachedAgent) return cachedAgent;

  try {
    const saved = window.localStorage.getItem(AGENT_KEY);
    const found = whatsappAgents.find((a) => a.id === saved);
    if (found) return (cachedAgent = found);
  } catch {
    /* storage bloqueado: segue para o sorteio */
  }

  const picked = whatsappAgents[Math.floor(Math.random() * whatsappAgents.length)];
  cachedAgent = picked;
  try {
    window.localStorage.setItem(AGENT_KEY, picked.id);
  } catch {
    /* sem storage: sorteia a cada carregamento */
  }
  return picked;
}

/** Lê UTMs e fbclid da URL e guarda na sessão. Chamar uma vez no carregamento. */
export function captureAttribution(): void {
  try {
    const params = new URLSearchParams(window.location.search);
    const found: Attribution = {};
    for (const key of UTM_FIELDS) {
      const value = params.get(key);
      if (value) found[key] = value.slice(0, 200);
    }
    if (Object.keys(found).length === 0) return;
    const current = getAttribution();
    window.sessionStorage.setItem(UTM_KEY, JSON.stringify({ ...current, ...found }));
  } catch {
    /* ignora */
  }
}

export function getAttribution(): Attribution {
  try {
    const raw = window.sessionStorage.getItem(UTM_KEY);
    if (raw) return JSON.parse(raw) as Attribution;
  } catch {
    /* ignora */
  }
  // Sem sessionStorage: lê direto da URL atual.
  try {
    const params = new URLSearchParams(window.location.search);
    const out: Attribution = {};
    for (const key of UTM_FIELDS) {
      const value = params.get(key);
      if (value) out[key] = value;
    }
    return out;
  } catch {
    return {};
  }
}

export function buildMessage(attribution: Attribution = {}): string {
  return attribution.utm_campaign
    ? `${whatsappMessage} (ref: ${attribution.utm_campaign})`
    : whatsappMessage;
}

export function buildWhatsAppUrl(agent: Agent, attribution: Attribution = {}): string {
  return `https://wa.me/${agent.number}?text=${encodeURIComponent(buildMessage(attribution))}`;
}

export function isMobileDevice(): boolean {
  if (typeof navigator === "undefined") return false;
  return /Android|iPhone|iPad|iPod|Mobile|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/** Abre o WhatsApp: no celular direto no app (mesma aba), no desktop em nova aba. */
export function openWhatsApp(url: string): void {
  if (isMobileDevice()) {
    window.location.href = url;
  } else {
    const win = window.open(url, "_blank", "noopener,noreferrer");
    if (!win) window.location.href = url;
  }
}

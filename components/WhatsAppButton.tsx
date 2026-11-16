"use client";

import { useEffect, useState, type MouseEvent, type ReactNode } from "react";
import { MessageCircle } from "lucide-react";
import { ENABLE_LEAD_FORM, whatsappAgents } from "@/content/site";
import { trackEvent } from "@/lib/tracking";
import {
  buildWhatsAppUrl,
  defaultAgent,
  getAttribution,
  isMobileDevice,
  resolveAgent,
} from "@/lib/whatsapp";

export type CtaId = "header" | "hero" | "como-funciona" | "final" | "flutuante" | "rodape";

export const LEAD_FORM_EVENT = "lg:lead-form";

type Props = {
  cta: CtaId;
  children?: ReactNode;
  className?: string;
  ariaLabel?: string;
  showIcon?: boolean;
  iconSize?: number;
  onNavigate?: () => void;
  /** Força um atendente específico (ex.: número listado no rodapé). */
  agentId?: string;
};

function pickAgent(agentId?: string) {
  return (agentId && whatsappAgents.find((a) => a.id === agentId)) || resolveAgent();
}

export default function WhatsAppButton({
  cta,
  children,
  className = "",
  ariaLabel,
  showIcon = true,
  iconSize = 20,
  onNavigate,
  agentId,
}: Props) {
  // No servidor o link aponta para o atendente padrão; no navegador, para o atendente sorteado.
  const [href, setHref] = useState(() =>
    buildWhatsAppUrl((agentId && whatsappAgents.find((a) => a.id === agentId)) || defaultAgent())
  );

  useEffect(() => {
    setHref(buildWhatsAppUrl(pickAgent(agentId), getAttribution()));
  }, [agentId]);

  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    onNavigate?.();

    if (ENABLE_LEAD_FORM) {
      event.preventDefault();
      window.dispatchEvent(new CustomEvent(LEAD_FORM_EVENT, { detail: { cta, agentId } }));
      return;
    }

    const agent = pickAgent(agentId);
    const url = buildWhatsAppUrl(agent, getAttribution());
    trackEvent("Contact", { content_name: cta, agent: agent.id });

    if (isMobileDevice()) {
      // No celular, abre direto no app do WhatsApp.
      event.preventDefault();
      window.location.href = url;
    } else if (event.currentTarget.href !== url) {
      event.preventDefault();
      window.open(url, "_blank", "noopener,noreferrer");
    }
    // Caso contrário, o link segue normalmente em nova aba (target=_blank).
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      data-cta={cta}
      aria-label={ariaLabel}
      onClick={handleClick}
      className={className}
    >
      {showIcon && <MessageCircle size={iconSize} strokeWidth={1.75} aria-hidden="true" className="shrink-0" />}
      {children}
    </a>
  );
}

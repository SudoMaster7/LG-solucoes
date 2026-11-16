/* Rastreamento: só funciona depois do aceite de cookies (LGPD). */

export type Consent = "accepted" | "rejected" | null;

const CONSENT_KEY = "lg_cookie_consent";
export const CONSENT_EVENT = "lg:consent";

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export function getConsent(): Consent {
  try {
    const value = window.localStorage.getItem(CONSENT_KEY);
    return value === "accepted" || value === "rejected" ? value : null;
  } catch {
    return null;
  }
}

export function setConsent(value: Exclude<Consent, null>): void {
  try {
    window.localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* sem storage: vale só para esta visita */
  }
  window.dispatchEvent(new CustomEvent(CONSENT_EVENT, { detail: value }));
}

function newEventId(): string {
  try {
    return crypto.randomUUID();
  } catch {
    return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
  }
}

/**
 * Dispara um evento no Pixel da Meta (se aceito e carregado) e, se a
 * Conversions API estiver ligada, envia o mesmo event_id para /api/track.
 */
export function trackEvent(name: string, params: Record<string, unknown> = {}): void {
  if (typeof window === "undefined" || getConsent() !== "accepted") return;
  const eventId = newEventId();

  if (window.fbq) {
    window.fbq("track", name, params, { eventID: eventId });
  }

  if (process.env.NEXT_PUBLIC_ENABLE_CAPI === "true") {
    const body = JSON.stringify({
      event_name: name,
      event_id: eventId,
      event_source_url: window.location.href,
      custom_data: params,
    });
    try {
      if (navigator.sendBeacon) {
        navigator.sendBeacon("/api/track", new Blob([body], { type: "application/json" }));
      } else {
        void fetch("/api/track", { method: "POST", body, keepalive: true, headers: { "Content-Type": "application/json" } });
      }
    } catch {
      /* ignora */
    }
  }
}

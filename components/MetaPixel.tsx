"use client";

import { useEffect } from "react";
import { CONSENT_EVENT, getConsent, trackEvent } from "@/lib/tracking";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

let loaded = false;

function loadPixel(id: string) {
  if (loaded || typeof window === "undefined") return;
  loaded = true;

  // Snippet oficial da Meta (fbevents.js), carregado só após o aceite.
  /* eslint-disable */
  (function (f: any, b: Document, e: string, v: string) {
    if (f.fbq) return;
    const n: any = (f.fbq = function (...args: unknown[]) {
      n.callMethod ? n.callMethod.apply(n, args) : n.queue.push(args);
    });
    if (!f._fbq) f._fbq = n;
    n.push = n;
    n.loaded = true;
    n.version = "2.0";
    n.queue = [];
    const t = b.createElement(e) as HTMLScriptElement;
    t.async = true;
    t.src = v;
    const s = b.getElementsByTagName(e)[0];
    s.parentNode!.insertBefore(t, s);
  })(window, document, "script", "https://connect.facebook.net/en_US/fbevents.js");
  /* eslint-enable */

  window.fbq!("init", id);
  trackEvent("PageView");
}

/** Carrega o Pixel da Meta somente com NEXT_PUBLIC_META_PIXEL_ID definido e cookies aceitos. */
export default function MetaPixel() {
  useEffect(() => {
    if (!PIXEL_ID) return;
    if (getConsent() === "accepted") loadPixel(PIXEL_ID);
    const onConsent = (e: Event) => {
      if ((e as CustomEvent).detail === "accepted") loadPixel(PIXEL_ID);
    };
    window.addEventListener(CONSENT_EVENT, onConsent);
    return () => window.removeEventListener(CONSENT_EVENT, onConsent);
  }, []);

  return null;
}

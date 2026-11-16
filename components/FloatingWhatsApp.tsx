"use client";

import { useEffect, useState } from "react";
import WhatsAppButton from "./WhatsAppButton";

/** Botão flutuante. Some quando o CTA final está visível para não duplicar. */
export default function FloatingWhatsApp() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const target = document.getElementById("cta-final");
    if (!target || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver((entries) => setHidden(entries.some((e) => e.isIntersecting)), {
      threshold: 0.15,
    });
    io.observe(target);
    return () => io.disconnect();
  }, []);

  return (
    <div
      className={`fixed right-4 z-30 transition-opacity duration-200 md:right-6 ${
        hidden ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
      style={{ bottom: "calc(16px + env(safe-area-inset-bottom))" }}
      aria-hidden={hidden}
    >
      <WhatsAppButton
        cta="flutuante"
        ariaLabel="Falar no WhatsApp"
        iconSize={28}
        className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg shadow-navy/25 hover:bg-brand-hover md:h-16 md:w-16"
      />
    </div>
  );
}

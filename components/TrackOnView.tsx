"use client";

import { useEffect, useRef } from "react";
import { trackEvent } from "@/lib/tracking";

/** Dispara um evento uma única vez quando o bloco entra na tela. */
export default function TrackOnView({
  event,
  params,
  children,
}: {
  event: string;
  params?: Record<string, unknown>;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          trackEvent(event, params);
          io.disconnect();
        }
      },
      { threshold: 0.3 }
    );
    io.observe(el);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [event]);

  return <div ref={ref}>{children}</div>;
}

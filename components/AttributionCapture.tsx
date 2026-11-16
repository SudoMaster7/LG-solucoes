"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/whatsapp";

/** Guarda UTMs e fbclid da URL na sessão, para levar a origem até o WhatsApp. */
export default function AttributionCapture() {
  useEffect(() => {
    captureAttribution();
  }, []);
  return null;
}

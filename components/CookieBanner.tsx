"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { cookieBanner } from "@/content/site";
import { getConsent, setConsent } from "@/lib/tracking";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(getConsent() === null);
  }, []);

  if (!visible) return null;

  const choose = (value: "accepted" | "rejected") => {
    setConsent(value);
    setVisible(false);
  };

  return (
    <div
      role="region"
      aria-label="Aviso de cookies"
      className="fixed inset-x-0 bottom-0 z-[45] border-t border-line bg-white shadow-[0_-4px_16px_rgba(11,37,69,0.08)]"
      style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
    >
      <div className="container-lg flex flex-col gap-3 py-4 md:flex-row md:items-center md:justify-between md:gap-6">
        <p className="text-[0.9375rem] text-ink">
          {cookieBanner.text}{" "}
          <Link href="/privacidade" className="font-semibold text-navy underline underline-offset-2">
            {cookieBanner.more}
          </Link>
        </p>
        <div className="flex shrink-0 gap-3">
          <button
            type="button"
            onClick={() => choose("rejected")}
            className="min-h-[44px] flex-1 rounded-btn border border-navy px-5 font-semibold text-navy hover:bg-offwhite md:flex-none"
          >
            {cookieBanner.reject}
          </button>
          <button
            type="button"
            onClick={() => choose("accepted")}
            className="min-h-[44px] flex-1 rounded-btn bg-navy px-5 font-semibold text-white hover:bg-navy-700 md:flex-none"
          >
            {cookieBanner.accept}
          </button>
        </div>
      </div>
    </div>
  );
}

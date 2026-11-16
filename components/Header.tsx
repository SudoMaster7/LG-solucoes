"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { headerCta, nav } from "@/content/site";
import { LgLogo } from "./Brand";
import WhatsAppButton from "./WhatsAppButton";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback((returnFocus = true) => {
    setOpen(false);
    if (returnFocus) toggleRef.current?.focus();
  }, []);

  // Drawer: trava o scroll do fundo, fecha com Esc e mantém o foco dentro.
  useEffect(() => {
    if (!open) return;
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    closeRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "Tab" && drawerRef.current) {
        const items = drawerRef.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
        if (!items.length) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    const onResize = () => window.innerWidth >= 1024 && close(false);
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open, close]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,box-shadow] duration-200 ${
        solid ? "bg-white shadow-header" : "on-dark bg-transparent"
      }`}
    >
      <div className="container-lg flex h-16 items-center justify-between gap-3 lg:h-20">
        <Link href="/" aria-label="LG Soluções Financeiras — início" className="flex min-h-[44px] items-center">
          <LgLogo negative={!solid} priority height={36} className="lg:hidden" />
          <LgLogo negative={!solid} priority height={44} className="hidden lg:block" />
        </Link>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-2">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={`/${item.href}`}
                  className={`inline-flex min-h-[44px] items-center rounded-btn px-3 text-[0.9375rem] font-semibold transition-colors ${
                    solid ? "text-navy hover:text-brand" : "text-white/90 hover:text-white"
                  }`}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <WhatsAppButton cta="header" className="btn-whatsapp min-h-[44px] px-3 text-[0.9375rem] lg:px-5" iconSize={18}>
            <span className="lg:hidden">{headerCta.compact}</span>
            <span className="hidden lg:inline">{headerCta.full}</span>
          </WhatsAppButton>

          <button
            ref={toggleRef}
            type="button"
            className={`inline-flex h-11 w-11 items-center justify-center rounded-btn lg:hidden ${
              solid ? "text-navy" : "text-white"
            }`}
            aria-label="Abrir menu"
            aria-expanded={open}
            aria-controls="menu-mobile"
            onClick={() => setOpen(true)}
          >
            <Menu size={26} strokeWidth={1.75} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Drawer mobile */}
      <div
        className={`fixed inset-0 z-50 lg:hidden ${open ? "" : "pointer-events-none invisible"}`}
        aria-hidden={!open}
      >
        <div
          className={`absolute inset-0 bg-navy/60 transition-opacity duration-200 ${open ? "opacity-100" : "opacity-0"}`}
          onClick={() => close()}
        />
        <div
          ref={drawerRef}
          id="menu-mobile"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
          className={`absolute inset-y-0 right-0 flex w-[min(320px,86vw)] flex-col bg-white shadow-xl transition-transform duration-200 ${
            open ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex h-16 items-center justify-between border-b border-line px-5">
            <LgLogo height={32} />
            <button
              ref={closeRef}
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-btn text-navy"
              aria-label="Fechar menu"
              onClick={() => close()}
            >
              <X size={26} strokeWidth={1.75} aria-hidden="true" />
            </button>
          </div>
          <nav aria-label="Menu mobile" className="flex-1 overflow-y-auto px-5 py-4">
            <ul className="flex flex-col gap-2">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={`/${item.href}`}
                    onClick={() => close(false)}
                    className="flex min-h-[48px] items-center rounded-btn px-3 text-lg font-semibold text-navy hover:bg-offwhite"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div
            className="border-t border-line p-5"
            style={{ paddingBottom: "calc(20px + env(safe-area-inset-bottom))" }}
          >
            <WhatsAppButton cta="header"className="btn-whatsapp w-full" onNavigate={() => close(false)}>
              {headerCta.full}
            </WhatsAppButton>
          </div>
        </div>
      </div>
    </header>
  );
}

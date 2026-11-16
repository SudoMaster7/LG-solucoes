"use client";

import { useId, useState, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export type AccordionItem = { title: string; content: ReactNode };

/** Accordion acessível: botões com aria-expanded/aria-controls, operável por teclado. */
export default function Accordion({ items, headingLevel = 3 }: { items: AccordionItem[]; headingLevel?: 3 | 4 }) {
  const [open, setOpen] = useState<number | null>(null);
  const baseId = useId();
  const Heading = `h${headingLevel}` as "h3" | "h4";

  return (
    <div className="divide-y divide-line overflow-hidden rounded-card border border-line bg-white">
      {items.map((item, i) => {
        const expanded = open === i;
        const buttonId = `${baseId}-btn-${i}`;
        const panelId = `${baseId}-panel-${i}`;
        return (
          <div key={item.title}>
            <Heading className="text-base font-semibold">
              <button
                id={buttonId}
                type="button"
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? null : i)}
                className="flex min-h-[56px] w-full items-center justify-between gap-4 px-5 py-4 text-left text-[1rem] font-semibold text-navy hover:bg-offwhite md:text-[1.0625rem]"
              >
                <span>{item.title}</span>
                <ChevronDown
                  size={22}
                  strokeWidth={1.75}
                  aria-hidden="true"
                  className={`shrink-0 text-brand transition-transform duration-200 ${expanded ? "rotate-180" : ""}`}
                />
              </button>
            </Heading>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              hidden={!expanded}
              className="px-5 pb-5 text-muted"
            >
              {item.content}
            </div>
          </div>
        );
      })}
    </div>
  );
}

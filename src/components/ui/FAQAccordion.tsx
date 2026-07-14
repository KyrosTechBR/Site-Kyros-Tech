"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export function FAQAccordion({ items }: { items: { question: string; answer: string }[] }) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <div className="divide-y divide-border overflow-hidden rounded-2xl border border-border bg-white/[0.03]">
      {items.map((item, index) => {
        const open = openIndex === index;
        const contentId = `faq-panel-${index}`;
        return (
          <div key={item.question}>
            <button
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-5 text-left text-sm font-semibold text-white transition hover:bg-white/[0.04]"
              aria-expanded={open}
              aria-controls={contentId}
              onClick={() => setOpenIndex(open ? -1 : index)}
            >
              {item.question}
              <ChevronDown className={cn("size-5 shrink-0 transition", open && "rotate-180")} aria-hidden="true" />
            </button>
            <div id={contentId} role="region" hidden={!open} className="px-5 pb-5 text-sm leading-6 text-muted">
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}

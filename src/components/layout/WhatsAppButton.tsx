"use client";

import { MessageCircle } from "lucide-react";
import { usePathname } from "next/navigation";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const pathname = usePathname();
  const hideFloatingButton = pathname === "/contato" || pathname.startsWith("/demo");

  if (hideFloatingButton) {
    return null;
  }

  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Fale com a Kyros Tech pelo WhatsApp"
      className="group fixed bottom-4 right-4 z-40 grid size-12 place-items-center rounded-full border border-emerald-300/35 bg-emerald-500 text-white shadow-2xl shadow-emerald-950/40 transition hover:bg-emerald-400 focus-visible:outline-primary-light sm:bottom-6 sm:right-6 sm:size-14"
    >
      <span className="pointer-events-none absolute bottom-full right-0 mb-3 hidden whitespace-nowrap rounded-lg border border-border bg-slate-950/95 px-3 py-2 text-xs font-semibold text-white shadow-xl shadow-black/30 group-hover:block group-focus-visible:block">
        Fale com a Kyros Tech
      </span>
      <MessageCircle className="size-5 sm:size-6" aria-hidden="true" />
      <span className="sr-only">Abrir conversa no WhatsApp</span>
    </a>
  );
}

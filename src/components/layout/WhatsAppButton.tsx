import { MessageCircle } from "lucide-react";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton() {
  const href = getWhatsAppLink();

  if (!href) {
    return null;
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label="Falar com a Kyros Tech pelo WhatsApp"
      className="fixed bottom-5 right-5 z-40 grid size-14 place-items-center rounded-full bg-emerald-500 text-white shadow-2xl shadow-emerald-950/40 transition hover:scale-105 hover:bg-emerald-400"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}

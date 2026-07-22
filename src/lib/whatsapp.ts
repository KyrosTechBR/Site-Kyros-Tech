import { siteConfig } from "@/config/site";

export function sanitizePhoneNumber(phone?: string | null) {
  return phone?.replace(/\D/g, "") ?? "";
}

export function getWhatsAppLink(message: string = siteConfig.whatsappMessages.general) {
  return `${siteConfig.phone.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getBudgetWhatsAppLink() {
  return getWhatsAppLink(siteConfig.whatsappMessages.budget);
}

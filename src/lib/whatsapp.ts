const DEFAULT_MESSAGE =
  "Olá! Conheci a Kyros Tech pelo site e gostaria de saber mais sobre as soluções.";

export function sanitizePhoneNumber(phone?: string | null) {
  return phone?.replace(/\D/g, "") ?? "";
}

export function getWhatsAppLink(message = DEFAULT_MESSAGE) {
  const number = sanitizePhoneNumber(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER);

  if (!number) {
    return null;
  }

  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

import type { ContactFormValues } from "@/lib/validations";

export async function handleContactSubmission(data: ContactFormValues) {
  const safePayload = {
    name: data.name,
    company: data.company || "Não informado",
    phoneLastDigits: data.phone.replace(/\D/g, "").slice(-4),
    emailDomain: data.email.split("@")[1] ?? "domínio-não-identificado",
    solutionType: data.solutionType,
    messageLength: data.message.length,
    receivedAt: new Date().toISOString(),
  };

  console.info("[contact-form]", safePayload);

  return { ok: true };
}

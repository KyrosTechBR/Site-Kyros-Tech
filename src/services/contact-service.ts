import nodemailer from "nodemailer";
import { siteConfig } from "@/config/site";
import type { ContactFormValues } from "@/lib/validations";

export class ContactSubmissionError extends Error {
  constructor(message: string, public status = 500) {
    super(message);
  }
}

export async function handleContactSubmission(data: ContactFormValues) {
  assertSmtpConfigured();

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT),
    secure: Number(process.env.SMTP_PORT) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  await transporter.sendMail({
    from: formatAddress(process.env.SMTP_FROM_NAME || siteConfig.name, process.env.SMTP_FROM_EMAIL || siteConfig.emails.noreply),
    to: siteConfig.emails.contact,
    replyTo: formatAddress(data.name, data.email),
    subject: `Contato pelo site - ${data.solutionType}`,
    text: buildTextMessage(data),
    html: buildHtmlMessage(data),
  });

  return { ok: true };
}

function assertSmtpConfigured() {
  const required = ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASSWORD", "SMTP_FROM_EMAIL"] as const;
  const missing = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    throw new ContactSubmissionError("Envio de e-mail ainda não configurado.", 503);
  }
}

function buildTextMessage(data: ContactFormValues) {
  return [
    "Novo contato pelo site da Kyros Tech",
    "",
    `Nome: ${data.name}`,
    `Empresa: ${data.company || "Não informada"}`,
    `Telefone: ${data.phone}`,
    `E-mail: ${data.email}`,
    `Tipo de solução: ${data.solutionType}`,
    "",
    "Mensagem:",
    data.message,
  ].join("\n");
}

function buildHtmlMessage(data: ContactFormValues) {
  const rows = [
    ["Nome", data.name],
    ["Empresa", data.company || "Não informada"],
    ["Telefone", data.phone],
    ["E-mail", data.email],
    ["Tipo de solução", data.solutionType],
  ];

  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6;">
      <h1 style="font-size: 20px; margin: 0 0 16px;">Novo contato pelo site da Kyros Tech</h1>
      <table style="border-collapse: collapse; width: 100%; max-width: 640px;">
        <tbody>
          ${rows.map(([label, value]) => `
            <tr>
              <td style="border: 1px solid #dbeafe; padding: 8px 10px; font-weight: 700; width: 160px;">${escapeHtml(label)}</td>
              <td style="border: 1px solid #dbeafe; padding: 8px 10px;">${escapeHtml(value)}</td>
            </tr>
          `).join("")}
        </tbody>
      </table>
      <h2 style="font-size: 16px; margin: 20px 0 8px;">Mensagem</h2>
      <p style="white-space: pre-line; margin: 0; padding: 12px; background: #f8fafc; border: 1px solid #dbeafe; border-radius: 8px;">${escapeHtml(data.message)}</p>
    </div>
  `;
}

function formatAddress(name: string, email: string) {
  return `"${name.replace(/"/g, "'")}" <${email}>`;
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

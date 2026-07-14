import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2, "Informe seu nome.").max(100, "Nome muito longo."),
  company: z.string().trim().max(120, "Empresa muito longa.").optional().or(z.literal("")),
  phone: z.string().trim().min(8, "Informe um telefone válido.").max(30, "Telefone muito longo."),
  email: z.email("Informe um e-mail válido.").max(160, "E-mail muito longo."),
  solutionType: z.enum([
    "Kyros Clock",
    "AgendaBKy",
    "Desenvolvimento de site",
    "Sistema personalizado",
    "Automação de processos",
    "Outro",
  ]),
  message: z.string().trim().min(10, "Descreva brevemente sua necessidade.").max(1500, "Mensagem muito longa."),
  consent: z.boolean().refine((value) => value, "Aceite a política de privacidade para contínuar."),
});

export type ContactFormValues = z.infer<typeof contactSchema>;

export const siteConfig = {
  name: "Kyros Tech",
  slogan: "Tecnologia que transforma negócios.",
  domain: "kyrostech.com.br",
  website: "https://kyrostech.com.br",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://kyrostech.com.br",
  description:
    "A Kyros Tech desenvolve sites, sistemas, automações de processos, soluções com inteligência artificial e produtos SaaS para empresas.",
  phone: {
    display: "+55 (38) 9725-7847",
    number: "553897257847",
    whatsapp: "https://wa.me/553897257847",
  },
  emails: {
    contact: "contato@kyrostech.com.br",
    commercial: "comercial@kyrostech.com.br",
    support: "suporte@kyrostech.com.br",
    financial: "financeiro@kyrostech.com.br",
    marketing: "marketing@kyrostech.com.br",
    noreply: "noreply@kyrostech.com.br",
  },
  social: {
    instagram: "https://www.instagram.com/kyrostech_br/",
    facebook: "https://www.facebook.com/profile.php?id=61591905332894",
    youtube: "https://www.youtube.com/@KyrosTechBR",
    linkedin: "https://www.linkedin.com/company/kyros-tech-br/?viewAsMember=true",
    tiktok: "https://www.tiktok.com/@kyrostech_br",
  },
  whatsappMessages: {
    general: "Olá! Vim pelo site da Kyros Tech e gostaria de saber mais sobre as soluções da empresa.",
    budget: "Olá! Vim pelo site da Kyros Tech e gostaria de solicitar um orçamento.",
  },
  businessHours: "Segunda a sexta, em horário comercial",
  address: "",
  keywords: [
    "Kyros Tech",
    "Desenvolvimento de sistemas",
    "Desenvolvimento de sites",
    "Automação de processos",
    "Inteligência artificial para empresas",
    "Ponto eletrônico",
    "Sistema de agendamento",
    "Software para empresas",
    "Sistemas personalizados",
    "Tecnologia para pequenas empresas",
    "Kyros Clock",
    "AgendaBKy",
  ],
} as const;

export type SocialKey = keyof typeof siteConfig.social;
export type EmailKey = keyof typeof siteConfig.emails;

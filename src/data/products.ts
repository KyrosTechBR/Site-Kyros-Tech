import {
  BriefcaseBusiness,
  CalendarClock,
  Code2,
  Workflow,
  type LucideIcon,
} from "lucide-react";

export type Product = {
  name: string;
  href: string;
  demoHref?: string;
  eyebrow: string;
  description: string;
  features: string[];
  cta: string;
  icon: LucideIcon;
};

export const products: Product[] = [
  {
    name: "Kyros Clock",
    href: "/kyros-clock",
    demoHref: "/demo/kyros-work",
    eyebrow: "Jornada e colaborador",
    description: "Sistema inteligente de jornada, ponto eletrônico e portal do colaborador.",
    features: [
      "Registro de ponto",
      "Gestão de jornada",
      "Solicitação de ajustes",
      "Calendário",
      "Portal do colaborador",
      "Painel administrativo",
      "Histórico de registros",
      "Controle de funcionários",
    ],
    cta: "Conhecer o Kyros Clock",
    icon: BriefcaseBusiness,
  },
  {
    name: "AgendaBKy",
    href: "/agendabky",
    demoHref: "/demo/agendabky",
    eyebrow: "Agendamento online",
    description:
      "Sistema de agendamento para barbearias, salões, clínicas, estúdios e profissionais autônomos.",
    features: [
      "Agendamento online",
      "Agenda por profissional",
      "Gestão de horários",
      "Cadastro de serviços",
      "Cadastro de clientes",
      "Confirmação de atendimento",
      "Redução de horários vagos",
    ],
    cta: "Conhecer o AgendaBKy",
    icon: CalendarClock,
  },
  {
    name: "Desenvolvimento de sites",
    href: "/desenvolvimento-de-sites",
    eyebrow: "Presença digital",
    description:
      "Sites modernos, rápidos e responsivos para empresas que querem fortalecer sua presença digital.",
    features: [
      "Design personalizado",
      "Responsividade",
      "SEO",
      "Integração com WhatsApp",
      "Formulários",
      "Domínio e hospedagem",
      "Manutenção",
    ],
    cta: "Solicitar orçamento",
    icon: Code2,
  },
  {
    name: "Automação de processos",
    href: "/automacao-de-processos",
    eyebrow: "Operação eficiente",
    description:
      "Soluções desenvolvidas para eliminar tarefas repetitivas e melhorar a operação de empresas.",
    features: [
      "Digitalização de processos",
      "Painéis administrativos",
      "Relatórios",
      "Integrações",
      "Sistemas internos",
      "Fluxos personalizados",
    ],
    cta: "Automatizar processos",
    icon: Workflow,
  },
];

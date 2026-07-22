import type { Metadata } from "next";
import {
  BriefcaseBusiness,
  Camera,
  Headphones,
  Mail,
  Megaphone,
  MessageCircle,
  Music2,
  Play,
  ReceiptText,
  Send,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";
import { getBudgetWhatsAppLink, getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Kyros Tech por e-mail, WhatsApp ou redes sociais oficiais.",
  alternates: { canonical: "/contato" },
};

const contactChannels: Array<{
  title: string;
  description: string;
  value: string;
  href: string;
  icon: LucideIcon;
}> = [
  {
    title: "Contato geral",
    description: "Dúvidas, informações institucionais e primeiro atendimento.",
    value: siteConfig.emails.contact,
    href: `mailto:${siteConfig.emails.contact}`,
    icon: Mail,
  },
  {
    title: "Orçamentos e propostas",
    description: "Projetos, escopos comerciais e propostas para empresas.",
    value: siteConfig.emails.commercial,
    href: `mailto:${siteConfig.emails.commercial}`,
    icon: Send,
  },
  {
    title: "Suporte técnico",
    description: "Ajuda relacionada a produtos, sistemas e atendimento técnico.",
    value: siteConfig.emails.support,
    href: `mailto:${siteConfig.emails.support}`,
    icon: Headphones,
  },
  {
    title: "Financeiro",
    description: "Assuntos financeiros, cobranças e documentos comerciais.",
    value: siteConfig.emails.financial,
    href: `mailto:${siteConfig.emails.financial}`,
    icon: ReceiptText,
  },
  {
    title: "Marketing",
    description: "Parcerias, publicidade, imprensa e ações de divulgação.",
    value: siteConfig.emails.marketing,
    href: `mailto:${siteConfig.emails.marketing}`,
    icon: Megaphone,
  },
  {
    title: "WhatsApp",
    description: "Atendimento rápido para conhecer soluções e solicitar orçamento.",
    value: siteConfig.phone.display,
    href: getWhatsAppLink(),
    icon: MessageCircle,
  },
];

const socialLinks: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: Camera },
  { label: "Facebook", href: siteConfig.social.facebook, icon: Users },
  { label: "YouTube", href: siteConfig.social.youtube, icon: Play },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: BriefcaseBusiness },
  { label: "TikTok", href: siteConfig.social.tiktok, icon: Music2 },
];

export default function ContactPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Contato", href: "/contato" }]} />
      <section className="pb-20 pt-12">
        <Container className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          <div>
            <SectionHeading
              eyebrow="Contato"
              title="Fale com a Kyros Tech"
              description="Escolha o canal mais adequado para o seu assunto. Se preferir, envie uma mensagem pelo formulário e nossa equipe retornará pelos dados informados."
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {contactChannels.map((channel) => (
                <ContactCard key={channel.title} {...channel} />
              ))}
            </div>
            <div className="mt-8 rounded-2xl border border-border bg-white/[0.03] p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-white">Solicitar orçamento</h2>
                  <p className="mt-2 text-sm leading-6 text-muted">
                    Para falar sobre escopo, prazos e valores, use o WhatsApp comercial ou envie e-mail para {siteConfig.emails.commercial}.
                  </p>
                </div>
                <a
                  href={getBudgetWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 shrink-0 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-500"
                >
                  <MessageCircle className="size-4" aria-hidden="true" />
                  Pedir orçamento
                </a>
              </div>
            </div>
            <section className="mt-8 rounded-2xl border border-border bg-white/[0.03] p-5" aria-labelledby="social-title">
              <h2 id="social-title" className="text-lg font-semibold text-white">Siga a Kyros Tech</h2>
              <div className="mt-5 flex flex-wrap gap-3">
                {socialLinks.map(({ label, href, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Acessar ${label} da Kyros Tech`}
                    className="inline-flex min-h-11 items-center gap-2 rounded-full border border-border bg-white/[0.04] px-4 text-sm font-semibold text-sky-100 transition hover:border-primary-light/70 hover:bg-sky-400/10 hover:text-white"
                  >
                    <Icon className="size-4" aria-hidden="true" />
                    {label}
                  </a>
                ))}
              </div>
            </section>
          </div>
          <div className="glass rounded-2xl p-6">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function ContactCard({
  title,
  description,
  value,
  href,
  icon: Icon,
}: {
  title: string;
  description: string;
  value: string;
  href: string;
  icon: LucideIcon;
}) {
  const external = href.startsWith("http");

  return (
    <article className="rounded-2xl border border-border bg-white/[0.03] p-5">
      <Icon className="size-5 text-sky-300" aria-hidden="true" />
      <h2 className="mt-3 text-sm font-semibold text-white">{title}</h2>
      <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
      <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="mt-4 inline-flex min-h-10 items-center rounded-lg border border-border bg-white/[0.04] px-3 text-sm font-semibold text-sky-100 transition hover:border-primary-light/70 hover:bg-sky-400/10 hover:text-white"
      >
        {value}
      </a>
    </article>
  );
}

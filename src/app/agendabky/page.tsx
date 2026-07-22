import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { ProductHero } from "@/components/products/ProductHero";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { JsonLd } from "@/components/seo/JsonLd";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "AgendaBKy",
  description: "Sistema de agendamento para barbearias, salões, clínicas, estúdios e profissionais autônomos.",
  alternates: { canonical: "/agendabky" },
};

const features = ["Agenda online", "Gestão de profissionais", "Cadastro de serviços", "Cadastro de clientes", "Controle de horários", "Visualização diária, semanal e mensal", "Confirmação de agendamentos", "Histórico de atendimentos", "Painel administrativo", "Acesso por celular"];
const problems = ["Horários anotados em papel", "Mensagens perdidas", "Agendamentos duplicados", "Clientes esquecendo o horário", "Dificuldade de acompanhar a equipe"];
const benefits = ["Agenda centralizada", "Mais organização", "Menos erros", "Melhor atendimento", "Visão clara dos horários disponíveis"];

export default function AgendaBKyPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "AgendaBKy", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: `${siteConfig.url}/agendabky`, description: metadata.description }} />
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "AgendaBKy", href: "/agendabky" }]} />
      <ProductHero
        name="AgendaBKy"
        subtitle="Agendamentos online com mais controle e menos ruído"
        description="Sistema de agendamento pensado para barbearias, salões, clínicas, estúdios e profissionais que precisam organizar horários e atender melhor seus clientes."
        cta="Testar demonstração"
        ctaHref="/demo/agendabky"
        ctaVariant="secondary"
        mockup="agenda"
      />
      <section className="py-16">
        <Container>
          <SectionHeading title="Recursos para organizar sua agenda" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {features.map((item) => <Feature key={item}>{item}</Feature>)}
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <SectionHeading eyebrow="Organização" title="Menos mensagens. Mais organização." />
          <div className="mt-8 grid gap-6 lg:grid-cols-2">
            <List title="Problemas comuns" items={problems} />
            <List title="Benefícios esperados" items={benefits} />
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}

function Feature({ children }: { children: string }) {
  return <div className="rounded-2xl border border-border bg-white/[0.03] p-5 text-sm font-semibold text-slate-100"><CheckCircle2 className="mb-4 size-5 text-sky-300" />{children}</div>;
}

function List({ title, items }: { title: string; items: string[] }) {
  return <div className="rounded-2xl border border-border bg-white/[0.03] p-6"><h2 className="text-xl font-semibold text-white">{title}</h2><ul className="mt-5 grid gap-3 text-sm text-muted">{items.map((item) => <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sky-300" />{item}</li>)}</ul></div>;
}

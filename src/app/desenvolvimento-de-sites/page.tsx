import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Desenvolvimento de sites",
  description: "Sites institucionais, landing pages, catálogos digitais e portais modernos para empresas.",
  alternates: { canonical: "/desenvolvimento-de-sites" },
};

const siteTypes = ["Sites institucionais", "Landing pages", "Catálogos digitais", "Portais", "Sites para prestadores de serviços", "Sites com formulários", "Sites integrados ao WhatsApp"];
const benefits = ["Layout personalizado", "Responsividade", "Velocidade", "SEO básico", "Segurança", "Integrações", "Domínio", "Hospedagem", "Manutenção"];
const plans = [
  ["Essencial", "Presença digital objetiva para apresentar a empresa, serviços e canais de contato."],
  ["Profissional", "Site mais completo, com mais seções, formulários, SEO e estrutura preparada para evoluir."],
  ["Personalizado", "Projeto sob medida para portais, catálogos, integrações e necessidades específicas."],
];

export default function SitesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Desenvolvimento de sites", href: "/desenvolvimento-de-sites" }]} />
      <section className="pb-16 pt-12">
        <Container>
          <SectionHeading
            eyebrow="Sites empresariais"
            title="Sites modernos para fortalecer sua presença digital"
            description="A Kyros Tech cria sites rápidos, responsivos e bem estruturados para empresas que precisam transmitir profissionalismo e gerar oportunidades."
          />
        </Container>
      </section>
      <InfoGrid title="O que podemos criar" items={siteTypes} />
      <InfoGrid title="Diferenciais técnicos" items={benefits} />
      <section className="py-16">
        <Container>
          <SectionHeading title="Planos por escopo" description="Os planos abaixo são referências de escopo. Valores e prazos dependem da necessidade de cada empresa." />
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {plans.map(([name, text]) => (
              <article key={name} className="glass rounded-2xl p-6">
                <h2 className="text-xl font-semibold text-white">{name}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
                <LinkButton href="/contato" className="mt-6 w-full" variant="secondary">Solicitar orçamento</LinkButton>
              </article>
            ))}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}

function InfoGrid({ title, items }: { title: string; items: string[] }) {
  return <section className="py-12"><Container><SectionHeading title={title} /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <div key={item} className="rounded-2xl border border-border bg-white/[0.03] p-5 text-sm font-semibold text-slate-100"><CheckCircle2 className="mb-4 size-5 text-sky-300" />{item}</div>)}</div></Container></section>;
}

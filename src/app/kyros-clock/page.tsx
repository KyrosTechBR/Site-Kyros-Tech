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
  title: "Kyros Clock",
  description: "Jornada inteligente de ponto, gestão de registros e portal do colaborador para empresas.",
  alternates: { canonical: "/kyros-clock" },
};

const features = ["Registro de ponto", "Portal do colaborador", "Gestão de funcionários", "Ajustes manuais", "Calendário", "Histórico", "Relatórios", "Painel administrativo", "Controle por perfil de acesso", "Uso em celular e computador"];
const audience = ["Empresas de serviços", "Escritórios", "Pequenos negócios", "Equipes externas", "Empresas com funcionários em diferentes locais", "Negócios que ainda utilizam papel ou planilhas"];
const before = ["Registros em papel", "Planilhas", "Informações dispersas", "Dificuldade para conferir horários", "Falta de acesso do colaborador"];
const after = ["Registros organizados", "Histórico centralizado", "Acesso pelo celular", "Mais transparência", "Gestão simplificada"];

export default function KyrosClockPage() {
  return (
    <>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "SoftwareApplication", name: "Kyros Clock", applicationCategory: "BusinessApplication", operatingSystem: "Web", url: `${siteConfig.url}/kyros-clock`, description: metadata.description }} />
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Kyros Clock", href: "/kyros-clock" }]} />
      <ProductHero
        name="Kyros Clock"
        subtitle="Jornada inteligente de ponto e portal do colaborador"
        description="Uma plataforma para empresas controlarem a jornada de trabalho, organizarem registros e oferecerem aos colaboradores acesso simples às suas informações."
        cta="Testar demonstração"
        ctaHref="/demo/kyros-work"
        ctaVariant="secondary"
        mockup="work"
      />
      <FeatureGrid title="Recursos do Kyros Clock" items={features} />
      <FeatureGrid title="Para quem é o Kyros Clock?" items={audience} />
      <Comparison before={before} after={after} />
      <section className="py-10">
        <Container>
          <p className="rounded-2xl border border-border bg-white/[0.03] p-5 text-sm leading-6 text-muted">
            O uso do Kyros Clock deve respeitar as regras aplicáveis ao controle de jornada e as condições técnicas, operacionais e legais exigidas para cada empresa. A Kyros Tech não promete validade jurídica automática sem análise do contexto.
          </p>
        </Container>
      </section>
      <CTASection />
    </>
  );
}

function FeatureGrid({ title, items }: { title: string; items: string[] }) {
  return (
    <section className="py-16">
      <Container>
        <SectionHeading title={title} />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((item) => <Feature key={item}>{item}</Feature>)}
        </div>
      </Container>
    </section>
  );
}

function Feature({ children }: { children: string }) {
  return <div className="rounded-2xl border border-border bg-white/[0.03] p-5 text-sm font-semibold text-slate-100"><CheckCircle2 className="mb-4 size-5 text-sky-300" />{children}</div>;
}

function Comparison({ before, after }: { before: string[]; after: string[] }) {
  return (
    <section className="py-16">
      <Container className="grid gap-6 lg:grid-cols-2">
        <List title="Antes do Kyros Clock" items={before} tone="rose" />
        <List title="Depois do Kyros Clock" items={after} tone="sky" />
      </Container>
    </section>
  );
}

function List({ title, items, tone }: { title: string; items: string[]; tone: "rose" | "sky" }) {
  return <div className="rounded-2xl border border-border bg-white/[0.03] p-6"><h2 className="text-xl font-semibold text-white">{title}</h2><ul className="mt-5 grid gap-3 text-sm text-muted">{items.map((item) => <li key={item} className="flex gap-3"><span className={`mt-2 size-2 rounded-full ${tone === "rose" ? "bg-rose-300" : "bg-sky-300"}`} />{item}</li>)}</ul></div>;
}

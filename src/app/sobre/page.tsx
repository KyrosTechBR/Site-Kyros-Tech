import type { Metadata } from "next";
import { ShieldCheck } from "lucide-react";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Sobre a Kyros Tech",
  description: "Conheça o propósito, a forma de pensar e os valores da Kyros Tech.",
  alternates: { canonical: "/sobre" },
};

const values = ["Transparencia", "Qualidade", "Evolução contínua", "Simplicidade", "Segurança", "Proximidade com o cliente", "Responsabilidade"];

export default function AboutPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Sobre", href: "/sobre" }]} />
      <section className="pb-16 pt-12">
        <Container>
          <SectionHeading
            eyebrow="Sobre"
            title="Tecnologia acessível para empresas que querem evoluir"
            description="A Kyros Tech nasceu com o propósito de tornar a tecnologia mais acessível para empresas que desejam crescer, se organizar e trabalhar de forma mais eficiente."
          />
          <p className="mt-6 max-w-4xl text-lg leading-8 text-muted">
            Desenvolvemos soluções digitais com foco nas necessidades reais de cada negócio. Buscamos entender os processos, identificar dificuldades e transformar problemas em sistemas simples, modernos e úteis.
          </p>
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card title="Nossa missão" text="Simplificar processos empresariais por meio de tecnologia clara, segura e bem aplicada." />
          <Card title="Nossa visão" text="Ser uma parceira tecnológica confiável para pequenas e médias empresas em evolução." />
          <Card title="Como pensamos" text="Tecnologia deve resolver problemas reais sem criar complexidade desnecessaria." />
          <Card title="Nosso compromisso" text="Atuar com transparência, responsabilidade e foco na utilidade de cada entrega." />
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <SectionHeading title="Nossos valores" />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => <div key={value} className="rounded-2xl border border-border bg-white/[0.03] p-5 text-sm font-semibold text-slate-100"><ShieldCheck className="mb-4 size-5 text-sky-300" />{value}</div>)}
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}

function Card({ title, text }: { title: string; text: string }) {
  return <article className="glass rounded-2xl p-6"><h2 className="text-lg font-semibold text-white">{title}</h2><p className="mt-3 text-sm leading-6 text-muted">{text}</p></article>;
}

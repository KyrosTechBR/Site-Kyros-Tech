import type { Metadata } from "next";
import { ArrowRight, CheckCircle2, Database, LineChart, ShieldCheck, Sparkles } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { AnimatedReveal } from "@/components/ui/AnimatedReveal";
import { FAQAccordion } from "@/components/ui/FAQAccordion";
import { CTASection } from "@/components/sections/CTASection";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { ProductMockup } from "@/components/products/ProductMockup";
import { JsonLd } from "@/components/seo/JsonLd";
import { products } from "@/data/products";
import { homeFaq } from "@/data/faq";

export const metadata: Metadata = {
  title: "Tecnologia que transforma negócios",
  description:
    "Sites, sistemas, automação de processos, Kyros Clock e AgendaBKy para empresas que querem trabalhar com mais controle e eficiência.",
  alternates: { canonical: "/" },
};

const problems = [
  "Planilhas desorganizadas",
  "Processos manuais",
  "Agendamentos pelo WhatsApp",
  "Controle de jornada em papel",
  "Informações espalhadas",
  "Retrabalho",
  "Falta de indicadores",
];

const improvements = [
  "Centralização das informações",
  "Automação de tarefas",
  "Redução de erros",
  "Melhor experiência para clientes e equipes",
  "Mais controle sobre o negócio",
];

const steps = [
  ["Entendimento", "Analisamos o negócio, as dificuldades e os objetivos da empresa."],
  ["Planejamento", "Definimos a melhor solução, estrutura, funcionalidades e etapas."],
  ["Desenvolvimento", "Criamos a solução com tecnologia moderna, segurança e foco na experiência do usuário."],
  ["Evolução", "Acompanhamos a utilização e planejamos melhorias conforme a necessidade."],
];

const differentials = [
  "Soluções personalizadas",
  "Atendimento próximo",
  "Tecnologia moderna",
  "Sistemas faceis de usar",
  "Desenvolvimento escalável",
  "Segurança e organização",
  "Foco em resultados",
  "Suporte após a entrega",
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: homeFaq.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: { "@type": "Answer", text: item.answer },
  })),
};

export default function Home() {
  return (
    <>
      <JsonLd data={faqJsonLd} />
      <section className="pt-32 pb-20">
        <Container className="grid items-center gap-12 lg:grid-cols-[0.92fr_1.08fr]">
          <AnimatedReveal>
            <Badge>Kyros Tech</Badge>
            <h1 className="mt-5 max-w-4xl text-4xl font-bold tracking-normal text-white sm:text-6xl">
              Tecnologia que transforma <span className="text-gradient">negócios.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-muted">
              Criamos sites, sistemas e soluções inteligentes para simplificar processos, melhorar a gestão e impulsionar empresas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <LinkButton href="/solucoes">
                Conheça nossas soluções <ArrowRight className="size-4" aria-hidden="true" />
              </LinkButton>
              <LinkButton href="/contato" variant="secondary">
                Fale com a Kyros Tech
              </LinkButton>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              {["Soluções personalizadas", "Atendimento próximo", "Tecnologia escalável"].map((item) => (
                <span key={item} className="hero-chip rounded-full px-3 py-2 text-xs font-semibold">
                  {item}
                </span>
              ))}
            </div>
          </AnimatedReveal>
          <AnimatedReveal delay={0.1}>
            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-primary/24 via-primary-light/14 to-blue-500/18 blur-2xl" />
              <div className="glass relative rounded-3xl p-5">
                <ProductMockup variant="dashboard" />
                <div className="mt-4 grid gap-3 sm:grid-cols-3">
                  <MiniMetric icon={ShieldCheck} label="Segurança" value="Organizada" />
                  <MiniMetric icon={LineChart} label="Gestão" value="Visível" />
                  <MiniMetric icon={Database} label="Dados" value="Centralizados" />
                </div>
              </div>
            </div>
          </AnimatedReveal>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Eficiencia"
            title="Empresas mais eficientes com tecnologia"
            description="Muitos negócios crescem com processos improvisados. A Kyros Tech ajuda a transformar esse cenário em uma operação mais simples, clara e controlada."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <AnimatedReveal>
              <div className="rounded-2xl border border-sky-400/18 bg-sky-950/10 p-6">
                <h3 className="text-lg font-semibold text-white">Antes da organização digital</h3>
                <ul className="mt-5 grid gap-3 text-sm text-muted">
                  {problems.map((item) => (
                    <li key={item} className="flex gap-3"><span className="mt-2 size-2 rounded-full bg-sky-300" />{item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedReveal>
            <AnimatedReveal delay={0.1}>
              <div className="rounded-2xl border border-border bg-sky-500/5 p-6">
                <h3 className="text-lg font-semibold text-white">Com a Kyros Tech</h3>
                <ul className="mt-5 grid gap-3 text-sm text-muted">
                  {improvements.map((item) => (
                    <li key={item} className="flex gap-3"><CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sky-300" />{item}</li>
                  ))}
                </ul>
              </div>
            </AnimatedReveal>
          </div>
        </Container>
      </section>

      <section className="py-20" id="soluções">
        <Container>
          <SectionHeading
            eyebrow="Soluções"
            title="Produtos e serviços para operar melhor"
            description="Da presença digital ao sistema interno, criamos soluções sob medida para empresas que precisam de clareza, organização e escala."
          />
          <div className="mt-10 grid gap-6 md:grid-cols-2">
            {products.map((product, index) => (
              <AnimatedReveal key={product.name} delay={index * 0.04}>
                <ServiceCard title={product.name} description={product.description} features={product.features} href={product.href} demoHref={product.demoHref} icon={product.icon} />
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Metodo" title="Como trabalhamos" align="center" />
          <div className="mt-10 grid gap-5 md:grid-cols-4">
            {steps.map(([title, text], index) => (
              <AnimatedReveal key={title} delay={index * 0.05}>
                <article className="h-full rounded-2xl border border-border bg-white/[0.03] p-6">
                  <span className="grid size-10 place-items-center rounded-lg bg-primary/20 text-sm font-bold text-sky-100">{index + 1}</span>
                  <h3 className="mt-5 text-lg font-semibold text-white">{title}</h3>
                  <p className="mt-3 text-sm leading-6 text-muted">{text}</p>
                </article>
              </AnimatedReveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Diferenciais" title="Por que escolher a Kyros Tech" />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {differentials.map((item) => (
              <div key={item} className="rounded-2xl border border-border bg-white/[0.03] p-5 text-sm font-semibold text-slate-100">
                <Sparkles className="mb-4 size-5 text-sky-300" aria-hidden="true" />
                {item}
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading
            eyebrow="Demonstracao"
            title="Interfaces pensadas para uso real"
            description="Mockups em HTML e CSS mostram a direção visual dos produtos sem depender de imagens genéricas."
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <ProductMockup variant="work" />
            <ProductMockup variant="agenda" />
          </div>
        </Container>
      </section>

      <CTASection />

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="FAQ" title="Perguntas frequentes" align="center" />
          <div className="mx-auto mt-10 max-w-3xl">
            <FAQAccordion items={homeFaq} />
          </div>
        </Container>
      </section>
    </>
  );
}

function MiniMetric({ icon: Icon, label, value }: { icon: typeof ShieldCheck; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white/[0.04] p-4">
      <Icon className="size-5 text-sky-300" aria-hidden="true" />
      <p className="mt-3 text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

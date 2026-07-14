import type { Metadata } from "next";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";
import { ServiceCard } from "@/components/sections/ServiceCard";
import { CTASection } from "@/components/sections/CTASection";
import { products } from "@/data/products";
import { businessProblems, solutionCategories } from "@/data/services";

export const metadata: Metadata = {
  title: "Soluções digitais",
  description: "Produtos próprios, sites, sistemas web, automação, integrações e consultoria tecnológica para empresas.",
  alternates: { canonical: "/solucoes" },
};

export default function SolucoesPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Soluções", href: "/solucoes" }]} />
      <section className="pb-16 pt-12">
        <Container>
          <SectionHeading
            eyebrow="Soluções"
            title="Tecnologia aplicada aos processos reais da sua empresa"
            description="A Kyros Tech combina produtos próprios, desenvolvimento personalizado e consultoria para resolver gargalos operacionais com sistemas simples de usar."
          />
          <div className="mt-8">
            <LinkButton href="/contato">
              Solicitar orçamento <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container>
          <div className="grid gap-6 md:grid-cols-2">
            {products.map((product) => (
              <ServiceCard key={product.name} title={product.name} description={product.description} features={product.features} href={product.href} demoHref={product.demoHref} icon={product.icon} />
            ))}
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">Categorias de atuação</h2>
            <div className="mt-5 flex flex-wrap gap-3">
              {solutionCategories.map((item) => (
                <span key={item} className="hero-chip rounded-full px-3 py-2 text-sm font-semibold">{item}</span>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border border-border bg-white/[0.03] p-6">
            <h2 className="text-xl font-semibold text-white">Problemas que podemos ajudar a resolver</h2>
            <ul className="mt-5 grid gap-3 text-sm text-muted sm:grid-cols-2">
              {businessProblems.map((item) => (
                <li key={item} className="flex gap-2"><CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sky-300" />{item}</li>
              ))}
            </ul>
          </div>
        </Container>
      </section>
      <CTASection />
    </>
  );
}

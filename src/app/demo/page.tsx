import type { Metadata } from "next";
import { Clock3, CalendarCheck, ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { LinkButton } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: "Demonstrações",
  description: "Experimente versões demonstrativas do Kyros Work e do AgendaBKy.",
  robots: { index: false, follow: true },
};

const demos = [
  {
    title: "Kyros Work",
    description: "Experimente uma versão demonstrativa do sistema de jornada, ponto eletrônico e portal do colaborador.",
    href: "/demo/kyros-work",
    cta: "Testar Kyros Work",
    icon: Clock3,
  },
  {
    title: "AgendaBKy",
    description: "Simule um agendamento e conheça uma versão reduzida do sistema de agenda da Kyros Tech.",
    href: "/demo/agendabky",
    cta: "Testar AgendaBKy",
    icon: CalendarCheck,
  },
];

export default function DemoIndexPage() {
  return (
    <section className="py-32">
      <Container>
        <SectionHeading
          eyebrow="Demonstrações"
          title="Experimente versões reduzidas dos produtos"
          description="As demonstrações utilizam dados fictícios e possuem apenas algumas funcionalidades dos produtos oficiais."
          align="center"
        />
        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {demos.map((demo) => {
            const Icon = demo.icon;
            return (
              <article key={demo.href} className="glass rounded-2xl p-6">
                <div className="grid size-12 place-items-center rounded-xl bg-sky-400/10 text-sky-100">
                  <Icon className="size-6" aria-hidden="true" />
                </div>
                <h2 className="mt-5 text-2xl font-bold text-white">{demo.title}</h2>
                <p className="mt-3 text-sm leading-6 text-muted">{demo.description}</p>
                <LinkButton href={demo.href} className="mt-6">
                  {demo.cta} <ArrowRight className="size-4" aria-hidden="true" />
                </LinkButton>
              </article>
            );
          })}
        </div>
      </Container>
    </section>
  );
}

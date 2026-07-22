import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CTASection } from "@/components/sections/CTASection";

export const metadata: Metadata = {
  title: "Automação de processos",
  description: "Automação para substituir planilhas, centralizar dados, criar painéis e reduzir tarefas repetitivas.",
  alternates: { canonical: "/automacao-de-processos" },
};

const examples = ["Substituir planilhas por um sistema", "Automatizar cadastros", "Criar painéis", "Gerar relatórios", "Organizar solicitações internas", "Centralizar documentos", "Integrar ferramentas", "Automatizar notificações", "Controlar etapas de atendimento"];
const signals = ["A mesma informação é digitada várias vezes", "Os funcionários dependem de muitas planilhas", "Existe dificuldade para encontrar informações", "Os processos geram muitos erros", "A equipe perde tempo com tarefas repetitivas", "Não há indicadores claros"];

export default function AutomationPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Automação de processos", href: "/automacao-de-processos" }]} />
      <section className="pb-16 pt-12">
        <Container>
          <SectionHeading
            eyebrow="Automação"
            title="Transforme processos repetitivos em fluxos digitais"
            description="Automação de processos é o uso de tecnologia para reduzir tarefas manuais, centralizar informações e dar mais previsibilidade à rotina da empresa."
          />
        </Container>
      </section>
      <Grid title="Exemplos de automação" items={examples} />
      <Grid title="Como saber se sua empresa precisa de automação?" items={signals} />
      <CTASection />
    </>
  );
}

function Grid({ title, items }: { title: string; items: string[] }) {
  return <section className="py-14"><Container><SectionHeading title={title} /><div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">{items.map((item) => <div key={item} className="rounded-2xl border border-border bg-white/[0.03] p-5 text-sm font-semibold text-slate-100"><CheckCircle2 className="mb-4 size-5 text-sky-300" />{item}</div>)}</div></Container></section>;
}

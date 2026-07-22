import { ArrowRight } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { getBudgetWhatsAppLink } from "@/lib/whatsapp";

export function CTASection() {
  return (
    <section className="py-20">
      <Container>
        <div className="glass overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Próximo passo</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Sua empresa está pronta para trabalhar de forma mais inteligente?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Converse com a Kyros Tech e descubra como uma solução digital pode melhorar seus processos.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={getBudgetWhatsAppLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-transparent bg-primary px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-950/40 transition hover:bg-blue-500 active:bg-blue-700"
            >
              Solicitar orçamento <ArrowRight className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </Container>
    </section>
  );
}

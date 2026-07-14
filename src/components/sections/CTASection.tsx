import { ArrowRight, MessageCircle } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function CTASection() {
  const whatsapp = getWhatsAppLink();

  return (
    <section className="py-20">
      <Container>
        <div className="glass overflow-hidden rounded-3xl p-8 sm:p-10 lg:p-12">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-sky-200">Proximo passo</p>
            <h2 className="mt-4 text-3xl font-bold text-white sm:text-4xl">
              Sua empresa está pronta para trabalhar de forma mais inteligente?
            </h2>
            <p className="mt-4 text-lg leading-8 text-muted">
              Converse com a Kyros Tech e descubra como uma solução digital pode melhorar seus processos.
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <LinkButton href="/contato">
              Solicitar orçamento <ArrowRight className="size-4" aria-hidden="true" />
            </LinkButton>
            {whatsapp ? (
              <a
                href={whatsapp}
                target="_blank"
                rel="noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/12"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Falar pelo WhatsApp
              </a>
            ) : null}
          </div>
        </div>
      </Container>
    </section>
  );
}

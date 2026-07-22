import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso para navegação no site institucional da Kyros Tech.",
  alternates: { canonical: "/termos-de-uso" },
};

const sections = [
  ["Uso do site", "O visitante deve utilizar o site de forma lícita, sem tentar comprometer sua segurança, disponibilidade, integridade ou funcionamento."],
  ["Conteúdo institucional", "As informações publicadas têm finalidade informativa e comercial. Elas podem ser atualizadas conforme a evolução dos serviços, produtos e canais da Kyros Tech."],
  ["Propriedade intelectual", "Textos, marcas, elementos visuais, códigos, nomes de produtos e demais materiais pertencem à Kyros Tech ou aos seus respectivos titulares."],
  ["Solicitações comerciais", "O envio de mensagens pelo formulário, e-mail ou WhatsApp não cria obrigação automática de contratação. Propostas, prazos e valores dependem de análise de escopo."],
  ["Links externos", "Links para redes sociais, WhatsApp e plataformas de terceiros direcionam o visitante para ambientes externos, sujeitos às próprias políticas e condições de uso."],
  ["Limitação de responsabilidade", "A Kyros Tech busca manter as informações corretas e disponíveis, mas não garante ausência permanente de falhas, indisponibilidades ou erros técnicos."],
  ["Contato", `Para dúvidas sobre estes termos, fale com a Kyros Tech pelo e-mail ${siteConfig.emails.contact}.`],
];

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Termos de uso", href: "/termos-de-uso" }]} />
      <section className="pb-20 pt-12">
        <Container className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white">Termos de uso</h1>
          <p className="mt-4 text-sm leading-7 text-muted">
            Ao navegar pelo site {siteConfig.domain}, você concorda com as condições gerais abaixo.
          </p>
          <div className="mt-8 grid gap-5">
            {sections.map(([heading, text]) => (
              <article key={heading} className="rounded-2xl border border-border bg-white/[0.03] p-6">
                <h2 className="text-lg font-semibold text-white">{heading}</h2>
                <p className="mt-3 text-sm leading-7 text-muted">{text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}

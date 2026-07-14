import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Termos de uso",
  description: "Termos de uso iniciais para navegacao no site da Kyros Tech.",
  alternates: { canonical: "/termos-de-uso" },
};

const sections = [
  ["Aviso importante", "Este conteúdo é uma base inicial e não substitui revisão jurídica antes da publicação definitiva."],
  ["Uso do site", "O visitante deve utilizar o site de forma lícita, sem tentar comprometer sua segurança, disponibilidade ou integridade."],
  ["Propriedade intelectual", "Textos, marcas, elementos visuais e códigos pertencem aos seus respectivos titulares e não podem ser copiados sem autorização."],
  ["Limitação de responsabilidade", "As informações do site são apresentadas para fins institucionais e comerciais, sem promessa automática de resultados, prazos ou preços."],
  ["Links externos", "Links para canais externos podem direcionar o visitante para plataformas de terceiros, sujeitas as proprias políticas."],
  ["Alterações", "A Kyros Tech pode atualizar estes termos conforme a evolução do site, dos serviços e das exigências legais."],
  ["Legislação aplicável", "A interpretação deve observar a legislação brasileira aplicável, incluindo normas de proteção de dados quando houver tratamento de informações pessoais."],
];

export default function TermsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Termos de uso", href: "/termos-de-uso" }]} />
      <section className="pb-20 pt-12">
        <Container className="max-w-4xl">
          <h1 className="text-4xl font-bold text-white">Termos de uso</h1>
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

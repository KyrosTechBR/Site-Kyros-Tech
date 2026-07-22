import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Política de privacidade da Kyros Tech, com orientações sobre tratamento de dados e canais de contato.",
  alternates: { canonical: "/politica-de-privacidade" },
};

const sections = [
  ["Dados coletados", "O site pode receber dados enviados voluntariamente pelo formulário de contato, como nome, empresa, telefone, e-mail, tipo de solução e mensagem."],
  ["Finalidade", "As informações são usadas para responder solicitações, entender necessidades comerciais, preparar propostas e melhorar o atendimento da Kyros Tech."],
  ["Armazenamento e segurança", "Os dados devem ser tratados apenas pelo tempo necessário para atendimento, relacionamento comercial ou cumprimento de obrigações aplicáveis, sempre com medidas razoáveis de segurança."],
  ["Compartilhamento", "A Kyros Tech não vende dados pessoais. Compartilhamentos podem ocorrer apenas quando necessários para operação, suporte, obrigações legais ou uso de fornecedores técnicos contratados."],
  ["Cookies e métricas", "O site pode utilizar recursos técnicos necessários ao funcionamento e, futuramente, ferramentas de análise mediante configuração adequada e transparente."],
  ["Direitos do titular", "Nos termos da LGPD, titulares podem solicitar acesso, correção, exclusão, portabilidade e informações sobre o tratamento de seus dados pessoais."],
  ["Contato", `Para dúvidas sobre privacidade ou tratamento de dados, entre em contato pelo e-mail ${siteConfig.emails.contact}.`],
];

export default function PrivacyPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Política de privacidade", href: "/politica-de-privacidade" }]} />
      <Legal title="Política de privacidade" sections={sections} />
    </>
  );
}

function Legal({ title, sections }: { title: string; sections: string[][] }) {
  return (
    <section className="pb-20 pt-12">
      <Container className="max-w-4xl">
        <h1 className="text-4xl font-bold text-white">{title}</h1>
        <p className="mt-4 text-sm leading-7 text-muted">
          Esta política apresenta, de forma objetiva, como a Kyros Tech trata informações enviadas pelos canais públicos do site.
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
  );
}

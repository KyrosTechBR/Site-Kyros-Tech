import type { Metadata } from "next";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: "Política de privacidade inicial da Kyros Tech, com orientações gerais sobre dados e LGPD.",
  alternates: { canonical: "/politica-de-privacidade" },
};

const sections = [
  ["Aviso importante", "Este texto é uma versão inicial e deve ser revisado por profissional jurídico antes da publicação definitiva."],
  ["Dados coletados", "O site pode coletar dados enviados voluntariamente pelo formulário, como nome, empresa, telefone, e-mail, tipo de solução e mensagem."],
  ["Finalidade", "As informações são usadas para responder contatos, avaliar necessidades comerciais e preparar propostas quando solicitado."],
  ["Armazenamento", "A estrutura está preparada para integrações futuras com banco de dados, e-mail, CRM e ferramentas de atendimento. Qualquer armazenamento definitivo deve seguir regras de segurança e necessidade."],
  ["Compartilhamento", "A Kyros Tech não deve vender dados pessoais. Compartilhamentos podem ocorrer com fornecedores técnicos necessários a operação, sempre conforme configuração e contrato aplicáveis."],
  ["Cookies", "O site pode utilizar cookies técnicos e, futuramente, ferramentas de analytics mediante configuração adequada."],
  ["Direitos do titular", "Nos termos da LGPD, titulares podem solicitar acesso, correção, exclusão, portabilidade e informações sobre o tratamento de seus dados."],
  ["Contato", "O canal oficial deve ser preenchido em src/config/site.ts antes da publicação."],
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
  return <section className="pb-20 pt-12"><Container className="max-w-4xl"><h1 className="text-4xl font-bold text-white">{title}</h1><div className="mt-8 grid gap-5">{sections.map(([heading, text]) => <article key={heading} className="rounded-2xl border border-border bg-white/[0.03] p-6"><h2 className="text-lg font-semibold text-white">{heading}</h2><p className="mt-3 text-sm leading-7 text-muted">{text}</p></article>)}</div></Container></section>;
}

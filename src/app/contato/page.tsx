import type { Metadata } from "next";
import { Mail, MessageCircle, Clock, Share2 } from "lucide-react";
import { Breadcrumb } from "@/components/seo/Breadcrumb";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/forms/ContactForm";
import { siteConfig } from "@/config/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

export const metadata: Metadata = {
  title: "Contato",
  description: "Fale com a Kyros Tech para solicitar orçamento, demonstração ou conversar sobre uma solução digital.",
  alternates: { canonical: "/contato" },
};

export default function ContactPage() {
  const whatsapp = getWhatsAppLink();

  return (
    <>
      <Breadcrumb items={[{ label: "Início", href: "/" }, { label: "Contato", href: "/contato" }]} />
      <section className="pb-20 pt-12">
        <Container className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <SectionHeading eyebrow="Contato" title="Vamos entender a necessidade da sua empresa" description="Envie uma mensagem com o contexto do projeto. A Kyros Tech avaliará as informações e retornará pelos dados enviados." />
            <div className="mt-8 grid gap-4">
              <Info icon={Mail} title="E-mail" text={siteConfig.email} />
              <Info icon={Clock} title="Horario de atendimento" text={siteConfig.businessHours} />
              <Info icon={Share2} title="Redes sociais" text="Placeholders configuraveis em src/config/site.ts" />
              {whatsapp ? <a href={whatsapp} target="_blank" rel="noreferrer" className="rounded-2xl border border-border bg-emerald-500/10 p-5 text-sm font-semibold text-emerald-100">Falar pelo WhatsApp</a> : <Info icon={MessageCircle} title="WhatsApp" text="Configure NEXT_PUBLIC_WHATSAPP_NUMBER para ativar o link." />}
            </div>
          </div>
          <div className="glass rounded-2xl p-6">
            <ContactForm />
          </div>
        </Container>
      </section>
    </>
  );
}

function Info({ icon: Icon, title, text }: { icon: typeof Mail; title: string; text: string }) {
  return <div className="rounded-2xl border border-border bg-white/[0.03] p-5"><Icon className="size-5 text-sky-300" /><h2 className="mt-3 text-sm font-semibold text-white">{title}</h2><p className="mt-1 text-sm text-muted">{text}</p></div>;
}

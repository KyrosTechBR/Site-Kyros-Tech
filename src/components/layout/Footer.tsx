import Link from "next/link";
import {
  BriefcaseBusiness,
  Camera,
  Mail,
  MessageCircle,
  Music2,
  Play,
  Users,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { mainNavigation, productNavigation, solutionNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";
import { getWhatsAppLink } from "@/lib/whatsapp";

const legalLinks = [
  { label: "Política de Privacidade", href: "/politica-de-privacidade" },
  { label: "Termos de Uso", href: "/termos-de-uso" },
];

const socialLinks: Array<{ label: string; href: string; icon: LucideIcon }> = [
  { label: "Instagram", href: siteConfig.social.instagram, icon: Camera },
  { label: "Facebook", href: siteConfig.social.facebook, icon: Users },
  { label: "YouTube", href: siteConfig.social.youtube, icon: Play },
  { label: "LinkedIn", href: siteConfig.social.linkedin, icon: BriefcaseBusiness },
  { label: "TikTok", href: siteConfig.social.tiktok, icon: Music2 },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-slate-950/70">
      <Container className="grid gap-10 py-12 lg:grid-cols-[1.25fr_2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-6 text-muted">{siteConfig.description}</p>
          <p className="mt-4 text-sm font-semibold text-sky-100">{siteConfig.slogan}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            {socialLinks.map(({ label, href, icon: Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Acessar ${label} da Kyros Tech`}
                className="grid size-11 place-items-center rounded-full border border-border bg-white/[0.04] text-sky-100 transition hover:border-primary-light/70 hover:bg-sky-400/10 hover:text-white focus-visible:outline-primary-light"
              >
                <Icon className="size-5" aria-hidden="true" />
              </a>
            ))}
          </div>
        </div>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <FooterColumn title="Links rápidos" links={[...mainNavigation, ...legalLinks]} />
          <FooterColumn title="Produtos" links={productNavigation} />
          <FooterColumn title="Soluções" links={solutionNavigation} />
          <div>
            <h2 className="text-sm font-semibold text-white">Contato</h2>
            <ul className="mt-4 space-y-3">
              <li>
                <ExternalFooterLink
                  href={`mailto:${siteConfig.emails.contact}`}
                  label={siteConfig.emails.contact}
                  icon={Mail}
                  ariaLabel="Enviar e-mail para contato da Kyros Tech"
                />
              </li>
              <li>
                <ExternalFooterLink
                  href={getWhatsAppLink()}
                  label={siteConfig.phone.display}
                  icon={MessageCircle}
                  ariaLabel="Falar com a Kyros Tech pelo WhatsApp"
                />
              </li>
              <li>
                <Link className="text-sm text-muted transition hover:text-white" href="/contato">
                  Página de contato
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Kyros Tech. Todos os direitos reservados.</p>
        <a
          href={siteConfig.website}
          target="_blank"
          rel="noopener noreferrer"
          className="transition hover:text-white"
          aria-label="Acessar domínio oficial kyrostech.com.br"
        >
          {siteConfig.domain}
        </a>
      </Container>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h2 className="text-sm font-semibold text-white">{title}</h2>
      <ul className="mt-4 space-y-3">
        {links.map((link) => (
          <li key={`${title}-${link.href}`}>
            <Link className="text-sm text-muted transition hover:text-white" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function ExternalFooterLink({
  href,
  label,
  icon: Icon,
  ariaLabel,
}: {
  href: string;
  label: string;
  icon: LucideIcon;
  ariaLabel: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="inline-flex items-center gap-2 text-sm text-muted transition hover:text-white"
    >
      <Icon className="size-4 text-sky-300" aria-hidden="true" />
      <span>{label}</span>
    </a>
  );
}

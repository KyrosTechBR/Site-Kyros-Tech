import Link from "next/link";
import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { mainNavigation, productNavigation, solutionNavigation } from "@/config/navigation";
import { siteConfig } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-slate-950/60">
      <Container className="grid gap-10 py-12 md:grid-cols-[1.4fr_2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-md text-sm leading-6 text-muted">{siteConfig.description}</p>
          <p className="mt-4 text-sm font-semibold text-sky-100">{siteConfig.slogan}</p>
        </div>
        <div className="grid gap-8 sm:grid-cols-3">
          <FooterColumn title="Links rápidos" links={[...mainNavigation, { label: "Política de privacidade", href: "/politica-de-privacidade" }, { label: "Termos de uso", href: "/termos-de-uso" }]} />
          <FooterColumn title="Produtos" links={productNavigation} />
          <FooterColumn title="Soluções" links={solutionNavigation} />
        </div>
      </Container>
      <Container className="flex flex-col gap-3 border-t border-border py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>© {year} Kyros Tech. Todos os direitos reservados.</p>
        <p>Redes sociais configuraveis em src/config/site.ts</p>
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
          <li key={link.href}>
            <Link className="text-sm text-muted transition hover:text-white" href={link.href}>
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

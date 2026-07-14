"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";
import { mainNavigation, productNavigation } from "@/config/navigation";
import { Logo } from "@/components/layout/Logo";
import { LinkButton } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { cn } from "@/lib/utils";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const productsActive = productNavigation.some((item) => isActivePath(pathname, item.href));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", open);
    return () => document.body.classList.remove("menu-open");
  }, [open]);

  const close = () => setOpen(false);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 border-b transition",
        scrolled ? "border-border bg-background/82 shadow-2xl shadow-black/20 backdrop-blur-xl" : "border-transparent bg-transparent",
      )}
    >
      <Container className="flex h-20 items-center justify-between">
        <Logo />
        <nav aria-label="Navegação principal" className="hidden items-center gap-1 lg:flex">
          {mainNavigation.map((item) => {
            const active = isActivePath(pathname, item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/8 hover:text-white",
                  active
                    ? "text-white after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary-light after:shadow-[0_0_12px_rgba(56,189,248,0.85)]"
                    : "text-muted",
                )}
              >
                {item.label}
              </Link>
            );
          })}
          <div className="group relative">
            <button
              className={cn(
                "relative inline-flex rounded-lg px-3 py-2 text-sm font-medium transition hover:bg-white/8 hover:text-white",
                productsActive
                  ? "text-white after:absolute after:inset-x-3 after:-bottom-1 after:h-0.5 after:rounded-full after:bg-primary-light after:shadow-[0_0_12px_rgba(56,189,248,0.85)]"
                  : "text-muted",
              )}
            >
              Produtos <ChevronDown className="ml-1 size-4" aria-hidden="true" />
            </button>
            <div className="invisible absolute right-0 top-full w-56 translate-y-2 rounded-xl border border-border bg-slate-950/95 p-2 opacity-0 shadow-2xl shadow-black/30 backdrop-blur-xl transition group-hover:visible group-hover:translate-y-0 group-hover:opacity-100 group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100">
              {productNavigation.map((item) => {
                const active = isActivePath(pathname, item.href);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "block rounded-lg px-3 py-2 text-sm hover:bg-white/8 hover:text-white",
                      active ? "text-sky-100 ring-1 ring-sky-400/30" : "text-muted",
                    )}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>
          </div>
        </nav>
        <div className="hidden lg:block">
          <LinkButton href="/contato">Solicitar orçamento</LinkButton>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="grid size-11 place-items-center rounded-lg border border-border bg-white/8 text-white lg:hidden"
          aria-label="Abrir menu"
          aria-expanded={open}
        >
          <Menu className="size-5" aria-hidden="true" />
        </button>
      </Container>

      {open ? (
        <div className="fixed inset-0 z-50 bg-background/88 backdrop-blur-xl lg:hidden" role="dialog" aria-modal="true">
          <Container className="flex h-20 items-center justify-between">
            <Logo />
            <button
              type="button"
              onClick={close}
              className="grid size-11 place-items-center rounded-lg border border-border bg-white/8 text-white"
              aria-label="Fechar menu"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </Container>
          <Container className="grid gap-3 pt-6">
            {[...mainNavigation, ...productNavigation].map((item) => {
              const active = isActivePath(pathname, item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={close}
                  aria-current={active ? "page" : undefined}
                  className={cn(
                    "rounded-xl border px-4 py-4 text-base font-semibold text-white",
                    active ? "border-sky-300/70 bg-sky-400/10 shadow-[0_0_18px_rgba(56,189,248,0.22)]" : "border-border bg-white/6",
                  )}
                >
                  {item.label}
                </Link>
              );
            })}
            <Link href="/contato" onClick={close} className="mt-3 rounded-xl bg-primary px-4 py-4 text-center text-base font-semibold text-white">
              Solicitar orçamento
            </Link>
          </Container>
        </div>
      ) : null}
    </header>
  );
}

function isActivePath(pathname: string, href: string) {
  if (href === "/") {
    return pathname === "/";
  }

  return pathname === href || pathname.startsWith(`${href}/`);
}

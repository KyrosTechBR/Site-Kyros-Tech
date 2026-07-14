import Link from "next/link";
import { ArrowRight, CheckCircle2, type LucideIcon } from "lucide-react";

export function ServiceCard({
  title,
  description,
  features,
  href,
  demoHref,
  icon: Icon,
}: {
  title: string;
  description: string;
  features: string[];
  href: string;
  demoHref?: string;
  icon: LucideIcon;
}) {
  return (
    <article className="glass group flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-1 hover:border-primary-light/40">
      <div className="grid size-12 place-items-center rounded-xl bg-primary-light/10 text-sky-200">
        <Icon className="size-6" aria-hidden="true" />
      </div>
      <h3 className="mt-5 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm leading-6 text-muted">{description}</p>
      <ul className="mt-5 grid gap-2 text-sm text-slate-300">
        {features.slice(0, 6).map((feature) => (
          <li key={feature} className="flex gap-2">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-sky-300" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href={href} className="inline-flex items-center gap-2 text-sm font-semibold text-sky-200">
          Saiba mais <ArrowRight className="size-4 transition group-hover:translate-x-1" aria-hidden="true" />
        </Link>
        {demoHref ? (
          <Link href={demoHref} className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-100">
            Testar demonstração
          </Link>
        ) : null}
      </div>
    </article>
  );
}

import Link from "next/link";
import { ChevronRight } from "lucide-react";

export function Breadcrumb({ items }: { items: { label: string; href: string }[] }) {
  return (
    <nav aria-label="Breadcrumb" className="pt-28">
      <ol className="mx-auto flex w-full max-w-7xl flex-wrap items-center gap-2 px-4 text-sm text-muted sm:px-6 lg:px-8">
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-2">
            {index > 0 ? <ChevronRight className="size-4" aria-hidden="true" /> : null}
            <Link href={item.href} className="hover:text-white" aria-current={index === items.length - 1 ? "page" : undefined}>
              {item.label}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

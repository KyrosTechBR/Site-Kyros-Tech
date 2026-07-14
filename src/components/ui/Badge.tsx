import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-primary-light/30 bg-primary-light/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-sky-100",
        className,
      )}
    >
      {children}
    </span>
  );
}

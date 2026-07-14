import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";

const variants: Record<Variant, string> = {
  primary:
    "border-transparent bg-primary text-white shadow-lg shadow-blue-950/40 hover:bg-blue-500 active:bg-blue-700",
  secondary:
    "border-border bg-white/8 text-white hover:border-primary-light/60 hover:bg-white/12",
  ghost: "border-transparent text-muted hover:bg-white/8 hover:text-white",
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-5 py-3 text-sm font-semibold transition disabled:pointer-events-none disabled:opacity-55";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
  children: ReactNode;
};

type LinkButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  href: string;
  variant?: Variant;
  children: ReactNode;
};

export function Button({ className, variant = "primary", ...props }: ButtonProps) {
  return <button className={cn(base, variants[variant], className)} {...props} />;
}

export function LinkButton({ className, variant = "primary", href, ...props }: LinkButtonProps) {
  return <Link href={href} className={cn(base, variants[variant], className)} {...props} />;
}

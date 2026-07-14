"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { AlertTriangle, ArrowLeft, RotateCcw, X } from "lucide-react";
import { cn } from "@/lib/utils";

export function DemoBanner({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-2xl border border-sky-300/35 bg-sky-400/10 p-4 text-sm leading-6 text-sky-50 shadow-[0_0_22px_rgba(56,189,248,0.12)]">
      <div className="flex gap-3">
        <AlertTriangle className="mt-0.5 size-5 shrink-0 text-sky-200" aria-hidden="true" />
        <p>{children}</p>
      </div>
    </div>
  );
}

export function DemoTopBar({ title, backHref }: { title: string; backHref: string }) {
  return (
    <div className="flex flex-col gap-4 border-b border-border bg-background/86 px-4 py-4 backdrop-blur-xl sm:flex-row sm:items-center sm:justify-between lg:px-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-200">Demonstração interativa</p>
        <h1 className="mt-1 text-xl font-bold text-white">{title}</h1>
      </div>
      <Link href={backHref} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-white/6 px-4 text-sm font-semibold text-white transition hover:border-sky-300/60 hover:bg-sky-400/10">
        <ArrowLeft className="size-4" aria-hidden="true" />
        Voltar para o site
      </Link>
    </div>
  );
}

export function DemoCard({ title, children, className }: { title?: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-2xl border border-border bg-white/[0.035] p-5 shadow-2xl shadow-black/10", className)}>
      {title ? <h2 className="text-lg font-semibold text-white">{title}</h2> : null}
      {children}
    </section>
  );
}

export function StatusBadge({ children, tone = "blue" }: { children: ReactNode; tone?: "blue" | "green" | "amber" | "red" }) {
  const tones = {
    blue: "border-sky-300/40 bg-sky-400/10 text-sky-100",
    green: "border-emerald-300/40 bg-emerald-400/10 text-emerald-100",
    amber: "border-amber-300/40 bg-amber-400/10 text-amber-100",
    red: "border-rose-300/40 bg-rose-400/10 text-rose-100",
  };

  return <span className={cn("inline-flex rounded-full border px-3 py-1 text-xs font-semibold", tones[tone])}>{children}</span>;
}

export function SuccessMessage({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-emerald-300/35 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">{children}</p>;
}

export function EmptyState({ children }: { children: ReactNode }) {
  return <p className="rounded-xl border border-dashed border-border bg-white/[0.02] px-4 py-5 text-sm text-muted">{children}</p>;
}

export function ResetDemoButton({ onReset }: { onReset: () => void }) {
  return (
    <button
      type="button"
      onClick={() => {
        if (window.confirm("Deseja reiniciar esta demonstração? Os dados locais desta demo serão restaurados.")) {
          onReset();
        }
      }}
      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-border bg-white/6 px-4 text-sm font-semibold text-white transition hover:border-sky-300/60 hover:bg-sky-400/10"
    >
      <RotateCcw className="size-4" aria-hidden="true" />
      Reiniciar demonstração
    </button>
  );
}

export function ConfirmationModal({
  title,
  description,
  confirmLabel,
  onConfirm,
  onCancel,
}: {
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-[70] grid place-items-center bg-black/70 p-4" role="dialog" aria-modal="true" aria-labelledby="demo-confirm-title">
      <div className="w-full max-w-md rounded-2xl border border-border bg-slate-950 p-6 shadow-2xl shadow-black/50">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 id="demo-confirm-title" className="text-lg font-semibold text-white">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-muted">{description}</p>
          </div>
          <button type="button" onClick={onCancel} className="grid size-9 place-items-center rounded-lg border border-border text-muted hover:text-white" aria-label="Fechar confirmação">
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:justify-end">
          <button type="button" onClick={onCancel} className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold text-white hover:bg-white/8">Cancelar</button>
          <button type="button" onClick={onConfirm} className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-blue-500">{confirmLabel}</button>
        </div>
      </div>
    </div>
  );
}

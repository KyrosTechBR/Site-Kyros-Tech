import { CalendarDays, CheckCircle2, Clock3, Users } from "lucide-react";
import { cn } from "@/lib/utils";

export function ProductMockup({ variant = "work" }: { variant?: "work" | "agenda" | "dashboard" }) {
  const isAgenda = variant === "agenda";

  return (
    <div className="glass relative overflow-hidden rounded-3xl p-4">
      <div className="flex items-center gap-2 border-b border-border pb-4">
        <span className="size-3 rounded-full bg-rose-400" />
        <span className="size-3 rounded-full bg-amber-300" />
        <span className="size-3 rounded-full bg-emerald-400" />
        <span className="ml-auto rounded-full bg-white/8 px-3 py-1 text-xs text-muted">{isAgenda ? "AgendaBKy" : "Kyros Clock"}</span>
      </div>
      <div className="mt-5 grid gap-4 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="space-y-3">
          {["Visão geral", isAgenda ? "Profissionais" : "Colaboradores", isAgenda ? "Serviços" : "Jornada", "Relatórios"].map((item, index) => (
            <div key={item} className={cn("rounded-xl border border-border px-3 py-3 text-sm", index === 0 ? "bg-primary/20 text-white" : "bg-white/[0.03] text-muted")}>
              {item}
            </div>
          ))}
        </div>
        <div className="grid gap-4">
          <div className="grid gap-3 sm:grid-cols-3">
            <Metric icon={Users} label={isAgenda ? "Clientes" : "Equipe"} value={isAgenda ? "Organizado" : "Ativa"} />
            <Metric icon={Clock3} label="Horarios" value="Claros" />
            <Metric icon={CheckCircle2} label="Status" value="Em dia" />
          </div>
          <div className="rounded-2xl border border-border bg-slate-950/55 p-4">
            <div className="flex items-center gap-2 text-sm font-semibold text-white">
              <CalendarDays className="size-4 text-sky-300" aria-hidden="true" />
              {isAgenda ? "Agenda da semana" : "Registros recentes"}
            </div>
            <div className="mt-4 grid gap-3">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="grid grid-cols-[72px_1fr_auto] items-center gap-3 rounded-xl bg-white/[0.04] px-3 py-3 text-xs text-muted">
                  <span>{isAgenda ? `${8 + item}:00` : `Dia ${item + 10}`}</span>
                  <span className="h-2 rounded-full bg-gradient-to-r from-primary-light to-blue-500" />
                  <span>{isAgenda ? "Confirmado" : "Registrado"}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Metric({ icon: Icon, label, value }: { icon: typeof Users; label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-border bg-white/[0.04] p-4">
      <Icon className="size-5 text-sky-300" aria-hidden="true" />
      <p className="mt-3 text-xs text-muted">{label}</p>
      <p className="mt-1 text-sm font-semibold text-white">{value}</p>
    </div>
  );
}

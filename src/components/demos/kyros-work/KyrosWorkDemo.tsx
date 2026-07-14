"use client";

import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  CalendarCheck,
  Camera,
  Clock3,
  Coffee,
  Eye,
  FilePenLine,
  HeartPulse,
  LogIn,
  LogOut,
  MapPin,
  RotateCcw,
  ShieldCheck,
  Sparkles,
  TimerReset,
} from "lucide-react";
import { ConfirmationModal, ResetDemoButton, SuccessMessage } from "@/components/demos/shared/DemoPrimitives";
import { demoEmployee, initialWorkDemoState, KYROS_WORK_STORAGE_KEY, workRecordSequence } from "@/data/demo-kyros-work";
import { clearDemoState, createDemoId, readDemoState, saveDemoState } from "@/lib/demo-storage";
import type { WorkAdjustment, WorkDemoState, WorkRecordType } from "@/types/demos";
import { cn } from "@/lib/utils";

const actionStyles: Record<WorkRecordType, { icon: typeof LogIn; className: string }> = {
  Entrada: { icon: LogIn, className: "bg-emerald-500/78 text-white shadow-[0_0_22px_rgba(16,185,129,0.24)]" },
  "Saída Almoço": { icon: Coffee, className: "bg-amber-500/72 text-white shadow-[0_0_22px_rgba(245,158,11,0.2)]" },
  "Volta Almoço": { icon: RotateCcw, className: "bg-blue-500/72 text-white shadow-[0_0_22px_rgba(59,130,246,0.22)]" },
  Saída: { icon: LogOut, className: "bg-red-500/70 text-white shadow-[0_0_22px_rgba(239,68,68,0.2)]" },
};

export function KyrosWorkDemo() {
  const [state, setState] = useState<WorkDemoState>(initialWorkDemoState);
  const [now, setNow] = useState(new Date());
  const [message, setMessage] = useState("");
  const [confirmType, setConfirmType] = useState<WorkRecordType | null>(null);
  const [showAdjustments, setShowAdjustments] = useState(false);
  const [adjustmentReason, setAdjustmentReason] = useState("");

  useEffect(() => {
    const loadId = window.setTimeout(() => {
      setState(readDemoState(KYROS_WORK_STORAGE_KEY, initialWorkDemoState));
    }, 0);
    const interval = window.setInterval(() => setNow(new Date()), 1000);
    return () => {
      window.clearTimeout(loadId);
      window.clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    saveDemoState(KYROS_WORK_STORAGE_KEY, state);
  }, [state]);

  const nextRecord = workRecordSequence.find((type) => !state.records.some((record) => record.type === type));
  const latestRecord = state.records.at(-1);
  const allRegistered = state.records.length === workRecordSequence.length;
  const dayLabel = useMemo(() => formatFullDate(now), [now]);

  function takeSelfie() {
    setState((current) => ({ ...current, selfieSelected: true }));
    setMessage("Selfie demonstrativa selecionada. Nenhuma câmera real foi acessada.");
  }

  function registerPoint(type: WorkRecordType) {
    const alreadyRegistered = state.records.some((record) => record.type === type);
    if (alreadyRegistered) {
      setMessage(`${type} já foi registrada nesta demonstração.`);
      setConfirmType(null);
      return;
    }

    const time = now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    const date = now.toLocaleDateString("pt-BR");
    setState((current) => ({
      ...current,
      records: [...current.records, { type, time, date }],
    }));
    setMessage(`${type} registrada às ${time}. Nenhuma informação foi enviada ao sistema oficial.`);
    setConfirmType(null);
  }

  function submitAdjustment() {
    if (adjustmentReason.trim().length < 5) {
      setMessage("Descreva brevemente o motivo do ajuste demonstrativo.");
      return;
    }

    const adjustment: WorkAdjustment = {
      id: createDemoId("AJ"),
      date: now.toISOString().slice(0, 10),
      type: nextRecord ?? "Saída",
      time: now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }),
      reason: adjustmentReason,
      status: "Ajuste solicitado",
    };

    setState((current) => ({ ...current, adjustments: [adjustment, ...current.adjustments] }));
    setAdjustmentReason("");
    setMessage("Solicitação demonstrativa enviada. Nenhuma solicitação foi enviada para uma empresa.");
  }

  function resetDemo() {
    clearDemoState(KYROS_WORK_STORAGE_KEY);
    setState(initialWorkDemoState);
    setMessage("Demonstração reiniciada.");
  }

  return (
    <main className="min-h-screen bg-[#0b0b0c] px-2 pb-2 pt-24 text-white sm:px-4 sm:pb-6 sm:pt-28">
      <div className="mx-auto w-full max-w-[33rem] overflow-hidden rounded-[1.75rem] border border-white/8 bg-[#101011] p-5 shadow-2xl shadow-black/60">
        <HeroCard dayLabel={dayLabel} />
        <InfoCard now={now} />
        {message ? <div className="mt-4"><SuccessMessage>{message}</SuccessMessage></div> : null}
        <StatsGrid latestRecord={latestRecord} allRegistered={allRegistered} />
        <TodaySchedule />
        <section className="mt-6">
          <h2 className="text-lg font-black text-white">Registrar ponto</h2>
          <p className="mt-4 text-sm font-bold text-white">Selfie obrigatória</p>
          <button
            type="button"
            onClick={takeSelfie}
            className="mt-3 flex min-h-14 w-full items-center justify-center gap-2 rounded-xl border border-blue-500 bg-transparent text-base font-bold text-blue-400 transition hover:bg-blue-500/10"
          >
            <Camera className="size-5" aria-hidden="true" />
            Tirar Selfie
          </button>
          <p className="mt-3 text-center text-sm text-white/90">{state.selfieSelected ? "Selfie demonstrativa selecionada" : "Nenhuma selfie selecionada"}</p>
          <div className="mt-6 grid gap-4">
            {workRecordSequence.map((type) => (
              <PointAction
                key={type}
                type={type}
                registered={state.records.some((record) => record.type === type)}
                next={nextRecord === type}
                onClick={() => setConfirmType(type)}
              />
            ))}
          </div>
        </section>
        <SupportSections
          showAdjustments={showAdjustments}
          setShowAdjustments={setShowAdjustments}
          adjustments={state.adjustments}
          adjustmentReason={adjustmentReason}
          setAdjustmentReason={setAdjustmentReason}
          onSubmitAdjustment={submitAdjustment}
        />
        <div className="mt-5 rounded-2xl bg-slate-800/80 p-4 text-center text-sm leading-6 text-blue-50">
          <Sparkles className="mr-1 inline size-4 text-amber-200" aria-hidden="true" />
          Obrigado por ajudar a Kyros Tech a manter uma operação segura, organizada e confiável.
        </div>
        <div className="mt-5 flex flex-col items-center gap-4">
          <ResetDemoButton onReset={resetDemo} />
          <a href="/kyros-clock" className="text-sm text-blue-300 underline underline-offset-4">Sair</a>
        </div>
      </div>
      {confirmType ? (
        <ConfirmationModal
          title="Confirmar marcação"
          description={`Deseja registrar ${confirmType} agora às ${now.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}? Esta é uma marcação demonstrativa.`}
          confirmLabel={`Registrar ${confirmType}`}
          onConfirm={() => registerPoint(confirmType)}
          onCancel={() => setConfirmType(null)}
        />
      ) : null}
    </main>
  );
}

function HeroCard({ dayLabel }: { dayLabel: string }) {
  return (
    <section className="rounded-[1.45rem] bg-gradient-to-br from-blue-600 via-sky-500 to-cyan-500 p-5">
      <h1 className="text-2xl font-black leading-tight text-white sm:text-3xl">
        <span aria-hidden="true">☀️ </span>Bom dia, {demoEmployee.name}!
      </h1>
      <p className="mt-2 text-sm font-semibold text-white">{dayLabel}. Tenha um excelente dia!</p>
      <div className="mt-5 inline-flex items-center gap-2 rounded-md bg-blue-950/85 px-3 py-1 text-base font-black text-white">
        <span className="size-4 rounded-full bg-gradient-to-br from-emerald-300 to-sky-400" aria-hidden="true" />
        Disponível para trabalho
      </div>
    </section>
  );
}

function InfoCard({ now }: { now: Date }) {
  return (
    <section className="mt-4 rounded-2xl bg-slate-800/85 p-4 text-sm font-semibold text-white">
      <p><CalendarCheck className="mr-1 inline size-4 text-blue-300" aria-hidden="true" />Agora: {now.toLocaleDateString("pt-BR")} {now.toLocaleTimeString("pt-BR")}</p>
      <p className="mt-3"><MapPin className="mr-1 inline size-4 text-blue-300" aria-hidden="true" />Localização: GPS desligado ou não permitido</p>
      <p className="mt-3"><ShieldCheck className="mr-1 inline size-4 text-blue-300" aria-hidden="true" />Sua localização e selfie serão registradas para validação do ponto.</p>
    </section>
  );
}

function StatsGrid({ latestRecord, allRegistered }: { latestRecord?: WorkDemoState["records"][number]; allRegistered: boolean }) {
  return (
    <section className="mt-7 grid grid-cols-2 gap-x-8 gap-y-8 px-3">
      <MiniStat icon={Clock3} label="Último ponto" value={latestRecord?.type ?? "Saída"} detail={latestRecord ? `${latestRecord.date} ${latestRecord.time}` : "02/07/2026 00:14"} />
      <MiniStat icon={TimerReset} label="Banco de horas" value={allRegistered ? "+0h" : "0h"} detail="3º Trimestre 2026" />
      <MiniStat icon={HeartPulse} label="ASO" value="Válido" detail="até 07/07/2027" tone="green" />
      <MiniStat icon={CalendarCheck} label="Situação" value={allRegistered ? "Concluído" : "Disponível"} detail="Sem ocorrência ativa" tone="green" />
    </section>
  );
}

function MiniStat({ icon: Icon, label, value, detail, tone = "white" }: { icon: typeof Clock3; label: string; value: string; detail: string; tone?: "white" | "green" }) {
  return (
    <article>
      <p className="text-xs font-semibold text-slate-400"><Icon className="mr-1 inline size-4 text-blue-300" aria-hidden="true" />{label}</p>
      <p className={cn("mt-3 text-lg font-black", tone === "green" ? "text-emerald-400" : "text-white")}>{value}</p>
      <p className="mt-1 text-sm text-white">{detail}</p>
    </article>
  );
}

function TodaySchedule() {
  return (
    <section className="mt-8">
      <h2 className="text-lg font-black text-white">Programação de Hoje</h2>
      <div className="mt-3 rounded-xl bg-slate-800/85 p-4 text-center text-sm leading-6 text-blue-50">
        Hoje não há programação registrada para você.
        <br />
        Em caso de dúvida, consulte sua liderança.
      </div>
    </section>
  );
}

function PointAction({ type, registered, next, onClick }: { type: WorkRecordType; registered: boolean; next: boolean; onClick: () => void }) {
  const style = actionStyles[type];
  const Icon = style.icon;
  const disabled = registered || !next;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "flex min-h-16 w-full items-center justify-center gap-2 rounded-2xl text-lg font-black transition",
        style.className,
        disabled && "opacity-35 grayscale hover:cursor-not-allowed",
      )}
    >
      <Icon className="size-5" aria-hidden="true" />
      {registered ? `${type} registrada` : type}
    </button>
  );
}

function SupportSections({
  showAdjustments,
  setShowAdjustments,
  adjustments,
  adjustmentReason,
  setAdjustmentReason,
  onSubmitAdjustment,
}: {
  showAdjustments: boolean;
  setShowAdjustments: (value: boolean) => void;
  adjustments: WorkAdjustment[];
  adjustmentReason: string;
  setAdjustmentReason: (value: string) => void;
  onSubmitAdjustment: () => void;
}) {
  return (
    <section className="mt-8 grid gap-4">
      <InfoPanel icon={FilePenLine} title="Comprovante do Ponto" accent="text-blue-100">
        <p className="text-sm text-blue-50">Visualize o ponto de hoje ou o último dia com marcação.</p>
        <button type="button" className="mt-5 min-h-10 w-full rounded-full border border-blue-500 text-sm font-black text-blue-400">
          <Eye className="mr-1 inline size-4" aria-hidden="true" />Visualizar Comprovante
        </button>
      </InfoPanel>
      <InfoPanel icon={CalendarCheck} title="Espelho do Ponto" accent="text-emerald-300" className="bg-emerald-950/25">
        <p className="text-sm text-blue-50">Consulte os registros do mês atual.</p>
        <button type="button" className="mt-5 min-h-10 w-full rounded-full border border-emerald-600 text-sm font-black text-emerald-500">Meu Espelho de Ponto</button>
      </InfoPanel>
      <div className="rounded-2xl bg-amber-950/30 p-4 text-center">
        <h2 className="font-black text-orange-400"><AlertCircle className="mr-1 inline size-5" aria-hidden="true" />Problema ao registrar seu ponto?</h2>
        <p className="mt-3 text-sm text-blue-50">Esqueceu alguma marcação, ficou sem internet ou teve erro no GPS?</p>
        <button type="button" onClick={() => setShowAdjustments(!showAdjustments)} className="mt-5 min-h-11 w-full rounded-full bg-amber-400 text-sm font-black text-white">Solicitar Ajuste de Ponto</button>
        <button type="button" onClick={() => setShowAdjustments(true)} className="mt-3 text-xs text-blue-400">Ver minhas solicitações</button>
        {showAdjustments ? (
          <div className="mt-4 grid gap-3 text-left">
            <textarea value={adjustmentReason} onChange={(event) => setAdjustmentReason(event.target.value)} rows={3} className="w-full rounded-xl border border-amber-300/30 bg-black/30 p-3 text-sm text-white outline-none focus:border-amber-300" placeholder="Motivo demonstrativo do ajuste" />
            <button type="button" onClick={onSubmitAdjustment} className="min-h-10 rounded-xl bg-amber-400 text-sm font-black text-white">Enviar ajuste demonstrativo</button>
            {adjustments.map((item) => <p key={item.id} className="rounded-lg bg-black/20 p-2 text-xs text-blue-50">{item.reason} — {item.status}</p>)}
          </div>
        ) : null}
      </div>
    </section>
  );
}

function InfoPanel({ icon: Icon, title, children, accent = "text-blue-100", className }: { icon: typeof FilePenLine; title: string; children: React.ReactNode; accent?: string; className?: string }) {
  return (
    <article className={cn("rounded-2xl bg-slate-800/85 p-5 text-center", className)}>
      <h2 className={cn("text-base font-black", accent)}><Icon className="mr-1 inline size-5" aria-hidden="true" />{title}</h2>
      <div className="mt-3">{children}</div>
    </article>
  );
}

function formatFullDate(date: Date) {
  return new Intl.DateTimeFormat("pt-BR", {
    weekday: "long",
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

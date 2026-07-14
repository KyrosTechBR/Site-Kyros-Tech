"use client";

import { useEffect, useState } from "react";
import { CalendarCheck, Trash2, UserCog } from "lucide-react";
import {
  DemoBanner,
  DemoCard,
  DemoTopBar,
  EmptyState,
  ResetDemoButton,
  StatusBadge,
  SuccessMessage,
} from "@/components/demos/shared/DemoPrimitives";
import {
  agendaProfessionals,
  agendaServices,
  agendaTimes,
  AGENDABKY_STORAGE_KEY,
  initialAgendaDemoState,
  isTimeUnavailable,
} from "@/data/demo-agendabky";
import { clearDemoState, createDemoId, readDemoState, saveDemoState } from "@/lib/demo-storage";
import type { AgendaAppointment, AgendaDemoState, AgendaProfessional, AgendaService } from "@/types/demos";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5 | 6 | 7;

type AgendaDraft = {
  serviceId: string;
  professionalId: string;
  date: string;
  time: string;
  customerName: string;
  customerPhone: string;
};

export function AgendaBKyDemo() {
  const [state, setState] = useState<AgendaDemoState>(initialAgendaDemoState);
  const [step, setStep] = useState<Step>(1);
  const [adminView, setAdminView] = useState(false);
  const [message, setMessage] = useState("");
  const [lastCode, setLastCode] = useState("DEMO-A1B2C3");
  const [draft, setDraft] = useState<AgendaDraft>({
    serviceId: agendaServices[0].id,
    professionalId: agendaProfessionals[0].id,
    date: getDateOptions()[0].value,
    time: "",
    customerName: "Cliente Demonstração",
    customerPhone: "(00) 00000-0000",
  });

  useEffect(() => {
    const loadId = window.setTimeout(() => {
      setState(readDemoState(AGENDABKY_STORAGE_KEY, initialAgendaDemoState));
    }, 0);
    return () => window.clearTimeout(loadId);
  }, []);

  useEffect(() => {
    saveDemoState(AGENDABKY_STORAGE_KEY, state);
  }, [state]);

  const services = state.services?.length ? state.services : agendaServices;
  const selectedService = services.find((item) => item.id === draft.serviceId) ?? services[0];
  const selectedProfessional = agendaProfessionals.find((item) => item.id === draft.professionalId) ?? agendaProfessionals[0];

  function confirmAppointment() {
    const code = createDemoId("DEMO");
    const appointment: AgendaAppointment = {
      id: createDemoId("AG"),
      code,
      serviceId: draft.serviceId,
      professionalId: draft.professionalId,
      date: draft.date,
      time: draft.time,
      customerName: draft.customerName || "Cliente Demonstração",
      customerPhone: draft.customerPhone || "(00) 00000-0000",
      status: "Demonstração",
    };

    setLastCode(code);
    setState((current) => ({ ...current, appointments: [appointment, ...current.appointments] }));
    setMessage("Agendamento demonstrativo concluído. Nenhum horário real foi reservado.");
    setStep(7);
  }

  function resetDemo() {
    clearDemoState(AGENDABKY_STORAGE_KEY);
    setState(initialAgendaDemoState);
    setStep(1);
    setAdminView(false);
    setDraft({ serviceId: agendaServices[0].id, professionalId: agendaProfessionals[0].id, date: getDateOptions()[0].value, time: "", customerName: "Cliente Demonstração", customerPhone: "(00) 00000-0000" });
    setMessage("Demonstração do AgendaBKy reiniciada.");
  }

  if (adminView) {
    return (
      <AdminView
        appointments={state.appointments}
        services={services}
        onBack={() => setAdminView(false)}
        onReset={resetDemo}
        onCreateService={(service) => setState((current) => ({ ...current, services: [service, ...(current.services ?? agendaServices)] }))}
        onUpdateService={(service) => setState((current) => ({ ...current, services: (current.services ?? agendaServices).map((item) => (item.id === service.id ? service : item)) }))}
        onDeleteService={(id) => setState((current) => ({ ...current, services: (current.services ?? agendaServices).filter((item) => item.id !== id) }))}
      />
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20 text-white">
      <DemoTopBar title="AgendaBKy" backHref="/agendabky" />
      <main className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-6 lg:grid-cols-[1fr_22rem] lg:px-6">
        <section className="grid gap-5">
          <DemoBanner>Esta é uma demonstração do AgendaBKy. Nenhum horário real será reservado e nenhum dado será enviado para uma empresa.</DemoBanner>
          {message ? <SuccessMessage>{message}</SuccessMessage> : null}
          <DemoCard>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm text-muted">Barbearia Modelo</p>
                <h1 className="mt-1 text-2xl font-bold text-white">Ambiente fictício de agendamento</h1>
                <p className="mt-2 text-sm text-muted">Ambiente fictício criado exclusivamente para demonstração do AgendaBKy.</p>
              </div>
              <StatusBadge>Etapa {Math.min(step, 6)} de 6</StatusBadge>
            </div>
            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/8">
              <div className="h-full rounded-full bg-gradient-to-r from-primary-light to-primary transition-all" style={{ width: `${Math.min(step, 6) * 16.66}%` }} />
            </div>
          </DemoCard>
          {step === 1 ? <ChooseService services={services} value={draft.serviceId} onChange={(serviceId) => setDraft({ ...draft, serviceId })} onNext={() => setStep(2)} /> : null}
          {step === 2 ? <ChooseProfessional value={draft.professionalId} onChange={(professionalId) => setDraft({ ...draft, professionalId, time: "" })} onBack={() => setStep(1)} onNext={() => setStep(3)} /> : null}
          {step === 3 ? <ChooseDate value={draft.date} onChange={(date) => setDraft({ ...draft, date, time: "" })} onBack={() => setStep(2)} onNext={() => setStep(4)} /> : null}
          {step === 4 ? <ChooseTime draft={draft} onChange={(time) => setDraft({ ...draft, time })} onBack={() => setStep(3)} onNext={() => setStep(5)} /> : null}
          {step === 5 ? <CustomerData draft={draft} setDraft={setDraft} onBack={() => setStep(4)} onNext={() => setStep(6)} /> : null}
          {step === 6 ? <Summary service={selectedService} professional={selectedProfessional} draft={draft} onBack={() => setStep(5)} onConfirm={confirmAppointment} /> : null}
          {step === 7 ? <SuccessScreen code={lastCode} onNew={() => setStep(1)} /> : null}
        </section>
        <aside className="grid content-start gap-5">
          <DemoCard title="Ações da demonstração">
            <div className="mt-4 grid gap-3">
              <button type="button" onClick={() => setAdminView(true)} className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-sky-300/35 bg-sky-400/10 px-4 text-sm font-semibold text-sky-100 hover:bg-sky-400/15">
                <UserCog className="size-4" aria-hidden="true" />
                Ver como administrador
              </button>
              <ResetDemoButton onReset={resetDemo} />
            </div>
          </DemoCard>
          <AppointmentsList services={services} appointments={state.appointments} onDelete={(id) => setState((current) => ({ ...current, appointments: current.appointments.filter((item) => item.id !== id) }))} />
        </aside>
      </main>
    </div>
  );
}

function ChooseService({ services, value, onChange, onNext }: { services: AgendaService[]; value: string; onChange: (value: string) => void; onNext: () => void }) {
  return (
    <DemoCard title="Escolha o serviço">
      <p className="mt-2 text-sm text-muted">Valores demonstrativos, sem cobrança real.</p>
      <div className="mt-5 grid gap-4 md:grid-cols-2">
        {services.map((service) => <Selectable key={service.id} active={value === service.id} onClick={() => onChange(service.id)} title={service.name} meta={`${service.duration} • ${service.price}`} />)}
      </div>
      <StepActions onNext={onNext} />
    </DemoCard>
  );
}

function ChooseProfessional({ value, onChange, onBack, onNext }: { value: string; onChange: (value: string) => void; onBack: () => void; onNext: () => void }) {
  return (
    <DemoCard title="Escolha o profissional">
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {agendaProfessionals.map((professional) => (
          <button key={professional.id} type="button" onClick={() => onChange(professional.id)} className={cn("rounded-2xl border p-5 text-left transition", value === professional.id ? "border-sky-300 bg-sky-400/10" : "border-border bg-white/[0.03] hover:border-sky-300/50")}>
            <span className="grid size-12 place-items-center rounded-xl bg-sky-400/10 text-sm font-bold text-sky-100">{professional.initials}</span>
            <span className="mt-4 block font-semibold text-white">{professional.name}</span>
          </button>
        ))}
      </div>
      <StepActions onBack={onBack} onNext={onNext} />
    </DemoCard>
  );
}

function ChooseDate({ value, onChange, onBack, onNext }: { value: string; onChange: (value: string) => void; onBack: () => void; onNext: () => void }) {
  return (
    <DemoCard title="Escolha a data">
      <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {getDateOptions().map((date) => <Selectable key={date.value} active={value === date.value} onClick={() => onChange(date.value)} title={date.label} meta={date.value} />)}
      </div>
      <StepActions onBack={onBack} onNext={onNext} />
    </DemoCard>
  );
}

function ChooseTime({ draft, onChange, onBack, onNext }: { draft: { professionalId: string; date: string; time: string }; onChange: (value: string) => void; onBack: () => void; onNext: () => void }) {
  return (
    <DemoCard title="Escolha o horário">
      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {agendaTimes.map((time) => {
          const unavailable = isTimeUnavailable(draft.professionalId, draft.date, time);
          return (
            <button key={time} type="button" disabled={unavailable} onClick={() => onChange(time)} className={cn("min-h-12 rounded-xl border text-sm font-semibold", draft.time === time ? "border-sky-300 bg-sky-400/15 text-sky-100" : "border-border bg-white/[0.03] text-white", unavailable && "cursor-not-allowed opacity-40")}>
              {time}
              {unavailable ? <span className="block text-[10px] font-normal">indisponível</span> : null}
            </button>
          );
        })}
      </div>
      <StepActions onBack={onBack} onNext={onNext} nextDisabled={!draft.time} />
    </DemoCard>
  );
}

function CustomerData({ draft, setDraft, onBack, onNext }: { draft: AgendaDraft; setDraft: (value: AgendaDraft) => void; onBack: () => void; onNext: () => void }) {
  return (
    <DemoCard title="Dados demonstrativos do cliente">
      <p className="mt-2 rounded-xl border border-amber-300/30 bg-amber-400/10 p-3 text-sm text-amber-100">Não informe dados reais. Esta é apenas uma demonstração.</p>
      <div className="mt-5 grid gap-4">
        <label className="grid gap-2 text-sm text-slate-200">Nome demonstrativo<input value={draft.customerName} onChange={(event) => setDraft({ ...draft, customerName: event.target.value })} className={inputClass} /></label>
        <label className="grid gap-2 text-sm text-slate-200">Telefone demonstrativo<input value={draft.customerPhone} onChange={(event) => setDraft({ ...draft, customerPhone: event.target.value })} className={inputClass} /></label>
      </div>
      <StepActions onBack={onBack} onNext={onNext} />
    </DemoCard>
  );
}

function Summary({ service, professional, draft, onBack, onConfirm }: { service: AgendaService; professional: AgendaProfessional; draft: AgendaDraft; onBack: () => void; onConfirm: () => void }) {
  return (
    <DemoCard title="Confirmar agendamento demonstrativo">
      <div className="mt-5 grid gap-3 text-sm text-muted">
        <p><strong className="text-white">Serviço:</strong> {service.name}</p>
        <p><strong className="text-white">Profissional:</strong> {professional.name}</p>
        <p><strong className="text-white">Data:</strong> {draft.date}</p>
        <p><strong className="text-white">Horário:</strong> {draft.time}</p>
        <p><strong className="text-white">Duração:</strong> {service.duration}</p>
        <p><strong className="text-white">Valor demonstrativo:</strong> {service.price}</p>
        <p><strong className="text-white">Cliente:</strong> {draft.customerName}</p>
      </div>
      <div className="mt-6 flex flex-col gap-3 sm:flex-row">
        <button type="button" onClick={onBack} className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold text-white hover:bg-white/8">Voltar e alterar</button>
        <button type="button" onClick={onConfirm} className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-blue-500">Confirmar agendamento demonstrativo</button>
      </div>
    </DemoCard>
  );
}

function SuccessScreen({ code, onNew }: { code: string; onNew: () => void }) {
  return (
    <DemoCard title="Agendamento demonstrativo concluído">
      <div className="mt-5 rounded-2xl border border-emerald-300/35 bg-emerald-400/10 p-5">
        <CalendarCheck className="size-8 text-emerald-200" aria-hidden="true" />
        <p className="mt-4 text-lg font-semibold text-white">Nenhum horário real foi reservado.</p>
        <p className="mt-2 text-sm text-emerald-100">Código fictício: {code}</p>
      </div>
      <button type="button" onClick={onNew} className="mt-5 min-h-11 rounded-lg border border-border px-4 text-sm font-semibold text-white hover:bg-white/8">Criar outro agendamento</button>
    </DemoCard>
  );
}

function AppointmentsList({ services, appointments, onDelete }: { services: AgendaService[]; appointments: AgendaAppointment[]; onDelete: (id: string) => void }) {
  return (
    <DemoCard title="Minha agenda demonstrativa">
      <div className="mt-4 grid gap-3">
        {appointments.length === 0 ? <EmptyState>Nenhum agendamento simulado neste navegador.</EmptyState> : appointments.map((appointment) => {
          const service = services.find((item) => item.id === appointment.serviceId);
          const professional = agendaProfessionals.find((item) => item.id === appointment.professionalId);
          return (
            <div key={appointment.id} className="rounded-xl border border-border bg-white/[0.03] p-4 text-sm">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-semibold text-white">{service?.name}</p>
                  <p className="mt-1 text-muted">{professional?.name} • {appointment.date} às {appointment.time}</p>
                </div>
                <button type="button" onClick={() => onDelete(appointment.id)} className="grid size-9 place-items-center rounded-lg border border-border text-muted hover:text-white" aria-label="Excluir agendamento demonstrativo"><Trash2 className="size-4" /></button>
              </div>
              <div className="mt-3"><StatusBadge>{appointment.status}</StatusBadge></div>
            </div>
          );
        })}
      </div>
    </DemoCard>
  );
}

function AdminView({
  appointments,
  services,
  onBack,
  onReset,
  onCreateService,
  onUpdateService,
  onDeleteService,
}: {
  appointments: AgendaAppointment[];
  services: AgendaService[];
  onBack: () => void;
  onReset: () => void;
  onCreateService: (service: AgendaService) => void;
  onUpdateService: (service: AgendaService) => void;
  onDeleteService: (id: string) => void;
}) {
  const [serviceForm, setServiceForm] = useState({ name: "Sobrancelha", duration: "20 minutos", price: "R$ 25,00" });

  function submitService(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!serviceForm.name.trim() || !serviceForm.duration.trim() || !serviceForm.price.trim()) return;
    onCreateService({
      id: createDemoId("SERV"),
      name: serviceForm.name.trim(),
      duration: serviceForm.duration.trim(),
      price: serviceForm.price.trim(),
    });
    setServiceForm({ name: "", duration: "", price: "" });
  }

  return (
    <div className="min-h-screen bg-background pt-20 text-white">
      <DemoTopBar title="AgendaBKy - visão administrativa demonstrativa" backHref="/agendabky" />
      <main className="mx-auto grid w-full max-w-7xl gap-5 px-4 py-6 lg:px-6">
        <DemoBanner>Visão administrativa reduzida, somente demonstrativa. Não existem usuários, permissões ou administração real.</DemoBanner>
        <div className="flex flex-col gap-3 sm:flex-row">
          <button type="button" onClick={onBack} className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold text-white hover:bg-white/8">Voltar para agendamento</button>
          <ResetDemoButton onReset={onReset} />
        </div>
        <div className="grid gap-4 md:grid-cols-4">
          <DemoCard><p className="text-sm text-muted">Agenda do dia</p><p className="mt-2 text-2xl font-bold">{appointments.length + 3}</p></DemoCard>
          <DemoCard><p className="text-sm text-muted">Próximos atendimentos</p><p className="mt-2 text-2xl font-bold">4</p></DemoCard>
          <DemoCard><p className="text-sm text-muted">Profissionais</p><p className="mt-2 text-2xl font-bold">3</p></DemoCard>
          <DemoCard><p className="text-sm text-muted">Serviços ativos</p><p className="mt-2 text-2xl font-bold">{services.length}</p></DemoCard>
        </div>
        <div className="grid gap-5 lg:grid-cols-[0.85fr_1.15fr]">
          <DemoCard title="Criar corte ou serviço">
            <p className="mt-2 text-sm text-muted">Cadastro fictício. Nada é enviado para servidor.</p>
            <form onSubmit={submitService} className="mt-5 grid gap-4">
              <label className="grid gap-2 text-sm text-slate-200">
                Nome do serviço
                <input value={serviceForm.name} onChange={(event) => setServiceForm({ ...serviceForm, name: event.target.value })} className={inputClass} />
              </label>
              <label className="grid gap-2 text-sm text-slate-200">
                Duração
                <input value={serviceForm.duration} onChange={(event) => setServiceForm({ ...serviceForm, duration: event.target.value })} className={inputClass} placeholder="Ex.: 40 minutos" />
              </label>
              <label className="grid gap-2 text-sm text-slate-200">
                Preço demonstrativo
                <input value={serviceForm.price} onChange={(event) => setServiceForm({ ...serviceForm, price: event.target.value })} className={inputClass} placeholder="Ex.: R$ 45,00" />
              </label>
              <button className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-blue-500">Criar serviço demonstrativo</button>
            </form>
          </DemoCard>
          <DemoCard title="Tabela de preços e cortes">
            <div className="mt-5 grid gap-3">
              {services.map((service) => (
                <ServiceAdminRow key={`${service.id}-${service.name}-${service.duration}-${service.price}`} service={service} onUpdate={onUpdateService} onDelete={onDeleteService} canDelete={services.length > 1} />
              ))}
            </div>
          </DemoCard>
        </div>
        <DemoCard title="Atendimentos fictícios">
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {["09:00 - Corte tradicional com Lucas Martins", "10:30 - Horário indisponível", "13:30 - Barba com Rafael Souza", ...appointments.map((item) => item.time + " - " + (services.find((service) => service.id === item.serviceId)?.name ?? "Serviço") + " com " + (agendaProfessionals.find((professional) => professional.id === item.professionalId)?.name ?? "Profissional"))].map((item) => <p key={item} className="rounded-xl bg-white/[0.04] px-4 py-3 text-sm text-muted">{item}</p>)}
          </div>
        </DemoCard>
      </main>
    </div>
  );
}

function ServiceAdminRow({ service, onUpdate, onDelete, canDelete }: { service: AgendaService; onUpdate: (service: AgendaService) => void; onDelete: (id: string) => void; canDelete: boolean }) {
  const [draft, setDraft] = useState(service);

  return (
    <div className="rounded-2xl border border-border bg-white/[0.03] p-4">
      <div className="grid gap-3 md:grid-cols-[1fr_8rem_8rem_auto]">
        <label className="grid gap-2 text-xs font-semibold text-muted">
          Serviço
          <input value={draft.name} onChange={(event) => setDraft({ ...draft, name: event.target.value })} className={inputClass} />
        </label>
        <label className="grid gap-2 text-xs font-semibold text-muted">
          Duração
          <input value={draft.duration} onChange={(event) => setDraft({ ...draft, duration: event.target.value })} className={inputClass} />
        </label>
        <label className="grid gap-2 text-xs font-semibold text-muted">
          Preço
          <input value={draft.price} onChange={(event) => setDraft({ ...draft, price: event.target.value })} className={inputClass} />
        </label>
        <div className="flex items-end gap-2">
          <button type="button" onClick={() => onUpdate(draft)} className="min-h-11 rounded-lg border border-sky-300/40 px-3 text-sm font-semibold text-sky-100 hover:bg-sky-400/10">Salvar</button>
          <button type="button" disabled={!canDelete} onClick={() => onDelete(service.id)} className="grid size-11 place-items-center rounded-lg border border-border text-muted hover:text-white disabled:cursor-not-allowed disabled:opacity-40" aria-label={"Excluir " + service.name}>
            <Trash2 className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

function Selectable({ active, title, meta, onClick }: { active: boolean; title: string; meta: string; onClick: () => void }) {
  return <button type="button" onClick={onClick} className={cn("rounded-2xl border p-5 text-left transition", active ? "border-sky-300 bg-sky-400/10 shadow-[0_0_18px_rgba(56,189,248,0.12)]" : "border-border bg-white/[0.03] hover:border-sky-300/50")}><span className="font-semibold text-white">{title}</span><span className="mt-2 block text-sm text-muted">{meta}</span></button>;
}

function StepActions({ onBack, onNext, nextDisabled }: { onBack?: () => void; onNext: () => void; nextDisabled?: boolean }) {
  return <div className="mt-6 flex flex-col gap-3 sm:flex-row">{onBack ? <button type="button" onClick={onBack} className="min-h-11 rounded-lg border border-border px-4 text-sm font-semibold text-white hover:bg-white/8">Voltar</button> : null}<button type="button" onClick={onNext} disabled={nextDisabled} className="min-h-11 rounded-lg bg-primary px-4 text-sm font-semibold text-white hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-50">Continuar</button></div>;
}

function getDateOptions() {
  const formatter = new Intl.DateTimeFormat("pt-BR", { weekday: "short", day: "2-digit", month: "2-digit" });
  return Array.from({ length: 8 }, (_, index) => {
    const date = new Date();
    date.setDate(date.getDate() + index);
    return { value: date.toISOString().slice(0, 10), label: index === 0 ? "Hoje" : index === 1 ? "Amanhã" : formatter.format(date) };
  });
}

const inputClass = "min-h-11 rounded-lg border border-border bg-slate-950/60 px-3 text-sm text-white focus:border-sky-300";

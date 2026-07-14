"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { contactSchema, type ContactFormValues } from "@/lib/validations";

const solutionOptions = [
  "Kyros Clock",
  "AgendaBKy",
  "Desenvolvimento de site",
  "Sistema personalizado",
  "Automação de processos",
  "Outro",
] as const;

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: { solutionType: "Sistema personalizado", consent: false },
  });

  async function onSubmit(values: ContactFormValues) {
    setStatus("idle");
    const response = await fetch("/api/contato", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });

    if (!response.ok) {
      setStatus("error");
      return;
    }

    setStatus("success");
    reset();
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid gap-5" noValidate>
      <Field label="Nome" error={errors.name?.message}>
        <input {...register("name")} className={inputClass} autoComplete="name" />
      </Field>
      <Field label="Empresa" error={errors.company?.message}>
        <input {...register("company")} className={inputClass} autoComplete="organization" />
      </Field>
      <div className="grid gap-5 md:grid-cols-2">
        <Field label="Telefone" error={errors.phone?.message}>
          <input {...register("phone")} className={inputClass} autoComplete="tel" />
        </Field>
        <Field label="E-mail" error={errors.email?.message}>
          <input {...register("email")} type="email" className={inputClass} autoComplete="email" />
        </Field>
      </div>
      <Field label="Tipo de solução" error={errors.solutionType?.message}>
        <select {...register("solutionType")} className={inputClass}>
          {solutionOptions.map((option) => (
            <option key={option} value={option} className="bg-slate-950">
              {option}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Mensagem" error={errors.message?.message}>
        <textarea {...register("message")} rows={5} className={inputClass} />
      </Field>
      <label className="flex gap-3 text-sm leading-6 text-muted">
        <input type="checkbox" {...register("consent")} className="mt-1 size-4 rounded border-border bg-slate-950" />
        <span>Li e concordo com a política de privacidade para envio deste contato.</span>
      </label>
      {errors.consent?.message ? <p className="-mt-3 text-sm text-rose-300">{errors.consent.message}</p> : null}
      {status === "success" ? <p className="rounded-lg border border-emerald-400/30 bg-emerald-400/10 px-4 py-3 text-sm text-emerald-100">Mensagem enviada com sucesso. A Kyros Tech retornará o contato pelos dados informados.</p> : null}
      {status === "error" ? <p className="rounded-lg border border-rose-400/30 bg-rose-400/10 px-4 py-3 text-sm text-rose-100">Não foi possível enviar agora. Tente novamente em instantes.</p> : null}
      <Button type="submit" disabled={isSubmitting} className="w-full sm:w-fit">
        {isSubmitting ? <Spinner /> : null}
        {isSubmitting ? "Enviando..." : "Enviar mensagem"}
      </Button>
    </form>
  );
}

const inputClass =
  "min-h-12 w-full rounded-lg border border-border bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition focus:border-primary-light";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="grid gap-2 text-sm font-medium text-slate-200">
      {label}
      {children}
      {error ? <span className="text-sm font-normal text-rose-300">{error}</span> : null}
    </label>
  );
}

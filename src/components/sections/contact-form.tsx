"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { AnimatePresence, m, useAnimate } from "motion/react";
import { LoaderCircle } from "lucide-react";
import { useState, type ReactNode } from "react";
import { useForm, type FieldErrors } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useWhatsApp } from "@/components/whatsapp/whatsapp-context";
import { serviceOptions } from "@/content/services";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { ease, spring } from "@/lib/motion";
import { asset } from "@/lib/base-path";

const schema = z.object({
  name: z.string().trim().min(2, "Informe seu nome"),
  phone: z.string().refine((v) => v.replace(/\D/g, "").length >= 10, "Telefone inválido"),
  email: z.email("E-mail inválido"),
  service: z.string().min(1, "Escolha um serviço"),
  location: z.string().optional(),
  message: z.string().trim().min(10, "Conte um pouco mais (mínimo 10 caracteres)"),
  consent: z.boolean().refine((v) => v, "É preciso aceitar para continuar"),
  botcheck: z.string().optional(),
});

type FormValues = z.infer<typeof schema>;

function maskPhone(value: string) {
  const d = value.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d.length ? `(${d}` : "";
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

const inputClass =
  "w-full rounded-[12px] border border-line bg-paper/60 px-4 text-base text-ink transition-[border-color,box-shadow,background-color] outline-none placeholder:text-graphite/60 focus:border-navy-800 focus:bg-white focus:shadow-glow aria-[invalid=true]:border-danger";

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [scope, animate] = useAnimate();
  const { openChat } = useWhatsApp();
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    mode: "onTouched",
    defaultValues: { name: "", phone: "", email: "", service: "", location: "", message: "", consent: false, botcheck: "" },
  });

  async function onSubmit(values: FormValues) {
    if (values.botcheck) return; // honeypot preenchido = robô
    const key = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    try {
      if (!key) throw new Error("NEXT_PUBLIC_WEB3FORMS_KEY não configurada");
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          access_key: key,
          subject: `Novo contato pelo site — ${values.service}`,
          from_name: "Site WS Tech",
          replyto: values.email,
          Nome: values.name,
          Telefone: values.phone,
          "E-mail": values.email,
          Serviço: values.service,
          "Bairro/cidade": values.location || "—",
          Mensagem: values.message,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.success) throw new Error(data.message || "Falha no envio");
      track("form_submit_success", { service: values.service });
      toast.success("Mensagem enviada!");
      setSent(true);
      reset();
    } catch (err) {
      console.error(err);
      toast.error("Não foi possível enviar agora. Tente novamente ou fale com a gente pelo WhatsApp.");
    }
  }

  function onInvalid(errs: FieldErrors<FormValues>) {
    const keys = Object.keys(errs);
    keys.forEach((k) => animate(`[data-field="${k}"]`, { x: [0, -6, 6, -4, 4, 0] }, { duration: 0.35 }));
    document.getElementById(`f-${keys[0]}`)?.focus();
  }

  return (
    <div ref={scope} className="relative h-full bg-white p-6 sm:p-8 lg:p-12">
      <AnimatePresence mode="wait" initial={false}>
        {sent ? (
          <m.div
            key="sent"
            className="flex min-h-[420px] flex-col items-center justify-center text-center"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={spring.soft}
            role="status"
          >
            <svg
              viewBox="0 0 80 80"
              className="size-20 text-success"
              fill="none"
              stroke="currentColor"
              strokeWidth={5}
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden
            >
              <m.circle
                cx="40"
                cy="40"
                r="35"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, ease: ease.out }}
              />
              <m.path
                d="M25 41 36 52 56 30"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.4, delay: 0.5 }}
              />
            </svg>
            <h3 className="mt-6 text-2xl font-bold text-navy-800">Mensagem enviada!</h3>
            <p className="mt-3 max-w-sm leading-relaxed text-graphite">
              Recebemos seu contato e vamos responder em breve. Se for urgente, chame no WhatsApp.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button variant="whatsapp" size="md" onClick={() => openChat("form-success")}>
                Chamar no WhatsApp
              </Button>
              <Button variant="ghost" size="md" onClick={() => setSent(false)}>
                Enviar outra mensagem
              </Button>
            </div>
          </m.div>
        ) : (
          <m.form
            key="form"
            noValidate
            onSubmit={handleSubmit(onSubmit, onInvalid)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.97 }}
            className="grid gap-5 sm:grid-cols-2"
          >
            <h3 className="font-display text-xl font-bold text-navy-800 sm:col-span-2">Envie sua mensagem</h3>

            <Field name="name" label="Seu nome" error={errors.name?.message} className="sm:col-span-2">
              <input
                id="f-name"
                {...register("name")}
                autoComplete="name"
                placeholder="Como podemos te chamar?"
                aria-invalid={!!errors.name}
                aria-describedby="e-name"
                className={cn(inputClass, "h-12")}
              />
            </Field>

            <Field name="phone" label="WhatsApp / telefone" error={errors.phone?.message}>
              <input
                id="f-phone"
                {...register("phone", { onChange: (e) => setValue("phone", maskPhone(e.target.value)) })}
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="(92) 90000-0000"
                aria-invalid={!!errors.phone}
                aria-describedby="e-phone"
                className={cn(inputClass, "h-12")}
              />
            </Field>

            <Field name="email" label="E-mail" error={errors.email?.message}>
              <input
                id="f-email"
                {...register("email")}
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="voce@email.com"
                aria-invalid={!!errors.email}
                aria-describedby="e-email"
                className={cn(inputClass, "h-12")}
              />
            </Field>

            <Field name="service" label="Qual serviço você precisa?" error={errors.service?.message}>
              <select
                id="f-service"
                {...register("service")}
                aria-invalid={!!errors.service}
                aria-describedby="e-service"
                className={cn(
                  inputClass,
                  "h-12 appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns=%22http://www.w3.org/2000/svg%22%20viewBox=%220%200%2024%2024%22%20fill=%22none%22%20stroke=%22%23023960%22%20stroke-width=%222%22%3E%3Cpath%20d=%22m6%209%206%206%206-6%22/%3E%3C/svg%3E')] bg-[length:20px] bg-[right_14px_center] bg-no-repeat pr-11",
                )}
              >
                <option value="">Selecione…</option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <Field name="location" label="Bairro / cidade" optional>
              <input
                id="f-location"
                {...register("location")}
                autoComplete="address-level2"
                placeholder={`Ex.: Adrianópolis, ${site.city}`}
                className={cn(inputClass, "h-12")}
              />
            </Field>

            <Field name="message" label="Conte mais sobre o serviço" error={errors.message?.message} className="sm:col-span-2">
              <textarea
                id="f-message"
                {...register("message")}
                rows={4}
                placeholder="Descreva o problema ou o que precisa instalar…"
                aria-invalid={!!errors.message}
                aria-describedby="e-message"
                className={cn(inputClass, "resize-y py-3 leading-relaxed")}
              />
            </Field>

            {/* Honeypot: invisível para pessoas */}
            <input {...register("botcheck")} type="text" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />

            <div data-field="consent" className="sm:col-span-2">
              <label className="flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-graphite">
                <input
                  id="f-consent"
                  type="checkbox"
                  {...register("consent")}
                  aria-invalid={!!errors.consent}
                  aria-describedby="e-consent"
                  className="mt-0.5 size-5 shrink-0 cursor-pointer accent-navy-800"
                />
                <span>
                  Concordo com o uso dos meus dados para receber o contato da WS Tech, conforme a{" "}
                  <a
                    href={asset("/politica-de-privacidade/")}
                    className="font-semibold text-navy-800 underline underline-offset-2"
                  >
                    Política de Privacidade
                  </a>
                  .
                </span>
              </label>
              <FieldError id="e-consent" message={errors.consent?.message} />
            </div>

            <div className="sm:col-span-2">
              <Button type="submit" withArrow full disabled={isSubmitting} className="sm:w-auto">
                <AnimatePresence mode="wait" initial={false}>
                  <m.span
                    key={isSubmitting ? "loading" : "idle"}
                    className="inline-flex items-center gap-2"
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                  >
                    {isSubmitting ? (
                      <>
                        <LoaderCircle className="size-5 animate-spin" aria-hidden /> Enviando…
                      </>
                    ) : (
                      <>Enviar mensagem</>
                    )}
                  </m.span>
                </AnimatePresence>
              </Button>
              <p className="mt-4 text-sm text-graphite">
                Prefere mais rápido?{" "}
                <button
                  type="button"
                  onClick={() => openChat("form")}
                  className="font-semibold text-navy-800 underline underline-offset-2"
                >
                  Chame no WhatsApp
                </button>
              </p>
            </div>
          </m.form>
        )}
      </AnimatePresence>
    </div>
  );
}

function Field({
  name,
  label,
  error,
  optional,
  className,
  children,
}: {
  name: string;
  label: string;
  error?: string;
  optional?: boolean;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div data-field={name} className={className}>
      <label htmlFor={`f-${name}`} className="mb-2 block text-sm font-semibold text-navy-800">
        {label} {optional && <span className="font-normal text-graphite">(opcional)</span>}
      </label>
      {children}
      <FieldError id={`e-${name}`} message={error} />
    </div>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  return (
    <AnimatePresence>
      {message && (
        <m.p
          id={id}
          role="alert"
          className="mt-1.5 text-sm font-medium text-danger"
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
        >
          {message}
        </m.p>
      )}
    </AnimatePresence>
  );
}

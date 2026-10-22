"use client";

import { Clock, Mail, MapPin, Phone, type LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { Gear, WhatsAppIcon } from "@/components/icons/brand-icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { useWhatsApp } from "@/components/whatsapp/whatsapp-context";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { ContactForm } from "./contact-form";
import { asset } from "@/lib/base-path";

type Card = {
  icon: LucideIcon | typeof WhatsAppIcon;
  title: string;
  value: ReactNode;
  href?: string;
  onClick?: () => void;
  accent?: boolean;
};

export function Contact() {
  const { openChat } = useWhatsApp();

  const cards: Card[] = [
    { icon: WhatsAppIcon, title: "WhatsApp", value: site.phoneDisplay, onClick: () => openChat("contact-card"), accent: true },
    { icon: Phone, title: "Telefone", value: site.phoneDisplay, href: `tel:${site.phoneE164}` },
    ...(site.email ? [{ icon: Mail, title: "E-mail", value: site.email, href: `mailto:${site.email}` }] : []),
    { icon: MapPin, title: "Atendimento", value: site.serviceArea },
    ...(site.hours ? [{ icon: Clock, title: "Horário", value: site.hours.map((h) => h.label).join(" · ") }] : []),
  ];

  return (
    <section id="contato" aria-labelledby="contato-title" className="section-y relative bg-paper">
      <div aria-hidden className="bg-circuit-dark pointer-events-none absolute inset-0 opacity-[0.035]" />
      <div className="container-site relative">
        <Reveal className="grid overflow-hidden rounded-[32px] shadow-lg lg:grid-cols-12 lg:rounded-[44px]">
          {/* Painel de canais */}
          <div className="relative isolate overflow-hidden bg-navy-950 p-6 text-white sm:p-10 lg:col-span-5 lg:p-12">
            <div
              aria-hidden
              className="absolute inset-0 -z-10 bg-[radial-gradient(90%_60%_at_0%_0%,#0a4a7a_0%,transparent_65%)]"
            />
            <div aria-hidden className="bg-circuit absolute inset-0 -z-10 opacity-[0.05]" />
            <Gear className="absolute -right-24 -bottom-24 -z-10 size-72 text-white/[0.04]" />

            <SectionHeading
              id="contato-title"
              theme="dark"
              index="07"
              eyebrow="Contato"
              title={
                <>
                  Vamos resolver a sua <em>parte elétrica?</em>
                </>
              }
              lead="Mande uma mensagem pelo formulário ou chame no WhatsApp. O orçamento é sem compromisso."
            />

            <Stagger as="ul" className="mt-10 grid gap-3 sm:grid-cols-2 lg:grid-cols-1" step={0.07}>
              {cards.map((card) => {
                const inner = (
                  <>
                    <span
                      className={cn(
                        "grid size-12 shrink-0 place-items-center rounded-2xl transition-colors",
                        card.accent
                          ? "bg-whatsapp text-ink"
                          : "bg-white/10 text-yellow-500 group-hover:bg-yellow-500 group-hover:text-navy-900",
                      )}
                    >
                      <card.icon className="size-6" aria-hidden />
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm text-navy-200">{card.title}</span>
                      <span className="block truncate font-display font-bold text-white">{card.value}</span>
                    </span>
                  </>
                );
                const cls =
                  "group flex w-full items-center gap-4 rounded-[20px] border border-white/10 bg-white/[0.04] p-4 text-left transition hover:border-white/25 hover:bg-white/[0.08]";
                return (
                  <StaggerItem as="li" key={card.title}>
                    {card.onClick ? (
                      <button type="button" onClick={card.onClick} className={cls}>
                        {inner}
                      </button>
                    ) : card.href ? (
                      <a href={card.href} onClick={() => track("phone_click", { source: "contact" })} className={cls}>
                        {inner}
                      </a>
                    ) : (
                      <div className={cls}>{inner}</div>
                    )}
                  </StaggerItem>
                );
              })}
            </Stagger>

            <div className="mt-10 flex items-center gap-3 rounded-2xl bg-yellow-500 p-4 text-navy-900">
              <img src={asset("/images/brand/simbolo.svg")} alt="" className="size-11 rounded-xl bg-white p-1.5" />
              <p className="text-sm leading-snug font-semibold">
                Respondemos o mais rápido possível. Para urgências, prefira o WhatsApp.
              </p>
            </div>
          </div>

          {/* Formulário */}
          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

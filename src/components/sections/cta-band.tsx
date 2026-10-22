"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { Phone } from "lucide-react";
import { useRef } from "react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Reveal } from "@/components/motion/reveal";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";
import { whatsappLink } from "@/lib/whatsapp";

// Faixa amarela de urgência entre a galeria e o contato.
export function CtaBand() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  const reduce = useReducedMotion();
  const loop = inView && !reduce;

  return (
    <div className="bg-paper px-3 pt-16 sm:px-5 lg:pt-24">
      <div
        ref={ref}
        className="relative isolate overflow-hidden rounded-[32px] bg-yellow-500 px-6 py-14 text-navy-900 sm:px-10 lg:rounded-[48px] lg:px-16 lg:py-20"
      >
        <div aria-hidden className="bg-circuit-dark absolute inset-0 -z-10 opacity-[0.1]" />

        {/* Raio gigante em contorno, "acendendo" */}
        <svg
          viewBox="0 0 120 200"
          className="absolute -right-6 -bottom-10 -z-10 h-[120%] text-navy-900 sm:right-6 lg:right-16"
          fill="none"
          aria-hidden
        >
          <m.path
            d="M80 4 14 112h44L36 196l70-120H62z"
            stroke="currentColor"
            strokeWidth={3}
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0.15 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: "easeInOut" }}
          />
          <m.path
            d="M80 4 14 112h44L36 196l70-120H62z"
            fill="currentColor"
            animate={loop ? { opacity: [0, 0.08, 0, 0.12, 0] } : { opacity: 0 }}
            transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 3.5 }}
          />
        </svg>

        <div className="relative grid items-center gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <p className="eyebrow flex items-center gap-2 text-navy-900/70">
              <span className="relative flex size-2.5">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-danger/70" />
                <span className="relative inline-flex size-2.5 rounded-full bg-danger" />
              </span>
              Atendimento emergencial
            </p>
            <h2 className="mt-4 text-[clamp(2.1rem,4.5vw+0.5rem,4rem)] leading-[1.02] font-extrabold tracking-[-0.03em]">
              Ficou sem energia? <br className="hidden sm:block" />A gente resolve.
            </h2>
            <p className="mt-5 max-w-lg text-lg leading-relaxed text-navy-900/80">
              Cheiro de queimado, disjuntor que não volta ou tomada faiscando: desligue o disjuntor geral e chame a WS Tech.
            </p>
          </Reveal>

          <Reveal className="lg:col-span-5" delay={0.15}>
            <a
              href={`tel:${site.phoneE164}`}
              onClick={() => track("phone_click", { source: "cta_band" })}
              className="block font-display text-[clamp(2rem,5vw,3.25rem)] leading-none font-extrabold tracking-[-0.03em] whitespace-nowrap underline decoration-navy-900/25 decoration-4 underline-offset-8 transition hover:decoration-navy-900"
            >
              {site.phoneDisplay}
            </a>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href={whatsappLink("Olá! Preciso de atendimento EMERGENCIAL.")}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_redirect", { source: "cta_band" })}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full bg-navy-900 px-7 font-display font-bold text-white transition hover:bg-navy-800"
              >
                <WhatsAppIcon className="size-5 text-whatsapp" /> Chamar no WhatsApp
              </a>
              <a
                href={`tel:${site.phoneE164}`}
                onClick={() => track("phone_click", { source: "cta_band" })}
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-navy-900 px-7 font-display font-bold transition hover:bg-navy-900 hover:text-white"
              >
                <Phone className="size-5" aria-hidden /> Ligar agora
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  );
}

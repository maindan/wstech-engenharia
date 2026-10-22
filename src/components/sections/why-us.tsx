"use client";

import { m, useScroll, useTransform } from "motion/react";
import { ClipboardCheck, Gauge, Search, Tags, type LucideIcon } from "lucide-react";
import { useRef } from "react";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { SectionHeading } from "@/components/ui/section-heading";
import { SpinBadge } from "@/components/ui/spin-badge";
import { useWhatsApp } from "@/components/whatsapp/whatsapp-context";
import { ease, spring } from "@/lib/motion";
import { asset } from "@/lib/base-path";

const reasons: { title: string; text: string; icon: LucideIcon }[] = [
  { title: "Diagnóstico antes de tudo", text: "Encontramos a causa do problema, não só o sintoma.", icon: Search },
  {
    title: "Quadros organizados e identificados",
    text: "Cada circuito com etiqueta, para você saber exatamente o que desligar.",
    icon: Tags,
  },
  { title: "Testado na hora", text: "Medimos tensão e conferimos cada circuito antes de entregar o serviço.", icon: Gauge },
  {
    title: "Orçamento claro e sem compromisso",
    text: "Você sabe o que será feito e quanto vai custar antes de começarmos.",
    icon: ClipboardCheck,
  },
];

export function WhyUs() {
  const { openChat } = useWhatsApp();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smallY = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const blobRotate = useTransform(scrollYProgress, [0, 1], [-8, 14]);

  return (
    <section aria-labelledby="why-title" className="relative isolate overflow-hidden bg-paper pt-12 pb-20 lg:pt-20 lg:pb-32">
      <SectionBackdrop variant="why" />

      <div className="container-site grid items-center gap-16 lg:grid-cols-12 lg:gap-16">
        {/* Colagem de fotos */}
        {/* O gatilho fica no wrapper: um alvo 100% recortado nunca "entra" na tela para o IntersectionObserver */}
        <m.div
          ref={ref}
          className="relative mx-auto w-full max-w-[520px] pr-10 pb-16 sm:pr-16 lg:col-span-6"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.3 }}
        >
          <m.div
            aria-hidden
            style={{ rotate: blobRotate }}
            className="absolute -top-5 -left-5 size-40 rounded-[36px] bg-yellow-500 sm:size-52"
          />
          <m.div
            className="relative overflow-hidden rounded-[32px] shadow-lg"
            variants={{
              hidden: { clipPath: "inset(100% 0% 0% 0% round 32px)" },
              show: { clipPath: "inset(0% 0% 0% 0% round 32px)", transition: { duration: 1, ease: ease.expo } },
            }}
          >
            <m.img
              src={asset("/images/hero/tecnico-trabalhando-640.webp")}
              srcSet={`${asset("/images/hero/tecnico-trabalhando-640.webp")} 640w, ${asset("/images/hero/tecnico-trabalhando-819.webp")} 819w`}
              sizes="(min-width: 1024px) 40vw, 90vw"
              alt="Técnico da WS Tech Engenharia, de costas, trabalhando na fiação de uma caixa de passagem com alicate e chave de fenda"
              width={819}
              height={1024}
              loading="lazy"
              className="aspect-[4/5] w-full object-cover"
              variants={{ hidden: { scale: 1.15 }, show: { scale: 1, transition: { duration: 1.2, ease: ease.expo } } }}
            />
          </m.div>

          {/* Foto menor sobreposta */}
          <m.div style={{ y: smallY }} className="absolute right-0 bottom-0 w-[46%]">
            <m.div
              className="overflow-hidden rounded-[24px] border-[6px] border-paper shadow-lg"
              variants={{
                hidden: { opacity: 0, rotate: 0, scale: 0.85 },
                show: { opacity: 1, rotate: 4, scale: 1, transition: { ...spring.soft, delay: 0.5 } },
              }}
            >
              <img
                src={asset("/images/projetos/medicao-tensao-alicate-amperimetro-640.webp")}
                alt="Medição de tensão com alicate amperímetro marcando 221,7 volts"
                width={640}
                height={800}
                loading="lazy"
                className="aspect-[4/5] w-full object-cover"
              />
            </m.div>
          </m.div>

          <m.div
            className="absolute top-6 -right-2 sm:right-2"
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              show: { opacity: 1, scale: 1, transition: { ...spring.bouncy, delay: 0.8 } },
            }}
          >
            <SpinBadge text="Orçamento grátis • Atendimento rápido • " />
          </m.div>
        </m.div>

        <div className="lg:col-span-6">
          <SectionHeading
            id="why-title"
            index="01"
            eyebrow="Por que a WS Tech"
            title={
              <>
                Elétrica é coisa séria. A gente trata <em>como engenharia.</em>
              </>
            }
            lead="Fio aparente, disjuntor que desarma sozinho e tomada esquentando não são “normais”. Cada serviço começa com diagnóstico, segue com material de qualidade e termina com tudo testado, identificado e organizado."
          />

          <Stagger as="ul" className="mt-10 grid gap-4 sm:grid-cols-2" step={0.1}>
            {reasons.map((r, i) => (
              <StaggerItem
                as="li"
                key={r.title}
                className="group relative overflow-hidden rounded-[22px] border border-line bg-white p-5 shadow-sm transition-shadow duration-300 hover:shadow-md"
              >
                <span
                  aria-hidden
                  className="text-outline-thin absolute -top-3 -right-1 font-display text-[4.5rem] leading-none font-extrabold text-navy-800/15"
                >
                  0{i + 1}
                </span>
                <span className="grid size-11 place-items-center rounded-xl bg-navy-800 text-yellow-500 transition-colors duration-300 group-hover:bg-yellow-500 group-hover:text-navy-800">
                  <r.icon className="size-5" strokeWidth={2} aria-hidden />
                </span>
                <h3 className="mt-4 font-display text-[1.0625rem] leading-snug font-bold text-navy-800">{r.title}</h3>
                <p className="mt-1.5 text-[0.9375rem] leading-relaxed text-graphite">{r.text}</p>
              </StaggerItem>
            ))}
          </Stagger>

          <Reveal className="mt-10">
            <Button withArrow variant="secondary" onClick={() => openChat("why-us")}>
              Falar com um técnico
            </Button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

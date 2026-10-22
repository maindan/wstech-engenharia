"use client";

import { m, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { BadgeCheck, Check, CircuitBoard, Siren, type LucideIcon } from "lucide-react";
import { useRef, type ReactNode } from "react";
import { Gear } from "@/components/icons/brand-icons";
import { Counter } from "@/components/motion/counter";
import { TextReveal } from "@/components/motion/text-reveal";
import { Button, ButtonLink } from "@/components/ui/button";
import { Bolt } from "@/components/ui/section-heading";
import { useWhatsApp } from "@/components/whatsapp/whatsapp-context";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { ease, fadeUp, spring } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";
import { CircuitPulses } from "./circuit-pulses";
import { asset } from "@/lib/base-path";

const chips: { label: string; icon: LucideIcon; className: string; from: { x?: number; y?: number }; float: number }[] = [
  {
    label: "Orçamento sem compromisso",
    icon: BadgeCheck,
    className: "left-0 top-[16%] sm:left-[2%] lg:top-[29%] lg:-left-14 xl:-left-16",
    from: { x: -40 },
    float: 4.6,
  },
  {
    label: "Quadros até 24 circuitos",
    icon: CircuitBoard,
    className: "right-0 top-[42%] sm:right-[0%] lg:top-[22%] lg:-right-7 xl:top-[42%] xl:-right-14",
    from: { x: 40 },
    float: 5.4,
  },
  {
    label: "Atendimento emergencial",
    icon: Siren,
    className: "left-[2%] bottom-[16%] sm:left-[6%] lg:-left-10 xl:-left-12",
    from: { y: 40 },
    float: 6.1,
  },
];

const stats: { value: ReactNode; label: string }[] = [
  { value: <Counter to={11} suffix="+" />, label: "tipos de serviço elétrico" },
  { value: <Counter to={24} />, label: "circuitos em um único quadro" },
  { value: "2 em 1", label: "atendimento residencial e comercial" },
  { value: "R$ 0", label: "para fazer seu orçamento" },
];

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const inView = useInView(ref);
  const { openChat } = useWhatsApp();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const techY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const wordX = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);
  const chipsY = useTransform(scrollYProgress, [0, 1], [0, -70]);
  const loop = !reduce && inView;

  return (
    <section
      ref={ref}
      id="inicio"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-navy-950 pt-24 text-white lg:pt-28"
    >
      {/* Fundo: gradiente, circuito, pulsos de energia e textura */}
      <div
        aria-hidden
        className="absolute inset-0 -z-10 bg-[radial-gradient(110%_75%_at_75%_30%,#0a4a7a_0%,#012642_45%,#011a2e_100%)]"
      />
      <div aria-hidden className="bg-circuit absolute inset-0 -z-10 opacity-[0.05]" />
      <CircuitPulses active={loop} className="absolute inset-0 -z-10 size-full" />
      <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.12]" />
      <m.div
        aria-hidden
        className="pointer-events-none absolute -top-32 -left-40 -z-10 size-[460px] text-white/[0.035] lg:size-[620px]"
        animate={loop ? { rotate: -360 } : undefined}
        transition={{ duration: 80, ease: "linear", repeat: Infinity }}
      >
        <Gear className="size-full" />
      </m.div>

      <div className="container-site relative grid items-center gap-y-4 lg:min-h-[calc(88vh-7rem)] lg:grid-cols-12 lg:gap-x-8">
        {/* Texto */}
        <div className="relative z-10 lg:col-span-6">
          <m.p
            className="eyebrow inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-2 text-white backdrop-blur"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: ease.out }}
          >
            <m.span
              className="text-yellow-500"
              animate={reduce ? undefined : { opacity: [1, 0.25, 1, 0.5, 1] }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <Bolt className="size-3.5" />
            </m.span>
            Engenharia elétrica em {site.city}
          </m.p>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.5rem,4.4vw+1rem,4.5rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-white"
          >
            <TextReveal segments={[{ text: "Energia segura, instalação" }]} delay={0.2} />{" "}
            <span className="relative inline-block whitespace-nowrap text-yellow-500">
              <TextReveal segments={[{ text: "bem feita." }]} delay={0.41} />
              <svg
                viewBox="0 0 300 20"
                preserveAspectRatio="none"
                className="absolute -bottom-2 left-0 h-[0.3em] w-full"
                aria-hidden
              >
                <m.path
                  d="M3 14C60 6 140 3 297 9"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={6}
                  strokeLinecap="round"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, delay: 0.75, ease: ease.out }}
                />
              </svg>
            </span>
          </h1>

          <m.p
            className="type-lead mt-7 max-w-[34rem] text-navy-200"
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.6 }}
          >
            Da troca de um disjuntor à montagem de quadros trifásicos completos: a WS Tech Engenharia instala, organiza e mantém a
            parte elétrica da sua casa ou empresa com acabamento profissional e atendimento rápido.
          </m.p>

          <m.div
            className="mt-8 flex flex-col gap-3 sm:flex-row"
            initial="hidden"
            animate="show"
            variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08, delayChildren: 0.75 } } }}
          >
            <m.div variants={fadeUp}>
              <Button withArrow full className="sm:w-auto" onClick={() => openChat("hero")}>
                Solicitar orçamento
              </Button>
            </m.div>
            <m.div variants={fadeUp}>
              <ButtonLink
                href="#servicos"
                variant="outline-light"
                full
                className="sm:w-auto"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection("servicos");
                }}
              >
                Ver serviços
              </ButtonLink>
            </m.div>
          </m.div>

          <m.ul
            className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm font-medium text-navy-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            {["Orçamento sem compromisso", "Residencial e comercial", "Atendimento emergencial"].map((t) => (
              <li key={t} className="flex items-center gap-1.5">
                <Check className="size-4 text-yellow-500" strokeWidth={3} aria-hidden />
                {t}
              </li>
            ))}
          </m.ul>
        </div>

        {/* Imagem */}
        <div className="relative -mx-5 h-[min(125vw,560px)] sm:mx-0 lg:col-span-6 lg:h-[min(80vh,680px)]">
          {/* Palavra gigante em contorno */}
          <m.p
            aria-hidden
            style={{ x: reduce ? 0 : wordX }}
            className="text-outline pointer-events-none absolute inset-x-0 top-[4%] flex justify-center font-display text-[clamp(4.5rem,24vw,12.5rem)] leading-[0.85] font-extrabold tracking-[-0.04em] text-white/20 select-none"
          >
            {"ENERGIA".split("").map((letter, i) => (
              <m.span
                key={i}
                className="inline-block"
                initial={{ y: "40%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ delay: i * 0.04, duration: 0.8, ease: ease.expo }}
              >
                {letter}
              </m.span>
            ))}
          </m.p>

          {/* Técnico + anéis de "campo elétrico" */}
          <m.div
            className="absolute bottom-0 left-1/2 aspect-[516/1004] h-[92%] -translate-x-1/2"
            style={{ y: reduce ? 0 : techY }}
          >
            <div aria-hidden className="absolute top-[10%] left-1/2 aspect-square w-[150%] max-w-[540px] -translate-x-1/2">
              <m.div
                className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,rgb(248_178_20/0.55)_0%,rgb(248_178_20/0)_68%)]"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={loop ? { scale: [1, 1.06, 1], opacity: [0.55, 0.75, 0.55] } : { scale: 1, opacity: 0.6 }}
                transition={loop ? { duration: 4, repeat: Infinity, ease: "easeInOut" } : { delay: 0.5, duration: 1.2 }}
              />
              {[0, 1, 2].map((i) => (
                <m.span
                  key={i}
                  className="absolute inset-0 rounded-full border border-yellow-500/25"
                  initial={{ scale: 0.55, opacity: 0 }}
                  animate={loop ? { scale: [0.55, 1.05], opacity: [0.7, 0] } : { scale: 0.55 + i * 0.2, opacity: 0.25 }}
                  transition={loop ? { duration: 4.5, delay: i * 1.5, repeat: Infinity, ease: "easeOut" } : { duration: 0.6 }}
                />
              ))}
            </div>
            <m.div
              className="relative h-full"
              initial={{ opacity: 0, y: 60, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 0.3, duration: 1, ease: ease.out }}
            >
              <img
                src={asset("/images/hero/tecnico-recortado.webp")}
                alt="Eletricista da WS Tech Engenharia com capacete, luvas e cinto de ferramentas, de braços cruzados"
                width={516}
                height={1004}
                fetchPriority="high"
                className="size-full [mask-image:linear-gradient(to_bottom,black_78%,transparent)] object-contain object-bottom"
              />
            </m.div>
          </m.div>

          {/* Chips flutuantes */}
          <m.div className="absolute inset-0 mx-auto max-w-[580px] px-3 lg:max-w-none lg:px-0" style={{ y: reduce ? 0 : chipsY }}>
            {chips.map((chip, i) => (
              <m.div
                key={chip.label}
                className={cn("absolute", chip.className)}
                initial={{ opacity: 0, ...chip.from }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ ...spring.soft, delay: 0.9 + i * 0.12 }}
              >
                <m.div
                  className="flex items-center gap-2 rounded-2xl bg-white py-2 pr-3.5 pl-2 shadow-[0_18px_40px_-12px_rgb(0_0_0/0.5)] sm:gap-2.5 sm:py-2.5"
                  animate={loop ? { y: [0, -8, 0] } : undefined}
                  transition={{ duration: chip.float, repeat: Infinity, ease: "easeInOut" }}
                >
                  <span className="grid size-8 place-items-center rounded-xl bg-yellow-500 text-navy-800 sm:size-9">
                    <chip.icon className="size-4 sm:size-[18px]" strokeWidth={2.25} aria-hidden />
                  </span>
                  <span className="max-w-[8.5rem] font-display text-xs leading-tight font-bold text-navy-800 sm:max-w-none sm:text-sm lg:max-w-[6.5rem] xl:max-w-[8.5rem]">
                    {chip.label}
                  </span>
                </m.div>
              </m.div>
            ))}
          </m.div>
        </div>
      </div>

      {/* Números em cartões de vidro */}
      <div className="container-site relative z-10 pb-20 lg:pb-24">
        <m.dl
          className="grid grid-cols-2 gap-3 lg:grid-cols-4 lg:gap-4"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.4 }}
          variants={{ hidden: {}, show: { transition: { staggerChildren: 0.08 } } }}
        >
          {stats.map((s) => (
            <m.div
              key={s.label}
              variants={fadeUp}
              className="flex flex-col-reverse gap-2 rounded-[22px] border border-white/10 bg-white/[0.05] p-5 backdrop-blur-md lg:p-6"
            >
              <dt className="text-sm leading-snug text-navy-200">{s.label}</dt>
              <dd className="font-display text-[clamp(2rem,5vw,3rem)] leading-none font-extrabold tracking-[-0.03em] text-yellow-500">
                {s.value}
              </dd>
            </m.div>
          ))}
        </m.dl>
      </div>
    </section>
  );
}

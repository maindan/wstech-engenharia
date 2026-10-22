"use client";

import { m, useScroll, useTransform } from "motion/react";
import { ArrowUpRight, Check } from "lucide-react";
import { useRef, type PointerEvent } from "react";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { bigServices, type BigService } from "@/content/services";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { serviceQuote, whatsappLink } from "@/lib/whatsapp";

const span: Record<BigService["size"], string> = {
  large: "lg:col-span-7 lg:row-span-2 min-h-[440px] lg:min-h-[720px]",
  medium: "lg:col-span-5 min-h-[360px] lg:min-h-0",
  wide: "lg:col-span-12 min-h-[400px] lg:min-h-[340px]",
};

const promises = ["Conforme as normas técnicas", "Pronto para a vistoria", "Material de qualidade"];

export function BigServices() {
  return (
    <div className="px-3 sm:px-5">
      <div className="relative isolate overflow-hidden rounded-[32px] bg-navy-950 py-20 text-white lg:rounded-[48px] lg:py-28">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(80%_60%_at_0%_0%,#0a4a7a_0%,transparent_60%)]" />
        <div aria-hidden className="bg-circuit absolute inset-0 -z-10 opacity-[0.05]" />
        <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.1]" />

        <div className="container-site">
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <SectionHeading
              theme="dark"
              index="03"
              eyebrow="Projetos maiores"
              title={
                <>
                  Para obras, reformas e <em>empresas</em>
                </>
              }
              lead="Entrada de energia, ligações comerciais e instalações completas, executadas conforme as normas técnicas e as exigências da concessionária."
            />
            <Stagger as="ul" className="flex flex-wrap gap-2 lg:max-w-xs lg:flex-col lg:items-end" step={0.08}>
              {promises.map((p) => (
                <StaggerItem
                  as="li"
                  key={p}
                  className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/[0.05] py-2 pr-4 pl-2 text-sm font-medium text-navy-200"
                >
                  <span className="grid size-6 place-items-center rounded-full bg-yellow-500 text-navy-900">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  {p}
                </StaggerItem>
              ))}
            </Stagger>
          </div>

          <div className="mt-12 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5">
            {bigServices.map((s, i) => (
              <BentoCard key={s.accent} service={s} index={i} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function BentoCard({ service, index }: { service: BigService; index: number }) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);
  const name = `${service.title} ${service.accent}`;
  const wide = service.size === "wide";

  // Brilho que segue o cursor (desktop)
  function onMove(e: PointerEvent<HTMLElement>) {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  }

  // O gatilho fica no wrapper: um alvo 100% recortado nunca "entra" na tela para o IntersectionObserver
  return (
    <m.div className={cn("flex", span[service.size])} initial="hidden" whileInView="show" viewport={{ once: true, amount: 0.25 }}>
      <m.article
        ref={ref}
        onPointerMove={onMove}
        className="group relative flex w-full flex-col justify-end overflow-hidden rounded-[24px] border border-white/10 bg-navy-800 transition-colors duration-300 hover:border-yellow-500/50 lg:rounded-[32px]"
        variants={{
          hidden: { clipPath: "inset(100% 0% 0% 0%)", opacity: 0 },
          show: {
            clipPath: "inset(0% 0% 0% 0%)",
            opacity: 1,
            transition: { duration: 0.9, ease: ease.expo, delay: index * 0.1 },
          },
        }}
      >
        {/* Foto (no card largo, ocupa a metade direita no desktop) */}
        <div className={cn("absolute inset-0 overflow-hidden", wide && "lg:left-1/2")}>
          <m.img
            src={service.image.src}
            srcSet={service.image.srcSet}
            sizes="(min-width: 1024px) 55vw, 100vw"
            alt={service.image.alt}
            loading="lazy"
            style={{ y: imgY }}
            className="absolute inset-x-0 -top-[6%] h-[112%] w-full object-cover transition-transform duration-700 ease-out-quint group-hover:scale-105"
          />
        </div>
        <div
          aria-hidden
          className={cn(
            "absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/70 to-navy-950/5",
            wide && "lg:bg-linear-to-r lg:from-navy-950 lg:from-50% lg:via-navy-950/60 lg:to-transparent",
          )}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: "radial-gradient(380px circle at var(--mx) var(--my), rgb(248 178 20 / 0.14), transparent 60%)" }}
        />

        <span className="absolute top-5 left-5 rounded-full bg-yellow-500 px-3 py-1.5 font-display text-xs font-bold tracking-wide text-navy-900 uppercase sm:top-6 sm:left-6">
          {service.tag}
        </span>
        <span
          aria-hidden
          className="text-outline-thin absolute top-4 right-5 font-display text-6xl leading-none font-extrabold text-white/25 sm:right-6"
        >
          0{index + 1}
        </span>

        <div className={cn("relative p-6 sm:p-8", wide && "lg:max-w-[50%] lg:p-10")}>
          <h3 className="text-[clamp(1.6rem,2vw+1rem,2.4rem)] leading-[1.08] font-bold tracking-[-0.02em] text-white">
            {service.title} <span className="text-yellow-500">{service.accent}</span>
          </h3>
          <p className="mt-3 max-w-xl leading-relaxed text-navy-200">{service.description}</p>
          <a
            href={whatsappLink(serviceQuote(name))}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_redirect", { source: "big_service", service: name })}
            className="mt-6 inline-flex min-h-11 items-center gap-3 rounded-full bg-white/10 py-1.5 pr-1.5 pl-5 font-display font-bold text-white backdrop-blur transition-colors hover:bg-white/20"
          >
            Solicitar orçamento
            <span className="grid size-9 place-items-center rounded-full bg-yellow-500 text-navy-900 transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight className="size-5" aria-hidden />
            </span>
          </a>
        </div>
      </m.article>
    </m.div>
  );
}

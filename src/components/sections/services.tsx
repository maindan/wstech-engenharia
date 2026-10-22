"use client";

import { m, useScroll } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { useWhatsApp } from "@/components/whatsapp/whatsapp-context";
import { useDragScroll } from "@/hooks/use-drag-scroll";
import { services, type Service } from "@/content/services";
import { track } from "@/lib/analytics";
import { fadeUp } from "@/lib/motion";
import { serviceQuote, whatsappLink } from "@/lib/whatsapp";
import { asset } from "@/lib/base-path";

const cardIn = {
  hidden: { ...fadeUp.hidden, scale: 0.97 },
  show: { ...(fadeUp.show as object), scale: 1 },
};

export function Services() {
  const listRef = useRef<HTMLDivElement & HTMLUListElement & HTMLOListElement>(null);
  const { scrollXProgress } = useScroll({ container: listRef });
  useDragScroll(listRef);
  const { openChat } = useWhatsApp();
  const regular = services.filter((s) => !s.highlight);
  const emergency = services.find((s) => s.highlight);

  return (
    <div className="section-y relative">
      <div className="container-site grid gap-12 lg:grid-cols-12 lg:gap-12">
        {/* Coluna fixa (desktop) */}
        <div className="min-w-0 lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="servicos-title"
              index="02"
              eyebrow="Serviços"
              titleClassName="lg:text-[2.6rem]"
              title={
                <>
                  Tudo o que a sua <em>instalação elétrica</em> precisa
                </>
              }
              lead="Do reparo rápido à instalação completa, atendemos residências, lojas e escritórios com o mesmo cuidado."
            />
            <Reveal className="mt-8 hidden lg:block">
              <figure className="relative overflow-hidden rounded-[24px]">
                <img
                  src={asset("/images/projetos/painel-comando-contator-640.webp")}
                  alt="Técnico da WS Tech montando um painel de comando com contator e relé térmico"
                  width={640}
                  height={800}
                  loading="lazy"
                  className="aspect-[5/4] w-full object-cover"
                />
                <figcaption className="absolute inset-x-3 bottom-3 rounded-2xl bg-white/90 px-4 py-3 text-sm font-semibold text-navy-800 backdrop-blur">
                  Montagem de painel de comando: cada fio no lugar certo
                </figcaption>
              </figure>
              <Button withArrow variant="secondary" className="mt-6" onClick={() => openChat("services")}>
                Pedir orçamento
              </Button>
            </Reveal>
          </div>
        </div>

        {/* Cards */}
        <div className="min-w-0 max-md:-mx-5 lg:col-span-8">
          <Stagger
            ref={listRef}
            as="ul"
            step={0.07}
            amount={0.05}
            className="no-scrollbar flex cursor-grab snap-x snap-mandatory scroll-px-5 gap-4 overflow-x-auto px-5 pt-2 pb-6 md:grid md:cursor-auto md:grid-cols-2 md:gap-5 md:overflow-visible md:px-0 md:pt-0 md:pb-0"
          >
            {regular.map((service, i) => (
              <StaggerItem as="li" key={service.slug} variants={cardIn} className="w-[84%] shrink-0 snap-start md:w-auto">
                <ServiceCard service={service} index={i} />
              </StaggerItem>
            ))}
            {emergency && (
              <StaggerItem as="li" variants={cardIn} className="w-[84%] shrink-0 snap-start md:col-span-2 md:w-auto">
                <EmergencyCard service={emergency} />
              </StaggerItem>
            )}
          </Stagger>
          <div className="mx-5 mt-4 h-1 overflow-hidden rounded-full bg-navy-100 md:hidden" aria-hidden>
            <m.div className="h-full origin-left rounded-full bg-yellow-500" style={{ scaleX: scrollXProgress }} />
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon;
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-line bg-white p-6 shadow-sm transition-[background-color,border-color,box-shadow,transform] duration-500 ease-out-quint hover:border-navy-800 hover:bg-navy-800 hover:shadow-lg md:hover:-translate-y-1.5 lg:p-7">
      {/* Ícone gigante de fundo */}
      <Icon
        aria-hidden
        strokeWidth={1}
        className="pointer-events-none absolute -right-8 -bottom-8 size-44 -rotate-12 text-navy-800/[0.04] transition-colors duration-500 group-hover:text-white/[0.06]"
      />
      <div className="relative flex items-start justify-between">
        <span className="grid size-14 place-items-center rounded-2xl bg-navy-800 text-yellow-500 transition-colors duration-500 group-hover:bg-yellow-500 group-hover:text-navy-800">
          <Icon className="size-7" strokeWidth={1.75} aria-hidden />
        </span>
        <span className="text-outline-thin font-display text-5xl leading-none font-extrabold text-navy-800/25 transition-colors duration-500 group-hover:text-yellow-500/60">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <h3 className="relative mt-7 text-[clamp(1.25rem,1vw+1rem,1.4rem)] leading-tight font-bold text-navy-800 transition-colors duration-500 group-hover:text-white">
        {service.title}
      </h3>
      <p className="relative mt-3 flex-1 leading-relaxed text-graphite transition-colors duration-500 group-hover:text-navy-200">
        {service.description}
      </p>
      <a
        href={whatsappLink(serviceQuote(service.title))}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_redirect", { source: "service_card", service: service.slug })}
        className="relative mt-6 flex min-h-11 items-center justify-between rounded-full bg-paper py-1.5 pr-1.5 pl-5 font-display text-[0.9375rem] font-bold text-navy-800 transition-colors duration-500 group-hover:bg-white/10 group-hover:text-white"
      >
        Pedir orçamento
        <span className="grid size-9 place-items-center rounded-full bg-yellow-500 text-navy-800 transition-transform duration-300 group-hover:rotate-45">
          <ArrowUpRight className="size-5" aria-hidden />
        </span>
      </a>
    </article>
  );
}

function EmergencyCard({ service }: { service: Service }) {
  const Icon = service.icon;
  return (
    <article className="relative flex h-full flex-col gap-6 overflow-hidden rounded-[28px] bg-yellow-500 p-6 text-navy-900 shadow-md md:flex-row md:items-center md:p-8">
      <div
        aria-hidden
        className="bg-circuit-dark pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_left,black,transparent_70%)] opacity-[0.12]"
      />
      <span className="relative grid size-16 shrink-0 place-items-center rounded-2xl bg-navy-900 text-yellow-500">
        <m.span
          aria-hidden
          className="absolute inset-0 rounded-2xl bg-navy-900"
          animate={{ scale: [1, 1.35], opacity: [0.35, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
        />
        <Icon className="relative size-8" strokeWidth={1.75} aria-hidden />
      </span>
      <div className="relative flex-1">
        <p className="eyebrow text-navy-900/70">Prioridade no atendimento</p>
        <h3 className="mt-1 text-[clamp(1.4rem,1.5vw+1rem,1.875rem)] leading-tight font-extrabold">{service.title}</h3>
        <p className="mt-2 max-w-lg leading-relaxed text-navy-900/80">{service.description}</p>
      </div>
      <a
        href={whatsappLink("Olá! Preciso de atendimento EMERGENCIAL.")}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => track("whatsapp_redirect", { source: "service_card", service: service.slug })}
        className="relative inline-flex h-14 shrink-0 items-center justify-center gap-2 rounded-full bg-navy-900 px-6 font-display font-bold text-white transition hover:bg-navy-800"
      >
        <WhatsAppIcon className="size-5 text-whatsapp" />
        Chamar agora
      </a>
    </article>
  );
}

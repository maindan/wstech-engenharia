"use client";

import { m } from "motion/react";
import { Check, Star } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionBackdrop } from "@/components/ui/section-backdrop";
import { SectionHeading } from "@/components/ui/section-heading";
import { panels } from "@/content/services";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { whatsappLink } from "@/lib/whatsapp";

export function Panels() {
  return (
    <div className="section-y relative isolate overflow-hidden">
      <SectionBackdrop variant="panels" />
      <div className="container-site relative">
        <SectionHeading
          align="center"
          index="04"
          eyebrow="Quadros de distribuição"
          title={
            <>
              O quadro certo para o <em>tamanho da sua necessidade</em>
            </>
          }
          lead="Montamos quadros completos, com disjuntores, barramentos e identificação de cada circuito. Escolha o porte e peça um orçamento."
        />

        <div className="mx-auto mt-16 grid max-w-6xl items-center gap-6 md:grid-cols-3 md:gap-4 lg:gap-6">
          {panels.map((p, i) => {
            const featured = !!p.featured;
            // O card em destaque entra por último
            const order = featured ? 2 : i > 1 ? 1 : 0;
            return (
              <m.article
                key={p.circuits}
                className={cn(
                  "relative flex flex-col rounded-[30px] p-5 sm:p-6 lg:p-7",
                  featured ? "z-10 bg-navy-800 text-white shadow-lg md:py-9" : "border border-line bg-white shadow-sm",
                )}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.3 }}
                variants={{
                  hidden: { opacity: 0, y: 30, scale: featured ? 0.9 : 0.96 },
                  show: { opacity: 1, y: 0, scale: featured ? 1.04 : 1, transition: { ...spring.soft, delay: order * 0.12 } },
                }}
              >
                {featured && (
                  <span className="absolute -top-4 left-1/2 z-10 inline-flex -translate-x-1/2 items-center gap-1.5 overflow-hidden rounded-full bg-yellow-500 px-4 py-2 font-display text-xs font-bold tracking-wide whitespace-nowrap text-navy-800 uppercase shadow-md">
                    <Star className="size-3.5 fill-current" aria-hidden /> Mais pedido
                    <m.span
                      aria-hidden
                      className="absolute inset-y-0 w-8 -skew-x-12 bg-white/50"
                      initial={{ left: "-30%" }}
                      animate={{ left: "130%" }}
                      transition={{ duration: 0.9, repeat: Infinity, repeatDelay: 4, ease: "easeInOut" }}
                    />
                  </span>
                )}

                <BreakerPanel circuits={p.circuits} featured={featured} delay={0.35 + order * 0.12} />

                <div className="mt-6 flex items-end gap-3">
                  <p
                    className={cn(
                      "font-display text-[4rem] leading-[0.8] font-extrabold tracking-[-0.05em]",
                      featured ? "text-yellow-500" : "text-navy-800",
                    )}
                  >
                    {p.circuits}
                  </p>
                  <h3 className={cn("eyebrow pb-1", featured ? "text-white" : "text-navy-800")}>circuitos</h3>
                </div>
                <p className={cn("mt-4 text-sm leading-relaxed", featured ? "text-navy-200" : "text-graphite")}>
                  <span className="font-semibold">Ideal para:</span> {p.idealFor}
                </p>
                <ul className="mt-5 flex-1 space-y-2.5">
                  {p.items.map((item) => (
                    <li key={item} className="flex items-center gap-3 text-[0.9375rem]">
                      <span
                        className={cn(
                          "grid size-6 shrink-0 place-items-center rounded-full",
                          featured ? "bg-yellow-500 text-navy-800" : "bg-navy-100 text-navy-800",
                        )}
                      >
                        <Check className="size-3.5" strokeWidth={3} aria-hidden />
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
                <ButtonLink
                  href={whatsappLink(`Olá! Quero orçamento de um quadro de ${p.circuits} circuitos.`)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_redirect", { source: "panel", circuits: p.circuits })}
                  variant={featured ? "primary" : "outline"}
                  size="md"
                  full
                  className="mt-7"
                  aria-label={`Pedir orçamento de quadro de ${p.circuits} circuitos`}
                >
                  Pedir orçamento
                </ButtonLink>
              </m.article>
            );
          })}
        </div>
        <p className="mx-auto mt-10 max-w-xl text-center text-sm text-graphite">
          Valores variam conforme o local e os materiais. O orçamento é gratuito e sem compromisso.
        </p>
      </div>
    </div>
  );
}

// Ilustração de um quadro: os disjuntores "ligam" um a um quando o card entra na tela.
function BreakerPanel({ circuits, featured, delay }: { circuits: number; featured: boolean; delay: number }) {
  const on = featured ? "#f8b214" : "#1f9d55";
  const off = featured ? "rgb(255 255 255 / 0.18)" : "#d5dbe1";
  return (
    <div
      aria-hidden
      className={cn("rounded-[18px] border p-3", featured ? "border-white/10 bg-navy-950/60" : "border-line bg-paper")}
    >
      <div className="mb-2.5 flex items-center justify-between px-0.5">
        <span
          className={cn(
            "font-display text-[0.625rem] font-bold tracking-[0.22em] uppercase",
            featured ? "text-navy-200" : "text-graphite",
          )}
        >
          QDC · {circuits} disj.
        </span>
        <m.span
          className="size-2 rounded-full"
          variants={{
            hidden: { backgroundColor: off },
            show: { backgroundColor: on, transition: { delay: delay + circuits * 0.03 } },
          }}
        />
      </div>
      <m.div
        className="grid grid-cols-8 gap-1"
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.03, delayChildren: delay } } }}
      >
        {Array.from({ length: circuits }, (_, i) => (
          <m.div
            key={i}
            variants={{ hidden: {}, show: {} }}
            className={cn(
              "flex h-10 flex-col items-center justify-center gap-1 rounded-[5px] border",
              featured ? "border-white/10 bg-white/90" : "border-line bg-white",
            )}
          >
            <span className="relative h-[18px] w-2.5 overflow-hidden rounded-[3px] bg-navy-100">
              <m.span
                className="absolute inset-x-0 top-0 h-[9px] rounded-[3px] bg-navy-800"
                variants={{ hidden: { y: 9 }, show: { y: 0, transition: { type: "spring", stiffness: 600, damping: 20 } } }}
              />
            </span>
            <m.span
              className="h-1 w-3 rounded-full"
              variants={{ hidden: { backgroundColor: "#d5dbe1" }, show: { backgroundColor: on } }}
            />
          </m.div>
        ))}
      </m.div>
    </div>
  );
}

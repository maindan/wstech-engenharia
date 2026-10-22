"use client";

import { m, useMotionValueEvent, useScroll, useSpring } from "motion/react";
import { ClipboardCheck, MessageCircle, ShieldCheck, Wrench, type LucideIcon } from "lucide-react";
import { useRef, useState } from "react";
import { SectionHeading } from "@/components/ui/section-heading";
import { steps } from "@/content/services";
import { cn } from "@/lib/cn";
import { fadeUp } from "@/lib/motion";

const icons: LucideIcon[] = [MessageCircle, ClipboardCheck, Wrench, ShieldCheck];

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [reached, setReached] = useState(0);

  useMotionValueEvent(progress, "change", (v) => {
    setReached(Math.min(steps.length, Math.floor(v * (steps.length - 1) + 1.02)));
  });

  return (
    <div className="section-y relative bg-white">
      <div className="container-site">
        <SectionHeading
          align="center"
          index="05"
          eyebrow="Como funciona"
          title={
            <>
              Do primeiro contato à <em>luz acesa</em>
            </>
          }
          lead="Um processo simples e transparente, do pedido de orçamento ao serviço testado e entregue."
        />

        <ol
          ref={ref}
          className="relative mx-auto mt-16 grid max-w-6xl gap-6 pl-[4.5rem] lg:grid-cols-4 lg:gap-6 lg:pt-24 lg:pl-0"
        >
          {/* Linha de conexão (vertical no mobile, horizontal no desktop) */}
          <span
            aria-hidden
            className="absolute top-7 bottom-7 left-[26px] w-1 rounded-full bg-navy-100 lg:top-[26px] lg:right-[12.5%] lg:bottom-auto lg:left-[12.5%] lg:h-1 lg:w-auto"
          />
          <m.span
            aria-hidden
            className="absolute top-7 bottom-7 left-[26px] w-1 origin-top rounded-full bg-yellow-500 shadow-[0_0_14px_rgb(248_178_20/0.8)] lg:hidden"
            style={{ scaleY: progress }}
          />
          <m.span
            aria-hidden
            className="absolute top-[26px] right-[12.5%] left-[12.5%] hidden h-1 origin-left rounded-full bg-yellow-500 shadow-[0_0_14px_rgb(248_178_20/0.8)] lg:block"
            style={{ scaleX: progress }}
          />

          {steps.map((step, i) => {
            const on = reached > i;
            const Icon = icons[i];
            return (
              <m.li
                key={step.title}
                className="relative"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.5 }}
              >
                {/* Nó da linha */}
                <span
                  className={cn(
                    "absolute top-0 -left-[4.5rem] grid size-14 place-items-center rounded-full border-4 border-white transition-[background-color,color,box-shadow] duration-500 lg:top-[-6rem] lg:left-1/2 lg:-translate-x-1/2",
                    on ? "bg-yellow-500 text-navy-900 shadow-[0_0_0_8px_rgb(248_178_20/0.18)]" : "bg-navy-100 text-navy-800/50",
                  )}
                >
                  <Icon className="size-6" strokeWidth={2} aria-hidden />
                </span>

                <div
                  className={cn(
                    "h-full rounded-[24px] border bg-paper p-6 transition-[border-color,box-shadow] duration-500 lg:text-center",
                    on ? "border-yellow-500/60 shadow-md" : "border-line",
                  )}
                >
                  <p className="eyebrow text-[0.6875rem] text-yellow-700">Passo {i + 1}</p>
                  <h3 className="mt-2 text-xl font-bold text-navy-800">{step.title}</h3>
                  <p className="mt-2 leading-relaxed text-graphite">{step.text}</p>
                </div>
              </m.li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}

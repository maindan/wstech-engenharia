"use client";

import { useInView } from "motion/react";
import { useRef, type ReactNode } from "react";
import { Reveal } from "@/components/motion/reveal";
import { cn } from "@/lib/cn";

type Props = {
  id?: string;
  index?: string;
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  align?: "left" | "center";
  theme?: "light" | "dark";
  className?: string;
  titleClassName?: string;
};

// Use <em> dentro do título para a palavra em destaque (marca-texto amarelo no claro, amarelo no escuro).
export function SectionHeading({
  id,
  index,
  eyebrow,
  title,
  lead,
  align = "left",
  theme = "light",
  className,
  titleClassName,
}: Props) {
  const dark = theme === "dark";
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  return (
    <Reveal className={cn("max-w-3xl", align === "center" && "mx-auto text-center", className)}>
      <p
        className={cn(
          "eyebrow mb-5 inline-flex items-center gap-3",
          align === "center" && "justify-center",
          dark ? "text-yellow-500" : "text-navy-800",
        )}
      >
        {index ? (
          <span
            className={cn(
              "grid h-7 min-w-7 place-items-center rounded-full px-2 text-[0.6875rem] tracking-normal",
              dark ? "bg-yellow-500 text-navy-900" : "bg-navy-800 text-yellow-500",
            )}
          >
            {index}
          </span>
        ) : (
          <Bolt className="size-3.5 text-yellow-500" />
        )}
        {eyebrow}
        <span aria-hidden className={cn("h-px w-10", dark ? "bg-yellow-500/50" : "bg-navy-800/25")} />
      </p>
      <h2
        id={id}
        ref={ref}
        data-inview={inView}
        className={cn(
          "type-h2",
          dark ? "text-white [&_em]:text-yellow-500 [&_em]:not-italic" : "marker text-navy-800",
          titleClassName,
        )}
      >
        {title}
      </h2>
      {lead && (
        <p className={cn("type-lead mt-5", align === "center" && "mx-auto", dark ? "text-navy-200" : "text-graphite")}>{lead}</p>
      )}
    </Reveal>
  );
}

export function Bolt({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M13.5 1 4 13.5h6.2L8.8 23 20 9.6h-6.4L16.4 1z" />
    </svg>
  );
}

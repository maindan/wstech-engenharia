"use client";

import { m, useReducedMotion } from "motion/react";
import { cn } from "@/lib/cn";
import { Bolt } from "./section-heading";

// Selo circular com texto girando em volta de um raio.
export function SpinBadge({ text, className }: { text: string; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <div
      className={cn(
        "relative grid size-32 place-items-center rounded-full bg-navy-800 text-white shadow-lg sm:size-36",
        className,
      )}
    >
      <m.svg
        viewBox="0 0 200 200"
        className="absolute inset-0 size-full"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        aria-hidden
      >
        <defs>
          <path id="spin-circle" d="M100 100m-74 0a74 74 0 1 1 148 0a74 74 0 1 1-148 0" />
        </defs>
        <text className="fill-current font-display text-[15px] font-bold uppercase">
          {/* textLength = circunferência: o texto fecha o círculo exatamente */}
          <textPath href="#spin-circle" textLength={462} lengthAdjust="spacing">
            {text}
          </textPath>
        </text>
      </m.svg>
      <span className="grid size-14 place-items-center rounded-full bg-yellow-500 text-navy-800 sm:size-16">
        <Bolt className="size-7" />
      </span>
      <span className="sr-only">{text}</span>
    </div>
  );
}

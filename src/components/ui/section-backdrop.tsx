"use client";

import { m, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Gear } from "@/components/icons/brand-icons";
import { CircuitPulses } from "@/components/sections/circuit-pulses";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";

type Variant = "why" | "services" | "panels" | "process" | "contact";

type Config = {
  traces: string[];
  nodes: [number, number][];
  gear?: string;
  dots?: string;
};

// Cada seção tem uma composição própria; as trilhas ficam nas bordas para não competir com o conteúdo.
const configs: Record<Variant, Config> = {
  why: {
    traces: [
      "M-20 80 H220 L270 130 H520",
      "M1460 60 H1240 L1190 110 H1000",
      "M1460 820 H1280 L1230 770 H1060 L1020 810 H900",
      "M-20 840 H120 L170 790 H330",
      "M60 -20 V200 L100 240 V420",
    ],
    nodes: [
      [270, 130],
      [1190, 110],
      [1230, 770],
      [170, 790],
      [100, 240],
    ],
    gear: "-right-28 bottom-[-6rem] size-[380px]",
    dots: "[mask-image:radial-gradient(ellipse_at_right,black_10%,transparent_65%)]",
  },
  services: {
    traces: [
      "M-20 120 H180 L230 170 V420",
      "M1460 260 H1320 L1270 310 V640",
      "M-20 760 H260 L310 710 H480",
      "M1460 860 H1200 L1150 810 H980",
    ],
    nodes: [
      [230, 170],
      [1270, 310],
      [310, 710],
      [1150, 810],
    ],
    gear: "-left-32 bottom-[-5rem] size-[340px]",
  },
  panels: {
    traces: [
      "M-20 200 H160 L210 250 V560 L250 600 H320",
      "M1460 180 H1300 L1250 230 V520 L1210 560 H1120",
      "M500 920 V840 L540 800 H900 L940 840 V920",
    ],
    nodes: [
      [210, 250],
      [250, 600],
      [1250, 230],
      [1210, 560],
      [540, 800],
      [940, 840],
    ],
  },
  process: {
    traces: [
      "M-20 60 H380 L420 100 H700",
      "M1460 40 H1100 L1060 80 H820",
      "M-20 860 H300 L340 820 H620",
      "M1460 870 H1180 L1140 830 H900",
    ],
    nodes: [
      [420, 100],
      [1060, 80],
      [340, 820],
      [1140, 830],
    ],
    dots: "[mask-image:radial-gradient(ellipse_at_center,black_20%,transparent_70%)]",
  },
  contact: {
    traces: ["M-20 40 H500 L540 80 H760", "M1460 60 H1000", "M-20 880 H400 L440 840 H620", "M1460 860 H1100 L1060 820 H880"],
    nodes: [
      [540, 80],
      [1000, 60],
      [440, 840],
      [1060, 820],
    ],
    gear: "-top-28 -left-28 size-[320px]",
  },
};

// No celular as trilhas laterais se espremem por cima do texto; ficam só as que correm
// nas faixas de cima e de baixo da seção (o respiro do section-y).
const EDGE_TOP = 140;
const EDGE_BOTTOM = 790;
function yValues(d: string) {
  const ys: number[] = [];
  for (const [, cmd, args] of d.matchAll(/([MLV])\s*([-\d.\s]+)/g)) {
    const n = args.trim().split(/\s+/).map(Number);
    if (cmd === "V") ys.push(n[0]);
    else ys.push(n[1]);
  }
  return ys;
}
const onEdge = (ys: number[]) => ys.every((y) => y <= EDGE_TOP) || ys.every((y) => y >= EDGE_BOTTOM);

// Fundo decorativo das seções claras: trilhas com pulsos, engrenagem e malha de pontos.
// A seção precisa de `relative isolate` para o -z-10 ficar acima da cor de fundo.
export function SectionBackdrop({ variant, className }: { variant: Variant; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { margin: "100px" });
  const reduce = useReducedMotion();
  const loop = inView && !reduce;
  const c = configs[variant];
  const desktop = useMediaQuery("(min-width: 768px)");
  const traces = desktop ? c.traces : c.traces.filter((d) => onEdge(yValues(d)));
  const nodes = desktop ? c.nodes : c.nodes.filter(([, y]) => onEdge([y]));

  return (
    <div ref={ref} aria-hidden className={cn("pointer-events-none absolute inset-0 -z-10 overflow-hidden", className)}>
      {c.dots && (
        <div
          className={cn(
            "absolute inset-0 bg-[radial-gradient(rgb(2_57_96/0.12)_1px,transparent_1.6px)] bg-[length:22px_22px]",
            c.dots,
          )}
        />
      )}
      {c.gear && (
        <m.div
          className={cn("absolute text-navy-800/[0.035]", c.gear)}
          animate={loop ? { rotate: 360 } : undefined}
          transition={{ duration: 70, ease: "linear", repeat: Infinity }}
        >
          <Gear className="size-full" />
        </m.div>
      )}
      <CircuitPulses
        active={loop}
        tone="light"
        fit="stretch"
        traces={traces}
        nodes={nodes}
        className="absolute inset-0 size-full opacity-50"
      />
    </div>
  );
}

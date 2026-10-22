"use client";

import { m } from "motion/react";

// Trilhas do hero: ficam nas bordas e à direita, longe do bloco de texto
const heroTraces = [
  "M-20 70 H160 L200 30 H420",
  "M1460 90 H1180 L1120 150 H980 L940 110 H820",
  "M1460 520 H1300 L1240 460 H1080 L1040 500 H900",
  "M1100 920 V820 L1160 760 H1320 L1360 720",
  "M-20 880 H160 L220 820 H380",
  "M760 -20 V60 L800 100 H880",
];
const heroNodes: [number, number][] = [
  [200, 30],
  [1120, 150],
  [1240, 460],
  [1160, 760],
  [220, 820],
  [800, 100],
];

const tones = {
  dark: {
    base: "#ffffff",
    baseOpacity: 0.07,
    pulse: "#fcd77a",
    glow: "rgb(248 178 20 / 0.9)",
    node: "#f8b214",
    nodeOpacity: 0.35,
  },
  light: {
    base: "#023960",
    baseOpacity: 0.16,
    pulse: "#f8b214",
    glow: "rgb(248 178 20 / 0.8)",
    node: "#023960",
    nodeOpacity: 0.3,
  },
};

type Props = {
  active: boolean;
  className?: string;
  tone?: keyof typeof tones;
  traces?: string[];
  nodes?: [number, number][];
  // "stretch": as trilhas acompanham a altura da seção (útil em seções altas); o traço não deforma
  fit?: "cover" | "stretch";
};

// Trilhas de circuito com "pulsos" de energia correndo por elas.
export function CircuitPulses({
  active,
  className,
  tone = "dark",
  traces = heroTraces,
  nodes = heroNodes,
  fit = "cover",
}: Props) {
  const t = tones[tone];
  const stretch = fit === "stretch";
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio={stretch ? "none" : "xMidYMid slice"}
      className={className}
      fill="none"
      aria-hidden
    >
      {traces.map((d, i) => (
        <g key={i}>
          <path
            d={d}
            stroke={t.base}
            strokeOpacity={t.baseOpacity}
            strokeWidth={tone === "light" ? 2 : 1.5}
            vectorEffect="non-scaling-stroke"
          />
          {active && (
            <m.path
              d={d}
              pathLength={1}
              stroke={t.pulse}
              style={{ filter: `drop-shadow(0 0 5px ${t.glow})` }}
              strokeWidth={tone === "light" ? 3 : 2.5}
              strokeLinecap="round"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="0.12 1"
              initial={{ strokeDashoffset: 1.12 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3.2 + (i % 3), delay: i * 0.7, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            />
          )}
        </g>
      ))}
      {/* Nós como traços de comprimento zero com ponta redonda: continuam redondos mesmo esticados */}
      {nodes.map(([x, y]) => (
        <path
          key={`${x}-${y}`}
          d={`M${x} ${y}h0`}
          stroke={t.node}
          strokeOpacity={t.nodeOpacity}
          strokeWidth={7}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
      ))}
    </svg>
  );
}

"use client";

import { m } from "motion/react";

// Trilhas de circuito com "pulsos" de energia correndo por elas (fundo do hero).
// Ficam nas bordas e à direita, longe do bloco de texto
const traces = [
  "M-20 70 H160 L200 30 H420",
  "M1460 90 H1180 L1120 150 H980 L940 110 H820",
  "M1460 520 H1300 L1240 460 H1080 L1040 500 H900",
  "M1100 920 V820 L1160 760 H1320 L1360 720",
  "M-20 880 H160 L220 820 H380",
  "M760 -20 V60 L800 100 H880",
];

export function CircuitPulses({ active, className }: { active: boolean; className?: string }) {
  return (
    <svg viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" className={className} fill="none" aria-hidden>
      {traces.map((d, i) => (
        <g key={i}>
          <path d={d} stroke="white" strokeOpacity={0.07} strokeWidth={1.5} />
          {active && (
            <m.path
              d={d}
              pathLength={1}
              stroke="#fcd77a"
              style={{ filter: "drop-shadow(0 0 5px rgb(248 178 20 / 0.9))" }}
              strokeWidth={2.5}
              strokeLinecap="round"
              strokeDasharray="0.12 1"
              initial={{ strokeDashoffset: 1.12 }}
              animate={{ strokeDashoffset: 0 }}
              transition={{ duration: 3.2 + (i % 3), delay: i * 0.7, repeat: Infinity, repeatDelay: 1.5, ease: "easeInOut" }}
            />
          )}
        </g>
      ))}
      {[
        [200, 30],
        [1120, 150],
        [1240, 460],
        [1160, 760],
        [220, 820],
        [800, 100],
      ].map(([cx, cy]) => (
        <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={3.5} fill="#f8b214" fillOpacity={0.35} />
      ))}
    </svg>
  );
}

import type { Transition, Variants } from "motion/react";

export const ease = {
  out: [0.22, 1, 0.36, 1],
  inOut: [0.65, 0, 0.35, 1],
  expo: [0.16, 1, 0.3, 1],
} as const;

export const duration = { fast: 0.2, base: 0.45, slow: 0.7, xslow: 1.1 } as const;

export const spring = {
  soft: { type: "spring", stiffness: 260, damping: 30 },
  snappy: { type: "spring", stiffness: 420, damping: 32 },
  bouncy: { type: "spring", stiffness: 500, damping: 22 },
} satisfies Record<string, Transition>;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};

export const stagger = (step = 0.08, delay = 0): Variants => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});

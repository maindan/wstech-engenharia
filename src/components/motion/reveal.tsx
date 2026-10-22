"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode, Ref } from "react";
import { fadeUp, stagger } from "@/lib/motion";

type Props = { children: ReactNode; className?: string; delay?: number; variants?: Variants; as?: "div" | "li" | "article" };

// Revela o conteúdo uma única vez quando entra na tela.
export function Reveal({ children, className, delay = 0, variants = fadeUp, as = "div" }: Props) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.25 }}
      transition={{ delay }}
    >
      {children}
    </Tag>
  );
}

export function Stagger({
  children,
  className,
  step = 0.08,
  delay = 0,
  as = "div",
  amount = 0.15,
  ref,
}: {
  children: ReactNode;
  className?: string;
  step?: number;
  delay?: number;
  as?: "div" | "ul" | "ol";
  amount?: number;
  ref?: Ref<HTMLDivElement & HTMLUListElement & HTMLOListElement>;
}) {
  const Tag = m[as];
  return (
    <Tag
      ref={ref}
      className={className}
      variants={stagger(step, delay)}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount }}
    >
      {children}
    </Tag>
  );
}

// Filho de <Stagger>: herda o gatilho do pai.
export function StaggerItem({ children, className, variants = fadeUp, as = "div" }: Omit<Props, "delay">) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={variants}>
      {children}
    </Tag>
  );
}

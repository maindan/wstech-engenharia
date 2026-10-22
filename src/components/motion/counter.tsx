"use client";

import { animate, useInView, useReducedMotion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// O HTML estático já traz o número final; depois de hidratar, conta de 0 até ele ao aparecer.
export function Counter({
  to,
  prefix = "",
  suffix = "",
  duration = 1.4,
}: {
  to: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const reduce = useReducedMotion();
  const [value, setValue] = useState<number | null>(null);

  useEffect(() => {
    if (!reduce) setValue(0);
  }, [reduce]);

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, to, { duration, ease: [0.22, 1, 0.36, 1], onUpdate: (v) => setValue(Math.round(v)) });
    return () => controls.stop();
  }, [inView, reduce, to, duration]);

  return (
    <span ref={ref}>
      {prefix}
      {value ?? to}
      {suffix}
    </span>
  );
}

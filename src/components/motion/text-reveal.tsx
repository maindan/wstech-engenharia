"use client";

import { m } from "motion/react";
import { Fragment, type ReactNode } from "react";
import { ease } from "@/lib/motion";

type Segment = { text: string; className?: string };

// Cada palavra sobe de dentro de uma máscara.
export function TextReveal({
  segments,
  delay = 0,
  step = 0.07,
  animateOnMount = true,
  after,
}: {
  segments: Segment[];
  delay?: number;
  step?: number;
  animateOnMount?: boolean;
  after?: ReactNode;
}) {
  let i = 0;
  const trigger = animateOnMount ? { animate: "show" } : { whileInView: "show", viewport: { once: true, amount: 0.5 } };
  return (
    <m.span initial="hidden" {...trigger} transition={{ staggerChildren: step, delayChildren: delay }}>
      {segments.map((seg, s) => (
        <span key={s} className={seg.className}>
          {seg.text.split(" ").map((word, w, arr) => {
            i++;
            return (
              <Fragment key={`${s}-${w}`}>
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                  <m.span
                    className="inline-block will-change-transform"
                    variants={{
                      hidden: { y: "105%" },
                      show: { y: "0%", transition: { duration: 0.8, ease: ease.expo } },
                    }}
                  >
                    {word}
                  </m.span>
                </span>
                {w < arr.length - 1 && " "}
              </Fragment>
            );
          })}
          {s < segments.length - 1 && " "}
        </span>
      ))}
      {after}
    </m.span>
  );
}

"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/cn";

declare global {
  interface Window {
    adsbygoogle?: unknown[];
  }
}

const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

// Bloco de anúncio manual. Reserva espaço (sem CLS), carrega só perto da tela
// e colapsa se o AdSense não preencher. Sem client/slot configurado, não renderiza nada.
export function AdSlot({ slot, className }: { slot?: string; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const pushed = useRef(false);
  const [unfilled, setUnfilled] = useState(false);

  useEffect(() => {
    if (!client || !slot || !ref.current) return;
    const el = ref.current;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || pushed.current) return;
        pushed.current = true;
        try {
          (window.adsbygoogle = window.adsbygoogle || []).push({});
        } catch {}
        io.disconnect();
      },
      { rootMargin: "200px" },
    );
    io.observe(el);

    const ins = el.querySelector("ins");
    const mo = new MutationObserver(() => {
      if (ins?.getAttribute("data-ad-status") === "unfilled") setUnfilled(true);
    });
    if (ins) mo.observe(ins, { attributes: true, attributeFilter: ["data-ad-status"] });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [slot]);

  if (!client || !slot || unfilled) return null;

  return (
    <aside aria-label="Publicidade" className={cn("container-site py-12", className)}>
      <p className="mb-2 text-center text-xs text-graphite">Publicidade</p>
      <div ref={ref} className="min-h-[280px] overflow-hidden rounded-[16px] bg-navy-50 md:min-h-[250px]">
        <ins
          className="adsbygoogle block"
          data-ad-client={client}
          data-ad-slot={slot}
          data-ad-format="auto"
          data-full-width-responsive="true"
        />
      </div>
    </aside>
  );
}

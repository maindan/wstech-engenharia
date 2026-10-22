"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, m } from "motion/react";
import { MapPin } from "lucide-react";
import { useEffect, useRef } from "react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { Button } from "@/components/ui/button";
import { Bolt } from "@/components/ui/section-heading";
import { useWhatsApp } from "@/components/whatsapp/whatsapp-context";
import { nav, site } from "@/content/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";
import { asset } from "@/lib/base-path";

type Props = { open: boolean; onOpenChange: (open: boolean) => void; active?: string; home: boolean; onDark?: boolean };

export function MobileMenu({ open, onOpenChange, active, home, onDark = false }: Props) {
  const triggerRef = useRef<HTMLButtonElement>(null);
  const desktop = useMediaQuery("(min-width: 1024px)");
  const { openChat } = useWhatsApp();

  // Fecha automaticamente se a tela passar para desktop
  useEffect(() => {
    if (desktop && open) onOpenChange(false);
  }, [desktop, open, onOpenChange]);

  // Origem do círculo de revelação = posição do botão
  const origin = () => {
    const r = triggerRef.current?.getBoundingClientRect();
    return r ? `${r.left + r.width / 2}px ${r.top + r.height / 2}px` : "100% 0%";
  };

  const navigate = (id: string) => (e: React.MouseEvent) => {
    if (!home) return;
    e.preventDefault();
    onOpenChange(false);
    setTimeout(() => scrollToSection(id), 420);
  };

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Trigger asChild>
        <button
          ref={triggerRef}
          type="button"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          className="relative z-[61] grid size-11 place-items-center rounded-full lg:hidden"
        >
          <Burger open={open} light={onDark} />
        </button>
      </Dialog.Trigger>

      <AnimatePresence>
        {open && (
          <Dialog.Portal forceMount>
            <Dialog.Content asChild forceMount aria-describedby={undefined}>
              <m.div
                className="fixed inset-0 z-[80] flex flex-col overflow-y-auto bg-navy-950 text-white"
                initial={{ clipPath: `circle(0% at ${origin()})` }}
                animate={{ clipPath: `circle(150% at ${origin()})` }}
                exit={{ clipPath: `circle(0% at ${origin()})`, transition: { duration: 0.4, ease: ease.inOut, delay: 0.1 } }}
                transition={{ duration: 0.6, ease: ease.inOut }}
              >
                <Dialog.Title className="sr-only">Menu</Dialog.Title>
                <div className="bg-circuit pointer-events-none absolute inset-0 opacity-[0.06]" aria-hidden />

                <div className="container-site relative flex h-16 items-center justify-between">
                  <img
                    src={asset("/images/brand/logo-horizontal-negativa.svg")}
                    alt="WS Tech Engenharia"
                    className="h-9 w-auto"
                  />
                  <Dialog.Close asChild>
                    <button type="button" aria-label="Fechar menu" className="grid size-11 place-items-center rounded-full">
                      <Burger open light />
                    </button>
                  </Dialog.Close>
                </div>

                <nav aria-label="Menu" className="container-site relative mt-8 flex-1">
                  <ul className="space-y-1">
                    {nav.map((item, i) => {
                      const isActive = active === item.id;
                      return (
                        <li key={item.id} className="overflow-hidden">
                          <m.a
                            href={home ? `#${item.id}` : `${asset("/")}#${item.id}`}
                            onClick={navigate(item.id)}
                            aria-current={isActive ? "true" : undefined}
                            className={cn(
                              "flex items-baseline gap-4 py-2 font-display text-[2.5rem] leading-tight font-extrabold tracking-[-0.03em]",
                              isActive ? "text-yellow-500" : "text-white",
                            )}
                            initial={{ y: "100%" }}
                            animate={{ y: "0%", transition: { delay: 0.2 + i * 0.06, duration: 0.6, ease: ease.expo } }}
                            exit={{ y: "100%", transition: { duration: 0.25, ease: ease.inOut } }}
                          >
                            <span className="font-display text-sm font-semibold tracking-normal text-yellow-500">0{i + 1}</span>
                            {item.label}
                            {isActive && <Bolt className="size-6 self-center" />}
                          </m.a>
                        </li>
                      );
                    })}
                  </ul>
                </nav>

                <m.div
                  className="container-site relative space-y-4 pt-8 pb-[calc(32px+env(safe-area-inset-bottom))]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.45, ease: ease.out } }}
                  exit={{ opacity: 0, transition: { duration: 0.15 } }}
                >
                  <div className="h-px bg-white/10" />
                  <Button
                    full
                    withArrow
                    onClick={() => {
                      onOpenChange(false);
                      setTimeout(() => openChat("menu"), 420);
                    }}
                  >
                    Solicitar orçamento
                  </Button>
                  <a href={`tel:${site.phoneE164}`} className="flex items-center gap-3 py-1 text-navy-200">
                    <WhatsAppIcon className="size-5 text-whatsapp" />
                    {site.phoneDisplay}
                  </a>
                  <p className="flex items-center gap-3 text-navy-200">
                    <MapPin className="size-5 text-yellow-500" aria-hidden />
                    {site.serviceArea}
                  </p>
                </m.div>

                {/* Raio grande desenhado no canto */}
                <svg
                  viewBox="0 0 120 200"
                  className="pointer-events-none absolute -right-6 bottom-24 h-64 text-yellow-500/15"
                  fill="none"
                  aria-hidden
                >
                  <m.path
                    d="M80 4 14 112h44L36 196l70-120H62z"
                    stroke="currentColor"
                    strokeWidth={4}
                    strokeLinejoin="round"
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1, transition: { duration: 0.8, delay: 0.3 } }}
                  />
                </svg>
              </m.div>
            </Dialog.Content>
          </Dialog.Portal>
        )}
      </AnimatePresence>
    </Dialog.Root>
  );
}

function Burger({ open, light }: { open: boolean; light?: boolean }) {
  const bar = cn("absolute left-0 h-[2.5px] w-6 rounded-full transition-all duration-300", light ? "bg-white" : "bg-navy-800");
  return (
    <span className="relative block h-4 w-6" aria-hidden>
      <span className={cn(bar, open ? "top-[7px] rotate-45" : "top-0")} />
      <span className={cn(bar, "top-[7px]", open && "scale-x-0 opacity-0")} />
      <span className={cn(bar, open ? "top-[7px] -rotate-45" : "top-[14px]")} />
    </span>
  );
}

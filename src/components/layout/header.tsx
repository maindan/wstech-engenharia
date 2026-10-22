"use client";

import { m, useMotionValueEvent, useScroll } from "motion/react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { useWhatsApp } from "@/components/whatsapp/whatsapp-context";
import { nav } from "@/content/site";
import { useActiveSection } from "@/hooks/use-active-section";
import { cn } from "@/lib/cn";
import { ease, spring } from "@/lib/motion";
import { scrollToSection } from "@/lib/scroll";
import { MobileMenu } from "./mobile-menu";
import { asset } from "@/lib/base-path";

const ids = nav.map((n) => n.id);

export function Header({ home = true }: { home?: boolean }) {
  const { scrollY, scrollYProgress } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const active = useActiveSection(home ? ids : []);
  const { openChat } = useWhatsApp();

  useMotionValueEvent(scrollY, "change", (y) => {
    const prev = scrollY.getPrevious() ?? 0;
    setScrolled(y > 24);
    setHidden(y > 400 && y > prev + 4 && !menuOpen);
    if (y < prev - 4) setHidden(false);
  });

  // Na home, o topo fica sobre o hero escuro: logo e links claros até rolar
  const onDark = home && !scrolled;

  const go = (id: string) => (e: React.MouseEvent) => {
    if (!home) return;
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <m.header
      initial={{ y: "-100%" }}
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.6, ease: ease.out, delay: hidden ? 0 : 0.1 }}
      className="fixed inset-x-0 top-0 z-50"
    >
      <m.div
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left bg-yellow-500"
        style={{ scaleX: scrollYProgress }}
      />
      <div
        className={cn(
          "transition-[background-color,box-shadow,backdrop-filter] duration-300",
          scrolled || !home ? "bg-paper/85 shadow-sm backdrop-blur-md" : "bg-transparent",
        )}
      >
        <div
          className={cn(
            "container-site flex items-center justify-between gap-6 transition-[height] duration-300",
            scrolled ? "h-16" : "h-16 lg:h-20",
          )}
        >
          <a
            href={home ? "#inicio" : asset("/")}
            onClick={go("inicio")}
            className="relative shrink-0"
            aria-label="WS Tech Engenharia — início"
          >
            <img
              src={asset("/images/brand/logo-horizontal.svg")}
              alt="WS Tech Engenharia"
              width={176}
              height={44}
              className={cn("h-9 w-auto transition-opacity duration-300 lg:h-11", onDark && "opacity-0")}
            />
            <img
              src={asset("/images/brand/logo-horizontal-negativa.svg")}
              alt=""
              width={176}
              height={44}
              className={cn("absolute inset-0 h-9 w-auto transition-opacity duration-300 lg:h-11", !onDark && "opacity-0")}
            />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-1">
              {nav.map((item) => {
                const isActive = home && active === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={home ? `#${item.id}` : `${asset("/")}#${item.id}`}
                      onClick={go(item.id)}
                      aria-current={isActive ? "true" : undefined}
                      className={cn(
                        "group relative block px-4 py-2 font-display text-[0.9375rem] font-semibold transition-colors",
                        onDark
                          ? isActive
                            ? "text-white"
                            : "text-white/70 hover:text-white"
                          : isActive
                            ? "text-navy-800"
                            : "text-navy-800/70 hover:text-navy-800",
                      )}
                    >
                      {item.label}
                      {isActive ? (
                        <m.span
                          layoutId="nav-indicator"
                          transition={spring.snappy}
                          className="absolute inset-x-4 -bottom-0.5 h-1 rounded-full bg-yellow-500"
                        />
                      ) : (
                        <span
                          className={cn(
                            "absolute inset-x-4 -bottom-0.5 h-1 origin-center scale-x-0 rounded-full transition-transform duration-300 group-hover:scale-x-100",
                            onDark ? "bg-white/25" : "bg-navy-800/15",
                          )}
                        />
                      )}
                    </a>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2">
            <Button size="md" withArrow className="hidden lg:inline-flex" onClick={() => openChat("header")}>
              Solicitar orçamento
            </Button>
            <MobileMenu
              open={menuOpen}
              onOpenChange={setMenuOpen}
              active={home ? active : undefined}
              home={home}
              onDark={onDark}
            />
          </div>
        </div>
      </div>
    </m.header>
  );
}

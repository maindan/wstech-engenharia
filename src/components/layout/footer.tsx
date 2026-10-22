"use client";

import { m, useReducedMotion } from "motion/react";
import { ArrowUp, MapPin, Phone, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Bolt } from "@/components/ui/section-heading";
import { Reveal } from "@/components/motion/reveal";
import { Gear, InstagramIcon, WhatsAppIcon } from "@/components/icons/brand-icons";
import { Stagger, StaggerItem } from "@/components/motion/reveal";
import { useWhatsApp } from "@/components/whatsapp/whatsapp-context";
import { nav, site } from "@/content/site";
import { trackingEnabled } from "@/lib/config";
import { scrollToSection } from "@/lib/scroll";
import { asset } from "@/lib/base-path";

const serviceLinks = [
  "Quadros elétricos",
  "Padrão bifásico",
  "Padrão trifásico",
  "Diagnóstico e reparos",
  "Atendimento emergencial",
];

export function Footer({ home = true }: { home?: boolean }) {
  const reduce = useReducedMotion();
  const { openChat } = useWhatsApp();
  const year = new Date().getFullYear();

  const go = (id: string) => (e: React.MouseEvent) => {
    if (!home) return;
    e.preventDefault();
    scrollToSection(id);
  };

  return (
    <footer className="relative overflow-hidden bg-navy-950 text-navy-200">
      <m.div
        aria-hidden
        className="pointer-events-none absolute -right-40 -bottom-40 size-[560px] text-white/[0.04]"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
      >
        <Gear className="size-full" />
      </m.div>

      <div className="container-site relative pt-16 pb-6 lg:pt-24">
        {/* Chamada final */}
        <Reveal className="mb-16 flex flex-col gap-8 border-b border-white/10 pb-16 lg:mb-20 lg:flex-row lg:items-end lg:justify-between lg:pb-20">
          <h2 className="max-w-3xl font-display text-[clamp(2.1rem,4.5vw+0.5rem,4.25rem)] leading-[1.02] font-extrabold tracking-[-0.03em] text-white">
            Energia segura começa com <span className="text-yellow-500">uma mensagem.</span>
          </h2>
          <Button withArrow className="shrink-0 self-start lg:self-auto" onClick={() => openChat("footer-cta")}>
            Solicitar orçamento
          </Button>
        </Reveal>

        <Stagger className="grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-12 lg:gap-8" step={0.08}>
          <StaggerItem className="col-span-2 lg:col-span-4">
            <img
              src={asset("/images/brand/logo-horizontal-negativa.svg")}
              alt="WS Tech Engenharia"
              width={220}
              height={55}
              className="h-12 w-auto"
              loading="lazy"
            />
            <p className="mt-5 max-w-sm leading-relaxed">
              A WS Tech Engenharia executa instalações e manutenções elétricas residenciais e comerciais com segurança,
              organização e atendimento rápido.
            </p>
            <div className="mt-6 flex gap-3">
              <button
                type="button"
                onClick={() => openChat("footer")}
                aria-label="Conversar no WhatsApp"
                className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-whatsapp hover:text-ink"
              >
                <WhatsAppIcon className="size-5" />
              </button>
              {site.instagram && (
                <a
                  href={site.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram da WS Tech"
                  className="grid size-11 place-items-center rounded-full bg-white/10 text-white transition hover:bg-yellow-500 hover:text-navy-900"
                >
                  <InstagramIcon className="size-5" />
                </a>
              )}
            </div>
          </StaggerItem>

          <StaggerItem className="col-span-1 lg:col-span-2">
            <h2 className="eyebrow text-white">Navegação</h2>
            <ul className="mt-5 space-y-1">
              {nav.map((item) => (
                <li key={item.id}>
                  <a
                    href={home ? `#${item.id}` : `${asset("/")}#${item.id}`}
                    onClick={go(item.id)}
                    className="inline-block py-1.5 transition-colors hover:text-yellow-500"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="col-span-1 lg:col-span-3">
            <h2 className="eyebrow text-white">Serviços</h2>
            <ul className="mt-5 space-y-1">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a
                    href={home ? "#servicos" : `${asset("/")}#servicos`}
                    onClick={go("servicos")}
                    className="inline-block py-1.5 transition-colors hover:text-yellow-500"
                  >
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </StaggerItem>

          <StaggerItem className="col-span-2 lg:col-span-3">
            <h2 className="eyebrow text-white">Contato</h2>
            <ul className="mt-5 space-y-3">
              <li>
                <a href={`tel:${site.phoneE164}`} className="flex items-center gap-3 transition-colors hover:text-yellow-500">
                  <Phone className="size-4 text-yellow-500" aria-hidden /> {site.phoneDisplay}
                </a>
              </li>
              {site.email && (
                <li>
                  <a href={`mailto:${site.email}`} className="flex items-center gap-3 transition-colors hover:text-yellow-500">
                    <Mail className="size-4 text-yellow-500" aria-hidden /> {site.email}
                  </a>
                </li>
              )}
              <li className="flex items-center gap-3">
                <MapPin className="size-4 text-yellow-500" aria-hidden /> {site.serviceArea}
              </li>
            </ul>
          </StaggerItem>
        </Stagger>

        {/* Marca gigante em contorno */}
        <p
          aria-hidden
          className="text-outline-thin pointer-events-none mt-16 flex items-center justify-center gap-[2vw] font-display text-[clamp(4rem,19vw,17rem)] leading-[0.8] font-extrabold tracking-[-0.05em] whitespace-nowrap text-white/[0.12] select-none"
        >
          WS <Bolt className="h-[0.8em] w-auto text-yellow-500/30" /> TECH
        </p>

        <div className="mt-10 flex flex-col gap-6 border-t border-white/10 pt-8 pb-24 text-sm md:flex-row md:items-center md:justify-between md:pb-6">
          <p>
            © {year} {site.name}. Todos os direitos reservados.
            {site.cnpj && <> · CNPJ {site.cnpj}</>}
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <a href={asset("/politica-de-privacidade/")} className="py-1 hover:text-yellow-500">
              Política de Privacidade
            </a>
            <a href={asset("/termos-de-uso/")} className="py-1 hover:text-yellow-500">
              Termos de Uso
            </a>
            {trackingEnabled && (
              <button
                type="button"
                onClick={() => window.dispatchEvent(new Event("open-consent"))}
                className="py-1 hover:text-yellow-500"
              >
                Preferências de cookies
              </button>
            )}
            <a
              href={home ? "#inicio" : asset("/")}
              onClick={go("inicio")}
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 py-2 pr-4 pl-3 text-white transition hover:border-yellow-500"
            >
              <ArrowUp className="size-4 transition-transform group-hover:-translate-y-0.5" aria-hidden /> Voltar ao topo
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

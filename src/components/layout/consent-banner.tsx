"use client";

import { AnimatePresence, m } from "motion/react";
import { Cookie } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { spring } from "@/lib/motion";
import { asset } from "@/lib/base-path";

export const CONSENT_KEY = "wstech-consent";
type Consent = { analytics: boolean; ads: boolean };

function applyConsent(c: Consent) {
  window.gtag?.("consent", "update", {
    analytics_storage: c.analytics ? "granted" : "denied",
    ad_storage: c.ads ? "granted" : "denied",
    ad_user_data: c.ads ? "granted" : "denied",
    ad_personalization: c.ads ? "granted" : "denied",
  });
}

// Banner LGPD integrado ao Google Consent Mode v2 (padrão "negado" definido no <head>).
export function ConsentBanner() {
  const [open, setOpen] = useState(false);
  const [custom, setCustom] = useState(false);
  const [prefs, setPrefs] = useState<Consent>({ analytics: true, ads: true });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      if (!localStorage.getItem(CONSENT_KEY)) setOpen(true);
    } catch {
      setOpen(true);
    }
    const reopen = () => {
      setCustom(true);
      setOpen(true);
    };
    window.addEventListener("open-consent", reopen);
    return () => window.removeEventListener("open-consent", reopen);
  }, []);

  // Empurra o botão do WhatsApp para cima enquanto o banner estiver visível
  useEffect(() => {
    const root = document.documentElement;
    if (!open || !ref.current) {
      root.style.removeProperty("--consent-offset");
      return;
    }
    const update = () => {
      const mobile = window.innerWidth < 768;
      root.style.setProperty("--consent-offset", mobile && ref.current ? `${ref.current.offsetHeight + 12}px` : "0px");
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(ref.current);
    return () => {
      ro.disconnect();
      root.style.removeProperty("--consent-offset");
    };
  }, [open, custom]);

  function save(c: Consent) {
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(c));
    } catch {}
    applyConsent(c);
    setOpen(false);
  }

  return (
    <AnimatePresence>
      {open && (
        <m.div
          ref={ref}
          role="dialog"
          aria-label="Preferências de cookies"
          className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom))] z-[55] rounded-[24px] border border-line bg-white p-5 shadow-lg md:right-auto md:left-6 md:max-w-[420px]"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 40 }}
          transition={spring.soft}
        >
          <div className="flex gap-3">
            <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-yellow-100 text-yellow-700">
              <Cookie className="size-5" aria-hidden />
            </span>
            <p className="text-sm leading-relaxed text-graphite">
              Usamos cookies para medir o uso do site e exibir anúncios. Você escolhe o que permitir. Saiba mais na{" "}
              <a href={asset("/politica-de-privacidade/")} className="font-semibold text-navy-800 underline underline-offset-2">
                Política de Privacidade
              </a>
              .
            </p>
          </div>

          {custom && (
            <fieldset className="mt-4 space-y-2 rounded-2xl bg-paper p-3 text-sm">
              <legend className="sr-only">Categorias de cookies</legend>
              <label className="flex items-center justify-between gap-3 py-1 text-graphite">
                Necessários <span className="text-xs font-semibold text-navy-800">Sempre ativos</span>
              </label>
              {(
                [
                  ["analytics", "Estatísticas"],
                  ["ads", "Publicidade personalizada"],
                ] as const
              ).map(([key, label]) => (
                <label key={key} className="flex cursor-pointer items-center justify-between gap-3 py-1 text-graphite">
                  {label}
                  <input
                    type="checkbox"
                    checked={prefs[key]}
                    onChange={(e) => setPrefs((p) => ({ ...p, [key]: e.target.checked }))}
                    className="size-5 cursor-pointer accent-navy-800"
                  />
                </label>
              ))}
            </fieldset>
          )}

          <div className="mt-4 grid grid-cols-2 gap-2">
            <Button size="md" variant="outline" onClick={() => save({ analytics: false, ads: false })}>
              Recusar
            </Button>
            <Button size="md" variant="secondary" onClick={() => save({ analytics: true, ads: true })}>
              Aceitar todos
            </Button>
            {custom ? (
              <Button size="md" variant="ghost" className="col-span-2" onClick={() => save(prefs)}>
                Salvar minhas escolhas
              </Button>
            ) : (
              <Button size="md" variant="ghost" className="col-span-2" onClick={() => setCustom(true)}>
                Personalizar
              </Button>
            )}
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}

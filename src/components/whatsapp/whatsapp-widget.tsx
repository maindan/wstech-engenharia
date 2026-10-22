"use client";

import { AnimatePresence, m, useDragControls, useReducedMotion, type PanInfo } from "motion/react";
import { Lock, SendHorizontal, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { WhatsAppIcon } from "@/components/icons/brand-icons";
import { chatFollowUp, chatGreeting, chatOptions } from "@/content/faq-chat";
import { site } from "@/content/site";
import { useMediaQuery } from "@/hooks/use-media-query";
import { track } from "@/lib/analytics";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";
import { whatsappLink } from "@/lib/whatsapp";
import { useWhatsApp } from "./whatsapp-context";
import { asset } from "@/lib/base-path";

type Message = { id: number; from: "bot" | "user"; text: string; time: string };

const STORAGE_KEY = "wstech-chat";
const now = () => new Date().toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export function WhatsAppWidget() {
  const { open, setOpen, openChat } = useWhatsApp();
  const desktop = useMediaQuery("(min-width: 768px)");
  const reduce = useReducedMotion();
  const dragControls = useDragControls();

  const [messages, setMessages] = useState<Message[]>([]);
  const [typing, setTyping] = useState(false);
  const [prefill, setPrefill] = useState<string | null>(null);
  const [optionId, setOptionId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [visible, setVisible] = useState(false);
  const [pulses, setPulses] = useState(0);
  const [teaser, setTeaser] = useState(false);

  const idRef = useRef(0);
  const busy = useRef(false);
  const logRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);

  // Restaura a conversa da sessão
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      if (saved) {
        const data = JSON.parse(saved) as { messages: Message[]; prefill: string | null; optionId: string | null };
        setMessages(data.messages);
        setPrefill(data.prefill);
        setOptionId(data.optionId);
        idRef.current = data.messages.length;
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify({ messages, prefill, optionId }));
    } catch {}
  }, [messages, prefill, optionId]);

  // Botão entra 1,5s após o carregamento; balão de boas-vindas aos 6s (uma vez por sessão)
  useEffect(() => {
    const t1 = setTimeout(() => setVisible(true), 1500);
    let t2: ReturnType<typeof setTimeout> | undefined;
    let t3: ReturnType<typeof setTimeout> | undefined;
    try {
      if (!sessionStorage.getItem("wstech-teaser")) {
        t2 = setTimeout(() => {
          setTeaser(true);
          sessionStorage.setItem("wstech-teaser", "1");
          t3 = setTimeout(() => setTeaser(false), 8000);
        }, 6000);
      }
    } catch {}
    return () => [t1, t2, t3].forEach((t) => t && clearTimeout(t));
  }, []);

  const push = useCallback((from: Message["from"], text: string) => {
    setMessages((list) => [...list, { id: ++idRef.current, from, text, time: now() }]);
  }, []);

  const botSay = useCallback(
    async (texts: string[]) => {
      for (const text of texts) {
        setTyping(true);
        await wait(reduce ? 150 : 700 + Math.min(text.length * 6, 600));
        setTyping(false);
        push("bot", text);
        await wait(120);
      }
    },
    [push, reduce],
  );

  // Saudação na primeira abertura
  useEffect(() => {
    if (!open || messages.length > 0 || busy.current) return;
    busy.current = true;
    botSay(chatGreeting).finally(() => (busy.current = false));
  }, [open, messages.length, botSay]);

  useEffect(() => {
    if (open) setTeaser(false);
  }, [open]);

  // Rolagem automática para a última mensagem
  useEffect(() => {
    logRef.current?.scrollTo({ top: logRef.current.scrollHeight, behavior: reduce ? "auto" : "smooth" });
  }, [messages, typing, prefill, reduce]);

  // Esc fecha, foco entra no painel e volta ao botão ao fechar; trava a rolagem no mobile
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    const t = setTimeout(() => panelRef.current?.focus(), 50);
    const trigger = triggerRef.current;
    if (!desktop) document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      clearTimeout(t);
      document.body.style.overflow = "";
      trigger?.focus({ preventScroll: true });
    };
  }, [open, desktop, setOpen]);

  async function choose(option: (typeof chatOptions)[number]) {
    if (busy.current) return;
    busy.current = true;
    push("user", option.label.replace(/^\S+\s/, ""));
    setPrefill(null);
    setOptionId(option.id);
    track("whatsapp_option", { option: option.id });
    await botSay([option.answer, chatFollowUp]);
    setPrefill(option.prefill);
    busy.current = false;
  }

  async function sendDraft(e: FormEvent) {
    e.preventDefault();
    const text = draft.trim();
    if (!text || busy.current) return;
    busy.current = true;
    setDraft("");
    push("user", text);
    setPrefill(null);
    setOptionId("texto-livre");
    await botSay(["Perfeito! Toque abaixo para enviar sua mensagem a um técnico no WhatsApp."]);
    setPrefill(text);
    busy.current = false;
  }

  function redirect() {
    track("whatsapp_redirect", { source: "chat", option: optionId ?? "direto" });
  }

  function onDragEnd(_: unknown, info: PanInfo) {
    if (info.offset.y > 120 || info.velocity.y > 600) setOpen(false);
  }

  const panelMotion = desktop
    ? {
        initial: { opacity: 0, scale: 0.6, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.7, y: 20 },
      }
    : { initial: { y: "100%" }, animate: { y: 0 }, exit: { y: "100%" } };

  return (
    <>
      {/* Fundo escurecido (mobile) */}
      <AnimatePresence>
        {open && !desktop && (
          <m.div
            key="backdrop"
            className="fixed inset-0 z-[60] bg-navy-950/60 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {open && (
          <m.div
            key="panel"
            ref={panelRef}
            role="dialog"
            aria-modal={!desktop}
            aria-label={`Conversa com ${site.name}`}
            tabIndex={-1}
            {...panelMotion}
            transition={spring.snappy}
            drag={desktop ? false : "y"}
            dragControls={dragControls}
            dragListener={false}
            dragConstraints={{ top: 0, bottom: 0 }}
            dragElastic={{ top: 0, bottom: 0.6 }}
            onDragEnd={onDragEnd}
            style={{ transformOrigin: "bottom right" }}
            className={cn(
              "fixed z-[70] flex flex-col overflow-hidden bg-[#efeae2] shadow-lg outline-none",
              desktop
                ? "right-6 bottom-[calc(96px+var(--consent-offset,0px))] h-[min(580px,calc(100dvh-140px))] w-[380px] rounded-[24px]"
                : "inset-x-0 bottom-0 h-[85dvh] rounded-t-[24px] pb-[env(safe-area-inset-bottom)]",
            )}
          >
            {/* Cabeçalho */}
            <div
              className="relative touch-none bg-whatsapp-dark px-4 pt-3 pb-3 text-white"
              onPointerDown={(e) => !desktop && dragControls.start(e)}
            >
              {!desktop && <div className="mx-auto mb-2 h-1.5 w-10 rounded-full bg-white/40" aria-hidden />}
              <div className="flex items-center gap-3">
                <span className="grid size-11 shrink-0 place-items-center rounded-full bg-white p-1.5">
                  <img src={asset("/images/brand/simbolo.svg")} alt="" className="size-full object-contain" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-display text-[0.95rem] font-bold">{site.name}</p>
                  <p className="flex items-center gap-1.5 text-xs text-white/85">
                    <span className="size-2 rounded-full bg-[#7dffa8]" aria-hidden />
                    Normalmente responde em poucos minutos
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="grid size-10 place-items-center rounded-full transition-colors hover:bg-white/15"
                  aria-label="Fechar conversa"
                >
                  <X className="size-5" />
                </button>
              </div>
            </div>

            {/* Mensagens */}
            <div
              ref={logRef}
              role="log"
              aria-live="polite"
              className="flex-1 space-y-2 overflow-y-auto overscroll-contain px-3 py-4"
              style={{
                backgroundImage: "radial-gradient(rgb(0 0 0 / 0.035) 1px, transparent 1px)",
                backgroundSize: "14px 14px",
              }}
            >
              <AnimatePresence initial={false}>
                {messages.map((msg) => (
                  <m.div
                    key={msg.id}
                    initial={{ opacity: 0, x: msg.from === "bot" ? -12 : 12, scale: 0.95 }}
                    animate={{ opacity: 1, x: 0, scale: 1 }}
                    transition={spring.soft}
                    className={cn("flex", msg.from === "user" ? "justify-end" : "justify-start")}
                  >
                    <div
                      className={cn(
                        "max-w-[85%] rounded-2xl px-3 pt-2 pb-1.5 text-[0.9375rem] leading-snug text-ink shadow-[0_1px_1px_rgb(0_0_0/0.08)]",
                        msg.from === "user" ? "rounded-tr-sm bg-[#d9fdd3]" : "rounded-tl-sm bg-white",
                      )}
                    >
                      {msg.text}
                      <span className="mt-0.5 block text-right text-[0.6875rem] text-graphite">{msg.time}</span>
                    </div>
                  </m.div>
                ))}
              </AnimatePresence>

              {typing && (
                <div className="flex" aria-label="Digitando">
                  <div className="flex gap-1 rounded-2xl rounded-tl-sm bg-white px-4 py-3 shadow-[0_1px_1px_rgb(0_0_0/0.08)]">
                    {[0, 1, 2].map((i) => (
                      <m.span
                        key={i}
                        className="size-2 rounded-full bg-graphite/60"
                        animate={{ y: [0, -4, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                      />
                    ))}
                  </div>
                </div>
              )}

              {prefill && !typing && (
                <m.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={spring.soft} className="pt-1">
                  <a
                    href={whatsappLink(prefill)}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={redirect}
                    className="relative flex h-12 w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-whatsapp font-display font-bold text-ink transition hover:brightness-95"
                  >
                    <WhatsAppIcon className="size-5" />
                    Continuar no WhatsApp
                    {!reduce && (
                      <m.span
                        aria-hidden
                        className="absolute inset-y-0 w-1/3 -skew-x-12 bg-white/40"
                        initial={{ left: "-40%" }}
                        animate={{ left: "120%" }}
                        transition={{ duration: 1.1, delay: 0.3, ease: "easeInOut" }}
                      />
                    )}
                  </a>
                </m.div>
              )}

              {messages.length >= chatGreeting.length && !typing && optionId && (
                <p className="pt-3 text-xs font-semibold text-graphite">Outras dúvidas:</p>
              )}
              {messages.length >= chatGreeting.length && !typing && (
                <m.div
                  key={optionId ? "compact" : "full"}
                  className={cn("flex gap-2 pt-2", optionId ? "no-scrollbar -mx-3 overflow-x-auto px-3 pb-1" : "flex-wrap")}
                  initial="hidden"
                  animate="show"
                  variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05 } } }}
                >
                  {chatOptions.map((opt) => (
                    <m.button
                      key={opt.id}
                      type="button"
                      variants={{ hidden: { opacity: 0, y: 8 }, show: { opacity: 1, y: 0 } }}
                      onClick={() => choose(opt)}
                      className={cn(
                        "min-h-10 shrink-0 rounded-full border px-3.5 py-2 text-left text-sm font-medium transition-colors",
                        optionId && "whitespace-nowrap",
                        optionId === opt.id
                          ? "border-whatsapp-dark bg-whatsapp-dark text-white"
                          : "border-whatsapp-dark/30 bg-white text-whatsapp-dark hover:bg-[#e7f6ee]",
                      )}
                    >
                      {opt.label}
                    </m.button>
                  ))}
                </m.div>
              )}
            </div>

            {/* Campo livre */}
            <form onSubmit={sendDraft} className="border-t border-black/5 bg-[#f0f2f5] px-3 pt-2.5 pb-2">
              <div className="flex items-center gap-2">
                <label htmlFor="chat-input" className="sr-only">
                  Digite sua mensagem
                </label>
                <input
                  id="chat-input"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  placeholder="Digite sua mensagem…"
                  autoComplete="off"
                  className="h-11 min-w-0 flex-1 rounded-full bg-white px-4 text-base text-ink outline-none placeholder:text-graphite/70 focus:ring-2 focus:ring-whatsapp-dark/40"
                />
                <button
                  type="submit"
                  aria-label="Enviar mensagem"
                  disabled={!draft.trim()}
                  className="grid size-11 shrink-0 place-items-center rounded-full bg-whatsapp-dark text-white transition disabled:opacity-40"
                >
                  <SendHorizontal className="size-5" />
                </button>
              </div>
              <p className="mt-2 flex items-center justify-center gap-1 text-[0.6875rem] text-graphite">
                <Lock className="size-3" aria-hidden /> Você será redirecionado para o WhatsApp.
              </p>
            </form>
          </m.div>
        )}
      </AnimatePresence>

      {/* Botão flutuante */}
      <AnimatePresence>
        {visible && (
          <m.div
            key="fab"
            className="fixed right-4 bottom-[calc(16px+env(safe-area-inset-bottom)+var(--consent-offset,0px))] z-[65] md:right-6 md:bottom-[calc(24px+var(--consent-offset,0px))]"
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0, opacity: open && !desktop ? 0 : 1 }}
            exit={{ scale: 0 }}
            transition={spring.bouncy}
            style={{ pointerEvents: open && !desktop ? "none" : "auto" }}
          >
            <AnimatePresence>
              {teaser && !open && (
                <m.button
                  type="button"
                  onClick={() => openChat("teaser")}
                  initial={{ opacity: 0, x: 12, scale: 0.9 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  exit={{ opacity: 0, x: 12, scale: 0.9 }}
                  transition={spring.soft}
                  className="absolute right-[calc(100%+12px)] bottom-2 w-max max-w-[220px] rounded-2xl rounded-br-sm bg-white px-4 py-2.5 text-left text-sm font-medium text-ink shadow-lg"
                >
                  Precisa de um orçamento? 💬
                </m.button>
              )}
            </AnimatePresence>

            {!reduce && pulses < 3 && !open && (
              <m.span
                aria-hidden
                className="absolute inset-0 rounded-full bg-whatsapp"
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 1.6, opacity: 0 }}
                transition={{ duration: 2, ease: "easeOut" }}
                onAnimationComplete={() => setTimeout(() => setPulses((p) => p + 1), 400)}
                key={pulses}
              />
            )}

            <button
              ref={triggerRef}
              type="button"
              onClick={() => (open ? setOpen(false) : openChat("fab"))}
              aria-label={open ? "Fechar conversa do WhatsApp" : "Conversar no WhatsApp"}
              aria-haspopup="dialog"
              aria-expanded={open}
              className="relative grid size-14 place-items-center rounded-full bg-whatsapp text-ink shadow-lg ring-2 ring-white/70 transition-transform hover:scale-105 md:size-[60px]"
            >
              <AnimatePresence mode="wait" initial={false}>
                <m.span
                  key={open ? "x" : "wa"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {open ? <X className="size-7" /> : <WhatsAppIcon className="size-7" />}
                </m.span>
              </AnimatePresence>
            </button>
          </m.div>
        )}
      </AnimatePresence>
    </>
  );
}

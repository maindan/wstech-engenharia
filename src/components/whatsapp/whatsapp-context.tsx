"use client";

import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import { track } from "@/lib/analytics";

type WhatsAppCtx = {
  open: boolean;
  setOpen: (open: boolean) => void;
  openChat: (source?: string) => void;
};

const Ctx = createContext<WhatsAppCtx | null>(null);

export function WhatsAppProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const openChat = useCallback((source = "button") => {
    setOpen(true);
    track("whatsapp_open_widget", { source });
  }, []);
  return <Ctx.Provider value={{ open, setOpen, openChat }}>{children}</Ctx.Provider>;
}

export function useWhatsApp() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useWhatsApp precisa estar dentro de <WhatsAppProvider>");
  return ctx;
}

"use client";

import type { ReactNode } from "react";
import { Toaster } from "sonner";
import { ConsentBanner } from "@/components/layout/consent-banner";
import { MotionProvider } from "@/components/motion/motion-provider";
import { WhatsAppProvider } from "@/components/whatsapp/whatsapp-context";
import { WhatsAppWidget } from "@/components/whatsapp/whatsapp-widget";
import { trackingEnabled } from "@/lib/config";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionProvider>
      <WhatsAppProvider>
        {children}
        <WhatsAppWidget />
        {trackingEnabled && <ConsentBanner />}
        <Toaster position="top-center" richColors closeButton />
      </WhatsAppProvider>
    </MotionProvider>
  );
}

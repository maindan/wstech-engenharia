type Params = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// Envia eventos de conversão ao GA4 (só tem efeito se o GA estiver configurado e consentido).
export function track(event: string, params?: Params) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}

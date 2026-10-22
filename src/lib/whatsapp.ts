import { site } from "@/content/site";

export const whatsappLink = (text?: string) =>
  `https://wa.me/${site.whatsappNumber}${text ? `?text=${encodeURIComponent(text)}` : ""}`;

export const serviceQuote = (service: string) => `Olá! Gostaria de um orçamento para: *${service}*.`;

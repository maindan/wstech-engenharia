// Dados da empresa: fonte única para header, footer, contato, chat e SEO.
// Campos `null` ainda não foram informados pela empresa e ficam ocultos no site.

export const site = {
  name: "WS Tech Engenharia",
  shortName: "WS Tech",
  description:
    "Instalação de quadros elétricos, troca de disjuntores, padrão bifásico e trifásico e atendimento emergencial. Orçamento sem compromisso pelo WhatsApp.",
  url: (process.env.NEXT_PUBLIC_SITE_URL || "https://wstechengenharia.com.br").replace(/\/$/, ""),
  phoneDisplay: "(92) 99996-0071",
  phoneE164: "+5592999960071",
  whatsappNumber: "5592999960071",
  // TODO: confirmar cidade/área de atendimento (assumida pelo DDD 92)
  city: "Manaus",
  region: "AM",
  serviceArea: "Manaus e região",
  // TODO: preencher quando a empresa informar
  email: null as string | null,
  hours: null as { label: string; days: string[]; opens: string; closes: string }[] | null,
  instagram: null as string | null,
  cnpj: null as string | null,
};

export const nav = [
  { id: "inicio", label: "Início" },
  { id: "servicos", label: "Serviços" },
  { id: "projetos", label: "Projetos" },
  { id: "contato", label: "Contato" },
] as const;

export type SectionId = (typeof nav)[number]["id"];

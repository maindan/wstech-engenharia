import type { LucideIcon } from "lucide-react";
import { Activity, Fan, LayoutPanelTop, Lightbulb, Plug, Siren, ToggleRight } from "lucide-react";
import { asset } from "@/lib/base-path";

export type Service = {
  slug: string;
  title: string;
  description: string;
  icon: LucideIcon;
  highlight?: boolean;
};

export const services: Service[] = [
  {
    slug: "quadros-eletricos",
    title: "Instalação de Quadros Elétricos",
    description:
      "Montagem e substituição de quadros de distribuição com disjuntores dimensionados, barramentos organizados e circuitos identificados.",
    icon: LayoutPanelTop,
  },
  {
    slug: "troca-de-disjuntores",
    title: "Troca de Disjuntores",
    description:
      "Disjuntor desarmando sem motivo ou esquentando? Substituímos pelo modelo e pela corrente certos para cada circuito.",
    icon: ToggleRight,
  },
  {
    slug: "ventilador-de-teto",
    title: "Instalação de Ventilador de Teto",
    description:
      "Fixação segura, ligação elétrica e instalação de controle ou interruptor, com o ventilador balanceado e sem ruído.",
    icon: Fan,
  },
  {
    slug: "tomadas-e-interruptores",
    title: "Passagem de Tomadas e Interruptores",
    description:
      "Novos pontos de tomada e interruptor, mudança de posição e troca de peças antigas, com fiação adequada à carga de cada aparelho.",
    icon: Plug,
  },
  {
    slug: "luminarias",
    title: "Troca e Instalação de Luminárias",
    description: "Luminárias, spots, perfis e refletores de LED instalados com acabamento limpo, por dentro e por fora.",
    icon: Lightbulb,
  },
  {
    slug: "diagnostico-e-reparos",
    title: "Diagnóstico e Reparos Elétricos",
    description: "Curto-circuito, queda de energia, choque ou consumo alto? Medimos, encontramos a falha e resolvemos.",
    icon: Activity,
  },
  {
    slug: "atendimento-emergencial",
    title: "Atendimento Emergencial",
    description: "Ficou sem energia ou sente cheiro de queimado? Fale com a gente pelo WhatsApp para atendimento prioritário.",
    icon: Siren,
    highlight: true,
  },
];

export type BigService = {
  title: string;
  accent: string;
  tag: string;
  description: string;
  size: "large" | "medium" | "wide";
  image: { src: string; srcSet: string; alt: string };
};

const photo = (name: string, alt: string) => ({
  src: asset(`/images/projetos/${name}-640.webp`),
  srcSet: `${asset(`/images/projetos/${name}-640.webp`)} 640w, ${asset(`/images/projetos/${name}-1080.webp`)} 1080w`,
  alt,
});

export const bigServices: BigService[] = [
  {
    title: "Instalação de Padrão",
    accent: "Trifásico",
    tag: "Alta demanda",
    description:
      "Para comércios, pequenas indústrias e residências com alta demanda: ar-condicionado, motores, fornos e equipamentos pesados. Montamos o padrão de entrada pronto para a vistoria da concessionária.",
    size: "large",
    image: photo(
      "quadro-trifasico-comercial-concluido",
      "Quadro de distribuição trifásico montado pela WS Tech, com barramentos e circuitos identificados",
    ),
  },
  {
    title: "Instalação de Padrão",
    accent: "Bifásico",
    tag: "O mais comum em casas",
    description:
      "O padrão ideal para a maioria das casas: mais capacidade que o monofásico, com chuveiro e ar-condicionado funcionando ao mesmo tempo.",
    size: "medium",
    image: photo("quadro-distribuicao-residencial", "Quadro de distribuição residencial com disjuntores identificados"),
  },
  {
    title: "Ligações Elétricas",
    accent: "Comerciais",
    tag: "Lojas e escritórios",
    description:
      "Lojas, escritórios, depósitos e containers: iluminação, tomadas, quadros e circuitos dedicados para a operação do seu negócio.",
    size: "medium",
    image: photo("iluminacao-led-container", "Iluminação LED instalada em um container de arquivo"),
  },
  {
    title: "Instalações Elétricas",
    accent: "Residenciais",
    tag: "Obra nova e reforma",
    description:
      "Instalação completa para obra nova ou reforma: distribuição de circuitos, pontos de tomada e iluminação, quadro e aterramento.",
    size: "wide",
    image: {
      src: asset("/images/hero/tecnico-trabalhando-640.webp"),
      srcSet: `${asset("/images/hero/tecnico-trabalhando-640.webp")} 640w, ${asset("/images/hero/tecnico-trabalhando-819.webp")} 819w`,
      alt: "Técnico da WS Tech trabalhando na fiação de uma caixa de passagem",
    },
  },
];

// TODO: confirmar o "ideal para" de cada porte com a empresa
export const panels = [
  {
    circuits: 8,
    idealFor: "Apartamentos, kitnets e salas comerciais pequenas",
    items: ["Circuitos identificados", "Disjuntores dimensionados", "Montagem organizada"],
  },
  {
    circuits: 16,
    idealFor: "Casas de médio porte e pequenos comércios",
    items: ["Circuitos identificados", "Disjuntores dimensionados", "Espaço para ampliação"],
    featured: true,
  },
  {
    circuits: 24,
    idealFor: "Casas grandes, lojas e escritórios com vários ambientes",
    items: ["Circuitos identificados", "Disjuntores dimensionados", "Alta capacidade de expansão"],
  },
];

export const steps = [
  { title: "Você chama", text: "Conte o que precisa pelo WhatsApp ou pelo formulário. Se puder, envie fotos." },
  { title: "Avaliamos", text: "Analisamos o serviço (por foto ou visita) e enviamos um orçamento claro." },
  { title: "Executamos", text: "Equipe uniformizada, ferramentas adequadas e local limpo ao final." },
  { title: "Testamos e entregamos", text: "Medimos, testamos cada circuito e explicamos o que foi feito." },
];

export const serviceOptions = [
  ...services.map((s) => s.title),
  "Instalação de Padrão Bifásico",
  "Instalação de Padrão Trifásico",
  "Ligações Elétricas Comerciais",
  "Instalações Elétricas Residenciais",
  "Quadro de distribuição (8, 16 ou 24 circuitos)",
  "Outro",
];

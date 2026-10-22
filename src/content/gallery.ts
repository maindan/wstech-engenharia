import { asset } from "@/lib/base-path";
export type GalleryCategory = "Quadros" | "Iluminação" | "Comandos" | "Testes";

export type GalleryItem = {
  src: string; // caminho sem sufixo: gera -640.webp e -1080.webp
  width: number;
  height: number;
  caption: string;
  alt: string;
  category: GalleryCategory;
};

export const galleryCategories = ["Todos", "Quadros", "Iluminação", "Comandos", "Testes"] as const;

export const gallery: GalleryItem[] = [
  {
    src: asset("/images/projetos/quadro-trifasico-comercial-concluido"),
    width: 1080,
    height: 1440,
    category: "Quadros",
    caption: "Quadro de distribuição trifásico comercial",
    alt: "Quadro de distribuição trifásico concluído, com barramento de cobre, DPS, disjuntor geral e circuitos identificados com etiquetas",
  },
  {
    src: asset("/images/projetos/quadro-distribuicao-residencial"),
    width: 1080,
    height: 1350,
    category: "Quadros",
    caption: "Quadro residencial com circuitos identificados",
    alt: "Quadro de distribuição residencial com disjuntores identificados para ar-condicionado, tomadas e iluminação, com eletrodutos corrugados",
  },
  {
    src: asset("/images/projetos/medicao-tensao-alicate-amperimetro"),
    width: 1080,
    height: 1350,
    category: "Testes",
    caption: "Medição de tensão e testes",
    alt: "Técnico medindo a tensão de uma tomada com alicate amperímetro, que marca 221,7 volts",
  },
  {
    src: asset("/images/projetos/refletores-led-fachada"),
    width: 1080,
    height: 1438,
    category: "Iluminação",
    caption: "Refletores LED para letreiro de fachada",
    alt: "Refletores de LED instalados em hastes para iluminar o letreiro da fachada de um comércio",
  },
  {
    src: asset("/images/projetos/painel-comando-contator"),
    width: 1080,
    height: 1350,
    category: "Comandos",
    caption: "Montagem de painel de comando",
    alt: "Técnico montando painel de comando com contator, relé térmico e botoeira liga/desliga em caixa plástica",
  },
  {
    src: asset("/images/projetos/quadro-trifasico-em-montagem"),
    width: 1080,
    height: 1440,
    category: "Quadros",
    caption: "Montagem de quadro de distribuição",
    alt: "Quadro de distribuição trifásico em montagem, com cabos sendo organizados e ferramentas na base do painel",
  },
  {
    src: asset("/images/projetos/iluminacao-led-container"),
    width: 1080,
    height: 1350,
    category: "Iluminação",
    caption: "Iluminação LED em container",
    alt: "Luminárias LED tubulares instaladas no teto de um container de arquivo, com eletroduto corrugado aparente",
  },
];

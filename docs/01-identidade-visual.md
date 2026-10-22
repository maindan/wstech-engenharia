# 01 — Identidade Visual

## 1. Linguagem visual (adaptação da referência)

A referência é uma landing de e-bike. Os traços dela que vamos trazer para a WS Tech:

| Traço da referência | Como fica na WS Tech |
|---|---|
| Produto recortado (sem fundo) como herói da página | **Técnico recortado** no hero, sobreposto a uma palavra gigante ao fundo |
| Tipografia display enorme, peso alto e espaçamento apertado | Montserrat 800, maiúsculas, `letter-spacing` negativo, palavra **"ENERGIA"** ocupando a largura da tela atrás do técnico |
| Chips/etiquetas flutuando ao redor do produto com especificações | Chips com dados do serviço: "Orçamento sem compromisso", "Atendimento emergencial", "Quadros até 24 circuitos" |
| Cards com cantos bem arredondados e grid tipo *bento* | Cards de serviço com raio 24–32px; seção "Serviços maiores" em bento grid |
| Botões em formato pílula com ícone em círculo | CTA amarelo em pílula com seta dentro de um círculo azul-marinho |
| Alternância de seções claras e escuras | Fundo off-white (mesmo tom do fundo da logo) alternando com seções azul-marinho |
| Muito respiro, poucos elementos por dobra | Espaçamento vertical generoso, no máximo 1 ideia principal por dobra |
| Detalhes gráficos discretos | Raio (⚡) e engrenagem da logo usados como grafismos, linhas de "circuito" finas em baixa opacidade |

## 2. Paleta de cores

Cores extraídas da logo (mediana dos pixels de cada cor):

| Cor da logo | Hex extraído | Papel |
|---|---|---|
| Azul-marinho (W, S, engrenagem, "WS TECH") | `#023960` | Primária — títulos, fundos escuros, header |
| Amarelo (raio) | `#F8B214` | Destaque — CTAs, ícones, detalhes, sublinhados |
| Grafite ("ENGENHARIA") | `#495057` | Texto secundário |
| Fundo da logo | `#F1F1EF` | Base do off-white do site |

### Escalas

**Navy (primária)**

| Token | Hex | Uso |
|---|---|---|
| `navy-950` | `#011A2E` | Fundo do footer, overlay do menu mobile |
| `navy-900` | `#012642` | Fundo de seções escuras |
| `navy-800` | `#023960` | **Cor da marca** — títulos, header ao rolar, botões secundários |
| `navy-700` | `#0A4A7A` | Hover de elementos navy |
| `navy-600` | `#1A5F94` | Bordas/linhas em fundo escuro |
| `navy-200` | `#C9D6E3` | Texto secundário em fundo escuro |
| `navy-100` | `#E3EBF3` | Fundo de ícones, chips em fundo claro |
| `navy-50`  | `#F2F6FA` | Fundo alternativo de seção clara |

**Yellow (destaque)**

| Token | Hex | Uso |
|---|---|---|
| `yellow-700` | `#8A6100` | **Único amarelo permitido como texto em fundo claro** (5,5:1) |
| `yellow-600` | `#D99A0B` | Hover do botão primário |
| `yellow-500` | `#F8B214` | **Cor da marca** — fundo de CTA, ícones, raio, destaques em fundo escuro |
| `yellow-300` | `#FCD77A` | Brilhos, glow do raio |
| `yellow-100` | `#FEF3D6` | Fundo de badges em seção clara |

**Neutros**

| Token | Hex | Uso |
|---|---|---|
| `ink` | `#0B1B2B` | Texto principal de parágrafos em fundo claro |
| `graphite` | `#495057` | Texto secundário (7,4:1 no off-white) |
| `line` | `#DADDD8` | Bordas e divisores em fundo claro |
| `paper` | `#F4F4F1` | **Fundo principal do site** (off-white quente) |
| `white` | `#FFFFFF` | Cards sobre o fundo `paper` |

**Funcionais**

| Token | Hex | Uso |
|---|---|---|
| `whatsapp` | `#25D366` | Somente botão e widget do WhatsApp |
| `whatsapp-dark` | `#128C7E` | Header do widget do WhatsApp |
| `success` | `#1F9D55` | Confirmação do formulário |
| `danger` | `#D64545` | Erros de validação |

### Contraste (WCAG) — validado

| Combinação | Razão | Resultado |
|---|---|---|
| Navy `#023960` sobre amarelo `#F8B214` | 6,47:1 | ✅ AA — **texto do botão primário** |
| Navy sobre off-white `#F4F4F1` | 10,85:1 | ✅ AAA |
| Branco sobre navy | 11,95:1 | ✅ AAA |
| Amarelo sobre navy-950 | 9,57:1 | ✅ AAA — títulos destacados em seções escuras |
| `navy-200` sobre navy-800 | 8,09:1 | ✅ AAA — parágrafos em seção escura |
| Grafite sobre off-white | 7,42:1 | ✅ AAA |
| `yellow-700` sobre branco | 5,54:1 | ✅ AA |
| ❌ Amarelo `#F8B214` sobre branco/off-white | 1,85:1 | **Proibido para texto** — usar só como fundo, ícone grande ou grafismo |
| ❌ Branco sobre verde WhatsApp | 1,98:1 | Ícone/texto do botão do WhatsApp deve ser `ink` (8,78:1) ou o ícone branco com contorno navy |
| ❌ Cinza `#6B7280` sobre off-white | 4,39:1 | Não usar para texto pequeno — usar `graphite` |

### Regras de uso

- Proporção aproximada: **60% off-white/branco, 30% navy, 10% amarelo**. O amarelo só funciona como destaque se for raro.
- Um único CTA amarelo por dobra de tela.
- Gradientes permitidos: `navy-900 → navy-800` (seções escuras) e um *glow* radial amarelo de baixa opacidade atrás do técnico no hero.

## 3. Tipografia

| Família | Uso | Pesos |
|---|---|---|
| **Montserrat** | Títulos, números, menu, botões, palavra gigante do hero | 600, 700, 800 |
| **Inter** | Parágrafos, formulários, legendas, chat do WhatsApp | 400, 500, 600 |

Carregamento: Google Fonts via `next/font/google` (baixa as fontes no build e as serve pelo próprio domínio, sem requisição externa e sem salto de layout). Só os pesos listados acima, subset `latin`, `display: swap`.

### Escala tipográfica fluida (mobile → desktop)

| Token | Família/peso | Tamanho (`clamp`) | Line-height | Tracking | Uso |
|---|---|---|---|---|---|
| `display` | Montserrat 800 | `clamp(4.5rem, 22vw, 15rem)` | 0.85 | -0.04em | Palavra gigante "ENERGIA" atrás do técnico |
| `h1` | Montserrat 800 | `clamp(2.25rem, 7vw + 0.5rem, 4.5rem)` | 1.0 | -0.03em | Título do hero |
| `h2` | Montserrat 700 | `clamp(1.875rem, 4vw + 0.75rem, 3.25rem)` | 1.08 | -0.02em | Título de seção |
| `h3` | Montserrat 700 | `clamp(1.25rem, 1vw + 1rem, 1.5rem)` | 1.2 | -0.01em | Título de card |
| `eyebrow` | Montserrat 600 | `0.8125rem` (13px) | 1.2 | 0.16em, MAIÚSCULAS | Rótulo acima do título de seção |
| `lead` | Inter 400 | `clamp(1.0625rem, 0.5vw + 1rem, 1.25rem)` | 1.6 | 0 | Subtítulo de seção/hero |
| `body` | Inter 400 | `1rem` (16px) | 1.65 | 0 | Parágrafos |
| `small` | Inter 500 | `0.875rem` | 1.5 | 0 | Legendas, chips, termos |
| `button` | Montserrat 700 | `0.9375rem` | 1 | 0.01em | Botões |
| `stat` | Montserrat 800 | `clamp(2.5rem, 6vw, 4rem)` | 1 | -0.03em | Números de destaque |

Regras:
- Parágrafos com no máximo **65 caracteres** por linha (`max-w-[65ch]`).
- Nunca abaixo de **16px** em campos de formulário (evita zoom automático no iOS).
- Títulos com `text-wrap: balance`; parágrafos com `text-wrap: pretty`.
- Destaque dentro de títulos: palavra-chave em amarelo (em fundo escuro) ou com sublinhado amarelo desenhado em SVG (em fundo claro).

## 4. Espaçamento e grid

- Base de **4px**. Escala: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128.
- Padding vertical das seções: `py-20` (80px) no mobile → `py-32` (128px) no desktop.
- Padding lateral (gutter): **20px** no mobile, 32px no tablet, container máximo de **1240px** centralizado.
- Grid: 4 colunas no mobile, 8 no tablet, 12 no desktop; gap de 16px → 24px.

### Breakpoints (padrão Tailwind)

| Nome | Largura mínima | Alvo |
|---|---|---|
| (base) | 0 | Celulares 360–430px — **layout de referência** |
| `sm` | 640px | Celulares grandes na horizontal |
| `md` | 768px | Tablets |
| `lg` | 1024px | Notebooks — menu deixa de ser hambúrguer |
| `xl` | 1280px | Desktop |

## 5. Forma, bordas e sombras

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 10px | Inputs, chips pequenos |
| `radius-md` | 16px | Botões não-pílula, miniaturas |
| `radius-lg` | 24px | Cards de serviço (mobile) |
| `radius-xl` | 32px | Cards de serviço (desktop), blocos bento, imagem da galeria |
| `radius-2xl` | 40px | Containers de seção escura que "flutuam" sobre o fundo claro |
| `radius-full` | 9999px | Botões pílula, chips, botão do WhatsApp |

Sombras (sempre com tom navy, nunca preto puro):

```css
--shadow-sm:  0 1px 2px rgb(2 57 96 / 0.06), 0 1px 3px rgb(2 57 96 / 0.08);
--shadow-md:  0 8px 24px -6px rgb(2 57 96 / 0.14);
--shadow-lg:  0 24px 48px -12px rgb(2 57 96 / 0.22);
--shadow-glow: 0 0 0 6px rgb(248 178 20 / 0.18);  /* foco/hover do CTA amarelo */
```

Bordas: 1px `line` em fundo claro; 1px `rgb(255 255 255 / 0.08)` em fundo escuro (efeito vidro).

## 6. Iconografia e grafismos

- Biblioteca: **lucide-react**, traço 1.75, tamanho 20–24px (28px dentro de círculos de ícone).
- Ícones de serviço dentro de um quadrado arredondado `navy-100` (fundo claro) ou `navy-700` (fundo escuro), com o ícone em navy ou amarelo.
- Grafismos da marca, em SVG próprio:
  - **Raio** da logo: usado como marcador decorativo, no loader e na animação de "desenho" do hero.
  - **Engrenagem**: rotação lenta e contínua, opacidade 6%, no fundo do hero e do footer.
  - **Linhas de circuito**: padrão SVG fino (1px, opacidade 5–8%) no fundo das seções escuras, lembrando o banner original.
- Ícone do WhatsApp: SVG oficial (lucide não tem o logo do WhatsApp).

## 7. Tratamento de imagens

- Fotos de serviço: raio `radius-xl`, `object-fit: cover`, proporção **4:5** (é a proporção nativa das fotos do Instagram).
- Overlay na galeria: gradiente de `navy-950/80%` na base para a legenda ficar legível.
- Técnico recortado: sem moldura, com *glow* radial amarelo (opacidade 25%) e uma sombra elíptica no "chão".
- Nenhuma imagem com texto embutido (o banner fica de fora por isso).

## 8. Tokens para o Tailwind CSS v4

Pronto para colar em `src/app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-navy-950: #011A2E;
  --color-navy-900: #012642;
  --color-navy-800: #023960;
  --color-navy-700: #0A4A7A;
  --color-navy-600: #1A5F94;
  --color-navy-200: #C9D6E3;
  --color-navy-100: #E3EBF3;
  --color-navy-50:  #F2F6FA;

  --color-yellow-700: #8A6100;
  --color-yellow-600: #D99A0B;
  --color-yellow-500: #F8B214;
  --color-yellow-300: #FCD77A;
  --color-yellow-100: #FEF3D6;

  --color-ink: #0B1B2B;
  --color-graphite: #495057;
  --color-line: #DADDD8;
  --color-paper: #F4F4F1;

  --color-whatsapp: #25D366;
  --color-whatsapp-dark: #128C7E;
  --color-success: #1F9D55;
  --color-danger: #D64545;

  --font-display: var(--font-montserrat), ui-sans-serif, system-ui, sans-serif;
  --font-sans: var(--font-inter), ui-sans-serif, system-ui, sans-serif;

  --radius-sm: 10px;
  --radius-md: 16px;
  --radius-lg: 24px;
  --radius-xl: 32px;
  --radius-2xl: 40px;

  --shadow-sm: 0 1px 2px rgb(2 57 96 / 0.06), 0 1px 3px rgb(2 57 96 / 0.08);
  --shadow-md: 0 8px 24px -6px rgb(2 57 96 / 0.14);
  --shadow-lg: 0 24px 48px -12px rgb(2 57 96 / 0.22);
  --shadow-glow: 0 0 0 6px rgb(248 178 20 / 0.18);

  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-out-quint: cubic-bezier(0.22, 1, 0.36, 1);
}

html { scroll-behavior: smooth; scroll-padding-top: 80px; }
body { background: var(--color-paper); color: var(--color-ink); font-family: var(--font-sans); }
```

O site **não terá modo escuro**: a identidade já alterna seções claras e escuras e a marca depende do contraste navy/amarelo.

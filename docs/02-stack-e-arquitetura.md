# 02 — Stack e Arquitetura

## 1. Por que Next.js (e não React puro com Vite)

O site vai ser indexado pelo Google e monetizado com AdSense. Uma SPA React pura (Vite) entrega um HTML vazio que só é preenchido pelo JavaScript, o que prejudica a indexação, a aprovação do AdSense e o tempo de carregamento no celular.

**Decisão:** React com **Next.js (App Router) e `output: 'export'`**. O build gera HTML estático completo de cada página, que pode ser hospedado em qualquer lugar (Vercel, Netlify, Cloudflare Pages ou hospedagem compartilhada). Continua sendo React, os componentes e as animações são iguais, e o HTML já chega pronto para o Google.

> Alternativa, se preferir ficar no Vite: Vite + React + `vite-react-ssg` para pré-renderizar as rotas. Funciona, mas exige mais configuração manual de SEO (metadados, sitemap, fontes).

## 2. Bibliotecas

| Necessidade | Biblioteca | Observação |
|---|---|---|
| Framework | `next` + `react` + `react-dom` | App Router, exportação estática |
| Linguagem | TypeScript | |
| Estilização | `tailwindcss` v4 | Tokens em `@theme` (ver [01-identidade-visual.md](01-identidade-visual.md#8-tokens-para-o-tailwind-css-v4)) |
| Utilitários de classe | `clsx` + `tailwind-merge` | Função `cn()` |
| Variantes de componente | `class-variance-authority` | Variantes de botão, chip e card |
| Animações | `motion` | Importar de `motion/react`; usar `LazyMotion` + `m` para reduzir o bundle |
| Primitivos acessíveis | `@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-checkbox` | Menu mobile, widget do WhatsApp e lightbox herdam foco preso, Esc e `aria` corretos |
| Ícones | `lucide-react` | + SVG próprio do WhatsApp, do raio e da engrenagem |
| Carrossel com swipe | `embla-carousel-react` | Serviços e galeria no mobile |
| Lightbox da galeria | `yet-another-react-lightbox` | Zoom, swipe e teclado |
| Formulário | `react-hook-form` + `zod` + `@hookform/resolvers` | Validação no cliente |
| Máscara de telefone | `react-imask` | `(92) 99999-9999` |
| Envio de e-mail | **Web3Forms** (API) | Ver seção 4 |
| Notificações | `sonner` | Toast de sucesso/erro do formulário |
| Fontes | `next/font/google` | Montserrat + Inter, servidas pelo próprio domínio |
| Imagens | `next-image-export-optimizer` | Gera WebP em vários tamanhos no build (o `next/image` padrão não otimiza em exportação estática) |
| SEO | Metadata API do Next + `next-sitemap` | `sitemap.xml`, `robots.txt`, Open Graph |
| Consentimento de cookies | `vanilla-cookieconsent` | LGPD + Google Consent Mode v2 (ver [07](07-adsense-seo-performance.md)) |
| Qualidade | ESLint, Prettier (`prettier-plugin-tailwindcss`) | |

## 3. Estrutura de pastas

```
wstech-engenharia/
├── public/
│   ├── images/
│   │   ├── brand/          # SVGs de assets/tratadas/logo/svg + og-image.jpg
│   │   ├── hero/           # tecnico-recortado.webp (assets/tratadas/tecnico), tecnico-trabalhando.jpg
│   │   └── projetos/       # fotos dos serviços realizados (nomes semânticos, ver docs/08)
│   ├── ads.txt             # exigido pelo AdSense
│   └── robots.txt          # gerado pelo next-sitemap
├── src/
│   ├── app/
│   │   ├── layout.tsx              # fontes, metadados globais, scripts AdSense/consentimento
│   │   ├── page.tsx                # landing (monta as seções)
│   │   ├── globals.css             # Tailwind + tokens
│   │   ├── politica-de-privacidade/page.tsx
│   │   ├── termos-de-uso/page.tsx
│   │   └── not-found.tsx
│   ├── components/
│   │   ├── layout/         # Header, MobileMenu, Footer
│   │   ├── sections/       # Hero, Highlights, Services, Process, Gallery, Contact
│   │   ├── whatsapp/       # WhatsAppButton, WhatsAppChat, chat-script.ts
│   │   ├── ads/            # AdSlot (espaço reservado + carregamento sob demanda)
│   │   ├── ui/             # Button, Chip, Card, SectionHeading, Input, Select, Textarea
│   │   └── motion/         # Reveal, Stagger, TextReveal, Counter, MotionProvider
│   ├── content/
│   │   ├── site.ts         # nome, telefone, e-mail, endereço, redes, horários
│   │   ├── services.ts     # lista de serviços (fonte única para cards, form e chat)
│   │   ├── gallery.ts      # fotos, legendas, alt e categorias
│   │   └── faq-chat.ts     # perguntas/respostas do widget do WhatsApp
│   ├── lib/
│   │   ├── cn.ts
│   │   ├── whatsapp.ts     # monta links wa.me com mensagem pré-preenchida
│   │   └── motion.ts       # durações, easings e variants compartilhadas
│   └── hooks/
│       ├── use-active-section.ts   # destaca o item do menu da seção visível
│       └── use-scrolled.ts         # header muda ao rolar
├── next.config.ts          # output: 'export', images
└── package.json
```

**Regra:** todo dado da empresa (telefone, e-mail, lista de serviços) fica em `src/content/`. Header, footer, formulário, chat do WhatsApp e dados estruturados (JSON-LD) leem do mesmo lugar, então trocar um telefone é uma alteração em um único arquivo.

## 4. Envio do formulário de contato por e-mail

Como o site é estático (sem servidor próprio), o envio usa um serviço de formulário:

**Recomendado: [Web3Forms](https://web3forms.com)**
- Plano gratuito com 250 envios/mês, sem backend, sem expor o e-mail no código (usa uma *access key*).
- O e-mail chega na caixa da WS Tech com todos os campos; o campo `replyto` recebe o e-mail do cliente, então basta clicar em "responder".
- Anti-spam: campo *honeypot* escondido (`botcheck`) + **Cloudflare Turnstile** (captcha invisível, gratuito e compatível com LGPD).

**Alternativas:** Formspree (50 envios/mês grátis) ou EmailJS (envia pelo próprio Gmail da empresa). Se a hospedagem for na Vercel e quiserem templates de e-mail personalizados, dá para usar Resend com uma função serverless; nesse caso a exportação estática deixa de ser obrigatória.

## 5. Hospedagem e domínio

| Opção | Custo | Comentário |
|---|---|---|
| **Vercel** (recomendado) | Grátis (Hobby) | Deploy a cada push no GitHub, HTTPS automático, CDN global |
| Netlify / Cloudflare Pages | Grátis | Equivalentes |
| Hospedagem compartilhada (Hostinger etc.) | Pago | Basta enviar a pasta `out/` gerada pelo build |

O AdSense exige **domínio próprio** (ex.: `wstechengenharia.com.br`); subdomínios como `*.vercel.app` não são aprovados.

## 6. Fases de desenvolvimento sugeridas

1. **Setup** — projeto Next + Tailwind + tokens + fontes + `content/` preenchido.
2. **Componentes base** — Button, Chip, Card, SectionHeading, inputs, wrappers de animação.
3. **Layout** — Header + menu mobile + Footer + navegação por âncoras.
4. **Seções** — Hero → Diferenciais → Serviços → Como funciona → Projetos → Contato.
5. **WhatsApp** — botão flutuante + chat simulado.
6. **Formulário** — validação + Web3Forms + Turnstile.
7. **Páginas legais + consentimento de cookies.**
8. **SEO** — metadados, JSON-LD, sitemap, Open Graph.
9. **Polimento** — animações finais, `prefers-reduced-motion`, testes em celulares reais, Lighthouse.
10. **AdSense** — publicar no domínio, solicitar aprovação, depois inserir os blocos de anúncio.

## 7. Implementação (21/10/2026) — o que mudou em relação ao plano

As fases 1 a 8 foram implementadas. Versões usadas: Next.js 16.4, React 19.3, Tailwind CSS 4.3, motion 14.5, TypeScript 5.9.

Simplificações feitas durante o desenvolvimento, para deixar o site mais leve:

| Plano | Implementado | Motivo |
|---|---|---|
| `embla-carousel-react` nos serviços | Rolagem nativa com `scroll-snap` + barra de progresso do `motion` | Mesmo efeito de swipe, sem biblioteca extra e sem duplicar HTML |
| `next-image-export-optimizer` | WebP pré-gerados (640/1080px) em `public/images/` + `srcSet` manual | Menos configuração no build |
| Radix Select no formulário | `<select>` nativo estilizado | No celular, o seletor nativo é mais prático |
| `react-imask` | Máscara de telefone própria (`maskPhone`) | Uma função de 6 linhas resolve |
| `vanilla-cookieconsent` | Banner próprio (`consent-banner.tsx`) com Consent Mode v2 | Visual da marca e menos JavaScript. Só aparece quando GA ou AdSense estão configurados |
| Rótulos flutuantes no formulário | Rótulos fixos acima dos campos | Mais legíveis e acessíveis |
| Galeria em masonry | Grade de cards 4:5 centralizada (2 colunas no celular, 3 no desktop) | As fotos têm proporções quase iguais e a grade funciona melhor com a animação dos filtros |
| `next-sitemap` | `sitemap.ts`, `robots.ts` e `manifest.ts` nativos do Next | Recurso já embutido no framework |

Ainda **não** implementado: Cloudflare Turnstile no formulário (por enquanto só há o honeypot anti-spam) e a seção "Dicas" (fase 2).

### Redesenho visual (21/10/2026)

Depois da primeira versão, as seções foram redesenhadas para dar mais personalidade, com a mesma paleta e as mesmas fontes:

| Seção | Como ficou |
|---|---|
| Header | Transparente com logo negativa sobre o hero escuro; fica claro ao rolar. Barra de progresso de leitura amarela no topo |
| Hero | Fundo azul profundo com trilhas de circuito e pulsos de energia animados, anéis de "campo elétrico" atrás do técnico, "ENERGIA" gigante em contorno e números em cartões de vidro |
| Faixas | Duas faixas cruzadas (amarela e azul) rolando com os serviços, entre o hero e a seção clara (`marquee.tsx`) |
| Por que a WS Tech | Colagem com duas fotos sobrepostas, bloco amarelo, selo circular girando (`spin-badge.tsx`) e diferenciais em cards numerados |
| Serviços | Título fixo na lateral (desktop), cards que invertem para azul no hover, card de emergência amarelo de largura total |
| Projetos maiores | Todos os cards com foto, etiqueta de contexto e número em contorno |
| Quadros | Ilustração de um quadro com os disjuntores "ligando" um a um quando o card aparece |
| Como funciona | Passos em cards com ícone, ligados por uma linha que acende com a rolagem |
| Galeria | Mosaico com tamanhos variados (1 grande, 1 alta, 1 larga) e "PROJETOS" gigante ao fundo |
| Emergência (nova) | Faixa amarela com telefone em destaque, WhatsApp e ligação direta (`cta-band.tsx`) |
| Contato | Cartão único: painel azul com os canais + formulário |
| Rodapé | Chamada final grande e a marca "WS TECH" gigante em contorno |

Os títulos de seção ganharam numeração (01–07) e um efeito de marca-texto amarelo que "pinta" a palavra em destaque quando o título entra na tela.

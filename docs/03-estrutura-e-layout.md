# 03 — Estrutura e Layout

## 1. Mapa da página

```
┌─────────────────────────────┐
│ HEADER (fixo)               │  Logo · Início · Serviços · Projetos · Contato · [Orçamento]
├─────────────────────────────┤
│ #inicio                     │
│   1a. Hero                  │  fundo claro — técnico recortado + "ENERGIA" gigante
│   1b. Faixa de destaques    │  fundo navy — 4 números/garantias
│   1c. Por que a WS Tech     │  fundo claro — foto do técnico trabalhando + diferenciais
├─────────────────────────────┤
│ [Anúncio 1]                 │
├─────────────────────────────┤
│ #servicos                   │
│   2a. Serviços elétricos    │  fundo claro — 7 cards
│   2b. Serviços maiores      │  fundo navy — bento grid com 4 blocos
│   2c. Quadros de distrib.   │  fundo claro — 3 cards (8 / 16 / 24 circuitos)
│   2d. Como funciona         │  fundo claro — 4 passos
├─────────────────────────────┤
│ #projetos                   │  fundo navy — galeria com filtros + lightbox
├─────────────────────────────┤
│ [Anúncio 2]                 │
├─────────────────────────────┤
│ #contato                    │  fundo claro — formulário + cartões de contato
├─────────────────────────────┤
│ FOOTER                      │  fundo navy-950
└─────────────────────────────┘
  ( ● ) Botão flutuante do WhatsApp — canto inferior direito, em todas as telas
```

> **Fase 2 (recomendada para o AdSense):** um bloco "Dicas do eletricista" com os 3 últimos artigos entre Projetos e Contato, o item **Dicas** no menu e as páginas `/dicas` e `/dicas/[slug]`. Ver [07-adsense-seo-performance.md](07-adsense-seo-performance.md#2-conteúdo-suficiente-o-maior-risco).

Itens do menu e âncoras:

| Menu | Âncora | Seção |
|---|---|---|
| Início | `#inicio` | Hero + destaques + por que a WS Tech |
| Serviços | `#servicos` | Serviços, serviços maiores, quadros, como funciona |
| Projetos | `#projetos` | Imagens de serviços realizados |
| Contato | `#contato` | Formulário + canais |
| **Solicitar orçamento** (botão) | abre o widget do WhatsApp | — |

## 2. Header

**Mobile (base)**

```
┌──────────────────────────────────┐
│ [logo WS]                (≡)     │  altura 64px
└──────────────────────────────────┘
```

**Desktop (≥ lg)**

```
┌────────────────────────────────────────────────────────────────────┐
│ [logo WS TECH]     Início  Serviços  Projetos  Contato   [Orçamento ➜] │  altura 80px
└────────────────────────────────────────────────────────────────────┘
```

- **No topo da página:** fundo transparente, logo colorida, links em navy.
- **Após rolar 24px:** fundo `paper` com 80% de opacidade + `backdrop-blur`, sombra `shadow-sm`, altura reduz de 80 → 64px (desktop).
- **Rolando para baixo** (mais de 400px): o header se esconde; **rolando para cima**, ele volta. Libera espaço útil no celular.
- O link da seção visível fica ativo: texto navy 700 + pílula amarela de 4px de altura deslizando por baixo (animação com `layoutId`).
- Menu mobile: ver [06-componentes.md](06-componentes.md#1-header-e-menu-mobile).

## 3. Seção Início

### 1a. Hero

**Mobile**

```
┌──────────────────────────────────┐
│  ⚡ ENGENHARIA ELÉTRICA · MANAUS │  eyebrow (chip)
│                                  │
│  Energia segura,                 │  h1
│  instalação bem                  │
│  feita.                          │  "bem feita" sublinhado amarelo
│                                  │
│  Da troca de um disjuntor à      │  lead
│  montagem de quadros trifásicos… │
│                                  │
│  [ Solicitar orçamento  (➜) ]    │  botão amarelo, largura total
│  [ Ver serviços ]                │  botão contorno navy, largura total
│                                  │
│ E N E R G I A                    │  palavra gigante, navy 6% de opacidade
│        ╭────────╮                │
│  ┌───────────┐ │                 │
│  │Orçamento  │ 👷 técnico        │  chips flutuando ao redor
│  │sem compr. │ │ recortado       │
│  └───────────┘ │       ┌────────┐│
│        │       │       │ Emerg. ││
│        ╰───────╯       └────────┘│
│  ═══ sombra elíptica ═══         │
└──────────────────────────────────┘
```

**Desktop**

```
┌──────────────────────────────────────────────────────────────────┐
│  ⚡ ENGENHARIA ELÉTRICA            E N E R G I A (gigante, atrás) │
│                                          ╭──────╮                │
│  Energia segura,             ┌────────┐  │  👷  │  ┌──────────┐  │
│  instalação bem feita.       │Orçam.  │  │      │  │Até 24    │  │
│                              └────────┘  │      │  │circuitos │  │
│  Lead…                                   │      │  └──────────┘  │
│                                ┌──────┐  │      │                │
│  [Solicitar orçamento ➜] [Ver serviços]│Emerg.│ ╰──────╯           │
│                                └──────┘                          │
│  ⭐ Orçamentos sem compromisso · Residencial e comercial          │
└──────────────────────────────────────────────────────────────────┘
   coluna de texto: 5/12                coluna da imagem: 7/12
```

- Altura: `min-h-[100svh]` no mobile (usa `svh` para não "pular" quando a barra do navegador some), `min-h-[90vh]` no desktop.
- A palavra **ENERGIA** fica atrás do técnico (`z-index` menor), em Montserrat 800 com opacidade 6–8%, cortada pelas laterais da tela.
- Glow radial amarelo (25%) atrás do tronco do técnico + engrenagem SVG girando lentamente (opacidade 6%).
- No mobile, a imagem do técnico vem **depois** dos CTAs, para que o botão apareça na primeira dobra.
- 3 chips flutuantes (cards brancos com `shadow-md`, ícone amarelo):
  - "Orçamento sem compromisso" (ícone `BadgeCheck`)
  - "Atendimento emergencial" (ícone `Siren`)
  - "Quadros até 24 circuitos" (ícone `CircuitBoard`)

### 1b. Faixa de destaques

Container navy com raio `radius-2xl`, "flutuando" sobre o fim do hero (margem negativa de -48px no desktop).

```
Mobile (grade 2×2)                     Desktop (4 colunas)
┌───────────────┬───────────────┐     ┌─────────┬─────────┬─────────┬─────────┐
│ 11+           │ 24            │     │ 11+     │ 24      │ 2 em 1  │ R$ 0    │
│ tipos de      │ circuitos por │     │ tipos de│ circuit.│ resid. +│ p/ orça-│
│ serviço       │ quadro        │     │ serviço │ /quadro │ comerc. │ mento   │
├───────────────┼───────────────┤     └─────────┴─────────┴─────────┴─────────┘
│ 2 em 1        │ R$ 0          │
│ resid. + com. │ p/ orçamento  │
└───────────────┴───────────────┘
```

Números em `stat` amarelo, rótulo em `navy-200`. Textos em [04-conteudo-e-textos.md](04-conteudo-e-textos.md#1b-faixa-de-destaques).

### 1c. Por que a WS Tech

```
Mobile                                 Desktop
┌──────────────────────────────┐      ┌───────────────────┬─────────────────────────┐
│ [foto técnico trabalhando]   │      │                   │ eyebrow                 │
│  raio xl, 4:5                │      │  foto técnico     │ h2                      │
│  ┌──────────────┐            │      │  trabalhando      │ lead                    │
│  │⚡ selo       │ (sobreposto)│      │                   │ ✓ diferencial 1         │
│  └──────────────┘            │      │                   │ ✓ diferencial 2         │
│ eyebrow / h2 / lead          │      │                   │ ✓ diferencial 3         │
│ ✓ diferencial 1              │      │                   │ ✓ diferencial 4         │
│ ✓ diferencial 2 …            │      │                   │ [Falar com técnico ➜]   │
└──────────────────────────────┘      └───────────────────┴─────────────────────────┘
```

## 4. Seção Serviços

### 2a. Serviços elétricos (7 cards)

- **Mobile:** carrossel horizontal com swipe (Embla), cards com 85% da largura da tela (o card seguinte aparece "espiando" para indicar que dá para arrastar), indicador de progresso em barra amarela abaixo.
- **Tablet:** grade de 2 colunas.
- **Desktop:** grade de 4 colunas com o card "Atendimento Emergencial" ocupando 2 colunas na última linha (4 + 2 + 1×2 = 7 cards em 2 linhas completas). Esse card é navy com borda amarela, para se destacar.

Card de serviço:

```
┌─────────────────────────────┐
│ ┌────┐                 01   │  ícone em quadrado navy-100 · número do card em graphite
│ │ ⚡ │                      │
│ └────┘                      │
│ Instalação de Quadros       │  h3
│ Elétricos                   │
│ Descrição curta de 2–3      │  body graphite
│ linhas…                     │
│ ─────────────────────────── │
│ Pedir orçamento         ➜   │  link: abre o WhatsApp já com o serviço na mensagem
└─────────────────────────────┘
```

Hover (desktop): o card sobe 6px, a sombra vai para `shadow-lg` e o quadrado do ícone fica amarelo.

### 2b. Serviços maiores (bento grid, fundo navy)

```
Mobile (pilha)                Desktop (bento 12 colunas)
┌──────────────────────┐      ┌──────────────────────┬───────────────┐
│ Padrão Trifásico     │      │ Padrão Trifásico     │ Padrão        │
│ (bloco grande, foto) │      │ (7 col, 2 linhas,    │ Bifásico      │
├──────────────────────┤      │  foto do quadro      │ (5 col)       │
│ Padrão Bifásico      │      │  trifásico)          ├───────────────┤
├──────────────────────┤      │                      │ Ligações      │
│ Ligações Comerciais  │      │                      │ Comerciais    │
├──────────────────────┤      ├──────────────────────┴───────────────┤
│ Instalações Resid.   │      │ Instalações Residenciais (12 col)     │
└──────────────────────┘      └───────────────────────────────────────┘
```

- Blocos com fundo `navy-800` e borda vidro (`white/8%`), título em branco, palavra-chave em amarelo.
- O bloco grande usa a foto do quadro trifásico concluído com overlay navy.

### 2c. Quadros de distribuição

3 cards lado a lado (no mobile: carrossel ou pilha). O card de **16 circuitos** é o "mais procurado": fundo navy, levemente maior, com selo amarelo.

```
┌──────────────┐ ┌════════════════┐ ┌──────────────┐
│ 8 CIRCUITOS  │ ║ ★ MAIS PEDIDO  ║ │ 24 CIRCUITOS │
│ Ideal para…  │ ║ 16 CIRCUITOS   ║ │ Ideal para…  │
│ ✓ item       │ ║ Ideal para…    ║ │ ✓ item       │
│ ✓ item       │ ║ ✓ item         ║ │ ✓ item       │
│ [Orçar ➜]    │ ║ [Orçar ➜]      ║ │ [Orçar ➜]    │
└──────────────┘ └════════════════┘ └──────────────┘
```

Sem preço publicado (o banner traz "apenas 08 circuitos", que parece um texto provisório). O botão abre o WhatsApp com "Quero orçamento de um quadro de 16 circuitos".

### 2d. Como funciona (4 passos)

Linha do tempo vertical no mobile e horizontal no desktop, com uma linha que "se acende" em amarelo conforme a rolagem (`useScroll` + `scaleX`/`scaleY`).

```
 (1)──────(2)──────(3)──────(4)
 Contato  Visita   Execução  Entrega
```

## 5. Seção Projetos (imagens de serviços realizados)

Fundo navy, com o padrão de linhas de circuito no fundo.

```
Mobile                               Desktop (masonry 3 colunas)
eyebrow / h2 / lead                  ┌────────┬────────┬────────┐
[Todos][Quadros][Iluminação][Testes] │        │        │        │
 ← chips de filtro com scroll lateral │  foto  ├────────┤  foto  │
┌──────────────────────────────┐     │        │  foto  │        │
│ foto 4:5                     │     ├────────┤        ├────────┤
│ ▓▓▓ gradiente                │     │  foto  ├────────┤  foto  │
│ Quadro trifásico comercial   │     └────────┴────────┴────────┘
└──────────────────────────────┘
┌──────────────────────────────┐
│ …                            │
```

- **Mobile:** grade de 2 colunas com fotos quadradas compactas **ou** carrossel com swipe. **Decisão:** grade de 2 colunas (o usuário vê várias fotos de uma vez); toque abre o lightbox em tela cheia com swipe.
- Filtros por categoria com animação de layout (as fotos se reorganizam suavemente).
- Legenda sempre visível no mobile (não existe hover no toque); no desktop a legenda sobe ao passar o mouse.
- CTA no fim: "Quer um resultado assim? Peça seu orçamento" + link para o Instagram.

## 6. Seção Contato

```
Mobile                                   Desktop
eyebrow / h2 / lead                      ┌───────────────────┬──────────────────────┐
┌──────────────────────────────┐         │ eyebrow / h2/lead │ ┌──────────────────┐ │
│ 💬 WhatsApp  (92) 99996-0071 │ cartões │                   │ │ FORMULÁRIO       │ │
│ ✉  E-mail    contato@…       │         │ cartão WhatsApp   │ │ Nome             │ │
│ 📍 Atendimento Manaus/AM     │         │ cartão E-mail     │ │ Telefone · E-mail│ │
│ 🕘 Horário   seg–sáb …       │         │ cartão Local      │ │ Serviço (select) │ │
└──────────────────────────────┘         │ cartão Horário    │ │ Bairro/Cidade    │ │
┌──────────────────────────────┐         │                   │ │ Mensagem         │ │
│ FORMULÁRIO (card branco)     │         │                   │ │ ☐ LGPD           │ │
│ …                            │         │                   │ │ [Enviar ➜]       │ │
│ [ Enviar mensagem ➜ ]        │         │                   │ └──────────────────┘ │
└──────────────────────────────┘         └───────────────────┴──────────────────────┘
```

Detalhes do formulário em [06-componentes.md](06-componentes.md#3-formulário-de-contato).

## 7. Footer

```
┌──────────────────────────────────────────┐  fundo navy-950, engrenagem gigante 4% ao fundo
│ [logo negativa]                          │
│ Texto curto sobre a empresa              │
│ [Instagram] [WhatsApp]                   │
│                                          │
│ NAVEGAÇÃO      SERVIÇOS       CONTATO    │  mobile: blocos empilhados (acordeão opcional)
│ Início         Quadros        (92)…      │  desktop: 4 colunas
│ Serviços       Padrões        e-mail     │
│ Projetos       Emergência     Manaus/AM  │
│ Contato        …                         │
│──────────────────────────────────────────│
│ © 2026 WS Tech Engenharia · CNPJ …       │
│ Política de Privacidade · Termos · Cookies│
└──────────────────────────────────────────┘
```

Espaço extra de 96px no fim do footer, no mobile, para o botão do WhatsApp (e um eventual anúncio âncora) não cobrirem os links legais.

## 8. Regras de responsividade (resumo)

- Desenhar e testar primeiro em **360×740** e **390×844**; depois 768, 1024, 1440.
- Alvos de toque com no mínimo **44×44px** e 8px de distância entre si.
- Nada de rolagem horizontal da página; carrosseis rolam só dentro do próprio container.
- Respeitar áreas seguras do iPhone: `padding-bottom: env(safe-area-inset-bottom)` no botão do WhatsApp e no menu.
- Usar `svh`/`dvh` em vez de `vh` para alturas de tela cheia.
- Imagens com `sizes` corretos para o celular não baixar a versão desktop.
- Testar com a fonte do sistema aumentada (200%) para garantir que nada quebre.

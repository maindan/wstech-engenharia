# 05 — Animações (motion)

Biblioteca: **`motion`** (importar de `motion/react`).

## 1. Princípios

1. **Animação explica, não enfeita.** Cada movimento indica de onde algo veio, para onde foi ou que algo mudou.
2. **Só `transform` e `opacity`** (e `clip-path` no menu). Nunca animar `width`, `height`, `top` ou `left`: no celular isso trava.
3. **Uma vez só.** Revelações ao rolar acontecem na primeira vez (`viewport={{ once: true }}`), sem repetir quando o usuário volta.
4. **Rápido no mobile.** Distâncias menores e durações ~20% mais curtas abaixo de `lg`.
5. **Acessibilidade.** `<MotionConfig reducedMotion="user">` na raiz: quem ativou "reduzir movimento" no sistema vê só *fades*, sem deslocamento, parallax ou loops.
6. **Bundle leve.** `<LazyMotion features={domAnimation} strict>` + componentes `m.*`. A feature `domMax` (layout animations) só é carregada na galeria.

## 2. Tokens de movimento (`src/lib/motion.ts`)

```ts
export const ease = {
  out: [0.22, 1, 0.36, 1],      // padrão para entradas
  inOut: [0.65, 0, 0.35, 1],    // menu, transições de tela
  expo: [0.16, 1, 0.3, 1],      // revelação de títulos
} as const;

export const duration = { fast: 0.2, base: 0.45, slow: 0.7, xslow: 1.1 } as const;

export const spring = {
  soft:   { type: "spring", stiffness: 260, damping: 30 },   // cards, chips
  snappy: { type: "spring", stiffness: 420, damping: 32 },   // botões, menu
  bouncy: { type: "spring", stiffness: 500, damping: 22 },   // botão do WhatsApp
} as const;

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: duration.base, ease: ease.out } },
};

export const stagger = (step = 0.08, delay = 0) => ({
  hidden: {},
  show: { transition: { staggerChildren: step, delayChildren: delay } },
});
```

Componentes utilitários em `src/components/motion/`:

| Componente | Função |
|---|---|
| `<Reveal>` | `fadeUp` ao entrar na tela (`whileInView`, `amount: 0.25`, `once`) |
| `<Stagger>` | Container que escalona os filhos `<Reveal>` |
| `<TextReveal>` | Divide o título em palavras; cada palavra sobe de dentro de uma máscara (`overflow: hidden`) |
| `<Counter>` | Número que conta de 0 até o valor quando aparece (`useMotionValue` + `animate`) |
| `<Magnetic>` | Botão que segue levemente o cursor (só desktop, `pointer: fine`) |

## 3. Especificação por componente

### Header

| Gatilho | Animação |
|---|---|
| Carregamento | Desce de `y: -100%` para `0`, 0,6s `ease.out`, 0,1s após o hero começar |
| Rolar > 24px | Fundo transparente → `paper/80` + blur; altura 80 → 64px (desktop). Via classes + `transition` do CSS (mais leve) |
| Rolar para baixo > 400px | Some (`y: -100%`); rolar para cima → volta. `useScroll` + `useMotionValueEvent` |
| Link ativo | Pílula amarela embaixo do link com `layoutId="nav-indicator"`, desliza entre os itens com `spring.snappy` |
| Hover nos links (desktop) | Sublinhado cresce do centro (`scaleX: 0 → 1`) |

### Menu mobile (tela cheia)

| Etapa | Animação |
|---|---|
| Ícone ≡ → ✕ | As 3 linhas viram um X: linha do meio some (`opacity`/`scaleX`), as outras giram ±45° — 0,3s |
| Abrir | Painel `navy-950` revela com `clip-path: circle(0% at <posição do botão>)` → `circle(150% ...)`, 0,6s `ease.inOut` |
| Itens | Cada link sobe de dentro de uma máscara (`y: 100% → 0`), escalonado 0,06s, começando 0,2s após a abertura. Números "01, 02…" em amarelo aparecem junto |
| Rodapé do menu | Botão de orçamento + WhatsApp + telefone fazem *fade up* depois dos links |
| Grafismo | Raio amarelo grande no canto inferior é "desenhado" (`pathLength: 0 → 1`, 0,8s) |
| Fechar | Mesma sequência ao contrário, mais rápida (0,4s); `AnimatePresence` cuida da saída |
| Toque em um link | Menu fecha → espera a saída (~0,4s) → rola suavemente até a seção |

### Hero

Sequência de entrada (linha do tempo a partir do carregamento):

| Tempo | Elemento | Animação |
|---|---|---|
| 0,0s | Palavra gigante "ENERGIA" | Letras sobem escalonadas (`y: 40% → 0`, `opacity 0 → 0.07`), 0,04s entre letras |
| 0,1s | Eyebrow | *Fade* + leve deslocamento lateral; o ⚡ pisca uma vez (opacidade 1 → 0,3 → 1) como uma faísca |
| 0,2s | H1 | `<TextReveal>` palavra por palavra (0,07s entre palavras, `ease.expo`, 0,8s) |
| 0,6s | Sublinhado de "bem feita" | SVG desenhado da esquerda para a direita (`pathLength`, 0,6s) |
| 0,6s | Lead | `fadeUp` |
| 0,75s | Botões | `fadeUp` escalonado |
| 0,3s | Técnico | Sobe de `y: 60` com `scale: 0.96 → 1` e `opacity`, 1,0s `ease.out` |
| 0,5s | Glow amarelo | `scale: 0.6 → 1`, `opacity 0 → 0.25`, 1,2s |
| 0,9s+ | Chips | Entram com `spring.soft` vindo de direções diferentes (esquerda/direita/baixo), 0,12s entre eles |

Depois da entrada:
- **Flutuação contínua dos chips:** `y: [0, -8, 0]`, 4–6s em loop, cada chip com duração diferente para não ficarem sincronizados. Pausar quando o hero sai da tela.
- **Engrenagem do fundo:** `rotate: 360` em 60s, linear, infinito.
- **Parallax ao rolar** (desktop e mobile): técnico desce 15% mais devagar, palavra "ENERGIA" anda para o lado (`x: 0 → -8%`), chips se afastam levemente. `useScroll({ target: heroRef })` + `useTransform`.

### Faixa de destaques

- O container sobe e "assenta" sobre o hero (`y: 40 → 0`, `spring.soft`).
- Números com `<Counter>` (1,4s, `ease.out`). "2 em 1" e "R$ 0" entram com *fade* (não contam).

### Por que a WS Tech

- Foto entra com máscara: `clip-path: inset(100% 0 0 0)` → `inset(0)`, 1s `ease.expo`, e a imagem interna dá zoom de 1,15 → 1.
- Selo sobre a foto entra com `spring.bouncy` depois da foto.
- Diferenciais: `<Stagger>`, ícone de ✓ desenhado (`pathLength`) em cada item.

### Cards de serviço

- Grade/carrossel: `<Stagger step={0.07}>`, cada card com `fadeUp` + `scale: 0.98 → 1`.
- Hover (desktop): `y: -6`, sombra para `shadow-lg`, quadrado do ícone muda de `navy-100` para `yellow-500` (0,25s), seta do link desliza 4px para a direita.
- Toque (mobile): `whileTap={{ scale: 0.98 }}`.
- Card de emergência: ícone de sirene com pulso suave (`scale: [1, 1.08, 1]`, 2s, infinito) — único loop da seção.
- Carrossel mobile: barra de progresso amarela atualizada pelo `scrollProgress` do Embla.

### Serviços maiores (bento)

- Blocos entram escalonados com `clip-path` revelando de baixo para cima.
- Foto do bloco grande: parallax interno leve (`y: -6% → 6%` ao rolar).
- Hover: borda vidro → borda amarela 40%, brilho radial que segue o cursor (variável CSS atualizada no `onPointerMove`, só desktop).

### Quadros de distribuição

- Cards entram escalonados; o de 16 circuitos entra por último, com `scale: 0.9 → 1.03` (ele fica maior que os outros).
- Selo "★ Mais pedido": *shimmer* (brilho diagonal passando) a cada 4s.
- Itens com ✓ desenhado ao aparecer.

### Como funciona

- Linha de conexão entre os passos preenche em amarelo conforme a rolagem (`scaleX` no desktop, `scaleY` no mobile, ligado ao `scrollYProgress` da seção).
- Cada círculo numerado fica amarelo quando a linha o alcança.

### Galeria (Projetos)

- Fotos entram com `fadeUp` escalonado por coluna.
- **Filtro:** `LayoutGroup` + `AnimatePresence mode="popLayout"`; as fotos que saem diminuem e somem, as que ficam se reorganizam com `layout` (`spring.soft`). Pílula ativa do filtro desliza com `layoutId`.
- Hover (desktop): zoom 1,06 na imagem, legenda sobe de `y: 100%`.
- Lightbox: abre com animação de zoom do próprio `yet-another-react-lightbox`; fundo `navy-950/95`.

### Formulário de contato

- Campos entram escalonados.
- Foco: rótulo flutuante sobe e diminui; borda vira navy com `shadow-glow` amarelo.
- Erro: campo faz um *shake* horizontal curto (`x: [0, -6, 6, -4, 4, 0]`, 0,35s) + mensagem desce com *fade*.
- Botão enviando: texto troca por *spinner* (`AnimatePresence mode="wait"`).
- Sucesso: o formulário encolhe e dá lugar a um cartão com ✓ desenhado em círculo verde (`pathLength`), seguido do texto.

### Botão e widget do WhatsApp

| Gatilho | Animação |
|---|---|
| Aparecer | Botão entra 1,5s após o carregamento com `spring.bouncy` (`scale: 0 → 1`, `rotate: -30 → 0`) |
| Chamar atenção | Anel de pulso (`scale: 1 → 1.6`, `opacity: 0.5 → 0`, 2s) **somente 3 vezes**, depois para |
| Balão de boas-vindas | Após 6s (uma vez por sessão), balão "Precisa de um orçamento? 💬" aparece ao lado do botão; some em 8s ou ao tocar |
| Abrir | Painel cresce a partir do botão (`transform-origin: bottom right`, `scale: 0.6 → 1`, `opacity`, `spring.snappy`); no mobile sobe de baixo como *bottom sheet* (`y: 100% → 0`) |
| Ícone do botão | WhatsApp → ✕ com rotação (`AnimatePresence mode="wait"`) |
| Mensagens do bot | Indicador "digitando…" (3 pontos com `y` escalonado) por 0,8–1,2s → mensagem entra com `spring.soft` vindo da esquerda (`x: -12`, `scale: 0.95`) |
| Opções rápidas | Chips entram escalonados (0,05s) depois da última mensagem |
| Mensagem do usuário | Entra da direita, balão verde-claro |
| Botão "Continuar no WhatsApp" | Entra com `fadeUp`; brilho *shimmer* único |
| Fechar | Saída reversa em 0,25s |

### Footer

- Colunas com `<Stagger>`.
- Engrenagem gigante de fundo gira devagar (90s/volta).
- Botão "voltar ao topo" com seta que sobe em loop ao passar o mouse.

## 4. Desempenho das animações

- Elementos fora da tela não animam loops (`useInView` para pausar flutuações, engrenagem e pulsos).
- `will-change: transform` só durante a animação, nunca fixo em muitos elementos.
- Parallax limitado a 3 elementos por seção.
- Em celulares fracos (`navigator.hardwareConcurrency <= 4`), desligar parallax e a engrenagem girando.
- O LCP (imagem do técnico e o H1) **não pode começar invisível por muito tempo**: a entrada do H1 e do técnico precisa terminar em até ~1s e o H1 deve estar no HTML estático (sem esperar o JavaScript para existir).

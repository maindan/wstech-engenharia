# 06 — Componentes

## 1. Header e menu mobile

**Estrutura:** `<header>` fixo com `<nav aria-label="Principal">`. Abaixo de `lg`, os links ficam dentro do menu mobile.

### Menu mobile

```
┌──────────────────────────────────┐
│ [logo negativa]            ( ✕ ) │
│                                  │
│  01  Início                      │  Montserrat 800, ~40px, branco
│  02  Serviços                    │  número em amarelo
│  03  Projetos                    │  item ativo: amarelo + ⚡ ao lado
│  04  Contato                     │
│                                  │
│  ──────────────────────────────  │
│  [ Solicitar orçamento   (➜) ]   │  botão amarelo, largura total
│  💬 (92) 99996-0071              │
│  📍 Manaus e região              │
│                         ⚡ (raio  │
│                          grande) │
└──────────────────────────────────┘
```

- Construído com **Radix Dialog**: prende o foco dentro do menu, fecha com Esc e devolve o foco ao botão ≡.
- Bloqueia a rolagem da página enquanto aberto.
- Botão ≡ com `aria-expanded`, `aria-controls` e `aria-label="Abrir menu"` / `"Fechar menu"`.
- Ao tocar em um link: fecha o menu, espera a animação de saída e rola até a seção (`scrollIntoView({ behavior: 'smooth' })`), atualizando a URL com `history.replaceState` (ex.: `/#servicos`).
- Fecha automaticamente se a tela passar para ≥ `lg` (rotação do tablet).
- Animações em [05-animacoes.md](05-animacoes.md#menu-mobile-tela-cheia).

### Seção ativa (`use-active-section`)

`IntersectionObserver` com `rootMargin: "-45% 0px -50% 0px"` em cada `<section id>`: a seção que cruza o meio da tela é a ativa. Usado no menu desktop, no menu mobile e para o `aria-current="true"`.

## 2. Botão flutuante e chat do WhatsApp

### Botão

- Círculo de 60px (56px no mobile), fundo `whatsapp`, ícone `ink` (o branco não tem contraste suficiente no verde — ver [01](01-identidade-visual.md#contraste-wcag--validado)) **ou** ícone branco com anel navy de 2px.
- Posição: `right: 16px; bottom: calc(16px + env(safe-area-inset-bottom))`; no desktop `right/bottom: 24px`.
- **Convivência com anúncios:** se os anúncios âncora (*anchor ads*) do AdSense estiverem ativos, o anúncio fica fixo no rodapé da tela do celular. O botão deve subir automaticamente quando houver um anúncio âncora (observar o elemento `ins.adsbygoogle[data-anchor-status]` ou simplesmente **desativar anchor ads** no painel do AdSense — recomendado; ver [07](07-adsense-seo-performance.md)).
- `aria-label="Conversar no WhatsApp"`, `aria-haspopup="dialog"`.

### Janela de chat (simulação)

```
Mobile (bottom sheet, até 85dvh)        Desktop (painel 380×560, canto inferior direito)
┌──────────────────────────────────┐
│ ▬▬ (alça para arrastar)          │
│ [logo] WS Tech Engenharia    ✕   │  header verde-escuro #128C7E
│        ● Responde em poucos min. │
├──────────────────────────────────┤
│ (fundo bege com padrão sutil)    │
│ ┌──────────────────────┐         │
│ │ Olá! 👋 Aqui é a WS… │  10:42  │  balões do bot: brancos, à esquerda
│ └──────────────────────┘         │
│ ┌──────────────────────┐         │
│ │ Como podemos ajudar? │         │
│ └──────────────────────┘         │
│ [💡 Orçamento] [🚨 Emergência]    │  chips de resposta rápida
│ [🔌 Serviços] [🗂️ Quadros]        │  (quebram linha ou rolam na horizontal)
│ [⚡ Padrão] [📍 Onde] [🕘 Horário] │
│                    ┌───────────┐ │
│                    │ Orçamento │ │  balão do usuário: verde-claro, à direita
│                    └───────────┘ │
│ ┌──────────────────────┐         │
│ │ O orçamento é grátis…│         │
│ └──────────────────────┘         │
│ [ 💬 Continuar no WhatsApp  ➜ ]  │  botão verde, largura total
├──────────────────────────────────┤
│ [ Digite sua mensagem…     ] (➤) │  campo opcional
│ 🔒 Você será redirecionado ao WhatsApp │
└──────────────────────────────────┘
```

**Fluxo:**

1. Usuário toca no botão → painel abre.
2. Bot mostra "digitando…" e envia as 2 mensagens iniciais (com hora atual no balão).
3. Chips de opção aparecem.
4. Usuário escolhe uma opção → ela vira um balão do usuário → bot "digita" → responde (respostas em [04-conteudo-e-textos.md](04-conteudo-e-textos.md#widget-do-whatsapp-chat-simulado)).
5. Aparece o botão **Continuar no WhatsApp**, que abre `https://wa.me/5592999960071?text=<mensagem codificada>` em nova aba, com a mensagem da opção escolhida (ou o texto digitado no campo livre).
6. Os chips continuam disponíveis para novas perguntas.

**Regras:**

- Os dados (perguntas, respostas, mensagens pré-preenchidas) ficam em `src/content/faq-chat.ts`. Os nomes dos serviços vêm de `services.ts`.
- O histórico da conversa fica só na memória (estado React) e é salvo em `sessionStorage` para não se perder se o usuário fechar e reabrir o painel na mesma visita. Nada é enviado a servidor.
- Campo livre: se o usuário digitar e tocar em ➤, a mensagem aparece como balão e o botão "Continuar no WhatsApp" leva esse texto (`encodeURIComponent`).
- Se o horário atual estiver fora do expediente, o cabeçalho mostra "Fora do horário — respondemos assim que possível" (depende do horário oficial ser confirmado).
- Radix Dialog sem modal no desktop (o usuário pode continuar rolando a página) e modal no mobile (bottom sheet com fundo escurecido).
- Fecha com Esc, com ✕, tocando fora (mobile) ou arrastando a alça para baixo (`drag="y"` do motion, fecha se arrastar > 120px).
- Lista de mensagens com `role="log"` e `aria-live="polite"` para leitores de tela.
- Evento de analytics ao clicar em "Continuar no WhatsApp" (com a opção escolhida) — é a principal conversão do site.

`src/lib/whatsapp.ts`:

```ts
export const WHATSAPP_NUMBER = "5592999960071";
export const whatsappLink = (text: string) =>
  `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
```

Os botões "Solicitar orçamento" do header e do hero **abrem o widget**, não o WhatsApp direto, para o visitante ver as respostas rápidas primeiro. Os links "Pedir orçamento" dos cards de serviço vão **direto** ao WhatsApp com o nome do serviço (intenção já clara).

## 3. Formulário de contato

- `react-hook-form` + schema `zod` (campos e mensagens em [04-conteudo-e-textos.md](04-conteudo-e-textos.md#4-contato)).
- Rótulos visíveis (rótulo flutuante), nunca só placeholder.
- `inputMode="tel"` e `autoComplete="tel"` no telefone; `autoComplete="name"` e `"email"` nos outros; máscara `(00) 00000-0000`.
- Select de serviço com Radix Select, opções vindas de `services.ts` + "Outro".
- Validação ao sair do campo (`mode: "onTouched"`); ao enviar, o foco vai para o primeiro campo com erro.
- Envio para Web3Forms (`POST https://api.web3forms.com/submit`) com:
  - `access_key`, `subject: "Novo contato pelo site — <serviço>"`, `from_name: "Site WS Tech"`, `replyto: <e-mail do cliente>`, todos os campos.
  - Honeypot `botcheck` escondido + token do **Cloudflare Turnstile**.
- Botão desabilitado durante o envio; toast (`sonner`) + cartão de sucesso no lugar do formulário, com botão "Enviar outra mensagem".
- Abaixo do botão: "Prefere mais rápido? **Chame no WhatsApp**".
- Checkbox LGPD obrigatório com link para a Política de Privacidade.

## 4. Galeria (Projetos)

- Dados em `src/content/gallery.ts`: `{ src, width, height, alt, caption, category }`.
- Grade masonry com CSS `columns` (2 colunas no mobile, 3 no desktop), sem biblioteca extra.
- Imagens com `loading="lazy"`, `sizes="(max-width: 768px) 50vw, 33vw"`, placeholder desfocado (blur) gerado no build.
- Filtros como `role="tablist"` com chips; rolagem horizontal no mobile.
- Cada foto é um `<button>` que abre o **yet-another-react-lightbox** (plugins: Zoom, Captions, Counter). Swipe no mobile, setas e Esc no desktop.

## 5. Componentes de UI base

| Componente | Variantes |
|---|---|
| `Button` | `primary` (amarelo, texto navy, seta em círculo navy) · `secondary` (navy, texto branco) · `outline` (borda navy) · `ghost` · `whatsapp` · tamanhos `md` (48px) e `lg` (56px) · `fullWidth` no mobile |
| `Chip` | `light` (branco + sombra) · `dark` (vidro sobre navy) · `filter` (selecionável) |
| `Card` | `light` · `dark` · `highlight` (borda amarela) |
| `SectionHeading` | eyebrow + h2 (com `<em>` para a palavra em destaque) + lead; alinhamento `left`/`center`; tema `light`/`dark` |
| `IconBox` | quadrado arredondado com ícone, tema claro/escuro, hover amarelo |
| `AdSlot` | espaço reservado para anúncio, ver [07](07-adsense-seo-performance.md#3-posicionamento-dos-anúncios) |

Botão primário (referência visual):

```
┌─────────────────────────────────┐
│  Solicitar orçamento     ( ➜ )  │   fundo #F8B214 · texto #023960 Montserrat 700
└─────────────────────────────────┘   círculo #023960 com seta amarela
  hover: fundo #D99A0B, seta desliza e gira -45°, shadow-glow
```

## 6. Footer

- Logo negativa (branca + raio amarelo).
- Colunas: Navegação · Serviços · Contato (conteúdo em [04](04-conteudo-e-textos.md#footer)).
- Ícones sociais com `aria-label`.
- Links legais (Política de Privacidade, Termos de Uso, botão "Preferências de cookies" que reabre o banner de consentimento).
- Botão "Voltar ao topo".
- `padding-bottom` extra no mobile para o botão do WhatsApp.

## 7. Banner de consentimento de cookies

- Cartão compacto no rodapé da tela (mobile: largura total; desktop: 420px no canto inferior esquerdo, para não colidir com o WhatsApp).
- Botões **Aceitar todos** / **Recusar** / **Personalizar** com o mesmo destaque visual (exigência de boas práticas LGPD).
- Categorias: Necessários (sempre ativos) · Estatísticas · Publicidade.
- Integra com o Google Consent Mode v2 (ver [07](07-adsense-seo-performance.md#4-lgpd-cookies-e-consent-mode)).
- Enquanto o banner estiver visível, o botão do WhatsApp sobe acima dele.

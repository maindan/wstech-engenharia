# 07 — AdSense, SEO, LGPD e Desempenho

## 1. Requisitos para aprovação no AdSense

| Requisito | Como o plano atende |
|---|---|
| Domínio próprio (não aceita `*.vercel.app` etc.) | Registrar `wstechengenharia.com.br` (ou similar) antes de solicitar |
| HTML com conteúdo legível pelo robô do Google | Next.js com exportação estática: todo texto já está no HTML |
| Conteúdo original e com valor | Textos próprios em [04](04-conteudo-e-textos.md) + seção de artigos (ver item 2) |
| Política de Privacidade mencionando cookies do Google e de terceiros para anúncios | Página `/politica-de-privacidade` (conteúdo mínimo no item 5) |
| Navegação clara e informações de contato | Menu fixo, seção Contato, footer completo |
| Arquivo `ads.txt` na raiz | `public/ads.txt` com `google.com, pub-XXXXXXXXXXXXXXXX, DIRECT, f08c47fec0942fa0` |
| Site completo, sem páginas "em construção" ou links quebrados | Checklist de entrega em [09](09-pendencias-e-checklist.md) |
| Bom funcionamento no celular | Projeto mobile-first |

## 2. Conteúdo suficiente (o maior risco)

O AdSense costuma **reprovar sites de uma página só** com o motivo "conteúdo de baixo valor" (*low value content*). Uma landing com 7 seções e poucos textos tem chance real de reprovação.

**Recomendação:** antes de solicitar a aprovação, publicar uma seção **Dicas** (`/dicas` + `/dicas/[slug]`) com pelo menos **8–10 artigos** originais, úteis e de 600+ palavras cada (ideias em [04-conteudo-e-textos.md](04-conteudo-e-textos.md#artigos-para-a-seção-dicas)). Isso também ajuda muito no Google orgânico para buscas como "disjuntor desarmando sozinho" ou "padrão bifásico ou trifásico".

- O item **Dicas** entra no menu depois de "Projetos".
- Os artigos podem ser escritos em Markdown/MDX dentro do repositório (`src/content/dicas/*.mdx`), sem precisar de CMS.
- Na landing, um bloco "Dicas do eletricista" com os 3 artigos mais recentes, antes da seção Contato.
- Os anúncios rendem mais e são mais aceitos **dentro dos artigos** do que na landing.

## 3. Posicionamento dos anúncios

**Decisão:** blocos de anúncio **manuais** em posições definidas (não usar *Auto ads* no início). Mais controle sobre o layout e sobre as regras de clique acidental.

| Slot | Local | Formato |
|---|---|---|
| `ad-1` | Entre "Por que a WS Tech" e "Serviços" | Display responsivo horizontal |
| `ad-2` | Entre "Projetos" e "Contato" | Display responsivo horizontal |
| `ad-article-*` | Nos artigos: após o 2º parágrafo e antes da conclusão | In-article |
| `ad-sidebar` | Artigos, desktop: barra lateral fixa | Vertical 300×600 |

**Regras de política e de layout:**

- **Nunca** colocar anúncio no hero, no header, dentro do menu, no widget do WhatsApp, no formulário ou colado em botões (risco de clique acidental, que é violação de política).
- Distância mínima de **48px** entre o anúncio e qualquer botão ou link.
- Rótulo discreto acima do bloco: "Publicidade" (Inter 12px, `graphite`). Nunca usar textos como "Clique aqui" ou "Apoie o site".
- **Desativar anúncios âncora e vinhetas** (*anchor/vignette*) no painel do AdSense na primeira fase: o âncora disputa a parte de baixo da tela com o botão do WhatsApp e o vinheta (tela cheia) atrapalha a conversão. Se forem ativados depois, o botão do WhatsApp precisa subir quando o âncora aparecer.
- Mais conteúdo do que anúncios em toda tela.

**Componente `<AdSlot>`:**

- Reserva altura mínima antes do anúncio carregar (`min-height: 280px` no mobile, `250px` no desktop) para não causar salto de layout (CLS).
- Fundo `navy-50` com o rótulo "Publicidade" enquanto carrega.
- Só chama `(adsbygoogle = window.adsbygoogle || []).push({})` quando o slot está perto de entrar na tela (`IntersectionObserver`, `rootMargin: 200px`) e o consentimento foi resolvido.
- Se o anúncio não for preenchido (`data-ad-status="unfilled"`), o slot colapsa.
- Script do AdSense carregado uma vez no `layout.tsx` com `next/script` e `strategy="afterInteractive"`.

## 4. LGPD, cookies e Consent Mode

- Banner de consentimento (`vanilla-cookieconsent`) com Aceitar / Recusar / Personalizar (ver [06](06-componentes.md#7-banner-de-consentimento-de-cookies)).
- **Google Consent Mode v2** com padrão negado antes da escolha:

```js
gtag('consent', 'default', {
  ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied',
  analytics_storage: 'denied', wait_for_update: 500,
});
// ao aceitar: gtag('consent', 'update', { ...: 'granted' })
```

- Sem consentimento de publicidade, o AdSense continua exibindo anúncios **não personalizados** (rendem menos, mas o site continua monetizado).
- Se o site receber visitantes da Europa/Reino Unido, o Google exige uma CMP certificada; pode-se usar a mensagem de privacidade do próprio AdSense ("Privacidade e mensagens") para esses países.
- O formulário de contato só coleta o necessário e tem checkbox de consentimento.

## 5. Páginas legais

**`/politica-de-privacidade`** — conteúdo mínimo:
- Quem é o controlador dos dados (WS Tech Engenharia, CNPJ, e-mail de contato).
- Dados coletados pelo formulário e para que são usados (responder o contato e fazer orçamento).
- Uso de cookies próprios e de terceiros, **incluindo o Google AdSense**: o Google e fornecedores terceiros usam cookies para exibir anúncios com base em visitas anteriores a este e a outros sites; o usuário pode desativar a publicidade personalizada em `https://adssettings.google.com` e conhecer outros fornecedores em `https://www.aboutads.info`.
- Uso do Google Analytics (se for usado).
- Direitos do titular pela LGPD (acesso, correção, exclusão) e como exercê-los.
- Serviços terceiros: Web3Forms (formulário), Cloudflare Turnstile, WhatsApp.
- Data da última atualização.

**`/termos-de-uso`** — uso do site, natureza informativa dos artigos (não substituem avaliação técnica no local), propriedade das imagens, limitação de responsabilidade.

As duas páginas usam o mesmo header/footer, com layout de leitura simples (coluna de 720px).

## 6. SEO

### Metadados (`layout.tsx` / `page.tsx`)

- `title`, `description`, `canonical`, `lang="pt-BR"`, `themeColor: #023960`.
- Open Graph e Twitter Card com imagem **1200×630** (`og-image.jpg`: técnico recortado + logo + "Energia segura, instalação bem feita" sobre navy).
- Favicon e ícones gerados a partir do símbolo da logo (WS + raio), em SVG + PNG 192/512 + `apple-touch-icon`.

### Dados estruturados (JSON-LD)

Tipo `Electrician` (subtipo de `LocalBusiness` no schema.org):

```json
{
  "@context": "https://schema.org",
  "@type": "Electrician",
  "name": "WS Tech Engenharia",
  "image": "https://<dominio>/images/brand/og-image.jpg",
  "logo": "https://<dominio>/images/brand/logo.png",
  "url": "https://<dominio>/",
  "telephone": "+55-92-99996-0071",
  "priceRange": "$$",
  "areaServed": { "@type": "City", "name": "Manaus" },
  "address": { "@type": "PostalAddress", "addressLocality": "Manaus", "addressRegion": "AM", "addressCountry": "BR" },
  "openingHoursSpecification": [],
  "sameAs": ["https://instagram.com/<perfil>"],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Serviços elétricos",
    "itemListElement": [
      { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Instalação de Quadros Elétricos" } }
    ]
  }
}
```

(Gerado a partir de `src/content/site.ts` e `services.ts`; campos vazios são omitidos até a empresa confirmar.)

Nos artigos: JSON-LD `Article` + `BreadcrumbList`.

### Semântica e indexação

- Um único `<h1>` (no hero); cada seção com `<section id aria-labelledby>` e seu `<h2>`.
- Textos importantes em HTML, nunca dentro de imagens (outro motivo para o banner não entrar).
- `alt` descritivo em todas as fotos (lista em [08](08-assets.md)).
- `sitemap.xml` e `robots.txt` via `next-sitemap`.
- Cadastrar o site no **Google Search Console** e enviar o sitemap.
- **Google Perfil da Empresa** (Google Meu Negócio) com o link do site — para um eletricista, é o canal que mais traz clientes pela busca local.

## 7. Desempenho (metas)

| Métrica (celular, 4G) | Meta |
|---|---|
| Lighthouse Performance (mobile) | ≥ 90 |
| LCP | < 2,5s |
| CLS | < 0,1 |
| INP | < 200ms |
| JavaScript inicial | < 150 KB (gzip) |
| Peso total da primeira dobra | < 500 KB |

Como chegar lá:
- Imagem do técnico em **WebP/AVIF**, ≤ 120 KB no mobile, com `priority`/`fetchpriority="high"` (é o LCP).
- Fotos da galeria em WebP 480/768/1080px, com *lazy loading* e placeholder blur.
- Fontes via `next/font` (servidas pelo próprio domínio, só os pesos usados).
- `LazyMotion` + `m` para o motion; lightbox, Embla e o chat do WhatsApp carregados sob demanda (`next/dynamic`) quando forem usados.
- Script do AdSense e analytics depois da interação/consentimento.
- Testar em celular Android intermediário real, não só no DevTools.

## 8. Métricas de conversão (opcional, com consentimento)

GA4 (ou Plausible/Umami, sem cookies) com os eventos:

| Evento | Quando |
|---|---|
| `whatsapp_open_widget` | Abriu o chat simulado |
| `whatsapp_option` | Escolheu uma opção do chat (parâmetro: opção) |
| `whatsapp_redirect` | Clicou em "Continuar no WhatsApp" ou em "Pedir orçamento" de um card — **conversão principal** |
| `form_submit_success` | Formulário enviado |
| `phone_click` | Clicou no telefone |

# 08 — Assets (imagens)

Inventário da pasta `assets/`, com o uso planejado de cada arquivo e o tratamento necessário antes do desenvolvimento.

## 1. Marca e imagens geradas

| Arquivo original | Tamanho | Conteúdo | Uso no site | Tratamento necessário |
|---|---|---|---|---|
| `logo.jpeg` | 1024×1024 JPEG | Logo completa: símbolo WS + raio + engrenagem, "WS TECH" e "ENGENHARIA", fundo off-white | Header, footer, chat do WhatsApp, favicon, OG image | ✅ **Vetorizada** — novas versões em `assets/tratadas/logo/` (ver seção 1.1) |
| `Gemini_Generated_Image_p1l8t5p1l8t5p1l8.jpg` | 1024×1024 JPEG | Técnico sorrindo, de frente, braços cruzados, capacete amarelo, uniforme azul com logo WS Tech | **Hero** (imagem principal recortada) e OG image | ✅ **Fundo removido** — o xadrez estava desenhado na imagem. Nova versão em `assets/tratadas/tecnico/` (ver seção 1.2) |
| `Gemini_Generated_Image_uv3hycuv3hycuv3h.jpg` | 1024×1024 JPEG | Técnico de costas trabalhando em caixa de passagem, escada, oficina ao fundo | Seção **Por que a WS Tech** | Recortar em 4:5 (foco no técnico e na caixa), WebP |
| `banner_lista_servicos.jpg` | 1365×1820 JPEG | Panfleto com lista de serviços e WhatsApp | ❌ **Não entra no site** | Só as informações foram usadas (ver [04](04-conteudo-e-textos.md)) |

### 1.1 Logo vetorizada — `assets/tratadas/logo/`

A logo foi vetorizada a partir do `logo.jpeg`: cada cor (navy, amarelo e grafite) foi separada, suavizada em escala 4× e traçada em curvas. As cores foram trocadas pelos valores exatos da paleta (`#023960`, `#F8B214`, `#495057`) e o fundo ficou transparente.

| Arquivo | Uso |
|---|---|
| `svg/logo-horizontal.svg` | **Header** (fundo claro) — símbolo à esquerda, texto à direita |
| `svg/logo-horizontal-negativa.svg` | Header sobre o hero escuro, menu mobile, footer |
| `svg/logo-vertical.svg` | Composição original (empilhada), para fundo claro — seção Contato, páginas legais, OG image |
| `svg/logo-vertical-negativa.svg` | Composição original para fundo navy |
| `svg/simbolo.svg` / `svg/simbolo-negativo.svg` | Só o símbolo (WS + raio + engrenagem): avatar do chat do WhatsApp, marca d'água, loader |
| `png/*.png` | As mesmas 6 versões em PNG transparente (1024px; horizontal com 1200px) para redes sociais, e-mail e documentos |
| `favicon/favicon.svg`, `favicon.ico`, `favicon-32.png` | Ícone da aba do navegador |
| `favicon/apple-touch-icon.png` (180), `icon-192.png`, `icon-512.png` | Ícones de tela inicial (iOS/Android) e do `manifest` — símbolo sobre fundo `paper` arredondado |

Versão negativa: "WS TECH", "W", "S" e engrenagem em branco; "ENGENHARIA" em `navy-200` (`#C9D6E3`); raio continua amarelo.

Os SVGs foram otimizados com SVGO (~30 KB cada, ~10 KB com gzip). No React, importar como componente (SVGR) ou usar em `<img>`. Se a empresa tiver o arquivo vetorial original do designer, ele continua sendo preferível ao traçado automático.

### 1.2 Técnico recortado — `assets/tratadas/tecnico/`

| Arquivo | Detalhes |
|---|---|
| `tecnico-recortado.png` | Mestre com transparência real, 516×1004px, recortado no limite do corpo (cortado embaixo, na altura das coxas, como no original) |
| `tecnico-recortado.webp` | Mesma imagem em WebP com transparência (65 KB) — **usar no site** |

- Fundo removido com IA (`rembg`, modelo BiRefNet) e conferido em fundo navy, off-white e amarelo: sem halo nem resto de xadrez.
- A **viseira de acrílico** também mostrava o xadrez "através" dela. Essa área foi trocada por um acrílico translúcido (branco-azulado, 22–36% de opacidade), preservando o contorno da viseira, então o fundo do site aparece através dela.
- ⚠️ **Limite de resolução:** a imagem gerada original tem 1024px, então o recorte tem 516px de largura. É nítido no celular e no desktop até ~500px de largura exibida em telas comuns, mas fica levemente suave em telas retina grandes. Se o hero do desktop precisar de mais, o ideal é gerar a imagem de novo em resolução maior (2048px+), já com fundo liso e de uma cor só, para facilitar o recorte.

> As duas imagens do técnico foram geradas por IA. Isso é permitido, mas elas **não devem aparecer na galeria de "serviços realizados"**, que deve ter só fotos reais, para não enganar o visitante.

## 2. Fotos de serviços realizados

Nomes atuais são de download do Instagram (`SaveClip.App_…`). Renomear para nomes descritivos (ajuda no SEO de imagem) e mover para `public/images/projetos/`.

| Arquivo original | Novo nome | Tamanho | Categoria | Legenda (visível) | Texto alternativo (`alt`) | Uso extra |
|---|---|---|---|---|---|---|
| `SaveClip.App_590419527_…` | `quadro-trifasico-comercial-concluido.jpg` | 1080×1440 | Quadros | Quadro de distribuição trifásico comercial | Quadro de distribuição trifásico concluído, com barramento de cobre, DPS, disjuntor geral e circuitos identificados com etiquetas | **Bloco grande** dos Serviços maiores (Padrão Trifásico) + primeira foto da galeria |
| `SaveClip.App_591140626_…` | `quadro-trifasico-em-montagem.jpg` | 1080×1440 | Quadros | Montagem de quadro de distribuição | Quadro de distribuição trifásico em montagem, com cabos sendo organizados e ferramentas na base do painel | Galeria |
| `SaveClip.App_590407641_…` | `quadro-distribuicao-residencial.jpg` | 1080×1350 | Quadros | Quadro residencial com circuitos identificados | Quadro de distribuição residencial com disjuntores identificados para ar-condicionado, tomadas e iluminação, com eletrodutos corrugados | Card "Instalação de Quadros Elétricos" (desktop) |
| `SaveClip.App_589395440_…` | `painel-comando-contator.jpg` | 1080×1350 | Comandos | Montagem de painel de comando | Técnico montando painel de comando com contator, relé térmico e botoeira liga/desliga em caixa plástica | Galeria |
| `SaveClip.App_591145198_…` | `medicao-tensao-alicate-amperimetro.jpg` | 1080×1350 | Testes | Medição de tensão e testes | Técnico medindo a tensão de uma tomada com alicate amperímetro, que marca 221,7 volts | Card "Diagnóstico e Reparos"; passo 4 de "Como funciona" |
| `SaveClip.App_591145017_…` | `iluminacao-led-container.jpg` | 1080×1350 | Iluminação | Iluminação LED em container | Luminárias LED tubulares instaladas no teto de um container de arquivo, com eletroduto corrugado aparente | Bloco "Ligações Elétricas Comerciais" |
| `SaveClip.App_589058370_…` | `refletores-led-fachada.jpg` | 1440×1918 | Iluminação | Refletores LED para letreiro de fachada | Refletores de LED instalados em hastes para iluminar o letreiro da fachada de um comércio | Galeria |
| `SaveClip.App_639988083_…` | `kit-ferramentas-solda.jpg` | 1440×1920 | — | — | Kit de ferramentas de solda e caixa organizadora com tubos termorretráteis coloridos | ⚠️ **Fora da galeria** (não é um serviço realizado). Pode ser usada como imagem decorativa no bloco "Testado na hora"/diferenciais ou num artigo de dicas |

Categorias de filtro resultantes: **Todos (7) · Quadros (3) · Iluminação (2) · Comandos (1) · Testes (1)**.

> A galeria tem só 7 fotos. Para ela parecer mais completa (e para os filtros fazerem sentido), vale pedir à empresa mais 5–10 fotos reais, de preferência com **antes e depois**, padrões de entrada instalados e ventiladores/luminárias.

## 3. Pipeline de tratamento

1. ~~Remover o fundo do técnico~~ ✅ feito (seção 1.2).
2. ~~Vetorizar a logo~~ ✅ feito (seção 1.1).
3. **Recortes e cor:** leve ajuste de exposição e balanço de branco nas fotos reais (algumas estão com dominante amarelada), sem alterar o conteúdo.
4. **Remover metadados EXIF** (localização do celular) antes de publicar.
5. **Exportar** mestres em JPG/PNG de alta qualidade para `public/images/...`; o `next-image-export-optimizer` gera WebP em 480/768/1080/1440px no build.
6. **OG image** 1200×630 (ícones e favicons já estão prontos em `assets/tratadas/logo/favicon/`).

## 4. Grafismos a criar (SVG)

| Grafismo | Origem | Uso |
|---|---|---|
| Raio | Extraído do `simbolo.svg` (camada amarela) | Eyebrow, menu mobile, marcadores, animação de "desenho" |
| Engrenagem | Extraída do `simbolo.svg` (camada navy) | Fundo do hero e do footer (girando lentamente) |
| Padrão de circuito | Novo — linhas finas e nós, em tile repetível | Fundo das seções navy (opacidade 5–8%) |
| Sublinhado à mão | Novo — traço único | Destaque de palavras nos títulos de fundo claro |
| Ícone do WhatsApp | SVG oficial | Botão flutuante, cartões de contato |

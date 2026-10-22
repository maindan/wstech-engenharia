# WS Tech Engenharia — Plano da Landing Page

Plano de estilo, estrutura, conteúdo e implementação da landing page da **WS Tech Engenharia** (serviços elétricos residenciais e comerciais).
Este material é a base para a fase de desenvolvimento: nada aqui é código final, mas tudo foi decidido para que o desenvolvimento possa começar sem novas definições de design.

## Premissas do projeto

| Item | Decisão |
|---|---|
| Tipo | Landing page de página única (one-page) + páginas legais obrigatórias para o AdSense |
| Prioridade de tela | **Mobile-first** — o layout é desenhado para 360–430px e expandido para tablet/desktop |
| Referência visual | [E-Bike Landing Page (Dribbble)](https://dribbble.com/shots/27064869-E-Bike-Landing-Page), com as cores trocadas pelas da logo |
| Cores | Azul-marinho `#023960` + Amarelo `#F8B214` + Grafite `#495057` (extraídas da logo) |
| Fontes | **Montserrat** (títulos) + **Inter** (textos) — Google Fonts |
| Framework | React (Next.js com exportação estática — ver [02-stack-e-arquitetura.md](02-stack-e-arquitetura.md)) |
| Animações | `motion` (antigo Framer Motion) |
| Monetização | Google AdSense — o site precisa seguir as políticas de conteúdo e layout do AdSense |

## Índice

1. [01-identidade-visual.md](01-identidade-visual.md) — cores, tipografia, espaçamentos, raios, sombras, ícones e tokens prontos para o Tailwind
2. [02-stack-e-arquitetura.md](02-stack-e-arquitetura.md) — bibliotecas, estrutura de pastas, envio de e-mail, hospedagem
3. [03-estrutura-e-layout.md](03-estrutura-e-layout.md) — seção por seção, com wireframes mobile e desktop
4. [04-conteudo-e-textos.md](04-conteudo-e-textos.md) — todos os títulos, subtítulos e textos do site
5. [05-animacoes.md](05-animacoes.md) — especificação de cada animação (menu, hero, cards, galeria, WhatsApp)
6. [06-componentes.md](06-componentes.md) — header/menu, widget do WhatsApp, formulário de contato, galeria, footer
7. [07-adsense-seo-performance.md](07-adsense-seo-performance.md) — requisitos do AdSense, SEO, LGPD e desempenho
8. [08-assets.md](08-assets.md) — inventário das imagens, uso de cada uma e tratamentos necessários
9. [09-pendencias-e-checklist.md](09-pendencias-e-checklist.md) — informações que faltam e checklist de entrega

## Pontos de atenção (resumo)

Detalhes em [09-pendencias-e-checklist.md](09-pendencias-e-checklist.md).

- ✅ **Técnico recortado:** o arquivo original era um JPG com o xadrez *desenhado* na imagem. Já existe uma versão com transparência real em `assets/tratadas/tecnico/` (resolução limitada a 516×1004px, ver [08](08-assets.md#12-técnico-recortado--assetstratadastecnico)).
- ✅ **Logo vetorizada:** o original era um JPEG com fundo off-white. Versões SVG/PNG (horizontal, vertical, símbolo, colorida e negativa) e favicons estão em `assets/tratadas/logo/` (ver [08](08-assets.md#11-logo-vetorizada--assetstratadaslogo)).
- **O banner de serviços também é JPG** (`banner_lista_servicos.jpg`, não `.png`). Ele **não entra no site**; só as informações dele foram aproveitadas.
- **Não foi possível abrir o shot do Dribbble** (o site bloqueia acesso automatizado). A linguagem visual descrita no plano segue o padrão desse tipo de landing (tipografia gigante atrás do produto recortado, chips flutuantes, cards bem arredondados, botões em pílula, alternância entre seções claras e escuras). Vale comparar a seção 1 de [01-identidade-visual.md](01-identidade-visual.md) com o shot e ajustar o que divergir.
- Faltam alguns dados da empresa: e-mail, endereço/área de atendimento, horário, CNPJ e Instagram.

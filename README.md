# WS Tech Engenharia — Landing page

Site da WS Tech Engenharia: Next.js 16 (React 19) com exportação estática, Tailwind CSS v4 e animações com `motion`.
O plano completo de design, conteúdo e decisões está em [docs/](docs/README.md).

## Rodar localmente

Requer Node.js 20 ou mais recente.

```bash
npm install
npm run dev        # http://localhost:3000
```

## Gerar o site para publicação

```bash
npm run build      # gera a pasta out/ com HTML estático
npm start          # serve a pasta out/ localmente para conferir
```

A pasta `out/` pode ser publicada em qualquer hospedagem estática (Vercel, Netlify, Cloudflare Pages ou hospedagem compartilhada).

## GitHub Pages

O workflow [.github/workflows/deploy-pages.yml](.github/workflows/deploy-pages.yml) faz o build e publica a cada push na `main`
(também pode ser disparado manualmente em **Actions › Deploy no GitHub Pages › Run workflow**).

- Endereço: `https://maindan.github.io/wstech-engenharia/`. Como o site fica numa subpasta, o workflow define
  `NEXT_PUBLIC_BASE_PATH=/wstech-engenharia`. No código, toda imagem ou link escrito à mão deve usar `asset("/caminho")`
  (`src/lib/base-path.ts`), senão quebra no Pages.
- Variáveis opcionais (Web3Forms, AdSense, GA) vão em **Settings › Secrets and variables › Actions › Variables**, com os mesmos nomes do `.env.example`.
- **Domínio próprio:** configure em **Settings › Pages › Custom domain**. O caminho base passa a ser vazio automaticamente.
  Para o AdSense isso é obrigatório: o `ads.txt` precisa estar na raiz do domínio, e o AdSense não aprova subdomínios `github.io`.

## Configuração

Copie `.env.example` para `.env.local` e preencha:

| Variável | Para quê |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | Domínio final (SEO, sitemap, Open Graph) |
| `NEXT_PUBLIC_WEB3FORMS_KEY` | Chave do [Web3Forms](https://web3forms.com): sem ela o formulário mostra erro e sugere o WhatsApp |
| `NEXT_PUBLIC_ADSENSE_CLIENT` | ID do AdSense (`ca-pub-…`). Ativa o script, o `/ads.txt` e o banner de cookies |
| `NEXT_PUBLIC_ADSENSE_SLOT_1` / `_2` | Blocos de anúncio entre as seções. Vazios = nenhum espaço de anúncio aparece |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 (opcional) |

Na Vercel/Netlify, cadastre as mesmas variáveis no painel do projeto.

## Onde editar o conteúdo

| Arquivo | Conteúdo |
|---|---|
| `src/content/site.ts` | Nome, telefone, cidade, e-mail, horário, Instagram, CNPJ. **Campos `null` ficam ocultos no site** |
| `src/content/services.ts` | Serviços, serviços maiores, quadros de distribuição e passos do "Como funciona" |
| `src/content/gallery.ts` | Fotos da galeria (legenda, texto alternativo e categoria) |
| `src/content/faq-chat.ts` | Perguntas e respostas do chat simulado do WhatsApp |

Para adicionar uma foto à galeria, gere `nome-640.webp` e `nome-1080.webp` em `public/images/projetos/` e acrescente o item em `gallery.ts`.

## Pendências antes de publicar

- Preencher e-mail, horário, Instagram e CNPJ em `src/content/site.ts` e confirmar a cidade (Manaus).
- Criar a chave do Web3Forms e testar um envio real.
- Registrar o domínio e ajustar `NEXT_PUBLIC_SITE_URL`.
- Para o AdSense: publicar a seção de artigos ("Dicas") antes de pedir aprovação — ver [docs/07](docs/07-adsense-seo-performance.md).

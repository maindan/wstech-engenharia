# 09 — Pendências e Checklist

## 1. Informações que a empresa precisa fornecer

| # | Item | Onde é usado | Prioridade |
|---|---|---|---|
| 1 | **E-mail** que vai receber os contatos do formulário | Formulário (Web3Forms), seção Contato, footer, Política de Privacidade | Alta |
| 2 | **Cidade/área de atendimento** (o plano assume Manaus/AM pelo DDD 92) | Hero, SEO, JSON-LD, chat | Alta |
| 3 | **Horário de atendimento** e se há atendimento emergencial 24h | Contato, chat, JSON-LD | Alta |
| 4 | **Domínio** desejado (ex.: `wstechengenharia.com.br`) | Hospedagem, AdSense, SEO | Alta |
| 5 | **@ do Instagram** e outras redes | Galeria, footer, JSON-LD | Média |
| 6 | **CNPJ** e razão social | Footer, Política de Privacidade | Média |
| 7 | Se possui responsável técnico com registro no **CREA** e/ou equipe com **NR-10** | Pode virar um diferencial forte no "Por que a WS Tech" (só publicar se for verdade) | Média |
| 8 | Confirmar o "ideal para" de cada quadro (8/16/24 circuitos) e se querem publicar **preços** (o banner traz "apenas 08 circuitos", que parece texto provisório) | Seção Quadros de distribuição | Média |
| 9 | Mais fotos reais de serviços (antes/depois, padrões, iluminação) | Galeria | Média |
| 10 | Logo em vetor (SVG/AI/PDF), se existir o arquivo original — já há uma versão vetorizada pronta, então isso é opcional | Header, footer, favicon | Baixa |
| 11 | Tempo de experiência, número de serviços realizados, depoimentos de clientes (com autorização) | Pode virar números e depoimentos reais na faixa de destaques | Baixa |
| 12 | Quem vai escrever/revisar os artigos de "Dicas" | Aprovação no AdSense | Média |

## 2. Tarefas antes de começar o código

- [x] Remover o fundo da imagem do técnico → `assets/tratadas/tecnico/`
- [x] Vetorizar a logo e gerar as versões colorida, negativa e símbolo → `assets/tratadas/logo/`
- [ ] (Opcional) Gerar de novo a imagem do técnico em 2048px+ se o hero do desktop pedir mais nitidez
- [ ] Renomear e tratar as fotos conforme [08-assets.md](08-assets.md)
- [ ] Comparar o shot do Dribbble com a seção 1 de [01-identidade-visual.md](01-identidade-visual.md) e ajustar o que divergir (o shot não pôde ser aberto durante o planejamento)
- [ ] Registrar o domínio
- [ ] Criar conta no Web3Forms e no Cloudflare Turnstile
- [ ] Preencher as pendências da tabela acima

## 3. Checklist de entrega (fase de desenvolvimento)

Itens marcados foram verificados em 21/10/2026 no build estático, com testes automatizados (Playwright) em 390×844 (celular) e 1440×900 (desktop). Itens sem marca ainda precisam de teste manual ou dependem de dados/contas da empresa.

**Layout e mobile**
- [ ] Testado em 360, 390, 430, 768, 1024 e 1440px
- [x] Sem rolagem horizontal (verificado em 390 e 1440px)
- [ ] Alvos de toque ≥ 44px
- [x] Menu mobile: abre, fecha e navega até a seção certa (Esc e foco preso vêm do Radix Dialog; conferir manualmente)
- [ ] Botão do WhatsApp não cobre conteúdo nem os links do footer; respeita a área segura do iPhone
- [ ] Teste em iPhone (Safari) e Android (Chrome) reais

**Funcionalidades**
- [ ] Link ativo do menu acompanha a rolagem
- [x] Chat do WhatsApp: opções respondem e o link sai com a mensagem certa (testado com "Emergência" e "Orçamento")
- [ ] Links "Pedir orçamento" de cada card levam o nome do serviço
- [x] Formulário: validações, foco no primeiro erro e máscara de telefone
- [ ] Formulário: envio real recebido no e-mail (precisa da chave do Web3Forms) e Turnstile (não implementado)
- [ ] Galeria: filtros, lightbox, swipe

**Animações**
- [ ] Todas as animações da lista em [05-animacoes.md](05-animacoes.md) implementadas
- [ ] Com "reduzir movimento" ativado no sistema: só *fades*, sem parallax nem loops
- [ ] Sem travamentos ao rolar em Android intermediário

**Acessibilidade**
- [ ] Contrastes conforme a tabela de [01](01-identidade-visual.md#contraste-wcag--validado)
- [ ] Navegação completa por teclado com foco visível (anel amarelo)
- [x] `alt` em todas as imagens; um único `h1`; hierarquia de títulos correta
- [ ] Testado com leitor de tela (TalkBack ou VoiceOver) no menu, no chat e no formulário

**SEO e AdSense**
- [x] Title, description, canonical e Open Graph em todas as páginas
- [ ] JSON-LD `Electrician` válido no [Teste de pesquisa aprimorada](https://search.google.com/test/rich-results)
- [x] `sitemap.xml`, `robots.txt` e `ads.txt` gerados no build (`ads.txt` só fica válido com o ID do AdSense configurado)
- [x] Política de Privacidade (com a menção ao AdSense) e Termos de Uso
- [ ] Banner de cookies + Consent Mode v2 funcionando
- [ ] Seção Dicas com 8–10 artigos publicada **antes** de solicitar a aprovação
- [ ] Nenhum link quebrado, nenhuma página "em construção"
- [ ] Site enviado ao Google Search Console
- [x] Slots de anúncio com espaço reservado (sem CLS) e longe de botões (implementado; testar com anúncios reais)
- [ ] Anúncios âncora e vinheta desativados no painel (fase 1)

**Desempenho**
- [ ] Lighthouse mobile ≥ 90 em Performance, Acessibilidade, Boas práticas e SEO
- [ ] LCP < 2,5s, CLS < 0,1, INP < 200ms

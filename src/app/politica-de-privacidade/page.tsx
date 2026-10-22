import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como a ${site.name} coleta, usa e protege seus dados pessoais, incluindo o uso de cookies e do Google AdSense.`,
  alternates: { canonical: `${site.url}/politica-de-privacidade/` },
};

export default function PrivacyPage() {
  const contact = site.email ? <a href={`mailto:${site.email}`}>{site.email}</a> : <>o WhatsApp {site.phoneDisplay}</>;

  return (
    <LegalPage title="Política de Privacidade" updated="21 de outubro de 2026">
      <p>
        Esta política explica como a <strong>{site.name}</strong>
        {site.cnpj && <>, inscrita no CNPJ {site.cnpj},</>} trata os dados pessoais de quem visita este site, em conformidade com
        a Lei Geral de Proteção de Dados (Lei nº 13.709/2018 — LGPD).
      </p>

      <h2>1. Quem é o responsável pelos dados</h2>
      <p>
        O controlador dos dados é a {site.name}. Para qualquer assunto sobre privacidade, fale com a gente por {contact}.
      </p>

      <h2>2. Quais dados coletamos</h2>
      <ul>
        <li>
          <strong>Formulário de contato:</strong> nome, telefone, e-mail, serviço desejado, bairro/cidade (opcional) e a mensagem
          que você escrever.
        </li>
        <li>
          <strong>Conversa simulada do WhatsApp:</strong> as opções escolhidas e o texto digitado ficam apenas no seu navegador
          durante a visita e não são enviados a nós. Ao tocar em “Continuar no WhatsApp”, você é levado ao aplicativo do WhatsApp,
          que tem sua própria política de privacidade.
        </li>
        <li>
          <strong>Dados de navegação:</strong> se você permitir, coletamos estatísticas de uso (páginas vistas, cliques e tipo de
          dispositivo) e cookies de publicidade, conforme a seção 4.
        </li>
      </ul>

      <h2>3. Para que usamos os dados</h2>
      <ul>
        <li>Responder ao seu contato e elaborar orçamentos;</li>
        <li>Entender como o site é usado para melhorá-lo;</li>
        <li>Exibir anúncios que ajudam a manter o site.</li>
      </ul>
      <p>
        A base legal é o seu consentimento (formulário e cookies opcionais) e os procedimentos preliminares a um contrato
        (orçamento). Não vendemos seus dados.
      </p>

      <h2>4. Cookies e publicidade (Google AdSense)</h2>
      <p>
        Este site pode exibir anúncios do Google AdSense. Fornecedores terceiros, incluindo o Google, usam cookies para exibir
        anúncios com base em visitas anteriores do usuário a este e a outros sites. O uso de cookies de publicidade permite que o
        Google e seus parceiros veiculem anúncios com base nessas visitas.
      </p>
      <p>
        Você pode desativar a publicidade personalizada nas{" "}
        <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer">
          Configurações de anúncios do Google
        </a>{" "}
        e conhecer outros fornecedores e como desativá-los em{" "}
        <a href="https://www.aboutads.info" target="_blank" rel="noopener noreferrer">
          www.aboutads.info
        </a>
        . Saiba mais sobre como o Google usa dados em{" "}
        <a href="https://policies.google.com/technologies/partner-sites" target="_blank" rel="noopener noreferrer">
          policies.google.com/technologies/partner-sites
        </a>
        .
      </p>
      <p>
        Cookies de estatística (Google Analytics) e de publicidade só são ativados depois do seu consentimento no aviso de
        cookies. Você pode mudar sua escolha a qualquer momento pelo link “Preferências de cookies” no rodapé. Sem consentimento,
        podem ser exibidos apenas anúncios não personalizados.
      </p>

      <h2>5. Com quem compartilhamos</h2>
      <ul>
        <li>
          <strong>Web3Forms</strong>: serviço que entrega as mensagens do formulário no nosso e-mail;
        </li>
        <li>
          <strong>Google</strong>: Analytics e AdSense, quando consentidos;
        </li>
        <li>
          <strong>WhatsApp (Meta)</strong>: quando você escolhe continuar a conversa por lá;
        </li>
        <li>Autoridades públicas, quando exigido por lei.</li>
      </ul>

      <h2>6. Por quanto tempo guardamos</h2>
      <p>
        As mensagens do formulário são mantidas pelo tempo necessário para o atendimento e o orçamento e, se resultarem em um
        serviço contratado, pelo prazo exigido pela legislação.
      </p>

      <h2>7. Seus direitos</h2>
      <p>
        Pela LGPD, você pode pedir a confirmação do tratamento, o acesso, a correção, a anonimização, a portabilidade e a exclusão
        dos seus dados, além de revogar o consentimento. Basta entrar em contato por {contact}.
      </p>

      <h2>8. Segurança</h2>
      <p>
        O site usa conexão criptografada (HTTPS) e não armazena os dados do formulário em servidor próprio. Se ocorrer algum
        incidente de segurança relevante, você será informado.
      </p>

      <h2>9. Alterações</h2>
      <p>Esta política pode ser atualizada. A data no topo da página indica a versão mais recente.</p>
    </LegalPage>
  );
}

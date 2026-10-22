import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/content/site";
import { asset } from "@/lib/base-path";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: `Condições de uso do site da ${site.name}.`,
  alternates: { canonical: `${site.url}/termos-de-uso/` },
};

export default function TermsPage() {
  return (
    <LegalPage title="Termos de Uso" updated="21 de outubro de 2026">
      <p>Ao acessar este site, você concorda com os termos abaixo. Se não concordar, recomendamos não utilizá-lo.</p>

      <h2>1. Sobre o site</h2>
      <p>
        Este site apresenta os serviços elétricos da {site.name} e oferece canais para contato e pedido de orçamento. As
        informações têm caráter informativo e podem mudar sem aviso prévio.
      </p>

      <h2>2. Orçamentos e serviços</h2>
      <p>
        Os textos do site não constituem proposta comercial. Prazos, valores e condições de cada serviço são definidos no
        orçamento enviado após a avaliação do local ou das informações fornecidas pelo cliente.
      </p>

      <h2>3. Informações técnicas</h2>
      <p>
        As orientações publicadas aqui são gerais e não substituem a avaliação de um profissional habilitado no local. Instalações
        elétricas envolvem risco de choque e incêndio: em caso de dúvida, desligue o disjuntor geral e procure um eletricista.
      </p>

      <h2>4. Conversa simulada do WhatsApp</h2>
      <p>
        A janela de conversa do site traz respostas automáticas para dúvidas frequentes. O atendimento por um técnico acontece no
        WhatsApp, depois que você escolhe continuar a conversa por lá.
      </p>

      <h2>5. Propriedade intelectual</h2>
      <p>
        A marca, a logo, os textos e as fotos de serviços realizados pertencem à {site.name}. É proibido copiá-los ou usá-los sem
        autorização.
      </p>

      <h2>6. Links e anúncios de terceiros</h2>
      <p>
        O site pode conter anúncios e links para sites de terceiros. Não nos responsabilizamos pelo conteúdo, pelos produtos ou
        pelas práticas de privacidade desses sites.
      </p>

      <h2>7. Privacidade</h2>
      <p>
        O tratamento de dados pessoais segue a nossa <a href={asset("/politica-de-privacidade/")}>Política de Privacidade</a>.
      </p>

      <h2>8. Legislação</h2>
      <p>Estes termos são regidos pelas leis brasileiras.</p>
    </LegalPage>
  );
}

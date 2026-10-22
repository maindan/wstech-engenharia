import { site } from "./site";

export type ChatOption = {
  id: string;
  label: string;
  answer: string;
  prefill: string;
};

const hoursAnswer = site.hours
  ? `Nosso horário: ${site.hours.map((h) => h.label).join(" · ")}. Emergências: consulte disponibilidade pelo WhatsApp.`
  : "Fale com a gente pelo WhatsApp para combinar o melhor dia e horário. Emergências: consulte disponibilidade.";

export const chatGreeting = [
  "Olá! 👋 Aqui é a WS Tech Engenharia.",
  "Como podemos ajudar? Escolha uma opção abaixo para ver a resposta na hora:",
];

export const chatFollowUp = "Quer continuar a conversa com um técnico?";

export const chatOptions: ChatOption[] = [
  {
    id: "orcamento",
    label: "💡 Quero um orçamento",
    answer:
      "O orçamento é gratuito e sem compromisso! Conte o serviço e, se puder, envie fotos do local. Respondemos o mais rápido possível.",
    prefill: "Olá! Gostaria de um orçamento.",
  },
  {
    id: "emergencia",
    label: "🚨 É uma emergência",
    answer:
      "Entendido! Se houver cheiro de queimado, faísca ou fio derretido, desligue o disjuntor geral e se afaste do local. Chame a gente agora pelo WhatsApp para atendimento prioritário.",
    prefill: "Olá! Preciso de atendimento EMERGENCIAL.",
  },
  {
    id: "servicos",
    label: "🔌 Quais serviços vocês fazem?",
    answer:
      "Quadros elétricos, troca de disjuntores, tomadas e interruptores, luminárias, ventiladores de teto, diagnóstico e reparos, padrões bifásico e trifásico e instalações residenciais e comerciais.",
    prefill: "Olá! Gostaria de saber mais sobre os serviços.",
  },
  {
    id: "quadros",
    label: "🗂️ Quadro de distribuição",
    answer:
      "Montamos quadros de 8, 16 e 24 circuitos, com tudo identificado. Diga quantos ambientes e aparelhos tem o local que indicamos o ideal.",
    prefill: "Olá! Quero orçamento de um quadro de distribuição.",
  },
  {
    id: "padrao",
    label: "⚡ Padrão de entrada",
    answer: "Instalamos padrão bifásico e trifásico, prontos para a vistoria da concessionária.",
    prefill: "Olá! Preciso instalar um padrão de entrada.",
  },
  {
    id: "local",
    label: "📍 Onde vocês atendem?",
    answer: `Atendemos ${site.serviceArea}. Envie seu bairro para confirmarmos a disponibilidade.`,
    prefill: "Olá! Vocês atendem no meu bairro?",
  },
  {
    id: "horario",
    label: "🕘 Horário de atendimento",
    answer: hoursAnswer,
    prefill: "Olá! Gostaria de agendar um atendimento.",
  },
];

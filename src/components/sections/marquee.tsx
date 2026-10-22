import { Bolt } from "@/components/ui/section-heading";
import { cn } from "@/lib/cn";

const itemsA = [
  "Quadros elétricos",
  "Padrão trifásico",
  "Troca de disjuntores",
  "Atendimento emergencial",
  "Iluminação LED",
  "Padrão bifásico",
];
const itemsB = [
  "Residencial",
  "Comercial",
  "Diagnóstico",
  "Tomadas e interruptores",
  "Ventiladores de teto",
  "Orçamento sem compromisso",
];

function Track({ items, reverse, className }: { items: string[]; reverse?: boolean; className?: string }) {
  // Conteúdo duplicado para o loop ficar contínuo (anima de 0 a -50%)
  const row = [...items, ...items];
  return (
    <div className={cn("flex w-max items-center", reverse ? "animate-marquee-reverse" : "animate-marquee", className)}>
      {row.map((t, i) => (
        <span
          key={i}
          className="flex items-center gap-6 pr-6 font-display font-extrabold tracking-[-0.01em] whitespace-nowrap uppercase"
        >
          {t}
          <Bolt className="size-5 shrink-0" />
        </span>
      ))}
    </div>
  );
}

// Duas faixas cruzadas rolando em sentidos opostos, entre o hero escuro e a seção clara.
export function Marquee() {
  return (
    <div
      aria-hidden
      className="relative z-20 -mt-10 overflow-hidden bg-[linear-gradient(to_bottom,var(--color-navy-950)_50%,var(--color-paper)_50%)] py-10"
    >
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] bg-navy-800 py-3 text-navy-200 [--marquee-duration:55s]">
        <Track items={itemsB} reverse className="text-sm lg:text-base" />
      </div>
      <div className="relative -mx-[5%] -rotate-2 bg-yellow-500 py-3.5 text-navy-900 shadow-[0_20px_40px_-15px_rgb(1_26_46/0.5)] [--marquee-duration:40s] lg:py-4">
        <Track items={itemsA} className="text-lg lg:text-2xl" />
      </div>
    </div>
  );
}

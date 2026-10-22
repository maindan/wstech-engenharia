import { ButtonLink } from "@/components/ui/button";
import { asset } from "@/lib/base-path";

export default function NotFound() {
  return (
    <main className="grid min-h-[100svh] place-items-center bg-navy-950 px-5 text-center text-white">
      <div>
        <img src={asset("/images/brand/simbolo-negativo.svg")} alt="" className="mx-auto h-20 w-auto" />
        <p className="mt-8 font-display text-[5rem] leading-none font-extrabold text-yellow-500">404</p>
        <h1 className="mt-4 text-2xl font-bold">Página não encontrada</h1>
        <p className="mt-3 text-navy-200">Parece que este circuito está desligado.</p>
        <ButtonLink href={asset("/")} withArrow className="mt-8">
          Voltar ao início
        </ButtonLink>
      </div>
    </main>
  );
}

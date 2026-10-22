import type { ReactNode } from "react";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <>
      <Header home={false} />
      <main id="conteudo" className="bg-paper pt-28 pb-24 lg:pt-36">
        <article className="container-site max-w-[760px]">
          <p className="eyebrow text-yellow-700">Documento legal</p>
          <h1 className="mt-3 text-[clamp(2rem,4vw+1rem,3rem)] leading-tight font-extrabold tracking-[-0.02em] text-navy-800">
            {title}
          </h1>
          <p className="mt-3 text-sm text-graphite">Última atualização: {updated}</p>
          <div className="mt-10 space-y-5 leading-relaxed text-ink/90 [&_a]:font-semibold [&_a]:text-navy-800 [&_a]:underline [&_a]:underline-offset-2 [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-navy-800 [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-2">
            {children}
          </div>
        </article>
      </main>
      <Footer home={false} />
    </>
  );
}

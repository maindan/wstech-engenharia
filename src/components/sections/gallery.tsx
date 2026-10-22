"use client";

import { AnimatePresence, LayoutGroup, m } from "motion/react";
import { Expand } from "lucide-react";
import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { InstagramIcon } from "@/components/icons/brand-icons";
import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { useWhatsApp } from "@/components/whatsapp/whatsapp-context";
import { gallery, galleryCategories } from "@/content/gallery";
import { site } from "@/content/site";
import { cn } from "@/lib/cn";
import { spring } from "@/lib/motion";

const GalleryLightbox = dynamic(() => import("./gallery-lightbox"), { ssr: false });

type Filter = (typeof galleryCategories)[number];

// Tamanhos do mosaico (só na aba "Todos"): 1 grande, 1 alta e 1 larga
const mosaic: Record<number, string> = {
  0: "col-span-2 row-span-2",
  2: "lg:row-span-2",
  4: "lg:col-span-2",
};

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("Todos");
  const [index, setIndex] = useState(-1);
  const { openChat } = useWhatsApp();
  const items = useMemo(() => (filter === "Todos" ? gallery : gallery.filter((g) => g.category === filter)), [filter]);

  return (
    <section id="projetos" aria-labelledby="projetos-title" className="section-y relative isolate overflow-hidden bg-navy-950">
      <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(70%_50%_at_100%_0%,#0a4a7a_0%,transparent_60%)]" />
      <div aria-hidden className="bg-circuit absolute inset-0 -z-10 opacity-[0.05]" />
      <div aria-hidden className="bg-noise pointer-events-none absolute inset-0 -z-10 opacity-[0.1]" />
      <p
        aria-hidden
        className="text-outline-thin pointer-events-none absolute -top-4 right-0 -z-10 font-display text-[clamp(5rem,16vw,15rem)] leading-none font-extrabold tracking-[-0.04em] text-white/[0.07] select-none"
      >
        PROJETOS
      </p>
      <div className="container-site relative">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            id="projetos-title"
            theme="dark"
            index="06"
            eyebrow="Projetos"
            title={
              <>
                Serviços <em>realizados</em>
              </>
            }
            lead="Alguns dos trabalhos que entregamos. Organização, acabamento e segurança em cada detalhe."
          />

          <LayoutGroup id="gallery-filter">
            <div
              role="tablist"
              aria-label="Filtrar projetos"
              className="no-scrollbar -mx-5 flex gap-2 overflow-x-auto px-5 lg:mx-0 lg:shrink-0 lg:px-0"
            >
              {galleryCategories.map((cat) => {
                const selected = filter === cat;
                const count = cat === "Todos" ? gallery.length : gallery.filter((g) => g.category === cat).length;
                return (
                  <button
                    key={cat}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setFilter(cat)}
                    className={cn(
                      "relative min-h-11 shrink-0 rounded-full px-4 font-display text-sm font-semibold transition-colors",
                      selected ? "text-navy-900" : "text-white/80 hover:text-white",
                    )}
                  >
                    {selected && (
                      <m.span
                        layoutId="gallery-pill"
                        transition={spring.snappy}
                        className="absolute inset-0 rounded-full bg-yellow-500"
                      />
                    )}
                    {!selected && <span className="absolute inset-0 rounded-full border border-white/15" />}
                    <span className="relative">
                      {cat} <span className={cn("ml-0.5 text-xs", selected ? "text-navy-900/70" : "text-white/50")}>{count}</span>
                    </span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        <m.ul
          layout
          className="mt-10 grid grid-flow-dense auto-rows-[168px] grid-cols-2 gap-3 sm:auto-rows-[240px] sm:gap-4 lg:mt-14 lg:auto-rows-[230px] lg:grid-cols-4 lg:gap-5"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {items.map((item, i) => (
              <m.li
                key={item.src}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.85 }}
                transition={spring.soft}
                className={cn(filter === "Todos" && mosaic[i])}
              >
                <Reveal delay={(i % 4) * 0.07} className="h-full">
                  <button
                    type="button"
                    onClick={() => setIndex(gallery.indexOf(item))}
                    className="group relative block size-full overflow-hidden rounded-[20px] bg-navy-800 text-left lg:rounded-[28px]"
                    aria-label={`Ampliar foto: ${item.caption}`}
                  >
                    <img
                      src={`${item.src}-640.webp`}
                      srcSet={`${item.src}-640.webp 640w, ${item.src}-1080.webp 1080w`}
                      sizes={filter === "Todos" && i === 0 ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, 50vw"}
                      alt={item.alt}
                      width={item.width}
                      height={item.height}
                      loading="lazy"
                      decoding="async"
                      className="size-full object-cover transition-transform duration-700 ease-out-quint group-hover:scale-[1.06]"
                    />
                    <span
                      className="absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-navy-950/90 via-navy-950/40 to-transparent"
                      aria-hidden
                    />
                    <span
                      className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur transition-opacity duration-300 group-hover:opacity-100 max-lg:hidden"
                      aria-hidden
                    >
                      <Expand className="size-4" />
                    </span>
                    <span className="absolute inset-x-0 bottom-0 p-3 sm:p-5 lg:translate-y-2 lg:transition-transform lg:duration-300 lg:group-hover:translate-y-0">
                      <span className="eyebrow block text-[0.625rem] text-yellow-500 sm:text-[0.6875rem]">{item.category}</span>
                      <span className="mt-1 block font-display text-[0.8125rem] leading-snug font-bold text-white sm:text-base">
                        {item.caption}
                      </span>
                    </span>
                  </button>
                </Reveal>
              </m.li>
            ))}
          </AnimatePresence>
        </m.ul>

        <Reveal className="mt-14 flex flex-col items-center gap-5 text-center sm:flex-row sm:justify-center">
          <p className="font-display text-lg font-bold text-white">
            Gostou do resultado? <span className="text-yellow-500">Vamos fazer o seu.</span>
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button withArrow onClick={() => openChat("gallery")}>
              Peça seu orçamento
            </Button>
            {site.instagram && (
              <a
                href={site.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-14 items-center justify-center gap-2 rounded-full border-2 border-white/30 px-6 font-display font-bold text-white transition hover:border-white"
              >
                <InstagramIcon className="size-5" /> Siga no Instagram
              </a>
            )}
          </div>
        </Reveal>
      </div>

      {index >= 0 && <GalleryLightbox index={index} onClose={() => setIndex(-1)} />}
    </section>
  );
}

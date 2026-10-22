import { AdSlot } from "@/components/ads/ad-slot";
import { LocalBusinessJsonLd } from "@/components/json-ld";
import { Footer } from "@/components/layout/footer";
import { Header } from "@/components/layout/header";
import { BigServices } from "@/components/sections/big-services";
import { Contact } from "@/components/sections/contact";
import { CtaBand } from "@/components/sections/cta-band";
import { Gallery } from "@/components/sections/gallery";
import { Hero } from "@/components/sections/hero";
import { Marquee } from "@/components/sections/marquee";
import { Panels } from "@/components/sections/panels";
import { Process } from "@/components/sections/process";
import { Services } from "@/components/sections/services";
import { WhyUs } from "@/components/sections/why-us";

export default function Home() {
  return (
    <>
      <LocalBusinessJsonLd />
      <Header />
      <main id="conteudo">
        <Hero />
        <Marquee />
        <WhyUs />

        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_1} />

        <section id="servicos" aria-labelledby="servicos-title">
          <Services />
          <BigServices />
          <Panels />
          <Process />
        </section>

        <Gallery />

        <AdSlot slot={process.env.NEXT_PUBLIC_ADSENSE_SLOT_2} />

        <CtaBand />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

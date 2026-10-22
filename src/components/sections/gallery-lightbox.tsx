"use client";

import Lightbox from "yet-another-react-lightbox";
import Captions from "yet-another-react-lightbox/plugins/captions";
import Counter from "yet-another-react-lightbox/plugins/counter";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import "yet-another-react-lightbox/styles.css";
import "yet-another-react-lightbox/plugins/captions.css";
import "yet-another-react-lightbox/plugins/counter.css";
import { gallery } from "@/content/gallery";

const slides = gallery.map((g) => ({
  src: `${g.src}-1080.webp`,
  width: g.width,
  height: g.height,
  alt: g.alt,
  title: g.caption,
  description: g.category,
  srcSet: [
    { src: `${g.src}-640.webp`, width: 640, height: Math.round((g.height * 640) / g.width) },
    { src: `${g.src}-1080.webp`, width: g.width, height: g.height },
  ],
}));

export default function GalleryLightbox({ index, onClose }: { index: number; onClose: () => void }) {
  return (
    <Lightbox
      open
      index={index}
      close={onClose}
      slides={slides}
      plugins={[Captions, Counter, Zoom]}
      animation={{ fade: 300, swipe: 400 }}
      controller={{ closeOnBackdropClick: true, closeOnPullDown: true }}
      carousel={{ finite: false }}
      labels={{
        Previous: "Foto anterior",
        Next: "Próxima foto",
        Close: "Fechar",
        "Zoom in": "Aumentar zoom",
        "Zoom out": "Diminuir zoom",
      }}
      styles={{ container: { backgroundColor: "rgb(1 26 46 / 0.96)" } }}
    />
  );
}

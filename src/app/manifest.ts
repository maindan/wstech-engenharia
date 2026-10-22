import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { asset } from "@/lib/base-path";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.name,
    short_name: site.shortName,
    description: site.description,
    start_url: asset("/"),
    display: "standalone",
    background_color: "#f4f4f1",
    theme_color: "#023960",
    lang: "pt-BR",
    icons: [
      { src: asset("/images/brand/icon-192.png"), sizes: "192x192", type: "image/png" },
      { src: asset("/images/brand/icon-512.png"), sizes: "512x512", type: "image/png" },
    ],
  };
}

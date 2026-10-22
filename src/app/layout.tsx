import type { Metadata, Viewport } from "next";
import { Inter, Montserrat } from "next/font/google";
import type { ReactNode } from "react";
import { GoogleScripts } from "@/components/layout/google-scripts";
import { Providers } from "@/components/providers";
import { site } from "@/content/site";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-montserrat",
  display: "swap",
});
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-inter", display: "swap" });

const title = `${site.name} | Eletricista e Serviços Elétricos em ${site.city}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: title, template: `%s | ${site.name}` },
  description: site.description,
  applicationName: site.name,
  alternates: { canonical: `${site.url}/` },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: `${site.url}/`,
    siteName: site.name,
    title: `${site.name} — Energia segura, instalação bem feita`,
    description: site.description,
    images: [{ url: `${site.url}/og-image.jpg`, width: 1200, height: 630, alt: site.name }],
  },
  twitter: { card: "summary_large_image", title, description: site.description, images: [`${site.url}/og-image.jpg`] },
  formatDetection: { telephone: false },
  ...(process.env.NEXT_PUBLIC_ADSENSE_CLIENT && { other: { "google-adsense-account": process.env.NEXT_PUBLIC_ADSENSE_CLIENT } }),
};

export const viewport: Viewport = {
  themeColor: "#023960",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pt-BR" className={`${montserrat.variable} ${inter.variable}`}>
      <body>
        <GoogleScripts />
        <a
          href="#conteudo"
          className="sr-only z-[100] rounded-full bg-yellow-500 px-5 py-3 font-display font-bold text-navy-800 focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Pular para o conteúdo
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}

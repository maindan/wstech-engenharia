import { bigServices, services } from "@/content/services";
import { site } from "@/content/site";

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Electrician",
    "@id": `${site.url}/#empresa`,
    name: site.name,
    description: site.description,
    url: `${site.url}/`,
    image: `${site.url}/og-image.jpg`,
    logo: `${site.url}/images/brand/icon-512.png`,
    telephone: site.phoneE164,
    ...(site.email && { email: site.email }),
    priceRange: "$$",
    areaServed: { "@type": "City", name: site.city },
    address: { "@type": "PostalAddress", addressLocality: site.city, addressRegion: site.region, addressCountry: "BR" },
    ...(site.instagram && { sameAs: [site.instagram] }),
    ...(site.hours && {
      openingHoursSpecification: site.hours.map((h) => ({
        "@type": "OpeningHoursSpecification",
        dayOfWeek: h.days,
        opens: h.opens,
        closes: h.closes,
      })),
    }),
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços elétricos",
      itemListElement: [...services.map((s) => s.title), ...bigServices.map((s) => `${s.title} ${s.accent}`)].map((name) => ({
        "@type": "Offer",
        itemOffered: { "@type": "Service", name },
      })),
    },
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

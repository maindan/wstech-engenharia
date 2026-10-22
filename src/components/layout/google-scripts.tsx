import Script from "next/script";

const adsClient = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;
const gaId = process.env.NEXT_PUBLIC_GA_ID;

// Consent Mode v2: tudo negado até o visitante escolher; reaplica a escolha salva.
const consentDefault = `
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied', analytics_storage: 'denied', wait_for_update: 500 });
try {
  var c = JSON.parse(localStorage.getItem('wstech-consent') || 'null');
  if (c) gtag('consent', 'update', { analytics_storage: c.analytics ? 'granted' : 'denied', ad_storage: c.ads ? 'granted' : 'denied', ad_user_data: c.ads ? 'granted' : 'denied', ad_personalization: c.ads ? 'granted' : 'denied' });
} catch (e) {}
`;

export function GoogleScripts() {
  return (
    <>
      <Script id="consent-default" strategy="beforeInteractive">
        {consentDefault}
      </Script>
      {gaId && (
        <>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`} strategy="afterInteractive" />
          <Script id="ga-config" strategy="afterInteractive">
            {`gtag('js', new Date()); gtag('config', '${gaId}');`}
          </Script>
        </>
      )}
      {adsClient && (
        <Script
          id="adsense"
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${adsClient}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
      )}
    </>
  );
}

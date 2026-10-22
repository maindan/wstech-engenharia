// Banner de cookies e scripts do Google só existem quando algum deles estiver configurado.
export const trackingEnabled = Boolean(process.env.NEXT_PUBLIC_ADSENSE_CLIENT || process.env.NEXT_PUBLIC_GA_ID);

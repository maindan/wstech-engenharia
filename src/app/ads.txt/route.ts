export const dynamic = "force-static";

// Gera /ads.txt a partir do ID do AdSense (exigido para monetizar).
export function GET() {
  const client = process.env.NEXT_PUBLIC_ADSENSE_CLIENT?.replace(/^ca-/, "");
  const body = client
    ? `google.com, ${client}, DIRECT, f08c47fec0942fa0\n`
    : "# Configure NEXT_PUBLIC_ADSENSE_CLIENT para gerar este arquivo\n";
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}

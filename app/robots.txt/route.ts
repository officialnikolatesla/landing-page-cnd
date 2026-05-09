export function GET() {
  const base = process.env.NEXT_PUBLIC_SITE_URL ?? "https://yourdomain.com"
  const body = `User-agent: *\nAllow: /\nDisallow: /api/\n\nSitemap: ${base}/sitemap.xml\n`
  return new Response(body, {
    headers: { "Content-Type": "text/plain" },
  })
}

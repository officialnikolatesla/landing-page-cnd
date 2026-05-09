export const dynamic = "force-dynamic"

export async function GET() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/sitemap`, {
    next: { revalidate: 3600 },
  })

  if (!res.ok) {
    return new Response("Failed to fetch sitemap", { status: 502 })
  }

  const xml = await res.text()
  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  })
}

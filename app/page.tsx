import type { Metadata } from "next"

import { FeaturesSection } from "@/components/home/features-section"
import { HeroSection } from "@/components/home/hero-section"
import { NavbarShell } from "@/components/layout/navbar-shell"
import { JsonLd } from "@/components/seo/json-ld"
import { getHomePageMetadata, getRedirectUrl, getLandingPageMetadata } from "@/lib/seo-metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata()
}

export default async function HomePage() {
  const [landingMeta, redirectUrl] = await Promise.all([
    getLandingPageMetadata(),
    getRedirectUrl(),
  ])

  return (
    <>
      {landingMeta?.schema_jsonld ? <JsonLd data={landingMeta.schema_jsonld} /> : null}
      <NavbarShell />
      <main>
        <HeroSection redirectUrl={redirectUrl} />
        <FeaturesSection />
      </main>
    </>
  )
}

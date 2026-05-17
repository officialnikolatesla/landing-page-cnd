import type { Metadata } from "next"

import { FeaturesSection } from "@/components/home/features-section"
import { HeroSection } from "@/components/home/hero-section"
import { Navbar } from "@/components/layout/navbar"
import { JsonLd } from "@/components/seo/json-ld"
import { getHomePageMetadata, getLandingPageMetadata } from "@/lib/seo-metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata()
}

export default async function HomePage() {
  const landingMeta = await getLandingPageMetadata()

  return (
    <>
      {landingMeta?.schema_jsonld ? <JsonLd data={landingMeta.schema_jsonld} /> : null}
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </>
  )
}

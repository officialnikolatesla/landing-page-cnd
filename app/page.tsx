import type { Metadata } from "next"

import { FeaturesSection } from "@/components/home/features-section"
import { HeroSection } from "@/components/home/hero-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { PromoSection } from "@/components/home/promo-section"
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
  const keywords = landingMeta?.target_keywords?.length
    ? landingMeta.target_keywords
    : landingMeta?.meta_keywords

  return (
    <>
      {landingMeta?.schema_jsonld ? <JsonLd data={landingMeta.schema_jsonld} /> : null}
      <NavbarShell />
      <main>
        <HeroSection redirectUrl={redirectUrl} keywords={keywords} />
        <PromoSection redirectUrl={redirectUrl} />
        <HowItWorksSection redirectUrl={redirectUrl} />
        <FeaturesSection />
      </main>
    </>
  )
}

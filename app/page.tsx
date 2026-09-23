import type { Metadata } from "next"

import { ArticlesSection } from "@/components/home/articles-section"
import { HeroSection } from "@/components/home/hero-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { CtaBannerSection } from "@/components/home/cta-banner-section"
import { NavbarShell } from "@/components/layout/navbar-shell"
import { Footer } from "@/components/layout/footer"
import { JsonLd } from "@/components/seo/json-ld"
import { getArticles } from "@/lib/api"
import {
  getHomePageMetadata,
  getRedirectUrl,
  getLandingPageMetadata,
} from "@/lib/seo-metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getHomePageMetadata()
}

export default async function HomePage() {
  const [landingMeta, redirectUrl, articleData] = await Promise.all([
    getLandingPageMetadata(),
    getRedirectUrl(),
    getArticles(1, 3).catch(() => null),
  ])
  const keywords = landingMeta?.target_keywords?.length
    ? landingMeta.target_keywords
    : landingMeta?.meta_keywords

  return (
    <>
      {landingMeta?.schema_jsonld ? (
        <JsonLd data={landingMeta.schema_jsonld} />
      ) : null}
      <NavbarShell />
      <main>
        <HeroSection redirectUrl={redirectUrl} keywords={keywords} />
        <HowItWorksSection redirectUrl={redirectUrl} />
        <ArticlesSection articles={articleData?.items ?? []} />
        <CtaBannerSection redirectUrl={redirectUrl} />
      </main>
      <Footer />
    </>
  )
}

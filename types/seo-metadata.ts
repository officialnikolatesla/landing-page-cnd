export type LandingPageMetadata = {
  meta_title: string
  meta_description: string
  meta_keywords: string[]
  canonical_url: string
  robots: string
  og_title: string
  og_description: string
  og_type: string
  og_url: string
  og_locale: string
  og_site_name: string
  twitter_card: string
  twitter_title: string
  twitter_description: string
  schema_jsonld: Record<string, unknown>
  target_keywords: string[]
}

export type LandingPageMetadataResponse = {
  metadata: LandingPageMetadata
  redirectUrl: string
  fromCache: boolean
  generatedAt: string | null
  sourceHash: string
}

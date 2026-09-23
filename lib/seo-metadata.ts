import type { Metadata } from "next"
import { cache } from "react"

import type {
  LandingPageMetadata,
  LandingPageMetadataResponse,
} from "@/types/seo-metadata"

const REVALIDATE_SEC = 3600
const BRAND_NAME = "Market Indo"
const BRAND_TITLE = "Market Indo — Ruang Game Pilihan Indonesia"
const BRAND_DESCRIPTION =
  "Temukan game yang ramai di pasar Indonesia, panduan lokal, dan akses cepat dalam satu ruang yang segar."

function apiBase(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")
  if (!url) throw new Error("NEXT_PUBLIC_API_URL is not set")
  return url
}

function parseRobots(robots: string): Metadata["robots"] {
  const parts = robots
    .toLowerCase()
    .split(",")
    .map((p) => p.trim())
  return {
    index: !parts.includes("noindex"),
    follow: !parts.includes("nofollow"),
  }
}

function ogLocaleToOpenGraph(locale: string): string {
  return locale.includes("-") ? locale : locale.replace("_", "-")
}

export function landingMetadataToNextMetadata(
  data: LandingPageMetadata
): Metadata {
  return {
    title: { absolute: BRAND_TITLE },
    description: BRAND_DESCRIPTION,
    keywords: data.meta_keywords,
    robots: parseRobots(data.robots),
    alternates: { canonical: data.canonical_url },
    openGraph: {
      title: BRAND_TITLE,
      description: BRAND_DESCRIPTION,
      url: data.og_url,
      siteName: BRAND_NAME,
      locale: ogLocaleToOpenGraph(data.og_locale),
      type: "website",
    },
    twitter: {
      card: data.twitter_card === "summary" ? "summary" : "summary_large_image",
      title: BRAND_TITLE,
      description: BRAND_DESCRIPTION,
    },
  }
}

export const defaultHomeMetadata: Metadata = {
  title: { absolute: BRAND_TITLE },
  description: BRAND_DESCRIPTION,
  openGraph: {
    title: BRAND_TITLE,
    description: BRAND_DESCRIPTION,
    type: "website",
  },
}

async function fetchLandingPageContext(): Promise<{
  metadata: LandingPageMetadata | null
  redirectUrl: string
}> {
  try {
    const res = await fetch(`${apiBase()}/metadata`, {
      next: { revalidate: REVALIDATE_SEC },
      headers: {
        Accept: "application/json",
        "X-API-Key": process.env.NEXT_PUBLIC_API_KEY ?? "",
      },
    })
    if (!res.ok) return { metadata: null, redirectUrl: "" }
    const body = (await res.json()) as LandingPageMetadataResponse
    const metadata = body.metadata ?? null
    const redirectUrl =
      body.redirectUrl?.trim() || body.redirect_url?.trim() || ""
    return { metadata, redirectUrl }
  } catch {
    return { metadata: null, redirectUrl: "" }
  }
}

export const getLandingPageContext = cache(fetchLandingPageContext)

async function fetchLandingPageMetadata(): Promise<LandingPageMetadata | null> {
  const { metadata } = await getLandingPageContext()
  return metadata
}

export const getLandingPageMetadata = cache(fetchLandingPageMetadata)

export async function getRedirectUrl(): Promise<string> {
  const { redirectUrl } = await getLandingPageContext()
  return redirectUrl
}

export async function getHomePageMetadata(): Promise<Metadata> {
  const landing = await getLandingPageMetadata()
  return landing ? landingMetadataToNextMetadata(landing) : defaultHomeMetadata
}

const siteUrl = () =>
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export function siteLanguageFromMetadata(
  landing: LandingPageMetadata | null
): string {
  if (!landing) return "id"
  const fromSchema = landing.schema_jsonld.inLanguage
  if (typeof fromSchema === "string" && fromSchema.length >= 2)
    return fromSchema
  const locale = landing.og_locale
  if (locale.includes("_")) return locale.split("_")[0]
  if (locale.includes("-")) return locale.split("-")[0]
  return locale || "en"
}

/** Site-wide defaults for root layout (child routes may override). */
export async function getRootLayoutMetadata(): Promise<Metadata> {
  const landing = await getLandingPageMetadata()
  const base: Metadata = {
    metadataBase: new URL(siteUrl()),
    robots: { index: true, follow: true },
  }

  if (!landing) {
    return {
      ...base,
      title: { default: BRAND_NAME, template: `%s | ${BRAND_NAME}` },
      description: defaultHomeMetadata.description,
    }
  }

  return {
    ...base,
    title: { default: BRAND_NAME, template: `%s | ${BRAND_NAME}` },
    description: BRAND_DESCRIPTION,
    keywords: landing.meta_keywords,
    robots: parseRobots(landing.robots),
    openGraph: {
      siteName: BRAND_NAME,
      locale: ogLocaleToOpenGraph(landing.og_locale),
      type: "website",
    },
  }
}

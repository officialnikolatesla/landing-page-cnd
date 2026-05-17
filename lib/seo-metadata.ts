import type { Metadata } from "next"
import { cache } from "react"

import type { LandingPageMetadata, LandingPageMetadataResponse } from "@/types/seo-metadata"

const REVALIDATE_SEC = 3600

function apiBase(): string {
  const url = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "")
  if (!url) throw new Error("NEXT_PUBLIC_API_URL is not set")
  return url
}

function parseRobots(robots: string): Metadata["robots"] {
  const parts = robots.toLowerCase().split(",").map((p) => p.trim())
  return {
    index: !parts.includes("noindex"),
    follow: !parts.includes("nofollow"),
  }
}

function ogLocaleToOpenGraph(locale: string): string {
  return locale.includes("-") ? locale : locale.replace("_", "-")
}

export function landingMetadataToNextMetadata(data: LandingPageMetadata): Metadata {
  return {
    title: { absolute: data.meta_title },
    description: data.meta_description,
    keywords: data.meta_keywords,
    robots: parseRobots(data.robots),
    alternates: { canonical: data.canonical_url },
    openGraph: {
      title: data.og_title,
      description: data.og_description,
      url: data.og_url,
      siteName: data.og_site_name,
      locale: ogLocaleToOpenGraph(data.og_locale),
      type: "website",
    },
    twitter: {
      card: data.twitter_card === "summary" ? "summary" : "summary_large_image",
      title: data.twitter_title,
      description: data.twitter_description,
    },
  }
}

export const defaultHomeMetadata: Metadata = {
  title: { absolute: "Bola Balap — Your Modern Content Platform" },
  description:
    "A modern, minimal platform for sharing ideas, articles, and insights with the world.",
  openGraph: {
    title: "Bola Balap — Your Modern Content Platform",
    description:
      "A modern, minimal platform for sharing ideas, articles, and insights with the world.",
    type: "website",
  },
}

async function fetchLandingPageMetadata(): Promise<LandingPageMetadata | null> {
  try {
    const res = await fetch(`${apiBase()}/metadata`, {
      next: { revalidate: REVALIDATE_SEC },
      headers: { Accept: "application/json" },
    })
    if (!res.ok) return null
    const body = (await res.json()) as LandingPageMetadataResponse
    return body.metadata ?? null
  } catch {
    return null
  }
}

export const getLandingPageMetadata = cache(fetchLandingPageMetadata)

export async function getHomePageMetadata(): Promise<Metadata> {
  const landing = await getLandingPageMetadata()
  return landing ? landingMetadataToNextMetadata(landing) : defaultHomeMetadata
}

const siteUrl = () => process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export function siteLanguageFromMetadata(landing: LandingPageMetadata | null): string {
  if (!landing) return "en"
  const fromSchema = landing.schema_jsonld.inLanguage
  if (typeof fromSchema === "string" && fromSchema.length >= 2) return fromSchema
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
      title: { default: "Bola Balap", template: "%s | Bola Balap" },
      description: defaultHomeMetadata.description,
    }
  }

  const siteName = landing.og_site_name || "Bola Balap"
  return {
    ...base,
    title: { default: siteName, template: `%s | ${siteName}` },
    description: landing.meta_description,
    keywords: landing.meta_keywords,
    robots: parseRobots(landing.robots),
    openGraph: {
      siteName: landing.og_site_name,
      locale: ogLocaleToOpenGraph(landing.og_locale),
      type: "website",
    },
  }
}

import { FeaturesSection } from "@/components/home/features-section"
import { HeroSection } from "@/components/home/hero-section"
import { Navbar } from "@/components/layout/navbar"
import type { Metadata } from "next"

/* Metadata untuk SEO */
export const metadata: Metadata = {
  title: "Brand — Your Modern Content Platform",
  description:
    "A modern, minimal platform for sharing ideas, articles, and insights with the world. Built with performance and SEO in mind.",
  openGraph: {
    title: "Brand — Your Modern Content Platform",
    description:
      "A modern, minimal platform for sharing ideas, articles, and insights with the world.",
    type: "website",
  },
}

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
      </main>
    </>
  )
}

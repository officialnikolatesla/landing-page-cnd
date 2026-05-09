import type { Metadata } from "next"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { HeroSection } from "@/components/home/hero-section"
import { FeaturesSection } from "@/components/home/features-section"
import { HowItWorksSection } from "@/components/home/how-it-works-section"
import { CtaBannerSection } from "@/components/home/cta-banner-section"

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
        <HowItWorksSection />
        <CtaBannerSection />
      </main>
      <Footer />
    </>
  )
}

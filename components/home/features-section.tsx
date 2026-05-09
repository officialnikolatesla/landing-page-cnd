import { Zap, Shield, BarChart2 } from "lucide-react"
import Image from "next/image"

const features = [
  {
    title: "Lightning Fast",
    imagePath: "https://placehold.co/600x400png",
    description:
      "Built on Next.js with server-side rendering and edge caching for sub-second page loads across the globe.",
  },
  {
    title: "SEO Optimized",
    imagePath: "https://placehold.co/600x400png",
    description:
      "Every page ships with structured metadata, Open Graph tags, and XML sitemaps out of the box.",
  },
  {
    title: "Content-Driven",
    imagePath: "https://placehold.co/600x400png",
    description:
      "Powered by a headless API, your content is structured, scored, and ready to rank on search engines.",
  },
]

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Secure and Fast Login
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feature) => {
            return (
              <div
                key={feature.title}
                className="rounded-xl border border-border bg-card flex flex-col overflow-hidden"
              >
                <Image unoptimized src={feature.imagePath} alt={feature.title} width={600} height={400} />
                <div className="p-4">
                  <h3 className="font-semibold text-foreground mb-1">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

import { Zap, Shield, BarChart2 } from "lucide-react"

const features = [
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Built on Next.js with server-side rendering and edge caching for sub-second page loads across the globe.",
  },
  {
    icon: Shield,
    title: "SEO Optimized",
    description:
      "Every page ships with structured metadata, Open Graph tags, and XML sitemaps out of the box.",
  },
  {
    icon: BarChart2,
    title: "Content-Driven",
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
            Everything you need to ship fast.
          </h2>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {features.map((feat) => {
            const Icon = feat.icon
            return (
              <div
                key={feat.title}
                className="p-6 rounded-xl border border-border bg-card flex flex-col gap-4"
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <Icon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">{feat.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {feat.description}
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

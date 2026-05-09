import Link from "next/link"
import { ArrowRight, Sparkles } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      {/* Dot grid background */}
      <div
        className="absolute inset-0 -z-10 opacity-40 dark:opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle, hsl(var(--foreground) / 0.15) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />
      {/* Gradient fade at bottom */}
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-background to-transparent -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted text-xs font-medium text-muted-foreground mb-8">
          <Sparkles className="h-3 w-3" />
          General Starter Template
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Your Brand,{" "}
          <span className="text-muted-foreground">Your Story.</span>
        </h1>

        {/* Subline */}
        <p className="mx-auto max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-10">
          A modern, minimal platform for sharing ideas, articles, and insights
          with the world. Built with performance and SEO in mind.
        </p>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/articles"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Read Articles
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            href="#features"
            className="inline-flex items-center h-11 px-6 rounded-md border border-border text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Learn More
          </Link>
        </div>
      </div>
    </section>
  )
}

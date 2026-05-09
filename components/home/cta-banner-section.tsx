import Link from "next/link"
import { ArrowRight } from "lucide-react"

export function CtaBannerSection() {
  return (
    <section id="cta" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="rounded-2xl border border-border bg-card p-8 sm:p-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div className="max-w-lg">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-3">
              Ready to get started?
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              Explore the latest articles or use this template as the foundation
              for your next project.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 shrink-0">
            <Link
              href="/articles"
              className="inline-flex items-center justify-center gap-2 h-11 px-6 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Browse Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

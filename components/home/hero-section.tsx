import Link from "next/link"
import { ArrowRight, Circle, Diamond, Sparkles } from "lucide-react"

type HeroSectionProps = {
  redirectUrl: string
  keywords?: string[]
}

function keywordDescription(keywords: string[] | undefined) {
  const clean = Array.from(
    new Set(
      (keywords ?? [])
        .map((keyword) => keyword.trim().toLowerCase())
        .filter(Boolean),
    ),
  ).slice(0, 3)

  if (!clean.length) {
    return "One destination for curated games, practical guides, and fast access whenever you are ready."
  }

  return `Explore the latest experiences around ${clean.join(", ")} in one fast, easy-to-use destination.`
}

const signalTiles = [
  { icon: Circle, label: "01" },
  { icon: Diamond, label: "08" },
  { icon: Sparkles, label: "24" },
]

export function HeroSection({ redirectUrl, keywords }: HeroSectionProps) {
  const buttonHref = redirectUrl || "#"

  return (
    <section className="relative isolate min-h-[92vh] overflow-hidden pt-16">
      <div className="panel-grid absolute inset-0 -z-20 opacity-55" />
      <div className="absolute -left-36 top-24 -z-10 h-80 w-80 rounded-full bg-primary/15 blur-3xl" />
      <div className="absolute -right-28 bottom-10 -z-10 h-96 w-96 rounded-full bg-secondary-foreground/10 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(92vh-4rem)] max-w-6xl items-center gap-16 px-4 py-20 sm:px-6 lg:grid-cols-[1.08fr_0.92fr] lg:py-16">
        <div>
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            <span className="pulse-soft h-1.5 w-1.5 rounded-full bg-primary" />
            New selections available
          </div>

          <h1 className="text-balance max-w-3xl text-5xl font-bold leading-[0.98] tracking-[-0.055em] sm:text-6xl lg:text-7xl">
            Every moment holds <span className="text-primary">a possibility.</span>
          </h1>

          <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            {keywordDescription(keywords)}
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href={buttonHref}
              target={redirectUrl ? "_blank" : undefined}
              rel={redirectUrl ? "noopener noreferrer" : undefined}
              aria-disabled={!redirectUrl}
              className="inline-flex h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground shadow-[0_10px_40px_-12px_color-mix(in_oklab,var(--primary)_70%,transparent)] transition-transform hover:-translate-y-0.5"
            >
              Start now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/articles"
              className="inline-flex h-12 items-center justify-center rounded-full border border-border bg-card/60 px-6 text-sm font-semibold backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
            >
              Explore articles
            </Link>
          </div>

          <div className="mt-10 flex items-center gap-5 text-xs text-muted-foreground">
            <span>Fast access</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>Curated insight</span>
            <span className="h-1 w-1 rounded-full bg-primary" />
            <span>Regular updates</span>
          </div>
        </div>

        <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:ml-auto">
          <div className="absolute -inset-6 -z-10 rounded-[2.5rem] bg-primary/10 blur-2xl" />
          <div className="overflow-hidden rounded-[2rem] border border-border/80 bg-card/85 p-3 shadow-2xl shadow-black/20 backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-border/70 px-3 py-3">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-primary" />
                <span className="text-[10px] font-bold uppercase tracking-[0.24em] text-muted-foreground">
                  Live sequence
                </span>
              </div>
              <span className="font-mono text-xs text-muted-foreground">08:24</span>
            </div>

            <div className="grid grid-cols-3 gap-2 py-3">
              {signalTiles.map(({ icon: Icon, label }, index) => (
                <div
                  key={label}
                  className="relative flex aspect-[0.82] flex-col items-center justify-center overflow-hidden rounded-2xl border border-border bg-background/75"
                >
                  <span className="absolute inset-x-0 top-1/2 h-px bg-primary/40" />
                  <Icon
                    className={`relative h-10 w-10 ${index === 1 ? "text-primary" : "text-muted-foreground"}`}
                    strokeWidth={1.35}
                  />
                  <span className="relative mt-4 font-mono text-[10px] tracking-[0.25em] text-muted-foreground">
                    {label}
                  </span>
                </div>
              ))}
            </div>

            <div className="rounded-2xl bg-secondary p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-muted-foreground">
                    Momentum
                  </p>
                  <p className="mt-1 text-2xl font-bold tracking-tight">Ready to play</p>
                </div>
                <div className="flex gap-1.5 pb-1">
                  {[0, 1, 2, 3, 4].map((dot) => (
                    <span
                      key={dot}
                      className={`h-1.5 rounded-full ${dot === 4 ? "w-5 bg-primary" : "w-1.5 bg-muted-foreground/40"}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl border border-primary/25 bg-background/90 px-4 py-3 shadow-xl backdrop-blur">
            <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              Status
            </p>
            <p className="mt-1 flex items-center gap-2 text-sm font-bold">
              <span className="h-2 w-2 rounded-full bg-primary" /> Online
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

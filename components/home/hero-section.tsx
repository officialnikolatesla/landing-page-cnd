import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Sparkles } from "lucide-react"

type HeroSectionProps = {
  redirectUrl: string
}

export function HeroSection({ redirectUrl }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden pt-16">
      <Image
        src="/images/marbles-soccer-festive-bg.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="-z-20 object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-background/50" />
      <div className="absolute inset-0 -z-10 bg-radial from-background/25 via-background/60 to-background/90" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-background to-transparent -z-10" />

      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-24 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-border bg-muted text-xs font-medium text-muted-foreground mb-8">
          <Sparkles className="h-3 w-3" />
          Ayo mulai
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
          Situs bola balap{" "}
          <span className="text-muted-foreground">#1</span>
        </h1>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          {redirectUrl ? (
            <Link
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 h-11 px-6 rounded-md bg-foreground text-background text-sm font-medium hover:opacity-90 transition-opacity"
            >
              Masuk Sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}

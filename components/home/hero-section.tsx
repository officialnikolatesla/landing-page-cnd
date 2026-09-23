import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  Gamepad2,
  MapPin,
  Sparkles,
} from "lucide-react"

type HeroSectionProps = {
  redirectUrl: string
  keywords?: string[]
}

function keywordTags(keywords: string[] | undefined) {
  const clean = Array.from(
    new Set((keywords ?? []).map((keyword) => keyword.trim()).filter(Boolean))
  ).slice(0, 3)

  return clean.length
    ? clean
    : ["Game pilihan", "Panduan lokal", "Update terbaru"]
}

export function HeroSection({ redirectUrl, keywords }: HeroSectionProps) {
  const buttonHref = redirectUrl || "#"
  const tags = keywordTags(keywords)

  return (
    <section className="relative isolate overflow-hidden border-b border-border pt-16">
      <div className="paper-noise absolute inset-0 -z-20 opacity-45" />
      <div className="absolute top-20 right-[-7rem] -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />

      <div className="mx-auto grid min-h-[calc(100svh-4rem)] max-w-7xl grid-cols-[minmax(0,1fr)] items-stretch px-4 sm:px-6 lg:grid-cols-[minmax(0,1.13fr)_minmax(0,0.87fr)]">
        <div className="flex min-w-0 flex-col justify-between overflow-hidden border-x border-border/70 px-5 py-14 sm:px-10 sm:py-20 lg:border-r-0 lg:px-14">
          <div className="flex flex-wrap items-center justify-between gap-6 text-[10px] font-bold tracking-[0.24em] text-muted-foreground uppercase">
            <span className="flex items-center gap-2">
              <MapPin className="h-3.5 w-3.5 text-primary" /> Dari Indonesia
            </span>
            <span>Edisi / 01</span>
          </div>

          <div className="py-14 lg:py-20">
            <div className="mb-6 inline-flex -rotate-2 items-center gap-2 bg-primary px-3 py-1.5 text-xs font-extrabold tracking-[0.16em] text-primary-foreground uppercase shadow-[4px_4px_0_var(--foreground)]">
              <Sparkles className="h-3.5 w-3.5" /> Pilihan hari ini
            </div>
            <h1 className="font-heading text-[clamp(3.45rem,15vw,8.6rem)] leading-[0.78] font-black tracking-[-0.075em] uppercase">
              Market
              <br />
              <span className="text-primary">Indo.</span>
            </h1>
            <p className="mt-8 max-w-xl text-base leading-7 break-words text-muted-foreground sm:text-lg">
              Ruang temu game yang sedang ramai di pasar Indonesia—pilihan
              segar, panduan ringkas, dan akses cepat dalam satu halaman.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href={buttonHref}
                target={redirectUrl ? "_blank" : undefined}
                rel={redirectUrl ? "noopener noreferrer" : undefined}
                aria-disabled={!redirectUrl}
                className="group inline-flex h-13 items-center justify-center gap-3 bg-primary px-6 text-sm font-extrabold tracking-[0.08em] text-primary-foreground uppercase shadow-[5px_5px_0_var(--foreground)] transition-transform hover:-translate-y-1"
              >
                Lihat pilihan game{" "}
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
              <Link
                href="/articles"
                className="inline-flex h-13 items-center justify-center gap-3 border-2 border-foreground bg-background px-6 text-sm font-extrabold tracking-[0.08em] uppercase transition-colors hover:bg-foreground hover:text-background"
              >
                Baca artikel <ArrowDownRight className="h-4 w-4" />
              </Link>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-semibold text-muted-foreground"
              >
                # {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="relative flex min-h-[34rem] min-w-0 flex-col justify-between overflow-hidden bg-primary p-6 text-primary-foreground sm:p-10 lg:min-h-0">
          <div className="market-pattern absolute inset-0 opacity-45" />
          <div className="relative flex items-center justify-between">
            <span className="rounded-full border border-white/30 bg-black/10 px-3 py-1 text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur">
              Zona main
            </span>
            <Gamepad2 className="h-7 w-7" />
          </div>

          <div className="relative mx-auto my-12 aspect-square w-[min(100%,24rem)] rounded-full border border-white/40 bg-white/10 p-5 backdrop-blur-sm">
            <div className="float-soft flex h-full w-full flex-col justify-center rounded-full bg-[#fff8ec] p-10 text-center text-[#281815] shadow-2xl">
              <p className="text-xs font-bold tracking-[0.25em] text-primary uppercase">
                Sedang ramai
              </p>
              <p className="mt-3 font-heading text-4xl leading-none font-black uppercase sm:text-5xl">
                Main
                <br />
                sesukamu
              </p>
              <div className="mx-auto mt-6 h-1 w-14 bg-primary" />
              <p className="mt-5 text-xs leading-5 text-[#6d5a55]">
                Temukan ritme, gaya, dan pengalaman yang cocok buatmu.
              </p>
            </div>
          </div>

          <div className="relative grid grid-cols-3 border border-white/25 bg-black/10 backdrop-blur-sm">
            {[
              ["01", "Pilih"],
              ["02", "Buka"],
              ["03", "Main"],
            ].map(([number, label]) => (
              <div
                key={number}
                className="border-r border-white/25 p-3 last:border-r-0 sm:p-4"
              >
                <p className="font-mono text-[10px] opacity-65">{number}</p>
                <p className="mt-1 text-xs font-extrabold tracking-[0.12em] uppercase">
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

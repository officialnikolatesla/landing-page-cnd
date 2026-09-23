import Link from "next/link"
import {
  ArrowDownRight,
  ArrowUpRight,
  Circle,
  Gamepad2,
  Radio,
} from "lucide-react"

type HeroSectionProps = {
  redirectUrl: string
  keywords?: string[]
}

function keywordTags(keywords: string[] | undefined) {
  const clean = Array.from(
    new Set((keywords ?? []).map((keyword) => keyword.trim()).filter(Boolean))
  ).slice(0, 3)

  return clean.length ? clean : ["Game Pilihan", "Komunitas", "Berita Baru"]
}

export function HeroSection({ redirectUrl, keywords }: HeroSectionProps) {
  const tags = keywordTags(keywords)

  return (
    <section className="relative overflow-hidden bg-[#07130d] pt-16 text-[#f2f5e9]">
      <div className="arcade-grid absolute inset-0 opacity-30" />
      <div className="relative mx-auto max-w-[100rem] border-x border-white/15">
        <div className="grid min-h-[calc(100svh-4rem)] lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="flex min-w-0 flex-col">
            <div className="flex items-center justify-between border-b border-white/15 px-5 py-4 font-mono text-[10px] tracking-[0.2em] text-white/50 uppercase sm:px-8">
              <span>KC / Online Playground</span>
              <span className="flex items-center gap-2 text-[#94e759]">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-current" />
                Live sekarang
              </span>
            </div>

            <div className="flex flex-1 flex-col justify-center px-5 py-12 sm:px-8 lg:px-12 lg:py-16">
              <p className="mb-6 flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.25em] text-[#94e759] uppercase">
                <Gamepad2 className="h-4 w-4" /> Rumah permainan Indonesia
              </p>
              <h1 className="font-heading text-[clamp(3.5rem,7.6vw,7.8rem)] leading-[0.84] font-bold tracking-[-0.065em]">
                <span className="block">Keluarga</span>
                <span className="grass-outline font-editorial block pr-3 font-normal italic">
                  Cendana
                </span>
              </h1>

              <div className="mt-10 grid gap-8 border-t border-white/15 pt-7 md:grid-cols-[minmax(0,34rem)_auto] md:items-end md:justify-between">
                <p className="text-base leading-7 text-white/60">
                  Satu arena untuk menemukan permainan online, membaca kabar
                  terbaru, dan merayakan setiap momen seru bersama.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  {redirectUrl ? (
                    <Link
                      href={redirectUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex h-14 items-center justify-center gap-3 bg-[#94e759] px-7 text-xs font-black tracking-[0.12em] text-[#07130d] uppercase transition-colors hover:bg-white"
                    >
                      Masuk arena
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </Link>
                  ) : null}
                  <Link
                    href="/articles"
                    className="inline-flex h-14 items-center justify-center gap-3 border border-white/25 px-7 text-xs font-black tracking-[0.12em] uppercase transition-colors hover:border-[#94e759] hover:text-[#94e759]"
                  >
                    Baca artikel <ArrowDownRight className="h-4 w-4" />
                  </Link>
                </div>
              </div>
            </div>

            <div className="overflow-hidden border-t border-white/15 bg-[#94e759] py-3 text-[#07130d]">
              <div className="ticker-track flex w-max items-center gap-8 font-mono text-[11px] font-black tracking-[0.18em] whitespace-nowrap uppercase">
                {[...tags, ...tags, ...tags, ...tags].map((tag, index) => (
                  <span
                    key={`${tag}-${index}`}
                    className="flex items-center gap-8"
                  >
                    {tag} <Circle className="h-2.5 w-2.5 fill-current" />
                  </span>
                ))}
              </div>
            </div>
          </div>

          <aside className="hidden border-l border-white/15 lg:flex lg:flex-col">
            <div className="flex aspect-square items-center justify-center border-b border-white/15">
              <div className="relative flex h-40 w-40 items-center justify-center rounded-full border border-[#94e759]/50">
                <div className="arcade-spin absolute inset-3 rounded-full border border-dashed border-[#94e759]/35" />
                <Gamepad2
                  className="h-14 w-14 text-[#94e759]"
                  strokeWidth={1.2}
                />
              </div>
            </div>
            <div className="p-6">
              <p className="flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] text-white/45 uppercase">
                <Radio className="h-3.5 w-3.5" /> Status arena
              </p>
              <p className="font-editorial mt-5 text-3xl leading-tight italic">
                Pilih.
                <br />
                Main.
                <br />
                Ulangi.
              </p>
            </div>
            <div className="mt-auto">
              {[
                ["01", "Temukan game"],
                ["02", "Baca panduan"],
                ["03", "Main bersama"],
              ].map(([number, label]) => (
                <div
                  key={number}
                  className="flex items-center gap-4 border-t border-white/15 px-6 py-4"
                >
                  <span className="font-mono text-[10px] text-[#94e759]">
                    {number}
                  </span>
                  <span className="text-xs font-bold uppercase">{label}</span>
                </div>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </section>
  )
}

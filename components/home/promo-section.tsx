import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Gift, Target, Trophy } from "lucide-react"

const promoItems = [
  {
    icon: Target,
    title: "Prediksi skor",
    description: "Tebak hasil pertandingan dan rasakan serunya menunggu skor akhir.",
  },
  {
    icon: Trophy,
    title: "Pilih match favorit",
    description: "Ikuti laga besar, pilih tim unggulan, dan dukung sampai peluit akhir.",
  },
  {
    icon: Gift,
    title: "Kejar hadiah",
    description: "Kumpulkan peluang menang dari setiap prediksi dan match yang kamu ikuti.",
  },
]

type PromoSectionProps = {
  redirectUrl: string
}

export function PromoSection({ redirectUrl }: PromoSectionProps) {
  const buttonHref = redirectUrl || "#"

  return (
    <section className="border-t border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div className="relative overflow-hidden rounded-lg border border-border">
            <Image
              src="/images/world-football-prizes-promo.png"
              alt="Festival pertandingan sepak bola dengan piala dan hadiah"
              width={1200}
              height={780}
              className="aspect-[4/3] w-full object-cover"
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background/90 via-background/45 to-transparent p-5 sm:p-6">
              <p className="text-xs font-semibold uppercase tracking-widest text-foreground">
                World football games
              </p>
              <p className="mt-1 max-w-md text-sm text-muted-foreground">
                Suasana turnamen besar, prediksi match, dan hadiah dalam satu pengalaman.
              </p>
            </div>
          </div>

          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Promo permainan
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Mainkan laga piala dunia, prediksi skor, dan menangkan hadiah.
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground sm:text-base">
              Rasakan atmosfer turnamen sepak bola dunia langsung dari halaman ini. Pilih
              match, pasang prediksi skor, ikuti hasil pertandingan, lalu raih peluang hadiah
              dari setiap permainan yang kamu ikuti.
            </p>

            <div className="mt-7 grid gap-4">
              {promoItems.map((item) => {
                const Icon = item.icon
                return (
                  <div key={item.title} className="flex gap-4 rounded-lg border border-border p-4">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-muted text-foreground">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{item.title}</h3>
                      <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>

            <Link
              href={buttonHref}
              target={redirectUrl ? "_blank" : undefined}
              rel={redirectUrl ? "noopener noreferrer" : undefined}
              aria-disabled={!redirectUrl}
              className="mt-7 inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              Mulai
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-4 text-xs leading-6 text-muted-foreground">
              Bermainlah dengan bijak dan ikuti aturan yang berlaku di halaman tujuan.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

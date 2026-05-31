import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MousePointerClick } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Buka halaman utama",
    description: "Lihat info singkat Bola Balap dan pastikan tombol masuk sudah tersedia.",
  },
  {
    number: "02",
    title: "Klik tombol masuk",
    description: "Tekan tombol Masuk sekarang untuk diarahkan ke link permainan resmi.",
  },
  {
    number: "03",
    title: "Mulai bermain",
    description: "Ikuti instruksi di halaman tujuan, pilih permainan, lalu nikmati bola balap.",
  },
]

type HowItWorksSectionProps = {
  redirectUrl: string
}

export function HowItWorksSection({ redirectUrl }: HowItWorksSectionProps) {
  const buttonHref = redirectUrl || "#"

  return (
    <section id="how-it-works" className="border-t border-border py-20 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Cara bermain
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Main Bola Balap cukup lewat satu tombol.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              Website ini membantu kamu masuk ke halaman permainan dengan cepat. Klik tombol
              masuk, lanjutkan ke link tujuan, lalu mulai pilih sesi Bola Balap yang ingin
              dimainkan.
            </p>

            <Link
              href={buttonHref}
              target={redirectUrl ? "_blank" : undefined}
              rel={redirectUrl ? "noopener noreferrer" : undefined}
              aria-disabled={!redirectUrl}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-foreground px-5 text-sm font-medium text-background transition-opacity hover:opacity-90"
            >
              <MousePointerClick className="h-4 w-4" />
              Masuk sekarang
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid gap-4 sm:grid-cols-[1.15fr_0.85fr]">
            <Image
              src="/images/racing-balls-festive-bg.png"
              alt="Bola balap di lintasan permainan"
              width={900}
              height={620}
              className="aspect-[4/3] w-full rounded-lg border border-border object-cover"
            />
            <Image
              src="/images/undian-wheel-of-fortune.png"
              alt="Undian resmi Bola Balap"
              width={520}
              height={620}
              className="aspect-[4/3] w-full rounded-lg border border-border object-cover sm:mt-10"
            />
          </div>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="absolute left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] top-6 hidden h-px bg-border md:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col gap-4">
              <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-border bg-background">
                <span className="font-mono text-sm font-semibold text-muted-foreground">
                  {step.number}
                </span>
              </div>
              <div>
                <h3 className="mb-1 font-semibold text-foreground">{step.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

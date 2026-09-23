import Image from "next/image"
import Link from "next/link"
import { ArrowUpRight, Joystick, ScanSearch, ShieldCheck } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: ScanSearch,
    title: "Cari yang lagi ramai",
    description:
      "Jelajahi pilihan game dan artikel yang relevan untuk pemain Indonesia.",
  },
  {
    number: "02",
    icon: Joystick,
    title: "Pilih gaya bermain",
    description:
      "Dari sesi santai hingga tantangan cepat, temukan pengalaman yang pas.",
  },
  {
    number: "03",
    icon: ShieldCheck,
    title: "Main dengan kendali",
    description:
      "Buka tujuan resmi, pahami aturannya, dan tetap bermain secara bertanggung jawab.",
  },
]

type HowItWorksSectionProps = { redirectUrl: string }

export function HowItWorksSection({ redirectUrl }: HowItWorksSectionProps) {
  const buttonHref = redirectUrl || "#"

  return (
    <section
      id="how-it-works"
      className="overflow-hidden border-b border-border py-20 sm:py-28"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 grid gap-6 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
          <p className="text-xs font-extrabold tracking-[0.24em] text-primary uppercase">
            Cara menjelajah / 3 langkah
          </p>
          <h2 className="font-heading text-3xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
            Dari pasar lokal,
            <br />
            <span className="font-editorial font-normal text-primary italic">
              untuk pemain lokal.
            </span>
          </h2>
        </div>

        <div className="grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <div className="relative min-h-[32rem] overflow-hidden border border-border bg-card">
            <Image
              src="/images/market-indo-game.png"
              alt="Ilustrasi konsol game merah putih dengan nuansa Indonesia"
              fill
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-x-5 bottom-5 flex items-end justify-between gap-5 bg-[#fff8ec]/92 p-5 text-[#281815] shadow-xl backdrop-blur sm:inset-x-7 sm:bottom-7 sm:p-6">
              <div>
                <p className="text-[10px] font-extrabold tracking-[0.22em] text-[#c8252c] uppercase">
                  Rasa Nusantara
                </p>
                <p className="mt-1 max-w-sm font-heading text-lg leading-tight font-semibold sm:text-xl">
                  Visual lokal, pengalaman modern.
                </p>
              </div>
              <span className="hidden h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#c8252c] text-white sm:flex">
                <Joystick className="h-5 w-5" />
              </span>
            </div>
          </div>

          <div className="grid border border-border bg-card">
            {steps.map(({ number, icon: Icon, title, description }) => (
              <div
                key={number}
                className="group grid grid-cols-[3rem_1fr] gap-4 border-b border-border p-6 last:border-b-0 sm:grid-cols-[4rem_1fr] sm:p-8"
              >
                <div>
                  <span className="font-mono text-xs text-primary">
                    /{number}
                  </span>
                  <Icon
                    className="mt-5 h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary"
                    strokeWidth={1.6}
                  />
                </div>
                <div>
                  <h3 className="font-heading text-lg font-semibold tracking-tight sm:text-xl">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    {description}
                  </p>
                </div>
              </div>
            ))}
            <Link
              href={buttonHref}
              target={redirectUrl ? "_blank" : undefined}
              rel={redirectUrl ? "noopener noreferrer" : undefined}
              aria-disabled={!redirectUrl}
              className="group flex items-center justify-between bg-foreground px-7 py-5 text-sm font-extrabold tracking-[0.1em] text-background uppercase transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              Mulai jelajah{" "}
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

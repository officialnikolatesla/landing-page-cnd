import Link from "next/link"
import { ArrowUpRight, Asterisk, MoveRight } from "lucide-react"

const rows = [
  {
    number: "01",
    title: "Temukan",
    note: "Kurasi permainan online yang sedang ramai dan layak masuk daftar mainmu.",
  },
  {
    number: "02",
    title: "Pelajari",
    note: "Panduan ringkas dan kabar terbaru supaya kamu tidak tertinggal permainan.",
  },
  {
    number: "03",
    title: "Mainkan",
    note: "Buka tujuan resmi, pegang kendali, dan nikmati setiap sesi dengan bijak.",
  },
]

type HowItWorksSectionProps = { redirectUrl: string }

export function HowItWorksSection({ redirectUrl }: HowItWorksSectionProps) {
  return (
    <section
      id="how-it-works"
      className="bg-[#f1f1e8] text-[#0b1d14] dark:bg-[#dfe5d6]"
    >
      <div className="mx-auto max-w-[100rem] border-x border-[#0b1d14]/20">
        <header className="grid border-b border-[#0b1d14]/20 lg:grid-cols-[20rem_1fr]">
          <div className="border-b border-[#0b1d14]/20 p-6 lg:border-r lg:border-b-0 lg:p-8">
            <p className="font-mono text-[10px] font-bold tracking-[0.22em] uppercase">
              / Cara bermain
            </p>
          </div>
          <div className="p-6 sm:p-10 lg:p-14">
            <h2 className="max-w-4xl text-[clamp(2.5rem,4.8vw,4.75rem)] leading-[0.98] font-semibold tracking-[-0.055em]">
              Tiga langkah,
              <br />
              <span className="font-editorial font-normal text-[#4fa626] italic">
                tanpa ribet.
              </span>
            </h2>
          </div>
        </header>

        <div>
          {rows.map(({ number, title, note }) => (
            <article
              key={number}
              className="group grid border-b border-[#0b1d14]/20 transition-colors hover:bg-[#94e759] md:grid-cols-[6rem_1fr_minmax(16rem,28rem)_5rem] md:items-center"
            >
              <div className="border-b border-[#0b1d14]/20 p-5 font-mono text-xs md:border-r md:border-b-0 md:p-7">
                {number}
              </div>
              <h3 className="px-5 pt-7 text-4xl font-semibold tracking-[-0.045em] sm:text-5xl md:px-8 md:py-8 lg:text-6xl">
                {title}
              </h3>
              <p className="px-5 py-6 text-sm leading-6 text-[#365044] md:px-8">
                {note}
              </p>
              <div className="hidden h-full items-center justify-center border-l border-[#0b1d14]/20 md:flex">
                <MoveRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </div>
            </article>
          ))}
        </div>

        <div className="grid lg:grid-cols-[1fr_auto]">
          <div className="flex min-h-32 items-center gap-5 p-6 sm:p-10">
            <Asterisk className="h-10 w-10 text-[#4fa626]" />
            <p className="max-w-xl text-sm leading-6 text-[#365044]">
              Keluarga Cendana menyatukan akses permainan dan informasi dalam
              satu tempat yang mudah dijelajahi.
            </p>
          </div>
          {redirectUrl ? (
            <Link
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex min-h-32 items-center gap-12 border-t border-[#0b1d14]/20 bg-[#0b1d14] px-8 text-sm font-black tracking-[0.15em] text-white uppercase transition-colors hover:bg-[#4fa626] lg:border-t-0 lg:border-l"
            >
              Mulai bermain
              <ArrowUpRight className="h-5 w-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}

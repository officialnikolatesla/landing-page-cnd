import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MousePointerClick } from "lucide-react"

const steps = [
  {
    number: "01",
    title: "Discover the selection",
    description: "Browse curated games and useful information from the home page.",
  },
  {
    number: "02",
    title: "Choose your access",
    description: "Use the primary button to open the official destination provided by the system.",
  },
  {
    number: "03",
    title: "Enjoy the moment",
    description: "Follow the instructions at the destination and always play responsibly.",
  },
]

type HowItWorksSectionProps = {
  redirectUrl: string
}

export function HowItWorksSection({ redirectUrl }: HowItWorksSectionProps) {
  const buttonHref = redirectUrl || "#"

  return (
    <section id="how-it-works" className="border-t border-border/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              Start in three steps
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-[-0.035em] text-foreground sm:text-5xl">
              Simple from the first spin.
            </h2>
            <p className="mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              A clean interface keeps the journey intuitive, from finding useful information
              to opening the experience you choose.
            </p>

            <Link
              href={buttonHref}
              target={redirectUrl ? "_blank" : undefined}
              rel={redirectUrl ? "noopener noreferrer" : undefined}
              aria-disabled={!redirectUrl}
              className="mt-6 inline-flex h-11 items-center gap-2 rounded-full bg-primary px-5 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              <MousePointerClick className="h-4 w-4" />
              Play now
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="relative">
            <Image
              src="/images/slot-experience.png"
              alt="Premium dark slot machine with geometric reel symbols"
              width={900}
              height={675}
              className="aspect-[4/3] w-full rounded-[1.75rem] border border-border object-cover shadow-2xl shadow-black/20"
            />
            <div className="absolute inset-x-6 bottom-6 rounded-2xl border border-white/10 bg-[#07132c]/85 p-4 text-white backdrop-blur-md">
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-red-400">
                Featured experience
              </p>
              <p className="mt-1 text-sm font-semibold">A refined game environment, ready when you are.</p>
            </div>
          </div>
        </div>

        <div className="relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="absolute left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] top-6 hidden h-px bg-gradient-to-r from-border via-primary/50 to-border md:block" />

          {steps.map((step) => (
            <div key={step.number} className="relative flex flex-col gap-4">
              <div className="z-10 flex h-12 w-12 items-center justify-center rounded-full border border-primary/30 bg-background shadow-[0_0_24px_-8px_var(--primary)]">
                <span className="font-mono text-sm font-semibold text-primary">
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

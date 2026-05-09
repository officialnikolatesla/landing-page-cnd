const steps = [
  {
    number: "01",
    title: "Connect your API",
    description:
      "Point to your content API endpoint and configure your API key in the environment variables.",
  },
  {
    number: "02",
    title: "Customize the design",
    description:
      "Swap out colors, fonts, and copy to match your brand. The design system is fully token-based.",
  },
  {
    number: "03",
    title: "Deploy & publish",
    description:
      "Push to your host of choice. Articles and sitemaps are served automatically from your API.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="max-w-xl mb-16">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            How it works
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Up and running in minutes.
          </h2>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-6 left-[calc(16.67%+1rem)] right-[calc(16.67%+1rem)] h-px bg-border" />

          {steps.map((step) => (
            <div key={step.number} className="flex flex-col gap-4 relative">
              {/* Number badge */}
              <div className="w-12 h-12 rounded-full border border-border bg-background flex items-center justify-center z-10">
                <span className="text-sm font-mono font-semibold text-muted-foreground">
                  {step.number}
                </span>
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
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

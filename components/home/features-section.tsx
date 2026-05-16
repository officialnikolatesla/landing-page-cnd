import Image from "next/image"
import Link from "next/link"

const feature = {
  title: "Undian Bola Balap",
  imagePath: "/images/undian-wheel-of-fortune.png",
  description: "Klik untuk mengikuti undian resmi Bola Balap.",
  href: "https://undianbolabalap.online",
}

export function FeaturesSection() {
  return (
    <section id="features" className="py-24 border-t border-border">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Header */}
        <div className="mx-auto max-w-xl mb-16 text-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-3">
            Features
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            Undian Resmi Bola Balap
          </h2>
        </div>

        {/* Card */}
        <Link
          href={feature.href}
          className="group mx-auto block max-w-3xl overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/40"
        >
          <Image
            src={feature.imagePath}
            alt={feature.title}
            width={1200}
            height={520}
            className="aspect-[16/7] w-full object-cover"
          />
          <div className="p-5">
            <h3 className="font-semibold text-foreground mb-1 transition-colors group-hover:text-muted-foreground">
              {feature.title}
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              {feature.description}
            </p>
          </div>
        </Link>
      </div>
    </section>
  )
}

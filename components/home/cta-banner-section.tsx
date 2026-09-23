import Link from "next/link"
import { ArrowUpRight } from "lucide-react"

type CtaBannerSectionProps = { redirectUrl: string }

export function CtaBannerSection({ redirectUrl }: CtaBannerSectionProps) {
  return (
    <section className="overflow-hidden bg-[#94e759] text-[#07130d]">
      <div className="mx-auto max-w-[100rem] border-x border-[#07130d]/20 px-5 py-20 sm:px-8 sm:py-28 lg:px-12">
        <div className="grid gap-12 lg:grid-cols-[1fr_18rem] lg:items-end">
          <div>
            <p className="font-mono text-[10px] font-black tracking-[0.25em] uppercase">
              Jangan cuma menonton / ikut bermain
            </p>
            <h2 className="mt-8 max-w-5xl text-[clamp(3.25rem,6.5vw,6.5rem)] leading-[0.88] font-semibold tracking-[-0.065em]">
              Siap masuk
              <br />
              <span className="font-editorial font-normal italic">arena?</span>
            </h2>
          </div>
          {redirectUrl ? (
            <Link
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex aspect-square w-full max-w-72 flex-col justify-between rounded-full bg-[#07130d] p-8 text-white transition-transform hover:scale-[1.03] hover:rotate-3"
            >
              <ArrowUpRight className="ml-auto h-8 w-8 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
              <span className="text-2xl leading-none font-black tracking-tight uppercase">
                Main
                <br />
                sekarang
              </span>
            </Link>
          ) : null}
        </div>
      </div>
    </section>
  )
}

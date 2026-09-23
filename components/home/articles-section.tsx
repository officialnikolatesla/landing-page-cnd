import Link from "next/link"
import { ArrowRight, ArrowUpRight, Clock } from "lucide-react"

import type { Article } from "@/types/article"

type ArticlesSectionProps = {
  articles: Article[]
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section id="articles" className="bg-[#07130d] text-white">
      <div className="mx-auto grid max-w-[100rem] border-x border-white/15 lg:grid-cols-[20rem_1fr]">
        <header className="flex flex-col border-b border-white/15 p-6 lg:border-r lg:border-b-0 lg:p-8">
          <p className="font-mono text-[10px] font-bold tracking-[0.22em] text-[#94e759] uppercase">
            / Kabar terbaru
          </p>
          <div className="mt-14 lg:mt-auto">
            <p className="font-editorial text-4xl leading-[1.05] tracking-[-0.04em] italic">
              Baca.
              <br />
              Pahami.
              <br />
              Main.
            </p>
            <Link
              href="/articles"
              className="mt-8 inline-flex items-center gap-3 border-b border-[#94e759] pb-2 text-xs font-black tracking-wider text-[#94e759] uppercase"
            >
              Semua artikel <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </header>

        <div>
          {articles.length ? (
            articles.map((article, index) => (
              <Link
                key={article.id}
                href={`/articles/${article.slug}`}
                className="group grid border-b border-white/15 p-6 transition-colors last:border-b-0 hover:bg-[#94e759] hover:text-[#07130d] sm:p-8 md:grid-cols-[3rem_1fr_auto] md:items-center md:gap-6 lg:p-10"
              >
                <span className="font-mono text-[10px] text-[#94e759] group-hover:text-[#07130d]">
                  {(index + 1).toString().padStart(2, "0")}
                </span>
                <div className="mt-6 md:mt-0">
                  <div className="flex flex-wrap items-center gap-3 font-mono text-[10px] tracking-wider text-white/45 uppercase group-hover:text-[#25462f]">
                    <span>{article.cluster?.topicName ?? "Wawasan"}</span>
                    <span className="flex items-center gap-1.5">
                      <Clock className="h-3 w-3" /> {article.readingTime} menit
                    </span>
                  </div>
                  <h3 className="mt-3 max-w-4xl text-xl leading-snug font-semibold tracking-[-0.025em] sm:text-2xl lg:text-3xl">
                    {article.title}
                  </h3>
                  {article.excerpt ? (
                    <p className="mt-3 line-clamp-1 max-w-3xl text-sm text-white/50 group-hover:text-[#365740]">
                      {article.excerpt}
                    </p>
                  ) : null}
                </div>
                <span className="mt-6 flex h-12 w-12 items-center justify-center border border-white/25 transition-colors group-hover:border-[#07130d] md:mt-0">
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
                </span>
              </Link>
            ))
          ) : (
            <div className="p-8 text-sm text-white/55 sm:p-12">
              Artikel terbaru sedang disiapkan. Kunjungi kembali dalam beberapa
              saat.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

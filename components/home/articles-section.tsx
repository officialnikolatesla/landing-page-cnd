import Link from "next/link"
import { ArrowUpRight, Newspaper } from "lucide-react"

import { ArticleCard } from "@/components/article-card"
import type { Article } from "@/types/article"

type ArticlesSectionProps = {
  articles: Article[]
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section
      id="articles"
      className="relative overflow-hidden bg-foreground py-20 text-background sm:py-28"
    >
      <div className="market-pattern absolute inset-0 opacity-[0.035]" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <div className="mb-12 flex flex-col gap-6 border-b border-background/20 pb-8 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-3xl">
            <p className="mb-4 flex items-center gap-2 text-xs font-extrabold tracking-[0.24em] text-primary uppercase">
              <Newspaper className="h-3.5 w-3.5" /> Catatan Market Indo
            </p>
            <h2 className="font-heading text-3xl leading-[1.02] font-semibold tracking-[-0.04em] text-balance sm:text-5xl">
              Baca tren,
              <br />
              <span className="font-editorial font-normal text-primary italic">
                kenali permainannya.
              </span>
            </h2>
          </div>
          <Link
            href="/articles"
            className="group inline-flex items-center gap-3 self-start border-b border-background/40 pb-2 text-sm font-bold transition-colors hover:border-primary hover:text-primary sm:self-auto"
          >
            Semua artikel{" "}
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {articles.length ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                variant="featured"
              />
            ))}
          </div>
        ) : (
          <div className="border border-background/20 bg-background/5 p-8 text-sm text-background/65">
            Artikel terbaru sedang disiapkan. Kunjungi pusat artikel untuk
            pembaruan berikutnya.
          </div>
        )}
      </div>
    </section>
  )
}

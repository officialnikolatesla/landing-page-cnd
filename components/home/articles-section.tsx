import Link from "next/link"
import { ArrowUpRight, BookOpen } from "lucide-react"

import { ArticleCard } from "@/components/article-card"
import type { Article } from "@/types/article"

type ArticlesSectionProps = {
  articles: Article[]
}

export function ArticlesSection({ articles }: ArticlesSectionProps) {
  return (
    <section id="articles" className="border-t border-border/70 py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="mb-10 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div className="max-w-2xl">
            <p className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.22em] text-primary">
              <BookOpen className="h-3.5 w-3.5" /> Knowledge hub
            </p>
            <h2 className="text-balance text-3xl font-bold tracking-[-0.03em] sm:text-5xl">
              Read the strategy. Know the game.
            </h2>
          </div>
          <Link
            href="/articles"
            className="inline-flex h-10 items-center gap-2 self-start rounded-full border border-border bg-card px-4 text-sm font-semibold transition-colors hover:border-primary/60 hover:text-primary sm:self-auto"
          >
            View all articles <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {articles.length ? (
          <div className="grid gap-4 lg:grid-cols-3">
            {articles.map((article) => (
              <ArticleCard key={article.id} article={article} variant="featured" />
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-border bg-card/70 p-8 text-sm text-muted-foreground">
            The latest articles are being prepared. Visit the article hub for updates.
          </div>
        )}
      </div>
    </section>
  )
}

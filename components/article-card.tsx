import Link from "next/link"
import { ArrowRight, Clock } from "lucide-react"
import type { Article } from "@/types/article"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

type Props = {
  article: Article
  variant?: "default" | "compact" | "featured"
}

export function ArticleCard({ article, variant = "default" }: Props) {
  if (variant === "featured") {
    return (
      <article className="group flex min-h-72 flex-col rounded-2xl border border-border bg-card/75 p-6 transition-all hover:-translate-y-1 hover:border-primary/45">
        <div className="mb-12 flex items-center justify-between gap-4">
          <span className="rounded-full bg-primary/10 px-2.5 py-1 text-[10px] font-bold tracking-[0.16em] text-primary uppercase">
            {article.cluster?.topicName ?? "Wawasan"}
          </span>
          <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Clock className="h-3.5 w-3.5" /> {article.readingTime} mnt
          </span>
        </div>
        <Link href={`/articles/${article.slug}`} className="mt-auto">
          <h3 className="line-clamp-3 text-xl leading-snug font-bold tracking-tight transition-colors group-hover:text-primary">
            {article.title}
          </h3>
          {article.excerpt ? (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-muted-foreground">
              {article.excerpt}
            </p>
          ) : null}
          <span className="mt-6 inline-flex items-center gap-2 text-xs font-bold tracking-[0.16em] text-primary uppercase">
            Baca artikel{" "}
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
          </span>
        </Link>
      </article>
    )
  }

  if (variant === "compact") {
    return (
      <article>
        <Link
          href={`/articles/${article.slug}`}
          className="group flex items-start gap-4 border-b border-border py-4 last:border-0"
        >
          <div className="min-w-0 flex-1">
            <h3 className="line-clamp-2 text-sm font-medium text-foreground transition-colors group-hover:text-muted-foreground">
              {article.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              {formatDate(article.createdAt)} · {article.readingTime} menit baca
            </p>
          </div>
        </Link>
      </article>
    )
  }

  // Default: horizontal list row
  return (
    <article className="group flex items-start justify-between gap-6 border-b border-border py-7 last:border-0">
      <div className="min-w-0 flex-1 space-y-2">
        {/* Meta */}
        <div className="flex flex-wrap items-center gap-2">
          {article.cluster && (
            <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
              {article.cluster.topicName}
            </span>
          )}
          <span className="text-xs text-muted-foreground capitalize">
            {article.primaryKeyword?.intent}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <time
            className="text-xs text-muted-foreground"
            dateTime={article.createdAt}
          >
            {formatDate(article.createdAt)}
          </time>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">
            {article.readingTime} menit baca
          </span>
        </div>

        {/* Title */}
        <Link href={`/articles/${article.slug}`}>
          <h2 className="text-lg leading-snug font-bold text-foreground transition-colors group-hover:text-primary sm:text-xl">
            {article.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {article.excerpt}
          </p>
        )}
      </div>

      {/* Arrow */}
      <Link
        href={`/articles/${article.slug}`}
        className="mt-1 shrink-0 rounded-full border border-border p-2 text-muted-foreground transition-colors group-hover:border-primary/50 group-hover:text-primary"
        aria-label={`Baca ${article.title}`}
      >
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  )
}

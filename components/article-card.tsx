import Link from "next/link"
import { ArrowRight } from "lucide-react"
import type { Article } from "@/types/article"

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  })
}

type Props = {
  article: Article
  variant?: "default" | "compact"
}

export function ArticleCard({ article, variant = "default" }: Props) {
  if (variant === "compact") {
    return (
      <article>
        <Link
          href={`/articles/${article.slug}`}
          className="group flex gap-4 items-start py-4 border-b border-border last:border-0"
        >
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-foreground group-hover:text-muted-foreground transition-colors line-clamp-2">
              {article.title}
            </h3>
            <p className="text-xs text-muted-foreground mt-1">
              {formatDate(article.createdAt)} · {article.readingTime} min read
            </p>
          </div>
        </Link>
      </article>
    )
  }

  // Default: horizontal list row
  return (
    <article className="group flex items-start justify-between gap-6 py-6 border-b border-border last:border-0">
      <div className="flex-1 min-w-0 space-y-2">
        {/* Meta */}
        <div className="flex items-center gap-2 flex-wrap">
          {article.cluster && (
            <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-muted text-muted-foreground">
              {article.cluster.topicName}
            </span>
          )}
          <span className="text-xs text-muted-foreground capitalize">
            {article.primaryKeyword?.intent}
          </span>
          <span className="text-xs text-muted-foreground">·</span>
          <time className="text-xs text-muted-foreground" dateTime={article.createdAt}>
            {formatDate(article.createdAt)}
          </time>
          <span className="text-xs text-muted-foreground">·</span>
          <span className="text-xs text-muted-foreground">{article.readingTime} min read</span>
        </div>

        {/* Title */}
        <Link href={`/articles/${article.slug}`}>
          <h2 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-muted-foreground transition-colors leading-snug">
            {article.title}
          </h2>
        </Link>

        {/* Excerpt */}
        {article.excerpt && (
          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
            {article.excerpt}
          </p>
        )}
      </div>

      {/* Arrow */}
      <Link
        href={`/articles/${article.slug}`}
        className="shrink-0 mt-1 p-2 rounded-full border border-border text-muted-foreground group-hover:border-foreground/30 group-hover:text-foreground transition-colors"
        aria-label={`Read ${article.title}`}
      >
        <ArrowRight className="h-4 w-4" />
      </Link>
    </article>
  )
}

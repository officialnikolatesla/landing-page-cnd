import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Clock, Calendar, BookOpen } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ArticleCard } from "@/components/article-card"
import { ReadingProgress } from "@/components/reading-progress"
import { BackToTop } from "@/components/back-to-top"
import { getArticle, getRelatedArticles } from "@/lib/api"

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  try {
    const article = await getArticle(slug)
    return {
      title: article.metaTitle || article.title,
      description: article.metaDescription || (article.excerpt ?? undefined),
      openGraph: {
        title: article.ogTitle || article.title,
        description: article.ogDescription || (article.excerpt ?? undefined),
        type: "article",
        publishedTime: article.createdAt,
      },
      alternates: {
        canonical: `/articles/${slug}`,
      },
    }
  } catch {
    return { title: "Article Not Found" }
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export default async function ArticleDetailPage({ params }: Props) {
  const { slug } = await params

  let article
  try {
    article = await getArticle(slug)
  } catch {
    notFound()
  }

  const related = await getRelatedArticles(slug)

  return (
    <>
      <ReadingProgress />
      <BackToTop />
      <Navbar />
      <main className="min-h-screen pt-16">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 py-12">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ChevronLeft className="h-4 w-4" />
              All Articles
            </Link>
          </nav>

          {/* Article header */}
          <header className="mb-10">
            {/* Category + keyword */}
            <div className="flex items-center gap-2 flex-wrap mb-4">
              {article.cluster && (
                <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-muted text-muted-foreground">
                  {article.cluster.topicName}
                </span>
              )}
              {article.primaryKeyword && (
                <span className="text-xs text-muted-foreground capitalize">
                  {article.primaryKeyword.intent}
                </span>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight leading-tight mb-4">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="text-lg text-muted-foreground leading-relaxed mb-6">
                {article.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground border-t border-b border-border py-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.createdAt}>
                  {formatDate(article.createdAt)}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readingTime} min read
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {article.wordCount.toLocaleString()} words
              </span>
            </div>
          </header>

          {/* Article body — strip leading <h1> to avoid duplicate title */}
          <div
            className="prose prose-zinc dark:prose-invert max-w-none prose-headings:font-semibold prose-a:text-foreground prose-a:underline-offset-4 prose-code:text-sm"
            dangerouslySetInnerHTML={{
              __html: article.contentHtml.replace(/^<h1[^>]*>.*?<\/h1>\s*/i, ""),
            }}
          />
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="border-t border-border">
            <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
              <h2 className="text-xl font-semibold text-foreground mb-6">
                Related Articles
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {related.map((rel) => (
                  <ArticleCard key={rel.id} article={rel} />
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
      <Footer />
    </>
  )
}

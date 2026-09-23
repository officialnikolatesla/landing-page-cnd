import type { Metadata } from "next"
import Link from "next/link"
import { notFound } from "next/navigation"
import { ChevronLeft, Clock, Calendar, BookOpen } from "lucide-react"
import { NavbarShell } from "@/components/layout/navbar-shell"
import { Footer } from "@/components/layout/footer"
import { ArticleCard } from "@/components/article-card"
import { ReadingProgress } from "@/components/reading-progress"
import { BackToTop } from "@/components/back-to-top"
import { getArticle, getRelatedArticles } from "@/lib/api"
import { JsonLd } from "@/components/seo/json-ld"

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
    return { title: "Artikel Tidak Ditemukan" }
  }
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("id-ID", {
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
      {article.schemaJsonld ? <JsonLd data={article.schemaJsonld} /> : null}
      <ReadingProgress />
      <BackToTop />
      <NavbarShell />
      <main className="min-h-screen pt-16">
        <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 sm:py-20">
          {/* Breadcrumb */}
          <nav className="mb-8" aria-label="Breadcrumb">
            <Link
              href="/articles"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-primary"
            >
              <ChevronLeft className="h-4 w-4" />
              Semua Artikel
            </Link>
          </nav>

          {/* Article header */}
          <header className="mb-10">
            {/* Category + keyword */}
            <div className="mb-4 flex flex-wrap items-center gap-2">
              {article.cluster && (
                <span className="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">
                  {article.cluster.topicName}
                </span>
              )}
              {article.primaryKeyword && (
                <span className="text-xs text-muted-foreground capitalize">
                  {article.primaryKeyword.intent}
                </span>
              )}
            </div>

            <h1 className="mb-5 text-4xl leading-[1.08] font-bold tracking-[-0.04em] text-balance text-foreground sm:text-6xl">
              {article.title}
            </h1>

            {article.excerpt && (
              <p className="mb-6 text-lg leading-relaxed text-muted-foreground">
                {article.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap items-center gap-4 border-y border-border py-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                <time dateTime={article.createdAt}>
                  {formatDate(article.createdAt)}
                </time>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {article.readingTime} menit baca
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen className="h-4 w-4" />
                {article.wordCount.toLocaleString("id-ID")} kata
              </span>
            </div>
          </header>

          {/* Article body — strip leading <h1> to avoid duplicate title */}
          <div
            className="prose max-w-none prose-zinc dark:prose-invert prose-headings:font-bold prose-headings:tracking-tight prose-a:text-primary prose-a:underline-offset-4 prose-code:text-sm"
            dangerouslySetInnerHTML={{
              __html: article.contentHtml.replace(
                /^<h1[^>]*>.*?<\/h1>\s*/i,
                ""
              ),
            }}
          />
        </div>

        {/* Related articles */}
        {related.length > 0 && (
          <div className="border-t border-border/70 bg-card/25">
            <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
              <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
                Artikel terkait
              </h2>
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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

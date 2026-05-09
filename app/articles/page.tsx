import type { Metadata } from "next"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Navbar } from "@/components/layout/navbar"
import { Footer } from "@/components/layout/footer"
import { ArticleCard } from "@/components/article-card"
import { getArticles } from "@/lib/api"
import { BackToTop } from "@/components/back-to-top"

export const metadata: Metadata = {
  title: "Articles | Brand",
  description: "Browse the latest articles, guides, and insights.",
  openGraph: {
    title: "Articles | Brand",
    description: "Browse the latest articles, guides, and insights.",
    type: "website",
  },
}

type Props = {
  searchParams: Promise<{ page?: string }>
}

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams
  const page = Math.max(1, Number(params.page ?? 1))

  let data
  let error: string | null = null
  try {
    data = await getArticles(page, 20)
  } catch {
    error = "Failed to load articles. Please try again later."
  }

  const pagination = data?.pagination
  const articles = data?.items ?? []

  return (
    <>
      <BackToTop />
      <Navbar />
      <main className="min-h-screen pt-16">
        {/* Page header */}
        <div className="border-b border-border">
          <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
            <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-1">
              Latest Articles
            </h1>
            <p className="text-muted-foreground text-sm">
              {pagination
                ? `${pagination.total} articles across all topics`
                : "Browse the latest articles, guides, and insights."}
            </p>
          </div>
        </div>

        <div className="mx-auto max-w-6xl px-4 sm:px-6 py-10">
          {/* Error state */}
          {error && (
            <div className="rounded-lg border border-destructive/30 bg-destructive/10 p-6 text-center text-sm text-destructive">
              {error}
            </div>
          )}

          {/* Empty state */}
          {!error && articles.length === 0 && (
            <div className="py-24 text-center">
              <p className="text-muted-foreground">No articles found.</p>
            </div>
          )}

          {/* 75/25 layout */}
          {articles.length > 0 && (
            <div className="flex flex-col lg:flex-row gap-10">

              {/* Article list — 75% */}
              <div className="flex-1 min-w-0">
                <div>
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.totalPages > 1 && (
                  <nav
                    className="mt-10 flex items-center justify-between"
                    aria-label="Pagination"
                  >
                    {page > 1 ? (
                      <Link
                        href={`/articles?page=${page - 1}`}
                        rel="prev"
                        className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-border text-sm text-foreground hover:bg-accent transition-colors"
                      >
                        <ChevronLeft className="h-4 w-4" />
                        Previous
                      </Link>
                    ) : (
                      <div />
                    )}
                    <p className="text-sm text-muted-foreground">
                      Page {pagination.page} of {pagination.totalPages}
                    </p>
                    {page < pagination.totalPages ? (
                      <Link
                        href={`/articles?page=${page + 1}`}
                        rel="next"
                        className="inline-flex items-center gap-1.5 h-9 px-4 rounded-md border border-border text-sm text-foreground hover:bg-accent transition-colors"
                      >
                        Next
                        <ChevronRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <div />
                    )}
                  </nav>
                )}
              </div>

              {/* Sidebar — 25% */}
              <aside className="lg:w-72 shrink-0 space-y-6">
                {/* Placeholder widget 1 */}
                <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <div className="h-4 w-24 rounded bg-muted" />
                  <div className="space-y-2">
                    <div className="h-3 w-full rounded bg-muted" />
                    <div className="h-3 w-4/5 rounded bg-muted" />
                    <div className="h-3 w-3/5 rounded bg-muted" />
                  </div>
                  <div className="h-8 w-full rounded-md bg-muted" />
                </div>

                {/* Placeholder widget 2 */}
                <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <div className="h-4 w-32 rounded bg-muted" />
                  <div className="space-y-2.5">
                    {[1, 2, 3, 4].map((i) => (
                      <div key={i} className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-full bg-muted shrink-0" />
                        <div className="flex-1 space-y-1.5">
                          <div className="h-3 w-full rounded bg-muted" />
                          <div className="h-2.5 w-3/4 rounded bg-muted" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Placeholder widget 3 */}
                <div className="rounded-xl border border-border bg-card p-5 space-y-3">
                  <div className="h-4 w-20 rounded bg-muted" />
                  <div className="flex flex-wrap gap-2">
                    {[80, 60, 90, 70, 50, 75].map((w, i) => (
                      <div key={i} className={`h-6 rounded-full bg-muted`} style={{ width: `${w / 4}px` }} />
                    ))}
                  </div>
                </div>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}

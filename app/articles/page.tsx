import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRight,
  BookOpen,
  ChevronLeft,
  ChevronRight,
  Compass,
} from "lucide-react"

import { ArticleCard } from "@/components/article-card"
import { BackToTop } from "@/components/back-to-top"
import { Footer } from "@/components/layout/footer"
import { NavbarShell } from "@/components/layout/navbar-shell"
import { getArticles } from "@/lib/api"

export const metadata: Metadata = {
  title: "Artikel | Market Indo",
  description:
    "Baca artikel, panduan, dan kabar game pilihan untuk pasar Indonesia.",
  openGraph: {
    title: "Artikel | Market Indo",
    description:
      "Baca artikel, panduan, dan kabar game pilihan untuk pasar Indonesia.",
    type: "website",
  },
}

type Props = {
  searchParams: Promise<{ page?: string }>
}

export default async function ArticlesPage({ searchParams }: Props) {
  const params = await searchParams
  const requestedPage = Number(params.page ?? 1)
  const page = Number.isFinite(requestedPage) ? Math.max(1, requestedPage) : 1

  let data
  let error: string | null = null
  try {
    data = await getArticles(page, 20)
  } catch {
    error = "Artikel belum dapat dimuat. Silakan coba lagi beberapa saat lagi."
  }

  const pagination = data?.pagination
  const articles = data?.items ?? []

  return (
    <>
      <BackToTop />
      <NavbarShell />
      <main className="min-h-screen pt-16">
        <header className="relative isolate overflow-hidden border-b border-border py-16 sm:py-24">
          <div className="market-pattern absolute inset-0 -z-20 opacity-30" />
          <div className="absolute top-0 -left-24 -z-10 h-72 w-72 rounded-full bg-primary/15 blur-3xl" />
          <div className="mx-auto max-w-6xl px-4 sm:px-6">
            <p className="mb-4 flex items-center gap-2 text-xs font-bold tracking-[0.22em] text-primary uppercase">
              <BookOpen className="h-3.5 w-3.5" /> Pusat bacaan
            </p>
            <h1 className="max-w-4xl font-heading text-4xl leading-[1.02] font-semibold tracking-[-0.045em] text-balance sm:text-6xl">
              Cerita game dari sudut{" "}
              <span className="font-editorial font-normal text-primary italic">
                Indonesia.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground">
              Panduan, kabar, dan perspektif segar untuk memahami game yang
              sedang tumbuh di pasar lokal.
            </p>
            {pagination ? (
              <p className="mt-8 font-mono text-xs tracking-[0.18em] text-muted-foreground uppercase">
                {pagination.total.toString().padStart(2, "0")} artikel tersedia
              </p>
            ) : null}
          </div>
        </header>

        <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
          {error ? (
            <div className="rounded-2xl border border-primary/30 bg-primary/10 p-6 text-center text-sm text-primary">
              {error}
            </div>
          ) : null}

          {!error && articles.length === 0 ? (
            <div className="rounded-2xl border border-border bg-card py-24 text-center">
              <BookOpen className="mx-auto mb-4 h-8 w-8 text-muted-foreground" />
              <p className="font-semibold">Belum ada artikel.</p>
              <p className="mt-1 text-sm text-muted-foreground">
                Konten baru akan segera hadir di sini.
              </p>
            </div>
          ) : null}

          {articles.length > 0 ? (
            <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
              <div className="min-w-0">
                <div className="border-t border-border">
                  {articles.map((article) => (
                    <ArticleCard key={article.id} article={article} />
                  ))}
                </div>

                {pagination && pagination.totalPages > 1 ? (
                  <nav
                    className="mt-10 flex items-center justify-between"
                    aria-label="Pagination"
                  >
                    {page > 1 ? (
                      <Link
                        href={`/articles?page=${page - 1}`}
                        rel="prev"
                        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        <ChevronLeft className="h-4 w-4" /> Sebelumnya
                      </Link>
                    ) : (
                      <div />
                    )}
                    <p className="font-mono text-xs text-muted-foreground">
                      {pagination.page.toString().padStart(2, "0")} /{" "}
                      {pagination.totalPages.toString().padStart(2, "0")}
                    </p>
                    {page < pagination.totalPages ? (
                      <Link
                        href={`/articles?page=${page + 1}`}
                        rel="next"
                        className="inline-flex h-10 items-center gap-1.5 rounded-full border border-border bg-card px-4 text-sm font-semibold transition-colors hover:border-primary/50 hover:text-primary"
                      >
                        Berikutnya <ChevronRight className="h-4 w-4" />
                      </Link>
                    ) : (
                      <div />
                    )}
                  </nav>
                ) : null}
              </div>

              <aside className="space-y-5">
                <div className="rounded-2xl border border-border bg-card p-6">
                  <Compass className="mb-5 h-6 w-6 text-primary" />
                  <h2 className="font-bold">Mulai dari sini</h2>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Kembali ke beranda untuk melihat pilihan dan pengalaman
                    terbaru.
                  </p>
                  <Link
                    href="/"
                    className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary"
                  >
                    Jelajahi beranda <ArrowRight className="h-4 w-4" />
                  </Link>
                </div>
                <div className="rounded-2xl border border-primary/20 bg-primary/10 p-6">
                  <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">
                    Catatan
                  </p>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">
                    Gunakan informasi ini sebagai referensi dan selalu bermain
                    secara bertanggung jawab.
                  </p>
                </div>
              </aside>
            </div>
          ) : null}
        </div>
      </main>
      <Footer />
    </>
  )
}

import axios from "axios"
import type { Article, ArticleDetail, ArticleListResponse } from "@/types/article"

const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    "X-API-Key": process.env.NEXT_PUBLIC_API_KEY ?? "",
  },
  timeout: 10_000,
})

export async function getArticles(
  page = 1,
  limit = 20
): Promise<ArticleListResponse> {
  const { data } = await apiClient.get("/articles", {
    params: { page, limit },
  })
  return data.data as ArticleListResponse
}

export async function getArticle(slug: string): Promise<ArticleDetail> {
  const { data } = await apiClient.get(`/articles/${slug}`)
  return data.data as ArticleDetail
}

export async function getRelatedArticles(slug: string): Promise<Article[]> {
  try {
    const { data } = await apiClient.get(`/articles/${slug}/related`)
    return (data.data as Article[]) ?? []
  } catch {
    return []
  }
}

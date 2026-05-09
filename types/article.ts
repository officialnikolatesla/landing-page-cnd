export type Keyword = {
  id: number
  keyword: string
  intent: string
  difficulty?: string
  priority?: number
  language?: string
  contentType?: string
}

export type Cluster = {
  id: number
  topicName: string
} | null

export type Article = {
  id: number
  slug: string
  title: string
  excerpt: string | null
  metaTitle: string
  metaDescription: string
  ogTitle: string
  ogDescription: string
  ogImageUrl: string | null
  wordCount: number
  readingTime: number
  status: string
  language: string
  createdAt: string
  updatedAt: string
  primaryKeyword: Keyword
  cluster: Cluster
}

export type ArticleDetail = Article & {
  contentHtml: string
  metaKeywords?: string[]
  targetKeywords?: string[]
  schemaJsonld?: Record<string, unknown>
  reviewNotes?: string | null
  authorType?: string
}

export type Pagination = {
  page: number
  limit: number
  total: number
  totalPages: number
}

export type ArticleListResponse = {
  items: Article[]
  pagination: Pagination
}

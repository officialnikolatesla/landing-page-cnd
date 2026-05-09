# CS AI Landing Page

Landing page dan halaman artikel berbasis Next.js App Router untuk menampilkan konten dari Web Client API.

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- Axios

## Fitur Utama

- Landing page marketing (`/`)
- Daftar artikel dengan pagination (`/articles?page=1`)
- Detail artikel SEO-friendly (`/articles/[slug]`)
- Related articles di halaman detail
- Reading progress + back-to-top
- Dynamic `sitemap.xml` proxy ke API
- Dynamic `robots.txt` berbasis `NEXT_PUBLIC_SITE_URL`

## Requirement

- Node.js 20+ (disarankan LTS terbaru)
- Package manager: npm / pnpm / yarn / bun

## Setup Lokal

1. Install dependency:

```bash
npm install
```

2. Copy env:

```bash
cp .env.example .env
```

3. Isi `.env`:

```env
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_API_KEY=your-api-key
```

4. Jalankan development server:

```bash
npm run dev
```

Buka `http://localhost:3000`.

## Scripts

- `npm run dev` — jalankan app di mode development (Turbopack)
- `npm run build` — build production
- `npm run start` — jalankan hasil build
- `npm run lint` — jalankan ESLint
- `npm run typecheck` — validasi TypeScript
- `npm run format` — format file TS/TSX dengan Prettier

## Struktur Folder Inti

```txt
app/
  page.tsx                 # Landing page
  articles/page.tsx        # List artikel + pagination
  articles/[slug]/page.tsx # Detail artikel
  sitemap.xml/route.ts     # Proxy sitemap dari API
  robots.txt/route.ts      # Robots dinamis
components/
  home/*                   # Section landing page
  layout/*                 # Navbar dan footer
  article-card.tsx
  back-to-top.tsx
  reading-progress.tsx
lib/
  api.ts                   # API client untuk artikel
types/
  article.ts               # Type contract data artikel
```

## API Contract yang Digunakan

Project ini membaca data dari endpoint berikut:

- `GET /articles?page=<number>&limit=<number>`
- `GET /articles/:slug`
- `GET /articles/:slug/related`
- `GET /sitemap`

Header yang dikirim:

- `X-API-Key: <NEXT_PUBLIC_API_KEY>`

## Catatan

- `NEXT_PUBLIC_API_URL` wajib valid agar halaman artikel, sitemap, dan metadata artikel berjalan normal.
- `NEXT_PUBLIC_SITE_URL` dipakai untuk metadata base URL dan robots sitemap URL.

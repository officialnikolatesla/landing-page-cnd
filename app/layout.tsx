import type { Metadata } from "next"
import { Geist_Mono, Inter } from "next/font/google"
import Script from "next/script"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import {
  getLandingPageMetadata,
  getRootLayoutMetadata,
  siteLanguageFromMetadata,
} from "@/lib/seo-metadata"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export async function generateMetadata(): Promise<Metadata> {
  return getRootLayoutMetadata()
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const landing = await getLandingPageMetadata()
  const lang = siteLanguageFromMetadata(landing)

  return (
    <html
      lang={lang}
      suppressHydrationWarning
      className={cn("antialiased", fontMono.variable, "font-sans", inter.variable)}
    >
      <body>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-37V4RRVB9B"
          strategy="afterInteractive"
        />
        <Script id="gtag-init" strategy="afterInteractive">{`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-37V4RRVB9B');
        `}</Script>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

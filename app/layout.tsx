import type { Metadata } from "next"
import Script from "next/script"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { getRootLayoutMetadata } from "@/lib/seo-metadata"

export async function generateMetadata(): Promise<Metadata> {
  return getRootLayoutMetadata()
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="id" suppressHydrationWarning className="font-sans antialiased">
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

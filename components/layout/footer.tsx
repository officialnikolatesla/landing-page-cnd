import Link from "next/link"

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/sitemap.xml", label: "Sitemap" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 py-12">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <Link
              href="/"
              className="font-semibold text-lg tracking-tight text-foreground hover:opacity-80 transition-opacity"
            >
              Bola Balap<span className="text-muted-foreground">.</span>
            </Link>
            <p className="text-sm text-muted-foreground max-w-xs">
              A modern platform for sharing ideas, articles, and insights with the world.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Bola Balap. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Built with Next.js &amp; Tailwind CSS
          </p>
        </div>
      </div>
    </footer>
  )
}

import Link from "next/link"

const footerLinks = [
  { href: "/", label: "Home" },
  { href: "/articles", label: "Articles" },
  { href: "/sitemap.xml", label: "Sitemap" },
]

export function Footer() {
  return (
    <footer className="border-t border-border bg-[#07132c] text-white dark:bg-[#07132c]">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="space-y-2">
            <Link
              href="/"
              className="text-lg font-bold tracking-tight text-white transition-opacity hover:opacity-80"
            >
              Slot<span className="text-red-500">.</span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-slate-400">
              Curated games and fresh insights, designed for a fast and focused experience.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 sm:flex-row">
          <p className="text-xs text-slate-500">
            © {new Date().getFullYear()} Slot. All rights reserved.
          </p>
          <p className="text-xs text-slate-500">
            Play responsibly and stay in control.
          </p>
        </div>
      </div>
    </footer>
  )
}

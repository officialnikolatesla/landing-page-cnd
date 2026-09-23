import Link from "next/link"

const footerLinks = [
  { href: "/", label: "Beranda" },
  { href: "/articles", label: "Artikel" },
  { href: "/sitemap.xml", label: "Sitemap" },
]

export function Footer() {
  return (
    <footer className="border-t-8 border-primary bg-[#241817] text-white">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="space-y-2">
            <Link
              href="/"
              className="font-heading text-xl font-semibold tracking-tight text-white transition-opacity hover:opacity-80"
            >
              Market{" "}
              <span className="font-editorial font-normal text-red-400 italic">
                Indo.
              </span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-slate-400">
              Kurasi game dan wawasan lokal untuk pemain Indonesia yang ingin
              menjelajah dengan lebih praktis.
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
            © {new Date().getFullYear()} Market Indo. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-slate-500">
            Bermainlah secara bertanggung jawab dan tetap pegang kendali.
          </p>
        </div>
      </div>
    </footer>
  )
}

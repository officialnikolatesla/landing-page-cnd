import Link from "next/link"

const footerLinks = [
  { href: "/", label: "Beranda" },
  { href: "/articles", label: "Artikel" },
  { href: "/sitemap.xml", label: "Sitemap" },
]

export function Footer() {
  return (
    <footer className="border-t border-white/15 bg-[#07130d] text-white">
      <div className="mx-auto max-w-[100rem] border-x border-white/15 px-5 py-14 sm:px-8">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          {/* Brand */}
          <div className="space-y-2">
            <Link
              href="/"
              className="text-xl font-black tracking-tight text-white uppercase transition-opacity hover:opacity-80"
            >
              Keluarga <span className="text-[#94e759]">Cendana</span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-slate-400">
              Rumah untuk permainan online, cerita baru, dan keseruan yang
              tumbuh bersama pemain Indonesia.
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
            © {new Date().getFullYear()} Keluarga Cendana. Hak cipta dilindungi.
          </p>
          <p className="text-xs text-slate-500">
            Bermainlah secara bertanggung jawab dan tetap pegang kendali.
          </p>
        </div>
      </div>
    </footer>
  )
}

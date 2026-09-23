"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X, ArrowUpRight } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type NavbarProps = {
  redirectUrl: string
}

const navLinks = [
  { href: "/", label: "Beranda" },
  { href: "/#how-it-works", label: "Cara jelajah" },
  { href: "/articles", label: "Artikel" },
]

export function Navbar({ redirectUrl }: NavbarProps) {
  const pathname = usePathname()
  const { resolvedTheme, setTheme } = useTheme()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [prevPathname, setPrevPathname] = useState(pathname)

  if (pathname !== prevPathname) {
    setPrevPathname(pathname)
    setMobileOpen(false)
  }

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-white/15 bg-[#07130d]/95 backdrop-blur-xl"
          : "border-b border-white/15 bg-[#07130d]"
      )}
    >
      <div className="mx-auto flex h-16 max-w-[100rem] items-center justify-between border-x border-white/15 px-4 text-white sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-3 text-base font-semibold tracking-[-0.03em] transition-opacity hover:opacity-80"
        >
          <span className="flex h-8 w-8 items-center justify-center border border-[#94e759] font-mono text-[10px] font-black text-[#94e759]">
            KC
          </span>
          <span className="leading-none font-black tracking-[-0.04em] uppercase">
            Keluarga <span className="text-[#94e759]">Cendana</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                pathname === link.href ||
                  (link.href === "/articles" &&
                    pathname.startsWith("/articles"))
                  ? "font-medium text-[#94e759]"
                  : "text-white/55 hover:text-white"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="p-2 text-white/55 transition-colors hover:text-[#94e759]"
            aria-label="Toggle theme"
          >
            <Sun className="hidden h-4 w-4 dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </button>

          {redirectUrl ? (
            <Link
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden h-9 items-center gap-1.5 bg-[#94e759] px-4 text-xs font-black tracking-wider text-[#07130d] uppercase transition-colors hover:bg-white md:inline-flex"
            >
              Main sekarang
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="p-2 text-white/60 transition-colors hover:text-white md:hidden"
            aria-label="Toggle menu"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="border-t border-white/15 bg-[#07130d] text-white md:hidden">
          <nav className="flex flex-col gap-1 px-4 py-4">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "rounded-md px-3 py-2 text-sm transition-colors",
                  pathname === link.href ||
                    (link.href === "/articles" &&
                      pathname.startsWith("/articles"))
                    ? "bg-[#94e759] font-medium text-[#07130d]"
                    : "text-white/60 hover:bg-white/5 hover:text-white"
                )}
              >
                {link.label}
              </Link>
            ))}
            {redirectUrl ? (
              <Link
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 flex h-10 items-center justify-center bg-[#94e759] text-sm font-bold text-[#07130d]"
              >
                Main sekarang
              </Link>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  )
}

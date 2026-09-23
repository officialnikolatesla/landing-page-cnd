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
          ? "border-b border-border bg-background/82 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2.5 text-lg font-black tracking-[-0.04em] text-foreground uppercase transition-opacity hover:opacity-80"
        >
          <span className="grid h-8 w-8 rotate-45 grid-cols-2 gap-0.5 border-2 border-primary p-1.5">
            <span className="bg-primary" />
            <span className="rounded-full bg-primary/45" />
            <span className="rounded-full bg-primary/45" />
            <span className="bg-primary" />
          </span>
          <span>
            Market <span className="text-primary">Indo.</span>
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
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:text-foreground"
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
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
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
              className="hidden h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
            >
              Jelajah game
              <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="rounded-md p-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground md:hidden"
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
        <div className="border-t border-border bg-background/95 backdrop-blur-md md:hidden">
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
                    ? "bg-accent font-medium text-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-foreground"
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
                className="mt-2 flex h-10 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground"
              >
                Jelajah game
              </Link>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  )
}

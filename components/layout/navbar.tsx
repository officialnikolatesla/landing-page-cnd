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
  { href: "/", label: "Home" },
  { href: "/#how-it-works", label: "How it works" },
  { href: "/articles", label: "Articles" },
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
        "fixed top-0 inset-x-0 z-50 transition-all duration-200",
        scrolled
          ? "border-b border-border bg-background/82 shadow-lg shadow-black/5 backdrop-blur-xl"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-bold tracking-[-0.03em] text-foreground transition-opacity hover:opacity-80"
        >
          <span className="grid h-7 w-7 grid-cols-2 gap-1 rounded-lg bg-primary p-1.5 shadow-[0_0_20px_-5px_var(--primary)]">
            <span className="rounded-sm bg-white" />
            <span className="rounded-full bg-white/70" />
            <span className="rounded-full bg-white/70" />
            <span className="rounded-sm bg-white" />
          </span>
          Slot<span className="text-primary">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                pathname === link.href || (link.href === "/articles" && pathname.startsWith("/articles"))
                  ? "text-foreground font-medium"
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
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            className="p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle theme"
          >
            <Sun className="h-4 w-4 hidden dark:block" />
            <Moon className="h-4 w-4 dark:hidden" />
          </button>

          {redirectUrl ? (
            <Link
              href={redirectUrl}
              target="_blank"
              rel="noopener noreferrer"
            className="hidden h-9 items-center gap-1.5 rounded-full bg-primary px-4 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5 md:inline-flex"
          >
            Play now
            <ArrowUpRight className="h-3.5 w-3.5" />
            </Link>
          ) : null}

          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent transition-colors"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-background/95 backdrop-blur-md">
          <nav className="flex flex-col px-4 py-4 gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "py-2 px-3 rounded-md text-sm transition-colors",
                    pathname === link.href || (link.href === "/articles" && pathname.startsWith("/articles"))
                    ? "bg-accent text-foreground font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
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
                Play now
              </Link>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  )
}

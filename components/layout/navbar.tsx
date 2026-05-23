"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useTheme } from "next-themes"
import { Moon, Sun, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"

type NavbarProps = {
  redirectUrl: string
}

const navLinks = [
  { href: "/", label: "Home" }
]

export function Navbar({ redirectUrl }: NavbarProps) {
  const pathname = usePathname()
  const { theme, setTheme } = useTheme()
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
          ? "bg-background/80 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      )}
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-lg tracking-tight text-foreground hover:opacity-80 transition-opacity"
        >
          Bola Balap<span className="text-muted-foreground">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                pathname === link.href
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
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
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
              className="hidden md:inline-flex items-center h-8 px-4 text-sm font-medium rounded-md bg-foreground text-background hover:opacity-90 transition-opacity"
            >
              Mulai
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
                  pathname === link.href
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
                className="mt-2 flex items-center justify-center h-9 text-sm font-medium rounded-md bg-foreground text-background"
              >
                Mulai
              </Link>
            ) : null}
          </nav>
        </div>
      )}
    </header>
  )
}

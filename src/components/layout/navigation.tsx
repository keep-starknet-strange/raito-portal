"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/theme-toggle"

const navigation = [
  { name: "Explorer", href: "/explorer" },
  { name: "Verify TX", href: "/tx-check" },
  { name: "Verify Block", href: "/block-check" },
  { name: "Developers", href: "/developers" },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 border-b border-slate-800 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 theme-transition">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 justify-between">
          <div className="flex">
            <Link href="/" className="flex items-center group">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-lg bg-bitcoin flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-black font-bold text-lg">R</span>
                </div>
                <span className="font-bold text-xl text-text-primary group-hover:text-bitcoin transition-colors">Raito</span>
              </div>
            </Link>
            <div className="hidden sm:ml-8 sm:flex sm:space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-300 hover:scale-105",
                    pathname === item.href
                      ? "text-bitcoin border-b-2 border-bitcoin"
                      : "text-text-secondary hover:text-text-primary hover:border-slate-600 border-b-2 border-transparent"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center space-x-3">
            <ThemeToggle />
            <Link
              href="https://github.com/keep-starknet-strange/raito"
              target="_blank"
              rel="noopener noreferrer"
              className="text-text-secondary hover:text-bitcoin transition-all duration-300 hover:scale-110 p-2 rounded-md hover:bg-surface-alt/50"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                <path
                  fillRule="evenodd"
                  d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                  clipRule="evenodd"
                />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
} 
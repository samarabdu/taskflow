"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { LayoutDashboard, Plus, Moon, Sun, FolderKanban, ListTodo } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTask } from "@/context/task-context"
import { cn } from "@/lib/utils"

export function Navbar() {
  const { darkMode, toggleDarkMode } = useTask()
  const pathname = usePathname()

  const navLinks = [
    { href: "/", label: "Projects", icon: FolderKanban },
    { href: "/add-project", label: "New Project", icon: Plus },
    { href: "/add-task", label: "New Task", icon: ListTodo },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4 mx-auto">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            TaskFlow
          </span>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const Icon = link.icon
            const isActive = pathname === link.href
            return (
              <Button
                key={link.href}
                variant={isActive ? "secondary" : "ghost"}
                size="sm"
                asChild
                className={cn("transition-colors", isActive && "bg-primary/10 text-primary hover:bg-primary/20")}
              >
                <Link href={link.href}>
                  <Icon className="h-4 w-4 mr-2" />
                  {link.label}
                </Link>
              </Button>
            )
          })}
        </nav>

        {/* Right Side Actions */}
        <div className="flex items-center gap-2">
          {/* Mobile Menu */}
          <nav className="flex md:hidden items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon
              const isActive = pathname === link.href
              return (
                <Button
                  key={link.href}
                  variant={isActive ? "secondary" : "ghost"}
                  size="icon"
                  asChild
                  className={cn(isActive && "bg-primary/10 text-primary")}
                >
                  <Link href={link.href}>
                    <Icon className="h-4 w-4" />
                  </Link>
                </Button>
              )
            })}
          </nav>

          {/* Dark Mode Toggle */}
          <Button variant="outline" size="icon" onClick={toggleDarkMode} className="rounded-full bg-transparent">
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>
      </div>
    </header>
  )
}

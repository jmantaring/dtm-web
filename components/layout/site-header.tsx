"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { cn } from "@/lib/utils"
import { siteConfig } from "@/config/site"
import { useScrolled } from "@/hooks/use-scrolled"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { MobileNav } from "@/components/layout/mobile-nav"
import { ModeToggle } from "@/components/layout/mode-toggle"

export function SiteHeader() {
  const pathname = usePathname()
  const scrolled = useScrolled()

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full border-b bg-background transition-all",
        scrolled && "bg-background/80 backdrop-blur supports-backdrop-filter:bg-background/60"
      )}
    >
      <div
        className={cn(
          "mx-auto flex max-w-6xl items-center justify-between px-4 transition-all sm:px-6",
          scrolled ? "h-14" : "h-16"
        )}
      >
        <Link href="/" className="text-sm font-semibold tracking-tight">
          {siteConfig.name}
        </Link>

        <div className="flex items-center gap-1">
          <NavigationMenu className="hidden md:flex">
            <NavigationMenuList>
              {siteConfig.mainNav.map((item) => (
                <NavigationMenuItem key={item.href}>
                  <NavigationMenuLink
                    active={pathname === item.href}
                    className={navigationMenuTriggerStyle()}
                    render={<Link href={item.href} />}
                  >
                    {item.title}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
          <ModeToggle />
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

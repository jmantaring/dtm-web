import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import { Logo } from "@/components/brand/logo"

export function SiteFooter() {
  return (
    <footer className="border-t">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 py-6 sm:flex-row sm:px-6">
        <div className="flex items-center gap-3">
          <Logo height={24} />
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} {siteConfig.name}
          </p>
        </div>
        <nav className="flex items-center gap-2">
          {siteConfig.footerNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={buttonVariants({ variant: "ghost", size: "lg" })}
            >
              {item.title}
            </Link>
          ))}
          <Link
            href={siteConfig.contactHref}
            className={buttonVariants({ variant: "outline", size: "lg" })}
          >
            Contact Us
          </Link>
        </nav>
      </div>
    </footer>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import { InfoIcon, LinkBreakIcon, MapTrifoldIcon } from "@phosphor-icons/react/ssr"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { SiteShell } from "@/components/layout/site-shell"
import { NotFoundRecovery } from "@/components/marketing/not-found-recovery"

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false },
}

const suggestions = [
  { icon: MapTrifoldIcon, title: "Our Roadmap", body: "See what we're building next.", href: "/roadmap" },
  { icon: InfoIcon, title: "About us", body: "Our story since 2008.", href: "/about" },
  {
    icon: LinkBreakIcon,
    title: "Contact us",
    body: "Found a broken link? Let us know.",
    href: siteConfig.contactHref,
  },
]

export default function NotFound() {
  return (
    <SiteShell>
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
        <Badge variant="outline" className="h-6 px-3 uppercase">
          Error 404
        </Badge>
        <div aria-hidden className="relative w-fit">
          <div className="absolute inset-0 -m-4 bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] bg-size-[12px_12px] opacity-20" />
          <p className="relative text-7xl font-semibold tracking-tighter sm:text-9xl">404</p>
        </div>
        <h1 className="max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          This page isn&apos;t here.
        </h1>
        <p className="max-w-2xl text-sm text-balance text-muted-foreground sm:text-base">
          Even good searches come up empty sometimes. The link may be broken, or the page may have
          moved.
        </p>
        <NotFoundRecovery />
      </section>

      <section className="border-t bg-muted/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6">
          <h2 className="text-xs uppercase text-muted-foreground">Try one of these</h2>
          <ul className="grid gap-px border bg-border sm:grid-cols-3">
            {suggestions.map(({ icon: Icon, title, body, href }) => (
              <li key={href} className="flex">
                <Link
                  href={href}
                  className="flex flex-1 gap-4 bg-background p-6 transition-colors hover:bg-muted focus-visible:bg-muted focus-visible:outline-none"
                >
                  <span className="flex size-10 shrink-0 items-center justify-center border">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="flex flex-col gap-1">
                    <span className="font-semibold">{title}</span>
                    <span className="text-sm text-muted-foreground">{body}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </SiteShell>
  )
}

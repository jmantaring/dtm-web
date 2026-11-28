import type { Metadata } from "next"
import Link from "next/link"
import { ArrowDownIcon, ArrowRightIcon } from "@phosphor-icons/react/ssr"

import { cn } from "@/lib/utils"
import { product } from "@/config/product"
import { getCurrentPhase, roadmap } from "@/config/roadmap"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { WaitlistForm } from "@/components/marketing/waitlist-form"

export const metadata: Metadata = {
  description: `${product.name}: ${product.summary} Join the waitlist for early access.`,
  alternates: { canonical: "/" },
}

export default function HomePage() {
  const current = getCurrentPhase()

  return (
    <>
      {/* Hero: fills the first screen (minus the 4rem header). `min-h` so it can
          still grow when the content is taller than a short phone screen. */}
      <section id="waitlist" className="flex min-h-[calc(100svh-4rem)] flex-col">
        <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-center justify-center gap-6 px-4 py-12 text-center sm:px-6 sm:py-16">
          <Badge variant="outline" className="h-6 px-3 uppercase">
            Early access
          </Badge>
          <p className="text-sm font-semibold uppercase text-primary">{product.name}</p>
          <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            {product.tagline}
          </h1>
          <p className="max-w-xl text-sm text-balance text-muted-foreground sm:text-base">
            {product.description}
          </p>
          <WaitlistForm />
          <p className="text-xs uppercase text-muted-foreground">Early access spots are limited.</p>
        </div>

        {/* Scroll cue: names the next section (not just an arrow) and is a real link. */}
        <div className="relative flex h-28 shrink-0 items-end justify-center pb-6">
          <div
            aria-hidden
            className="absolute inset-0 bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] bg-size-[12px_12px] opacity-30 mask-[linear-gradient(to_bottom,transparent,black_60%)]"
          />
          <a
            href="#how-it-works"
            className="relative flex items-center gap-2 border bg-background px-4 py-2 text-xs font-medium uppercase transition-colors hover:border-primary hover:text-primary focus-visible:ring-1 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            See how it works
            <ArrowDownIcon className="size-4 motion-safe:animate-bounce" aria-hidden />
          </a>
        </div>
      </section>

      {/* How it works */}
      <section id="how-it-works" className="scroll-mt-14 border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">How it works</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Listen. Recall. Cue.
            </h2>
          </div>
          <ol className="grid gap-px border bg-border sm:grid-cols-3">
            {product.steps.map(({ icon: Icon, title, body }, index) => (
              <li key={title} className="flex flex-col gap-3 bg-background p-6">
                <div className="flex items-center justify-between">
                  <span className="flex size-10 shrink-0 items-center justify-center border">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <span className="text-xs text-muted-foreground" aria-hidden>
                    0{index + 1}
                  </span>
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Use cases */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">Use cases</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Built for the conversations that matter
            </h2>
          </div>
          <ul className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {product.useCases.map(({ icon: Icon, title, body, cue }) => (
              <li key={title} className="flex flex-col gap-3 bg-background p-6">
                <span className="flex size-10 shrink-0 items-center justify-center border">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
                <figure className="mt-auto flex flex-col gap-1 border-l-2 border-primary pl-3">
                  <figcaption className="text-xs font-semibold uppercase text-primary">
                    Example cue
                  </figcaption>
                  <blockquote className="text-xs leading-relaxed">{cue}</blockquote>
                </figure>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Privacy */}
      <section className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">Privacy</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Private by design. Your choice of model.
            </h2>
          </div>
          <ul className="grid gap-px border bg-border sm:grid-cols-3">
            {product.privacy.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex flex-col gap-3 bg-background p-6">
                <span className="flex size-10 shrink-0 items-center justify-center border">
                  <Icon className="size-5" aria-hidden />
                </span>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-muted-foreground">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Roadmap teaser */}
      {current && (
        <section className="border-t bg-muted/40">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between">
            <div className="flex max-w-2xl flex-col gap-3">
              <p className="text-xs uppercase text-muted-foreground">Where we are</p>
              <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
                Phase {current.number} of {current.total}: {current.phase.title}
              </h2>
              <p className="text-sm text-muted-foreground">{current.phase.summary}</p>
              <div aria-hidden className="flex gap-1 pt-1">
                {roadmap.map((phase) => (
                  <span
                    key={phase.id}
                    className={cn(
                      "h-1.5 w-8 sm:w-12",
                      phase.status === "done" && "bg-primary",
                      phase.status === "current" && "bg-primary/50",
                      (phase.status === "next" || phase.status === "later") && "bg-border"
                    )}
                  />
                ))}
              </div>
            </div>
            <Link
              href="/roadmap"
              className={cn(buttonVariants({ variant: "outline", size: "lg" }), "w-fit")}
            >
              See the roadmap
              <ArrowRightIcon data-icon="inline-end" aria-hidden />
            </Link>
          </div>
        </section>
      )}
    </>
  )
}

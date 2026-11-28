import type { Metadata } from "next"
import Link from "next/link"

import { product } from "@/config/product"
import {
  formatRoadmapDate,
  getCurrentPhase,
  roadmap,
  roadmapStartedAt,
  roadmapUpdatedAt,
} from "@/config/roadmap"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { RoadmapTimeline } from "@/components/roadmap/roadmap-timeline"

export const metadata: Metadata = {
  title: "Our Roadmap",
  description: `What we've built so far and what's next for ${product.name}, from the first prototype to public launch.`,
  alternates: { canonical: "/roadmap" },
}

export default function RoadmapPage() {
  const current = getCurrentPhase()

  return (
    <>
      {/* Header */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
        <Badge variant="outline" className="h-6 w-fit px-3 uppercase">
          Our roadmap
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Where {product.name} is headed
        </h1>
        <p className="max-w-2xl text-sm text-balance text-muted-foreground sm:text-base">
          {product.summary}{" "}
          <Link href="/" className="underline underline-offset-4 hover:text-foreground">
            Learn more
          </Link>
          .
        </p>
        <dl className="flex flex-wrap gap-x-8 gap-y-3 border-t pt-6 text-sm">
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase text-muted-foreground">Started</dt>
            <dd className="font-medium">{roadmapStartedAt}</dd>
          </div>
          {current && (
            <div className="flex flex-col gap-1">
              <dt className="text-xs uppercase text-muted-foreground">Currently</dt>
              <dd className="font-medium">
                <a href={`#${current.phase.id}`} className="hover:underline hover:underline-offset-4">
                  Phase {current.number} of {current.total}: {current.phase.title}
                </a>
              </dd>
            </div>
          )}
          <div className="flex flex-col gap-1">
            <dt className="text-xs uppercase text-muted-foreground">Last updated</dt>
            <dd className="font-medium">
              <time dateTime={roadmapUpdatedAt}>{formatRoadmapDate(roadmapUpdatedAt)}</time>
            </dd>
          </div>
        </dl>
        <p className="max-w-2xl text-xs text-muted-foreground">
          Future dates are our best estimates, not promises. Things can shift as we learn from
          testing, and we update this page every month so you always know where we are.
        </p>
      </section>

      {/* Timeline */}
      <section className="border-t">
        <div className="mx-auto w-full max-w-6xl px-4 py-16 sm:px-6">
          <div className="max-w-4xl">
            <RoadmapTimeline phases={roadmap} />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-end md:justify-between">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">Get involved</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Help shape what&apos;s next
            </h2>
            <p className="text-sm text-muted-foreground">
              Join early access to try {product.name} as we build it, or tell us what you&apos;d
              want it to do for you.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/#waitlist" className={buttonVariants({ size: "lg" })}>
              Join early access
            </Link>
            <Link href="/contact" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Share feedback
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from "next"
import {
  ChartLineUpIcon,
  ChatsCircleIcon,
  CodeIcon,
  FunnelIcon,
} from "@phosphor-icons/react/ssr"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "About",
  description:
    "Digital Think Media designs, builds, and grows digital products that help people decide with confidence. See what we do and what we've built, starting with IntelliReview.",
  alternates: { canonical: "/about" },
}

const capabilities = [
  {
    icon: CodeIcon,
    title: "Product design & engineering",
    body: "We take digital products from idea to launch and keep running them, building everything in-house.",
  },
  {
    icon: FunnelIcon,
    title: "Data-driven ranking & analysis",
    body: "We turn large volumes of messy signals, like thousands of customer reviews, into clear, ranked answers.",
  },
  {
    icon: ChartLineUpIcon,
    title: "Testing-led growth",
    body: "Search visibility, conversion, and retention, improved through steady experiments rather than guesswork.",
  },
  {
    icon: ChatsCircleIcon,
    title: "Built around user feedback",
    body: "We design for the people who use our products, and we let their behavior and feedback decide what ships next.",
  },
]

// The outcome lives in the "What we've built" section below, so the case study
// stops at the approach instead of repeating those numbers.
const caseStudy = [
  {
    label: "The problem",
    body: "Shoppers faced thousands of products and reviews. Sorting by average rating surfaced five-star items with only one or two reviews, which told them almost nothing.",
  },
  {
    label: "Our approach",
    body: "We treated every positive review as a vote for a product and every negative one as a vote against it, weighed them over time, and used semantic analysis to pull out what customers loved and disliked.",
  },
]

const results = [
  {
    value: "40+",
    label: "Buying guides",
    body: "From strollers and blenders to air purifiers and treadmills, each one ranked by real customer sentiment.",
  },
  {
    value: "Thousands",
    label: "Shoppers a day",
    body: "People came to our sites daily to skip the clutter and start with the products others actually loved.",
  },
  {
    value: "5 years",
    label: "Of testing and feedback",
    body: "We kept improving our sites long after launch, guided by experiments and what our visitors told us.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
        <Badge variant="outline" className="h-6 w-fit px-3 uppercase">
          About us
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          We turn too many choices into a few clear ones.
        </h1>
        <p className="max-w-2xl text-sm text-balance text-muted-foreground sm:text-base">
          {siteConfig.name} designs, builds, and grows digital products that help people cut
          through the noise and decide with confidence.
        </p>
      </section>

      {/* What we do */}
      <section className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">What we do</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Everything it takes to build and grow a digital product
            </h2>
          </div>
          <ul className="grid gap-px border bg-border sm:grid-cols-2">
            {capabilities.map(({ icon: Icon, title, body }) => (
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

      {/* Track record */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_2fr] md:gap-16">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">Track record</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">IntelliReview</h2>
            <p className="text-xs font-semibold uppercase text-muted-foreground">2008–2013</p>
            <p className="text-sm text-muted-foreground">
              Our first product, and still the clearest example of how we work.
            </p>
          </div>
          <dl className="flex max-w-2xl flex-col gap-6">
            {caseStudy.map((item) => (
              <div key={item.label} className="flex flex-col gap-1 border-l-2 border-primary pl-4">
                <dt className="text-xs font-semibold uppercase text-muted-foreground">
                  {item.label}
                </dt>
                <dd className="text-sm leading-relaxed sm:text-base">{item.body}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* What we've built: the IntelliReview results */}
      <section className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">What we&apos;ve built</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              See the best, skip the rest.
            </h2>
          </div>
          <ul className="grid gap-px border bg-border sm:grid-cols-3">
            {results.map((item) => (
              <li key={item.label} className="flex flex-col gap-2 bg-background p-6">
                <span className="text-3xl font-semibold tracking-tight">{item.value}</span>
                <span className="text-xs font-semibold uppercase text-muted-foreground">
                  {item.label}
                </span>
                <p className="text-sm text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}

import type { Metadata } from "next"
import Link from "next/link"
import {
  ArrowRightIcon,
  CompassIcon,
  HandshakeIcon,
  RocketLaunchIcon,
  UsersThreeIcon,
} from "@phosphor-icons/react/ssr"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "About",
  description:
    "Digital Think Media has built digital products since 2008, starting with IntelliReview. Meet the company, the story, and the founder, Jeff Chung.",
}

const facts = [
  { label: "Founded", value: "2008" },
  { label: "Founder", value: "Jeff Chung" },
  { label: "First product", value: "IntelliReview" },
]

const milestones = [
  {
    year: "2008",
    title: "Digital Think Media is founded",
    body: "Jeff Chung starts the company with one goal: use technology to make everyday decisions simpler for people.",
  },
  {
    year: "2008",
    title: "IntelliReview launches",
    body: "Our first website ranks products by how many happy customers they have, not just by star rating, so shoppers can see the best and skip the rest.",
  },
  {
    year: "Since",
    title: "Guiding shoppers across dozens of categories",
    body: "From strollers and blenders to air purifiers and treadmills, IntelliReview's buying guides helped people cut through thousands of reviews in minutes.",
  },
  {
    year: "Next",
    title: "A new generation of products",
    body: "We're taking what we learned and building new digital products for businesses. See what's coming on our roadmap.",
  },
]

const values = [
  {
    icon: UsersThreeIcon,
    title: "Trust the crowd, not the outlier",
    body: "One five-star review proves little. Hundreds of happy customers prove a lot. We build on signals that hold up at scale.",
  },
  {
    icon: CompassIcon,
    title: "Cut through the noise",
    body: "People don't have time to read 639 reviews. Our job is to turn too many choices into a few clear ones.",
  },
  {
    icon: HandshakeIcon,
    title: "Stay independent",
    body: "IntelliReview never took payment or free samples from manufacturers, and we were upfront about how we earned. That honesty is still how we work.",
  },
  {
    icon: RocketLaunchIcon,
    title: "Never finished",
    body: "Every product we ship is a starting point. We keep measuring, tuning, and improving long after launch.",
  },
]

export default function AboutPage() {
  return (
    <>
      {/* Hero: who we are, in one glance */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
        <Badge variant="outline" className="h-6 px-3 uppercase">
          About us
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          We build digital products that help people make better decisions.
        </h1>
        <p className="max-w-2xl text-sm text-balance text-muted-foreground sm:text-base">
          {siteConfig.name} has been building on the web since 2008. It started with one question
          from a new parent: how do you find the best product when there are thousands of choices
          and reviews you can&apos;t fully trust?
        </p>
        <dl className="mt-4 grid max-w-2xl grid-cols-1 border sm:grid-cols-3">
          {facts.map((fact) => (
            <div
              key={fact.label}
              className="flex flex-col gap-1 border-b p-4 last:border-b-0 sm:border-r sm:border-b-0 sm:last:border-r-0"
            >
              <dt className="text-xs uppercase text-muted-foreground">{fact.label}</dt>
              <dd className="text-lg font-semibold">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </section>

      {/* Origin story */}
      <section className="border-t">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-4 py-16 sm:px-6 md:grid-cols-[1fr_2fr] md:gap-16">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">Our story</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">It started with a baby bathtub.</h2>
          </div>
          <div className="flex max-w-2xl flex-col gap-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
            <p>
              When Jeff Chung&apos;s daughter was born, he wanted to buy her the very best. But
              sorting online stores by average rating kept surfacing five-star products with only one
              or two reviews. Could a handful of opinions really be trusted?
            </p>
            <p>
              Then, while shopping for a baby bathtub, he noticed something. A few products held a
              4 or 4.5 star rating even after <em>hundreds</em> of reviews from very different
              people. They had stood the test of time. Those, he realized, were the products truly
              worth recommending.
            </p>
            <p>
              That insight became <strong className="text-foreground">IntelliReview</strong>, the
              first website from {siteConfig.name}. Its idea was simple:{" "}
              <strong className="text-foreground">
                high rating + high number of reviews = best products
              </strong>
              . It counted positive reviews as happy customers, weighed them against unhappy ones
              and how long a product had been on the market, and used semantic analysis to surface
              what people actually loved and what they complained about.
            </p>
            <p>
              The result helped parents and shoppers from all walks of life skip the clutter and go
              straight to the best of the best.
            </p>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <div className="flex flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">Our journey</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">From one website to what&apos;s next</h2>
          </div>
          <ol className="grid gap-px border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {milestones.map((m) => (
              <li key={m.title} className="flex flex-col gap-3 bg-background p-6">
                <span className="text-xs font-semibold uppercase text-muted-foreground">{m.year}</span>
                <h3 className="font-semibold">{m.title}</h3>
                <p className="text-sm text-muted-foreground">{m.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Values */}
      <section className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 sm:px-6">
          <div className="flex max-w-2xl flex-col gap-2">
            <p className="text-xs uppercase text-muted-foreground">What we believe</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">The principles we&apos;ve kept since day one</h2>
          </div>
          <ul className="grid gap-8 sm:grid-cols-2">
            {values.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="flex size-10 shrink-0 items-center justify-center border">
                  <Icon className="size-5" aria-hidden />
                </span>
                <div className="flex flex-col gap-1">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="text-sm text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Founder */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto grid w-full max-w-6xl items-center gap-8 px-4 py-16 sm:px-6 md:grid-cols-[auto_1fr] md:gap-12">
          <div
            aria-hidden
            className="flex size-28 items-center justify-center border bg-background text-3xl font-semibold sm:size-36"
          >
            JC
          </div>
          <div className="flex max-w-2xl flex-col gap-3">
            <p className="text-xs uppercase text-muted-foreground">Meet the founder</p>
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">Jeff Chung</h2>
            <p className="text-sm font-medium">Founder, {siteConfig.name}</p>
            <p className="text-sm leading-relaxed text-muted-foreground sm:text-base">
              Jeff founded {siteConfig.name} in 2008 and built IntelliReview to solve a problem he
              faced as a new dad. He has spent the years since turning that same instinct, finding
              the signal in a sea of noise, into products that save people time and help them choose
              with confidence.
            </p>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="border-t">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-xl flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">The best is still ahead.</h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              We&apos;re building our next chapter now. See what&apos;s coming or get in touch.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Link href="/roadmap" className={buttonVariants({ size: "lg" })}>
              See our roadmap
              <ArrowRightIcon data-icon="inline-end" />
            </Link>
            <Link href={siteConfig.contactHref} className={buttonVariants({ variant: "outline", size: "lg" })}>
              Contact us
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

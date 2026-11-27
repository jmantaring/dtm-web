import type { Metadata } from "next"
import type { ReactNode } from "react"
import Link from "next/link"
import { CaretDownIcon, CheckIcon, XIcon } from "@phosphor-icons/react/ssr"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { LegalToc } from "@/components/legal/legal-toc"

export const metadata: Metadata = {
  title: "Website Usage License",
  description: `What you can and can't do when visiting the ${siteConfig.name} website.`,
}

/** Bump this whenever the terms below change. */
const LAST_UPDATED = { iso: "2026-11-28", label: "November 28, 2026" }

const youCan = [
  "Browse and read the site",
  "Save or print pages for personal reference",
  "Share links to any page",
  "Quote short excerpts with credit and a link back",
]

const youCant = [
  "Republish, sell or modify our content",
  "Scrape, bulk-download or use our content to train AI models",
  "Frame or mirror the site",
  "Use our names or logos to suggest we endorse you",
  "Try to break, overload or misuse the site",
]

const contactLink = (
  <Link href={siteConfig.contactHref} className="text-foreground underline underline-offset-4">
    contact page
  </Link>
)

type Section = {
  id: string
  /** Short label for the table of contents. */
  nav: string
  /** Question-style heading, phrased the way visitors would ask it. */
  title: string
  /** One-line plain-language summary shown before the full text. */
  summary: string
  body: ReactNode
}

const sections: Section[] = [
  {
    id: "scope",
    nav: "What this covers",
    title: "What does this license cover?",
    summary: "This website only. Using it means you accept these terms.",
    body: (
      <>
        <p>
          This Website Usage License (the &quot;license&quot;) sets out how you may use the{" "}
          {siteConfig.name} website and the pages, text, images and other material on it (the
          &quot;site&quot;). &quot;We&quot;, &quot;us&quot; and &quot;our&quot; mean {siteConfig.name}.
        </p>
        <p>
          It covers this website only. Our products and services may have their own terms, which
          apply to those products instead.
        </p>
        <p>
          By using the site you <strong className="text-foreground">accept this license</strong>.
          If you don&apos;t agree with it, please don&apos;t use the site.
        </p>
      </>
    ),
  },
  {
    id: "permitted-use",
    nav: "What you can do",
    title: "What can I do with this website?",
    summary: "Read it, save pages for yourself, share links and quote small parts with credit.",
    body: (
      <>
        <p>
          We give you a <strong className="text-foreground">limited, non-exclusive, non-transferable
          and revocable</strong> license to use the site for personal, non-commercial purposes. Under
          this license you may:
        </p>
        <ul className="list-disc space-y-1 pl-5">
          <li>view and read the site in a web browser;</li>
          <li>save or print individual pages for your own personal reference;</li>
          <li>share links to any page of the site; and</li>
          <li>
            quote short excerpts, as long as you credit {siteConfig.name} and link back to the page
            you quoted.
          </li>
        </ul>
        <p>Any other use needs our written permission first.</p>
      </>
    ),
  },
  {
    id: "restrictions",
    nav: "What you can't do",
    title: "What can't I do?",
    summary: "Copy or resell our content, scrape it, train AI on it, or misuse the site.",
    body: (
      <>
        <p>Unless we have agreed in writing, you must not:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>republish, sell, rent, license or modify content from the site;</li>
          <li>use the site or its content for commercial purposes;</li>
          <li>
            scrape, crawl or bulk-download the site, except for search-engine indexing that respects
            our robots.txt;
          </li>
          <li>use content from the site to train, test or improve AI or machine-learning models;</li>
          <li>frame or mirror the site, or present its content as part of another website;</li>
          <li>
            probe, attack or overload the site, or try to get around any security or access
            control;
          </li>
          <li>send spam or automated submissions through our forms;</li>
          <li>impersonate us, or suggest that we endorse you or your products; or</li>
          <li>use the site in any way that breaks the law.</li>
        </ul>
      </>
    ),
  },
  {
    id: "ownership",
    nav: "Who owns what",
    title: "Who owns the content and brand?",
    summary: "We do. This license doesn't give you any rights to our names or logos.",
    body: (
      <>
        <p>
          The site and its content are owned by {siteConfig.name} or the people who license content
          to us, and are protected by copyright and other intellectual-property laws.
        </p>
        <p>
          &quot;Digital Think Media&quot;, &quot;IntelliReview&quot; and our logos are our
          trademarks. Nothing in this license gives you any right to use them.
        </p>
      </>
    ),
  },
  {
    id: "your-submissions",
    nav: "What you send us",
    title: "What happens to what I send you?",
    summary: "We use your messages and sign-ups to reply to you and run our waitlist.",
    body: (
      <>
        <p>
          When you send us a message or join our waitlist, you confirm that you have the right to
          share what you submit. We use it to reply to you and to run the waitlist.
        </p>
        <p>
          Please <strong className="text-foreground">don&apos;t send confidential information</strong>{" "}
          through the site. If you share ideas or feedback, we may use them without any obligation to
          you.
        </p>
      </>
    ),
  },
  {
    id: "third-party-links",
    nav: "Links to other sites",
    title: "What about links to other websites?",
    summary: "We aren't responsible for other sites, and a link isn't an endorsement.",
    body: (
      <p>
        The site may link to websites we don&apos;t run. We don&apos;t control those sites and
        aren&apos;t responsible for their content, availability or practices. A link doesn&apos;t
        mean we endorse the site or anything on it.
      </p>
    ),
  },
  {
    id: "accuracy",
    nav: "Accuracy",
    title: "Is the information guaranteed?",
    summary: "No. It's general information, provided as is, and it may change.",
    body: (
      <>
        <p>
          Content on the site is general information, not professional advice. We work to keep it
          accurate, but we don&apos;t promise that it is complete, current or error-free.
        </p>
        <p>
          The site is provided <strong className="text-foreground">&quot;as is&quot; and &quot;as
          available&quot;</strong>. We may change, suspend or remove any part of it at any time, and
          we don&apos;t guarantee that it will always be available.
        </p>
      </>
    ),
  },
  {
    id: "liability",
    nav: "Liability",
    title: "What are the limits on your liability?",
    summary: "We aren't liable for indirect losses, except where the law says we must be.",
    body: (
      <>
        <p>
          To the extent the law allows, we aren&apos;t liable for any indirect or consequential loss,
          or for any loss that comes from relying on the site&apos;s content or from the site being
          unavailable.
        </p>
        <p>
          Nothing in this license limits or excludes any liability that cannot be limited or
          excluded by law.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    nav: "Ending the license",
    title: "Can this license end?",
    summary: "Yes, if you break these terms.",
    body: (
      <p>
        We may suspend or end your access to the site if you break this license. If that happens,
        sections 4 (ownership), 7 (accuracy) and 8 (liability) continue to apply.
      </p>
    ),
  },
  {
    id: "changes",
    nav: "Changes",
    title: "Will this license change?",
    summary: "It may. We'll update the date at the top when it does.",
    body: (
      <p>
        We may update this license from time to time. When we do, we&apos;ll change the &quot;Last
        updated&quot; date at the top of this page. If you keep using the site after a change, you
        accept the updated license.
      </p>
    ),
  },
  {
    id: "governing-law",
    nav: "Governing law",
    title: "Which law applies?",
    summary: "The law where we're established, plus any protections you have locally.",
    body: (
      <p>
        This license is governed by the laws of the place where {siteConfig.name} is established,
        without regard to its conflict-of-law rules. This doesn&apos;t take away any mandatory
        consumer protections you have under the law where you live.
      </p>
    ),
  },
  {
    id: "contact",
    nav: "Contact",
    title: "How do I contact you?",
    summary: "Use our contact page.",
    body: (
      <p>
        If you have questions about this license or want permission for a use it doesn&apos;t
        cover, reach us through our {contactLink}.
      </p>
    ),
  },
]

const tocItems = sections.map(({ id, nav }) => ({ id, title: nav }))

export default function LicensePage() {
  return (
    <>
      {/* Hero */}
      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-16 pb-12 sm:px-6 sm:pt-24">
        <Badge variant="outline" className="h-6 px-3 uppercase">
          Legal
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Website Usage License
        </h1>
        <p className="max-w-2xl text-sm text-balance text-muted-foreground sm:text-base">
          The rules for visiting and using the {siteConfig.name} website, in plain language first.
        </p>
        <p className="text-xs uppercase text-muted-foreground">
          Last updated <time dateTime={LAST_UPDATED.iso}>{LAST_UPDATED.label}</time>
        </p>

        {/* The short version */}
        <div className="mt-2 flex max-w-3xl flex-col border bg-muted/40">
          <h2 className="border-b px-5 py-3 text-sm font-semibold">The short version</h2>
          <div className="grid sm:grid-cols-2">
            <div className="flex flex-col gap-3 border-b p-5 sm:border-r sm:border-b-0">
              <p className="text-xs uppercase text-muted-foreground">You can</p>
              <ul className="flex flex-col gap-2 text-sm">
                {youCan.map((item) => (
                  <li key={item} className="flex gap-2">
                    <CheckIcon className="mt-0.5 size-4 shrink-0" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col gap-3 p-5">
              <p className="text-xs uppercase text-muted-foreground">You can&apos;t</p>
              <ul className="flex flex-col gap-2 text-sm">
                {youCant.map((item) => (
                  <li key={item} className="flex gap-2">
                    <XIcon className="mt-0.5 size-4 shrink-0 text-destructive" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <p className="border-t px-5 py-3 text-xs text-muted-foreground">
            This summary is for convenience. The sections below are the actual terms.
          </p>
        </div>
      </section>

      {/* Full terms */}
      <section className="border-t">
        <div className="mx-auto grid w-full max-w-6xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[14rem_1fr] md:gap-12">
          <aside className="hidden md:block">
            <LegalToc items={tocItems} />
          </aside>

          <div className="flex min-w-0 flex-col gap-12">
            {/* Mobile table of contents: native disclosure, works without JS */}
            <details className="group border md:hidden">
              <summary className="flex cursor-pointer list-none items-center justify-between px-4 py-3 text-xs uppercase text-muted-foreground [&::-webkit-details-marker]:hidden">
                On this page
                <CaretDownIcon className="size-4 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <ol className="flex flex-col border-t px-4 py-2">
                {tocItems.map((item, index) => (
                  <li key={item.id}>
                    <a
                      href={`#${item.id}`}
                      className="flex gap-2 py-1.5 text-sm text-muted-foreground hover:text-foreground"
                    >
                      <span className="tabular-nums">{index + 1}.</span>
                      {item.title}
                    </a>
                  </li>
                ))}
              </ol>
            </details>

            {sections.map((section, index) => (
              <section
                key={section.id}
                id={section.id}
                aria-labelledby={`${section.id}-heading`}
                className="flex scroll-mt-24 flex-col gap-3"
              >
                <h2
                  id={`${section.id}-heading`}
                  className="text-xl font-semibold tracking-tight sm:text-2xl"
                >
                  <a href={`#${section.id}`} className="group/anchor inline-flex gap-2">
                    <span className="text-muted-foreground tabular-nums">{index + 1}.</span>
                    <span>{section.title}</span>
                    <span
                      aria-hidden
                      className="text-muted-foreground opacity-0 transition-opacity group-hover/anchor:opacity-100 group-focus-visible/anchor:opacity-100"
                    >
                      #
                    </span>
                  </a>
                </h2>
                <p className="max-w-[68ch] border-l-2 pl-3 text-sm text-foreground sm:text-base">
                  <strong>In short:</strong> {section.summary}
                </p>
                <div className="flex max-w-[68ch] flex-col gap-3 text-sm leading-relaxed text-muted-foreground sm:text-base">
                  {section.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section className="border-t bg-muted/40">
        <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-4 py-16 sm:px-6 md:flex-row md:items-center md:justify-between">
          <div className="flex max-w-xl flex-col gap-2">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Questions about this license?
            </h2>
            <p className="text-sm text-muted-foreground sm:text-base">
              Ask us, or request permission for a use it doesn&apos;t cover.
            </p>
          </div>
          <Link href={siteConfig.contactHref} className={buttonVariants({ size: "lg" })}>
            Contact us
          </Link>
        </div>
      </section>
    </>
  )
}

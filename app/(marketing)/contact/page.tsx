import type { Metadata } from "next"
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { ContactForm } from "@/components/marketing/contact-form"

export const metadata: Metadata = {
  title: "Contact Us",
  description: `Get in touch with ${siteConfig.name}. Send us a message and we'll get back to you.`,
}

export default function ContactPage() {
  return (
    <section className="mx-auto grid w-full max-w-6xl flex-1 gap-12 px-4 py-16 sm:px-6 sm:py-24 md:grid-cols-[2fr_3fr] md:gap-16">
      <div className="flex flex-col gap-6">
        <Badge variant="outline" className="h-6 px-3 uppercase">
          Contact us
        </Badge>
        <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Let&apos;s talk.
        </h1>
        <p className="max-w-md text-sm text-balance text-muted-foreground sm:text-base">
          Have a question, an idea, or a partnership in mind? Send us a message and a real person
          from our team will get back to you.
        </p>
        <ul className="flex flex-col gap-3 border-t pt-6 text-sm text-muted-foreground">
          <li>
            <span className="font-medium text-foreground">Partnerships and business.</span> Tell us
            what you&apos;re building.
          </li>
          <li>
            <span className="font-medium text-foreground">Product questions.</span> Curious about
            what&apos;s coming?{" "}
            <Link href="/roadmap" className="underline underline-offset-4 hover:text-foreground">
              See our roadmap
            </Link>
            .
          </li>
          <li>
            <span className="font-medium text-foreground">Anything else.</span> We read every
            message.
          </li>
        </ul>
      </div>

      <div className="w-full">
        <ContactForm />
      </div>
    </section>
  )
}

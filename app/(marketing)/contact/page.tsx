import type { Metadata } from "next"

export const metadata: Metadata = { title: "Contact Us" }

export default function ContactPage() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-4 px-4 py-24 sm:px-6">
      <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Contact Us</h1>
      <p className="max-w-xl text-sm text-muted-foreground">Contact details are coming soon.</p>
    </section>
  )
}

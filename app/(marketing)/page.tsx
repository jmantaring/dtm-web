import { siteConfig } from "@/config/site"
import { Badge } from "@/components/ui/badge"
import { WaitlistForm } from "@/components/marketing/waitlist-form"

export default function HomePage() {
  return (
    <>
      <section className="mx-auto flex w-full max-w-6xl flex-col items-center justify-center gap-6 px-4 py-12 text-center sm:px-6 sm:py-16">
        <Badge variant="outline" className="h-6 px-3 uppercase">
          Join the early access
        </Badge>
        <h1 className="max-w-3xl text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
          We&apos;re getting ready to launch soon
        </h1>
        <p className="max-w-xl text-sm text-balance text-muted-foreground sm:text-base">
          {siteConfig.description}
        </p>
        <WaitlistForm />
        <p className="text-xs uppercase text-muted-foreground">Early access spots are limited.</p>
      </section>
      <div
        aria-hidden
        className="min-h-16 w-full flex-1 bg-[radial-gradient(var(--color-primary)_1px,transparent_1px)] bg-size-[12px_12px] opacity-20"
      />
    </>
  )
}

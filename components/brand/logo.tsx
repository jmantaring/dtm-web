import Image from "next/image"

import { cn } from "@/lib/utils"
import logoLight from "@/assets/brand/dtm-logo.svg"
import logoDark from "@/assets/brand/dtm-logo-dark.svg"

// Imported (not in public/) so the build emits hashed files under
// /_next/static/media/, which Cloudflare serves from the edge without
// invoking the Worker (see runWorkerFirst in cloudflare.config.ts).
const LOGO_RATIO = 401 / 111

type LogoProps = {
  /** Rendered height in px; width follows the logo's aspect ratio. */
  height?: number
  className?: string
  priority?: boolean
}

export function Logo({ height = 32, className, priority }: LogoProps) {
  const width = Math.round(height * LOGO_RATIO)
  const shared = { width, height, alt: "Digital Think Media", unoptimized: true, priority }

  return (
    <span className={cn("inline-flex shrink-0", className)}>
      <Image src={logoLight} {...shared} className="transition-[width,height] dark:hidden" />
      <Image
        src={logoDark}
        {...shared}
        alt=""
        aria-hidden
        className="hidden transition-[width,height] dark:block"
      />
    </span>
  )
}

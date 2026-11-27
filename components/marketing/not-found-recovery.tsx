"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react"

import { Button, buttonVariants } from "@/components/ui/button"

/** Shows the path that 404'd and gives the visitor a way out. */
export function NotFoundRecovery() {
  const pathname = usePathname()
  const router = useRouter()
  // Only offer "Go back" when there is somewhere to go back to. Checked after
  // mount so server and client markup match.
  const [canGoBack, setCanGoBack] = useState(false)

  useEffect(() => {
    setCanGoBack(window.history.length > 1)
  }, [])

  return (
    <div className="flex flex-col gap-6">
      {pathname && (
        <p className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          You tried:
          <code className="border bg-muted/40 px-2 py-0.5 break-all text-foreground">{pathname}</code>
        </p>
      )}
      <div className="flex flex-wrap gap-2">
        {canGoBack && (
          <Button variant="outline" size="lg" onClick={() => router.back()}>
            <ArrowLeftIcon data-icon="inline-start" />
            Go back
          </Button>
        )}
        <Link href="/" className={buttonVariants({ size: "lg" })}>
          Go to homepage
          <ArrowRightIcon data-icon="inline-end" />
        </Link>
      </div>
    </div>
  )
}

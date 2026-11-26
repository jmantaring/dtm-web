"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function WaitlistForm() {
  const [joined, setJoined] = useState(false)

  if (joined) {
    return (
      <p role="status" className="text-sm text-muted-foreground">
        Thanks — you&apos;re on the list.
      </p>
    )
  }

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault()
        setJoined(true)
      }}
      className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
    >
      <Input
        type="email"
        name="email"
        required
        placeholder="Enter your email"
        aria-label="Email"
        className="h-10 flex-1"
      />
      <Button type="submit" className="h-10 px-4 uppercase">
        Join the waitlist
      </Button>
    </form>
  )
}

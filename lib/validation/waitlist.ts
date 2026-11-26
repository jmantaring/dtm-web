import * as z from "zod"

import { emailField } from "@/lib/validation/email"

/** Used by the waitlist form (client) and `POST /api/waitlist` (server). */
export const waitlistSchema = z.object({
  email: emailField,
})

export type WaitlistInput = z.input<typeof waitlistSchema>
export type WaitlistSignup = z.output<typeof waitlistSchema>

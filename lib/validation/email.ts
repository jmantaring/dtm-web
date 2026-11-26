import * as z from "zod"

/** Shared email rule so every form reports the same messages. */
export const emailField = z
  .string({ error: "Please enter your email address." })
  .trim()
  .min(1, { error: "Please enter your email address." })
  .pipe(z.email({ error: "Please enter a valid email, like name@example.com." }))

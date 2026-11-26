import * as z from "zod"

import { emailField } from "@/lib/validation/email"

export const MESSAGE_MAX_LENGTH = 2000
export const SUBJECT_MAX_LENGTH = 120

/** Used by the contact form (client) and `POST /api/contact` (server). */
export const contactSchema = z.object({
  name: z.string({ error: "Please enter your name." }).trim().min(1, { error: "Please enter your name." }),
  email: emailField,
  subject: z
    .string()
    .trim()
    .max(SUBJECT_MAX_LENGTH, {
      error: `Please keep the subject under ${SUBJECT_MAX_LENGTH} characters.`,
    })
    .optional(),
  message: z
    .string({ error: "Please enter a message." })
    .trim()
    .min(1, { error: "Please enter a message." })
    .min(10, { error: "Please add a little more detail (at least 10 characters)." })
    .max(MESSAGE_MAX_LENGTH, {
      error: `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`,
    }),
})

/** Shape the form holds (before trimming). */
export type ContactInput = z.input<typeof contactSchema>
/** Shape sent to and accepted by the API (after trimming). */
export type ContactMessage = z.output<typeof contactSchema>

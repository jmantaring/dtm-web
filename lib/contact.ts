export type ContactMessage = {
  name: string
  email: string
  subject: string
  message: string
}

export const MESSAGE_MAX_LENGTH = 2000

/**
 * Temporary stand-in for the real contact endpoint.
 *
 * Waits ~1.2s so the loading state is visible, then succeeds.
 * To test the error state, use an email ending in "@fail.test".
 */
export async function submitContactMessage(data: ContactMessage): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, 1200))

  if (data.email.trim().toLowerCase().endsWith("@fail.test")) {
    throw new Error("Simulated network failure")
  }
}

import { jsonError, mockDelay, parseBody } from "@/lib/api/server"
import type { ContactResponse } from "@/lib/api/types"
import { contactSchema } from "@/lib/validation/contact"

/**
 * POST /api/contact
 *
 * MOCKED: validates the body and returns a fake success. Nothing is stored or emailed.
 * Test triggers (see README → "Test emails"):
 *   - email ending in "@fail.test" → 500 INTERNAL_ERROR
 */
export async function POST(request: Request) {
  const body = await parseBody(request, contactSchema)
  if (!body.ok) return body.response

  // TODO(backend): persist the message and send a notification email.
  await mockDelay()

  if (body.data.email.toLowerCase().endsWith("@fail.test")) {
    return jsonError(500, "INTERNAL_ERROR", "Something went wrong on our side.")
  }

  return Response.json(
    {
      data: { id: crypto.randomUUID(), receivedAt: new Date().toISOString() },
    } satisfies ContactResponse,
    { status: 201 }
  )
}

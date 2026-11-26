import { jsonError, mockDelay, parseBody } from "@/lib/api/server"
import type { WaitlistResponse } from "@/lib/api/types"
import { waitlistSchema } from "@/lib/validation/waitlist"

/**
 * POST /api/waitlist
 *
 * MOCKED: validates the body and returns a fake success. Nothing is stored.
 * Test triggers (see README → "Test emails"):
 *   - email ending in "@fail.test"   → 500 INTERNAL_ERROR
 *   - email ending in "@exists.test" → 409 ALREADY_ON_WAITLIST
 */
export async function POST(request: Request) {
  const body = await parseBody(request, waitlistSchema)
  if (!body.ok) return body.response

  // TODO(backend): insert into the waitlist table; return 409 on a unique-email conflict.
  await mockDelay()

  const email = body.data.email.toLowerCase()
  if (email.endsWith("@fail.test")) {
    return jsonError(500, "INTERNAL_ERROR", "Something went wrong on our side.")
  }
  if (email.endsWith("@exists.test")) {
    return jsonError(409, "ALREADY_ON_WAITLIST", "You're already on the list.")
  }

  return Response.json(
    {
      data: { id: crypto.randomUUID(), joinedAt: new Date().toISOString() },
    } satisfies WaitlistResponse,
    { status: 201 }
  )
}

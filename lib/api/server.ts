import * as z from "zod"

import type { ApiErrorBody, ApiErrorCode, FieldErrors } from "@/lib/api/types"

/** Server-only helpers for `app/api/*` route handlers. */

export function jsonError(
  status: number,
  code: ApiErrorCode,
  message: string,
  fieldErrors?: FieldErrors
) {
  return Response.json({ error: { code, message, fieldErrors } } satisfies ApiErrorBody, {
    status,
  })
}

type ParseResult<T> = { ok: true; data: T } | { ok: false; response: Response }

/** Reads the JSON body and validates it. On failure, returns a ready-to-send 400 response. */
export async function parseBody<S extends z.ZodType>(
  request: Request,
  schema: S
): Promise<ParseResult<z.output<S>>> {
  let raw: unknown
  try {
    raw = await request.json()
  } catch {
    return {
      ok: false,
      response: jsonError(400, "INVALID_JSON", "Request body must be valid JSON."),
    }
  }

  const result = schema.safeParse(raw)
  if (!result.success) {
    return {
      ok: false,
      response: jsonError(
        400,
        "VALIDATION_ERROR",
        "Please fix the highlighted fields.",
        z.flattenError(result.error).fieldErrors as FieldErrors
      ),
    }
  }

  return { ok: true, data: result.data }
}

/** Simulated backend latency so loading states are visible. Remove with the mocks. */
export function mockDelay(ms = 800) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

/**
 * Response contract shared by the API routes and the client.
 *
 * Success: `{ data: T }`
 * Error:   `{ error: { code, message, fieldErrors? } }`
 */

export type ApiErrorCode =
  | "INVALID_JSON"
  | "VALIDATION_ERROR"
  | "ALREADY_ON_WAITLIST"
  | "INTERNAL_ERROR"

/** Field name → list of messages, as produced by `z.flattenError(...).fieldErrors`. */
export type FieldErrors = Partial<Record<string, string[]>>

export type ApiSuccess<T> = { data: T }

export type ApiErrorBody = {
  error: {
    code: ApiErrorCode
    message: string
    fieldErrors?: FieldErrors
  }
}

export type ContactResponse = ApiSuccess<{ id: string; receivedAt: string }>
export type WaitlistResponse = ApiSuccess<{ id: string; joinedAt: string }>

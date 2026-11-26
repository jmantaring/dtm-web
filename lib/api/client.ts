import type { ApiErrorBody, ApiErrorCode, ApiSuccess, FieldErrors } from "@/lib/api/types"

export type ClientErrorCode = ApiErrorCode | "NETWORK_ERROR"

/** Thrown for every failed API call, so TanStack Query sees a rejected promise. */
export class ApiError extends Error {
  readonly status: number
  readonly code: ClientErrorCode
  readonly fieldErrors?: FieldErrors

  constructor(status: number, code: ClientErrorCode, message: string, fieldErrors?: FieldErrors) {
    super(message)
    this.name = "ApiError"
    this.status = status
    this.code = code
    this.fieldErrors = fieldErrors
  }
}

export function isApiError(error: unknown): error is ApiError {
  return error instanceof ApiError
}

/**
 * POST JSON to one of our `/api/*` routes and return its `data`.
 * `fetch` does not reject on HTTP errors, so non-2xx responses are turned into `ApiError`.
 */
export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  let response: Response
  try {
    response = await fetch(path, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    })
  } catch {
    throw new ApiError(0, "NETWORK_ERROR", "Please check your connection and try again.")
  }

  const json: unknown = await response.json().catch(() => null)

  if (!response.ok) {
    const error = (json as Partial<ApiErrorBody> | null)?.error
    throw new ApiError(
      response.status,
      error?.code ?? "INTERNAL_ERROR",
      error?.message ?? "Something went wrong. Please try again.",
      error?.fieldErrors
    )
  }

  return (json as ApiSuccess<T>).data
}

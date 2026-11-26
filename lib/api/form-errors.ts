import type { FieldPath, FieldValues, UseFormSetError } from "react-hook-form"

import { isApiError } from "@/lib/api/client"

/**
 * Copies an API error onto a React Hook Form instance:
 * - 400 field errors → `setError(field)` (focuses the first one)
 * - anything else    → `setError("root.serverError")`, which RHF clears on the next submit
 */
export function applyApiError<T extends FieldValues>(
  error: unknown,
  setError: UseFormSetError<T>,
  fields: readonly FieldPath<T>[]
) {
  if (isApiError(error) && error.fieldErrors) {
    const entries = fields
      .map((field) => [field, error.fieldErrors?.[field]?.[0]] as const)
      .filter((entry): entry is readonly [FieldPath<T>, string] => Boolean(entry[1]))

    if (entries.length > 0) {
      entries.forEach(([field, message], index) => {
        setError(field, { type: "server", message }, { shouldFocus: index === 0 })
      })
      return
    }
  }

  setError("root.serverError", {
    type: isApiError(error) ? error.code : "UNKNOWN",
    message: isApiError(error) ? error.message : "Something went wrong. Please try again.",
  })
}

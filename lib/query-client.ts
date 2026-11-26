import { environmentManager, MutationCache, QueryClient } from "@tanstack/react-query"

import { isApiError } from "@/lib/api/client"

// Pattern from https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr

function makeQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        // With SSR, a staleTime above 0 avoids refetching immediately on the client.
        staleTime: 60 * 1000,
      },
    },
    mutationCache: new MutationCache({
      // Global hook: always runs, even when a mutation has its own onError.
      // Expected 4xx outcomes (validation, duplicate signup) are handled by the form
      // and aren't logged. Swap console.error for an error reporter (e.g. Sentry) later.
      onError: (error, _variables, _context, mutation) => {
        if (isApiError(error) && error.status >= 400 && error.status < 500) return
        console.error("[mutation]", mutation.options.mutationKey, error)
      },
    }),
  })
}

let browserQueryClient: QueryClient | undefined

export function getQueryClient() {
  // Server: always a new client, so requests never share data.
  if (environmentManager.isServer()) return makeQueryClient()
  // Browser: one client for the app's lifetime, so a React suspend on first render
  // doesn't throw it away.
  return (browserQueryClient ??= makeQueryClient())
}

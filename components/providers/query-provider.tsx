"use client"

import { QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"

import { getQueryClient } from "@/lib/query-client"

export function QueryProvider({ children }: { children: React.ReactNode }) {
  // No useState here: see lib/query-client.ts and the TanStack Advanced SSR guide.
  const queryClient = getQueryClient()

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* Only bundled when NODE_ENV === "development". */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  )
}

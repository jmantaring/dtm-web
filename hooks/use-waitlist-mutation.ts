"use client"

import { useMutation } from "@tanstack/react-query"

import { apiPost } from "@/lib/api/client"
import type { WaitlistResponse } from "@/lib/api/types"
import type { WaitlistSignup } from "@/lib/validation/waitlist"

export function useWaitlistMutation() {
  return useMutation({
    mutationKey: ["waitlist", "join"],
    mutationFn: (input: WaitlistSignup) =>
      apiPost<WaitlistResponse["data"]>("/api/waitlist", input),
  })
}

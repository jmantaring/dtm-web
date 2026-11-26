"use client"

import { useMutation } from "@tanstack/react-query"

import { apiPost } from "@/lib/api/client"
import type { ContactResponse } from "@/lib/api/types"
import type { ContactMessage } from "@/lib/validation/contact"

export function useContactMutation() {
  return useMutation({
    mutationKey: ["contact", "submit"],
    mutationFn: (input: ContactMessage) =>
      apiPost<ContactResponse["data"]>("/api/contact", input),
  })
}

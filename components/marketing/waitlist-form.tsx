"use client"

import { useId } from "react"
import { Controller, useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CircleNotchIcon, WarningCircleIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Field, FieldError } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { useWaitlistMutation } from "@/hooks/use-waitlist-mutation"
import { isApiError } from "@/lib/api/client"
import { applyApiError } from "@/lib/api/form-errors"
import {
  waitlistSchema,
  type WaitlistInput,
  type WaitlistSignup,
} from "@/lib/validation/waitlist"

export function WaitlistForm() {
  const id = useId()
  const form = useForm<WaitlistInput, unknown, WaitlistSignup>({
    resolver: zodResolver(waitlistSchema),
    mode: "onTouched",
    defaultValues: { email: "" },
  })
  const mutation = useWaitlistMutation()
  const pending = mutation.isPending

  const alreadyJoined =
    mutation.isError && isApiError(mutation.error) && mutation.error.code === "ALREADY_ON_WAITLIST"

  if (mutation.isSuccess || alreadyJoined) {
    return (
      <p role="status" className="text-sm text-muted-foreground">
        {alreadyJoined
          ? "You're already on the list. We'll be in touch soon."
          : "Thanks — you're on the list."}
      </p>
    )
  }

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values, {
      onError: (error) => {
        // A duplicate signup isn't a failure for the visitor: the status message above handles it.
        if (isApiError(error) && error.code === "ALREADY_ON_WAITLIST") return
        applyApiError(error, form.setError, ["email"])
      },
    })
  })

  const serverError = form.formState.errors.root?.serverError
  const errorId = `${id}-email-error`
  const serverErrorId = `${id}-server-error`

  return (
    <form
      noValidate
      onSubmit={onSubmit}
      aria-busy={pending}
      className="flex w-full max-w-md flex-col gap-2 text-left"
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="gap-2">
            <div className="flex flex-col gap-2 sm:flex-row">
              <Input
                {...field}
                type="email"
                inputMode="email"
                autoComplete="email"
                spellCheck={false}
                placeholder="Enter your email"
                aria-label="Email"
                aria-required
                readOnly={pending}
                aria-invalid={fieldState.invalid || undefined}
                aria-describedby={
                  fieldState.invalid ? errorId : serverError ? serverErrorId : undefined
                }
                className="h-10 flex-1"
              />
              <Button type="submit" disabled={pending} className="h-10 px-4 uppercase">
                {pending ? (
                  <>
                    <CircleNotchIcon className="animate-spin" aria-hidden />
                    Joining…
                  </>
                ) : serverError ? (
                  "Try again"
                ) : (
                  "Join the waitlist"
                )}
              </Button>
            </div>
            {fieldState.error?.message && (
              <FieldError id={errorId} className="flex items-center gap-1.5">
                <WarningCircleIcon className="size-3.5 shrink-0" aria-hidden />
                {fieldState.error.message}
              </FieldError>
            )}
          </Field>
        )}
      />

      {serverError && (
        <div
          id={serverErrorId}
          role="alert"
          className="flex items-start gap-2 border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive"
        >
          <WarningCircleIcon className="mt-px size-4 shrink-0" aria-hidden />
          <p>
            <span className="font-semibold">We couldn&apos;t add you to the list.</span>{" "}
            {serverError.message}
          </p>
        </div>
      )}

      <span aria-live="polite" className="sr-only">
        {pending ? "Joining the waitlist" : ""}
      </span>
    </form>
  )
}

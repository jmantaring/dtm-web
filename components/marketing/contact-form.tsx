"use client"

import { useEffect, useId, useRef } from "react"
import { Controller, useForm, useWatch } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { CheckCircleIcon, CircleNotchIcon, WarningCircleIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useContactMutation } from "@/hooks/use-contact-mutation"
import { applyApiError } from "@/lib/api/form-errors"
import {
  MESSAGE_MAX_LENGTH,
  SUBJECT_MAX_LENGTH,
  contactSchema,
  type ContactInput,
  type ContactMessage,
} from "@/lib/validation/contact"

const DEFAULT_VALUES: ContactInput = { name: "", email: "", subject: "", message: "" }
const FIELDS = ["name", "email", "subject", "message"] as const

export function ContactForm() {
  const id = useId()
  const successRef = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  const form = useForm<ContactInput, unknown, ContactMessage>({
    resolver: zodResolver(contactSchema),
    // Validate a field on first blur, then on every change: people aren't
    // scolded while still typing for the first time.
    mode: "onTouched",
    defaultValues: DEFAULT_VALUES,
  })
  const mutation = useContactMutation()

  const serverError = form.formState.errors.root?.serverError
  const messageLength = useWatch({ control: form.control, name: "message" })?.length ?? 0
  const pending = mutation.isPending

  useEffect(() => {
    if (mutation.isSuccess) successRef.current?.focus()
  }, [mutation.isSuccess])

  useEffect(() => {
    if (serverError) errorRef.current?.focus()
  }, [serverError])

  const onSubmit = form.handleSubmit((values) => {
    mutation.mutate(values, {
      onError: (error) => applyApiError(error, form.setError, FIELDS),
    })
  })

  function reset() {
    form.reset(DEFAULT_VALUES)
    mutation.reset()
  }

  if (mutation.isSuccess) {
    const sent = mutation.variables
    return (
      <div role="status" className="flex flex-col items-start gap-4 border p-6 sm:p-8">
        <CheckCircleIcon className="size-8" weight="fill" aria-hidden />
        <h2 ref={successRef} tabIndex={-1} className="text-xl font-semibold tracking-tight outline-none">
          Thanks, {sent.name.split(" ")[0]}. Your message is on its way.
        </h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ll reply to <span className="font-medium text-foreground">{sent.email}</span> as
          soon as we can.
        </p>
        <Button variant="outline" size="lg" onClick={reset}>
          Send another message
        </Button>
      </div>
    )
  }

  const errorId = (name: string) => `${id}-${name}-error`

  return (
    <form noValidate onSubmit={onSubmit} aria-busy={pending} className="flex flex-col gap-5">
      <p className="text-xs text-muted-foreground">
        Fields marked with <span aria-hidden className="text-destructive">*</span>
        <span className="sr-only">an asterisk</span> are required.
      </p>

      <FieldGroup>
        <div className="grid gap-5 sm:grid-cols-2">
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${id}-name`} className="font-medium">
                  Name
                  <RequiredMark />
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-name`}
                  autoComplete="name"
                  placeholder="Jane Doe"
                  readOnly={pending}
                  aria-required
                  aria-invalid={fieldState.invalid || undefined}
                  aria-describedby={fieldState.invalid ? errorId("name") : undefined}
                  className="h-10 text-sm md:text-sm"
                />
                <InlineError id={errorId("name")} message={fieldState.error?.message} />
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor={`${id}-email`} className="font-medium">
                  Email
                  <RequiredMark />
                </FieldLabel>
                <Input
                  {...field}
                  id={`${id}-email`}
                  type="email"
                  inputMode="email"
                  autoComplete="email"
                  spellCheck={false}
                  placeholder="jane@company.com"
                  readOnly={pending}
                  aria-required
                  aria-invalid={fieldState.invalid || undefined}
                  aria-describedby={fieldState.invalid ? errorId("email") : undefined}
                  className="h-10 text-sm md:text-sm"
                />
                <InlineError id={errorId("email")} message={fieldState.error?.message} />
              </Field>
            )}
          />
        </div>

        <Controller
          name="subject"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${id}-subject`} className="font-medium">
                Subject
                <span className="font-normal text-muted-foreground">(optional)</span>
              </FieldLabel>
              <Input
                {...field}
                id={`${id}-subject`}
                maxLength={SUBJECT_MAX_LENGTH}
                placeholder="What's this about?"
                readOnly={pending}
                aria-invalid={fieldState.invalid || undefined}
                aria-describedby={fieldState.invalid ? errorId("subject") : undefined}
                className="h-10 text-sm md:text-sm"
              />
              <InlineError id={errorId("subject")} message={fieldState.error?.message} />
            </Field>
          )}
        />

        <Controller
          name="message"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <div className="flex items-baseline justify-between gap-2 text-xs">
                <FieldLabel htmlFor={`${id}-message`} className="font-medium">
                  Message
                  <RequiredMark />
                </FieldLabel>
                <span
                  className={
                    messageLength > MESSAGE_MAX_LENGTH ? "text-destructive" : "text-muted-foreground"
                  }
                >
                  {messageLength}/{MESSAGE_MAX_LENGTH}
                </span>
              </div>
              <Textarea
                {...field}
                id={`${id}-message`}
                rows={6}
                placeholder="Tell us how we can help."
                readOnly={pending}
                aria-required
                aria-invalid={fieldState.invalid || undefined}
                aria-describedby={fieldState.invalid ? errorId("message") : undefined}
                className="min-h-36 text-sm"
              />
              <InlineError id={errorId("message")} message={fieldState.error?.message} />
            </Field>
          )}
        />
      </FieldGroup>

      {serverError && (
        <div
          ref={errorRef}
          tabIndex={-1}
          role="alert"
          className="flex gap-3 border border-destructive/40 bg-destructive/10 p-4 text-sm text-destructive outline-none"
        >
          <WarningCircleIcon className="mt-0.5 size-5 shrink-0" aria-hidden />
          <div className="flex flex-col gap-1">
            <p className="font-semibold">We couldn&apos;t send your message.</p>
            <p>
              {serverError.message} Your message hasn&apos;t been lost, so you can try again.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button type="submit" size="lg" disabled={pending} className="h-10 px-6 uppercase sm:w-auto">
          {pending ? (
            <>
              <CircleNotchIcon className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : serverError ? (
            "Try again"
          ) : (
            "Send message"
          )}
        </Button>
        <span aria-live="polite" className="sr-only">
          {pending ? "Sending your message" : ""}
        </span>
      </div>
    </form>
  )
}

function RequiredMark() {
  return (
    <span aria-hidden className="-ml-1.5 text-destructive">
      *
    </span>
  )
}

function InlineError({ id, message }: { id: string; message?: string }) {
  if (!message) return null
  return (
    <FieldError id={id} className="flex items-center gap-1.5">
      <WarningCircleIcon className="size-3.5 shrink-0" aria-hidden />
      {message}
    </FieldError>
  )
}

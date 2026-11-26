"use client"

import { useEffect, useId, useRef, useState } from "react"
import { CheckCircleIcon, CircleNotchIcon, WarningCircleIcon } from "@phosphor-icons/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MESSAGE_MAX_LENGTH, submitContactMessage, type ContactMessage } from "@/lib/contact"

type FieldName = keyof ContactMessage
type Errors = Partial<Record<FieldName, string>>
type Status = "idle" | "submitting" | "success" | "error"

const EMPTY: ContactMessage = { name: "", email: "", subject: "", message: "" }
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const FIELD_ORDER: FieldName[] = ["name", "email", "subject", "message"]

function validateField(field: FieldName, value: string): string | undefined {
  const v = value.trim()
  switch (field) {
    case "name":
      return v ? undefined : "Please enter your name."
    case "email":
      if (!v) return "Please enter your email address."
      return EMAIL_PATTERN.test(v) ? undefined : "Please enter a valid email, like name@example.com."
    case "message":
      if (!v) return "Please enter a message."
      if (v.length < 10) return "Please add a little more detail (at least 10 characters)."
      return value.length > MESSAGE_MAX_LENGTH
        ? `Please keep your message under ${MESSAGE_MAX_LENGTH} characters.`
        : undefined
    default:
      return undefined
  }
}

function validateAll(values: ContactMessage): Errors {
  const errors: Errors = {}
  for (const field of FIELD_ORDER) {
    const error = validateField(field, values[field])
    if (error) errors[field] = error
  }
  return errors
}

export function ContactForm() {
  const id = useId()
  const [values, setValues] = useState<ContactMessage>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<Status>("idle")
  const formRef = useRef<HTMLFormElement>(null)
  const successRef = useRef<HTMLHeadingElement>(null)
  const errorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (status === "success") successRef.current?.focus()
    if (status === "error") errorRef.current?.focus()
  }, [status])

  const fieldId = (field: FieldName) => `${id}-${field}`
  const errorId = (field: FieldName) => `${id}-${field}-error`

  function handleChange(field: FieldName, value: string) {
    setValues((prev) => ({ ...prev, [field]: value }))
    // Validate live only once a field has been visited, so people
    // aren't scolded while still typing for the first time.
    if (touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }))
    }
    if (status === "error") setStatus("idle")
  }

  function handleBlur(field: FieldName) {
    setTouched((prev) => ({ ...prev, [field]: true }))
    setErrors((prev) => ({ ...prev, [field]: validateField(field, values[field]) }))
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (status === "submitting") return

    const nextErrors = validateAll(values)
    setErrors(nextErrors)
    setTouched({ name: true, email: true, subject: true, message: true })

    const firstInvalid = FIELD_ORDER.find((field) => nextErrors[field])
    if (firstInvalid) {
      formRef.current?.querySelector<HTMLElement>(`#${CSS.escape(fieldId(firstInvalid))}`)?.focus()
      return
    }

    setStatus("submitting")
    try {
      await submitContactMessage({
        name: values.name.trim(),
        email: values.email.trim(),
        subject: values.subject.trim(),
        message: values.message.trim(),
      })
      setStatus("success")
    } catch {
      setStatus("error")
    }
  }

  function reset() {
    setValues(EMPTY)
    setErrors({})
    setTouched({})
    setStatus("idle")
  }

  if (status === "success") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 border p-6 sm:p-8">
        <CheckCircleIcon className="size-8" weight="fill" aria-hidden />
        <h2 ref={successRef} tabIndex={-1} className="text-xl font-semibold tracking-tight outline-none">
          Thanks, {values.name.trim().split(" ")[0]}. Your message is on its way.
        </h2>
        <p className="text-sm text-muted-foreground">
          We&apos;ll reply to <span className="font-medium text-foreground">{values.email.trim()}</span> as
          soon as we can.
        </p>
        <Button variant="outline" size="lg" onClick={reset}>
          Send another message
        </Button>
      </div>
    )
  }

  const submitting = status === "submitting"
  const messageLength = values.message.length

  const fieldProps = (field: FieldName, required: boolean) => ({
    id: fieldId(field),
    name: field,
    value: values[field],
    required,
    disabled: submitting,
    "aria-required": required || undefined,
    "aria-invalid": errors[field] ? true : undefined,
    "aria-describedby": errors[field] ? errorId(field) : undefined,
    onBlur: () => handleBlur(field),
  })

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={handleSubmit}
      aria-busy={submitting}
      className="flex flex-col gap-5"
    >
      <p className="text-xs text-muted-foreground">
        Fields marked with <span aria-hidden className="text-destructive">*</span>
        <span className="sr-only">an asterisk</span> are required.
      </p>

      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Name" htmlFor={fieldId("name")} required error={errors.name} errorId={errorId("name")}>
          <Input
            {...fieldProps("name", true)}
            autoComplete="name"
            placeholder="Jane Doe"
            className="h-10 text-sm md:text-sm"
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Field>

        <Field label="Email" htmlFor={fieldId("email")} required error={errors.email} errorId={errorId("email")}>
          <Input
            {...fieldProps("email", true)}
            type="email"
            inputMode="email"
            autoComplete="email"
            spellCheck={false}
            placeholder="jane@company.com"
            className="h-10 text-sm md:text-sm"
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Field>
      </div>

      <Field label="Subject" htmlFor={fieldId("subject")} optional error={errors.subject} errorId={errorId("subject")}>
        <Input
          {...fieldProps("subject", false)}
          maxLength={120}
          placeholder="What's this about?"
          className="h-10 text-sm md:text-sm"
          onChange={(e) => handleChange("subject", e.target.value)}
        />
      </Field>

      <Field
        label="Message"
        htmlFor={fieldId("message")}
        required
        error={errors.message}
        errorId={errorId("message")}
        aside={
          <span
            className={
              messageLength > MESSAGE_MAX_LENGTH ? "text-destructive" : "text-muted-foreground"
            }
          >
            {messageLength}/{MESSAGE_MAX_LENGTH}
          </span>
        }
      >
        <Textarea
          {...fieldProps("message", true)}
          rows={6}
          placeholder="Tell us how we can help."
          className="min-h-36 text-sm"
          onChange={(e) => handleChange("message", e.target.value)}
        />
      </Field>

      {status === "error" && (
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
              Please check your connection and try again. Your message hasn&apos;t been lost.
            </p>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Button
          type="submit"
          size="lg"
          disabled={submitting}
          className="h-10 px-6 uppercase sm:w-auto"
        >
          {submitting ? (
            <>
              <CircleNotchIcon className="animate-spin" aria-hidden />
              Sending…
            </>
          ) : status === "error" ? (
            "Try again"
          ) : (
            "Send message"
          )}
        </Button>
        <span aria-live="polite" className="sr-only">
          {submitting ? "Sending your message" : ""}
        </span>
      </div>
    </form>
  )
}

function Field({
  label,
  htmlFor,
  required,
  optional,
  error,
  errorId,
  aside,
  children,
}: {
  label: string
  htmlFor: string
  required?: boolean
  optional?: boolean
  error?: string
  errorId: string
  aside?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-baseline justify-between gap-2 text-xs">
        <label htmlFor={htmlFor} className="font-medium">
          {label}
          {required && (
            <span aria-hidden className="ml-0.5 text-destructive">
              *
            </span>
          )}
          {optional && <span className="ml-1 font-normal text-muted-foreground">(optional)</span>}
        </label>
        {aside}
      </div>
      {children}
      {error && (
        <p id={errorId} className="flex items-center gap-1.5 text-xs text-destructive">
          <WarningCircleIcon className="size-3.5 shrink-0" aria-hidden />
          {error}
        </p>
      )}
    </div>
  )
}

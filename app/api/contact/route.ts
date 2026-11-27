import { jsonError, mockDelay, parseBody } from "@/lib/api/server"
import type { ContactResponse } from "@/lib/api/types"
import { contactSchema } from "@/lib/validation/contact"

/**
 * POST /api/contact
 *
 * MOCKED: validates the body and returns a fake success. Nothing is stored or emailed.
 * Test triggers (see README → "Test emails"):
 *   - email ending in "@fail.test" → 500 INTERNAL_ERROR
 */
export async function POST(request: Request) {
  const body = await parseBody(request, contactSchema)
  if (!body.ok) return body.response

  // TODO(backend): persist the message and send a notification email.
  //
  // Plan: send it for free with Cloudflare Email Service (Workers Free plan). Free mail can
  // only go to *verified* addresses in our own Cloudflare account, which is all a contact form
  // needs. Docs: https://developers.cloudflare.com/email-service/
  //
  // Done already (2026-11-28):
  //   - Verified destination addresses (`npx cf email-routing addresses list`):
  //     jeffchung@digitalthinkmedia.com, james.mantaring.717703@remotestaff.net
  //
  // Still blocked: the sender (`from`) must be on a domain whose DNS is on Cloudflare.
  // digitalthinkmedia.com isn't on Cloudflare yet (`npx cf zones list` is empty), and only
  // someone with access to its registrar can move it.
  //
  // Steps:
  //   1. Move digitalthinkmedia.com DNS to Cloudflare (free plan). Dashboard → Domains →
  //      Onboard a domain → quick-scan records → check that every existing MX, SPF, DKIM and
  //      DMARC record was copied (or current email breaks) → at the registrar, switch the
  //      nameservers to the two Cloudflare gives (turn off DNSSEC there first) → wait for "Active".
  //   2. Dashboard → Compute → Email Service → Email Sending → Onboard domain → digitalthinkmedia.com.
  //      This adds SPF/DKIM on `cf-bounce.digitalthinkmedia.com`. It adds DMARC only if none
  //      exists, so review the current one first.
  //   3. Add the binding in `cloudflare.config.ts` (locked to one recipient and one sender),
  //      then run `npm run cf-typegen`:
  //        CONTACT_EMAIL: bindings.sendEmail({
  //          destinationAddress: "jeffchung@digitalthinkmedia.com",
  //          allowedSenderAddresses: ["noreply@digitalthinkmedia.com"],
  //        }),
  //        CONTACT_RATE_LIMIT: bindings.rateLimit({ namespace: "1001", simple: { limit: 5, period: 60 } }),
  //   4. Send here, replacing the mock below. Use `import { env } from "cloudflare:workers"`,
  //      HTML-escape all user input, and strip CR/LF from the subject:
  //        const { messageId } = await env.CONTACT_EMAIL.send({
  //          from: { email: "noreply@digitalthinkmedia.com", name: "DTM Website" },
  //          to: "jeffchung@digitalthinkmedia.com",
  //          replyTo: { email: body.data.email, name: body.data.name }, // "Reply" answers the visitor
  //          subject: `[Contact] ${body.data.subject || "New message"} — ${body.data.name}`,
  //          text: body.data.message,
  //          html: escapedHtml,
  //        })
  //      Errors are thrown with `.code` (e.g. E_SENDER_DOMAIN_NOT_AVAILABLE, E_RECIPIENT_NOT_ALLOWED).
  //      Catch them, log them, and return a 502 with a friendly message.
  //   5. Spam protection (all free):
  //      - A rate limit per IP, using `CONTACT_RATE_LIMIT.limit({ key: ip })`, where ip comes
  //        from the `cf-connecting-ip` header. Return 429 when it trips.
  //      - A hidden honeypot field in the form. If it's filled, return a fake 201 and don't send.
  //      - Cloudflare Turnstile widget, with the token verified here before sending.
  //   6. Test: `vite dev` only logs the email ("send_email binding called with MessageBuilder").
  //      To send real mail from dev, add `dev: { remote: true }` to the binding temporarily.
  //      Then submit the form and confirm the email lands in the inbox, not spam.
  //
  // Fallback if the domain can't be moved: buy a domain in Cloudflare (Domains → Register,
  // about $10/yr), do steps 2-6 with it, and send from noreply@<that-domain>.
  await mockDelay()

  if (body.data.email.toLowerCase().endsWith("@fail.test")) {
    return jsonError(500, "INTERNAL_ERROR", "Something went wrong on our side.")
  }

  return Response.json(
    {
      data: { id: crypto.randomUUID(), receivedAt: new Date().toISOString() },
    } satisfies ContactResponse,
    { status: 201 }
  )
}

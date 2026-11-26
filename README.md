# dtm-web

Digital Think Media corporate website.

Built with [vinext](https://github.com/cloudflare/vinext) (the Next.js App Router API running on Vite), [shadcn/ui](https://ui.shadcn.com) and Tailwind CSS. It deploys to [Cloudflare Workers](https://developers.cloudflare.com/workers/).

## Prerequisites

- Node.js 22 or newer
- npm (the version is pinned in `package.json` → `packageManager`)

## Getting started

```bash
npm install
npm run dev
```

Open the local URL that Vite prints (usually http://localhost:5173).

## Scripts

| Command | What it does |
| --- | --- |
| `npm run dev` | Starts the dev server with hot reload. |
| `npm run build` | Builds the Cloudflare Worker output. |
| `npm run start` | Serves the last build locally. |
| `npm run preview` | Builds, then serves the Worker locally. Use this to test production before deploying. |
| `npm run deploy` | Deploys to Cloudflare Workers. |
| `npm run cf-typegen` | Generates TypeScript types for the Worker bindings. |

## API (mocked)

The backend runs in the same Cloudflare Worker as the site, as route handlers under `app/api/*`.
Responses are mocked for now: nothing is stored or emailed. Look for `TODO(backend)` in the route files.

| Method | Path | Body | Used by |
| --- | --- | --- | --- |
| `POST` | `/api/contact` | `{ name, email, subject?, message }` | Contact form (`/contact`) |
| `POST` | `/api/waitlist` | `{ email }` | Waitlist form (`/`) |

- Success: `201 { data: { ... } }`
- Error: `{ error: { code, message, fieldErrors? } }`
- Each request waits about 800 ms so loading states are visible.

### Test emails

Use these emails in the forms or with curl to trigger each response:

| Email | Endpoint | Response |
| --- | --- | --- |
| Any valid email, e.g. `jane@company.com` | both | `201` success |
| Ending in `@fail.test`, e.g. `jane@fail.test` | both | `500 INTERNAL_ERROR`: the form shows an error alert and a "Try again" button |
| Ending in `@exists.test`, e.g. `jane@exists.test` | `/api/waitlist` | `409 ALREADY_ON_WAITLIST`: the form shows "You're already on the list" |
| Invalid email or missing fields (curl only; the forms block these) | both | `400 VALIDATION_ERROR` with `fieldErrors` |
| A body that isn't JSON (curl only) | both | `400 INVALID_JSON` |

```bash
curl -i -X POST http://localhost:5173/api/waitlist \
  -H 'content-type: application/json' -d '{"email":"jane@exists.test"}'
```

### How the pieces fit

- `lib/validation/*`: Zod schemas shared by the forms (React Hook Form + `zodResolver`) and the API routes.
- `lib/api/server.ts`: route helpers (`parseBody`, `jsonError`).
- `lib/api/client.ts`: `apiPost`, which throws `ApiError` for any non-2xx response.
- `hooks/use-*-mutation.ts`: TanStack Query mutations used by the forms.
- `lib/query-client.ts` + `components/providers/query-provider.tsx`: the QueryClient, set up as in the [TanStack Advanced SSR guide](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr). React Query Devtools are shown in dev only.

## Deploying to Cloudflare

The project is already configured for Cloudflare Workers:

- `vite.config.ts` wires up `vinext` and `@cloudflare/vite-plugin`.
- `cloudflare.config.ts` defines the Worker name (`dtm-web`), compatibility date/flags and bindings (`ASSETS`, `IMAGES`).

To deploy:

```bash
npm run preview   # optional: test the production build locally first
npm run deploy
```

The first deploy asks you to sign in to your Cloudflare account. Keep to standard App Router features (Server/Client Components, route handlers, `next/link`, `next/font`) so the app stays Worker-compatible. Avoid Node-only APIs such as `fs` in request code.

## Project structure

We follow the Next.js "project files outside of `app`" convention. `app/` only holds routes, and shared code lives in root folders that match the aliases in `components.json`.

```
app/
  layout.tsx            Root <html>/<body>, font, ThemeProvider, metadata
  globals.css           Theme tokens (CSS variables): the single source of colours
  (marketing)/          Route group: shares the header + footer, no effect on URLs
    layout.tsx
    page.tsx            /
    roadmap/page.tsx    /roadmap
    about/page.tsx      /about
    contact/page.tsx    /contact
    license/page.tsx    /license
  api/                  Route handlers (mocked backend, see "API (mocked)")
    contact/route.ts    POST /api/contact
    waitlist/route.ts   POST /api/waitlist
components/
  ui/                   shadcn/ui components, managed by the CLI (avoid hand-editing)
  layout/               Site chrome: header, mobile nav, theme toggle, footer
  marketing/            Components used by marketing pages
  providers/            Client-side context providers
config/
  site.ts               Site name, description, header and footer links
hooks/                  Custom React hooks (incl. TanStack Query mutations)
lib/                    Utilities (e.g. `cn`)
  api/                  API types, server helpers, fetch client
  validation/           Zod schemas shared by client and server
  query-client.ts       TanStack QueryClient factory
```

- To add a page, create `app/(marketing)/<name>/page.tsx`. To add it to the header, add an entry to `mainNav` in `config/site.ts`.
- For a section that needs a different shell (e.g. a dashboard), create another route group such as `app/(app)/` with its own `layout.tsx`.

## UI components (shadcn/ui)

Add components with the shadcn CLI:

```bash
npx shadcn@latest add <component>
```

They are generated into `components/ui/`, using the style and aliases set in `components.json`. This project uses shadcn's Base UI flavour (`@base-ui/react`), so you compose components with the `render` prop instead of Radix's `asChild`:

```tsx
<NavigationMenuLink render={<Link href="/about" />}>About</NavigationMenuLink>
```

For a link that should look like a button, style `next/link` with `buttonVariants`. This keeps link semantics for screen readers:

```tsx
<Link href="/contact" className={buttonVariants({ variant: "outline" })}>Contact Us</Link>
```

## Theming

Every colour comes from the CSS variables in `app/globals.css`: `:root` for light mode and `.dark` for dark mode. Components only use token classes such as `bg-background`, `text-muted-foreground` and `bg-primary`, never hard-coded colours.

To change the palette, edit those variables, or generate a new theme at https://ui.shadcn.com/create and paste its variables in. Dark mode is handled by `next-themes` (light, dark or system), and the toggle sits in the header.

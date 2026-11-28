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
| `npm run dev` | Starts the dev server with hot reload on http://localhost:5173. |
| `npm run build` | Builds the Cloudflare Worker output into `.cloudflare/output/`. |
| `npm run start` | Serves the last build locally in the Workers runtime on http://localhost:4173. |
| `npm run preview` | Runs `build`, then `start`. Use it to test the production build locally. It does not deploy anything. |
| `npm run deploy` | Builds and deploys your working tree to **production**. Usually you don't run this yourself: merging to `main` does it (see [Deployment](#deployment)). |
| `npm run cf-typegen` | Generates TypeScript types for the Worker bindings into `.cloudflare/types/` (git-ignored, picked up by `tsconfig.json`). |

## API (mocked)

The backend runs in the same Cloudflare Worker as the site, as route handlers under `app/api/*`.
Responses are mocked for now: nothing is stored or emailed. Look for `TODO(backend)` in the route files.

| Method | Path | Body | Used by |
| --- | --- | --- | --- |
| `POST` | `/api/contact` | `{ name, email, subject?, message }` | Contact form (`/contact`) |
| `POST` | `/api/waitlist` | `{ email }` | Waitlist form (`/`) |
| `GET` | `/api/hello` | none | Not used by the UI. A sample route that returns a JSON greeting, handy as a quick health check. |

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

## Deployment

The site runs as the `dtm-web` Cloudflare Worker:

- `vite.config.ts` wires up `vinext` and `@cloudflare/vite-plugin`.
- `cloudflare.config.ts` defines the Worker name (`dtm-web`), compatibility date/flags and bindings (`ASSETS`, `IMAGES`).

Production URL: https://dtm-web.jeffchung-c0d.workers.dev

Keep to standard App Router features (Server/Client Components, route handlers, `next/link`, `next/font`) so the app stays Worker-compatible. Avoid Node-only APIs such as `fs` in request code.

### Production: merging to `main` deploys

> [!IMPORTANT]
> Every push to `main`, including a merged pull request, deploys to production automatically.

The Worker is connected to this GitHub repository through [Workers Builds](https://developers.cloudflare.com/workers/ci-cd/builds/). On each push to `main`, Cloudflare:

1. clones the repo and runs `npm clean-install`
2. runs `npm run deploy`, which builds the site and promotes the new version to 100% of production traffic

A deploy takes about a minute. To check one, open the Cloudflare dashboard → **Workers & Pages** → **dtm-web** → **Deployments** for the build status and logs. If a build fails, production keeps serving the previous version.

The workflow:

1. Work on `develop` or a feature branch.
2. Before merging, run `npm run preview` to test the production build locally, or deploy a preview (below).
3. Merge to `main`. Cloudflare deploys it.

#### Manual production deploy

Only run this for something like a hotfix when CI is unavailable. It deploys your **local working tree**, uncommitted changes included, and the next push to `main` overwrites it.

```bash
npx cf auth login                # once per machine
npm run deploy -- --dry-run      # optional: check the setup without deploying
npm run deploy
```

### Previews

A [Worker Preview](https://developers.cloudflare.com/workers/previews/) deploys a branch to its own URL without touching production. You need access to the Cloudflare account that owns `dtm-web`, and you need to be signed in with `npx cf auth login`.

```bash
npx vinext-cloudflare previews deploy --preview-name <preview-name>
```

The preview is available at:

```
https://<preview-name>-dtm-web.jeffchung-c0d.workers.dev
```

For example, `--preview-name develop` deploys to `https://develop-dtm-web.jeffchung-c0d.workers.dev`. Redeploying with the same name updates the same URL.

- `<preview-name>` defaults to the Git branch name. Set it explicitly for branches with a `/`, and use only lowercase letters, numbers and dashes.
- Uncommitted changes are included in the build.
- Preview URLs are public. Anyone with the link can open them.
- Don't use `npm run deploy -- --preview`. It deploys to production.

To delete a preview:

```bash
npx cf previews delete <preview-name> --worker dtm-web
```

> [!WARNING]
> **Automatic branch previews are currently broken.** Workers Builds also builds pushes to non-`main` branches (such as `develop`), but those builds run `npx wrangler preview`. That command needs a Wrangler config file, which this project doesn't have because it uses `cloudflare.config.ts`, so every branch build fails. This doesn't affect production. Until the non-production deploy command is fixed in the Cloudflare dashboard, deploy previews manually with the command above.

## Project structure

We follow the Next.js "project files outside of `app`" convention. `app/` only holds routes, and shared code lives in root folders that match the aliases in `components.json`.

```
app/
  layout.tsx            Root <html>/<body>, font, ThemeProvider, metadata
  icon.svg              Favicon
  not-found.tsx         Custom 404 (wrapped in SiteShell, returns a 404 status)
  globals.css           Theme tokens (CSS variables): the single source of colours
  (marketing)/          Route group: shares the header + footer, no effect on URLs
    layout.tsx
    page.tsx            /
    roadmap/page.tsx    /roadmap
    about/page.tsx      /about
    contact/page.tsx    /contact
    license/page.tsx    /license (Website Usage License)
  api/                  Route handlers (mocked backend, see "API (mocked)")
    contact/route.ts    POST /api/contact
    waitlist/route.ts   POST /api/waitlist
    hello/route.ts      GET /api/hello (sample route)
assets/
  brand/                Logo SVGs (light and dark)
components/
  ui/                   shadcn/ui components, managed by the CLI (avoid hand-editing)
  brand/                Logo component
  layout/               Site chrome: SiteShell, header, mobile nav, theme toggle, footer
  legal/                Legal-page helpers (e.g. sticky table of contents)
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

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
  api/                  Route handlers
components/
  ui/                   shadcn/ui components, managed by the CLI (avoid hand-editing)
  layout/               Site chrome: header, mobile nav, theme toggle, footer
  marketing/            Components used by marketing pages
  providers/            Client-side context providers
config/
  site.ts               Site name, description, header and footer links
hooks/                  Custom React hooks
lib/                    Utilities (e.g. `cn`)
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

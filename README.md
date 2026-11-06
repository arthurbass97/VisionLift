# Vision Lift

React + TypeScript + Vite site, deployed to Cloudflare Workers (static assets) on visionlift.co.uk.

## Setup

```bash
npm install
```

## Local development

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server with hot reload (http://localhost:5173) |
| `npm run watch` | Rebuilds `dist/` on every save (without pre-rendering) — use with http://vision-lift.local |
| `npm run build` | Type-check, build into `dist/`, then pre-render every page to static HTML for SEO |
| `npm run typecheck` | Type-check only |

The Apache vhost `vision-lift.local` serves `dist/`.

## Where things live

- `src/content.ts` — page copy (headings, about, process, contact, nav)
- `src/serviceContent.ts` — each service: list text plus its full page at `/services/<slug>` (overview, what's included, benefits, FAQs, search title and description)
- `src/components/Header.tsx` / `Footer.tsx` — header with mobile burger menu, footer
- `src/routes.tsx` — the pages (`/`, `/services`, `/services/<slug>`, `/how-we-work`, `/about`, `/contact`, 404): what's on each, plus its title and description
- `src/components/Sections.tsx` — page sections
- `src/components/Breadcrumbs.tsx` — breadcrumb trail + BreadcrumbList structured data (every page except home)
- `src/styles/site.css` — styles
- `public/` — static files copied as-is (logos, favicons)

## Deploy

`npm run deploy`, or push to the connected repo — `wrangler.jsonc` runs the build before deploying.

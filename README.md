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
| `npm run watch` | Rebuilds `dist/` on every save — use this with http://vision-lift.local |
| `npm run build` | Type-check, then production build into `dist/` |
| `npm run typecheck` | Type-check only |

The Apache vhost `vision-lift.local` serves `dist/`.

## Where things live

- `src/content.ts` — all page copy (placeholder text to replace)
- `src/components/Header.tsx` / `Footer.tsx` — header with mobile burger menu, footer
- `src/components/Sections.tsx` — page sections
- `src/styles/site.css` — styles
- `public/` — static files copied as-is (logos, favicons)

## Deploy

`npm run deploy`, or push to the connected repo — `wrangler.jsonc` runs the build before deploying.

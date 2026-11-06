// After `vite build`: writes a pre-rendered HTML file for every page, each with
// its own <title>, description and canonical URL.
//   /        -> dist/index.html
//   /about   -> dist/about.html   (Cloudflare serves it at /about, no trailing slash)
//   404      -> dist/404.html
import { readFile, writeFile, mkdir, rm } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';

const SITE = 'https://visionlift.co.uk'; // keep in sync with siteUrl in src/content.ts
const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const ssrDir = path.join(root, 'dist-ssr');

const { render, allPages } = await import(pathToFileURL(path.join(ssrDir, 'entry-server.js')).href);
const template = await readFile(path.join(dist, 'index.html'), 'utf8');

const escape = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function setTag(html, pattern, value) {
  if (!pattern.test(html)) throw new Error(`Tag not found in index.html: ${pattern}`);
  return html.replace(pattern, (_m, start, end) => `${start}${value}${end}`);
}

for (const page of allPages) {
  const is404 = page.path === '/404';
  const url = SITE + (page.path === '/' ? '/' : page.path);
  if (page.title.length > 60) console.warn(`  ! ${page.path}: title is ${page.title.length} characters (Google shows about 60)`);
  if (page.description.length > 160) console.warn(`  ! ${page.path}: description is ${page.description.length} characters (Google shows about 160)`);
  const title = escape(page.title);
  const desc = escape(page.description);

  let html = template;
  html = setTag(html, /(<title>)[^<]*(<\/title>)/, title);
  html = setTag(html, /(<meta name="description" content=")[^"]*(")/, desc);
  html = setTag(html, /(<link rel="canonical" href=")[^"]*(")/, url);
  html = setTag(html, /(<meta property="og:url" content=")[^"]*(")/, url);
  html = setTag(html, /(<meta property="og:title" content=")[^"]*(")/, title);
  html = setTag(html, /(<meta property="og:description" content=")[^"]*(")/, desc);
  html = setTag(html, /(<meta name="twitter:title" content=")[^"]*(")/, title);
  html = setTag(html, /(<meta name="twitter:description" content=")[^"]*(")/, desc);
  if (is404) html = setTag(html, /(<meta name="robots" content=")[^"]*(")/, 'noindex');

  const marker = '<div id="root"><!--app--></div>';
  if (!html.includes(marker)) throw new Error(`Marker ${marker} not found in index.html`);
  html = html.replace(marker, `<div id="root" data-page="${page.path}">${render(page)}</div>`);

  const out = is404
    ? path.join(dist, '404.html')
    : page.path === '/'
      ? path.join(dist, 'index.html')
      : path.join(dist, `${page.path.slice(1)}.html`);
  await mkdir(path.dirname(out), { recursive: true });
  await writeFile(out, html);
  console.log(`Pre-rendered ${page.path.padEnd(9)} -> ${path.relative(root, out)}`);
}

// sitemap.xml, generated from the page list so new pages are always included.
const today = new Date().toISOString().slice(0, 10);
const urls = allPages
  .filter((p) => p.path !== '/404')
  .map((p) => `  <url><loc>${SITE}${p.path === '/' ? '/' : p.path}</loc><lastmod>${today}</lastmod></url>`)
  .join('\n');
await writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
);
console.log(`Generated sitemap.xml with ${allPages.length - 1} pages`);

await rm(ssrDir, { recursive: true, force: true });

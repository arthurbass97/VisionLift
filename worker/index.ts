// Cloudflare Worker for visionlift.co.uk.
//
// The site itself is static files (dist/), served by Cloudflare's asset handling.
// This Worker only runs for /api/* (see run_worker_first in wrangler.jsonc) and handles
// the contact form:
//   1. checks the submission (required fields, lengths, spam traps, rate limit)
//   2. stores it in the D1 (SQLite) database bound as DB
//   3. emails it to you through Email Routing (binding ENQUIRY_EMAIL), if configured
//
// To read stored enquiries: Cloudflare dashboard → Storage & databases → D1 →
// vision-lift-enquiries → Console, then run:  SELECT * FROM enquiries ORDER BY id DESC;

import { EmailMessage } from 'cloudflare:email';

interface Env {
  ASSETS: { fetch(request: Request): Promise<Response> };
  DB: D1Database;
  /** Email Routing "send email" binding. Optional: without it, enquiries are still saved. */
  ENQUIRY_EMAIL?: SendEmail;
  /** The verified Email Routing destination that receives enquiry notifications. */
  ENQUIRY_TO?: string;
}

const FROM_ADDRESS = 'website@visionlift.co.uk';
const MAX_PER_HOUR = 5; // per IP address
const MIN_FILL_MS = 3000; // humans take longer than this to fill the form in

const LIMITS = { name: 100, email: 200, phone: 40, service: 100, message: 5000 };

const SCHEMA = `CREATE TABLE IF NOT EXISTS enquiries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  service TEXT,
  message TEXT NOT NULL,
  ip TEXT,
  user_agent TEXT,
  emailed INTEGER NOT NULL DEFAULT 0
)`;
let schemaReady = false;

export default {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    if (url.pathname === '/api/contact') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Method not allowed.' }, 405);
      try {
        return await handleContact(request, env, ctx);
      } catch (err) {
        console.error('contact form error', err);
        return json({ ok: false, error: 'Something went wrong on our side. Please email us instead.' }, 500);
      }
    }
    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'Not found.' }, 404);
    return env.ASSETS.fetch(request);
  },
};

async function handleContact(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  let body: Record<string, unknown>;
  try {
    body = await request.json();
  } catch {
    return json({ ok: false, error: 'Invalid request.' }, 400);
  }

  const field = (key: keyof typeof LIMITS) => String(body[key] ?? '').trim().slice(0, LIMITS[key]);
  const name = field('name');
  const email = field('email');
  const phone = field('phone');
  const service = field('service');
  const message = String(body.message ?? '').trim();

  // Spam traps: a hidden field only bots fill in, and a form submitted impossibly fast.
  // Pretend it worked so bots don't learn anything.
  const startedAt = Number(body.startedAt);
  if (String(body.website ?? '') !== '' || (Number.isFinite(startedAt) && Date.now() - startedAt < MIN_FILL_MS)) {
    return json({ ok: true });
  }

  const errors: Record<string, string> = {};
  if (!name) errors.name = 'Please tell us your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = 'Please enter a valid email address.';
  if (message.length < 10) errors.message = 'Please tell us a little about your project.';
  if (message.length > LIMITS.message) errors.message = `Please keep your message under ${LIMITS.message} characters.`;
  if (Object.keys(errors).length) return json({ ok: false, error: 'Please check the highlighted fields.', errors }, 400);

  if (!schemaReady) {
    await env.DB.prepare(SCHEMA).run();
    schemaReady = true;
  }

  const ip = request.headers.get('CF-Connecting-IP') ?? '';
  const recent = await env.DB.prepare(
    "SELECT COUNT(*) AS n FROM enquiries WHERE ip = ? AND created_at > datetime('now', '-1 hour')",
  ).bind(ip).first<{ n: number }>();
  if ((recent?.n ?? 0) >= MAX_PER_HOUR) {
    return json({ ok: false, error: "You've sent a few messages already. Please email us directly instead." }, 429);
  }

  const result = await env.DB.prepare(
    'INSERT INTO enquiries (name, email, phone, service, message, ip, user_agent) VALUES (?, ?, ?, ?, ?, ?, ?)',
  ).bind(name, email, phone || null, service || null, message, ip, (request.headers.get('User-Agent') ?? '').slice(0, 300)).run();
  const id = result.meta.last_row_id;

  // Email the enquiry in the background so the visitor isn't kept waiting.
  if (env.ENQUIRY_EMAIL && env.ENQUIRY_TO) {
    const mailer = env.ENQUIRY_EMAIL;
    const to = env.ENQUIRY_TO;
    ctx.waitUntil(
      sendNotification(mailer, to, { name, email, phone, service, message })
        .then(() => env.DB.prepare('UPDATE enquiries SET emailed = 1 WHERE id = ?').bind(id).run())
        .catch((err) => console.error('enquiry email failed', err)),
    );
  }

  return json({ ok: true });
}

type Enquiry = { name: string; email: string; phone: string; service: string; message: string };

async function sendNotification(mailer: SendEmail, to: string, e: Enquiry) {
  const text = [
    `New enquiry from the Vision Lift website`,
    ``,
    `Name:    ${e.name}`,
    `Email:   ${e.email}`,
    `Phone:   ${e.phone || '-'}`,
    `Service: ${e.service || '-'}`,
    ``,
    e.message,
    ``,
    `--`,
    `Reply to this email to answer ${e.name} directly.`,
  ].join('\r\n');

  const raw = [
    `From: "Vision Lift website" <${FROM_ADDRESS}>`,
    `To: <${to}>`,
    `Reply-To: <${oneLine(e.email)}>`,
    `Subject: ${encodeHeader(`New enquiry: ${e.name}${e.service ? ` (${e.service})` : ''}`)}`,
    `Date: ${new Date().toUTCString()}`,
    `Message-ID: <${crypto.randomUUID()}@visionlift.co.uk>`,
    `MIME-Version: 1.0`,
    `Content-Type: text/plain; charset=utf-8`,
    `Content-Transfer-Encoding: base64`,
    ``,
    base64(text).replace(/.{76}/g, '$&\r\n'),
  ].join('\r\n');

  await mailer.send(new EmailMessage(FROM_ADDRESS, to, raw));
}

/** Strip line breaks so visitor input can't add extra email headers. */
function oneLine(s: string) {
  return s.replace(/[\r\n]+/g, ' ');
}

/** RFC 2047 encoding so names with accents etc. survive in the subject line. */
function encodeHeader(s: string) {
  return `=?UTF-8?B?${base64(oneLine(s))}?=`;
}

function base64(s: string) {
  let bin = '';
  for (const byte of new TextEncoder().encode(s)) bin += String.fromCharCode(byte);
  return btoa(bin);
}

function json(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });
}

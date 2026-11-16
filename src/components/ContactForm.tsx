import { useEffect, useRef, useState, type FormEvent } from 'react';
import { contact, services } from '../content';
import Icon from './Icon';

type Status = 'idle' | 'sending' | 'sent' | 'error';
type FieldErrors = Partial<Record<'name' | 'email' | 'message', string>>;

/**
 * Enquiry form. Posts to /api/contact (worker/index.ts), which stores the enquiry in
 * Cloudflare D1 and emails it to us. Works only on the deployed site, not in `npm run dev`.
 */
export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const startedAt = useRef(0);

  // Recorded in the browser (not during pre-rendering) so the server can spot instant bot submissions.
  useEffect(() => { startedAt.current = Date.now(); }, []);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form)) as Record<string, string>;

    const errs: FieldErrors = {};
    if (!data.name?.trim()) errs.name = 'Please tell us your name.';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email?.trim() ?? '')) errs.email = 'Please enter a valid email address.';
    if ((data.message?.trim().length ?? 0) < 10) errs.message = 'Please tell us a little about your project.';
    setFieldErrors(errs);
    if (Object.keys(errs).length) {
      setStatus('error');
      setError('Please check the highlighted fields.');
      form.querySelector<HTMLElement>(`#cf-${Object.keys(errs)[0]}`)?.focus();
      return;
    }

    setStatus('sending');
    setError('');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, startedAt: startedAt.current }),
      });
      const body = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: FieldErrors };
      if (!res.ok || !body.ok) {
        setFieldErrors(body.errors ?? {});
        throw new Error(body.error || 'Your message could not be sent.');
      }
      setStatus('sent');
    } catch (err) {
      setStatus('error');
      setError(err instanceof Error && err.message !== 'Failed to fetch'
        ? err.message
        : 'Your message could not be sent. Please check your connection and try again.');
    }
  }

  if (status === 'sent') {
    return (
      <div className="contact-form contact-form-done" role="status">
        <span className="contact-form-done-icon"><Icon name="check" /></span>
        <h2>Thanks, your message is on its way</h2>
        <p>We'll reply within one working day. If it's urgent, call us on <a href={contact.phoneHref}>{contact.phoneLabel}</a>.</p>
      </div>
    );
  }

  const invalid = (k: keyof FieldErrors) => (fieldErrors[k] ? { 'aria-invalid': true, 'aria-describedby': `cf-${k}-error` } : {});

  return (
    <form className="contact-form" onSubmit={onSubmit} noValidate>
      <h2>Send us a message</h2>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-name">Name</label>
          <input id="cf-name" name="name" type="text" autoComplete="name" maxLength={100} required {...invalid('name')} />
          {fieldErrors.name && <p className="form-error" id="cf-name-error">{fieldErrors.name}</p>}
        </div>
        <div className="form-field">
          <label htmlFor="cf-email">Email</label>
          <input id="cf-email" name="email" type="email" autoComplete="email" maxLength={200} required {...invalid('email')} />
          {fieldErrors.email && <p className="form-error" id="cf-email-error">{fieldErrors.email}</p>}
        </div>
      </div>

      <div className="form-row">
        <div className="form-field">
          <label htmlFor="cf-phone">Phone <span className="optional">(optional)</span></label>
          <input id="cf-phone" name="phone" type="tel" autoComplete="tel" maxLength={40} />
        </div>
        <div className="form-field">
          <label htmlFor="cf-service">What do you need? <span className="optional">(optional)</span></label>
          <select id="cf-service" name="service" defaultValue="">
            <option value="">Choose a service</option>
            {services.map((s) => <option key={s.slug} value={s.title}>{s.title}</option>)}
            <option value="Something else">Something else</option>
          </select>
        </div>
      </div>

      <div className="form-field">
        <label htmlFor="cf-message">Tell us about your project</label>
        <textarea id="cf-message" name="message" rows={6} maxLength={5000} required {...invalid('message')} />
        {fieldErrors.message && <p className="form-error" id="cf-message-error">{fieldErrors.message}</p>}
      </div>

      {/* Spam trap: hidden from people, but bots tend to fill it in. */}
      <div className="form-trap" aria-hidden="true">
        <label htmlFor="cf-website">Website</label>
        <input id="cf-website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="form-actions">
        <button className="btn btn-primary" type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? 'Sending…' : <>Send message <Icon name="arrowRight" /></>}
        </button>
        <p className="form-note">We reply within one working day.</p>
      </div>
      {status === 'error' && error && <p className="form-alert" role="alert">{error}</p>}
    </form>
  );
}

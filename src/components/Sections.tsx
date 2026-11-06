import Breadcrumbs, { type Crumb } from './Breadcrumbs';
import Icon from './Icon';
import {
  about, audiences, contact, contactPage, footer, hero, processIntro, services, servicesIntro, steps,
} from '../content';

const fact = (label: string) => about.facts.find(([l]) => l === label)?.[1];
const pad = (n: number) => String(n).padStart(2, '0');

/* ---------- Hero ---------- */

function DeviceMock() {
  return (
    <div className="devices" aria-hidden="true">
      <div className="browser">
        <div className="browser-bar">
          <i /><i /><i />
          <span className="browser-url">visionlift.co.uk</span>
        </div>
        <div className="browser-body">
          <div className="mock-hero">
            <div className="mock-lines">
              <b style={{ width: '70%' }} />
              <b style={{ width: '52%' }} />
              <s style={{ width: '38%' }} />
            </div>
            <img src="/assets/icon-512.webp" alt="" width="512" height="512" />
          </div>
          <div className="mock-grid">
            <span /><span /><span />
          </div>
        </div>
      </div>
      <div className="phone">
        <div className="phone-notch" />
        <div className="phone-body">
          <div className="mock-phone-head" />
          <b style={{ width: '80%' }} />
          <b style={{ width: '60%' }} />
          <span className="mock-phone-card" />
          <span className="mock-phone-card" />
          <span className="mock-phone-btn" />
        </div>
      </div>
      <div className="float-chip">
        <Icon name="arrow" />
        <span>Built to grow</span>
      </div>
    </div>
  );
}

export function Hero() {
  const highlights = [fact('Experience'), fact('Based in'), fact('Services')].filter(Boolean);
  return (
    <section id="top" className="hero">
      <div className="wrap hero-inner">
        <div className="hero-copy">
          <h1>{hero.title} <span className="accent">{hero.titleAccent}</span></h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="/contact">Start a project <Icon name="arrowRight" /></a>
            <a className="btn btn-link" href="#services">See what we do</a>
          </div>
          {highlights.length > 0 && (
            <ul className="hero-highlights">
              {highlights.map((h) => <li key={h}><Icon name="check" />{h}</li>)}
            </ul>
          )}
        </div>
        <DeviceMock />
      </div>
    </section>
  );
}

/* ---------- Services: numbered list with sticky intro ---------- */

/** standalone: on the /services page, where the page header already shows the intro. */
export function Services({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="services" className={`services${standalone ? ' standalone' : ''}`}>
      <div className="wrap services-inner">
        {!standalone && (
          <div className="services-intro">
            <span className="eyebrow">Services</span>
            <h2>{servicesIntro.title}</h2>
            <p>{servicesIntro.lead}</p>
            <a className="btn btn-dark" href="/services">More about our services</a>
          </div>
        )}
        <ol className="service-list">
          {services.map((s, i) => (
            <li key={s.title}>
              <a href={`/services/${s.slug}`} className="service-row">
                <span className="service-num">{pad(i + 1)}</span>
                <div className="service-text">
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
                <span className="service-icon"><Icon name={s.icon} /></span>
              </a>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Process: timeline ---------- */

/** standalone: on the /how-we-work page, where the page header already shows the intro. */
export function Process({ standalone = false }: { standalone?: boolean }) {
  return (
    <section id="process" className={standalone ? 'process standalone' : 'process on-dark'}>
      <div className="wrap">
        {!standalone && (
          <div className="section-head center">
            <span className="eyebrow">How we work</span>
            <h2>{processIntro.title}</h2>
            <p>{processIntro.lead}</p>
          </div>
        )}
        <ol className="timeline">
          {steps.map((s, i) => (
            <li key={s.title}>
              <span className="timeline-dot">{pad(i + 1)}</span>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/* ---------- Page header (inner pages and 404) ---------- */

interface PageHeaderProps {
  /** Short page name for the breadcrumb, e.g. "Services". */
  crumb: string;
  /** Page path, e.g. "/services". */
  path: string;
  /** A page between Home and this one in the breadcrumb, e.g. Services for a service page. */
  parent?: Crumb;
  title: string;
  lead?: string;
}

export function PageHeader({ crumb, path, parent, title, lead }: PageHeaderProps) {
  return (
    <section className="page-header">
      <div className="wrap">
        <Breadcrumbs trail={[...(parent ? [parent] : []), { label: crumb, path }]} />
        <h1>{title}</h1>
        {lead && <p className="lead">{lead}</p>}
      </div>
    </section>
  );
}

/* ---------- About: bento grid + audiences ---------- */

/** onHome: shown on the home page, so it carries the main About heading and a link to /about. */
export function AboutDetails({ onHome = false }: { onHome?: boolean }) {
  const experience = fact('Experience');
  const basedIn = fact('Based in');
  const listed = about.facts.filter(([l]) => l !== 'Experience' && l !== 'Based in');
  return (
    <section id="about" className="about">
      <div className="wrap">
        <div className="bento">
          <article className="tile tile-about">
            <span className="eyebrow">{onHome ? 'About' : 'Our story'}</span>
            <h2>{onHome ? about.title : about.storyTitle}</h2>
            {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
            {onHome && <a className="text-link" href="/about">More about us</a>}
          </article>

          {experience && (
            <article className="tile tile-stat">
              <span className="stat">{experience}</span>
              <span className="stat-label">of design and development experience</span>
            </article>
          )}

          {basedIn && (
            <article className="tile tile-place">
              <Icon name="pin" />
              <span className="stat-label">Based in</span>
              <span className="place">{basedIn}</span>
            </article>
          )}

          <article className="tile tile-tagline">
            <img src="/assets/icon-512.webp" alt="" width="512" height="512" />
            <p>{footer.tagline}</p>
          </article>

          <article className="tile tile-facts">
            <dl>
              {listed.map(([label, value]) => (
                <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
              ))}
            </dl>
          </article>
        </div>

        <div className="audiences">
          <h2 className="audiences-title">Who we work with</h2>
          <div className="audience-cols">
            {audiences.map((a) => (
              <article key={a.tag}>
                <span className="tag">{a.tag}</span>
                <h3>{a.title}</h3>
                <ul>{a.points.map((p) => <li key={p}><Icon name="check" />{p}</li>)}</ul>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Contact page: details + what happens next ---------- */

/** onHome: shown on the home page, so it carries its own heading. */
export function ContactDetails({ onHome = false }: { onHome?: boolean }) {
  const basedIn = fact('Based in');
  return (
    <section id="contact" className={`contact-details${onHome ? ' on-home' : ''}`}>
      {onHome && (
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Contact</span>
            <h2>{contactPage.title}</h2>
            <p>{contactPage.lead}</p>
          </div>
        </div>
      )}
      <div className="wrap contact-grid">
        <div className="contact-cards">
          <a className="contact-card contact-card-main" href={`mailto:${contact.email}`}>
            <span className="contact-card-icon"><Icon name="mail" /></span>
            <span className="contact-card-label">Email us</span>
            <span className="contact-card-value">{contact.email}</span>
            <Icon name="arrowUpRight" />
          </a>
          <a className="contact-card" href={contact.phoneHref}>
            <span className="contact-card-icon"><Icon name="phone" /></span>
            <span className="contact-card-label">Call us</span>
            <span className="contact-card-value">{contact.phoneLabel}</span>
          </a>
          {basedIn && (
            <div className="contact-card">
              <span className="contact-card-icon"><Icon name="pin" /></span>
              <span className="contact-card-label">Based in</span>
              <span className="contact-card-value">{basedIn}</span>
            </div>
          )}
        </div>

        <aside className="next-steps" aria-labelledby="next-steps-title">
          <h2 id="next-steps-title">What happens next</h2>
          <ol>
            {contactPage.nextSteps.map((s, i) => (
              <li key={s.title}>
                <span className="next-num">{pad(i + 1)}</span>
                <div>
                  <h3>{s.title}</h3>
                  <p>{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </aside>
      </div>
    </section>
  );
}

/* ---------- Call-to-action band (end of Home and About) ---------- */

export function CtaBand() {
  return (
    <section className="contact on-dark">
      <div className="wrap">
        <span className="eyebrow">Contact</span>
        <h2>Have a project in mind?</h2>
        <p className="contact-lead">Tell us what you're planning. We reply to every message within one working day.</p>
        <div className="cta-actions">
          <a className="btn btn-primary" href="/contact">Get in touch <Icon name="arrowRight" /></a>
          <a className="contact-email" href={`mailto:${contact.email}`}>
            {contact.email} <Icon name="arrowUpRight" />
          </a>
        </div>
      </div>
    </section>
  );
}

import Icon from './Icon';
import JsonLd from './JsonLd';
import { CtaBand, PageHeader } from './Sections';
import { about, services, siteUrl, steps, type Service } from '../content';

const pad = (n: number) => String(n).padStart(2, '0');

/** Full page for one service, at /services/<slug>. */
export default function ServicePage({ service }: { service: Service }) {
  const path = `/services/${service.slug}`;
  const others = services.filter((s) => s.slug !== service.slug);

  // Structured data: what the service is, who provides it and where.
  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    serviceType: service.title,
    description: service.metaDescription,
    url: siteUrl + path,
    provider: { '@id': `${siteUrl}/#business` },
    areaServed: [
      { '@type': 'City', name: 'Clitheroe' },
      { '@type': 'AdministrativeArea', name: 'Lancashire' },
      { '@type': 'Country', name: 'United Kingdom' },
    ],
  };
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: service.faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <PageHeader
        crumb={service.title}
        path={path}
        parent={{ label: 'Services', path: '/services' }}
        title={service.headline}
        lead={service.intro}
      />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />

      {/* Overview + what's included */}
      <section className="svc-overview">
        <div className="wrap svc-overview-grid">
          <div className="svc-copy">
            <span className="eyebrow">Overview</span>
            <h2>What you get</h2>
            {service.overview.map((p) => <p key={p}>{p}</p>)}
          </div>
          <aside className="svc-includes" aria-labelledby="includes-title">
            <span className="svc-includes-icon"><Icon name={service.icon} /></span>
            <h2 id="includes-title">What's included</h2>
            <ul>
              {service.includes.map((item) => <li key={item}><Icon name="check" />{item}</li>)}
            </ul>
            <a className="btn btn-primary" href="/contact">Get a fixed-price quote <Icon name="arrowRight" /></a>
          </aside>
        </div>
      </section>

      {/* Benefits */}
      <section className="svc-benefits">
        <div className="wrap">
          <div className="section-head">
            <span className="eyebrow">Why Vision Lift</span>
            <h2>Why work with us</h2>
          </div>
          <div className="svc-benefit-grid">
            {service.benefits.map((b, i) => (
              <article key={b.title} className="svc-benefit">
                <span className="svc-benefit-num">{pad(i + 1)}</span>
                <h3>{b.title}</h3>
                <p>{b.text}</p>
              </article>
            ))}
            <article className="svc-benefit svc-benefit-alt">
              <span className="stat">{about.facts.find(([l]) => l === 'Experience')?.[1] ?? '10+ years'}</span>
              <p>of design and development experience, based in Clitheroe, Lancashire.</p>
            </article>
          </div>
        </div>
      </section>

      {/* Process summary */}
      <section className="svc-process">
        <div className="wrap">
          <div className="svc-process-head">
            <div>
              <span className="eyebrow">How we work</span>
              <h2>A simple, clear process</h2>
            </div>
            <a className="text-link" href="/how-we-work">See how we work</a>
          </div>
          <ol className="svc-steps">
            {steps.map((s, i) => (
              <li key={s.title}><span>{pad(i + 1)}</span>{s.title}</li>
            ))}
          </ol>
        </div>
      </section>

      {/* FAQ */}
      <section className="svc-faq">
        <div className="wrap svc-faq-grid">
          <div>
            <span className="eyebrow">FAQ</span>
            <h2>Common questions</h2>
            <p className="svc-faq-lead">
              Can't see your question? <a href="/contact">Get in touch</a> and we'll be happy to help.
            </p>
          </div>
          <div className="faq-list">
            {service.faqs.map((f) => (
              <details key={f.q} className="faq">
                <summary>
                  <h3>{f.q}</h3>
                  <span className="faq-toggle" aria-hidden="true" />
                </summary>
                <p>{f.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Other services */}
      <section className="svc-others">
        <div className="wrap">
          <h2 className="svc-others-title">Other services</h2>
          <ul className="svc-others-grid">
            {others.map((s) => (
              <li key={s.slug}>
                <a href={`/services/${s.slug}`}>
                  <span className="svc-others-icon"><Icon name={s.icon} /></span>
                  <span className="svc-others-text">
                    <strong>{s.title}</strong>
                    <span>{s.text}</span>
                  </span>
                  <Icon name="arrowRight" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <CtaBand />
    </>
  );
}

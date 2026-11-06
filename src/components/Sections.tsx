import type { ReactNode } from 'react';
import Icon from './Icon';
import { about, audiences, contact, hero, services, steps } from '../content';

interface SectionHeadProps {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}

function SectionHead({ eyebrow, title, children }: SectionHeadProps) {
  return (
    <div className="section-head">
      <span className="eyebrow">{eyebrow}</span>
      <h2>{title}</h2>
      {children && <p>{children}</p>}
    </div>
  );
}

export function Hero() {
  return (
    <section id="top" className="hero on-dark">
      <div className="wrap hero-inner">
        <div>
          <span className="eyebrow">{hero.eyebrow}</span>
          <h1>{hero.title} <span className="accent">{hero.titleAccent}</span></h1>
          <p className="lead">{hero.lead}</p>
          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">Start a project</a>
            <a className="btn btn-ghost" href="#process">How we work</a>
          </div>
        </div>
        <img className="hero-mark" src="/assets/icon-512.png" alt="" width="512" height="512" />
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="tint">
      <div className="wrap">
        <SectionHead eyebrow="Services" title="What we do">A short introduction to your services.</SectionHead>
        <div className="grid">
          {services.map((s) => (
            <article className="card" key={s.title}>
              <div className="card-icon"><Icon name={s.icon} /></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <a className="text-link" href="#contact">Find out more</a>
            </article>
          ))}
          <article className="card card-alt">
            <h3>Not sure what you need?</h3>
            <p>Tell us what you're trying to achieve and we'll point you in the right direction.</p>
            <a className="text-link" href="#contact">Ask us a question</a>
          </article>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about">
      <div className="wrap split">
        <div>
          <span className="eyebrow">About</span>
          <h2>{about.title}</h2>
          {about.paragraphs.map((p) => <p key={p}>{p}</p>)}
          <a className="text-link" href="#contact">More about us</a>
        </div>
        <aside className="facts" aria-labelledby="facts-title">
          <h3 id="facts-title">At a glance</h3>
          <dl>
            {about.facts.map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{value}</dd></div>
            ))}
          </dl>
        </aside>
      </div>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="on-dark">
      <div className="wrap">
        <SectionHead eyebrow="How we work" title="A simple, clear process">
          A sentence introducing how a project runs from start to finish.
        </SectionHead>
        <ol className="steps">
          {steps.map((s) => (
            <li key={s.title}><h3>{s.title}</h3><p>{s.text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}

export function Audiences() {
  return (
    <section className="tint audience">
      <div className="wrap">
        <SectionHead eyebrow="Who we work with" title="Built for people like you" />
        <div className="grid">
          {audiences.map((a) => (
            <article className="card" key={a.tag}>
              <div className="tag">{a.tag}</div>
              <h3>{a.title}</h3>
              <ul>{a.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="contact-band">
      <div className="wrap contact-inner">
        <div>
          <h2>Let's talk about your project</h2>
          <p>We reply to every message within one working day.</p>
          <a className="btn btn-primary" href={`mailto:${contact.email}`}>Get in touch</a>
        </div>
        <ul className="contact-list">
          <li><a href={`mailto:${contact.email}`}><Icon name="mail" />{contact.email}</a></li>
          <li><a href={contact.phoneHref}><Icon name="phone" />{contact.phoneLabel}</a></li>
        </ul>
      </div>
    </section>
  );
}

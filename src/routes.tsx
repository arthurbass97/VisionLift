import type { ReactNode } from 'react';
import Breadcrumbs from './components/Breadcrumbs';
import ServicePage from './components/ServicePage';
import { about, contact, contactPage, processIntro, services, servicesIntro } from './content';
import {
  AboutDetails, ContactDetails, CtaBand, Hero, PageHeader, Process, Services,
} from './components/Sections';

export interface Page {
  path: string;
  title: string;
  description: string;
  body: () => ReactNode;
}

const brand = 'Vision Lift';

export const pages: Page[] = [
  {
    path: '/',
    title: `Web Design & App Development in Clitheroe | ${brand}`,
    description: `Web design and app development in Clitheroe, Lancashire. Vision Lift designs and builds fast, modern websites and mobile apps. Call ${contact.phoneLabel}.`,
    body: () => (
      <>
        <Hero />
        <Services />
        <Process />
        <AboutDetails onHome />
        <ContactDetails onHome />
      </>
    ),
  },
  {
    path: '/services',
    title: `Web & App Development Services in Lancashire | ${brand}`,
    description: 'Website design, mobile app development, UI & UX, SEO and support from Vision Lift, a digital agency in Clitheroe, Lancashire.',
    body: () => (
      <>
        <PageHeader crumb="Services" path="/services" title={servicesIntro.title} lead={servicesIntro.lead} />
        <Services standalone />
        <CtaBand />
      </>
    ),
  },
  {
    path: '/how-we-work',
    title: `How We Work: Our Web & App Design Process | ${brand}`,
    description: 'How a Vision Lift project runs, from discovery and planning to build, launch and ongoing support.',
    body: () => (
      <>
        <PageHeader crumb="How we work" path="/how-we-work" title={processIntro.title} lead={processIntro.lead} />
        <Process standalone />
        <CtaBand />
      </>
    ),
  },
  {
    path: '/about',
    title: `About Us – Clitheroe Web Design Studio | ${brand}`,
    description: 'Vision Lift is a web and mobile studio in Clitheroe, Lancashire, with 10+ years of experience designing and building websites and apps.',
    body: () => (
      <>
        <PageHeader crumb="About" path="/about" title={about.title} lead={about.intro} />
        <AboutDetails />
        <CtaBand />
      </>
    ),
  },
  {
    path: '/contact',
    title: `Contact Us for a Website or App Quote | ${brand}`,
    description: `Get in touch with Vision Lift about your website or app. Call ${contact.phoneLabel} or email ${contact.email} — we reply within one working day.`,
    body: () => (
      <>
        <PageHeader crumb="Contact" path="/contact" title={contactPage.title} lead={contactPage.lead} />
        <ContactDetails />
      </>
    ),
  },
];

// One page per service, at /services/<slug>. Content lives in src/serviceContent.ts.
pages.push(
  ...services.map((service): Page => ({
    path: `/services/${service.slug}`,
    title: `${service.metaTitle} | ${brand}`,
    description: service.metaDescription,
    body: () => <ServicePage service={service} />,
  })),
);

export const notFound: Page = {
  path: '/404',
  title: `Page not found | ${brand}`,
  description: 'The page you were looking for could not be found.',
  body: () => (
    <section className="page-header not-found">
      <div className="wrap">
        <Breadcrumbs trail={[{ label: 'Page not found', path: '/404' }]} structuredData={false} />
        <h1>Page not found</h1>
        <p className="lead">The page you're looking for doesn't exist or has moved.</p>
        <a className="btn btn-primary" href="/">Back to the home page</a>
      </div>
    </section>
  ),
};

/** "/about/" → "/about", "" → "/" */
export function normalisePath(path: string): string {
  const trimmed = path.replace(/\/+$/, '');
  return trimmed === '' ? '/' : trimmed;
}

export function findPage(path: string): Page {
  const p = normalisePath(path);
  return pages.find((page) => page.path === p) ?? notFound;
}

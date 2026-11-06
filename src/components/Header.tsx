import { useEffect, useRef, useState } from 'react';
import Icon from './Icon';
import { contact, navLinks } from '../content';

// Section ids on the home page that the header follows while scrolling, in page order.
const homeSections = navLinks.map((l) => l.section);

export default function Header({ path }: { path: string }) {
  const isHome = path === '/';
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  // On the home page: the section in view ("services"). On other pages: the page path ("/about").
  const [active, setActive] = useState(isHome ? 'top' : path);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll while the mobile menu is open, and move focus into it.
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    if (open) closeRef.current?.focus();
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  // Close on Escape, and when the window grows past the mobile breakpoint.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen((wasOpen) => {
          if (wasOpen) toggleRef.current?.focus();
          return false;
        });
      }
    };
    const mq = window.matchMedia('(max-width: 1080px)');
    const onBreakpoint = (e: MediaQueryListEvent) => { if (!e.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onBreakpoint);
    };
  }, []);

  // On scroll: switch the header to its full-width bar, and on the home page work
  // out which section is in view so its nav link can be highlighted.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 8);
      if (!isHome) return;

      const header = document.querySelector<HTMLElement>('.site-header');
      const line = (header?.offsetHeight ?? 0) + 120; // a little below the header
      let current = homeSections[0];
      for (const id of homeSections) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section may never reach the line, so select it.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = homeSections[homeSections.length - 1];
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [isHome]);

  const close = () => setOpen(false);
  const isActive = (link: (typeof navLinks)[number]) =>
    isHome
      ? active === link.section
      : active === link.href || (link.href !== '/' && active.startsWith(link.href + '/'));
  const current = (link: (typeof navLinks)[number]) =>
    isActive(link) ? (isHome ? 'location' : 'page') : undefined;

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <div className="wrap">
        <div className="header-bar">
          <button
            ref={toggleRef}
            className="nav-toggle"
            type="button"
            aria-controls="mobile-menu"
            aria-expanded={open}
            aria-label="Open menu"
            onClick={() => setOpen(true)}
          >
            <span />
          </button>

          <a className="brand" href="/" aria-label="Vision Lift home">
            <img src="/assets/logo-light-480.webp" alt="Vision Lift" width="480" height="122" />
          </a>

          <nav className="site-nav" aria-label="Main">
            <ul className="nav-list">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className={isActive(link) ? 'active' : undefined}
                    aria-current={current(link)}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <a className="header-cta" href="/contact">
            <span>Start a project</span>
            <Icon name="arrowRight" />
          </a>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        className={`mobile-menu${open ? ' is-open' : ''}`}
        id="mobile-menu"
        role="dialog"
        aria-modal="true"
        aria-label="Menu"
        aria-hidden={!open}
        inert={!open}
      >
        <div className="mobile-menu-inner">
          <div className="mobile-menu-top">
            <a className="brand" href="/" aria-label="Vision Lift home" onClick={close}>
              <img src="/assets/logo-light-480.webp" alt="Vision Lift" width="480" height="122" />
            </a>
            <button ref={closeRef} className="mobile-close" type="button" aria-label="Close menu" onClick={close}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>

          <div className="mobile-actions">
            <a className="pill pill-primary" href="/contact" onClick={close}>
              Start a project <Icon name="arrowRight" />
            </a>
            <a className="pill pill-ghost" href={contact.phoneHref} onClick={close}>
              Call {contact.phoneLabel} <Icon name="arrowRight" />
            </a>
          </div>

          <nav aria-label="Mobile">
            <ul className="mobile-links">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    className={isActive(link) ? 'active' : undefined}
                    aria-current={current(link)}
                  >
                    <span>{link.label}</span>
                    <Icon name="arrowRight" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mobile-contact">
            <a className="mobile-phone" href={contact.phoneHref}>{contact.phoneLabel}</a>
            <span className="mobile-divider" aria-hidden="true" />
            <a className="mobile-email" href={`mailto:${contact.email}`}>{contact.email}</a>
          </div>
        </div>
      </div>
    </header>
  );
}

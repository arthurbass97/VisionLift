import { useEffect, useRef, useState } from 'react';
import { navLinks } from '../content';

export default function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState('top');
  const toggleRef = useRef<HTMLButtonElement>(null);

  // Lock page scroll while the mobile menu is open.
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
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
    const mq = window.matchMedia('(max-width: 900px)');
    const onBreakpoint = (e: MediaQueryListEvent) => { if (!e.matches) setOpen(false); };
    document.addEventListener('keydown', onKey);
    mq.addEventListener('change', onBreakpoint);
    return () => {
      document.removeEventListener('keydown', onKey);
      mq.removeEventListener('change', onBreakpoint);
    };
  }, []);

  // On scroll: add the header shadow, and work out which section is in view
  // so its nav link can be highlighted.
  useEffect(() => {
    const ids = navLinks.map((l) => l.href.slice(1));
    const onScroll = () => {
      setScrolled(window.scrollY > 8);

      const header = document.querySelector<HTMLElement>('.site-header');
      const line = (header?.offsetHeight ?? 0) + 120; // a little below the header
      let current = ids[0];
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom the last section may never reach the line, so select it.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      if (atBottom) current = ids[ids.length - 1];
      setActive(current);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  const close = () => setOpen(false);

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}${open ? ' is-open' : ''}`}>
      <div className="wrap header-inner">
        <a className="brand" href="#top" aria-label="Vision Lift home" onClick={close}>
          <img src="/assets/logo-dark.png" alt="Vision Lift" width="1600" height="407" />
        </a>

        <button
          ref={toggleRef}
          className="nav-toggle"
          type="button"
          aria-controls="site-nav"
          aria-expanded={open}
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
        </button>

        <nav className="site-nav" id="site-nav" aria-label="Main">
          <ul className="nav-list">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={close}
                  className={active === link.href.slice(1) ? 'active' : undefined}
                  aria-current={active === link.href.slice(1) ? 'location' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="nav-cta">
              <a href="#contact" onClick={close}>Get in touch</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

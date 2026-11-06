import { footer, navLinks } from '../content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-inner">
          <div className="footer-brand">
            <img src="/assets/logo-dark-480.webp" alt="Vision Lift" width="480" height="122" />
            <p>{footer.tagline}</p>
          </div>
          <nav aria-label="Footer">
            <ul className="footer-links">
              {navLinks.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}
            </ul>
          </nav>
          <p className="footer-copy" suppressHydrationWarning>&copy; {new Date().getFullYear()} Vision Lift</p>
        </div>
      </div>
    </footer>
  );
}

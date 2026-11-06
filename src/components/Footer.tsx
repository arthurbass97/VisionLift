import { contact, footer, services } from '../content';

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="footer-grid">
          <div className="footer-brand">
            <img src="/assets/logo-dark.png" alt="Vision Lift" width="1600" height="407" />
            <p>{footer.tagline}</p>
          </div>
          <div>
            <h3>Services</h3>
            <ul>
              {services.slice(0, 4).map((s) => (
                <li key={s.title}><a href="#services">{s.title}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <h3>Company</h3>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#process">How we work</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><a href="/privacy">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <h3>Contact</h3>
            <ul>
              <li><a href={`mailto:${contact.email}`}>{contact.email}</a></li>
              <li><a href={contact.phoneHref}>{contact.phoneLabel}</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <span>&copy; {new Date().getFullYear()} Vision Lift</span>
          <span>{footer.note}</span>
        </div>
      </div>
    </footer>
  );
}

import Header from './components/Header';
import Footer from './components/Footer';
import type { Page } from './routes';

export default function App({ page }: { page: Page }) {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header path={page.path} />
      <main id="main">{page.body()}</main>
      <Footer />
    </>
  );
}

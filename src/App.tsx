import Header from './components/Header';
import Footer from './components/Footer';
import { Hero, Services, About, Process, Audiences, Contact } from './components/Sections';

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Header />
      <main id="main">
        <Hero />
        <Services />
        <About />
        <Process />
        <Audiences />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

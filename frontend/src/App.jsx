import ErrorBoundary from './components/ErrorBoundary';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ValueProps from './components/ValueProps';
import Portfolio from './components/Portfolio';
import Technology from './components/Technology';
import EquipmentCarousel from './components/EquipmentCarousel';
import ExamCatalog from './components/ExamCatalog';
import HomeService from './components/HomeService';
import Benefits from './components/Benefits';
import QuickQuote from './components/QuickQuote';
import Trust from './components/Trust';
import Contact from './components/Contact';
import Footer from './components/Footer';
import WhatsAppFloat from './components/WhatsAppFloat';
import MobileCTA from './components/MobileCTA';
import BackToTop from './components/BackToTop';

export default function App() {
  return (
    <ErrorBoundary>
      <a href="#contenido" className="skip-link">
        Saltar al contenido
      </a>
      <Navbar />
      <main id="contenido">
        <Hero />
        <ValueProps />
        <Portfolio />
        <ExamCatalog />
        <Technology />
        <div className="py-20">
          <div className="max-w-[1180px] mx-auto px-6">
            <div className="text-center mb-8">
              <p className="font-mono text-xs uppercase tracking-[0.14em] font-semibold text-teal-dim">
                Equipos especializados
              </p>
              <h2 className="mt-2.5 text-[clamp(24px,3vw,34px)] font-extrabold leading-tight text-navy">
                Nuestra tecnología de laboratorio
              </h2>
            </div>
          </div>
          <EquipmentCarousel />
        </div>
        <HomeService />
        <Benefits />
        <QuickQuote />
        <Trust />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <MobileCTA />
      <BackToTop />
    </ErrorBoundary>
  );
}
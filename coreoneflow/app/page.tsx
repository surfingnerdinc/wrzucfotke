import Hero from './components/hero/Hero';
import Features from './components/hero/Features';
import AIFeatures from './components/hero/AIFeatures';
import AIIntegrations from './components/hero/AIIntegrations';
import AICaseStudies from './components/hero/AICaseStudies';
import Benefits from './components/hero/Benefits';
import Testimonials from './components/hero/Testimonials';
import Pricing from './components/hero/Pricing';
import Contact from './components/hero/Contact';
import Footer from './components/hero/Footer';

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Features />
      <AIFeatures />
      <AIIntegrations />
      <AICaseStudies />
      <Benefits />
      <Testimonials />
      <Pricing />
      <Contact />
      <Footer />
    </main>
  );
}

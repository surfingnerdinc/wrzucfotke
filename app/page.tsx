import Navigation from './components/Navigation';
import Hero from './components/hero/Hero';
import Features from './components/hero/Features';
import HowItWorks from './components/hero/HowItWorks';
import Pricing from './components/hero/Pricing';
import Footer from './components/hero/Footer';

export default function Home() {
  return (
    <div className="">
      <Navigation />
      <Hero />
      <section id="features">
        <Features />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <Footer />
    </div>
  );
}

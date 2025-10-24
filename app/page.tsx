import Hero from './components/hero/Hero';
import Features from './components/hero/Features';
import HowItWorks from './components/hero/HowItWorks';
import HowQRWorks from './components/hero/HowQRWorks';
import Pricing from './components/hero/Pricing';
import ContactSection from './components/contact/ContactSection';
import Footer from './components/hero/Footer';

export default function Home() {
  return (
    <div className="">
      <Hero />
       <section id="qr-guide">
        <HowQRWorks />
      </section>
      <section id="features">
        <Features />
      </section>
      <section id="how-it-works">
        <HowItWorks />
      </section>
      <section id="pricing">
        <Pricing />
      </section>
      <section id="contact">
        <ContactSection />
      </section>
      <Footer />
    </div>
  );
}

'use client';

import React from 'react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Anna Kowalska',
      position: 'CEO',
      company: 'TechStart Solutions',
      image: '👩‍💼',
      quote: 'Core One Flow całkowicie zmienił sposób, w jaki zarządzamy naszymi klientami. Oszczędzamy 6 godzin tygodniowo na rutynowych zadaniach, a nasza konwersja wzrosła o 35%. To najlepsza inwestycja, jaką zrobiliśmy w tym roku.',
      rating: 5,
      metrics: '35% wzrost konwersji'
    },
    {
      name: 'Michał Nowak',
      position: 'Dyrektor Sprzedaży',
      company: 'ProBusiness Sp. z o.o.',
      image: '👨‍💼',
      quote: 'Automatyzacja w Core One Flow to game-changer. Nasze leady są automatycznie segmentowane i otrzymują spersonalizowane komunikaty. Zespół może się skupić na prawdziwej sprzedaży zamiast na administracji.',
      rating: 5,
      metrics: '60% więcej czasu na sprzedaż'
    },
    {
      name: 'Katarzyna Zielińska',
      position: 'Project Manager',
      company: 'Digital Agency Pro',
      image: '👩‍💻',
      quote: 'Zarządzanie 15 projektami jednocześnie nie było nigdy łatwiejsze. Dashboardy w czasie rzeczywistym, automatyczne raporty i inteligentne przypomnienia sprawiają, że nic nie umknie mojej uwadze.',
      rating: 5,
      metrics: '40% szybsze dostawy projektów'
    },
    {
      name: 'Paweł Wiśniewski',
      position: 'Founder',
      company: 'GrowthHack Studio',
      image: '👨‍🚀',
      quote: 'Przeszliśmy z Excel-a na Core One Flow i różnica jest astronomiczna. Analityka pokazuje nam dokładnie, gdzie tracymy klientów i jak optymalizować procesy. ROI zwrócił się w 2 miesiące.',
      rating: 5,
      metrics: 'ROI w 2 miesiące'
    },
    {
      name: 'Magdalena Król',
      position: 'Operations Director',
      company: 'ServiceMax',
      image: '👩‍🔧',
      quote: 'Integracja z naszymi istniejącymi systemami przebiegła bezproblemowo. API jest intuicyjne, a wsparcie techniczne odpowiada w minuty. Zespół IT był pod wrażeniem jakości dokumentacji.',
      rating: 5,
      metrics: 'Integracja w 1 dzień'
    },
    {
      name: 'Tomasz Lewandowski',
      position: 'Sales Manager',
      company: 'B2B Solutions',
      image: '👨‍📊',
      quote: 'Mobile app pozwala mi zarządzać wszystkim z telefonu. Nawet w trasie mam pełen dostęp do bazy klientów i mogę aktualizować statusy projektów. To rewolucja w mobilności biznesowej.',
      rating: 5,
      metrics: '100% mobilność'
    }
  ];

  const stats = [
    { number: '2,500+', label: 'Zadowolonych klientów' },
    { number: '98%', label: 'Retention rate' },
    { number: '4.9/5', label: 'Średnia ocena' },
    { number: '24h', label: 'Średni czas wdrożenia' }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-yellow-100 border border-yellow-200 rounded-full px-4 py-2 mb-6">
              <span className="text-yellow-600 mr-2">⭐</span>
              <span className="text-yellow-700 text-sm font-medium">Opinie klientów</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Co mówią o nas
              <span className="bg-linear-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent"> nasi klienci</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Dołącz do tysięcy firm, które już przekształciły swoje procesy biznesowe dzięki Core One Flow. 
              Przeczytaj prawdziwe historie sukcesu naszych użytkowników.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl lg:text-5xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Testimonials Grid */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
              >
                {/* Rating */}
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">⭐</span>
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-gray-700 mb-6 leading-relaxed">
                  "{testimonial.quote}"
                </blockquote>

                {/* Metrics */}
                <div className="bg-linear-to-r from-purple-50 to-cyan-50 rounded-lg p-3 mb-6">
                  <div className="text-sm text-gray-600 mb-1">Kluczowy wynik</div>
                  <div className="font-semibold text-purple-600">{testimonial.metrics}</div>
                </div>

                {/* Author */}
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mr-4">
                    <span className="text-2xl">{testimonial.image}</span>
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-600 text-sm">{testimonial.position}</div>
                    <div className="text-gray-500 text-sm">{testimonial.company}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Trust Indicators */}
          <div className="bg-white rounded-2xl p-12 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">
              Zaufały nam firmy z różnych branż
            </h3>
            
            <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
              <div className="text-center">
                <div className="text-4xl mb-2">🏢</div>
                <div className="text-sm text-gray-600">Enterprise</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🏥</div>
                <div className="text-sm text-gray-600">Healthcare</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">💼</div>
                <div className="text-sm text-gray-600">Consulting</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">🎨</div>
                <div className="text-sm text-gray-600">Creative</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">⚡</div>
                <div className="text-sm text-gray-600">Tech</div>
              </div>
              <div className="text-center">
                <div className="text-4xl mb-2">📊</div>
                <div className="text-sm text-gray-600">Finance</div>
              </div>
            </div>

            <div className="mt-12">
              <h4 className="font-semibold text-gray-900 mb-4">Certyfikaty i zgodność</h4>
              <div className="flex justify-center gap-8 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <span>🔒</span>
                  <span>ISO 27001</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🇪🇺</span>
                  <span>GDPR Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🛡️</span>
                  <span>SOC 2 Type II</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>✅</span>
                  <span>99.9% Uptime SLA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
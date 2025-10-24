'use client';

import React, { useState } from 'react';

export default function Pricing() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: 'Starter',
      description: 'Idealne dla małych firm i startupów',
      monthlyPrice: 99,
      yearlyPrice: 79,
      features: [
        'Do 5 użytkowników',
        'Baza 1000 klientów',
        '10 aktywnych projektów',
        'Podstawowe raporty',
        'Email support',
        'Mobile app',
        'Podstawowa automatyzacja'
      ],
      popular: false,
      color: 'purple'
    },
    {
      name: 'Professional',
      description: 'Najlepszy dla rozwijających się firm',
      monthlyPrice: 199,
      yearlyPrice: 159,
      features: [
        'Do 25 użytkowników',
        'Nieograniczona baza klientów',
        'Nieograniczone projekty',
        'Zaawansowane raporty',
        'Priorytetowy support 24/7',
        'API integrations',
        'Zaawansowana automatyzacja',
        'Custom workflows',
        'Team collaboration tools',
        'Advanced analytics'
      ],
      popular: true,
      color: 'cyan'
    },
    {
      name: 'Enterprise',
      description: 'Dla dużych organizacji',
      monthlyPrice: 399,
      yearlyPrice: 319,
      features: [
        'Nieograniczeni użytkownicy',
        'Nieograniczona baza klientów',
        'Nieograniczone projekty',
        'AI-powered insights',
        'Dedicated account manager',
        'Custom integrations',
        'White-label options',
        'Advanced security',
        'Custom training',
        'SLA guarantee',
        'Multi-company support',
        'Advanced permissions'
      ],
      popular: false,
      color: 'purple'
    }
  ];

  return (
    <section id="pricing" className="py-24 bg-linear-to-b from-white to-gray-50">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-green-100 border border-green-200 rounded-full px-4 py-2 mb-6">
              <span className="text-green-600 mr-2">💰</span>
              <span className="text-green-700 text-sm font-medium">Cennik</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Proste i transparentne
              <span className="bg-linear-to-r from-green-600 to-cyan-600 bg-clip-text text-transparent"> ceny</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Wybierz plan, który najlepiej odpowiada potrzebom Twojej firmy. 
              Wszystkie plany zawierają 30-dniowy darmowy trial bez zobowiązań.
            </p>

            {/* Toggle */}
            <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  !isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
                onClick={() => setIsYearly(false)}
              >
                Miesięcznie
              </button>
              <button
                className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                  isYearly ? 'bg-white text-gray-900 shadow-sm' : 'text-gray-600'
                }`}
                onClick={() => setIsYearly(true)}
              >
                Rocznie
                <span className="ml-1 text-green-600 font-semibold">-20%</span>
              </button>
            </div>
          </div>

          {/* Pricing Cards */}
          <div className="grid lg:grid-cols-3 gap-8 mb-16">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl border-2 p-8 ${
                  plan.popular
                    ? 'border-cyan-500 bg-linear-to-b from-white to-cyan-50 scale-105'
                    : 'border-gray-200 bg-white hover:border-gray-300'
                } transition-all duration-300 hover:shadow-xl`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <div className="bg-linear-to-r from-cyan-500 to-purple-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                      Najpopularniejszy
                    </div>
                  </div>
                )}

                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-6">{plan.description}</p>
                  
                  <div className="mb-4">
                    <span className="text-5xl font-bold text-gray-900">
                      {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                    </span>
                    <span className="text-gray-600 ml-2">PLN/miesiąc</span>
                  </div>
                  
                  {isYearly && (
                    <div className="text-sm text-green-600 font-semibold">
                      Oszczędzasz {(plan.monthlyPrice - plan.yearlyPrice) * 12} PLN rocznie
                    </div>
                  )}
                </div>

                <div className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center">
                      <span className="text-green-500 mr-3">✓</span>
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>

                <button
                  className={`w-full py-4 px-6 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? 'bg-linear-to-r from-cyan-500 to-purple-500 text-white hover:shadow-lg transform hover:scale-105'
                      : 'border-2 border-gray-300 text-gray-700 hover:border-purple-500 hover:text-purple-600'
                  }`}
                >
                  Rozpocznij darmowy trial
                </button>
              </div>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-8">Często zadawane pytania</h3>
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto text-left">
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Czy mogę zmienić plan w każdej chwili?</h4>
                <p className="text-gray-600">Tak, możesz zmienić plan w dowolnym momencie. Zmiany wchodzą w życie natychmiast, a rozliczenia są proporcjonalne.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Czy jest dostępna polska faktura VAT?</h4>
                <p className="text-gray-600">Tak, wystawiamy polskie faktury VAT dla wszystkich klientów krajowych oraz faktury zgodne z prawem UE.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Czy moje dane są bezpieczne?</h4>
                <p className="text-gray-600">Absolutnie. Używamy szyfrowania klasy bankowej i przechowujemy dane w certyfikowanych centrach danych w UE.</p>
              </div>
              <div>
                <h4 className="font-semibold text-gray-900 mb-2">Czy oferujecie wsparcie techniczne?</h4>
                <p className="text-gray-600">Tak, wszystkie plany zawierają wsparcie techniczne. Plany Professional i Enterprise mają priorytetowy support 24/7.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
'use client';

import React from 'react';

export default function Features() {
  const features = [
    {
      icon: '👥',
      title: 'Zarządzanie Bazą Klientów',
      description: 'Kompleksowa baza danych klientów z zaawansowanymi filtrami, segmentacją i historią interakcji. Przechowuj wszystkie ważne informacje w jednym miejscu.',
      benefits: ['360° widok klienta', 'Segmentacja automatyczna', 'Import/Export danych', 'Duplikaty - automatyczne wykrywanie']
    },
    {
      icon: '📝',
      title: 'Notatki i Komunikacja',
      description: 'Inteligentny system notatek z tagowaniem, wyszukiwaniem i automatycznym linkowaniem do projektów. Nigdy nie przegap ważnej informacji.',
      benefits: ['Rich text editor', 'Załączniki i pliki', 'Historia zmian', 'Współdzielenie z zespołem']
    },
    {
      icon: '📊',
      title: 'Zarządzanie Projektami',
      description: 'Profesjonalne narzędzia do zarządzania projektami z timeline, zadaniami, kamieniami milowymi i raportami postępu.',
      benefits: ['Diagramy Gantta', 'Kanban boards', 'Timetracking', 'Budżetowanie projektów']
    },
    {
      icon: '⏰',
      title: 'Przypomnienia i Kalendarze',
      description: 'Nigdy nie przegap ważnego terminu dzięki inteligentnym przypomnieniom, kalendarzom i synchronizacji z zewnętrznymi systemami.',
      benefits: ['Smart notifications', 'Sync z Google/Outlook', 'Recurring events', 'Team calendars']
    },
    {
      icon: '🤖',
      title: 'Automatyzacja Procesów',
      description: 'Zaawansowana automatyzacja rutynowych zadań, workflow i procesów biznesowych. Oszczędź czas i zwiększ efektywność.',
      benefits: ['Workflow builder', 'Email automation', 'Lead scoring', 'Custom triggers']
    },
    {
      icon: '📈',
      title: 'Analityka i Raporty',
      description: 'Szczegółowe raporty, dashboardy i analytics które pomagają w podejmowaniu decyzji biznesowych opartych na danych.',
      benefits: ['Real-time dashboards', 'Custom reports', 'KPI tracking', 'Forecasting']
    }
  ];

  return (
    <section id="features" className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-purple-100 border border-purple-200 rounded-full px-4 py-2 mb-6">
              <span className="text-purple-600 mr-2">✨</span>
              <span className="text-purple-700 text-sm font-medium">Funkcjonalności</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Wszystko czego potrzebujesz
              <span className="bg-linear-to-r from-purple-600 to-cyan-600 bg-clip-text text-transparent"> w jednym miejscu</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Core One Flow to kompletne rozwiązanie CRM, które łączy w sobie najlepsze narzędzia do zarządzania 
              relacjami z klientami, projektami i automatyzacją procesów biznesowych.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid lg:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="group relative">
                <div className="bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 hover:border-purple-200 hover:bg-linear-to-br hover:from-white hover:to-purple-50">
                  <div className="flex items-start gap-4">
                    <div className="shrink-0">
                      <div className="w-16 h-16 bg-linear-to-r from-purple-100 to-cyan-100 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                        <span className="text-3xl">{feature.icon}</span>
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-purple-600 transition-colors">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 mb-6 leading-relaxed">
                        {feature.description}
                      </p>
                      <div className="grid grid-cols-2 gap-2">
                        {feature.benefits.map((benefit, benefitIndex) => (
                          <div key={benefitIndex} className="flex items-center text-sm text-gray-500">
                            <span className="text-green-500 mr-2">✓</span>
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* CTA Section */}
          <div className="mt-16 text-center">
            <div className="bg-linear-to-r from-purple-600 to-cyan-600 rounded-2xl p-12 text-white">
              <h3 className="text-3xl font-bold mb-4">Gotowy na rewolucję w zarządzaniu biznesem?</h3>
              <p className="text-purple-100 mb-8 max-w-2xl mx-auto">
                Dołącz do tysięcy firm, które już korzystają z Core One Flow i oszczędzają średnio 40% czasu 
                na rutynowych zadaniach administracyjnych.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Rozpocznij darmowy trial
                </button>
                <button className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold hover:bg-white hover:text-purple-600 transition-all duration-300">
                  Umów się na demo
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
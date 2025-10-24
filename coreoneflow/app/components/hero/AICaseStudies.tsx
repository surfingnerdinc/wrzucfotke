'use client';

import React, { useState } from 'react';

export default function AICaseStudies() {
  const [activeCase, setActiveCase] = useState(0);

  const caseStudies = [
    {
      company: 'TechStart Solutions',
      industry: 'Software Development',
      size: '50 pracowników',
      challenge: 'Ręczne zarządzanie leadami i brak automatyzacji follow-up',
      solution: 'Implementacja AI chatbota i automatyzacji workflow',
      results: {
        leadConversion: '+245%',
        responseTime: '-89%',
        teamEfficiency: '+156%',
        customerSatisfaction: '98%'
      },
      quote: 'AI w Core One Flow to była rewolucja. Nasz zespół sprzedaży może się skupić na tym, co robi najlepiej - budowaniu relacji z klientami, podczas gdy AI zajmuje się rutynowymi zadaniami.',
      author: 'Anna Kowalska, CEO',
      timeline: '3 miesiące wdrożenia'
    },
    {
      company: 'E-commerce Pro',
      industry: 'E-commerce',
      size: '120 pracowników',
      challenge: 'Problemy z obsługą klienta w godzinach nocnych i weekendy',
      solution: 'AI chatbot 24/7 z integracją do systemu zamówień',
      results: {
        availabilityIncrease: '24/7',
        ticketReduction: '-67%',
        salesIncrease: '+34%',
        automationRate: '78%'
      },
      quote: 'Dzięki AI asystentowi obsługujemy klientów przez całą dobę. System sam rozwiązuje 78% zapytań, a nasze sprzedaże wzrosły o 34% dzięki lepszej dostępności.',
      author: 'Michał Nowak, Head of Customer Success',
      timeline: '6 tygodni wdrożenia'
    },
    {
      company: 'Consulting Excellence',
      industry: 'Business Consulting',
      size: '25 pracowników',
      challenge: 'Trudności w śledzeniu projektów i komunikacji z klientami',
      solution: 'AI analytics do przewidywania projektów i automatyzacji raportów',
      results: {
        projectSuccess: '+89%',
        clientRetention: '+45%',
        timeToInsight: '-78%',
        revenueGrowth: '+67%'
      },
      quote: 'AI przewiduje potencjalne problemy w projektach zanim się pojawią. Nasza skuteczność projektowa wzrosła o 89%, a klienci są zachwyceni proaktywną komunikacją.',
      author: 'Katarzyna Zielińska, Managing Director',
      timeline: '4 tygodnie wdrożenia'
    }
  ];

  const aiStats = [
    { number: '50M+', label: 'Wiadomości przetworzone przez AI', icon: '💬' },
    { number: '99.4%', label: 'Dokładność rozpoznawania intencji', icon: '🎯' },
    { number: '2.3s', label: 'Średni czas odpowiedzi AI', icon: '⚡' },
    { number: '47', label: 'Języków obsługiwanych', icon: '🌍' }
  ];

  return (
    <section className="py-24 bg-linear-to-b from-slate-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-emerald-100 border border-emerald-200 rounded-full px-4 py-2 mb-6">
              <span className="text-emerald-600 mr-2">📊</span>
              <span className="text-emerald-700 text-sm font-medium">AI Case Studies</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Prawdziwe wyniki
              <span className="bg-linear-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"> dzięki AI</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Poznaj historie firm, które już wykorzystują sztuczną inteligencję Core One Flow 
              do automatyzacji procesów i zwiększania sprzedaży.
            </p>
          </div>

          {/* AI Stats */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            {aiStats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 mx-auto mb-4 bg-linear-to-r from-emerald-100 to-teal-100 rounded-2xl flex items-center justify-center">
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Case Study Selector */}
          <div className="mb-12">
            <div className="flex justify-center mb-8">
              <div className="bg-white rounded-2xl border border-gray-200 p-2 shadow-sm">
                {caseStudies.map((caseStudy, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveCase(index)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeCase === index
                        ? 'bg-emerald-500 text-white shadow-md'
                        : 'text-gray-600 hover:text-emerald-600 hover:bg-emerald-50'
                    }`}
                  >
                    {caseStudy.company}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Case Study */}
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-lg">
              <div className="grid lg:grid-cols-2">
                {/* Case Info */}
                <div className="p-12">
                  <div className="mb-8">
                    <h3 className="text-3xl font-bold text-gray-900 mb-4">
                      {caseStudies[activeCase].company}
                    </h3>
                    <div className="flex flex-wrap gap-4 text-sm">
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {caseStudies[activeCase].industry}
                      </span>
                      <span className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full">
                        {caseStudies[activeCase].size}
                      </span>
                      <span className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full">
                        {caseStudies[activeCase].timeline}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-6">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Wyzwanie:</h4>
                      <p className="text-gray-600">{caseStudies[activeCase].challenge}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Rozwiązanie AI:</h4>
                      <p className="text-gray-600">{caseStudies[activeCase].solution}</p>
                    </div>

                    <div>
                      <blockquote className="bg-emerald-50 border-l-4 border-emerald-500 p-6 italic text-gray-700">
                        "{caseStudies[activeCase].quote}"
                        <footer className="text-emerald-700 font-semibold mt-4">
                          — {caseStudies[activeCase].author}
                        </footer>
                      </blockquote>
                    </div>
                  </div>
                </div>

                {/* Results */}
                <div className="bg-linear-to-br from-emerald-500 to-teal-600 p-12 text-white">
                  <h4 className="text-2xl font-bold mb-8">Wyniki po wdrożeniu AI</h4>
                  
                  <div className="space-y-6">
                    {Object.entries(caseStudies[activeCase].results).map(([key, value], index) => {
                      const labels: { [key: string]: string } = {
                        leadConversion: 'Wzrost konwersji leadów',
                        responseTime: 'Redukcja czasu odpowiedzi',
                        teamEfficiency: 'Wzrost efektywności zespołu',
                        customerSatisfaction: 'Satysfakcja klientów',
                        availabilityIncrease: 'Dostępność obsługi',
                        ticketReduction: 'Redukcja ticketów',
                        salesIncrease: 'Wzrost sprzedaży',
                        automationRate: 'Poziom automatyzacji',
                        projectSuccess: 'Sukces projektów',
                        clientRetention: 'Retencja klientów',
                        timeToInsight: 'Czas do uzyskania insights',
                        revenueGrowth: 'Wzrost przychodów'
                      };
                      
                      return (
                        <div key={index} className="flex items-center justify-between p-4 bg-white/10 rounded-xl backdrop-blur-sm">
                          <span className="font-medium">{labels[key]}</span>
                          <span className="text-3xl font-bold">{value}</span>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-8 pt-8 border-t border-white/20">
                    <button className="bg-white text-emerald-600 px-8 py-4 rounded-full font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                      Pobierz pełny case study
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* AI Implementation Process */}
          <div className="bg-gray-50 rounded-2xl p-12">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Jak wdrażamy AI w Twojej firmie?
            </h3>
            
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  1
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Analiza procesów</h4>
                <p className="text-gray-600 text-sm">Analizujemy Twoje obecne procesy i identyfikujemy obszary do automatyzacji AI</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  2
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Konfiguracja AI</h4>
                <p className="text-gray-600 text-sm">Dostosowujemy algorytmy AI do specyfiki Twojej branży i potrzeb biznesowych</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-emerald-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  3
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Szkolenie zespołu</h4>
                <p className="text-gray-600 text-sm">Przeszkalamy Twój zespół w pracy z AI i pokazujemy najlepsze praktyki</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 mx-auto mb-6 bg-teal-500 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                  4
                </div>
                <h4 className="font-semibold text-gray-900 mb-3">Optymalizacja</h4>
                <p className="text-gray-600 text-sm">Ciągle monitorujemy i optymalizujemy działanie AI dla najlepszych wyników</p>
              </div>
            </div>
            
            <div className="text-center mt-12">
              <button className="bg-emerald-500 text-white px-8 py-4 rounded-full font-semibold hover:bg-emerald-600 transition-colors">
                Rozpocznij wdrożenie AI
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
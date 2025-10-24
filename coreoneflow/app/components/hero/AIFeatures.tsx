'use client';

import React, { useState } from 'react';

export default function AIFeatures() {
  const [activeDemo, setActiveDemo] = useState('chat');

  const aiFeatures = [
    {
      id: 'chat',
      icon: '🤖',
      title: 'Inteligentny Chatbot AI',
      description: 'Automatyczny asystent, który obsługuje klientów 24/7, odpowiada na pytania i kwalifikuje leady.',
      capabilities: [
        'Odpowiedzi w czasie rzeczywistym',
        'Rozpoznawanie intencji klienta',
        'Automatyczna kwalifikacja leadów',
        'Wielojęzyczna obsługa',
        'Integracja z bazą wiedzy'
      ]
    },
    {
      id: 'insights',
      icon: '🧠',
      title: 'AI Analytics & Insights',
      description: 'Zaawansowana analityka oparta na AI, która przewiduje trendy i sugeruje optymalizacje.',
      capabilities: [
        'Przewidywanie churn rate',
        'Analiza sentymentu klientów',
        'Rekomendacje personalizacji',
        'Optymalizacja procesów sprzedaży',
        'Predykcyjne modelowanie'
      ]
    },
    {
      id: 'automation',
      icon: '⚡',
      title: 'Smart Automation',
      description: 'Inteligentna automatyzacja, która uczy się Twoich procesów i optymalizuje workflow.',
      capabilities: [
        'Automatyczne przypisywanie zadań',
        'Inteligentne przypomnienia',
        'Optymalizacja harmonogramów',
        'Automatyczne raportowanie',
        'Predictive lead scoring'
      ]
    }
  ];

  const chatDemo = [
    { sender: 'client', message: 'Dzień dobry, interesuje mnie Wasze rozwiązanie CRM', time: '14:32' },
    { sender: 'ai', message: 'Witam! 👋 Nazywam się Alex i jestem Waszym asystentem AI. Z przyjemnością opowiem o Core One Flow. Czy mogę zapytać o wielkość Państwa firmy?', time: '14:32' },
    { sender: 'client', message: 'Mamy około 50 pracowników i problem z organizacją leadów', time: '14:33' },
    { sender: 'ai', message: 'Rozumiem! Dla firmy Państwa wielkości polecam plan Professional. ✨ Pozwoli on na:\n\n• Zarządzanie nieograniczoną liczbą leadów\n• Automatyzację follow-up\n• Zaawansowaną analitykę\n\nCzy chcieliby Państwo zobaczyć demo?', time: '14:33' }
  ];

  return (
    <section id="ai-features" className="py-24 bg-slate-900 relative overflow-hidden">
      {/* AI Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-cyan-500/20 rounded-full filter blur-3xl animate-pulse" style={{animationDelay: '4s'}}></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-2 mb-8">
              <span className="text-blue-400 mr-2">🧠</span>
              <span className="text-blue-300 text-sm font-medium">Powered by AI</span>
            </div>
            
            <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
              Sztuczna Inteligencja
              <span className="bg-linear-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent"> w służbie </span>
              Twojego biznesu
            </h2>
            
            <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto">
              Core One Flow wykorzystuje najnowsze technologie AI do automatyzacji obsługi klientów, 
              analizy danych i optymalizacji procesów sprzedażowych. Twój inteligentny asystent działa 24/7.
            </p>
          </div>

          {/* AI Features Tabs */}
          <div className="mb-16">
            <div className="flex justify-center mb-12">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-2">
                {aiFeatures.map((feature) => (
                  <button
                    key={feature.id}
                    onClick={() => setActiveDemo(feature.id)}
                    className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                      activeDemo === feature.id
                        ? 'bg-linear-to-r from-blue-500 to-cyan-500 text-white shadow-lg'
                        : 'text-gray-300 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="mr-2">{feature.icon}</span>
                    {feature.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Active Feature Display */}
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                {aiFeatures.map((feature) => 
                  activeDemo === feature.id && (
                    <div key={feature.id} className="space-y-6">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center border border-blue-500/20">
                          <span className="text-4xl">{feature.icon}</span>
                        </div>
                        <div>
                          <h3 className="text-3xl font-bold text-white mb-2">{feature.title}</h3>
                          <p className="text-blue-300">Najnowsza technologia AI</p>
                        </div>
                      </div>
                      
                      <p className="text-gray-300 text-lg leading-relaxed mb-8">
                        {feature.description}
                      </p>
                      
                      <div className="space-y-4">
                        <h4 className="text-white font-semibold mb-4">Kluczowe możliwości:</h4>
                        {feature.capabilities.map((capability, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                            <span className="text-gray-300">{capability}</span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-6">
                        <button className="bg-linear-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                          Przetestuj AI w demo
                        </button>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* Interactive Demo */}
              <div className="relative">
                {activeDemo === 'chat' && (
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 overflow-hidden">
                    {/* Chat Header */}
                    <div className="bg-linear-to-r from-blue-500/20 to-cyan-500/20 p-4 border-b border-white/10">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                          <span className="text-white font-bold">AI</span>
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Alex - AI Assistant</h4>
                          <div className="flex items-center gap-2">
                            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                            <span className="text-green-300 text-sm">Online</span>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Messages */}
                    <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                      {chatDemo.map((msg, index) => (
                        <div
                          key={index}
                          className={`flex ${msg.sender === 'client' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div
                            className={`max-w-xs p-4 rounded-2xl ${
                              msg.sender === 'client'
                                ? 'bg-blue-500 text-white'
                                : 'bg-gray-700 text-gray-100'
                            }`}
                          >
                            <p className="whitespace-pre-line">{msg.message}</p>
                            <div className="text-xs opacity-70 mt-2">{msg.time}</div>
                          </div>
                        </div>
                      ))}
                      
                      {/* Typing indicator */}
                      <div className="flex justify-start">
                        <div className="bg-gray-700 text-gray-100 p-4 rounded-2xl">
                          <div className="flex gap-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Chat Input */}
                    <div className="p-4 border-t border-white/10">
                      <div className="flex gap-3">
                        <input
                          type="text"
                          placeholder="Wpisz swoją wiadomość..."
                          className="flex-1 bg-white/10 border border-white/20 rounded-full px-4 py-3 text-white placeholder-gray-400 focus:border-blue-400 focus:ring-1 focus:ring-blue-400 transition-colors"
                        />
                        <button className="bg-blue-500 text-white p-3 rounded-full hover:bg-blue-600 transition-colors">
                          <span>➤</span>
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {activeDemo === 'insights' && (
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                    <h4 className="text-white font-bold text-xl mb-6">AI Analytics Dashboard</h4>
                    
                    <div className="space-y-6">
                      <div className="bg-linear-to-r from-green-500/20 to-emerald-500/20 rounded-xl p-6 border border-green-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-green-300 font-semibold">Przewidywany churn rate</span>
                          <span className="text-green-400 text-2xl font-bold">↓ 15%</span>
                        </div>
                        <p className="text-gray-300 text-sm">AI wykryło wzorce wskazujące na zmniejszenie odejść klientów o 15% w następnym kwartale</p>
                      </div>

                      <div className="bg-linear-to-r from-blue-500/20 to-cyan-500/20 rounded-xl p-6 border border-blue-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-blue-300 font-semibold">Optymalna pora kontaktu</span>
                          <span className="text-blue-400 text-lg font-bold">14:00-16:00</span>
                        </div>
                        <p className="text-gray-300 text-sm">Analiza pokazuje najwyższą skuteczność konwersji w tym przedziale czasowym</p>
                      </div>

                      <div className="bg-linear-to-r from-purple-500/20 to-pink-500/20 rounded-xl p-6 border border-purple-500/20">
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-purple-300 font-semibold">Lead scoring accuracy</span>
                          <span className="text-purple-400 text-2xl font-bold">94%</span>
                        </div>
                        <p className="text-gray-300 text-sm">AI poprawnie przewiduje potencjał konwersji leadów w 94% przypadków</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeDemo === 'automation' && (
                  <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
                    <h4 className="text-white font-bold text-xl mb-6">Smart Workflow Automation</h4>
                    
                    <div className="space-y-4">
                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">✓</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="text-white font-semibold">Nowy lead z formularza</h5>
                          <p className="text-gray-400 text-sm">Automatycznie przypisany do Jana K. (najwyższa skuteczność z tym segmentem)</p>
                        </div>
                        <span className="text-green-400 text-sm">Teraz</span>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center animate-spin">
                          <span className="text-white text-sm">⟳</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="text-white font-semibold">Follow-up email</h5>
                          <p className="text-gray-400 text-sm">AI przygotowuje spersonalizowaną wiadomość na podstawie profilu klienta</p>
                        </div>
                        <span className="text-blue-400 text-sm">Za 5 min</span>
                      </div>

                      <div className="flex items-center gap-4 p-4 bg-white/5 rounded-xl border border-white/10">
                        <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center">
                          <span className="text-white text-sm">📅</span>
                        </div>
                        <div className="flex-1">
                          <h5 className="text-white font-semibold">Przypomnienie o meeting</h5>
                          <p className="text-gray-400 text-sm">Zaplanowano automatyczne przypomnienie 24h przed spotkaniem</p>
                        </div>
                        <span className="text-purple-400 text-sm">Jutro 10:00</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* AI Stats */}
          <div className="grid md:grid-cols-4 gap-8 mt-20">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">24/7</div>
              <div className="text-gray-300">Dostępność AI</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">94%</div>
              <div className="text-gray-300">Dokładność predykcji</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-blue-400 mb-2">70%</div>
              <div className="text-gray-300">Redukcja czasu odpowiedzi</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-cyan-400 mb-2">∞</div>
              <div className="text-gray-300">Jednoczesnych rozmów</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
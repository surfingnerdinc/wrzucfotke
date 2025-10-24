'use client';

import React from 'react';

export default function Benefits() {
  return (
    <section id="benefits" className="py-24 bg-linear-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-cyan-100 border border-cyan-200 rounded-full px-4 py-2 mb-6">
              <span className="text-cyan-600 mr-2">🚀</span>
              <span className="text-cyan-700 text-sm font-medium">Korzyści</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Dlaczego
              <span className="bg-linear-to-r from-cyan-600 to-purple-600 bg-clip-text text-transparent"> Core One Flow?</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Nasze rozwiązanie nie tylko organizuje Twój biznes, ale go transformuje. 
              Zobacz konkretne korzyści, które osiągniesz już w pierwszym miesiącu użytkowania.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-8 mb-20">
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-purple-600 mb-2">40%</div>
              <div className="text-gray-600">Oszczędność czasu</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-cyan-600 mb-2">85%</div>
              <div className="text-gray-600">Wzrost produktywności</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-purple-600 mb-2">60%</div>
              <div className="text-gray-600">Lepsze relacje z klientami</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-6xl font-bold text-cyan-600 mb-2">95%</div>
              <div className="text-gray-600">Satysfakcja użytkowników</div>
            </div>
          </div>

          {/* Main Benefits */}
          <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-6">
                Zwiększ efektywność swojego zespołu
              </h3>
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">⚡</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Automatyzacja zadań powtarzalnych</h4>
                    <p className="text-gray-600">Pozwól systemowi wykonać rutynowe czynności za Ciebie. Automatyczne wysyłanie emaili, aktualizacje statusów i generowanie raportów.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center">
                    <span className="text-cyan-600">🎯</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Scentralizowane zarządzanie</h4>
                    <p className="text-gray-600">Wszystkie informacje o klientach, projektach i zadaniach w jednym miejscu. Koniec z przełączaniem między aplikacjami.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600">📊</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">Decyzje oparte na danych</h4>
                    <p className="text-gray-600">Zaawansowana analityka i raporty w czasie rzeczywistym pomagają podejmować lepsze decyzje biznesowe.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="bg-linear-to-br from-purple-500 to-cyan-500 rounded-2xl p-8 text-white">
                <div className="mb-6">
                  <h4 className="text-2xl font-bold mb-2">ROI Calculator</h4>
                  <p className="text-purple-100">Zobacz jak szybko się zwróci</p>
                </div>
                <div className="space-y-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm text-purple-100 mb-1">Miesięczne oszczędności</div>
                    <div className="text-2xl font-bold">15,000 PLN</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm text-purple-100 mb-1">Czas zwrotu inwestycji</div>
                    <div className="text-2xl font-bold">2.5 miesiąca</div>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <div className="text-sm text-purple-100 mb-1">Roczny zysk</div>
                    <div className="text-2xl font-bold">180,000 PLN</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Process Flow */}
          <div>
            <h3 className="text-3xl font-bold text-gray-900 mb-12 text-center">
              Jak to działa w praktyce?
            </h3>
            <div className="grid md:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">1️⃣</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Szybka konfiguracja</h4>
                <p className="text-gray-600 text-sm">Import danych, ustawienie workflow i personalizacja interfejsu w 15 minut.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">2️⃣</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Szkolenie zespołu</h4>
                <p className="text-gray-600 text-sm">Intuicyjny interfejs i kompleksowe materiały szkoleniowe. Zespół gotowy w 1 dzień.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-purple-100 to-purple-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">3️⃣</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Automatyzacja</h4>
                <p className="text-gray-600 text-sm">Stopniowe wdrażanie automatyzacji procesów i optymalizacja workflow.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-linear-to-r from-cyan-100 to-cyan-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl">4️⃣</span>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Wzrost i skalowanie</h4>
                <p className="text-gray-600 text-sm">Ciągła optymalizacja i rozbudowa systemu wraz z rozwojem firmy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
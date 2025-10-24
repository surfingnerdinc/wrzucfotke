'use client';

import React from 'react';

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-linear-to-br from-slate-700 via-purple-800 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>
      
      <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          {/* Navigation */}
          <nav className="flex items-center justify-between mb-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-lg font-bold">📊</span>
              </div>
              <span className="text-2xl font-bold text-white">Core One Flow</span>
            </div>
            <div className="hidden md:flex space-x-8 text-gray-300">
              <a href="#features" className="hover:text-white transition-colors">Funkcje</a>
              <a href="#ai-features" className="hover:text-white transition-colors">AI & Automatyzacja</a>
              <a href="#benefits" className="hover:text-white transition-colors">Korzyści</a>
              <a href="#pricing" className="hover:text-white transition-colors">Cennik</a>
              <a href="#contact" className="hover:text-white transition-colors">Kontakt</a>
            </div>
            <button className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-6 py-2 rounded-full hover:shadow-lg transition-all duration-300 transform hover:scale-105">
              Zacznij za darmo
            </button>
          </nav>

          {/* Hero Content */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="inline-flex items-center bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
                <span className="text-purple-400 mr-2">⚡</span>
                <span className="text-purple-300 text-sm font-medium">Nowa generacja CRM</span>
              </div>
              
              <h1 className="text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
                Zarządzaj
                <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> biznesem </span>
                jak nigdy wcześniej
              </h1>
              
              <p className="text-xl text-gray-300 mb-8 max-w-2xl">
                Core One Flow to zaawansowany system CRM, który revolucjonizuje sposób zarządzania relacjami z klientami. 
                Automatyzacja, inteligentna analityka i intuicyjny interfejs w jednym miejscu.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <button className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-8 py-4 rounded-full hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center justify-center group">
                  Rozpocznij 30-dniowy trial
                  <span className="ml-2 text-lg group-hover:translate-x-1 transition-transform inline-block">→</span>
                </button>
                <button className="border border-gray-600 text-white px-8 py-4 rounded-full hover:bg-white/10 transition-all duration-300">
                  Obejrzyj demo
                </button>
              </div>
              
              <div className="flex items-center gap-8 text-sm text-gray-400">
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Bez karty kredytowej
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  Setup w 5 minut
                </div>
                <div className="flex items-center">
                  <span className="text-green-400 mr-2">✓</span>
                  24/7 Support
                </div>
              </div>
            </div>
            
            {/* Dashboard Preview */}
            <div className="relative">
              <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-6 shadow-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <div className="ml-auto text-gray-400 text-sm">core-one-flow.com</div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-linear-to-r from-purple-500/20 to-cyan-500/20 rounded-lg p-4 border border-purple-500/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-semibold">Dashboard</span>
                      <div className="flex gap-2">
                        <div className="w-8 h-2 bg-purple-500 rounded-full"></div>
                        <div className="w-6 h-2 bg-cyan-500 rounded-full"></div>
                        <div className="w-4 h-2 bg-pink-500 rounded-full"></div>
                      </div>
                    </div>
                    <div className="text-gray-300 text-sm">Aktualne projekty: 24 • Klienci: 156</div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <span className="text-purple-400 text-xl mb-2 block">👥</span>
                      <div className="text-white font-semibold">Klienci</div>
                      <div className="text-gray-400 text-sm">+12% ten miesiąc</div>
                    </div>
                    <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                      <span className="text-cyan-400 text-xl mb-2 block">📄</span>
                      <div className="text-white font-semibold">Projekty</div>
                      <div className="text-gray-400 text-sm">8 aktywnych</div>
                    </div>
                  </div>
                  
                  <div className="bg-white/5 rounded-lg p-3 border border-white/10">
                    <div className="flex items-center justify-between">
                      <span className="text-white text-sm">Automatyzacja procesów</span>
                      <span className="text-green-400 text-sm">89% oszczędność czasu</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2 mt-2">
                      <div className="bg-gradient-to-r from-purple-500 to-cyan-500 h-2 rounded-full" style={{width: '89%'}}></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-6 -left-6 bg-linear-to-r from-purple-500 to-pink-500 rounded-lg p-3 shadow-lg animate-bounce">
                <span className="text-white text-2xl">📅</span>
              </div>
              <div className="absolute -bottom-6 -right-6 bg-linear-to-r from-cyan-500 to-blue-500 rounded-lg p-3 shadow-lg animate-pulse">
                <span className="text-white text-2xl">🛡️</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
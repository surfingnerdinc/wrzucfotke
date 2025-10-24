'use client';

import React from 'react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Funkcje', href: '#features' },
      { name: 'Cennik', href: '#pricing' },
      { name: 'Integracje', href: '#' },
      { name: 'API', href: '#' },
      { name: 'Bezpieczeństwo', href: '#' }
    ],
    company: [
      { name: 'O nas', href: '#' },
      { name: 'Kariera', href: '#' },
      { name: 'Blog', href: '#' },
      { name: 'Kontakt', href: '#contact' },
      { name: 'Partnerzy', href: '#' }
    ],
    resources: [
      { name: 'Dokumentacja', href: '#' },
      { name: 'Pomoc', href: '#' },
      { name: 'Webinary', href: '#' },
      { name: 'Case Studies', href: '#' },
      { name: 'Status', href: '#' }
    ],
    legal: [
      { name: 'Polityka prywatności', href: '#' },
      { name: 'Regulamin', href: '#' },
      { name: 'Cookies', href: '#' },
      { name: 'GDPR', href: '#' },
      { name: 'SLA', href: '#' }
    ]
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800">
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-7xl mx-auto">
          {/* Main Footer Content */}
          <div className="grid lg:grid-cols-5 gap-8 mb-12">
            {/* Brand Column */}
            <div className="lg:col-span-2">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">📊</span>
                </div>
                <span className="text-2xl font-bold text-white">Core One Flow</span>
              </div>
              
              <p className="text-gray-300 mb-6 max-w-md">
                Zaawansowany system CRM, który revolucjonizuje sposób zarządzania relacjami z klientami. 
                Automatyzacja, inteligentna analityka i intuicyjny interfejs w jednym miejscu.
              </p>

              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-white">📘</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-cyan-600 transition-colors">
                  <span className="text-white">🐦</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <span className="text-white">💼</span>
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-pink-600 transition-colors">
                  <span className="text-white">📷</span>
                </a>
              </div>
            </div>

            {/* Links Columns */}
            <div>
              <h3 className="text-white font-semibold mb-4">Produkt</h3>
              <ul className="space-y-3">
                {footerLinks.product.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Firma</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4">Zasoby</h3>
              <ul className="space-y-3">
                {footerLinks.resources.map((link, index) => (
                  <li key={index}>
                    <a href={link.href} className="text-gray-400 hover:text-white transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Newsletter */}
          <div className="bg-gray-800/50 rounded-2xl p-8 mb-12">
            <div className="grid md:grid-cols-2 gap-6 items-center">
              <div>
                <h3 className="text-2xl font-bold text-white mb-2">
                  Pozostań w kontakcie
                </h3>
                <p className="text-gray-400">
                  Otrzymuj najnowsze aktualizacje, wskazówki i informacje o nowych funkcjach.
                </p>
              </div>
              <div className="flex gap-3">
                <input
                  type="email"
                  placeholder="Twój adres email"
                  className="flex-1 bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                />
                <button className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105">
                  Zapisz się
                </button>
              </div>
            </div>
          </div>

          {/* Legal Links */}
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            {footerLinks.legal.map((link, index) => (
              <a
                key={index}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-gray-400 text-sm">
                © {currentYear} Core One Flow. Wszystkie prawa zastrzeżone.
              </p>
              
              <div className="flex items-center gap-6 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  <span>Wszystkie systemy działają</span>
                </div>
                <div className="flex items-center gap-2">
                  <span>🇵🇱</span>
                  <span>Made in Poland</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
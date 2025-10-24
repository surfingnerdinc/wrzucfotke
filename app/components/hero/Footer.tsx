'use client';

import { HeartIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    product: [
      { name: 'Jak to działa', href: '#how-it-works' },
      { name: 'Cennik', href: '#pricing' },
      { name: 'Demo', href: '#demo' },
      { name: 'FAQ', href: '#faq' }
    ],
    company: [
      { name: 'O nas', href: '/about' },
      { name: 'Blog', href: '/blog' },
      { name: 'Kontakt', href: '/contact' },
      { name: 'Kariera', href: '/careers' }
    ],
    legal: [
      { name: 'Regulamin', href: '/terms' },
      { name: 'Prywatność', href: '/privacy' },
      { name: 'Cookies', href: '/cookies' },
      { name: 'RODO', href: '/gdpr' }
    ]
  };

  return (
    <footer className="bg-gray-900 text-gray-300">
      
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-10 h-10 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-2xl font-bold text-white">WrzućFotkę.pl</span>
            </div>
            
            <p className="text-lg text-gray-400 mb-6 max-w-md">
              Najłatwiejszy sposób na zbieranie zdjęć z imprez. Stwórz galerię w minutę, 
              udostępnij gościom i pobierz wszystkie wspomnienia jednym klikiem.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="inline-flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300">
                <EnvelopeIcon className="w-5 h-5 mr-2" />
                Napisz do nas
              </button>
              
              <div className="flex items-center text-gray-400">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2 animate-pulse"></span>
                Działamy 24/7
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Produkt</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-6">Firma</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href}
                    className="text-gray-400 hover:text-white transition-colors duration-200"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Links */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Legal Links */}
            <div className="flex flex-wrap gap-6">
              {footerLinks.legal.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  className="text-gray-400 hover:text-white text-sm transition-colors duration-200"
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* Made with Love */}
            <div className="flex items-center text-gray-400 text-sm">
              <span>Stworzone z</span>
              <HeartIcon className="w-4 h-4 mx-1 text-red-500" />
              <span>w Polsce</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="bg-gray-950 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0">
            
            {/* Copyright */}
            <div className="text-gray-400 text-sm">
              © {currentYear} WrzućFotkę.pl. Wszelkie prawa zastrzeżone.
            </div>

            {/* Stats */}
            <div className="flex items-center space-x-8 text-sm text-gray-400">
              <div className="flex items-center space-x-2">
                <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                <span>Status: Wszystko działa</span>
              </div>
              <div>Czas odpowiedzi: &lt;100ms</div>
              <div>Uptime: 99.9%</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
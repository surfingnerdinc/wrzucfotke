'use client';

import { useState } from 'react';
import { Bars3Icon, XMarkIcon, HeartIcon } from '@heroicons/react/24/outline';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Jak to działa', href: '#how-it-works' },
    { name: 'Funkcje', href: '#features' },
    { name: 'Cennik', href: '#pricing' },
    { name: 'Kontakt', href: '#contact' }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo */}
          <div className="flex items-center">
            <a href="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">WrzućFotkę.pl</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center space-x-4">
            <a
              href="/login"
              className="text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
            >
              Logowanie
            </a>
            <a
              href="/create"
              className="inline-flex items-center px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all duration-200"
            >
              Stwórz galerię
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block text-gray-600 hover:text-gray-900 font-medium"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <div className="pt-4 border-t border-gray-200 space-y-2">
              <a
                href="/login"
                className="block w-full text-center px-4 py-2 text-gray-600 hover:text-gray-900 font-medium border border-gray-300 rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Logowanie
              </a>
              <a
                href="/create"
                className="block w-full text-center px-4 py-2 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-lg"
                onClick={() => setIsOpen(false)}
              >
                Stwórz galerię
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
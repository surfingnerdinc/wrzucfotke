'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate email sending
    setTimeout(() => {
      setIsLoading(false);
      setIsEmailSent(true);
    }, 2000);
  };

  if (isEmailSent) {
    return (
      <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden flex items-center justify-center px-6">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
        
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl text-center">
            <div className="w-20 h-20 mx-auto mb-6 bg-green-500/20 rounded-full flex items-center justify-center">
              <span className="text-4xl">📧</span>
            </div>
            
            <h2 className="text-3xl font-bold text-white mb-4">Email wysłany!</h2>
            <p className="text-gray-300 mb-6">
              Sprawdź swoją skrzynkę pocztową. Wysłaliśmy instrukcje resetowania hasła na adres{' '}
              <span className="text-purple-400 font-semibold">{email}</span>
            </p>
            
            <div className="bg-blue-500/10 border border-blue-500/20 rounded-lg p-4 mb-6">
              <p className="text-blue-200 text-sm">
                💡 Nie widzisz emaila? Sprawdź folder spam lub poczekaj kilka minut.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={() => {
                  setIsEmailSent(false);
                  setEmail('');
                }}
                className="w-full bg-linear-to-r from-purple-500 to-cyan-500 text-white py-3 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300"
              >
                Wyślij ponownie
              </button>
              
              <Link
                href="/login"
                className="block w-full border-2 border-white/20 text-white py-3 px-6 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300 text-center"
              >
                Powrót do logowania
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          {/* Logo */}
          <div className="text-center mb-8">
            <Link href="/" className="inline-flex items-center space-x-3">
              <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">📊</span>
              </div>
              <span className="text-3xl font-bold text-white">Core One Flow</span>
            </Link>
          </div>

          {/* Reset Form Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
            <div className="text-center mb-8">
              <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                <span className="text-3xl">🔑</span>
              </div>
              <h2 className="text-3xl font-bold text-white mb-2">Zapomniałeś hasła?</h2>
              <p className="text-gray-300">
                Nie martw się! Wyślemy Ci link do resetowania hasła na email.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                  Adres email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                  placeholder="jan@twoja-firma.pl"
                />
                <p className="text-gray-400 text-xs mt-1">
                  Wprowadź email, którego używasz do logowania w Core One Flow
                </p>
              </div>

              <button
                type="submit"
                disabled={isLoading || !email.trim()}
                className="w-full bg-linear-to-r from-purple-500 to-cyan-500 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
              >
                {isLoading ? (
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Wysyłanie...
                  </div>
                ) : (
                  'Wyślij link resetowania'
                )}
              </button>
            </form>

            {/* Help Section */}
            <div className="mt-8 p-4 bg-amber-500/10 border border-amber-500/20 rounded-lg">
              <div className="flex items-start gap-3">
                <span className="text-amber-400 text-xl">💡</span>
                <div>
                  <h4 className="text-amber-300 font-semibold text-sm mb-2">Wskazówki</h4>
                  <ul className="text-amber-200 text-xs space-y-1">
                    <li>• Sprawdź folder spam w swojej skrzynce pocztowej</li>
                    <li>• Upewnij się, że podajesz prawidłowy adres email</li>
                    <li>• Link resetowania jest ważny przez 1 godzinę</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Back to login */}
            <div className="text-center mt-8">
              <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors flex items-center justify-center gap-2">
                <span>←</span>
                Powrót do logowania
              </Link>
            </div>
          </div>

          {/* Alternative Support */}
          <div className="text-center mt-8">
            <p className="text-gray-400 text-sm mb-4">
              Nadal masz problemy z dostępem do konta?
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/support" 
                className="text-purple-400 hover:text-purple-300 transition-colors text-sm"
              >
                Skontaktuj się z supportem
              </Link>
              <span className="text-gray-600">•</span>
              <Link 
                href="/register" 
                className="text-cyan-400 hover:text-cyan-300 transition-colors text-sm"
              >
                Utwórz nowe konto
              </Link>
            </div>
          </div>

          {/* Security Notice */}
          <div className="mt-8 p-4 bg-white/5 border border-white/10 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-green-400">🔒</span>
              <span className="text-green-300 font-semibold text-sm">Bezpieczeństwo</span>
            </div>
            <p className="text-gray-300 text-xs">
              Ze względów bezpieczeństwa nie ujawniamy, czy dany adres email jest zarejestrowany w naszym systemie. 
              Jeśli email istnieje, otrzymasz instrukcje resetowania hasła.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
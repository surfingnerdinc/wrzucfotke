'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [loginMethod, setLoginMethod] = useState<'email' | 'sso'>('email');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate login process
    setTimeout(() => {
      setIsLoading(false);
      // Here would be actual login logic
      console.log('Login attempt:', formData);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSSOLogin = (provider: string) => {
    console.log(`SSO login with ${provider}`);
    // Here would be SSO logic
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>
      <div className="absolute -bottom-32 left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-4000"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
          <div className="max-w-md">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3 mb-12">
              <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">📊</span>
              </div>
              <span className="text-3xl font-bold text-white">Core One Flow</span>
            </Link>

            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Witaj z powrotem w
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> przyszłości </span>
              CRM
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Zaloguj się do Core One Flow i kontynuuj zarządzanie swoim biznesem 
              z pomocą sztucznej inteligencji.
            </p>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-cyan-400 mb-1">2,500+</div>
                <div className="text-gray-300 text-sm">Aktywnych firm</div>
              </div>
              <div className="bg-white/5 backdrop-blur-lg rounded-xl p-4 border border-white/10">
                <div className="text-2xl font-bold text-purple-400 mb-1">99.9%</div>
                <div className="text-gray-300 text-sm">Uptime SLA</div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
          <div className="w-full max-w-md">
            {/* Mobile Logo */}
            <div className="lg:hidden text-center mb-8">
              <Link href="/" className="inline-flex items-center space-x-3">
                <div className="w-10 h-10 bg-linear-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg font-bold">📊</span>
                </div>
                <span className="text-2xl font-bold text-white">Core One Flow</span>
              </Link>
            </div>

            {/* Login Form Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">Zaloguj się</h2>
                <p className="text-gray-300">Wprowadź swoje dane aby kontynuować</p>
              </div>

              {/* Login Method Toggle */}
              <div className="flex mb-8">
                <button
                  onClick={() => setLoginMethod('email')}
                  className={`flex-1 py-3 px-4 rounded-l-xl font-medium transition-all ${
                    loginMethod === 'email'
                      ? 'bg-white text-purple-600'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  Email
                </button>
                <button
                  onClick={() => setLoginMethod('sso')}
                  className={`flex-1 py-3 px-4 rounded-r-xl font-medium transition-all ${
                    loginMethod === 'sso'
                      ? 'bg-white text-purple-600'
                      : 'bg-white/10 text-gray-300 hover:bg-white/20'
                  }`}
                >
                  SSO
                </button>
              </div>

              {loginMethod === 'email' ? (
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
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                      placeholder="jan@twoja-firma.pl"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                      Hasło
                    </label>
                    <input
                      type="password"
                      id="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input
                        type="checkbox"
                        id="rememberMe"
                        name="rememberMe"
                        checked={formData.rememberMe}
                        onChange={handleChange}
                        className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-400"
                      />
                      <label htmlFor="rememberMe" className="ml-2 text-gray-300 text-sm">
                        Zapamiętaj mnie
                      </label>
                    </div>
                    <Link href="/forgot-password" className="text-purple-400 hover:text-purple-300 text-sm transition-colors">
                      Zapomniałeś hasła?
                    </Link>
                  </div>

                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-linear-to-r from-purple-500 to-cyan-500 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                  >
                    {isLoading ? (
                      <div className="flex items-center justify-center gap-2">
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Logowanie...
                      </div>
                    ) : (
                      'Zaloguj się'
                    )}
                  </button>
                </form>
              ) : (
                <div className="space-y-4">
                  <button
                    onClick={() => handleSSOLogin('google')}
                    className="w-full bg-white text-gray-700 py-4 px-6 rounded-lg font-semibold hover:bg-gray-50 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <span className="text-xl">🔍</span>
                    Kontynuuj z Google
                  </button>
                  
                  <button
                    onClick={() => handleSSOLogin('microsoft')}
                    className="w-full bg-blue-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <span className="text-xl">🏢</span>
                    Kontynuuj z Microsoft
                  </button>
                  
                  <button
                    onClick={() => handleSSOLogin('azure')}
                    className="w-full bg-indigo-600 text-white py-4 px-6 rounded-lg font-semibold hover:bg-indigo-700 transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-3"
                  >
                    <span className="text-xl">☁️</span>
                    Kontynuuj z Azure AD
                  </button>

                  <div className="text-center">
                    <p className="text-gray-400 text-sm">
                      Nie masz dostępu SSO?{' '}
                      <button
                        onClick={() => setLoginMethod('email')}
                        className="text-purple-400 hover:text-purple-300 transition-colors"
                      >
                        Użyj email i hasła
                      </button>
                    </p>
                  </div>
                </div>
              )}

              {/* Divider */}
              <div className="flex items-center my-8">
                <div className="flex-1 border-t border-white/20"></div>
                <span className="px-4 text-gray-400 text-sm">lub</span>
                <div className="flex-1 border-t border-white/20"></div>
              </div>

              {/* Demo Access */}
              <button className="w-full border-2 border-cyan-400 text-cyan-400 py-4 px-6 rounded-lg font-semibold hover:bg-cyan-400 hover:text-white transition-all duration-300 transform hover:scale-[1.02] flex items-center justify-center gap-2">
                <span className="text-xl">🚀</span>
                Wypróbuj demo bez logowania
              </button>

              {/* Sign up link */}
              <div className="text-center mt-8">
                <p className="text-gray-400">
                  Nie masz jeszcze konta?{' '}
                  <Link href="/register" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                    Zarejestruj się za darmo
                  </Link>
                </p>
              </div>

              {/* Security Info */}
              <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-green-400">🔒</span>
                  <span className="text-green-300 font-semibold text-sm">Bezpieczeństwo</span>
                </div>
                <p className="text-green-200 text-xs">
                  Twoje dane są chronione szyfrowaniem klasy bankowej i zgodne z GDPR. 
                  Certyfikat SSL/TLS zapewnia bezpieczne połączenie.
                </p>
              </div>
            </div>

            {/* Support */}
            <div className="text-center mt-8">
              <p className="text-gray-400 text-sm">
                Potrzebujesz pomocy?{' '}
                <Link href="/support" className="text-purple-400 hover:text-purple-300 transition-colors">
                  Skontaktuj się z supportem
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Floating AI Assistant Notice */}
      <div className="fixed bottom-6 left-6 z-50 bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-4 max-w-sm hidden lg:block">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-lg">🤖</span>
          </div>
          <div>
            <h4 className="text-white font-semibold text-sm mb-1">AI Assistant dostępny</h4>
            <p className="text-gray-300 text-xs">
              Po zalogowaniu będziesz mógł korzystać z naszego AI asystenta 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
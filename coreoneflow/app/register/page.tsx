'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    company: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false,
    acceptMarketing: false
  });
  const [isLoading, setIsLoading] = useState(false);
  const [step, setStep] = useState<1 | 2>(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (step === 1) {
      setStep(2);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      alert('Hasła nie są identyczne');
      return;
    }

    setIsLoading(true);
    
    // Simulate registration process
    setTimeout(() => {
      setIsLoading(false);
      console.log('Registration attempt:', formData);
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSSORegister = (provider: string) => {
    console.log(`SSO registration with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
      
      {/* Gradient Orbs */}
      <div className="absolute top-0 -left-4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute top-0 -right-4 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse animation-delay-2000"></div>

      <div className="relative z-10 flex min-h-screen">
        {/* Left Side - Benefits */}
        <div className="hidden lg:flex lg:w-1/2 flex-col justify-center px-12">
          <div className="max-w-md">
            <Link href="/" className="flex items-center space-x-3 mb-12">
              <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xl font-bold">📊</span>
              </div>
              <span className="text-3xl font-bold text-white">Core One Flow</span>
            </Link>

            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Rozpocznij
              <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> rewolucję </span>
              w swoim CRM
            </h1>
            
            <p className="text-xl text-gray-300 mb-8">
              Dołącz do tysięcy firm, które już wykorzystują AI do automatyzacji 
              procesów sprzedażowych i zwiększania konwersji.
            </p>

            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400">✓</span>
                </div>
                <span className="text-gray-300">30 dni darmowego trialu</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400">✓</span>
                </div>
                <span className="text-gray-300">Bez karty kredytowej</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400">✓</span>
                </div>
                <span className="text-gray-300">Setup w 5 minut</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                  <span className="text-green-400">✓</span>
                </div>
                <span className="text-gray-300">AI asystent 24/7</span>
              </div>
            </div>

            {/* Testimonial */}
            <div className="bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10">
              <p className="text-gray-300 italic mb-4">
                "Core One Flow zwiększył naszą konwersję o 245% w pierwszych 3 miesiącach. 
                AI robi rzeczy, o których nie śmieliśmy marzyć."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-purple-500 rounded-full flex items-center justify-center">
                  <span className="text-white">👩‍💼</span>
                </div>
                <div>
                  <div className="text-white font-semibold">Anna Kowalska</div>
                  <div className="text-gray-400 text-sm">CEO, TechStart Solutions</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Registration Form */}
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

            {/* Registration Form Card */}
            <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 shadow-2xl">
              {/* Progress Steps */}
              <div className="flex items-center justify-center mb-8">
                <div className="flex items-center gap-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= 1 ? 'bg-purple-500 text-white' : 'bg-white/20 text-gray-400'
                  }`}>
                    1
                  </div>
                  <div className={`w-12 h-0.5 ${step >= 2 ? 'bg-purple-500' : 'bg-white/20'}`}></div>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                    step >= 2 ? 'bg-purple-500 text-white' : 'bg-white/20 text-gray-400'
                  }`}>
                    2
                  </div>
                </div>
              </div>

              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-white mb-2">
                  {step === 1 ? 'Utwórz konto' : 'Zabezpiecz konto'}
                </h2>
                <p className="text-gray-300">
                  {step === 1 
                    ? 'Wprowadź podstawowe informacje' 
                    : 'Ustaw hasło i preferencje'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {step === 1 ? (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="firstName" className="block text-gray-300 text-sm font-medium mb-2">
                          Imię *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          required
                          value={formData.firstName}
                          onChange={handleChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                          placeholder="Jan"
                        />
                      </div>
                      <div>
                        <label htmlFor="lastName" className="block text-gray-300 text-sm font-medium mb-2">
                          Nazwisko *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          required
                          value={formData.lastName}
                          onChange={handleChange}
                          className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                          placeholder="Kowalski"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                        Email firmowy *
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
                      <label htmlFor="company" className="block text-gray-300 text-sm font-medium mb-2">
                        Nazwa firmy *
                      </label>
                      <input
                        type="text"
                        id="company"
                        name="company"
                        required
                        value={formData.company}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                        placeholder="Moja Firma Sp. z o.o."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full bg-linear-to-r from-purple-500 to-cyan-500 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]"
                    >
                      Kontynuuj
                    </button>
                  </>
                ) : (
                  <>
                    <div>
                      <label htmlFor="password" className="block text-gray-300 text-sm font-medium mb-2">
                        Hasło *
                      </label>
                      <input
                        type="password"
                        id="password"
                        name="password"
                        required
                        value={formData.password}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                        placeholder="Minimum 8 znaków"
                      />
                      <p className="text-gray-400 text-xs mt-1">Minimum 8 znaków, cyfra i duża litera</p>
                    </div>

                    <div>
                      <label htmlFor="confirmPassword" className="block text-gray-300 text-sm font-medium mb-2">
                        Potwierdź hasło *
                      </label>
                      <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        required
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                        placeholder="Powtórz hasło"
                      />
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="acceptTerms"
                          name="acceptTerms"
                          required
                          checked={formData.acceptTerms}
                          onChange={handleChange}
                          className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-400 mt-0.5"
                        />
                        <label htmlFor="acceptTerms" className="text-gray-300 text-sm">
                          Akceptuję{' '}
                          <Link href="/terms" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Regulamin
                          </Link>{' '}
                          i{' '}
                          <Link href="/privacy" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Politykę Prywatności
                          </Link>
                        </label>
                      </div>

                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          id="acceptMarketing"
                          name="acceptMarketing"
                          checked={formData.acceptMarketing}
                          onChange={handleChange}
                          className="w-4 h-4 text-purple-600 bg-white/10 border-white/20 rounded focus:ring-purple-400 mt-0.5"
                        />
                        <label htmlFor="acceptMarketing" className="text-gray-300 text-sm">
                          Chcę otrzymywać newsletter z tipami o CRM i automatyzacji (opcjonalne)
                        </label>
                      </div>
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep(1)}
                        className="flex-1 border-2 border-white/20 text-white py-4 px-6 rounded-lg font-semibold hover:bg-white/10 transition-all duration-300"
                      >
                        Wstecz
                      </button>
                      <button
                        type="submit"
                        disabled={isLoading || !formData.acceptTerms}
                        className="flex-1 bg-linear-to-r from-purple-500 to-cyan-500 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                      >
                        {isLoading ? (
                          <div className="flex items-center justify-center gap-2">
                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                            Tworzenie...
                          </div>
                        ) : (
                          'Utwórz konto'
                        )}
                      </button>
                    </div>
                  </>
                )}
              </form>

              {step === 1 && (
                <>
                  {/* Divider */}
                  <div className="flex items-center my-8">
                    <div className="flex-1 border-t border-white/20"></div>
                    <span className="px-4 text-gray-400 text-sm">lub</span>
                    <div className="flex-1 border-t border-white/20"></div>
                  </div>

                  {/* SSO Registration */}
                  <div className="space-y-3">
                    <button
                      onClick={() => handleSSORegister('google')}
                      className="w-full bg-white text-gray-700 py-3 px-4 rounded-lg font-medium hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <span className="text-lg">🔍</span>
                      Zarejestruj się przez Google
                    </button>
                    
                    <button
                      onClick={() => handleSSORegister('microsoft')}
                      className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-medium hover:bg-blue-700 transition-all duration-300 flex items-center justify-center gap-3"
                    >
                      <span className="text-lg">🏢</span>
                      Zarejestruj się przez Microsoft
                    </button>
                  </div>
                </>
              )}

              {/* Login link */}
              <div className="text-center mt-8">
                <p className="text-gray-400">
                  Masz już konto?{' '}
                  <Link href="/login" className="text-purple-400 hover:text-purple-300 font-semibold transition-colors">
                    Zaloguj się
                  </Link>
                </p>
              </div>
            </div>

            {/* Trust indicators */}
            <div className="grid grid-cols-3 gap-4 mt-8 text-center">
              <div className="text-gray-400">
                <div className="text-2xl mb-1">🔒</div>
                <div className="text-xs">SSL/TLS</div>
              </div>
              <div className="text-gray-400">
                <div className="text-2xl mb-1">🇪🇺</div>
                <div className="text-xs">GDPR</div>
              </div>
              <div className="text-gray-400">
                <div className="text-2xl mb-1">🛡️</div>
                <div className="text-xs">SOC 2</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
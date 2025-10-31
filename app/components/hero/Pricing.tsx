'use client';

import { useState } from 'react';
import { CheckIcon, XMarkIcon, StarIcon, HeartIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import PurchaseModal from '../purchase/PurchaseModal';
import { useProduct } from '../../contexts/ProductContext';

export default function Pricing() {
  const [isAnnual, setIsAnnual] = useState(false);
  const [isPurchaseModalOpen, setIsPurchaseModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  const { activeProduct } = useProduct();

  const galleryPlans = [
    {
      name: "Starter",
      subtitle: "Dla małych imprez",
      price: { monthly: 0, annual: 0 },
      originalPrice: null,
      description: "Idealne na urodziny czy małe spotkania",
      features: [
        "7 dni przechowywania",
        "Do 50 zdjęć",
        "Podstawowe udostępnianie",
        "Pobieranie ZIP",
        "Podstawowe filtry (3)",
        "Wsparcie email"
      ],
      limitations: [
        "Brak kreatora PDF",
        "Ograniczone filtry",
        "Brak usuwania tła"
      ],
      color: "gray",
      gradient: "from-gray-500 to-gray-600",
      bgGradient: "from-gray-50 to-white",
      popular: false,
      cta: "Rozpocznij za darmo"
    },
    {
      name: "Wedding",
      subtitle: "Najlepszy na wesela! 💒",
      price: { monthly: 250, annual: 600 },
      originalPrice: { monthly: 99, annual: 79 },
      description: "Wszystko czego potrzebujesz na wesele",
      features: [
        "Do 14 dni przechowywania",
        "Nieograniczona ilość zdjęć",
        "Zaawansowane udostępnianie",
        "Kod QR do galerii",
        "Kreator plakatów PDF (7 formatów)",
        "11 profesjonalnych filtrów",
        "Usuwanie tła ze zdjęć", 
        "Własny link (np. ania-tomek)",
        "Wsparcie priorytetowe",
        "Statystyki gości",
        "Automatyczne kopie zapasowe"
      ],
      limitations: [],
      color: "purple",
      gradient: "from-purple-500 to-pink-500",
      bgGradient: "from-purple-50 to-pink-50",
      popular: true,
      cta: "Wybierz Wedding"
    },
    {
      name: "Pro",
      subtitle: "Dla wymagających klinetów",
      price: { monthly: 450, annual: 0 },
      originalPrice: null,
      description: "Profesjonalne rozwiązanie dla eventów",
      features: [
        "90 dni przechowywania",
        "Nieograniczona ilość zdjęć",
        "Wszystkie funkcje Wedding",
        "Zaawansowany kreator PDF",
        "Niestandardowe formaty druku",
        "Batch edycja zdjęć",
        "AI usprawnienia",
        "Białe etykiety (Twój branding)",
        "API dostęp",
        "Masowe zarządzanie eventami",
        "Zaawansowane statystyki",
        "Wsparcie 24/7",
        "Dedykowany account manager"
      ],
      limitations: [],
      color: "indigo", 
      gradient: "from-indigo-500 to-blue-500",
      bgGradient: "from-indigo-50 to-blue-50",
      popular: false,
      cta: "Skontaktuj się z nami"
    }
  ];

  const transferPlans = [
    {
      name: "Transfer Basic",
      subtitle: "Dla freelancerów",
      price: { monthly: 50, annual: 500 },
      originalPrice: null,
      description: "Idealne na początek pracy z klientami",
      features: [
        "50GB storage",
        "200GB transfer miesięcznie", 
        "Pliki do 2GB",
        "Ochrona hasłem",
        "7 dni przechowywania linków",
        "Podstawowe analytics",
        "Email support"
      ],
      limitations: [
        "Brak team features",
        "Ograniczone analytics",
        "Podstawowe branding"
      ],
      color: "blue",
      gradient: "from-blue-500 to-blue-600", 
      bgGradient: "from-blue-50 to-white",
      popular: false,
      cta: "Rozpocznij Basic"
    },
    {
      name: "Transfer Pro", 
      subtitle: "Najpopularniejszy! 🚀",
      price: { monthly: 120, annual: 1200 },
      originalPrice: null,
      description: "Dla profesjonalistów i małych agencji",
      features: [
        "200GB storage",
        "1TB transfer miesięcznie",
        "Pliki do 5GB", 
        "Zaawansowane zabezpieczenia",
        "30 dni przechowywania linków",
        "Szczegółowe analytics",
        "Custom branding",
        "Priority support",
        "Bulk uploads",
        "API dostęp"
      ],
      limitations: [
        "Ograniczona współpraca team"
      ],
      color: "purple",
      gradient: "from-purple-500 to-indigo-500",
      bgGradient: "from-purple-50 to-indigo-50", 
      popular: true,
      cta: "Wybierz Pro"
    },
    {
      name: "Transfer Business",
      subtitle: "Dla zespołów",
      price: { monthly: 250, annual: 2500 },
      originalPrice: null,
      description: "Rozwiązanie dla firm i dużych zespołów",
      features: [
        "1TB storage",
        "Unlimited transfer",
        "Pliki do 10GB",
        "Enterprise security", 
        "Unlimited czas przechowywania",
        "Advanced analytics & reports",
        "White-label branding",
        "Team collaboration",
        "Admin panel", 
        "SLA 99.9%",
        "Dedykowany success manager",
        "Custom integrations"
      ],
      limitations: [],
      color: "emerald",
      gradient: "from-emerald-500 to-green-500",
      bgGradient: "from-emerald-50 to-green-50",
      popular: false,
      cta: "Skontaktuj się"
    }
  ];

  const plans = activeProduct === 'gallery' ? galleryPlans : transferPlans;

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            {activeProduct === 'gallery' ? (
              <>
                Wybierz swój <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">plan</span>
              </>
            ) : (
              <>
                <ArrowUpTrayIcon className="w-12 h-12 mx-auto mb-4 text-indigo-600" />
                Plany <span className="bg-linear-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">Transfer</span>
              </>
            )}
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            {activeProduct === 'gallery' 
              ? 'Mamy plan idealny dla każdej okazji. Od małych urodzin po wielkie wesela. Wszystko za przystępną cenę, z gwarancją satysfakcji!'
              : 'Profesjonalne rozwiązania do przesyłania dużych plików. Bezpieczne, szybkie i niezawodne dla Twojego biznesu.'
            }
          </p>

          {/* Pricing Toggle */}
          <div className="inline-flex items-center bg-gray-100 rounded-full p-1">
            <button
              onClick={() => setIsAnnual(false)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                !isAnnual 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Galeria
            </button>
            <button
              onClick={() => setIsAnnual(true)}
              className={`px-6 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                isAnnual 
                  ? 'bg-white text-gray-900 shadow-sm' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Ze stronką
              <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                -20%
              </span>
            </button>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-linear-to-br ${plan.bgGradient} rounded-3xl p-8 border-2 transition-all duration-300 transform hover:-translate-y-2 hover:shadow-2xl ${
                plan.popular 
                  ? 'border-purple-200 shadow-xl scale-105' 
                  : 'border-gray-100 shadow-lg hover:border-gray-200'
              }`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-linear-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-full text-sm font-semibold flex items-center shadow-lg">
                    <HeartIconSolid className="w-4 h-4 mr-1" />
                    Najpopularniejszy
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                <p className="text-gray-600 font-medium mb-4">{plan.subtitle}</p>
                
                {/* Price */}
                <div className="mb-4">
                  <div className="flex items-baseline justify-center">
                    {plan.originalPrice && (
                      <span className="text-2xl text-gray-400 line-through mr-2">
                        {isAnnual ? plan.originalPrice.annual : plan.originalPrice.monthly} zł
                      </span>
                    )}
                    <span className="text-5xl font-bold text-gray-900">
                      {isAnnual ? plan.price.annual : plan.price.monthly}
                    </span>
                    <span className="text-gray-600 ml-2">
                      {plan.price.monthly === 0 ? 'zł' : (isAnnual ? 'zł' : 'zł')}
                    </span>
                  </div>
                  {plan.originalPrice && (
                    <div className="text-green-600 font-semibold text-sm mt-2">
                      Oszczędzasz {isAnnual 
                        ? (plan.originalPrice.annual - plan.price.annual)
                        : (plan.originalPrice.monthly - plan.price.monthly)
                      } zł kupując z własną stroną!
                    </div>
                  )}
                </div>

                <p className="text-gray-600 text-sm">{plan.description}</p>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-start">
                    <CheckIcon className="w-5 h-5 text-green-500 mt-0.5 mr-3 shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
                
                {plan.limitations.map((limitation, limitIndex) => (
                  <div key={limitIndex} className="flex items-start opacity-60">
                    <XMarkIcon className="w-5 h-5 text-gray-400 mt-0.5 mr-3 shrink-0" />
                    <span className="text-gray-500 text-sm">{limitation}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                onClick={() => {
                  if (plan.name === 'Starter') {
                    // For free plan, redirect to dashboard
                    window.location.href = '/dashboard';
                  } else if (plan.name === 'Pro') {
                    // For Pro plan, redirect to contact
                    window.location.href = '/contact';
                  } else {
                    // For Wedding plan, open purchase modal
                    setSelectedPlan(plan);
                    setIsPurchaseModalOpen(true);
                  }
                }}
                className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg ${
                  plan.popular
                    ? `bg-linear-to-r ${plan.gradient} text-white shadow-lg hover:shadow-xl`
                    : plan.name === 'Starter'
                    ? 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    : `bg-linear-to-r ${plan.gradient} text-white hover:shadow-xl`
                }`}
              >
                {plan.cta}
              </button>

              {/* Money Back Guarantee */}
              {plan.popular && (
                <div className="text-center mt-4">
                  <div className="inline-flex items-center text-sm text-gray-600">
                    <HeartIcon className="w-4 h-4 mr-1 text-pink-500" />
                    30 dni gwarancji zwrotu pieniędzy
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="text-center mt-16">
          <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Masz pytania? Pomożemy! 🤝
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Nie jesteś pewien który plan wybrać? Napisz do nas! Pomożemy dobrać idealny plan 
              dla Twojego eventu. Odpowiadamy w ciągu 24h.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Napisz email
              </button>
              <button className="inline-flex items-center px-6 py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all duration-300">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
                Czat na żywo
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Purchase Modal */}
      <PurchaseModal
        isOpen={isPurchaseModalOpen}
        onClose={() => setIsPurchaseModalOpen(false)}
        selectedPlan={selectedPlan}
        isAnnual={isAnnual}
      />
    </section>
  );
}
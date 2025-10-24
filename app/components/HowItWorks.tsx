'use client';

import { useState } from 'react';
import { 
  PlusIcon, 
  PhotoIcon, 
  ShareIcon, 
  CloudArrowDownIcon, 
  QrCodeIcon,
  UserGroupIcon,
  ClockIcon
} from '@heroicons/react/24/outline';

export default function HowItWorks() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: "Stwórz Galerię",
      subtitle: "W 60 sekund",
      description: "Wybierz nazwę dla swojej galerii, ustaw datę eventu i gotowe! Otrzymasz unikalny link do udostępnienia gościom.",
      icon: PlusIcon,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50",
      image: "https://picsum.photos/400/300?random=10",
      details: [
        "Podaj nazwę eventu (np. 'Wesele Ania & Tomek')",
        "Wybierz datę i czas trwania galerii", 
        "Otrzymaj unikalny link i kod QR",
        "Dostosuj ustawienia prywatności"
      ]
    },
    {
      id: 2, 
      title: "Udostępnij Gościom",
      subtitle: "Jeden link, wszyscy goście",
      description: "Wyślij link lub kod QR gościom. Mogą wrzucać zdjęcia bez rejestracji, prosto z telefonu czy aparatu.",
      icon: ShareIcon,
      color: "from-purple-500 to-pink-500", 
      bgColor: "bg-purple-50",
      image: "https://picsum.photos/400/300?random=11",
      details: [
        "Udostępnij link przez WhatsApp, SMS lub email",
        "Pokaż kod QR na weselu lub imprezie",
        "Goście nie muszą się rejestrować",
        "Działa na każdym telefonie i komputerze"
      ]
    },
    {
      id: 3,
      title: "Goście Wrzucają Fotki",
      subtitle: "Bez aplikacji, bez rejestracji", 
      description: "Goście klikają w link, wybierają zdjęcia i wrzucają. Wszystko przebiega automatycznie, bez żadnych komplikacji.",
      icon: PhotoIcon,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50", 
      image: "https://picsum.photos/400/300?random=12",
      details: [
        "Przeciągnij i upuść lub kliknij aby wybrać",
        "Upload wielu zdjęć jednocześnie",
        "Automatyczne zmniejszanie rozmiaru",
        "Podgląd przed wysłaniem"
      ]
    },
    {
      id: 4,
      title: "Pobierz Wszystko",
      subtitle: "Jednym kliknięciem",
      description: "Kiedy impreza się kończy, pobierasz wszystkie zdjęcia jako archiwum ZIP. Wszystko w najwyższej jakości!",
      icon: CloudArrowDownIcon,
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50",
      image: "https://picsum.photos/400/300?random=13", 
      details: [
        "Pobierz wszystkie zdjęcia jednym klikiem",
        "Archiwum ZIP z oryginalnymi plikami",
        "Zachowana pełna jakość zdjęć",
        "Statystyki - kto ile dodał zdjęć"
      ]
    }
  ];

  return (
    <section className="py-24 bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Jak to <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">działa</span>?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Zbieranie zdjęć nigdy nie było prostsze. Wystarczą 4 proste kroki i możesz cieszyć się 
            wszystkimi wspomnieniami z Twojej imprezy w jednym miejscu.
          </p>
        </div>

        {/* Steps Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {steps.map((step, index) => (
            <button
              key={step.id}
              onClick={() => setActiveStep(index)}
              className={`flex items-center px-6 py-3 rounded-full transition-all duration-300 ${
                activeStep === index
                  ? `bg-linear-to-r ${step.color} text-white shadow-lg transform scale-105`
                  : 'bg-white text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
              }`}
            >
              <span className="w-8 h-8 rounded-full bg-white bg-opacity-20 flex items-center justify-center mr-3 font-bold text-sm">
                {step.id}
              </span>
              <span className="font-medium">{step.title}</span>
            </button>
          ))}
        </div>

        {/* Active Step Content */}
        <div className="max-w-6xl mx-auto">
          <div className={`bg-linear-to-br ${steps[activeStep].bgColor} to-white rounded-3xl p-8 lg:p-12 shadow-xl`}>
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              
              {/* Left Content */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className={`w-16 h-16 rounded-2xl bg-linear-to-r ${steps[activeStep].color} flex items-center justify-center shadow-lg`}>
                    {(() => {
                      const IconComponent = steps[activeStep].icon;
                      return <IconComponent className="w-8 h-8 text-white" />;
                    })()}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
                      Krok {steps[activeStep].id}
                    </div>
                    <h3 className="text-3xl font-bold text-gray-900">
                      {steps[activeStep].title}
                    </h3>
                    <p className={`text-lg font-medium bg-linear-to-r ${steps[activeStep].color} bg-clip-text text-transparent`}>
                      {steps[activeStep].subtitle}
                    </p>
                  </div>
                </div>

                <p className="text-xl text-gray-700 leading-relaxed">
                  {steps[activeStep].description}
                </p>

                <div className="space-y-3">
                  {steps[activeStep].details.map((detail, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-2 h-2 rounded-full bg-linear-to-r ${steps[activeStep].color} mt-2 shrink-0`}></div>
                      <span className="text-gray-600">{detail}</span>
                    </div>
                  ))}
                </div>

                <button className={`inline-flex items-center px-6 py-3 bg-linear-to-r ${steps[activeStep].color} text-white rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300`}>
                  {steps[activeStep].id === 4 ? 'Rozpocznij teraz' : 'Następny krok'}
                  <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                  </svg>
                </button>
              </div>

              {/* Right Image/Visual */}
              <div className="relative">
                {/* Main Image */}
                <div className="relative overflow-hidden rounded-2xl shadow-2xl transform rotate-2 hover:rotate-0 transition-transform duration-500">
                  <img
                    src={steps[activeStep].image}
                    alt={`Krok ${steps[activeStep].id}`}
                    className="w-full h-80 object-cover"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-black/20 to-transparent"></div>
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-xl shadow-lg p-3 animate-bounce delay-500">
                  <div className="flex items-center space-x-2">
                    <UserGroupIcon className="w-5 h-5 text-blue-600" />
                    <span className="text-sm font-medium text-gray-700">+12 gości</span>
                  </div>
                </div>

                <div className="absolute -bottom-4 -left-4 bg-white rounded-xl shadow-lg p-3 animate-bounce delay-1000">
                  <div className="flex items-center space-x-2">
                    <PhotoIcon className="w-5 h-5 text-green-600" />
                    <span className="text-sm font-medium text-gray-700">+47 zdjęć</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16 max-w-4xl mx-auto">
          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <ClockIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">60s</div>
            <div className="text-gray-600">Czas stworzenia galerii</div>
          </div>

          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-linear-to-r from-green-500 to-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <PhotoIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">∞</div>
            <div className="text-gray-600">Limit zdjęć</div>
          </div>

          <div className="text-center bg-white rounded-2xl p-8 shadow-lg">
            <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <UserGroupIcon className="w-8 h-8 text-white" />
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-2">0</div>
            <div className="text-gray-600">Rejestracji potrzebnych</div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Gotowy żeby zebrać wszystkie zdjęcia?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Dołącz do tysięcy zadowolonych użytkowników którzy już nigdy nie muszą prosić o zdjęcia!
          </p>
          <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Stwórz pierwszą galerię
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
}
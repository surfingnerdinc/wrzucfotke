'use client';

import { useState } from 'react';
import { 
  PhotoIcon, 
  CloudArrowDownIcon, 
  ClockIcon, 
  ShareIcon, 
  ShieldCheckIcon, 
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  HeartIcon,
  PaintBrushIcon,
  DocumentTextIcon,
  QrCodeIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import FeatureModal from './FeatureModal';

export default function Features() {
  const [selectedFeature, setSelectedFeature] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleFeatureClick = (feature: any) => {
    setSelectedFeature(feature);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedFeature(null);
  };

  const features = [
    {
      icon: PhotoIcon,
      title: "Nieograniczony Upload",
      description: "Wrzuć ile chcesz zdjęć! Bez limitów rozmiaru czy ilości. Każdy gość może dodać swoje najlepsze ujęcia z imprezy.",
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      icon: PaintBrushIcon,
      title: "Edycja Zdjęć",
      description: "11 różnych filtrów i efektów! Popraw jasność, kontrast, dodaj sepia czy blur. Profesjonalna edycja w przeglądarce.",
      color: "from-violet-500 to-purple-500",
      bgColor: "bg-violet-50"
    },
    {
      icon: DocumentTextIcon,
      title: "Kreator Plakatów",
      description: "Stwórz profesjonalne plakaty i winietki! 7 formatów, różne layouty, orientacja pionowa i pozioma. Gotowe do druku!",
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50"
    },
    {
      icon: QrCodeIcon,
      title: "Generator Kodów QR",
      description: "Automatyczne generowanie kodów QR do galerii! Wydrukuj i umieść na stołach - goście łatwo dotrą do zdjęć.",
      color: "from-blue-500 to-indigo-500",
      bgColor: "bg-blue-50"
    },
    {
      icon: CloudArrowDownIcon,
      title: "Pobieranie Za Darmo",
      description: "Wszystkie zdjęcia w najwyższej jakości. Pobierz wszystko jednym kliknięciem jako archiwum ZIP. Zawsze za darmo!",
      color: "from-cyan-500 to-blue-500",
      bgColor: "bg-cyan-50"
    },
    {
      icon: ClockIcon,
      title: "Długie Przechowywanie",
      description: "Od 30 dni do całego roku! Wybierz pakiet dopasowany do Twoich potrzeb. Zdjęcia bezpieczne w chmurze.",
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    },
    {
      icon: ShareIcon,
      title: "Łatwe Udostępnianie",
      description: "Jeden link, wszystkie zdjęcia! Wyślij gościom krótki link lub kod QR. Bez rejestracji, bez aplikacji.",
      color: "from-orange-500 to-red-500",
      bgColor: "bg-orange-50"
    },
    {
      icon: ShieldCheckIcon,
      title: "Prywatność i Bezpieczeństwo",
      description: "Twoje zdjęcia są chronione. Dostęp tylko dla osób z linkiem. Automatyczne kopie zapasowe w chmurze.",
      color: "from-indigo-500 to-purple-500",
      bgColor: "bg-indigo-50"
    },
    {
      icon: DevicePhoneMobileIcon,
      title: "Działa na Wszystkim",
      description: "Telefon, tablet, laptop - nie ma znaczenia! Responsywny design dostosowany do każdego urządzenia.",
      color: "from-teal-500 to-blue-500",
      bgColor: "bg-teal-50"
    },
    {
      icon: SparklesIcon,
      title: "Usuwanie Tła",
      description: "Profesjonalne usuwanie tła ze zdjęć! Idealne do tworzenia eleganckich kompozycji na plakatach i winietek.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-pink-50"
    },
    {
      icon: GlobeAltIcon,
      title: "Bez Instalacji Aplikacji",
      description: "Wszystko w przeglądarce! Goście nie muszą nic instalować. Wystarczy kliknąć w link i już mogą wrzucać fotki.",
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50"
    },
    {
      icon: HeartIcon,
      title: "Stworzone z Miłością",
      description: "Dla ludzi, którzy kochają wspomnienia. Proste, intuicyjne i przyjemne w użyciu. Bez zbędnych komplikacji.",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-red-50"
    }
  ];

  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Dlaczego <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">WrzućFotkę.pl</span>?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Stworzyliśmy najłatwiejszy sposób na zbieranie i udostępnianie zdjęć z każdej imprezy. 
            Bez zbędnych komplikacji, za darmo i z pełną kontrolą nad Twoimi wspomnieniami.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div 
                key={index}
                onClick={() => handleFeatureClick(feature)}
                className="group relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100 cursor-pointer"
              >
                {/* Background Gradient on Hover */}
                <div className={`absolute inset-0 ${feature.bgColor} rounded-2xl opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-linear-to-r ${feature.color} mb-6 transform group-hover:scale-110 transition-transform duration-300`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-gray-800 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors">
                  {feature.description}
                </p>

                {/* Click to Learn More */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
                  <div className={`w-10 h-10 rounded-full bg-linear-to-r ${feature.color} flex items-center justify-center shadow-lg`}>
                    <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>

                {/* Click Indicator */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300">
                  <div className="px-3 py-1 bg-gray-900 text-white text-xs rounded-full">
                    Kliknij aby dowiedzieć się więcej
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center px-6 py-3 rounded-full bg-linear-to-r from-green-100 to-blue-100 text-green-800 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></span>
            Już ponad 1000 imprez skorzystało z naszego serwisu!
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Przekonaj się sam jak to działa
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Stworzenie galerii trwa dosłownie minutę. Sprawdź jak łatwo możesz zebrać wszystkie zdjęcia z Twojej imprezy!
          </p>
          <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
            Stwórz galerię za darmo
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </button>
        </div>
      </div>

      {/* Feature Modal */}
      <FeatureModal
        feature={selectedFeature}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
'use client';

import { QrCodeIcon, CameraIcon, HeartIcon } from '@heroicons/react/24/outline';
import { useProduct } from '../../contexts/ProductContext';

export default function HowQRWorks() {
  const { activeProduct } = useProduct();

  // Only show this component for gallery product
  if (activeProduct !== 'gallery') {
    return null;
  }
  const steps = [
    {
      step: "KROK 1",
      title: "Plakaty z kodem QR",
      description: "Dzięki naszej aplikacji w prosty sposób stworzysz piękne grafiki plakatów i winetek z kodem QR dopasowane do Twojej sali weselnej.",
      icon: QrCodeIcon,
      image: "/images/qr-poster.jpg", // Placeholder - można dodać prawdziwy obraz
      color: "from-green-500 to-emerald-500"
    },
    {
      step: "KROK 2", 
      title: "Ujęcia od Bliskich",
      description: "W dowolnym momencie podczas wesela lub już po powrocie do domu, Goście mogą zeskanować kod QR i w prosty sposób przesyłać setki swoich zdjęć i filmów.",
      icon: CameraIcon,
      image: "/images/guests-photos.jpg", // Placeholder
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: "KROK 3",
      title: "Pamiątka pełna emocji", 
      description: "Zebrane relacje możesz pobrać na swój telefon lub przeglądać w galerii online. Po zakończeniu wydarzenia otrzymasz także wyjątkowy teledysk z wesela.",
      icon: HeartIcon,
      image: "/images/memories.jpg", // Placeholder
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Jak działa kod QR na wesele?
          </h2>
          <div className="w-24 h-1 bg-linear-to-r from-green-500 to-emerald-500 mx-auto mb-8"></div>
          <p className="text-xl text-gray-600 leading-relaxed">
            Prosty, klasyczny i minimalistyczny sposób na zbieranie wszystkich zdjęć z Twojego wesela. 
            Wystarczą trzy kroki, aby stworzyć niezapomnianą kolekcję wspomnień.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <div key={index} className="text-center group">
                
                {/* Step Number and Icon */}
                <div className="relative mx-auto mb-8">
                  {/* Background Circle */}
                  <div className="w-48 h-48 mx-auto rounded-full bg-gray-50 border-2 border-gray-100 flex items-center justify-center relative overflow-hidden group-hover:border-gray-200 transition-colors duration-300">
                    
                    {/* Placeholder for Image */}
                    <div className={`w-32 h-32 rounded-full bg-linear-to-r ${step.color} flex items-center justify-center shadow-lg transform group-hover:scale-105 transition-transform duration-300`}>
                      <IconComponent className="w-16 h-16 text-white" />
                    </div>
                    
                    {/* Step Badge */}
                    <div className="absolute -top-2 -right-2">
                      <div className={`px-4 py-2 bg-linear-to-r ${step.color} text-white text-sm font-bold rounded-full shadow-lg`}>
                        {step.step}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="max-w-sm mx-auto">
                  <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-gray-700 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-lg">
                    {step.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Section */}
        <div className="mt-20 text-center">
          <div className="bg-linear-to-r from-gray-50 to-gray-100 rounded-3xl p-12 max-w-4xl mx-auto">
            <div className="inline-flex items-center px-6 py-3 bg-linear-to-r from-green-100 to-emerald-100 text-green-800 text-sm font-semibold rounded-full mb-6">
              <QrCodeIcon className="w-5 h-5 mr-2" />
              Sprawdzone przez tysiące par młodych
            </div>
            
            <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Gotowy na niezapomniane wspomnienia?
            </h3>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Stworzenie kompletu plakatów z kodami QR zajmuje dosłownie kilka minut. 
              Twoi goście będą zachwyceni łatwością dzielenia się zdjęciami!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-green-600 to-emerald-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <QrCodeIcon className="w-6 h-6 mr-3" />
                Stwórz plakaty QR za darmo
              </button>
              
              <button className="inline-flex items-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:border-gray-300 hover:bg-gray-50 transition-all duration-300">
                <CameraIcon className="w-6 h-6 mr-3" />
                Zobacz przykłady
              </button>
            </div>
          </div>
        </div>

        {/* Additional Features */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Błyskawiczne</h4>
            <p className="text-gray-600">Stworzenie plakatów w 5 minut</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M9 19l3 3m0 0l3-3m-3 3V10" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Gotowe do druku</h4>
            <p className="text-gray-600">Wysokiej jakości pliki PDF</p>
          </div>

          <div className="text-center p-6">
            <div className="w-16 h-16 bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h4 className="text-lg font-semibold text-gray-900 mb-2">Bezpłatne</h4>
            <p className="text-gray-600">Podstawowe funkcje za darmo</p>
          </div>
        </div>
      </div>
    </section>
  );
}
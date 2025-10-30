'use client';

import { XCircleIcon, ArrowPathIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function PurchaseErrorPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        
        {/* Error Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          
          {/* Error Icon */}
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <XCircleIcon className="w-12 h-12 text-red-600" />
          </div>

          {/* Error Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Wystąpił problem z płatnością 😔
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Nie udało się przetworzyć Twojej płatności. Nie martw się - żadne środki 
            nie zostały pobrane z Twojego konta. Spróbuj ponownie za chwilę.
          </p>

          {/* Common Issues */}
          <div className="bg-orange-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Najczęstsze przyczyny problemów:</h3>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 shrink-0"></div>
                <span>Niewystarczające środki na karcie lub koncie</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 shrink-0"></div>
                <span>Przekroczony dzienny limit płatności internetowych</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 shrink-0"></div>
                <span>Karta wygasła lub została zablokowana</span>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-orange-400 rounded-full mt-2 mr-3 shrink-0"></div>
                <span>Problemy techniczne po stronie banku lub operatora płatności</span>
              </li>
            </ul>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center px-8 py-4 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-semibold"
            >
              <ArrowPathIcon className="w-5 h-5 mr-3" />
              Spróbuj ponownie
            </button>

            <a
              href="/"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold"
            >
              Wróć do strony głównej
            </a>
          </div>

          {/* Alternative Methods */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Użyj innej metody</h4>
              <p className="text-sm text-gray-600 mb-4">
                Spróbuj zapłacić BLIK-iem, przelewem lub inną kartą
              </p>
              <button 
                onClick={() => window.history.back()}
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Zmień metodę płatności
              </button>
            </div>

            <div className="bg-green-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <EnvelopeIcon className="w-6 h-6 text-green-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Skontaktuj się z nami</h4>
              <p className="text-sm text-gray-600 mb-4">
                Nasz zespół pomoże rozwiązać problem z płatnością
              </p>
              <a 
                href="/contact"
                className="inline-flex items-center px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
              >
                Napisz do nas
              </a>
            </div>
          </div>

          {/* Help Section */}
          <div className="bg-gray-50 rounded-xl p-6">
            <h4 className="font-semibold text-gray-900 mb-4">💡 Potrzebujesz pomocy?</h4>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium text-gray-900 mb-1">📧 Email</div>
                <div className="text-gray-600">pomoc@wrzucfotke.pl</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900 mb-1">📞 Telefon</div>
                <div className="text-gray-600">+48 123 456 789</div>
              </div>
              <div className="text-center">
                <div className="font-medium text-gray-900 mb-1">💬 Czat</div>
                <div className="text-gray-600">Dostępny 24/7</div>
              </div>
            </div>
          </div>

          {/* Security Note */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
                Bezpieczne płatności
              </div>
              <div className="flex items-center">
                <svg className="w-4 h-4 mr-2 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                Żadne opłaty nie zostały pobrane
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
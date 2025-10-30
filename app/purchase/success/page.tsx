import { CheckCircleIcon, DocumentTextIcon, EnvelopeIcon } from '@heroicons/react/24/outline';

export default function PurchaseSuccessPage() {
  return (
    <div className="min-h-screen bg-linear-to-br from-green-50 via-white to-blue-50 flex items-center justify-center px-4">
      <div className="max-w-2xl w-full">
        
        {/* Success Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12 text-center">
          
          {/* Success Icon */}
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircleIcon className="w-12 h-12 text-green-600" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Płatność zakończona pomyślnie! 🎉
          </h1>
          
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Dziękujemy za zakup! Twój plan został aktywowany i możesz już korzystać 
            ze wszystkich funkcji. Szczegóły zamówienia wysłaliśmy na Twój email.
          </p>

          {/* Order Details */}
          <div className="bg-gray-50 rounded-xl p-6 mb-8 text-left">
            <h3 className="font-semibold text-gray-900 mb-4">Szczegóły zamówienia:</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Numer zamówienia:</span>
                <span className="font-mono font-medium">#WF-2025-001234</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Plan:</span>
                <span className="font-medium">Wedding - Roczny</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Data zakupu:</span>
                <span className="font-medium">30 października 2025</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Ważny do:</span>
                <span className="font-medium">30 października 2026</span>
              </div>
            </div>
          </div>

          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            
            <div className="bg-blue-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Przejdź do Dashboardu</h4>
              <p className="text-sm text-gray-600 mb-4">
                Stwórz pierwszą galerię i zacznij zbierać zdjęcia od gości
              </p>
              <a 
                href="/dashboard" 
                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                Otwórz Dashboard
              </a>
            </div>

            <div className="bg-purple-50 rounded-xl p-6">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                <DocumentTextIcon className="w-6 h-6 text-purple-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Pobierz Fakturę</h4>
              <p className="text-sm text-gray-600 mb-4">
                Dokument dostępny w formacie PDF z wszystkimi danymi
              </p>
              <button className="inline-flex items-center px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium">
                Pobierz PDF
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/dashboard"
              className="inline-flex items-center px-8 py-4 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl font-semibold"
            >
              <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              Zacznij korzystać
            </a>

            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 font-semibold"
            >
              <EnvelopeIcon className="w-5 h-5 mr-3" />
              Potrzebujesz pomocy?
            </a>
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-8 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500" />
                Bezpieczna płatność
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500" />
                Gwarancja zwrotu
              </div>
              <div className="flex items-center">
                <CheckCircleIcon className="w-4 h-4 mr-2 text-green-500" />
                Wsparcie 24/7
              </div>
            </div>
          </div>
        </div>

        {/* Helpful Links */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 mb-4">Przydatne linki:</p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <a href="/dashboard/qr" className="text-indigo-600 hover:text-indigo-500 underline">
              Generator kodów QR
            </a>
            <a href="/dashboard/creator" className="text-indigo-600 hover:text-indigo-500 underline">
              Kreator plakatów
            </a>
            <a href="/dashboard/editor" className="text-indigo-600 hover:text-indigo-500 underline">
              Edycja zdjęć
            </a>
            <a href="/contact" className="text-indigo-600 hover:text-indigo-500 underline">
              Centrum pomocy
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
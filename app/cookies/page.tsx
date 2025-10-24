import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka Cookies - WrzućFotkę.pl',
  description: 'Polityka Cookies serwisu WrzućFotkę.pl - informacje o wykorzystywaniu plików cookies i podobnych technologii.',
};

export default function CookiesPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Polityka Cookies
          </h1>
          <p className="text-lg text-gray-600">
            WrzućFotkę.pl
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Ostatnia aktualizacja: 24 października 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Czym są pliki cookies?</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>1.1.</strong> Pliki cookies to małe pliki tekstowe zapisywane na urządzeniu użytkownika podczas odwiedzania strony internetowej.
              </p>
              <p>
                <strong>1.2.</strong> Cookies zawierają informacje, które mogą być odczytywane przez serwer strony internetowej przy kolejnych wizytach.
              </p>
              <p>
                <strong>1.3.</strong> Podobne technologie obejmują: local storage, session storage, web beacons, piksele śledzące.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Jakie cookies wykorzystujemy?</h2>
            
            <div className="space-y-6">
              {/* Niezbędne */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-red-500 rounded-full mr-3"></span>
                  Cookies niezbędne
                </h3>
                <p className="text-gray-700 mb-4">
                  Te pliki są niezbędne do prawidłowego funkcjonowania serwisu. Nie można ich wyłączyć.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Nazwa</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Cel</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Czas życia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">session_id</td>
                        <td className="px-4 py-2 text-gray-700">Identyfikacja sesji użytkownika</td>
                        <td className="px-4 py-2 text-gray-700">Sesja</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">csrf_token</td>
                        <td className="px-4 py-2 text-gray-700">Ochrona przed atakami CSRF</td>
                        <td className="px-4 py-2 text-gray-700">Sesja</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">login_state</td>
                        <td className="px-4 py-2 text-gray-700">Zachowanie stanu logowania</td>
                        <td className="px-4 py-2 text-gray-700">30 dni</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Funkcjonalne */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></span>
                  Cookies funkcjonalne
                </h3>
                <p className="text-gray-700 mb-4">
                  Umożliwiają zapamiętanie preferencji i personalizację doświadczeń.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Nazwa</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Cel</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Czas życia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">theme_preference</td>
                        <td className="px-4 py-2 text-gray-700">Zapamiętanie motywu (jasny/ciemny)</td>
                        <td className="px-4 py-2 text-gray-700">365 dni</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">language</td>
                        <td className="px-4 py-2 text-gray-700">Preferencje językowe</td>
                        <td className="px-4 py-2 text-gray-700">365 dni</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">gallery_view</td>
                        <td className="px-4 py-2 text-gray-700">Preferowany widok galerii</td>
                        <td className="px-4 py-2 text-gray-700">90 dni</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Analityczne */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                  Cookies analityczne
                </h3>
                <p className="text-gray-700 mb-4">
                  Pomagają zrozumieć, jak odwiedzający korzystają z serwisu.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Nazwa</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Cel</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Czas życia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">_ga</td>
                        <td className="px-4 py-2 text-gray-700">Google Analytics - identyfikacja użytkowników</td>
                        <td className="px-4 py-2 text-gray-700">2 lata</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">_gid</td>
                        <td className="px-4 py-2 text-gray-700">Google Analytics - identyfikacja sesji</td>
                        <td className="px-4 py-2 text-gray-700">24 godziny</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">_gat</td>
                        <td className="px-4 py-2 text-gray-700">Google Analytics - ograniczanie żądań</td>
                        <td className="px-4 py-2 text-gray-700">1 minuta</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Marketingowe */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-3 h-3 bg-purple-500 rounded-full mr-3"></span>
                  Cookies marketingowe
                </h3>
                <p className="text-gray-700 mb-4">
                  Wykorzystywane do śledzenia użytkowników i wyświetlania spersonalizowanych reklam.
                </p>
                <div className="overflow-x-auto">
                  <table className="min-w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Nazwa</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Cel</th>
                        <th className="px-4 py-2 text-left font-medium text-gray-900">Czas życia</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200">
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">_fbp</td>
                        <td className="px-4 py-2 text-gray-700">Facebook Pixel</td>
                        <td className="px-4 py-2 text-gray-700">90 dni</td>
                      </tr>
                      <tr>
                        <td className="px-4 py-2 font-mono text-gray-800">marketing_campaign</td>
                        <td className="px-4 py-2 text-gray-700">Śledzenie skuteczności kampanii</td>
                        <td className="px-4 py-2 text-gray-700">30 dni</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Podstawa prawna</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>3.1.</strong> Cookies niezbędne: art. 6 ust. 1 lit. f) RODO - prawnie uzasadniony interes
              </p>
              <p>
                <strong>3.2.</strong> Pozostałe cookies: art. 6 ust. 1 lit. a) RODO - zgoda użytkownika
              </p>
              <p>
                <strong>3.3.</strong> Zgodnie z ustawą Prawo telekomunikacyjne art. 173 - zgoda na cookies
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Zarządzanie cookies</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>4.1.</strong> <strong>Ustawienia serwisu:</strong> Możesz zarządzać preferencjami cookies w ustawieniach konta.
              </p>
              <p>
                <strong>4.2.</strong> <strong>Ustawienia przeglądarki:</strong> Cookies można kontrolować w ustawieniach przeglądarki:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Chrome:</strong> Ustawienia → Prywatność i bezpieczeństwo → Pliki cookie</li>
                <li><strong>Firefox:</strong> Opcje → Prywatność i bezpieczeństwo → Pliki cookie</li>
                <li><strong>Safari:</strong> Preferencje → Prywatność → Pliki cookie</li>
                <li><strong>Edge:</strong> Ustawienia → Pliki cookie i uprawnienia witryny</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Konsekwencje wyłączenia cookies</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>5.1.</strong> <strong>Wyłączenie cookies niezbędnych:</strong> Może uniemożliwić prawidłowe funkcjonowanie serwisu
              </p>
              <p>
                <strong>5.2.</strong> <strong>Wyłączenie cookies funkcjonalnych:</strong> Utrata personalizacji i preferencji
              </p>
              <p>
                <strong>5.3.</strong> <strong>Wyłączenie cookies analitycznych:</strong> Nie wpływa na funkcjonalność serwisu
              </p>
              <p>
                <strong>5.4.</strong> <strong>Wyłączenie cookies marketingowych:</strong> Brak spersonalizowanych reklam
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Cookies stron trzecich</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>6.1.</strong> Wykorzystujemy usługi stron trzecich, które mogą ustawiać własne cookies:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Google Analytics:</strong> analiza ruchu i zachowań użytkowników</li>
                <li><strong>Facebook Pixel:</strong> remarketing i analiza konwersji</li>
                <li><strong>Operatorzy płatności:</strong> obsługa transakcji</li>
              </ul>
              <p>
                <strong>6.2.</strong> Każdy z dostawców ma własną politykę prywatności i cookies.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Aktualizacje polityki</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>7.1.</strong> Polityka Cookies może być aktualizowana wraz z rozwojem serwisu.
              </p>
              <p>
                <strong>7.2.</strong> O istotnych zmianach poinformujemy poprzez banner na stronie głównej.
              </p>
              <p>
                <strong>7.3.</strong> Zalecamy regularne sprawdzanie aktualnej wersji polityki.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Kontakt</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>8.1.</strong> W sprawach dotyczących cookies skontaktuj się z nami:
              </p>
              <ul className="list-disc pl-8 space-y-1">
                <li>E-mail: cookies@wrzucfotke.pl</li>
                <li>E-mail ogólny: kontakt@wrzucfotke.pl</li>
              </ul>
            </div>
          </section>

          {/* Cookie Settings Panel */}
          <div className="mt-12 p-6 bg-linear-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🍪 Zarządzaj ustawieniami cookies</h3>
            <p className="text-gray-700 mb-4">
              Możesz w każdej chwili zmienić swoje preferencje dotyczące cookies.
            </p>
            <button className="inline-flex items-center px-6 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
              Ustawienia cookies
            </button>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dane kontaktowe</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>SurfingSystems.inc - Marcin Dubiński</strong></p>
              <p>NIP: 7881990815</p>
              <p>E-mail cookies: cookies@wrzucfotke.pl</p>
              <p>E-mail ogólny: kontakt@wrzucfotke.pl</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'RODO - Ochrona Danych Osobowych - WrzućFotkę.pl',
  description: 'Informacje o prawach wynikających z RODO w serwisie WrzućFotkę.pl - Rozporządzenie o Ochronie Danych Osobowych.',
};

export default function RodoPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            RODO - Ochrona Danych Osobowych
          </h1>
          <p className="text-lg text-gray-600">
            Informacje o Twoich prawach zgodnie z RODO
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Ostatnia aktualizacja: 24 października 2024
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          
          {/* Intro */}
          <div className="mb-8 p-6 bg-blue-50 rounded-xl">
            <h2 className="text-xl font-semibold text-blue-900 mb-3">
              📋 Czym jest RODO?
            </h2>
            <p className="text-blue-800 leading-relaxed">
              RODO (Rozporządzenie o Ochronie Danych Osobowych) to unijne prawo, które daje Ci kontrolę nad Twoimi danymi osobowymi. 
              Jako użytkownik serwisu WrzućFotkę.pl masz szereg praw, o których chcemy Cię poinformować.
            </p>
          </div>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Administrator danych</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-gray-50 p-6 rounded-lg">
                <p><strong>SurfingSystems.inc - Marcin Dubiński</strong></p>
                <p>NIP: 7881990815</p>
                <p>E-mail do spraw RODO: <strong>rodo@wrzucfotke.pl</strong></p>
                <p>E-mail ogólny: kontakt@wrzucfotke.pl</p>
              </div>
              <p>
                Administrator danych to podmiot, który decyduje o celach i sposobach przetwarzania Twoich danych osobowych w serwisie WrzućFotkę.pl.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Twoje prawa wynikające z RODO</h2>
            
            <div className="space-y-6">
              
              {/* Prawo dostępu */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center mr-3 text-blue-600 font-bold text-sm">1</span>
                  Prawo dostępu (Art. 15 RODO)
                </h3>
                <p className="text-gray-700 mb-4">
                  Masz prawo uzyskać informację o tym, jakie dane osobowe o Tobie przetwarzamy oraz otrzymać ich kopię.
                </p>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <p className="text-blue-800 text-sm">
                    <strong>Co możesz otrzymać:</strong> Kopię wszystkich Twoich danych, informację o celach przetwarzania, 
                    okresie przechowywania, odbiorcach danych.
                  </p>
                </div>
              </div>

              {/* Prawo sprostowania */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center mr-3 text-green-600 font-bold text-sm">2</span>
                  Prawo do sprostowania (Art. 16 RODO)
                </h3>
                <p className="text-gray-700 mb-4">
                  Masz prawo żądać sprostowania nieprawidłowych danych osobowych oraz uzupełnienia niekompletnych danych.
                </p>
                <div className="bg-green-50 p-4 rounded-lg">
                  <p className="text-green-800 text-sm">
                    <strong>Przykłady:</strong> Zmiana adresu e-mail, poprawienie imienia lub nazwiska, 
                    aktualizacja informacji kontaktowych.
                  </p>
                </div>
              </div>

              {/* Prawo do usunięcia */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center mr-3 text-red-600 font-bold text-sm">3</span>
                  Prawo do usunięcia - "Prawo do bycia zapomnianym" (Art. 17 RODO)
                </h3>
                <p className="text-gray-700 mb-4">
                  Masz prawo żądać usunięcia swoich danych osobowych w określonych przypadkach.
                </p>
                <div className="bg-red-50 p-4 rounded-lg">
                  <p className="text-red-800 text-sm">
                    <strong>Kiedy możesz żądać usunięcia:</strong> Dane nie są już potrzebne, wycofałeś zgodę, 
                    dane były przetwarzane bezprawnie, chcesz usunąć konto.
                  </p>
                </div>
              </div>

              {/* Prawo do ograniczenia */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center mr-3 text-yellow-600 font-bold text-sm">4</span>
                  Prawo do ograniczenia przetwarzania (Art. 18 RODO)
                </h3>
                <p className="text-gray-700 mb-4">
                  Masz prawo żądać ograniczenia przetwarzania danych w określonych sytuacjach.
                </p>
                <div className="bg-yellow-50 p-4 rounded-lg">
                  <p className="text-yellow-800 text-sm">
                    <strong>Kiedy stosowane:</strong> Kwestionujesz prawidłowość danych, przetwarzanie jest bezprawne, 
                    ale nie chcesz ich usuwania.
                  </p>
                </div>
              </div>

              {/* Prawo do przenoszenia */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center mr-3 text-purple-600 font-bold text-sm">5</span>
                  Prawo do przenoszenia danych (Art. 20 RODO)
                </h3>
                <p className="text-gray-700 mb-4">
                  Masz prawo otrzymać swoje dane w ustrukturyzowanym formacie i przenieść je do innego serwisu.
                </p>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <p className="text-purple-800 text-sm">
                    <strong>Format danych:</strong> JSON, CSV lub inny powszechnie używany format, 
                    który umożliwi import do innych systemów.
                  </p>
                </div>
              </div>

              {/* Prawo sprzeciwu */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mr-3 text-orange-600 font-bold text-sm">6</span>
                  Prawo sprzeciwu (Art. 21 RODO)
                </h3>
                <p className="text-gray-700 mb-4">
                  Masz prawo w każdej chwili wnieść sprzeciw wobec przetwarzania Twoich danych osobowych.
                </p>
                <div className="bg-orange-50 p-4 rounded-lg">
                  <p className="text-orange-800 text-sm">
                    <strong>Szczególnie dotyczy:</strong> Marketingu bezpośredniego, profilowania, 
                    przetwarzania na podstawie prawnie uzasadnionego interesu.
                  </p>
                </div>
              </div>

              {/* Wycofanie zgody */}
              <div className="border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-3 flex items-center">
                  <span className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center mr-3 text-indigo-600 font-bold text-sm">7</span>
                  Prawo do wycofania zgody (Art. 7 RODO)
                </h3>
                <p className="text-gray-700 mb-4">
                  Jeśli przetwarzanie odbywa się na podstawie zgody, masz prawo ją w każdej chwili wycofać.
                </p>
                <div className="bg-indigo-50 p-4 rounded-lg">
                  <p className="text-indigo-800 text-sm">
                    <strong>Ważne:</strong> Wycofanie zgody nie wpływa na zgodność z prawem przetwarzania, 
                    które miało miejsce przed jej wycofaniem.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Jak skorzystać ze swoich praw?</h2>
            
            <div className="space-y-6">
              <div className="bg-linear-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📧 Kontakt elektroniczny</h3>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span><strong>E-mail do spraw RODO:</strong> rodo@wrzucfotke.pl</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-2 h-2 bg-blue-500 rounded-full"></span>
                    <span><strong>E-mail ogólny:</strong> kontakt@wrzucfotke.pl</span>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📝 Co zawrzeć w wiadomości?</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Jasne określenie, z jakiego prawa chcesz skorzystać</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Twoje dane identyfikacyjne (imię, nazwisko, e-mail z konta)</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>Szczegółowy opis żądania</span>
                  </li>
                  <li className="flex items-start space-x-3">
                    <span className="w-2 h-2 bg-green-500 rounded-full mt-2"></span>
                    <span>W przypadku reprezentowania osoby trzeciej - odpowiednie pełnomocnictwo</span>
                  </li>
                </ul>
              </div>

              <div className="bg-yellow-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">⏰ Terminy odpowiedzi</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-bold">!</span>
                    <span><strong>Standardowy termin:</strong> 1 miesiąc od otrzymania żądania</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-bold">+</span>
                    <span><strong>Przedłużenie:</strong> Do 2 dodatkowych miesięcy w skomplikowanych przypadkach</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="w-6 h-6 bg-yellow-500 text-white text-xs rounded-full flex items-center justify-center font-bold">✓</span>
                    <span><strong>Potwierdzenie:</strong> Otrzymasz potwierdzenie wpłynięcia żądania w ciągu 72 godzin</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Prawo do skargi</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="bg-red-50 border border-red-200 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-red-900 mb-3">
                  🚨 Urząd Ochrony Danych Osobowych
                </h3>
                <div className="space-y-3 text-red-800">
                  <p>
                    Jeśli uważasz, że przetwarzanie Twoich danych osobowych narusza RODO, 
                    masz prawo wniesienia skargi do organu nadzorczego.
                  </p>
                  <div className="bg-white p-4 rounded-lg">
                    <p><strong>Prezes Urzędu Ochrony Danych Osobowych</strong></p>
                    <p>ul. Stawki 2, 00-193 Warszawa</p>
                    <p>Telefon: +48 22 531 03 00</p>
                    <p>E-mail: kancelaria@uodo.gov.pl</p>
                    <p>Strona: <span className="font-mono">www.uodo.gov.pl</span></p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Bezpieczeństwo Twoich danych</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Przykładamy szczególną wagę do bezpieczeństwa Twoich danych osobowych. Stosujemy następujące zabezpieczenia:
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">🔐 Zabezpieczenia techniczne</h4>
                  <ul className="text-blue-800 text-sm space-y-1">
                    <li>• Szyfrowanie SSL/TLS</li>
                    <li>• Regularne kopie zapasowe</li>
                    <li>• Monitoring bezpieczeństwa 24/7</li>
                    <li>• Aktualizacje bezpieczeństwa</li>
                  </ul>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">👥 Zabezpieczenia organizacyjne</h4>
                  <ul className="text-green-800 text-sm space-y-1">
                    <li>• Szkolenia personelu</li>
                    <li>• Ograniczony dostęp na zasadzie "need to know"</li>
                    <li>• Umowy o poufności</li>
                    <li>• Regularne audyty</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Przydatne linki</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">📄 Nasze dokumenty:</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="/privacy" className="text-blue-600 hover:text-blue-800 transition-colors">
                        → Polityka Prywatności
                      </a>
                    </li>
                    <li>
                      <a href="/cookies" className="text-blue-600 hover:text-blue-800 transition-colors">
                        → Polityka Cookies
                      </a>
                    </li>
                    <li>
                      <a href="/terms" className="text-blue-600 hover:text-blue-800 transition-colors">
                        → Regulamin serwisu
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900">🌐 Zewnętrzne zasoby:</h4>
                  <ul className="space-y-2">
                    <li>
                      <a href="https://uodo.gov.pl" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 transition-colors">
                        → Urząd Ochrony Danych Osobowych
                      </a>
                    </li>
                    <li>
                      <a href="https://gdpr.eu" target="_blank" rel="noopener" className="text-blue-600 hover:text-blue-800 transition-colors">
                        → Informacje o RODO
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Quick Action Panel */}
          <div className="mt-12 p-6 bg-linear-to-r from-indigo-50 to-purple-50 rounded-xl border border-indigo-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ Szybkie działania RODO</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="flex items-center justify-center px-4 py-3 bg-blue-600 text-white font-medium rounded-xl hover:bg-blue-700 transition-colors">
                📊 Pobierz moje dane
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors">
                🗑️ Usuń moje konto
              </button>
              <button className="flex items-center justify-center px-4 py-3 bg-gray-600 text-white font-medium rounded-xl hover:bg-gray-700 transition-colors">
                ✉️ Skontaktuj się z nami
              </button>
            </div>
          </div>

          {/* Contact Info */}
          <div className="mt-8 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dane kontaktowe w sprawach RODO</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>SurfingSystems.inc - Marcin Dubiński</strong></p>
              <p>NIP: 7881990815</p>
              <p>E-mail RODO: <strong>rodo@wrzucfotke.pl</strong></p>
              <p>E-mail ogólny: kontakt@wrzucfotke.pl</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
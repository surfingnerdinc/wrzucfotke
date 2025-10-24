import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Polityka Prywatności - WrzućFotkę.pl',
  description: 'Polityka Prywatności serwisu WrzućFotkę.pl - informacje o przetwarzaniu danych osobowych zgodnie z RODO.',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Polityka Prywatności
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
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Administrator danych osobowych</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>1.1.</strong> Administratorem danych osobowych (dalej: „Administrator") jest SurfingSystems.inc - Marcin Dubiński, NIP: 7881990815.
              </p>
              <p>
                <strong>1.2.</strong> Kontakt z Administratorem:
              </p>
              <ul className="list-disc pl-8 space-y-1">
                <li>E-mail: rodo@wrzucfotke.pl</li>
                <li>E-mail ogólny: kontakt@wrzucfotke.pl</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Jakie dane osobowe przetwarzamy</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>2.1.</strong> Przetwarzamy następujące kategorie danych osobowych:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Dane rejestracyjne:</strong> imię, nazwisko, adres e-mail, hasło (w formie zaszyfrowanej)</li>
                <li><strong>Dane techniczne:</strong> adres IP, informacje o przeglądarce, systemie operacyjnym</li>
                <li><strong>Dane aktywności:</strong> logi korzystania z serwisu, statystyki użytkowania</li>
                <li><strong>Dane płatności:</strong> w przypadku zakupu płatnych usług (przetwarzane przez operatorów płatności)</li>
                <li><strong>Dane zawarte w zdjęciach:</strong> w tym potencjalnie wizerunki osób</li>
                <li><strong>Pliki cookies:</strong> zgodnie z oddzielną Polityką Cookies</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Podstawy prawne przetwarzania</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>3.1.</strong> Dane przetwarzamy na podstawie:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Art. 6 ust. 1 lit. b) RODO</strong> - wykonanie umowy o świadczenie usług</li>
                <li><strong>Art. 6 ust. 1 lit. a) RODO</strong> - zgoda na przetwarzanie (newsletter, marketing)</li>
                <li><strong>Art. 6 ust. 1 lit. f) RODO</strong> - prawnie uzasadniony interes (bezpieczeństwo, analityka)</li>
                <li><strong>Art. 6 ust. 1 lit. c) RODO</strong> - obowiązek prawny (księgowość, podatki)</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Cele przetwarzania danych</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>4.1.</strong> Przetwarzamy dane osobowe w celu:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Świadczenia usług serwisu WrzućFotkę.pl</li>
                <li>Zarządzania kontem użytkownika</li>
                <li>Obsługi płatności i rozliczeń</li>
                <li>Komunikacji z użytkownikami</li>
                <li>Zapewnienia bezpieczeństwa serwisu</li>
                <li>Analiz statystycznych i ulepszania serwisu</li>
                <li>Marketingu bezpośredniego (za zgodą)</li>
                <li>Wypełnienia obowiązków prawnych</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Okres przechowywania danych</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>5.1.</strong> Dane przechowujemy przez:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Dane konta:</strong> do momentu usunięcia konta przez użytkownika</li>
                <li><strong>Dane płatności:</strong> przez okres wymagany przepisami prawa (do 5 lat)</li>
                <li><strong>Dane marketingowe:</strong> do czasu wycofania zgody</li>
                <li><strong>Logi systemowe:</strong> przez 12 miesięcy</li>
                <li><strong>Zdjęcia:</strong> zgodnie z ustawieniami użytkownika lub do usunięcia konta</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Odbiorcy danych</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>6.1.</strong> Dane osobowe mogą być przekazywane:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Dostawcom usług IT:</strong> hosting, poczta elektroniczna, analityka</li>
                <li><strong>Operatorom płatności:</strong> w zakresie obsługi transakcji</li>
                <li><strong>Dostawcom usług prawnych:</strong> w przypadku sporów</li>
                <li><strong>Organom państwowym:</strong> na żądanie uprawnione prawnie</li>
              </ul>
              <p>
                <strong>6.2.</strong> Wszyscy odbiorcy zostali odpowiednio przeszkoleni w zakresie ochrony danych osobowych.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Przekazywanie danych do państw trzecich</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>7.1.</strong> Dane osobowe mogą być przekazywane do państw spoza Europejskiego Obszaru Gospodarczego.
              </p>
              <p>
                <strong>7.2.</strong> Transfer odbywa się wyłącznie do krajów zapewniających odpowiedni poziom ochrony lub na podstawie odpowiednich zabezpieczeń (np. klauzule standardowe UE).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Prawa osób, których dane dotyczą</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>8.1.</strong> Masz prawo do:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li><strong>Dostępu</strong> do swoich danych osobowych</li>
                <li><strong>Sprostowania</strong> nieprawidłowych danych</li>
                <li><strong>Usunięcia</strong> danych (prawo do bycia zapomnianym)</li>
                <li><strong>Ograniczenia</strong> przetwarzania</li>
                <li><strong>Przenoszenia</strong> danych</li>
                <li><strong>Sprzeciwu</strong> wobec przetwarzania</li>
                <li><strong>Wycofania zgody</strong> w dowolnym momencie</li>
              </ul>
              <p>
                <strong>8.2.</strong> Aby skorzystać z praw, skontaktuj się z nami: rodo@wrzucfotke.pl
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Bezpieczeństwo danych</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>9.1.</strong> Stosujemy odpowiednie zabezpieczenia techniczne i organizacyjne:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Szyfrowanie danych w tranzycie i w spoczynku</li>
                <li>Regularne kopie zapasowe</li>
                <li>Ograniczenie dostępu na zasadzie "need to know"</li>
                <li>Monitoring bezpieczeństwa</li>
                <li>Regularne audyty bezpieczeństwa</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Pliki cookies i technologie śledzące</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>10.1.</strong> Szczegółowe informacje o wykorzystywaniu plików cookies znajdują się w oddzielnej Polityce Cookies.
              </p>
              <p>
                <strong>10.2.</strong> Używamy cookies niezbędnych do funkcjonowania serwisu oraz analitycznych (za zgodą).
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Profilowanie i automatyzacja</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>11.1.</strong> Nie stosujemy automatycznego podejmowania decyzji w rozumieniu art. 22 RODO.
              </p>
              <p>
                <strong>11.2.</strong> Możemy stosować profilowanie w celach marketingowych (za zgodą) oraz analitycznych.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Zmiany polityki prywatności</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>12.1.</strong> Polityka Prywatności może być aktualizowana. O zmianach poinformujemy z 7-dniowym wyprzedzeniem.
              </p>
              <p>
                <strong>12.2.</strong> Kontynuowanie korzystania z serwisu po zmianach oznacza akceptację nowej wersji.
              </p>
            </div>
          </section>

          {/* Contact Info */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Kontakt w sprawach RODO</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>SurfingSystems.inc - Marcin Dubiński</strong></p>
              <p>NIP: 7881990815</p>
              <p>E-mail RODO: rodo@wrzucfotke.pl</p>
              <p>E-mail ogólny: kontakt@wrzucfotke.pl</p>
            </div>
            <div className="mt-4 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Prawo do skargi:</strong> Masz prawo wniesienia skargi do organu nadzorczego - 
                Prezesa Urzędu Ochrony Danych Osobowych (ul. Stawki 2, 00-193 Warszawa).
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
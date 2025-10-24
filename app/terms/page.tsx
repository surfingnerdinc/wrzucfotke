import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Regulamin - WrzućFotkę.pl',
  description: 'Regulamin serwisu WrzućFotkę.pl - warunki korzystania z platformy do udostępniania zdjęć z wydarzeń.',
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Regulamin serwisu
          </h1>
          <p className="text-lg text-gray-600">
            WrzućFotkę.pl
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Ostatnia aktualizacja: 24 października 2025
          </p>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-8 md:p-12">
          
          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Postanowienia ogólne</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>1.1.</strong> Niniejszy Regulamin określa zasady świadczenia usług drogą elektroniczną przez serwis WrzućFotkę.pl, dostępny pod adresem www.wrzucfotke.pl.
              </p>
              <p>
                <strong>1.2.</strong> Usługodawcą jest SurfingSystems.inc - Marcin Dubiński, NIP: 7881990815.
              </p>
              <p>
                <strong>1.3.</strong> Serwis WrzućFotkę.pl umożliwia użytkownikom tworzenie galerii zdjęć oraz udostępnianie ich uczestnikom wydarzeń.
              </p>
              <p>
                <strong>1.4.</strong> Korzystanie z serwisu oznacza akceptację niniejszego Regulaminu.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Definicje</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>2.1.</strong> <strong>Serwis</strong> - serwis internetowy WrzućFotkę.pl dostępny pod adresem www.wrzucfotke.pl.
              </p>
              <p>
                <strong>2.2.</strong> <strong>Użytkownik</strong> - osoba fizyczna, osoba prawna lub jednostka organizacyjna nieposiadająca osobowości prawnej, korzystająca z Serwisu.
              </p>
              <p>
                <strong>2.3.</strong> <strong>Galeria</strong> - zbiór zdjęć utworzony przez Użytkownika w Serwisie.
              </p>
              <p>
                <strong>2.4.</strong> <strong>Konto</strong> - indywidualny profil Użytkownika w Serwisie.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">3. Warunki świadczenia usług</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>3.1.</strong> Podstawowe funkcje Serwisu są dostępne bezpłatnie po utworzeniu Konta.
              </p>
              <p>
                <strong>3.2.</strong> Serwis oferuje płatne plany subskrypcji rozszerzające funkcjonalność.
              </p>
              <p>
                <strong>3.3.</strong> Do korzystania z Serwisu wymagane jest urządzenie z dostępem do Internetu i przeglądarkę internetową.
              </p>
              <p>
                <strong>3.4.</strong> Serwis jest dostępny 24 godziny na dobę, 7 dni w tygodniu, z zastrzeżeniem przerw technicznych.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Obowiązki Użytkownika</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>4.1.</strong> Użytkownik zobowiązuje się do:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Podania prawdziwych danych podczas rejestracji</li>
                <li>Zachowania poufności danych dostępowych</li>
                <li>Nieprzekazywania dostępu do Konta osobom trzecim</li>
                <li>Korzystania z Serwisu zgodnie z prawem i dobrymi obyczajami</li>
                <li>Respektowania praw autorskich i dóbr osobistych osób trzecich</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Zabronione działania</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>5.1.</strong> Zabrania się:
              </p>
              <ul className="list-disc pl-8 space-y-2">
                <li>Umieszczania treści niezgodnych z prawem lub dobrymi obyczajami</li>
                <li>Naruszania praw autorskich i dóbr osobistych</li>
                <li>Podszywania się pod inne osoby</li>
                <li>Rozpowszechniania wirusów i szkodliwego oprogramowania</li>
                <li>Podejmowania działań zakłócających działanie Serwisu</li>
                <li>Wykorzystywania Serwisu do celów komercyjnych bez zgody</li>
              </ul>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prawa autorskie</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>6.1.</strong> Użytkownik oświadcza, że posiada prawa autorskie do umieszczanych zdjęć lub zgodę osób uprawnionych.
              </p>
              <p>
                <strong>6.2.</strong> Umieszczenie zdjęć w Serwisie stanowi udzielenie licencji na ich wykorzystanie w zakresie świadczenia usług.
              </p>
              <p>
                <strong>6.3.</strong> Licencja wygasa wraz z usunięciem zdjęć przez Użytkownika lub zakończeniem świadczenia usług.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Odpowiedzialność</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>7.1.</strong> Usługodawca nie ponosi odpowiedzialności za treści umieszczane przez Użytkowników.
              </p>
              <p>
                <strong>7.2.</strong> Użytkownik ponosi pełną odpowiedzialność za naruszenie praw osób trzecich.
              </p>
              <p>
                <strong>7.3.</strong> Usługodawca dokłada wszelkich starań dla zapewnienia bezpieczeństwa danych, jednak nie gwarantuje całkowitego zabezpieczenia przed utratą danych.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Reklamacje</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>8.1.</strong> Reklamacje można składać na adres e-mail: reklamacje@wrzucfotke.pl
              </p>
              <p>
                <strong>8.2.</strong> Reklamacja powinna zawierać opis problemu oraz dane kontaktowe.
              </p>
              <p>
                <strong>8.3.</strong> Odpowiedź na reklamację zostanie udzielona w terminie 14 dni roboczych.
              </p>
            </div>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Rozwiązanie umowy</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>9.1.</strong> Użytkownik może w każdej chwili usunąć Konto i zaprzestać korzystania z Serwisu.
              </p>
              <p>
                <strong>9.2.</strong> Usługodawca może rozwiązać umowę z Użytkownikiem w przypadku naruszenia Regulaminu.
              </p>
              <p>
                <strong>9.3.</strong> Po rozwiązaniu umowy dane Użytkownika zostaną usunięte zgodnie z Polityką Prywatności.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Postanowienia końcowe</h2>
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                <strong>10.1.</strong> Regulamin może być zmieniany. Użytkownicy zostaną poinformowani o zmianach z 7-dniowym wyprzedzeniem.
              </p>
              <p>
                <strong>10.2.</strong> W sprawach nieuregulowanych stosuje się przepisy prawa polskiego.
              </p>
              <p>
                <strong>10.3.</strong> Wszelkie spory rozstrzygane będą przez sądy właściwe dla siedziby Usługodawcy.
              </p>
              <p>
                <strong>10.4.</strong> Regulamin wchodzi w życie z dniem publikacji.
              </p>
            </div>
          </section>

          {/* Contact Info */}
          <div className="mt-12 p-6 bg-gray-50 rounded-xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">Dane kontaktowe</h3>
            <div className="space-y-2 text-gray-700">
              <p><strong>SurfingSystems.inc - Marcin Dubiński</strong></p>
              <p>NIP: 7881990815</p>
              <p>E-mail: kontakt@wrzucfotke.pl</p>
              <p>E-mail reklamacje: reklamacje@wrzucfotke.pl</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
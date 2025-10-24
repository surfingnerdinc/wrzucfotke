'use client';

import { useState } from 'react';
import { 
  XMarkIcon,
  CheckIcon,
  ArrowRightIcon,
  PlayIcon,
  DocumentTextIcon,
  CursorArrowRaysIcon
} from '@heroicons/react/24/outline';
import { 
  PhotoIcon, 
  CloudArrowDownIcon, 
  ClockIcon, 
  ShareIcon, 
  ShieldCheckIcon, 
  DevicePhoneMobileIcon,
  GlobeAltIcon,
  HeartIcon 
} from '@heroicons/react/24/outline';

interface Feature {
  icon: any;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

interface FeatureModalProps {
  feature: Feature | null;
  isOpen: boolean;
  onClose: () => void;
}

const featureDetails = {
  "Nieograniczony Upload": {
    longDescription: "Zapomniij o limitach! W WrzućFotkę.pl możesz wrzucić naprawdę wszystkie zdjęcia z Twojej imprezy.",
    benefits: [
      "Bez limitu ilości zdjęć - wrzuć ich tysiące!",
      "Bez limitu rozmiaru plików - także filmy 4K",
      "Każdy gość może dodawać bez ograniczeń",
      "Automatyczna kompresja dla szybkiego ładowania",
      "Wsparcie dla wszystkich popularnych formatów"
    ],
    howItWorks: [
      "Stwórz galerię jednym kliknięciem",
      "Udostępnij link gościom",
      "Goście przeciągają zdjęcia lub wybierają z galerii telefonu",
      "Automatyczny upload w tle - można kontynuować zabawę",
      "Wszystkie zdjęcia natychmiast widoczne dla wszystkich"
    ],
    technicalInfo: "Wykorzystujemy zaawansowane algorytmy kompresji bez straty jakości oraz CDN dla błyskawicznego uploadu z każdego miejsca na świecie.",
    callToAction: "Przetestuj nieograniczony upload"
  },
  "Pobieranie Za Darmo": {
    longDescription: "Wszystkie zdjęcia z imprezy w najwyższej jakości, zawsze za darmo. Bez ukrytych opłat, bez subskrypcji.",
    benefits: [
      "Pobieranie w oryginalnej jakości",
      "Archiwum ZIP jednym kliknięciem",
      "Indywidualne pobieranie wybranych zdjęć",
      "Bez limitów ilości pobrań",
      "Zawsze za darmo - nawet w przyszłości"
    ],
    howItWorks: [
      "Kliknij przycisk 'Pobierz wszystko'",
      "System automatycznie pakuje zdjęcia",
      "Otrzymujesz powiadomienie gdy archiwum jest gotowe",
      "Pobierz ZIP z wszystkimi zdjęciami",
      "Lub pobieraj pojedyncze zdjęcia w dowolnym momencie"
    ],
    technicalInfo: "Używamy kompresji bez strat oraz inteligentnego pakowania, które zachowuje metadane zdjęć i organizuje je w folderach według dat.",
    callToAction: "Zobacz jak szybko się pobiera"
  },
  "Długie Przechowywanie": {
    longDescription: "Twoje wspomnienia bezpieczne w chmurze przez długi czas. Wybierz pakiet dopasowany do swoich potrzeb.",
    benefits: [
      "Plan Darmowy: 30 dni przechowywania",
      "Plan Wedding: pełny rok przechowywania",
      "Plan Pro: nielimitowane przechowywanie",
      "Automatyczne kopie zapasowe",
      "Dostęp z każdego urządzenia"
    ],
    howItWorks: [
      "Wybierz odpowiedni plan przy tworzeniu galerii",
      "Zdjęcia automatycznie zabezpieczane w chmurze",
      "Otrzymujesz powiadomienia przed wygaśnięciem",
      "Możliwość przedłużenia lub upgrade'u w każdej chwili",
      "Export danych przed zakończeniem okresu"
    ],
    technicalInfo: "Twoje zdjęcia przechowywane są w profesjonalnych centrach danych z redundancją 99.99% oraz automatycznymi kopiami zapasowymi.",
    callToAction: "Zobacz plany przechowywania"
  },
  "Łatwe Udostępnianie": {
    longDescription: "Jeden link i wszyscy goście mają dostęp. Proste jak wysłanie SMS-a czy pokazanie kodu QR.",
    benefits: [
      "Jeden uniwersalny link do galerii",
      "Kod QR do wydrukowania na stołach",
      "Możliwość ustawienia hasła dla dodatkowej prywatności",
      "Bezpośrednie udostępnianie przez media społecznościowe",
      "Personalizowane linki (np. wesele-ania-tomek)"
    ],
    howItWorks: [
      "System generuje unikalny link do galerii",
      "Wyślij link SMS-em, WhatsApp lub e-mailem", 
      "Wydrukuj kod QR i postaw na stołach",
      "Goście skanują kod lub klikają link",
      "Natychmiastowy dostęp bez rejestracji"
    ],
    technicalInfo: "Linki są zabezpieczone 256-bitowym szyfrowaniem i można je w każdej chwili dezaktywować dla maksymalnej kontroli.",
    callToAction: "Wygeneruj przykładowy link"
  },
  "Prywatność i Bezpieczeństwo": {
    longDescription: "Twoje zdjęcia należą tylko do Ciebie. Pełna kontrola nad tym, kto ma dostęp i jak długo.",
    benefits: [
      "Dostęp tylko dla osób z linkiem",
      "Możliwość ustawienia hasła dodatkowego",
      "Kontrola nad pobieraniem zdjęć",
      "Usuwanie galerii w każdej chwili",
      "Zgodność z RODO i ochroną danych"
    ],
    howItWorks: [
      "Galeria domyślnie prywatna - tylko Ty masz dostęp",
      "Decydujesz komu udostępnić link",
      "Ustawiasz czy goście mogą pobierać zdjęcia",
      "Możesz wymagać podania imienia przy dodawaniu zdjęć",
      "Pełna kontrola - usunięcie usuwa wszystko bez śladu"
    ],
    technicalInfo: "Używamy szyfrowania end-to-end, bezpiecznych serwerów w UE oraz regularnych audytów bezpieczeństwa. Zgodność z RODO.",
    callToAction: "Zobacz ustawienia prywatności"
  },
  "Działa na Wszystkim": {
    longDescription: "Nie ma znaczenia jakiego urządzenia używasz - WrzućFotkę.pl działa idealnie wszędzie.",
    benefits: [
      "Responsywny design dla każdego ekranu",
      "Optymalizacja pod kątem urządzeń mobilnych",
      "Szybkie ładowanie nawet przy słabym internecie",
      "Intuicyjny interfejs na każdym urządzeniu",
      "Wsparcie dla starszych przeglądarek"
    ],
    howItWorks: [
      "Otwierasz link w dowolnej przeglądarce",
      "Interfejs automatycznie dostosowuje się do ekranu",
      "Na telefonie - proste przeciąganie z galerii",
      "Na komputerze - drag & drop lub wybieranie plików",
      "Wszystkie funkcje dostępne niezależnie od urządzenia"
    ],
    technicalInfo: "Wykorzystujemy najnowsze standardy web (PWA), adaptive loading oraz optymalizację obrazów dla różnych rozdzielczości.",
    callToAction: "Przetestuj na swoim urządzeniu"
  },
  "Bez Instalacji Aplikacji": {
    longDescription: "Wszystko dzieje się w przeglądarce. Goście nie muszą nic pobierać, instalować czy się rejestrować.",
    benefits: [
      "Działanie w każdej przeglądarce internetowej",
      "Brak konieczności instalacji aplikacji",
      "Nie wymaga rejestracji od gości", 
      "Natychmiastowy dostęp jednym kliknięciem",
      "Oszczędność miejsca na telefonie"
    ],
    howItWorks: [
      "Goście klikają w link lub skanują kod QR",
      "Przeglądarka otwiera gotową galerię", 
      "Natychmiastowy dostęp do wszystkich funkcji",
      "Upload zdjęć bezpośrednio z przeglądarki",
      "Wszystko działa jak natywna aplikacja"
    ],
    technicalInfo: "Technologia Progressive Web App (PWA) zapewnia doświadczenie porównywalne z natywnymi aplikacjami bez konieczności instalacji.",
    callToAction: "Sprawdź jak to wygląda w przeglądarce"
  },
  "Stworzone z Miłością": {
    longDescription: "Każdy detal przemyślany z myślą o ludziach, którzy kochają wspomnienia i cenią prostotę.",
    benefits: [
      "Intuicyjny interfejs - bez instrukcji obsługi",
      "Przemyślane detale UX/UI",
      "Szybka i przyjazna obsługa klienta",
      "Ciągłe ulepszenia na podstawie feedbacku",
      "Stworzony przez zespół pasjonatów fotografii"
    ],
    howItWorks: [
      "Każda funkcja testowana z prawdziwymi użytkownikami",
      "Proste kroki - od pomysłu do gotowej galerii w minutę",
      "Przyjazne komunikaty i podpowiedzi w całym procesie",
      "Bezpłatne wsparcie techniczne przy każdym planie",
      "Regularne aktualizacje i nowe funkcje"
    ],
    technicalInfo: "Projekt tworzony przez zespół z wieloletnim doświadczeniem w branży eventowej i technologicznej, z pasją do idealnego UX.",
    callToAction: "Poznaj naszą historię"
  }
};

export default function FeatureModal({ feature, isOpen, onClose }: FeatureModalProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'benefits' | 'howItWorks' | 'technical'>('overview');

  if (!isOpen || !feature) return null;

  const IconComponent = feature.icon;
  const details = featureDetails[feature.title as keyof typeof featureDetails];

  if (!details) return null;

  const tabs = [
    { id: 'overview', label: 'Przegląd', icon: DocumentTextIcon },
    { id: 'benefits', label: 'Korzyści', icon: CheckIcon },
    { id: 'howItWorks', label: 'Jak działa', icon: PlayIcon },
    { id: 'technical', label: 'Techniczne', icon: CursorArrowRaysIcon }
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl">
        
        {/* Header */}
        <div className={`relative p-8 bg-linear-to-r ${feature.color} text-white`}>
          <button
            onClick={onClose}
            className="absolute top-6 right-6 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
          
          <div className="flex items-center space-x-4 mb-4">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-sm">
              <IconComponent className="w-8 h-8 text-white" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">{feature.title}</h2>
              <p className="text-white/90 text-lg">{feature.description}</p>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex space-x-1 bg-white/20 rounded-xl p-1 backdrop-blur-sm">
            {tabs.map((tab) => {
              const TabIcon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg text-sm font-medium transition-all ${
                    activeTab === tab.id
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'text-white/80 hover:text-white hover:bg-white/10'
                  }`}
                >
                  <TabIcon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 overflow-y-auto max-h-[60vh]">
          
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">Co to oznacza dla Ciebie?</h3>
                <p className="text-lg text-gray-700 leading-relaxed">{details.longDescription}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-indigo-600 mb-2">1 min</div>
                  <div className="text-gray-600">Czas setup'u</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-green-600 mb-2">0 zł</div>
                  <div className="text-gray-600">Koszt podstawowy</div>
                </div>
                <div className="text-center p-6 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-purple-600 mb-2">∞</div>
                  <div className="text-gray-600">Możliwości</div>
                </div>
              </div>
            </div>
          )}

          {/* Benefits Tab */}
          {activeTab === 'benefits' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Główne korzyści</h3>
              <div className="space-y-4">
                {details.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="shrink-0 w-6 h-6 bg-green-100 rounded-full flex items-center justify-center mt-0.5">
                      <CheckIcon className="w-4 h-4 text-green-600" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{benefit}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-8 p-6 bg-blue-50 rounded-xl border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">💡 Wskazówka</h4>
                <p className="text-blue-800">
                  Ta funkcja jest dostępna we wszystkich planach, nawet w darmowym! 
                  Upgrade potrzebny tylko dla dodatkowych możliwości.
                </p>
              </div>
            </div>
          )}

          {/* How It Works Tab */}
          {activeTab === 'howItWorks' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Krok po kroku</h3>
              <div className="space-y-4">
                {details.howItWorks.map((step, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="shrink-0 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-700 leading-relaxed">{step}</p>
                      {index < details.howItWorks.length - 1 && (
                        <div className="mt-3 ml-4">
                          <ArrowRightIcon className="w-5 h-5 text-gray-300 transform rotate-90" />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Technical Tab */}
          {activeTab === 'technical' && (
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Jak to działa pod maską</h3>
              <div className="prose text-gray-700">
                <p className="text-lg leading-relaxed">{details.technicalInfo}</p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                <div className="p-6 border border-gray-200 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">🔒 Bezpieczeństwo</h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• Szyfrowanie SSL/TLS</li>
                    <li>• Kopie zapasowe 3x dziennie</li>
                    <li>• Monitoring 24/7</li>
                  </ul>
                </div>
                
                <div className="p-6 border border-gray-200 rounded-xl">
                  <h4 className="font-semibold text-gray-900 mb-3">⚡ Wydajność</h4>
                  <ul className="text-gray-600 text-sm space-y-2">
                    <li>• CDN w 50+ krajach</li>
                    <li>• Kompresja bez strat</li>
                    <li>• Lazy loading obrazów</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 bg-gray-50 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
            <div className="text-sm text-gray-600">
              Masz pytania? <a href="/contact" className="text-indigo-600 hover:text-indigo-800 font-medium">Skontaktuj się z nami</a>
            </div>
            <button className={`inline-flex items-center px-6 py-3 bg-linear-to-r ${feature.color} text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5`}>
              {details.callToAction}
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
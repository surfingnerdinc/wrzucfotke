'use client';

import { 
  EnvelopeIcon, 
  PhoneIcon, 
  ChatBubbleLeftRightIcon,
  MapPinIcon 
} from '@heroicons/react/24/outline';

export default function ContactSection() {
  return (
    <section className="py-24 bg-linear-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Masz <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">pytania</span>?
          </h2>
          <p className="text-xl text-gray-600 leading-relaxed">
            Jesteśmy tu, żeby pomóc! Skontaktuj się z nami w dowolny sposób. 
            Odpowiadamy szybko i chętnie doradzamy w wyborze najlepszego planu dla Twojego wydarzenia.
          </p>
        </div>

        {/* Contact Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          
          {/* Email */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-linear-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <EnvelopeIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Email</h3>
            <p className="text-gray-600 mb-4">Napisz do nas</p>
            <a 
              href="mailto:kontakt@wrzucfotke.pl"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              kontakt@wrzucfotke.pl
            </a>
            <p className="text-sm text-gray-500 mt-2">Odpowiedź w 24h</p>
          </div>

          {/* Phone */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <PhoneIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Telefon</h3>
            <p className="text-gray-600 mb-4">Zadzwoń do nas</p>
            <a 
              href="tel:+48123456789"
              className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold"
            >
              +48 123 456 789
            </a>
            <p className="text-sm text-gray-500 mt-2">Pn-Pt 9:00-18:00</p>
          </div>

          {/* Live Chat */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Chat na żywo</h3>
            <p className="text-gray-600 mb-4">Porozmawiaj z nami</p>
            <button className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-semibold">
              Rozpocznij czat
            </button>
            <p className="text-sm text-gray-500 mt-2">Online teraz!</p>
          </div>

          {/* Office */}
          <div className="text-center group">
            <div className="w-16 h-16 bg-linear-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4 transform group-hover:scale-110 transition-transform duration-300">
              <MapPinIcon className="w-8 h-8 text-white" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Biuro</h3>
            <p className="text-gray-600 mb-4">Odwiedź nas</p>
            <p className="text-indigo-600 font-semibold">
              Warszawa, Polska
            </p>
            <p className="text-sm text-gray-500 mt-2">Po umówieniu</p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-linear-to-r from-indigo-50 to-purple-50 rounded-3xl p-8 lg:p-12 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
            Potrzebujesz pomocy w wyborze planu?
          </h3>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Nasz zespół z radością pomoże Ci dobrać idealny pakiet dla Twojego wydarzenia. 
            Napisz lub zadzwoń - doradzimy i odpowiemy na wszystkie pytania!
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center px-8 py-4 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
            >
              Napisz do nas
              <EnvelopeIcon className="w-5 h-5 ml-2" />
            </a>
            
            <a
              href="tel:+48123456789"
              className="inline-flex items-center px-8 py-4 bg-white text-gray-700 border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
            >
              Zadzwoń teraz
              <PhoneIcon className="w-5 h-5 ml-2" />
            </a>
          </div>
        </div>

        {/* FAQ Quick Links */}
        <div className="mt-16 text-center">
          <h4 className="text-lg font-semibold text-gray-900 mb-6">
            Najczęściej zadawane pytania:
          </h4>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/faq#pricing" className="px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-sm">
              Ile kosztuje galeria?
            </a>
            <a href="/faq#storage" className="px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-sm">
              Jak długo przechowujecie zdjęcia?
            </a>
            <a href="/faq#limits" className="px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-sm">
              Czy są limity zdjęć?
            </a>
            <a href="/faq#privacy" className="px-4 py-2 bg-white rounded-full border border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors text-sm">
              Czy zdjęcia są bezpieczne?
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
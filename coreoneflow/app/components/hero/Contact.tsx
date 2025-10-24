'use client';

import React, { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-24 bg-gray-900">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Info */}
            <div>
              <div className="inline-flex items-center bg-purple-500/10 border border-purple-500/20 rounded-full px-4 py-2 mb-8">
                <span className="text-purple-400 mr-2">📞</span>
                <span className="text-purple-300 text-sm font-medium">Kontakt</span>
              </div>
              
              <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6">
                Porozmawiajmy o Twoim
                <span className="bg-linear-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent"> biznesie</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-12">
                Gotowi jesteśmy pomóc Ci w transformacji cyfrowej Twojej firmy. 
                Skontaktuj się z nami, aby dowiedzieć się więcej o Core One Flow.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-purple-400 text-xl">📧</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Email</h3>
                    <p className="text-gray-300">kontakt@coreoneflow.pl</p>
                    <p className="text-gray-400 text-sm">Odpowiadamy w ciągu 2 godzin</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-cyan-400 text-xl">📱</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Telefon</h3>
                    <p className="text-gray-300">+48 123 456 789</p>
                    <p className="text-gray-400 text-sm">Poniedziałek - Piątek, 9:00 - 18:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-purple-400 text-xl">🏢</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Biuro</h3>
                    <p className="text-gray-300">ul. Technologiczna 1<br />00-000 Warszawa</p>
                    <p className="text-gray-400 text-sm">Wizyta po umówieniu</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center shrink-0">
                    <span className="text-cyan-400 text-xl">💬</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold mb-2">Live Chat</h3>
                    <p className="text-gray-300">Dostępny na stronie</p>
                    <p className="text-gray-400 text-sm">Natychmiastowa pomoc</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/10 p-8">
              <h3 className="text-2xl font-bold text-white mb-6">Wyślij wiadomość</h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-gray-300 text-sm font-medium mb-2">
                      Imię i nazwisko *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                      placeholder="Jan Kowalski"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-300 text-sm font-medium mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors"
                      placeholder="jan@firma.pl"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="company" className="block text-gray-300 text-sm font-medium mb-2">
                    Nazwa firmy
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-purple-400 focus:ring-1 focus:ring-purple-400 transition-colors"
                    placeholder="Moja Firma Sp. z o.o."
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-gray-300 text-sm font-medium mb-2">
                    Wiadomość *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:border-cyan-400 focus:ring-1 focus:ring-cyan-400 transition-colors resize-none"
                    placeholder="Opowiedz nam o swoich potrzebach..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-linear-to-r from-purple-500 to-cyan-500 text-white py-4 px-6 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  Wyślij wiadomość
                </button>

                <p className="text-gray-400 text-sm text-center">
                  Wysyłając formularz akceptujesz naszą{' '}
                  <a href="#" className="text-purple-400 hover:underline">politykę prywatności</a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
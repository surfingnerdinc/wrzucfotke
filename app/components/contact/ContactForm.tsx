'use client';

import { useState } from 'react';
import { 
  EnvelopeIcon, 
  PhoneIcon, 
  UserIcon, 
  PaperAirplaneIcon,
  MapPinIcon,
  ClockIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  eventType: string;
  eventDate: string;
  guestCount: string;
  message: string;
}

interface ContactFormErrors {
  name?: string;
  email?: string;
  phone?: string;
  eventType?: string;
  eventDate?: string;
  message?: string;
  submit?: string;
}

export default function ContactForm({ compact = false }: { compact?: boolean }) {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    eventDate: '',
    guestCount: '',
    message: ''
  });
  
  const [errors, setErrors] = useState<ContactFormErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const eventTypes = [
    { value: 'wesele', label: '💒 Wesele' },
    { value: 'komunia', label: '🕊️ Komunia' },
    { value: 'urodziny', label: '🎂 Urodziny' },
    { value: 'rocznica', label: '💕 Rocznica' },
    { value: 'chrzciny', label: '👶 Chrzciny' },
    { value: 'jubileusz', label: '🏆 Jubileusz' },
    { value: 'inne', label: '🎉 Inne' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof ContactFormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): ContactFormErrors => {
    const newErrors: ContactFormErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Imię i nazwisko jest wymagane';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Nieprawidłowy format email';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Telefon jest wymagany';
    }
    
    if (!formData.eventType) {
      newErrors.eventType = 'Wybierz rodzaj wydarzenia';
    }
    
    if (!formData.eventDate) {
      newErrors.eventDate = 'Data wydarzenia jest wymagana';
    }
    
    if (!formData.message.trim()) {
      newErrors.message = 'Wiadomość jest wymagana';
    }
    
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors = validateForm();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Symulacja wysyłania formularza
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      console.log('Contact form data:', formData);
      
      setIsSubmitted(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        eventDate: '',
        guestCount: '',
        message: ''
      });
      
    } catch (error) {
      setErrors({ submit: 'Wystąpił błąd. Spróbuj ponownie lub zadzwoń do nas.' });
    } finally {
      setIsLoading(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className={`${compact ? 'bg-white rounded-2xl p-6 shadow-lg' : 'min-h-screen bg-linear-to-br from-green-50 to-blue-50 flex items-center justify-center px-4'}`}>
        <div className="text-center max-w-md mx-auto">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <HeartIcon className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-4">
            Dziękujemy! 💕
          </h3>
          <p className="text-gray-600 mb-6">
            Twoja wiadomość została wysłana. Skontaktujemy się z Tobą w ciągu 24 godzin 
            z ofertą dopasowaną do Twojego wydarzenia.
          </p>
          <button 
            onClick={() => setIsSubmitted(false)}
            className="inline-flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
          >
            Wyślij kolejną wiadomość
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className={compact ? '' : 'min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center py-16'}>
      
      {!compact && (
        <>
          {/* Background Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-br from-pink-400 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-linear-to-br from-blue-400 to-cyan-600 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>
        </>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          
          {/* Left Column - Info */}
          <div className={compact ? 'hidden' : ''}>
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                Skontaktuj się <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">z nami</span>
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Pomożemy Ci stworzyć idealną galerię na Twoje wydarzenie. 
                Skontaktuj się z nami, a przygotujemy ofertę dopasowaną do Twoich potrzeb!
              </p>

              {/* Contact Info */}
              <div className="space-y-6">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <EnvelopeIcon className="w-6 h-6 text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Email</h4>
                    <p className="text-gray-600">kontakt@wrzucfotke.pl</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                    <PhoneIcon className="w-6 h-6 text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Telefon</h4>
                    <p className="text-gray-600">+48 123 456 789</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                    <ClockIcon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Godziny pracy</h4>
                    <p className="text-gray-600">Pn-Pt: 9:00-18:00</p>
                    <p className="text-gray-600">So-Nd: 10:00-16:00</p>
                  </div>
                </div>

                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <MapPinIcon className="w-6 h-6 text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">Lokalizacja</h4>
                    <p className="text-gray-600">Warszawa, Polska</p>
                  </div>
                </div>
              </div>

              {/* Response Time */}
              <div className="mt-8 bg-linear-to-r from-green-50 to-blue-50 rounded-2xl p-6">
                <h4 className="font-semibold text-gray-900 mb-2">⚡ Szybka odpowiedź</h4>
                <p className="text-gray-600 text-sm">
                  Odpowiadamy na wszystkie zapytania w ciągu 24 godzin. 
                  W pilnych sprawach dzwońcie - odbieramy telefony codziennie!
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Form */}
          <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
            
            {compact && (
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">
                  Skontaktuj się z nami
                </h3>
                <p className="text-gray-600">
                  Pomożemy Ci stworzyć idealną galerię
                </p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Imię i nazwisko *
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <UserIcon className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.name 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-indigo-500'
                    }`}
                    placeholder="Anna Kowalska"
                  />
                </div>
                {errors.name && (
                  <p className="mt-2 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              {/* Email & Phone Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <EnvelopeIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                        errors.email 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-indigo-500'
                      }`}
                      placeholder="anna@email.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-2 text-sm text-red-600">{errors.email}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Telefon *
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <PhoneIcon className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                        errors.phone 
                          ? 'border-red-300 focus:border-red-500' 
                          : 'border-gray-200 focus:border-indigo-500'
                      }`}
                      placeholder="+48 123 456 789"
                    />
                  </div>
                  {errors.phone && (
                    <p className="mt-2 text-sm text-red-600">{errors.phone}</p>
                  )}
                </div>
              </div>

              {/* Event Type & Date Row */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Rodzaj wydarzenia *
                  </label>
                  <select
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.eventType 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-indigo-500'
                    }`}
                  >
                    <option value="">Wybierz rodzaj wydarzenia</option>
                    {eventTypes.map((type) => (
                      <option key={type.value} value={type.value}>
                        {type.label}
                      </option>
                    ))}
                  </select>
                  {errors.eventType && (
                    <p className="mt-2 text-sm text-red-600">{errors.eventType}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Data wydarzenia *
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split('T')[0]}
                    className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                      errors.eventDate 
                        ? 'border-red-300 focus:border-red-500' 
                        : 'border-gray-200 focus:border-indigo-500'
                    }`}
                  />
                  {errors.eventDate && (
                    <p className="mt-2 text-sm text-red-600">{errors.eventDate}</p>
                  )}
                </div>
              </div>

              {/* Guest Count */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Liczba gości (orientacyjnie)
                </label>
                <input
                  type="text"
                  name="guestCount"
                  value={formData.guestCount}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-0 focus:border-indigo-500 transition-colors"
                  placeholder="np. 50-100 osób"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Wiadomość *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className={`w-full px-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                    errors.message 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-indigo-500'
                  }`}
                  placeholder="Opowiedz nam o swoim wydarzeniu. Jakie masz oczekiwania? Masz jakieś specjalne wymagania?"
                />
                {errors.message && (
                  <p className="mt-2 text-sm text-red-600">{errors.message}</p>
                )}
              </div>

              {/* Submit Error */}
              {errors.submit && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <p className="text-sm text-red-600">{errors.submit}</p>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full flex items-center justify-center px-6 py-4 text-lg font-semibold text-white rounded-xl transition-all duration-300 ${
                  isLoading
                    ? 'bg-gray-400 cursor-not-allowed'
                    : 'bg-linear-to-r from-indigo-600 to-purple-600 hover:shadow-xl transform hover:-translate-y-1'
                }`}
              >
                {isLoading ? (
                  <div className="flex items-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Wysyłamy...
                  </div>
                ) : (
                  <>
                    Wyślij wiadomość
                    <PaperAirplaneIcon className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>

              {/* Privacy Note */}
              <p className="text-xs text-gray-500 text-center">
                Wysyłając formularz akceptujesz naszą{' '}
                <a href="/privacy" className="text-indigo-600 hover:underline">
                  politykę prywatności
                </a>
                . Twoje dane są w pełni bezpieczne.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
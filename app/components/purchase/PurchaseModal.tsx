'use client';

import { useState } from 'react';
import { XMarkIcon, BuildingOfficeIcon, UserIcon } from '@heroicons/react/24/outline';

interface PurchaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPlan: {
    name: string;
    price: { monthly: number; annual: number };
    subtitle: string;
  } | null;
  isAnnual: boolean;
}

export default function PurchaseModal({ isOpen, onClose, selectedPlan, isAnnual }: PurchaseModalProps) {
  const [step, setStep] = useState<'customer-type' | 'personal-form' | 'company-form' | 'payment'>('customer-type');
  const [customerType, setCustomerType] = useState<'personal' | 'company' | null>(null);
  const [formData, setFormData] = useState({
    // Personal data
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    // Company data
    companyName: '',
    nip: '',
    address: '',
    postalCode: '',
    city: '',
    
    // Billing
    agreeToTerms: false,
    newsletter: false
  });

  if (!isOpen || !selectedPlan) return null;

  const price = isAnnual ? selectedPlan.price.annual : selectedPlan.price.monthly;
  const period = isAnnual ? 'rocznie' : 'miesięcznie';

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCustomerTypeSelect = (type: 'personal' | 'company') => {
    setCustomerType(type);
    setStep(type === 'personal' ? 'personal-form' : 'company-form');
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('payment');
  };

  const handlePayment = (method: 'paypal' | 'card' | 'transfer' | 'blik') => {
    // In production, this would integrate with actual payment providers
    const orderData = {
      plan: selectedPlan?.name,
      price: price,
      period: period,
      customerType: customerType,
      customerData: formData
    };

    // Store order data in localStorage for testing
    localStorage.setItem('pendingOrder', JSON.stringify(orderData));

    switch (method) {
      case 'paypal':
        // Simulate PayPal redirect
        setTimeout(() => {
          window.location.href = '/purchase/success';
        }, 1000);
        break;
      
      case 'card':
        // Simulate Stripe/card processor redirect
        setTimeout(() => {
          // 90% success rate for demo
          if (Math.random() > 0.1) {
            window.location.href = '/purchase/success';
          } else {
            window.location.href = '/purchase/error';
          }
        }, 2000);
        break;
      
      case 'transfer':
        // Simulate bank transfer
        setTimeout(() => {
          window.location.href = '/purchase/success';
        }, 1500);
        break;
      
      case 'blik':
        // Simulate BLIK
        setTimeout(() => {
          window.location.href = '/purchase/success';
        }, 1200);
        break;
    }

    // Show loading state
    alert(`Przekierowywanie do ${method === 'paypal' ? 'PayPal' : method === 'card' ? 'płatności kartą' : method === 'blik' ? 'BLIK' : 'przelewu'}...`);
  };

  const validateNIP = (nip: string) => {
    // Basic NIP validation (10 digits)
    return /^\d{10}$/.test(nip.replace(/[-\s]/g, ''));
  };

  const isFormValid = () => {
    if (customerType === 'personal') {
      return formData.firstName && formData.lastName && formData.email && formData.phone && formData.agreeToTerms;
    } else {
      return formData.companyName && formData.nip && formData.email && formData.address && 
             formData.postalCode && formData.city && formData.agreeToTerms && validateNIP(formData.nip);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-8 py-6 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                Zakup planu {selectedPlan.name}
              </h2>
              <p className="text-gray-600 mt-1">
                {price > 0 ? `${price} zł ${period}` : 'Bezpłatny'}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <XMarkIcon className="w-6 h-6 text-gray-500" />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center mt-6 space-x-4">
            <div className={`flex items-center ${step !== 'customer-type' ? 'text-green-600' : 'text-indigo-600'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step !== 'customer-type' ? 'bg-green-100' : 'bg-indigo-100'
              }`}>
                1
              </div>
              <span className="ml-2 text-sm font-medium">Typ klienta</span>
            </div>
            
            <div className="flex-1 h-px bg-gray-200"></div>
            
            <div className={`flex items-center ${
              step === 'personal-form' || step === 'company-form' ? 'text-indigo-600' : 
              step === 'payment' ? 'text-green-600' : 'text-gray-400'
            }`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === 'personal-form' || step === 'company-form' ? 'bg-indigo-100' :
                step === 'payment' ? 'bg-green-100' : 'bg-gray-100'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium">Dane</span>
            </div>
            
            <div className="flex-1 h-px bg-gray-200"></div>
            
            <div className={`flex items-center ${step === 'payment' ? 'text-indigo-600' : 'text-gray-400'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                step === 'payment' ? 'bg-indigo-100' : 'bg-gray-100'
              }`}>
                3
              </div>
              <span className="ml-2 text-sm font-medium">Płatność</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-8">
          
          {/* Step 1: Customer Type Selection */}
          {step === 'customer-type' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Kim jesteś?
                </h3>
                <p className="text-gray-600">
                  Wybierz czy kupujesz jako osoba prywatna czy firma
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Personal Customer */}
                <button
                  onClick={() => handleCustomerTypeSelect('personal')}
                  className="group p-8 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 text-left"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 group-hover:bg-blue-200 rounded-full flex items-center justify-center transition-colors">
                      <UserIcon className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Osoba prywatna
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Kupujesz dla siebie. Otrzymasz rachunek bez VAT.
                  </p>
                  <ul className="mt-4 text-sm text-gray-500 space-y-1">
                    <li>• Szybsza rejestracja</li>
                    <li>• Brak wymaganych danych firmy</li>
                    <li>• Rachunek na osobę prywatną</li>
                  </ul>
                </button>

                {/* Company Customer */}
                <button
                  onClick={() => handleCustomerTypeSelect('company')}
                  className="group p-8 border-2 border-gray-200 rounded-xl hover:border-indigo-300 hover:bg-indigo-50 transition-all duration-300 text-left"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-full flex items-center justify-center transition-colors">
                      <BuildingOfficeIcon className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">
                    Firma
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Kupujesz na firmę. Otrzymasz fakturę VAT.
                  </p>
                  <ul className="mt-4 text-sm text-gray-500 space-y-1">
                    <li>• Faktura VAT</li>
                    <li>• Możliwość rozliczenia w kosztach</li>
                    <li>• Wymagane dane firmy i NIP</li>
                  </ul>
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Personal Form */}
          {step === 'personal-form' && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Twoje dane
                </h3>
                <p className="text-gray-600">
                  Podaj swoje dane do wystawienia rachunku
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Imię *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.firstName}
                    onChange={(e) => handleInputChange('firstName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Jan"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nazwisko *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.lastName}
                    onChange={(e) => handleInputChange('lastName', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Kowalski"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="jan@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Telefon *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="+48 123 456 789"
                />
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="terms" className="ml-3 text-sm text-gray-600">
                    Akceptuję{' '}
                    <a href="/terms" className="text-indigo-600 hover:text-indigo-500 underline">
                      regulamin serwisu
                    </a>{' '}
                    oraz{' '}
                    <a href="/privacy" className="text-indigo-600 hover:text-indigo-500 underline">
                      politykę prywatności
                    </a>
                    *
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter"
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="newsletter" className="ml-3 text-sm text-gray-600">
                    Chcę otrzymywać newsletter z informacjami o nowych funkcjach
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setStep('customer-type')}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Wstecz
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Dalej
                </button>
              </div>
            </form>
          )}

          {/* Step 3: Company Form */}
          {step === 'company-form' && (
            <form onSubmit={handleFormSubmit} className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Dane firmy
                </h3>
                <p className="text-gray-600">
                  Podaj dane firmy do wystawienia faktury VAT
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nazwa firmy *
                </label>
                <input
                  type="text"
                  required
                  value={formData.companyName}
                  onChange={(e) => handleInputChange('companyName', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="Example Sp. z o.o."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  NIP *
                </label>
                <input
                  type="text"
                  required
                  value={formData.nip}
                  onChange={(e) => handleInputChange('nip', e.target.value)}
                  className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent ${
                    formData.nip && !validateNIP(formData.nip) ? 'border-red-300' : 'border-gray-300'
                  }`}
                  placeholder="1234567890"
                />
                {formData.nip && !validateNIP(formData.nip) && (
                  <p className="text-red-500 text-sm mt-1">Nieprawidłowy format NIP</p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="firma@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Adres *
                </label>
                <input
                  type="text"
                  required
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="ul. Przykładowa 123"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Kod pocztowy *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.postalCode}
                    onChange={(e) => handleInputChange('postalCode', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="00-000"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Miasto *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                    placeholder="Warszawa"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="space-y-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms-company"
                    checked={formData.agreeToTerms}
                    onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="terms-company" className="ml-3 text-sm text-gray-600">
                    Akceptuję{' '}
                    <a href="/terms" className="text-indigo-600 hover:text-indigo-500 underline">
                      regulamin serwisu
                    </a>{' '}
                    oraz{' '}
                    <a href="/privacy" className="text-indigo-600 hover:text-indigo-500 underline">
                      politykę prywatności
                    </a>
                    *
                  </label>
                </div>

                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="newsletter-company"
                    checked={formData.newsletter}
                    onChange={(e) => handleInputChange('newsletter', e.target.checked)}
                    className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
                  />
                  <label htmlFor="newsletter-company" className="ml-3 text-sm text-gray-600">
                    Chcę otrzymywać newsletter z informacjami o nowych funkcjach
                  </label>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setStep('customer-type')}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Wstecz
                </button>
                <button
                  type="submit"
                  disabled={!isFormValid()}
                  className="flex-1 py-3 px-6 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Dalej
                </button>
              </div>
            </form>
          )}

          {/* Step 4: Payment */}
          {step === 'payment' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  Płatność
                </h3>
                <p className="text-gray-600">
                  Wybierz metodę płatności i dokończ zakup
                </p>
              </div>

              {/* Order Summary */}
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold text-gray-900 mb-4">Podsumowanie zamówienia</h4>
                
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Plan:</span>
                    <span className="font-medium">{selectedPlan.name}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Okres:</span>
                    <span className="font-medium">{isAnnual ? 'Roczny' : 'Miesięczny'}</span>
                  </div>
                  
                  <div className="flex justify-between">
                    <span className="text-gray-600">Typ klienta:</span>
                    <span className="font-medium">{customerType === 'company' ? 'Firma' : 'Osoba prywatna'}</span>
                  </div>
                  
                  {customerType === 'company' && (
                    <>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cena netto:</span>
                        <span className="font-medium">{(price / 1.23).toFixed(2)} zł</span>
                      </div>
                      
                      <div className="flex justify-between">
                        <span className="text-gray-600">VAT 23%:</span>
                        <span className="font-medium">{(price - price / 1.23).toFixed(2)} zł</span>
                      </div>
                    </>
                  )}
                  
                  <div className="border-t border-gray-300 pt-3">
                    <div className="flex justify-between">
                      <span className="text-lg font-semibold text-gray-900">Razem:</span>
                      <span className="text-lg font-semibold text-gray-900">{price} zł</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Wybierz metodę płatności:</h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <button 
                    onClick={() => handlePayment('paypal')}
                    className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-all"
                  >
                    <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h8.418c2.508 0 4.286 1.708 4.286 4.109 0 2.401-1.778 4.109-4.286 4.109H9.87l-.585 3.424h2.297c2.508 0 4.286 1.708 4.286 4.109 0 2.401-1.778 4.109-4.286 4.109H7.076z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">PayPal</div>
                      <div className="text-sm text-gray-500">Szybka i bezpieczna płatność</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => handlePayment('card')}
                    className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-green-300 hover:bg-green-50 transition-all"
                  >
                    <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Karta płatnicza</div>
                      <div className="text-sm text-gray-500">Visa, Mastercard</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => handlePayment('transfer')}
                    className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                  >
                    <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">Przelew bankowy</div>
                      <div className="text-sm text-gray-500">Tradycyjna płatność</div>
                    </div>
                  </button>

                  <button 
                    onClick={() => handlePayment('blik')}
                    className="flex items-center p-4 border border-gray-300 rounded-lg hover:border-red-300 hover:bg-red-50 transition-all"
                  >
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <svg className="w-6 h-6 text-red-600" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                      </svg>
                    </div>
                    <div className="text-left">
                      <div className="font-medium text-gray-900">BLIK</div>
                      <div className="text-sm text-gray-500">Kod z aplikacji bankowej</div>
                    </div>
                  </button>
                </div>
              </div>

              <div className="flex gap-4 pt-6">
                <button
                  type="button"
                  onClick={() => setStep(customerType === 'personal' ? 'personal-form' : 'company-form')}
                  className="flex-1 py-3 px-6 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Wstecz
                </button>
                <div className="flex-1 text-right">
                  <p className="text-sm text-gray-500 mb-2">Wybierz metodę płatności powyżej</p>
                  <p className="text-lg font-semibold text-gray-900">Razem: {price} zł</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
'use client';
import Link from 'next/link';

import { useState } from 'react';
import { 
  HeartIcon, 
  KeyIcon, 
  UserIcon, 
  ArrowRightIcon,
  EyeIcon,
  EyeSlashIcon
} from '@heroicons/react/24/outline';

interface FormData {
  brideFirstName: string;
  groomFirstName: string;
  uniqueKey: string;
}

interface FormErrors {
  brideFirstName?: string;
  groomFirstName?: string;
  uniqueKey?: string;
  submit?: string;
}

export default function LoginForm() {
  const [formData, setFormData] = useState<FormData>({
    brideFirstName: '',
    groomFirstName: '',
    uniqueKey: ''
  });
  const [showKey, setShowKey] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    
    if (!formData.brideFirstName.trim()) {
      newErrors.brideFirstName = 'Imię panny młodej jest wymagane';
    }
    
    if (!formData.groomFirstName.trim()) {
      newErrors.groomFirstName = 'Imię pana młodego jest wymagane';
    }
    
    if (!formData.uniqueKey.trim()) {
      newErrors.uniqueKey = 'Unikalny klucz jest wymagany';
    } else if (formData.uniqueKey.length < 8) {
      newErrors.uniqueKey = 'Klucz musi mieć co najmniej 8 znaków';
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
      // Symulacja API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Tu będzie logika sprawdzania klucza i przekierowania do galerii
      console.log('Login data:', formData);
      
      // Po udanej weryfikacji przekieruj do galerii
      // window.location.href = `/gallery/${uid}`;
      
    } catch (error) {
      setErrors({ submit: 'Nieprawidłowy klucz lub dane. Spróbuj ponownie.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center px-4 py-8">
      
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-br from-pink-400 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-linear-to-br from-blue-400 to-cyan-600 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>

      <div className="relative w-full max-w-md">
        
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl mb-4">
            <HeartIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            <Link href="/" className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              WrzućFotkę.pl
            </Link>
          </h1>
          <p className="text-gray-600">
            Witaj w swojej galerii ślubnej! 💕
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-gray-100">
          
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Dostęp do galerii
            </h2>
            <p className="text-gray-600">
              Podaj dane wesela i klucz dostępu
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Bride Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Imię panny młodej
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="brideFirstName"
                  value={formData.brideFirstName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                    errors.brideFirstName 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-indigo-500'
                  }`}
                  placeholder="np. Anna"
                />
              </div>
              {errors.brideFirstName && (
                <p className="mt-2 text-sm text-red-600">{errors.brideFirstName}</p>
              )}
            </div>

            {/* Groom Name */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Imię pana młodego
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <UserIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  name="groomFirstName"
                  value={formData.groomFirstName}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                    errors.groomFirstName 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-indigo-500'
                  }`}
                  placeholder="np. Tomek"
                />
              </div>
              {errors.groomFirstName && (
                <p className="mt-2 text-sm text-red-600">{errors.groomFirstName}</p>
              )}
            </div>

            {/* Unique Key */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Unikalny klucz dostępu
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <KeyIcon className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showKey ? 'text' : 'password'}
                  name="uniqueKey"
                  value={formData.uniqueKey}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-0 transition-colors ${
                    errors.uniqueKey 
                      ? 'border-red-300 focus:border-red-500' 
                      : 'border-gray-200 focus:border-indigo-500'
                  }`}
                  placeholder="Klucz otrzymany od organizatora"
                />
                <button
                  type="button"
                  onClick={() => setShowKey(!showKey)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showKey ? (
                    <EyeSlashIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-400 hover:text-gray-600" />
                  )}
                </button>
              </div>
              {errors.uniqueKey && (
                <p className="mt-2 text-sm text-red-600">{errors.uniqueKey}</p>
              )}
              <p className="mt-2 text-xs text-gray-500">
                Klucz otrzymałeś/aś w wiadomości lub na zaproszeniu
              </p>
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
                  Sprawdzam dostęp...
                </div>
              ) : (
                <>
                  Wejdź do galerii
                  <ArrowRightIcon className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </form>

          {/* Help Section */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500 mb-4">
              Nie masz klucza dostępu?
            </p>
            <button className="inline-flex items-center text-sm text-indigo-600 hover:text-indigo-800 font-medium">
              Skontaktuj się z organizatorem
              <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-8">
          <p className="text-sm text-gray-500">
            Bezpieczny dostęp do Waszych wspomnień
          </p>
        </div>
      </div>
    </div>
  );
}
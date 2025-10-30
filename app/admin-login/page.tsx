'use client';

import { useState } from 'react';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';

export default function AdminLoginPage() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    // Simple password check for demo
    if (password === 'admin123') {
      // Set cookie and redirect
      document.cookie = 'admin-authenticated=true; path=/; max-age=86400'; // 24 hours
      
      // Get redirect URL from query params
      const urlParams = new URLSearchParams(window.location.search);
      const redirect = urlParams.get('redirect') || '/a';
      
      window.location.href = redirect;
    } else {
      setError('Nieprawidłowe hasło');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-red-50 via-white to-orange-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        
        {/* Login Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-red-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-white font-bold text-2xl">A</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Panel Admina</h1>
            <p className="text-gray-600 mt-2">Zaloguj się aby uzyskać dostęp</p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-6">
            
            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Hasło administratora
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-transparent"
                  placeholder="Wprowadź hasło admina"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? (
                    <EyeSlashIcon className="w-5 h-5" />
                  ) : (
                    <EyeIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading || !password}
              className="w-full px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? 'Logowanie...' : 'Zaloguj się'}
            </button>
          </form>

          {/* Demo Info */}
          <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
            <div className="text-sm text-yellow-800">
              <strong>Demo:</strong> Hasło to <code className="bg-yellow-100 px-2 py-1 rounded">admin123</code>
            </div>
          </div>

          {/* Footer */}
          <div className="mt-8 text-center">
            <a 
              href="/"
              className="text-gray-500 hover:text-gray-700 text-sm transition-colors"
            >
              ← Wróć do strony głównej
            </a>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>🔒 Bezpieczne logowanie SSL</p>
          <p>Panel admina WrzućFotkę.pl</p>
        </div>
      </div>
    </div>
  );
}
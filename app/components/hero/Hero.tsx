'use client';

import { useState } from 'react';
import { ArrowRightIcon, PhotoIcon, CloudArrowDownIcon, ClockIcon, ShareIcon } from '@heroicons/react/24/outline';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section className="relative overflow-hidden bg-linear-to-br from-indigo-50 via-white to-cyan-50 min-h-screen flex items-center">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-br from-pink-400 to-purple-600 rounded-full blur-xl opacity-20 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-linear-to-br from-blue-400 to-cyan-600 rounded-full blur-xl opacity-20 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left Column - Content */}
          <div className="space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-linear-to-r from-indigo-100 to-purple-100 text-indigo-700 text-sm font-medium">
              <PhotoIcon className="w-4 h-4 mr-2" />
              Najłatwiejszy sposób na zdjęcia z imprez
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                WrzućFotkę.pl
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-gray-700">
                Zbierz wszystkie zdjęcia w jednym miejscu! 📸
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              Koniec z gonitwą za zdjęciami od gości! Stwórz dedykowaną galerię na wesele, 
              komunię czy urodziny. Goście wrzucają fotki, Ty pobierasz wszystko jednym klikiem.
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex items-center space-x-3">
                <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <PhotoIcon className="w-5 h-5 text-green-600" />
                </div>
                <span className="text-gray-700 font-medium">Nieograniczony upload</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <CloudArrowDownIcon className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700 font-medium">Pobierz wszystko za darmo</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <ClockIcon className="w-5 h-5 text-purple-600" />
                </div>
                <span className="text-gray-700 font-medium">30-365 dni przechowywania</span>
              </div>
              
              <div className="flex items-center space-x-3">
                <div className="shrink-0 w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <ShareIcon className="w-5 h-5 text-pink-600" />
                </div>
                <span className="text-gray-700 font-medium">Łatwe udostępnienie</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                Stwórz galerię za darmo
                <ArrowRightIcon className={`w-5 h-5 ml-2 transition-transform duration-300 ${isHovered ? 'translate-x-1' : ''}`} />
              </button>
              
              <a 
                href="/login"
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-gray-700 bg-white border-2 border-gray-200 rounded-xl hover:bg-gray-50 hover:border-gray-300 transition-all duration-300"
              >
                Mam już dostęp
              </a>
            </div>

            {/* Trust Indicators */}
            <div className="flex items-center space-x-6 pt-8 border-t border-gray-200">
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">1000+</div>
                <div className="text-sm text-gray-600">Imprez</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">50k+</div>
                <div className="text-sm text-gray-600">Zdjęć</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900">99.9%</div>
                <div className="text-sm text-gray-600">Uptime</div>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative">
            {/* Phone Mockup */}
            <div className="relative mx-auto w-80 h-[600px] bg-gray-900 rounded-[3rem] p-2 shadow-2xl">
              <div className="w-full h-full bg-white rounded-[2.5rem] overflow-hidden relative">
                {/* Status Bar */}
                <div className="h-8 bg-gray-900 flex items-center justify-center">
                  <div className="w-24 h-1 bg-gray-400 rounded-full"></div>
                </div>
                
                {/* Browser Bar */}
                <div className="bg-gray-100 border-b border-gray-200 px-4 py-2 flex items-center space-x-2">
                  {/* Browser Buttons */}
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-red-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                  </div>
                  
                  {/* URL Bar */}
                  <div className="flex-1 bg-white rounded-full px-3 py-1 flex items-center">
                    <div className="w-3 h-3 mr-2">
                      <svg viewBox="0 0 24 24" fill="none" className="w-full h-full text-green-600">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span className="text-xs text-gray-700 font-medium truncate">
                      https://wrzucfotke.pl
                    </span>
                  </div>
                </div>
                
                {/* App Content */}
                <div className="p-4 space-y-3">
                  {/* Header */}
                  <div className="text-center">
                    <h3 className="text-lg font-bold text-gray-900">Wesele Ania & Tomek 💕</h3>
                    <p className="text-sm text-gray-600">12 października 2024</p>
                  </div>
                  
                  {/* Upload Area */}
                  <div className="bg-linear-to-br from-indigo-50 to-purple-50 border-2 border-dashed border-indigo-300 rounded-xl p-4 text-center">
                    <PhotoIcon className="w-6 h-6 text-indigo-600 mx-auto mb-2" />
                    <p className="text-sm font-medium text-indigo-900">Wrzuć swoje zdjęcia</p>
                    <p className="text-xs text-indigo-700">lub kliknij aby wybrać</p>
                  </div>
                  
                  {/* Photo Grid */}
                  <div className="grid grid-cols-3 gap-2">
                    {[1,2,3,4,5,6].map((i) => (
                      <div key={i} className="aspect-square bg-linear-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
                        <img
                          src={`https://picsum.photos/200/200?random=${i}`}
                          alt={`Zdjęcie ${i}`}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  
                  {/* Stats */}
                  <div className="bg-gray-50 rounded-xl p-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Zdjęć dodanych:</span>
                      <span className="font-semibold text-gray-900">247</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">Goście:</span>
                      <span className="font-semibold text-gray-900">43</span>
                    </div>
                  </div>
                  
                  {/* Download Button */}
                  <button className="w-full bg-linear-to-r from-green-500 to-green-600 text-white font-semibold py-3 rounded-xl">
                    Pobierz wszystkie (2.1 GB)
                  </button>
                </div>
              </div>
            </div>
            
            {/* Floating Cards */}
            <div className="absolute -top-8 -left-8 bg-white rounded-xl shadow-lg p-4 animate-bounce delay-500">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <span className="text-green-600 font-bold text-sm">+5</span>
                </div>
                <span className="text-sm font-medium text-gray-700">Nowe zdjęcia!</span>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-8 bg-white rounded-xl shadow-lg p-4 animate-bounce delay-1000">
              <div className="text-center">
                <div className="text-lg font-bold text-purple-600">24h</div>
                <div className="text-xs text-gray-600">do końca</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}


'use client';

import { useState } from 'react';
import { ArrowRightIcon, PhotoIcon, CloudArrowDownIcon, ClockIcon, ShareIcon, ArrowUpTrayIcon } from '@heroicons/react/24/outline';
import { useProduct } from '../../contexts/ProductContext';

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const { activeProduct, setActiveProduct } = useProduct();
  
  const goToDemo = () => {
    if (activeProduct === 'gallery') {
      window.location.href = '/dashboard';
    } else {
      window.location.href = '/dashboard/transfers';
    }
  }

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
            {/* Product Tabs */}
            <div className="inline-flex items-center p-1 bg-white rounded-xl shadow-lg border border-gray-200">
              <button
                onClick={() => setActiveProduct('gallery')}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeProduct === 'gallery'
                    ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <PhotoIcon className="w-4 h-4 mr-2" />
                Galerie Eventów
              </button>
              <button
                onClick={() => setActiveProduct('transfer')}
                className={`flex items-center px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-300 ${
                  activeProduct === 'transfer'
                    ? 'bg-linear-to-r from-indigo-600 to-purple-600 text-white shadow-md'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <ArrowUpTrayIcon className="w-4 h-4 mr-2" />
                Pro Transfer
              </button>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
              <span className="bg-linear-to-r from-indigo-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
                WrzućFotkę.pl
              </span>
              <br />
              <span className="text-3xl md:text-5xl text-gray-700">
                {activeProduct === 'gallery' 
                  ? 'Zbierz wszystkie zdjęcia w jednym miejscu! 📸'
                  : 'I nie tylko fotkę! FileTransfer dla Profesjonalistów! 🚀'
                }
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-xl text-gray-600 leading-relaxed max-w-lg">
              {activeProduct === 'gallery' 
                ? 'Koniec z gonitwą za zdjęciami od gości! Stwórz dedykowaną galerię na wesele, komunię czy urodziny. Goście wrzucają fotki, Ty pobierasz wszystko jednym klikiem.'
                : 'Wysyłaj duże pliki bez limitów. Idealne dla projektantów, fotografów i firm. Bezpieczne, szybkie i w pełni polskie rozwiązanie.'
              }
            </p>

            {/* Key Features */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {activeProduct === 'gallery' ? (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <PhotoIcon className="w-5 h-5 text-green-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Upload dla gości</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 w-8 h-8 bg-violet-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Winietki z QR kodem</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Filtry i edycja</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center">
                      <ClockIcon className="w-5 h-5 text-emerald-600" />
                    </div>
                    <span className="text-gray-700 font-medium">7-30 dni dostępu</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <ArrowUpTrayIcon className="w-5 h-5 text-blue-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Pliki do 5GB</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Ochrona hasłem</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                      <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium">Analytics pobierania</span>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <div className="shrink-0 w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <ShareIcon className="w-5 h-5 text-orange-600" />
                    </div>
                    <span className="text-gray-700 font-medium">Współpraca zespołowa</span>
                  </div>
                </>
              )}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onClick={() => goToDemo()}
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-semibold text-white bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300"
              >
                {activeProduct === 'gallery' 
                  ? 'Stwórz galerię za darmo'
                  : 'Rozpocznij transfer'
                }
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
              {activeProduct === 'gallery' ? (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1000+</div>
                    <div className="text-sm text-gray-600">Imprez</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">50k+</div>
                    <div className="text-sm text-gray-600">Zdjęć</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">250zł</div>
                    <div className="text-sm text-gray-600">Od</div>
                  </div>
                </>
              ) : (
                <>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">5GB</div>
                    <div className="text-sm text-gray-600">Max file</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">1TB</div>
                    <div className="text-sm text-gray-600">Miesięcznie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">50zł</div>
                    <div className="text-sm text-gray-600">Od</div>
                  </div>
                </>
              )}
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
                  {activeProduct === 'gallery' ? (
                    <>
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
                    </>
                  ) : (
                    <>
                      {/* Transfer Header */}
                      <div className="text-center">
                        <h3 className="text-lg font-bold text-gray-900">Transfer do klienta</h3>
                        <p className="text-sm text-gray-600">Sesja zdjęciowa RAW</p>
                      </div>
                      
                      {/* File List */}
                      <div className="space-y-2">
                        {['IMG_001.RAW', 'IMG_002.RAW', 'IMG_003.RAW'].map((filename, i) => (
                          <div key={i} className="flex items-center justify-between bg-gray-50 rounded-lg p-2">
                            <div className="flex items-center space-x-2">
                              <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                                <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" clipRule="evenodd" />
                                </svg>
                              </div>
                              <div>
                                <p className="text-xs font-medium text-gray-900">{filename}</p>
                                <p className="text-xs text-gray-600">24.5 MB</p>
                              </div>
                            </div>
                            <div className="w-12 h-1 bg-green-200 rounded-full overflow-hidden">
                              <div className="w-full h-full bg-green-500"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      
                      {/* Transfer Stats */}
                      <div className="bg-gray-50 rounded-xl p-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Rozmiar:</span>
                          <span className="font-semibold text-gray-900">847 MB</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Pobierania:</span>
                          <span className="font-semibold text-gray-900">3/5</span>
                        </div>
                      </div>
                      
                      {/* Send Button */}
                      <button className="w-full bg-linear-to-r from-blue-500 to-blue-600 text-white font-semibold py-3 rounded-xl">
                        Wyślij link (3 dni)
                      </button>
                    </>
                  )}
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


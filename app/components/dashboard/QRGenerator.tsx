'use client';

import { useState } from 'react';
import { 
  QrCodeIcon, 
  LinkIcon, 
  DocumentDuplicateIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface QRGeneratorProps {
  galleryUrl?: string;
  eventName?: string;
}

export default function QRGenerator({ 
  galleryUrl = "https://wrzucfotke.pl/g/ania-tomek-2024",
  eventName = "Wesele Ania & Tomek 💕"
}: QRGeneratorProps) {
  const [copied, setCopied] = useState(false);
  const [qrStyle, setQrStyle] = useState<'default' | 'colorful' | 'elegant'>('default');

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(galleryUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const downloadQR = () => {
    // Tu będzie logika pobierania QR kodu
    console.log('Downloading QR code...');
  };

  const shareGallery = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: eventName,
          text: 'Wrzuć swoje zdjęcia do naszej galerii!',
          url: galleryUrl,
        });
      } catch (err) {
        console.error('Error sharing:', err);
      }
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Generator <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">QR</span>
        </h1>
        <p className="text-lg text-gray-600">
          Stwórz kod QR dla łatwego udostępniania galerii gościom
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        
        {/* Left Column - QR Preview */}
        <div className="space-y-6">
          
          {/* QR Code Display */}
          <div className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100">
            <div className="text-center">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Twój kod QR</h3>
              
              {/* QR Code Placeholder */}
              <div className="w-64 h-64 mx-auto bg-white border-2 border-gray-200 rounded-2xl flex items-center justify-center mb-6 relative">
                {/* Simulated QR Code Pattern */}
                <div className="grid grid-cols-8 gap-1 w-48 h-48">
                  {Array.from({ length: 64 }).map((_, i) => (
                    <div 
                      key={i}
                      className={`aspect-square ${
                        Math.random() > 0.5 ? 'bg-gray-900' : 'bg-white'
                      } rounded-sm`}
                    ></div>
                  ))}
                </div>
                
                {/* Logo in center */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-12 h-12 bg-white rounded-lg border-2 border-gray-200 flex items-center justify-center">
                    <span className="text-indigo-600 font-bold">W</span>
                  </div>
                </div>
              </div>
              
              {/* Event Name */}
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{eventName}</h4>
              <p className="text-sm text-gray-600 mb-6">Zeskanuj i dodaj swoje zdjęcia!</p>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={downloadQR}
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:shadow-lg transition-all duration-300"
                >
                  <ArrowDownTrayIcon className="w-5 h-5 mr-2" />
                  Pobierz QR
                </button>
                
                <button
                  onClick={shareGallery}
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
                >
                  <ShareIcon className="w-5 h-5 mr-2" />
                  Udostępnij
                </button>
              </div>
            </div>
          </div>
          
          {/* QR Styles */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Styl kodu QR</h3>
            
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setQrStyle('default')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  qrStyle === 'default'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 bg-gray-900 rounded mx-auto mb-2"></div>
                <div className="text-sm font-medium">Klasyczny</div>
              </button>
              
              <button
                onClick={() => setQrStyle('colorful')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  qrStyle === 'colorful'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 bg-linear-to-r from-purple-500 to-pink-500 rounded mx-auto mb-2"></div>
                <div className="text-sm font-medium">Kolorowy</div>
              </button>
              
              <button
                onClick={() => setQrStyle('elegant')}
                className={`p-4 rounded-xl border-2 transition-all ${
                  qrStyle === 'elegant'
                    ? 'border-indigo-500 bg-indigo-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="w-12 h-12 bg-linear-to-r from-gray-600 to-gray-800 rounded mx-auto mb-2"></div>
                <div className="text-sm font-medium">Elegancki</div>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column - Link & Instructions */}
        <div className="space-y-6">
          
          {/* Gallery Link */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Link do galerii</h3>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-xl">
                <LinkIcon className="w-5 h-5 text-gray-400 shrink-0" />
                <span className="text-sm text-gray-600 flex-1 truncate">{galleryUrl}</span>
                <button
                  onClick={copyToClipboard}
                  className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                  title="Kopiuj link"
                >
                  {copied ? (
                    <CheckIcon className="w-5 h-5 text-green-500" />
                  ) : (
                    <DocumentDuplicateIcon className="w-5 h-5" />
                  )}
                </button>
              </div>
              
              {copied && (
                <div className="text-sm text-green-600 text-center">
                  ✅ Link skopiowany do schowka!
                </div>
              )}
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Jak używać kodu QR</h3>
            
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Pobierz i wydrukuj</h4>
                  <p className="text-sm text-gray-600">Pobierz kod QR i wydrukuj go na kartkach lub umieść na stołach.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Goście skanują</h4>
                  <p className="text-sm text-gray-600">Twoi goście używają aparatu w telefonie do zeskanowania kodu.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Automatyczne przekierowanie</h4>
                  <p className="text-sm text-gray-600">Kod QR automatycznie otworzy galerię w przeglądarce.</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-3">
                <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900">Dodawanie zdjęć</h4>
                  <p className="text-sm text-gray-600">Goście mogą od razu wrzucać swoje najlepsze zdjęcia!</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tips */}
          <div className="bg-linear-to-r from-yellow-50 to-orange-50 rounded-3xl p-6 border border-orange-200">
            <h3 className="text-lg font-bold text-gray-900 mb-4">💡 Wskazówki</h3>
            
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start space-x-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Umieść kod QR na stołach, przy wejściu i w menu</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Dodaj krótką instrukcję obok kodu QR</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Możesz wydrukować kod w różnych rozmiarach</span>
              </li>
              <li className="flex items-start space-x-2">
                <span className="text-orange-500 mt-0.5">•</span>
                <span>Kod QR działa przez cały okres trwania galerii</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
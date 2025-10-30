'use client';

import { useState, useEffect } from 'react';
import { 
  HeartIcon, 
  PhotoIcon, 
  ClockIcon, 
  CloudIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon,
  PlusIcon,
  QrCodeIcon
} from '@heroicons/react/24/outline';
import RecentActivity from './RecentActivity';
import { 
  HeartIcon as HeartIconSolid,
  PhotoIcon as PhotoIconSolid
} from '@heroicons/react/24/solid';

interface UserPlan {
  name: string;
  type: 'starter' | 'wedding' | 'pro';
  expiresAt: string;
  daysLeft: number;
  features: string[];
}

interface GalleryStats {
  totalPhotos: number;
  maxPhotos: number | null; // null = unlimited
  storageUsed: number; // MB
  maxStorage: number | null; // null = unlimited  
  contributors: number;
  downloads: number;
}

interface GallerySettings {
  requireName: boolean;
  allowDownload: boolean;
  moderatePhotos: boolean;
  allowComments: boolean;
}

interface DashboardProps {
  userPlan: UserPlan;
  galleryStats: GalleryStats;
  eventName: string;
  eventDate: string;
  gallerySettings?: GallerySettings;
}

export default function Dashboard({ 
  userPlan = {
    name: "Wedding",
    type: 'wedding',
    expiresAt: '2025-10-24',
    daysLeft: 180,
    features: ['365 dni przechowywania', 'Nieograniczone zdjęcia', 'Kod QR', 'Własny link']
  },
  galleryStats = {
    totalPhotos: 247,
    maxPhotos: null,
    storageUsed: 2100,
    maxStorage: null,
    contributors: 43,
    downloads: 12
  },
  eventName = "Wesele Ania & Tomek 💕",
  eventDate = "2025-12-14",
  gallerySettings = {
    requireName: true,
    allowDownload: true,
    moderatePhotos: false,
    allowComments: true
  }
}: Partial<DashboardProps> = {}) {

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Calculate time remaining until event
  useEffect(() => {
    const calculateTimeLeft = () => {
      const eventDateTime = new Date(eventDate).getTime();
      const now = new Date().getTime();
      const difference = eventDateTime - now;

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, [eventDate]);

  const isEventPassed = new Date(eventDate).getTime() < new Date().getTime();

  const handleSettingsClick = () => {
    window.location.href = '/dashboard/settings';
  };

  const getPlanColor = (planType: string) => {
    switch (planType) {
      case 'wedding':
        return {
          gradient: 'from-purple-500 to-pink-500',
          bg: 'from-purple-50 to-pink-50',
          text: 'text-purple-600'
        };
      case 'pro':
        return {
          gradient: 'from-indigo-500 to-blue-500',
          bg: 'from-indigo-50 to-blue-50',
          text: 'text-indigo-600'
        };
      default:
        return {
          gradient: 'from-gray-500 to-gray-600',
          bg: 'from-gray-50 to-white',
          text: 'text-gray-600'
        };
    }
  };

  const planColors = getPlanColor(userPlan.type);
  const storagePercentage = galleryStats.maxStorage 
    ? (galleryStats.storageUsed / galleryStats.maxStorage) * 100 
    : 0;
  const photosPercentage = galleryStats.maxPhotos 
    ? (galleryStats.totalPhotos / galleryStats.maxPhotos) * 100 
    : 0;

  return (
    <div className="min-h-screen bg-gray-50">
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        
        {/* Welcome Header */}
        <div className="mb-8">
          <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-200">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center">
                  <HeartIcon className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-1">
                    Witaj ponownie, Anna! 👋
                  </h1>
                  <div className="flex items-center text-gray-600">
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    <span className="text-sm">
                      {eventName || 'Wesele Ania & Tomek 💕'} • {new Date(eventDate).toLocaleDateString('pl-PL', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </span>
                  </div>
                </div>
              </div>

              {/* Countdown Timer */}
              {!isEventPassed ? (
                <div className="bg-linear-to-r from-pink-50 to-purple-50 border border-pink-200 rounded-2xl p-6">
                  <div className="text-center mb-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Do wielkiego dnia</h3>
                    <div className="grid grid-cols-4 gap-2 text-center">
                      <div>
                        <div className="text-2xl font-bold text-pink-600">{timeLeft.days}</div>
                        <div className="text-xs text-gray-600">dni</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-600">{timeLeft.hours}</div>
                        <div className="text-xs text-gray-600">godz</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-indigo-600">{timeLeft.minutes}</div>
                        <div className="text-xs text-gray-600">min</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-blue-600">{timeLeft.seconds}</div>
                        <div className="text-xs text-gray-600">sek</div>
                      </div>
                    </div>
                    {timeLeft.days <= 7 && timeLeft.days > 0 && (
                      <div className="mt-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-orange-100 text-orange-800">
                          <ClockIcon className="w-3 h-3 mr-1" />
                          Już wkrótce!
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="bg-linear-to-r from-green-50 to-emerald-50 border border-green-200 rounded-2xl p-6">
                  <div className="text-center">
                    <HeartIcon className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">Wielki dzień już był!</h3>
                    <p className="text-sm text-gray-600">Mamy nadzieję, że było wspaniale! 💕</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                <PhotoIcon className="w-6 h-6 text-indigo-600" />
              </div>
              <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {galleryStats.maxPhotos ? `z ${galleryStats.maxPhotos}` : 'Bez limitu'}
              </span>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{galleryStats.totalPhotos}</div>
            <div className="text-sm text-gray-600">Zdjęć w galerii</div>
            {galleryStats.maxPhotos && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-indigo-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(photosPercentage, 100)}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CloudIcon className="w-6 h-6 text-purple-600" />
              </div>
              {galleryStats.maxStorage && (
                <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                  z {(galleryStats.maxStorage / 1000).toFixed(1)} GB
                </span>
              )}
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">
              {(galleryStats.storageUsed / 1000).toFixed(1)} GB
            </div>
            <div className="text-sm text-gray-600">Wykorzystane miejsce</div>
            {galleryStats.maxStorage && (
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all"
                  style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                ></div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{galleryStats.contributors}</div>
            <div className="text-sm text-gray-600">Aktywnych gości</div>
            <div className="mt-3 flex items-center text-xs text-green-600">
              <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
              Ostatnia aktywność: teraz
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-blue-600" />
              </div>
            </div>
            <div className="text-3xl font-bold text-gray-900 mb-1">{galleryStats.downloads}</div>
            <div className="text-sm text-gray-600">Pobranych zdjęć</div>
            <div className="mt-3 text-xs text-gray-500">
              Ostatnie pobranie: 2 godz. temu
            </div>
          </div>
        </div>

        {/* Plan Status */}
        <div className="bg-white rounded-3xl p-6 border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-14 h-14 bg-linear-to-r ${planColors.gradient} rounded-2xl flex items-center justify-center`}>
                <HeartIconSolid className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900">Plan {userPlan.name}</h3>
                <p className="text-gray-600">
                  Aktywny do {new Date(userPlan.expiresAt).toLocaleDateString('pl-PL')} • <span className="font-medium">{userPlan.daysLeft} dni pozostało</span>
                </p>
              </div>
            </div>
            <a 
              href="/dashboard/settings"
              className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              <Cog6ToothIcon className="w-4 h-4 mr-2" />
              Ustawienia
            </a>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {userPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center text-sm text-gray-700 bg-gray-50 rounded-lg p-3">
                <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                {feature}
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* View Gallery */}
          <a href="/dashboard/gallery" className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-indigo-100 group-hover:bg-indigo-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <PhotoIcon className="w-6 h-6 text-indigo-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Przeglądaj zdjęcia</h3>
            <p className="text-sm text-gray-600 mb-4">Zobacz wszystkie {galleryStats.totalPhotos} zdjęć w galerii</p>
            <div className="flex items-center text-indigo-600 group-hover:text-indigo-700 font-medium text-sm">
              Otwórz galerię
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Generate QR Code */}
          <a href="/dashboard/qr" className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-purple-300 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-purple-100 group-hover:bg-purple-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <QrCodeIcon className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Generator QR</h3>
            <p className="text-sm text-gray-600 mb-4">Stwórz kod QR dla łatwego udostępniania</p>
            <div className="flex items-center text-purple-600 group-hover:text-purple-700 font-medium text-sm">
              Generuj kod
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Create New Gallery */}
          <a href="/dashboard/gallery-creator" className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-pink-300 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-pink-100 group-hover:bg-pink-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <PlusIcon className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Nowa galeria</h3>
            <p className="text-sm text-gray-600 mb-4">Stwórz dodatkową galerię dla innego wydarzenia</p>
            <div className="flex items-center text-pink-600 group-hover:text-pink-700 font-medium text-sm">
              Utwórz galerię
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>

          {/* Settings */}
          <a href="/dashboard/settings" className="bg-white rounded-2xl p-6 border border-gray-200 hover:border-green-300 hover:shadow-lg transition-all group">
            <div className="w-12 h-12 bg-green-100 group-hover:bg-green-200 rounded-xl flex items-center justify-center mb-4 transition-colors">
              <Cog6ToothIcon className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Ustawienia galerii</h3>
            <p className="text-sm text-gray-600 mb-4">Skonfiguruj prywatność i opcje uploadów</p>
            <div className="flex items-center text-green-600 group-hover:text-green-700 font-medium text-sm">
              Otwórz ustawienia
              <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </a>
        </div>


        {/* My Galleries Section */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Moje galerie</h2>
            <a 
              href="/dashboard/gallery-creator"
              className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Nowa galeria
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Example Gallery 1 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-r from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                  <HeartIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">{eventName}</h3>
                  <p className="text-sm text-gray-500">Wesele • 14 grudnia 2025</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-600">{galleryStats.totalPhotos}</div>
                  <div className="text-xs text-gray-600">Zdjęć</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">{galleryStats.contributors}</div>
                  <div className="text-xs text-gray-600">Gości</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">{(galleryStats.storageUsed / 1000).toFixed(1)}GB</div>
                  <div className="text-xs text-gray-600">Rozmiar</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <a 
                  href="/dashboard/gallery"
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-center"
                >
                  Podgląd
                </a>
                <a 
                  href="/dashboard/qr"
                  className="flex-1 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium text-center"
                >
                  QR kod
                </a>
              </div>
            </div>

            {/* Example Gallery 2 */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-linear-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                  <PhotoIcon className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900">Sesja narzeczeńska</h3>
                  <p className="text-sm text-gray-500">Fotografia • 15 października 2025</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="text-center">
                  <div className="text-lg font-bold text-indigo-600">89</div>
                  <div className="text-xs text-gray-600">Zdjęć</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-green-600">2</div>
                  <div className="text-xs text-gray-600">Gości</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-600">0.8GB</div>
                  <div className="text-xs text-gray-600">Rozmiar</div>
                </div>
              </div>

              <div className="flex space-x-2">
                <a 
                  href="/dashboard/gallery"
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium text-center"
                >
                  Podgląd
                </a>
                <a 
                  href="/dashboard/qr"
                  className="flex-1 px-3 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium text-center"
                >
                  QR kod
                </a>
              </div>
            </div>

            {/* Create New Gallery Card */}
            <a 
              href="/dashboard/gallery-creator"
              className="bg-gray-50 border-2 border-dashed border-gray-300 rounded-2xl p-6 hover:border-indigo-400 hover:bg-indigo-50 transition-all duration-300 cursor-pointer group"
            >
              <div className="text-center">
                <div className="w-12 h-12 bg-gray-200 group-hover:bg-indigo-200 rounded-xl flex items-center justify-center mx-auto mb-4 transition-colors">
                  <PlusIcon className="w-6 h-6 text-gray-500 group-hover:text-indigo-600 transition-colors" />
                </div>
                <h3 className="font-semibold text-gray-700 group-hover:text-indigo-900 mb-2 transition-colors">Stwórz nową galerię</h3>
                <p className="text-sm text-gray-500 group-hover:text-indigo-600 transition-colors">
                  Dodaj kolejną galerię dla swojego wydarzenia
                </p>
              </div>
            </a>
          </div>
        </div>

        {/* Recent Activity */}
        <RecentActivity 
          requireNameEnabled={gallerySettings.requireName}
          onSettingsClick={handleSettingsClick}
        />
      </div>
    </div>
  );
}
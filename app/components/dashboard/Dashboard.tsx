'use client';

import { useState } from 'react';
import { 
  HeartIcon, 
  PhotoIcon, 
  ClockIcon, 
  CloudIcon,
  UserGroupIcon,
  CalendarIcon,
  ChartBarIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';
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

interface DashboardProps {
  userPlan: UserPlan;
  galleryStats: GalleryStats;
  eventName: string;
  eventDate: string;
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
  eventDate = "2024-10-12"
}: Partial<DashboardProps> = {}) {

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
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      
      {/* Background Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-linear-to-br from-pink-400 to-purple-600 rounded-full blur-xl opacity-10 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-linear-to-br from-blue-400 to-cyan-600 rounded-full blur-xl opacity-10 animate-pulse delay-1000"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                {eventName}
              </h1>
              <p className="text-gray-600 flex items-center">
                <CalendarIcon className="w-5 h-5 mr-2" />
                {eventDate}
              </p>
            </div>
            
            <button className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors">
              <Cog6ToothIcon className="w-5 h-5 mr-2" />
              Ustawienia
            </button>
          </div>
        </div>

        {/* Plan Status Card */}
        <div className={`bg-linear-to-br ${planColors.bg} border border-gray-200 rounded-3xl p-6 mb-8 relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className={`w-12 h-12 bg-linear-to-r ${planColors.gradient} rounded-xl flex items-center justify-center`}>
                  <HeartIconSolid className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Plan {userPlan.name}</h3>
                  <p className={`text-sm ${planColors.text} font-medium`}>
                    Aktywny do {new Date(userPlan.expiresAt).toLocaleDateString('pl-PL')}
                  </p>
                </div>
              </div>
              
              <div className="text-right">
                <div className="text-2xl font-bold text-gray-900">{userPlan.daysLeft}</div>
                <div className="text-sm text-gray-600">dni pozostało</div>
              </div>
            </div>
            
            {/* Plan Features */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {userPlan.features.map((feature, index) => (
                <div key={index} className="flex items-center text-sm text-gray-700">
                  <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
                  {feature}
                </div>
              ))}
            </div>
          </div>
          
          {/* Background pattern */}
          <div className={`absolute top-4 right-4 w-24 h-24 bg-linear-to-br ${planColors.gradient} rounded-full opacity-10`}></div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          
          {/* Total Photos */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                <PhotoIconSolid className="w-6 h-6 text-blue-600" />
              </div>
              {galleryStats.maxPhotos && (
                <span className="text-xs text-gray-500">
                  z {galleryStats.maxPhotos.toLocaleString()}
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {galleryStats.totalPhotos.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-3">Zdjęć w galerii</div>
            {galleryStats.maxPhotos && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(photosPercentage, 100)}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Storage Used */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                <CloudIcon className="w-6 h-6 text-purple-600" />
              </div>
              {galleryStats.maxStorage && (
                <span className="text-xs text-gray-500">
                  z {(galleryStats.maxStorage / 1000).toFixed(1)} GB
                </span>
              )}
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {(galleryStats.storageUsed / 1000).toFixed(1)} GB
            </div>
            <div className="text-sm text-gray-600 mb-3">Wykorzystane miejsce</div>
            {galleryStats.maxStorage && (
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${Math.min(storagePercentage, 100)}%` }}
                ></div>
              </div>
            )}
          </div>

          {/* Contributors */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                <UserGroupIcon className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {galleryStats.contributors}
            </div>
            <div className="text-sm text-gray-600">Aktywnych gości</div>
          </div>

          {/* Downloads */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                <ChartBarIcon className="w-6 h-6 text-orange-600" />
              </div>
            </div>
            <div className="text-2xl font-bold text-gray-900 mb-1">
              {galleryStats.downloads}
            </div>
            <div className="text-sm text-gray-600">Pobrań galerii</div>
          </div>
        </div>

        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Generate QR */}
          <a href="/dashboard/qr" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group block">
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 3h6v6H3V3zm2 2v2h2V5H5zm8-2h6v6h-6V3zm2 2v2h2V5h-2zM3 15h6v6H3v-6zm2 2v2h2v-2H5zm12 0h2v2h-2v-2zm0 4h2v2h-2v-2zm-8-4h2v2h-2v-2zm0-8h2v2h-2v-2zm4 0h2v2h-2v-2zm0 4h2v2h-2v-2zm-4 0h2v2h-2v-2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Generuj QR</h3>
              <p className="text-gray-600 mb-4">
                Stwórz kod QR do łatwego udostępniania galerii gościom
              </p>
              <div className="inline-flex items-center text-indigo-600 font-medium group-hover:text-indigo-800 transition-colors">
                Generuj kod
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>

          {/* Create Folder */}
          <a href="/dashboard/folders" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group block">
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-r from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Stwórz folder</h3>
              <p className="text-gray-600 mb-4">
                Organizuj zdjęcia w tematyczne foldery dla lepszego porządku
              </p>
              <div className="inline-flex items-center text-green-600 font-medium group-hover:text-green-800 transition-colors">
                Nowy folder
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>

          {/* View Photos */}
          <a href="/dashboard/gallery" className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300 cursor-pointer group block">
            <div className="text-center">
              <div className="w-16 h-16 bg-linear-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                <PhotoIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Podgląd fotek</h3>
              <p className="text-gray-600 mb-4">
                Przeglądaj wszystkie zdjęcia w galerii i zarządzaj nimi
              </p>
              <div className="inline-flex items-center text-pink-600 font-medium group-hover:text-pink-800 transition-colors">
                Zobacz zdjęcia
                <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        </div>

        {/* Recent Activity */}
        <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
          <h3 className="text-xl font-bold text-gray-900 mb-6">Ostatnia aktywność</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <PhotoIcon className="w-5 h-5 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Anna K. dodała 12 zdjęć</p>
                <p className="text-sm text-gray-600">2 godziny temu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <UserGroupIcon className="w-5 h-5 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Tomek M. dołączył do galerii</p>
                <p className="text-sm text-gray-600">5 godzin temu</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl">
              <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                <ChartBarIcon className="w-5 h-5 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">Galeria została pobrana</p>
                <p className="text-sm text-gray-600">1 dzień temu</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
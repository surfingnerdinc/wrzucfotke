'use client';

import { useState } from 'react';
import { 
  Bars3Icon, 
  XMarkIcon, 
  HeartIcon, 
  HomeIcon,
  PhotoIcon,
  Cog6ToothIcon,
  ArrowRightOnRectangleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';

interface DashboardNavProps {
  eventName?: string;
  userEmail?: string;
}

export default function DashboardNavigation({ 
  eventName = "Wesele Ania & Tomek 💕",
  userEmail = "anna.kowalska@email.com"
}: DashboardNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Galeria', href: '/dashboard/gallery', icon: PhotoIcon },
    { name: 'Edytor', href: '/dashboard/editor', icon: PencilSquareIcon },
    { name: 'Ustawienia', href: '/dashboard/settings', icon: Cog6ToothIcon }
  ];

  const handleLogout = () => {
    // Tu będzie logika wylogowania
    console.log('Logging out...');
    // window.location.href = '/';
  };

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Logo & Event Name */}
          <div className="flex items-center space-x-4">
            <a href="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
                <HeartIcon className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">WrzućFotkę.pl</span>
            </a>
            
            {/* Event Name - Hidden on mobile */}
            <div className="hidden md:block">
              <span className="text-gray-400">|</span>
              <span className="ml-4 text-gray-700 font-medium">{eventName}</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 font-medium transition-colors duration-200"
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* User Menu - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <div className="text-right">
              <div className="text-sm font-medium text-gray-900">Anna Kowalska</div>
              <div className="text-xs text-gray-500">{userEmail}</div>
            </div>
            
            <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
              <span className="text-white font-medium text-sm">AK</span>
            </div>
            
            <button
              onClick={handleLogout}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
              title="Wyloguj się"
            >
              <ArrowRightOnRectangleIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isOpen ? (
                <XMarkIcon className="h-6 w-6" />
              ) : (
                <Bars3Icon className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-4">
            
            {/* Event Name - Mobile */}
            <div className="pb-4 border-b border-gray-200">
              <div className="text-sm font-medium text-gray-900">{eventName}</div>
            </div>
            
            {/* Navigation Links */}
            {navLinks.map((link) => {
              const IconComponent = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 font-medium py-2"
                  onClick={() => setIsOpen(false)}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{link.name}</span>
                </a>
              );
            })}
            
            {/* User Info & Logout - Mobile */}
            <div className="pt-4 border-t border-gray-200 space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center">
                  <span className="text-white font-medium text-sm">AK</span>
                </div>
                <div>
                  <div className="text-sm font-medium text-gray-900">Anna Kowalska</div>
                  <div className="text-xs text-gray-500">{userEmail}</div>
                </div>
              </div>
              
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="flex items-center space-x-3 w-full text-left text-red-600 hover:text-red-800 font-medium py-2"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Wyloguj się</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
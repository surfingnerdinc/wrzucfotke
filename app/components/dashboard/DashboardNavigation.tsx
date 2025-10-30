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
  PencilSquareIcon,
  DocumentIcon,
  ClipboardDocumentListIcon,
  PlusIcon,
  QrCodeIcon,
  UserIcon,
  EllipsisHorizontalIcon
} from '@heroicons/react/24/outline';
import { 
  HomeIcon as HomeIconSolid,
  PhotoIcon as PhotoIconSolid,
  PlusIcon as PlusIconSolid,
  QrCodeIcon as QrCodeIconSolid,
  UserIcon as UserIconSolid
} from '@heroicons/react/24/solid';
import { usePathname } from 'next/navigation';

interface DashboardNavProps {
  eventName?: string;
  userEmail?: string;
}

export default function DashboardNavigation({ 
  eventName = "",
  userEmail = "anna.kowalska@email.com"
}: DashboardNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Mobile bottom navigation items (główne)
  const mobileNavItems = [
    { 
      name: 'Główna', 
      href: '/dashboard', 
      icon: HomeIcon, 
      iconSolid: HomeIconSolid,
      color: 'indigo'
    },
    { 
      name: 'Galeria', 
      href: '/dashboard/gallery', 
      icon: PhotoIcon, 
      iconSolid: PhotoIconSolid,
      color: 'purple'
    },
    { 
      name: 'Dodaj', 
      href: '/dashboard/gallery-creator', 
      icon: PlusIcon, 
      iconSolid: PlusIconSolid,
      color: 'pink',
      isSpecial: true
    },
    { 
      name: 'QR kod', 
      href: '/dashboard/qr', 
      icon: QrCodeIcon, 
      iconSolid: QrCodeIconSolid,
      color: 'blue'
    },
    { 
      name: 'Więcej', 
      href: '#', 
      icon: EllipsisHorizontalIcon, 
      iconSolid: EllipsisHorizontalIcon,
      color: 'gray',
      isMore: true
    }
  ];

  // Desktop navigation items (główne funkcje)
  const desktopNavLinks = [
    { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { name: 'Galeria', href: '/dashboard/gallery', icon: PhotoIcon },
    { name: 'Nowa Galeria', href: '/dashboard/gallery-creator', icon: PlusIcon },
    { name: 'QR Generator', href: '/dashboard/qr', icon: QrCodeIcon }
  ];

  // Dodatkowe opcje w dropdown
  const moreOptions = [
    { name: 'Edytor', href: '/dashboard/editor', icon: PencilSquareIcon },
    { name: 'Kreator', href: '/dashboard/creator', icon: DocumentIcon },
    { name: 'Zamówienia', href: '/dashboard/orders', icon: ClipboardDocumentListIcon },
    { name: 'Ustawienia', href: '/dashboard/settings', icon: Cog6ToothIcon }
  ];

  const handleLogout = () => {
    // Tu będzie logika wylogowania
    console.log('Logging out...');
    // window.location.href = '/';
  };

  const isActiveRoute = (href: string) => {
    if (href === '/dashboard') {
      return pathname === '/dashboard';
    }
    // Dokładne dopasowanie lub dopasowanie z / na końcu
    return pathname === href || pathname.startsWith(href + '/');
  };

  const getColorClasses = (color: string, isActive: boolean) => {
    const colors = {
      indigo: isActive 
        ? 'text-indigo-600 bg-indigo-50' 
        : 'text-gray-500 hover:text-indigo-600',
      purple: isActive 
        ? 'text-purple-600 bg-purple-50' 
        : 'text-gray-500 hover:text-purple-600',
      pink: isActive 
        ? 'text-pink-600 bg-pink-50' 
        : 'text-gray-500 hover:text-pink-600',
      blue: isActive 
        ? 'text-blue-600 bg-blue-50' 
        : 'text-gray-500 hover:text-blue-600',
      gray: 'text-gray-500 hover:text-gray-700'
    };
    return colors[color as keyof typeof colors] || colors.gray;
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white/95 backdrop-blur-sm border-b border-gray-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo & Event Name */}
            <div className="flex items-center space-x-4">
              <a href="/dashboard" className="flex items-center space-x-4 group">
                <div className="w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow">
                  <HeartIcon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-gray-900 tracking-tight">WrzućFotkę.pl</div>
                  {eventName && (
                    <div className="text-sm text-gray-500 font-medium flex items-center">
                      <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                      {eventName}
                    </div>
                  )}
                </div>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <div className="flex items-center space-x-2">
              {desktopNavLinks.map((link) => {
                const IconComponent = link.icon;
                const isActive = isActiveRoute(link.href);
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    className={`flex items-center space-x-3 px-5 py-3 rounded-2xl font-semibold transition-all duration-300 ${
                      isActive
                        ? 'text-white bg-linear-to-r from-indigo-600 to-purple-600 shadow-lg transform scale-105'
                        : 'text-gray-600 hover:text-indigo-600 hover:bg-indigo-50'
                    }`}
                  >
                    <IconComponent className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                    <span className="hidden lg:block">{link.name}</span>
                  </a>
                );
              })}
              
              {/* More Options Dropdown */}
              <div className="relative group">
                <button className="flex items-center space-x-3 px-5 py-3 rounded-2xl font-semibold text-gray-600 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-300">
                  <EllipsisHorizontalIcon className="w-5 h-5" />
                  <span className="hidden lg:block">Więcej</span>
                </button>
                
                {/* Dropdown Menu */}
                <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2">
                    {moreOptions.map((option) => {
                      const IconComponent = option.icon;
                      return (
                        <a
                          key={option.name}
                          href={option.href}
                          className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                        >
                          <IconComponent className="w-5 h-5" />
                          <span className="font-medium">{option.name}</span>
                        </a>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>

            {/* User Menu */}
            <div className="flex items-center space-x-4">
              <div className="text-right hidden xl:block">
                <div className="text-sm font-semibold text-gray-900">Anna Kowalska</div>
                <div className="text-xs text-gray-500">{userEmail}</div>
              </div>
              
              <div className="relative group">
                <button className="w-12 h-12 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
                  <span className="text-white font-bold text-sm">AK</span>
                </button>
                
                {/* User Dropdown */}
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-2xl shadow-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  <div className="p-2">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <div className="text-sm font-semibold text-gray-900">Anna Kowalska</div>
                      <div className="text-xs text-gray-500">{userEmail}</div>
                      <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-lg mt-2 inline-block">
                        Plan Wedding
                      </div>
                    </div>
                    <a
                      href="/dashboard/settings"
                      className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-700 hover:text-indigo-600 hover:bg-indigo-50 transition-all duration-200"
                    >
                      <Cog6ToothIcon className="w-5 h-5" />
                      <span className="font-medium">Ustawienia</span>
                    </a>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-600 hover:bg-red-50 transition-all duration-200"
                    >
                      <ArrowRightOnRectangleIcon className="w-5 h-5" />
                      <span className="font-medium">Wyloguj się</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      
      {/* Mobile Top Header */}
      <div className="md:hidden bg-white border-b border-gray-100 sticky top-0 z-50">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center">
              <HeartIcon className="w-4 h-4 text-white" />
            </div>
            <div>
              <h1 className="font-bold text-gray-900 text-lg">WrzućFotkę.pl</h1>
              {eventName && (
                <p className="text-xs text-gray-500 -mt-1">{eventName}</p>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center"
          >
            <UserIcon className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <div className="bg-white border-t border-gray-200 px-2 py-2">
          <div className="flex items-center justify-around">
            {mobileNavItems.map((item) => {
              if (item.isMore) {
                return (
                  <button
                    key={item.name}
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex flex-col items-center py-2 px-3 transition-all duration-200"
                  >
                    <div className="p-2">
                      <item.icon className="w-6 h-6 text-gray-400" />
                    </div>
                    <span className="text-xs text-gray-400 font-medium mt-1">{item.name}</span>
                  </button>
                );
              }

              const isActive = isActiveRoute(item.href);
              const IconComponent = isActive ? item.iconSolid : item.icon;

              if (item.isSpecial) {
                return (
                  <a
                    key={item.name}
                    href={item.href}
                    className="flex flex-col items-center py-2 px-3 transition-all duration-200"
                  >
                    <div className="w-12 h-12 bg-linear-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center shadow-lg">
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-xs text-pink-600 font-semibold mt-1">{item.name}</span>
                  </a>
                );
              }

              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`flex flex-col items-center py-2 px-3 transition-all duration-200 ${
                    isActive ? 'transform -translate-y-1' : ''
                  }`}
                >
                  <div className={`p-2 rounded-xl transition-all ${
                    isActive ? getColorClasses(item.color, true) : ''
                  }`}>
                    <IconComponent className={`w-6 h-6 transition-colors ${
                      getColorClasses(item.color, isActive)
                    }`} />
                  </div>
                  <span className={`text-xs font-medium mt-1 transition-colors ${
                    isActive ? `text-${item.color}-600` : 'text-gray-400'
                  }`}>
                    {item.name}
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </div>

      {/* Mobile Overlay Menu */}
      {isOpen && (
        <>
          <div 
            className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={() => setIsOpen(false)}
          />
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white rounded-t-3xl z-50 transform transition-transform duration-300">
            <div className="p-6">
              {/* Handle */}
              <div className="w-10 h-1 bg-gray-300 rounded-full mx-auto mb-6"></div>
              
              {/* User Profile */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-2xl">
                <div className="w-14 h-14 bg-linear-to-r from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center">
                  <span className="text-white font-bold text-lg">AK</span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">Anna Kowalska</div>
                  <div className="text-sm text-gray-500">{userEmail}</div>
                  <div className="text-xs text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full mt-1 inline-block">
                    Plan Wedding
                  </div>
                </div>
              </div>

              {/* Additional Menu Items */}
              <div className="space-y-3 mb-6">
                <a 
                  href="/dashboard/editor"
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <PencilSquareIcon className="w-6 h-6 text-gray-500" />
                  <span className="font-medium text-gray-900">Edytor zdjęć</span>
                </a>
                
                <a 
                  href="/dashboard/creator"
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <DocumentIcon className="w-6 h-6 text-gray-500" />
                  <span className="font-medium text-gray-900">Kreator materiałów</span>
                </a>
                
                <a 
                  href="/dashboard/orders"
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <ClipboardDocumentListIcon className="w-6 h-6 text-gray-500" />
                  <span className="font-medium text-gray-900">Zamówienia</span>
                </a>
                
                <a 
                  href="/dashboard/settings"
                  className="flex items-center space-x-4 p-3 hover:bg-gray-50 rounded-xl transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  <Cog6ToothIcon className="w-6 h-6 text-gray-500" />
                  <span className="font-medium text-gray-900">Ustawienia</span>
                </a>
              </div>

              {/* Logout Button */}
              <button
                onClick={() => {
                  setIsOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center justify-center space-x-3 p-4 bg-red-50 text-red-600 hover:bg-red-100 rounded-xl transition-colors font-medium"
              >
                <ArrowRightOnRectangleIcon className="w-5 h-5" />
                <span>Wyloguj się</span>
              </button>
            </div>
          </div>
        </>
      )}
    </>
  );
}
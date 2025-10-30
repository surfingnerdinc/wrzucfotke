'use client';

import { useState } from 'react';
import { 
  ArrowLeftIcon,
  UserIcon,
  BuildingOfficeIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PhotoIcon,
  LinkIcon,
  CalendarIcon,
  EnvelopeIcon,
  PhoneIcon,
  CreditCardIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

interface UserDetailsPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function UserDetailsPage({ params }: UserDetailsPageProps) {
  const { id } = await params;
  const [isEditing, setIsEditing] = useState(false);
  
  // Mock user data - normally would fetch by ID
  const user = {
    id: id || 'USR-001',
    name: 'Anna Kowalska',
    email: 'anna.kowalska@example.com',
    phone: '+48 123 456 789',
    customerType: 'personal',
    plan: 'Wedding - Roczny',
    status: 'active',
    registrationDate: '2024-06-15',
    validFrom: '2025-10-30',
    validTo: '2026-10-30',
    daysLeft: 365,
    totalPaid: 600,
    galleries: 3,
    totalPhotos: 267,
    storageUsed: 1.2,
    storageLimit: 50,
    magicLink: 'https://wrzucfotke.pl/g/anna-tomek-2025',
    lastLogin: '2025-10-29 14:23',
    isActive: true,
    billingAddress: {
      firstName: 'Anna',
      lastName: 'Kowalska',
      address: 'ul. Kwiatowa 15/3',
      postalCode: '00-001',
      city: 'Warszawa'
    },
    orderHistory: [
      {
        id: 'WF-2025-001234',
        date: '2025-10-30',
        plan: 'Wedding - Roczny',
        amount: 600,
        status: 'completed'
      }
    ],
    galleryDetails: [
      {
        id: 'GAL-001',
        name: 'Wesele Anna & Tomek',
        url: 'anna-tomek-2025',
        created: '2025-10-30',
        photos: 156,
        views: 423,
        uploads: 23,
        lastActivity: '2025-10-29 18:30'
      },
      {
        id: 'GAL-002', 
        name: 'Poprawiny',
        url: 'poprawiny-anna-tomek',
        created: '2025-10-31',
        photos: 89,
        views: 156,
        uploads: 12,
        lastActivity: '2025-10-29 20:45'
      },
      {
        id: 'GAL-003',
        name: 'Sesja ślubna',
        url: 'sesja-slubna-2025',
        created: '2025-10-25',
        photos: 22,
        views: 67,
        uploads: 8,
        lastActivity: '2025-10-28 16:15'
      }
    ],
    activityLog: [
      {
        date: '2025-10-29 18:30',
        action: 'Logowanie do galerii',
        details: 'anna-tomek-2025'
      },
      {
        date: '2025-10-29 14:23',
        action: 'Dodano 12 zdjęć',
        details: 'Wesele Anna & Tomek'
      },
      {
        date: '2025-10-28 20:15',
        action: 'Utworzono nową galerię',
        details: 'Sesja ślubna'
      },
      {
        date: '2025-10-30 12:00',
        action: 'Opłacono plan',
        details: 'Wedding - Roczny (600 zł)'
      }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'trial':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'expired':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  const getStoragePercentage = () => {
    return Math.min((user.storageUsed / user.storageLimit) * 100, 100);
  };

  const getStorageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const handleUserAction = (action: string) => {
    console.log(`Action: ${action} for user ${user.id}`);
    // Here you would implement the actual user management logic
  };

  const storagePercentage = getStoragePercentage();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/a/u"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
              </Link>
              <div>
                <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
                <p className="text-sm text-gray-500">ID: {user.id} • {user.customerType === 'company' ? 'Firma' : 'Osoba prywatna'}</p>
              </div>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="inline-flex items-center px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                <PencilSquareIcon className="w-4 h-4 mr-2" />
                {isEditing ? 'Anuluj' : 'Edytuj'}
              </button>
              
              <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
                <EnvelopeIcon className="w-4 h-4 mr-2" />
                Wyślij email
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Status Banner */}
        <div className={`rounded-lg border-2 p-4 mb-8 ${getStatusColor(user.status)}`}>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {user.customerType === 'company' ? (
                <BuildingOfficeIcon className="w-8 h-8" />
              ) : (
                <UserIcon className="w-8 h-8" />
              )}
              <div>
                <h3 className="font-semibold text-lg">
                  Plan {user.plan} - {user.status === 'active' ? 'Aktywny' : user.status === 'trial' ? 'Trial' : 'Wygasł'}
                </h3>
                <p className="opacity-75">
                  {user.daysLeft > 0 
                    ? `Pozostało ${user.daysLeft} dni (do ${user.validTo})`
                    : user.daysLeft === 0 
                      ? 'Wygasa dziś!'
                      : `Wygasł ${Math.abs(user.daysLeft)} dni temu`
                  }
                </p>
              </div>
            </div>
            {user.daysLeft <= 7 && user.daysLeft >= 0 && (
              <div className="flex items-center">
                <ExclamationTriangleIcon className="w-6 h-6 mr-2" />
                <span className="font-medium">Wymaga uwagi!</span>
              </div>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* User Information */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Informacje użytkownika</h2>
              </div>
              
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Imię i nazwisko</label>
                    <div className="text-lg font-medium text-gray-900">{user.name}</div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Data rejestracji</label>
                    <div className="text-gray-900">{user.registrationDate}</div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="text-sm font-medium text-gray-500">Email</label>
                    <div className="flex items-center space-x-2">
                      <EnvelopeIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{user.email}</span>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium text-gray-500">Telefon</label>
                    <div className="flex items-center space-x-2">
                      <PhoneIcon className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-900">{user.phone}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-500">Adres</label>
                  <div className="text-gray-900">
                    {user.billingAddress.firstName} {user.billingAddress.lastName}<br />
                    {user.billingAddress.address}<br />
                    {user.billingAddress.postalCode} {user.billingAddress.city}
                  </div>
                </div>
              </div>
            </div>

            {/* Usage Statistics */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Statystyki użytkowania</h2>
              </div>
              
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-indigo-600">{user.galleries}</div>
                    <div className="text-sm text-gray-600">Galerie</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-green-600">{user.totalPhotos}</div>
                    <div className="text-sm text-gray-600">Zdjęcia</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl font-bold text-purple-600">{user.totalPaid} zł</div>
                    <div className="text-sm text-gray-600">Łącznie zapłacił</div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <span>Wykorzystanie miejsca na dysku</span>
                      <span>{user.storageUsed}GB / {user.storageLimit}GB ({storagePercentage.toFixed(1)}%)</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className={`h-3 rounded-full transition-all ${getStorageColor(storagePercentage)}`}
                        style={{ width: `${storagePercentage}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-200">
                    <div className="text-sm text-gray-600 mb-2">Ostatnie logowanie</div>
                    <div className="text-gray-900 font-medium">{user.lastLogin}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Galleries */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Galerie użytkownika</h2>
              </div>
              
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Nazwa galerii
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Statystyki
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Ostatnia aktywność
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Akcje
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {user.galleryDetails.map((gallery) => (
                      <tr key={gallery.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{gallery.name}</div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <LinkIcon className="w-4 h-4 mr-1" />
                              wrzucfotke.pl/g/{gallery.url}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="space-y-1">
                            <div>📸 {gallery.photos} zdjęć</div>
                            <div>👁️ {gallery.views} wyświetleń</div>
                            <div>📤 {gallery.uploads} uploadów</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                          {gallery.lastActivity}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm">
                          <div className="flex space-x-2">
                            <button className="text-indigo-600 hover:text-indigo-500">Podgląd</button>
                            <button className="text-gray-600 hover:text-gray-500">Statystyki</button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Activity Log */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200">
              <div className="px-6 py-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-900">Historia aktywności</h2>
              </div>
              
              <div className="p-6">
                <div className="space-y-4">
                  {user.activityLog.map((activity, index) => (
                    <div key={index} className="flex items-start space-x-3 pb-4 border-b border-gray-100 last:border-b-0">
                      <div className="w-2 h-2 bg-indigo-500 rounded-full mt-2"></div>
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">{activity.action}</div>
                        <div className="text-sm text-gray-600">{activity.details}</div>
                        <div className="text-xs text-gray-400 mt-1">{activity.date}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            
            {/* Magic Link */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                <LinkIcon className="w-5 h-5 mr-2" />
                Magic Link
              </h3>
              <div className="space-y-3">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <div className="text-xs text-gray-500 mb-1">Główny link galerii:</div>
                  <a 
                    href={user.magicLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-indigo-600 hover:text-indigo-500 break-all"
                  >
                    {user.magicLink}
                  </a>
                </div>
                <button className="w-full px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium">
                  Skopiuj link
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h3>
              <div className="space-y-3">
                
                {user.daysLeft <= 30 && user.daysLeft >= 0 && (
                  <button 
                    onClick={() => handleUserAction('extend')}
                    className="w-full px-4 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium flex items-center justify-center"
                  >
                    <CalendarIcon className="w-4 h-4 mr-2" />
                    Przedłuż subskrypcję
                  </button>
                )}

                <button className="w-full px-4 py-3 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors font-medium flex items-center justify-center">
                  <EnvelopeIcon className="w-4 h-4 mr-2" />
                  Wyślij email
                </button>

                <button className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium">
                  Resetuj hasło
                </button>

                <button className="w-full px-4 py-3 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors font-medium">
                  Eksportuj dane
                </button>

                {user.isActive ? (
                  <button 
                    onClick={() => handleUserAction('suspend')}
                    className="w-full px-4 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors font-medium"
                  >
                    Zawieś konto
                  </button>
                ) : (
                  <button 
                    onClick={() => handleUserAction('activate')}
                    className="w-full px-4 py-3 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors font-medium"
                  >
                    Aktywuj konto
                  </button>
                )}
              </div>
            </div>

            {/* Plan Details */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Szczegóły planu</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Plan:</span>
                  <span className="font-medium">{user.plan}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className={`font-medium ${
                    user.status === 'active' ? 'text-green-600' : 
                    user.status === 'trial' ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {user.status === 'active' ? 'Aktywny' : user.status === 'trial' ? 'Trial' : 'Wygasł'}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ważny od:</span>
                  <span className="font-medium">{user.validFrom}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Ważny do:</span>
                  <span className="font-medium">{user.validTo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Łącznie zapłacił:</span>
                  <span className="font-medium">{user.totalPaid} zł</span>
                </div>
              </div>
            </div>

            {/* Order History */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Historia zamówień</h3>
              <div className="space-y-3">
                {user.orderHistory.map((order) => (
                  <div key={order.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <div className="text-sm font-medium text-gray-900">#{order.id}</div>
                      <div className="text-sm font-bold text-gray-900">{order.amount} zł</div>
                    </div>
                    <div className="text-sm text-gray-600">{order.plan}</div>
                    <div className="text-xs text-gray-500 mt-1">{order.date}</div>
                  </div>
                ))}
                <Link 
                  href="/a/orders"
                  className="text-sm text-indigo-600 hover:text-indigo-500"
                >
                  Zobacz wszystkie zamówienia →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
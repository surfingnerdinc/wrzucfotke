'use client';

import { useState } from 'react';
import { 
  UserIcon, 
  BuildingOfficeIcon,
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  EyeIcon,
  PhotoIcon,
  CalendarIcon,
  LinkIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon,
  PlusIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AdminUsersPage() {
  const [filter, setFilter] = useState<'all' | 'active' | 'expired' | 'trial'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock users data with magic links and comprehensive info
  const [users, setUsers] = useState([
    {
      id: 'USR-001',
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
      storageUsed: 1.2, // GB
      storageLimit: 50, // GB
      magicLink: 'https://wrzucfotke.pl/g/anna-tomek-2025',
      lastLogin: '2025-10-29 14:23',
      isActive: true
    },
    {
      id: 'USR-002',
      name: 'Eventex Sp. z o.o.',
      email: 'biuro@eventex.pl',
      phone: '+48 22 123 45 67',
      customerType: 'company',
      nip: '1234567890',
      plan: 'Pro',
      status: 'active',
      registrationDate: '2024-03-20',
      validFrom: '2025-09-01',
      validTo: '2025-12-01',
      daysLeft: 32,
      totalPaid: 1350, // 3x450
      galleries: 12,
      totalPhotos: 1543,
      storageUsed: 8.7, // GB
      storageLimit: 200, // GB
      magicLink: 'https://wrzucfotke.pl/g/eventex-corp',
      lastLogin: '2025-10-30 09:15',
      isActive: true
    },
    {
      id: 'USR-003',
      name: 'Tomasz Nowak',
      email: 'tomasz@example.com',
      phone: '+48 987 654 321',
      customerType: 'personal',
      plan: 'Wedding - Miesięczny',
      status: 'active',
      registrationDate: '2025-09-28',
      validFrom: '2025-10-30',
      validTo: '2025-11-30',
      daysLeft: 31,
      totalPaid: 500, // 2x250
      galleries: 1,
      totalPhotos: 89,
      storageUsed: 0.4, // GB
      storageLimit: 50, // GB
      magicLink: 'https://wrzucfotke.pl/g/tomek-kasia-wesele',
      lastLogin: '2025-10-30 12:45',
      isActive: true
    },
    {
      id: 'USR-004',
      name: 'Katarzyna Wiśniewska',
      email: 'kasia@example.com',
      phone: '+48 555 666 777',
      customerType: 'personal',
      plan: 'Starter',
      status: 'trial',
      registrationDate: '2025-10-25',
      validFrom: '2025-10-25',
      validTo: '2025-11-01',
      daysLeft: 2,
      totalPaid: 0,
      galleries: 1,
      totalPhotos: 15,
      storageUsed: 0.05, // GB
      storageLimit: 1, // GB
      magicLink: 'https://wrzucfotke.pl/g/kasia-urodziny',
      lastLogin: '2025-10-29 18:30',
      isActive: true
    },
    {
      id: 'USR-005',
      name: 'Photography Pro',
      email: 'contact@photopro.pl',
      phone: '+48 111 222 333',
      customerType: 'company',
      nip: '9876543210',
      plan: 'Pro',
      status: 'expired',
      registrationDate: '2024-01-10',
      validFrom: '2024-10-01',
      validTo: '2025-01-01',
      daysLeft: -303,
      totalPaid: 900, // 2x450
      galleries: 8,
      totalPhotos: 892,
      storageUsed: 4.2, // GB
      storageLimit: 200, // GB
      magicLink: 'https://wrzucfotke.pl/g/photopro-studio',
      lastLogin: '2024-12-28 16:20',
      isActive: false
    },
    {
      id: 'USR-006',
      name: 'Maria Zielińska',
      email: 'maria@example.com',
      phone: '+48 444 555 666',
      customerType: 'personal',
      plan: 'Wedding - Roczny',
      status: 'active',
      registrationDate: '2025-05-12',
      validFrom: '2025-08-15',
      validTo: '2026-08-15',
      daysLeft: 289,
      totalPaid: 600,
      galleries: 2,
      totalPhotos: 456,
      storageUsed: 2.8, // GB
      storageLimit: 50, // GB
      magicLink: 'https://wrzucfotke.pl/g/maria-piotr-slub',
      lastLogin: '2025-10-28 21:12',
      isActive: true
    }
  ]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'trial':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'expired':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'Aktywny';
      case 'trial':
        return 'Trial';
      case 'expired':
        return 'Wygasł';
      default:
        return 'Nieznany';
    }
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

  const getDaysLeftColor = (daysLeft: number) => {
    if (daysLeft < 0) return 'text-red-600';
    if (daysLeft <= 7) return 'text-orange-600';
    if (daysLeft <= 30) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStoragePercentage = (used: number, limit: number) => {
    return Math.min((used / limit) * 100, 100);
  };

  const getStorageColor = (percentage: number) => {
    if (percentage >= 90) return 'bg-red-500';
    if (percentage >= 75) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  // Filter users based on status and search term
  const filteredUsers = users.filter(user => {
    const matchesFilter = filter === 'all' || user.status === filter;
    const matchesSearch = 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.magicLink.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    {
      label: 'Wszyscy',
      count: users.length,
      filter: 'all' as const,
      color: 'text-gray-600'
    },
    {
      label: 'Aktywni',
      count: users.filter(u => u.status === 'active').length,
      filter: 'active' as const,
      color: 'text-green-600'
    },
    {
      label: 'Trial',
      count: users.filter(u => u.status === 'trial').length,
      filter: 'trial' as const,
      color: 'text-yellow-600'
    },
    {
      label: 'Wygasłe',
      count: users.filter(u => u.status === 'expired').length,
      filter: 'expired' as const,
      color: 'text-red-600'
    }
  ];

  const handleUserAction = (userId: string, action: 'extend' | 'suspend' | 'delete') => {
    // Here you would implement the actual user management logic
    console.log(`Action ${action} for user ${userId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link 
                href="/a"
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ArrowLeftIcon className="w-5 h-5 text-gray-500" />
              </Link>
              <h1 className="text-xl font-bold text-gray-900">Zarządzanie użytkownikami</h1>
            </div>

            <button className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-medium">
              <PlusIcon className="w-4 h-4 mr-2" />
              Dodaj użytkownika
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <button
              key={stat.filter}
              onClick={() => setFilter(stat.filter)}
              className={`p-4 bg-white rounded-lg border-2 text-left transition-colors ${
                filter === stat.filter 
                  ? 'border-indigo-200 bg-indigo-50' 
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="text-2xl font-bold text-gray-900">{stat.count}</div>
              <div className={`text-sm ${stat.color}`}>{stat.label}</div>
            </button>
          ))}
        </div>

        {/* Additional Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <PhotoIcon className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {users.reduce((sum, user) => sum + user.totalPhotos, 0)}
                </div>
                <div className="text-sm text-gray-600">Łączne zdjęcia</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <ChartBarIcon className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {users.reduce((sum, user) => sum + user.storageUsed, 0).toFixed(1)} GB
                </div>
                <div className="text-sm text-gray-600">Użyte miejsce</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <LinkIcon className="w-8 h-8 text-purple-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {users.reduce((sum, user) => sum + user.galleries, 0)}
                </div>
                <div className="text-sm text-gray-600">Aktywne galerie</div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <div className="flex items-center">
              <ExclamationTriangleIcon className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <div className="text-2xl font-bold text-gray-900">
                  {users.filter(u => u.daysLeft <= 7 && u.daysLeft >= 0).length}
                </div>
                <div className="text-sm text-gray-600">Wygasają w tygodniu</div>
              </div>
            </div>
          </div>
        </div>

        {/* Search and Filters */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj po nazwie, emailu, ID lub magic link..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            <div className="flex items-center space-x-2">
              <FunnelIcon className="w-5 h-5 text-gray-400" />
              <div className="flex space-x-1">
                {stats.map((stat) => (
                  <button
                    key={stat.filter}
                    onClick={() => setFilter(stat.filter)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                      filter === stat.filter
                        ? 'bg-indigo-100 text-indigo-700'
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {stat.label} ({stat.count})
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Użytkownicy ({filteredUsers.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Użytkownik
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan & Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Wykorzystanie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Magic Link
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Ważność
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredUsers.map((user) => {
                  const storagePercentage = getStoragePercentage(user.storageUsed, user.storageLimit);
                  
                  return (
                    <tr key={user.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <div className="shrink-0">
                            {user.customerType === 'company' ? (
                              <BuildingOfficeIcon className="w-8 h-8 text-gray-400" />
                            ) : (
                              <UserIcon className="w-8 h-8 text-gray-400" />
                            )}
                          </div>
                          <div>
                            <div className="text-sm font-medium text-gray-900">{user.name}</div>
                            <div className="text-sm text-gray-500">{user.email}</div>
                            <div className="text-xs text-gray-400">
                              ID: {user.id} • {user.customerType === 'company' ? `NIP: ${user.nip}` : user.phone}
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.plan}</div>
                          <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border mt-1 ${getStatusColor(user.status)}`}>
                            {getStatusIcon(user.status)}
                            <span className="ml-1">{getStatusText(user.status)}</span>
                          </div>
                          <div className="text-xs text-gray-500 mt-1">
                            Łącznie zapłacił: {user.totalPaid} zł
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Galerie:</span>
                            <span className="font-medium">{user.galleries}</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-600">Zdjęcia:</span>
                            <span className="font-medium">{user.totalPhotos}</span>
                          </div>
                          <div>
                            <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                              <span>Miejsce:</span>
                              <span>{user.storageUsed}GB / {user.storageLimit}GB</span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className={`h-2 rounded-full transition-all ${getStorageColor(storagePercentage)}`}
                                style={{ width: `${storagePercentage}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4">
                        <div className="max-w-xs">
                          <div className="text-xs text-gray-500 mb-1">Magic Link:</div>
                          <div className="flex items-center space-x-2">
                            <LinkIcon className="w-4 h-4 text-gray-400 shrink-0" />
                            <a 
                              href={user.magicLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-indigo-600 hover:text-indigo-500 truncate"
                            >
                              {user.magicLink.replace('https://wrzucfotke.pl/g/', '')}
                            </a>
                          </div>
                          <div className="text-xs text-gray-400 mt-1">
                            Ostatnie logowanie: {user.lastLogin}
                          </div>
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div>
                          <div className="text-sm text-gray-900">
                            {user.validFrom} - {user.validTo}
                          </div>
                          <div className={`text-sm font-medium ${getDaysLeftColor(user.daysLeft)}`}>
                            {user.daysLeft < 0 
                              ? `Wygasł ${Math.abs(user.daysLeft)} dni temu`
                              : user.daysLeft === 0 
                                ? 'Wygasa dziś!'
                                : `Pozostało ${user.daysLeft} dni`
                            }
                          </div>
                          {user.daysLeft <= 7 && user.daysLeft >= 0 && (
                            <div className="flex items-center mt-1">
                              <ExclamationTriangleIcon className="w-4 h-4 text-orange-500 mr-1" />
                              <span className="text-xs text-orange-600">Wymaga uwagi</span>
                            </div>
                          )}
                        </div>
                      </td>
                      
                      <td className="px-6 py-4 whitespace-nowrap text-sm space-x-1">
                        <div className="flex flex-col space-y-2">
                          <div className="flex space-x-1">
                            <Link
                              href={`/a/u/${user.id}`}
                              className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs hover:bg-gray-200 transition-colors"
                            >
                              <EyeIcon className="w-3 h-3 mr-1" />
                              Szczegóły
                            </Link>
                            
                            {user.daysLeft <= 30 && user.daysLeft >= 0 && (
                              <button
                                onClick={() => handleUserAction(user.id, 'extend')}
                                className="inline-flex items-center px-2 py-1 bg-green-100 text-green-700 rounded text-xs hover:bg-green-200 transition-colors"
                              >
                                <CalendarIcon className="w-3 h-3 mr-1" />
                                Przedłuż
                              </button>
                            )}
                          </div>
                          
                          <div className="flex space-x-1">
                            <button className="inline-flex items-center px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs hover:bg-blue-200 transition-colors">
                              <EnvelopeIcon className="w-3 h-3 mr-1" />
                              Email
                            </button>
                            
                            {user.isActive && (
                              <button
                                onClick={() => handleUserAction(user.id, 'suspend')}
                                className="inline-flex items-center px-2 py-1 bg-red-100 text-red-700 rounded text-xs hover:bg-red-200 transition-colors"
                              >
                                Zawieś
                              </button>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">Brak użytkowników</div>
              <div className="text-gray-400">Nie znaleziono użytkowników odpowiadających wybranym filtrom</div>
            </div>
          )}
        </div>

        {/* Quick Actions Panel */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wymagają uwagi</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Wygasają w tygodniu:</span>
                <span className="font-medium text-orange-600">
                  {users.filter(u => u.daysLeft <= 7 && u.daysLeft >= 0).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Już wygasłe:</span>
                <span className="font-medium text-red-600">
                  {users.filter(u => u.daysLeft < 0).length}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Na trialu:</span>
                <span className="font-medium text-yellow-600">
                  {users.filter(u => u.status === 'trial').length}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wykorzystanie zasobów</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Łączne zdjęcia:</span>
                <span className="font-medium">
                  {users.reduce((sum, user) => sum + user.totalPhotos, 0)}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Użyte miejsce:</span>
                <span className="font-medium">
                  {users.reduce((sum, user) => sum + user.storageUsed, 0).toFixed(1)} GB
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Aktywne galerie:</span>
                <span className="font-medium">
                  {users.reduce((sum, user) => sum + user.galleries, 0)}
                </span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Wyślij przypomnienia o wygaśnięciu
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Eksportuj listę użytkowników
              </button>
              <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                Raport wykorzystania
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
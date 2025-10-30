"use client";
import { 
  ClipboardDocumentListIcon, 
  UserGroupIcon, 
  CurrencyDollarIcon, 
  ChartBarIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AdminDashboard() {
  // Mock admin stats
  const stats = [
    {
      title: 'Aktywne zamówienia',
      value: '23',
      change: '+2 od wczoraj',
      icon: ClipboardDocumentListIcon,
      color: 'bg-blue-500'
    },
    {
      title: 'Oczekujące płatności',
      value: '7',
      change: '+3 nowe',
      icon: ExclamationTriangleIcon,
      color: 'bg-yellow-500'
    },
    {
      title: 'Przychód dziś',
      value: '2,450 zł',
      change: '+15% vs wczoraj',
      icon: CurrencyDollarIcon,
      color: 'bg-green-500'
    },
    {
      title: 'Aktywni użytkownicy',
      value: '156',
      change: '+12 nowych',
      icon: UserGroupIcon,
      color: 'bg-purple-500'
    }
  ];

  const recentOrders = [
    {
      id: 'WF-2025-001267',
      customer: 'Anna Kowalska',
      plan: 'Wedding - Roczny',
      amount: 600,
      status: 'pending',
      date: '2025-10-30 14:23'
    },
    {
      id: 'WF-2025-001266',
      customer: 'Tomasz Nowak',
      plan: 'Wedding - Miesięczny', 
      amount: 250,
      status: 'completed',
      date: '2025-10-30 12:45'
    },
    {
      id: 'WF-2025-001265',
      customer: 'Eventex Sp. z o.o.',
      plan: 'Pro',
      amount: 450,
      status: 'pending',
      date: '2025-10-30 10:15'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Panel Admina - WrzućFotkę.pl</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Zalogowano jako Admin</span>
              <Link 
                href="/"
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-900 transition-colors"
              >
                Wróć do strony głównej
              </Link>
              <button 
                onClick={() => {
                  document.cookie = 'admin-authenticated=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT';
                  window.location.href = '/admin-login';
                }}
                className="px-4 py-2 text-sm bg-red-100 text-red-700 hover:bg-red-200 rounded-lg transition-colors"
              >
                Wyloguj
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => {
            const IconComponent = stat.icon;
            return (
              <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                    <p className="text-xs text-green-600 mt-1">{stat.change}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          <Link 
            href="/a/o"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-lg flex items-center justify-center group-hover:bg-indigo-600 transition-colors">
                <ClipboardDocumentListIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-indigo-600">Zarządzaj zamówieniami</h3>
                <p className="text-sm text-gray-600">Przeglądaj i aktualizuj status zamówień</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/a/users"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-600 transition-colors">
                <UserGroupIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-green-600">Użytkownicy</h3>
                <p className="text-sm text-gray-600">Zarządzaj kontami użytkowników</p>
              </div>
            </div>
          </Link>

          <Link 
            href="/a/analytics"
            className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow group"
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center group-hover:bg-purple-600 transition-colors">
                <ChartBarIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 group-hover:text-purple-600">Analityka</h3>
                <p className="text-sm text-gray-600">Raporty sprzedaży i statystyki</p>
              </div>
            </div>
          </Link>
        </div>

        {/* Recent Orders Preview */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-semibold text-gray-900">Najnowsze zamówienia</h2>
            <Link 
              href="/a/o"
              className="text-indigo-600 hover:text-indigo-500 text-sm font-medium"
            >
              Zobacz wszystkie →
            </Link>
          </div>

          <div className="divide-y divide-gray-200">
            {recentOrders.map((order) => (
              <div key={order.id} className="px-6 py-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="shrink-0">
                      {order.status === 'completed' ? (
                        <CheckCircleIcon className="w-8 h-8 text-green-500" />
                      ) : (
                        <ClockIcon className="w-8 h-8 text-yellow-500" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{order.customer}</div>
                      <div className="text-sm text-gray-500">#{order.id} • {order.plan}</div>
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{order.amount} zł</div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
'use client';

import { useState } from 'react';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  XCircleIcon,
  EyeIcon,
  DocumentTextIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  ArrowLeftIcon
} from '@heroicons/react/24/outline';
import Link from 'next/link';

export default function AdminOrdersPage() {
  const [filter, setFilter] = useState<'all' | 'pending' | 'completed' | 'cancelled'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock orders data
  const [orders, setOrders] = useState([
    {
      id: 'WF-2025-001267',
      customer: 'Anna Kowalska',
      email: 'anna@example.com',
      plan: 'Wedding - Roczny',
      amount: 600,
      status: 'pending',
      paymentMethod: 'Karta płatnicza',
      date: '2025-10-30 14:23',
      customerType: 'personal',
      phone: '+48 123 456 789'
    },
    {
      id: 'WF-2025-001266',
      customer: 'Tomasz Nowak',
      email: 'tomasz@example.com',
      plan: 'Wedding - Miesięczny',
      amount: 250,
      status: 'completed',
      paymentMethod: 'PayPal',
      date: '2025-10-30 12:45',
      customerType: 'personal',
      phone: '+48 987 654 321'
    },
    {
      id: 'WF-2025-001265',
      customer: 'Eventex Sp. z o.o.',
      email: 'biuro@eventex.pl',
      plan: 'Pro',
      amount: 450,
      status: 'pending',
      paymentMethod: 'Przelew bankowy',
      date: '2025-10-30 10:15',
      customerType: 'company',
      nip: '1234567890'
    },
    {
      id: 'WF-2025-001264',
      customer: 'Katarzyna Wiśniewska',
      email: 'kasia@example.com',
      plan: 'Wedding - Roczny',
      amount: 600,
      status: 'completed',
      paymentMethod: 'BLIK',
      date: '2025-10-30 09:30',
      customerType: 'personal',
      phone: '+48 555 666 777'
    },
    {
      id: 'WF-2025-001263',
      customer: 'Photography Pro',
      email: 'contact@photopro.pl',
      plan: 'Pro',
      amount: 450,
      status: 'cancelled',
      paymentMethod: 'Karta płatnicza',
      date: '2025-10-29 16:20',
      customerType: 'company',
      nip: '9876543210'
    }
  ]);

  const handleStatusChange = (orderId: string, newStatus: 'completed' | 'cancelled') => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId ? { ...order, status: newStatus } : order
      )
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircleIcon className="w-5 h-5 text-green-500" />;
      case 'pending':
        return <ClockIcon className="w-5 h-5 text-yellow-500" />;
      case 'cancelled':
        return <XCircleIcon className="w-5 h-5 text-red-500" />;
      default:
        return <ClockIcon className="w-5 h-5 text-gray-500" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Opłacone';
      case 'pending':
        return 'Oczekuje';
      case 'cancelled':
        return 'Anulowane';
      default:
        return 'Nieznany';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-700 bg-green-50 border-green-200';
      case 'pending':
        return 'text-yellow-700 bg-yellow-50 border-yellow-200';
      case 'cancelled':
        return 'text-red-700 bg-red-50 border-red-200';
      default:
        return 'text-gray-700 bg-gray-50 border-gray-200';
    }
  };

  // Filter orders based on status and search term
  const filteredOrders = orders.filter(order => {
    const matchesFilter = filter === 'all' || order.status === filter;
    const matchesSearch = 
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.email.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = [
    {
      label: 'Wszystkie',
      count: orders.length,
      filter: 'all' as const,
      color: 'text-gray-600'
    },
    {
      label: 'Oczekujące',
      count: orders.filter(o => o.status === 'pending').length,
      filter: 'pending' as const,
      color: 'text-yellow-600'
    },
    {
      label: 'Opłacone',
      count: orders.filter(o => o.status === 'completed').length,
      filter: 'completed' as const,
      color: 'text-green-600'
    },
    {
      label: 'Anulowane',
      count: orders.filter(o => o.status === 'cancelled').length,
      filter: 'cancelled' as const,
      color: 'text-red-600'
    }
  ];

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
              <h1 className="text-xl font-bold text-gray-900">Zarządzanie zamówieniami</h1>
            </div>
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

        {/* Filters and Search */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj po nazwie, emailu lub numerze zamówienia..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Filter Buttons */}
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

        {/* Orders Table */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">
              Zamówienia ({filteredOrders.length})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Zamówienie
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Klient
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Plan
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Kwota
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Akcje
                  </th>
                </tr>
              </thead>
              
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-mono font-medium text-gray-900">#{order.id}</div>
                        <div className="text-sm text-gray-500">{order.date}</div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>
                        <div className="text-sm font-medium text-gray-900">{order.customer}</div>
                        <div className="text-sm text-gray-500">{order.email}</div>
                        <div className="text-xs text-gray-400">
                          {order.customerType === 'company' ? `NIP: ${order.nip}` : `Tel: ${order.phone}`}
                        </div>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{order.plan}</div>
                      <div className="text-sm text-gray-500">{order.paymentMethod}</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-bold text-gray-900">{order.amount} zł</div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                        {getStatusIcon(order.status)}
                        <span className="ml-2">{getStatusText(order.status)}</span>
                      </div>
                    </td>
                    
                    <td className="px-6 py-4 whitespace-nowrap text-sm space-x-2">
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'completed')}
                          className="inline-flex items-center px-3 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                        >
                          <CheckCircleIcon className="w-4 h-4 mr-1" />
                          Oznacz jako opłacone
                        </button>
                      )}
                      
                      {order.status === 'pending' && (
                        <button
                          onClick={() => handleStatusChange(order.id, 'cancelled')}
                          className="inline-flex items-center px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-medium"
                        >
                          <XCircleIcon className="w-4 h-4 mr-1" />
                          Anuluj
                        </button>
                      )}
                      
                      <Link 
                        href={`/a/o/${order.id}`}
                        className="inline-flex items-center px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                      >
                        <EyeIcon className="w-4 h-4 mr-1" />
                        Szczegóły
                      </Link>
                      
                      {order.status === 'completed' && (
                        <button className="inline-flex items-center px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium">
                          <DocumentTextIcon className="w-4 h-4 mr-1" />
                          Faktura
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 text-lg mb-2">Brak zamówień</div>
              <div className="text-gray-400">Nie znaleziono zamówień odpowiadających wybranym filtrom</div>
            </div>
          )}
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Dzisiejsze zamówienia</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Nowe zamówienia:</span>
                <span className="font-medium">5</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Opłacone dziś:</span>
                <span className="font-medium text-green-600">3</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Przychód:</span>
                <span className="font-medium">1,500 zł</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Wymagają uwagi</h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-600">Oczekują płatności:</span>
                <span className="font-medium text-yellow-600">{orders.filter(o => o.status === 'pending').length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Przeterminowane:</span>
                <span className="font-medium text-red-600">1</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Do kontaktu:</span>
                <span className="font-medium">2</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h3>
            <div className="space-y-3">
              <button className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors text-sm font-medium">
                Eksportuj raport
              </button>
              <button className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium">
                Wyślij przypomnienia
              </button>
              <button className="w-full px-4 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium">
                Generuj faktury
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
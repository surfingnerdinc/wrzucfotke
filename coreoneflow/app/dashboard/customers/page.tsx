'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { usePlan } from '../../contexts/PlanContext';

interface Customer {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  status: 'active' | 'prospect' | 'inactive' | 'vip';
  avatar: string;
  lastActivity: string;
  totalValue: string;
  projectsCount: number;
  healthScore: number;
  tags: string[];
  country: string;
  joinDate: string;
  nextMeeting?: string;
}

export default function CustomersPage() {
  const {
    userPlan,
    usage,
    canCreateMore,
    getUsagePercentage,
    isUsageNearLimit,
    setShowUpgradeModal,
    incrementUsage,
  } = usePlan();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('customers');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'kanban'>('grid');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'value' | 'activity' | 'health'>('name');

  const user = {
    name: 'Marcin Dubinski',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: userPlan.displayName
  };

  const customers: Customer[] = [
    {
      id: 'tech-corp',
      name: 'Anna Kowalska',
      company: 'TechCorp Solutions',
      email: 'anna@techcorp.pl',
      phone: '+48 123 456 789',
      status: 'vip',
      avatar: '👩‍💼',
      lastActivity: '2 godz. temu',
      totalValue: '€125,000',
      projectsCount: 5,
      healthScore: 95,
      tags: ['Enterprise', 'Tech'],
      country: 'Poland',
      joinDate: '2024-01-15',
      nextMeeting: 'Jutro, 14:00'
    },
    {
      id: 'startup-xyz',
      name: 'Marek Nowak',
      company: 'StartupXYZ',
      email: 'marek@startupxyz.com',
      phone: '+48 987 654 321',
      status: 'active',
      avatar: '👨‍🚀',
      lastActivity: '1 dzień temu',
      totalValue: '€45,000',
      projectsCount: 2,
      healthScore: 78,
      tags: ['Startup', 'SaaS'],
      country: 'Poland',
      joinDate: '2024-03-20'
    },
    {
      id: 'global-inc',
      name: 'Sarah Johnson',
      company: 'Global Inc.',
      email: 'sarah@global-inc.com',
      phone: '+1 555 123 4567',
      status: 'active',
      avatar: '👩‍💻',
      lastActivity: '3 dni temu',
      totalValue: '€89,500',
      projectsCount: 3,
      healthScore: 85,
      tags: ['Global', 'Manufacturing'],
      country: 'USA',
      joinDate: '2023-11-10'
    },
    {
      id: 'future-tech',
      name: 'Piotr Zieliński',
      company: 'Future Tech',
      email: 'piotr@futuretech.pl',
      phone: '+48 666 777 888',
      status: 'prospect',
      avatar: '👨‍🔬',
      lastActivity: '1 tydzień temu',
      totalValue: '€0',
      projectsCount: 0,
      healthScore: 42,
      tags: ['AI', 'Innovation'],
      country: 'Poland',
      joinDate: '2024-10-01'
    },
    {
      id: 'legacy-corp',
      name: 'Robert Smith',
      company: 'Legacy Corp',
      email: 'robert@legacy.com',
      phone: '+44 20 1234 5678',
      status: 'inactive',
      avatar: '👨‍💼',
      lastActivity: '2 tygodnie temu',
      totalValue: '€25,000',
      projectsCount: 1,
      healthScore: 25,
      tags: ['Legacy', 'Consulting'],
      country: 'UK',
      joinDate: '2023-08-15'
    },
    {
      id: 'innovation-lab',
      name: 'Maria Garcia',
      company: 'Innovation Lab',
      email: 'maria@innovationlab.es',
      phone: '+34 91 123 4567',
      status: 'active',
      avatar: '👩‍🔬',
      lastActivity: '4 godz. temu',
      totalValue: '€67,800',
      projectsCount: 4,
      healthScore: 92,
      tags: ['Innovation', 'Research'],
      country: 'Spain',
      joinDate: '2024-02-28'
    }
  ];

  const filteredCustomers = customers
    .filter(customer => {
      if (filterStatus !== 'all' && customer.status !== filterStatus) return false;
      if (searchQuery && !customer.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !customer.company.toLowerCase().includes(searchQuery.toLowerCase()) &&
          !customer.email.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'value':
          return parseInt(b.totalValue.replace(/[€,]/g, '')) - parseInt(a.totalValue.replace(/[€,]/g, ''));
        case 'activity':
          return new Date(b.lastActivity).getTime() - new Date(a.lastActivity).getTime();
        case 'health':
          return b.healthScore - a.healthScore;
        default:
          return a.name.localeCompare(b.name);
      }
    });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'vip': return 'bg-purple-100 text-purple-700 border-purple-200';
      case 'active': return 'bg-green-100 text-green-700 border-green-200';
      case 'prospect': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'inactive': return 'bg-gray-100 text-gray-700 border-gray-200';
      default: return 'bg-gray-100 text-gray-700 border-gray-200';
    }
  };

  const getHealthScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const CustomerCard = ({ customer }: { customer: Customer }) => (
    <Link href={`/dashboard/customers/${customer.id}`}>
      <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-2xl">
              {customer.avatar}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-purple-600 transition-colors">
                {customer.name}
              </h3>
              <p className="text-sm text-gray-500">{customer.company}</p>
            </div>
          </div>
          <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getStatusColor(customer.status)}`}>
            {customer.status.toUpperCase()}
          </span>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-xs text-gray-500">Wartość całkowita</p>
            <p className="font-semibold text-gray-900">{customer.totalValue}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Projekty</p>
            <p className="font-semibold text-gray-900">{customer.projectsCount}</p>
          </div>
        </div>

        {/* Health Score */}
        <div className="mb-4">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-500">Health Score</span>
            <span className={`text-sm font-semibold ${getHealthScoreColor(customer.healthScore)}`}>
              {customer.healthScore}%
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className={`h-2 rounded-full ${
                customer.healthScore >= 80 ? 'bg-green-500' :
                customer.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${customer.healthScore}%` }}
            ></div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mb-3">
          {customer.tags.slice(0, 2).map((tag, index) => (
            <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {tag}
            </span>
          ))}
        </div>

        {/* Footer */}
        <div className="flex justify-between items-center text-xs text-gray-500">
          <span>📅 {customer.lastActivity}</span>
          {customer.nextMeeting && (
            <span className="text-purple-600 font-medium">📞 {customer.nextMeeting}</span>
          )}
        </div>
      </div>
    </Link>
  );

  const CustomerListItem = ({ customer }: { customer: Customer }) => (
    <Link href={`/dashboard/customers/${customer.id}`}>
      <div className="bg-white border-b border-gray-100 p-4 hover:bg-gray-50 transition-colors cursor-pointer">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 flex-1">
            <div className="w-10 h-10 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center">
              {customer.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2">
                <h3 className="font-medium text-gray-900 truncate">{customer.name}</h3>
                <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(customer.status)}`}>
                  {customer.status}
                </span>
              </div>
              <p className="text-sm text-gray-500 truncate">{customer.company} • {customer.email}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-6 text-sm">
            <div className="text-center">
              <p className="font-semibold text-gray-900">{customer.totalValue}</p>
              <p className="text-xs text-gray-500">Wartość</p>
            </div>
            <div className="text-center">
              <p className="font-semibold text-gray-900">{customer.projectsCount}</p>
              <p className="text-xs text-gray-500">Projekty</p>
            </div>
            <div className="text-center">
              <p className={`font-semibold ${getHealthScoreColor(customer.healthScore)}`}>
                {customer.healthScore}%
              </p>
              <p className="text-xs text-gray-500">Health</p>
            </div>
            <div className="text-center min-w-20">
              <p className="font-medium text-gray-700">{customer.lastActivity}</p>
              <p className="text-xs text-gray-500">Ostatnia aktywność</p>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSection={activeTab}
        onSectionChange={setActiveTab}
        user={user}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          user={user}
          onSearch={setSearchQuery}
        />

        <main className="flex-1 p-6">
          {/* Page Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Klienci</h1>
                <p className="text-gray-600">Zarządzaj swoimi klientami i śledź ich aktywność</p>
              </div>
              {canCreateMore('customers') ? (
                <button 
                  onClick={() => {
                    // Add customer logic here
                    incrementUsage('customers');
                  }}
                  className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium"
                >
                  ➕ Dodaj Klienta
                </button>
              ) : (
                <div className="relative group">
                  <button 
                    disabled
                    className="bg-gray-400 text-white px-6 py-3 rounded-lg font-medium cursor-not-allowed opacity-60"
                  >
                    ➕ Dodaj Klienta
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    <div className="flex items-start space-x-3">
                      <span className="text-orange-500 text-xl">⚠️</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Osiągnięto limit klientów</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Twój plan {userPlan.displayName} pozwala na maksymalnie {userPlan.limits.customers === -1 ? 'nieograniczoną liczbę' : userPlan.limits.customers} klientów.
                        </p>
                        <button
                          onClick={() => setShowUpgradeModal(true)}
                          className="bg-purple-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-purple-600 transition-colors"
                        >
                          Upgrade planu
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-4 gap-6 mb-6">
              <div className={`bg-white rounded-lg p-4 border-2 ${
                isUsageNearLimit('customers') ? 'border-orange-200' : 'border-gray-200'
              }`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                      <span className="text-green-600 text-lg">👥</span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Klienci</p>
                      <p className="text-xl font-bold text-gray-900">
                        {usage.customers}
                        {userPlan.limits.customers !== -1 && (
                          <span className="text-sm text-gray-500 font-normal">
                            /{userPlan.limits.customers}
                          </span>
                        )}
                      </p>
                    </div>
                  </div>
                  {isUsageNearLimit('customers') && (
                    <span className="text-orange-500">⚠️</span>
                  )}
                </div>
                {userPlan.limits.customers !== -1 && (
                  <div className="mt-3">
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          isUsageNearLimit('customers') ? 'bg-orange-500' : 'bg-green-500'
                        }`}
                        style={{ width: `${Math.min(getUsagePercentage('customers'), 100)}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {getUsagePercentage('customers')}% wykorzystane
                    </p>
                  </div>
                )}
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-lg">⭐</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">VIP Klienci</p>
                    <p className="text-xl font-bold text-gray-900">{customers.filter(c => c.status === 'vip').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">🎯</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Prospekty</p>
                    <p className="text-xl font-bold text-gray-900">{customers.filter(c => c.status === 'prospect').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-cyan-100 rounded-lg flex items-center justify-center">
                    <span className="text-cyan-600 text-lg">💰</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Łączna wartość</p>
                    <p className="text-xl font-bold text-gray-900">€352K</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Filters and Controls */}
            <div className="bg-white rounded-lg border border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {/* Search */}
                  <div className="relative">
                    <input
                      type="text"
                      placeholder="Szukaj klientów..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                  </div>

                  {/* Status Filter */}
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="all">Wszystkie statusy</option>
                    <option value="vip">VIP</option>
                    <option value="active">Aktywni</option>
                    <option value="prospect">Prospekty</option>
                    <option value="inactive">Nieaktywni</option>
                  </select>

                  {/* Sort */}
                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="name">Sortuj: Nazwa</option>
                    <option value="value">Sortuj: Wartość</option>
                    <option value="activity">Sortuj: Aktywność</option>
                    <option value="health">Sortuj: Health Score</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Widok:</span>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`px-3 py-2 text-sm ${viewMode === 'grid' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      ⊞ Kafelki
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      ☰ Lista
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Display */}
          {viewMode === 'grid' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredCustomers.map((customer) => (
                <CustomerCard key={customer.id} customer={customer} />
              ))}
            </div>
          ) : (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="border-b border-gray-200 p-4 bg-gray-50">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-900">Lista klientów ({filteredCustomers.length})</h3>
                </div>
              </div>
              {filteredCustomers.map((customer) => (
                <CustomerListItem key={customer.id} customer={customer} />
              ))}
            </div>
          )}

          {/* Empty State */}
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-gray-400">👥</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Brak klientów</h3>
              <p className="text-gray-500 mb-4">Nie znaleziono klientów spełniających kryteria wyszukiwania.</p>
              <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                Wyczyść filtry
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

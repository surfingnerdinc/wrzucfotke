'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';

interface CustomerDetail {
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
  address: string;
  website: string;
  industry: string;
  companySize: string;
  timezone: string;
  nextMeeting?: string;
  socialMedia: {
    linkedin?: string;
    twitter?: string;
  };
  recentActivity: Array<{
    id: string;
    type: 'meeting' | 'email' | 'call' | 'project' | 'payment';
    title: string;
    description: string;
    date: string;
    status?: 'completed' | 'pending' | 'cancelled';
  }>;
  projects: Array<{
    id: string;
    name: string;
    status: 'active' | 'completed' | 'paused';
    progress: number;
    value: string;
    startDate: string;
    endDate?: string;
  }>;
  payments: Array<{
    id: string;
    amount: string;
    date: string;
    status: 'paid' | 'pending' | 'overdue';
    invoice: string;
  }>;
  notes: Array<{
    id: string;
    content: string;
    author: string;
    date: string;
    type: 'note' | 'important' | 'reminder';
  }>;
}

export default function CustomerDetailPage() {
  const params = useParams();
  const customerId = params.slug as string;
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('customers');
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'projects' | 'activity' | 'payments' | 'notes'>('overview');
  const [newNote, setNewNote] = useState('');

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: 'Professional'
  };

  // Mock customer data - in real app would come from API
  const customerData: CustomerDetail = {
    id: customerId,
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
    tags: ['Enterprise', 'Tech', 'VIP'],
    country: 'Poland',
    joinDate: '2024-01-15',
    address: 'ul. Technologiczna 15, 00-001 Warszawa, Polska',
    website: 'https://techcorp.pl',
    industry: 'Technology',
    companySize: '50-200 employees',
    timezone: 'CET (UTC+1)',
    nextMeeting: 'Jutro, 14:00 - Q4 Planning Meeting',
    socialMedia: {
      linkedin: 'https://linkedin.com/company/techcorp',
      twitter: 'https://twitter.com/techcorp'
    },
    recentActivity: [
      {
        id: '1',
        type: 'meeting',
        title: 'Quarterly Business Review',
        description: 'Przegląd wyników Q3 i planowanie Q4',
        date: '2024-10-22 14:00',
        status: 'completed'
      },
      {
        id: '2',
        type: 'email',
        title: 'Wysłano propozycję projektu',
        description: 'Nowy system CRM - propozycja techniczna',
        date: '2024-10-21 10:30',
        status: 'pending'
      },
      {
        id: '3',
        type: 'call',
        title: 'Call techniczny',
        description: 'Konsultacja architektury systemu',
        date: '2024-10-20 16:15',
        status: 'completed'
      },
      {
        id: '4',
        type: 'payment',
        title: 'Płatność otrzymana',
        description: 'Faktura #INV-2024-156 - €25,000',
        date: '2024-10-19 09:00',
        status: 'completed'
      }
    ],
    projects: [
      {
        id: 'proj-1',
        name: 'CRM System Implementation',
        status: 'active',
        progress: 75,
        value: '€45,000',
        startDate: '2024-08-01',
        endDate: '2024-12-15'
      },
      {
        id: 'proj-2',
        name: 'Data Migration Project',
        status: 'completed',
        progress: 100,
        value: '€25,000',
        startDate: '2024-03-01',
        endDate: '2024-06-30'
      },
      {
        id: 'proj-3',
        name: 'AI Integration Module',
        status: 'active',
        progress: 45,
        value: '€35,000',
        startDate: '2024-09-15',
        endDate: '2025-02-28'
      }
    ],
    payments: [
      {
        id: 'pay-1',
        amount: '€25,000',
        date: '2024-10-19',
        status: 'paid',
        invoice: 'INV-2024-156'
      },
      {
        id: 'pay-2',
        amount: '€15,000',
        date: '2024-11-15',
        status: 'pending',
        invoice: 'INV-2024-178'
      },
      {
        id: 'pay-3',
        amount: '€35,000',
        date: '2024-08-15',
        status: 'paid',
        invoice: 'INV-2024-134'
      }
    ],
    notes: [
      {
        id: 'note-1',
        content: 'Klient bardzo zadowolony z postępów projektu CRM. Planuje rozszerzenie o moduł AI w Q1 2025.',
        author: 'Marcin Dubiński',
        date: '2024-10-22 15:30',
        type: 'important'
      },
      {
        id: 'note-2',
        content: 'Spotkanie z zespołem technicznym zaplanowane na przyszły tydzień. Omówienie architektury systemu.',
        author: 'Anna Nowak',
        date: '2024-10-21 11:00',
        type: 'reminder'
      },
      {
        id: 'note-3',
        content: 'TechCorp rozważa zakup dodatkowych licencji. Przygotować ofertę do końca tygodnia.',
        author: 'Piotr Kowal',
        date: '2024-10-20 09:15',
        type: 'note'
      }
    ]
  };

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

  const getProjectStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-700';
      case 'completed': return 'bg-blue-100 text-blue-700';
      case 'paused': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'bg-green-100 text-green-700';
      case 'pending': return 'bg-yellow-100 text-yellow-700';
      case 'overdue': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'meeting': return '📅';
      case 'email': return '📧';
      case 'call': return '📞';
      case 'project': return '📋';
      case 'payment': return '💰';
      default: return '📝';
    }
  };

  const getNoteTypeColor = (type: string) => {
    switch (type) {
      case 'important': return 'bg-red-50 border-red-200';
      case 'reminder': return 'bg-yellow-50 border-yellow-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const getNoteTypeIcon = (type: string) => {
    switch (type) {
      case 'important': return '⚠️';
      case 'reminder': return '⏰';
      default: return '📝';
    }
  };

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
          onSearch={(query) => console.log('Search:', query)}
        />

        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-6">
            <Link href="/dashboard" className="hover:text-gray-700">Dashboard</Link>
            <span>›</span>
            <Link href="/dashboard/customers" className="hover:text-gray-700">Klienci</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{customerData.name}</span>
          </nav>

          {/* Customer Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-3xl">
                  {customerData.avatar}
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{customerData.name}</h1>
                  <p className="text-lg text-gray-600">{customerData.company}</p>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(customerData.status)}`}>
                      {customerData.status.toUpperCase()}
                    </span>
                    <span className="text-sm text-gray-500">Klient od {customerData.joinDate}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  📧 Wyślij Email
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  📞 Zadzwoń
                </button>
                <button className="px-4 py-2 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg hover:shadow-lg transition-all">
                  📅 Umów spotkanie
                </button>
              </div>
            </div>

            {/* Key Metrics */}
            <div className="grid grid-cols-5 gap-6">
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{customerData.totalValue}</p>
                <p className="text-sm text-gray-500">Łączna wartość</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{customerData.projectsCount}</p>
                <p className="text-sm text-gray-500">Projekty</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className={`text-2xl font-bold ${getHealthScoreColor(customerData.healthScore)}`}>
                  {customerData.healthScore}%
                </p>
                <p className="text-sm text-gray-500">Health Score</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-gray-900">{customerData.lastActivity}</p>
                <p className="text-sm text-gray-500">Ostatnia aktywność</p>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-lg">
                <p className="text-2xl font-bold text-purple-600">
                  {customerData.nextMeeting ? '📅' : '—'}
                </p>
                <p className="text-sm text-gray-500">Następne spotkanie</p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Przegląd', icon: '📊' },
                  { id: 'projects', label: 'Projekty', icon: '📋' },
                  { id: 'activity', label: 'Aktywność', icon: '📈' },
                  { id: 'payments', label: 'Płatności', icon: '💰' },
                  { id: 'notes', label: 'Notatki', icon: '📝' }
                ].map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveDetailTab(tab.id as any)}
                    className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-sm transition-colors ${
                      activeDetailTab === tab.id
                        ? 'border-purple-500 text-purple-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    <span>{tab.icon}</span>
                    <span>{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>

            <div className="p-6">
              {/* Overview Tab */}
              {activeDetailTab === 'overview' && (
                <div className="space-y-6">
                  {/* Contact Information */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Informacje kontaktowe</h3>
                      <div className="space-y-3">
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400">📧</span>
                          <a href={`mailto:${customerData.email}`} className="text-purple-600 hover:text-purple-700">
                            {customerData.email}
                          </a>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400">📞</span>
                          <a href={`tel:${customerData.phone}`} className="text-purple-600 hover:text-purple-700">
                            {customerData.phone}
                          </a>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400">🌐</span>
                          <a href={customerData.website} target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:text-purple-700">
                            {customerData.website}
                          </a>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-gray-400">📍</span>
                          <span className="text-gray-700">{customerData.address}</span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Informacje o firmie</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Branża</p>
                          <p className="font-medium text-gray-900">{customerData.industry}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Wielkość firmy</p>
                          <p className="font-medium text-gray-900">{customerData.companySize}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Strefa czasowa</p>
                          <p className="font-medium text-gray-900">{customerData.timezone}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Tagi</p>
                          <div className="flex flex-wrap gap-2 mt-1">
                            {customerData.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Next Meeting */}
                  {customerData.nextMeeting && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-blue-600 text-xl">📅</span>
                        <div>
                          <h4 className="font-semibold text-blue-900">Następne spotkanie</h4>
                          <p className="text-blue-700">{customerData.nextMeeting}</p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Health Score Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Health Score Analysis</h3>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <span className="font-medium text-gray-900">Ogólny Health Score</span>
                        <span className={`text-xl font-bold ${getHealthScoreColor(customerData.healthScore)}`}>
                          {customerData.healthScore}%
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
                        <div 
                          className={`h-3 rounded-full ${
                            customerData.healthScore >= 80 ? 'bg-green-500' :
                            customerData.healthScore >= 60 ? 'bg-yellow-500' : 'bg-red-500'
                          }`}
                          style={{ width: `${customerData.healthScore}%` }}
                        ></div>
                      </div>
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div className="text-center">
                          <p className="text-green-600 font-semibold">Engagement: 92%</p>
                          <p className="text-gray-500">Wysoka aktywność</p>
                        </div>
                        <div className="text-center">
                          <p className="text-yellow-600 font-semibold">Satisfaction: 88%</p>
                          <p className="text-gray-500">Bardzo zadowolony</p>
                        </div>
                        <div className="text-center">
                          <p className="text-green-600 font-semibold">Revenue: 95%</p>
                          <p className="text-gray-500">Wysoka wartość</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Projects Tab */}
              {activeDetailTab === 'projects' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Projekty ({customerData.projects.length})</h3>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                      ➕ Nowy projekt
                    </button>
                  </div>
                  
                  {customerData.projects.map((project) => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.name}</h4>
                          <p className="text-sm text-gray-500">
                            {project.startDate} - {project.endDate || 'Ongoing'}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className={`px-2 py-1 text-xs rounded-full ${getProjectStatusColor(project.status)}`}>
                            {project.status.toUpperCase()}
                          </span>
                          <p className="font-semibold text-gray-900 mt-1">{project.value}</p>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-gray-500">Postęp</span>
                          <span className="font-medium">{project.progress}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${project.progress}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Activity Tab */}
              {activeDetailTab === 'activity' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Ostatnia aktywność</h3>
                  
                  <div className="space-y-3">
                    {customerData.recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-start space-x-4 p-4 border border-gray-200 rounded-lg">
                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                          <span className="text-lg">{getActivityIcon(activity.type)}</span>
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{activity.title}</h4>
                          <p className="text-sm text-gray-600 mb-1">{activity.description}</p>
                          <p className="text-xs text-gray-500">{activity.date}</p>
                        </div>
                        {activity.status && (
                          <span className={`px-2 py-1 text-xs rounded-full ${
                            activity.status === 'completed' ? 'bg-green-100 text-green-700' :
                            activity.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {activity.status}
                          </span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Payments Tab */}
              {activeDetailTab === 'payments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Płatności</h3>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors">
                      ➕ Dodaj płatność
                    </button>
                  </div>
                  
                  <div className="overflow-hidden border border-gray-200 rounded-lg">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Faktura
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Kwota
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Data
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Status
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {customerData.payments.map((payment) => (
                          <tr key={payment.id}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                              {payment.invoice}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                              {payment.amount}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {payment.date}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className={`px-2 py-1 text-xs rounded-full ${getPaymentStatusColor(payment.status)}`}>
                                {payment.status.toUpperCase()}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Notes Tab */}
              {activeDetailTab === 'notes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Notatki</h3>
                  </div>

                  {/* Add Note Form */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <textarea
                      value={newNote}
                      onChange={(e) => setNewNote(e.target.value)}
                      placeholder="Dodaj nową notatkę..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200">
                          📝 Notatka
                        </button>
                        <button className="px-3 py-1 text-xs bg-red-100 text-red-700 rounded-full hover:bg-red-200">
                          ⚠️ Ważne
                        </button>
                        <button className="px-3 py-1 text-xs bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200">
                          ⏰ Przypomnienie
                        </button>
                      </div>
                      <button 
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
                        disabled={!newNote.trim()}
                      >
                        Dodaj notatkę
                      </button>
                    </div>
                  </div>

                  {/* Notes List */}
                  <div className="space-y-3">
                    {customerData.notes.map((note) => (
                      <div key={note.id} className={`border rounded-lg p-4 ${getNoteTypeColor(note.type)}`}>
                        <div className="flex items-start space-x-3">
                          <span className="text-lg">{getNoteTypeIcon(note.type)}</span>
                          <div className="flex-1">
                            <p className="text-gray-900 mb-2">{note.content}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>👤 {note.author}</span>
                              <span>📅 {note.date}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

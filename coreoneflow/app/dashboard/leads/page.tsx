'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

interface Lead {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  company?: string;
  jobTitle?: string;
  source: 'website' | 'linkedin' | 'referral' | 'cold-call' | 'event' | 'social-media' | 'advertisement' | 'other';
  status: 'new' | 'contacted' | 'qualified' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost';
  score: number; // 0-100
  temperature: 'cold' | 'warm' | 'hot';
  assignedTo: {
    id: string;
    name: string;
    avatar: string;
  };
  tags: string[];
  interests: string[];
  budget?: {
    min: number;
    max: number;
    currency: string;
  };
  timeline?: string;
  notes: Array<{
    id: string;
    content: string;
    author: string;
    timestamp: string;
    type: 'note' | 'call' | 'email' | 'meeting';
  }>;
  activities: Array<{
    id: string;
    type: 'created' | 'contacted' | 'email-sent' | 'call-made' | 'meeting-scheduled' | 'status-changed' | 'score-updated';
    description: string;
    timestamp: string;
    author: string;
  }>;
  customFields?: Record<string, any>;
  createdAt: string;
  updatedAt: string;
  lastContactDate?: string;
  nextFollowupDate?: string;
  conversionProbability?: number;
  estimatedValue?: number;
  campaignSource?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
}

interface LeadStats {
  totalLeads: number;
  newLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  averageScore: number;
  hotLeads: number;
  totalValue: number;
}

export default function LeadsPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('leads');
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'pipeline' | 'analytics'>('grid');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [showLeadModal, setShowLeadModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string[]>(['new', 'contacted', 'qualified', 'proposal', 'negotiation']);
  const [filterTemperature, setFilterTemperature] = useState<string[]>(['cold', 'warm', 'hot']);
  const [filterSource, setFilterSource] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'score' | 'created' | 'updated' | 'name' | 'company'>('score');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: 'Professional'
  };

  // Mock leads data
  const leads: Lead[] = [
    {
      id: 'lead-1',
      firstName: 'Anna',
      lastName: 'Kowalska',
      email: 'anna.kowalska@techcorp.com',
      phone: '+48 123 456 789',
      company: 'TechCorp Solutions',
      jobTitle: 'IT Director',
      source: 'website',
      status: 'qualified',
      score: 85,
      temperature: 'hot',
      assignedTo: {
        id: 'user-1',
        name: 'Marcin Dubiński',
        avatar: '👨‍💼'
      },
      tags: ['enterprise', 'crm-interest', 'tech-sector'],
      interests: ['CRM System', 'Automation', 'AI Integration'],
      budget: {
        min: 50000,
        max: 100000,
        currency: 'PLN'
      },
      timeline: 'Q1 2025',
      notes: [
        {
          id: 'note-1',
          content: 'Very interested in AI-powered CRM features. Asked about custom integrations.',
          author: 'Marcin Dubiński',
          timestamp: '2024-10-24T14:30:00',
          type: 'call'
        },
        {
          id: 'note-2',
          content: 'Sent detailed proposal with pricing tiers. Waiting for internal review.',
          author: 'Marcin Dubiński',
          timestamp: '2024-10-23T16:00:00',
          type: 'email'
        }
      ],
      activities: [
        {
          id: 'act-1',
          type: 'call-made',
          description: 'Discovery call completed - 45 minutes',
          timestamp: '2024-10-24T14:30:00',
          author: 'Marcin Dubiński'
        },
        {
          id: 'act-2',
          type: 'score-updated',
          description: 'Lead score increased from 70 to 85',
          timestamp: '2024-10-24T14:45:00',
          author: 'System'
        }
      ],
      createdAt: '2024-10-20T10:00:00',
      updatedAt: '2024-10-24T14:45:00',
      lastContactDate: '2024-10-24T14:30:00',
      nextFollowupDate: '2024-10-28T09:00:00',
      conversionProbability: 75,
      estimatedValue: 75000,
      campaignSource: 'Google Ads - CRM Software',
      utmSource: 'google',
      utmMedium: 'cpc',
      utmCampaign: 'crm-software-2024'
    },
    {
      id: 'lead-2',
      firstName: 'Piotr',
      lastName: 'Nowak',
      email: 'piotr.nowak@shoptech.pl',
      phone: '+48 987 654 321',
      company: 'ShopTech',
      jobTitle: 'CEO',
      source: 'linkedin',
      status: 'proposal',
      score: 78,
      temperature: 'hot',
      assignedTo: {
        id: 'user-2',
        name: 'Anna Wiśniewska',
        avatar: '👩‍💼'
      },
      tags: ['e-commerce', 'startup', 'growth-stage'],
      interests: ['E-commerce Integration', 'Customer Analytics', 'Mobile CRM'],
      budget: {
        min: 30000,
        max: 60000,
        currency: 'PLN'
      },
      timeline: 'Q4 2024',
      notes: [
        {
          id: 'note-3',
          content: 'Needs integration with existing e-commerce platform. Discussed API capabilities.',
          author: 'Anna Wiśniewska',
          timestamp: '2024-10-23T11:00:00',
          type: 'meeting'
        }
      ],
      activities: [
        {
          id: 'act-3',
          type: 'meeting-scheduled',
          description: 'Demo meeting scheduled for next week',
          timestamp: '2024-10-23T11:30:00',
          author: 'Anna Wiśniewska'
        }
      ],
      createdAt: '2024-10-18T15:30:00',
      updatedAt: '2024-10-23T11:30:00',
      lastContactDate: '2024-10-23T11:00:00',
      nextFollowupDate: '2024-10-30T14:00:00',
      conversionProbability: 65,
      estimatedValue: 45000,
      campaignSource: 'LinkedIn Outreach',
      utmSource: 'linkedin',
      utmMedium: 'social'
    },
    {
      id: 'lead-3',
      firstName: 'Michał',
      lastName: 'Wiśniewski',
      email: 'michal@financebank.com',
      phone: '+48 555 123 456',
      company: 'FinanceBank',
      jobTitle: 'Digital Transformation Manager',
      source: 'referral',
      status: 'contacted',
      score: 62,
      temperature: 'warm',
      assignedTo: {
        id: 'user-1',
        name: 'Marcin Dubiński',
        avatar: '👨‍💼'
      },
      tags: ['banking', 'enterprise', 'compliance'],
      interests: ['Security Features', 'Compliance Tools', 'Data Analytics'],
      budget: {
        min: 100000,
        max: 200000,
        currency: 'PLN'
      },
      timeline: 'H1 2025',
      notes: [
        {
          id: 'note-4',
          content: 'Initial contact made. Strong interest in security and compliance features.',
          author: 'Marcin Dubiński',
          timestamp: '2024-10-22T10:15:00',
          type: 'call'
        }
      ],
      activities: [
        {
          id: 'act-4',
          type: 'contacted',
          description: 'First phone call completed',
          timestamp: '2024-10-22T10:15:00',
          author: 'Marcin Dubiński'
        }
      ],
      createdAt: '2024-10-21T09:00:00',
      updatedAt: '2024-10-22T10:15:00',
      lastContactDate: '2024-10-22T10:15:00',
      nextFollowupDate: '2024-10-29T15:00:00',
      conversionProbability: 45,
      estimatedValue: 150000,
      campaignSource: 'Client Referral - TechCorp'
    },
    {
      id: 'lead-4',
      firstName: 'Katarzyna',
      lastName: 'Zielińska',
      email: 'k.zielinska@medtech.pl',
      company: 'MedTech Innovation',
      jobTitle: 'Operations Manager',
      source: 'event',
      status: 'new',
      score: 45,
      temperature: 'warm',
      assignedTo: {
        id: 'user-3',
        name: 'Tomasz Kowalski',
        avatar: '👨‍💻'
      },
      tags: ['healthcare', 'innovation', 'small-business'],
      interests: ['Patient Management', 'GDPR Compliance', 'Mobile Access'],
      notes: [
        {
          id: 'note-5',
          content: 'Met at Healthcare Innovation Conference. Expressed interest in patient data management.',
          author: 'Tomasz Kowalski',
          timestamp: '2024-10-25T16:30:00',
          type: 'note'
        }
      ],
      activities: [
        {
          id: 'act-5',
          type: 'created',
          description: 'Lead created from conference contact',
          timestamp: '2024-10-25T16:30:00',
          author: 'Tomasz Kowalski'
        }
      ],
      createdAt: '2024-10-25T16:30:00',
      updatedAt: '2024-10-25T16:30:00',
      nextFollowupDate: '2024-10-28T10:00:00',
      conversionProbability: 25,
      estimatedValue: 25000,
      campaignSource: 'Healthcare Innovation Conference 2024'
    },
    {
      id: 'lead-5',
      firstName: 'Robert',
      lastName: 'Kowalczyk',
      email: 'robert@logisticspro.com',
      phone: '+48 777 888 999',
      company: 'LogisticsPro',
      jobTitle: 'Supply Chain Director',
      source: 'cold-call',
      status: 'negotiation',
      score: 72,
      temperature: 'hot',
      assignedTo: {
        id: 'user-2',
        name: 'Anna Wiśniewska',
        avatar: '👩‍💼'
      },
      tags: ['logistics', 'supply-chain', 'medium-business'],
      interests: ['Inventory Management', 'Supplier CRM', 'Reporting Tools'],
      budget: {
        min: 40000,
        max: 80000,
        currency: 'PLN'
      },
      timeline: 'Q1 2025',
      notes: [
        {
          id: 'note-6',
          content: 'Price negotiation in progress. Requested 15% discount for annual contract.',
          author: 'Anna Wiśniewska',
          timestamp: '2024-10-24T13:45:00',
          type: 'call'
        }
      ],
      activities: [
        {
          id: 'act-6',
          type: 'status-changed',
          description: 'Status changed from Proposal to Negotiation',
          timestamp: '2024-10-24T13:45:00',
          author: 'Anna Wiśniewska'
        }
      ],
      createdAt: '2024-10-15T11:20:00',
      updatedAt: '2024-10-24T13:45:00',
      lastContactDate: '2024-10-24T13:45:00',
      nextFollowupDate: '2024-10-26T11:00:00',
      conversionProbability: 80,
      estimatedValue: 60000,
      campaignSource: 'Cold Call Campaign - Logistics Sector'
    },
    {
      id: 'lead-6',
      firstName: 'Magdalena',
      lastName: 'Dąbrowska',
      email: 'magdalena@creativestudio.pl',
      company: 'Creative Studio',
      jobTitle: 'Creative Director',
      source: 'social-media',
      status: 'closed-lost',
      score: 35,
      temperature: 'cold',
      assignedTo: {
        id: 'user-3',
        name: 'Tomasz Kowalski',
        avatar: '👨‍💻'
      },
      tags: ['creative-agency', 'small-business', 'design'],
      interests: ['Project Management', 'Client Portal', 'Time Tracking'],
      notes: [
        {
          id: 'note-7',
          content: 'Decided to go with competitor due to budget constraints. Keep for future opportunities.',
          author: 'Tomasz Kowalski',
          timestamp: '2024-10-20T14:20:00',
          type: 'call'
        }
      ],
      activities: [
        {
          id: 'act-7',
          type: 'status-changed',
          description: 'Status changed to Closed Lost - Budget constraints',
          timestamp: '2024-10-20T14:20:00',
          author: 'Tomasz Kowalski'
        }
      ],
      createdAt: '2024-10-10T09:15:00',
      updatedAt: '2024-10-20T14:20:00',
      lastContactDate: '2024-10-20T14:20:00',
      conversionProbability: 0,
      estimatedValue: 0,
      campaignSource: 'Instagram Ads - Creative Agencies'
    }
  ];

  const [leadsList, setLeadsList] = useState(leads);

  // Calculate stats
  const stats: LeadStats = {
    totalLeads: leadsList.length,
    newLeads: leadsList.filter(l => l.status === 'new').length,
    qualifiedLeads: leadsList.filter(l => l.status === 'qualified').length,
    conversionRate: Math.round((leadsList.filter(l => l.status === 'closed-won').length / leadsList.length) * 100),
    averageScore: Math.round(leadsList.reduce((sum, l) => sum + l.score, 0) / leadsList.length),
    hotLeads: leadsList.filter(l => l.temperature === 'hot').length,
    totalValue: leadsList.reduce((sum, l) => sum + (l.estimatedValue || 0), 0)
  };

  // Helper functions
  const getTemperatureColor = (temperature: string) => {
    switch (temperature) {
      case 'hot': return 'bg-red-500 text-white';
      case 'warm': return 'bg-yellow-500 text-white';
      case 'cold': return 'bg-blue-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-blue-100 text-blue-700';
      case 'contacted': return 'bg-yellow-100 text-yellow-700';
      case 'qualified': return 'bg-green-100 text-green-700';
      case 'proposal': return 'bg-purple-100 text-purple-700';
      case 'negotiation': return 'bg-orange-100 text-orange-700';
      case 'closed-won': return 'bg-green-500 text-white';
      case 'closed-lost': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getSourceIcon = (source: string) => {
    switch (source) {
      case 'website': return '🌐';
      case 'linkedin': return '💼';
      case 'referral': return '👥';
      case 'cold-call': return '📞';
      case 'event': return '🎯';
      case 'social-media': return '📱';
      case 'advertisement': return '📺';
      default: return '❓';
    }
  };

  const formatCurrency = (amount: number, currency = 'PLN') => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  // Filter and sort leads
  const filteredAndSortedLeads = leadsList
    .filter(lead => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (!lead.firstName.toLowerCase().includes(query) &&
            !lead.lastName.toLowerCase().includes(query) &&
            !lead.email.toLowerCase().includes(query) &&
            !(lead.company?.toLowerCase().includes(query))) {
          return false;
        }
      }
      
      if (filterStatus.length > 0 && !filterStatus.includes(lead.status)) {
        return false;
      }
      
      if (filterTemperature.length > 0 && !filterTemperature.includes(lead.temperature)) {
        return false;
      }
      
      if (filterSource.length > 0 && !filterSource.includes(lead.source)) {
        return false;
      }
      
      return true;
    })
    .sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'score':
          aValue = a.score;
          bValue = b.score;
          break;
        case 'created':
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
        case 'updated':
          aValue = new Date(a.updatedAt).getTime();
          bValue = new Date(b.updatedAt).getTime();
          break;
        case 'name':
          aValue = `${a.firstName} ${a.lastName}`;
          bValue = `${b.firstName} ${b.lastName}`;
          break;
        case 'company':
          aValue = a.company || '';
          bValue = b.company || '';
          break;
        default:
          return 0;
      }
      
      if (typeof aValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue as string)
          : (bValue as string).localeCompare(aValue);
      }
      
      return sortOrder === 'asc' 
        ? (aValue as number) - (bValue as number)
        : (bValue as number) - (aValue as number);
    });

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
          onSearch={(query) => setSearchQuery(query)}
        />

        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">🎯 Lead Management</h1>
              <p className="text-gray-600 mt-1">Zarządzaj potencjalnymi klientami i śledź pipeline sprzedaży</p>
            </div>
            <button 
              onClick={() => setShowCreateModal(true)}
              className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              ➕ Nowy Lead
            </button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Wszystkie Leady</p>
                  <p className="text-2xl font-bold text-gray-900">{stats.totalLeads}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🎯</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Nowe Leady</p>
                  <p className="text-2xl font-bold text-blue-600">{stats.newLeads}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🆕</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Qualified</p>
                  <p className="text-2xl font-bold text-green-600">{stats.qualifiedLeads}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">✅</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Gorące Leady</p>
                  <p className="text-2xl font-bold text-red-600">{stats.hotLeads}</p>
                </div>
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">🔥</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Avg Score</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.averageScore}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📊</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Conversion</p>
                  <p className="text-2xl font-bold text-orange-600">{stats.conversionRate}%</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">📈</span>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-medium">Pipeline Value</p>
                  <p className="text-lg font-bold text-green-600">{formatCurrency(stats.totalValue)}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <span className="text-2xl">💰</span>
                </div>
              </div>
            </div>
          </div>

          {/* Controls */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* View Mode Toggle */}
              <div className="flex items-center bg-gray-100 rounded-lg p-1">
                {[
                  { id: 'grid', label: 'Siatka', icon: '⊞' },
                  { id: 'list', label: 'Lista', icon: '☰' },
                  { id: 'pipeline', label: 'Pipeline', icon: '📊' },
                  { id: 'analytics', label: 'Analityki', icon: '📈' }
                ].map((mode) => (
                  <button
                    key={mode.id}
                    onClick={() => setViewMode(mode.id as any)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      viewMode === mode.id
                        ? 'bg-white text-purple-600 shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    <span>{mode.icon}</span>
                    <span>{mode.label}</span>
                  </button>
                ))}
              </div>

              {/* Filters and Sort */}
              <div className="flex items-center space-x-4">
                {/* Sort */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                >
                  <option value="score">Sortuj po Score</option>
                  <option value="created">Sortuj po Dacie utworzenia</option>
                  <option value="updated">Sortuj po Ostatniej aktualizacji</option>
                  <option value="name">Sortuj po Nazwisku</option>
                  <option value="company">Sortuj po Firmie</option>
                </select>

                <button
                  onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  {sortOrder === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>

            {/* Status Filters */}
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div className="flex flex-wrap gap-2">
                <span className="text-sm font-medium text-gray-700 mr-2">Status:</span>
                {[
                  { id: 'new', label: 'Nowe', color: 'bg-blue-100 text-blue-700' },
                  { id: 'contacted', label: 'Skontaktowane', color: 'bg-yellow-100 text-yellow-700' },
                  { id: 'qualified', label: 'Qualified', color: 'bg-green-100 text-green-700' },
                  { id: 'proposal', label: 'Propozycja', color: 'bg-purple-100 text-purple-700' },
                  { id: 'negotiation', label: 'Negocjacje', color: 'bg-orange-100 text-orange-700' }
                ].map((status) => (
                  <button
                    key={status.id}
                    onClick={() => {
                      setFilterStatus(prev => 
                        prev.includes(status.id)
                          ? prev.filter(s => s !== status.id)
                          : [...prev, status.id]
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      filterStatus.includes(status.id)
                        ? status.color
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {status.label}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2 mt-3">
                <span className="text-sm font-medium text-gray-700 mr-2">Temperatura:</span>
                {[
                  { id: 'hot', label: '🔥 Gorące', color: 'bg-red-100 text-red-700' },
                  { id: 'warm', label: '🌡️ Ciepłe', color: 'bg-yellow-100 text-yellow-700' },
                  { id: 'cold', label: '❄️ Zimne', color: 'bg-blue-100 text-blue-700' }
                ].map((temp) => (
                  <button
                    key={temp.id}
                    onClick={() => {
                      setFilterTemperature(prev => 
                        prev.includes(temp.id)
                          ? prev.filter(t => t !== temp.id)
                          : [...prev, temp.id]
                      );
                    }}
                    className={`px-3 py-1 rounded-full text-sm transition-all ${
                      filterTemperature.includes(temp.id)
                        ? temp.color
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    {temp.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lead Views */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Grid View */}
            {viewMode === 'grid' && (
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredAndSortedLeads.map((lead) => (
                    <div
                      key={lead.id}
                      onClick={() => {
                        setSelectedLead(lead);
                        setShowLeadModal(true);
                      }}
                      className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <div className={`w-3 h-3 rounded-full ${getTemperatureColor(lead.temperature).split(' ')[0]}`}></div>
                          <span className="text-lg font-medium">{lead.firstName} {lead.lastName}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">{lead.score}</div>
                          <div className="text-xs text-gray-500">score</div>
                        </div>
                      </div>

                      <div className="space-y-2 mb-4">
                        {lead.company && (
                          <div className="text-sm text-gray-600">{lead.company}</div>
                        )}
                        {lead.jobTitle && (
                          <div className="text-xs text-gray-500">{lead.jobTitle}</div>
                        )}
                        <div className="text-sm text-gray-600">{lead.email}</div>
                      </div>

                      <div className="flex items-center justify-between mb-3">
                        <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(lead.status)}`}>
                          {lead.status}
                        </span>
                        <span className="text-lg">{getSourceIcon(lead.source)}</span>
                      </div>

                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{formatDate(lead.createdAt)}</span>
                        {lead.estimatedValue && (
                          <span className="font-medium text-green-600">
                            {formatCurrency(lead.estimatedValue)}
                          </span>
                        )}
                      </div>

                      {lead.nextFollowupDate && (
                        <div className="mt-2 text-xs text-orange-600 bg-orange-50 px-2 py-1 rounded">
                          📅 Follow-up: {formatDate(lead.nextFollowupDate)}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                {filteredAndSortedLeads.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Brak lead'ów</h3>
                    <p className="text-gray-600">Nie znaleziono lead'ów pasujących do wybranych filtrów</p>
                  </div>
                )}
              </div>
            )}

            {/* List View */}
            {viewMode === 'list' && (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-200">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lead</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Firma</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temp</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Źródło</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wartość</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ostatni kontakt</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Przypisany</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {filteredAndSortedLeads.map((lead) => (
                      <tr
                        key={lead.id}
                        onClick={() => {
                          setSelectedLead(lead);
                          setShowLeadModal(true);
                        }}
                        className="hover:bg-gray-50 cursor-pointer"
                      >
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="font-medium text-gray-900">{lead.firstName} {lead.lastName}</div>
                            <div className="text-sm text-gray-500">{lead.email}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">{lead.company || '-'}</div>
                            <div className="text-sm text-gray-500">{lead.jobTitle || '-'}</div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(lead.status)}`}>
                            {lead.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-bold text-purple-600">{lead.score}</div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${getTemperatureColor(lead.temperature)}`}>
                            {lead.temperature}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-1">
                            <span>{getSourceIcon(lead.source)}</span>
                            <span className="text-sm text-gray-900 capitalize">{lead.source}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-green-600">
                            {lead.estimatedValue ? formatCurrency(lead.estimatedValue) : '-'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {lead.lastContactDate ? formatDate(lead.lastContactDate) : 'Brak kontaktu'}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center space-x-2">
                            <span>{lead.assignedTo.avatar}</span>
                            <span className="text-sm text-gray-900">{lead.assignedTo.name}</span>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {filteredAndSortedLeads.length === 0 && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🎯</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Brak lead'ów</h3>
                    <p className="text-gray-600">Nie znaleziono lead'ów pasujących do wybranych filtrów</p>
                  </div>
                )}
              </div>
            )}

            {/* Pipeline View */}
            {viewMode === 'pipeline' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Widok Pipeline</h3>
                  <p className="text-gray-600">Zostanie zaimplementowany w kolejnym kroku</p>
                </div>
              </div>
            )}

            {/* Analytics View */}
            {viewMode === 'analytics' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Analityki Lead'ów</h3>
                  <p className="text-gray-600">Zostanie zaimplementowany w kolejnym kroku</p>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Lead Details Modal */}
      {showLeadModal && selectedLead && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-4 h-4 rounded-full ${getTemperatureColor(selectedLead.temperature).split(' ')[0]} mt-2`}></div>
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900">{selectedLead.firstName} {selectedLead.lastName}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      {selectedLead.company && (
                        <span className="text-gray-600">{selectedLead.company}</span>
                      )}
                      {selectedLead.jobTitle && (
                        <span className="text-gray-500">• {selectedLead.jobTitle}</span>
                      )}
                    </div>
                    <div className="flex items-center space-x-4 mt-2">
                      <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(selectedLead.status)}`}>
                        {selectedLead.status}
                      </span>
                      <span className={`px-3 py-1 rounded-full text-sm ${getTemperatureColor(selectedLead.temperature)}`}>
                        {selectedLead.temperature}
                      </span>
                      <span className="text-2xl font-bold text-purple-600">{selectedLead.score} pts</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setShowLeadModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Main Info */}
                <div className="lg:col-span-2 space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📞 Informacje kontaktowe</h4>
                    <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Email:</span>
                        <span className="font-medium">{selectedLead.email}</span>
                      </div>
                      {selectedLead.phone && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Telefon:</span>
                          <span className="font-medium">{selectedLead.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-gray-600">Źródło:</span>
                        <span className="flex items-center space-x-1">
                          <span>{getSourceIcon(selectedLead.source)}</span>
                          <span className="capitalize">{selectedLead.source}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedLead.interests.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">💡 Zainteresowania</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLead.interests.map((interest, index) => (
                          <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {selectedLead.budget && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">💰 Budżet</h4>
                      <div className="bg-green-50 rounded-lg p-4">
                        <div className="text-lg font-bold text-green-700">
                          {formatCurrency(selectedLead.budget.min)} - {formatCurrency(selectedLead.budget.max)}
                        </div>
                        {selectedLead.timeline && (
                          <div className="text-sm text-green-600 mt-1">Timeline: {selectedLead.timeline}</div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Notes & Activities */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📝 Notatki i aktywność</h4>
                    <div className="space-y-3 max-h-64 overflow-y-auto">
                      {[...selectedLead.notes, ...selectedLead.activities.map(act => ({
                        id: act.id,
                        content: act.description,
                        author: act.author,
                        timestamp: act.timestamp,
                        type: act.type as any
                      }))].sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()).map((item) => (
                        <div key={item.id} className="bg-gray-50 rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div className="flex-1">
                              <p className="text-gray-900 text-sm">{item.content}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-500">{item.author}</span>
                                <span className="text-xs text-gray-400">•</span>
                                <span className="text-xs text-gray-500">{formatDateTime(item.timestamp)}</span>
                              </div>
                            </div>
                            <span className="text-lg ml-2">
                              {item.type === 'call' ? '📞' :
                               item.type === 'email' ? '📧' :
                               item.type === 'meeting' ? '👥' :
                               item.type === 'note' ? '📝' : '📋'}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">👤 Przypisanie</h4>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{selectedLead.assignedTo.avatar}</span>
                        <div>
                          <div className="font-medium">{selectedLead.assignedTo.name}</div>
                          <div className="text-sm text-gray-500">Sales Rep</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📊 Metryki</h4>
                    <div className="space-y-3">
                      <div className="bg-purple-50 rounded-lg p-3">
                        <div className="text-sm text-purple-600">Lead Score</div>
                        <div className="text-xl font-bold text-purple-700">{selectedLead.score}/100</div>
                      </div>
                      {selectedLead.conversionProbability && (
                        <div className="bg-green-50 rounded-lg p-3">
                          <div className="text-sm text-green-600">Conversion Probability</div>
                          <div className="text-xl font-bold text-green-700">{selectedLead.conversionProbability}%</div>
                        </div>
                      )}
                      {selectedLead.estimatedValue && (
                        <div className="bg-yellow-50 rounded-lg p-3">
                          <div className="text-sm text-yellow-600">Estimated Value</div>
                          <div className="text-lg font-bold text-yellow-700">{formatCurrency(selectedLead.estimatedValue)}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">📅 Timeline</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Utworzony:</span>
                        <span>{formatDate(selectedLead.createdAt)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ostatnia aktualizacja:</span>
                        <span>{formatDate(selectedLead.updatedAt)}</span>
                      </div>
                      {selectedLead.lastContactDate && (
                        <div className="flex justify-between">
                          <span className="text-gray-600">Ostatni kontakt:</span>
                          <span>{formatDate(selectedLead.lastContactDate)}</span>
                        </div>
                      )}
                      {selectedLead.nextFollowupDate && (
                        <div className="flex justify-between text-orange-600">
                          <span>Next Follow-up:</span>
                          <span className="font-medium">{formatDate(selectedLead.nextFollowupDate)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {selectedLead.tags.length > 0 && (
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-3">🏷️ Tagi</h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedLead.tags.map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-6 mt-6 border-t border-gray-200">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  ✏️ Edytuj Lead
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  📞 Zaplanuj rozmowę
                </button>
                <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                  🎯 Konwertuj na klienta
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Lead Modal Placeholder */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4">
            <div className="p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Formularz tworzenia Lead'a</h3>
                <p className="text-gray-600 mb-6">Zostanie zaimplementowany w kolejnym kroku</p>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                >
                  Zamknij
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
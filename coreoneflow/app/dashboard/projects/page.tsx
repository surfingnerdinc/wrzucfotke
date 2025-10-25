'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { usePlan } from '../../contexts/PlanContext';

interface Project {
  id: string;
  name: string;
  description: string;
  status: 'planning' | 'active' | 'on-hold' | 'completed' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  manager: {
    name: string;
    avatar: string;
    id: string;
  };
  client: {
    name: string;
    company: string;
    id: string;
  };
  team: Array<{
    id: string;
    name: string;
    avatar: string;
    role: string;
    workload: number; // percentage
  }>;
  startDate: string;
  endDate: string;
  budget: {
    allocated: number;
    spent: number;
    currency: string;
  };
  progress: number;
  tasksCount: {
    total: number;
    completed: number;
    inProgress: number;
    blocked: number;
  };
  healthScore: number;
  riskFactors: string[];
  tags: string[];
  milestones: Array<{
    id: string;
    name: string;
    date: string;
    status: 'pending' | 'completed' | 'overdue';
  }>;
  aiInsights: {
    completionPrediction: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    recommendations: string[];
    budgetForecast: number;
  };
}

export default function ProjectsPage() {
  const {
    userPlan,
    usage,
    canEnableFeature,
    canCreateMore,
    getUsagePercentage,
    isUsageNearLimit,
    setShowUpgradeModal,
    incrementUsage,
  } = usePlan();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('projects');
  const [viewMode, setViewMode] = useState<'cards' | 'timeline' | 'kanban' | 'analytics'>('cards');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'name' | 'progress' | 'health' | 'deadline'>('health');
  const [searchQuery, setSearchQuery] = useState('');

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: userPlan.displayName
  };

  // Mock projects data
  const projects: Project[] = [
    {
      id: 'proj-1',
      name: 'Core CRM System',
      description: 'Kompleksowy system CRM z integracją AI i zaawansowaną analityką dla klientów enterprise',
      status: 'active',
      priority: 'critical',
      manager: { name: 'Marcin Dubiński', avatar: '👨‍💼', id: 'user-1' },
      client: { name: 'Anna Kowalska', company: 'TechCorp Solutions', id: 'tech-corp' },
      team: [
        { id: 'u1', name: 'Marcin D.', avatar: '👨‍💼', role: 'Project Manager', workload: 85 },
        { id: 'u2', name: 'Piotr K.', avatar: '👨‍💻', role: 'Lead Developer', workload: 95 },
        { id: 'u3', name: 'Anna W.', avatar: '👩‍🎨', role: 'UI/UX Designer', workload: 70 },
        { id: 'u4', name: 'Tomasz N.', avatar: '🧑‍💻', role: 'Backend Dev', workload: 80 }
      ],
      startDate: '2024-09-01',
      endDate: '2024-12-15',
      budget: { allocated: 250000, spent: 185000, currency: 'PLN' },
      progress: 72,
      tasksCount: { total: 45, completed: 28, inProgress: 12, blocked: 5 },
      healthScore: 85,
      riskFactors: ['Tight deadline', 'High client expectations'],
      tags: ['AI', 'Enterprise', 'Critical'],
      milestones: [
        { id: 'm1', name: 'MVP Release', date: '2024-10-30', status: 'completed' },
        { id: 'm2', name: 'Beta Testing', date: '2024-11-15', status: 'pending' },
        { id: 'm3', name: 'Production Launch', date: '2024-12-15', status: 'pending' }
      ],
      aiInsights: {
        completionPrediction: '2024-12-18',
        riskLevel: 'medium',
        recommendations: [
          'Consider extending deadline by 3 days',
          'Allocate additional developer resources',
          'Schedule client review meeting'
        ],
        budgetForecast: 245000
      }
    },
    {
      id: 'proj-2',
      name: 'E-commerce Platform',
      description: 'Nowoczesna platforma e-commerce z AI-powered recommendations i real-time analytics',
      status: 'active',
      priority: 'high',
      manager: { name: 'Piotr Kowal', avatar: '👨‍💻', id: 'user-2' },
      client: { name: 'Michał Nowak', company: 'ShopTech', id: 'shop-tech' },
      team: [
        { id: 'u5', name: 'Piotr K.', avatar: '👨‍💻', role: 'Tech Lead', workload: 90 },
        { id: 'u6', name: 'Kasia L.', avatar: '👩‍💻', role: 'Frontend Dev', workload: 75 },
        { id: 'u7', name: 'Jakub M.', avatar: '🧑‍💻', role: 'DevOps', workload: 60 }
      ],
      startDate: '2024-08-15',
      endDate: '2024-11-30',
      budget: { allocated: 180000, spent: 95000, currency: 'PLN' },
      progress: 58,
      tasksCount: { total: 38, completed: 18, inProgress: 15, blocked: 5 },
      healthScore: 78,
      riskFactors: ['API dependencies', 'Third-party integrations'],
      tags: ['E-commerce', 'AI', 'Analytics'],
      milestones: [
        { id: 'm4', name: 'Core Features', date: '2024-10-15', status: 'completed' },
        { id: 'm5', name: 'Payment Integration', date: '2024-11-01', status: 'pending' },
        { id: 'm6', name: 'Go Live', date: '2024-11-30', status: 'pending' }
      ],
      aiInsights: {
        completionPrediction: '2024-12-05',
        riskLevel: 'medium',
        recommendations: [
          'Prioritize payment gateway integration',
          'Add more QA resources',
          'Plan soft launch strategy'
        ],
        budgetForecast: 175000
      }
    },
    {
      id: 'proj-3',
      name: 'Mobile Banking App',
      description: 'Bezpieczna aplikacja mobilna dla bankowości z biometrią i AI fraud detection',
      status: 'planning',
      priority: 'high',
      manager: { name: 'Anna Wiśniewska', avatar: '👩‍💼', id: 'user-3' },
      client: { name: 'Robert Zięba', company: 'FinanceBank', id: 'finance-bank' },
      team: [
        { id: 'u8', name: 'Anna W.', avatar: '👩‍💼', role: 'Product Manager', workload: 40 },
        { id: 'u9', name: 'Łukasz P.', avatar: '👨‍💻', role: 'Mobile Dev', workload: 30 }
      ],
      startDate: '2024-11-01',
      endDate: '2025-03-15',
      budget: { allocated: 320000, spent: 25000, currency: 'PLN' },
      progress: 15,
      tasksCount: { total: 52, completed: 8, inProgress: 6, blocked: 38 },
      healthScore: 92,
      riskFactors: ['Regulatory compliance', 'Security requirements'],
      tags: ['Mobile', 'Banking', 'Security', 'AI'],
      milestones: [
        { id: 'm7', name: 'Requirements Analysis', date: '2024-11-15', status: 'pending' },
        { id: 'm8', name: 'Security Audit', date: '2024-12-30', status: 'pending' },
        { id: 'm9', name: 'Beta Release', date: '2025-02-15', status: 'pending' }
      ],
      aiInsights: {
        completionPrediction: '2025-03-20',
        riskLevel: 'low',
        recommendations: [
          'Start security compliance early',
          'Engage with regulatory consultants',
          'Plan comprehensive testing strategy'
        ],
        budgetForecast: 315000
      }
    },
    {
      id: 'proj-4',
      name: 'Data Analytics Platform',
      description: 'Platforma analityczna z machine learning i real-time data processing',
      status: 'completed',
      priority: 'medium',
      manager: { name: 'Tomasz Nowicki', avatar: '🧑‍💻', id: 'user-4' },
      client: { name: 'Katarzyna Maj', company: 'DataCorp', id: 'data-corp' },
      team: [
        { id: 'u10', name: 'Tomasz N.', avatar: '🧑‍💻', role: 'Data Engineer', workload: 0 },
        { id: 'u11', name: 'Ewa K.', avatar: '👩‍💻', role: 'ML Engineer', workload: 0 }
      ],
      startDate: '2024-03-01',
      endDate: '2024-09-30',
      budget: { allocated: 200000, spent: 195000, currency: 'PLN' },
      progress: 100,
      tasksCount: { total: 35, completed: 35, inProgress: 0, blocked: 0 },
      healthScore: 95,
      riskFactors: [],
      tags: ['Analytics', 'ML', 'Big Data'],
      milestones: [
        { id: 'm10', name: 'Data Pipeline', date: '2024-05-15', status: 'completed' },
        { id: 'm11', name: 'ML Models', date: '2024-07-30', status: 'completed' },
        { id: 'm12', name: 'Production Deploy', date: '2024-09-30', status: 'completed' }
      ],
      aiInsights: {
        completionPrediction: '2024-09-30',
        riskLevel: 'low',
        recommendations: ['Project completed successfully'],
        budgetForecast: 195000
      }
    }
  ];

  const [filteredProjects, setFilteredProjects] = useState(projects);

  useEffect(() => {
    let filtered = projects;

    // Filter by status
    if (filterStatus !== 'all') {
      filtered = filtered.filter(project => project.status === filterStatus);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(project =>
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.client.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    // Sort projects
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'progress':
          return b.progress - a.progress;
        case 'health':
          return b.healthScore - a.healthScore;
        case 'deadline':
          return new Date(a.endDate).getTime() - new Date(b.endDate).getTime();
        default:
          return 0;
      }
    });

    setFilteredProjects(filtered);
  }, [filterStatus, searchQuery, sortBy]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'active': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'on-hold': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'cancelled': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getRiskColor = (level: string) => {
    switch (level) {
      case 'low': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'high': return 'bg-orange-100 text-orange-700';
      case 'critical': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat('pl-PL', {
      style: 'currency',
      currency: currency
    }).format(amount);
  };

  const getDaysRemaining = (endDate: string) => {
    const days = Math.ceil((new Date(endDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
    return days;
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
          onSearch={(query) => setSearchQuery(query)}
        />

        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Projekty</h1>
              <p className="text-gray-600 mt-1">Zarządzaj wszystkimi projektami w jednym miejscu</p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Projects feature check */}
              {!canEnableFeature('projects') ? (
                <div className="bg-orange-50 border border-orange-200 rounded-lg p-4 flex items-center space-x-3">
                  <span className="text-orange-500 text-xl">🔒</span>
                  <div>
                    <h4 className="font-semibold text-orange-800">Projekty niedostępne</h4>
                    <p className="text-sm text-orange-600">
                      Twój plan {userPlan.displayName} nie zawiera zarządzania projektami
                    </p>
                  </div>
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="bg-orange-500 text-white px-4 py-2 rounded font-medium hover:bg-orange-600 transition-colors"
                  >
                    Upgrade
                  </button>
                </div>
              ) : canCreateMore('projects') ? (
                <button 
                  onClick={() => {
                    // Add project logic here
                    incrementUsage('projects');
                  }}
                  className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  ➕ Nowy projekt
                </button>
              ) : (
                <div className="relative group">
                  <button 
                    disabled
                    className="bg-gray-400 text-white px-6 py-3 rounded-xl font-semibold cursor-not-allowed opacity-60"
                  >
                    ➕ Nowy projekt
                  </button>
                  <div className="absolute top-full right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg p-4 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                    <div className="flex items-start space-x-3">
                      <span className="text-orange-500 text-xl">⚠️</span>
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">Osiągnięto limit projektów</h4>
                        <p className="text-sm text-gray-600 mb-3">
                          Twój plan {userPlan.displayName} pozwala na maksymalnie {userPlan.limits.projects === -1 ? 'nieograniczoną liczbę' : userPlan.limits.projects} projektów.
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
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-blue-100 rounded-lg p-3">
                  <span className="text-2xl">📊</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+12%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">{projects.length}</h3>
              <p className="text-gray-600">Wszystkie projekty</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-green-100 rounded-lg p-3">
                  <span className="text-2xl">🚀</span>
                </div>
                <span className="text-sm text-blue-600 font-medium">+8%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {projects.filter(p => p.status === 'active').length}
              </h3>
              <p className="text-gray-600">Aktywne projekty</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-purple-100 rounded-lg p-3">
                  <span className="text-2xl">💰</span>
                </div>
                <span className="text-sm text-green-600 font-medium">+15%</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {formatCurrency(projects.reduce((sum, p) => sum + p.budget.allocated, 0), 'PLN')}
              </h3>
              <p className="text-gray-600">Łączny budżet</p>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="bg-yellow-100 rounded-lg p-3">
                  <span className="text-2xl">🎯</span>
                </div>
                <span className="text-sm text-gray-600 font-medium">AVG</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900">
                {Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)}%
              </h3>
              <p className="text-gray-600">Średni postęp</p>
            </div>
          </div>

          {/* Controls & Filters */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-8">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-4">
                {/* View Mode Toggle */}
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  {[
                    { id: 'cards', icon: '📋', label: 'Karty', requiredFeature: null },
                    { id: 'timeline', icon: '📅', label: 'Timeline (Gantt)', requiredFeature: 'ganttCharts' },
                    { id: 'kanban', icon: '📌', label: 'Kanban', requiredFeature: 'collaboration' },
                    { id: 'analytics', icon: '📊', label: 'Analityka', requiredFeature: null }
                  ].map((mode) => {
                    const isAccessible = !mode.requiredFeature || canEnableFeature(mode.requiredFeature as keyof typeof userPlan.features);
                    
                    return (
                      <div key={mode.id} className="relative group">
                        <button
                          onClick={() => isAccessible ? setViewMode(mode.id as any) : setShowUpgradeModal(true)}
                          disabled={!isAccessible}
                          className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                            viewMode === mode.id && isAccessible
                              ? 'bg-white text-purple-600 shadow-sm'
                              : isAccessible
                              ? 'text-gray-600 hover:text-gray-900'
                              : 'text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          <span>{mode.icon}</span>
                          <span>{mode.label}</span>
                          {!isAccessible && <span className="text-xs">🔒</span>}
                        </button>
                        
                        {!isAccessible && (
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-black bg-opacity-90 text-white text-xs rounded-lg p-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20">
                            Funkcja dostępna w wyższych planach
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="flex items-center space-x-4">
                {/* Status Filter */}
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="all">Wszystkie statusy</option>
                  <option value="planning">Planowanie</option>
                  <option value="active">Aktywne</option>
                  <option value="on-hold">Wstrzymane</option>
                  <option value="completed">Ukończone</option>
                  <option value="cancelled">Anulowane</option>
                </select>

                {/* Sort By */}
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="health">Health Score</option>
                  <option value="name">Nazwa</option>
                  <option value="progress">Postęp</option>
                  <option value="deadline">Termin</option>
                </select>
              </div>
            </div>

            {/* Search */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Szukaj projektów, klientów, tagów..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
              <span className="absolute left-3 top-3.5 text-gray-400">🔍</span>
            </div>
          </div>

          {/* Projects Content */}
          {viewMode === 'cards' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {filteredProjects.map((project) => (
                <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                  <div className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all cursor-pointer group">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h3 className="text-xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                            {project.name}
                          </h3>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(project.status)}`}>
                            {project.status.toUpperCase()}
                          </span>
                          <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(project.priority)}`}>
                            {project.priority.toUpperCase()}
                          </span>
                        </div>
                        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                        
                        {/* Client & Manager */}
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <span>🏢</span>
                            <span>{project.client.company}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <span>{project.manager.avatar}</span>
                            <span>{project.manager.name}</span>
                          </div>
                        </div>
                      </div>

                      {/* Health Score */}
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getHealthColor(project.healthScore)}`}>
                          {project.healthScore}
                        </div>
                        <div className="text-xs text-gray-500">Health Score</div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Postęp projektu</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-linear-to-r from-purple-500 to-cyan-500 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {project.tasksCount.completed}/{project.tasksCount.total}
                        </div>
                        <div className="text-xs text-gray-500">Zadania</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {Math.round((project.budget.spent / project.budget.allocated) * 100)}%
                        </div>
                        <div className="text-xs text-gray-500">Budżet</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-gray-900">
                          {project.team.length}
                        </div>
                        <div className="text-xs text-gray-500">Zespół</div>
                      </div>
                      <div className="text-center">
                        <div className={`text-lg font-semibold ${
                          getDaysRemaining(project.endDate) < 7 ? 'text-red-600' : 
                          getDaysRemaining(project.endDate) < 30 ? 'text-yellow-600' : 'text-gray-900'
                        }`}>
                          {getDaysRemaining(project.endDate)}
                        </div>
                        <div className="text-xs text-gray-500">Dni</div>
                      </div>
                    </div>

                    {/* Team Avatars */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-500">Zespół:</span>
                        <div className="flex -space-x-2">
                          {project.team.slice(0, 4).map((member, index) => (
                            <div
                              key={member.id}
                              className="w-8 h-8 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-sm border-2 border-white"
                              title={member.name}
                            >
                              {member.avatar}
                            </div>
                          ))}
                          {project.team.length > 4 && (
                            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs border-2 border-white text-gray-600">
                              +{project.team.length - 4}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* AI Risk Level */}
                      <div className={`px-3 py-1 text-xs font-medium rounded-full ${getRiskColor(project.aiInsights.riskLevel)}`}>
                        🤖 {project.aiInsights.riskLevel.toUpperCase()} RISK
                      </div>
                    </div>

                    {/* Tags */}
                    {project.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-3">
                        {project.tags.slice(0, 3).map((tag, index) => (
                          <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                        {project.tags.length > 3 && (
                          <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            +{project.tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          )}

          {viewMode === 'timeline' && (
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline projektów</h3>
              <div className="space-y-4">
                {filteredProjects.map((project) => (
                  <div key={project.id} className="border-l-4 border-purple-500 pl-6 pb-6">
                    <div className="flex items-center justify-between mb-2">
                      <Link href={`/dashboard/projects/${project.id}`}>
                        <h4 className="text-lg font-semibold text-gray-900 hover:text-purple-600 cursor-pointer">
                          {project.name}
                        </h4>
                      </Link>
                      <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(project.status)}`}>
                        {project.status.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-gray-600 mb-3">{project.description}</p>
                    <div className="flex items-center space-x-6 text-sm text-gray-500">
                      <span>📅 {new Date(project.startDate).toLocaleDateString('pl-PL')} - {new Date(project.endDate).toLocaleDateString('pl-PL')}</span>
                      <span>🏢 {project.client.company}</span>
                      <span>📊 {project.progress}%</span>
                      <span className={getHealthColor(project.healthScore)}>❤️ {project.healthScore}</span>
                    </div>
                    <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-linear-to-r from-purple-500 to-cyan-500 h-2 rounded-full"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'kanban' && (
            <div className="grid grid-cols-5 gap-6">
              {['planning', 'active', 'on-hold', 'completed', 'cancelled'].map((status) => {
                const statusProjects = filteredProjects.filter(p => p.status === status);
                const statusLabels = {
                  planning: 'Planowanie',
                  active: 'Aktywne',
                  'on-hold': 'Wstrzymane',
                  completed: 'Ukończone',
                  cancelled: 'Anulowane'
                };
                
                return (
                  <div key={status} className="bg-gray-100 rounded-xl p-4">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold text-gray-900">{statusLabels[status as keyof typeof statusLabels]}</h3>
                      <span className="bg-white text-gray-600 px-2 py-1 rounded-full text-sm font-medium">
                        {statusProjects.length}
                      </span>
                    </div>
                    <div className="space-y-3">
                      {statusProjects.map((project) => (
                        <Link key={project.id} href={`/dashboard/projects/${project.id}`}>
                          <div className="bg-white rounded-lg p-4 border border-gray-200 hover:shadow-md transition-all cursor-pointer">
                            <h4 className="font-semibold text-gray-900 mb-2 hover:text-purple-600">
                              {project.name}
                            </h4>
                            <p className="text-gray-600 text-sm mb-3 line-clamp-2">{project.description}</p>
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-500">🏢 {project.client.company}</span>
                              <span className={`font-semibold ${getHealthColor(project.healthScore)}`}>
                                {project.healthScore}
                              </span>
                            </div>
                            <div className="mt-2 w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-linear-to-r from-purple-500 to-cyan-500 h-1 rounded-full"
                                style={{ width: `${project.progress}%` }}
                              ></div>
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {viewMode === 'analytics' && (
            <div className="grid grid-cols-2 gap-6">
              {/* Project Health Distribution */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Dystrybucja Health Score</h3>
                <div className="space-y-4">
                  {[
                    { range: '90-100', color: 'bg-green-500', count: projects.filter(p => p.healthScore >= 90).length },
                    { range: '80-89', color: 'bg-yellow-500', count: projects.filter(p => p.healthScore >= 80 && p.healthScore < 90).length },
                    { range: '70-79', color: 'bg-orange-500', count: projects.filter(p => p.healthScore >= 70 && p.healthScore < 80).length },
                    { range: '< 70', color: 'bg-red-500', count: projects.filter(p => p.healthScore < 70).length }
                  ].map((item) => (
                    <div key={item.range} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                        <span className="text-gray-700">{item.range}</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Budget Analysis */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Analiza budżetu</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Łączny budżet:</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(projects.reduce((sum, p) => sum + p.budget.allocated, 0), 'PLN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Wydane:</span>
                    <span className="font-semibold text-gray-900">
                      {formatCurrency(projects.reduce((sum, p) => sum + p.budget.spent, 0), 'PLN')}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Pozostało:</span>
                    <span className="font-semibold text-green-600">
                      {formatCurrency(projects.reduce((sum, p) => sum + (p.budget.allocated - p.budget.spent), 0), 'PLN')}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 mt-4">
                    <div 
                      className="bg-linear-to-r from-purple-500 to-cyan-500 h-3 rounded-full"
                      style={{ 
                        width: `${(projects.reduce((sum, p) => sum + p.budget.spent, 0) / projects.reduce((sum, p) => sum + p.budget.allocated, 0)) * 100}%` 
                      }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* AI Risk Analysis */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Analiza ryzyka AI</h3>
                <div className="space-y-4">
                  {[
                    { level: 'low', label: 'Niskie', color: 'bg-green-500', count: projects.filter(p => p.aiInsights.riskLevel === 'low').length },
                    { level: 'medium', label: 'Średnie', color: 'bg-yellow-500', count: projects.filter(p => p.aiInsights.riskLevel === 'medium').length },
                    { level: 'high', label: 'Wysokie', color: 'bg-orange-500', count: projects.filter(p => p.aiInsights.riskLevel === 'high').length },
                    { level: 'critical', label: 'Krytyczne', color: 'bg-red-500', count: projects.filter(p => p.aiInsights.riskLevel === 'critical').length }
                  ].map((item) => (
                    <div key={item.level} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                        <span className="text-gray-700">{item.label} ryzyko</span>
                      </div>
                      <span className="font-semibold text-gray-900">{item.count}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Workload */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Obciążenie zespołu</h3>
                <div className="space-y-3">
                  {projects.reduce((allMembers: any[], project) => {
                    project.team.forEach(member => {
                      const existing = allMembers.find(m => m.id === member.id);
                      if (existing) {
                        existing.totalWorkload += member.workload;
                        existing.projects += 1;
                      } else {
                        allMembers.push({
                          ...member,
                          totalWorkload: member.workload,
                          projects: 1
                        });
                      }
                    });
                    return allMembers;
                  }, []).slice(0, 5).map((member) => (
                    <div key={member.id} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-lg">{member.avatar}</span>
                        <span className="text-gray-700">{member.name}</span>
                      </div>
                      <div className="text-right">
                        <span className={`font-semibold ${
                          member.totalWorkload > 100 ? 'text-red-600' : 
                          member.totalWorkload > 80 ? 'text-yellow-600' : 'text-green-600'
                        }`}>
                          {Math.round(member.totalWorkload / member.projects)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

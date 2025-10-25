'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';

interface Task {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: {
    name: string;
    avatar: string;
    id: string;
  };
  customer?: {
    name: string;
    company: string;
    id: string;
  };
  project?: {
    name: string;
    id: string;
  };
  dueDate: string;
  createdDate: string;
  estimatedHours: number;
  actualHours: number;
  tags: string[];
  aiScore: number; // AI-generated priority score
  dependencies: string[]; // Task IDs that this task depends on
  attachments: number;
  comments: number;
  completionRate: number; // For tasks with subtasks
  timeTracker: {
    isRunning: boolean;
    totalTime: number; // in minutes
    lastStarted?: string;
  };
}

interface TaskColumn {
  id: string;
  title: string;
  color: string;
  count: number;
}

export default function TasksPage() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [viewMode, setViewMode] = useState<'kanban' | 'list' | 'calendar' | 'timeline'>('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterAssignee, setFilterAssignee] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'dueDate' | 'priority' | 'aiScore' | 'created'>('aiScore');
  const [showAIInsights, setShowAIInsights] = useState(true);

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: 'Professional'
  };

  const columns: TaskColumn[] = [
    { id: 'todo', title: 'Do zrobienia', color: 'bg-gray-100 border-gray-300', count: 0 },
    { id: 'in-progress', title: 'W trakcie', color: 'bg-blue-100 border-blue-300', count: 0 },
    { id: 'review', title: 'Do przeglądu', color: 'bg-yellow-100 border-yellow-300', count: 0 },
    { id: 'completed', title: 'Ukończone', color: 'bg-green-100 border-green-300', count: 0 },
    { id: 'blocked', title: 'Zablokowane', color: 'bg-red-100 border-red-300', count: 0 }
  ];

  const tasks: Task[] = [
    {
      id: 'task-1',
      title: 'Implementacja modułu AI w CRM',
      description: 'Dodanie zaawansowanych funkcji AI do systemu CRM dla TechCorp',
      status: 'in-progress',
      priority: 'high',
      assignee: { name: 'Marcin Dubiński', avatar: '👨‍💼', id: 'user-1' },
      customer: { name: 'Anna Kowalska', company: 'TechCorp Solutions', id: 'tech-corp' },
      project: { name: 'CRM System Implementation', id: 'proj-1' },
      dueDate: '2024-11-15',
      createdDate: '2024-10-01',
      estimatedHours: 40,
      actualHours: 25,
      tags: ['AI', 'Backend', 'Critical'],
      aiScore: 92,
      dependencies: ['task-5'],
      attachments: 3,
      comments: 12,
      completionRate: 65,
      timeTracker: { isRunning: true, totalTime: 1450, lastStarted: '2024-10-24T09:00:00' }
    },
    {
      id: 'task-2',
      title: 'Przygotowanie prezentacji dla BigCompany',
      description: 'Stworzenie prezentacji demo systemu CRM z nowymi funkcjami',
      status: 'todo',
      priority: 'medium',
      assignee: { name: 'Anna Nowak', avatar: '👩‍💻', id: 'user-2' },
      customer: { name: 'Robert Smith', company: 'BigCompany Ltd', id: 'big-company' },
      project: { name: 'BigCompany Integration', id: 'proj-4' },
      dueDate: '2024-10-25',
      createdDate: '2024-10-20',
      estimatedHours: 8,
      actualHours: 0,
      tags: ['Prezentacja', 'Sales'],
      aiScore: 78,
      dependencies: [],
      attachments: 0,
      comments: 3,
      completionRate: 0,
      timeTracker: { isRunning: false, totalTime: 0 }
    },
    {
      id: 'task-3',
      title: 'Code Review - Moduł płatności',
      description: 'Przegląd kodu dla nowego modułu płatności w systemie',
      status: 'review',
      priority: 'high',
      assignee: { name: 'Piotr Kowal', avatar: '👨‍💻', id: 'user-3' },
      project: { name: 'Payment System', id: 'proj-2' },
      dueDate: '2024-10-26',
      createdDate: '2024-10-22',
      estimatedHours: 4,
      actualHours: 2,
      tags: ['Review', 'Backend', 'Security'],
      aiScore: 85,
      dependencies: ['task-6'],
      attachments: 1,
      comments: 8,
      completionRate: 50,
      timeTracker: { isRunning: false, totalTime: 120 }
    },
    {
      id: 'task-4',
      title: 'Optymalizacja bazy danych',
      description: 'Optymalizacja zapytań SQL i indeksów w bazie danych',
      status: 'completed',
      priority: 'medium',
      assignee: { name: 'Marcin Dubiński', avatar: '👨‍💼', id: 'user-1' },
      dueDate: '2024-10-20',
      createdDate: '2024-10-15',
      estimatedHours: 12,
      actualHours: 14,
      tags: ['Database', 'Performance'],
      aiScore: 95,
      dependencies: [],
      attachments: 2,
      comments: 5,
      completionRate: 100,
      timeTracker: { isRunning: false, totalTime: 840 }
    },
    {
      id: 'task-5',
      title: 'Setup CI/CD Pipeline',
      description: 'Konfiguracja automatycznego wdrażania dla projektów',
      status: 'blocked',
      priority: 'high',
      assignee: { name: 'Anna Nowak', avatar: '👩‍💻', id: 'user-2' },
      dueDate: '2024-11-01',
      createdDate: '2024-10-10',
      estimatedHours: 16,
      actualHours: 8,
      tags: ['DevOps', 'Infrastructure'],
      aiScore: 88,
      dependencies: [],
      attachments: 4,
      comments: 15,
      completionRate: 30,
      timeTracker: { isRunning: false, totalTime: 480 }
    },
    {
      id: 'task-6',
      title: 'Testy jednostkowe - API Authentication',
      description: 'Napisanie testów dla nowego systemu uwierzytelniania',
      status: 'in-progress',
      priority: 'medium',
      assignee: { name: 'Piotr Kowal', avatar: '👨‍💻', id: 'user-3' },
      dueDate: '2024-10-28',
      createdDate: '2024-10-18',
      estimatedHours: 6,
      actualHours: 4,
      tags: ['Testing', 'Security'],
      aiScore: 72,
      dependencies: [],
      attachments: 0,
      comments: 6,
      completionRate: 70,
      timeTracker: { isRunning: false, totalTime: 240 }
    },
    {
      id: 'task-7',
      title: 'Dokumentacja API v2.0',
      description: 'Aktualizacja dokumentacji API po wprowadzeniu nowych endpoints',
      status: 'todo',
      priority: 'low',
      assignee: { name: 'Marcin Dubiński', avatar: '👨‍💼', id: 'user-1' },
      dueDate: '2024-11-30',
      createdDate: '2024-10-23',
      estimatedHours: 10,
      actualHours: 0,
      tags: ['Documentation', 'API'],
      aiScore: 45,
      dependencies: ['task-3', 'task-6'],
      attachments: 1,
      comments: 2,
      completionRate: 0,
      timeTracker: { isRunning: false, totalTime: 0 }
    }
  ];

  const filteredTasks = tasks.filter(task => {
    if (filterStatus !== 'all' && task.status !== filterStatus) return false;
    if (filterPriority !== 'all' && task.priority !== filterPriority) return false;
    if (filterAssignee !== 'all' && task.assignee.id !== filterAssignee) return false;
    if (searchQuery && !task.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !task.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 };
        return priorityOrder[b.priority] - priorityOrder[a.priority];
      case 'aiScore':
        return b.aiScore - a.aiScore;
      case 'created':
        return new Date(b.createdDate).getTime() - new Date(a.createdDate).getTime();
      default:
        return 0;
    }
  });

  const getTasksByStatus = (status: string) => sortedTasks.filter(task => task.status === status);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-yellow-500 text-white';
      case 'low': return 'bg-green-500 text-white';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo': return 'text-gray-600';
      case 'in-progress': return 'text-blue-600';
      case 'review': return 'text-yellow-600';
      case 'completed': return 'text-green-600';
      case 'blocked': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  const getDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const TaskCard = ({ task }: { task: Task }) => {
    const daysUntilDue = getDaysUntilDue(task.dueDate);
    const isOverdue = daysUntilDue < 0;
    const isDueSoon = daysUntilDue <= 2 && daysUntilDue >= 0;

    return (
      <Link href={`/dashboard/tasks/${task.id}`}>
        <div className="bg-white rounded-lg border border-gray-200 p-4 hover:shadow-md transition-all duration-200 cursor-pointer group">
          {/* Header */}
          <div className="flex items-start justify-between mb-3">
            <div className="flex items-center space-x-2">
              <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                {task.priority.toUpperCase()}
              </span>
              {task.timeTracker.isRunning && (
                <div className="flex items-center space-x-1 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span>LIVE</span>
                </div>
              )}
            </div>
            <div className="flex items-center space-x-1 text-xs text-gray-500">
              <span>🧠</span>
              <span className="font-semibold">{task.aiScore}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors line-clamp-2">
            {task.title}
          </h3>

          {/* Customer/Project */}
          {(task.customer || task.project) && (
            <div className="text-sm text-gray-600 mb-3">
              {task.customer && (
                <div className="flex items-center space-x-1 mb-1">
                  <span>👤</span>
                  <span>{task.customer.company}</span>
                </div>
              )}
              {task.project && (
                <div className="flex items-center space-x-1">
                  <span>📋</span>
                  <span>{task.project.name}</span>
                </div>
              )}
            </div>
          )}

          {/* Progress Bar */}
          {task.completionRate > 0 && (
            <div className="mb-3">
              <div className="flex justify-between text-xs text-gray-500 mb-1">
                <span>Postęp</span>
                <span>{task.completionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${task.completionRate}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Tags */}
          <div className="flex flex-wrap gap-1 mb-3">
            {task.tags.slice(0, 3).map((tag, index) => (
              <span key={index} className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-6 h-6 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-sm">
                {task.assignee.avatar}
              </div>
              <div className="text-xs text-gray-500">
                <div className="flex items-center space-x-2">
                  {task.attachments > 0 && <span>📎 {task.attachments}</span>}
                  {task.comments > 0 && <span>💬 {task.comments}</span>}
                </div>
              </div>
            </div>

            <div className="text-right">
              <div className={`text-xs font-medium ${
                isOverdue ? 'text-red-600' : isDueSoon ? 'text-orange-600' : 'text-gray-500'
              }`}>
                {isOverdue ? `${Math.abs(daysUntilDue)} dni po terminie` :
                 isDueSoon ? `${daysUntilDue} dni` : 
                 daysUntilDue === 0 ? 'Dziś' : `${daysUntilDue} dni`}
              </div>
              {task.timeTracker.totalTime > 0 && (
                <div className="text-xs text-gray-500">
                  ⏱️ {formatTime(task.timeTracker.totalTime)}
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  };

  const KanbanColumn = ({ column, tasks }: { column: TaskColumn; tasks: Task[] }) => (
    <div className="flex-1 min-w-80">
      <div className={`rounded-lg border-2 border-dashed ${column.color} min-h-[600px]`}>
        <div className="p-4 border-b border-gray-200 bg-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-gray-900">{column.title}</h3>
            <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
              {tasks.length}
            </span>
          </div>
        </div>
        <div className="p-4 space-y-4">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {tasks.length === 0 && (
            <div className="text-center py-8 text-gray-400">
              <div className="text-4xl mb-2">📋</div>
              <p className="text-sm">Brak zadań</p>
            </div>
          )}
        </div>
      </div>
    </div>
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
                <h1 className="text-3xl font-bold text-gray-900">Zadania</h1>
                <p className="text-gray-600">Zarządzaj zadaniami z AI-powered insights i time tracking</p>
              </div>
              <div className="flex items-center space-x-3">
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  📊 Raporty
                </button>
                <button className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-lg hover:shadow-lg transition-all font-medium">
                  ➕ Nowe zadanie
                </button>
              </div>
            </div>

            {/* AI Insights Panel */}
            {showAIInsights && (
              <div className="bg-linear-to-r from-purple-500 to-cyan-500 rounded-xl text-white p-6 mb-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <span className="text-xl">🤖</span>
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold">AI Task Insights</h3>
                      <p className="text-purple-100">Inteligentne rekomendacje dla Twoich zadań</p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowAIInsights(false)}
                    className="text-white/80 hover:text-white"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">🎯 Wysokie ryzyko opóźnienia</h4>
                    <p className="text-sm text-purple-100 mb-2">
                      Zadanie "Implementacja modułu AI" może być opóźnione o 3 dni
                    </p>
                    <button className="text-sm font-medium hover:underline">Optymalizuj harmonogram →</button>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">⚡ Boost produktywności</h4>
                    <p className="text-sm text-purple-100 mb-2">
                      Grupowanie podobnych zadań może zwiększyć efektywność o 25%
                    </p>
                    <button className="text-sm font-medium hover:underline">Zobacz sugestie →</button>
                  </div>
                  <div className="bg-white/10 rounded-lg p-4">
                    <h4 className="font-semibold mb-2">📈 Analiza obciążenia</h4>
                    <p className="text-sm text-purple-100 mb-2">
                      Anna Nowak ma 40% więcej zadań niż średnia zespołu
                    </p>
                    <button className="text-sm font-medium hover:underline">Rebalansuj zadania →</button>
                  </div>
                </div>
              </div>
            )}

            {/* Quick Stats */}
            <div className="grid grid-cols-5 gap-6 mb-6">
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center">
                    <span className="text-gray-600 text-lg">📋</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Wszystkie zadania</p>
                    <p className="text-xl font-bold text-gray-900">{tasks.length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                    <span className="text-blue-600 text-lg">🔄</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">W trakcie</p>
                    <p className="text-xl font-bold text-gray-900">{tasks.filter(t => t.status === 'in-progress').length}</p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                    <span className="text-red-600 text-lg">⚠️</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Pilne</p>
                    <p className="text-xl font-bold text-gray-900">
                      {tasks.filter(t => t.priority === 'urgent' || t.priority === 'high').length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-yellow-100 rounded-lg flex items-center justify-center">
                    <span className="text-yellow-600 text-lg">⏰</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Po terminie</p>
                    <p className="text-xl font-bold text-gray-900">
                      {tasks.filter(t => getDaysUntilDue(t.dueDate) < 0).length}
                    </p>
                  </div>
                </div>
              </div>
              <div className="bg-white rounded-lg p-4 border border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <span className="text-green-600 text-lg">✅</span>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Ukończone (tydzień)</p>
                    <p className="text-xl font-bold text-gray-900">
                      {tasks.filter(t => t.status === 'completed').length}
                    </p>
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
                      placeholder="Szukaj zadań..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    />
                    <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
                  </div>

                  {/* Filters */}
                  <select 
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Wszystkie statusy</option>
                    <option value="todo">Do zrobienia</option>
                    <option value="in-progress">W trakcie</option>
                    <option value="review">Do przeglądu</option>
                    <option value="completed">Ukończone</option>
                    <option value="blocked">Zablokowane</option>
                  </select>

                  <select 
                    value={filterPriority}
                    onChange={(e) => setFilterPriority(e.target.value)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="all">Wszystkie priorytety</option>
                    <option value="urgent">Pilne</option>
                    <option value="high">Wysokie</option>
                    <option value="medium">Średnie</option>
                    <option value="low">Niskie</option>
                  </select>

                  <select 
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as any)}
                    className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="aiScore">AI Score</option>
                    <option value="dueDate">Termin</option>
                    <option value="priority">Priorytet</option>
                    <option value="created">Data utworzenia</option>
                  </select>
                </div>

                {/* View Mode */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-gray-500">Widok:</span>
                  <div className="flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode('kanban')}
                      className={`px-3 py-2 text-sm ${viewMode === 'kanban' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      📋 Kanban
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`px-3 py-2 text-sm ${viewMode === 'list' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      📄 Lista
                    </button>
                    <button
                      onClick={() => setViewMode('timeline')}
                      className={`px-3 py-2 text-sm ${viewMode === 'timeline' ? 'bg-purple-500 text-white' : 'bg-white text-gray-700 hover:bg-gray-50'}`}
                    >
                      📅 Timeline
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Task Display */}
          {viewMode === 'kanban' && (
            <div className="flex space-x-6 overflow-x-auto pb-6">
              {columns.map((column) => (
                <KanbanColumn 
                  key={column.id} 
                  column={column} 
                  tasks={getTasksByStatus(column.id)}
                />
              ))}
            </div>
          )}

          {viewMode === 'list' && (
            <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
              <div className="grid grid-cols-1 divide-y divide-gray-200">
                {sortedTasks.map((task) => (
                  <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
                    <div className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-4 flex-1">
                          <div className="flex items-center space-x-2">
                            <span className={`w-3 h-3 rounded-full ${getStatusColor(task.status).replace('text-', 'bg-')}`}></span>
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-gray-900 mb-1">{task.title}</h3>
                            <p className="text-sm text-gray-500 truncate">{task.description}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              {task.customer && (
                                <span className="text-xs text-gray-500">👤 {task.customer.company}</span>
                              )}
                              {task.project && (
                                <span className="text-xs text-gray-500">📋 {task.project.name}</span>
                              )}
                              <span className="text-xs text-gray-500">🧠 {task.aiScore}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm">
                          <div className="text-center">
                            <div className="w-8 h-8 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center mb-1">
                              {task.assignee.avatar}
                            </div>
                            <p className="text-xs text-gray-500">{task.assignee.name.split(' ')[0]}</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-gray-900">{getDaysUntilDue(task.dueDate)} dni</p>
                            <p className="text-xs text-gray-500">Do terminu</p>
                          </div>
                          <div className="text-center">
                            <p className="font-semibold text-gray-900">{task.completionRate}%</p>
                            <p className="text-xs text-gray-500">Postęp</p>
                          </div>
                          {task.timeTracker.totalTime > 0 && (
                            <div className="text-center">
                              <p className="font-semibold text-gray-900">{formatTime(task.timeTracker.totalTime)}</p>
                              <p className="text-xs text-gray-500">Czas</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {viewMode === 'timeline' && (
            <div className="bg-white rounded-lg border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Timeline zadań</h3>
              <div className="space-y-4">
                {sortedTasks
                  .sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime())
                  .map((task) => {
                    const daysUntilDue = getDaysUntilDue(task.dueDate);
                    return (
                      <Link key={task.id} href={`/dashboard/tasks/${task.id}`}>
                        <div className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-all cursor-pointer">
                          <div className="flex items-center space-x-3">
                            <div className={`w-4 h-4 rounded-full ${
                              daysUntilDue < 0 ? 'bg-red-500' :
                              daysUntilDue <= 2 ? 'bg-orange-500' :
                              'bg-green-500'
                            }`}></div>
                            <div className="text-sm">
                              <div className="font-medium text-gray-900">{new Date(task.dueDate).toLocaleDateString('pl-PL')}</div>
                              <div className="text-gray-500">
                                {daysUntilDue < 0 ? `${Math.abs(daysUntilDue)} dni po terminie` :
                                 daysUntilDue === 0 ? 'Dziś' :
                                 `Za ${daysUntilDue} dni`}
                              </div>
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-900">{task.title}</h4>
                            <p className="text-sm text-gray-500">{task.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <span className={`px-2 py-1 text-xs rounded-full ${getPriorityColor(task.priority)}`}>
                              {task.priority}
                            </span>
                            <div className="w-6 h-6 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-sm">
                              {task.assignee.avatar}
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Empty State */}
          {filteredTasks.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-4xl text-gray-400">📋</span>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Brak zadań</h3>
              <p className="text-gray-500 mb-4">Nie znaleziono zadań spełniających kryteria wyszukiwania.</p>
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

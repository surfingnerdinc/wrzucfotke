'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Sidebar from '../../components/Sidebar';
import DashboardHeader from '../../components/DashboardHeader';

interface TaskDetail {
  id: string;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'review' | 'completed' | 'blocked';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  assignee: {
    name: string;
    avatar: string;
    id: string;
    email: string;
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
  aiScore: number;
  dependencies: string[];
  attachments: Array<{
    id: string;
    name: string;
    size: string;
    type: string;
    uploadDate: string;
  }>;
  comments: Array<{
    id: string;
    author: string;
    avatar: string;
    content: string;
    date: string;
    edited?: boolean;
  }>;
  completionRate: number;
  subtasks: Array<{
    id: string;
    title: string;
    completed: boolean;
    assignee?: string;
  }>;
  timeTracker: {
    isRunning: boolean;
    totalTime: number;
    lastStarted?: string;
    sessions: Array<{
      id: string;
      startTime: string;
      endTime?: string;
      duration: number;
      description?: string;
    }>;
  };
  aiInsights: {
    riskScore: number;
    suggestions: string[];
    estimatedCompletion: string;
    blockers: string[];
  };
}

export default function TaskDetailPage() {
  const params = useParams();
  const taskId = params.slug as string;
  
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('tasks');
  const [activeDetailTab, setActiveDetailTab] = useState<'overview' | 'subtasks' | 'time' | 'comments' | 'attachments' | 'ai-insights'>('overview');
  const [newComment, setNewComment] = useState('');
  const [timerRunning, setTimerRunning] = useState(false);
  const [currentSessionTime, setCurrentSessionTime] = useState(0);
  const [newSubtask, setNewSubtask] = useState('');

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: 'Professional'
  };

  // Mock task data - in real app would come from API
  const taskData: TaskDetail = {
    id: taskId,
    title: 'Implementacja modułu AI w CRM',
    description: 'Zadanie polega na dodaniu zaawansowanych funkcji sztucznej inteligencji do systemu CRM dla klienta TechCorp Solutions. Moduł ma obejmować predykcję sprzedaży, automatyczne kategoryzowanie leadów oraz inteligentne rekomendacje działań dla zespołu sprzedażowego.',
    status: 'in-progress',
    priority: 'high',
    assignee: {
      name: 'Marcin Dubiński',
      avatar: '👨‍💼',
      id: 'user-1',
      email: 'marcin@coreoneflow.com'
    },
    customer: {
      name: 'Anna Kowalska',
      company: 'TechCorp Solutions',
      id: 'tech-corp'
    },
    project: {
      name: 'CRM System Implementation',
      id: 'proj-1'
    },
    dueDate: '2024-11-15',
    createdDate: '2024-10-01',
    estimatedHours: 40,
    actualHours: 25.5,
    tags: ['AI', 'Backend', 'Critical', 'Machine Learning'],
    aiScore: 92,
    dependencies: ['task-5', 'task-8'],
    attachments: [
      {
        id: 'att-1',
        name: 'AI_Module_Specification.pdf',
        size: '2.4 MB',
        type: 'application/pdf',
        uploadDate: '2024-10-02'
      },
      {
        id: 'att-2',
        name: 'database_schema.sql',
        size: '15 KB',
        type: 'text/plain',
        uploadDate: '2024-10-05'
      },
      {
        id: 'att-3',
        name: 'ui_mockups.figma',
        size: '850 KB',
        type: 'application/figma',
        uploadDate: '2024-10-08'
      }
    ],
    comments: [
      {
        id: 'com-1',
        author: 'Anna Kowalska',
        avatar: '👩‍💼',
        content: 'Świetny postęp! Model predykcyjny działa lepiej niż oczekiwaliśmy. Czy możemy dodać też funkcję analizy sentymenu z emaili?',
        date: '2024-10-22 14:30',
        edited: false
      },
      {
        id: 'com-2',
        author: 'Marcin Dubiński',
        avatar: '👨‍💼',
        content: 'Tak, analiza sentymenu to dobry pomysł. Dodam to do zakresu, ale będzie potrzebne dodatkowe 8-10 godzin pracy.',
        date: '2024-10-22 15:45',
        edited: false
      },
      {
        id: 'com-3',
        author: 'Piotr Kowal',
        avatar: '👨‍💻',
        content: 'Przetestowałem API - działa idealnie. Dokumentacja jest bardzo czytelna. 🚀',
        date: '2024-10-23 10:15',
        edited: false
      }
    ],
    completionRate: 65,
    subtasks: [
      { id: 'sub-1', title: 'Analiza wymagań klienta', completed: true, assignee: 'Marcin Dubiński' },
      { id: 'sub-2', title: 'Projektowanie architektury AI', completed: true, assignee: 'Marcin Dubiński' },
      { id: 'sub-3', title: 'Implementacja modelu ML', completed: true, assignee: 'Marcin Dubiński' },
      { id: 'sub-4', title: 'Integracja z API CRM', completed: false, assignee: 'Marcin Dubiński' },
      { id: 'sub-5', title: 'Testy jednostkowe', completed: false, assignee: 'Piotr Kowal' },
      { id: 'sub-6', title: 'Optymalizacja wydajności', completed: false, assignee: 'Marcin Dubiński' },
      { id: 'sub-7', title: 'Dokumentacja API', completed: false }
    ],
    timeTracker: {
      isRunning: true,
      totalTime: 1530, // minutes
      lastStarted: '2024-10-24T09:00:00',
      sessions: [
        {
          id: 'ses-1',
          startTime: '2024-10-21T09:00:00',
          endTime: '2024-10-21T13:00:00',
          duration: 240,
          description: 'Implementacja core AI engine'
        },
        {
          id: 'ses-2',
          startTime: '2024-10-21T14:00:00',
          endTime: '2024-10-21T18:00:00',
          duration: 240,
          description: 'Integracja z bazą danych'
        },
        {
          id: 'ses-3',
          startTime: '2024-10-22T09:00:00',
          endTime: '2024-10-22T17:00:00',
          duration: 480,
          description: 'Testowanie i debugowanie'
        },
        {
          id: 'ses-4',
          startTime: '2024-10-23T09:30:00',
          endTime: '2024-10-23T16:00:00',
          duration: 390,
          description: 'Optymalizacja algorytmów'
        },
        {
          id: 'ses-5',
          startTime: '2024-10-24T09:00:00',
          endTime: undefined,
          duration: 180,
          description: 'API endpoints i dokumentacja'
        }
      ]
    },
    aiInsights: {
      riskScore: 25,
      suggestions: [
        'Rozważ podział zadania "Optymalizacja wydajności" na mniejsze części',
        'Zaplanuj code review z Piotrem przed finalizacją',
        'Dodaj więcej testów integracyjnych dla modułu AI'
      ],
      estimatedCompletion: '2024-11-12',
      blockers: [
        'Oczekiwanie na finalne dane testowe od klienta',
        'Brak dostępu do środowiska produkcyjnego'
      ]
    }
  };

  const [taskState, setTaskState] = useState(taskData);

  // Timer effect
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (taskState.timeTracker.isRunning) {
      interval = setInterval(() => {
        setCurrentSessionTime(prev => prev + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [taskState.timeTracker.isRunning]);

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
      case 'todo': return 'bg-gray-100 text-gray-700 border-gray-300';
      case 'in-progress': return 'bg-blue-100 text-blue-700 border-blue-300';
      case 'review': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'completed': return 'bg-green-100 text-green-700 border-green-300';
      case 'blocked': return 'bg-red-100 text-red-700 border-red-300';
      default: return 'bg-gray-100 text-gray-700 border-gray-300';
    }
  };

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };

  const formatTimeWithSeconds = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours}h ${minutes}m ${seconds}s`;
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('pl-PL');
  };

  const toggleTimer = () => {
    setTaskState(prev => ({
      ...prev,
      timeTracker: {
        ...prev.timeTracker,
        isRunning: !prev.timeTracker.isRunning,
        lastStarted: !prev.timeTracker.isRunning ? new Date().toISOString() : prev.timeTracker.lastStarted
      }
    }));
    
    if (!taskState.timeTracker.isRunning) {
      setTimerRunning(true);
    } else {
      setTimerRunning(false);
      // Save session
      const newSession = {
        id: `ses-${Date.now()}`,
        startTime: taskState.timeTracker.lastStarted!,
        endTime: new Date().toISOString(),
        duration: currentSessionTime / 60,
        description: 'Nowa sesja pracy'
      };
      
      setTaskState(prev => ({
        ...prev,
        timeTracker: {
          ...prev.timeTracker,
          totalTime: prev.timeTracker.totalTime + (currentSessionTime / 60),
          sessions: [...prev.timeTracker.sessions, newSession]
        }
      }));
      
      setCurrentSessionTime(0);
    }
  };

  const toggleSubtask = (subtaskId: string) => {
    setTaskState(prev => ({
      ...prev,
      subtasks: prev.subtasks.map(sub => 
        sub.id === subtaskId ? { ...sub, completed: !sub.completed } : sub
      )
    }));
  };

  const addSubtask = () => {
    if (newSubtask.trim()) {
      const newSub = {
        id: `sub-${Date.now()}`,
        title: newSubtask,
        completed: false,
        assignee: user.name
      };
      
      setTaskState(prev => ({
        ...prev,
        subtasks: [...prev.subtasks, newSub]
      }));
      
      setNewSubtask('');
    }
  };

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: `com-${Date.now()}`,
        author: user.name,
        avatar: user.avatar,
        content: newComment,
        date: new Date().toLocaleString('pl-PL'),
        edited: false
      };
      
      setTaskState(prev => ({
        ...prev,
        comments: [...prev.comments, comment]
      }));
      
      setNewComment('');
    }
  };

  const getFileIcon = (type: string) => {
    if (type.includes('pdf')) return '📄';
    if (type.includes('image')) return '🖼️';
    if (type.includes('text') || type.includes('sql')) return '📝';
    if (type.includes('figma')) return '🎨';
    return '📎';
  };

  const completedSubtasks = taskState.subtasks.filter(sub => sub.completed).length;
  const totalSubtasks = taskState.subtasks.length;
  const actualCompletionRate = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

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
            <Link href="/dashboard/tasks" className="hover:text-gray-700">Zadania</Link>
            <span>›</span>
            <span className="text-gray-900 font-medium">{taskState.title}</span>
          </nav>

          {/* Task Header */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-start justify-between mb-6">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h1 className="text-2xl font-bold text-gray-900">{taskState.title}</h1>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getStatusColor(taskState.status)}`}>
                    {taskState.status.toUpperCase().replace('-', ' ')}
                  </span>
                  <span className={`px-3 py-1 text-sm font-medium rounded-full ${getPriorityColor(taskState.priority)}`}>
                    {taskState.priority.toUpperCase()}
                  </span>
                </div>
                
                <p className="text-gray-600 mb-4 max-w-4xl">{taskState.description}</p>
                
                <div className="flex items-center space-x-6 text-sm">
                  {taskState.customer && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">👤</span>
                      <Link href={`/dashboard/customers/${taskState.customer.id}`} className="text-purple-600 hover:text-purple-700">
                        {taskState.customer.company}
                      </Link>
                    </div>
                  )}
                  {taskState.project && (
                    <div className="flex items-center space-x-2">
                      <span className="text-gray-400">📋</span>
                      <span className="text-gray-600">{taskState.project.name}</span>
                    </div>
                  )}
                  <div className="flex items-center space-x-2">
                    <span className="text-gray-400">🧠</span>
                    <span className="font-semibold text-gray-900">AI Score: {taskState.aiScore}</span>
                  </div>
                </div>
              </div>

              {/* Timer Section */}
              <div className="bg-gray-50 rounded-lg p-3 min-w-48">
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="text-lg font-medium text-gray-900">
                      {taskState.timeTracker.isRunning 
                        ? formatTimeWithSeconds((taskState.timeTracker.totalTime * 60) + currentSessionTime)
                        : formatTimeWithSeconds(taskState.timeTracker.totalTime)
                      }
                    </div>
                    <p className="text-xs text-gray-500">Łączny czas</p>
                  </div>
                  {taskState.timeTracker.isRunning && (
                    <div className="flex items-center space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-xs text-green-600 font-medium">LIVE</span>
                    </div>
                  )}
                </div>
                
                <button
                  onClick={toggleTimer}
                  className={`w-full py-2 px-3 rounded-md text-sm font-medium transition-all ${
                    taskState.timeTracker.isRunning
                      ? 'bg-red-500 text-white hover:bg-red-600'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {taskState.timeTracker.isRunning ? '⏸️ Stop' : '▶️ Start'}
                </button>
                
                {taskState.timeTracker.isRunning && (
                  <div className="mt-2 text-center">
                    <div className="text-sm text-gray-600">
                      Sesja: {formatTimeWithSeconds(currentSessionTime)}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-5 gap-6">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">📅</span>
                  <span className="text-lg font-bold text-gray-900">
                    {Math.ceil((new Date(taskState.dueDate).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}
                  </span>
                </div>
                <p className="text-sm text-gray-500">Dni do terminu</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">✅</span>
                  <span className="text-lg font-bold text-gray-900">{completedSubtasks}/{totalSubtasks}</span>
                </div>
                <p className="text-sm text-gray-500">Podzadania</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">⏱️</span>
                  <span className="text-lg font-bold text-gray-900">{taskState.actualHours}h</span>
                </div>
                <p className="text-sm text-gray-500">Z {taskState.estimatedHours}h</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">📎</span>
                  <span className="text-lg font-bold text-gray-900">{taskState.attachments.length}</span>
                </div>
                <p className="text-sm text-gray-500">Załączniki</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-center mb-2">
                  <span className="text-gray-400 mr-2">💬</span>
                  <span className="text-lg font-bold text-gray-900">{taskState.comments.length}</span>
                </div>
                <p className="text-sm text-gray-500">Komentarze</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between text-sm text-gray-500 mb-2">
                <span>Postęp zadania</span>
                <span>{actualCompletionRate}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="bg-linear-to-r from-purple-500 to-cyan-500 h-3 rounded-full transition-all duration-500"
                  style={{ width: `${actualCompletionRate}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                {[
                  { id: 'overview', label: 'Przegląd', icon: '📊' },
                  { id: 'subtasks', label: 'Podzadania', icon: '✅' },
                  { id: 'time', label: 'Czas pracy', icon: '⏱️' },
                  { id: 'comments', label: 'Komentarze', icon: '💬' },
                  { id: 'attachments', label: 'Załączniki', icon: '📎' },
                  { id: 'ai-insights', label: 'AI Insights', icon: '🤖' }
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
                  {/* Task Details */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Szczegóły zadania</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500">Przypisane do</p>
                          <div className="flex items-center space-x-2 mt-1">
                            <span className="text-lg">{taskState.assignee.avatar}</span>
                            <span className="font-medium text-gray-900">{taskState.assignee.name}</span>
                          </div>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Termin ukończenia</p>
                          <p className="font-medium text-gray-900">{new Date(taskState.dueDate).toLocaleDateString('pl-PL')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Data utworzenia</p>
                          <p className="font-medium text-gray-900">{new Date(taskState.createdDate).toLocaleDateString('pl-PL')}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-500">Szacowany czas</p>
                          <p className="font-medium text-gray-900">{taskState.estimatedHours} godzin</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Tagi i zależności</h3>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm text-gray-500 mb-2">Tagi</p>
                          <div className="flex flex-wrap gap-2">
                            {taskState.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                        
                        {taskState.dependencies.length > 0 && (
                          <div>
                            <p className="text-sm text-gray-500 mb-2">Zależności</p>
                            <div className="space-y-1">
                              {taskState.dependencies.map((depId, index) => (
                                <Link key={index} href={`/dashboard/tasks/${depId}`} className="block text-sm text-purple-600 hover:text-purple-700">
                                  📋 Zadanie #{depId}
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h3>
                    <div className="flex space-x-3">
                      <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                        📝 Edytuj zadanie
                      </button>
                      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                        ✅ Oznacz jako ukończone
                      </button>
                      <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors">
                        👥 Przypisz innej osobie
                      </button>
                      <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                        🚫 Zablokuj zadanie
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Subtasks Tab */}
              {activeDetailTab === 'subtasks' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">
                      Podzadania ({completedSubtasks}/{totalSubtasks})
                    </h3>
                  </div>

                  {/* Add New Subtask */}
                  <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                    <input
                      type="text"
                      value={newSubtask}
                      onChange={(e) => setNewSubtask(e.target.value)}
                      placeholder="Dodaj nowe podzadanie..."
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && addSubtask()}
                    />
                    <button
                      onClick={addSubtask}
                      disabled={!newSubtask.trim()}
                      className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      ➕ Dodaj
                    </button>
                  </div>

                  {/* Subtasks List */}
                  <div className="space-y-2">
                    {taskState.subtasks.map((subtask) => (
                      <div key={subtask.id} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <button
                          onClick={() => toggleSubtask(subtask.id)}
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                            subtask.completed
                              ? 'bg-green-500 border-green-500 text-white'
                              : 'border-gray-300 hover:border-green-400'
                          }`}
                        >
                          {subtask.completed && <span className="text-xs">✓</span>}
                        </button>
                        
                        <div className="flex-1">
                          <span className={`${subtask.completed ? 'line-through text-gray-500' : 'text-gray-900'} font-medium`}>
                            {subtask.title}
                          </span>
                          {subtask.assignee && (
                            <div className="text-sm text-gray-500 mt-1">
                              👤 {subtask.assignee}
                            </div>
                          )}
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-gray-600 text-sm">
                            ✏️
                          </button>
                          <button className="text-gray-400 hover:text-red-500 text-sm">
                            🗑️
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Progress Summary */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-semibold text-blue-900">Postęp podzadań</span>
                      <span className="text-blue-700">{actualCompletionRate}%</span>
                    </div>
                    <div className="w-full bg-blue-200 rounded-full h-2">
                      <div 
                        className="bg-blue-500 h-2 rounded-full transition-all duration-500"
                        style={{ width: `${actualCompletionRate}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              )}

              {/* Time Tracking Tab */}
              {activeDetailTab === 'time' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Czas pracy</h3>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <div className="text-lg font-semibold text-gray-900">{formatTime(taskState.timeTracker.totalTime)}</div>
                        <div className="text-sm text-gray-500">Łączny czas</div>
                      </div>
                    </div>
                  </div>

                  {/* Time vs Estimate */}
                  <div className="grid grid-cols-3 gap-6">
                    <div className="bg-blue-50 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-blue-600">{taskState.estimatedHours}h</div>
                        <div className="text-sm text-blue-600">Szacowany</div>
                      </div>
                    </div>
                    <div className="bg-green-50 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">{formatTime(taskState.timeTracker.totalTime)}</div>
                        <div className="text-sm text-green-600">Rzeczywisty</div>
                      </div>
                    </div>
                    <div className="bg-orange-50 rounded-lg p-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-orange-600">
                          {((taskState.timeTracker.totalTime / 60) / taskState.estimatedHours * 100).toFixed(0)}%
                        </div>
                        <div className="text-sm text-orange-600">Wykorzystanie</div>
                      </div>
                    </div>
                  </div>

                  {/* Time Sessions */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Sesje pracy</h4>
                    <div className="space-y-3">
                      {taskState.timeTracker.sessions.map((session) => (
                        <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                          <div>
                            <div className="font-medium text-gray-900">
                              {session.description || 'Sesja pracy'}
                            </div>
                            <div className="text-sm text-gray-500">
                              {formatDateTime(session.startTime)} 
                              {session.endTime && ` - ${formatDateTime(session.endTime)}`}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="font-semibold text-gray-900">{formatTime(session.duration)}</div>
                            {!session.endTime && (
                              <div className="text-sm text-green-600">🔴 Trwa</div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Comments Tab */}
              {activeDetailTab === 'comments' && (
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">Komentarze ({taskState.comments.length})</h3>

                  {/* Add Comment Form */}
                  <div className="border border-gray-200 rounded-lg p-4">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder="Dodaj komentarz..."
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                    <div className="flex justify-end mt-3">
                      <button 
                        onClick={addComment}
                        className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors disabled:opacity-50"
                        disabled={!newComment.trim()}
                      >
                        💬 Dodaj komentarz
                      </button>
                    </div>
                  </div>

                  {/* Comments List */}
                  <div className="space-y-4">
                    {taskState.comments.map((comment) => (
                      <div key={comment.id} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center text-lg">
                            {comment.avatar}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <span className="font-semibold text-gray-900">{comment.author}</span>
                              <span className="text-sm text-gray-500">{comment.date}</span>
                              {comment.edited && (
                                <span className="text-xs text-gray-400">(edytowano)</span>
                              )}
                            </div>
                            <p className="text-gray-700">{comment.content}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Attachments Tab */}
              {activeDetailTab === 'attachments' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-gray-900">Załączniki ({taskState.attachments.length})</h3>
                    <button className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition-colors">
                      📎 Dodaj załącznik
                    </button>
                  </div>

                  <div className="grid grid-cols-1 gap-4">
                    {taskState.attachments.map((attachment) => (
                      <div key={attachment.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                        <div className="text-3xl">
                          {getFileIcon(attachment.type)}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">{attachment.name}</h4>
                          <p className="text-sm text-gray-500">
                            {attachment.size} • Dodano {new Date(attachment.uploadDate).toLocaleDateString('pl-PL')}
                          </p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button className="text-purple-600 hover:text-purple-700 text-sm">
                            📥 Pobierz
                          </button>
                          <button className="text-gray-400 hover:text-red-500 text-sm">
                            🗑️ Usuń
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* AI Insights Tab */}
              {activeDetailTab === 'ai-insights' && (
                <div className="space-y-6">
                  <h3 className="text-lg font-semibold text-gray-900">AI Insights</h3>

                  {/* Risk Score */}
                  <div className="bg-linear-to-r from-purple-500 to-cyan-500 rounded-xl text-white p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="text-xl font-semibold">Ocena ryzyka</h4>
                        <p className="text-purple-100">AI przeanalizowało zadanie pod kątem potencjalnych problemów</p>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-semibold">{taskState.aiInsights.riskScore}%</div>
                        <div className="text-sm text-purple-100">Ryzyko opóźnienia</div>
                      </div>
                    </div>
                    <div className="bg-white/20 rounded-lg p-4">
                      <p className="text-sm">
                        {taskState.aiInsights.riskScore < 30 ? '✅ Niskie ryzyko - zadanie przebiega zgodnie z planem' :
                         taskState.aiInsights.riskScore < 60 ? '⚠️ Średnie ryzyko - monitoruj postępy' :
                         '🚨 Wysokie ryzyko - wymagana natychmiastowa uwaga'}
                      </p>
                    </div>
                  </div>

                  {/* AI Suggestions */}
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-4">Rekomendacje AI</h4>
                    <div className="space-y-3">
                      {taskState.aiInsights.suggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-start space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <span className="text-blue-600 text-lg">💡</span>
                          <p className="text-blue-900">{suggestion}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Estimated Completion */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <h4 className="font-semibold text-green-900 mb-2">📅 Przewidywane ukończenie</h4>
                      <p className="text-lg font-semibold text-green-700">
                        {new Date(taskState.aiInsights.estimatedCompletion).toLocaleDateString('pl-PL')}
                      </p>
                      <p className="text-sm text-green-600 mt-1">
                        Na podstawie obecnego tempa pracy
                      </p>
                    </div>
                    <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                      <h4 className="font-semibold text-orange-900 mb-2">⚠️ Potencjalne blokady</h4>
                      <div className="space-y-1">
                        {taskState.aiInsights.blockers.map((blocker, index) => (
                          <p key={index} className="text-sm text-orange-700">• {blocker}</p>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Performance Analytics */}
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h4 className="font-semibold text-gray-900 mb-4">📊 Analiza wydajności</h4>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-lg font-semibold text-purple-600">
                          {Math.round(((taskState.timeTracker.totalTime / 60) / taskState.estimatedHours) * 100)}%
                        </div>
                        <div className="text-sm text-gray-600">Efektywność czasowa</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-cyan-600">{actualCompletionRate}%</div>
                        <div className="text-sm text-gray-600">Postęp zadania</div>
                      </div>
                      <div className="text-center">
                        <div className="text-lg font-semibold text-green-600">
                          {taskState.timeTracker.sessions.length}
                        </div>
                        <div className="text-sm text-gray-600">Sesji pracy</div>
                      </div>
                    </div>
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

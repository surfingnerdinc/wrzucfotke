'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { usePlan } from '../../contexts/PlanContext';

interface CalendarEvent {
  id: string;
  title: string;
  description?: string;
  type: 'meeting' | 'task' | 'deadline' | 'call' | 'reminder' | 'personal';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  startDate: string;
  endDate: string;
  allDay: boolean;
  location?: string;
  attendees?: Array<{
    id: string;
    name: string;
    avatar: string;
    email: string;
    status: 'accepted' | 'declined' | 'tentative' | 'pending';
  }>;
  organizer: {
    id: string;
    name: string;
    avatar: string;
  };
  relatedTo?: Array<{
    type: 'client' | 'project' | 'task';
    id: string;
    name: string;
  }>;
  reminders: Array<{
    type: 'email' | 'push' | 'popup';
    time: number; // minutes before
  }>;
  recurring?: {
    frequency: 'daily' | 'weekly' | 'monthly' | 'yearly';
    interval: number;
    endDate?: string;
    daysOfWeek?: number[];
  };
  status: 'confirmed' | 'tentative' | 'cancelled';
  color: string;
  createdAt: string;
  updatedAt: string;
}

export default function CalendarPage() {
  const {
    userPlan,
    usage,
    canEnableFeature,
    getUsagePercentage,
    isUsageNearLimit,
    setShowUpgradeModal,
    incrementUsage,
    decrementUsage,
  } = usePlan();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('calendar');
  const [viewMode, setViewMode] = useState<'month' | 'week' | 'day' | 'agenda'>('month');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [showEventModal, setShowEventModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<CalendarEvent | null>(null);
  const [draggedEvent, setDraggedEvent] = useState<CalendarEvent | null>(null);
  const [eventFilter, setEventFilter] = useState<string[]>(['meeting', 'task', 'deadline', 'call', 'reminder']);
  const [searchQuery, setSearchQuery] = useState('');
  const [aiQuestionCount, setAiQuestionCount] = useState(0);

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: userPlan.displayName
  };

  // Mock calendar events
  const events: CalendarEvent[] = [
    {
      id: 'evt-1',
      title: 'Spotkanie z klientem TechCorp',
      description: 'Prezentacja postępów projektu CRM i omówienie kolejnych kroków',
      type: 'meeting',
      priority: 'high',
      startDate: '2024-10-25T10:00:00',
      endDate: '2024-10-25T11:30:00',
      allDay: false,
      location: 'Sala konferencyjna A / Microsoft Teams',
      attendees: [
        {
          id: 'att-1',
          name: 'Anna Kowalska',
          avatar: '👩‍💼',
          email: 'anna@techcorp.com',
          status: 'accepted'
        },
        {
          id: 'att-2',
          name: 'Piotr Kowal',
          avatar: '👨‍💻',
          email: 'piotr@coreoneflow.com',
          status: 'accepted'
        }
      ],
      organizer: {
        id: 'user-1',
        name: 'Marcin Dubiński',
        avatar: '👨‍💼'
      },
      relatedTo: [
        { type: 'client', id: 'tech-corp', name: 'TechCorp Solutions' },
        { type: 'project', id: 'proj-1', name: 'Core CRM System' }
      ],
      reminders: [
        { type: 'email', time: 60 },
        { type: 'popup', time: 15 }
      ],
      status: 'confirmed',
      color: '#3B82F6',
      createdAt: '2024-10-20T14:00:00',
      updatedAt: '2024-10-22T16:30:00'
    },
    {
      id: 'evt-2',
      title: 'Code Review - AI Module',
      description: 'Przegląd kodu modułu sztucznej inteligencji przed wdrożeniem',
      type: 'task',
      priority: 'medium',
      startDate: '2024-10-25T14:00:00',
      endDate: '2024-10-25T15:30:00',
      allDay: false,
      attendees: [
        {
          id: 'att-3',
          name: 'Tomasz Nowicki',
          avatar: '🧑‍💻',
          email: 'tomasz@coreoneflow.com',
          status: 'accepted'
        }
      ],
      organizer: {
        id: 'user-2',
        name: 'Piotr Kowal',
        avatar: '👨‍💻'
      },
      relatedTo: [
        { type: 'project', id: 'proj-1', name: 'Core CRM System' },
        { type: 'task', id: 't4', name: 'AI Integration Module' }
      ],
      reminders: [
        { type: 'popup', time: 30 }
      ],
      status: 'confirmed',
      color: '#10B981',
      createdAt: '2024-10-21T09:00:00',
      updatedAt: '2024-10-21T09:00:00'
    },
    {
      id: 'evt-3',
      title: 'Deadline: Beta Testing',
      description: 'Termin ukończenia fazy beta testów aplikacji CRM',
      type: 'deadline',
      priority: 'urgent',
      startDate: '2024-10-28T23:59:00',
      endDate: '2024-10-28T23:59:00',
      allDay: true,
      organizer: {
        id: 'user-1',
        name: 'Marcin Dubiński',
        avatar: '👨‍💼'
      },
      relatedTo: [
        { type: 'project', id: 'proj-1', name: 'Core CRM System' }
      ],
      reminders: [
        { type: 'email', time: 1440 }, // 24h before
        { type: 'popup', time: 120 } // 2h before
      ],
      status: 'confirmed',
      color: '#EF4444',
      createdAt: '2024-09-01T10:00:00',
      updatedAt: '2024-10-15T14:00:00'
    },
    {
      id: 'evt-4',
      title: 'Call: ShopTech Requirements',
      description: 'Rozmowa telefoniczna w sprawie wymagań dla nowego projektu e-commerce',
      type: 'call',
      priority: 'medium',
      startDate: '2024-10-26T09:00:00',
      endDate: '2024-10-26T09:45:00',
      allDay: false,
      attendees: [
        {
          id: 'att-4',
          name: 'Michał Nowak',
          avatar: '👨‍💼',
          email: 'michal@shoptech.com',
          status: 'pending'
        }
      ],
      organizer: {
        id: 'user-1',
        name: 'Marcin Dubiński',
        avatar: '👨‍💼'
      },
      relatedTo: [
        { type: 'client', id: 'shop-tech', name: 'ShopTech' }
      ],
      reminders: [
        { type: 'popup', time: 15 }
      ],
      recurring: {
        frequency: 'weekly',
        interval: 1,
        endDate: '2024-12-31T23:59:00',
        daysOfWeek: [6] // Saturday
      },
      status: 'confirmed',
      color: '#F59E0B',
      createdAt: '2024-10-22T11:00:00',
      updatedAt: '2024-10-23T15:20:00'
    },
    {
      id: 'evt-5',
      title: 'Team Standup',
      description: 'Codzienny standup zespołu programistów',
      type: 'meeting',
      priority: 'low',
      startDate: '2024-10-25T09:00:00',
      endDate: '2024-10-25T09:15:00',
      allDay: false,
      attendees: [
        {
          id: 'att-5',
          name: 'Piotr Kowal',
          avatar: '👨‍💻',
          email: 'piotr@coreoneflow.com',
          status: 'accepted'
        },
        {
          id: 'att-6',
          name: 'Anna Wiśniewska',
          avatar: '👩‍🎨',
          email: 'anna.w@coreoneflow.com',
          status: 'accepted'
        }
      ],
      organizer: {
        id: 'user-1',
        name: 'Marcin Dubiński',
        avatar: '👨‍💼'
      },
      reminders: [
        { type: 'popup', time: 5 }
      ],
      recurring: {
        frequency: 'daily',
        interval: 1,
        daysOfWeek: [1, 2, 3, 4, 5] // Monday to Friday
      },
      status: 'confirmed',
      color: '#8B5CF6',
      createdAt: '2024-09-01T08:00:00',
      updatedAt: '2024-10-01T10:00:00'
    },
    {
      id: 'evt-6',
      title: 'Prezentacja dla FinanceBank',
      description: 'Prezentacja koncepcji aplikacji mobilnej bankowości',
      type: 'meeting',
      priority: 'high',
      startDate: '2024-10-27T15:00:00',
      endDate: '2024-10-27T16:30:00',
      allDay: false,
      location: 'Biuro FinanceBank, ul. Bankowa 123',
      attendees: [
        {
          id: 'att-7',
          name: 'Robert Zięba',
          avatar: '👨‍💼',
          email: 'robert@financebank.com',
          status: 'accepted'
        },
        {
          id: 'att-8',
          name: 'Anna Wiśniewska',
          avatar: '👩‍💼',
          email: 'anna.w@coreoneflow.com',
          status: 'accepted'
        }
      ],
      organizer: {
        id: 'user-3',
        name: 'Anna Wiśniewska',
        avatar: '👩‍💼'
      },
      relatedTo: [
        { type: 'client', id: 'finance-bank', name: 'FinanceBank' },
        { type: 'project', id: 'proj-3', name: 'Mobile Banking App' }
      ],
      reminders: [
        { type: 'email', time: 120 },
        { type: 'popup', time: 30 }
      ],
      status: 'confirmed',
      color: '#06B6D4',
      createdAt: '2024-10-20T12:00:00',
      updatedAt: '2024-10-24T09:00:00'
    }
  ];

  const [calendarEvents, setCalendarEvents] = useState(events);

  // Calendar helper functions
  const getDaysInMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1).getDay();
    return firstDay === 0 ? 6 : firstDay - 1; // Monday = 0
  };

  const getMonthName = (date: Date) => {
    return date.toLocaleDateString('pl-PL', { month: 'long', year: 'numeric' });
  };

  const getWeekDays = () => {
    return ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Nie'];
  };

  const isSameDay = (date1: Date, date2: Date) => {
    return date1.toDateString() === date2.toDateString();
  };

  const getEventsForDay = (date: Date) => {
    return calendarEvents.filter(event => {
      const eventStart = new Date(event.startDate);
      const eventEnd = new Date(event.endDate);
      
      if (event.allDay) {
        return isSameDay(eventStart, date);
      }
      
      return date >= new Date(eventStart.toDateString()) && 
             date <= new Date(eventEnd.toDateString());
    }).filter(event => eventFilter.includes(event.type));
  };

  const getEventTypeColor = (type: string) => {
    switch (type) {
      case 'meeting': return 'bg-blue-500';
      case 'task': return 'bg-green-500';
      case 'deadline': return 'bg-red-500';
      case 'call': return 'bg-yellow-500';
      case 'reminder': return 'bg-purple-500';
      case 'personal': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'border-l-red-500 bg-red-50';
      case 'high': return 'border-l-orange-500 bg-orange-50';
      case 'medium': return 'border-l-yellow-500 bg-yellow-50';
      case 'low': return 'border-l-green-500 bg-green-50';
      default: return 'border-l-gray-500 bg-gray-50';
    }
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString('pl-PL', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatDateRange = (start: string, end: string, allDay: boolean) => {
    if (allDay) {
      return 'Cały dzień';
    }
    
    const startDate = new Date(start);
    const endDate = new Date(end);
    
    if (isSameDay(startDate, endDate)) {
      return `${formatTime(start)} - ${formatTime(end)}`;
    }
    
    return `${startDate.toLocaleDateString('pl-PL')} ${formatTime(start)} - ${endDate.toLocaleDateString('pl-PL')} ${formatTime(end)}`;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const navigateWeek = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 7);
      } else {
        newDate.setDate(prev.getDate() + 7);
      }
      return newDate;
    });
  };

  const navigateDay = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setDate(prev.getDate() - 1);
      } else {
        newDate.setDate(prev.getDate() + 1);
      }
      return newDate;
    });
  };

  const goToToday = () => {
    setCurrentDate(new Date());
  };

  const handleEventClick = (event: CalendarEvent) => {
    setSelectedEvent(event);
    setShowEventModal(true);
  };

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    // Could open new event modal here
  };

  // Filter events by search query
  const filteredEvents = calendarEvents.filter(event => {
    if (!searchQuery) return true;
    
    return event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
           event.attendees?.some(att => att.name.toLowerCase().includes(searchQuery.toLowerCase()));
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
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">📅 Kalendarz</h1>
              <p className="text-gray-600 mt-1">Zarządzaj spotkaniami, zadaniami i terminami</p>
            </div>
            <button 
              onClick={() => setShowEventModal(true)}
              className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
            >
              ➕ Nowe wydarzenie
            </button>
          </div>

          {/* Calendar Controls */}
          <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
            <div className="flex items-center justify-between mb-6">
              {/* Navigation */}
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => {
                    if (viewMode === 'month') navigateMonth('prev');
                    else if (viewMode === 'week') navigateWeek('prev');
                    else if (viewMode === 'day') navigateDay('prev');
                  }}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ◀
                </button>
                
                <button
                  onClick={goToToday}
                  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors font-medium"
                >
                  Dziś
                </button>
                
                <button
                  onClick={() => {
                    if (viewMode === 'month') navigateMonth('next');
                    else if (viewMode === 'week') navigateWeek('next');
                    else if (viewMode === 'day') navigateDay('next');
                  }}
                  className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  ▶
                </button>

                <h2 className="text-xl font-semibold text-gray-900 ml-4">
                  {viewMode === 'month' && getMonthName(currentDate)}
                  {viewMode === 'week' && `Tydzień ${Math.ceil(currentDate.getDate() / 7)}, ${getMonthName(currentDate)}`}
                  {viewMode === 'day' && currentDate.toLocaleDateString('pl-PL', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}
                </h2>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center space-x-4">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  {[
                    { id: 'month', label: 'Miesiąc', icon: '📅' },
                    { id: 'week', label: 'Tydzień', icon: '📊' },
                    { id: 'day', label: 'Dzień', icon: '📋' },
                    { id: 'agenda', label: 'Lista', icon: '☰' }
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
              </div>
            </div>

            {/* Event Type Filters */}
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-gray-700">Filtry:</span>
              {[
                { type: 'meeting', label: 'Spotkania', icon: '👥', color: 'bg-blue-500' },
                { type: 'task', label: 'Zadania', icon: '✅', color: 'bg-green-500' },
                { type: 'deadline', label: 'Terminy', icon: '⏰', color: 'bg-red-500' },
                { type: 'call', label: 'Rozmowy', icon: '📞', color: 'bg-yellow-500' },
                { type: 'reminder', label: 'Przypomnienia', icon: '🔔', color: 'bg-purple-500' }
              ].map((filter) => (
                <button
                  key={filter.type}
                  onClick={() => {
                    setEventFilter(prev => 
                      prev.includes(filter.type)
                        ? prev.filter(t => t !== filter.type)
                        : [...prev, filter.type]
                    );
                  }}
                  className={`flex items-center space-x-2 px-3 py-1.5 rounded-full text-sm transition-all ${
                    eventFilter.includes(filter.type)
                      ? `${filter.color} text-white shadow-sm`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <span>{filter.icon}</span>
                  <span>{filter.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* AI Assistant Panel */}
          {canEnableFeature('aiAssistant') && (
            <div className="bg-linear-to-r from-purple-50 to-cyan-50 border border-purple-200 rounded-xl p-6 mb-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                    <span className="text-purple-600 text-lg">🤖</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">AI Assistant</h3>
                    <p className="text-sm text-gray-600">
                      Zapytaj o swój kalendarz lub zarządzanie czasem
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Usage counter */}
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      Wykorzystano: {usage.aiQueriesUsed}
                      {userPlan.limits.aiQueries !== -1 && `/${userPlan.limits.aiQueries}`}
                    </p>
                    {userPlan.limits.aiQueries !== -1 && (
                      <div className="w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div
                          className={`h-2 rounded-full ${
                            isUsageNearLimit('aiQueries') ? 'bg-orange-500' : 'bg-purple-500'
                          }`}
                          style={{ width: `${Math.min(getUsagePercentage('aiQueries'), 100)}%` }}
                        ></div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <input
                  type="text"
                  placeholder="Zapytaj AI o swój kalendarz..."
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && e.currentTarget.value.trim()) {
                      if (userPlan.limits.aiQueries === -1 || usage.aiQueriesUsed < userPlan.limits.aiQueries) {
                        // Process AI query here
                        incrementUsage('aiQueriesUsed');
                        setAiQuestionCount(prev => prev + 1);
                        e.currentTarget.value = '';
                      } else {
                        setShowUpgradeModal(true);
                      }
                    }
                  }}
                />
                <button
                  onClick={() => {
                    if (userPlan.limits.aiQueries === -1 || usage.aiQueriesUsed < userPlan.limits.aiQueries) {
                      // Process AI query
                      incrementUsage('aiQueriesUsed');
                      setAiQuestionCount(prev => prev + 1);
                    } else {
                      setShowUpgradeModal(true);
                    }
                  }}
                  className="bg-purple-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-600 transition-colors"
                >
                  Zapytaj
                </button>
              </div>
              
              {aiQuestionCount > 0 && (
                <div className="mt-4 p-4 bg-white rounded-lg border border-purple-200">
                  <p className="text-sm text-gray-600">
                    💡 <strong>AI Odpowiedź:</strong> Zadałeś już {aiQuestionCount} pytań w tej sesji. 
                    Funkcja AI jest dostępna w Twoim planie {userPlan.displayName}!
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Calendar Views */}
          <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            {/* Month View */}
            {viewMode === 'month' && (
              <div className="p-6">
                {/* Week Headers */}
                <div className="grid grid-cols-7 gap-px mb-2">
                  {getWeekDays().map((day) => (
                    <div key={day} className="p-3 text-center font-semibold text-gray-700 bg-gray-50">
                      {day}
                    </div>
                  ))}
                </div>

                {/* Calendar Grid */}
                <div className="grid grid-cols-7 gap-px border border-gray-200 rounded-lg overflow-hidden">
                  {(() => {
                    const daysInMonth = getDaysInMonth(currentDate);
                    const firstDay = getFirstDayOfMonth(currentDate);
                    const days = [];

                    // Previous month days
                    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 0);
                    for (let i = firstDay - 1; i >= 0; i--) {
                      const day = prevMonth.getDate() - i;
                      const date = new Date(prevMonth.getFullYear(), prevMonth.getMonth(), day);
                      days.push({ date, isCurrentMonth: false });
                    }

                    // Current month days
                    for (let day = 1; day <= daysInMonth; day++) {
                      const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
                      days.push({ date, isCurrentMonth: true });
                    }

                    // Next month days to fill the grid
                    const remainingDays = 42 - days.length; // 6 weeks * 7 days
                    for (let day = 1; day <= remainingDays; day++) {
                      const date = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, day);
                      days.push({ date, isCurrentMonth: false });
                    }

                    return days.map(({ date, isCurrentMonth }, index) => {
                      const dayEvents = getEventsForDay(date);
                      const isToday = isSameDay(date, new Date());
                      const isSelected = selectedDate && isSameDay(date, selectedDate);

                      return (
                        <div
                          key={index}
                          onClick={() => handleDateClick(date)}
                          className={`min-h-28 p-2 border-b border-r border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                            !isCurrentMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                          } ${isSelected ? 'bg-purple-50 ring-2 ring-purple-500' : ''}`}
                        >
                          <div className={`text-sm font-medium mb-2 ${
                            isToday ? 'bg-purple-500 text-white w-6 h-6 rounded-full flex items-center justify-center' : ''
                          }`}>
                            {date.getDate()}
                          </div>
                          
                          <div className="space-y-1">
                            {dayEvents.slice(0, 3).map((event) => (
                              <div
                                key={event.id}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEventClick(event);
                                }}
                                className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 transition-opacity ${
                                  getEventTypeColor(event.type)
                                } text-white`}
                                title={event.title}
                              >
                                {!event.allDay && formatTime(event.startDate)} {event.title}
                              </div>
                            ))}
                            
                            {dayEvents.length > 3 && (
                              <div className="text-xs text-gray-500 pl-1">
                                +{dayEvents.length - 3} więcej
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    });
                  })()}
                </div>
              </div>
            )}

            {/* Week View */}
            {viewMode === 'week' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Widok tygodniowy</h3>
                  <p className="text-gray-600">Zostanie zaimplementowany w kolejnym kroku</p>
                </div>
              </div>
            )}

            {/* Day View */}
            {viewMode === 'day' && (
              <div className="p-6">
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🚧</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Widok dzienny</h3>
                  <p className="text-gray-600">Zostanie zaimplementowany w kolejnym kroku</p>
                </div>
              </div>
            )}

            {/* Agenda View */}
            {viewMode === 'agenda' && (
              <div className="divide-y divide-gray-200">
                <div className="p-6 bg-gray-50 border-b border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-900">📋 Lista wydarzeń</h3>
                </div>
                
                <div className="max-h-96 overflow-y-auto">
                  {filteredEvents
                    .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
                    .map((event) => (
                      <div
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className={`p-4 hover:bg-gray-50 cursor-pointer border-l-4 ${getPriorityColor(event.priority)} transition-colors`}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <div className={`w-3 h-3 rounded-full ${getEventTypeColor(event.type)}`}></div>
                              <h4 className="font-semibold text-gray-900">{event.title}</h4>
                              <span className={`px-2 py-1 text-xs rounded-full ${
                                event.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                                event.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                                event.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                                'bg-green-100 text-green-700'
                              }`}>
                                {event.priority}
                              </span>
                            </div>
                            
                            {event.description && (
                              <p className="text-gray-600 text-sm mb-2">{event.description}</p>
                            )}
                            
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>📅 {formatDateRange(event.startDate, event.endDate, event.allDay)}</span>
                              {event.location && (
                                <span>📍 {event.location}</span>
                              )}
                              {event.attendees && event.attendees.length > 0 && (
                                <span>👥 {event.attendees.length} uczestników</span>
                              )}
                            </div>
                            
                            {event.relatedTo && event.relatedTo.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-2">
                                {event.relatedTo.map((relation, index) => (
                                  <span key={index} className="inline-flex items-center space-x-1 px-2 py-1 bg-gray-100 rounded-full text-xs">
                                    <span>{relation.type === 'client' ? '🏢' : relation.type === 'project' ? '📋' : '✅'}</span>
                                    <span>{relation.name}</span>
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <div className="text-sm font-medium text-gray-900">{event.organizer.name}</div>
                            <div className="text-xs text-gray-500">{event.organizer.avatar}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  
                  {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                      <div className="text-4xl mb-4">📅</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">Brak wydarzeń</h3>
                      <p className="text-gray-600">Nie znaleziono wydarzeń pasujących do wybranych filtrów</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </main>
      </div>

      {/* Event Details Modal */}
      {showEventModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-4">
                  <div className={`w-4 h-4 rounded-full ${getEventTypeColor(selectedEvent.type)} mt-1`}></div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedEvent.title}</h3>
                    <p className="text-gray-600 mt-1">{formatDateRange(selectedEvent.startDate, selectedEvent.endDate, selectedEvent.allDay)}</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEventModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {selectedEvent.description && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">📝 Opis</h4>
                  <p className="text-gray-700">{selectedEvent.description}</p>
                </div>
              )}
              
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">ℹ️ Szczegóły</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Typ:</span>
                      <span className="capitalize">{selectedEvent.type}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Priorytet:</span>
                      <span className={`px-2 py-1 rounded-full ${
                        selectedEvent.priority === 'urgent' ? 'bg-red-100 text-red-700' :
                        selectedEvent.priority === 'high' ? 'bg-orange-100 text-orange-700' :
                        selectedEvent.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                        'bg-green-100 text-green-700'
                      }`}>
                        {selectedEvent.priority}
                      </span>
                    </div>
                    {selectedEvent.location && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Lokalizacja:</span>
                        <span>{selectedEvent.location}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600">Status:</span>
                      <span className="capitalize">{selectedEvent.status}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">👥 Uczestnicy</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2 p-2 bg-blue-50 rounded-lg">
                      <span className="text-lg">{selectedEvent.organizer.avatar}</span>
                      <div>
                        <div className="font-medium text-gray-900">{selectedEvent.organizer.name}</div>
                        <div className="text-xs text-blue-600">Organizator</div>
                      </div>
                    </div>
                    
                    {selectedEvent.attendees?.map((attendee) => (
                      <div key={attendee.id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                        <span className="text-lg">{attendee.avatar}</span>
                        <div className="flex-1">
                          <div className="font-medium text-gray-900">{attendee.name}</div>
                          <div className="text-xs text-gray-500">{attendee.email}</div>
                        </div>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          attendee.status === 'accepted' ? 'bg-green-100 text-green-700' :
                          attendee.status === 'declined' ? 'bg-red-100 text-red-700' :
                          attendee.status === 'tentative' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-gray-100 text-gray-700'
                        }`}>
                          {attendee.status}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {selectedEvent.relatedTo && selectedEvent.relatedTo.length > 0 && (
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">🔗 Powiązania</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedEvent.relatedTo.map((relation, index) => (
                      <div key={index} className="flex items-center space-x-2 px-3 py-2 bg-gray-100 rounded-lg">
                        <span>{relation.type === 'client' ? '🏢' : relation.type === 'project' ? '📋' : '✅'}</span>
                        <span className="font-medium">{relation.name}</span>
                        <span className="text-xs text-gray-500 capitalize">({relation.type})</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                  ✏️ Edytuj
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors">
                  📋 Duplicate
                </button>
                <button className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors">
                  🗑️ Usuń
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
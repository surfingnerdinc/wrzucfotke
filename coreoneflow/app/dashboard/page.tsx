'use client';

import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import DashboardHeader from './components/DashboardHeader';
import StatsCards from './components/StatsCards';
import AIInsightsPanel from './components/AIInsightsPanel';

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  const stats = [
    { 
      title: 'Aktywni Klienci', 
      value: '1,247', 
      change: '+12%', 
      trend: 'up' as const, 
      icon: '👥',
      chartData: [65, 78, 82, 91, 88, 95, 92]
    },
    { 
      title: 'Otwarte Leady', 
      value: '89', 
      change: '+23%', 
      trend: 'up' as const, 
      icon: '🎯',
      chartData: [45, 52, 38, 67, 89, 78, 82]
    },
    { 
      title: 'Projekty w toku', 
      value: '24', 
      change: '-5%', 
      trend: 'down' as const, 
      icon: '📊',
      chartData: [32, 28, 35, 29, 26, 24, 22]
    },
    { 
      title: 'Przychody (MTD)', 
      value: '€47,200', 
      change: '+18%', 
      trend: 'up' as const, 
      icon: '💰',
      chartData: [38, 42, 35, 48, 52, 46, 47]
    }
  ];

  const aiInsights = [
    {
      id: '1',
      title: 'Wysokie prawdopodobieństwo konwersji',
      description: '5 leadów ma prawdopodobieństwo konwersji > 85%. Skontaktuj się z nimi dziś aby zwiększyć szanse na zamknięcie deala.',
      type: 'opportunity' as const,
      action: 'Zobacz hot leady',
      priority: 'high' as const
    },
    {
      id: '2', 
      title: 'Ryzyko churn dla kluczowego klienta',
      description: 'TechCorp wykazuje wzorce zachowań wskazujące na możliwą rezygnację. Ostatnia aktywność: 14 dni temu.',
      type: 'warning' as const,
      action: 'Zaplanuj call',
      priority: 'high' as const
    },
    {
      id: '3',
      title: 'Idealna okazja na upsell',
      description: '3 klientów jest gotowych na upgrade planu. Łączny potencjał przychodów: €25,000.',
      type: 'opportunity' as const, 
      action: 'Przygotuj oferty',
      priority: 'medium' as const
    }
  ];

  const recentActivities = [
    { id: 1, type: 'lead', message: 'Nowy lead: Anna Nowak z ABC Corp', time: '2 min temu', priority: 'high' },
    { id: 2, type: 'meeting', message: 'Spotkanie z XYZ Ltd za 30 minut', time: '5 min temu', priority: 'urgent' },
    { id: 3, type: 'deal', message: 'Deal z ProBiz zamknięty (€15,000)', time: '1 godz temu', priority: 'success' },
    { id: 4, type: 'ai', message: 'AI wykrył potencjalne zagrożenie churn u MegaCorp', time: '2 godz temu', priority: 'warning' },
    { id: 5, type: 'task', message: 'Zadanie "Przygotuj propozycję" ukończone', time: '3 godz temu', priority: 'normal' }
  ];

  const upcomingTasks = [
    { id: 1, title: 'Call z potencjalnym klientem', due: 'Dziś, 14:30', priority: 'high', client: 'NewTech Solutions' },
    { id: 2, title: 'Przygotuj ofertę dla StartupXYZ', due: 'Jutro, 10:00', priority: 'medium', client: 'StartupXYZ' },
    { id: 3, title: 'Follow-up email do Enterprise Corp', due: 'Jutro, 16:00', priority: 'low', client: 'Enterprise Corp' },
    { id: 4, title: 'Prezentacja demo dla BigCompany', due: 'Piątek, 11:00', priority: 'high', client: 'BigCompany' }
  ];

  const quickActions = [
    { id: 'add-lead', label: 'Dodaj Lead', icon: '➕', color: 'bg-blue-500' },
    { id: 'new-project', label: 'Nowy Projekt', icon: '📋', color: 'bg-green-500' },
    { id: 'schedule-meeting', label: 'Umów Spotkanie', icon: '📅', color: 'bg-purple-500' },
    { id: 'ai-insights', label: 'AI Insights', icon: '🧠', color: 'bg-cyan-500' }
  ];

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: 'Professional'
  };

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        collapsed={sidebarCollapsed}
        onToggleCollapse={() => setSidebarCollapsed(!sidebarCollapsed)}
        activeSection={activeTab}
        onSectionChange={setActiveTab}
        user={user}
      />

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        <DashboardHeader 
          user={user}
          onSearch={(query) => console.log('Search:', query)}
        />

        {/* Dashboard Content */}
        <main className="flex-1 p-6">
          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Szybkie akcje</h2>
            <div className="grid grid-cols-4 gap-4">
              {quickActions.map((action) => (
                <button
                  key={action.id}
                  className={`${action.color} text-white p-4 rounded-xl hover:shadow-lg transition-all duration-300 transform hover:scale-105`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{action.icon}</span>
                    <span className="font-semibold">{action.label}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Stats Grid */}
          <StatsCards stats={stats} />

          {/* Main Content Grid */}
          <div className="grid grid-cols-3 gap-6 mb-8">
            {/* Recent Activities */}
            <div className="col-span-2 bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Ostatnie aktywności</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {recentActivities.map((activity) => (
                    <div key={activity.id} className="flex items-start gap-4 p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        activity.priority === 'urgent' ? 'bg-red-100' :
                        activity.priority === 'high' ? 'bg-orange-100' :
                        activity.priority === 'success' ? 'bg-green-100' :
                        activity.priority === 'warning' ? 'bg-yellow-100' :
                        'bg-blue-100'
                      }`}>
                        <span className="text-lg">
                          {activity.type === 'lead' ? '🎯' :
                           activity.type === 'meeting' ? '📅' :
                           activity.type === 'deal' ? '💰' :
                           activity.type === 'ai' ? '🤖' :
                           '✅'}
                        </span>
                      </div>
                      <div className="flex-1">
                        <p className="text-gray-900 font-medium">{activity.message}</p>
                        <p className="text-gray-500 text-sm">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Upcoming Tasks */}
            <div className="bg-white rounded-xl border border-gray-200">
              <div className="p-6 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">Nadchodzące zadania</h3>
              </div>
              <div className="p-6">
                <div className="space-y-4">
                  {upcomingTasks.map((task) => (
                    <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-gray-900 text-sm">{task.title}</h4>
                        <span className={`w-3 h-3 rounded-full ${
                          task.priority === 'high' ? 'bg-red-500' :
                          task.priority === 'medium' ? 'bg-yellow-500' :
                          'bg-green-500'
                        }`}></span>
                      </div>
                      <p className="text-gray-600 text-xs mb-2">{task.client}</p>
                      <p className="text-gray-500 text-xs">{task.due}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-center text-purple-600 hover:text-purple-700 font-medium text-sm">
                  Zobacz wszystkie zadania →
                </button>
              </div>
            </div>
          </div>

          {/* AI Insights Panel */}
          <AIInsightsPanel insights={aiInsights} />
        </main>
      </div>
    </div>
  );
}
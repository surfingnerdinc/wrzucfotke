'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { usePlan } from '../../contexts/PlanContext';

interface AutomationRule {
  id: string;
  name: string;
  description: string;
  category: 'leads' | 'customers' | 'projects' | 'tasks' | 'notifications' | 'finance' | 'reports';
  trigger: {
    type: 'event' | 'schedule' | 'condition';
    event?: string;
    schedule?: string;
    condition?: string;
  };
  actions: Array<{
    type: 'send_email' | 'create_task' | 'update_status' | 'send_notification' | 'calculate_value' | 'assign_user' | 'create_reminder' | 'update_field';
    description: string;
    parameters?: Record<string, any>;
  }>;
  isActive: boolean;
  executionCount: number;
  lastExecuted?: string;
  planRequired: 'starter' | 'professional' | 'business' | 'enterprise';
  tags: string[];
}

interface AutomationTemplate {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  difficulty: 'easy' | 'medium' | 'advanced';
  estimatedSavings: string;
  planRequired: 'starter' | 'professional' | 'business' | 'enterprise';
  triggers: string[];
  actions: string[];
  useCases: string[];
}

export default function AutomationPage() {
  const {
    userPlan,
    usage,
    canEnableFeature,
    setShowUpgradeModal,
    incrementUsage,
  } = usePlan();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('automation');
  const [viewMode, setViewMode] = useState<'templates' | 'my-rules' | 'analytics'>('templates');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTemplate, setSelectedTemplate] = useState<AutomationTemplate | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: userPlan.displayName
  };

  // Automation Templates - gotowe scenariusze
  const automationTemplates: AutomationTemplate[] = [
    {
      id: 'lead-nurturing',
      name: 'Automatyczne śledzenie leadów',
      description: 'Wysyłaj automatyczne e-maile follow-up do nowych leadów i przypomnienia o kontakcie',
      category: 'Leady',
      icon: '🎯',
      difficulty: 'easy',
      estimatedSavings: '5h/tydzień',
      planRequired: 'professional',
      triggers: ['Nowy lead', 'Brak aktywności 3 dni', 'Zmiana statusu'],
      actions: ['Wyślij e-mail powitalny', 'Przypisz do sprzedawcy', 'Utwórz zadanie follow-up'],
      useCases: ['Zwiększenie konwersji', 'Szybsza odpowiedź', 'Mniej zgubienia leadów']
    },
    {
      id: 'project-budget',
      name: 'Monitoring budżetu projektów',
      description: 'Automatycznie przeliczaj budżet projektu i powiadamiaj gdy przekracza 80% limit',
      category: 'Projekty',
      icon: '💰',
      difficulty: 'medium',
      estimatedSavings: '3h/tydzień',
      planRequired: 'business',
      triggers: ['Dodanie kosztu', 'Aktualizacja zadania', 'Tygodniowy przegląd'],
      actions: ['Przelicz budżet', 'Wyślij alert', 'Utwórz raport', 'Powiadom managera'],
      useCases: ['Kontrola kosztów', 'Wczesne ostrzeganie', 'Lepsze planowanie']
    },
    {
      id: 'task-assignment',
      name: 'Inteligentne przypisywanie zadań',
      description: 'Automatycznie przypisuj zadania na podstawie obciążenia zespołu i umiejętności',
      category: 'Zadania',
      icon: '⚡',
      difficulty: 'advanced',
      estimatedSavings: '4h/tydzień',
      planRequired: 'business',
      triggers: ['Nowe zadanie', 'Zakończenie zadania', 'Zmiana priorytetu'],
      actions: ['Sprawdź obciążenie', 'Dopasuj umiejętności', 'Przypisz zadanie', 'Powiadom zespół'],
      useCases: ['Równomierne obciążenie', 'Lepsze dopasowanie', 'Szybsze wykonanie']
    },
    {
      id: 'customer-health',
      name: 'Monitoring zdrowia klienta',
      description: 'Śledź aktywność klientów i automatycznie flaguj tych zagrożonych odejściem',
      category: 'Klienci',
      icon: '💊',
      difficulty: 'medium',
      estimatedSavings: '6h/tydzień',
      planRequired: 'professional',
      triggers: ['Brak aktywności 14 dni', 'Spadek wartości zamówień', 'Negatywna opinia'],
      actions: ['Oblicz health score', 'Flaguj jako zagrożony', 'Przypisz do Customer Success', 'Zaplanuj call'],
      useCases: ['Redukcja churn', 'Proaktywna opieka', 'Zwiększenie retention']
    },
    {
      id: 'invoice-automation',
      name: 'Automatyczne faktury',
      description: 'Generuj i wysyłaj faktury automatycznie po zakończeniu projektu lub milestone',
      category: 'Finanse',
      icon: '🧾',
      difficulty: 'easy',
      estimatedSavings: '8h/tydzień',
      planRequired: 'business',
      triggers: ['Zakończenie milestone', 'Akceptacja deliverable', 'Miesięczny cykl'],
      actions: ['Generuj fakturę', 'Wyślij do klienta', 'Dodaj do księgowości', 'Śledź płatność'],
      useCases: ['Szybsze płatności', 'Mniej błędów', 'Lepszy cash flow']
    },
    {
      id: 'meeting-prep',
      name: 'Przygotowanie do spotkań',
      description: 'Automatycznie zbieraj dane o kliencie przed spotkaniem i wysyłaj briefy',
      category: 'Spotkania',
      icon: '📋',
      difficulty: 'medium',
      estimatedSavings: '2h/tydzień',
      planRequired: 'professional',
      triggers: ['Spotkanie za 24h', 'Nowe spotkanie', 'Aktualizacja agendy'],
      actions: ['Zbierz historię klienta', 'Przygotuj brief', 'Wyślij przypomnienie', 'Synchronizuj kalendarz'],
      useCases: ['Lepsze przygotowanie', 'Większa produktywność', 'Profesjonalizm']
    },
    {
      id: 'performance-reports',
      name: 'Automatyczne raporty wydajności',
      description: 'Generuj i wysyłaj tygodniowe raporty wydajności zespołu i projektów',
      category: 'Raporty',
      icon: '📊',
      difficulty: 'advanced',
      estimatedSavings: '4h/tydzień',
      planRequired: 'business',
      triggers: ['Każdy piątek 17:00', 'Koniec miesiąca', 'Żądanie raportu'],
      actions: ['Zbierz metryki', 'Generuj wykresy', 'Utwórz raport PDF', 'Wyślij do stakeholderów'],
      useCases: ['Lepsze decyzje', 'Transparentność', 'Śledzenie celów']
    },
    {
      id: 'social-monitoring',
      name: 'Monitoring mediów społecznościowych',
      description: 'Śledź wzmianki o firmie i automatycznie twórz leady z zainteresowanych osób',
      category: 'Marketing',
      icon: '📱',
      difficulty: 'advanced',
      estimatedSavings: '10h/tydzień',
      planRequired: 'enterprise',
      triggers: ['Nowa wzmianka', 'Pozytywny komentarz', 'Zapytanie o usługi'],
      actions: ['Analizuj sentiment', 'Utwórz lead', 'Powiadom marketing', 'Zaplanuj odpowiedź'],
      useCases: ['Więcej leadów', 'Lepszy wizerunek', 'Szybka reakcja']
    }
  ];

  // Istniejące reguły użytkownika
  const userAutomations: AutomationRule[] = [
    {
      id: 'rule-1',
      name: 'Welcome Email dla nowych klientów',
      description: 'Wysyła automatyczny e-mail powitalny po dodaniu nowego klienta',
      category: 'customers',
      trigger: { type: 'event', event: 'customer_created' },
      actions: [
        { type: 'send_email', description: 'Wyślij e-mail powitalny z szablonem welcome_customer' },
        { type: 'create_task', description: 'Utwórz zadanie "Pierwsza rozmowa" przypisane do sprzedawcy' }
      ],
      isActive: true,
      executionCount: 23,
      lastExecuted: '2024-10-24T14:30:00Z',
      planRequired: 'professional',
      tags: ['email', 'onboarding']
    },
    {
      id: 'rule-2',
      name: 'Alert przekroczenia budżetu',
      description: 'Powiadamia managera gdy projekt przekroczy 80% budżetu',
      category: 'projects',
      trigger: { type: 'condition', condition: 'budget_usage > 80%' },
      actions: [
        { type: 'send_notification', description: 'Wyślij alert do project managera' },
        { type: 'update_status', description: 'Zmień status projektu na "Wymaga uwagi"' }
      ],
      isActive: true,
      executionCount: 5,
      lastExecuted: '2024-10-22T09:15:00Z',
      planRequired: 'business',
      tags: ['budżet', 'alerty']
    }
  ];

  const categories = [
    { id: 'all', name: 'Wszystkie', icon: '🔄' },
    { id: 'Leady', name: 'Leady', icon: '🎯' },
    { id: 'Klienci', name: 'Klienci', icon: '👥' },
    { id: 'Projekty', name: 'Projekty', icon: '📋' },
    { id: 'Zadania', name: 'Zadania', icon: '✅' },
    { id: 'Finanse', name: 'Finanse', icon: '💰' },
    { id: 'Marketing', name: 'Marketing', icon: '📱' },
    { id: 'Raporty', name: 'Raporty', icon: '📊' }
  ];

  const filteredTemplates = automationTemplates.filter(template => {
    const matchesCategory = filterCategory === 'all' || template.category === filterCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-700';
      case 'medium': return 'bg-yellow-100 text-yellow-700';
      case 'advanced': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getPlanColor = (plan: string) => {
    switch (plan) {
      case 'starter': return 'bg-blue-100 text-blue-700';
      case 'professional': return 'bg-purple-100 text-purple-700';
      case 'business': return 'bg-orange-100 text-orange-700';
      case 'enterprise': return 'bg-red-100 text-red-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const canUseTemplate = (template: AutomationTemplate) => {
    if (!canEnableFeature('automation')) return false;
    
    const planOrder = { starter: 0, professional: 1, business: 2, enterprise: 3 };
    const userPlanOrder = planOrder[userPlan.type as keyof typeof planOrder];
    const requiredPlanOrder = planOrder[template.planRequired as keyof typeof planOrder];
    
    return userPlanOrder >= requiredPlanOrder;
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
          {/* Check if automation feature is available */}
          {!canEnableFeature('automation') ? (
            <div className="max-w-2xl mx-auto text-center py-16">
              <div className="bg-white rounded-xl border border-gray-200 p-8 shadow-sm">
                <div className="w-20 h-20 mx-auto mb-6 bg-orange-100 rounded-full flex items-center justify-center">
                  <span className="text-3xl">🔒</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-4">
                  Automatyzacje niedostępne
                </h2>
                <p className="text-gray-600 mb-6 leading-relaxed">
                  Twój aktualny plan <strong>{userPlan.displayName}</strong> nie zawiera funkcji automatyzacji. 
                  Upgrade swojego planu, aby oszczędzić czas i zwiększyć produktywność.
                </p>
                <div className="bg-gray-50 rounded-lg p-4 mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Co zyskasz po upgrade:</h3>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Automatyczne powiadomienia i przypomnienia</li>
                    <li>• Inteligentne przypisywanie zadań</li>
                    <li>• Automatyczne raporty i analizy</li>
                    <li>• Monitoring budżetów i deadline'ów</li>
                    <li>• Nurturing leadów i klientów</li>
                  </ul>
                </div>
                <button
                  onClick={() => setShowUpgradeModal(true)}
                  className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-8 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  🚀 Upgrade planu
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">🤖 Automatyzacje</h1>
                  <p className="text-gray-600 mt-1">Oszczędzaj czas dzięki inteligentnym automatyzacjom</p>
                </div>
                <button 
                  onClick={() => setShowCreateModal(true)}
                  className="bg-linear-to-r from-purple-500 to-cyan-500 text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg transition-all"
                >
                  ➕ Nowa automatyzacja
                </button>
              </div>

              {/* Stats Overview */}
              <div className="grid grid-cols-4 gap-6 mb-8">
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-purple-100 rounded-lg p-3">
                      <span className="text-2xl">🤖</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">{userAutomations.length}</h3>
                  <p className="text-gray-600 text-sm">Aktywne automatyzacje</p>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-green-100 rounded-lg p-3">
                      <span className="text-2xl">⚡</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    {userAutomations.reduce((sum, rule) => sum + rule.executionCount, 0)}
                  </h3>
                  <p className="text-gray-600 text-sm">Wykonania w tym miesiącu</p>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-blue-100 rounded-lg p-3">
                      <span className="text-2xl">⏱️</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">32h</h3>
                  <p className="text-gray-600 text-sm">Zaoszczędzone w tym miesiącu</p>
                </div>
                
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="bg-yellow-100 rounded-lg p-3">
                      <span className="text-2xl">🎯</span>
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">96%</h3>
                  <p className="text-gray-600 text-sm">Wskaźnik sukcesu</p>
                </div>
              </div>

              {/* View Mode Toggle */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center bg-gray-100 rounded-lg p-1">
                  {[
                    { id: 'templates', icon: '📋', label: 'Szablony' },
                    { id: 'my-rules', icon: '⚙️', label: 'Moje reguły' },
                    { id: 'analytics', icon: '📊', label: 'Analityka' }
                  ].map((mode) => (
                    <button
                      key={mode.id}
                      onClick={() => setViewMode(mode.id as any)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
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
                
                {/* Category Filter */}
                <div className="flex items-center space-x-4">
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.id}>
                        {cat.icon} {cat.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Templates View */}
              {viewMode === 'templates' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Gotowe szablony automatyzacji</h2>
                    <p className="text-gray-600">Wybierz z biblioteki sprawdzonych scenariuszy automatyzacji</p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredTemplates.map((template) => {
                      const canUse = canUseTemplate(template);
                      
                      return (
                        <div
                          key={template.id}
                          className={`bg-white rounded-xl border-2 p-6 transition-all cursor-pointer ${
                            canUse 
                              ? 'border-gray-200 hover:border-purple-300 hover:shadow-lg'
                              : 'border-gray-200 opacity-60'
                          }`}
                          onClick={() => canUse ? setSelectedTemplate(template) : setShowUpgradeModal(true)}
                        >
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center space-x-3">
                              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                                <span className="text-2xl">{template.icon}</span>
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-900">{template.name}</h3>
                                <p className="text-sm text-gray-600">{template.category}</p>
                              </div>
                            </div>
                            {!canUse && (
                              <span className="text-gray-400 text-lg">🔒</span>
                            )}
                          </div>
                          
                          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                            {template.description}
                          </p>
                          
                          <div className="flex items-center justify-between mb-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(template.difficulty)}`}>
                              {template.difficulty === 'easy' ? 'Łatwe' : 
                               template.difficulty === 'medium' ? 'Średnie' : 'Zaawansowane'}
                            </span>
                            <span className="text-green-600 text-sm font-medium">
                              💰 {template.estimatedSavings}
                            </span>
                          </div>
                          
                          <div className="space-y-2 mb-4">
                            <div>
                              <span className="text-xs font-medium text-gray-500">WYZWALACZE:</span>
                              <p className="text-xs text-gray-600">{template.triggers.join(', ')}</p>
                            </div>
                            <div>
                              <span className="text-xs font-medium text-gray-500">AKCJE:</span>
                              <p className="text-xs text-gray-600">{template.actions.join(', ')}</p>
                            </div>
                          </div>
                          
                          <div className="flex items-center justify-between">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPlanColor(template.planRequired)}`}>
                              {template.planRequired.charAt(0).toUpperCase() + template.planRequired.slice(1)}
                            </span>
                            <button 
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                canUse
                                  ? 'bg-purple-500 text-white hover:bg-purple-600'
                                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              }`}
                              disabled={!canUse}
                            >
                              {canUse ? 'Użyj szablonu' : 'Upgrade wymagany'}
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* My Rules View */}
              {viewMode === 'my-rules' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Twoje automatyzacje</h2>
                    <p className="text-gray-600">Zarządzaj swoimi regułami automatyzacji</p>
                  </div>
                  
                  <div className="space-y-4">
                    {userAutomations.map((rule) => (
                      <div key={rule.id} className="bg-white rounded-xl border border-gray-200 p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-gray-900">{rule.name}</h3>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                rule.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {rule.isActive ? 'Aktywna' : 'Nieaktywna'}
                              </span>
                              <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full text-xs font-medium">
                                {rule.category}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{rule.description}</p>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                              <div>
                                <span className="font-medium text-gray-700">Wyzwalacz:</span>
                                <p className="text-gray-600">
                                  {rule.trigger.type === 'event' && `Zdarzenie: ${rule.trigger.event}`}
                                  {rule.trigger.type === 'schedule' && `Harmonogram: ${rule.trigger.schedule}`}
                                  {rule.trigger.type === 'condition' && `Warunek: ${rule.trigger.condition}`}
                                </p>
                              </div>
                              <div>
                                <span className="font-medium text-gray-700">Akcje:</span>
                                <ul className="text-gray-600">
                                  {rule.actions.map((action, index) => (
                                    <li key={index}>• {action.description}</li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm">
                              Edytuj
                            </button>
                            <button className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm">
                              {rule.isActive ? 'Zatrzymaj' : 'Uruchom'}
                            </button>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500 pt-4 border-t border-gray-100">
                          <span>Wykonań: {rule.executionCount}</span>
                          {rule.lastExecuted && (
                            <span>
                              Ostatnie: {new Date(rule.lastExecuted).toLocaleDateString('pl-PL')}
                            </span>
                          )}
                          <div className="flex items-center space-x-1">
                            <span>Tagi:</span>
                            {rule.tags.map((tag, index) => (
                              <span key={index} className="px-2 py-1 bg-gray-100 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Analytics View */}
              {viewMode === 'analytics' && (
                <div>
                  <div className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">Analityka automatyzacji</h2>
                    <p className="text-gray-600">Śledź efektywność swoich automatyzacji</p>
                  </div>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Time Savings Chart */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Oszczędności czasu</h3>
                      <div className="space-y-4">
                        {[
                          { name: 'Welcome Email', saved: '12h', percentage: 85 },
                          { name: 'Budget Alerts', saved: '8h', percentage: 60 },
                          { name: 'Task Assignment', saved: '15h', percentage: 90 },
                          { name: 'Report Generation', saved: '6h', percentage: 45 }
                        ].map((item, index) => (
                          <div key={index} className="flex items-center justify-between">
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-1">
                                <span className="text-sm font-medium text-gray-700">{item.name}</span>
                                <span className="text-sm text-gray-600">{item.saved}</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <div
                                  className="bg-purple-500 h-2 rounded-full"
                                  style={{ width: `${item.percentage}%` }}
                                ></div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Execution Stats */}
                    <div className="bg-white rounded-xl border border-gray-200 p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Statystyki wykonań</h3>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                          <div>
                            <p className="text-green-800 font-semibold">Pomyślne wykonania</p>
                            <p className="text-green-600 text-sm">W tym miesiącu</p>
                          </div>
                          <span className="text-2xl font-bold text-green-800">127</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                          <div>
                            <p className="text-red-800 font-semibold">Nieudane wykonania</p>
                            <p className="text-red-600 text-sm">W tym miesiącu</p>
                          </div>
                          <span className="text-2xl font-bold text-red-800">3</span>
                        </div>
                        
                        <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                          <div>
                            <p className="text-blue-800 font-semibold">Średni czas wykonania</p>
                            <p className="text-blue-600 text-sm">Na automatyzację</p>
                          </div>
                          <span className="text-2xl font-bold text-blue-800">1.2s</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Create Automation Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">Utwórz nową automatyzację</h3>
                <button
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="text-center">
                <div className="text-6xl mb-4">🚧</div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Kreator automatyzacji</h3>
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

      {/* Template Details Modal */}
      {selectedTemplate && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl">{selectedTemplate.icon}</span>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">{selectedTemplate.name}</h3>
                    <p className="text-gray-600">{selectedTemplate.category}</p>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <p className="text-gray-700 mb-6">{selectedTemplate.description}</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Wyzwalacze</h4>
                  <ul className="space-y-2">
                    {selectedTemplate.triggers.map((trigger, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-600">
                        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
                        <span>{trigger}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Akcje</h4>
                  <ul className="space-y-2">
                    {selectedTemplate.actions.map((action, index) => (
                      <li key={index} className="flex items-center space-x-2 text-gray-600">
                        <span className="w-2 h-2 bg-cyan-500 rounded-full"></span>
                        <span>{action}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-semibold text-gray-900 mb-3">Przypadki użycia</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {selectedTemplate.useCases.map((useCase, index) => (
                    <div key={index} className="bg-gray-50 rounded-lg p-3 text-center">
                      <span className="text-sm text-gray-700">{useCase}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-between pt-6 border-t border-gray-200">
                <div className="flex items-center space-x-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(selectedTemplate.difficulty)}`}>
                    {selectedTemplate.difficulty === 'easy' ? 'Łatwe' : 
                     selectedTemplate.difficulty === 'medium' ? 'Średnie' : 'Zaawansowane'}
                  </span>
                  <span className="text-green-600 font-medium">
                    💰 Oszczędności: {selectedTemplate.estimatedSavings}
                  </span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setSelectedTemplate(null)}
                    className="px-6 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={() => {
                      // Here you would implement the template usage
                      setSelectedTemplate(null);
                    }}
                    className="px-6 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
                  >
                    Użyj tego szablonu
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
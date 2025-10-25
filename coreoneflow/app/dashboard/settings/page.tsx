'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import DashboardHeader from '../components/DashboardHeader';
import { usePlan, availablePlans, formatLimit, PlanType, PlanFeatures } from '../../contexts/PlanContext';



interface CompanySettings {
  // Company Information
  companyName: string;
  companyTagline: string;
  industry: 'tech' | 'healthcare' | 'finance' | 'retail' | 'real-estate' | 'consulting' | 'manufacturing' | 'other';
  
  // Branding
  branding: {
    primaryColor: string;
    secondaryColor: string;
    logo: string | null;
    favicon: string | null;
  };
  
  // Localization
  localization: {
    language: 'pl' | 'en';
    currency: 'PLN' | 'EUR' | 'USD' | 'GBP';
    timezone: string;
    dateFormat: 'DD/MM/YYYY' | 'MM/DD/YYYY' | 'YYYY-MM-DD';
    numberFormat: '1,234.56' | '1.234,56' | '1 234,56';
  };
  
  // Business Configuration
  business: {
    workingDays: number[]; // 0 = Sunday, 1 = Monday, etc.
    workingHours: {
      start: string; // "09:00"
      end: string;   // "17:00"
    };
    fiscalYearStart: string; // "01-01" or "04-01"
  };
  
  // Custom Labels
  customLabels: {
    leads: string;        // "Leads" | "Prospects" | "Opportunities"
    customers: string;    // "Customers" | "Clients" | "Accounts"
    projects: string;     // "Projects" | "Deals" | "Campaigns"
    tasks: string;        // "Tasks" | "Activities" | "Actions"
  };
  
  // Feature Toggles (będzie rozbudowane w następnym kroku)
  features: {
    leads: boolean;
    customers: boolean;
    projects: boolean;
    calendar: boolean;
    tasks: boolean;
    analytics: boolean;
    aiAssistant: boolean;
    automation: boolean;
  };
  
  // Notifications
  notifications: {
    email: boolean;
    browser: boolean;
    slack: boolean;
    taskReminders: boolean;
    leadFollowups: boolean;
    projectDeadlines: boolean;
  };
  
  // Data & Privacy
  dataSettings: {
    dataRetentionDays: number;
    allowAnalytics: boolean;
    allowCookies: boolean;
    gdprCompliant: boolean;
  };
}



const defaultSettings: CompanySettings = {
  companyName: 'Core One Flow',
  companyTagline: 'Zarządzanie relacjami z klientami',
  industry: 'tech',
  branding: {
    primaryColor: '#8B5CF6',
    secondaryColor: '#06B6D4',
    logo: null,
    favicon: null,
  },
  localization: {
    language: 'pl',
    currency: 'PLN',
    timezone: 'Europe/Warsaw',
    dateFormat: 'DD/MM/YYYY',
    numberFormat: '1 234,56',
  },
  business: {
    workingDays: [1, 2, 3, 4, 5], // Monday to Friday
    workingHours: {
      start: '09:00',
      end: '17:00',
    },
    fiscalYearStart: '01-01',
  },
  customLabels: {
    leads: 'Leady',
    customers: 'Klienci',
    projects: 'Projekty',
    tasks: 'Zadania',
  },
  features: {
    leads: true,
    customers: true,
    projects: true,
    calendar: true,
    tasks: true,
    analytics: true,
    aiAssistant: true,
    automation: true,
  },
  notifications: {
    email: true,
    browser: true,
    slack: false,
    taskReminders: true,
    leadFollowups: true,
    projectDeadlines: true,
  },
  dataSettings: {
    dataRetentionDays: 365,
    allowAnalytics: true,
    allowCookies: true,
    gdprCompliant: true,
  },
};

export default function SettingsPage() {
  const {
    userPlan,
    usage,
    canEnableFeature,
    canCreateMore,
    getUsagePercentage,
    isUsageNearLimit,
    switchPlan,
    showUpgradeModal,
    setShowUpgradeModal,
    showPlanModal,
    setShowPlanModal,
  } = usePlan();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('settings');
  const [activeSection, setActiveSection] = useState('company');
  const [settings, setSettings] = useState<CompanySettings>(defaultSettings);
  const [hasChanges, setHasChanges] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const user = {
    name: 'Marcin Dubiński',
    company: 'Core One Flow',
    avatar: '👨‍💼',
    plan: userPlan.displayName
  };

  // Load settings from localStorage on mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('coreOneFlowSettings');
    if (savedSettings) {
      try {
        const parsed = JSON.parse(savedSettings);
        setSettings({ ...defaultSettings, ...parsed });
      } catch (error) {
        console.error('Failed to parse settings:', error);
      }
    }
  }, []);

  const getDaysUntilExpiry = (): number => {
    if (!userPlan.expiresAt) return 999;
    const now = new Date();
    const expiry = new Date(userPlan.expiresAt);
    const diffTime = expiry.getTime() - now.getTime();
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  // Save settings to localStorage
  const saveSettings = async () => {
    setIsSaving(true);
    try {
      localStorage.setItem('coreOneFlowSettings', JSON.stringify(settings));
      setHasChanges(false);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Show success notification (you could add a toast here)
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Failed to save settings:', error);
    } finally {
      setIsSaving(false);
    }
  };

  // Update settings and mark as changed
  const updateSettings = (section: keyof CompanySettings, updates: any) => {
    setSettings(prev => {
      if (typeof prev[section] === 'object' && prev[section] !== null) {
        return {
          ...prev,
          [section]: { ...(prev[section] as Record<string, any>), ...updates }
        };
      } else {
        return {
          ...prev,
          [section]: updates
        };
      }
    });
    setHasChanges(true);
  };

  // Reset to defaults
  const resetToDefaults = () => {
    setSettings(defaultSettings);
    setHasChanges(true);
  };

  // Export settings
  const exportSettings = () => {
    const dataStr = JSON.stringify(settings, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `coreoneflow-settings-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  // Import settings
  const importSettings = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const importedSettings = JSON.parse(e.target?.result as string);
        setSettings({ ...defaultSettings, ...importedSettings });
        setHasChanges(true);
      } catch (error) {
        console.error('Failed to import settings:', error);
        alert('Błąd importu ustawień. Sprawdź format pliku.');
      }
    };
    reader.readAsText(file);
  };

  const settingsSections = [
    { id: 'plan', label: 'Plan i rozliczenia', icon: '💎' },
    { id: 'company', label: 'Firma', icon: '🏢' },
    { id: 'branding', label: 'Branding', icon: '🎨' },
    { id: 'localization', label: 'Lokalizacja', icon: '🌍' },
    { id: 'features', label: 'Funkcje', icon: '🔧' },
    { id: 'labels', label: 'Etykiety', icon: '🏷️' },
    { id: 'notifications', label: 'Powiadomienia', icon: '🔔' },
    { id: 'business', label: 'Biznes', icon: '💼' },
    { id: 'data', label: 'Dane i Prywatność', icon: '🔒' },
  ];

  const industries = [
    { id: 'tech', label: 'Technologie / IT', icon: '💻' },
    { id: 'healthcare', label: 'Ochrona zdrowia', icon: '🏥' },
    { id: 'finance', label: 'Finanse / Bankowość', icon: '🏦' },
    { id: 'retail', label: 'Handel detaliczny', icon: '🛍️' },
    { id: 'real-estate', label: 'Nieruchomości', icon: '🏠' },
    { id: 'consulting', label: 'Konsulting', icon: '💼' },
    { id: 'manufacturing', label: 'Produkcja', icon: '🏭' },
    { id: 'other', label: 'Inne', icon: '🏢' },
  ];

  const currencies = [
    { code: 'PLN', symbol: 'zł', name: 'Polski złoty' },
    { code: 'EUR', symbol: '€', name: 'Euro' },
    { code: 'USD', symbol: '$', name: 'Dolar amerykański' },
    { code: 'GBP', symbol: '£', name: 'Funt brytyjski' },
  ];

  const languages = [
    { code: 'pl', name: 'Polski', flag: '🇵🇱' },
    { code: 'en', name: 'English', flag: '🇺🇸' },
  ];

  const timezones = [
    'Europe/Warsaw',
    'Europe/London',
    'Europe/Berlin',
    'Europe/Paris',
    'America/New_York',
    'America/Los_Angeles',
    'Asia/Tokyo',
  ];

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
        <DashboardHeader user={user} onSearch={() => {}} />

        <main className="flex-1 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">⚙️ Ustawienia</h1>
              <p className="text-gray-600 mt-1">Dostosuj Core One Flow do potrzeb swojej firmy</p>
            </div>
            
            <div className="flex items-center space-x-4">
              {hasChanges && (
                <div className="flex items-center space-x-2 text-orange-600">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-sm font-medium">Niezapisane zmiany</span>
                </div>
              )}
              
              <button
                onClick={saveSettings}
                disabled={!hasChanges || isSaving}
                className={`px-6 py-3 rounded-xl font-semibold transition-all ${
                  hasChanges && !isSaving
                    ? 'bg-linear-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg'
                    : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                }`}
              >
                {isSaving ? '💾 Zapisywanie...' : '💾 Zapisz zmiany'}
              </button>
            </div>
          </div>

          <div className="flex gap-6">
            {/* Settings Navigation */}
            <div className="w-64 shrink-0">
              <div className="bg-white rounded-xl border border-gray-200 p-4">
                <h3 className="font-semibold text-gray-900 mb-4">Kategorie</h3>
                <nav className="space-y-2">
                  {settingsSections.map((section) => (
                    <button
                      key={section.id}
                      onClick={() => setActiveSection(section.id)}
                      className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                        activeSection === section.id
                          ? 'bg-purple-50 text-purple-700 border border-purple-200'
                          : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                      }`}
                    >
                      <span className="text-lg">{section.icon}</span>
                      <span className="font-medium">{section.label}</span>
                    </button>
                  ))}
                </nav>

                {/* Quick Actions */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h4 className="font-medium text-gray-900 mb-3">Szybkie akcje</h4>
                  <div className="space-y-2">
                    <button
                      onClick={exportSettings}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span>📤</span>
                      <span>Eksportuj ustawienia</span>
                    </button>
                    
                    <label className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer">
                      <span>📥</span>
                      <span>Importuj ustawienia</span>
                      <input
                        type="file"
                        accept=".json"
                        onChange={importSettings}
                        className="hidden"
                      />
                    </label>
                    
                    <button
                      onClick={resetToDefaults}
                      className="w-full flex items-center space-x-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    >
                      <span>🔄</span>
                      <span>Resetuj do domyślnych</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Settings Content */}
            <div className="flex-1">
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                
                {/* Plan Management */}
                {activeSection === 'plan' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">💎 Plan i rozliczenia</h2>
                      
                      {/* Current Plan Overview */}
                      <div className="bg-linear-to-r from-purple-50 to-cyan-50 border border-purple-200 rounded-xl p-6 mb-6">
                        <div className="flex items-center justify-between">
                          <div>
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-2xl font-bold text-gray-900">{userPlan.displayName}</h3>
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                                userPlan.isActive ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                              }`}>
                                {userPlan.isActive ? 'Aktywny' : 'Wygasł'}
                              </span>
                            </div>
                            
                            <p className="text-gray-600 mb-4">
                              {userPlan.price.monthly}/miesiąc
                              {userPlan.price.yearly && (
                                <span className="ml-2 text-green-600">
                                  (oszczędź przy płatności rocznej)
                                </span>
                              )}
                            </p>

                            {userPlan.expiresAt && (
                              <p className={`text-sm ${getDaysUntilExpiry() <= 7 ? 'text-red-600' : 'text-gray-600'}`}>
                                {getDaysUntilExpiry() > 0 
                                  ? `Odnawia się za ${getDaysUntilExpiry()} dni`
                                  : 'Plan wygasł - wymagane odnowienie'
                                }
                              </p>
                            )}
                          </div>
                          
                          <div className="text-right">
                            <button
                              onClick={() => setShowPlanModal(true)}
                              className="px-6 py-3 bg-white border border-purple-300 text-purple-600 rounded-lg hover:bg-purple-50 transition-colors font-semibold"
                            >
                              Porównaj plany
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Usage Statistics */}
                      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4 mb-6">
                        {Object.entries(usage).map(([resource, currentUsage]) => {
                          // Map storageUsedGB to storageGB for limits checking
                          const limitKey = resource === 'storageUsedGB' ? 'storageGB' : 
                                          resource === 'aiQueriesUsed' ? 'aiQueries' : resource;
                          const percentage = getUsagePercentage(limitKey as keyof typeof userPlan.limits);
                          const isNearLimit = isUsageNearLimit(limitKey as keyof typeof userPlan.limits);
                          
                          const resourceLabels: Record<string, { label: string; icon: string }> = {
                            users: { label: 'Użytkownicy', icon: '👥' },
                            customers: { label: 'Klienci', icon: '🤝' },
                            leads: { label: 'Leady', icon: '🎯' },
                            projects: { label: 'Projekty', icon: '📋' },
                            storageUsedGB: { label: 'Storage', icon: '💾' },
                            aiQueriesUsed: { label: 'AI Queries', icon: '🤖' },
                          };
                          
                          const resourceInfo = resourceLabels[resource];
                          const limit = userPlan.limits[limitKey as keyof typeof userPlan.limits];
                          
                          if (!resourceInfo || limit === 0) return null;
                          
                          return (
                            <div
                              key={resource}
                              className={`p-4 border-2 rounded-lg ${
                                isNearLimit ? 'border-orange-200 bg-orange-50' : 'border-gray-200 bg-white'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                  <span className="text-lg">{resourceInfo.icon}</span>
                                  <span className="font-medium text-gray-900">{resourceInfo.label}</span>
                                </div>
                                {isNearLimit && (
                                  <span className="text-xs text-orange-600 font-medium">⚠️ Blisko limitu</span>
                                )}
                              </div>
                              
                              <div className="mb-2">
                                <div className="flex justify-between text-sm text-gray-600">
                                  <span>{currentUsage.toLocaleString()}</span>
                                  <span>{formatLimit(limit)}</span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                                  <div
                                    className={`h-2 rounded-full ${
                                      isNearLimit ? 'bg-orange-500' : 'bg-purple-500'
                                    }`}
                                    style={{ width: `${Math.min(percentage, 100)}%` }}
                                  ></div>
                                </div>
                              </div>
                              
                              {limit !== -1 && (
                                <p className="text-xs text-gray-500">
                                  {percentage}% wykorzystane
                                </p>
                              )}

                              {resource === 'aiQueriesUsed' && (
                                <p className="text-xs text-gray-500 mt-1">
                                  Reset: miesięczny
                                </p>
                              )}
                            </div>
                          );
                        })}
                      </div>

                      {/* Feature Overview */}
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-4">🔧 Funkcje w Twoim planie</h4>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {Object.entries(userPlan.features).map(([feature, enabled]) => {
                            const featureLabels: Record<string, { label: string; icon: string }> = {
                              leads: { label: 'Lead Management', icon: '🎯' },
                              customers: { label: 'Customers', icon: '👥' },
                              projects: { label: 'Projects', icon: '📋' },
                              calendar: { label: 'Calendar', icon: '📅' },
                              tasks: { label: 'Tasks', icon: '✅' },
                              analytics: { label: 'Analytics', icon: '📈' },
                              aiAssistant: { label: 'AI Assistant', icon: '🤖' },
                              automation: { label: 'Automation', icon: '⚡' },
                              collaboration: { label: 'Collaboration', icon: '🤝' },
                              fileManagement: { label: 'Files', icon: '📁' },
                              customization: { label: 'Customization', icon: '🎨' },
                              apiAccess: { label: 'API', icon: '🔌' },
                              sso: { label: 'SSO', icon: '🔐' },
                              dedicatedSupport: { label: 'Support', icon: '👨‍💼' },
                            };
                            
                            const featureInfo = featureLabels[feature];
                            if (!featureInfo) return null;
                            
                            const isEnabled = enabled !== false && enabled !== 'none';
                            const isLimited = enabled === 'limited' || enabled === 'basic';
                            
                            return (
                              <div
                                key={feature}
                                className={`flex items-center space-x-2 p-2 rounded-lg border ${
                                  isEnabled
                                    ? isLimited
                                      ? 'border-yellow-200 bg-yellow-50'
                                      : 'border-green-200 bg-green-50'
                                    : 'border-gray-200 bg-gray-50'
                                }`}
                              >
                                <span className="text-lg">{featureInfo.icon}</span>
                                <div className="flex-1 min-w-0">
                                  <div className="text-sm font-medium text-gray-900 truncate">
                                    {featureInfo.label}
                                  </div>
                                  <div className="text-xs text-gray-600">
                                    {isEnabled 
                                      ? isLimited 
                                        ? typeof enabled === 'string' ? enabled : 'Limited'
                                        : 'Enabled'
                                      : 'Disabled'
                                    }
                                  </div>
                                </div>
                                <div className="text-lg">
                                  {isEnabled ? (isLimited ? '🟡' : '🟢') : '🔴'}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Upgrade CTA */}
                      {userPlan.type !== 'enterprise' && (
                        <div className="mt-6 p-4 bg-linear-to-r from-purple-100 to-cyan-100 border border-purple-200 rounded-lg">
                          <div className="flex items-center justify-between">
                            <div>
                              <h4 className="font-semibold text-gray-900">🚀 Gotowy na więcej?</h4>
                              <p className="text-gray-600 text-sm">
                                Uzyskaj dostęp do zaawansowanych funkcji i zwiększ limity
                              </p>
                            </div>
                            <button
                              onClick={() => setShowUpgradeModal(true)}
                              className="px-6 py-2 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                            >
                              Upgrade Plan
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Company Settings */}
                {activeSection === 'company' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">🏢 Informacje o firmie</h2>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nazwa firmy
                          </label>
                          <input
                            type="text"
                            value={settings.companyName}
                            onChange={(e) => updateSettings('companyName', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="np. Core One Flow"
                          />
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tagline / Opis
                          </label>
                          <input
                            type="text"
                            value={settings.companyTagline}
                            onChange={(e) => updateSettings('companyTagline', e.target.value)}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="np. Zarządzanie relacjami z klientami"
                          />
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Branża
                        </label>
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                          {industries.map((industry) => (
                            <button
                              key={industry.id}
                              onClick={() => updateSettings('industry', industry.id)}
                              className={`flex items-center space-x-2 p-3 rounded-lg border-2 transition-all ${
                                settings.industry === industry.id
                                  ? 'border-purple-500 bg-purple-50 text-purple-700'
                                  : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                              }`}
                            >
                              <span className="text-lg">{industry.icon}</span>
                              <span className="text-sm font-medium">{industry.label}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Branding Settings */}
                {activeSection === 'branding' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">🎨 Branding i wygląd</h2>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Kolor główny
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={settings.branding.primaryColor}
                              onChange={(e) => updateSettings('branding', { primaryColor: e.target.value })}
                              className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={settings.branding.primaryColor}
                              onChange={(e) => updateSettings('branding', { primaryColor: e.target.value })}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Kolor drugorzędny
                          </label>
                          <div className="flex items-center space-x-3">
                            <input
                              type="color"
                              value={settings.branding.secondaryColor}
                              onChange={(e) => updateSettings('branding', { secondaryColor: e.target.value })}
                              className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                            />
                            <input
                              type="text"
                              value={settings.branding.secondaryColor}
                              onChange={(e) => updateSettings('branding', { secondaryColor: e.target.value })}
                              className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 font-mono"
                            />
                          </div>
                        </div>
                      </div>

                      <div className="mt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-3">
                          Logo firmy
                        </label>
                        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                          <div className="text-4xl mb-2">🖼️</div>
                          <p className="text-gray-600 mb-4">Przeciągnij logo tutaj lub kliknij, aby wybrać</p>
                          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors">
                            Wybierz plik
                          </button>
                          <p className="text-xs text-gray-500 mt-2">PNG, JPG do 2MB</p>
                        </div>
                      </div>

                      {/* Preview */}
                      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                        <h4 className="font-medium text-gray-900 mb-3">Podgląd</h4>
                        <div 
                          className="p-4 rounded-lg text-white"
                          style={{ 
                            background: `linear-gradient(to right, ${settings.branding.primaryColor}, ${settings.branding.secondaryColor})` 
                          }}
                        >
                          <div className="font-bold text-lg">{settings.companyName}</div>
                          <div className="text-sm opacity-90">{settings.companyTagline}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Localization Settings */}
                {activeSection === 'localization' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">🌍 Lokalizacja</h2>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Język
                          </label>
                          <div className="space-y-2">
                            {languages.map((lang) => (
                              <button
                                key={lang.code}
                                onClick={() => updateSettings('localization', { language: lang.code })}
                                className={`w-full flex items-center space-x-3 p-3 rounded-lg border-2 transition-all ${
                                  settings.localization.language === lang.code
                                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                <span className="text-lg">{lang.flag}</span>
                                <span className="font-medium">{lang.name}</span>
                              </button>
                            ))}
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Waluta
                          </label>
                          <div className="space-y-2">
                            {currencies.map((currency) => (
                              <button
                                key={currency.code}
                                onClick={() => updateSettings('localization', { currency: currency.code })}
                                className={`w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all ${
                                  settings.localization.currency === currency.code
                                    ? 'border-purple-500 bg-purple-50 text-purple-700'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                                }`}
                              >
                                <span className="font-medium">{currency.name}</span>
                                <span className="font-bold">{currency.symbol}</span>
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Strefa czasowa
                          </label>
                          <select
                            value={settings.localization.timezone}
                            onChange={(e) => updateSettings('localization', { timezone: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            {timezones.map((tz) => (
                              <option key={tz} value={tz}>{tz}</option>
                            ))}
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-3">
                            Format daty
                          </label>
                          <select
                            value={settings.localization.dateFormat}
                            onChange={(e) => updateSettings('localization', { dateFormat: e.target.value as any })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                          >
                            <option value="DD/MM/YYYY">DD/MM/YYYY (25/10/2024)</option>
                            <option value="MM/DD/YYYY">MM/DD/YYYY (10/25/2024)</option>
                            <option value="YYYY-MM-DD">YYYY-MM-DD (2024-10-25)</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Features Settings */}
                {activeSection === 'features' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">🔧 Funkcje systemu</h2>
                      <p className="text-gray-600 mb-6">Włącz lub wyłącz moduły systemu CRM</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {Object.entries(settings.features).map(([key, enabled]) => {
                          const featureLabels: Record<string, { label: string; icon: string; description: string }> = {
                            leads: { label: 'Lead Management', icon: '🎯', description: 'Zarządzanie potencjalnymi klientami' },
                            customers: { label: 'Customer Management', icon: '👥', description: 'Baza klientów i kontaktów' },
                            projects: { label: 'Project Management', icon: '📋', description: 'Zarządzanie projektami' },
                            calendar: { label: 'Kalendarz', icon: '📅', description: 'Wydarzenia i spotkania' },
                            tasks: { label: 'Zadania', icon: '✅', description: 'Lista zadań i aktywności' },
                            analytics: { label: 'Analityka', icon: '📈', description: 'Raporty i statystyki' },
                            aiAssistant: { label: 'AI Assistant', icon: '🤖', description: 'Asystent sztucznej inteligencji' },
                            automation: { label: 'Automatyzacja', icon: '⚡', description: 'Workflow i automatyczne akcje' },
                          };

                          const feature = featureLabels[key];
                          if (!feature) return null;

                          return (
                            <div
                              key={key}
                              className={`p-4 rounded-lg border-2 transition-all ${
                                enabled 
                                  ? 'border-green-200 bg-green-50' 
                                  : 'border-gray-200 bg-gray-50'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                  <span className="text-2xl">{feature.icon}</span>
                                  <div>
                                    <h4 className="font-semibold text-gray-900">{feature.label}</h4>
                                    <p className="text-sm text-gray-600">{feature.description}</p>
                                  </div>
                                </div>
                                
                                <div className="relative">
                                  <label className="relative inline-flex items-center cursor-pointer">
                                    {canEnableFeature(key as keyof PlanFeatures) ? (
                                      <input
                                        type="checkbox"
                                        checked={enabled}
                                        onChange={(e) => updateSettings('features', { [key]: e.target.checked })}
                                        className="sr-only peer"
                                      />
                                    ) : (
                                      <input
                                        type="checkbox"
                                        checked={false}
                                        disabled={true}
                                        className="sr-only peer"
                                      />
                                    )}
                                    <div className={`w-11 h-6 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all ${
                                      canEnableFeature(key as keyof PlanFeatures)
                                        ? 'bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 peer-checked:bg-purple-600'
                                        : 'bg-gray-100 cursor-not-allowed'
                                    }`}></div>
                                  </label>
                                  
                                  {!canEnableFeature(key as keyof PlanFeatures) && (
                                    <button
                                      onClick={() => setShowUpgradeModal(true)}
                                      className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 rounded-lg text-white text-xs font-medium opacity-0 hover:opacity-100 transition-opacity"
                                    >
                                      Upgrade Required
                                    </button>
                                  )}
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                      
                      {/* Plan Limitations Info */}
                      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-start space-x-3">
                          <span className="text-blue-500 text-lg">ℹ️</span>
                          <div>
                            <h4 className="font-medium text-blue-900">Ograniczenia planu {userPlan.displayName}</h4>
                            <p className="text-blue-700 text-sm mt-1">
                              Niektóre funkcje są wyłączone lub ograniczone w Twoim obecnym planie. 
                              <button
                                onClick={() => setShowUpgradeModal(true)}
                                className="underline hover:no-underline ml-1"
                              >
                                Zobacz dostępne opcje upgrade
                              </button>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Custom Labels */}
                {activeSection === 'labels' && (
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-xl font-semibold text-gray-900 mb-6">🏷️ Niestandardowe etykiety</h2>
                      <p className="text-gray-600 mb-6">Dostosuj nazwy modułów do branży swojej firmy</p>
                      
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            🎯 Nazwa dla "Leady"
                          </label>
                          <input
                            type="text"
                            value={settings.customLabels.leads}
                            onChange={(e) => updateSettings('customLabels', { leads: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="np. Prospects, Opportunities, Zainteresowani"
                          />
                          <p className="text-xs text-gray-500 mt-1">Domyślnie: "Leady"</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            👥 Nazwa dla "Klienci"
                          </label>
                          <input
                            type="text"
                            value={settings.customLabels.customers}
                            onChange={(e) => updateSettings('customLabels', { customers: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="np. Clients, Accounts, Pacjenci"
                          />
                          <p className="text-xs text-gray-500 mt-1">Domyślnie: "Klienci"</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            📋 Nazwa dla "Projekty"
                          </label>
                          <input
                            type="text"
                            value={settings.customLabels.projects}
                            onChange={(e) => updateSettings('customLabels', { projects: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="np. Deals, Campaigns, Transakcje"
                          />
                          <p className="text-xs text-gray-500 mt-1">Domyślnie: "Projekty"</p>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            ✅ Nazwa dla "Zadania"
                          </label>
                          <input
                            type="text"
                            value={settings.customLabels.tasks}
                            onChange={(e) => updateSettings('customLabels', { tasks: e.target.value })}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                            placeholder="np. Activities, Actions, Czynności"
                          />
                          <p className="text-xs text-gray-500 mt-1">Domyślnie: "Zadania"</p>
                        </div>
                      </div>

                      {/* Industry Presets */}
                      <div className="mt-8">
                        <h4 className="font-semibold text-gray-900 mb-4">🏭 Presety branżowe</h4>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                          <button
                            onClick={() => updateSettings('customLabels', {
                              leads: 'Pacjenci',
                              customers: 'Aktywni Pacjenci',
                              projects: 'Zabiegi',
                              tasks: 'Wizyty'
                            })}
                            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                          >
                            <div className="text-2xl mb-2">🏥</div>
                            <div className="font-medium">Ochrona zdrowia</div>
                            <div className="text-xs text-gray-500">Pacjenci, Wizyty, Zabiegi</div>
                          </button>

                          <button
                            onClick={() => updateSettings('customLabels', {
                              leads: 'Zainteresowani',
                              customers: 'Właściciele',
                              projects: 'Transakcje',
                              tasks: 'Oględziny'
                            })}
                            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                          >
                            <div className="text-2xl mb-2">🏠</div>
                            <div className="font-medium">Nieruchomości</div>
                            <div className="text-xs text-gray-500">Zainteresowani, Transakcje</div>
                          </button>

                          <button
                            onClick={() => updateSettings('customLabels', {
                              leads: 'Prospects',
                              customers: 'Accounts',
                              projects: 'Contracts',
                              tasks: 'Activities'
                            })}
                            className="p-4 border border-gray-200 rounded-lg hover:border-purple-300 hover:bg-purple-50 transition-all"
                          >
                            <div className="text-2xl mb-2">💼</div>
                            <div className="font-medium">B2B Services</div>
                            <div className="text-xs text-gray-500">Accounts, Contracts</div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Other sections placeholders */}
                {activeSection === 'notifications' && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ustawienia powiadomień</h3>
                    <p className="text-gray-600">Zostanie zaimplementowane w kolejnym kroku</p>
                  </div>
                )}

                {activeSection === 'business' && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Ustawienia biznesowe</h3>
                    <p className="text-gray-600">Zostanie zaimplementowane w kolejnym kroku</p>
                  </div>
                )}

                {activeSection === 'data' && (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🚧</div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Dane i prywatność</h3>
                    <p className="text-gray-600">Zostanie zaimplementowane w kolejnym kroku</p>
                  </div>
                )}

              </div>
            </div>
          </div>
        </main>
      </div>

      {/* Plan Comparison Modal */}
      {showPlanModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-6xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">💎 Porównaj plany</h3>
                <button
                  onClick={() => setShowPlanModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {Object.entries(availablePlans).map(([planType, plan]) => (
                  <div
                    key={planType}
                    className={`border-2 rounded-xl p-6 ${
                      userPlan.type === planType
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 bg-white'
                    }`}
                  >
                    <div className="text-center mb-6">
                      <h4 className="text-xl font-bold text-gray-900">{plan.displayName}</h4>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-gray-900">{plan.price.monthly}</span>
                        <span className="text-gray-600"> {plan.currency}/mies</span>
                      </div>
                      {plan.price.yearly && (
                        <p className="text-sm text-green-600 mt-1">
                          Oszczędź przy płatności rocznej
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 mb-6">
                      <div className="text-sm">
                        <span className="font-medium">👥 Użytkownicy:</span> {formatLimit(plan.limits.users)}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">👥 Klienci:</span> {formatLimit(plan.limits.customers)}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">🎯 Leady:</span> {formatLimit(plan.limits.leads)}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">📋 Projekty:</span> {formatLimit(plan.limits.projects)}
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">💾 Storage:</span> {formatLimit(plan.limits.storageGB)} GB
                      </div>
                      <div className="text-sm">
                        <span className="font-medium">🤖 AI Queries:</span> {formatLimit(plan.limits.aiQueries)}/mies
                      </div>
                    </div>

                    <div className="space-y-2 mb-6">
                      {Object.entries(plan.features).map(([feature, enabled]) => {
                        const isEnabled = enabled !== false && enabled !== 'none';
                        return (
                          <div key={feature} className="flex items-center space-x-2 text-sm">
                            <span className={isEnabled ? 'text-green-600' : 'text-gray-400'}>
                              {isEnabled ? '✅' : '❌'}
                            </span>
                            <span className={isEnabled ? 'text-gray-900' : 'text-gray-500'}>
                              {feature === 'leads' && 'Lead Management'}
                              {feature === 'customers' && 'Customer Management'}
                              {feature === 'projects' && 'Project Management'}
                              {feature === 'analytics' && `Analytics (${enabled})`}
                              {feature === 'aiAssistant' && `AI Assistant (${enabled})`}
                              {feature === 'automation' && 'Automation'}
                              {feature === 'collaboration' && 'Collaboration'}
                              {feature === 'customization' && `Customization (${enabled})`}
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <button
                      onClick={() => {
                        if (userPlan.type !== planType) {
                          switchPlan(planType as PlanType);
                        }
                        setShowPlanModal(false);
                      }}
                      className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                        userPlan.type === planType
                          ? 'bg-gray-100 text-gray-500 cursor-not-allowed'
                          : 'bg-linear-to-r from-purple-500 to-cyan-500 text-white hover:shadow-lg'
                      }`}
                      disabled={userPlan.type === planType}
                    >
                      {userPlan.type === planType ? 'Aktualny plan' : 'Wybierz plan'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upgrade Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h3 className="text-xl font-semibold text-gray-900">🚀 Upgrade swojego planu</h3>
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="mb-6">
                <h4 className="text-lg font-semibold text-gray-900 mb-2">Aktualny plan: {userPlan.displayName}</h4>
                <p className="text-gray-600">
                  Odkryj więcej możliwości z wyższymi planami
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {Object.entries(availablePlans)
                  .filter(([planType]) => {
                    const planOrder = { starter: 0, professional: 1, business: 2, enterprise: 3 };
                    const currentOrder = planOrder[userPlan.type as keyof typeof planOrder];
                    const thisOrder = planOrder[planType as keyof typeof planOrder];
                    return thisOrder > currentOrder;
                  })
                  .map(([planType, plan]) => (
                    <div key={planType} className="border-2 border-purple-200 rounded-xl p-6 bg-purple-50">
                      <div className="text-center mb-4">
                        <h4 className="text-xl font-bold text-gray-900">{plan.displayName}</h4>
                        <div className="mt-2">
                          <span className="text-2xl font-bold text-purple-600">{plan.price.monthly}</span>
                          <span className="text-gray-600"> {plan.currency}/mies</span>
                        </div>
                      </div>

                      <div className="space-y-2 mb-6">
                        <h5 className="font-medium text-gray-900">Główne korzyści:</h5>
                        {planType === 'professional' && (
                          <>
                            <div className="text-sm text-gray-700">✅ Lead Management</div>
                            <div className="text-sm text-gray-700">✅ Basic Projects</div>
                            <div className="text-sm text-gray-700">✅ AI Assistant (50 queries)</div>
                            <div className="text-sm text-gray-700">✅ Basic Automation</div>
                          </>
                        )}
                        {planType === 'business' && (
                          <>
                            <div className="text-sm text-gray-700">✅ Advanced Projects + Gantt</div>
                            <div className="text-sm text-gray-700">✅ Real-time Collaboration</div>
                            <div className="text-sm text-gray-700">✅ File Management</div>
                            <div className="text-sm text-gray-700">✅ AI Assistant (200 queries)</div>
                            <div className="text-sm text-gray-700">✅ Custom Reports</div>
                          </>
                        )}
                        {planType === 'enterprise' && (
                          <>
                            <div className="text-sm text-gray-700">✅ Unlimited Everything</div>
                            <div className="text-sm text-gray-700">✅ Full Customization</div>
                            <div className="text-sm text-gray-700">✅ API Access</div>
                            <div className="text-sm text-gray-700">✅ SSO & Advanced Security</div>
                            <div className="text-sm text-gray-700">✅ Dedicated Support</div>
                          </>
                        )}
                      </div>

                      <button
                        onClick={() => switchPlan(planType as PlanType)}
                        className="w-full py-3 bg-linear-to-r from-purple-500 to-cyan-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                      >
                        Upgrade do {plan.displayName}
                      </button>
                    </div>
                  ))}
              </div>

              {Object.keys(availablePlans).filter(planType => {
                const planOrder = { starter: 0, professional: 1, business: 2, enterprise: 3 };
                const currentOrder = planOrder[userPlan.type as keyof typeof planOrder];
                const thisOrder = planOrder[planType as keyof typeof planOrder];
                return thisOrder > currentOrder;
              }).length === 0 && (
                <div className="text-center py-12">
                  <div className="text-6xl mb-4">🏆</div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Masz już najwyższy plan!</h3>
                  <p className="text-gray-600">
                    Korzystasz z pełnych możliwości Core One Flow CRM Enterprise
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
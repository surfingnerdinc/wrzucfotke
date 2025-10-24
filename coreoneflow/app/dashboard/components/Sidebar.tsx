'use client';

import React from 'react';
import Link from 'next/link';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  activeSection: string;
  onSectionChange: (section: string) => void;
  user: {
    name: string;
    company: string;
    avatar: string;
    plan: string;
  };
}

export default function Sidebar({ collapsed, onToggleCollapse, activeSection, onSectionChange, user }: SidebarProps) {
  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', active: true, href: '/dashboard' },
    { id: 'leads', label: 'Leady', icon: '🎯', badge: '12', href: '/dashboard/leads' },
    { id: 'customers', label: 'Klienci', icon: '👥', badge: '6', href: '/dashboard/customers' },
    { id: 'projects', label: 'Projekty', icon: '📋', badge: '5', href: '/dashboard/projects' },
    { id: 'calendar', label: 'Kalendarz', icon: '📅', badge: null, href: '/dashboard/calendar' },
    { id: 'tasks', label: 'Zadania', icon: '✅', badge: '8', href: '/dashboard/tasks' },
    { id: 'analytics', label: 'Analityka', icon: '📈', badge: null, href: '/dashboard/analytics' },
    { id: 'ai-assistant', label: 'AI Asystent', icon: '🤖', badge: 'AI', href: '/dashboard/ai' },
    { id: 'automation', label: 'Automatyzacja', icon: '⚡', badge: null, href: '/dashboard/automation' },
    { id: 'reports', label: 'Raporty', icon: '📄', badge: null, href: '/dashboard/reports' },
    { id: 'settings', label: 'Ustawienia', icon: '⚙️', badge: null, href: '/dashboard/settings' }
  ];

  return (
    <div className={`bg-white border-r border-gray-200 transition-all duration-300 ${
      collapsed ? 'w-16' : 'w-64'
    } flex flex-col shadow-sm`}>
      {/* Logo */}
      <div className="p-6 border-b border-gray-200">
        <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-linear-to-r from-purple-500 to-cyan-500 rounded-lg flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">📊</span>
          </div>
          {!collapsed && (
            <span className="text-xl font-bold text-gray-900">Core One Flow</span>
          )}
        </div>
      </div>

      {/* User Profile */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-linear-to-r from-purple-100 to-cyan-100 rounded-full flex items-center justify-center">
            <span className="text-lg">{user.avatar}</span>
          </div>
          {!collapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-900 truncate">{user.name}</p>
              <p className="text-xs text-gray-500 truncate">{user.company}</p>
              <span className="inline-block px-2 py-1 text-xs bg-purple-100 text-purple-700 rounded-full mt-1">
                {user.plan}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <div className="space-y-1">
          {navigationItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              onClick={() => onSectionChange(item.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 ${
                activeSection === item.id
                  ? 'bg-linear-to-r from-purple-500 to-cyan-500 text-white shadow-md'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
              title={collapsed ? item.label : ''}
            >
              <span className="text-lg shrink-0">{item.icon}</span>
              {!collapsed && (
                <>
                  <span className="flex-1 font-medium text-sm">{item.label}</span>
                  {item.badge && (
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      item.badge === 'AI' 
                        ? 'bg-cyan-100 text-cyan-700'
                        : activeSection === item.id
                          ? 'bg-white/20 text-white'
                          : 'bg-gray-200 text-gray-600'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </>
              )}
            </Link>
          ))}
        </div>
        
        {/* AI Status Indicator */}
        {!collapsed && (
          <div className="mt-6 p-3 bg-linear-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              <span className="text-sm font-semibold text-blue-700">AI Status</span>
            </div>
            <p className="text-xs text-blue-600">
              Aktywne: 3 automatyzacje<br/>
              Przetworzone: 47 leadów dziś
            </p>
          </div>
        )}
      </nav>

      {/* Collapse Toggle & Logout */}
      <div className="p-4 border-t border-gray-200 space-y-2">
        <button
          onClick={onToggleCollapse}
          className="w-full flex items-center gap-3 px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors"
          title={collapsed ? 'Rozwiń menu' : 'Zwiń menu'}
        >
          <span className="text-lg">{collapsed ? '→' : '←'}</span>
          {!collapsed && <span className="font-medium text-sm">Zwiń menu</span>}
        </button>
        
        {!collapsed && (
          <button className="w-full flex items-center gap-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <span className="text-lg">🚪</span>
            <span className="font-medium text-sm">Wyloguj</span>
          </button>
        )}
      </div>
    </div>
  );
}
'use client';

import React from 'react';

interface DashboardHeaderProps {
  user: {
    name: string;
    avatar: string;
  };
  onSearch: (query: string) => void;
}

export default function DashboardHeader({ user, onSearch }: DashboardHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">Witaj z powrotem, {user.name}! Oto co dzieje się w Twoim CRM.</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Szukaj klientów, projektów..."
              onChange={(e) => onSearch(e.target.value)}
              className="w-80 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
            />
            <span className="absolute left-3 top-2.5 text-gray-400">🔍</span>
          </div>

          {/* Quick Add */}
          <button className="p-2 text-gray-400 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors">
            <span className="text-xl">➕</span>
          </button>

          {/* Notifications */}
          <button className="relative p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-50 rounded-lg transition-colors">
            <span className="text-xl">🔔</span>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center animate-pulse">
              3
            </span>
          </button>

          {/* User Menu */}
          <div className="relative">
            <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-colors">
              <span className="text-lg">{user.avatar}</span>
              <span className="text-sm text-gray-600">▼</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
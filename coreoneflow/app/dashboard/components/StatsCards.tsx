'use client';

import React from 'react';

interface StatsCardsProps {
  stats: Array<{
    title: string;
    value: string;
    change: string;
    trend: 'up' | 'down';
    icon: string;
  }>;
}

export default function StatsCards({ stats }: StatsCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div key={index} className="bg-white rounded-xl border border-gray-200 p-6 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          <div className="flex items-center justify-between mb-4">
            <div className="w-12 h-12 bg-linear-to-r from-purple-100 to-cyan-100 rounded-xl flex items-center justify-center">
              <span className="text-2xl">{stat.icon}</span>
            </div>
            <span className={`text-sm font-semibold px-3 py-1 rounded-full ${
              stat.trend === 'up' 
                ? 'bg-green-100 text-green-700' 
                : 'bg-red-100 text-red-700'
            }`}>
              {stat.trend === 'up' ? '↗' : '↘'} {stat.change}
            </span>
          </div>
          <h3 className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</h3>
          <p className="text-gray-600 font-medium">{stat.title}</p>
          
          {/* Mini chart placeholder */}
          <div className="mt-4 h-8 flex items-end gap-1">
            {[...Array(7)].map((_, i) => (
              <div
                key={i}
                className={`flex-1 rounded-sm ${
                  stat.trend === 'up' ? 'bg-green-200' : 'bg-red-200'
                }`}
                style={{ 
                  height: `${Math.random() * 100}%`,
                  minHeight: '4px'
                }}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
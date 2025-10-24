'use client';

import React from 'react';

interface AIInsightsPanelProps {
  insights: Array<{
    id: string;
    title: string;
    description: string;
    type: 'opportunity' | 'warning' | 'info';
    action: string;
    priority: 'high' | 'medium' | 'low';
  }>;
}

export default function AIInsightsPanel({ insights }: AIInsightsPanelProps) {
  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'opportunity': return '🎯';
      case 'warning': return '⚠️';
      case 'info': return 'ℹ️';
      default: return '🤖';
    }
  };

  const getInsightColor = (type: string) => {
    switch (type) {
      case 'opportunity': return 'from-green-500 to-emerald-500';
      case 'warning': return 'from-yellow-500 to-orange-500';
      case 'info': return 'from-blue-500 to-cyan-500';
      default: return 'from-purple-500 to-cyan-500';
    }
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="bg-linear-to-r from-purple-500 to-cyan-500 p-6 text-white">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-2xl">🤖</span>
          </div>
          <div>
            <h3 className="text-xl font-bold">AI Insights</h3>
            <p className="opacity-90">Twój AI asystent przygotował dla Ciebie rekomendacje</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <div className="space-y-4">
          {insights.map((insight) => (
            <div 
              key={insight.id}
              className={`p-4 rounded-lg border-l-4 ${
                insight.type === 'opportunity' ? 'border-green-500 bg-green-50' :
                insight.type === 'warning' ? 'border-yellow-500 bg-yellow-50' :
                'border-blue-500 bg-blue-50'
              } hover:shadow-md transition-all duration-200`}
            >
              <div className="flex items-start gap-3">
                <span className="text-2xl">{getInsightIcon(insight.type)}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h4 className="font-semibold text-gray-900">{insight.title}</h4>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      insight.priority === 'high' ? 'bg-red-100 text-red-700' :
                      insight.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-green-100 text-green-700'
                    }`}>
                      {insight.priority === 'high' ? 'Wysoki' :
                       insight.priority === 'medium' ? 'Średni' : 'Niski'} priorytet
                    </span>
                  </div>
                  <p className="text-gray-700 text-sm mb-3">{insight.description}</p>
                  <button className={`bg-linear-to-r ${getInsightColor(insight.type)} text-white px-4 py-2 rounded-lg font-medium text-sm hover:shadow-lg transition-all duration-300 transform hover:scale-105`}>
                    {insight.action}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI Statistics */}
        <div className="mt-6 pt-6 border-t border-gray-200">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-purple-600">94%</div>
              <div className="text-xs text-gray-500">Dokładność AI</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-cyan-600">2.3s</div>
              <div className="text-xs text-gray-500">Czas odpowiedzi</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-green-600">47</div>
              <div className="text-xs text-gray-500">Leady dziś</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
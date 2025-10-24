'use client';

import React from 'react';

export default function AIIntegrations() {
  const integrations = [
    {
      name: 'OpenAI GPT-4',
      description: 'Najnowszy model językowy do generowania treści i analizy',
      icon: '🧠',
      category: 'AI Engine'
    },
    {
      name: 'Google Workspace',
      description: 'Automatyczna synchronizacja kalendarzy i dokumentów',
      icon: '📧',
      category: 'Produktywność'
    },
    {
      name: 'Microsoft 365',
      description: 'Integracja z Outlook, Teams i SharePoint',
      icon: '💼',
      category: 'Produktywność'
    },
    {
      name: 'Slack',
      description: 'Powiadomienia i updates bezpośrednio na Slack',
      icon: '💬',
      category: 'Komunikacja'
    },
    {
      name: 'Zapier',
      description: 'Połączenia z 5000+ aplikacji przez Zapier',
      icon: '⚡',
      category: 'Automatyzacja'
    },
    {
      name: 'HubSpot',
      description: 'Migracja i synchronizacja danych CRM',
      icon: '🎯',
      category: 'CRM'
    },
    {
      name: 'Salesforce',
      description: 'Import danych i kontaktów z Salesforce',
      icon: '☁️',
      category: 'CRM'
    },
    {
      name: 'WhatsApp Business',
      description: 'AI chat bot zintegrowany z WhatsApp',
      icon: '📱',
      category: 'Komunikacja'
    }
  ];

  const aiCapabilities = [
    {
      title: 'Natural Language Processing',
      description: 'Rozumienie i analiza komunikacji w języku naturalnym',
      examples: ['Analiza sentymentu emaili', 'Automatyczne tagowanie rozmów', 'Ekstrakcja kluczowych informacji'],
      color: 'blue'
    },
    {
      title: 'Machine Learning',
      description: 'Uczenie się na podstawie danych i optymalizacja procesów',
      examples: ['Przewidywanie churn rate', 'Optymalizacja timing-u kontaktu', 'Personalizacja komunikacji'],
      color: 'purple'
    },
    {
      title: 'Computer Vision',
      description: 'Analiza dokumentów i rozpoznawanie obrazów',
      examples: ['Skanowanie wizytówek', 'Analiza dokumentów PDF', 'Rozpoznawanie podpisów'],
      color: 'cyan'
    }
  ];

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-16">
            <div className="inline-flex items-center bg-indigo-100 border border-indigo-200 rounded-full px-4 py-2 mb-6">
              <span className="text-indigo-600 mr-2">🔗</span>
              <span className="text-indigo-700 text-sm font-medium">Integracje AI</span>
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Połącz AI z Twoimi
              <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"> ulubionymi narzędziami</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Core One Flow AI integruje się płynnie z ekosystemem Twoich narzędzi biznesowych. 
              Jedna platforma, nieskończone możliwości automatyzacji.
            </p>
          </div>

          {/* AI Capabilities */}
          <div className="grid lg:grid-cols-3 gap-8 mb-20">
            {aiCapabilities.map((capability, index) => (
              <div key={index} className="bg-linear-to-br from-white to-gray-50 rounded-2xl p-8 border border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className={`w-16 h-16 bg-linear-to-r from-${capability.color}-100 to-${capability.color}-200 rounded-2xl flex items-center justify-center mb-6`}>
                  <span className="text-3xl">🤖</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{capability.title}</h3>
                <p className="text-gray-600 mb-6">{capability.description}</p>
                <div className="space-y-2">
                  <h4 className="font-semibold text-gray-700 mb-3">Przykłady zastosowań:</h4>
                  {capability.examples.map((example, exampleIndex) => (
                    <div key={exampleIndex} className="flex items-center gap-2">
                      <div className={`w-1.5 h-1.5 bg-${capability.color}-500 rounded-full`}></div>
                      <span className="text-gray-600 text-sm">{example}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Integrations Grid */}
          <div className="mb-16">
            <h3 className="text-3xl font-bold text-gray-900 text-center mb-12">
              Natywne integracje z popularnymi narzędziami
            </h3>
            <div className="grid md:grid-cols-4 gap-6">
              {integrations.map((integration, index) => (
                <div
                  key={index}
                  className="bg-white rounded-xl p-6 border border-gray-200 hover:border-indigo-300 hover:shadow-md transition-all duration-300 group"
                >
                  <div className="text-center">
                    <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      <span className="text-3xl">{integration.icon}</span>
                    </div>
                    <h4 className="font-semibold text-gray-900 mb-2">{integration.name}</h4>
                    <p className="text-gray-600 text-sm mb-3">{integration.description}</p>
                    <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-medium">
                      {integration.category}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* API Section */}
          <div className="bg-gray-900 rounded-2xl p-12 text-white">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-6">
                  Potrzebujesz custom integracji?
                </h3>
                <p className="text-gray-300 mb-8 text-lg">
                  Nasze REST API i webhooks pozwalają na łączenie Core One Flow z dowolnymi systemami. 
                  Kompletna dokumentacja, SDK w popularnych językach i wsparcie developerów.
                </p>
                <div className="space-y-4 mb-8">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>RESTful API z OpenAPI 3.0 spec</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>Real-time webhooks</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>SDK dla Python, Node.js, PHP</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>99.9% uptime SLA</span>
                  </div>
                </div>
                <button className="bg-white text-gray-900 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
                  Dokumentacja API
                </button>
              </div>

              <div className="bg-gray-800 rounded-xl p-6 font-mono text-sm">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-auto text-gray-400">API Example</span>
                </div>
                <pre className="text-green-400">
{`// Dodawanie nowego kontaktu przez API
const response = await fetch('/api/v1/contacts', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_TOKEN',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: 'Jan Kowalski',
    email: 'jan@example.com',
    company: 'Example Corp',
    tags: ['lead', 'ai-qualified']
  })
});

const contact = await response.json();
console.log('Utworzono:', contact.id);`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
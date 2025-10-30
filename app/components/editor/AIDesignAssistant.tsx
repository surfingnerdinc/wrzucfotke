'use client';

import { useState } from 'react';
import {
  SparklesIcon,
  ArrowPathIcon,
  XMarkIcon,
  CheckIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

export interface AIDesignRequest {
  canvasSize: string;
  orientation: string;
  businessType: string;
  eventType: string;
  colorScheme: string;
  content: {
    title: string;
    subtitle?: string;
    description?: string;
    contactInfo?: string;
  };
  style: 'modern' | 'classic' | 'minimalist' | 'colorful' | 'professional';
}

export interface AIDesignSuggestion {
  id: string;
  name: string;
  description: string;
  preview: string; // base64 image or URL
  elements: {
    type: 'text' | 'shape' | 'background';
    content?: string;
    position: { x: number; y: number };
    size: { width: number; height: number };
    style: {
      fontSize?: number;
      fontFamily?: string;
      color?: string;
      backgroundColor?: string;
      borderColor?: string;
      borderWidth?: number;
    };
  }[];
}

interface AIDesignAssistantProps {
  canvasSize: string;
  orientation: string;
  isOpen: boolean;
  onClose: () => void;
  onApplyDesign: (design: AIDesignSuggestion) => void;
  backendUrl: string; // URL do Twojego backend API
}

export default function AIDesignAssistant({
  canvasSize,
  orientation,
  isOpen,
  onClose,
  onApplyDesign,
  backendUrl
}: AIDesignAssistantProps) {
  const [step, setStep] = useState<'form' | 'generating' | 'results'>('form');
  const [request, setRequest] = useState<AIDesignRequest>({
    canvasSize,
    orientation,
    businessType: '',
    eventType: '',
    colorScheme: 'modern',
    content: {
      title: '',
      subtitle: '',
      description: '',
      contactInfo: ''
    },
    style: 'modern'
  });
  const [suggestions, setSuggestions] = useState<AIDesignSuggestion[]>([]);
  const [error, setError] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const businessTypes = [
    'Restauracja', 'Sklep', 'Fryzjer', 'Dentista', 'Prawnik', 'Księgowy',
    'IT/Tech', 'Marketing', 'Fitness', 'Beauty', 'Edukacja', 'Medycyna',
    'Motoryzacja', 'Nieruchomości', 'Fotografia', 'Inne'
  ];

  const eventTypes = [
    'Wizytówka', 'Plakat reklamowy', 'Event/Impreza', 'Promocja/Wyprzedaż',
    'Menu restauracji', 'Ogłoszenie', 'Zaproszenie', 'Certyfikat',
    'Banner', 'Ulotka', 'Inne'
  ];

  const colorSchemes = [
    { id: 'modern', name: 'Nowoczesny', colors: ['#4F46E5', '#06B6D4', '#10B981'] },
    { id: 'classic', name: 'Klasyczny', colors: ['#1F2937', '#374151', '#6B7280'] },
    { id: 'warm', name: 'Ciepły', colors: ['#F59E0B', '#EF4444', '#F97316'] },
    { id: 'cool', name: 'Chłodny', colors: ['#3B82F6', '#8B5CF6', '#06B6D4'] },
    { id: 'nature', name: 'Naturalne', colors: ['#10B981', '#84CC16', '#22C55E'] }
  ];

  const styles = [
    { id: 'modern', name: 'Nowoczesny', desc: 'Czyste linie, minimalizm' },
    { id: 'classic', name: 'Klasyczny', desc: 'Tradycyjne, eleganckie' },
    { id: 'minimalist', name: 'Minimalistyczny', desc: 'Bardzo prosty, mało elementów' },
    { id: 'colorful', name: 'Kolorowy', desc: 'Żywe kolory, dynamiczny' },
    { id: 'professional', name: 'Profesjonalny', desc: 'Biznesowy, poważny' }
  ];

  const generateDesigns = async () => {
    setIsGenerating(true);
    setError('');
    setStep('generating');

    try {
      const response = await fetch(`${backendUrl}/api/ai/generate-design`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Błąd podczas generowania designów');
      }

      const data = await response.json();
      setSuggestions(data.suggestions || []);
      setStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Wystąpił błąd');
      setStep('form');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyDesign = (design: AIDesignSuggestion) => {
    onApplyDesign(design);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose}></div>
        
        <div className="relative bg-white rounded-2xl shadow-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center space-x-3">
              <SparklesIcon className="w-6 h-6 text-indigo-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                🤖 AI Design Assistant
              </h2>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
            {step === 'form' && (
              <div className="space-y-6">
                <div className="text-center">
                  <p className="text-gray-600 mb-6">
                    Wypełnij informacje, a AI wygeneruje profesjonalne designy dla Twojego projektu
                  </p>
                </div>

                {error && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                    <ExclamationTriangleIcon className="w-5 h-5 text-red-600" />
                    <span className="text-red-700">{error}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Business Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Typ biznesu/branża
                    </label>
                    <select
                      value={request.businessType}
                      onChange={(e) => setRequest(prev => ({ ...prev, businessType: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Wybierz branżę...</option>
                      {businessTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>

                  {/* Event Type */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-3">
                      Typ projektu
                    </label>
                    <select
                      value={request.eventType}
                      onChange={(e) => setRequest(prev => ({ ...prev, eventType: e.target.value }))}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    >
                      <option value="">Wybierz typ...</option>
                      {eventTypes.map(type => (
                        <option key={type} value={type}>{type}</option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Content */}
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-gray-900">Treść</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Tytuł główny *
                    </label>
                    <input
                      type="text"
                      value={request.content.title}
                      onChange={(e) => setRequest(prev => ({
                        ...prev,
                        content: { ...prev.content, title: e.target.value }
                      }))}
                      placeholder="np. Salon Piękności Anna"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Podtytuł
                    </label>
                    <input
                      type="text"
                      value={request.content.subtitle}
                      onChange={(e) => setRequest(prev => ({
                        ...prev,
                        content: { ...prev.content, subtitle: e.target.value }
                      }))}
                      placeholder="np. Profesjonalne usługi fryzjerskie"
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Kontakt
                    </label>
                    <textarea
                      value={request.content.contactInfo}
                      onChange={(e) => setRequest(prev => ({
                        ...prev,
                        content: { ...prev.content, contactInfo: e.target.value }
                      }))}
                      placeholder="tel: 123 456 789&#10;email@example.com&#10;ul. Przykładowa 1, Warszawa"
                      rows={3}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
                    />
                  </div>
                </div>

                {/* Style Selection */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Styl</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {styles.map(style => (
                      <button
                        key={style.id}
                        onClick={() => setRequest(prev => ({ ...prev, style: style.id as any }))}
                        className={`p-4 border-2 rounded-lg text-left transition-colors ${
                          request.style === style.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="font-medium">{style.name}</div>
                        <div className="text-sm text-gray-500 mt-1">{style.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Color Scheme */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Paleta kolorów</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
                    {colorSchemes.map(scheme => (
                      <button
                        key={scheme.id}
                        onClick={() => setRequest(prev => ({ ...prev, colorScheme: scheme.id }))}
                        className={`p-3 border-2 rounded-lg transition-colors ${
                          request.colorScheme === scheme.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-sm font-medium mb-2">{scheme.name}</div>
                        <div className="flex space-x-1">
                          {scheme.colors.map((color, idx) => (
                            <div
                              key={idx}
                              className="w-6 h-6 rounded-full"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex justify-end space-x-4 pt-6 border-t">
                  <button
                    onClick={onClose}
                    className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    Anuluj
                  </button>
                  <button
                    onClick={generateDesigns}
                    disabled={!request.content.title || !request.businessType || !request.eventType}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center space-x-2"
                  >
                    <SparklesIcon className="w-5 h-5" />
                    <span>Generuj designy AI</span>
                  </button>
                </div>
              </div>
            )}

            {step === 'generating' && (
              <div className="text-center py-12">
                <ArrowPathIcon className="w-12 h-12 text-indigo-600 mx-auto mb-4 animate-spin" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  AI tworzy designy...
                </h3>
                <p className="text-gray-600">
                  Analizujemy Twoje wymagania i generujemy profesjonalne propozycje
                </p>
              </div>
            )}

            {step === 'results' && (
              <div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    🎨 Propozycje AI
                  </h3>
                  <p className="text-gray-600">
                    Wybierz design, który Ci się podoba
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {suggestions.map(suggestion => (
                    <div
                      key={suggestion.id}
                      className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="aspect-3/4 bg-gray-100 p-4">
                        {suggestion.preview ? (
                          <img
                            src={suggestion.preview}
                            alt={suggestion.name}
                            className="w-full h-full object-contain rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            Preview niedostępny
                          </div>
                        )}
                      </div>
                      
                      <div className="p-4">
                        <h4 className="font-semibold text-gray-900 mb-2">
                          {suggestion.name}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4">
                          {suggestion.description}
                        </p>
                        
                        <button
                          onClick={() => handleApplyDesign(suggestion)}
                          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors flex items-center justify-center space-x-2"
                        >
                          <CheckIcon className="w-4 h-4" />
                          <span>Zastosuj design</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex justify-center space-x-4 pt-6 border-t mt-8">
                  <button
                    onClick={() => setStep('form')}
                    className="px-6 py-3 text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    ← Wróć do formularza
                  </button>
                  <button
                    onClick={generateDesigns}
                    disabled={isGenerating}
                    className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center space-x-2"
                  >
                    <ArrowPathIcon className={`w-5 h-5 ${isGenerating ? 'animate-spin' : ''}`} />
                    <span>Generuj ponownie</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
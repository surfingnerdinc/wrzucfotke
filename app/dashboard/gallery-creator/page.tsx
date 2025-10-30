'use client';

import { useState } from 'react';
import { 
  PhotoIcon,
  CalendarIcon,
  GlobeAltIcon,
  LockClosedIcon,
  UserGroupIcon,
  CheckIcon,
  PlusIcon,
  QrCodeIcon,
  LinkIcon,
  Cog6ToothIcon,
  HeartIcon,
  BuildingOfficeIcon,
  CakeIcon,
  AcademicCapIcon,
  SparklesIcon
} from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation';

interface GalleryTemplate {
  id: string;
  name: string;
  description: string;
  icon: any;
  color: string;
  features: string[];
  settings: {
    allowGuestUploads: boolean;
    requireGuestInfo: boolean;
    moderatePhotos: boolean;
    maxPhotosPerGuest: number | null;
  };
}

interface GalleryFormData {
  name: string;
  description: string;
  eventDate: string;
  template: string;
  privacy: 'public' | 'private' | 'unlisted';
  allowGuestUploads: boolean;
  requireGuestInfo: boolean;
  moderatePhotos: boolean;
  maxPhotosPerGuest: number | null;
  tags: string[];
}

export default function GalleryCreatorPage() {
  const router = useRouter();
  
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [formData, setFormData] = useState<GalleryFormData>({
    name: '',
    description: '',
    eventDate: '',
    template: '',
    privacy: 'private',
    allowGuestUploads: true,
    requireGuestInfo: true,
    moderatePhotos: false,
    maxPhotosPerGuest: null,
    tags: []
  });

  const templates: GalleryTemplate[] = [
    {
      id: 'wedding',
      name: 'Wesele',
      description: 'Idealne dla ślubów i wesel. Eleganckie ustawienia z moderacją zdjęć.',
      icon: HeartIcon,
      color: 'from-pink-500 to-rose-500',
      features: ['Moderacja zdjęć', 'Wymagane imiona gości', 'Bez limitu zdjęć', 'Automatyczny QR'],
      settings: {
        allowGuestUploads: true,
        requireGuestInfo: true,
        moderatePhotos: true,
        maxPhotosPerGuest: null
      }
    },
    {
      id: 'corporate',
      name: 'Firmowe',
      description: 'Dla wydarzeń biznesowych. Profesjonalne podejście z kontrolą jakości.',
      icon: BuildingOfficeIcon,
      color: 'from-blue-500 to-indigo-500',
      features: ['Wymagane dane kontaktowe', 'Moderacja włączona', 'Limit 10 zdjęć/osoba', 'Branding firmowy'],
      settings: {
        allowGuestUploads: true,
        requireGuestInfo: true,
        moderatePhotos: true,
        maxPhotosPerGuest: 10
      }
    },
    {
      id: 'birthday',
      name: 'Urodziny',
      description: 'Świetne na prywatne urodziny i imprezy rodzinne.',
      icon: CakeIcon,
      color: 'from-yellow-500 to-orange-500',
      features: ['Bez moderacji', 'Opcjonalne imiona', 'Limit 20 zdjęć/osoba', 'Kolorowe motywy'],
      settings: {
        allowGuestUploads: true,
        requireGuestInfo: false,
        moderatePhotos: false,
        maxPhotosPerGuest: 20
      }
    },
    {
      id: 'graduation',
      name: 'Studniówka/Absolutorium',
      description: 'Dla wydarzeń szkolnych i akademickich.',
      icon: AcademicCapIcon,
      color: 'from-purple-500 to-violet-500',
      features: ['Moderacja opcjonalna', 'Wymagane imiona', 'Limit 15 zdjęć/osoba', 'Klasyczne style'],
      settings: {
        allowGuestUploads: true,
        requireGuestInfo: true,
        moderatePhotos: false,
        maxPhotosPerGuest: 15
      }
    },
    {
      id: 'custom',
      name: 'Niestandardowe',
      description: 'Stwórz własne ustawienia dopasowane do Twojego wydarzenia.',
      icon: SparklesIcon,
      color: 'from-gray-500 to-slate-500',
      features: ['Pełna kontrola', 'Wszystkie opcje', 'Dowolne limity', 'Własne style'],
      settings: {
        allowGuestUploads: true,
        requireGuestInfo: false,
        moderatePhotos: false,
        maxPhotosPerGuest: null
      }
    }
  ];

  const updateFormData = (updates: Partial<GalleryFormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  };

  const applyTemplate = (template: GalleryTemplate) => {
    updateFormData({
      template: template.id,
      ...template.settings
    });
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      updateFormData({ tags: [...formData.tags, tag] });
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateFormData({ 
      tags: formData.tags.filter(tag => tag !== tagToRemove) 
    });
  };

  const handleSubmit = async () => {
    try {
      // Tu będzie API call do stworzenia galerii
      console.log('Creating gallery:', formData);
      
      // Symulacja API response
      const galleryId = `gallery-${Date.now()}`;
      
      // Przekierowanie do nowo utworzonej galerii
      router.push(`/dashboard/gallery?id=${galleryId}`);
      
    } catch (error) {
      console.error('Error creating gallery:', error);
    }
  };

  const canProceedToStep2 = formData.name && formData.template;
  const canProceedToStep3 = canProceedToStep2 && formData.eventDate;
  const canSubmit = canProceedToStep3;

  return (
    <div className="min-h-screen bg-linear-to-br from-indigo-50 via-white to-purple-50">
      
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-linear-to-r from-indigo-600 to-purple-600 rounded-xl flex items-center justify-center">
                <PhotoIcon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">Kreator galerii</h1>
                <p className="text-sm text-gray-500">Stwórz nową galerię dla swojego wydarzenia</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Progress Steps */}
        <div className="flex items-center justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[1, 2, 3].map((stepNumber) => (
              <div key={stepNumber} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= stepNumber 
                    ? 'bg-indigo-600 text-white' 
                    : 'bg-gray-200 text-gray-600'
                }`}>
                  {stepNumber}
                </div>
                {stepNumber < 3 && (
                  <div className={`w-16 h-1 mx-4 ${
                    step > stepNumber ? 'bg-indigo-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-3xl shadow-xl border border-gray-100 overflow-hidden">
          
          {/* Step 1: Podstawowe informacje */}
          {step === 1 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Podstawowe informacje</h2>
                <p className="text-gray-600">Zacznij od podania nazwy i wybrania typu wydarzenia</p>
              </div>

              <div className="space-y-6 mb-8">
                {/* Gallery Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nazwa galerii *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => updateFormData({ name: e.target.value })}
                    placeholder="np. Wesele Ania & Tomek 2025"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                  />
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Opis wydarzenia (opcjonalnie)
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => updateFormData({ description: e.target.value })}
                    placeholder="Krótki opis wydarzenia dla gości..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Template Selection */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Wybierz szablon *
                  </label>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {templates.map((template) => (
                      <button
                        key={template.id}
                        onClick={() => applyTemplate(template)}
                        className={`p-6 rounded-xl border-2 transition-all text-left ${
                          formData.template === template.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center space-x-3 mb-3">
                          <div className={`w-10 h-10 bg-linear-to-r ${template.color} rounded-lg flex items-center justify-center`}>
                            <template.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-gray-900">{template.name}</h3>
                          </div>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{template.description}</p>
                        <div className="space-y-1">
                          {template.features.map((feature) => (
                            <div key={feature} className="flex items-center text-xs text-gray-500">
                              <CheckIcon className="w-3 h-3 mr-1 text-green-500" />
                              {feature}
                            </div>
                          ))}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Next Button */}
              <div className="flex justify-end">
                <button
                  onClick={() => canProceedToStep2 && setStep(2)}
                  disabled={!canProceedToStep2}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    canProceedToStep2
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Dalej
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Szczegóły wydarzenia */}
          {step === 2 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Szczegóły wydarzenia</h2>
                <p className="text-gray-600">Określ datę i ustawienia prywatności</p>
              </div>

              <div className="space-y-6 mb-8">
                {/* Event Date */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Data wydarzenia *
                  </label>
                  <input
                    type="date"
                    value={formData.eventDate}
                    onChange={(e) => updateFormData({ eventDate: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  />
                </div>

                {/* Privacy Settings */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Ustawienia prywatności
                  </label>
                  <div className="space-y-3">
                    {[
                      {
                        id: 'private',
                        name: 'Prywatna',
                        description: 'Dostęp tylko z linkiem lub kodem QR',
                        icon: LockClosedIcon,
                        recommended: true
                      },
                      {
                        id: 'unlisted',
                        name: 'Niewidoczna',
                        description: 'Link dostępny, ale galeria nie pojawia się w wyszukiwarkach',
                        icon: LinkIcon
                      },
                      {
                        id: 'public',
                        name: 'Publiczna',
                        description: 'Widoczna dla wszystkich w internecie',
                        icon: GlobeAltIcon
                      }
                    ].map((privacy) => (
                      <button
                        key={privacy.id}
                        onClick={() => updateFormData({ privacy: privacy.id as any })}
                        className={`w-full p-4 rounded-xl border-2 transition-all text-left ${
                          formData.privacy === privacy.id
                            ? 'border-indigo-500 bg-indigo-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <privacy.icon className="w-6 h-6 text-gray-400 mt-1" />
                          <div className="flex-1">
                            <div className="flex items-center space-x-2">
                              <h3 className="font-medium text-gray-900">{privacy.name}</h3>
                              {privacy.recommended && (
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full">
                                  Polecane
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mt-1">{privacy.description}</p>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Tagi (opcjonalnie)
                  </label>
                  <div className="flex flex-wrap gap-2 mb-3">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          onClick={() => removeTag(tag)}
                          className="ml-2 text-indigo-500 hover:text-indigo-700"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {['wesele', 'ślub', 'urodziny', 'firmowe', 'rodzinne', 'studniówka'].map((suggestedTag) => (
                      !formData.tags.includes(suggestedTag) && (
                        <button
                          key={suggestedTag}
                          onClick={() => addTag(suggestedTag)}
                          className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-sm hover:bg-gray-200 transition-colors"
                        >
                          + {suggestedTag}
                        </button>
                      )
                    ))}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(1)}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Wstecz
                </button>
                <button
                  onClick={() => canProceedToStep3 && setStep(3)}
                  disabled={!canProceedToStep3}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    canProceedToStep3
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Dalej
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Ustawienia zaawansowane */}
          {step === 3 && (
            <div className="p-8">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Ustawienia zaawansowane</h2>
                <p className="text-gray-600">Skonfiguruj jak goście będą korzystać z galerii</p>
              </div>

              <div className="space-y-6 mb-8">
                
                {/* Guest Upload Settings */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Uploady gości</h3>
                  
                  <div className="space-y-4">
                    {/* Allow Guest Uploads */}
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-gray-900">Pozwól gościom wrzucać zdjęcia</h4>
                        <p className="text-sm text-gray-600">Goście mogą dodawać własne zdjęcia przez QR kod</p>
                      </div>
                      <button
                        onClick={() => updateFormData({ allowGuestUploads: !formData.allowGuestUploads })}
                        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                          formData.allowGuestUploads ? 'bg-indigo-600' : 'bg-gray-200'
                        }`}
                      >
                        <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                          formData.allowGuestUploads ? 'translate-x-5' : 'translate-x-0'
                        }`} />
                      </button>
                    </div>

                    {/* Require Guest Info */}
                    {formData.allowGuestUploads && (
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Wymagaj imienia od gości</h4>
                          <p className="text-sm text-gray-600">Goście muszą podać imię przed uploadem</p>
                        </div>
                        <button
                          onClick={() => updateFormData({ requireGuestInfo: !formData.requireGuestInfo })}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                            formData.requireGuestInfo ? 'bg-indigo-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                            formData.requireGuestInfo ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    )}

                    {/* Moderate Photos */}
                    {formData.allowGuestUploads && (
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">Moderuj zdjęcia</h4>
                          <p className="text-sm text-gray-600">Zdjęcia wymagają Twojej akceptacji przed publikacją</p>
                        </div>
                        <button
                          onClick={() => updateFormData({ moderatePhotos: !formData.moderatePhotos })}
                          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out ${
                            formData.moderatePhotos ? 'bg-indigo-600' : 'bg-gray-200'
                          }`}
                        >
                          <span className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
                            formData.moderatePhotos ? 'translate-x-5' : 'translate-x-0'
                          }`} />
                        </button>
                      </div>
                    )}

                    {/* Photo Limit */}
                    {formData.allowGuestUploads && (
                      <div>
                        <h4 className="font-medium text-gray-900 mb-2">Limit zdjęć na gościa</h4>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => updateFormData({ maxPhotosPerGuest: null })}
                            className={`px-4 py-2 rounded-lg border transition-colors ${
                              formData.maxPhotosPerGuest === null
                                ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                : 'border-gray-300 text-gray-700 hover:border-gray-400'
                            }`}
                          >
                            Bez limitu
                          </button>
                          {[5, 10, 15, 20, 25].map((limit) => (
                            <button
                              key={limit}
                              onClick={() => updateFormData({ maxPhotosPerGuest: limit })}
                              className={`px-4 py-2 rounded-lg border transition-colors ${
                                formData.maxPhotosPerGuest === limit
                                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                                  : 'border-gray-300 text-gray-700 hover:border-gray-400'
                              }`}
                            >
                              {limit}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Summary */}
                <div className="bg-indigo-50 rounded-xl p-6 border border-indigo-200">
                  <h3 className="text-lg font-semibold text-indigo-900 mb-3">Podsumowanie</h3>
                  <div className="space-y-2 text-sm text-indigo-800">
                    <div><strong>Nazwa:</strong> {formData.name}</div>
                    <div><strong>Typ:</strong> {templates.find(t => t.id === formData.template)?.name}</div>
                    <div><strong>Data:</strong> {formData.eventDate}</div>
                    <div><strong>Prywatność:</strong> {
                      formData.privacy === 'private' ? 'Prywatna' :
                      formData.privacy === 'unlisted' ? 'Niewidoczna' : 'Publiczna'
                    }</div>
                    <div><strong>Upload gości:</strong> {formData.allowGuestUploads ? 'Włączone' : 'Wyłączone'}</div>
                    {formData.allowGuestUploads && (
                      <>
                        <div><strong>Moderacja:</strong> {formData.moderatePhotos ? 'Włączona' : 'Wyłączona'}</div>
                        <div><strong>Limit zdjęć:</strong> {formData.maxPhotosPerGuest ? `${formData.maxPhotosPerGuest} na osobę` : 'Bez limitu'}</div>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <div className="flex justify-between">
                <button
                  onClick={() => setStep(2)}
                  className="px-8 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  Wstecz
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!canSubmit}
                  className={`px-8 py-3 rounded-xl font-medium transition-all ${
                    canSubmit
                      ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Stwórz galerię
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
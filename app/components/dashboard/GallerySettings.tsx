'use client';

import { useState } from 'react';
import { 
  Cog6ToothIcon,
  ShieldCheckIcon,
  EyeIcon,
  EyeSlashIcon,
  UserIcon,
  CloudArrowDownIcon,
  PhotoIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface GallerySettings {
  // Privacy & Access
  isPublic: boolean;
  allowGuestDownloads: boolean;
  requireNameForUploads: boolean;
  requireEmailForUploads: boolean;
  moderateUploads: boolean;
  
  // Upload Settings
  maxPhotosPerGuest: number | null;
  allowedFileTypes: string[];
  maxFileSize: number; // MB
  
  // Display Settings
  showUploadedBy: boolean;
  allowComments: boolean;
  autoApprovePhotos: boolean;
  
  // Notifications
  emailOnNewPhotos: boolean;
  emailOnDownloads: boolean;
}

export default function GallerySettings() {
  const [settings, setSettings] = useState<GallerySettings>({
    // Privacy & Access
    isPublic: false,
    allowGuestDownloads: true,
    requireNameForUploads: true,
    requireEmailForUploads: false,
    moderateUploads: false,
    
    // Upload Settings
    maxPhotosPerGuest: null,
    allowedFileTypes: ['jpg', 'jpeg', 'png', 'heic'],
    maxFileSize: 10,
    
    // Display Settings
    showUploadedBy: true,
    allowComments: false,
    autoApprovePhotos: true,
    
    // Notifications
    emailOnNewPhotos: true,
    emailOnDownloads: false,
  });

  const [saved, setSaved] = useState(false);

  const updateSetting = (key: keyof GallerySettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    // Tu będzie API call do zapisania ustawień
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
    console.log('Settings saved:', settings);
  };

  const ToggleSwitch = ({ 
    enabled, 
    onChange, 
    label, 
    description 
  }: { 
    enabled: boolean; 
    onChange: (value: boolean) => void;
    label: string;
    description?: string;
  }) => (
    <div className="flex items-start justify-between py-4">
      <div className="flex-1">
        <h4 className="font-semibold text-gray-900">{label}</h4>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
      <button
        onClick={() => onChange(!enabled)}
        className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ml-4 ${
          enabled ? 'bg-indigo-600' : 'bg-gray-200'
        }`}
      >
        <span
          className={`pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition duration-200 ease-in-out ${
            enabled ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6">
      
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
          Ustawienia <span className="bg-linear-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">galerii</span>
        </h1>
        <p className="text-lg text-gray-600">
          Kontroluj kto ma dostęp do Twojej galerii i jak może z niej korzystać
        </p>
      </div>

      <div className="space-y-8">
        
        {/* Privacy & Access Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
              <ShieldCheckIcon className="w-5 h-5 text-blue-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Prywatność i dostęp</h2>
          </div>

          <div className="space-y-1 divide-y divide-gray-100">
            <ToggleSwitch
              enabled={settings.isPublic}
              onChange={(value) => updateSetting('isPublic', value)}
              label="Publiczna galeria"
              description="Galeria dostępna bez linku dla wszystkich w internecie"
            />
            
            <ToggleSwitch
              enabled={settings.allowGuestDownloads}
              onChange={(value) => updateSetting('allowGuestDownloads', value)}
              label="Goście mogą pobierać zdjęcia"
              description="Pozwól gościom pobierać całą galerię lub pojedyncze zdjęcia"
            />
            
            <ToggleSwitch
              enabled={settings.requireNameForUploads}
              onChange={(value) => updateSetting('requireNameForUploads', value)}
              label="Wymagaj imienia przy uploadzie"
              description="Goście muszą podać imię przed wrzuceniem zdjęć"
            />
            
            <ToggleSwitch
              enabled={settings.requireEmailForUploads}
              onChange={(value) => updateSetting('requireEmailForUploads', value)}
              label="Wymagaj emaila przy uploadzie"
              description="Goście muszą podać adres email (dla powiadomień)"
            />
            
            <ToggleSwitch
              enabled={settings.moderateUploads}
              onChange={(value) => updateSetting('moderateUploads', value)}
              label="Moderacja zdjęć"
              description="Wszystkie zdjęcia wymagają Twojej akceptacji przed publikacją"
            />
          </div>

          {!settings.isPublic && (
            <div className="mt-4 p-4 bg-green-50 rounded-xl border border-green-200">
              <div className="flex items-start space-x-2">
                <CheckIcon className="w-5 h-5 text-green-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-green-900">Galeria prywatna</h4>
                  <p className="text-sm text-green-700">
                    Dostęp tylko dla osób z linkiem lub kodem QR
                  </p>
                </div>
              </div>
            </div>
          )}

          {settings.isPublic && (
            <div className="mt-4 p-4 bg-yellow-50 rounded-xl border border-yellow-200">
              <div className="flex items-start space-x-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-semibold text-yellow-900">Uwaga: Galeria publiczna</h4>
                  <p className="text-sm text-yellow-700">
                    Każdy będzie mógł znaleźć Twoją galerię w wyszukiwarce
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Upload Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-purple-100 rounded-xl flex items-center justify-center">
              <PhotoIcon className="w-5 h-5 text-purple-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Ustawienia uploadu</h2>
          </div>

          <div className="space-y-6">
            
            {/* Max photos per guest */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maksymalnie zdjęć na gościa
              </label>
              <div className="flex items-center space-x-4">
                <input
                  type="checkbox"
                  checked={settings.maxPhotosPerGuest !== null}
                  onChange={(e) => updateSetting('maxPhotosPerGuest', e.target.checked ? 10 : null)}
                  className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-700">Ustaw limit</span>
                {settings.maxPhotosPerGuest !== null && (
                  <input
                    type="number"
                    value={settings.maxPhotosPerGuest}
                    onChange={(e) => updateSetting('maxPhotosPerGuest', parseInt(e.target.value))}
                    min="1"
                    max="100"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                )}
              </div>
              <p className="text-sm text-gray-600 mt-1">
                {settings.maxPhotosPerGuest 
                  ? `Każdy gość może dodać maksymalnie ${settings.maxPhotosPerGuest} zdjęć`
                  : 'Brak limitu - goście mogą dodawać nieograniczoną ilość zdjęć'
                }
              </p>
            </div>

            {/* Max file size */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Maksymalny rozmiar pliku (MB)
              </label>
              <select
                value={settings.maxFileSize}
                onChange={(e) => updateSetting('maxFileSize', parseInt(e.target.value))}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value={5}>5 MB</option>
                <option value={10}>10 MB</option>
                <option value={20}>20 MB</option>
                <option value={50}>50 MB</option>
              </select>
            </div>

            {/* Allowed file types */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Dozwolone typy plików
              </label>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { value: 'jpg', label: 'JPG/JPEG' },
                  { value: 'png', label: 'PNG' },
                  { value: 'heic', label: 'HEIC (iPhone)' },
                  { value: 'raw', label: 'RAW' }
                ].map((type) => (
                  <label key={type.value} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={settings.allowedFileTypes.includes(type.value)}
                      onChange={(e) => {
                        if (e.target.checked) {
                          updateSetting('allowedFileTypes', [...settings.allowedFileTypes, type.value]);
                        } else {
                          updateSetting('allowedFileTypes', settings.allowedFileTypes.filter(t => t !== type.value));
                        }
                      }}
                      className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <span className="text-gray-700">{type.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Display Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
              <EyeIcon className="w-5 h-5 text-green-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Wyświetlanie</h2>
          </div>

          <div className="space-y-1 divide-y divide-gray-100">
            <ToggleSwitch
              enabled={settings.showUploadedBy}
              onChange={(value) => updateSetting('showUploadedBy', value)}
              label="Pokazuj kto dodał zdjęcie"
              description="Wyświetlaj imię osoby która wrzuciła zdjęcie"
            />
            
            <ToggleSwitch
              enabled={settings.allowComments}
              onChange={(value) => updateSetting('allowComments', value)}
              label="Komentarze pod zdjęciami"
              description="Goście mogą dodawać komentarze do zdjęć"
            />
            
            <ToggleSwitch
              enabled={settings.autoApprovePhotos}
              onChange={(value) => updateSetting('autoApprovePhotos', value)}
              label="Automatyczna publikacja"
              description="Zdjęcia pojawiają się od razu bez moderacji"
            />
          </div>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-orange-100 rounded-xl flex items-center justify-center">
              <ClockIcon className="w-5 h-5 text-orange-600" />
            </div>
            <h2 className="text-xl font-bold text-gray-900">Powiadomienia</h2>
          </div>

          <div className="space-y-1 divide-y divide-gray-100">
            <ToggleSwitch
              enabled={settings.emailOnNewPhotos}
              onChange={(value) => updateSetting('emailOnNewPhotos', value)}
              label="Email przy nowych zdjęciach"
              description="Otrzymuj powiadomienia gdy goście dodają zdjęcia"
            />
            
            <ToggleSwitch
              enabled={settings.emailOnDownloads}
              onChange={(value) => updateSetting('emailOnDownloads', value)}
              label="Email przy pobraniach"
              description="Otrzymuj powiadomienia gdy ktoś pobiera galerię"
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSave}
            disabled={saved}
            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 ${
              saved
                ? 'bg-green-500 text-white'
                : 'bg-linear-to-r from-indigo-600 to-purple-600 text-white hover:shadow-lg transform hover:-translate-y-1'
            }`}
          >
            {saved ? (
              <span className="flex items-center">
                <CheckIcon className="w-5 h-5 mr-2" />
                Zapisane!
              </span>
            ) : (
              'Zapisz ustawienia'
            )}
          </button>
        </div>

        {/* Info Box */}
        <div className="bg-linear-to-r from-blue-50 to-indigo-50 rounded-3xl p-6 border border-blue-200">
          <h3 className="font-bold text-gray-900 mb-2">💡 Wskazówki</h3>
          <ul className="space-y-1 text-sm text-gray-700">
            <li>• <strong>Moderacja:</strong> Włącz jeśli chcesz kontrolować wszystkie zdjęcia</li>
            <li>• <strong>Wymóg imienia:</strong> Pomaga identyfikować kto dodał zdjęcia</li>
            <li>• <strong>Limit zdjęć:</strong> Użyteczny przy dużych wydarzeniach</li>
            <li>• <strong>Powiadomienia:</strong> Bądź na bieżąco z aktywnością w galerii</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
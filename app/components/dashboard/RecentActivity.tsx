'use client';

import { 
  PhotoIcon,
  UserGroupIcon,
  ChartBarIcon,
  ExclamationTriangleIcon,
  Cog6ToothIcon
} from '@heroicons/react/24/outline';

interface ActivityItem {
  id: string;
  type: 'photo_upload' | 'user_joined' | 'gallery_downloaded' | 'comment_added';
  userName: string;
  action: string;
  timestamp: string;
  details?: string;
}

interface RecentActivityProps {
  activities?: ActivityItem[];
  requireNameEnabled: boolean;
  onSettingsClick?: () => void;
}

const mockActivities: ActivityItem[] = [
  {
    id: '1',
    type: 'photo_upload',
    userName: 'Anna K.',
    action: 'dodała 12 zdjęć',
    timestamp: '2 godziny temu'
  },
  {
    id: '2', 
    type: 'user_joined',
    userName: 'Tomek M.',
    action: 'dołączył do galerii',
    timestamp: '5 godzin temu'
  },
  {
    id: '3',
    type: 'gallery_downloaded',
    userName: 'Kasia P.',
    action: 'pobrała galerię',
    timestamp: '1 dzień temu'
  },
  {
    id: '4',
    type: 'comment_added',
    userName: 'Marek S.',
    action: 'dodał komentarz do zdjęcia',
    timestamp: '2 dni temu'
  }
];

export default function RecentActivity({ 
  activities = mockActivities,
  requireNameEnabled = true,
  onSettingsClick 
}: RecentActivityProps) {

  const getActivityIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case 'photo_upload':
        return {
          icon: PhotoIcon,
          bgColor: 'bg-blue-100',
          iconColor: 'text-blue-600'
        };
      case 'user_joined':
        return {
          icon: UserGroupIcon,
          bgColor: 'bg-green-100', 
          iconColor: 'text-green-600'
        };
      case 'gallery_downloaded':
        return {
          icon: ChartBarIcon,
          bgColor: 'bg-purple-100',
          iconColor: 'text-purple-600'
        };
      case 'comment_added':
        return {
          icon: PhotoIcon,
          bgColor: 'bg-orange-100',
          iconColor: 'text-orange-600'
        };
      default:
        return {
          icon: PhotoIcon,
          bgColor: 'bg-gray-100',
          iconColor: 'text-gray-600'
        };
    }
  };

  if (!requireNameEnabled) {
    return (
      <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Ostatnia aktywność</h3>
        
        {/* Disabled State */}
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <ExclamationTriangleIcon className="w-8 h-8 text-amber-600" />
          </div>
          
          <h4 className="text-lg font-semibold text-gray-900 mb-2">
            Aktywność jest niedostępna
          </h4>
          
          <p className="text-gray-600 mb-6 max-w-md mx-auto">
            Aby wyświetlić aktywność użytkowników, musisz włączyć opcję 
            <span className="font-medium"> "Wymagaj podania imienia" </span> 
            w ustawieniach prywatności.
          </p>
          
          <button
            onClick={onSettingsClick}
            className="inline-flex items-center px-6 py-3 bg-linear-to-r from-indigo-500 to-purple-500 text-white font-medium rounded-xl hover:from-indigo-600 hover:to-purple-600 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
          >
            <Cog6ToothIcon className="w-5 h-5 mr-2" />
            Przejdź do ustawień
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-8 bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold text-gray-900">Ostatnia aktywność</h3>
        
        {/* Activity indicator */}
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-600">Na żywo</span>
        </div>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => {
          const iconConfig = getActivityIcon(activity.type);
          const IconComponent = iconConfig.icon;
          
          return (
            <div 
              key={activity.id}
              className="flex items-center space-x-4 p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200"
            >
              <div className={`w-10 h-10 ${iconConfig.bgColor} rounded-full flex items-center justify-center`}>
                <IconComponent className={`w-5 h-5 ${iconConfig.iconColor}`} />
              </div>
              
              <div className="flex-1">
                <p className="font-medium text-gray-900">
                  <span className="text-indigo-600 font-semibold">{activity.userName}</span>
                  {' '}
                  {activity.action}
                </p>
                <div className="flex items-center space-x-4 mt-1">
                  <p className="text-sm text-gray-600">{activity.timestamp}</p>
                  {activity.details && (
                    <>
                      <span className="text-gray-300">•</span>
                      <p className="text-sm text-gray-500">{activity.details}</p>
                    </>
                  )}
                </div>
              </div>
              
              {/* Activity type badge */}
              <div className="hidden sm:block">
                <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                  activity.type === 'photo_upload' 
                    ? 'bg-blue-100 text-blue-800'
                    : activity.type === 'user_joined'
                    ? 'bg-green-100 text-green-800' 
                    : activity.type === 'gallery_downloaded'
                    ? 'bg-purple-100 text-purple-800'
                    : 'bg-orange-100 text-orange-800'
                }`}>
                  {activity.type === 'photo_upload' && 'Zdjęcia'}
                  {activity.type === 'user_joined' && 'Nowy użytkownik'}
                  {activity.type === 'gallery_downloaded' && 'Pobieranie'}
                  {activity.type === 'comment_added' && 'Komentarz'}
                </span>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Show more button */}
      {activities.length > 0 && (
        <div className="mt-6 text-center">
          <button className="text-indigo-600 hover:text-indigo-800 font-medium text-sm transition-colors">
            Zobacz więcej aktywności →
          </button>
        </div>
      )}
    </div>
  );
}
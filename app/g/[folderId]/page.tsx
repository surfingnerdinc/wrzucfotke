'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { 
  PhotoIcon,
  CloudArrowUpIcon,
  ArrowDownIcon,
  HeartIcon,
  EyeIcon,
  ShareIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';

interface GalleryPhoto {
  id: string;
  url: string;
  thumbnail: string;
  filename: string;
  uploadedBy?: string;
  uploadedAt: string;
  size: number;
}

interface GalleryInfo {
  id: string;
  name: string;
  description?: string;
  eventDate?: string;
  coverImage?: string;
  totalPhotos: number;
  isPublic: boolean;
  allowUploads: boolean;
  settings: {
    requireGuestName: boolean;
    moderateUploads: boolean;
    maxPhotosPerGuest?: number;
    downloadEnabled: boolean;
  };
}

export default function GuestGalleryPage() {
  const { folderId } = useParams();
  const [gallery, setGallery] = useState<GalleryInfo | null>(null);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [selectedPhoto, setSelectedPhoto] = useState<GalleryPhoto | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Mock data for development
  const mockGallery: GalleryInfo = {
    id: folderId as string,
    name: "Wesele Ania & Tomek 💕",
    description: "Dziel się swoimi najpiękniejszymi zdjęciami z naszego wielkiego dnia!",
    eventDate: "14 grudnia 2025",
    coverImage: "/api/placeholder/800/600",
    totalPhotos: 247,
    isPublic: true,
    allowUploads: true,
    settings: {
      requireGuestName: true,
      moderateUploads: false,
      maxPhotosPerGuest: 10,
      downloadEnabled: true
    }
  };

  const mockPhotos: GalleryPhoto[] = Array.from({ length: 12 }, (_, i) => ({
    id: `photo-${i + 1}`,
    url: `/api/placeholder/800/600?random=${i + 1}`,
    thumbnail: `/api/placeholder/300/300?random=${i + 1}`,
    filename: `IMG_${String(i + 1).padStart(4, '0')}.jpg`,
    uploadedBy: i % 3 === 0 ? 'Anna K.' : i % 3 === 1 ? 'Tomek M.' : 'Goś weselny',
    uploadedAt: new Date(2025, 9, 30 - i).toISOString(),
    size: 2400000 + Math.random() * 1000000
  }));

  useEffect(() => {
    const loadGallery = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/gallery/public/${folderId}`);
        
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Błąd podczas ładowania galerii');
        }
        
        const data = await response.json();
        setGallery(data.gallery);
        setPhotos(data.photos);
      } catch (err) {
        console.error('Gallery loading error:', err);
        setError(
          err instanceof Error 
            ? err.message 
            : 'Nie udało się załadować galerii. Sprawdź czy link jest poprawny.'
        );
      } finally {
        setLoading(false);
      }
    };

    if (folderId) {
      loadGallery();
    }
  }, [folderId]);

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('pl-PL', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const trackAction = async (action: string, data?: any) => {
    try {
      await fetch(`/api/gallery/public/${folderId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ action, data }),
      });
    } catch (error) {
      console.error('Error tracking action:', error);
    }
  };

  const handlePhotoClick = (photo: GalleryPhoto) => {
    setSelectedPhoto(photo);
    trackAction('view_photo', { photoId: photo.id });
  };

  const handleDownload = (photo: GalleryPhoto) => {
    trackAction('download_photo', { photoId: photo.id });
    // TODO: Implement actual download logic
  };

  const handleShare = () => {
    trackAction('share_gallery');
    
    if (navigator.share) {
      navigator.share({
        title: gallery?.name || 'Galeria zdjęć',
        text: gallery?.description || 'Zobacz zdjęcia z wydarzenia',
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href).then(() => {
        alert('Link skopiowany do schowka!');
      });
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <PhotoIcon className="w-8 h-8 text-white" />
          </div>
          <div className="text-lg font-medium text-gray-900 mb-2">Ładowanie galerii...</div>
          <div className="text-sm text-gray-500">Proszę czekać</div>
        </div>
      </div>
    );
  }

  if (error || !gallery) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center p-8">
          <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
            <XMarkIcon className="w-8 h-8 text-red-600" />
          </div>
          <div className="text-lg font-medium text-gray-900 mb-2">Ups! Coś poszło nie tak</div>
          <div className="text-sm text-gray-500 mb-6">
            {error || 'Galeria nie została znaleziona lub jest niedostępna.'}
          </div>
          <button 
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
          >
            Spróbuj ponownie
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-12 h-12 bg-linear-to-r from-indigo-600 to-purple-600 rounded-2xl flex items-center justify-center mr-3">
                <HeartIcon className="w-6 h-6 text-white" />
              </div>
              <div className="text-sm text-gray-500 font-medium">WrzućFotkę.pl</div>
            </div>
            
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{gallery.name}</h1>
            
            {gallery.description && (
              <p className="text-gray-600 mb-4 max-w-2xl mx-auto">{gallery.description}</p>
            )}
            
            <div className="flex items-center justify-center space-x-6 text-sm text-gray-500">
              <div className="flex items-center">
                <PhotoIcon className="w-4 h-4 mr-1" />
                {gallery.totalPhotos} zdjęć
              </div>
              {gallery.eventDate && (
                <div className="flex items-center">
                  <HeartIcon className="w-4 h-4 mr-1" />
                  {gallery.eventDate}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Pokazano {photos.length} z {gallery.totalPhotos} zdjęć
            </div>
            
            <div className="flex items-center space-x-3">
              {gallery.allowUploads && (
                <button
                  onClick={() => setShowUploadModal(true)}
                  className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
                >
                  <CloudArrowUpIcon className="w-4 h-4" />
                  <span>Dodaj zdjęcia</span>
                </button>
              )}
              
              <button 
                onClick={handleShare}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors"
              >
                <ShareIcon className="w-4 h-4" />
                <span>Udostępnij</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Photo Grid */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
        {photos.length === 0 ? (
          <div className="text-center py-16">
            <PhotoIcon className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Brak zdjęć</h3>
            <p className="text-gray-500 mb-6">Ta galeria nie zawiera jeszcze żadnych zdjęć.</p>
            {gallery.allowUploads && (
              <button
                onClick={() => setShowUploadModal(true)}
                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors font-medium"
              >
                Dodaj pierwsze zdjęcie
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {photos.map((photo) => (
              <div key={photo.id} className="group relative">
                <div 
                  className="aspect-square bg-gray-200 rounded-2xl overflow-hidden cursor-pointer transform transition-transform group-hover:scale-105"
                  onClick={() => handlePhotoClick(photo)}
                >
                  <img
                    src={photo.thumbnail}
                    alt={photo.filename}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all flex items-center justify-center">
                    <EyeIcon className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
                
                {/* Photo Info */}
                <div className="mt-3 px-1">
                  <div className="text-xs text-gray-500 truncate">{photo.filename}</div>
                  {photo.uploadedBy && (
                    <div className="text-xs text-gray-400 mt-1">przez {photo.uploadedBy}</div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Photo Modal */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl max-h-full">
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute -top-12 right-0 w-10 h-10 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
            
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.filename}
              className="max-w-full max-h-full object-contain rounded-lg"
            />
            
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4 rounded-b-lg">
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium">{selectedPhoto.filename}</div>
                  <div className="text-sm text-gray-300">
                    {selectedPhoto.uploadedBy && `przez ${selectedPhoto.uploadedBy} • `}
                    {formatDate(selectedPhoto.uploadedAt)} • {formatFileSize(selectedPhoto.size)}
                  </div>
                </div>
                
                {gallery.settings.downloadEnabled && (
                  <button 
                    onClick={() => handleDownload(selectedPhoto)}
                    className="flex items-center space-x-2 px-4 py-2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-lg transition-colors"
                  >
                    <ArrowDownIcon className="w-4 h-4" />
                    <span>Pobierz</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Upload Modal Placeholder */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl p-6 max-w-md w-full">
            <h3 className="text-lg font-semibold mb-4">Dodaj zdjęcia</h3>
            <p className="text-gray-600 mb-6">Funkcja uploadu zostanie wkrótce zaimplementowana w kolejnym kroku.</p>
            <button
              onClick={() => setShowUploadModal(false)}
              className="w-full px-4 py-3 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-colors font-medium"
            >
              Zamknij
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="bg-white border-t border-gray-200 mt-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-8 h-8 bg-linear-to-r from-indigo-600 to-purple-600 rounded-lg flex items-center justify-center mr-2">
              <HeartIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-lg font-bold text-gray-900">WrzućFotkę.pl</span>
          </div>
          <p className="text-sm text-gray-500">
            Stwórz swoją własną galerię zdjęć na{' '}
            <a href="/" className="text-indigo-600 hover:text-indigo-700 font-medium">
              WrzućFotkę.pl
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
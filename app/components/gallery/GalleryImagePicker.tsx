'use client';

import { useState, useEffect } from 'react';
import { 
  PhotoIcon,
  MagnifyingGlassIcon,
  XMarkIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

interface GalleryImage {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  uploadedBy: string;
  tags: string[];
}

interface GalleryImagePickerProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (imageUrl: string) => void;
}

export default function GalleryImagePicker({ isOpen, onClose, onSelectImage }: GalleryImagePickerProps) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Generate mock gallery images
  useEffect(() => {
    if (isOpen) {
      setLoading(true);
      // Simulate API call
      setTimeout(() => {
        const mockImages: GalleryImage[] = [];
        const names = ['Anna K.', 'Tomek M.', 'Kasia P.', 'Marek S.', 'Ola W.'];
        const tags = ['ceremonia', 'wesele', 'tort', 'taniec', 'rodzina', 'bukiet', 'obrączki'];
        
        for (let i = 1; i <= 24; i++) {
          const width = 800 + (i % 200);
          const height = 600 + (i % 150);
          
          mockImages.push({
            id: `gallery-${i}`,
            url: `https://picsum.photos/${width}/${height}?random=${i + 100}`,
            thumbnailUrl: `https://picsum.photos/300/200?random=${i + 100}`,
            title: `Zdjęcie z galerii ${i}`,
            uploadedBy: names[Math.floor(Math.random() * names.length)],
            tags: tags.slice(0, Math.floor(Math.random() * 3) + 1)
          });
        }
        
        setImages(mockImages);
        setLoading(false);
      }, 500);
    }
  }, [isOpen]);

  const filteredImages = images.filter(image => 
    image.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    image.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSelectImage = () => {
    if (selectedImage) {
      const image = images.find(img => img.id === selectedImage);
      if (image) {
        onSelectImage(image.url);
        onClose();
        setSelectedImage(null);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Wybierz zdjęcie z galerii</h2>
              <p className="text-sm text-gray-500 mt-1">
                🔒 Bezpieczne przetwarzanie - tylko zdjęcia z naszej galerii
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
          
          {/* Search */}
          <div className="relative">
            <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              placeholder="Szukaj zdjęć..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>

        {/* Gallery Grid */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="aspect-4/3 bg-gray-200 rounded-lg animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {filteredImages.map((image) => (
                <div
                  key={image.id}
                  onClick={() => setSelectedImage(image.id)}
                  className={`relative aspect-4/3 rounded-lg overflow-hidden cursor-pointer border-2 transition-all ${
                    selectedImage === image.id 
                      ? 'border-indigo-500 ring-2 ring-indigo-200' 
                      : 'border-transparent hover:border-gray-300'
                  }`}
                >
                  <img
                    src={image.thumbnailUrl}
                    alt={image.title}
                    className="w-full h-full object-cover"
                  />
                  
                  {selectedImage === image.id && (
                    <div className="absolute inset-0 bg-indigo-500 bg-opacity-20 flex items-center justify-center">
                      <div className="bg-indigo-500 rounded-full p-2">
                        <CheckIcon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  )}
                  
                  <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-60 text-white p-2">
                    <p className="text-sm font-medium truncate">{image.title}</p>
                    <p className="text-xs text-gray-300">{image.uploadedBy}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {!loading && filteredImages.length === 0 && (
            <div className="text-center py-12">
              <PhotoIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">Nie znaleziono zdjęć</p>
              <p className="text-gray-400">Spróbuj użyć innych słów kluczowych</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50">
          <div className="flex justify-between items-center">
            <p className="text-sm text-gray-500">
              {selectedImage ? 'Wybrano zdjęcie' : 'Kliknij na zdjęcie, aby je wybrać'}
            </p>
            
            <div className="flex space-x-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Anuluj
              </button>
              <button
                onClick={handleSelectImage}
                disabled={!selectedImage}
                className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                Użyj zdjęcia
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
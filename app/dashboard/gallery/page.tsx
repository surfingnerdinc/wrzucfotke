'use client';

import { useState, useEffect } from 'react';
import { 
  PhotoIcon,
  HeartIcon,
  ShareIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
  Squares2X2Icon,
  ListBulletIcon,
  EyeIcon,
  TrashIcon,
  PlusIcon
} from '@heroicons/react/24/outline';
import { 
  HeartIcon as HeartIconSolid,
  PhotoIcon as PhotoIconSolid
} from '@heroicons/react/24/solid';

interface Photo {
  id: string;
  url: string;
  thumbnailUrl: string;
  title: string;
  uploadedBy: string;
  uploadedAt: string;
  likes: number;
  downloads: number;
  isLiked: boolean;
  tags: string[];
  size: {
    width: number;
    height: number;
    fileSize: string;
  };
}

interface GalleryStats {
  totalPhotos: number;
  totalLikes: number;
  totalDownloads: number;
  totalContributors: number;
}

export default function GalleryPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'most-liked' | 'most-downloaded'>('newest');
  const [filterBy, setFilterBy] = useState<'all' | 'liked' | 'my-photos'>('all');

  // Mock gallery stats
  const stats: GalleryStats = {
    totalPhotos: 247,
    totalLikes: 1543,
    totalDownloads: 89,
    totalContributors: 43
  };

  // Generate mock photos using Lorem Picsum
  useEffect(() => {
    const generateMockPhotos = (): Photo[] => {
      const mockPhotos: Photo[] = [];
      const names = ['Anna K.', 'Tomek M.', 'Kasia P.', 'Marek S.', 'Ola W.', 'Piotr L.', 'Maja R.', 'Adam Z.'];
      const tags = ['ceremonia', 'wesele', 'tort', 'taniec', 'rodzina', 'przyjaciele', 'bukiet', 'obrączki', 'pierwszy taniec', 'zabawy'];
      
      for (let i = 1; i <= 48; i++) {
        const width = 800 + (i % 200);
        const height = 600 + (i % 150);
        const uploadedBy = names[Math.floor(Math.random() * names.length)];
        const photoTags = tags.slice(0, Math.floor(Math.random() * 4) + 1);
        const uploadDate = new Date();
        uploadDate.setHours(uploadDate.getHours() - Math.floor(Math.random() * 72));

        mockPhotos.push({
          id: `photo-${i}`,
          url: `https://picsum.photos/${width}/${height}?random=${i}`,
          thumbnailUrl: `https://picsum.photos/400/300?random=${i}`,
          title: `Zdjęcie ${i}`,
          uploadedBy,
          uploadedAt: uploadDate.toISOString(),
          likes: Math.floor(Math.random() * 50) + 1,
          downloads: Math.floor(Math.random() * 20),
          isLiked: Math.random() > 0.7,
          tags: photoTags,
          size: {
            width,
            height,
            fileSize: `${(Math.random() * 5 + 1).toFixed(1)} MB`
          }
        });
      }
      
      return mockPhotos;
    };

    // Simulate loading delay
    setTimeout(() => {
      setPhotos(generateMockPhotos());
      setLoading(false);
    }, 1000);
  }, []);

  // Filter and sort photos
  const filteredPhotos = photos
    .filter(photo => {
      if (filterBy === 'liked') return photo.isLiked;
      if (filterBy === 'my-photos') return photo.uploadedBy === 'Anna K.'; // Mock current user
      return true;
    })
    .filter(photo => 
      photo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.uploadedBy.toLowerCase().includes(searchTerm.toLowerCase()) ||
      photo.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .sort((a, b) => {
      switch (sortBy) {
        case 'oldest':
          return new Date(a.uploadedAt).getTime() - new Date(b.uploadedAt).getTime();
        case 'most-liked':
          return b.likes - a.likes;
        case 'most-downloaded':
          return b.downloads - a.downloads;
        case 'newest':
        default:
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime();
      }
    });

  const handlePhotoClick = (photo: Photo) => {
    setSelectedPhoto(photo);
    setCurrentPhotoIndex(filteredPhotos.findIndex(p => p.id === photo.id));
  };

  const handleNextPhoto = () => {
    if (currentPhotoIndex < filteredPhotos.length - 1) {
      const nextIndex = currentPhotoIndex + 1;
      setCurrentPhotoIndex(nextIndex);
      setSelectedPhoto(filteredPhotos[nextIndex]);
    }
  };

  const handlePrevPhoto = () => {
    if (currentPhotoIndex > 0) {
      const prevIndex = currentPhotoIndex - 1;
      setCurrentPhotoIndex(prevIndex);
      setSelectedPhoto(filteredPhotos[prevIndex]);
    }
  };

  const handleLikePhoto = (photoId: string) => {
    setPhotos(photos.map(photo => 
      photo.id === photoId 
        ? { 
            ...photo, 
            isLiked: !photo.isLiked,
            likes: photo.isLiked ? photo.likes - 1 : photo.likes + 1
          }
        : photo
    ));
    
    if (selectedPhoto && selectedPhoto.id === photoId) {
      setSelectedPhoto({
        ...selectedPhoto,
        isLiked: !selectedPhoto.isLiked,
        likes: selectedPhoto.isLiked ? selectedPhoto.likes - 1 : selectedPhoto.likes + 1
      });
    }
  };

  const handleDownload = (photo: Photo) => {
    // In real app, this would trigger download
    console.log('Downloading photo:', photo.id);
    
    // Update download count
    setPhotos(photos.map(p => 
      p.id === photo.id 
        ? { ...p, downloads: p.downloads + 1 }
        : p
    ));
  };

  const formatTimeAgo = (dateString: string) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Przed chwilą';
    if (diffInHours < 24) return `${diffInHours}h temu`;
    return `${Math.floor(diffInHours / 24)} dni temu`;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            
            {/* Title and Stats */}
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">
                Galeria zdjęć
              </h1>
              <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <PhotoIconSolid className="w-4 h-4 mr-1 text-blue-600" />
                  {stats.totalPhotos} zdjęć
                </div>
                <div className="flex items-center">
                  <HeartIconSolid className="w-4 h-4 mr-1 text-red-500" />
                  {stats.totalLikes} polubień
                </div>
                <div className="flex items-center">
                  <ArrowDownTrayIcon className="w-4 h-4 mr-1 text-green-600" />
                  {stats.totalDownloads} pobrań
                </div>
                <div className="flex items-center">
                  <div className="w-4 h-4 mr-1 bg-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white text-xs">👥</span>
                  </div>
                  {stats.totalContributors} osób
                </div>
              </div>
            </div>

            {/* Upload Button */}
            <button className="flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5">
              <PlusIcon className="w-5 h-5 mr-2" />
              Dodaj zdjęcia
            </button>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <MagnifyingGlassIcon className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Szukaj zdjęć, osób, tagów..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>

            {/* Filters and View Controls */}
            <div className="flex items-center space-x-4">
              
              {/* Filter */}
              <select 
                value={filterBy}
                onChange={(e) => setFilterBy(e.target.value as typeof filterBy)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="all">Wszystkie zdjęcia</option>
                <option value="liked">Polubione</option>
                <option value="my-photos">Moje zdjęcia</option>
              </select>

              {/* Sort */}
              <select 
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              >
                <option value="newest">Najnowsze</option>
                <option value="oldest">Najstarsze</option>
                <option value="most-liked">Najczęściej polubiane</option>
                <option value="most-downloaded">Najczęściej pobierane</option>
              </select>

              {/* View Mode */}
              <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'grid' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'
                  }`}
                >
                  <Squares2X2Icon className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded transition-colors ${
                    viewMode === 'list' ? 'bg-white shadow-sm text-indigo-600' : 'text-gray-600'
                  }`}
                >
                  <ListBulletIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Gallery Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(12)].map((_, i) => (
              <div key={i} className="aspect-square bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && filteredPhotos.length === 0 && (
          <div className="text-center py-16">
            <PhotoIcon className="w-24 h-24 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Brak zdjęć do wyświetlenia
            </h3>
            <p className="text-gray-600 mb-6">
              {searchTerm ? 'Spróbuj zmienić kryteria wyszukiwania' : 'Dodaj pierwsze zdjęcia do galerii'}
            </p>
            <button className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Dodaj zdjęcia
            </button>
          </div>
        )}

        {/* Grid View */}
        {!loading && filteredPhotos.length > 0 && viewMode === 'grid' && (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="group relative aspect-square bg-gray-100 rounded-xl overflow-hidden cursor-pointer hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                onClick={() => handlePhotoClick(photo)}
              >
                <img
                  src={photo.thumbnailUrl}
                  alt={photo.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-3 left-3 right-3">
                    <p className="text-white text-sm font-medium truncate mb-1">
                      {photo.uploadedBy}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2 text-white/80 text-xs">
                        <div className="flex items-center">
                          <HeartIcon className="w-3 h-3 mr-1" />
                          {photo.likes}
                        </div>
                        <div className="flex items-center">
                          <EyeIcon className="w-3 h-3 mr-1" />
                          {photo.downloads}
                        </div>
                      </div>
                      <div className="text-white/60 text-xs">
                        {formatTimeAgo(photo.uploadedAt)}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Like Badge */}
                {photo.isLiked && (
                  <div className="absolute top-2 right-2">
                    <HeartIconSolid className="w-6 h-6 text-red-500" />
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* List View */}
        {!loading && filteredPhotos.length > 0 && viewMode === 'list' && (
          <div className="space-y-4">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
                onClick={() => handlePhotoClick(photo)}
              >
                <div className="flex items-center space-x-4">
                  <img
                    src={photo.thumbnailUrl}
                    alt={photo.title}
                    className="w-20 h-20 object-cover rounded-lg"
                    loading="lazy"
                  />
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-lg font-semibold text-gray-900 truncate">
                        {photo.title}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center">
                          <HeartIcon className="w-4 h-4 mr-1" />
                          {photo.likes}
                        </div>
                        <div className="flex items-center">
                          <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                          {photo.downloads}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>Dodane przez {photo.uploadedBy}</span>
                        <span>•</span>
                        <span>{formatTimeAgo(photo.uploadedAt)}</span>
                        <span>•</span>
                        <span>{photo.size.fileSize}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        {photo.tags.map((tag, index) => (
                          <span
                            key={index}
                            className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      {selectedPhoto && (
        <div className="fixed inset-0 bg-black bg-opacity-90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-7xl w-full h-full flex items-center justify-center">
            
            {/* Close Button */}
            <button
              onClick={() => setSelectedPhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>

            {/* Navigation Buttons */}
            {currentPhotoIndex > 0 && (
              <button
                onClick={handlePrevPhoto}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronLeftIcon className="w-6 h-6" />
              </button>
            )}

            {currentPhotoIndex < filteredPhotos.length - 1 && (
              <button
                onClick={handleNextPhoto}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 p-3 bg-black/50 text-white rounded-full hover:bg-black/70 transition-colors"
              >
                <ChevronRightIcon className="w-6 h-6" />
              </button>
            )}

            {/* Image */}
            <div className="relative max-h-full max-w-full flex items-center justify-center">
              <img
                src={selectedPhoto.url}
                alt={selectedPhoto.title}
                className="max-h-full max-w-full object-contain"
              />
            </div>

            {/* Info Panel */}
            <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-6">
              <div className="max-w-4xl mx-auto">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-1">
                      {selectedPhoto.title}
                    </h3>
                    <p className="text-white/80">
                      Dodane przez {selectedPhoto.uploadedBy} • {formatTimeAgo(selectedPhoto.uploadedAt)}
                    </p>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <button
                      onClick={() => handleLikePhoto(selectedPhoto.id)}
                      className={`p-3 rounded-full transition-colors ${
                        selectedPhoto.isLiked 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 text-white hover:bg-white/30'
                      }`}
                    >
                      {selectedPhoto.isLiked ? (
                        <HeartIconSolid className="w-5 h-5" />
                      ) : (
                        <HeartIcon className="w-5 h-5" />
                      )}
                    </button>
                    
                    <button
                      onClick={() => handleDownload(selectedPhoto)}
                      className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors"
                    >
                      <ArrowDownTrayIcon className="w-5 h-5" />
                    </button>
                    
                    <button className="p-3 bg-white/20 text-white rounded-full hover:bg-white/30 transition-colors">
                      <ShareIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                <div className="flex items-center space-x-6 text-white/80 text-sm">
                  <div className="flex items-center">
                    <HeartIconSolid className="w-4 h-4 mr-1 text-red-500" />
                    {selectedPhoto.likes} polubień
                  </div>
                  <div className="flex items-center">
                    <ArrowDownTrayIcon className="w-4 h-4 mr-1" />
                    {selectedPhoto.downloads} pobrań
                  </div>
                  <div>
                    {selectedPhoto.size.width} × {selectedPhoto.size.height} • {selectedPhoto.size.fileSize}
                  </div>
                  <div className="flex items-center space-x-2">
                    {selectedPhoto.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-white/20 rounded text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

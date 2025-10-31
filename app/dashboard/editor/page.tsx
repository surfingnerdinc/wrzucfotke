'use client';

import { useState, useRef, useCallback } from 'react';
import { 
  PhotoIcon,
  ArrowUpTrayIcon,
  ArrowDownTrayIcon,
  XMarkIcon,
  AdjustmentsHorizontalIcon,
  SparklesIcon,
  EyeDropperIcon,
  PaintBrushIcon,
  ArrowUturnLeftIcon,
  ArrowPathIcon
} from '@heroicons/react/24/outline';
import { HeartIcon as HeartIconSolid } from '@heroicons/react/24/solid';
import GalleryImagePicker from '@/app/components/gallery/GalleryImagePicker';

interface FilterConfig {
  id: string;
  name: string;
  icon: any;
  color: string;
  description: string;
  hasIntensity: boolean;
  defaultIntensity: number;
}

interface ProcessedImage {
  url: string;
  filter: string;
  intensity: number;
}

export default function PhotoEditorPage() {
  const [originalImage, setOriginalImage] = useState<string | null>(null);
  const [processedImages, setProcessedImages] = useState<ProcessedImage[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState<string | null>(null);
  const [intensity, setIntensity] = useState(1);
  const [showGalleryPicker, setShowGalleryPicker] = useState(false);
  const [previewFilter, setPreviewFilter] = useState<string | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isGeneratingPreview, setIsGeneratingPreview] = useState(false);

  const filters: FilterConfig[] = [
    {
      id: 'blur',
      name: 'Rozmycie',
      icon: EyeDropperIcon,
      color: 'from-blue-500 to-cyan-500',
      description: 'Delikatne rozmycie dla efektu artystycznego',
      hasIntensity: true,
      defaultIntensity: 2
    },
    {
      id: 'grayscale',
      name: 'Czarno-białe',
      icon: AdjustmentsHorizontalIcon,
      color: 'from-gray-500 to-gray-700',
      description: 'Klasyczny efekt monochromatyczny',
      hasIntensity: false,
      defaultIntensity: 1
    },
    {
      id: 'sepia',
      name: 'Sepia',
      icon: PhotoIcon,
      color: 'from-amber-500 to-orange-500',
      description: 'Vintage look w odcieniach sepii',
      hasIntensity: false,
      defaultIntensity: 1
    },
    {
      id: 'brightness',
      name: 'Jasność',
      icon: SparklesIcon,
      color: 'from-yellow-400 to-orange-500',
      description: 'Regulacja jasności obrazu',
      hasIntensity: true,
      defaultIntensity: 1.2
    },
    {
      id: 'contrast',
      name: 'Kontrast',
      icon: AdjustmentsHorizontalIcon,
      color: 'from-purple-500 to-indigo-500',
      description: 'Zwiększenie kontrastu',
      hasIntensity: true,
      defaultIntensity: 1.3
    },
    {
      id: 'saturation',
      name: 'Nasycenie',
      icon: PaintBrushIcon,
      color: 'from-pink-500 to-rose-500',
      description: 'Intensywność kolorów',
      hasIntensity: true,
      defaultIntensity: 1.3
    },
    {
      id: 'vintage',
      name: 'Vintage',
      icon: HeartIconSolid,
      color: 'from-red-500 to-pink-500',
      description: 'Nostalgiczny efekt retro',
      hasIntensity: false,
      defaultIntensity: 1
    },
    {
      id: 'cool',
      name: 'Chłodny',
      icon: SparklesIcon,
      color: 'from-blue-400 to-indigo-500',
      description: 'Chłodne, niebieskie tony',
      hasIntensity: false,
      defaultIntensity: 1
    },
    {
      id: 'warm',
      name: 'Ciepły',
      icon: SparklesIcon,
      color: 'from-orange-400 to-red-500',
      description: 'Ciepłe, pomarańczowe tony',
      hasIntensity: false,
      defaultIntensity: 1
    },
    {
      id: 'sharpen',
      name: 'Wyostrzenie',
      icon: AdjustmentsHorizontalIcon,
      color: 'from-emerald-500 to-teal-500',
      description: 'Zwiększenie ostrości',
      hasIntensity: true,
      defaultIntensity: 1
    },
    {
      id: 'remove-background',
      name: 'Usuń tło',
      icon: XMarkIcon,
      color: 'from-red-500 to-pink-500',
      description: 'Usuwa tło z obrazu',
      hasIntensity: false,
      defaultIntensity: 1
    }
  ];

    const handleImageSelect = (imageUrl: string) => {
    setOriginalImage(imageUrl);
    setShowGalleryPicker(false);
    // Wyczyść poprzedni podgląd
    setPreviewImage(null);
    setPreviewFilter(null);
  };

  const generatePreview = async (filterId: string) => {
    if (!originalImage) return;

    setIsGeneratingPreview(true);
    
    try {
      const filter = filters.find(f => f.id === filterId);
      const currentIntensity = filter?.hasIntensity ? intensity : filter?.defaultIntensity || 1;

      // Convert data URL to blob
      const response = await fetch(originalImage);
      const blob = await response.blob();
      
      // Create form data
      const formData = new FormData();
      formData.append('image', blob, 'image.jpg');
      
      let processResponse;
      
      if (filterId === 'remove-background') {
        processResponse = await fetch('/api/image/remove-background', {
          method: 'POST',
          body: formData,
        });
      } else {
        formData.append('effect', filterId);
        formData.append('intensity', currentIntensity.toString());
        
        processResponse = await fetch('/api/image/process', {
          method: 'POST',
          body: formData,
        });
      }

      if (processResponse.ok) {
        const processedBlob = await processResponse.blob();
        const processedUrl = URL.createObjectURL(processedBlob);
        setPreviewImage(processedUrl);
      } else {
        console.error('Failed to generate preview');
        setPreviewImage(originalImage); // Fallback to original
      }
    } catch (error) {
      console.error('Error generating preview:', error);
      setPreviewImage(originalImage); // Fallback to original
    }

    setIsGeneratingPreview(false);
  };

  const applyFilter = async (filterId: string) => {
    if (!originalImage) return;

    setIsProcessing(true);
    setSelectedFilter(filterId);
    
    const filter = filters.find(f => f.id === filterId);
    const currentIntensity = filter?.hasIntensity ? intensity : filter?.defaultIntensity || 1;

    try {
      // Convert data URL to blob
      const response = await fetch(originalImage);
      const blob = await response.blob();
      
      // Create form data
      const formData = new FormData();
      formData.append('image', blob);
      
      let processResponse;
      
      if (filterId === 'remove-background') {
        // Use background removal API
        processResponse = await fetch('/api/image/remove-background', {
          method: 'POST',
          body: formData,
        });
      } else {
        // Use regular image processing API
        formData.append('effect', filterId);
        formData.append('intensity', currentIntensity.toString());
        
        processResponse = await fetch('/api/image/process', {
          method: 'POST',
          body: formData,
        });
      }

      if (processResponse.ok) {
        const processedBlob = await processResponse.blob();
        const processedUrl = URL.createObjectURL(processedBlob);
        
        // Add to processed images
        const newProcessed: ProcessedImage = {
          url: processedUrl,
          filter: filterId,
          intensity: currentIntensity
        };
        
        setProcessedImages(prev => {
          // Remove existing version of same filter
          const filtered = prev.filter(img => img.filter !== filterId);
          return [...filtered, newProcessed];
        });
      } else {
        console.error('Failed to process image');
      }
    } catch (error) {
      console.error('Error processing image:', error);
    }

    setIsProcessing(false);
    setSelectedFilter(null);
    setPreviewFilter(filterId); // Auto-show comparison after applying filter
  };

  const downloadImage = (imageUrl: string, filterName: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = `edited-photo-${filterName}.jpg`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const clearAll = () => {
    setOriginalImage(null);
    setProcessedImages([]);
    processedImages.forEach(img => URL.revokeObjectURL(img.url));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                📸 Edytor Zdjęć z Galerii
              </h1>
              <p className="text-gray-600">
                Wybierz zdjęcie z galerii i dodaj profesjonalne efekty jednym kliknięciem
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {originalImage && (
                <button
                  onClick={clearAll}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <ArrowUturnLeftIcon className="w-5 h-5 mr-2" />
                  Wyczyść wszystko
                </button>
              )}
              
              <button
                onClick={() => setShowGalleryPicker(true)}
                className="flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <PhotoIcon className="w-5 h-5 mr-2" />
                {originalImage ? 'Wybierz inne zdjęcie' : 'Wybierz z galerii'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Gallery Picker Prompt */}
        {!originalImage && (
          <div className="relative border-2 border-dashed rounded-2xl p-12 text-center border-gray-300 hover:border-gray-400 transition-colors">
            <PhotoIcon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Wybierz zdjęcie z galerii
            </h3>
            <p className="text-gray-600 mb-6">
              Kliknij przycisk powyżej aby wybrać zdjęcie z naszej galerii
            </p>
            <div className="text-sm text-gray-500">
              Dostępne tylko zdjęcia z galerii • Bezpieczne przetwarzanie
            </div>
          </div>
        )}

        {/* Main Editor */}
        {originalImage && (
          <div className="space-y-8">
            
            {/* Before/After Comparison */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                {previewFilter ? 'Porównanie: Przed | Po' : 'Oryginalne zdjęcie'}
              </h3>
              
              {previewFilter ? (
                /* Before/After Split View */
                <div className="relative max-w-4xl mx-auto">
                  <div className="flex gap-6 rounded-xl">
                    {/* Before */}
                    <div className="flex-1 relative">
                      <div className="relative rounded-xl overflow-hidden shadow-lg aspect-4/3">
                        <img
                          src={originalImage}
                          alt="Przed"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-3 left-3 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                          PRZED
                        </div>
                      </div>
                    </div>
                    
                    {/* Divider */}
                    <div className="flex items-center justify-center">
                      <div className="w-12 h-12 bg-white rounded-full border-4 border-gray-200 flex items-center justify-center shadow-lg">
                        <div className="text-gray-400 font-bold text-lg">|</div>
                      </div>
                    </div>
                    
                    {/* After */}
                    <div className="flex-1 relative">
                      {(() => {
                        const processedImage = processedImages.find(img => img.filter === previewFilter);
                        const filter = filters.find(f => f.id === previewFilter);
                        const displayImage = processedImage?.url || previewImage || originalImage;
                        
                        return (
                          <div className="relative rounded-xl overflow-hidden shadow-lg group aspect-4/3">
                            {isGeneratingPreview ? (
                              <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                <div className="text-center">
                                  <ArrowPathIcon className="w-8 h-8 text-indigo-600 animate-spin mx-auto mb-2" />
                                  <p className="text-sm text-gray-600">Generowanie podglądu...</p>
                                </div>
                              </div>
                            ) : (
                              <img
                                key={displayImage} // Force re-render when URL changes
                                src={displayImage}
                                alt="Po"
                                className="w-full h-full object-cover"
                                style={{
                                  position: 'relative',
                                  zIndex: 1
                                }}
                                onError={(e) => {
                                  console.error('Image failed to load:', displayImage);
                                }}
                              />
                            )}
                            
                            {/* Overlay with download button on hover */}
                            {!isGeneratingPreview && (
                              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                                {processedImage ? (
                                  <button
                                    onClick={() => downloadImage(processedImage.url, filter?.name || 'filter')}
                                    className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 px-6 py-3 bg-white text-gray-900 rounded-xl font-semibold hover:bg-gray-100 shadow-2xl flex items-center space-x-2 border-2 border-gray-200"
                                  >
                                    <ArrowDownTrayIcon className="w-5 h-5" />
                                    <span>Pobierz zdjęcie</span>
                                  </button>
                                ) : previewImage ? (
                                  <div className="opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-90 group-hover:scale-100 px-6 py-3 bg-yellow-500 text-white rounded-xl font-semibold shadow-2xl flex items-center space-x-2 border-2 border-yellow-400">
                                    <SparklesIcon className="w-5 h-5" />
                                    <span>Podgląd filtra</span>
                                  </div>
                                ) : null}
                              </div>
                            )}
                            
                            {!isGeneratingPreview && (
                              <div className="absolute bottom-3 right-3 bg-black bg-opacity-70 text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                                PO ({filter?.name})
                              </div>
                            )}
                          </div>
                        );
                      })()}
                    </div>
                  </div>
                  
                  {/* Clear Preview Button */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => {
                        setPreviewFilter(null);
                        setPreviewImage(null);
                      }}
                      className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      ← Powróć do widoku oryginalnego
                    </button>
                  </div>
                </div>
              ) : (
                /* Original Image Only */
                <div className="relative max-w-md mx-auto">
                  <img
                    src={originalImage}
                    alt="Original"
                    className="w-full h-auto rounded-xl shadow-md"
                  />
                  <div className="mt-3 text-center text-sm text-gray-500">
                    Kliknij na filtr poniżej, aby zobaczyć porównanie
                  </div>
                </div>
              )}
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Dostępne filtry</h3>
                {selectedFilter && (
                  <div className="flex items-center space-x-2">
                    <ArrowPathIcon className="w-4 h-4 text-indigo-600 animate-spin" />
                    <span className="text-sm text-indigo-600">Przetwarzanie...</span>
                  </div>
                )}
              </div>
              
              {/* Intensity Slider */}
              {(selectedFilter || previewFilter) && 
               filters.find(f => f.id === (selectedFilter || previewFilter))?.hasIntensity && (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <label className="block text-sm font-medium text-gray-900 mb-2">
                    Intensywność: {intensity}
                  </label>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={intensity}
                    onChange={(e) => {
                      setIntensity(parseFloat(e.target.value));
                      // Automatically regenerate preview when changing intensity
                      if (previewFilter) {
                        generatePreview(previewFilter);
                      }
                    }}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filters.map((filter) => {
                  const IconComponent = filter.icon;
                  const isProcessing = selectedFilter === filter.id;
                  const hasProcessed = processedImages.some(img => img.filter === filter.id);
                  
                  const isPreview = previewFilter === filter.id;
                  
                  return (
                    <div key={filter.id} className="space-y-2">
                      <button
                        onClick={() => {
                          if (isPreview) {
                            setPreviewFilter(null);
                            setPreviewImage(null);
                          } else {
                            setPreviewFilter(filter.id);
                            generatePreview(filter.id);
                          }
                        }}
                        disabled={isProcessing || isGeneratingPreview}
                        className={`relative p-4 rounded-xl border transition-all duration-200 w-full ${
                          isPreview
                            ? 'border-indigo-500 bg-indigo-50 ring-2 ring-indigo-200'
                            : hasProcessed
                            ? 'border-green-500 bg-green-50'
                            : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                        } ${isProcessing ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                      >
                      <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-linear-to-r ${filter.color} flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="text-sm font-medium text-gray-900 mb-1">{filter.name}</h4>
                      <p className="text-xs text-gray-600">{filter.description}</p>
                      
                      {hasProcessed && (
                        <div className="absolute top-2 right-2 w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                          <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                      )}
                      
                      {isProcessing && (
                        <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 rounded-xl">
                          <ArrowPathIcon className="w-6 h-6 text-indigo-600 animate-spin" />
                        </div>
                      )}
                    </button>
                    
                    {/* Apply Filter Button */}
                    {isPreview && !hasProcessed && (
                      <button
                        onClick={() => applyFilter(filter.id)}
                        disabled={isProcessing}
                        className="w-full px-3 py-2 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 transition-colors"
                      >
                        {isProcessing ? 'Przetwarzanie...' : 'Zastosuj filtr'}
                      </button>
                    )}
                    
                    {/* Already Applied Indicator */}
                    {hasProcessed && (
                      <div className="w-full px-3 py-2 text-sm bg-green-100 text-green-700 rounded-lg text-center font-medium">
                        ✓ Zastosowano
                      </div>
                    )}
                  </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
      
      {/* Gallery Image Picker Modal */}
      <GalleryImagePicker
        isOpen={showGalleryPicker}
        onClose={() => setShowGalleryPicker(false)}
        onSelectImage={handleImageSelect}
      />
    </div>
  );
}
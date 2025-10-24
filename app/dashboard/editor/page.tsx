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
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const handleFileSelect = useCallback((files: FileList | null) => {
    if (files && files[0]) {
      const file = files[0];
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          setOriginalImage(e.target?.result as string);
          setProcessedImages([]);
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files);
    }
  }, [handleFileSelect]);

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
                Edytor Zdjęć
              </h1>
              <p className="text-gray-600">
                Dodaj profesjonalne efekty do swoich zdjęć jednym kliknięciem
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
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
              >
                <ArrowUpTrayIcon className="w-5 h-5 mr-2" />
                {originalImage ? 'Wybierz inne zdjęcie' : 'Wybierz zdjęcie'}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Upload Area */}
        {!originalImage && (
          <div
            className={`relative border-2 border-dashed rounded-2xl p-12 text-center transition-colors ${
              dragActive 
                ? 'border-indigo-500 bg-indigo-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <PhotoIcon className="w-24 h-24 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Przeciągnij zdjęcie tutaj
            </h3>
            <p className="text-gray-600 mb-6">
              lub kliknij przycisk powyżej aby wybrać plik
            </p>
            <div className="text-sm text-gray-500">
              Obsługiwane formaty: JPG, PNG, WEBP • Maksymalny rozmiar: 10MB
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => handleFileSelect(e.target.files)}
          className="hidden"
        />

        {/* Main Editor */}
        {originalImage && (
          <div className="space-y-8">
            
            {/* Original Image */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Oryginalne zdjęcie</h3>
              <div className="relative max-w-md mx-auto">
                <img
                  src={originalImage}
                  alt="Original"
                  className="w-full h-auto rounded-xl shadow-md"
                />
              </div>
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
              {selectedFilter && filters.find(f => f.id === selectedFilter)?.hasIntensity && (
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
                    onChange={(e) => setIntensity(parseFloat(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              )}

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {filters.map((filter) => {
                  const IconComponent = filter.icon;
                  const isProcessing = selectedFilter === filter.id;
                  const hasProcessed = processedImages.some(img => img.filter === filter.id);
                  
                  return (
                    <button
                      key={filter.id}
                      onClick={() => applyFilter(filter.id)}
                      disabled={isProcessing}
                      className={`relative p-4 rounded-xl border transition-all duration-200 ${
                        hasProcessed
                          ? 'border-indigo-500 bg-indigo-50'
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
                  );
                })}
              </div>
            </div>

            {/* Processed Images */}
            {processedImages.length > 0 && (
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Przetworzone zdjęcia</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {processedImages.map((processed, index) => {
                    const filter = filters.find(f => f.id === processed.filter);
                    return (
                      <div key={index} className="relative group">
                        <div className="aspect-square bg-gray-100 rounded-xl overflow-hidden">
                          <img
                            src={processed.url}
                            alt={`${filter?.name} effect`}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-200 rounded-xl flex items-center justify-center">
                          <button
                            onClick={() => downloadImage(processed.url, filter?.name || 'filter')}
                            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200 px-4 py-2 bg-white text-gray-900 rounded-lg font-medium hover:bg-gray-100"
                          >
                            <ArrowDownTrayIcon className="w-5 h-5 inline mr-2" />
                            Pobierz
                          </button>
                        </div>
                        
                        <div className="mt-3 text-center">
                          <h4 className="text-sm font-medium text-gray-900">{filter?.name}</h4>
                          {processed.intensity !== 1 && (
                            <p className="text-xs text-gray-600">Intensywność: {processed.intensity}</p>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
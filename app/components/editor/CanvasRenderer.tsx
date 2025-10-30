'use client';

import { useRef, useEffect } from 'react';
import { MinusIcon, PlusIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

interface CanvasRendererProps {
  canvasElementRef: React.RefObject<HTMLCanvasElement | null>;
  canvasSize: { width: number; height: number };
  zoom: number;
  onZoomChange: (zoom: number) => void;
  calculateOptimalZoom: () => number;
  isLoading?: boolean;
}

export default function CanvasRenderer({
  canvasElementRef,
  canvasSize,
  zoom,
  onZoomChange,
  calculateOptimalZoom,
  isLoading = false
}: CanvasRendererProps) {

  return (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
      {/* Zoom Controls */}
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center space-x-4">
          <span className="text-sm font-medium text-gray-700">🔍 Zoom:</span>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => onZoomChange(Math.max(zoom - 0.1, 0.2))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={zoom <= 0.2}
            >
              <MinusIcon className="w-4 h-4" />
            </button>
            
            <div className="w-24 text-center">
              <span className="text-sm font-medium text-gray-900">
                {Math.round(zoom * 100)}%
              </span>
            </div>
            
            <button
              onClick={() => onZoomChange(Math.min(zoom + 0.1, 2))}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              disabled={zoom >= 2}
            >
              <PlusIcon className="w-4 h-4" />
            </button>
          </div>
        </div>
        
        <button
          onClick={() => onZoomChange(calculateOptimalZoom())}
          className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          Dopasuj do okna
        </button>
      </div>

      {/* Canvas Container */}
      <div className="flex items-center justify-center overflow-hidden">
        <div 
          className="relative"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            transition: 'transform 0.2s ease-out'
          }}
        >
          <canvas
            ref={canvasElementRef}
            className="border border-gray-300 shadow-lg rounded-lg"
          />
          
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded-lg">
              <div className="flex flex-col items-center space-y-2">
                <ArrowPathIcon className="w-8 h-8 text-gray-400 animate-spin" />
                <span className="text-sm text-gray-500">Ładowanie editora...</span>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {/* Canvas Info */}
      <div className="mt-6 text-center text-sm text-gray-500">
        <p>
          <strong>Instrukcje:</strong> Kliknij na obiekt aby go wybrać • Przeciągnij aby przesunąć • 
          Użyj uchwytów aby zmienić rozmiar
        </p>
        <p className="mt-2">
          <strong>Rozmiar:</strong> {canvasSize.width}×{canvasSize.height}px • 
          <strong>Zoom:</strong> {Math.round(zoom * 100)}%
        </p>
      </div>
    </div>
  );
}
'use client';

import { useRef, useEffect, useState } from 'react';
import { MinusIcon, PlusIcon, ArrowPathIcon, HandRaisedIcon } from '@heroicons/react/24/outline';

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
  const containerRef = useRef<HTMLDivElement>(null);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isPanning, setIsPanning] = useState(false);
  const [lastPanPoint, setLastPanPoint] = useState({ x: 0, y: 0 });
  const [panMode, setPanMode] = useState(false);

  // Handle panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (panMode && e.button === 0) { // Left click only in pan mode
      setIsPanning(true);
      setLastPanPoint({ x: e.clientX, y: e.clientY });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isPanning && panMode) {
      const deltaX = e.clientX - lastPanPoint.x;
      const deltaY = e.clientY - lastPanPoint.y;
      
      setPanOffset(prev => ({
        x: prev.x + deltaX,
        y: prev.y + deltaY
      }));
      
      setLastPanPoint({ x: e.clientX, y: e.clientY });
    }
  };

  const handleMouseUp = () => {
    setIsPanning(false);
  };

  const resetPan = () => {
    setPanOffset({ x: 0, y: 0 });
  };

  // Reset pan when zoom changes significantly (optional - user can choose to keep position)
  // useEffect(() => {
  //   if (zoom <= 1) {
  //     resetPan();
  //   }
  // }, [zoom]);

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      {/* Zoom and Pan Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-2">
        <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-6 w-full sm:w-auto">
          {/* Zoom Controls */}
          <div className="flex items-center space-x-2 sm:space-x-4">
            <span className="text-xs sm:text-sm font-medium text-gray-700">🔍</span>
            <div className="flex items-center space-x-1 sm:space-x-2">
              <button
                onClick={() => onZoomChange(Math.max(zoom - 0.1, 0.2))}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={zoom <= 0.2}
              >
                <MinusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
              
              <div className="w-16 sm:w-24 text-center">
                <span className="text-xs sm:text-sm font-medium text-gray-900">
                  {Math.round(zoom * 100)}%
                </span>
              </div>
              
              <button
                onClick={() => onZoomChange(Math.min(zoom + 0.1, 2))}
                className="p-1 sm:p-2 hover:bg-gray-100 rounded-lg transition-colors"
                disabled={zoom >= 2}
              >
                <PlusIcon className="w-3 h-3 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>

          {/* Pan Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setPanMode(!panMode)}
              className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                panMode 
                  ? 'bg-indigo-100 text-indigo-700 border border-indigo-200' 
                  : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
              }`}
            >
              <HandRaisedIcon className="w-4 h-4" />
              <span className="text-sm font-medium">
                {panMode ? 'Przeciąganie ON' : 'Przeciąganie'}
              </span>
            </button>
            
            {(panOffset.x !== 0 || panOffset.y !== 0) && (
              <button
                onClick={resetPan}
                className="px-3 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
              >
                Wycentruj
              </button>
            )}
          </div>
        </div>
        
        <button
          onClick={() => onZoomChange(calculateOptimalZoom())}
          className="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
        >
          <span className="hidden sm:inline">Dopasuj do okna</span>
          <span className="sm:hidden">Dopasuj</span>
        </button>
      </div>

      {/* Canvas Container */}
      <div 
        ref={containerRef}
        className="flex items-center justify-center overflow-hidden bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 p-2 sm:p-4 lg:p-8"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        style={{ 
          cursor: panMode ? (isPanning ? 'grabbing' : 'grab') : 'default',
          height: 'calc(100vh - 400px)' // Use viewport height instead of window.innerWidth
        }}
      >
        <div 
          className="relative"
          style={{ 
            transform: `scale(${zoom}) translate(${panOffset.x / zoom}px, ${panOffset.y / zoom}px)`,
            transformOrigin: 'center center',
            transition: isPanning ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <canvas
            ref={canvasElementRef}
            className="border border-gray-300 shadow-lg rounded-lg bg-white"
            style={{ 
              pointerEvents: panMode ? 'none' : 'auto' 
            }}
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
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>
          <strong>Instrukcje:</strong> Kliknij na obiekt aby go wybrać • Przeciągnij aby przesunąć • 
          Użyj uchwytów aby zmienić rozmiar • Włącz przeciąganie aby przesunąć widok
        </p>
        <p className="mt-2">
          <strong>Rozmiar:</strong> {canvasSize.width}×{canvasSize.height}px • 
          <strong>Zoom:</strong> {Math.round(zoom * 100)}%
          {(panOffset.x !== 0 || panOffset.y !== 0) && (
            <> • <strong>Przesunięcie:</strong> {Math.round(panOffset.x)}, {Math.round(panOffset.y)}px</>
          )}
        </p>
        {panMode && (
          <p className="mt-2 text-indigo-600 font-medium">
            🖐️ Tryb przeciągania aktywny - kliknij i przeciągnij aby przesunąć widok
          </p>
        )}
      </div>
    </div>
  );
}
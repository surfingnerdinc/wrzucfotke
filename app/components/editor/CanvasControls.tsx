'use client';

import { useState } from 'react';

interface CanvasControlsProps {
  canvasSize: 'A4' | 'A5' | 'Square' | 'BusinessCard';
  orientation: 'portrait' | 'landscape';
  onSizeChange: (size: 'A4' | 'A5' | 'Square' | 'BusinessCard') => void;
  onOrientationChange: (orientation: 'portrait' | 'landscape') => void;
  getCanvasSize: (size: string, orientation: 'portrait' | 'landscape') => { width: number; height: number };
}

export default function CanvasControls({
  canvasSize,
  orientation,
  onSizeChange,
  onOrientationChange,
  getCanvasSize
}: CanvasControlsProps) {

  const formatLabels = {
    'A4': 'A4 - Dokument',
    'A5': 'A5 - Broszura', 
    'Square': 'Kwadrat - Instagram',
    'BusinessCard': 'Wizytówka'
  };

  const formatDescriptions = {
    'A4': 'Standardowy dokument',
    'A5': 'Mała broszura',
    'Square': 'Post na social media',
    'BusinessCard': 'Profesjonalna wizytówka'
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">📐 Format</h3>
      
      {/* Format Selection */}
      <div className="space-y-3">
        {(['A4', 'A5', 'Square', 'BusinessCard'] as const).map((size) => {
          const currentSize = getCanvasSize(size, orientation);
          return (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`w-full text-left p-3 rounded-lg border transition-colors ${
                canvasSize === size
                  ? 'border-indigo-500 bg-indigo-50'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="font-medium">
                {formatLabels[size]}
              </div>
              <div className="text-sm text-gray-500">
                {currentSize.width}×{currentSize.height}px
                {size !== 'Square' && ` • ${formatDescriptions[size]}`}
              </div>
            </button>
          );
        })}
      </div>
      
      {/* Orientation Controls - Hide for Square */}
      {canvasSize !== 'Square' && (
        <div className="mt-6 pt-4 border-t border-gray-200">
          <h4 className="text-sm font-medium text-gray-900 mb-3">📱 Orientacja</h4>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => onOrientationChange('portrait')}
              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                orientation === 'portrait'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-4 h-6 bg-current rounded-sm mb-1 opacity-60"></div>
              <span className="text-xs font-medium">Pionowa</span>
            </button>
            
            <button
              onClick={() => onOrientationChange('landscape')}
              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-colors ${
                orientation === 'landscape'
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                  : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="w-6 h-4 bg-current rounded-sm mb-1 opacity-60"></div>
              <span className="text-xs font-medium">Pozioma</span>
            </button>
          </div>
        </div>
      )}
      
      {/* Format Info */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Aktualny rozmiar:</span>
          <span className="font-semibold text-gray-900">
            {getCanvasSize(canvasSize, orientation).width}×{getCanvasSize(canvasSize, orientation).height}px
          </span>
        </div>
        {canvasSize !== 'Square' && (
          <div className="flex items-center justify-between text-sm mt-1">
            <span className="text-gray-600">Orientacja:</span>
            <span className="font-semibold text-gray-900">
              {orientation === 'portrait' ? 'Pionowa 📄' : 'Pozioma 📋'}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
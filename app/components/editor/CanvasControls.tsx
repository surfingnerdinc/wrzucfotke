'use client';

import { useState } from 'react';

interface CanvasControlsProps {
  canvasSize: 'A4' | 'A5' | 'Square' | 'BusinessCard';
  orientation: 'portrait' | 'landscape';
  onSizeChange: (size: 'A4' | 'A5' | 'Square' | 'BusinessCard') => void;
  getCanvasSize: (size: string, orientation: 'portrait' | 'landscape') => { width: number; height: number };
}

export default function CanvasControls({
  canvasSize,
  orientation,
  onSizeChange,
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
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">📐 Format</h3>
        <span className="text-xs text-gray-500">{getCanvasSize(canvasSize, orientation).width}×{getCanvasSize(canvasSize, orientation).height}px</span>
      </div>
      
      {/* Format Selection */}
      <div className="grid grid-cols-2 gap-2">
        {(['A4', 'A5', 'Square', 'BusinessCard'] as const).map((size) => {
          const currentSize = getCanvasSize(size, orientation);
          const isSelected = canvasSize === size;
          
          // Visual representation based on format
          const getFormatIcon = () => {
            switch (size) {
              case 'A4':
                return orientation === 'portrait' ? '📄' : '📋';
              case 'A5':
                return orientation === 'portrait' ? '📖' : '📑';
              case 'Square':
                return '⬜';
              case 'BusinessCard':
                return orientation === 'portrait' ? '🏷️' : '💳';
              default:
                return '📄';
            }
          };
          
          return (
            <button
              key={size}
              onClick={() => onSizeChange(size)}
              className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
                isSelected
                  ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
                  : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-25'
              }`}
            >
              <div className="text-lg mb-1">{getFormatIcon()}</div>
              <div className="text-xs font-medium text-center">
                {size === 'BusinessCard' ? 'Wizytówka' : size}
              </div>
              <div className="text-xs text-gray-500 text-center">
                {currentSize.width}×{currentSize.height}px
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
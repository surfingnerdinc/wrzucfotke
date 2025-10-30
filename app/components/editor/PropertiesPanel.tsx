'use client';

import { TrashIcon } from '@heroicons/react/24/outline';

interface PropertiesPanelProps {
  selectedObject: any;
  onUpdateText: (property: string, value: any) => void;
  onUpdateShape: (property: string, value: any) => void;
  onBringToFront: () => void;
  onSendToBack: () => void;
  onDelete: () => void;
}

export default function PropertiesPanel({
  selectedObject,
  onUpdateText,
  onUpdateShape,
  onBringToFront,
  onSendToBack,
  onDelete
}: PropertiesPanelProps) {

  if (!selectedObject) {
    return null;
  }

  const getLineAngle = (lineObject: any) => {
    if (!lineObject || lineObject.type !== 'line') return 0;
    const { x1, y1, x2, y2 } = lineObject;
    const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);
    return Math.round(angle);
  };

  const setLineAngle = (angle: number) => {
    if (!selectedObject || selectedObject.type !== 'line') return;
    
    const { x1, y1, x2, y2 } = selectedObject;
    const length = Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
    const radians = (angle * Math.PI) / 180;
    
    const newX2 = x1 + Math.cos(radians) * length;
    const newY2 = y1 + Math.sin(radians) * length;
    
    onUpdateShape('coords', { x2: newX2, y2: newY2 });
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">🎛️ Właściwości</h3>
      
      {/* Text Properties */}
      {selectedObject.type === 'textbox' && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tekst
            </label>
            <input
              type="text"
              value={selectedObject.text}
              onChange={(e) => onUpdateText('text', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rozmiar czcionki
            </label>
            <input
              type="range"
              min="12"
              max="72"
              value={selectedObject.fontSize}
              onChange={(e) => onUpdateText('fontSize', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              {selectedObject.fontSize}px
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kolor tekstu
            </label>
            <input
              type="color"
              value={selectedObject.fill}
              onChange={(e) => onUpdateText('fill', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Czcionka
            </label>
            <select
              value={selectedObject.fontFamily}
              onChange={(e) => onUpdateText('fontFamily', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="Arial">Arial</option>
              <option value="Helvetica">Helvetica</option>
              <option value="Times New Roman">Times New Roman</option>
              <option value="Georgia">Georgia</option>
              <option value="Verdana">Verdana</option>
            </select>
          </div>
        </div>
      )}

      {/* Shape Properties */}
      {selectedObject && ['rect', 'circle', 'triangle', 'line'].includes(selectedObject.type) && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kolor wypełnienia
            </label>
            <input
              type="color"
              value={selectedObject.fill || '#4F46E5'}
              onChange={(e) => onUpdateShape('fill', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Kolor obramowania
            </label>
            <input
              type="color"
              value={selectedObject.stroke || '#374151'}
              onChange={(e) => onUpdateShape('stroke', e.target.value)}
              className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Grubość obramowania
            </label>
            <input
              type="range"
              min="0"
              max="10"
              value={selectedObject.strokeWidth || 1}
              onChange={(e) => onUpdateShape('strokeWidth', parseInt(e.target.value))}
              className="w-full"
            />
            <div className="text-sm text-gray-500 mt-1">
              {selectedObject.strokeWidth || 1}px
            </div>
          </div>
          
          {selectedObject.type !== 'line' && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Przezroczystość
              </label>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={selectedObject.opacity || 1}
                onChange={(e) => onUpdateShape('opacity', parseFloat(e.target.value))}
                className="w-full"
              />
              <div className="text-sm text-gray-500 mt-1">
                {Math.round((selectedObject.opacity || 1) * 100)}%
              </div>
            </div>
          )}
          
          {/* Line-specific controls */}
          {selectedObject.type === 'line' && (
            <div className="space-y-4 mt-4 pt-4 border-t border-gray-200">
              <h4 className="font-medium text-gray-900">📐 Kontrola linii</h4>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Kąt obrotu
                </label>
                <input
                  type="range"
                  min="0"
                  max="359"
                  value={getLineAngle(selectedObject)}
                  onChange={(e) => setLineAngle(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="text-sm text-gray-500 mt-1">
                  {getLineAngle(selectedObject)}°
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-2">
                <button
                  onClick={() => setLineAngle(0)}
                  className="px-3 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors text-sm font-medium"
                >
                  0° →
                </button>
                <button
                  onClick={() => setLineAngle(45)}
                  className="px-3 py-2 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium"
                >
                  45° ↗
                </button>
                <button
                  onClick={() => setLineAngle(90)}
                  className="px-3 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors text-sm font-medium"
                >
                  90° ↑
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Object Actions */}
      <div className="flex space-x-2 mt-6 pt-4 border-t border-gray-200">
        <button
          onClick={onBringToFront}
          className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Na przód
        </button>
        <button
          onClick={onSendToBack}
          className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm"
        >
          Na tył
        </button>
        <button
          onClick={onDelete}
          className="px-3 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-colors"
        >
          <TrashIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
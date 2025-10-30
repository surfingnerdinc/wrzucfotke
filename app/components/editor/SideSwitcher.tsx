'use client';

interface SideSwitcherProps {
  canvasSize: 'A4' | 'A5' | 'Square' | 'BusinessCard';
  currentSide: 'front' | 'back';
  canvasData: {
    front: any[];
    back: any[];
    frontBackground: string;
    backBackground: string;
  };
  onSwitchSide: (side: 'front' | 'back') => void;
}

export default function SideSwitcher({
  canvasSize,
  currentSide,
  canvasData,
  onSwitchSide
}: SideSwitcherProps) {
  
  // Pokazuj tylko dla wizytówek i A4 (dokumenty dwustronne)
  if (canvasSize !== 'BusinessCard' && canvasSize !== 'A4') {
    return null;
  }

  const isBusinessCard = canvasSize === 'BusinessCard';

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">
        {isBusinessCard ? '🔄 Strona Wizytówki' : '🔄 Strona Dokumentu'}
      </h3>
      
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={() => onSwitchSide('front')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
            currentSide === 'front'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
              : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-25'
          }`}
        >
          <div className={`w-8 h-5 rounded-sm mb-2 ${
            currentSide === 'front' ? 'bg-indigo-500' : 'bg-gray-400'
          }`}></div>
          <span className="font-medium text-sm">Przód</span>
          <span className="text-xs text-gray-500 mt-1">
            {canvasData.front.length} elementów
          </span>
        </button>
        
        <button
          onClick={() => onSwitchSide('back')}
          className={`flex flex-col items-center p-4 rounded-lg border-2 transition-all duration-200 ${
            currentSide === 'back'
              ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
          }`}
        >
          <div className={`w-8 h-5 rounded-sm mb-2 transform rotate-180 ${
            currentSide === 'back' ? 'bg-purple-500' : 'bg-gray-400'
          }`}></div>
          <span className="font-medium text-sm">Tył</span>
          <span className="text-xs text-gray-500 mt-1">
            {canvasData.back.length} elementów
          </span>
        </button>
      </div>
      
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">Aktualnie edytujesz:</span>
          <span className={`font-semibold ${
            currentSide === 'front' ? 'text-indigo-600' : 'text-purple-600'
          }`}>
            {currentSide === 'front' ? '📄 Przód' : '📋 Tył'}
          </span>
        </div>
        <div className="mt-2 text-xs text-gray-500">
          💡 Naciśnij <kbd className="px-1.5 py-0.5 bg-white border border-gray-300 rounded text-gray-700">F</kbd> aby przełączyć strony
        </div>
      </div>
      
      {/* Status indicator */}
      <div className="mt-3 flex items-center space-x-2 text-xs">
        <div className={`w-2 h-2 rounded-full ${
          canvasData.front.length > 0 || canvasData.back.length > 0 
            ? 'bg-green-500' : 'bg-gray-300'
        }`}></div>
        <span className="text-gray-600">
          {canvasData.front.length > 0 || canvasData.back.length > 0 
            ? `Dwustronna ${isBusinessCard ? 'wizytówka' : 'dokument'}` 
            : 'Jednostronna'
          }
        </span>
      </div>
    </div>
  );
}
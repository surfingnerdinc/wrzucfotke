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
  
  // Pokazuj dla wszystkich formatów oprócz Square (dokumenty dwustronne)
  if (canvasSize === 'Square') {
    return null;
  }

  const getTitle = () => {
    switch (canvasSize) {
      case 'BusinessCard':
        return '🔄 Strona Wizytówki';
      case 'A5':
        return '🔄 Strona Broszury';
      case 'A4':
        return '🔄 Strona Dokumentu';
      default:
        return '🔄 Strona Dokumentu';
    }
  };

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-semibold text-gray-900">
          {getTitle()}
        </h3>
      </div>
      
      <div className="grid grid-cols-2 gap-2">
        <button
          onClick={() => onSwitchSide('front')}
          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
            currentSide === 'front'
              ? 'border-indigo-500 bg-indigo-50 text-indigo-700 shadow-sm'
              : 'border-gray-200 hover:border-indigo-300 hover:bg-indigo-25'
          }`}
        >
          <div className={`w-6 h-4 rounded-sm mb-1 ${
            currentSide === 'front' ? 'bg-indigo-500' : 'bg-gray-400'
          }`}></div>
          <span className="font-medium text-xs">Przód</span>
          <span className="text-xs text-gray-500">
            {canvasData.front.length}
          </span>
        </button>
        
        <button
          onClick={() => onSwitchSide('back')}
          className={`flex flex-col items-center p-3 rounded-lg border-2 transition-all duration-200 ${
            currentSide === 'back'
              ? 'border-purple-500 bg-purple-50 text-purple-700 shadow-sm'
              : 'border-gray-200 hover:border-purple-300 hover:bg-purple-25'
          }`}
        >
          <div className={`w-6 h-4 rounded-sm mb-1 transform rotate-180 ${
            currentSide === 'back' ? 'bg-purple-500' : 'bg-gray-400'
          }`}></div>
          <span className="font-medium text-xs">Tył</span>
          <span className="text-xs text-gray-500">
            {canvasData.back.length}
          </span>
        </button>
      </div>
    </div>
  );
}
'use client';

import {
  HandRaisedIcon,
  DocumentTextIcon,
  PhotoIcon,
  QrCodeIcon,
  Square3Stack3DIcon,
  PaintBrushIcon,
  TrashIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon,
  DocumentDuplicateIcon,
  EyeIcon,
  EyeSlashIcon,
  LockClosedIcon,
  LockOpenIcon,
  ChevronDownIcon,
  SparklesIcon,
  Squares2X2Icon
} from '@heroicons/react/24/outline';
import { useState, useEffect } from 'react';

export interface ToolbarTool {
  id: string;
  name: string;
  icon: any;
  action: () => void;
  isActive?: boolean;
  disabled?: boolean;
  separator?: boolean;
}

interface EditorToolbarProps {
  selectedTool: string;
  onToolSelect: (toolId: string) => void;
  onAddText: () => void;
  onAddImage: () => void;
  onAddQR: () => void;
  onAddShapes: () => void;
  onAddShape?: (type: 'rectangle' | 'circle' | 'triangle' | 'line' | 'horizontal-line' | 'vertical-line') => void;
  onBackground: () => void;
  onClear: () => void;
  onUndo?: () => void;
  onRedo?: () => void;
  onDuplicate?: () => void;
  selectedObject?: any;
  onToggleVisibility?: () => void;
  onToggleLock?: () => void;
  onToggleAI?: () => void;
  
  // Orientation props
  currentOrientation?: 'portrait' | 'landscape';
  canvasSize?: string;
  onOrientationToggle?: () => void;
  onAddDividers?: () => void;
  onAddDivider?: (type: '2h' | '2v' | '3h' | '3v' | '4grid' | '3left' | '3right' | '3leftH' | '3rightH') => void;
  onChangeBackground?: (color: string) => void;
  currentBackground?: string;
}

export default function EditorToolbar({
  selectedTool,
  onToolSelect,
  onAddText,
  onAddImage,
  onAddQR,
  onAddShapes,
  onAddShape,
  onBackground,
  onClear,
  onUndo,
  onRedo,
  onDuplicate,
  selectedObject,
  onToggleVisibility,
  onToggleLock,
  onToggleAI,
  currentOrientation,
  canvasSize,
  onOrientationToggle,
  onAddDividers,
  onAddDivider,
  onChangeBackground,
  currentBackground = '#ffffff'
}: EditorToolbarProps) {
  
  const [showShapesDropdown, setShowShapesDropdown] = useState(false);
  const [showDividersDropdown, setShowDividersDropdown] = useState(false);
  const [showBackgroundDropdown, setShowBackgroundDropdown] = useState(false);

  // Close dropdowns on outside click
  useEffect(() => {
    const handleClickOutside = () => {
      setShowShapesDropdown(false);
      setShowDividersDropdown(false);
      setShowBackgroundDropdown(false);
    };
    if (showShapesDropdown || showDividersDropdown || showBackgroundDropdown) {
      document.addEventListener('click', handleClickOutside);
      return () => document.removeEventListener('click', handleClickOutside);
    }
  }, [showShapesDropdown, showDividersDropdown, showBackgroundDropdown]);
  
  const tools: ToolbarTool[] = [
    {
      id: 'select',
      name: 'Wybierz (V)',
      icon: HandRaisedIcon,
      action: () => onToolSelect('select'),
      isActive: selectedTool === 'select'
    },
    {
      id: 'text',
      name: 'Tekst (T)',
      icon: DocumentTextIcon,
      action: onAddText,
      isActive: selectedTool === 'text'
    },
    {
      id: 'image',
      name: 'Zdjęcie (I)',
      icon: PhotoIcon,
      action: onAddImage,
      isActive: selectedTool === 'image'
    },
    {
      id: 'shapes',
      name: 'Kształty (S)',
      icon: Square3Stack3DIcon,
      action: onAddShapes,
      isActive: selectedTool === 'shapes'
    },
    {
      id: 'qr',
      name: 'QR Code (Q)',
      icon: QrCodeIcon,
      action: onAddQR,
      isActive: selectedTool === 'qr'
    },
    {
      id: 'ai',
      name: 'AI Asystent (A)',
      icon: SparklesIcon,
      action: onToggleAI || (() => {}),
      isActive: selectedTool === 'ai'
    },
    {
      id: 'dividers',
      name: 'Podział Strony (D)',
      icon: Squares2X2Icon,
      action: onAddDividers || (() => {}),
      isActive: selectedTool === 'dividers'
    },
    {
      id: 'background',
      name: 'Tło (B)',
      icon: PaintBrushIcon,
      action: onBackground,
      isActive: selectedTool === 'background',
      separator: true
    }
  ];

  const actionTools: ToolbarTool[] = [
    {
      id: 'undo',
      name: 'Cofnij (Ctrl+Z)',
      icon: ArrowUturnLeftIcon,
      action: onUndo || (() => {}),
      disabled: !onUndo
    },
    {
      id: 'redo',
      name: 'Ponów (Ctrl+Y)',
      icon: ArrowUturnRightIcon,
      action: onRedo || (() => {}),
      disabled: !onRedo
    },
    {
      id: 'duplicate',
      name: 'Duplikuj (Ctrl+D)',
      icon: DocumentDuplicateIcon,
      action: onDuplicate || (() => {}),
      disabled: !onDuplicate || !selectedObject,
      separator: true
    }
  ];

  const objectTools: ToolbarTool[] = selectedObject ? [
    {
      id: 'visibility',
      name: selectedObject.visible !== false ? 'Ukryj' : 'Pokaż',
      icon: selectedObject.visible !== false ? EyeIcon : EyeSlashIcon,
      action: onToggleVisibility || (() => {}),
      disabled: !onToggleVisibility
    },
    {
      id: 'lock',
      name: selectedObject.lockMovementX ? 'Odblokuj' : 'Zablokuj',
      icon: selectedObject.lockMovementX ? LockClosedIcon : LockOpenIcon,
      action: onToggleLock || (() => {}),
      disabled: !onToggleLock
    }
  ] : [];

  const renderTool = (tool: ToolbarTool) => (
    <div key={tool.id} className="flex items-center">
      <button
        onClick={tool.action}
        disabled={tool.disabled}
        className={`
          relative p-2 rounded-lg transition-all duration-150 group
          ${tool.isActive 
            ? 'bg-indigo-100 text-indigo-700 shadow-sm' 
            : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
          }
          ${tool.disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
        title={tool.name}
      >
        <tool.icon className="w-5 h-5" />
        
        {/* Tooltip */}
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
          {tool.name}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
        </div>
      </button>
      
      {tool.separator && <div className="w-px h-8 bg-gray-200 mx-2"></div>}
    </div>
  );

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-2 mb-4">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Main Tools */}
        <div className="flex items-center flex-wrap gap-1">
          {tools.map(tool => {
            // Special handling for shapes tool with dropdown
            if (tool.id === 'shapes' && onAddShape) {
              return (
                <div key={tool.id} className="relative">
                  <div className="flex items-center">
                    <button
                      onClick={tool.action}
                      className={`
                        p-2 rounded-l-lg transition-all duration-150 group
                        ${tool.isActive 
                          ? 'bg-indigo-100 text-indigo-700 shadow-sm' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }
                      `}
                      title={tool.name}
                    >
                      <tool.icon className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => setShowShapesDropdown(!showShapesDropdown)}
                      className={`
                        p-2 rounded-r-lg border-l border-gray-200 transition-all duration-150
                        ${tool.isActive 
                          ? 'bg-indigo-100 text-indigo-700 shadow-sm' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }
                      `}
                    >
                      <ChevronDownIcon className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {showShapesDropdown && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                      <div className="p-2 grid grid-cols-2 gap-2">
                        <button
                          onClick={() => { onAddShape('rectangle'); setShowShapesDropdown(false); }}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-6 h-4 bg-indigo-500 rounded-sm mb-1"></div>
                          <span className="text-xs">Prostokąt</span>
                        </button>
                        
                        <button
                          onClick={() => { onAddShape('circle'); setShowShapesDropdown(false); }}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-5 h-5 bg-red-500 rounded-full mb-1"></div>
                          <span className="text-xs">Koło</span>
                        </button>
                        
                        <button
                          onClick={() => { onAddShape('triangle'); setShowShapesDropdown(false); }}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-0 h-0 border-l-3 border-r-3 border-b-4 border-l-transparent border-r-transparent border-b-green-500 mb-1"></div>
                          <span className="text-xs">Trójkąt</span>
                        </button>
                        
                        <button
                          onClick={() => { onAddShape('horizontal-line'); setShowShapesDropdown(false); }}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors"
                        >
                          <div className="w-6 h-0.5 bg-blue-600 mb-1 mt-2"></div>
                          <span className="text-xs">Pozioma</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Special handling for dividers tool with dropdown
            if (tool.id === 'dividers' && onAddDivider) {
              return (
                <div key={tool.id} className="relative">
                  <div className="flex items-center">
                    <button
                      onClick={tool.action}
                      className={`
                        p-2 rounded-l-lg transition-all duration-150 group
                        ${tool.isActive 
                          ? 'bg-purple-100 text-purple-700 shadow-sm' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }
                      `}
                      title={tool.name}
                    >
                      <tool.icon className="w-5 h-5" />
                    </button>
                    
                    <button
                      onClick={() => setShowDividersDropdown(!showDividersDropdown)}
                      className={`
                        p-2 rounded-r-lg border-l border-gray-200 transition-all duration-150
                        ${tool.isActive 
                          ? 'bg-purple-100 text-purple-700 shadow-sm' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }
                      `}
                    >
                      <ChevronDownIcon className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {showDividersDropdown && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[280px]">
                      <div className="p-3">
                        <div className="text-xs font-medium text-gray-700 mb-2">Podział na 2 części</div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <button
                            onClick={() => { onAddDivider('2h'); setShowDividersDropdown(false); }}
                            className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                          >
                            <div className="w-8 h-6 bg-gray-200 rounded-sm mb-1 relative">
                              <div className="absolute inset-x-0 top-1/2 h-px bg-purple-500 transform -translate-y-px"></div>
                            </div>
                            <span className="text-xs">Poziomo</span>
                          </button>
                          
                          <button
                            onClick={() => { onAddDivider('2v'); setShowDividersDropdown(false); }}
                            className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                          >
                            <div className="w-8 h-6 bg-gray-200 rounded-sm mb-1 relative">
                              <div className="absolute inset-y-0 left-1/2 w-px bg-purple-500 transform -translate-x-px"></div>
                            </div>
                            <span className="text-xs">Pionowo</span>
                          </button>
                        </div>
                        
                        <div className="text-xs font-medium text-gray-700 mb-2">Podział na 3 części</div>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                          <button
                            onClick={() => { onAddDivider('3h'); setShowDividersDropdown(false); }}
                            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                          >
                            <div className="w-6 h-6 bg-gray-200 rounded-sm mb-1 relative">
                              <div className="absolute inset-x-0 top-1/3 h-px bg-green-500"></div>
                              <div className="absolute inset-x-0 top-2/3 h-px bg-green-500"></div>
                            </div>
                            <span className="text-xs">3 poziomo</span>
                          </button>
                          
                          <button
                            onClick={() => { onAddDivider('3v'); setShowDividersDropdown(false); }}
                            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                          >
                            <div className="w-6 h-6 bg-gray-200 rounded-sm mb-1 relative">
                              <div className="absolute inset-y-0 left-1/3 w-px bg-green-500"></div>
                              <div className="absolute inset-y-0 left-2/3 w-px bg-green-500"></div>
                            </div>
                            <span className="text-xs">3 pionowo</span>
                          </button>
                        </div>
                        
                        <div className="text-xs text-gray-600 mb-2">Mieszane podziały:</div>
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <button
                            onClick={() => { onAddDivider('3leftH'); setShowDividersDropdown(false); }}
                            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                          >
                            <div className="w-6 h-6 bg-gray-200 rounded-sm mb-1 relative">
                              <div className="absolute inset-y-0 left-1/2 w-px bg-green-500"></div>
                              <div className="absolute left-0 right-1/2 top-1/2 h-px bg-green-500"></div>
                            </div>
                            <span className="text-xs">Lewa pół+pół</span>
                          </button>
                          
                          <button
                            onClick={() => { onAddDivider('3rightH'); setShowDividersDropdown(false); }}
                            className="flex flex-col items-center p-2 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200"
                          >
                            <div className="w-6 h-6 bg-gray-200 rounded-sm mb-1 relative">
                              <div className="absolute inset-y-0 left-1/2 w-px bg-green-500"></div>
                              <div className="absolute left-1/2 right-0 top-1/2 h-px bg-green-500"></div>
                            </div>
                            <span className="text-xs">Prawa pół+pół</span>
                          </button>
                        </div>
                        
                        <div className="text-xs font-medium text-gray-700 mb-2">Siatka 2×2</div>
                        <button
                          onClick={() => { onAddDivider('4grid'); setShowDividersDropdown(false); }}
                          className="flex flex-col items-center p-3 hover:bg-gray-50 rounded-lg transition-colors border border-gray-200 w-full"
                        >
                          <div className="w-8 h-6 bg-gray-200 rounded-sm mb-1 relative">
                            <div className="absolute inset-x-0 top-1/2 h-px bg-blue-500 transform -translate-y-px"></div>
                            <div className="absolute inset-y-0 left-1/2 w-px bg-blue-500 transform -translate-x-px"></div>
                          </div>
                          <span className="text-xs">Siatka 4 części</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            // Special handling for background tool with dropdown
            if (tool.id === 'background' && onChangeBackground) {
              const predefinedColors = [
                '#ffffff', '#f8fafc', '#f1f5f9', '#e2e8f0', '#cbd5e1',
                '#1e293b', '#0f172a', '#dc2626', '#ea580c', '#ca8a04',
                '#65a30d', '#16a34a', '#059669', '#0891b2', '#0284c7',
                '#3b82f6', '#6366f1', '#8b5cf6', '#a855f7', '#d946ef',
                '#ec4899', '#f43f5e'
              ];

              return (
                <div key={tool.id} className="relative">
                  <div className="flex items-center">
                    <button
                      onClick={tool.action}
                      className={`
                        p-2 rounded-l-lg transition-all duration-150 group relative
                        ${tool.isActive 
                          ? 'bg-blue-100 text-blue-700 shadow-sm' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }
                      `}
                      title={tool.name}
                    >
                      <div className="relative">
                        <tool.icon className="w-5 h-5" />
                        <div 
                          className="absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white shadow-sm"
                          style={{ backgroundColor: currentBackground }}
                        ></div>
                      </div>
                    </button>
                    
                    <button
                      onClick={() => setShowBackgroundDropdown(!showBackgroundDropdown)}
                      className={`
                        p-2 rounded-r-lg border-l border-gray-200 transition-all duration-150
                        ${tool.isActive 
                          ? 'bg-blue-100 text-blue-700 shadow-sm' 
                          : 'hover:bg-gray-100 text-gray-600 hover:text-gray-900'
                        }
                      `}
                    >
                      <ChevronDownIcon className="w-3 h-3" />
                    </button>
                  </div>
                  
                  {showBackgroundDropdown && (
                    <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-60">
                      <div className="p-3">
                        <div className="text-xs font-medium text-gray-700 mb-3">Wybierz kolor tła</div>
                        
                        {/* Color picker input */}
                        <div className="mb-3">
                          <input
                            type="color"
                            value={currentBackground}
                            onChange={(e) => {
                              onChangeBackground(e.target.value);
                              setShowBackgroundDropdown(false);
                            }}
                            className="w-full h-8 rounded-md border border-gray-300 cursor-pointer"
                            title="Wybierz własny kolor"
                          />
                        </div>
                        
                        {/* Predefined colors */}
                        <div className="grid grid-cols-6 gap-2">
                          {predefinedColors.map((color) => (
                            <button
                              key={color}
                              onClick={() => {
                                onChangeBackground(color);
                                setShowBackgroundDropdown(false);
                              }}
                              className={`
                                w-8 h-8 rounded-md border-2 transition-all duration-150 hover:scale-110
                                ${currentBackground === color 
                                  ? 'border-blue-500 ring-2 ring-blue-200' 
                                  : 'border-gray-300 hover:border-gray-400'
                                }
                              `}
                              style={{ backgroundColor: color }}
                              title={color}
                            />
                          ))}
                        </div>
                        
                        {/* Quick actions */}
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="grid grid-cols-2 gap-2">
                            <button
                              onClick={() => {
                                onChangeBackground('#ffffff');
                                setShowBackgroundDropdown(false);
                              }}
                              className="px-3 py-2 text-xs bg-white border border-gray-300 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              ⚪ Białe
                            </button>
                            <button
                              onClick={() => {
                                onChangeBackground('#000000');
                                setShowBackgroundDropdown(false);
                              }}
                              className="px-3 py-2 text-xs bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
                            >
                              ⚫ Czarne
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            }
            
            return renderTool(tool);
          })}
          
          {/* Action Tools */}
          {actionTools.map(renderTool)}
          
          {/* Object Tools (only when object selected) */}
          {objectTools.length > 0 && (
            <>
              <div className="w-px h-8 bg-gray-200 mx-2"></div>
              {objectTools.map(renderTool)}
            </>
          )}
        </div>
        
        {/* Secondary Actions Row - Orientation & Actions */}
        <div className="flex items-center justify-between sm:justify-start gap-2 sm:gap-4">
          
          {/* Orientation Toggle */}
          <div className="flex items-center">
            <div className="hidden sm:block w-px h-8 bg-gray-200 mx-2"></div>
            <button
              onClick={onOrientationToggle}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors group relative"
              title="Orientacja"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {currentOrientation === 'portrait' ? (
                  <div className="w-3 h-4 border-2 border-gray-600 rounded-sm"></div>
                ) : (
                  <div className="w-4 h-3 border-2 border-gray-600 rounded-sm"></div>
                )}
              </div>
            </button>
          </div>
          
          {/* Right Side Actions */}
          <div className="flex items-center space-x-2">
            <button
              onClick={onClear}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors group"
              title="Wyczyść wszystko"
            >
              <TrashIcon className="w-5 h-5" />
              <div className="absolute bottom-full right-0 mb-2 px-3 py-1 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                Wyczyść wszystko
                <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-gray-900"></div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
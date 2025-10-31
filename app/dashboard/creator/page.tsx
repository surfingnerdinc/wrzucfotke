'use client';

import { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { 
  DocumentArrowDownIcon,
  TrashIcon,
  ArrowPathIcon,
  XMarkIcon
} from '@heroicons/react/24/outline';
import { useCanvasState } from '@/app/hooks/useCanvasState';
import { useKeyboardShortcuts } from '@/app/hooks/useKeyboardShortcuts';

// Lazy load editor components for better performance
const EditorToolbar = dynamic(() => import('@/app/components/editor/EditorToolbar'), {
  loading: () => <div className="h-16 bg-gray-100 rounded-lg animate-pulse"></div>
});
const AIDesignAssistant = dynamic(() => import('@/app/components/editor/AIDesignAssistant'));
const CanvasControls = dynamic(() => import('@/app/components/editor/CanvasControls'), {
  loading: () => <div className="h-64 bg-gray-100 rounded-lg animate-pulse"></div>
});
const SideSwitcher = dynamic(() => import('@/app/components/editor/SideSwitcher'), {
  loading: () => <div className="h-32 bg-gray-100 rounded-lg animate-pulse"></div>
});
const PropertiesPanel = dynamic(() => import('@/app/components/editor/PropertiesPanel'), {
  loading: () => <div className="h-48 bg-gray-100 rounded-lg animate-pulse"></div>
});
const CanvasRenderer = dynamic(() => import('@/app/components/editor/CanvasRenderer'), {
  loading: () => (
    <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-200">
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <ArrowPathIcon className="w-12 h-12 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-lg">Ładowanie editora...</p>
          <p className="text-gray-400 text-sm mt-2">Przygotowywanie narzędzi do designu</p>
        </div>
      </div>
    </div>
  )
});

// Fabric.js types
interface FabricCanvas {
  add: (object: any) => void;
  remove: (object: any) => void;
  clear: () => void;
  dispose: () => void;
  getActiveObject: () => any;
  discardActiveObject: () => void;
  renderAll: () => void;
  toDataURL: (options?: any) => string;
  setBackgroundColor: (color: string, callback?: () => void) => void;
  setWidth: (width: number) => void;
  setHeight: (height: number) => void;
  getObjects: () => any[];
  bringToFront: (object: any) => void;
  sendToBack: (object: any) => void;
  on: (event: string, callback: (e: any) => void) => void;
  setActiveObject: (object: any) => void;
}

declare global {
  interface Window {
    fabric: any;
  }
}

export default function CreatorPage() {
  const canvasRef = useRef<FabricCanvas | null>(null);
  const canvasElementRef = useRef<HTMLCanvasElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isFabricLoaded, setIsFabricLoaded] = useState(false);
  const [propertiesUpdateKey, setPropertiesUpdateKey] = useState(0);
  
  // Use custom hooks
  const {
    editorState,
    setEditorState,
    selectedObject,
    setSelectedObject,
    canvasData,
    setCanvasData,
    canvasDataRef,
    currentSideRef,
    canvasSize,
    getCanvasSize,
    calculateOptimalZoom,
    updateCanvasData
  } = useCanvasState();

  // Create reactive canvas size that updates with orientation changes
  const reactiveCanvasSize = useMemo(() => {
    return getCanvasSize(editorState.canvasSize, editorState.orientation);
  }, [editorState.canvasSize, editorState.orientation, getCanvasSize]);

  // Initialize Fabric.js canvas
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/fabric.js/5.3.0/fabric.min.js';
    script.async = true;
    
    script.onload = () => {
      if (window.fabric && canvasElementRef.current) {
        const size = getCanvasSize(editorState.canvasSize, editorState.orientation);
        
        const canvas = new window.fabric.Canvas(canvasElementRef.current, {
          width: size.width,
          height: size.height,
          backgroundColor: editorState.backgroundColor,
        });

        canvasRef.current = canvas;
        setIsFabricLoaded(true);

        // Add default text based on canvas size
        const isBusinessCard = editorState.canvasSize === 'BusinessCard';
        const defaultText = new window.fabric.Textbox(
          isBusinessCard ? 'Jan Kowalski' : 'Mój Plakat', 
          {
            left: isBusinessCard ? 20 : 100,
            top: isBusinessCard ? 30 : 100,
            fontSize: isBusinessCard ? 16 : 48,
            fontFamily: 'Arial',
            fill: '#333333',
            width: isBusinessCard ? 200 : 400,
          }
        );
        canvas.add(defaultText);
        
        // Add subtitle for business card
        if (isBusinessCard) {
          const subtitle = new window.fabric.Textbox('Grafik', {
            left: 20,
            top: 60,
            fontSize: 12,
            fontFamily: 'Arial',
            fill: '#666666',
            width: 150,
          });
          canvas.add(subtitle);
          
          const contact = new window.fabric.Textbox('tel: 123 456 789\nemail@example.com', {
            left: 20,
            top: 120,
            fontSize: 10,
            fontFamily: 'Arial',
            fill: '#888888',
            width: 200,
          });
          canvas.add(contact);
        }

        // Object selection events
        canvas.on('selection:created', (e: any) => {
          setSelectedObject(e.selected[0]);
        });

        canvas.on('selection:updated', (e: any) => {
          setSelectedObject(e.selected[0]);
        });

        canvas.on('selection:cleared', () => {
          setSelectedObject(null);
        });

        // Auto-save when objects are modified
        const saveHandler = () => {
          setTimeout(() => {
            if (!canvasRef.current) return;
            const currentObjects = canvasRef.current.getObjects();
            canvasDataRef.current = {
              ...canvasDataRef.current,
              [currentSideRef.current]: currentObjects.map(obj => obj.toObject())
            };
            setCanvasData({...canvasDataRef.current});
          }, 100);
        };

        canvas.on('object:modified', saveHandler);
        canvas.on('object:added', saveHandler);
        canvas.on('object:removed', saveHandler);
      }
    };

    // Check if Fabric.js is already loaded (from preload)
    if (window.fabric && canvasElementRef.current) {
      // Fabric is already loaded, initialize immediately
      const size = getCanvasSize(editorState.canvasSize, editorState.orientation);
      
      const canvas = new window.fabric.Canvas(canvasElementRef.current, {
        width: size.width,
        height: size.height,
        backgroundColor: editorState.backgroundColor,
      });

      canvasRef.current = canvas;
      setIsFabricLoaded(true);

      // Add default content and setup events like in script.onload
      const isBusinessCard = editorState.canvasSize === 'BusinessCard';
      const defaultText = new window.fabric.Textbox(
        isBusinessCard ? 'Jan Kowalski' : 'Mój Plakat', 
        {
          left: isBusinessCard ? 20 : 100,
          top: isBusinessCard ? 30 : 100,
          fontSize: isBusinessCard ? 16 : 48,
          fontFamily: 'Arial',
          fill: '#333333',
          width: isBusinessCard ? 200 : 400,
        }
      );
      canvas.add(defaultText);
      
      return; // Exit early, no need to load script
    }

    document.head.appendChild(script);

    return () => {
      if (canvasRef.current) {
        canvasRef.current.dispose();
      }
      document.head.removeChild(script);
    };
  }, []);

  // Update canvas size when changed
  useEffect(() => {
    if (canvasRef.current) {
      const size = getCanvasSize(editorState.canvasSize, editorState.orientation);
      canvasRef.current.setWidth(size.width);
      canvasRef.current.setHeight(size.height);
      canvasRef.current.renderAll();
    }
  }, [editorState.canvasSize, editorState.orientation]);

  // Update canvas background
  useEffect(() => {
    if (canvasRef.current) {
      canvasRef.current.setBackgroundColor(editorState.backgroundColor, () => {
        canvasRef.current?.renderAll();
      });
      
      // Update canvas data with new background
      canvasDataRef.current = {
        ...canvasDataRef.current,
        [`${editorState.currentSide}Background`]: editorState.backgroundColor
      };
      
      setCanvasData({
        ...canvasDataRef.current
      });
    }
  }, [editorState.backgroundColor, editorState.currentSide]);

  // Tool functions
  const addText = () => {
    if (!canvasRef.current) return;
    
    const isBusinessCard = editorState.canvasSize === 'BusinessCard';
    const currentCanvasSize = getCanvasSize(editorState.canvasSize, editorState.orientation);
    
    const text = new window.fabric.Textbox('Nowy tekst', {
      left: Math.random() * (currentCanvasSize.width * 0.5) + 20,
      top: Math.random() * (currentCanvasSize.height * 0.5) + 20,
      fontSize: isBusinessCard ? 12 : 24,
      fontFamily: 'Arial',
      fill: '#333333',
      width: isBusinessCard ? 150 : 200,
    });
    
    canvasRef.current.add(text);
    canvasRef.current.setActiveObject(text);
  };

  const addImage = (imageUrl: string) => {
    if (!canvasRef.current) return;
    
    const isBusinessCard = editorState.canvasSize === 'BusinessCard';
    
    window.fabric.Image.fromURL(imageUrl, (img: any) => {
      img.set({
        left: isBusinessCard ? 200 : 100,
        top: isBusinessCard ? 20 : 100,
        scaleX: isBusinessCard ? 0.2 : 0.5,
        scaleY: isBusinessCard ? 0.2 : 0.5,
      });
      canvasRef.current?.add(img);
    });
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        addImage(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const addQRCode = () => {
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent('https://wrzucfotke.pl/gallery/12345')}`;
    addImage(qrUrl);
  };

  const addShape = (shapeType: 'rectangle' | 'circle' | 'triangle' | 'line' | 'horizontal-line' | 'vertical-line') => {
    if (!canvasRef.current) return;
    
    const isBusinessCard = editorState.canvasSize === 'BusinessCard';
    const currentCanvasSize = getCanvasSize(editorState.canvasSize, editorState.orientation);
    const size = isBusinessCard ? 50 : 100;
    const x = Math.random() * (currentCanvasSize.width - size) + 20;
    const y = Math.random() * (currentCanvasSize.height - size) + 20;

    let shape: any;

    switch (shapeType) {
      case 'rectangle':
        shape = new window.fabric.Rect({
          left: x,
          top: y,
          width: size,
          height: size * 0.6,
          fill: '#4F46E5',
          stroke: '#374151',
          strokeWidth: 1,
        });
        break;
        
      case 'circle':
        shape = new window.fabric.Circle({
          left: x,
          top: y,
          radius: size / 2,
          fill: '#EF4444',
          stroke: '#374151',
          strokeWidth: 1,
        });
        break;
        
      case 'triangle':
        shape = new window.fabric.Triangle({
          left: x,
          top: y,
          width: size,
          height: size,
          fill: '#10B981',
          stroke: '#374151',
          strokeWidth: 1,
        });
        break;
        
      case 'line':
        shape = new window.fabric.Line([x, y, x + size, y + size * 0.5], {
          stroke: '#374151',
          strokeWidth: 3,
          selectable: true,
        });
        break;
        
      case 'horizontal-line':
        shape = new window.fabric.Line([x, y, x + size, y], {
          stroke: '#374151',
          strokeWidth: 3,
          selectable: true,
        });
        break;
        
      case 'vertical-line':
        shape = new window.fabric.Line([x, y, x, y + size], {
          stroke: '#374151',
          strokeWidth: 3,
          selectable: true,
        });
        break;
    }

    if (shape) {
      canvasRef.current.add(shape);
      canvasRef.current.setActiveObject(shape);
    }
  };

  const deleteSelected = () => {
    if (canvasRef.current && selectedObject) {
      canvasRef.current.remove(selectedObject);
      setSelectedObject(null);
    }
  };

  const clearCanvas = () => {
    if (canvasRef.current) {
      canvasRef.current.clear();
    }
  };

  const bringToFront = () => {
    if (canvasRef.current && selectedObject) {
      canvasRef.current.bringToFront(selectedObject);
      canvasRef.current.renderAll();
    }
  };

  const sendToBack = () => {
    if (canvasRef.current && selectedObject) {
      canvasRef.current.sendToBack(selectedObject);
      canvasRef.current.renderAll();
    }
  };

  const duplicateSelected = () => {
    if (!canvasRef.current || !selectedObject) return;
    
    selectedObject.clone((cloned: any) => {
      cloned.set({
        left: selectedObject.left + 20,
        top: selectedObject.top + 20,
      });
      canvasRef.current?.add(cloned);
      canvasRef.current?.setActiveObject(cloned);
    });
  };

  const toggleVisibility = () => {
    if (!selectedObject) return;
    
    selectedObject.set('visible', !selectedObject.visible);
    canvasRef.current?.renderAll();
  };

  const toggleLock = () => {
    if (!selectedObject) return;
    
    const isLocked = selectedObject.lockMovementX;
    selectedObject.set({
      lockMovementX: !isLocked,
      lockMovementY: !isLocked,
      lockRotation: !isLocked,
      lockScalingX: !isLocked,
      lockScalingY: !isLocked,
      selectable: isLocked
    });
    canvasRef.current?.renderAll();
  };

  const changeBackground = (color: string) => {
    setEditorState(prev => ({ ...prev, backgroundColor: color }));
  };

  // Save current canvas state to memory
  const saveCurrentCanvasState = () => {
    if (!canvasRef.current) return;
    
    const currentObjects = canvasRef.current.getObjects();
    const currentBg = editorState.backgroundColor;
    
    canvasDataRef.current = {
      ...canvasDataRef.current,
      [editorState.currentSide]: currentObjects.map(obj => obj.toObject()),
      [`${editorState.currentSide}Background`]: currentBg
    };
    
    setCanvasData({
      ...canvasDataRef.current
    });
  };

  // Load canvas state from memory
  const loadCanvasState = (side: 'front' | 'back') => {
    if (!canvasRef.current || !window.fabric) return;
    
    // Save current state before switching
    if (canvasRef.current) {
      const currentObjects = canvasRef.current.getObjects();
      const currentBg = editorState.backgroundColor;
      
      canvasDataRef.current = {
        ...canvasDataRef.current,
        [editorState.currentSide]: currentObjects.map(obj => obj.toObject()),
        [`${editorState.currentSide}Background`]: currentBg
      };
    }
    
    // Clear canvas
    canvasRef.current.clear();
    
    // Load objects for the selected side
    const objectsData = canvasDataRef.current[side];
    const backgroundColor = canvasDataRef.current[`${side}Background` as keyof typeof canvasDataRef.current] as string;
    
    // Set background
    canvasRef.current.setBackgroundColor(backgroundColor, () => {
      canvasRef.current?.renderAll();
    });
    
    // Update editor state background
    setEditorState(prev => ({ ...prev, backgroundColor }));
    
    // Add objects
    objectsData.forEach((objData: any) => {
      window.fabric.util.enlivenObjects([objData], (objects: any[]) => {
        objects.forEach(obj => {
          if (canvasRef.current) {
            canvasRef.current.add(obj);
          }
        });
        canvasRef.current?.renderAll();
      });
    });
  };

  // Switch between front and back
  const switchSide = (side: 'front' | 'back') => {
    if (side === editorState.currentSide) return;
    
    loadCanvasState(side);
    setEditorState(prev => ({ ...prev, currentSide: side }));
    setSelectedObject(null);
  };

  // Add divider lines to split the canvas
  const addDivider = (type: '2h' | '2v' | '3h' | '3v' | '4grid' | '3left' | '3right' | '3leftH' | '3rightH') => {
    if (!canvasRef.current) return;
    
    const currentCanvasSize = getCanvasSize(editorState.canvasSize, editorState.orientation);
    const { width, height } = currentCanvasSize;
    
    // Style for divider lines
    const lineStyle = {
      stroke: '#8B5CF6',
      strokeWidth: 1,
      strokeDashArray: [5, 5],
      selectable: true,
      opacity: 0.7
    };

    switch (type) {
      case '2h': // Horizontal split
        const hLine = new window.fabric.Line([0, height / 2, width, height / 2], {
          ...lineStyle,
          name: 'divider-2h'
        });
        canvasRef.current.add(hLine);
        break;
        
      case '2v': // Vertical split
        const vLine = new window.fabric.Line([width / 2, 0, width / 2, height], {
          ...lineStyle,
          name: 'divider-2v'
        });
        canvasRef.current.add(vLine);
        break;
        
      case '3h': // Three horizontal sections
        const h1Line = new window.fabric.Line([0, height / 3, width, height / 3], {
          ...lineStyle,
          name: 'divider-3h-1'
        });
        const h2Line = new window.fabric.Line([0, (height / 3) * 2, width, (height / 3) * 2], {
          ...lineStyle,
          name: 'divider-3h-2'
        });
        canvasRef.current.add(h1Line);
        canvasRef.current.add(h2Line);
        break;
        
      case '3v': // Three vertical sections
        const v1Line = new window.fabric.Line([width / 3, 0, width / 3, height], {
          ...lineStyle,
          name: 'divider-3v-1'
        });
        const v2Line = new window.fabric.Line([(width / 3) * 2, 0, (width / 3) * 2, height], {
          ...lineStyle,
          name: 'divider-3v-2'
        });
        canvasRef.current.add(v1Line);
        canvasRef.current.add(v2Line);
        break;
        
      case '3left': // Left half split into two
        const leftLine = new window.fabric.Line([width / 2, 0, width / 2, height], {
          ...lineStyle,
          name: 'divider-3left-main'
        });
        const leftSplit = new window.fabric.Line([width / 4, 0, width / 4, height], {
          ...lineStyle,
          name: 'divider-3left-split'
        });
        canvasRef.current.add(leftLine);
        canvasRef.current.add(leftSplit);
        break;
        
      case '3right': // Right half split into two
        const rightLine = new window.fabric.Line([width / 2, 0, width / 2, height], {
          ...lineStyle,
          name: 'divider-3right-main'
        });
        const rightSplit = new window.fabric.Line([(width / 4) * 3, 0, (width / 4) * 3, height], {
          ...lineStyle,
          name: 'divider-3right-split'
        });
        canvasRef.current.add(rightLine);
        canvasRef.current.add(rightSplit);
        break;
        
      case '3leftH': // Left half split horizontally + right full
        const leftHMain = new window.fabric.Line([width / 2, 0, width / 2, height], {
          ...lineStyle,
          name: 'divider-3leftH-main'
        });
        const leftHSplit = new window.fabric.Line([0, height / 2, width / 2, height / 2], {
          ...lineStyle,
          name: 'divider-3leftH-split'
        });
        canvasRef.current.add(leftHMain);
        canvasRef.current.add(leftHSplit);
        break;
        
      case '3rightH': // Right half split horizontally + left full
        const rightHMain = new window.fabric.Line([width / 2, 0, width / 2, height], {
          ...lineStyle,
          name: 'divider-3rightH-main'
        });
        const rightHSplit = new window.fabric.Line([width / 2, height / 2, width, height / 2], {
          ...lineStyle,
          name: 'divider-3rightH-split'
        });
        canvasRef.current.add(rightHMain);
        canvasRef.current.add(rightHSplit);
        break;
        
      case '4grid': // 2x2 grid
        const gridH = new window.fabric.Line([0, height / 2, width, height / 2], {
          ...lineStyle,
          name: 'divider-4grid-h'
        });
        const gridV = new window.fabric.Line([width / 2, 0, width / 2, height], {
          ...lineStyle,
          name: 'divider-4grid-v'
        });
        canvasRef.current.add(gridH);
        canvasRef.current.add(gridV);
        break;
    }
    
    canvasRef.current.renderAll();
  };

  // Export to PDF functionality
  const exportToPDF = async () => {
    if (!canvasRef.current) return;
    
    setEditorState(prev => ({ ...prev, isGenerating: true }));
    
    try {
      saveCurrentCanvasState();
      
      const shouldExportBothSides = (editorState.canvasSize !== 'Square') && 
                                   (canvasDataRef.current.front.length > 0 || canvasDataRef.current.back.length > 0);
      
      if (shouldExportBothSides) {
        const frontDataURL = await generateSideImage('front');
        const backDataURL = await generateSideImage('back');
        
        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            frontImageData: frontDataURL,
            backImageData: backDataURL,
            size: editorState.canvasSize,
            orientation: editorState.orientation,
            doubleSided: true,
            filename: `${editorState.canvasSize === 'BusinessCard' ? 'wizytowka' : editorState.canvasSize === 'A5' ? 'broszura' : 'dokument'}-dwustronna-${Date.now()}.pdf`
          }),
        });

        if (response.ok) {
          const blob = await response.blob();
          downloadBlob(blob, `${editorState.canvasSize === 'BusinessCard' ? 'wizytowka' : editorState.canvasSize === 'A5' ? 'broszura' : 'dokument'}-dwustronna.pdf`);
        }
      } else {
        const dataURL = canvasRef.current.toDataURL({
          format: 'png',
          quality: 1,
          multiplier: 2
        });

        const response = await fetch('/api/generate-pdf', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            imageData: dataURL,
            size: editorState.canvasSize,
            orientation: editorState.orientation,
            filename: `${editorState.canvasSize === 'BusinessCard' ? 'wizytowka' : 'plakat'}-${Date.now()}.pdf`
          }),
        });

        if (response.ok) {
          const blob = await response.blob();
          downloadBlob(blob, `${editorState.canvasSize === 'BusinessCard' ? 'wizytowka' : 'plakat'}.pdf`);
        }
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    } finally {
      setEditorState(prev => ({ ...prev, isGenerating: false }));
    }
  };

  // Generate image for specific side
  const generateSideImage = async (side: 'front' | 'back'): Promise<string> => {
    if (!canvasRef.current || !window.fabric) return '';
    
    const tempCanvas = new window.fabric.Canvas(null, {
      width: canvasSize.width,
      height: canvasSize.height,
    });
    
    const bgColor = canvasDataRef.current[`${side}Background` as keyof typeof canvasDataRef.current] as string;
    tempCanvas.setBackgroundColor(bgColor, () => {});
    
    const objectsData = canvasDataRef.current[side];
    
    return new Promise((resolve) => {
      if (objectsData.length === 0) {
        resolve(tempCanvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 }));
        return;
      }
      
      window.fabric.util.enlivenObjects(objectsData, (objects: any[]) => {
        objects.forEach(obj => tempCanvas.add(obj));
        tempCanvas.renderAll();
        resolve(tempCanvas.toDataURL({ format: 'png', quality: 1, multiplier: 2 }));
      });
    });
  };

  // Helper function to download blob
  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  // Update functions for properties panel
  const updateSelectedText = (property: string, value: any) => {
    if (selectedObject && selectedObject.type === 'textbox') {
      selectedObject.set(property, value);
      canvasRef.current?.renderAll();
      
      // Force PropertiesPanel re-render
      setPropertiesUpdateKey(prev => prev + 1);
      
      // Save changes to canvas data
      setTimeout(() => {
        if (!canvasRef.current) return;
        const currentObjects = canvasRef.current.getObjects();
        canvasDataRef.current = {
          ...canvasDataRef.current,
          [editorState.currentSide]: currentObjects.map(obj => obj.toObject())
        };
        setCanvasData({...canvasDataRef.current});
      }, 100);
    }
  };

  const updateSelectedShape = (property: string, value: any) => {
    if (selectedObject && ['rect', 'circle', 'triangle', 'line'].includes(selectedObject.type)) {
      if (property === 'coords') {
        selectedObject.set(value);
      } else {
        selectedObject.set(property, value);
      }
      canvasRef.current?.renderAll();
      
      // Force PropertiesPanel re-render
      setPropertiesUpdateKey(prev => prev + 1);
      
      // Save changes to canvas data
      setTimeout(() => {
        if (!canvasRef.current) return;
        const currentObjects = canvasRef.current.getObjects();
        canvasDataRef.current = {
          ...canvasDataRef.current,
          [editorState.currentSide]: currentObjects.map(obj => obj.toObject())
        };
        setCanvasData({...canvasDataRef.current});
      }, 100);
    }
  };

  // Toolbar handlers
  const handleToolSelect = (toolId: string) => {
    setEditorState(prev => ({ ...prev, selectedTool: toolId as any }));
  };

  const toggleAI = () => {
    setEditorState(prev => ({ ...prev, showAI: !prev.showAI }));
  };

  // AI Design Assistant handlers
  const handleApplyDesign = (designData: any) => {
    if (!canvasRef.current) return;

    canvasRef.current.clear();
    
    if (designData.elements) {
      designData.elements.forEach((element: any) => {
        let fabricObject;
        
        switch (element.type) {
          case 'text':
            fabricObject = new window.fabric.Textbox(element.text, {
              left: element.left,
              top: element.top,
              fontSize: element.fontSize,
              fill: element.fill,
              fontFamily: element.fontFamily || 'Arial'
            });
            break;
          case 'rectangle':
            fabricObject = new window.fabric.Rect({
              left: element.left,
              top: element.top,
              width: element.width,
              height: element.height,
              fill: element.fill
            });
            break;
          case 'circle':
            fabricObject = new window.fabric.Circle({
              left: element.left,
              top: element.top,
              radius: element.radius,
              fill: element.fill
            });
            break;
          default:
            return;
        }
        
        if (fabricObject && canvasRef.current) {
          canvasRef.current.add(fabricObject);
        }
      });
    }
    
    if (designData.backgroundColor) {
      canvasRef.current.setBackgroundColor(designData.backgroundColor, () => {
        canvasRef.current?.renderAll();
      });
    }
    
    canvasRef.current.renderAll();
    setEditorState(prev => ({ ...prev, showAI: false }));
  };

  // Keyboard shortcuts
  useKeyboardShortcuts({
    editorState,
    setEditorState,
    selectedObject,
    onAddText: addText,
    onAddImage: () => fileInputRef.current?.click(),
    onAddQRCode: addQRCode,
    onSwitchSide: switchSide,
    onDeleteSelected: deleteSelected,
    onDuplicateSelected: duplicateSelected
  });

  return (
    <div className="h-screen bg-gray-50 flex flex-col">
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h1 className="text-3xl font-bold text-gray-900">
                  {editorState.canvasSize === 'BusinessCard' 
                    ? '💳 Kreator Wizytówek' 
                    : editorState.canvasSize === 'A5'
                    ? '📖 Kreator Broszur'
                    : '🎨 Edytor Plakatu'
                  }
                </h1>
                
                {/* Side indicator for two-sided documents */}
                {editorState.canvasSize !== 'Square' && (
                  <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                    editorState.currentSide === 'front'
                      ? 'bg-indigo-100 text-indigo-700'
                      : 'bg-purple-100 text-purple-700'
                  }`}>
                    {editorState.currentSide === 'front' ? '📄 Przód' : '📋 Tył'}
                  </div>
                )}
              </div>
              
              <p className="text-gray-600">
                {editorState.canvasSize === 'BusinessCard' 
                  ? `Zaprojektuj profesjonalną wizytówkę z własnym logo i danymi ${
                      (canvasData.front.length > 0 || canvasData.back.length > 0) ? '• Dwustronna wizytówka' : ''
                    }`
                  : editorState.canvasSize === 'A5'
                  ? `Stwórz profesjonalną broszurę z informacjami ${
                      (canvasData.front.length > 0 || canvasData.back.length > 0) ? '• Dwustronna broszura' : ''
                    }`
                  : 'Stwórz profesjonalny plakat dla swojego wydarzenia'
                }
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={clearCanvas}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg transition-colors"
              >
                <TrashIcon className="w-5 h-5 mr-2" />
                Wyczyść
              </button>
              
              <button
                onClick={exportToPDF}
                disabled={editorState.isGenerating}
                className="flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {editorState.isGenerating ? (
                  <>
                    <ArrowPathIcon className="w-5 h-5 mr-2 animate-spin" />
                    Generowanie...
                  </>
                ) : (
                  <>
                    <DocumentArrowDownIcon className="w-5 h-5 mr-2" />
                    Pobierz PDF
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 overflow-hidden">
        <Suspense fallback={
          <div className="flex flex-col h-full">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
              <div className="h-20 bg-gray-100 rounded-lg animate-pulse"></div>
            </div>
            <div className="h-16 bg-gray-100 rounded-lg animate-pulse mb-4"></div>
            <div className="flex-1 bg-gray-100 rounded-lg animate-pulse"></div>
          </div>
        }>
          <div className="flex flex-col h-full">
            
            {/* Top Controls Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              
              {/* Side Switcher */}
              <SideSwitcher
                canvasSize={editorState.canvasSize}
                currentSide={editorState.currentSide}
                canvasData={canvasData}
                onSwitchSide={switchSide}
              />
              
              {/* Canvas Controls */}
              <CanvasControls
                canvasSize={editorState.canvasSize}
                orientation={editorState.orientation}
                onSizeChange={(size) => setEditorState(prev => ({ ...prev, canvasSize: size }))}
                getCanvasSize={getCanvasSize}
              />
            </div>

            {/* Editor Toolbar - Full Width */}
            <EditorToolbar
              selectedTool={editorState.selectedTool}
              onToolSelect={handleToolSelect}
              onAddText={addText}
              onAddImage={() => fileInputRef.current?.click()}
              onAddQR={addQRCode}
              onAddShapes={() => setEditorState(prev => ({ ...prev, selectedTool: 'shapes' }))}
              onAddShape={addShape}
              onAddDividers={() => setEditorState(prev => ({ ...prev, selectedTool: 'dividers' }))}
              onAddDivider={addDivider}
              onBackground={() => setEditorState(prev => ({ ...prev, selectedTool: 'background' }))}
              onChangeBackground={changeBackground}
              currentBackground={editorState.backgroundColor}
              onClear={clearCanvas}
              onDuplicate={duplicateSelected}
              selectedObject={selectedObject}
              onToggleVisibility={toggleVisibility}
              onToggleLock={toggleLock}
              onToggleAI={toggleAI}
              currentOrientation={editorState.orientation}
              canvasSize={editorState.canvasSize}
              onOrientationToggle={() => setEditorState(prev => ({ 
                ...prev, 
                orientation: prev.orientation === 'portrait' ? 'landscape' : 'portrait' 
              }))}
            />
            
            {/* Properties Panel - Shows when object is selected */}
            {selectedObject && (
              <div className="mb-4">
                <PropertiesPanel
                  key={`properties-${propertiesUpdateKey}-${selectedObject?.id || 'none'}`}
                  selectedObject={selectedObject}
                  onUpdateText={updateSelectedText}
                  onUpdateShape={updateSelectedShape}
                  onBringToFront={bringToFront}
                  onSendToBack={sendToBack}
                  onDelete={deleteSelected}
                />
              </div>
            )}
            
            {/* Canvas Renderer */}
            <div className="flex-1 min-h-0 pt-2">
              <CanvasRenderer
                canvasElementRef={canvasElementRef}
                canvasSize={reactiveCanvasSize}
                zoom={editorState.zoom}
                onZoomChange={(zoom) => setEditorState(prev => ({ ...prev, zoom }))}
                calculateOptimalZoom={calculateOptimalZoom}
                isLoading={!canvasRef.current || !isFabricLoaded}
              />
            </div>
          </div>
        </Suspense>
      </div>

      {/* AI Design Assistant - Overlay */}
      {editorState.showAI && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-2xl max-w-4xl w-full m-4 max-h-[90vh] overflow-hidden">
            <div className="flex justify-between items-center p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">🤖 AI Asystent Designu</h2>
              <button
                onClick={() => setEditorState(prev => ({ ...prev, showAI: false }))}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-6 h-6 text-gray-600" />
              </button>
            </div>
            
            <div className="p-6 overflow-y-auto max-h-[calc(90vh-80px)]">
              <AIDesignAssistant 
                isOpen={editorState.showAI}
                onClose={() => setEditorState(prev => ({ ...prev, showAI: false }))}
                onApplyDesign={handleApplyDesign}
                canvasSize={editorState.canvasSize}
                orientation={editorState.orientation}
                backendUrl={process.env.NEXT_PUBLIC_AI_BACKEND_URL || 'http://localhost:3001'}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
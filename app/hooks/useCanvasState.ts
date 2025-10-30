'use client';

import { useState, useRef, useEffect } from 'react';

export interface EditorState {
  selectedTool: 'select' | 'text' | 'image' | 'background' | 'qr' | 'shapes' | 'dividers';
  canvasSize: 'A4' | 'A5' | 'Square' | 'BusinessCard';
  backgroundColor: string;
  isGenerating: boolean;
  selectedShape: 'rectangle' | 'circle' | 'triangle' | 'line' | 'horizontal-line' | 'vertical-line';
  orientation: 'portrait' | 'landscape';
  zoom: number;
  showAI: boolean;
  currentSide: 'front' | 'back';
}

export interface CanvasData {
  front: any[];
  back: any[];
  frontBackground: string;
  backBackground: string;
}

export function useCanvasState() {
  const [editorState, setEditorState] = useState<EditorState>({
    selectedTool: 'select',
    canvasSize: 'A4',
    backgroundColor: '#ffffff',
    isGenerating: false,
    selectedShape: 'rectangle',
    orientation: 'portrait',
    zoom: 1,
    showAI: false,
    currentSide: 'front'
  });

  const [selectedObject, setSelectedObject] = useState<any>(null);
  
  // Canvas data storage for both sides - using ref for synchronous access
  const canvasDataRef = useRef<CanvasData>({
    front: [],
    back: [],
    frontBackground: '#ffffff',
    backBackground: '#ffffff'
  });
  
  const [canvasData, setCanvasData] = useState<CanvasData>({
    front: [],
    back: [],
    frontBackground: '#ffffff',
    backBackground: '#ffffff'
  });

  // Ref for current side to use in callbacks
  const currentSideRef = useRef<'front' | 'back'>('front');
  
  // Keep refs in sync with state
  useEffect(() => {
    canvasDataRef.current = canvasData;
  }, [canvasData]);
  
  useEffect(() => {
    currentSideRef.current = editorState.currentSide;
  }, [editorState.currentSide]);

  // Canvas dimensions for different sizes (in pixels at 96 DPI for screen display)
  const getCanvasSize = (size: string, orientation: 'portrait' | 'landscape') => {
    const baseSizes = {
      'A4': { width: 794, height: 1123 },
      'A5': { width: 559, height: 794 },
      'Square': { width: 800, height: 800 },
      'BusinessCard': { width: 354, height: 213 }
    };
    
    const baseSize = baseSizes[size as keyof typeof baseSizes];
    if (!baseSize) return { width: 800, height: 600 };
    
    // Square nie ma orientacji - zawsze kwadrat
    if (size === 'Square') {
      return baseSize;
    }
    
    // Dla landscape zamieniamy width i height
    if (orientation === 'landscape') {
      return { width: baseSize.height, height: baseSize.width };
    }
    
    return baseSize;
  };

  const canvasSize = getCanvasSize(editorState.canvasSize, editorState.orientation);

  // Calculate optimal zoom to fit canvas in viewport
  const calculateOptimalZoom = () => {
    const maxWidth = window.innerWidth < 1024 ? window.innerWidth - 40 : 800; // Desktop max width
    const maxHeight = window.innerHeight - 300; // Leave space for header/footer
    
    const scaleX = maxWidth / canvasSize.width;
    const scaleY = maxHeight / canvasSize.height;
    const optimalZoom = Math.min(scaleX, scaleY, 1); // Never zoom in beyond 100%
    
    return Math.max(optimalZoom, 0.2); // Minimum 20% zoom
  };

  // Update zoom when canvas size or orientation changes
  useEffect(() => {
    const newZoom = calculateOptimalZoom();
    setEditorState(prev => ({ ...prev, zoom: newZoom }));
  }, [editorState.canvasSize, editorState.orientation, canvasSize.width, canvasSize.height]);

  // Update canvas data with auto-save
  const updateCanvasData = () => {
    setTimeout(() => {
      const currentObjects = canvasDataRef.current;
      setCanvasData({ ...currentObjects });
    }, 100);
  };

  return {
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
  };
}
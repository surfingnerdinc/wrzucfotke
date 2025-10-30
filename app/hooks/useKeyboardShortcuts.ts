'use client';

import { useEffect } from 'react';
import { EditorState } from './useCanvasState';

interface UseKeyboardShortcutsProps {
  editorState: EditorState;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  selectedObject: any;
  onAddText: () => void;
  onAddImage: () => void;
  onAddQRCode: () => void;
  onSwitchSide: (side: 'front' | 'back') => void;
  onDeleteSelected: () => void;
  onDuplicateSelected: () => void;
}

export function useKeyboardShortcuts({
  editorState,
  setEditorState,
  selectedObject,
  onAddText,
  onAddImage,
  onAddQRCode,
  onSwitchSide,
  onDeleteSelected,
  onDuplicateSelected
}: UseKeyboardShortcutsProps) {

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in input/textarea
      if ((e.target as HTMLElement)?.tagName === 'INPUT' || (e.target as HTMLElement)?.tagName === 'TEXTAREA') return;
      
      const isCtrl = e.ctrlKey || e.metaKey;
      
      switch (e.key.toLowerCase()) {
        case 'v':
          if (!isCtrl) {
            e.preventDefault();
            setEditorState(prev => ({ ...prev, selectedTool: 'select' }));
          }
          break;
        case 't':
          if (!isCtrl) {
            e.preventDefault();
            onAddText();
          }
          break;
        case 'i':
          if (!isCtrl) {
            e.preventDefault();
            onAddImage();
          }
          break;
        case 's':
          if (!isCtrl) {
            e.preventDefault();
            setEditorState(prev => ({ ...prev, selectedTool: 'shapes' }));
          }
          break;
        case 'q':
          if (!isCtrl) {
            e.preventDefault();
            onAddQRCode();
          }
          break;
        case 'a':
          if (!isCtrl) {
            e.preventDefault();
            setEditorState(prev => ({ ...prev, showAI: !prev.showAI }));
          }
          break;
        case 'f':
          if (!isCtrl && (editorState.canvasSize === 'BusinessCard' || editorState.canvasSize === 'A4')) {
            e.preventDefault();
            onSwitchSide(editorState.currentSide === 'front' ? 'back' : 'front');
          }
          break;
        case 'b':
          if (!isCtrl) {
            e.preventDefault();
            setEditorState(prev => ({ ...prev, selectedTool: 'background' }));
          }
          break;
        case 'd':
          if (isCtrl) {
            e.preventDefault();
            onDuplicateSelected();
          } else if (!isCtrl) {
            e.preventDefault();
            setEditorState(prev => ({ ...prev, selectedTool: 'dividers' }));
          }
          break;
        case 'delete':
        case 'backspace':
          if (selectedObject) {
            e.preventDefault();
            onDeleteSelected();
          }
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedObject, editorState.canvasSize, editorState.currentSide]);
}
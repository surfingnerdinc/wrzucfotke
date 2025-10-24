'use client';

import { useState, useRef } from 'react';
import { 
  DocumentIcon,
  PhotoIcon,
  QrCodeIcon,
  PaintBrushIcon,
  DocumentArrowDownIcon,
  EyeIcon,
  SwatchIcon,
  PlusIcon,
  TrashIcon,
  ArrowPathIcon,
  XMarkIcon,
  ArrowUturnLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface PrintSize {
  id: string;
  name: string;
  description: string;
  dimensions: {
    width: number;
    height: number;
    unit: 'mm' | 'px';
  };
  dpi: number;
  category: 'card' | 'document' | 'poster';
  icon: string;
  maxTextLength: {
    title: number;
    subtitle: number;
    description: number;
  };
}

interface Template {
  id: string;
  name: string;
  description: string;
  preview: string;
  style: 'elegant' | 'modern' | 'vintage' | 'minimal';
  supportedSizes: string[];
}

interface Layout {
  id: string;
  name: string;
  description: string;
  icon: string;
  sections: {
    id: string;
    name: string;
    type: 'text' | 'qr' | 'image' | 'mixed';
    position: 'left' | 'right' | 'top' | 'bottom' | 'center' | 'full';
    size: number; // percentage
  }[];
  supportedSizes: string[];
}

interface SectionContent {
  sectionId: string;
  title?: string;
  subtitle?: string;
  description?: string;
  qrText?: string;
  image?: string;
}

interface CreatorState {
  currentStep: 'size' | 'template' | 'layout' | 'content';
  selectedSize: PrintSize | null;
  selectedTemplate: Template | null;
  selectedLayout: Layout | null;
  orientation: 'portrait' | 'landscape';
  sectionContents: SectionContent[];
  title: string;
  subtitle: string;
  description: string;
  qrCodeText: string;
  backgroundColor: string;
  textColor: string;
  accentColor: string;
  logo: string | null;
}

export default function CreatorPage() {
  const [creatorState, setCreatorState] = useState<CreatorState>({
    currentStep: 'size',
    selectedSize: null,
    selectedTemplate: null,
    selectedLayout: null,
    orientation: 'portrait',
    sectionContents: [],
    title: 'Wesele Ania & Tomek',
    subtitle: '15 czerwca 2024',
    description: 'Skanuj kod QR aby dodać swoje zdjęcia z naszego wesela!',
    qrCodeText: 'https://wrzucfotke.pl/gallery/12345',
    backgroundColor: '#ffffff',
    textColor: '#1f2937',
    accentColor: '#6366f1',
    logo: null
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const printSizes: PrintSize[] = [
    {
      id: 'business-card',
      name: 'Wizytówka',
      description: '85×55mm - standardowa wizytówka',
      dimensions: { width: 85, height: 55, unit: 'mm' },
      dpi: 300,
      category: 'card',
      icon: '💳',
      maxTextLength: { title: 30, subtitle: 25, description: 80 }
    },
    {
      id: 'postcard',
      name: 'Pocztówka',
      description: '148×105mm - A6 landscape',
      dimensions: { width: 148, height: 105, unit: 'mm' },
      dpi: 300,
      category: 'card',
      icon: '📮',
      maxTextLength: { title: 40, subtitle: 35, description: 120 }
    },
    {
      id: 'a5',
      name: 'A5',
      description: '148×210mm - mała ulotka',
      dimensions: { width: 148, height: 210, unit: 'mm' },
      dpi: 300,
      category: 'document',
      icon: '📄',
      maxTextLength: { title: 50, subtitle: 40, description: 200 }
    },
    {
      id: 'a4',
      name: 'A4',
      description: '210×297mm - standardowa kartka',
      dimensions: { width: 210, height: 297, unit: 'mm' },
      dpi: 300,
      category: 'document',
      icon: '📋',
      maxTextLength: { title: 60, subtitle: 50, description: 300 }
    },
    {
      id: 'a3',
      name: 'A3 Plakat',
      description: '297×420mm - mały plakat',
      dimensions: { width: 297, height: 420, unit: 'mm' },
      dpi: 300,
      category: 'poster',
      icon: '🖼️',
      maxTextLength: { title: 40, subtitle: 35, description: 150 }
    },
    {
      id: 'a2',
      name: 'A2 Plakat',
      description: '420×594mm - duży plakat',
      dimensions: { width: 420, height: 594, unit: 'mm' },
      dpi: 300,
      category: 'poster',
      icon: '🎪',
      maxTextLength: { title: 35, subtitle: 30, description: 120 }
    },
    {
      id: 'a1',
      name: 'A1 Plakat',
      description: '594×841mm - bardzo duży plakat',
      dimensions: { width: 594, height: 841, unit: 'mm' },
      dpi: 300,
      category: 'poster',
      icon: '🎭',
      maxTextLength: { title: 25, subtitle: 20, description: 80 }
    }
  ];

  const templates: Template[] = [
    {
      id: 'elegant',
      name: 'Elegancki',
      description: 'Klasyczny design z delikatnymi ornamentami',
      preview: '🎩',
      style: 'elegant',
      supportedSizes: ['business-card', 'postcard', 'a5', 'a4', 'a3']
    },
    {
      id: 'modern',
      name: 'Nowoczesny',
      description: 'Minimalistyczny design z czystymi liniami',
      preview: '💎',
      style: 'modern',
      supportedSizes: ['business-card', 'postcard', 'a5', 'a4', 'a3', 'a2', 'a1']
    },
    {
      id: 'vintage',
      name: 'Vintage',
      description: 'Retro styl z ciepłymi kolorami',
      preview: '📜',
      style: 'vintage',
      supportedSizes: ['postcard', 'a5', 'a4', 'a3']
    },
    {
      id: 'minimal',
      name: 'Minimalistyczny',
      description: 'Czysty design z dużą ilością białej przestrzeni',
      preview: '⚪',
      style: 'minimal',
      supportedSizes: ['business-card', 'postcard', 'a5', 'a4', 'a3', 'a2', 'a1']
    }
  ];

  const layouts: Layout[] = [
    // Simple full-width layouts for cards
    {
      id: 'single-full',
      name: 'Pełny',
      description: 'Jedna sekcja na całej powierzchni',
      icon: '⬜',
      sections: [
        { id: 'main', name: 'Główna sekcja', type: 'mixed', position: 'full', size: 100 }
      ],
      supportedSizes: ['business-card', 'postcard']
    },
    
    // A5 and larger formats - multiple layout options
    {
      id: 'split-horizontal',
      name: 'Podział poziomy',
      description: 'Góra i dół - idealne na tytuł i treść',
      icon: '⬛',
      sections: [
        { id: 'top', name: 'Górna sekcja', type: 'text', position: 'top', size: 40 },
        { id: 'bottom', name: 'Dolna sekcja', type: 'mixed', position: 'bottom', size: 60 }
      ],
      supportedSizes: ['a5', 'a4', 'a3', 'a2', 'a1']
    },
    
    {
      id: 'split-vertical',
      name: 'Podział pionowy',
      description: 'Lewa i prawa strona - tekst z QR kodem',
      icon: '◼️',
      sections: [
        { id: 'left', name: 'Lewa sekcja', type: 'text', position: 'left', size: 60 },
        { id: 'right', name: 'Prawa sekcja', type: 'qr', position: 'right', size: 40 }
      ],
      supportedSizes: ['a5', 'a4', 'a3', 'a2', 'a1']
    },
    
    {
      id: 'thirds-horizontal',
      name: 'Trzy poziome',
      description: 'Nagłówek, treść i stopka',
      icon: '▦',
      sections: [
        { id: 'header', name: 'Nagłówek', type: 'text', position: 'top', size: 25 },
        { id: 'content', name: 'Treść główna', type: 'text', position: 'center', size: 50 },
        { id: 'footer', name: 'Stopka z QR', type: 'qr', position: 'bottom', size: 25 }
      ],
      supportedSizes: ['a4', 'a3', 'a2', 'a1']
    },
    
    {
      id: 'asymmetric',
      name: 'Asymetryczny',
      description: 'Duża lewa sekcja i mała prawa',
      icon: '▬',
      sections: [
        { id: 'main', name: 'Główna treść', type: 'text', position: 'left', size: 70 },
        { id: 'sidebar', name: 'Panel boczny', type: 'mixed', position: 'right', size: 30 }
      ],
      supportedSizes: ['a4', 'a3', 'a2', 'a1']
    },
    
    {
      id: 'center-focus',
      name: 'Centralny fokus',
      description: 'Centrum z marginesami po bokach',
      icon: '◊',
      sections: [
        { id: 'left-margin', name: 'Lewa strona', type: 'image', position: 'left', size: 20 },
        { id: 'center', name: 'Centrum', type: 'mixed', position: 'center', size: 60 },
        { id: 'right-margin', name: 'Prawa strona', type: 'qr', position: 'right', size: 20 }
      ],
      supportedSizes: ['a3', 'a2', 'a1']
    }
  ];

  const updateCreatorState = (updates: Partial<CreatorState>) => {
    setCreatorState(prev => ({ ...prev, ...updates }));
  };

  const goToNextStep = () => {
    if (creatorState.currentStep === 'size' && creatorState.selectedSize) {
      updateCreatorState({ currentStep: 'template' });
    } else if (creatorState.currentStep === 'template' && creatorState.selectedTemplate) {
      updateCreatorState({ currentStep: 'layout' });
    } else if (creatorState.currentStep === 'layout' && creatorState.selectedLayout) {
      // Initialize section contents based on selected layout
      const initialContents = creatorState.selectedLayout.sections.map(section => ({
        sectionId: section.id,
        title: section.type === 'text' || section.type === 'mixed' ? 'Tytuł sekcji' : undefined,
        subtitle: section.type === 'text' || section.type === 'mixed' ? 'Podtytuł' : undefined,
        description: section.type === 'text' || section.type === 'mixed' ? 'Opis zawartości tej sekcji...' : undefined,
        qrText: section.type === 'qr' || section.type === 'mixed' ? 'https://wrzucfotke.pl/gallery/12345' : undefined,
      }));
      updateCreatorState({ currentStep: 'content', sectionContents: initialContents });
    }
  };

  const goToPreviousStep = () => {
    if (creatorState.currentStep === 'content') {
      updateCreatorState({ currentStep: 'layout' });
    } else if (creatorState.currentStep === 'layout') {
      updateCreatorState({ currentStep: 'template' });
    } else if (creatorState.currentStep === 'template') {
      updateCreatorState({ currentStep: 'size' });
    }
  };

  const resetCreator = () => {
    setCreatorState({
      currentStep: 'size',
      selectedSize: null,
      selectedTemplate: null,
      selectedLayout: null,
      orientation: 'portrait',
      sectionContents: [],
      title: 'Wesele Ania & Tomek',
      subtitle: '15 czerwca 2024',
      description: 'Skanuj kod QR aby dodać swoje zdjęcia z naszego wesela!',
      qrCodeText: 'https://wrzucfotke.pl/gallery/12345',
      backgroundColor: '#ffffff',
      textColor: '#1f2937',
      accentColor: '#6366f1',
      logo: null
    });
  };

  const getAvailableTemplates = () => {
    if (!creatorState.selectedSize) return [];
    return templates.filter(template => 
      template.supportedSizes.includes(creatorState.selectedSize!.id)
    );
  };

  const getAvailableLayouts = () => {
    if (!creatorState.selectedSize) return [];
    return layouts.filter(layout => 
      layout.supportedSizes.includes(creatorState.selectedSize!.id)
    );
  };

  const updateSectionContent = (sectionId: string, updates: Partial<SectionContent>) => {
    const newContents = creatorState.sectionContents.map(content => 
      content.sectionId === sectionId 
        ? { ...content, ...updates }
        : content
    );
    updateCreatorState({ sectionContents: newContents });
  };

  const getSectionContent = (sectionId: string): SectionContent | undefined => {
    return creatorState.sectionContents.find(content => content.sectionId === sectionId);
  };

  const getCurrentDimensions = () => {
    if (!creatorState.selectedSize) return null;
    
    const { width, height, unit } = creatorState.selectedSize.dimensions;
    return creatorState.orientation === 'landscape' 
      ? { width: Math.max(width, height), height: Math.min(width, height), unit }
      : { width: Math.min(width, height), height: Math.max(width, height), unit };
  };

  const canChangeOrientation = () => {
    return creatorState.selectedSize?.category !== 'card'; // Wizytówki mają stałą orientację
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        updateCreatorState({ logo: e.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const generateQRCode = async (text: string): Promise<string> => {
    // Prosta implementacja QR kodu - w prawdziwej aplikacji użyj biblioteki jak 'qrcode'
    return `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(text)}`;
  };

  const generatePDF = async () => {
    if (!creatorState.selectedTemplate || !creatorState.selectedSize) return;

    setIsGenerating(true);
    
    try {
      const qrCodeUrl = await generateQRCode(creatorState.qrCodeText);
      
      const htmlContent = await generateHTMLTemplate(qrCodeUrl);
      
      const currentDimensions = getCurrentDimensions();
      
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          html: htmlContent,
          filename: `${creatorState.selectedSize.name.toLowerCase()}-${creatorState.orientation}-${creatorState.selectedTemplate.id}-${Date.now()}.pdf`,
          size: {
            ...creatorState.selectedSize,
            dimensions: currentDimensions || creatorState.selectedSize.dimensions
          },
          orientation: creatorState.orientation
        }),
      });

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.style.display = 'none';
        a.href = url;
        a.download = `${creatorState.selectedSize.name}-${creatorState.selectedTemplate.name}.pdf`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
      } else {
        console.error('Failed to generate PDF');
      }
    } catch (error) {
      console.error('Error generating PDF:', error);
    }

    setIsGenerating(false);
  };

  const generateHTMLTemplate = async (qrCodeUrl: string): Promise<string> => {
    const template = creatorState.selectedTemplate;
    const size = creatorState.selectedSize;
    if (!template || !size) return '';

    const currentDimensions = getCurrentDimensions() || size.dimensions;

    // Calculate dimensions for HTML (convert mm to px at 96 DPI for screen, but PDF will use actual size)
    const pixelWidth = currentDimensions.unit === 'mm' 
      ? Math.round(currentDimensions.width * 3.78) // mm to px conversion
      : currentDimensions.width;
    const pixelHeight = currentDimensions.unit === 'mm' 
      ? Math.round(currentDimensions.height * 3.78)
      : currentDimensions.height;

    // Responsive font sizes based on format
    const getFontSizes = () => {
      const category = size.category;
      if (category === 'card') {
        return { title: '18px', subtitle: '12px', description: '10px', qr: '100px' };
      } else if (category === 'document') {
        return { title: '32px', subtitle: '20px', description: '16px', qr: '150px' };
      } else { // poster
        return { title: '48px', subtitle: '28px', description: '20px', qr: '200px' };
      }
    };

    const fonts = getFontSizes();

    const baseStyles = `
      body { 
        margin: 0; 
        padding: 0; 
        font-family: 'Arial', sans-serif; 
        background: ${creatorState.backgroundColor}; 
        color: ${creatorState.textColor};
        width: ${pixelWidth}px;
        height: ${pixelHeight}px;
        overflow: hidden;
      }
      .container { 
        width: ${pixelWidth}px; 
        height: ${pixelHeight}px; 
        position: relative;
        background: ${creatorState.backgroundColor};
        overflow: hidden;
      }
      .qr-code img { width: ${fonts.qr}; height: ${fonts.qr}; }
    `;

    switch (template.style) {
      case 'elegant':
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              ${baseStyles}
              .elegant {
                padding: 60px;
                text-align: center;
                background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
                position: relative;
              }
              .elegant::before {
                content: '';
                position: absolute;
                top: 20px;
                left: 20px;
                right: 20px;
                bottom: 20px;
                border: 2px solid ${creatorState.accentColor};
                border-radius: 15px;
              }
              .elegant h1 {
                font-size: ${fonts.title};
                margin: 0 0 ${size.category === 'card' ? '8px' : '20px'} 0;
                color: ${creatorState.accentColor};
                font-weight: bold;
                text-shadow: 2px 2px 4px rgba(0,0,0,0.1);
              }
              .elegant h2 {
                font-size: ${fonts.subtitle};
                margin: 0 0 ${size.category === 'card' ? '10px' : '30px'} 0;
                color: ${creatorState.textColor};
                opacity: 0.8;
              }
              .elegant p {
                font-size: ${fonts.description};
                margin: 0 0 ${size.category === 'card' ? '15px' : '40px'} 0;
                line-height: 1.6;
                max-width: ${size.category === 'poster' ? '70%' : '90%'};
                margin-left: auto;
                margin-right: auto;
              }
              .qr-section {
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 30px;
              }
              .qr-code {
                border: 3px solid ${creatorState.accentColor};
                border-radius: 10px;
                padding: 10px;
                background: white;
              }
              .ornament {
                position: absolute;
                font-size: 60px;
                opacity: 0.1;
                color: ${creatorState.accentColor};
              }
              .ornament-1 { top: 30px; left: 30px; }
              .ornament-2 { top: 30px; right: 30px; }
              .ornament-3 { bottom: 30px; left: 30px; }
              .ornament-4 { bottom: 30px; right: 30px; }
            </style>
          </head>
          <body>
            <div class="container elegant">
              <div class="ornament ornament-1">❋</div>
              <div class="ornament ornament-2">❋</div>
              <div class="ornament ornament-3">❋</div>
              <div class="ornament ornament-4">❋</div>
              
              <h1>${creatorState.title}</h1>
              <h2>${creatorState.subtitle}</h2>
              <p>${creatorState.description}</p>
              
              <div class="qr-section">
                <div>
                  <img src="${qrCodeUrl}" alt="QR Code" class="qr-code" width="150" height="150">
                  <div style="margin-top: 15px; font-size: 14px; opacity: 0.7;">Skanuj aby dodać zdjęcia</div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

      case 'modern':
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              ${baseStyles}
              .modern {
                padding: 0;
                display: grid;
                grid-template-columns: 1fr 1fr;
                height: 100%;
              }
              .left-section {
                background: linear-gradient(135deg, ${creatorState.accentColor} 0%, ${creatorState.accentColor}dd 100%);
                padding: 60px 40px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                color: white;
              }
              .right-section {
                padding: 60px 40px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                background: ${creatorState.backgroundColor};
              }
              .modern h1 {
                font-size: 42px;
                margin: 0 0 15px 0;
                font-weight: 300;
                letter-spacing: -1px;
              }
              .modern h2 {
                font-size: 20px;
                margin: 0 0 30px 0;
                opacity: 0.9;
                font-weight: 300;
              }
              .modern p {
                font-size: 16px;
                line-height: 1.6;
                opacity: 0.8;
              }
              .qr-modern {
                text-align: center;
              }
              .qr-modern img {
                border-radius: 15px;
                box-shadow: 0 10px 30px rgba(0,0,0,0.2);
              }
              .accent-bar {
                width: 60px;
                height: 4px;
                background: white;
                margin: 30px 0;
              }
            </style>
          </head>
          <body>
            <div class="container modern">
              <div class="left-section">
                <h1>${creatorState.title}</h1>
                <div class="accent-bar"></div>
                <h2>${creatorState.subtitle}</h2>
                <p>${creatorState.description}</p>
              </div>
              <div class="right-section">
                <div class="qr-modern">
                  <img src="${qrCodeUrl}" alt="QR Code" width="200" height="200">
                  <div style="margin-top: 20px; font-size: 14px; color: ${creatorState.textColor}; opacity: 0.7;">
                    Skanuj kod QR
                  </div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

      case 'vintage':
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              ${baseStyles}
              .vintage {
                padding: 50px;
                text-align: center;
                background: linear-gradient(45deg, #f4e4c1 0%, #e8d5b7 50%, #d4af37 100%);
                position: relative;
                font-family: 'Georgia', serif;
              }
              .vintage::before {
                content: '';
                position: absolute;
                top: 30px;
                left: 30px;
                right: 30px;
                bottom: 30px;
                border: 3px double #8b4513;
                border-radius: 20px;
              }
              .vintage h1 {
                font-size: 44px;
                margin: 0 0 10px 0;
                color: #8b4513;
                font-weight: bold;
                text-shadow: 2px 2px 0px rgba(139, 69, 19, 0.3);
                font-family: 'Georgia', serif;
              }
              .vintage h2 {
                font-size: 22px;
                margin: 0 0 25px 0;
                color: #a0522d;
                font-style: italic;
              }
              .vintage p {
                font-size: 17px;
                margin: 0 0 35px 0;
                line-height: 1.7;
                color: #654321;
                max-width: 450px;
                margin-left: auto;
                margin-right: auto;
              }
              .vintage-frame {
                display: inline-block;
                padding: 15px;
                border: 2px solid #8b4513;
                border-radius: 10px;
                background: rgba(255, 255, 255, 0.8);
                box-shadow: inset 0 0 20px rgba(139, 69, 19, 0.2);
              }
              .decorative-element {
                position: absolute;
                font-size: 30px;
                color: #8b4513;
                opacity: 0.6;
              }
              .dec-1 { top: 60px; left: 60px; transform: rotate(-15deg); }
              .dec-2 { top: 60px; right: 60px; transform: rotate(15deg); }
              .dec-3 { bottom: 60px; left: 60px; transform: rotate(15deg); }
              .dec-4 { bottom: 60px; right: 60px; transform: rotate(-15deg); }
            </style>
          </head>
          <body>
            <div class="container vintage">
              <div class="decorative-element dec-1">❦</div>
              <div class="decorative-element dec-2">❦</div>
              <div class="decorative-element dec-3">❦</div>
              <div class="decorative-element dec-4">❦</div>
              
              <h1>${creatorState.title}</h1>
              <h2>${creatorState.subtitle}</h2>
              <p>${creatorState.description}</p>
              
              <div class="vintage-frame">
                <img src="${qrCodeUrl}" alt="QR Code" width="160" height="160">
                <div style="margin-top: 12px; font-size: 13px; color: #8b4513;">Skanuj dla zdjęć</div>
              </div>
            </div>
          </body>
          </html>
        `;

      case 'minimal':
        return `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="UTF-8">
            <style>
              ${baseStyles}
              .minimal {
                padding: 80px;
                text-align: center;
                background: #ffffff;
              }
              .minimal h1 {
                font-size: 52px;
                margin: 0 0 20px 0;
                color: ${creatorState.textColor};
                font-weight: 100;
                letter-spacing: -2px;
              }
              .minimal h2 {
                font-size: 18px;
                margin: 0 0 60px 0;
                color: ${creatorState.textColor};
                opacity: 0.6;
                font-weight: 300;
                letter-spacing: 2px;
                text-transform: uppercase;
              }
              .minimal p {
                font-size: 16px;
                margin: 0 0 80px 0;
                line-height: 1.8;
                color: ${creatorState.textColor};
                opacity: 0.8;
                max-width: 400px;
                margin-left: auto;
                margin-right: auto;
                font-weight: 300;
              }
              .qr-minimal {
                border: 1px solid ${creatorState.textColor};
                border-opacity: 0.1;
                padding: 30px;
                display: inline-block;
                border-radius: 2px;
              }
              .minimal-accent {
                width: 40px;
                height: 2px;
                background: ${creatorState.accentColor};
                margin: 40px auto;
              }
            </style>
          </head>
          <body>
            <div class="container minimal">
              <h1>${creatorState.title}</h1>
              <div class="minimal-accent"></div>
              <h2>${creatorState.subtitle}</h2>
              <p>${creatorState.description}</p>
              
              <div class="qr-minimal">
                <img src="${qrCodeUrl}" alt="QR Code" width="180" height="180">
                <div style="margin-top: 25px; font-size: 12px; color: ${creatorState.textColor}; opacity: 0.5; letter-spacing: 1px; text-transform: uppercase;">
                  Scan Code
                </div>
              </div>
            </div>
          </body>
          </html>
        `;

      default:
        return '';
    }
  };

  const renderPreview = () => {
    if (!creatorState.selectedTemplate || !creatorState.selectedLayout || !creatorState.selectedSize) return null;

    const layout = creatorState.selectedLayout;
    const size = creatorState.selectedSize;
    const currentDimensions = getCurrentDimensions() || size.dimensions;
    
    // Calculate preview dimensions maintaining aspect ratio
    const aspectRatio = currentDimensions.width / currentDimensions.height;
    const previewWidth = aspectRatio > 1 ? 400 : 300;
    const previewHeight = aspectRatio > 1 ? 400 / aspectRatio : 300 / aspectRatio;

    const renderSection = (section: Layout['sections'][0]) => {
      const content = getSectionContent(section.id);
      
      // Different background colors for different section types
      const getSectionBgColor = () => {
        switch (section.type) {
          case 'text': return '#f9fafb'; // Light gray
          case 'qr': return '#fef3f2'; // Light red
          case 'image': return '#f0f9ff'; // Light blue
          case 'mixed': return '#f7fee7'; // Light green
          default: return creatorState.backgroundColor;
        }
      };
      
      const sectionStyle = {
        backgroundColor: getSectionBgColor(),
        color: creatorState.textColor,
      };

      const getSectionClasses = () => {
        return "border border-gray-200 flex items-center justify-center p-2 min-h-16";
      };

      return (
        <div
          key={section.id}
          className={`${getSectionClasses()} relative`}
          style={sectionStyle}
        >
          <div className="text-center w-full">
            {(section.type === 'text' || section.type === 'mixed') && (
              <>
                {content?.title && (
                  <h3 
                    className="font-bold text-xs mb-1 truncate"
                    style={{ color: creatorState.accentColor }}
                  >
                    {content.title}
                  </h3>
                )}
                {content?.subtitle && (
                  <h4 className="text-xs mb-1 opacity-80 truncate">
                    {content.subtitle}
                  </h4>
                )}
                {content?.description && (
                  <p className="text-xs opacity-70 overflow-hidden">
                    {content.description.length > 40 
                      ? content.description.substring(0, 40) + '...' 
                      : content.description
                    }
                  </p>
                )}
              </>
            )}
            
            {(section.type === 'qr' || (section.type === 'mixed' && content?.qrText)) && (
              <div className="flex flex-col items-center mt-1">
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                  <QrCodeIcon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-xs opacity-60 mt-1">QR</span>
              </div>
            )}
            
            {section.type === 'image' && (
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-gray-300 rounded flex items-center justify-center">
                  <PhotoIcon className="w-4 h-4 text-gray-600" />
                </div>
                <span className="text-xs opacity-60 mt-1">IMG</span>
              </div>
            )}
            
            {/* Section label */}
            <div className="absolute top-0 left-0 bg-indigo-500 text-white text-xs px-1 py-0.5 rounded-br opacity-80 z-10">
              {section.name.split(' ')[0]}
            </div>
          </div>
        </div>
      );
    };

    // Determine grid layout based on layout type
    const getGridClasses = () => {
      switch (layout.id) {
        case 'single-full':
          return "grid-cols-1 grid-rows-1";
        case 'split-horizontal':
          return "grid-cols-1 grid-rows-2";
        case 'split-vertical':
        case 'asymmetric':
          return "grid-cols-2 grid-rows-1";
        case 'thirds-horizontal':
          return "grid-cols-1 grid-rows-3";
        case 'center-focus':
          return "grid-cols-3 grid-rows-1";
        default:
          return "grid-cols-2 grid-rows-2";
      }
    };

    return (
      <div className="bg-gray-100 rounded-xl p-8 flex items-center justify-center">
        <div className="relative">
          {/* Size indicator */}
          <div className="text-center mb-4">
            <div className="inline-flex items-center px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-xs font-medium">
              {size.icon} {size.name} - {layout.name}
            </div>
          </div>
          
          {/* Preview container */}
          <div 
            className={`bg-white rounded-lg shadow-lg overflow-hidden grid gap-0.5 relative ${getGridClasses()}`}
            style={{ 
              width: `${previewWidth}px`, 
              height: `${previewHeight}px`,
              backgroundColor: creatorState.backgroundColor,
              ...(layout.id === 'split-vertical' && {
                gridTemplateColumns: `${layout.sections[0]?.size || 60}fr ${layout.sections[1]?.size || 40}fr`
              }),
              ...(layout.id === 'asymmetric' && {
                gridTemplateColumns: `${layout.sections[0]?.size || 70}fr ${layout.sections[1]?.size || 30}fr`
              }),
              ...(layout.id === 'center-focus' && {
                gridTemplateColumns: `${layout.sections[0]?.size || 20}fr ${layout.sections[1]?.size || 60}fr ${layout.sections[2]?.size || 20}fr`
              }),
              ...(layout.id === 'split-horizontal' && {
                gridTemplateRows: `${layout.sections[0]?.size || 40}fr ${layout.sections[1]?.size || 60}fr`
              }),
              ...(layout.id === 'thirds-horizontal' && {
                gridTemplateRows: `${layout.sections[0]?.size || 25}fr ${layout.sections[1]?.size || 50}fr ${layout.sections[2]?.size || 25}fr`
              })
            }}
          >
            {layout.sections.map(renderSection)}
          </div>
          
          {/* Layout info */}
          <div className="text-center mt-3 text-xs text-gray-600">
            {layout.sections.length} sekcji • {currentDimensions.width}×{currentDimensions.height}mm
            {creatorState.orientation && size.category !== 'card' && (
              <span className="ml-2">• {creatorState.orientation === 'portrait' ? 'Pionowy' : 'Poziomy'}</span>
            )}
          </div>
        </div>
      </div>
    );
  };

  const renderStepIndicator = () => (
    <div className="flex items-center justify-center space-x-4 mb-8">
      <div className={`flex items-center ${creatorState.currentStep === 'size' ? 'text-indigo-600' : creatorState.selectedSize ? 'text-green-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${creatorState.currentStep === 'size' ? 'bg-indigo-100' : creatorState.selectedSize ? 'bg-green-100' : 'bg-gray-100'}`}>
          1
        </div>
        <span className="ml-2 text-sm font-medium">Rozmiar</span>
      </div>
      
      <div className={`w-8 h-0.5 ${creatorState.selectedSize ? 'bg-green-500' : 'bg-gray-300'}`}></div>
      
      <div className={`flex items-center ${creatorState.currentStep === 'template' ? 'text-indigo-600' : creatorState.selectedTemplate ? 'text-green-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${creatorState.currentStep === 'template' ? 'bg-indigo-100' : creatorState.selectedTemplate ? 'bg-green-100' : 'bg-gray-100'}`}>
          2
        </div>
        <span className="ml-2 text-sm font-medium">Szablon</span>
      </div>
      
      <div className={`w-8 h-0.5 ${creatorState.selectedTemplate ? 'bg-green-500' : 'bg-gray-300'}`}></div>
      
      <div className={`flex items-center ${creatorState.currentStep === 'layout' ? 'text-indigo-600' : creatorState.selectedLayout ? 'text-green-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${creatorState.currentStep === 'layout' ? 'bg-indigo-100' : creatorState.selectedLayout ? 'bg-green-100' : 'bg-gray-100'}`}>
          3
        </div>
        <span className="ml-2 text-sm font-medium">Layout</span>
      </div>
      
      <div className={`w-8 h-0.5 ${creatorState.selectedLayout ? 'bg-green-500' : 'bg-gray-300'}`}></div>
      
      <div className={`flex items-center ${creatorState.currentStep === 'content' ? 'text-indigo-600' : 'text-gray-400'}`}>
        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${creatorState.currentStep === 'content' ? 'bg-indigo-100' : 'bg-gray-100'}`}>
          4
        </div>
        <span className="ml-2 text-sm font-medium">Treść</span>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center space-y-4 lg:space-y-0">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Kreator Wizytówek
              </h1>
              <p className="text-gray-600">
                Stwórz profesjonalną wizytówkę lub plakat dla swojego wydarzenia
              </p>
            </div>
            
            <div className="flex items-center space-x-4">
              {creatorState.currentStep !== 'size' && (
                <button
                  onClick={goToPreviousStep}
                  className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg transition-colors"
                >
                  <ArrowUturnLeftIcon className="w-5 h-5 mr-2" />
                  Wstecz
                </button>
              )}

              <button
                onClick={resetCreator}
                className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg transition-colors"
              >
                <XMarkIcon className="w-5 h-5 mr-2" />
                Reset
              </button>
              
              {creatorState.currentStep === 'content' && (
                <>
                  <button
                    onClick={() => setPreviewMode(!previewMode)}
                    className="flex items-center px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg transition-colors"
                  >
                    <EyeIcon className="w-5 h-5 mr-2" />
                    {previewMode ? 'Edycja' : 'Podgląd'}
                  </button>
                  
                  <button
                    onClick={generatePDF}
                    disabled={!creatorState.selectedTemplate || !creatorState.selectedSize || isGenerating}
                    className="flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isGenerating ? (
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
                </>
              )}

              {(creatorState.currentStep === 'size' && creatorState.selectedSize) && (
                <button
                  onClick={goToNextStep}
                  className="flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Dalej
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </button>
              )}

              {(creatorState.currentStep === 'template' && creatorState.selectedTemplate) && (
                <button
                  onClick={goToNextStep}
                  className="flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Dalej
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </button>
              )}

              {(creatorState.currentStep === 'layout' && creatorState.selectedLayout) && (
                <button
                  onClick={goToNextStep}
                  className="flex items-center px-6 py-3 bg-linear-to-r from-indigo-600 to-purple-600 text-white font-medium rounded-xl hover:shadow-lg transition-all duration-200 transform hover:-translate-y-0.5"
                >
                  Dalej
                  <ChevronRightIcon className="w-5 h-5 ml-2" />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderStepIndicator()}
        
        {/* Step 1: Size Selection */}
        {creatorState.currentStep === 'size' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Wybierz rozmiar</h2>
              <p className="text-gray-600">Określ format swojej wizytówki lub plakatu</p>
            </div>

            {/* Orientation Toggle */}
            {creatorState.selectedSize && canChangeOrientation() && (
              <div className="mb-8 flex justify-center">
                <div className="bg-white rounded-xl p-1 border border-gray-200 inline-flex">
                  <button
                    onClick={() => updateCreatorState({ orientation: 'portrait' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      creatorState.orientation === 'portrait'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📄 Pionowy
                  </button>
                  <button
                    onClick={() => updateCreatorState({ orientation: 'landscape' })}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      creatorState.orientation === 'landscape'
                        ? 'bg-indigo-600 text-white shadow-sm'
                        : 'text-gray-600 hover:text-gray-900'
                    }`}
                  >
                    📄 Poziomy
                  </button>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {printSizes.map((size) => {
                const dimensions = getCurrentDimensions();
                const displayDimensions = creatorState.selectedSize?.id === size.id && dimensions
                  ? `${dimensions.width}×${dimensions.height}${dimensions.unit}`
                  : `${size.dimensions.width}×${size.dimensions.height}${size.dimensions.unit}`;

                return (
                  <button
                    key={size.id}
                    onClick={() => updateCreatorState({ selectedSize: size })}
                    className={`p-6 rounded-2xl border-2 transition-all text-left ${
                      creatorState.selectedSize?.id === size.id
                        ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                        : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                  >
                    <div className="text-4xl mb-4">{size.icon}</div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{size.name}</h3>
                    <p className="text-sm text-gray-600 mb-3">{size.description}</p>
                    <div className="text-xs text-gray-500">
                      <div>Wymiary: {displayDimensions}</div>
                      <div>Jakość: {size.dpi} DPI</div>
                      {creatorState.selectedSize?.id === size.id && creatorState.orientation && (
                        <div className="mt-1 px-2 py-1 bg-indigo-100 text-indigo-700 rounded inline-block mr-2">
                          {creatorState.orientation === 'portrait' ? '📄 Pionowy' : '📄 Poziomy'}
                        </div>
                      )}
                      <div className={`mt-1 px-2 py-1 bg-gray-100 rounded text-gray-700 inline-block ${creatorState.selectedSize?.id === size.id && creatorState.orientation ? '' : 'mt-1'}`}>
                        {size.category === 'card' ? 'Wizytówka' : size.category === 'document' ? 'Dokument' : 'Plakat'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Step 2: Template Selection */}
        {creatorState.currentStep === 'template' && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Wybierz szablon</h2>
              <p className="text-gray-600">
                Dostępne szablony dla formatu: {creatorState.selectedSize?.name}
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {getAvailableTemplates().map((template) => (
                <button
                  key={template.id}
                  onClick={() => updateCreatorState({ selectedTemplate: template })}
                  className={`p-6 rounded-2xl border-2 transition-all text-center ${
                    creatorState.selectedTemplate?.id === template.id
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-4xl mb-4">{template.preview}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{template.name}</h3>
                  <p className="text-sm text-gray-600">{template.description}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Layout Selection */}
        {creatorState.currentStep === 'layout' && (
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Wybierz układ treści</h2>
              <p className="text-gray-600">
                Jak chcesz podzielić przestrzeń na formatcie {creatorState.selectedSize?.name}?
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {getAvailableLayouts().map((layout) => (
                <button
                  key={layout.id}
                  onClick={() => updateCreatorState({ selectedLayout: layout })}
                  className={`p-6 rounded-2xl border-2 transition-all text-left ${
                    creatorState.selectedLayout?.id === layout.id
                      ? 'border-indigo-500 bg-indigo-50 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                >
                  <div className="text-4xl mb-4">{layout.icon}</div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{layout.name}</h3>
                  <p className="text-sm text-gray-600 mb-4">{layout.description}</p>
                  
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-gray-700">Sekcje:</div>
                    {layout.sections.map((section) => (
                      <div key={section.id} className="text-xs text-gray-600 bg-gray-100 rounded px-2 py-1">
                        <span className="font-medium">{section.name}</span>
                        <span className="ml-2">
                          ({section.type === 'text' ? '📝' : section.type === 'qr' ? '📱' : section.type === 'image' ? '🖼️' : '🔀'} 
                          {section.size}%)
                        </span>
                      </div>
                    ))}
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 4: Content Editing */}
        {creatorState.currentStep === 'content' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Panel - Section Content Settings */}
            <div className="lg:col-span-1 space-y-6">
              
              {/* Sections Editor */}
              {creatorState.selectedLayout && creatorState.selectedLayout.sections.map((section) => {
                const content = getSectionContent(section.id);
                
                return (
                  <div key={section.id} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                      <span className="text-2xl mr-2">
                        {section.type === 'text' ? '📝' : section.type === 'qr' ? '📱' : section.type === 'image' ? '🖼️' : '🔀'}
                      </span>
                      {section.name}
                      <span className="ml-2 text-sm text-gray-500">({section.size}%)</span>
                    </h3>
                    
                    <div className="space-y-4">
                      {(section.type === 'text' || section.type === 'mixed') && (
                        <>
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              Tytuł sekcji
                            </label>
                            <input
                              type="text"
                              value={content?.title || ''}
                              onChange={(e) => updateSectionContent(section.id, { title: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Wpisz tytuł..."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              Podtytuł
                            </label>
                            <input
                              type="text"
                              value={content?.subtitle || ''}
                              onChange={(e) => updateSectionContent(section.id, { subtitle: e.target.value })}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Wpisz podtytuł..."
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-900 mb-2">
                              Opis
                            </label>
                            <textarea
                              value={content?.description || ''}
                              onChange={(e) => updateSectionContent(section.id, { description: e.target.value })}
                              rows={3}
                              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                              placeholder="Wpisz opis zawartości..."
                            />
                          </div>
                        </>
                      )}
                      
                      {(section.type === 'qr' || section.type === 'mixed') && (
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            QR kod - tekst/URL
                          </label>
                          <input
                            type="text"
                            value={content?.qrText || ''}
                            onChange={(e) => updateSectionContent(section.id, { qrText: e.target.value })}
                            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                            placeholder="https://wrzucfotke.pl/gallery/12345"
                          />
                        </div>
                      )}
                      
                      {section.type === 'image' && (
                        <div>
                          <label className="block text-sm font-medium text-gray-900 mb-2">
                            Grafika
                          </label>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                            <PhotoIcon className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">Kliknij aby dodać grafikę</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
              
              {/* Global Styling */}
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <PaintBrushIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Kolory globalne
                </h3>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Tło
                    </label>
                    <input
                      type="color"
                      value={creatorState.backgroundColor}
                      onChange={(e) => updateCreatorState({ backgroundColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Tekst
                    </label>
                    <input
                      type="color"
                      value={creatorState.textColor}
                      onChange={(e) => updateCreatorState({ textColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-900 mb-2">
                      Akcent
                    </label>
                    <input
                      type="color"
                      value={creatorState.accentColor}
                      onChange={(e) => updateCreatorState({ accentColor: e.target.value })}
                      className="w-full h-10 border border-gray-300 rounded-lg cursor-pointer"
                    />
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Panel - Preview */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                  <EyeIcon className="w-5 h-5 mr-2 text-indigo-600" />
                  Podgląd - {creatorState.selectedSize?.name}
                </h3>
                
                <div className="space-y-4">
                  {renderPreview()}
                  
                  <div className="text-center text-sm text-gray-600">
                    Podgląd w proporcjach {creatorState.selectedSize?.dimensions.width}×{creatorState.selectedSize?.dimensions.height}mm
                    <br />
                    Kliknij "Pobierz PDF" aby otrzymać finalny plik gotowy do druku.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
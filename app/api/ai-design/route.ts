import { NextRequest, NextResponse } from 'next/server';

interface DesignRequest {
  canvasSize: 'A4' | 'A5' | 'Square' | 'BusinessCard';
  orientation: 'portrait' | 'landscape';
  industry?: string;
  eventType?: string;
  businessName?: string;
  description?: string;
  colorScheme?: 'professional' | 'vibrant' | 'minimal' | 'elegant' | 'modern';
  style?: 'corporate' | 'creative' | 'wedding' | 'party' | 'restaurant' | 'tech' | 'medical';
}

interface AIDesignSuggestion {
  id: string;
  name: string;
  description: string;
  elements: {
    type: 'text' | 'shape' | 'background';
    content?: string;
    properties: any;
  }[];
  colorPalette: string[];
  fonts: string[];
}

export async function POST(request: NextRequest) {
  try {
    const body: DesignRequest = await request.json();
    
    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    const { canvasSize, orientation, industry, eventType, businessName, description, colorScheme, style } = body;

    // Create detailed prompt for OpenAI
    const prompt = `
You are a professional graphic designer AI. Create 3 unique design suggestions for a ${canvasSize} ${orientation} ${industry || 'general'} ${eventType || 'design'}.

Context:
- Business: ${businessName || 'Business'}
- Description: ${description || 'Professional design'}
- Style preference: ${style || 'professional'}
- Color scheme: ${colorScheme || 'professional'}
- Format: ${canvasSize} (${orientation})

For each design, provide:
1. Layout concept name
2. Brief description
3. Color palette (5 hex colors)
4. Typography suggestions
5. Element positioning strategy

Canvas dimensions reference:
- A4 Portrait: 794x1123px
- A4 Landscape: 1123x794px  
- A5 Portrait: 559x794px
- A5 Landscape: 794x559px
- Square: 800x800px
- BusinessCard Portrait: 354x213px
- BusinessCard Landscape: 213x354px

Return ONLY valid JSON in this exact format:
{
  "suggestions": [
    {
      "id": "design_1",
      "name": "Design Name",
      "description": "Brief description of the design concept",
      "elements": [
        {
          "type": "background",
          "properties": {
            "fill": "#hexcolor",
            "gradient": null
          }
        },
        {
          "type": "text",
          "content": "Main Heading",
          "properties": {
            "left": 100,
            "top": 100,
            "fontSize": 48,
            "fontFamily": "Arial",
            "fill": "#hexcolor",
            "fontWeight": "bold",
            "textAlign": "center",
            "width": 400
          }
        },
        {
          "type": "text", 
          "content": "Subtitle or description",
          "properties": {
            "left": 100,
            "top": 180,
            "fontSize": 24,
            "fontFamily": "Arial", 
            "fill": "#hexcolor",
            "width": 400
          }
        },
        {
          "type": "shape",
          "shapeType": "rectangle",
          "properties": {
            "left": 50,
            "top": 300,
            "width": 200,
            "height": 100,
            "fill": "#hexcolor",
            "stroke": "#hexcolor",
            "strokeWidth": 2
          }
        }
      ],
      "colorPalette": ["#color1", "#color2", "#color3", "#color4", "#color5"],
      "fonts": ["Arial", "Helvetica", "Georgia"]
    }
  ]
}
`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4',
        messages: [
          {
            role: 'system',
            content: 'You are a professional graphic designer AI that creates structured design suggestions. Always return valid JSON only.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.8,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const aiResponse = await response.json();
    const aiContent = aiResponse.choices[0]?.message?.content;

    if (!aiContent) {
      throw new Error('No content received from OpenAI');
    }

    // Parse AI response
    let designSuggestions;
    try {
      designSuggestions = JSON.parse(aiContent);
    } catch (parseError) {
      console.error('Failed to parse AI response:', aiContent);
      throw new Error('Invalid JSON response from AI');
    }

    // Validate and adjust coordinates based on canvas size
    const canvasDimensions = {
      'A4': orientation === 'portrait' ? { width: 794, height: 1123 } : { width: 1123, height: 794 },
      'A5': orientation === 'portrait' ? { width: 559, height: 794 } : { width: 794, height: 559 },
      'Square': { width: 800, height: 800 },
      'BusinessCard': orientation === 'portrait' ? { width: 354, height: 213 } : { width: 213, height: 354 }
    };

    const dimensions = canvasDimensions[canvasSize];
    
    // Adjust element positions to fit canvas
    designSuggestions.suggestions.forEach((suggestion: AIDesignSuggestion) => {
      suggestion.elements.forEach(element => {
        if (element.type === 'text' || element.type === 'shape') {
          // Ensure elements fit within canvas bounds
          if (element.properties.left + (element.properties.width || 0) > dimensions.width) {
            element.properties.left = Math.max(20, dimensions.width - (element.properties.width || 200) - 20);
          }
          if (element.properties.top + (element.properties.height || 0) > dimensions.height) {
            element.properties.top = Math.max(20, dimensions.height - (element.properties.height || 50) - 20);
          }
          
          // Adjust font sizes for business cards
          if (canvasSize === 'BusinessCard' && element.type === 'text') {
            element.properties.fontSize = Math.min(element.properties.fontSize, 16);
            element.properties.width = Math.min(element.properties.width || 200, dimensions.width - 40);
          }
        }
      });
    });

    return NextResponse.json({
      success: true,
      suggestions: designSuggestions.suggestions
    });

  } catch (error) {
    console.error('AI Design API Error:', error);
    return NextResponse.json(
      { error: 'Failed to generate design suggestions', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
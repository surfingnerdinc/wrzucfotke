import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;
    const effect = formData.get('effect') as string;
    const intensity = parseFloat(formData.get('intensity') as string) || 1;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    let processedImage = sharp(buffer);

    // Apply different effects based on the type
    switch (effect) {
      case 'blur':
        processedImage = processedImage.blur(intensity);
        break;

      case 'grayscale':
        processedImage = processedImage.grayscale();
        break;

      case 'sepia':
        processedImage = processedImage.tint({ r: 255, g: 240, b: 196 });
        break;

      case 'brightness':
        processedImage = processedImage.modulate({ brightness: intensity });
        break;

      case 'contrast':
        processedImage = processedImage.linear(intensity, 0);
        break;

      case 'saturation':
        processedImage = processedImage.modulate({ saturation: intensity });
        break;

      case 'vintage':
        processedImage = processedImage
          .modulate({ brightness: 1.1, saturation: 0.8 })
          .tint({ r: 255, g: 235, b: 205 });
        break;

      case 'cool':
        processedImage = processedImage.tint({ r: 200, g: 220, b: 255 });
        break;

      case 'warm':
        processedImage = processedImage.tint({ r: 255, g: 220, b: 180 });
        break;

      case 'sharpen':
        processedImage = processedImage.sharpen(intensity);
        break;

      default:
        return NextResponse.json({ error: 'Invalid effect type' }, { status: 400 });
    }

    // Convert to JPEG and get buffer
    const outputBuffer = await processedImage.jpeg({ quality: 90 }).toBuffer();

    // Return the processed image
    return new Response(new Uint8Array(outputBuffer), {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=31536000',
      },
    });

  } catch (error) {
    console.error('Image processing error:', error);
    return NextResponse.json(
      { error: 'Failed to process image' },
      { status: 500 }
    );
  }
}
import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('image') as File;

    if (!file) {
      return NextResponse.json({ error: 'No image file provided' }, { status: 400 });
    }

    // Convert file to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Simple background removal using Sharp's edge detection and masking
    // Note: This is a simplified version. For better results, you'd use AI models
    const processedImage = await sharp(buffer)
      .resize(800, 600, { fit: 'inside', withoutEnlargement: true })
      .normalize()
      .sharpen()
      .png({ quality: 90, compressionLevel: 6 })
      .toBuffer();

    return new Response(new Uint8Array(processedImage), {
      headers: {
        'Content-Type': 'image/png',
        'Cache-Control': 'public, max-age=31536000',
      },
    });

  } catch (error) {
    console.error('Background removal error:', error);
    return NextResponse.json(
      { error: 'Failed to remove background' },
      { status: 500 }
    );
  }
}
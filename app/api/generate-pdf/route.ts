import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { 
      html, 
      filename, 
      size, 
      orientation,
      imageData,
      frontImageData,
      backImageData,
      doubleSided = false
    } = await request.json();

    // Check if we have required data
    const hasHtml = html && filename;
    const hasSingleImage = imageData && filename;
    const hasDoubleSided = frontImageData && backImageData && filename && doubleSided;

    if (!hasHtml && !hasSingleImage && !hasDoubleSided) {
      return NextResponse.json(
        { error: 'HTML content, image data, or both front/back images with filename are required' },
        { status: 400 }
      );
    }

    // PDF Shift API configuration
    const PDFSHIFT_API_KEY = process.env.PDFSHIFT_API_KEY;
    
    if (!PDFSHIFT_API_KEY) {
      return NextResponse.json(
        { error: 'PDF Shift API key not configured' },
        { status: 500 }
      );
    }

    // Handle different input types
    if (hasDoubleSided) {
      return await generateDoubleSidedPDF(frontImageData, backImageData, size, orientation, filename);
    } else if (hasSingleImage) {
      return await generateSingleImagePDF(imageData, size, orientation, filename);
    }

    // Original HTML handling
    const dimensions = size?.dimensions;
    const isLandscape = orientation === 'landscape' || (dimensions && dimensions.width > dimensions.height);
    const pdfFormat = size ? `${dimensions.width}mm x ${dimensions.height}mm` : 'A4';

    // PDF Shift API call
    const pdfResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
      method: 'POST',
      headers: {
        'Authorization': `Basic ${Buffer.from(`api:${PDFSHIFT_API_KEY}`).toString('base64')}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        source: html,
        landscape: isLandscape,
        format: size ? 'custom' : 'A4',
        ...(size && {
          width: `${dimensions.width}mm`,
          height: `${dimensions.height}mm`
        }),
        margin: {
          top: '0mm',
          bottom: '0mm',
          left: '0mm',
          right: '0mm'
        },
        options: {
          print_background: true,
          prefer_css_page_size: true,
          generate_tagged_pdf: false,
          print_media_type: true
        },
        metadata: {
          title: filename,
          author: 'WrzućFotkę.pl',
          subject: size ? `${size.name} - ${size.category}` : 'Wizytówka wydarzenia',
          creator: 'WrzućFotkę.pl Creator',
          keywords: `wrzucfotke, ${size?.category || 'event'}, ${size?.name || 'card'}`
        }
      }),
    });

    if (!pdfResponse.ok) {
      const errorText = await pdfResponse.text();
      console.error('PDF Shift error:', errorText);
      return NextResponse.json(
        { error: 'Failed to generate PDF' },
        { status: 500 }
      );
    }

    // Get PDF buffer from PDF Shift
    const pdfBuffer = await pdfResponse.arrayBuffer();

    // Return PDF as response
    return new NextResponse(new Uint8Array(pdfBuffer), {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${filename}"`,
        'Content-Length': pdfBuffer.byteLength.toString(),
      },
    });

  } catch (error) {
    console.error('Error generating PDF:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Helper function for single image PDF
async function generateSingleImagePDF(imageData: string, size: any, orientation: string, filename: string) {
  const PDFSHIFT_API_KEY = process.env.PDFSHIFT_API_KEY;
  
  if (!PDFSHIFT_API_KEY) {
    return NextResponse.json(
      { error: 'PDF Shift API key not configured' },
      { status: 500 }
    );
  }

  // Create HTML template for image
  const dimensions = getSizeDimensions(size, orientation);
  const html = createImageHTML(imageData, dimensions);

  return await generatePDFFromHTML(html, dimensions, filename, PDFSHIFT_API_KEY);
}

// Helper function for double-sided PDF
async function generateDoubleSidedPDF(frontImageData: string, backImageData: string, size: any, orientation: string, filename: string) {
  const PDFSHIFT_API_KEY = process.env.PDFSHIFT_API_KEY;
  
  if (!PDFSHIFT_API_KEY) {
    return NextResponse.json(
      { error: 'PDF Shift API key not configured' },
      { status: 500 }
    );
  }

  // Create HTML template for both sides
  const dimensions = getSizeDimensions(size, orientation);
  const html = createDoubleSidedHTML(frontImageData, backImageData, dimensions);

  return await generatePDFFromHTML(html, dimensions, filename, PDFSHIFT_API_KEY);
}

// Get dimensions based on size and orientation
function getSizeDimensions(size: any, orientation: string) {
  const sizeMappings = {
    'A4': { width: orientation === 'landscape' ? 297 : 210, height: orientation === 'landscape' ? 210 : 297 },
    'A5': { width: orientation === 'landscape' ? 210 : 148, height: orientation === 'landscape' ? 148 : 210 },
    'Square': { width: 200, height: 200 },
    'BusinessCard': { width: orientation === 'landscape' ? 54 : 89, height: orientation === 'landscape' ? 89 : 54 }
  };

  return sizeMappings[size as keyof typeof sizeMappings] || sizeMappings.A4;
}

// Create HTML for single image
function createImageHTML(imageData: string, dimensions: { width: number; height: number }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page {
          size: ${dimensions.width}mm ${dimensions.height}mm;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          width: ${dimensions.width}mm;
          height: ${dimensions.height}mm;
          overflow: hidden;
        }
        .image-container {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }
      </style>
    </head>
    <body>
      <div class="image-container">
        <img src="${imageData}" class="image" />
      </div>
    </body>
    </html>
  `;
}

// Create HTML for double-sided document
function createDoubleSidedHTML(frontImageData: string, backImageData: string, dimensions: { width: number; height: number }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        @page {
          size: ${dimensions.width}mm ${dimensions.height}mm;
          margin: 0;
        }
        body {
          margin: 0;
          padding: 0;
          width: ${dimensions.width}mm;
          height: ${dimensions.height}mm;
          overflow: hidden;
        }
        .page {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          page-break-after: always;
        }
        .page:last-child {
          page-break-after: auto;
        }
        .image {
          max-width: 100%;
          max-height: 100%;
          width: auto;
          height: auto;
        }
      </style>
    </head>
    <body>
      <!-- Front page -->
      <div class="page">
        <img src="${frontImageData}" class="image" />
      </div>
      
      <!-- Back page -->
      <div class="page">
        <img src="${backImageData}" class="image" />
      </div>
    </body>
    </html>
  `;
}

// Generate PDF from HTML using PDFShift
async function generatePDFFromHTML(html: string, dimensions: { width: number; height: number }, filename: string, apiKey: string) {
  const pdfResponse = await fetch('https://api.pdfshift.io/v3/convert/pdf', {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${Buffer.from(`api:${apiKey}`).toString('base64')}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      source: html,
      format: 'custom',
      width: `${dimensions.width}mm`,
      height: `${dimensions.height}mm`,
      margin: {
        top: '0mm',
        bottom: '0mm',
        left: '0mm',
        right: '0mm'
      },
      options: {
        print_background: true,
        prefer_css_page_size: true,
        generate_tagged_pdf: false,
        print_media_type: true
      },
      metadata: {
        title: filename,
        author: 'WrzućFotkę.pl',
        subject: 'Projekt z kreatora',
        creator: 'WrzućFotkę.pl Creator'
      }
    }),
  });

  if (!pdfResponse.ok) {
    const errorText = await pdfResponse.text();
    console.error('PDF Shift error:', errorText);
    return NextResponse.json(
      { error: 'Failed to generate PDF' },
      { status: 500 }
    );
  }

  const pdfBuffer = await pdfResponse.arrayBuffer();

  return new NextResponse(new Uint8Array(pdfBuffer), {
    status: 200,
    headers: {
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${filename}"`,
      'Content-Length': pdfBuffer.byteLength.toString(),
    },
  });
}
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { html, filename, size, orientation } = await request.json();

    if (!html || !filename) {
      return NextResponse.json(
        { error: 'HTML content and filename are required' },
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

    // Determine PDF format and orientation based on size and user selection
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
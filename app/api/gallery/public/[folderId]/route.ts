import { NextRequest, NextResponse } from 'next/server';

interface GalleryInfo {
  id: string;
  name: string;
  description?: string;
  eventDate?: string;
  coverImage?: string;
  totalPhotos: number;
  isPublic: boolean;
  allowUploads: boolean;
  settings: {
    requireGuestName: boolean;
    moderateUploads: boolean;
    maxPhotosPerGuest?: number;
    downloadEnabled: boolean;
  };
}

interface GalleryPhoto {
  id: string;
  url: string;
  thumbnail: string;
  filename: string;
  uploadedBy?: string;
  uploadedAt: string;
  size: number;
}

// GET /api/gallery/public/[folderId] - Pobierz publiczną galerię
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  const { folderId } = await params;

  try {
    // Tutaj będzie logika pobierania danych z bazy danych
    // Na razie zwracamy mock data
    
    if (!folderId || folderId.length < 6) {
      return NextResponse.json(
        { error: 'Nieprawidłowy identyfikator galerii' },
        { status: 400 }
      );
    }

    // Mock data - w prawdziwej aplikacji pobieramy z bazy danych
    const galleryInfo: GalleryInfo = {
      id: folderId,
      name: "Wesele Ania & Tomek 💕",
      description: "Dziel się swoimi najpiękniejszymi zdjęciami z naszego wielkiego dnia!",
      eventDate: "14 grudnia 2025",
      coverImage: "/api/placeholder/800/600",
      totalPhotos: 247,
      isPublic: true,
      allowUploads: true,
      settings: {
        requireGuestName: true,
        moderateUploads: false,
        maxPhotosPerGuest: 10,
        downloadEnabled: true
      }
    };

    // Sprawdź czy galeria jest publiczna
    if (!galleryInfo.isPublic) {
      return NextResponse.json(
        { error: 'Galeria jest prywatna' },
        { status: 403 }
      );
    }

    // Mock photos data
    const photos: GalleryPhoto[] = Array.from({ length: 12 }, (_, i) => ({
      id: `photo-${i + 1}`,
      url: `/api/placeholder/800/600?random=${i + 1}`,
      thumbnail: `/api/placeholder/300/300?random=${i + 1}`,
      filename: `IMG_${String(i + 1).padStart(4, '0')}.jpg`,
      uploadedBy: i % 3 === 0 ? 'Anna K.' : i % 3 === 1 ? 'Tomek M.' : 'Gość weselny',
      uploadedAt: new Date(2025, 9, 30 - i).toISOString(),
      size: 2400000 + Math.random() * 1000000
    }));

    // Log guest access (bez wymagania logowania)
    const guestSession = request.cookies.get('guest-session')?.value;
    if (!guestSession) {
      // Stwórz session dla gościa
      const newGuestSession = `guest-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const response = NextResponse.json({
        gallery: galleryInfo,
        photos: photos
      });
      
      response.cookies.set('guest-session', newGuestSession, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 dni
        sameSite: 'lax'
      });
      
      return response;
    }

    // TODO: Log analytics - visitor count, view time, etc.
    // await logGalleryView(folderId, guestSession);

    return NextResponse.json({
      gallery: galleryInfo,
      photos: photos
    });

  } catch (error) {
    console.error('Error fetching public gallery:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas ładowania galerii' },
      { status: 500 }
    );
  }
}

// POST /api/gallery/public/[folderId] - Track guest interaction
export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ folderId: string }> }
) {
  const { folderId } = await params;

  try {
    const body = await request.json();
    const { action, data } = body;

    const guestSession = request.cookies.get('guest-session')?.value;
    if (!guestSession) {
      return NextResponse.json(
        { error: 'Brak sesji gościa' },
        { status: 400 }
      );
    }

    // Handle different actions
    switch (action) {
      case 'view_photo':
        // TODO: Log photo view
        // await logPhotoView(folderId, data.photoId, guestSession);
        break;
        
      case 'download_photo':
        // TODO: Log photo download
        // await logPhotoDownload(folderId, data.photoId, guestSession);
        break;
        
      case 'share_gallery':
        // TODO: Log gallery share
        // await logGalleryShare(folderId, guestSession);
        break;
        
      default:
        return NextResponse.json(
          { error: 'Nieznana akcja' },
          { status: 400 }
        );
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error('Error tracking guest interaction:', error);
    return NextResponse.json(
      { error: 'Wystąpił błąd podczas zapisywania statystyk' },
      { status: 500 }
    );
  }
}
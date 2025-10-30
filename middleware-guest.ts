import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Handle guest gallery access /g/[folderId]
  if (pathname.startsWith('/g/')) {
    const folderId = pathname.split('/')[2];
    
    // Basic validation of folder ID
    if (!folderId || folderId.length < 6) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Log guest access for analytics
    const response = NextResponse.next();
    
    // Set security headers for guest pages
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    return response;
  }

  // Handle dashboard routes - require authentication
  if (pathname.startsWith('/dashboard')) {
    // TODO: Add authentication check
    // const isAuthenticated = checkAuthentication(request);
    // if (!isAuthenticated) {
    //   return NextResponse.redirect(new URL('/login', request.url));
    // }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/g/:path*',
    '/dashboard/:path*',
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
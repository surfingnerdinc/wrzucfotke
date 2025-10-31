import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin panel protection
  if (pathname.startsWith('/a')) {
    const adminPassword = request.headers.get('x-admin-password');
    const isAuthenticated = adminPassword === 'admin123' || 
                          request.cookies.get('admin-authenticated')?.value === 'true';
    
    if (!isAuthenticated) {
      const loginUrl = new URL('/admin-login', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Handle guest gallery access /g/[folderId]
  if (pathname.startsWith('/g/')) {
    const folderId = pathname.split('/')[2];
    
    // Basic validation of folder ID
    if (!folderId || folderId.length < 6) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    // Set security headers for guest pages
    const response = NextResponse.next();
    response.headers.set('X-Frame-Options', 'DENY');
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-XSS-Protection', '1; mode=block');
    
    return response;
  }

  // Handle dashboard routes - require authentication in production
  if (pathname.startsWith('/dashboard')) {
    // TODO: Add proper authentication check for production
    // For development, allow access
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/a/:path*',
    '/g/:path*', 
    '/dashboard/:path*'
  ]
};
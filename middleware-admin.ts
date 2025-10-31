import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Admin panel protection
  if (request.nextUrl.pathname.startsWith('/a')) {
    // In production, you would check for admin authentication here
    // For demo purposes, we'll just add a simple password check via headers
    
    const adminPassword = request.headers.get('x-admin-password');
    const isAuthenticated = adminPassword === 'admin123' || 
                          request.cookies.get('admin-authenticated')?.value === 'true';
    
    if (!isAuthenticated) {
      // Redirect to admin login or show unauthorized
      const loginUrl = new URL('/admin-login', request.url);
      loginUrl.searchParams.set('redirect', request.nextUrl.pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/a/:path*']
};
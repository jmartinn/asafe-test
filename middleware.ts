import { NextResponse } from 'next/server';

import { auth } from '@/lib/auth';

const publicRoutes = ['/login', '/forgot-password', '/reset-password', '/api/auth'];

function isPublicRoute(path: string): boolean {
  return publicRoutes.some((route) => path === route || path.startsWith(`${route}/`));
}

export default auth((req) => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  if (isPublicRoute(nextUrl.pathname)) {
    if (isLoggedIn) {
      return NextResponse.redirect(new URL('/', nextUrl.origin));
    }
    return NextResponse.next();
  }

  if (!isLoggedIn) {
    const redirectUrl = new URL('/login', nextUrl.origin);
    redirectUrl.searchParams.set('callbackUrl', nextUrl.pathname);
    return NextResponse.redirect(redirectUrl);
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};

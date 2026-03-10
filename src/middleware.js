import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';

export default withAuth(
  function middleware(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;

    // Admin-only routes
    if (pathname.startsWith('/admin') && token?.role !== 'admin') {
      return NextResponse.redirect(new URL('/student', req.url));
    }

    // Instructor-only routes
    if (pathname.startsWith('/instructor') && !['instructor','admin'].includes(token?.role)) {
      return NextResponse.redirect(new URL('/student', req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  },
);

export const config = {
  matcher: ['/student/:path*', '/instructor/:path*', '/admin/:path*'],
};

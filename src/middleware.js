import { withAuth } from 'next-auth/middleware';
import createIntlMiddleware from 'next-intl/middleware';

const locales = ['en', 'bn'];
const defaultLocale = 'bn';
const publicPages = ['/', '/login', '/register', '/about', '/contact', '/courses', '/courses/:slug*'];

// Handles internationalization routing
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: 'as-needed' // Only prefix non-default locale (e.g., /en/login but /login for bn)
});

// Auth middleware wrapper
const authMiddleware = withAuth(
  function onSuccess(req) {
    // Auth passed, run intl middleware
    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null
    },
    pages: {
      signIn: '/login'
    }
  }
);

export default function middleware(req) {
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join('|')}))?(${publicPages.flatMap((p) => (p === '/' ? ['', '/'] : p)).join('|')})/?$`,
    'i'
  );
  const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname);

  if (isPublicPage) {
    // Only apply i18n
    return intlMiddleware(req);
  } else {
    // Apply auth and then i18n
    return authMiddleware(req, req.nextUrl);
  }
}

export const config = {
  // Matches all paths except static files, api routes, and next internals
  matcher: ['/((?!api|_next|.*\\..*).*)']
};

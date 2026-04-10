import { NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";
import createIntlMiddleware from "next-intl/middleware";

const locales = ["en", "bn"];
const defaultLocale = "bn";

// Handles internationalization routing
const intlMiddleware = createIntlMiddleware({
  locales,
  defaultLocale,
  localePrefix: "as-needed",
});

// Auth middleware wrapper
const authMiddleware = withAuth(
  function onSuccess(req) {
    const { token } = req.nextauth;
    const { pathname } = req.nextUrl;
    const role = token?.role;
    const userBranchId = token?.branchId;

    // 1. Path Parsing
    const isSuperPath = pathname.includes('/super');
    
    // Regex matches /[locale]/[branchId]/[dashboardType] e.g. /en/BR123/student
    // Group 2: branchId, Group 3: dashboardType
    const dashboardMatch = pathname.match(/^\/(?:en|bn)?\/?([a-zA-Z0-9_-]+)\/(student|admin|instructor)/i);

    // 2. Role-Path Protection
    if (dashboardMatch) {
      const targetBranchId = dashboardMatch[1];
      const targetDashboardType = dashboardMatch[2];

      // a. Super Admin Protection: Prevent super admins from staying in branch dashboard pages
      if (role === 'super_admin') {
        return NextResponse.redirect(new URL('/super', req.url));
      }

      // b. Dashboard Type vs Role Validation
      const roleToDashboardMap = {
        student: 'student',
        instructor: 'instructor',
        admin: 'admin',
        branch_admin: 'admin',
        branch_management: 'admin',
      };

      if (roleToDashboardMap[role] !== targetDashboardType) {
        console.warn(`[Middleware] Role mismatch. User ${role} attempted to access ${targetDashboardType} dashboard.`);
        return NextResponse.redirect(new URL('/auth-redirect', req.url));
      }

      // c. Branch ID Validation (Strict Isolation)
      if (userBranchId && userBranchId !== targetBranchId) {
        console.warn(`[Middleware] Branch mismatch. User branch ${userBranchId} attempted to access branch ${targetBranchId}.`);
        return NextResponse.redirect(new URL('/auth-redirect', req.url));
      }
    }

    // 3. Super Stats Protection
    if (isSuperPath && role !== 'super_admin') {
      return NextResponse.redirect(new URL('/auth-redirect', req.url));
    }

    return intlMiddleware(req);
  },
  {
    callbacks: {
      authorized: ({ token }) => token != null,
    },
    pages: {
      signIn: "/login",
    },
  },
);

export default function middleware(req) {
  // Using explicit route definitions to avoid parsing issues with dynamic segments
  const publicPathnameRegex = RegExp(
    `^(/(${locales.join("|")}))?(/|/login|/register|/about(/.*)?|/contact|/success-stories|/courses(/.*)?|/blog(/.*)?|/auth-redirect)?/?$`,
    "i",
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
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

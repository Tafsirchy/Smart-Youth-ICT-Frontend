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
    const secondaryBranches = token?.secondaryBranches || [];

    // 1. Path Parsing
    const isSuperPath = pathname.includes("/super");

    // Regex matches /[locale]/[branchId]/[dashboardType] e.g. /en/BR123/student
    // Group 2: branchId, Group 3: dashboardType
    const dashboardMatch = pathname.match(
      /^\/(?:en|bn)?\/?([a-zA-Z0-9_-]+)\/(student|admin|instructor)/i,
    );

    // 2. Role-Path Protection
    if (dashboardMatch) {
      const targetBranchId = dashboardMatch[1];
      const targetDashboardType = dashboardMatch[2];

      // a. Super Admin Protection: Prevent super admins from staying in branch dashboard pages
      if (role === "super_admin") {
        return NextResponse.redirect(new URL("/super", req.url));
      }

      // b. Dashboard Type vs Role Validation
      const roleToDashboardMap = {
        student: "student",
        instructor: "instructor",
        admin: "admin",
        branch_admin: "admin",
        branch_management: "admin",
      };

      if (roleToDashboardMap[role] !== targetDashboardType) {
        console.warn(
          `[Middleware] Role mismatch. User ${role} attempted to access ${targetDashboardType} dashboard.`,
        );
        return NextResponse.redirect(new URL("/auth-redirect", req.url));
      }

      // c. Branch ID Validation (Strict Isolation)
      const allowedBranches = [userBranchId, ...secondaryBranches].filter(Boolean);
      if (allowedBranches.length > 0 && !allowedBranches.includes(targetBranchId)) {
        console.warn(
          `[Middleware] Branch mismatch. Allowed branches [${allowedBranches.join(',')}] attempted to access branch ${targetBranchId}.`,
        );
        return NextResponse.redirect(new URL("/auth-redirect", req.url));
      }
    }

    // 3. Super Stats Protection
    if (isSuperPath && role !== "super_admin") {
      return NextResponse.redirect(new URL("/auth-redirect", req.url));
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
    secret: process.env.NEXTAUTH_SECRET?.trim(),
  },
);

export default function middleware(req) {
  const { pathname } = req.nextUrl;

  // Protected Dashboard & Role Route Detection
  const isProtectedPath =
    pathname.includes("/super") ||
    pathname.includes("/profile") ||
    /^\/(?:en|bn)?\/?([a-zA-Z0-9_-]+)\/(student|admin|instructor)/i.test(pathname);

  // Non-protected routes (marketing, auth, 404s, etc.) run intlMiddleware directly
  if (!isProtectedPath) {
    return intlMiddleware(req);
  }

  // Auth & Dashboard Protection for private routes
  return authMiddleware(req, req.nextUrl);
}

export const config = {
  // Matches all paths except static files, api routes, and next internals
  matcher: ["/((?!api|_next|.*\\..*).*)"],
};

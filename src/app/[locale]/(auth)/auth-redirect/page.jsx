"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useLocale } from "next-intl";

const redirectMap = {
  super_admin: "super",
  admin: "admin",
  branch_admin: "admin",
  branch_management: "admin",
  instructor: "instructor",
  student: "student",
};

export default function AuthRedirectPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const locale = useLocale();

  useEffect(() => {
    if (status === "loading") return;

    if (status === "unauthenticated") {
      router.replace(`/${locale}/login`);
      return;
    }

    const { role, branchId } = session?.user || {};
    const path = redirectMap[role];

    if (!path) {
      console.error("[AuthRedirect] Invalid or missing role:", role);
      router.replace(`/${locale}/login?error=invalid_role`);
      return;
    }

    // Super Admin goes to global dashboard
    if (role === "super_admin") {
      router.replace(`/${locale}/super`);
      return;
    }

    // Other roles are branch-scoped and require a branchId
    if (!branchId) {
      console.error("[AuthRedirect] Missing branchId for role:", role);
      router.replace(`/${locale}/login?error=missing_branch`);
      return;
    }

    router.replace(`/${locale}/${branchId}/${path}`);
  }, [locale, router, session, status]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--color-surface)] px-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 text-center shadow-sm ring-1 ring-neutral-200">
        <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-neutral-200 border-t-neutral-700" />
        <h1 className="text-xl font-bold text-textPrimary">Signing you in</h1>
        <p className="mt-2 text-sm text-textSecondary">
          Your account is ready. Redirecting to your dashboard…
        </p>
      </div>
    </div>
  );
}

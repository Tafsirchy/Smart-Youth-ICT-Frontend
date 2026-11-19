"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NavAuthButtons({
  session,
  localePrefix = "",
  prefetchRoutes = () => {},
  onMouseEnter = () => {},
}) {
  return (
    <motion.div
      className="hidden md:flex items-center gap-2.5 lg:gap-3"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 }}
      onMouseEnter={onMouseEnter}
    >
      {session ? (
        <div className="flex items-center gap-3">
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            {(() => {
              const role = session?.user?.role || "student";
              const branchId = session?.user?.branchId || "BR1";
              const redirectMap = {
                admin: "admin",
                instructor: "instructor",
                student: "student",
                branch_admin: "admin",
              };
              const dashboardPath = redirectMap[role] || "student";
              return (
                <Link
                  href={`${localePrefix}/${branchId}/${dashboardPath}`}
                  id="nav-dashboard"
                  className="btn-primary text-sm px-4 py-2"
                >
                  Dashboard
                </Link>
              );
            })()}
          </motion.div>
          <button
            onClick={() =>
              import("next-auth/react").then(({ signOut }) =>
                signOut({ callbackUrl: "/" }),
              )
            }
            className="text-sm font-medium text-gray-700 hover:text-red-500 transition-colors bg-gray-100 hover:bg-red-50 px-3 py-2 rounded-xl cursor-pointer"
          >
            Sign Out
          </button>
        </div>
      ) : (
        <>
          <Link
            href="/login"
            id="nav-login"
            onMouseEnter={() => prefetchRoutes(["/login"])}
            className="text-sm font-medium text-gray-700 hover:text-primary transition-colors px-3 py-2 rounded-xl"
          >
            Sign In
          </Link>
          <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}>
            <Link
              href="/register"
              id="nav-register"
              onMouseEnter={() => prefetchRoutes(["/register"])}
              className="btn-primary text-sm px-4 py-2"
            >
              Enroll Now
            </Link>
          </motion.div>
        </>
      )}
    </motion.div>
  );
}

import "@/styles/globals.css";

/**
 * Standard root layout for catch-all errors and 404s.
 * We keep this minimal to avoid conflicts with nested localized layouts
 * that define their own html and body tags.
 */
export default function RootLayout({ children }) {
  return children;
}

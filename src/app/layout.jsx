'use client';

import { Inter } from "next/font/google";
import "@/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });

// Standard root layout for catch-all errors and 404s
export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}

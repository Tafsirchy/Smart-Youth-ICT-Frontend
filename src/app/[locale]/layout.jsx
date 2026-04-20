import "@/styles/globals.css";
import { Inter, Outfit, Cinzel, Playfair_Display } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "@/providers/Providers";
import { Suspense } from "react";
import FacebookPixel from "@/components/marketing/FacebookPixel";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import GoogleAnalytics from "@/components/marketing/GoogleAnalytics";
import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

 
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
  adjustFontFallback: true,
  weight: ['400', '500', '600', '700'],
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
  adjustFontFallback: true,
  weight: ['400', '500', '600', '700', '800', '900'],
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: '--font-cinzel',
  display: 'swap',
  adjustFontFallback: true,
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: '--font-playfair',
  display: 'swap',
  adjustFontFallback: true,
});


export const metadata = {
  title: {
    default: "Smart Youth ICT — Learn IT. Earn Real Money.",
    template: "%s | Smart Youth ICT",
  },
  description:
    "Bangladesh's leading IT training platform. Learn Web Development, Graphic Design, Social Media Marketing & AI. Earn from real client projects while studying.",
  keywords: [
    "IT training Bangladesh",
    "freelancing course",
    "web development",
    "graphic design",
    "SYICT",
  ],
  openGraph: {
    type: "website",
    locale: "bn_BD",
    url: process.env.NEXT_PUBLIC_APP_URL,
    siteName: "Smart Youth ICT",
  },
};

/**
 * AppContent Component (Async)
 * Handles the blocking data fetching (Translations & Session)
 */
async function AppContent({ children }) {
  const [messages, session] = await Promise.all([
    getMessages(),
    getServerSession(authOptions)
  ]);

  return (
    <NextIntlClientProvider messages={messages}>
      <Providers session={session}>
        <GoogleAnalytics />
        <FacebookPixel />
        {children}
        <WhatsAppButton />
        <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
      </Providers>
    </NextIntlClientProvider>
  );
}

export default function RootLayout({ children, params: { locale } }) {
  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${outfit.variable} ${cinzel.variable} ${playfair.variable}`}>
      <head>
        {/* Next.js automatically preloads priority images from components */}
      </head>
      <body
        className="overflow-x-hidden"
        style={{ 
          backgroundColor: "var(--color-background)",
          fontFamily: "var(--font-inter), var(--font-sans)"
        }}
        suppressHydrationWarning
      >
        <NextTopLoader 
          color="var(--color-brand-pink, #ec4899)" 
          initialPosition={0.08}
          crawlSpeed={200}
          height={3} 
          crawl={true}
          showSpinner={false}
          easing="ease-in-out"
          speed={300}
          shadow="0 0 10px #ec4899,0 0 5px #ec4899"
        />
        <Suspense fallback={null}>
          <AppContent>{children}</AppContent>
        </Suspense>
      </body>
    </html>
  );
}

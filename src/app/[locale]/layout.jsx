import "@/styles/globals.css";
import { Inter, Outfit } from "next/font/google";
import { Toaster } from "react-hot-toast";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import Providers from "@/providers/Providers";
import FacebookPixel from "@/components/marketing/FacebookPixel";
import WhatsAppButton from "@/components/marketing/WhatsAppButton";
import GoogleAnalytics from "@/components/marketing/GoogleAnalytics";
import NextTopLoader from "nextjs-toploader";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import PageLoader from "@/components/ui/PageLoader";
 
const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: '--font-outfit',
  display: 'swap',
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

export default async function RootLayout({ children, params: { locale } }) {
  // Fetch messages (translations) and session for the current locale on the server
  // This avoids a redundant client-side fetch, making the first visit much faster.
  const [messages, session] = await Promise.all([
    getMessages(),
    getServerSession(authOptions)
  ]);

  return (
    <html lang={locale} suppressHydrationWarning className={`${inter.variable} ${outfit.variable}`}>
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
        {/* Snappy Top Loader: Jumps to 30% immediately, moves fast, and has a subtle glow */}
        <NextTopLoader 
          color="var(--color-brand-pink, #ec4899)" 
          initialPosition={0.3}
          crawlSpeed={100}
          height={4} 
          crawl={true}
          showSpinner={false}
          easing="ease"
          speed={200}
          shadow="0 0 10px #ec4899,0 0 5px #ec4899"
        />
        <NextIntlClientProvider messages={messages}>
          <Providers session={session}>
            <PageLoader />
            <GoogleAnalytics />
            <FacebookPixel />
            {children}
            <WhatsAppButton />
            <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

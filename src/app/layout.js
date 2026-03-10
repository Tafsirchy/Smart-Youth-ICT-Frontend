import '@/styles/globals.css';
import { Inter } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import Providers from '@/providers/Providers';
import FacebookPixel from '@/components/marketing/FacebookPixel';
import WhatsAppButton from '@/components/marketing/WhatsAppButton';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Smart Youth ICT — Learn IT. Earn Real Money.', template: '%s | Smart Youth ICT' },
  description: "Bangladesh's leading IT training platform. Learn Web Development, Graphic Design, Social Media Marketing & AI. Earn from real client projects while studying.",
  keywords: ['IT training Bangladesh', 'freelancing course', 'web development', 'graphic design', 'SYICT'],
  openGraph: { type: 'website', locale: 'bn_BD', url: process.env.NEXT_PUBLIC_APP_URL, siteName: 'Smart Youth ICT' },
};

export default function RootLayout({ children }) {
  return (
    <html lang="bn">
      <body className={inter.className}>
        {/*
         * Providers wraps:
         *   ① SessionProvider  — NextAuth session (useSession everywhere)
         *   ② QueryClientProvider — TanStack Query cache (useQuery / useMutation)
         *   ReactQueryDevtools visible in dev only
         */}
        <Providers>
          <FacebookPixel />
          {children}
          <WhatsAppButton />
          <Toaster position="top-right" toastOptions={{ duration: 4000 }} />
        </Providers>
      </body>
    </html>
  );
}

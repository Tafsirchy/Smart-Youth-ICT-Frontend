import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageLoader from '@/components/ui/PageLoader';
import { cookies } from 'next/headers';

export default function MarketingLayout({ children }) {
  const cookieStore = cookies();
  const hasSeenSplash = cookieStore.get('syict_splash_seen')?.value === 'true';

  return (
    <>
      {!hasSeenSplash && <PageLoader />}
      <Navbar />
      <main className="pt-[var(--navbar-height)]">{children}</main>
      <Footer />
    </>
  );
}

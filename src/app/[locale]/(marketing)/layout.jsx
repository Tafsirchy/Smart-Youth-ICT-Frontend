import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import PageLoader from '@/components/ui/PageLoader';

export default function MarketingLayout({ children }) {
  return (
    <>
      <PageLoader />
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
}

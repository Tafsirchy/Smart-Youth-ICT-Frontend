import HeroSlider from "@/components/home/HeroSlider";
import TrustedBrandsStrip from "@/components/home/TrustedBrandsStrip";
import ERPSoftwareStrip from "@/components/home/ERPSoftwareStrip";
import ERPImplementationProcess from "@/components/home/ERPImplementationProcess";
import TechStackStrip from "@/components/home/TechStackStrip";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularCourses from "@/components/home/PopularCourses";
import UpcomingSeminarStrip from "@/components/home/UpcomingSeminarStrip";
import CampusNetworkSection from "@/components/home/CampusNetworkSection";
import Mentors from "@/components/home/Mentors";
import Testimonials from "@/components/home/Testimonials";
import BlogPreview from "@/components/home/BlogPreview";
import MessengerChat from "@/components/marketing/MessengerChat";

export const metadata = {
  title: "Smart Youth ICT — Multi-Purpose IT Solutions & Software Systems",
  description:
    "Enterprise ERP, Web & Mobile Engineering, Cloud Infrastructure, and Industrial IT Solutions.",
};

export default function HomePage() {
  return (
    <>
      {/* ── 1. Attention & Core Hook ── */}
      <HeroSlider />

      {/* ── 2. Immediate Social Proof & Authority ── */}
      <TrustedBrandsStrip />

      {/* ── 3. Ready Enterprise Software Suites ── */}
      <ERPSoftwareStrip />

      {/* ── 4. Enterprise Delivery & Implementation Lifecycle ── */}
      <ERPImplementationProcess />

      {/* ── 5. The Engineering Arsenal & Bridge (Agency ↔ Academy) ── */}
      <TechStackStrip />

      {/* ── 6. Institutional Credibility & Value Proposition ── */}
      <WhyChooseUs />

      {/* ── 7. Core Training Tracks & Courses ── */}
      <PopularCourses />

      {/* ── 8. Zero-Risk Lead Magnet & Free Career Seminar ── */}
      <UpcomingSeminarStrip />

      {/* ── 9. Nationwide Footprint & 14+ Regional Campuses ── */}
      <CampusNetworkSection />

      {/* ── 10. Industry Faculty & Senior Architects ── */}
      <Mentors />

      {/* ── 11. Student Placement & Social Validation ── */}
      <Testimonials />

      {/* ── 12. Tech Insights & Thought Leadership ── */}
      <BlogPreview />

      {/* ── 13. Real-Time Counseling Desk ── */}
      <MessengerChat />
    </>
  );
}

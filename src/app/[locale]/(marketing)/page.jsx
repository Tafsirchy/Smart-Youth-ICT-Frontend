import HeroSlider from "@/components/home/HeroSlider";
import ERPSoftwareStrip from "@/components/home/ERPSoftwareStrip";
import TechStackStrip from "@/components/home/TechStackStrip";
import TrustedBrandsStrip from "@/components/home/TrustedBrandsStrip";
import UpcomingSeminarStrip from "@/components/home/UpcomingSeminarStrip";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularCourses from "@/components/home/PopularCourses";
import CampusNetworkSection from "@/components/home/CampusNetworkSection";
import ERPImplementationProcess from "@/components/home/ERPImplementationProcess";
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
      <HeroSlider />
      <ERPSoftwareStrip />
      <TechStackStrip />
      <TrustedBrandsStrip />
      <UpcomingSeminarStrip />
      <WhyChooseUs />
      <PopularCourses />
      <CampusNetworkSection />
      <ERPImplementationProcess />
      <Mentors />
      <Testimonials />
      <BlogPreview />
      <MessengerChat />
    </>
  );
}

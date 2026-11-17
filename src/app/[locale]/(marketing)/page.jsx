import HeroSlider from "@/components/home/HeroSlider";
import TrustedBrandsStrip from "@/components/home/TrustedBrandsStrip";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularCourses from "@/components/home/PopularCourses";
import HowItWorks from "@/components/home/HowItWorks";
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
      <TrustedBrandsStrip />
      <WhyChooseUs />
      <PopularCourses />
      <HowItWorks />
      <Mentors />
      <Testimonials />
      <BlogPreview />
      <MessengerChat />
    </>
  );
}

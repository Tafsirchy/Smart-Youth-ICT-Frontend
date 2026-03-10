import HeroSection from '@/components/home/HeroSection';
import WhyChooseUs from '@/components/home/WhyChooseUs';
import PopularCourses from '@/components/home/PopularCourses';
import HowItWorks from '@/components/home/HowItWorks';
import SuccessStories from '@/components/home/SuccessStories';
import Testimonials from '@/components/home/Testimonials';
import PaymentMethodsSection from '@/components/home/PaymentMethodsSection';
import MessengerChat from '@/components/marketing/MessengerChat';

export const metadata = {
  title: 'Smart Youth ICT — Learn IT. Earn Real Money.',
  description: 'Project-based IT training in Bangladesh. Web Dev, Design, AI & Freelancing. Start your career today.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <WhyChooseUs />
      <PopularCourses />
      <HowItWorks />
      <SuccessStories />
      <Testimonials />
      <PaymentMethodsSection />
      <MessengerChat />
    </>
  );
}

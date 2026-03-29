import Navbar from "@/components/navbar";
import HeroSection from "@/components/hero-section";
import SpecialitiesSection from "@/components/specialities-section";
import ServicesSection from "@/components/services-section";
import WhyChooseSection from "@/components/why-choose-section";
import BrandsSection from "@/components/brands-section";
import ReviewsSection from "@/components/reviews-section";
import CitiesSection from "@/components/cities-section";
import BookingSection from "@/components/booking-section";
import CTASection from "@/components/cta-section";
import Footer from "@/components/footer";
import FloatingWhatsApp from "@/components/floating-whatsapp";
import { usePageMeta } from "@/hooks/use-page-meta";

export default function Home() {
  usePageMeta(
    "Devices Doctor - 30 Min Doorstep Mobile Repair Mumbai | All Brands",
    "Devices Doctor offers 30-minute doorstep repair service for all mobile brands, laptops, tablets & smartwatches in Mumbai. Genuine parts, 3-6 months warranty. Book now!"
  );
  return (
    <div className="min-h-screen bg-[#0A1A3F]">
      <Navbar />
      <HeroSection />
      <SpecialitiesSection />
      <ServicesSection />
      <BrandsSection />
      <WhyChooseSection />
      <ReviewsSection />
      <BookingSection />
      <CitiesSection />
      <CTASection />
      <Footer />
      <FloatingWhatsApp />
    </div>
  );
}

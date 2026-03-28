import { useState, useCallback } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FacilitiesSection from "@/components/FacilitiesSection";
import BedroomsSection from "@/components/BedroomsSection";
import RatesSection from "@/components/RatesSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import GallerySection from "@/components/GallerySection";
import LocationSection from "@/components/LocationSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  const [introComplete, setIntroComplete] = useState(false);
  const handleComplete = useCallback(() => setIntroComplete(true), []);

  return (
    <>
      {!introComplete && <IntroAnimation onComplete={handleComplete} />}
      <div className={introComplete ? "animate-fade-in" : "opacity-0"}>
        <Navbar />
        <HeroSection />
        <AboutSection />
        <FacilitiesSection />
        <BedroomsSection />
        <RatesSection />
        <TestimonialsSection />
        <FAQSection />
        <GallerySection />
        <LocationSection />
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;

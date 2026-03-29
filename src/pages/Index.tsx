import { useState, useCallback } from "react";
import IntroAnimation from "@/components/IntroAnimation";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FacilitiesSection from "@/components/FacilitiesSection";
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
        <Footer />
        <WhatsAppButton />
      </div>
    </>
  );
};

export default Index;

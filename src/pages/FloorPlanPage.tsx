import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import floorplanImg1 from "@/assets/floorplan-basement-floor1.png";
import floorplanImg2 from "@/assets/floorplan-floor2-rooftop.png";

const FloorPlanPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-10 sm:mb-12"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-primary">LAYOUT</span>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Floor Plan
          </h1>
          <div className="gold-line mx-auto mt-6" />
        </motion.div>

        <div className="space-y-12 sm:space-y-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src={floorplanImg1}
              alt="Floor Plan - Basement & Lantai 1"
              className="w-full rounded-sm border border-border/10"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <img
              src={floorplanImg2}
              alt="Floor Plan - Lantai 2 & Rooftop"
              className="w-full rounded-sm border border-border/10"
            />
          </motion.div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FloorPlanPage;

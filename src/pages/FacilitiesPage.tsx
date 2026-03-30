import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const categories = [
  {
    title: "Entertainment",
    items: [
      "Private Swimming Pool",
      "Ping Pong Table",
      "Karaoke Mic & Speaker",
      "Smart TV with Netflix Account",
      "Floaties",
    ],
  },
  {
    title: "Bathroom",
    items: [
      "Hair Dryer",
      "Shampoo, Body Wash, Conditioner & Hand Soap",
      "Hot Water",
      "Towels",
      "Toilet Tissue",
    ],
  },
  {
    title: "Bedroom",
    items: [
      "Air Conditioned Room",
      "King Koil Beds",
      "Ensuite Bathroom Inside Every Room",
      "Bed Linen, Bed Cover & Pillow",
      "In-Villa Slippers",
      "10 Extra Futon Beds*",
    ],
  },
  {
    title: "Kitchen",
    items: [
      "BBQ Grill",
      "Coffee Capsule Machine with 5 Complimentary Pods",
      "Water Dispensers on Every Floor",
      "Microwave",
      "Refrigerator on Every Floor",
      "Water Kettle",
      "Rice Cooker",
      "Gas Stove on Every Floor",
      "Complete Cooking Utensils",
      "Complete Eating Utensils",
    ],
  },
  {
    title: "Family",
    items: [
      "High Chair",
      "Baby Bath",
      "Baby Crib (Upon Request)",
    ],
  },
  {
    title: "Others",
    items: [
      "Free Parking",
      "Security CCTV",
      "Helper & Driver Area",
      "Daily Cleaning Service for Public Area",
      "Live-In Villa Keeper",
      "Iron",
      "Washer & Dryer",
      "Free WiFi Throughout Villa",
      "Rooftop with Seating Area",
    ],
  },
];

const FacilitiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-12"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-primary">AMENITIES</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Facilities & Services
          </h1>
          <div className="gold-line mx-auto mt-6" />
        </motion.div>

        <div className="space-y-16">
          {categories.map((cat, ci) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: ci * 0.08 }}
            >
              <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                {cat.title}
              </h2>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                {cat.items.map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 border border-border/15 px-5 py-4 transition-colors duration-300 hover:border-primary/25"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                    <span className="text-sm text-foreground/80">{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-xs text-muted-foreground text-center"
        >
          *With additional fee
        </motion.p>
      </div>
      <Footer />
    </div>
  );
};

export default FacilitiesPage;

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import {
  Waves, Gamepad2, Mic, Tv, LifeBuoy,
  Wind as Dryer, Droplets, Thermometer, Bath as Towel, Toilet,
  AirVent, Bed, DoorOpen, Shirt, Footprints, LayoutGrid,
  Flame, Coffee, GlassWater, Microwave, Refrigerator, CupSoda,
  CookingPot, UtensilsCrossed, Utensils,
  Baby, BedDouble, Sofa,
  Car, Shield, Users, Sparkles, User, Shirt as IronIcon,
  WashingMachine, Wifi, Armchair
} from "lucide-react";

const categories = [
  {
    title: "Entertainment",
    items: [
      { icon: Waves, name: "Private Swimming Pool" },
      { icon: Gamepad2, name: "Ping Pong Table" },
      { icon: Mic, name: "Karaoke Mic & Speaker" },
      { icon: Tv, name: "Smart TV with Netflix Account" },
      { icon: LifeBuoy, name: "Floaties" },
    ],
  },
  {
    title: "Bathroom",
    items: [
      { icon: Dryer, name: "Hair Dryer" },
      { icon: Droplets, name: "Shampoo, Body Wash, Conditioner & Hand Soap" },
      { icon: Thermometer, name: "Hot Water" },
      { icon: Towel, name: "Towels" },
      { icon: Toilet, name: "Toilet Tissue" },
    ],
  },
  {
    title: "Bedroom",
    items: [
      { icon: AirVent, name: "Air Conditioned Room" },
      { icon: Bed, name: "King Koil Beds" },
      { icon: DoorOpen, name: "Ensuite Bathroom Inside Every Room" },
      { icon: Shirt, name: "Bed Linen, Bed Cover & Pillow" },
      { icon: Footprints, name: "In-Villa Slippers" },
      { icon: LayoutGrid, name: "10 Extra Futon Beds*" },
    ],
  },
  {
    title: "Kitchen",
    items: [
      { icon: Flame, name: "BBQ Grill" },
      { icon: Coffee, name: "Coffee Capsule Machine with 5 Complimentary Pods" },
      { icon: GlassWater, name: "Water Dispensers on Every Floor" },
      { icon: Microwave, name: "Microwave" },
      { icon: Refrigerator, name: "Refrigerator on Every Floor" },
      { icon: CupSoda, name: "Water Kettle" },
      { icon: CookingPot, name: "Rice Cooker" },
      { icon: Flame, name: "Gas Stove on Every Floor" },
      { icon: UtensilsCrossed, name: "Complete Cooking Utensils" },
      { icon: Utensils, name: "Complete Eating Utensils" },
    ],
  },
  {
    title: "Family",
    items: [
      { icon: Sofa, name: "High Chair" },
      { icon: Baby, name: "Baby Bath" },
      { icon: BedDouble, name: "Baby Crib (Upon Request)" },
    ],
  },
  {
    title: "Others",
    items: [
      { icon: Car, name: "Free Parking" },
      { icon: Shield, name: "Security CCTV" },
      { icon: Users, name: "Helper & Driver Area" },
      { icon: Sparkles, name: "Daily Cleaning Service for Public Area" },
      { icon: User, name: "Live-In Villa Keeper" },
      { icon: Iron, name: "Iron" },
      { icon: WashingMachine, name: "Washer & Dryer" },
      { icon: Wifi, name: "Free WiFi Throughout Villa" },
      { icon: Armchair, name: "Rooftop with Seating Area" },
    ],
  },
];

const CategoryBlock = ({ category, index }: { category: typeof categories[0]; index: number }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="mb-14"
    >
      <h3 className="font-display text-xl font-semibold text-foreground mb-6">{category.title}</h3>
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {category.items.map((item) => (
          <div
            key={item.name}
            className="flex items-center gap-3 flat-card p-4 transition-colors hover:border-primary/25"
          >
            <item.icon className="h-5 w-5 flex-shrink-0 text-primary" />
            <span className="text-sm text-foreground/80">{item.name}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

const FacilitiesPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="section-padding pt-32">
        <div className="mx-auto max-w-5xl">
          <span className="text-[11px] font-medium tracking-[0.3em] text-primary">AMENITIES</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-foreground md:text-5xl">Facilities & Services</h1>
          <div className="gold-line mt-5" />

          <div className="mt-14">
            {categories.map((cat, i) => (
              <CategoryBlock key={cat.title} category={cat} index={i} />
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">*With additional fee</p>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default FacilitiesPage;

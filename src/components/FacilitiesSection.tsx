import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Wifi, Tv, Flame, Waves, Sparkles, Mic, UtensilsCrossed,
  Car, ShowerHead, Wind, Coffee, Gamepad2
} from "lucide-react";

const facilities = [
  { icon: Wifi, title: "Free Wifi" },
  { icon: Tv, title: "Smart TV & Netflix" },
  { icon: Flame, title: "BBQ Grill" },
  { icon: Waves, title: "Private Pool" },
  { icon: Sparkles, title: "Daily Cleaning" },
  { icon: Mic, title: "Karaoke" },
  { icon: UtensilsCrossed, title: "Full Kitchen" },
  { icon: Car, title: "Parking" },
  { icon: ShowerHead, title: "Hot Water" },
  { icon: Wind, title: "Air Conditioning" },
  { icon: Coffee, title: "Coffee Machine" },
  { icon: Gamepad2, title: "Ping Pong" },
];

const FacilitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="facilities" className="section-padding bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl text-center">
        <span className="text-xs font-medium tracking-[0.3em] text-primary">AMENITIES</span>
        <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
          Facilities & Services
        </h2>
        <div className="gold-line mx-auto mt-6" />

        <div className="mt-16 grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-4">
          {facilities.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass-card group flex flex-col items-center gap-3 rounded-sm p-6 transition-all hover:border-primary/40 hover:-translate-y-1"
            >
              <f.icon className="h-8 w-8 text-primary transition-transform group-hover:scale-110" />
              <span className="text-sm text-foreground/90">{f.title}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FacilitiesSection;

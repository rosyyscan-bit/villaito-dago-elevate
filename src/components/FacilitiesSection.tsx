import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import {
  Wifi, Tv, Flame, Waves, Sparkles, Mic,
} from "lucide-react";
import { useRealtimeTable } from "@/hooks/use-realtime-table";

const iconMap: Record<string, any> = {
  Wifi, Tv, Flame, Waves, Sparkles, Mic,
};

const fallbackFacilities = [
  { icon: "Wifi", title: "Free Wifi Throughout Villa" },
  { icon: "Tv", title: "Smart TV with Netflix" },
  { icon: "Flame", title: "BBQ Grill" },
  { icon: "Waves", title: "Private Swimming Pool" },
  { icon: "Sparkles", title: "Daily Cleaning Service" },
  { icon: "Mic", title: "Karaoke Mic & Speaker" },
];

const FacilitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: dbFacilities } = useRealtimeTable("facilities");
  const facilities = dbFacilities.length > 0 ? dbFacilities.slice(0, 6) : fallbackFacilities;

  return (
    <section id="facilities" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-5xl text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-medium tracking-[0.3em] text-primary"
        >
          AMENITIES
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-display text-4xl font-bold text-foreground"
        >
          Facilities & Services
        </motion.h2>
        <div className="gold-line mx-auto mt-6" />

        <div className="mt-16 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {facilities.map((f: any, i: number) => {
            const IconComponent = iconMap[f.icon] || Sparkles;
            return (
              <motion.div
                key={f.id || f.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.15 + i * 0.05 }}
                className="group flex flex-col items-center gap-3 border border-border/20 p-6 transition-colors duration-300 hover:border-primary/30"
              >
                <IconComponent className="h-7 w-7 text-primary transition-transform duration-300 group-hover:scale-105" />
                <span className="text-sm text-foreground/80">{f.title}</span>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-10"
        >
          <Link
            to="/facilities"
            className="inline-block border border-primary/30 px-8 py-3 text-[13px] font-medium tracking-wider text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            See More
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FacilitiesSection;

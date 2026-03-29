import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { Wifi, Tv, Flame, Waves, Sparkles, Mic } from "lucide-react";

const facilities = [
  { icon: Wifi, title: "Free Wifi throughout Villa" },
  { icon: Tv, title: "Smart TV with Netflix Account" },
  { icon: Flame, title: "BBQ Grill" },
  { icon: Waves, title: "Private Swimming Pool" },
  { icon: Sparkles, title: "Daily Cleaning Service for Public Area" },
  { icon: Mic, title: "Karaoke Mic & Speaker" },
];

const FacilitiesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="section-padding" ref={ref}>
      <div className="mx-auto max-w-6xl text-center">
        <span className="text-[11px] font-medium tracking-[0.3em] text-primary">AMENITIES</span>
        <h2 className="mt-4 font-display text-3xl font-semibold text-foreground md:text-4xl">
          Facilities & Services
        </h2>
        <div className="gold-line mx-auto mt-5" />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {facilities.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="flat-card group flex flex-col items-center gap-3 p-6 transition-colors hover:border-primary/30"
            >
              <f.icon className="h-6 w-6 text-primary transition-transform duration-200 group-hover:scale-105" />
              <span className="text-xs text-foreground/80 text-center">{f.title}</span>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5 }}
          className="mt-10"
        >
          <Link
            to="/facilities"
            className="inline-block border border-primary/30 px-8 py-2.5 text-xs tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            SEE MORE
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default FacilitiesSection;

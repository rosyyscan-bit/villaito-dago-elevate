import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useRealtimeTable } from "@/hooks/use-realtime-table";
import { useRealtimeSetting } from "@/hooks/use-realtime-table";

const fallbackRates = [
  { title: "Weekdays", subtitle: "Sunday – Thursday", price: "Rp 7.000.000", per: "/ night" },
  { title: "Weekends & Public Holidays", subtitle: "Friday – Saturday & Holidays", price: "Rp 8.000.000", per: "/ night", featured: true },
];

const defaultNotes = [
  "Extra futon bed fee: Rp150.000 per bed per night",
  "Special periods (Christmas, Lebaran) may have different rates",
  "Airbnb price may be higher due to tax & fees",
  "Booking via WhatsApp requires Rp3.000.000 deposit (refundable)",
  "Rate as of May 2024",
];

const RatesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: dbRates } = useRealtimeTable("rates");
  const rates = dbRates.length > 0 ? dbRates : fallbackRates;

  return (
    <section id="rates" className="section-padding" ref={ref}>
      <div className="mx-auto max-w-4xl text-center">
        <motion.span
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-xs font-medium tracking-[0.3em] text-primary"
        >
          VILLA RATE
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-display text-4xl font-bold text-foreground"
        >
          Pricing
        </motion.h2>
        <div className="gold-line mx-auto mt-6" />

        <div className="mt-16 grid gap-6 md:grid-cols-2">
          {rates.map((rate: any, i: number) => (
            <motion.div
              key={rate.id || rate.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.15 + i * 0.1 }}
              className={`border p-8 text-left transition-colors duration-300 ${
                rate.featured
                  ? "border-primary/30"
                  : "border-border/20 hover:border-primary/20"
              }`}
            >
              <h3 className="font-display text-xl font-semibold text-foreground">{rate.title}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{rate.subtitle}</p>
              <div className="mt-6">
                <span className="font-display text-3xl font-bold text-primary">{rate.price}</span>
                <span className="ml-1 text-sm text-muted-foreground">{rate.per}</span>
              </div>
              <a
                href="https://wa.link/vt5ig5"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block border border-primary/30 py-3 text-center text-sm font-medium tracking-wider text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 space-y-2 text-left"
        >
          {defaultNotes.map((note) => (
            <p key={note} className="flex items-start gap-2 text-xs text-muted-foreground">
              <span className="mt-1.5 h-1 w-1 rounded-full bg-muted-foreground/50 flex-shrink-0" />
              {note}
            </p>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default RatesSection;

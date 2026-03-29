import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check } from "lucide-react";

const rates = [
  {
    title: "Weekday",
    subtitle: "Sun – Thu",
    price: "Rp 5.500.000",
    per: "/ night",
    features: [
      "7 Bedrooms",
      "Private Pool",
      "Free WiFi",
      "Full Kitchen Access",
      "Daily Cleaning",
      "BBQ Grill",
    ],
  },
  {
    title: "Weekend",
    subtitle: "Fri – Sat",
    price: "Rp 7.500.000",
    per: "/ night",
    featured: true,
    features: [
      "7 Bedrooms",
      "Private Pool",
      "Free WiFi",
      "Full Kitchen Access",
      "Daily Cleaning",
      "BBQ Grill",
      "Karaoke Set",
    ],
  },
  {
    title: "Holiday / Long Weekend",
    subtitle: "Special Dates",
    price: "Rp 9.000.000",
    per: "/ night",
    features: [
      "7 Bedrooms",
      "Private Pool",
      "Free WiFi",
      "Full Kitchen Access",
      "Daily Cleaning",
      "BBQ Grill",
      "Karaoke Set",
      "Priority Booking",
    ],
  },
];

const RatesSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="rates" className="section-padding bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-7xl text-center">
        <span className="text-xs font-medium tracking-[0.3em] text-primary">VILLA RATE</span>
        <h2 className="mt-4 font-display text-4xl font-bold text-foreground">Pricing</h2>
        <div className="gold-line mx-auto mt-6" />

        <div className="mt-16 grid gap-8 md:grid-cols-3">
          {rates.map((rate, i) => (
            <motion.div
              key={rate.title}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`flat-card rounded-sm p-8 text-left transition-all hover:-translate-y-1 ${
                rate.featured ? "border-primary/40 ring-1 ring-primary/20" : ""
              }`}
            >
              {rate.featured && (
                <span className="mb-4 inline-block rounded-sm bg-primary/20 px-3 py-1 text-xs font-medium text-primary">
                  Most Popular
                </span>
              )}
              <h3 className="font-display text-xl font-semibold text-foreground">{rate.title}</h3>
              <p className="text-sm text-muted-foreground">{rate.subtitle}</p>
              <div className="mt-4">
                <span className="font-display text-3xl font-bold gold-accent">{rate.price}</span>
                <span className="text-sm text-muted-foreground"> {rate.per}</span>
              </div>
              <ul className="mt-6 space-y-3">
                {rate.features.map((f) => (
                  <li key={f} className="flex items-center gap-2 text-sm text-foreground/80">
                    <Check className="h-4 w-4 text-primary" />
                    {f}
                  </li>
                ))}
              </ul>
              <a
                href="https://wa.link/vt5ig5"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 block rounded-sm border border-primary bg-primary/10 py-3 text-center text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
              >
                Book Now
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RatesSection;

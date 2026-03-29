import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const rates = [
  {
    label: "Weekdays",
    price: "Rp 7.000.000",
    per: "/ night",
  },
  {
    label: "Weekends & Public Holidays",
    price: "Rp 8.000.000",
    per: "/ night",
  },
];

const notes = [
  "Extra futon bed fee: Rp150.000 per bed per night",
  "Special periods (Christmas, Lebaran) may have different rates",
  "Airbnb price may be higher due to tax & fees",
  "Booking via WhatsApp requires Rp3.000.000 deposit (refundable)",
  "Rate as of May 2024",
];

const RatesPage = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="section-padding pt-32" ref={ref}>
        <div className="mx-auto max-w-3xl">
          <span className="text-[11px] font-medium tracking-[0.3em] text-primary">VILLA RATE</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-foreground md:text-5xl">Pricing</h1>
          <div className="gold-line mt-5" />

          <div className="mt-14 space-y-4">
            {rates.map((rate, i) => (
              <motion.div
                key={rate.label}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="flat-card p-8"
              >
                <p className="text-xs tracking-widest text-muted-foreground uppercase">{rate.label}</p>
                <div className="mt-3 flex items-baseline gap-2">
                  <span className="font-display text-3xl font-semibold text-primary">{rate.price}</span>
                  <span className="text-sm text-muted-foreground">{rate.per}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4 }}
            className="mt-10 flat-card p-8"
          >
            <h3 className="font-display text-lg font-semibold text-foreground mb-4">Notes</h3>
            <ul className="space-y-3">
              {notes.map((note) => (
                <li key={note} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-primary" />
                  {note}
                </li>
              ))}
            </ul>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="mt-10 text-center"
          >
            <a
              href="https://wa.link/vt5ig5"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block border border-primary/40 px-10 py-3 text-xs tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
            >
              BOOK NOW
            </a>
          </motion.div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default RatesPage;

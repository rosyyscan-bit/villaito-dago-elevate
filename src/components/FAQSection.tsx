import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "What is the check-in and check-out time?",
    a: "Check-in is at 14:00 WIB and check-out is at 12:00 WIB. Early check-in or late check-out is subject to availability.",
  },
  {
    q: "How many guests can the villa accommodate?",
    a: "Villaito can comfortably accommodate up to 20 guests with 7 spacious bedrooms, each with ensuite bathrooms.",
  },
  {
    q: "Is the pool private?",
    a: "Yes, the villa has a private swimming pool exclusively for our guests. The pool is cleaned and maintained daily.",
  },
  {
    q: "Is parking available?",
    a: "Yes, we provide free parking for multiple vehicles. The villa is located in the Resort Dago Pakar housing complex with paved roads.",
  },
  {
    q: "Can we host events at the villa?",
    a: "Yes, the villa is suitable for small gatherings, family reunions, and corporate outings. Please contact us for special arrangements.",
  },
  {
    q: "What amenities are included?",
    a: "All rates include WiFi, Smart TV with Netflix, BBQ grill, private pool, daily cleaning for public areas, karaoke set, full kitchen access, and more.",
  },
];

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="faq" className="section-padding bg-secondary/30" ref={ref}>
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-xs font-medium tracking-[0.3em] text-primary">FAQ</span>
          <h2 className="mt-4 font-display text-4xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <div className="gold-line mx-auto mt-6" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mt-12"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="glass-card rounded-sm border-none px-6"
              >
                <AccordionTrigger className="text-left font-body text-sm text-foreground hover:text-primary hover:no-underline">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;

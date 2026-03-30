import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useRealtimeTable } from "@/hooks/use-realtime-table";

const fallbackFaqs = [
  { question: "What is the check-in and check-out time?", answer: "Check-in is at 14:00 WIB and check-out is at 12:00 WIB." },
  { question: "How many guests can the villa accommodate?", answer: "Villaito can comfortably accommodate up to 20 guests with 7 spacious bedrooms." },
  { question: "Is the pool private?", answer: "Yes, the villa has a private swimming pool exclusively for our guests." },
  { question: "Is parking available?", answer: "Yes, we provide free parking for multiple vehicles." },
  { question: "Can we host events at the villa?", answer: "Yes, the villa is suitable for small gatherings, family reunions, and corporate outings." },
  { question: "What amenities are included?", answer: "All rates include WiFi, Smart TV with Netflix, BBQ grill, private pool, daily cleaning for public areas, karaoke set, full kitchen access, and more." },
];

const FAQSection = () => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const { data: dbFaqs } = useRealtimeTable("faqs");
  const faqs = dbFaqs.length > 0 ? dbFaqs : fallbackFaqs;

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
            {faqs.map((faq: any, i: number) => (
              <AccordionItem
                key={faq.id || i}
                value={`item-${i}`}
                className="glass-card rounded-sm border-none px-6"
              >
                <AccordionTrigger className="text-left font-body text-sm text-foreground hover:text-primary hover:no-underline">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                  {faq.answer}
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

import { motion } from "framer-motion";

const WhatsAppButton = () => {
  return (
    <motion.a
      href="https://wa.link/vt5ig5"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 border border-primary/40 bg-background/90 px-5 py-2.5 text-xs font-medium tracking-widest text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 2, duration: 0.5 }}
      aria-label="Book Now on WhatsApp"
    >
      BOOK NOW
    </motion.a>
  );
};

export default WhatsAppButton;

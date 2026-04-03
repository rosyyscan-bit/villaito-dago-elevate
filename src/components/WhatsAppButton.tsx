import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  const location = useLocation();
  // On homepage, delay appearance to let intro animation finish
  const isHome = location.pathname === "/";

  return (
    <motion.a
      href="https://wa.link/vt5ig5"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 border border-primary/40 bg-background/90 px-5 py-3 text-[13px] font-medium tracking-wider text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: isHome ? 5 : 0.5, duration: 0.6 }}
      aria-label="Book Now on WhatsApp"
    >
      Book Now
    </motion.a>
  );
};

export default WhatsAppButton;

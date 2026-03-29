import { motion } from "framer-motion";
import heroImg from "@/assets/villa-hero.png";

const HeroSection = () => {
  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden">
      <img
        src={heroImg}
        alt="Villaito Dago luxury villa"
        className="absolute inset-0 h-full w-full object-cover"
        width={1920}
        height={1080}
      />
      <div className="absolute inset-0 bg-background/60" />

      <div className="relative flex h-full flex-col items-center justify-center text-center px-6">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-display text-6xl font-semibold text-foreground md:text-8xl"
        >
          Villaito
        </motion.h1>
        <motion.span
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-1 font-display text-xl tracking-[0.45em] text-primary md:text-2xl"
        >
          DAGO
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-6 max-w-sm text-sm tracking-wider text-foreground/50"
        >
          Luxury Private Villa in Dago Pakar, Bandung
        </motion.p>
        <motion.a
          href="https://wa.link/vt5ig5"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="mt-10 border border-primary/50 px-10 py-3 text-xs font-medium tracking-[0.2em] text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
        >
          BOOK NOW
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;

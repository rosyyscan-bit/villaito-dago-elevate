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
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background" />

      <div className="relative flex h-full flex-col items-center justify-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3 }}
          className="font-display text-6xl font-bold md:text-8xl text-primary"
        >
          Villaito
        </motion.h1>
        <motion.span
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="mt-2 font-display text-2xl tracking-[0.4em] text-foreground/90 md:text-3xl"
        >
          DAGO
        </motion.span>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-6 max-w-md text-sm tracking-wider text-foreground/60"
        >
          Luxury Private Villa in Dago Pakar, Bandung
        </motion.p>
        <motion.a
          href="https://wa.link/vt5ig5"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          className="mt-10 border border-primary/40 px-10 py-3 text-[13px] font-medium tracking-[0.2em] text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
        >
          BOOK NOW
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;

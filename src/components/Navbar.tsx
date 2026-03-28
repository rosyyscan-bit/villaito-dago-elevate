import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero" },
  { label: "About", href: "#about" },
  { label: "Facilities", href: "#facilities" },
  { label: "Rooms", href: "#bedrooms" },
  { label: "Rates", href: "#rates" },
  { label: "Gallery", href: "#gallery" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#hero" className="flex items-center gap-3">
          <img src={logo} alt="Villaito" className="h-10 w-10" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-bold gold-gradient-text">Villaito</span>
            <span className="text-[10px] tracking-[0.25em] text-foreground/70">DAGO</span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-sm font-body text-foreground/80 transition-colors hover:text-primary"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://wa.link/vt5ig5"
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-sm border border-primary bg-primary/10 px-5 py-2 text-sm font-medium text-primary transition-all hover:bg-primary hover:text-primary-foreground"
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="text-foreground md:hidden">
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background/98 backdrop-blur-lg px-6 pb-6 md:hidden"
        >
          {navItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-foreground/80 border-b border-border/30"
            >
              {item.label}
            </a>
          ))}
          <a
            href="https://wa.link/vt5ig5"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block rounded-sm border border-primary bg-primary/10 px-5 py-3 text-center text-sm font-medium text-primary"
          >
            Book Now
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

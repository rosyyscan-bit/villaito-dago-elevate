import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "#hero", isRoute: false },
  { label: "Rates", href: "#rates", isRoute: false },
  { label: "Blog", href: "/blog", isRoute: true },
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
        <a href="#hero" className="flex items-center gap-3">
          <img src={logo} alt="Villaito" className="h-9 w-9" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-lg font-semibold text-primary">Villaito</span>
            <span className="text-[9px] tracking-[0.3em] text-foreground/60 uppercase">Dago</span>
          </div>
        </a>

        {/* Desktop */}
        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                className="text-[13px] font-medium tracking-wide text-foreground/70 transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                className="text-[13px] font-medium tracking-wide text-foreground/70 transition-colors duration-300 hover:text-foreground"
              >
                {item.label}
              </a>
            )
          )}
          <a
            href="https://wa.link/vt5ig5"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/40 px-6 py-2 text-[13px] font-medium tracking-wider text-primary transition-all duration-300 hover:bg-primary hover:text-primary-foreground"
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="text-foreground/70 md:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
          className="bg-background border-b border-border/20 px-6 pb-6 md:hidden"
        >
          {navItems.map((item) =>
            item.isRoute ? (
              <Link
                key={item.label}
                to={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm text-foreground/70 border-b border-border/10"
              >
                {item.label}
              </Link>
            ) : (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm text-foreground/70 border-b border-border/10"
              >
                {item.label}
              </a>
            )
          )}
          <a
            href="https://wa.link/vt5ig5"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block border border-primary/40 py-3 text-center text-sm font-medium tracking-wider text-primary"
          >
            Book Now
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

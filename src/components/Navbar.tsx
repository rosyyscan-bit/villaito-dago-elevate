import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Rates", href: "/rates" },
  { label: "Blog", href: "/blog" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-3">
          <img src={logo} alt="Villaito" className="h-9 w-9" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base font-semibold text-foreground">Villaito</span>
            <span className="text-[9px] tracking-[0.3em] text-primary">DAGO</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              className={`text-sm font-body transition-colors ${
                location.pathname === item.href
                  ? "text-primary"
                  : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.link/vt5ig5"
            target="_blank"
            rel="noopener noreferrer"
            className="border border-primary/40 px-6 py-2 text-sm text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
          >
            Book Now
          </a>
        </div>

        {/* Mobile toggle */}
        <button onClick={() => setOpen(!open)} className="text-foreground md:hidden">
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-background border-b border-border px-6 pb-6 md:hidden"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              to={item.href}
              onClick={() => setOpen(false)}
              className="block py-3 text-sm text-foreground/60 border-b border-border/30 hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
          <a
            href="https://wa.link/vt5ig5"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 block border border-primary/40 px-5 py-3 text-center text-sm text-primary"
          >
            Book Now
          </a>
        </motion.div>
      )}
    </motion.nav>
  );
};

export default Navbar;

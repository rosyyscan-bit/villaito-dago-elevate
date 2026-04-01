import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "@/assets/logo.png";
import { Menu, X } from "lucide-react";

const navItems = [
  { label: "Home", href: "/", isRoute: true },
  { label: "Rates", href: "#rates", isRoute: false },
  { label: "Blog", href: "/blog", isRoute: true },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleNavClick = (item: typeof navItems[0]) => {
    setOpen(false);
    if (item.isRoute) {
      navigate(item.href);
    } else {
      // Hash link - if not on homepage, navigate there first
      if (location.pathname !== "/") {
        navigate("/" + item.href);
      } else {
        const el = document.querySelector(item.href);
        el?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <motion.nav
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled ? "bg-background/95 backdrop-blur-sm border-b border-border/20" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <Link to="/" className="flex items-center gap-2 sm:gap-3">
          <img src={logo} alt="Villaito" className="h-8 w-8 sm:h-9 sm:w-9" />
          <div className="flex flex-col leading-tight">
            <span className="font-display text-base sm:text-lg font-semibold text-primary">Villaito</span>
            <span className="text-[8px] sm:text-[9px] tracking-[0.3em] text-foreground/60 uppercase">Dago</span>
          </div>
        </Link>

        {/* Desktop */}
        <div className="hidden items-center gap-10 md:flex">
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="text-[13px] font-medium tracking-wide text-foreground/70 transition-colors duration-300 hover:text-foreground bg-transparent border-none cursor-pointer"
            >
              {item.label}
            </button>
          ))}
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
          {navItems.map((item) => (
            <button
              key={item.label}
              onClick={() => handleNavClick(item)}
              className="block w-full text-left py-3 text-sm text-foreground/70 border-b border-border/10 bg-transparent cursor-pointer"
            >
              {item.label}
            </button>
          ))}
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

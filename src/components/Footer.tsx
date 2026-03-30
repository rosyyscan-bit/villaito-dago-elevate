import logo from "@/assets/logo.png";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/20 bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Villaito" className="h-9 w-9" />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg font-semibold text-primary">Villaito</span>
                <span className="text-[9px] tracking-[0.3em] text-foreground/60 uppercase">Dago</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Luxury Private Villa in Dago Pakar, Bandung
            </p>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider text-foreground/80 uppercase">Quick Links</h4>
            <div className="mt-4 space-y-3">
              {["Home", "Rates", "Blog"].map((link) => (
                <a key={link} href={link === "Blog" ? "/blog" : `#${link.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
                  {link}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider text-foreground/80 uppercase">Contact</h4>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Jl. Dago Pakar Permai I No.21</p>
              <p>Bandung, Jawa Barat 40198</p>
              <a
                href="https://wa.link/vt5ig5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-primary hover:text-foreground transition-colors duration-300"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-xs font-medium tracking-wider text-foreground/80 uppercase">Follow Us</h4>
            <div className="mt-4 flex gap-3">
              <a href="https://instagram.com/villaitodago" target="_blank" rel="noopener noreferrer" className="border border-border/20 p-2.5 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary">
                <Instagram size={16} />
              </a>
              <a href="https://facebook.com/villaitodago" target="_blank" rel="noopener noreferrer" className="border border-border/20 p-2.5 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary">
                <Facebook size={16} />
              </a>
              <a href="https://tiktok.com/@villaitodago" target="_blank" rel="noopener noreferrer" className="border border-border/20 p-2.5 text-muted-foreground transition-all duration-300 hover:border-primary/30 hover:text-primary">
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.42a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.85z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/10 pt-8 text-center text-xs text-muted-foreground/60">
          © {new Date().getFullYear()} Villaito Dago. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

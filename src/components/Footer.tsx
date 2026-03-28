import logo from "@/assets/logo.png";
import { Instagram, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/30 bg-background px-6 py-16">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-4">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-3">
              <img src={logo} alt="Villaito" className="h-10 w-10" />
              <div className="flex flex-col leading-tight">
                <span className="font-display text-lg font-bold gold-gradient-text">Villaito</span>
                <span className="text-[10px] tracking-[0.25em] text-foreground/70">DAGO</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Luxury Private Villa in Dago Pakar, Bandung
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-medium tracking-wider text-foreground">Quick Links</h4>
            <div className="mt-4 space-y-3">
              {["About", "Facilities", "Rooms", "Rates", "Gallery", "FAQ"].map((link) => (
                <a key={link} href={`#${link.toLowerCase()}`} className="block text-sm text-muted-foreground hover:text-primary transition-colors">
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-medium tracking-wider text-foreground">Contact</h4>
            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
              <p>Jl. Dago Pakar Permai I No.21</p>
              <p>Bandung, Jawa Barat 40198</p>
              <a
                href="https://wa.link/vt5ig5"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block text-primary hover:text-gold-light transition-colors"
              >
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="text-sm font-medium tracking-wider text-foreground">Follow Us</h4>
            <div className="mt-4 flex gap-4">
              <a href="https://instagram.com/villaitodago" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border p-2 text-muted-foreground transition-all hover:border-primary hover:text-primary">
                <Instagram size={18} />
              </a>
              <a href="https://facebook.com/villaitodago" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border p-2 text-muted-foreground transition-all hover:border-primary hover:text-primary">
                <Facebook size={18} />
              </a>
              <a href="https://tiktok.com/@villaitodago" target="_blank" rel="noopener noreferrer" className="rounded-full border border-border p-2 text-muted-foreground transition-all hover:border-primary hover:text-primary">
                <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V9.42a8.16 8.16 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.85z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-border/30 pt-8 text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Villaito Dago. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;

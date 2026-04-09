import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRealtimeSetting } from "@/hooks/use-realtime-table";
import defaultWhatsAppLogo from "@/assets/logo-whatsapp.png";
import defaultAirbnbLogo from "@/assets/logo-airbnb.png";

const HowToBookPage = () => {
  const { value: bookingData } = useRealtimeSetting("how_to_book");

  const airbnbLink = bookingData?.airbnb_link || "https://www.airbnb.co.id/rooms/842242683512448720?source_impression_id=p3_1714227273_NfMR%2BWiPqWn3UoxD&scroll_to_review=1114197424229546848";
  const airbnbTitle = bookingData?.airbnb_title || "Book Villaito Via Airbnb";
  const airbnbDescription = bookingData?.airbnb_description || "Book your stay through Airbnb for a seamless reservation experience with verified reviews and secure payments.";
  const airbnbLogoUrl = bookingData?.airbnb_logo_url || "";

  const whatsappLink = bookingData?.whatsapp_link || "https://api.whatsapp.com/send?phone=6281211888888&text=Halo%20Villaito%2C%20saya%20tahu%20Villaito%20dari%20website.%20Saya%20ingin%20book%20ya";
  const whatsappTitle = bookingData?.whatsapp_title || "Book Villaito Via WhatsApp";
  const whatsappDescription = bookingData?.whatsapp_description || "Contact us directly via WhatsApp for personalized booking assistance and special rates.";
  const whatsappLogoUrl = bookingData?.whatsapp_logo_url || "";

  const howToTitle = bookingData?.howto_whatsapp_title || "How to Book via WhatsApp?";
  const howToDescription = bookingData?.howto_whatsapp_description || "Follow these simple steps to book your stay at Villaito Dago via WhatsApp.";
  const howToImages: string[] = bookingData?.howto_whatsapp_images || [];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-5xl px-6 pt-32 pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-12"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-primary">RESERVATION</span>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl font-bold text-foreground">How To Book</h1>
          <div className="gold-line mx-auto mt-6" />
        </motion.div>

        {/* Booking Options */}
        <div className="grid gap-8 md:grid-cols-2 mb-20">
          {/* Airbnb */}
          <motion.a
            href={airbnbLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="group flex flex-col items-center rounded-sm border border-border bg-card p-8 text-center transition-all hover:border-primary/40 hover:shadow-lg"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/90 p-4">
              <img
                src={airbnbLogoUrl || defaultAirbnbLogo}
                alt="Airbnb"
                className="h-16 w-16 object-contain"
              />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {airbnbTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {airbnbDescription}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-sm border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              Book on Airbnb
            </span>
          </motion.a>

          {/* WhatsApp */}
          <motion.a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="group flex flex-col items-center rounded-sm border border-border bg-card p-8 text-center transition-all hover:border-primary/40 hover:shadow-lg"
          >
            <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-white/90 p-4">
              <img
                src={whatsappLogoUrl || defaultWhatsAppLogo}
                alt="WhatsApp"
                className="h-16 w-16 object-contain"
              />
            </div>
            <h2 className="font-display text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {whatsappTitle}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {whatsappDescription}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 rounded-sm border border-primary bg-primary/10 px-6 py-3 text-sm font-medium text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">
              Chat on WhatsApp
            </span>
          </motion.a>
        </div>

        {/* How to Book via WhatsApp */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="text-center mb-12">
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-foreground">{howToTitle}</h2>
            <p className="mt-4 text-sm text-muted-foreground max-w-2xl mx-auto">{howToDescription}</p>
            <div className="gold-line mx-auto mt-6" />
          </div>

          {howToImages.length > 0 ? (
            <div className="space-y-6">
              {howToImages.map((img: string, i: number) => (
                <div key={i} className="overflow-hidden rounded-sm border border-border">
                  <img src={img} alt={`Step ${i + 1}`} className="w-full object-contain" />
                </div>
              ))}
            </div>
          ) : (
            <div className="rounded-sm border border-border/40 bg-card p-12 text-center">
              <p className="text-sm text-muted-foreground">Tutorial images will be added soon.</p>
            </div>
          )}
        </motion.div>
      </div>
      <Footer />
    </div>
  );
};

export default HowToBookPage;

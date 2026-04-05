import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRealtimeTable } from "@/hooks/use-realtime-table";

const CATEGORY_ORDER = ["Amenities", "Entertainment", "Bathroom", "Bedroom", "Kitchen", "Family", "Others"];

const FacilitiesPage = () => {
  const { data: facilities, loading } = useRealtimeTable("facilities", "sort_order");

  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = facilities.filter((f: any) => f.category === cat);
    if (items.length > 0) acc.push({ title: cat, items });
    return acc;
  }, [] as { title: string; items: any[] }[]);

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
          <span className="text-xs font-medium tracking-[0.3em] text-primary">AMENITIES</span>
          <h1 className="mt-4 font-display text-4xl font-bold text-foreground md:text-5xl">
            Facilities & Services
          </h1>
          <div className="gold-line mx-auto mt-6" />
        </motion.div>

        {loading ? (
          <p className="text-center text-muted-foreground">Loading...</p>
        ) : (
          <div className="space-y-16">
            {grouped.map((cat, ci) => (
              <motion.div
                key={cat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: ci * 0.08 }}
              >
                <h2 className="font-display text-2xl font-semibold text-foreground mb-6">
                  {cat.title}
                </h2>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {cat.items.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-3 bg-white/5 border border-border/15 px-5 py-4 transition-colors duration-300 hover:border-primary/25"
                    >
                      {item.icon_url ? (
                        <div className="h-7 w-7 rounded bg-white/90 flex items-center justify-center p-0.5 flex-shrink-0">
                          <img src={item.icon_url} alt="" className="h-5 w-5 object-contain" />
                        </div>
                      ) : (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary flex-shrink-0" />
                      )}
                      <span className="text-sm text-foreground/80">{item.title}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-12 text-xs text-muted-foreground text-center"
        >
          *With additional fee
        </motion.p>
      </div>
      <Footer />
    </div>
  );
};

export default FacilitiesPage;

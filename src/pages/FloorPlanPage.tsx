import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const FloorPlanPage = () => {
  const [plans, setPlans] = useState<any[]>([]);

  useEffect(() => {
    supabase.from("floor_plans").select("*").order("sort_order").then(({ data }) => {
      if (data) setPlans(data);
    });
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="mx-auto max-w-6xl px-4 sm:px-6 pt-28 sm:pt-32 pb-16 sm:pb-20">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground mb-10 sm:mb-12"
        >
          <ArrowLeft size={16} />
          Back to Home
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-xs font-medium tracking-[0.3em] text-primary">LAYOUT</span>
          <h1 className="mt-4 font-display text-3xl sm:text-4xl md:text-5xl font-bold text-foreground">
            Floor Plan
          </h1>
          <div className="gold-line mx-auto mt-6" />
        </motion.div>

        <div className="space-y-12 sm:space-y-16">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              className="flex flex-col md:flex-row gap-6 items-start"
            >
              {plan.image_url && (
                <img
                  src={plan.image_url}
                  alt={plan.title}
                  className="w-full md:w-2/3 rounded-sm border border-border/10"
                />
              )}
              <div className="flex-1">
                <h2 className="font-display text-xl font-semibold text-foreground">{plan.title}</h2>
                {plan.description && (
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{plan.description}</p>
                )}
              </div>
            </motion.div>
          ))}
          {plans.length === 0 && (
            <p className="text-center text-muted-foreground">No floor plans available yet.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default FloorPlanPage;

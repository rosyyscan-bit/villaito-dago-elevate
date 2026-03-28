import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    bedrooms: 0, blogs: 0, gallery: 0, faqs: 0, testimonials: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      const [bedrooms, blogs, gallery, faqs, testimonials] = await Promise.all([
        supabase.from("bedrooms").select("id", { count: "exact", head: true }),
        supabase.from("blogs").select("id", { count: "exact", head: true }),
        supabase.from("gallery").select("id", { count: "exact", head: true }),
        supabase.from("faqs").select("id", { count: "exact", head: true }),
        supabase.from("testimonials").select("id", { count: "exact", head: true }),
      ]);
      setStats({
        bedrooms: bedrooms.count || 0,
        blogs: blogs.count || 0,
        gallery: gallery.count || 0,
        faqs: faqs.count || 0,
        testimonials: testimonials.count || 0,
      });
    };
    fetchStats();
  }, []);

  const cards = [
    { label: "Bedrooms", count: stats.bedrooms },
    { label: "Blog Posts", count: stats.blogs },
    { label: "Gallery Items", count: stats.gallery },
    { label: "FAQs", count: stats.faqs },
    { label: "Testimonials", count: stats.testimonials },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-foreground mb-6">Welcome Back</h1>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <div key={card.label} className="glass-card rounded-sm p-6">
            <p className="text-sm text-muted-foreground">{card.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-primary">{card.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminDashboard;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminHomepage = () => {
  const { toast } = useToast();
  const [heroTitle, setHeroTitle] = useState("Villaito");
  const [heroSubtitle, setHeroSubtitle] = useState("Luxury Private Villa in Dago Pakar, Bandung");
  const [aboutTitle, setAboutTitle] = useState("Your Home in Bandung Awaits");
  const [aboutText, setAboutText] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        data.forEach((s) => {
          const v = s.value as any;
          if (s.key === "hero") { setHeroTitle(v.title || ""); setHeroSubtitle(v.subtitle || ""); }
          if (s.key === "about") { setAboutTitle(v.title || ""); setAboutText(v.text || ""); }
        });
      }
    };
    load();
  }, []);

  const save = async () => {
    setLoading(true);
    try {
      await supabase.from("site_settings").upsert([
        { key: "hero", value: { title: heroTitle, subtitle: heroSubtitle } },
        { key: "about", value: { title: aboutTitle, text: aboutText } },
      ], { onConflict: "key" });
      toast({ title: "Saved!" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="flat-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Hero Section</h3>
        <div className="space-y-3">
          <Input placeholder="Title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="bg-secondary/50" />
        </div>
      </div>
      <div className="flat-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">About Section</h3>
        <div className="space-y-3">
          <Input placeholder="Title" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Description" value={aboutText} onChange={(e) => setAboutText(e.target.value)} className="bg-secondary/50 min-h-[120px]" />
        </div>
      </div>
      <Button onClick={save} disabled={loading} className="bg-primary text-primary-foreground">
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default AdminHomepage;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import FileUpload from "@/components/FileUpload";
import { Trash2 } from "lucide-react";

const AdminHomepage = () => {
  const { toast } = useToast();
  const [heroTitle, setHeroTitle] = useState("Villaito");
  const [heroSubtitle, setHeroSubtitle] = useState("Luxury Private Villa in Dago Pakar, Bandung");
  const [aboutTitle, setAboutTitle] = useState("Your Home in Bandung Awaits");
  const [aboutText, setAboutText] = useState("");
  const [stats, setStats] = useState([
    { num: "7", label: "Bedrooms" },
    { num: "1", label: "Private Pool" },
    { num: "1", label: "Rooftop" },
    { num: "∞", label: "Memories" },
  ]);
  const [aboutImages, setAboutImages] = useState<string[]>(["", "", ""]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("*");
      if (data) {
        data.forEach((s) => {
          const v = s.value as any;
          if (s.key === "hero") { setHeroTitle(v.title || ""); setHeroSubtitle(v.subtitle || ""); }
          if (s.key === "about") {
            setAboutTitle(v.title || "");
            setAboutText(v.text || "");
            if (v.stats) setStats(v.stats);
            if (v.images) setAboutImages(v.images);
          }
        });
      }
    };
    load();
  }, []);

  const updateStat = (index: number, field: "num" | "label", value: string) => {
    const updated = [...stats];
    updated[index] = { ...updated[index], [field]: value };
    setStats(updated);
  };

  const updateImage = (index: number, url: string) => {
    const updated = [...aboutImages];
    updated[index] = url;
    setAboutImages(updated);
  };

  const save = async () => {
    setLoading(true);
    try {
      await supabase.from("site_settings").upsert([
        { key: "hero", value: { title: heroTitle, subtitle: heroSubtitle } },
        { key: "about", value: { title: aboutTitle, text: aboutText, stats, images: aboutImages } },
      ], { onConflict: "key" });
      toast({ title: "Saved!" });
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Hero Section</h3>
        <div className="space-y-3">
          <Input placeholder="Title" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Subtitle" value={heroSubtitle} onChange={(e) => setHeroSubtitle(e.target.value)} className="bg-secondary/50" />
        </div>
      </div>

      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">About Section</h3>
        <div className="space-y-3">
          <Input placeholder="Title" value={aboutTitle} onChange={(e) => setAboutTitle(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Description (use double newline for paragraphs)" value={aboutText} onChange={(e) => setAboutText(e.target.value)} className="bg-secondary/50 min-h-[120px]" />
        </div>
      </div>

      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Stats Counters</h3>
        <div className="space-y-3">
          {stats.map((stat, i) => (
            <div key={i} className="flex gap-2">
              <Input placeholder="Number" value={stat.num} onChange={(e) => updateStat(i, "num", e.target.value)} className="bg-secondary/50 w-24" />
              <Input placeholder="Label" value={stat.label} onChange={(e) => updateStat(i, "label", e.target.value)} className="bg-secondary/50 flex-1" />
            </div>
          ))}
        </div>
      </div>

      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">About Images</h3>
        <div className="space-y-4">
          {["Main Image (large)", "Left Image", "Right Image"].map((label, i) => (
            <div key={i} className="space-y-2">
              <p className="text-xs text-muted-foreground">{label}</p>
              <div className="flex items-center gap-3">
                <Input placeholder="Image URL" value={aboutImages[i] || ""} onChange={(e) => updateImage(i, e.target.value)} className="bg-secondary/50 flex-1" />
                <FileUpload onUpload={(url) => updateImage(i, url)} folder="about" label="Upload" />
              </div>
              {aboutImages[i] && (
                <div className="relative inline-block">
                  <img src={aboutImages[i]} alt={label} className="h-20 w-32 object-cover rounded-sm" />
                  <button onClick={() => updateImage(i, "")} className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-destructive-foreground">
                    <Trash2 size={10} />
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <Button onClick={save} disabled={loading} className="bg-primary text-primary-foreground">
        {loading ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  );
};

export default AdminHomepage;

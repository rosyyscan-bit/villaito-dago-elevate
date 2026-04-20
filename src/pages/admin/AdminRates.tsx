import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const defaultNotes = [
  "Extra futon bed fee: Rp150.000 per bed per night",
  "Special periods (Christmas, Lebaran) may have different rates",
  "Airbnb price may be higher due to tax & fees",
  "Booking via WhatsApp requires Rp3.000.000 deposit (refundable)",
  "Rate as of May 2024",
];

const AdminRates = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [price, setPrice] = useState("");
  const [features, setFeatures] = useState("");
  const [featured, setFeatured] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [notes, setNotes] = useState<string>(defaultNotes.join("\n"));

  const fetchData = async () => {
    const { data } = await supabase.from("rates").select("*").order("sort_order");
    if (data) setItems(data);
    const { data: settings } = await supabase
      .from("site_settings")
      .select("value")
      .eq("key", "rates_notes")
      .maybeSingle();
    if (settings?.value) {
      const v = settings.value as any;
      if (Array.isArray(v.notes)) setNotes(v.notes.join("\n"));
    }
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!title.trim() || !price.trim()) return;
    const featureList = features.split("\n").filter(Boolean);
    if (editing) {
      await supabase.from("rates").update({ title, subtitle, price, features: featureList, featured }).eq("id", editing.id);
    } else {
      await supabase.from("rates").insert({ title, subtitle, price, features: featureList, featured, sort_order: items.length });
    }
    toast({ title: "Saved!" });
    setTitle(""); setSubtitle(""); setPrice(""); setFeatures(""); setFeatured(false); setEditing(null);
    fetchData();
  };

  const handleSaveNotes = async () => {
    const list = notes.split("\n").map((n) => n.trim()).filter(Boolean);
    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", "rates_notes")
      .maybeSingle();
    if (existing) {
      await supabase.from("site_settings").update({ value: { notes: list } }).eq("id", existing.id);
    } else {
      await supabase.from("site_settings").insert({ key: "rates_notes", value: { notes: list } });
    }
    toast({ title: "Notes saved!" });
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">{editing ? "Edit Rate" : "Add Rate"}</h3>
        <div className="space-y-3">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Subtitle" value={subtitle} onChange={(e) => setSubtitle(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Price (e.g. Rp 5.500.000)" value={price} onChange={(e) => setPrice(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Features (one per line)" value={features} onChange={(e) => setFeatures(e.target.value)} className="bg-secondary/50" />
          <div className="flex items-center gap-3">
            <Switch checked={featured} onCheckedChange={setFeatured} />
            <span className="text-sm text-muted-foreground">Featured</span>
          </div>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground"><Plus size={16} className="mr-1" />{editing ? "Update" : "Add"}</Button>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card flex items-center gap-4 rounded-sm p-4">
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.title} — {item.price}</p>
              <p className="text-xs text-muted-foreground">{item.subtitle}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setTitle(item.title); setSubtitle(item.subtitle||""); setPrice(item.price); setFeatures((item.features||[]).join("\n")); setFeatured(item.featured||false); }} className="text-primary">Edit</Button>
            <Button variant="ghost" size="sm" onClick={async () => { await supabase.from("rates").delete().eq("id", item.id); fetchData(); }} className="text-destructive"><Trash2 size={16} /></Button>
          </div>
        ))}
      </div>

      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-2">Pricing Notes</h3>
        <p className="text-xs text-muted-foreground mb-3">Catatan/keterangan yang muncul di bawah daftar harga. Satu baris = satu poin.</p>
        <Textarea
          rows={6}
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="bg-secondary/50"
          placeholder="One note per line"
        />
        <Button onClick={handleSaveNotes} className="mt-3 bg-primary text-primary-foreground">Save Notes</Button>
      </div>
    </div>
  );
};

export default AdminRates;

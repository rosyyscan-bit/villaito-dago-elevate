import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const AdminLocation = () => {
  const { toast } = useToast();
  const [address, setAddress] = useState("Jl. Dago Pakar Permai I No.21, Mekarsaluyu, Kec. Cimenyan, Kabupaten Bandung, Jawa Barat 40198");
  const [description, setDescription] = useState("");
  const [mapUrl, setMapUrl] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("key", "location").single();
      if (data) {
        const v = data.value as any;
        setAddress(v.address || ""); setDescription(v.description || ""); setMapUrl(v.mapUrl || "");
      }
    };
    load();
  }, []);

  const save = async () => {
    setLoading(true);
    await supabase.from("site_settings").upsert({ key: "location", value: { address, description, mapUrl } }, { onConflict: "key" });
    toast({ title: "Saved!" });
    setLoading(false);
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Location Settings</h3>
        <div className="space-y-3">
          <Input placeholder="Address" value={address} onChange={(e) => setAddress(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Google Maps embed URL" value={mapUrl} onChange={(e) => setMapUrl(e.target.value)} className="bg-secondary/50" />
        </div>
      </div>
      <Button onClick={save} disabled={loading} className="bg-primary text-primary-foreground">Save</Button>
    </div>
  );
};

export default AdminLocation;

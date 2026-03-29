import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

const AdminSocial = () => {
  const { toast } = useToast();
  const [instagram, setInstagram] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [facebook, setFacebook] = useState("");
  const [whatsapp, setWhatsapp] = useState("https://wa.link/vt5ig5");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from("site_settings").select("*").eq("key", "social").single();
      if (data) {
        const v = data.value as any;
        setInstagram(v.instagram || ""); setTiktok(v.tiktok || ""); setFacebook(v.facebook || ""); setWhatsapp(v.whatsapp || "");
      }
    };
    load();
  }, []);

  const save = async () => {
    setLoading(true);
    await supabase.from("site_settings").upsert({ key: "social", value: { instagram, tiktok, facebook, whatsapp } }, { onConflict: "key" });
    toast({ title: "Saved!" });
    setLoading(false);
  };

  return (
    <div className="max-w-xl space-y-6">
      <div className="flat-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Social Media Links</h3>
        <div className="space-y-3">
          <Input placeholder="Instagram URL" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="TikTok URL" value={tiktok} onChange={(e) => setTiktok(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Facebook URL" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="WhatsApp link" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="bg-secondary/50" />
        </div>
      </div>
      <Button onClick={save} disabled={loading} className="bg-primary text-primary-foreground">Save</Button>
    </div>
  );
};

export default AdminSocial;

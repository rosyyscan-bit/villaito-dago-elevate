import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Save, Trash2 } from "lucide-react";
import FileUpload from "@/components/FileUpload";

const AdminHowToBook = () => {
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  const [airbnbTitle, setAirbnbTitle] = useState("Book Villaito Via Airbnb");
  const [airbnbLink, setAirbnbLink] = useState("");
  const [airbnbDescription, setAirbnbDescription] = useState("");
  const [airbnbLogoUrl, setAirbnbLogoUrl] = useState("");

  const [whatsappTitle, setWhatsappTitle] = useState("Book Villaito Via WhatsApp");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [whatsappDescription, setWhatsappDescription] = useState("");
  const [whatsappLogoUrl, setWhatsappLogoUrl] = useState("");

  const [howToTitle, setHowToTitle] = useState("How to Book via WhatsApp?");
  const [howToDescription, setHowToDescription] = useState("");
  const [howToImages, setHowToImages] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from("site_settings")
        .select("*")
        .eq("key", "how_to_book")
        .maybeSingle();
      if (data?.value) {
        const v = data.value as any;
        setAirbnbTitle(v.airbnb_title || "Book Villaito Via Airbnb");
        setAirbnbLink(v.airbnb_link || "");
        setAirbnbDescription(v.airbnb_description || "");
        setAirbnbLogoUrl(v.airbnb_logo_url || "");
        setWhatsappTitle(v.whatsapp_title || "Book Villaito Via WhatsApp");
        setWhatsappLink(v.whatsapp_link || "");
        setWhatsappDescription(v.whatsapp_description || "");
        setWhatsappLogoUrl(v.whatsapp_logo_url || "");
        setHowToTitle(v.howto_whatsapp_title || "How to Book via WhatsApp?");
        setHowToDescription(v.howto_whatsapp_description || "");
        setHowToImages(v.howto_whatsapp_images || []);
      }
      setLoading(false);
    };
    fetch();
  }, []);

  const handleSave = async () => {
    const value = {
      airbnb_title: airbnbTitle,
      airbnb_link: airbnbLink,
      airbnb_description: airbnbDescription,
      airbnb_logo_url: airbnbLogoUrl,
      whatsapp_title: whatsappTitle,
      whatsapp_link: whatsappLink,
      whatsapp_description: whatsappDescription,
      whatsapp_logo_url: whatsappLogoUrl,
      howto_whatsapp_title: howToTitle,
      howto_whatsapp_description: howToDescription,
      howto_whatsapp_images: howToImages,
    };

    const { data: existing } = await supabase
      .from("site_settings")
      .select("id")
      .eq("key", "how_to_book")
      .maybeSingle();

    if (existing) {
      await supabase.from("site_settings").update({ value }).eq("key", "how_to_book");
    } else {
      await supabase.from("site_settings").insert({ key: "how_to_book", value });
    }

    toast({ title: "Saved!" });
  };

  const addImage = (url: string) => {
    setHowToImages((prev) => [...prev, url]);
  };

  const removeImage = (index: number) => {
    setHowToImages((prev) => prev.filter((_, i) => i !== index));
  };

  if (loading) return <p className="text-muted-foreground text-sm">Loading...</p>;

  return (
    <div className="space-y-8">
      {/* Airbnb Section */}
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Airbnb Booking</h3>
        <div className="space-y-3">
          <Input placeholder="Title" value={airbnbTitle} onChange={(e) => setAirbnbTitle(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Airbnb Link URL" value={airbnbLink} onChange={(e) => setAirbnbLink(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Description" value={airbnbDescription} onChange={(e) => setAirbnbDescription(e.target.value)} className="bg-secondary/50 min-h-[80px]" />
          <div className="flex items-center gap-3">
            <FileUpload onUpload={(url) => setAirbnbLogoUrl(url)} label="Upload Airbnb Logo" folder="howtobook" />
            {airbnbLogoUrl && <img src={airbnbLogoUrl} alt="Airbnb logo" className="h-12 w-12 rounded-full bg-white/90 p-1 object-contain border border-border/20" />}
          </div>
        </div>
      </div>

      {/* WhatsApp Section */}
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">WhatsApp Booking</h3>
        <div className="space-y-3">
          <Input placeholder="Title" value={whatsappTitle} onChange={(e) => setWhatsappTitle(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="WhatsApp Link URL" value={whatsappLink} onChange={(e) => setWhatsappLink(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Description" value={whatsappDescription} onChange={(e) => setWhatsappDescription(e.target.value)} className="bg-secondary/50 min-h-[80px]" />
          <div className="flex items-center gap-3">
            <FileUpload onUpload={(url) => setWhatsappLogoUrl(url)} label="Upload WhatsApp Logo" folder="howtobook" />
            {whatsappLogoUrl && <img src={whatsappLogoUrl} alt="WhatsApp logo" className="h-12 w-12 rounded-full bg-white/90 p-1 object-contain border border-border/20" />}
          </div>
        </div>
      </div>

      {/* How to Book via WhatsApp */}
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">How to Book via WhatsApp - Tutorial</h3>
        <div className="space-y-3">
          <Input placeholder="Section Title" value={howToTitle} onChange={(e) => setHowToTitle(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Description" value={howToDescription} onChange={(e) => setHowToDescription(e.target.value)} className="bg-secondary/50 min-h-[80px]" />

          <div>
            <p className="text-sm text-muted-foreground mb-2">Tutorial Images ({howToImages.length})</p>
            <FileUpload onUpload={addImage} label="Add Tutorial Image" folder="howtobook" />
            <div className="mt-3 space-y-2">
              {howToImages.map((img, i) => (
                <div key={i} className="flex items-center gap-3 rounded-sm border border-border/20 p-2">
                  <img src={img} alt={`Step ${i + 1}`} className="h-20 w-32 object-contain rounded-sm bg-white/90" />
                  <span className="text-sm text-muted-foreground flex-1">Step {i + 1}</span>
                  <Button variant="ghost" size="sm" onClick={() => removeImage(i)} className="text-destructive">
                    <Trash2 size={16} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Button onClick={handleSave} className="bg-primary text-primary-foreground">
        <Save size={16} className="mr-2" /> Save All
      </Button>
    </div>
  );
};

export default AdminHowToBook;

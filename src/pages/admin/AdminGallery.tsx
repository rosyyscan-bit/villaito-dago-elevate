import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const AdminGallery = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [imageUrl, setImageUrl] = useState("");
  const [caption, setCaption] = useState("");
  const [mediaType, setMediaType] = useState("image");

  const fetchData = async () => {
    const { data } = await supabase.from("gallery").select("*").order("sort_order");
    if (data) setItems(data);
  };
  useEffect(() => { fetchData(); }, []);

  const handleAdd = async () => {
    if (!imageUrl.trim()) return;
    await supabase.from("gallery").insert({ image_url: imageUrl, caption, media_type: mediaType, sort_order: items.length });
    toast({ title: "Added!" });
    setImageUrl(""); setCaption(""); setMediaType("image");
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">Add Media</h3>
        <div className="space-y-3">
          <Input placeholder="Image/Video URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Caption (optional)" value={caption} onChange={(e) => setCaption(e.target.value)} className="bg-secondary/50" />
          <select value={mediaType} onChange={(e) => setMediaType(e.target.value)} className="w-full rounded-sm border border-border bg-secondary/50 p-2 text-sm text-foreground">
            <option value="image">Image</option>
            <option value="video">Video</option>
          </select>
          <Button onClick={handleAdd} className="bg-primary text-primary-foreground"><Plus size={16} className="mr-1" />Add</Button>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        {items.map((item) => (
          <div key={item.id} className="glass-card group relative overflow-hidden rounded-sm">
            {item.media_type === "video" ? (
              <video src={item.image_url} className="h-32 w-full object-cover" />
            ) : (
              <img src={item.image_url} alt={item.caption || "Gallery"} className="h-32 w-full object-cover" />
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={async () => { await supabase.from("gallery").delete().eq("id", item.id); fetchData(); }}
              className="absolute right-1 top-1 opacity-0 group-hover:opacity-100 text-destructive bg-background/80"
            >
              <Trash2 size={14} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminGallery;

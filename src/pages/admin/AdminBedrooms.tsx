import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical } from "lucide-react";
import FileUpload from "@/components/FileUpload";

interface Bedroom {
  id: string;
  name: string;
  description: string | null;
  image_url: string | null;
  sort_order: number;
}

const AdminBedrooms = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Bedroom[]>([]);
  const [editing, setEditing] = useState<Bedroom | null>(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const fetch = async () => {
    const { data } = await supabase.from("bedrooms").select("*").order("sort_order");
    if (data) setItems(data);
  };

  useEffect(() => { fetch(); }, []);

  const handleSave = async () => {
    if (!name.trim()) return;
    try {
      if (editing) {
        await supabase.from("bedrooms").update({ name, description, image_url: imageUrl || null }).eq("id", editing.id);
      } else {
        await supabase.from("bedrooms").insert({ name, description, image_url: imageUrl || null, sort_order: items.length });
      }
      toast({ title: "Saved!" });
      setName(""); setDescription(""); setImageUrl(""); setEditing(null);
      fetch();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("bedrooms").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetch();
  };

  const startEdit = (item: Bedroom) => {
    setEditing(item);
    setName(item.name);
    setDescription(item.description || "");
    setImageUrl(item.image_url || "");
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          {editing ? "Edit Bedroom" : "Add Bedroom"}
        </h3>
        <div className="space-y-3">
          <Input placeholder="Room name" value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-secondary/50" />
          <div className="space-y-2">
            <Input placeholder="Image URL" value={imageUrl} onChange={(e) => setImageUrl(e.target.value)} className="bg-secondary/50" />
            <FileUpload onUpload={(url) => setImageUrl(url)} folder="bedrooms" label="Upload Image" />
            {imageUrl && (
              <div className="relative inline-block">
                <img src={imageUrl} alt="Preview" className="h-24 w-36 object-cover rounded-sm" />
                <button onClick={() => setImageUrl("")} className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-destructive-foreground">
                  <Trash2 size={10} />
                </button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              <Plus size={16} className="mr-1" /> {editing ? "Update" : "Add"}
            </Button>
            {editing && (
              <Button variant="outline" onClick={() => { setEditing(null); setName(""); setDescription(""); setImageUrl(""); }}>
                Cancel
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="glass-card flex items-center gap-4 rounded-sm p-4">
            <GripVertical size={16} className="text-muted-foreground" />
            {item.image_url && <img src={item.image_url} alt={item.name} className="h-12 w-16 rounded-sm object-cover" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{item.name}</p>
              <p className="text-xs text-muted-foreground truncate">{item.description}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => startEdit(item)} className="text-primary">Edit</Button>
            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-destructive">
              <Trash2 size={16} />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBedrooms;

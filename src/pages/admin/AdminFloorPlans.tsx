import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical } from "lucide-react";
import FileUpload from "@/components/FileUpload";

const AdminFloorPlans = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [editing, setEditing] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("floor_plans").select("*").order("sort_order");
    if (data) setItems(data);
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!title.trim()) return;
    const payload = { title, description: description || null, image_url: imageUrl || null };
    if (editing) {
      await supabase.from("floor_plans").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("floor_plans").insert({ ...payload, sort_order: items.length });
    }
    toast({ title: "Saved!" });
    setTitle(""); setDescription(""); setImageUrl(""); setEditing(null);
    fetchData();
  };

  const handleDelete = async (id: string) => {
    await supabase.from("floor_plans").delete().eq("id", id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          {editing ? "Edit Floor Plan" : "Add Floor Plan"}
        </h3>
        <div className="space-y-3">
          <Input placeholder="Title (e.g. Basement)" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="bg-secondary/50 min-h-[80px]" />
          <div className="flex items-center gap-3">
            <FileUpload onUpload={(url) => setImageUrl(url)} label="Upload Floor Plan Image" folder="floorplans" />
            {imageUrl && <img src={imageUrl} alt="preview" className="h-16 object-contain border border-border/20 rounded-sm" />}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-primary text-primary-foreground"><Plus size={16} className="mr-1" /> Save</Button>
            {editing && <Button variant="outline" onClick={() => { setEditing(null); setTitle(""); setDescription(""); setImageUrl(""); }}>Cancel</Button>}
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="glass-card flex items-start gap-4 rounded-sm p-4">
            <GripVertical size={16} className="text-muted-foreground mt-1 flex-shrink-0" />
            {item.image_url && <img src={item.image_url} alt="" className="h-20 w-32 object-contain border border-border/20 rounded-sm flex-shrink-0" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground">{item.title}</p>
              {item.description && <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{item.description}</p>}
            </div>
            <div className="flex gap-1 flex-shrink-0">
              <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setTitle(item.title); setDescription(item.description || ""); setImageUrl(item.image_url || ""); }} className="text-primary">Edit</Button>
              <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-destructive"><Trash2 size={16} /></Button>
            </div>
          </div>
        ))}
        {items.length === 0 && <p className="text-sm text-muted-foreground text-center py-8">No floor plans yet. Add one above.</p>}
      </div>
    </div>
  );
};

export default AdminFloorPlans;

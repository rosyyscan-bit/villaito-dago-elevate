import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";
import FileUpload from "@/components/FileUpload";

const AdminFacilities = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("Sparkles");
  const [iconUrl, setIconUrl] = useState("");
  const [editing, setEditing] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("facilities").select("*").order("sort_order");
    if (data) setItems(data);
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!title.trim()) return;
    const payload: any = { title, icon, icon_url: iconUrl || null };
    if (editing) {
      await supabase.from("facilities").update(payload).eq("id", editing.id);
    } else {
      await supabase.from("facilities").insert({ ...payload, sort_order: items.length });
    }
    toast({ title: "Saved!" });
    setTitle(""); setIcon("Sparkles"); setIconUrl(""); setEditing(null);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          {editing ? "Edit Facility" : "Add Facility"}
        </h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary/50" />
            <Input placeholder="Icon name (fallback)" value={icon} onChange={(e) => setIcon(e.target.value)} className="bg-secondary/50 w-40" />
          </div>
          <div className="flex items-center gap-3">
            <FileUpload onUpload={(url) => setIconUrl(url)} label="Upload Icon" folder="facility-icons" />
            {iconUrl && <img src={iconUrl} alt="icon" className="h-8 w-8 object-contain" />}
          </div>
          <Button onClick={handleSave} className="bg-primary text-primary-foreground"><Plus size={16} className="mr-1" /> Save</Button>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card flex items-center gap-4 rounded-sm p-4">
            {item.icon_url ? (
              <img src={item.icon_url} alt="" className="h-6 w-6 object-contain" />
            ) : (
              <span className="text-xs text-muted-foreground">{item.icon}</span>
            )}
            <span className="flex-1 text-foreground">{item.title}</span>
            <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setTitle(item.title); setIcon(item.icon); setIconUrl(item.icon_url || ""); }} className="text-primary">Edit</Button>
            <Button variant="ghost" size="sm" onClick={async () => { await supabase.from("facilities").delete().eq("id", item.id); fetchData(); }} className="text-destructive"><Trash2 size={16} /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFacilities;

import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const AdminFacilities = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [icon, setIcon] = useState("Sparkles");
  const [editing, setEditing] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("facilities").select("*").order("sort_order");
    if (data) setItems(data);
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!title.trim()) return;
    if (editing) {
      await supabase.from("facilities").update({ title, icon }).eq("id", editing.id);
    } else {
      await supabase.from("facilities").insert({ title, icon, sort_order: items.length });
    }
    toast({ title: "Saved!" });
    setTitle(""); setIcon("Sparkles"); setEditing(null);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="flat-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          {editing ? "Edit Facility" : "Add Facility"}
        </h3>
        <div className="flex gap-3">
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Icon name" value={icon} onChange={(e) => setIcon(e.target.value)} className="bg-secondary/50 w-40" />
          <Button onClick={handleSave} className="bg-primary text-primary-foreground"><Plus size={16} /></Button>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="flat-card flex items-center gap-4 rounded-sm p-4">
            <span className="flex-1 text-foreground">{item.title}</span>
            <span className="text-xs text-muted-foreground">{item.icon}</span>
            <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setTitle(item.title); setIcon(item.icon); }} className="text-primary">Edit</Button>
            <Button variant="ghost" size="sm" onClick={async () => { await supabase.from("facilities").delete().eq("id", item.id); fetchData(); }} className="text-destructive"><Trash2 size={16} /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFacilities;

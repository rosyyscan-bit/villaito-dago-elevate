import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, GripVertical } from "lucide-react";
import { Switch } from "@/components/ui/switch";

const AdminNavigation = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [label, setLabel] = useState("");
  const [href, setHref] = useState("");
  const [editing, setEditing] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("nav_menus").select("*").order("sort_order");
    if (data) setItems(data);
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!label.trim() || !href.trim()) return;
    if (editing) {
      await supabase.from("nav_menus").update({ label, href }).eq("id", editing.id);
    } else {
      await supabase.from("nav_menus").insert({ label, href, sort_order: items.length });
    }
    toast({ title: "Saved!" });
    setLabel(""); setHref(""); setEditing(null);
    fetchData();
  };

  const toggleVisibility = async (id: string, visible: boolean) => {
    await supabase.from("nav_menus").update({ visible: !visible }).eq("id", id);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">{editing ? "Edit Menu" : "Add Menu"}</h3>
        <div className="flex gap-3">
          <Input placeholder="Label" value={label} onChange={(e) => setLabel(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Link (#about or /blog)" value={href} onChange={(e) => setHref(e.target.value)} className="bg-secondary/50" />
          <Button onClick={handleSave} className="bg-primary text-primary-foreground"><Plus size={16} /></Button>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card flex items-center gap-4 rounded-sm p-4">
            <GripVertical size={16} className="text-muted-foreground" />
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.label}</p>
              <p className="text-xs text-muted-foreground">{item.href}</p>
            </div>
            <Switch checked={item.visible} onCheckedChange={() => toggleVisibility(item.id, item.visible)} />
            <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setLabel(item.label); setHref(item.href); }} className="text-primary">Edit</Button>
            <Button variant="ghost" size="sm" onClick={async () => { await supabase.from("nav_menus").delete().eq("id", item.id); fetchData(); }} className="text-destructive"><Trash2 size={16} /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminNavigation;

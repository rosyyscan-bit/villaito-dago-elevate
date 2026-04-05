import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Pencil, X } from "lucide-react";
import FileUpload from "@/components/FileUpload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CATEGORIES = ["Amenities", "Entertainment", "Bathroom", "Bedroom", "Kitchen", "Family", "Others"];

const AdminFacilities = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Others");
  const [iconUrl, setIconUrl] = useState("");
  const [editing, setEditing] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("facilities").select("*").order("category").order("sort_order");
    if (data) setItems(data);
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!title.trim()) return;
    const payload = { title, category, icon_url: iconUrl || null, icon: "Sparkles" };
    let error;
    if (editing) {
      const res = await supabase.from("facilities").update(payload).eq("id", editing.id);
      error = res.error;
    } else {
      const res = await supabase.from("facilities").insert({ ...payload, sort_order: items.length });
      error = res.error;
    }
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: editing ? "Updated!" : "Added!" });
    resetForm();
    fetchData();
  };

  const handleDelete = async (id: string) => {
    const { error } = await supabase.from("facilities").delete().eq("id", id);
    if (error) {
      toast({ title: "Error", description: error.message, variant: "destructive" });
      return;
    }
    toast({ title: "Deleted!" });
    fetchData();
  };

  const resetForm = () => {
    setTitle("");
    setCategory("Others");
    setIconUrl("");
    setEditing(null);
  };

  const startEdit = (item: any) => {
    setEditing(item);
    setTitle(item.title);
    setCategory(item.category || "Others");
    setIconUrl(item.icon_url || "");
  };

  const grouped = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = items.filter((i) => i.category === cat);
    return acc;
  }, {} as Record<string, any[]>);

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">
          {editing ? "Edit Facility" : "Add Facility"}
        </h3>
        <div className="space-y-3">
          <div className="flex gap-3">
            <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary/50" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-44 bg-secondary/50">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {CATEGORIES.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-3">
            <FileUpload onUpload={(url) => setIconUrl(url)} label="Upload Icon" folder="facility-icons" />
            {iconUrl && (
              <div className="flex items-center gap-2">
                <div className="h-10 w-10 rounded bg-white/90 flex items-center justify-center p-1">
                  <img src={iconUrl} alt="icon" className="h-8 w-8 object-contain" />
                </div>
                <Button variant="ghost" size="sm" onClick={() => setIconUrl("")} className="text-destructive h-8 w-8 p-0">
                  <X size={14} />
                </Button>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button onClick={handleSave} className="bg-primary text-primary-foreground">
              <Plus size={16} className="mr-1" /> {editing ? "Update" : "Save"}
            </Button>
            {editing && (
              <Button variant="outline" onClick={resetForm}>Cancel</Button>
            )}
          </div>
        </div>
      </div>

      {CATEGORIES.map((cat) => {
        const catItems = grouped[cat];
        if (!catItems || catItems.length === 0) return null;
        return (
          <div key={cat}>
            <h4 className="font-display text-md font-semibold text-primary mb-2">{cat} ({catItems.length})</h4>
            <div className="space-y-1">
              {catItems.map((item) => (
                <div key={item.id} className="glass-card flex items-center gap-4 rounded-sm p-3">
                  {item.icon_url ? (
                    <div className="h-7 w-7 rounded bg-white/90 flex items-center justify-center p-0.5 flex-shrink-0">
                      <img src={item.icon_url} alt="" className="h-5 w-5 object-contain" />
                    </div>
                  ) : (
                    <span className="text-xs text-muted-foreground w-7 text-center flex-shrink-0">—</span>
                  )}
                  <span className="flex-1 text-foreground text-sm">{item.title}</span>
                  <Button variant="ghost" size="sm" onClick={() => startEdit(item)} className="text-primary h-8 px-2">
                    <Pencil size={14} />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-destructive h-8 px-2">
                    <Trash2 size={14} />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminFacilities;

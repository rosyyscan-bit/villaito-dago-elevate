import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const AdminTestimonials = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [text, setText] = useState("");
  const [editing, setEditing] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("testimonials").select("*").order("sort_order");
    if (data) setItems(data);
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!name.trim() || !text.trim()) return;
    if (editing) {
      await supabase.from("testimonials").update({ name, title, text }).eq("id", editing.id);
    } else {
      await supabase.from("testimonials").insert({ name, title, text, sort_order: items.length });
    }
    toast({ title: "Saved!" });
    setName(""); setTitle(""); setText(""); setEditing(null);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">{editing ? "Edit" : "Add"} Testimonial</h3>
        <div className="space-y-3">
          <Input placeholder="Guest name" value={name} onChange={(e) => setName(e.target.value)} className="bg-secondary/50" />
          <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Testimonial text" value={text} onChange={(e) => setText(e.target.value)} className="bg-secondary/50" />
          <Button onClick={handleSave} className="bg-primary text-primary-foreground"><Plus size={16} className="mr-1" />{editing ? "Update" : "Add"}</Button>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card flex items-center gap-4 rounded-sm p-4">
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.name}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{item.title}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setName(item.name); setTitle(item.title); setText(item.text); }} className="text-primary">Edit</Button>
            <Button variant="ghost" size="sm" onClick={async () => { await supabase.from("testimonials").delete().eq("id", item.id); fetchData(); }} className="text-destructive"><Trash2 size={16} /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminTestimonials;

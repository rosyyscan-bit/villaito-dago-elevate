import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2 } from "lucide-react";

const AdminFAQ = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<any[]>([]);
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [editing, setEditing] = useState<any>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("faqs").select("*").order("sort_order");
    if (data) setItems(data);
  };
  useEffect(() => { fetchData(); }, []);

  const handleSave = async () => {
    if (!question.trim() || !answer.trim()) return;
    if (editing) {
      await supabase.from("faqs").update({ question, answer }).eq("id", editing.id);
    } else {
      await supabase.from("faqs").insert({ question, answer, sort_order: items.length });
    }
    toast({ title: "Saved!" });
    setQuestion(""); setAnswer(""); setEditing(null);
    fetchData();
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
        <h3 className="font-display text-lg font-semibold text-foreground mb-4">{editing ? "Edit FAQ" : "Add FAQ"}</h3>
        <div className="space-y-3">
          <Input placeholder="Question" value={question} onChange={(e) => setQuestion(e.target.value)} className="bg-secondary/50" />
          <Textarea placeholder="Answer" value={answer} onChange={(e) => setAnswer(e.target.value)} className="bg-secondary/50" />
          <Button onClick={handleSave} className="bg-primary text-primary-foreground"><Plus size={16} className="mr-1" />{editing ? "Update" : "Add"}</Button>
        </div>
      </div>
      <div className="space-y-2">
        {items.map((item) => (
          <div key={item.id} className="glass-card flex items-center gap-4 rounded-sm p-4">
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.question}</p>
              <p className="text-xs text-muted-foreground line-clamp-1">{item.answer}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={() => { setEditing(item); setQuestion(item.question); setAnswer(item.answer); }} className="text-primary">Edit</Button>
            <Button variant="ghost" size="sm" onClick={async () => { await supabase.from("faqs").delete().eq("id", item.id); fetchData(); }} className="text-destructive"><Trash2 size={16} /></Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminFAQ;

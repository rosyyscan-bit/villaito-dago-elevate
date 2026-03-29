import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, EyeOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  published: boolean | null;
  created_at: string;
}

const AdminBlog = () => {
  const { toast } = useToast();
  const [items, setItems] = useState<Blog[]>([]);
  const [editing, setEditing] = useState<Blog | null>(null);
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [content, setContent] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [coverImage, setCoverImage] = useState("");
  const [published, setPublished] = useState(false);
  const [preview, setPreview] = useState(false);

  const fetchData = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { fetchData(); }, []);

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const handleSave = async () => {
    if (!title.trim()) return;
    const s = slug || generateSlug(title);
    try {
      if (editing) {
        await supabase.from("blogs").update({ title, slug: s, content, excerpt, cover_image: coverImage || null, published }).eq("id", editing.id);
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        await supabase.from("blogs").insert({ title, slug: s, content, excerpt, cover_image: coverImage || null, published, author_id: user?.id });
      }
      toast({ title: "Saved!" });
      resetForm();
      fetchData();
    } catch (e: any) {
      toast({ title: "Error", description: e.message, variant: "destructive" });
    }
  };

  const handleDelete = async (id: string) => {
    await supabase.from("blogs").delete().eq("id", id);
    toast({ title: "Deleted" });
    fetchData();
  };

  const resetForm = () => {
    setEditing(null); setTitle(""); setSlug(""); setContent(""); setExcerpt(""); setCoverImage(""); setPublished(false); setPreview(false);
  };

  const startEdit = (item: Blog) => {
    setEditing(item); setTitle(item.title); setSlug(item.slug); setContent(item.content);
    setExcerpt(item.excerpt || ""); setCoverImage(item.cover_image || ""); setPublished(item.published || false);
  };

  return (
    <div className="space-y-6">
      <div className="flat-card rounded-sm p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-lg font-semibold text-foreground">
            {editing ? "Edit Post" : "New Post"}
          </h3>
          <Button variant="ghost" size="sm" onClick={() => setPreview(!preview)}>
            {preview ? <EyeOff size={16} /> : <Eye size={16} />}
            <span className="ml-1">{preview ? "Edit" : "Preview"}</span>
          </Button>
        </div>

        {preview ? (
          <div className="prose prose-invert max-w-none">
            <h1 className="font-display text-2xl text-foreground">{title}</h1>
            {coverImage && <img src={coverImage} alt={title} className="rounded-sm" />}
            <div className="text-foreground/80 whitespace-pre-wrap">{content}</div>
          </div>
        ) : (
          <div className="space-y-3">
            <Input placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value); if (!editing) setSlug(generateSlug(e.target.value)); }} className="bg-secondary/50" />
            <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="bg-secondary/50" />
            <Input placeholder="Cover image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="bg-secondary/50" />
            <Input placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="bg-secondary/50" />
            <Textarea
              placeholder="Content (supports basic formatting)"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="bg-secondary/50 min-h-[200px] font-mono text-sm"
            />
            <div className="flex items-center gap-3">
              <Switch checked={published} onCheckedChange={setPublished} />
              <span className="text-sm text-muted-foreground">Published</span>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-primary text-primary-foreground">
                <Plus size={16} className="mr-1" /> {editing ? "Update" : "Create"}
              </Button>
              {editing && <Button variant="outline" onClick={resetForm}>Cancel</Button>}
            </div>
          </div>
        )}
      </div>

      <div className="space-y-3">
        {items.map((item) => (
          <div key={item.id} className="flat-card flex items-center gap-4 rounded-sm p-4">
            <div className="flex-1">
              <p className="font-medium text-foreground">{item.title}</p>
              <p className="text-xs text-muted-foreground">{item.published ? "Published" : "Draft"} · {new Date(item.created_at).toLocaleDateString()}</p>
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

export default AdminBlog;

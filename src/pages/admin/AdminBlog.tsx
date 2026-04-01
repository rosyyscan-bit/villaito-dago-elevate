import { useEffect, useState, useRef, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Plus, Trash2, Eye, EyeOff, Bold, Italic, Heading1, Heading2, ImageIcon, Type } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import FileUpload from "@/components/FileUpload";

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

const FONT_SIZES = ["12px", "14px", "16px", "18px", "20px", "24px", "28px", "32px"];
const FONT_FAMILIES = ["DM Sans", "Playfair Display", "Georgia", "Arial", "Times New Roman", "Courier New"];

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
  const editorRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    const { data } = await supabase.from("blogs").select("*").order("created_at", { ascending: false });
    if (data) setItems(data);
  };

  useEffect(() => { fetchData(); }, []);

  const generateSlug = (text: string) => text.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

  const execCmd = useCallback((cmd: string, value?: string) => {
    document.execCommand(cmd, false, value);
    editorRef.current?.focus();
  }, []);

  const insertImage = useCallback((url: string) => {
    editorRef.current?.focus();
    document.execCommand("insertImage", false, url);
  }, []);

  const getEditorContent = () => editorRef.current?.innerHTML || "";

  const handleSave = async () => {
    if (!title.trim()) return;
    const s = slug || generateSlug(title);
    const htmlContent = getEditorContent();
    try {
      if (editing) {
        await supabase.from("blogs").update({ title, slug: s, content: htmlContent, excerpt, cover_image: coverImage || null, published }).eq("id", editing.id);
      } else {
        const { data: { user } } = await supabase.auth.getUser();
        await supabase.from("blogs").insert({ title, slug: s, content: htmlContent, excerpt, cover_image: coverImage || null, published, author_id: user?.id });
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
    if (editorRef.current) editorRef.current.innerHTML = "";
  };

  const startEdit = (item: Blog) => {
    setEditing(item); setTitle(item.title); setSlug(item.slug); setContent(item.content);
    setExcerpt(item.excerpt || ""); setCoverImage(item.cover_image || ""); setPublished(item.published || false);
    setTimeout(() => {
      if (editorRef.current) editorRef.current.innerHTML = item.content;
    }, 50);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-sm p-6">
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
            {coverImage && <img src={coverImage} alt={title} className="rounded-sm w-full max-h-64 object-cover" />}
            <div className="text-foreground/80" dangerouslySetInnerHTML={{ __html: getEditorContent() }} />
          </div>
        ) : (
          <div className="space-y-3">
            <Input placeholder="Title" value={title} onChange={(e) => { setTitle(e.target.value); if (!editing) setSlug(generateSlug(e.target.value)); }} className="bg-secondary/50" />
            <Input placeholder="Slug" value={slug} onChange={(e) => setSlug(e.target.value)} className="bg-secondary/50" />
            
            {/* Cover image with upload */}
            <div className="space-y-2">
              <Input placeholder="Cover image URL" value={coverImage} onChange={(e) => setCoverImage(e.target.value)} className="bg-secondary/50" />
              <FileUpload onUpload={(url) => setCoverImage(url)} folder="blog-covers" label="Upload Cover" />
              {coverImage && (
                <div className="relative inline-block">
                  <img src={coverImage} alt="Cover preview" className="h-24 w-40 object-cover rounded-sm" />
                  <button onClick={() => setCoverImage("")} className="absolute -right-1 -top-1 rounded-full bg-destructive p-1 text-destructive-foreground">
                    <Trash2 size={10} />
                  </button>
                </div>
              )}
            </div>

            <Input placeholder="Excerpt" value={excerpt} onChange={(e) => setExcerpt(e.target.value)} className="bg-secondary/50" />

            {/* Rich text toolbar */}
            <div className="flex flex-wrap items-center gap-1 border border-border rounded-sm p-2 bg-secondary/30">
              <button onClick={() => execCmd("bold")} className="p-1.5 rounded hover:bg-secondary text-foreground/70 hover:text-foreground" title="Bold">
                <Bold size={16} />
              </button>
              <button onClick={() => execCmd("italic")} className="p-1.5 rounded hover:bg-secondary text-foreground/70 hover:text-foreground" title="Italic">
                <Italic size={16} />
              </button>
              <div className="w-px h-5 bg-border mx-1" />
              <button onClick={() => execCmd("formatBlock", "h1")} className="p-1.5 rounded hover:bg-secondary text-foreground/70 hover:text-foreground" title="Heading 1">
                <Heading1 size={16} />
              </button>
              <button onClick={() => execCmd("formatBlock", "h2")} className="p-1.5 rounded hover:bg-secondary text-foreground/70 hover:text-foreground" title="Heading 2">
                <Heading2 size={16} />
              </button>
              <div className="w-px h-5 bg-border mx-1" />
              <select onChange={(e) => execCmd("fontSize", e.target.value)} defaultValue="" className="bg-secondary/50 border border-border rounded px-2 py-1 text-xs text-foreground">
                <option value="" disabled>Size</option>
                {[1,2,3,4,5,6,7].map((s) => (
                  <option key={s} value={String(s)}>{FONT_SIZES[s-1] || `Size ${s}`}</option>
                ))}
              </select>
              <select onChange={(e) => execCmd("fontName", e.target.value)} defaultValue="" className="bg-secondary/50 border border-border rounded px-2 py-1 text-xs text-foreground">
                <option value="" disabled>Font</option>
                {FONT_FAMILIES.map((f) => (
                  <option key={f} value={f}>{f}</option>
                ))}
              </select>
              <div className="w-px h-5 bg-border mx-1" />
              <FileUpload
                onUpload={insertImage}
                folder="blog-content"
                label="Image"
                accept="image/*"
              />
            </div>

            {/* Contenteditable editor */}
            <div
              ref={editorRef}
              contentEditable
              className="min-h-[200px] bg-secondary/50 border border-border rounded-sm p-4 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-primary/30 prose prose-invert max-w-none"
              onBlur={() => setContent(getEditorContent())}
              suppressContentEditableWarning
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
          <div key={item.id} className="glass-card flex items-center gap-4 rounded-sm p-4">
            {item.cover_image && <img src={item.cover_image} alt={item.title} className="h-12 w-16 rounded-sm object-cover" />}
            <div className="flex-1 min-w-0">
              <p className="font-medium text-foreground truncate">{item.title}</p>
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

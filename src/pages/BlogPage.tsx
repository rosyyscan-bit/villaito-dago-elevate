import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string | null;
  cover_image: string | null;
  created_at: string;
}

const BlogPage = () => {
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("published", true)
        .order("created_at", { ascending: false });
      if (data) setPosts(data);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="section-padding pt-32">
        <div className="mx-auto max-w-4xl">
          <span className="text-[11px] font-medium tracking-[0.3em] text-primary">STORIES</span>
          <h1 className="mt-3 font-display text-4xl font-semibold text-foreground md:text-5xl">Blog</h1>
          <div className="gold-line mt-5" />

          <div className="mt-12 space-y-6">
            {posts.length === 0 ? (
              <p className="text-sm text-muted-foreground">No posts yet.</p>
            ) : (
              posts.map((post) => (
                <Link key={post.id} to={`/blog/${post.slug}`} className="block flat-card overflow-hidden transition-colors hover:border-primary/25">
                  {post.cover_image && (
                    <img src={post.cover_image} alt={post.title} className="h-48 w-full object-cover" loading="lazy" />
                  )}
                  <div className="p-6">
                    <h2 className="font-display text-lg font-semibold text-foreground">{post.title}</h2>
                    <p className="mt-2 text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                    <p className="mt-3 text-[11px] text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</p>
                  </div>
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Blog | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blogs")
        .select("*")
        .eq("slug", slug)
        .eq("published", true)
        .single();
      if (data) setPost(data);
    };
    fetchPost();
  }, [slug]);

  if (!post) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="section-padding pt-32 text-center">
          <p className="text-sm text-muted-foreground">Post not found.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <div className="section-padding pt-32">
        <div className="mx-auto max-w-3xl">
          <Link to="/blog" className="text-xs text-primary hover:text-foreground transition-colors">← Back to Blog</Link>
          <h1 className="mt-6 font-display text-3xl font-semibold text-foreground md:text-4xl">{post.title}</h1>
          <p className="mt-2 text-[11px] text-muted-foreground">{new Date(post.created_at).toLocaleDateString()}</p>
          {post.cover_image && (
            <img src={post.cover_image} alt={post.title} className="mt-6 w-full object-cover" />
          )}
          <div className="mt-8 whitespace-pre-wrap text-sm leading-relaxed text-foreground/80" dangerouslySetInnerHTML={{ __html: post.content }} />
        </div>
      </div>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export { BlogPage, BlogPost };

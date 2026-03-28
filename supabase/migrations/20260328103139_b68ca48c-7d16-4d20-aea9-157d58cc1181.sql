
-- Roles enum
CREATE TYPE public.app_role AS ENUM ('admin');

-- User roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer function for role checking
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS: only admins can read roles
CREATE POLICY "Admins can read roles" ON public.user_roles
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

-- Update timestamp function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$ BEGIN NEW.updated_at = now(); RETURN NEW; END; $$ LANGUAGE plpgsql SET search_path = public;

-- Site settings
CREATE TABLE public.site_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT NOT NULL UNIQUE,
  value JSONB NOT NULL DEFAULT '{}',
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.site_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read settings" ON public.site_settings FOR SELECT USING (true);
CREATE POLICY "Admins can update settings" ON public.site_settings FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert settings" ON public.site_settings FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete settings" ON public.site_settings FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Bedrooms
CREATE TABLE public.bedrooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.bedrooms ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read bedrooms" ON public.bedrooms FOR SELECT USING (true);
CREATE POLICY "Admins can manage bedrooms" ON public.bedrooms FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_bedrooms_updated_at BEFORE UPDATE ON public.bedrooms FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Facilities
CREATE TABLE public.facilities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  icon TEXT NOT NULL DEFAULT 'Sparkles',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.facilities ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read facilities" ON public.facilities FOR SELECT USING (true);
CREATE POLICY "Admins can manage facilities" ON public.facilities FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Rates
CREATE TABLE public.rates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  subtitle TEXT,
  price TEXT NOT NULL,
  per TEXT DEFAULT '/ night',
  features TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.rates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read rates" ON public.rates FOR SELECT USING (true);
CREATE POLICY "Admins can manage rates" ON public.rates FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- FAQ
CREATE TABLE public.faqs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.faqs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read faqs" ON public.faqs FOR SELECT USING (true);
CREATE POLICY "Admins can manage faqs" ON public.faqs FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Testimonials
CREATE TABLE public.testimonials (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  title TEXT NOT NULL,
  text TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read testimonials" ON public.testimonials FOR SELECT USING (true);
CREATE POLICY "Admins can manage testimonials" ON public.testimonials FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Gallery
CREATE TABLE public.gallery (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  image_url TEXT NOT NULL,
  caption TEXT,
  media_type TEXT DEFAULT 'image',
  sort_order INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read gallery" ON public.gallery FOR SELECT USING (true);
CREATE POLICY "Admins can manage gallery" ON public.gallery FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Blog
CREATE TABLE public.blogs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL DEFAULT '',
  excerpt TEXT,
  cover_image TEXT,
  published BOOLEAN DEFAULT false,
  author_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.blogs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read published blogs" ON public.blogs FOR SELECT USING (published = true);
CREATE POLICY "Admins can read all blogs" ON public.blogs FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert blogs" ON public.blogs FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update blogs" ON public.blogs FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete blogs" ON public.blogs FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE TRIGGER update_blogs_updated_at BEFORE UPDATE ON public.blogs FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Navigation menu
CREATE TABLE public.nav_menus (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  label TEXT NOT NULL,
  href TEXT NOT NULL,
  sort_order INT NOT NULL DEFAULT 0,
  visible BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.nav_menus ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read visible menus" ON public.nav_menus FOR SELECT USING (visible = true);
CREATE POLICY "Admins can read all menus" ON public.nav_menus FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert menus" ON public.nav_menus FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update menus" ON public.nav_menus FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete menus" ON public.nav_menus FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Storage bucket for media
INSERT INTO storage.buckets (id, name, public) VALUES ('media', 'media', true);
CREATE POLICY "Public can view media" ON storage.objects FOR SELECT USING (bucket_id = 'media');
CREATE POLICY "Admins can upload media" ON storage.objects FOR INSERT TO authenticated WITH CHECK (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update media" ON storage.objects FOR UPDATE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete media" ON storage.objects FOR DELETE TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));


-- Tighten storage: remove broad SELECT that allows listing (public bucket URLs still work via storage HTTP)
DROP POLICY IF EXISTS "Public can view media" ON storage.objects;
CREATE POLICY "Admins can list media" ON storage.objects FOR SELECT TO authenticated USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- Revoke EXECUTE on SECURITY DEFINER functions from broad roles
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon;
-- Keep EXECUTE for authenticated since RLS policies call has_role()

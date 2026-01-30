-- 1. Tablo Kolonlarını Garantiye Al
ALTER TABLE stories ADD COLUMN IF NOT EXISTS title TEXT;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS caption TEXT;
ALTER TABLE stories ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'image';
ALTER TABLE stories ADD COLUMN IF NOT EXISTS expires_at TIMESTAMP WITH TIME ZONE;

-- 2. Storage İzinleri (Public bucket varsayıyoruz)
-- Depolama için RLS'i aç (eğer kapalıysa) veya tekrar yapılandır
INSERT INTO storage.buckets (id, name, public) 
VALUES ('stories', 'stories', true)
ON CONFLICT (id) DO UPDATE SET public = true;

CREATE POLICY "Public Access" 
ON storage.objects FOR SELECT 
USING ( bucket_id = 'stories' );

CREATE POLICY "Auth Upload" 
ON storage.objects FOR INSERT 
WITH CHECK ( bucket_id = 'stories' AND auth.role() = 'authenticated' );

CREATE POLICY "Owner Delete" 
ON storage.objects FOR DELETE 
USING ( bucket_id = 'stories' AND auth.uid() = owner );

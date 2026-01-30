-- Tüm eski kısıtlamaları (Policy) temizle
DROP POLICY IF EXISTS "Stories are viewable by everyone" ON stories;
DROP POLICY IF EXISTS "Users can insert their own stories" ON stories;
DROP POLICY IF EXISTS "Users can update their own stories" ON stories;
DROP POLICY IF EXISTS "Users can delete their own stories" ON stories;
DROP POLICY IF EXISTS "Enable read access for all users" ON stories;
DROP POLICY IF EXISTS "Enable insert for authenticated users only" ON stories;

-- RLS'i geçici olarak kapatıp tekrar aç (Reset)
ALTER TABLE stories DISABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- 1. OKUMA: Herkes her şeyi görebilsin (Anonim dahil)
CREATE POLICY "Public Read"
ON stories FOR SELECT
USING (true);

-- 2. EKLEME: Sadece giriş yapmış kullanıcılar ekleme yapabilsin
CREATE POLICY "Auth Insert"
ON stories FOR INSERT
WITH CHECK (auth.role() = 'authenticated');

-- 3. GÜNCELLEME/SİLME: Sadece hikayenin sahibi yapabilsin
CREATE POLICY "Owner Delete"
ON stories FOR DELETE
USING (auth.uid() = user_id);

CREATE POLICY "Owner Update"
ON stories FOR UPDATE
USING (auth.uid() = user_id);

-- Gerekli ise public bucket erişimi (Storage) için de izin
-- (Eğer storage policies eksikse resimler yüklenemez ama veri tabanında row oluşur)

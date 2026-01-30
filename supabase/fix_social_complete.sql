-- 0. EKSİK TABLOLARI OLUŞTUR (Garantiye Al)

-- Follows tablosu
CREATE TABLE IF NOT EXISTS follows (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    follower_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    following_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(follower_id, following_id)
);

-- Likes tablosu
CREATE TABLE IF NOT EXISTS likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    item_id UUID NOT NULL, -- Pet, Ad veya Story ID olabilir, dinamik olduğu için FK zorunlu değil ama iyi olurdu.
    item_type TEXT NOT NULL CHECK (item_type IN ('pet', 'ad', 'story')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, item_id, item_type)
);

-- Comments tablosu
CREATE TABLE IF NOT EXISTS comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    item_id UUID NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('pet', 'ad', 'story')),
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Bookmarks tablosu
CREATE TABLE IF NOT EXISTS bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    item_id UUID NOT NULL,
    item_type TEXT NOT NULL CHECK (item_type IN ('pet', 'ad', 'story')),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    UNIQUE(user_id, item_id, item_type)
);


-- 1. Foreign Key İlişkilerini Onar (Stories -> Profiles)
-- Önce mevcut kısıtlamayı (varsa) kaldır
ALTER TABLE stories DROP CONSTRAINT IF EXISTS stories_user_id_fkey;
-- Yeni ve doğru kısıtlamayı ekle
ALTER TABLE stories
ADD CONSTRAINT stories_user_id_fkey
FOREIGN KEY (user_id) REFERENCES profiles(id)
ON DELETE CASCADE;

-- 2. Likes, Comments, Bookmarks tablolarındaki 'check' kısıtlamalarını güncelle
-- (Tablo yeni oluşturulduysa zaten var ama güncellenmesi gerekirse diye)
ALTER TABLE likes DROP CONSTRAINT IF EXISTS likes_item_type_check;
ALTER TABLE likes ADD CONSTRAINT likes_item_type_check CHECK (item_type IN ('pet', 'ad', 'story'));

ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_item_type_check;
ALTER TABLE comments ADD CONSTRAINT comments_item_type_check CHECK (item_type IN ('pet', 'ad', 'story'));

ALTER TABLE bookmarks DROP CONSTRAINT IF EXISTS bookmarks_item_type_check;
ALTER TABLE bookmarks ADD CONSTRAINT bookmarks_item_type_check CHECK (item_type IN ('pet', 'ad', 'story'));

-- 3. RLS Politikalarını Sıfırla ve Düzelt

-- Likes
ALTER TABLE likes ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Likes Public Read" ON likes;
DROP POLICY IF EXISTS "Likes Auth Insert" ON likes;
DROP POLICY IF EXISTS "Likes Owner Delete" ON likes;

CREATE POLICY "Likes Public Read" ON likes FOR SELECT USING (true);
CREATE POLICY "Likes Auth Insert" ON likes FOR INSERT WITH CHECK (auth.role() = 'authenticated');
CREATE POLICY "Likes Owner Delete" ON likes FOR DELETE USING (auth.uid() = user_id);

-- Comments
ALTER TABLE comments ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Comments Public Read" ON comments;
DROP POLICY IF EXISTS "Comments Auth Insert" ON comments;

CREATE POLICY "Comments Public Read" ON comments FOR SELECT USING (true);
CREATE POLICY "Comments Auth Insert" ON comments FOR INSERT WITH CHECK (auth.role() = 'authenticated');

-- Bookmarks
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Bookmarks Policy" ON bookmarks;
DROP POLICY IF EXISTS "Bookmarks Owner Select" ON bookmarks;
DROP POLICY IF EXISTS "Bookmarks Owner Insert" ON bookmarks;
DROP POLICY IF EXISTS "Bookmarks Owner Delete" ON bookmarks;

CREATE POLICY "Bookmarks Owner Select" ON bookmarks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Bookmarks Owner Insert" ON bookmarks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Bookmarks Owner Delete" ON bookmarks FOR DELETE USING (auth.uid() = user_id);

-- Follows
ALTER TABLE follows ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Follows Public Read" ON follows;
DROP POLICY IF EXISTS "Follows Auth Insert" ON follows;
DROP POLICY IF EXISTS "Follows Owner Delete" ON follows;

CREATE POLICY "Follows Public Read" ON follows FOR SELECT USING (true);
CREATE POLICY "Follows Auth Insert" ON follows FOR INSERT WITH CHECK (auth.uid() = follower_id);
CREATE POLICY "Follows Owner Delete" ON follows FOR DELETE USING (auth.uid() = follower_id);

-- 4. Storage (Resim Yükleme) İzinlerini Garantiye Al
INSERT INTO storage.buckets (id, name, public) VALUES ('stories', 'stories', true) ON CONFLICT (id) DO NOTHING;
DROP POLICY IF EXISTS "Stories Images Public" ON storage.objects;
DROP POLICY IF EXISTS "Stories Images Upload" ON storage.objects;

CREATE POLICY "Stories Images Public" ON storage.objects FOR SELECT USING (bucket_id = 'stories');
CREATE POLICY "Stories Images Upload" ON storage.objects FOR INSERT WITH CHECK (bucket_id = 'stories' AND auth.role() = 'authenticated');

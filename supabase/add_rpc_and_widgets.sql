-- 1. Yarışmalara Widget Yerleşimi İçin Kolon Ekle
ALTER TABLE contests ADD COLUMN IF NOT EXISTS widget_placement TEXT DEFAULT NULL;

-- 2. Hikayeleri ve Kullanıcı Etkileşimlerini Getiren Güvenli Fonksiyon (RPC)
-- Bu fonksiyon ile join sorunlarını bypass ediyoruz.
CREATE OR REPLACE FUNCTION get_stories_with_interactions(p_user_id UUID, p_limit INT DEFAULT 20)
RETURNS TABLE (
    id UUID,
    created_at TIMESTAMPTZ,
    user_id UUID,
    image_url TEXT,
    title TEXT,
    caption TEXT,
    type TEXT,
    sub_type TEXT,
    expires_at TIMESTAMPTZ,
    full_name TEXT,
    avatar_url TEXT,
    likes_count BIGINT,
    comments_count BIGINT,
    is_liked BOOLEAN,
    is_bookmarked BOOLEAN
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        s.id,
        s.created_at,
        s.user_id,
        s.image_url,
        s.title,
        s.caption,
        s.type,
        'story'::TEXT as sub_type, -- Default subtype
        s.expires_at,
        p.full_name,
        p.avatar_url,
        (SELECT COUNT(*) FROM likes l WHERE l.item_id = s.id AND l.item_type = 'story') AS likes_count,
        (SELECT COUNT(*) FROM comments c WHERE c.item_id = s.id AND c.item_type = 'story') AS comments_count,
        EXISTS(SELECT 1 FROM likes l WHERE l.item_id = s.id AND l.user_id = p_user_id) AS is_liked,
        EXISTS(SELECT 1 FROM bookmarks b WHERE b.item_id = s.id AND b.user_id = p_user_id) AS is_bookmarked
    FROM stories s
    LEFT JOIN profiles p ON s.user_id = p.id
    ORDER BY s.created_at DESC
    LIMIT p_limit;
END;
$$ LANGUAGE plpgsql;

-- 3. İlişkileri Garantiye Al (Tekrar kontrol)
-- Likes, Comments tablolarının story tipini kabul ettiğinden emin ol
ALTER TABLE likes DROP CONSTRAINT IF EXISTS likes_item_type_check;
ALTER TABLE likes ADD CONSTRAINT likes_item_type_check CHECK (item_type IN ('pet', 'ad', 'story'));

ALTER TABLE comments DROP CONSTRAINT IF EXISTS comments_item_type_check;
ALTER TABLE comments ADD CONSTRAINT comments_item_type_check CHECK (item_type IN ('pet', 'ad', 'story'));

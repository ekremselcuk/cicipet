-- Add requirements column to contests if not exists
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contests' AND column_name = 'requirements') THEN
        ALTER TABLE contests ADD COLUMN requirements JSONB DEFAULT '{}'::JSONB;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contests' AND column_name = 'image_url') THEN
        ALTER TABLE contests ADD COLUMN image_url TEXT;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contests' AND column_name = 'widget_placement') THEN
        ALTER TABLE contests ADD COLUMN widget_placement TEXT DEFAULT 'none';
    END IF;
END $$;

-- Update RPC to be sure about limit
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
        'story'::TEXT as sub_type, 
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

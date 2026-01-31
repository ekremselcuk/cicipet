INSERT INTO storage.buckets (id, name, public)
VALUES ('stories', 'stories', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Stories are publicly accessible" ON storage.objects;
CREATE POLICY "Stories are publicly accessible"
ON storage.objects FOR SELECT
USING ( bucket_id = 'stories' );

DROP POLICY IF EXISTS "Authenticated users can upload stories" ON storage.objects;
CREATE POLICY "Authenticated users can upload stories"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'stories' );

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Stories are viewable by everyone" ON stories;
CREATE POLICY "Stories are viewable by everyone"
ON stories FOR SELECT
USING ( true );

DROP POLICY IF EXISTS "Users can insert their own stories" ON stories;
CREATE POLICY "Users can insert their own stories"
ON stories FOR INSERT
TO authenticated
WITH CHECK ( auth.uid() = user_id );

DROP POLICY IF EXISTS "Users can delete their own stories" ON stories;
CREATE POLICY "Users can delete their own stories"
ON stories FOR DELETE
TO authenticated
USING ( auth.uid() = user_id );

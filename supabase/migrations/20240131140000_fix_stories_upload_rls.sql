-- Create 'stories' bucket if it doesn't exist
INSERT INTO storage.buckets (id, name, public)
VALUES ('stories', 'stories', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow authenticated users to upload to 'stories'
CREATE POLICY "Stories are publicly accessible"
ON storage.objects FOR SELECT
USING ( bucket_id = 'stories' );

CREATE POLICY "Users can upload their own stories"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'stories' AND auth.uid() = (storage.foldername(name))[1]::uuid );
-- Note: The above path check assumes folder structure user_id/... 
-- My code uses fileName = `${user.id}-${Date.now()}.${fileExt}`;
-- So simpler policy:

DROP POLICY IF EXISTS "Authenticated users can upload stories" ON storage.objects;
CREATE POLICY "Authenticated users can upload stories"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK ( bucket_id = 'stories' );

-- Fix Stories Table RLS
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Stories are viewable by everyone"
ON stories FOR SELECT
USING ( true );

CREATE POLICY "Users can insert their own stories"
ON stories FOR INSERT
TO authenticated
WITH CHECK ( auth.uid() = user_id );

CREATE POLICY "Users can delete their own stories"
ON stories FOR DELETE
TO authenticated
USING ( auth.uid() = user_id );

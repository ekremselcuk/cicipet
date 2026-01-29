-- 1. Ensure 'ads' table exists and has RLS enabled
CREATE TABLE IF NOT EXISTS ads (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  type TEXT NOT NULL, -- 'kayip', 'es-bulma', 'sahiplendirme'
  category TEXT, -- 'kedi', 'kopek', 'kus', 'diger'
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  photo_url TEXT,
  city TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now())
);

ALTER TABLE ads ENABLE ROW LEVEL SECURITY;

-- 2. Ensure RLS Policies for 'ads'
-- Allow everyone to read all ads (or at least approved ones, but for admin query we need all)
DROP POLICY IF EXISTS "Ads are viewable by everyone" ON ads;
CREATE POLICY "Ads are viewable by everyone" ON ads FOR SELECT USING (true);

DROP POLICY IF EXISTS "Users can insert their own ads" ON ads;
CREATE POLICY "Users can insert their own ads" ON ads FOR INSERT WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own ads" ON ads;
CREATE POLICY "Users can update their own ads" ON ads FOR UPDATE USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own ads" ON ads;
CREATE POLICY "Users can delete their own ads" ON ads FOR DELETE USING (auth.uid() = user_id);

-- 3. Ensure 'profiles' are viewable (already in schema.sql but good to double check)
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
CREATE POLICY "Public profiles are viewable by everyone" ON profiles FOR SELECT USING (true);

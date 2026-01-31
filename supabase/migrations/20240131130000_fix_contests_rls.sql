ALTER TABLE contests ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public contests are viewable by everyone" ON contests;
CREATE POLICY "Public contests are viewable by everyone" 
ON contests FOR SELECT 
USING ( true );

DROP POLICY IF EXISTS "Authenticated users can manage contests" ON contests;
CREATE POLICY "Authenticated users can manage contests" 
ON contests FOR ALL 
TO authenticated 
USING ( true ) 
WITH CHECK ( true );

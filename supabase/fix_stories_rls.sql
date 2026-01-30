-- Enable RLS on stories table
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Allow read access to all users for active stories
CREATE POLICY "Stories are viewable by everyone" 
ON stories FOR SELECT 
USING ( true );

-- Allow insert access to authenticated users
CREATE POLICY "Users can insert their own stories" 
ON stories FOR INSERT 
WITH CHECK ( auth.uid() = user_id );

-- Allow update/delete access to owners
CREATE POLICY "Users can update their own stories" 
ON stories FOR UPDATE 
USING ( auth.uid() = user_id );

CREATE POLICY "Users can delete their own stories" 
ON stories FOR DELETE 
USING ( auth.uid() = user_id );

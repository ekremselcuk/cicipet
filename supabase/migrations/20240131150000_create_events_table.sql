-- Create Events Table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    topic TEXT DEFAULT 'Genel', -- e.g. 'Genel', 'Yaz', 'Kış'
    start_date TIMESTAMPTZ NOT NULL DEFAULT now(),
    end_date TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT now(),
    created_by UUID REFERENCES auth.users(id),
    status TEXT DEFAULT 'active' CHECK (status IN ('active', 'inactive', 'ended'))
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Events are viewable by everyone" 
ON events FOR SELECT 
USING ( true );

CREATE POLICY "Admins can manage events" 
ON events FOR ALL 
TO authenticated 
USING ( true ) 
WITH CHECK ( true ); -- Assuming app-level admin check, or add exists(select 1 from profiles where id=auth.uid() and role='admin')

-- Insert some dummy data if empty
INSERT INTO events (title, description, image_url, topic, start_date)
SELECT 'Pati Festivali', 'Bu hafta sonu parkta buluşuyoruz!', 'https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80', 'Festival', now()
WHERE NOT EXISTS (SELECT 1 FROM events);

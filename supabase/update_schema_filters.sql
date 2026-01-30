-- Add gender to pets if it doesn't exist
ALTER TABLE pets ADD COLUMN IF NOT EXISTS gender TEXT; -- 'Male', 'Female'

-- Add columns to ads for advanced filtering
ALTER TABLE ads ADD COLUMN IF NOT EXISTS breed TEXT;
ALTER TABLE ads ADD COLUMN IF NOT EXISTS age INTEGER;
ALTER TABLE ads ADD COLUMN IF NOT EXISTS gender TEXT;
-- Note: 'category' (kedi, kopek) and 'city' already exist in ads table or logic.

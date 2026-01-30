-- Add requirements column to contests to store JSON criteria (e.g. { "type": "fish", "gender": "male" })
ALTER TABLE contests ADD COLUMN IF NOT EXISTS requirements JSONB DEFAULT '{}'::jsonb;

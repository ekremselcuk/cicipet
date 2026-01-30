-- Add caption column to stories table
ALTER TABLE stories 
ADD COLUMN IF NOT EXISTS caption text;

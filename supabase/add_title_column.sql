-- Add title column to stories table for separate headline support
ALTER TABLE stories 
ADD COLUMN IF NOT EXISTS title text;

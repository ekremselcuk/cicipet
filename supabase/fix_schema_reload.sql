-- Force Refresh Schema Cache
NOTIFY pgrst, 'reload config';

-- Ensure columns exist (Idempotent)
DO $$ 
BEGIN 
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contests' AND column_name = 'requirements') THEN
        ALTER TABLE contests ADD COLUMN requirements JSONB DEFAULT '{}'::JSONB;
    END IF;

    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'contests' AND column_name = 'widget_placement') THEN
        ALTER TABLE contests ADD COLUMN widget_placement TEXT DEFAULT 'none';
        -- Add index for widget placement if often queried
        CREATE INDEX IF NOT EXISTS idx_contests_widget_placement ON contests(widget_placement);
    END IF;
END $$;

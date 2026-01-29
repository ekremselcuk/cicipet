-- Add foreign key constraint to ads table if it doesn't exist
DO $$
BEGIN
    IF NOT EXISTS (
        SELECT 1 
        FROM information_schema.table_constraints 
        WHERE constraint_name = 'ads_user_id_fkey'
    ) THEN
        ALTER TABLE "public"."ads" 
        ADD CONSTRAINT "ads_user_id_fkey" 
        FOREIGN KEY ("user_id") 
        REFERENCES "public"."profiles" ("id") 
        ON DELETE CASCADE;
    END IF;
END $$;

-- Refresh the schema cache explanation (comment only)
-- After running this, you may need to reload the Supabase schema cache (in dashboard: Project Settings -> API -> Reload Schema Cache)

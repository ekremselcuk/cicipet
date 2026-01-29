-- Forcefully recreate the foreign key to ensure it exists and is visible to PostgREST

-- 1. Check if columns exist first (to avoid confusing errors if table is missing)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns WHERE table_name = 'ads' AND column_name = 'user_id') THEN
        RAISE EXCEPTION 'Table ads or column user_id does not exist!';
    END IF;
END $$;

-- 2. Drop the constraint if it exists (using the standard name)
ALTER TABLE "public"."ads" DROP CONSTRAINT IF EXISTS "ads_user_id_fkey";

-- 3. Add the constraint explicitly
ALTER TABLE "public"."ads" 
ADD CONSTRAINT "ads_user_id_fkey" 
FOREIGN KEY ("user_id") 
REFERENCES "public"."profiles" ("id") 
ON DELETE CASCADE;

-- 4. Force Schema Cache Reload
NOTIFY pgrst, 'reload schema';

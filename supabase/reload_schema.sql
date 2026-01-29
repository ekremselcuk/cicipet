-- Force PostgREST schema cache reload
NOTIFY pgrst, 'reload schema';

-- Explanation:
-- Running this command in the SQL Editor instructs Supabase (PostgREST) to refresh its knowledge of the database structure.
-- This is equivalent to clicking "Reload Schema Cache" in the settings.

-- RLS Policies for Admin (ekremselcuk@gmail.com)
-- Run these in Supabase SQL Editor to fix permission issues

-- 1. Enable RLS on tables (if not already enabled)
alter table pets enable row level security;
alter table ads enable row level security;

-- 2. Policy for UPDATING pets
create policy "Admin can update any pet"
on pets for update
to authenticated
using ( auth.jwt() ->> 'email' = 'ekremselcuk@gmail.com' );

-- 3. Policy for DELETING pets
create policy "Admin can delete any pet"
on pets for delete
to authenticated
using ( auth.jwt() ->> 'email' = 'ekremselcuk@gmail.com' );

-- 4. Policy for UPDATING ads
create policy "Admin can update any ad"
on ads for update
to authenticated
using ( auth.jwt() ->> 'email' = 'ekremselcuk@gmail.com' );

-- 5. Policy for DELETING ads
create policy "Admin can delete any ad"
on ads for delete
to authenticated
using ( auth.jwt() ->> 'email' = 'ekremselcuk@gmail.com' );

-- Follows (One-way)
create table if not exists follows (
  id uuid default uuid_generate_v4() primary key,
  follower_id uuid references auth.users not null,
  following_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(follower_id, following_id)
);

-- Friendships (Two-way, requires acceptance)
create table if not exists friendships (
  id uuid default uuid_generate_v4() primary key,
  user_id_1 uuid references auth.users not null,
  user_id_2 uuid references auth.users not null,
  status text default 'pending', -- pending, accepted, rejected
  created_at timestamp with time zone default timezone('utc'::text, now()),
  updated_at timestamp with time zone default timezone('utc'::text, now()),
  check (user_id_1 < user_id_2), -- Ensure consistent ordering to prevent duplicates
  unique(user_id_1, user_id_2)
);

-- RLS
alter table follows enable row level security;
create policy "Anyone can read follows" on follows for select using (true);
create policy "Users can follow" on follows for insert with check (auth.uid() = follower_id);
create policy "Users can unfollow" on follows for delete using (auth.uid() = follower_id);

alter table friendships enable row level security;
create policy "Users can see their friendships" on friendships for select using (auth.uid() = user_id_1 or auth.uid() = user_id_2);
create policy "Users can request friendship" on friendships for insert with check (auth.uid() = user_id_1); -- Requester is always id_1? No, check constraint handles order.
-- Actually for simplicity in RLS with the < constraint, inserting is tricky directly from client without a stored procedure. 
-- Let's relax the check constraint for the simpler implementation or use a function.
-- For now, simplest RLS allowing users to manage rows where they are a party.
create policy "Users can manage friendships" on friendships for all using (auth.uid() = user_id_1 or auth.uid() = user_id_2);

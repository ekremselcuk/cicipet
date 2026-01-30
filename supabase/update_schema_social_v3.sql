-- 1. LIKES Table (If not exists)
-- Supports Pets, Ads, Stories
create table if not exists likes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  item_id uuid not null,
  item_type text not null, -- 'pet', 'ad', 'story'
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, item_id, item_type)
);

-- 2. BOOKMARKS Table (Favorites)
create table if not exists bookmarks (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  item_id uuid not null,
  item_type text not null, -- 'pet', 'ad'
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, item_id, item_type)
);

-- 3. COMMENTS Table
create table if not exists comments (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  item_id uuid not null, -- Connects to pets or ads
  item_type text not null, -- 'pet', 'ad'
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- 4. STORIES Table
create table if not exists stories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  image_url text not null,
  type text default 'image', -- 'image', 'video'
  expires_at timestamp with time zone not null,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS POLICIES

-- Likes
alter table likes enable row level security;
create policy "Anyone can read likes" on likes for select using (true);
create policy "Users can manage their likes" on likes for all using (auth.uid() = user_id);

-- Bookmarks
alter table bookmarks enable row level security;
create policy "Users can read their bookmarks" on bookmarks for select using (auth.uid() = user_id);
create policy "Users can manage their bookmarks" on bookmarks for all using (auth.uid() = user_id);

-- Comments
alter table comments enable row level security;
create policy "Anyone can read comments" on comments for select using (true);
create policy "Users can create comments" on comments for insert with check (auth.uid() = user_id);
create policy "Users can delete their comments" on comments for delete using (auth.uid() = user_id);

-- Stories
alter table stories enable row level security;
create policy "Anyone can read active stories" on stories for select using (expires_at > now());
create policy "Users can create stories" on stories for insert with check (auth.uid() = user_id);
create policy "Users can delete their stories" on stories for delete using (auth.uid() = user_id);

-- Enable Realtime for Comments (Optional command, might fail if not superuser, mostly setup in dashboard)
-- alter publication supabase_realtime add table comments;

-- 5. FOLLOWS Table
create table if not exists follows (
  follower_id uuid references auth.users not null,
  following_id uuid references auth.users not null,
  created_at timestamp with time zone default timezone('utc'::text, now()),
  primary key (follower_id, following_id)
);

-- RLS for Follows
alter table follows enable row level security;
create policy "Anyone can read follows" on follows for select using (true);
create policy "Users can follow others" on follows for insert with check (auth.uid() = follower_id);
create policy "Users can unfollow" on follows for delete using (auth.uid() = follower_id);

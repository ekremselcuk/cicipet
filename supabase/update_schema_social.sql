-- Stories Table
create table if not exists stories (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  image_url text not null,
  caption text,
  likes_count integer default 0,
  shares_count integer default 0,
  expires_at timestamp with time zone default (now() + interval '24 hours'),
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Favorites Table (Polymorphic-ish)
create table if not exists favorites (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  item_id uuid not null, -- references pet.id or ad.id
  item_type text not null, -- 'pet' or 'ad'
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, item_id, item_type)
);

-- Likes Table (for Pets, Ads, Stories)
create table if not exists likes (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  item_id uuid not null,
  item_type text not null, -- 'pet', 'ad', 'story'
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(user_id, item_id, item_type)
);

-- Shares Table (tracking shares)
create table if not exists shares (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users not null,
  item_id uuid not null,
  item_type text not null,
  platform text, -- 'whatsapp', 'facebook', etc.
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- Add counters to Pets and Ads if missing (or we can simulate with counts)
alter table pets add column if not exists likes_count integer default 0;
alter table pets add column if not exists shares_count integer default 0;

alter table ads add column if not exists likes_count integer default 0;
alter table ads add column if not exists shares_count integer default 0;

-- RLS
alter table stories enable row level security;
create policy "Anyone can view active stories" on stories for select using (expires_at > now());
create policy "Users can insert own stories" on stories for insert with check (auth.uid() = user_id);

alter table favorites enable row level security;
create policy "Users can view own favorites" on favorites for select using (auth.uid() = user_id);
create policy "Users can manage own favorites" on favorites for all using (auth.uid() = user_id);

alter table likes enable row level security;
create policy "Anyone can view likes" on likes for select using (true);
create policy "Users can manage own likes" on likes for all using (auth.uid() = user_id);

alter table shares enable row level security;
create policy "Users can insert shares" on shares for insert with check (auth.uid() = user_id);

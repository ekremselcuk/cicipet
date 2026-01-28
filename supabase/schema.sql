-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- 1. PROFILES
create table if not exists profiles (
  id uuid references auth.users on delete cascade primary key,
  email text,
  full_name text,
  avatar_url text,
  role text default 'user', -- 'admin', 'user'
  city text,
  phone text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Profiles
alter table profiles enable row level security;
create policy "Public profiles are viewable by everyone" on profiles for select using (true);
create policy "Users can insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on profiles for update using (auth.uid() = id);

-- 2. PETS
create table if not exists pets (
  id uuid default uuid_generate_v4() primary key,
  owner_id uuid references profiles(id) on delete cascade not null,
  name text not null,
  type text not null, -- 'cat', 'dog', etc.
  breed text,
  age integer,
  image_url text,
  status text default 'active', -- 'active', 'lost', 'adopted'
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Pets
alter table pets enable row level security;
create policy "Pets are viewable by everyone" on pets for select using (true);
create policy "Users can insert their own pets" on pets for insert with check (auth.uid() = owner_id);
create policy "Users can update their own pets" on pets for update using (auth.uid() = owner_id);
create policy "Users can delete their own pets" on pets for delete using (auth.uid() = owner_id);

-- 3. CONTESTS
create table if not exists contests (
  id uuid default uuid_generate_v4() primary key,
  title text not null,
  description text,
  image_url text,
  category text, -- 'photo', 'video', etc.
  status text default 'draft', -- 'draft', 'active', 'completed'
  start_date timestamp with time zone,
  end_date timestamp with time zone,
  prize_details text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Contests
alter table contests enable row level security;
create policy "Contests are viewable by everyone" on contests for select using (true);
create policy "Admins can insert contests" on contests for insert with check (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);
create policy "Admins can update contests" on contests for update using (
  exists (select 1 from profiles where id = auth.uid() and role = 'admin')
);

-- 4. CONTEST PARTICIPANTS
create table if not exists contest_participants (
  id uuid default uuid_generate_v4() primary key,
  contest_id uuid references contests(id) on delete cascade not null,
  pet_id uuid references pets(id) on delete cascade not null,
  entry_url text not null,
  vote_count integer default 0,
  status text default 'pending', -- 'pending', 'approved', 'rejected'
  created_at timestamp with time zone default timezone('utc'::text, now()),
  unique(contest_id, pet_id)
);

-- RLS for Participants
alter table contest_participants enable row level security;
create policy "Participants are viewable by everyone" on contest_participants for select using (true);
create policy "Users can participate with their pets" on contest_participants for insert with check (
  exists (select 1 from pets where id = pet_id and owner_id = auth.uid())
);

-- 5. WALLETS (Trigger based usually, but creating table here)
create table if not exists wallets (
  user_id uuid references profiles(id) primary key,
  balance decimal default 0,
  points integer default 0,
  updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Wallets
alter table wallets enable row level security;
create policy "Users can view their own wallet" on wallets for select using (auth.uid() = user_id);

-- 6. TRANSACTIONS
create table if not exists transactions (
  id uuid default uuid_generate_v4() primary key,
  wallet_id uuid references wallets(user_id) not null,
  amount decimal not null,
  type text not null, -- 'deposit', 'withdrawal', 'reward', 'purchase'
  description text,
  created_at timestamp with time zone default timezone('utc'::text, now())
);

-- RLS for Transactions
alter table transactions enable row level security;
create policy "Users can view their own transactions" on transactions for select using (
  exists (select 1 from wallets where user_id = auth.uid() and wallets.user_id = transactions.wallet_id)
);

-- FUNCS & TRIGGERS
-- Auto create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name, avatar_url)
  values (new.id, new.email, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  
  insert into public.wallets (user_id)
  values (new.id);
  
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Database Schema for Pet-Sovereign Economy Platform (PostgreSQL)

-- 1. Users & Identity
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    phone_number VARCHAR(20),
    location_city VARCHAR(50),
    location_district VARCHAR(50),
    location_coordinates POINT, -- PostGIS support can be added later
    user_rank VARCHAR(50) DEFAULT 'Newbie', -- 'Newbie', 'Guardian', 'Angel'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Pets & Career
CREATE TABLE pets (
    id SERIAL PRIMARY KEY,
    owner_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    name VARCHAR(50) NOT NULL,
    species VARCHAR(50) NOT NULL, -- 'Cat', 'Dog', 'Bird', etc.
    breed VARCHAR(50),
    birth_date DATE,
    microchip_no VARCHAR(100) UNIQUE,
    
    -- Gamification Stats
    level INTEGER DEFAULT 1,
    xp INTEGER DEFAULT 0,
    rank_title VARCHAR(50) DEFAULT 'Amatör Pati', -- 'Amatör Pati', 'Mahalle Yıldızı', 'Efsanevi'
    
    -- Status
    is_active BOOLEAN DEFAULT TRUE,
    energy_points INTEGER DEFAULT 100, -- Consumed in Arenas
    
    -- Media
    profile_image_url TEXT,
    
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Economy & Wallet
CREATE TABLE wallets (
    user_id INTEGER PRIMARY KEY REFERENCES users(id) ON DELETE CASCADE,
    balance_patipoints INTEGER DEFAULT 0,
    pending_points INTEGER DEFAULT 0,
    total_donated_points INTEGER DEFAULT 0,
    total_savings_amount DECIMAL(10, 2) DEFAULT 0.00,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE transactions (
    id SERIAL PRIMARY KEY,
    wallet_id INTEGER REFERENCES wallets(user_id),
    amount INTEGER NOT NULL,
    transaction_type VARCHAR(20) NOT NULL, -- 'EARN', 'SPEND', 'DONATE', 'TRANSFER'
    source VARCHAR(50), -- 'DAILY_CARE', 'CONTEST_WIN', 'SHOPPING_REWARD'
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Competitions & Arena
CREATE TABLE competitions (
    id SERIAL PRIMARY KEY,
    title VARCHAR(100) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'AESTHETIC', 'TALENT', 'LOCAL', 'FLASH'
    description TEXT,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    status VARCHAR(20) DEFAULT 'SCHEDULED', -- 'SCHEDULED', 'ACTIVE', 'COMPLETED'
    sponsor_name VARCHAR(100),
    prize_pool_points INTEGER DEFAULT 0,
    
    -- Rules
    min_level INTEGER DEFAULT 1,
    allowed_species VARCHAR(50) -- 'ALL' or specific
);

CREATE TABLE competition_entries (
    id SERIAL PRIMARY KEY,
    competition_id INTEGER REFERENCES competitions(id) ON DELETE CASCADE,
    pet_id INTEGER REFERENCES pets(id) ON DELETE CASCADE,
    media_url TEXT NOT NULL, -- The photo/video entry
    vote_count INTEGER DEFAULT 0,
     smart_like_count INTEGER DEFAULT 0, -- Weighted likes (long press)
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(competition_id, pet_id)
);

-- 5. Duels
CREATE TABLE duels (
    id SERIAL PRIMARY KEY,
    challenger_pet_id INTEGER REFERENCES pets(id),
    opponent_pet_id INTEGER REFERENCES pets(id),
    winner_pet_id INTEGER REFERENCES pets(id),
    status VARCHAR(20) DEFAULT 'PENDING', -- 'PENDING', 'ACTIVE', 'FINISHED'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 6. Charity & Shelters
CREATE TABLE shelters (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    city VARCHAR(50),
    description TEXT,
    needed_points_total INTEGER DEFAULT 0,
    current_points_collected INTEGER DEFAULT 0,
    is_verified BOOLEAN DEFAULT FALSE
);

CREATE TABLE donations (
    id SERIAL PRIMARY KEY,
    donor_user_id INTEGER REFERENCES users(id),
    shelter_id INTEGER REFERENCES shelters(id),
    amount_points INTEGER NOT NULL,
    status VARCHAR(20) DEFAULT 'COMPLETED',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for frequent queries
CREATE INDEX idx_pets_owner ON pets(owner_id);
CREATE INDEX idx_entries_competition ON competition_entries(competition_id);
CREATE INDEX idx_entries_votes ON competition_entries(vote_count DESC);

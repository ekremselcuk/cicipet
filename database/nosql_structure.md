# NoSQL Data Structure Strategy (MongoDB / Redis)

## Overview
For high-volume, high-velocity data such as "Smart Likes" (long press interactions), Activity Logs ("Proof-of-Care" daily actions), and Real-time Feed generation, we use a document-based approach.

## 1. Activity Logs (Daily Actions)
**Collection:** `activity_logs`
Used for Proof-of-Care verification and Streak calculation.

```json
{
  "_id": "ObjectId",
  "pet_id": 101, // Refers to SQL pets.id
  "action_type": "FED", // 'FED', 'PLAYED', 'GROOMED'
  "timestamp": "ISOString",
  "meta": {
    "duration_seconds": 30,
    "device_info": "iOS App"
  }
}
```

## 2. Smart Like Events (High Frequency)
**Collection:** `smart_likes` (or Redis Key)
Stores individual interaction events before aggregation to SQL.

```json
{
  "_id": "ObjectId",
  "entry_id": 5002, // Refers to SQL competition_entries.id
  "voter_user_id": 204,
  "intensity": 0.8, // 0.0 to 1.0 (Based on press duration)
  "sound_triggered": true,
  "created_at": "ISOString"
}
```

## 3. Global Feed & Notifications
**Collection:** `feed_items`
Pre-rendered feed items for the "Smart Feed".

```json
{
  "_id": "ObjectId",
  "type": "CONTEST_WIN", // 'CONTEST_WIN', 'DONATION', 'DUEL_INVITE'
  "actor_pet_id": 101,
  "target_user_ids": [], // Empty for public, or specific IDs
  "content": {
    "title": "Pamuk won the 'Best Sleep' contest!",
    "media_url": "...",
    "action_link": "/arena/1"
  },
  "created_at": "ISOString"
}
```

## Strategy
1. **Write:** High-frequency writes go to NoSQL/Redis first.
2. **Aggregate:** Scheduled jobs (Cron) aggregate specific metrics (e.g., total likes) and update the PostgreSQL specific tables (`competition_entries.vote_count`).
3. **Read:** Real-time dashboards read from Redis/NoSQL; Historical profile data reads from PostgreSQL.

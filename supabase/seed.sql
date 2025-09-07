-- Seed data for AI Retrofit
-- This file is automatically run when using `npm run db:seed`

-- Insert initial intercom status
INSERT INTO intercom_status (is_online, last_buzz, battery_level, signal_strength)
VALUES (true, NULL, 100, 100)
ON CONFLICT DO NOTHING;

-- You can add more seed data here as needed
-- For example, test users, sample intercom actions, etc.

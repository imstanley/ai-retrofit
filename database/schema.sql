-- Enable Row Level Security
ALTER DATABASE postgres SET "app.jwt_secret" TO 'your-jwt-secret';

-- Create intercom_actions table
CREATE TABLE IF NOT EXISTS intercom_actions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('buzz', 'status_check')),
  status TEXT NOT NULL CHECK (status IN ('pending', 'success', 'failed')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  completed_at TIMESTAMP WITH TIME ZONE,
  error_message TEXT
);

-- Create intercom_status table
CREATE TABLE IF NOT EXISTS intercom_status (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  is_online BOOLEAN NOT NULL DEFAULT false,
  last_buzz TIMESTAMP WITH TIME ZONE,
  battery_level INTEGER CHECK (battery_level >= 0 AND battery_level <= 100),
  signal_strength INTEGER CHECK (signal_strength >= 0 AND signal_strength <= 100),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE intercom_actions ENABLE ROW LEVEL SECURITY;
ALTER TABLE intercom_status ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for intercom_actions
CREATE POLICY "Users can view their own actions" ON intercom_actions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own actions" ON intercom_actions
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Create RLS policies for intercom_status
CREATE POLICY "Authenticated users can view status" ON intercom_status
  FOR SELECT USING (auth.role() = 'authenticated');

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_intercom_actions_user_id ON intercom_actions(user_id);
CREATE INDEX IF NOT EXISTS idx_intercom_actions_created_at ON intercom_actions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_intercom_status_updated_at ON intercom_status(updated_at DESC);

-- Insert initial status record
INSERT INTO intercom_status (is_online, last_buzz, battery_level, signal_strength)
VALUES (true, NULL, 100, 100)
ON CONFLICT DO NOTHING;

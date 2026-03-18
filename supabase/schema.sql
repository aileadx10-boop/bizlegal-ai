-- TRACR — Supabase Schema
-- Run this in the Supabase SQL Editor

-- Orders table
CREATE TABLE orders (
  id               UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  report_id        TEXT UNIQUE NOT NULL,         -- TR-2025-00041
  email            TEXT NOT NULL,
  first_name       TEXT,
  last_name        TEXT,
  role             TEXT,
  wallet_address   TEXT NOT NULL,
  network          TEXT DEFAULT 'ethereum',
  case_context     TEXT,
  amount           DECIMAL(10,2) DEFAULT 149.00,
  tier             TEXT DEFAULT 'standard',      -- 'standard' | 'priority' | 'litigation'
  status           TEXT DEFAULT 'pending',       -- 'pending' | 'paid' | 'processing' | 'delivered' | 'error'
  payment_method   TEXT,
  stripe_session_id TEXT,
  risk_score       INTEGER,
  risk_level       TEXT,
  report_url       TEXT,
  created_at       TIMESTAMPTZ DEFAULT NOW(),
  paid_at          TIMESTAMPTZ,
  delivered_at     TIMESTAMPTZ
);

-- Leads table (free tier signups)
CREATE TABLE leads (
  id             UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email          TEXT NOT NULL,
  wallet_address TEXT,
  risk_score     INTEGER,
  risk_level     TEXT,
  ip_address     TEXT,
  converted      BOOLEAN DEFAULT FALSE,
  created_at     TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads  ENABLE ROW LEVEL SECURITY;

-- Service role has full access (backend only — never expose anon key on backend)
CREATE POLICY "service_role_orders" ON orders
  FOR ALL USING (auth.role() = 'service_role');

CREATE POLICY "service_role_leads" ON leads
  FOR ALL USING (auth.role() = 'service_role');

-- Storage bucket for reports
-- Run in Supabase Storage UI: Create bucket named 'reports' (public)
-- Or via SQL:
-- INSERT INTO storage.buckets (id, name, public) VALUES ('reports', 'reports', true);

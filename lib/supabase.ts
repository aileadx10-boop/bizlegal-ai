import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export type OrderStatus = 'pending' | 'paid' | 'processing' | 'delivered' | 'error'
export type OrderTier   = 'standard' | 'priority' | 'litigation'

export interface Order {
  id: string
  report_id: string
  email: string
  first_name: string | null
  last_name: string | null
  role: string | null
  wallet_address: string
  network: string | null
  case_context: string | null
  amount: number
  tier: OrderTier
  status: OrderStatus
  payment_method: string | null
  stripe_session_id: string | null
  risk_score: number | null
  risk_level: string | null
  report_url: string | null
  created_at: string
  paid_at: string | null
  delivered_at: string | null
}

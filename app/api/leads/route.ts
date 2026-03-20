// app/api/leads/route.ts
// Lead capture endpoint — saves to Supabase `leads` table
//
// Required Supabase table (run once in SQL editor):
// CREATE TABLE leads (
//   id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
//   email text NOT NULL,
//   source text,
//   page text,
//   product text,
//   created_at timestamptz DEFAULT now()
// );
// CREATE UNIQUE INDEX leads_email_source_idx ON leads (email, source);

import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, source, page, product } = body

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const { error } = await sb.from('leads').insert({
      email: email.toLowerCase().trim(),
      source: source ?? 'unknown',
      page: page ?? '/',
      product: product ?? null,
    })

    // Silently ignore duplicate key errors — don't punish returning users
    if (error && !error.message.includes('duplicate') && !error.message.includes('unique')) {
      console.error('[leads] Supabase error:', error.message)
      return NextResponse.json({ error: 'Failed to save lead' }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error('[leads] Unexpected error:', err)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

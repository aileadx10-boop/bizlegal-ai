import { NextRequest, NextResponse } from 'next/server'
import { getTransactions } from '@/lib/covalent'
import { calculateRisk } from '@/lib/risk-engine'
import { generatePreview } from '@/lib/ai-prompts'
import { supabase } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  const { wallet, network, email } = await req.json()

  if (!wallet || typeof wallet !== 'string') {
    return NextResponse.json({ error: 'Wallet address required' }, { status: 400 })
  }

  // Basic wallet address validation
  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
    return NextResponse.json({ error: 'Invalid wallet address format' }, { status: 400 })
  }

  try {
    const txs  = await getTransactions(wallet, network || 'ethereum')
    const risk = calculateRisk(txs)
    const preview = await generatePreview(wallet, risk)

    // Capture lead if email provided
    if (email && typeof email === 'string' && email.includes('@')) {
      await supabase.from('leads').insert({
        email,
        wallet_address: wallet,
        risk_score: risk.score,
        risk_level: risk.level,
        ip_address: req.headers.get('x-forwarded-for') || null,
      })
    }

    // Return blurred preview — full report requires payment
    return NextResponse.json({
      riskScore: risk.score,
      riskLevel: risk.level,
      preview,
      flags:    risk.flags.slice(0, 2),   // show 2 of N
      flagCount: risk.flags.length,
      metrics: {
        totalTransactions:   risk.metrics.totalTransactions,
        uniqueCounterparties: risk.metrics.uniqueCounterparties,
      },
      fullReportAvailable: true,
    })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Analysis failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

const PRICES: Record<string, number> = {
  standard:  14900,   // $149
  priority:  24900,   // $249
  litigation: 50000,  // $500 base
}

function generateReportId(): string {
  const year = new Date().getFullYear()
  const num  = String(Math.floor(Math.random() * 90000) + 10000)
  return `TR-${year}-${num}`
}

export async function POST(req: NextRequest) {
  const {
    email, firstName, lastName, wallet, network,
    context, tier = 'standard', role,
  } = await req.json()

  if (!email || !wallet) {
    return NextResponse.json({ error: 'Email and wallet are required' }, { status: 400 })
  }

  if (!/^0x[a-fA-F0-9]{40}$/.test(wallet)) {
    return NextResponse.json({ error: 'Invalid wallet address' }, { status: 400 })
  }

  const tierKey  = ['standard', 'priority', 'litigation'].includes(tier) ? tier : 'standard'
  const reportId = generateReportId()

  try {
    // Save pending order to Supabase
    await supabase.from('orders').insert({
      report_id:       reportId,
      email,
      first_name:      firstName || null,
      last_name:       lastName  || null,
      role:            role      || null,
      wallet_address:  wallet,
      network:         network   || 'ethereum',
      case_context:    context   || null,
      amount:          PRICES[tierKey] / 100,
      tier:            tierKey,
      status:          'pending',
      payment_method:  'stripe',
    })

    const tierLabel = tierKey.charAt(0).toUpperCase() + tierKey.slice(1)
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      customer_email:       email,
      line_items: [{
        price_data: {
          currency:     'usd',
          product_data: {
            name:        `TRACR ${tierLabel} Forensic Report`,
            description: `On-chain forensic report for ${wallet.slice(0, 10)}…`,
          },
          unit_amount: PRICES[tierKey],
        },
        quantity: 1,
      }],
      mode:     'payment',
      metadata: { reportId, wallet, network: network || 'ethereum', tier: tierKey },
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/success?report=${reportId}`,
      cancel_url:  `${process.env.NEXT_PUBLIC_APP_URL}/#order`,
    })

    return NextResponse.json({ url: session.url, reportId })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Order creation failed'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

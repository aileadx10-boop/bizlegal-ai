import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { supabase } from '@/lib/supabase'

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)

export async function POST(req: NextRequest) {
  const body = await req.text()
  const sig  = req.headers.get('stripe-signature')!

  let event: Stripe.Event
  try {
    event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET!)
  } catch {
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.CheckoutSession
    const { reportId, wallet, network, tier } = session.metadata!

    // Mark order as paid
    await supabase.from('orders')
      .update({
        status:            'processing',
        paid_at:           new Date().toISOString(),
        stripe_session_id: session.id,
      })
      .eq('report_id', reportId)

    // Trigger async report generation (fire and forget)
    fetch(`${process.env.NEXT_PUBLIC_APP_URL}/api/generate-report`, {
      method:  'POST',
      headers: {
        'Content-Type':   'application/json',
        'x-internal-key': process.env.STRIPE_WEBHOOK_SECRET!,
      },
      body: JSON.stringify({ reportId, wallet, network, tier }),
    }).catch(console.error)
  }

  return NextResponse.json({ received: true })
}

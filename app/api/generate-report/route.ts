import { NextRequest, NextResponse } from 'next/server'
import { getTransactions } from '@/lib/covalent'
import { calculateRisk } from '@/lib/risk-engine'
import { generateFullReport } from '@/lib/ai-prompts'
import { generatePDFHTML } from '@/lib/pdf-template'
import { sendReportEmail } from '@/lib/sendgrid'
import { supabase } from '@/lib/supabase'
import puppeteer from 'puppeteer-core'
import chromium from '@sparticuz/chromium'

export const maxDuration = 60

export async function POST(req: NextRequest) {
  // Verify internal call
  const internalKey = req.headers.get('x-internal-key')
  if (internalKey !== process.env.STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const { reportId, wallet, network, tier } = await req.json()

  try {
    // Fetch order
    const { data: order, error: orderErr } = await supabase
      .from('orders')
      .select('*')
      .eq('report_id', reportId)
      .single()

    if (orderErr || !order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 })
    }

    // Fetch blockchain data
    const txs  = await getTransactions(wallet, network || 'ethereum')
    const risk = calculateRisk(txs)

    // Generate AI report content (4-stage pipeline)
    const content = await generateFullReport(wallet, txs, risk)

    // Generate PDF HTML
    const clientName = `${order.first_name || ''} ${order.last_name || ''}`.trim() || order.email
    const html = generatePDFHTML(wallet, reportId, risk, content, clientName, network || 'ethereum')

    // Launch Puppeteer and render PDF
    const browser = await puppeteer.launch({
      args:           chromium.args,
      executablePath: await chromium.executablePath(),
      headless:       chromium.headless as boolean,
    })
    const page = await browser.newPage()
    await page.setContent(html, { waitUntil: 'networkidle0' })
    const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true })
    await browser.close()

    // Upload PDF to Supabase Storage
    const pdfPath = `reports/${reportId}.pdf`
    await supabase.storage.from('reports').upload(pdfPath, pdfBuffer, {
      contentType: 'application/pdf',
    })

    const { data: { publicUrl } } = supabase.storage.from('reports').getPublicUrl(pdfPath)

    // Update order to delivered
    await supabase.from('orders').update({
      status:       'delivered',
      risk_score:   risk.score,
      risk_level:   risk.level,
      report_url:   publicUrl,
      delivered_at: new Date().toISOString(),
    }).eq('report_id', reportId)

    // Mark converted lead
    await supabase.from('leads')
      .update({ converted: true })
      .eq('email', order.email)

    // Send email with PDF attachment
    await sendReportEmail({
      to:          order.email,
      firstName:   order.first_name || 'Valued Client',
      reportId,
      wallet,
      riskScore:   risk.score,
      riskLevel:   risk.level,
      reportUrl:   publicUrl,
      pdfBuffer:   Buffer.from(pdfBuffer),
    })

    return NextResponse.json({ success: true, reportId, reportUrl: publicUrl })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Report generation failed'
    await supabase.from('orders').update({ status: 'error' }).eq('report_id', reportId)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}

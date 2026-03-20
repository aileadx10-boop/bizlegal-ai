#!/usr/bin/env npx tsx

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

type Topic = [string, string, string, 'docstack' | 'brai' | 'tracr', string]

const TOPICS: Topic[] = [
  ['uae', 'share-purchase-agreement-uae', 'Share Purchase Agreement UAE Guide 2026', 'docstack', 'share purchase agreement uae, spa difc, share transfer uae'],
  ['uae', 'tokenized-real-estate-uae', 'Tokenized Real Estate UAE Compliance 2026', 'brai', 'tokenized real estate uae, vara rwa, uae tokenization'],
  ['uae', 'difc-investment-fund-setup', 'DIFC Investment Fund Setup Legal Guide', 'docstack', 'difc fund setup, uae investment fund, difc legal guide'],
  ['united-states', 'real-estate-syndication-docs', 'Real Estate Syndication Documents Guide', 'docstack', 'real estate syndication, ppm template, operating agreement syndication'],
  ['united-states', 'sec-regulation-d-compliance', 'SEC Regulation D Compliance Guide 2026', 'brai', 'regulation d compliance, rule 506b, rule 506c'],
  ['united-states', 'defi-sec-compliance-2026', 'DeFi SEC Compliance Guide 2026', 'brai', 'defi sec compliance, defi regulation usa, crypto sec guide'],
  ['european-union', 'mica-casp-license-requirements', 'MiCA CASP License Requirements 2026', 'brai', 'mica casp license, mica compliance, eu crypto license'],
  ['european-union', 'eu-real-estate-fund-aifmd', 'EU Real Estate Fund AIFMD Guide', 'docstack', 'aifmd real estate fund, eu fund legal structure'],
  ['european-union', 'gdpr-data-processing-agreement', 'GDPR Data Processing Agreement Guide', 'docstack', 'gdpr dpa template, data processing agreement eu'],
  ['singapore', 'mas-dpt-license-application', 'MAS DPT License Application Guide 2026', 'brai', 'mas dpt license, singapore crypto license'],
  ['singapore', 'variable-capital-company-singapore', 'Variable Capital Company Singapore Guide', 'docstack', 'vcc singapore, variable capital company guide'],
  ['united-kingdom', 'fca-crypto-asset-registration', 'FCA Crypto Asset Registration Guide 2026', 'brai', 'fca crypto registration, uk crypto compliance'],
  ['united-kingdom', 'uk-spv-real-estate', 'UK SPV for Real Estate Investment Guide', 'docstack', 'uk spv real estate, real estate spv uk'],
  ['portugal', 'nhr-tax-regime-portugal', 'Portugal NHR Regime Guide for Investors', 'docstack', 'nhr portugal, portugal investor tax guide'],
  ['portugal', 'portugal-crypto-regulation-2026', 'Portugal Crypto Regulation Guide 2026', 'brai', 'portugal crypto regulation, mica portugal'],
  ['israel', 'israeli-real-estate-investment', 'Israeli Real Estate Investment Guide', 'docstack', 'real estate israel, israel property investment'],
  ['israel', 'israel-crypto-regulation-2026', 'Israel Crypto Regulation Guide 2026', 'brai', 'israel crypto regulation, isa digital assets'],
  ['crypto', 'dao-legal-wrapper-structures', 'DAO Legal Wrapper Structures Guide 2026', 'docstack', 'dao legal wrapper, dao llc, dao foundation'],
  ['crypto', 'saft-agreement-guide', 'SAFT Agreement Guide for Token Projects', 'docstack', 'saft agreement, future tokens agreement'],
  ['crypto', 'rwa-tokenization-legal-framework', 'RWA Tokenization Legal Framework 2026', 'brai', 'rwa tokenization legal, real world assets compliance'],
  ['global', 'cross-border-real-estate-jv', 'Cross-Border Real Estate JV Guide', 'docstack', 'cross border real estate jv, international jv agreement'],
  ['global', 'family-office-investment-structure', 'Family Office Investment Structure Guide', 'docstack', 'family office legal structure, wealth structuring'],
  ['global', 'offshore-holding-company-guide', 'Offshore Holding Company Comparison Guide', 'docstack', 'offshore holding company guide, bvi cayman uae'],
  ['global', 'global-crypto-investigation-readiness', 'Global Crypto Investigation Readiness Guide', 'tracr', 'crypto investigation readiness, digital asset forensic guide'],
]

function required(name: string) {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

function parseArgs() {
  const args = process.argv.slice(2)
  let count = 10
  let start = 0
  let dryRun = false

  for (let index = 0; index < args.length; index += 1) {
    if (args[index] === '--count' && args[index + 1]) count = Number(args[index + 1])
    if (args[index] === '--start' && args[index + 1]) start = Number(args[index + 1])
    if (args[index] === '--dry-run') dryRun = true
  }

  return { count, start, dryRun }
}

function buildPrompt(row: Topic) {
  const ctaCopy = {
    docstack: 'DocStack for paid legal templates and instant document fulfillment.',
    brai: 'BRAI for premium compliance intelligence and workflow execution.',
    tracr: 'TRACR for forensic investigations and digital asset tracing.',
  }

  return `You are the content strategist for BizLegal AI, a premium legal intelligence SaaS.

Write a sophisticated SEO article for serious operators about "${row[2]}".
Jurisdiction: ${row[0]}
Commercial CTA: ${ctaCopy[row[3]]}
Primary keywords: ${row[4]}

Requirements:
- 900 to 1400 words.
- Written for founders, investors, counsel, legal ops, and compliance leaders.
- Sound authoritative, direct, and commercially useful.
- Include regulatory references, timelines, risk warnings, and practical next steps.
- End with 3 to 5 FAQ items that buyers actually ask.

Return only this format:
TITLE: <max 65 characters>
META: <140 to 155 characters>
KEYWORDS: <comma separated>
CONTENT:
<h2>Overview</h2>
<p>...</p>
<h2>Key legal requirements</h2>
<p>...</p>
<ul><li>...</li></ul>
<h2>Execution roadmap</h2>
<p>...</p>
<h2>Commercial implications</h2>
<p>...</p>
<h2>Frequently Asked Questions</h2>
<h3>...</h3>
<p>...</p>`
}

function parseResponse(text: string, row: Topic) {
  const read = (key: string) => text.match(new RegExp(`${key}:\\s*(.+?)(?=\\n[A-Z]+:|$)`, 's'))?.[1]?.trim() || ''
  const content = text.match(/CONTENT:\s*([\s\S]+)/)?.[1]?.trim() || text
  const cleanWordCount = content.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length

  return {
    slug: `guides/${row[0]}/${row[1]}`,
    title: read('TITLE') || row[2],
    meta: read('META') || `Read the BizLegal AI guide for ${row[2]}.`,
    keywords: read('KEYWORDS').split(',').map((item) => item.trim()).filter(Boolean),
    content,
    cta_type: row[3],
    cta: row[3],
    page_type: 'guide',
    jurisdiction: row[0].replace(/-/g, ' '),
    topic: row[2],
    published: true,
    word_count: cleanWordCount,
    reading_time: Math.max(4, Math.ceil(cleanWordCount / 220)),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

async function main() {
  const { count, start, dryRun } = parseArgs()
  const anthropic = new Anthropic({ apiKey: required('ANTHROPIC_API_KEY') })
  const supabase = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_KEY'))
  const model = process.env.SEO_FACTORY_MODEL || 'claude-opus-4-5'

  const requestedSlugs = TOPICS.map((topic) => `guides/${topic[0]}/${topic[1]}`)
  const { data: existingRows } = await supabase.from('seo_pages').select('slug').in('slug', requestedSlugs)
  const existing = new Set((existingRows || []).map((row) => row.slug))
  const pending = TOPICS.filter((topic) => !existing.has(`guides/${topic[0]}/${topic[1]}`)).slice(start, start + count)

  console.log(`SEO Factory batch size: ${pending.length}`)
  console.log(`Model: ${model}`)

  if (dryRun) {
    pending.forEach((topic) => console.log(`- ${topic[0]} / ${topic[1]}`))
    return
  }

  let created = 0
  let failed = 0

  for (const topic of pending) {
    const slug = `guides/${topic[0]}/${topic[1]}`
    process.stdout.write(`Publishing ${slug} ... `)

    try {
      const response = await anthropic.messages.create({
        model,
        max_tokens: 2600,
        messages: [{ role: 'user', content: buildPrompt(topic) }],
      })

      const text = response.content[0]?.type === 'text' ? response.content[0].text : ''
      const payload = parseResponse(text, topic)
      const { error } = await supabase.from('seo_pages').insert(payload)

      if (error) {
        failed += 1
        console.log(`failed: ${error.message}`)
      } else {
        created += 1
        console.log('done')
      }
    } catch (error) {
      failed += 1
      console.log(`failed: ${(error as Error).message}`)
    }

    await new Promise((resolve) => setTimeout(resolve, 1200))
  }

  console.log(`Created: ${created}`)
  console.log(`Failed: ${failed}`)
  if (failed > 0) process.exitCode = 1
}

main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})

#!/usr/bin/env npx tsx
/**
 * Automated SEO Page Generator
 * Runs every 2 days to generate 10 SEO pages using Gemini API
 * 
 * Usage: npx tsx scripts/auto-seo-generator.ts [--force] [--count=10]
 */

import { createClient } from '@supabase/supabase-js'
import { GeminiClient } from '../lib/gemini'

// ─── CONFIGURATION ────────────────────────────────────────────
const CONFIG = {
  pagesPerRun: 10,
  runIntervalDays: 2,
  minWordCount: 900,
  maxWordCount: 1500,
}

// ─── SEO TOPIC POOL (200+ topics for auto-generation) ─────────
const SEO_TOPIC_POOL: Array<{
  region: string
  baseTopic: string
  variations: string[]
  ctaType: 'docstack' | 'brai' | 'tracr'
  baseKeywords: string[]
}> = [
  {
    region: 'uae',
    baseTopic: 'crypto licensing',
    variations: [
      'VARA License Application Process Dubai 2026',
      'FSRA Crypto License ADGM Complete Guide',
      'DFSA Innovation License for Crypto Firms',
      'UAE Crypto Exchange Registration Requirements',
      'Virtual Asset Service Provider UAE Compliance',
    ],
    ctaType: 'brai',
    baseKeywords: ['VARA license', 'crypto license UAE', 'DFSA crypto'],
  },
  {
    region: 'uae',
    baseTopic: 'corporate formation',
    variations: [
      'DIFC Company Setup Cost and Timeline 2026',
      'ADGM Foundation Registration Guide',
      'UAE Free Zone vs Mainland Company Comparison',
      'Branch Office Setup in Dubai DIFC',
      'UAE Holding Company Structure Options',
    ],
    ctaType: 'docstack',
    baseKeywords: ['DIFC company', 'ADGM setup', 'UAE free zone'],
  },
  {
    region: 'european-union',
    baseTopic: 'MiCA compliance',
    variations: [
      'MiCA CASP License Application Timeline EU',
      'MiCA Whitepaper Requirements for Token Issuers',
      'MiCA Stablecoin (EMT) Compliance Checklist',
      'MiCA Governance Requirements for Crypto Firms',
      'MiCA Transitional Provisions and Deadlines',
    ],
    ctaType: 'brai',
    baseKeywords: ['MiCA license', 'CASP EU', 'crypto regulation Europe'],
  },
  {
    region: 'united-states',
    baseTopic: 'SEC compliance',
    variations: [
      'Regulation D 506(c) Syndication Complete Guide',
      'SEC Howey Test for Crypto Tokens 2026',
      'Form D Filing Requirements and Deadlines',
      'Accredited Investor Verification Process',
      'Blue Sky Laws State-by-State Compliance',
    ],
    ctaType: 'docstack',
    baseKeywords: ['Reg D', 'SEC compliance', 'accredited investor'],
  },
  {
    region: 'singapore',
    baseTopic: 'MAS licensing',
    variations: [
      'MAS DPT License Application Requirements 2026',
      'Payment Services Act Exemptions Guide',
      'MAS VCC Structure for Fund Managers',
      'Singapore Family Office Tax Incentives 13O/13U',
      'MAS Stablecoin Regulatory Framework',
    ],
    ctaType: 'brai',
    baseKeywords: ['MAS license', 'DPT Singapore', 'VCC structure'],
  },
  {
    region: 'united-kingdom',
    baseTopic: 'FCA crypto registration',
    variations: [
      'FCA Cryptoasset Business Registration UK 2026',
      'UK Financial Promotion Rules for Crypto Firms',
      'FCA AML Registration for Crypto Exchanges',
      'UK Crypto Tax Reporting Requirements',
      'FCA Sandbox Application for Fintech',
    ],
    ctaType: 'brai',
    baseKeywords: ['FCA crypto', 'UK crypto registration', 'financial promotion'],
  },
  {
    region: 'global',
    baseTopic: 'legal documents',
    variations: [
      'Shareholders Agreement Key Clauses Guide',
      'NDA Mutual vs Unilateral Comparison',
      'Employment Contract Essential Terms',
      'IP Assignment Agreement for Startups',
      'Convertible Note SAFE vs Traditional',
    ],
    ctaType: 'docstack',
    baseKeywords: ['legal templates', 'contract templates', 'legal documents'],
  },
  {
    region: 'global',
    baseTopic: 'compliance automation',
    variations: [
      'AML KYC Automation for Fintech 2026',
      'GDPR Compliance Automation Tools',
      'SOC 2 Type II Preparation Checklist',
      'ISO 27001 Implementation Timeline',
      'Compliance Management Software Comparison',
    ],
    ctaType: 'brai',
    baseKeywords: ['compliance automation', 'AML automation', 'KYC software'],
  },
  {
    region: 'global',
    baseTopic: 'blockchain forensics',
    variations: [
      'Crypto Wallet Tracing for Legal Cases',
      'Blockchain Forensics Tools Comparison 2026',
      'Crypto Asset Recovery Process Guide',
      'On-Chain Analysis for Litigation Support',
      'Crypto Fraud Investigation Best Practices',
    ],
    ctaType: 'tracr',
    baseKeywords: ['crypto forensics', 'blockchain tracing', 'wallet analysis'],
  },
  {
    region: 'uae',
    baseTopic: 'real estate investment',
    variations: [
      'DIFC Real Estate Investment Trust Guide',
      'Dubai Property Investment Visa Requirements',
      'UAE REIT Regulatory Framework 2026',
      'Off-Plan Property Purchase Process Dubai',
      'UAE Real Estate Capital Gains Tax Guide',
    ],
    ctaType: 'docstack',
    baseKeywords: ['UAE real estate', 'Dubai property', 'REIT UAE'],
  },
]

// ─── HELPER FUNCTIONS ─────────────────────────────────────────
function required(name: string): string {
  const value = process.env[name]
  if (!value) throw new Error(`Missing environment variable: ${name}`)
  return value
}

function getLastRunDate(key: string): Date | null {
  try {
    const data = localStorage.getItem(key)
    return data ? new Date(data) : null
  } catch {
    return null
  }
}

function setLastRunDate(key: string, date: Date): void {
  try {
    localStorage.setItem(key, date.toISOString())
  } catch {
    // Ignore storage errors
  }
}

function shouldRun(key: string, intervalDays: number): boolean {
  const lastRun = getLastRunDate(key)
  if (!lastRun) return true
  
  const now = new Date()
  const diffMs = now.getTime() - lastRun.getTime()
  const diffDays = diffMs / (1000 * 60 * 60 * 24)
  
  return diffDays >= intervalDays
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

function wordCount(html: string): number {
  return html.replace(/<[^>]+>/g, ' ').trim().split(/\s+/).filter(Boolean).length
}

// ─── MAIN GENERATION LOGIC ────────────────────────────────────
async function generateSEOPage(
  gemini: GeminiClient,
  topic: { region: string; title: string; ctaType: string; keywords: string[] }
) {
  const content = await gemini.generateContent({
    topic: topic.title,
    jurisdiction: topic.region,
    keywords: topic.keywords,
    wordCount: 1200,
    contentType: 'seo-page',
  })

  const contentText = content.content || ''
  const wc = wordCount(contentText)
  
  if (wc < CONFIG.minWordCount) {
    throw new Error(`Content too short: ${wc} words`)
  }

  return {
    slug: `guides/${topic.region}/${slugify(topic.title)}`,
    title: content.title || topic.title,
    meta: content.meta || `Guide to ${topic.title}`,
    keywords: content.keywords || topic.keywords,
    content: contentText,
    cta_type: topic.ctaType,
    cta: topic.ctaType,
    page_type: 'guide',
    jurisdiction: topic.region.replace(/-/g, ' '),
    topic: topic.title,
    published: true,
    word_count: wc,
    reading_time: Math.max(4, Math.ceil(wc / 220)),
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  }
}

async function main() {
  const args = process.argv.slice(2)
  const force = args.includes('--force')
  const countArg = args.find(a => a.startsWith('--count='))
  const count = countArg ? parseInt(countArg.split('=')[1]) : CONFIG.pagesPerRun

  const RUN_KEY = 'seo-auto-generator-last-run'
  
  if (!force && !shouldRun(RUN_KEY, CONFIG.runIntervalDays)) {
    const lastRun = getLastRunDate(RUN_KEY)
    console.log(`⏭️  Skipped: Last run was ${lastRun?.toLocaleDateString()}. Next run in ${Math.ceil(CONFIG.runIntervalDays - (new Date().getTime() - lastRun!.getTime()) / (1000 * 60 * 60 * 24))} days`)
    console.log('   Use --force to run anyway')
    return
  }

  console.log('🚀 Starting automated SEO page generation...')
  console.log(`📊 Generating ${count} pages using Gemini API`)

  const gemini = new GeminiClient({
    apiKey: required('GOOGLE_API_KEY'),
    model: 'gemini-2.0-flash',
  })

  const supabase = createClient(required('NEXT_PUBLIC_SUPABASE_URL'), required('SUPABASE_SERVICE_KEY'))

  // Get existing slugs to avoid duplicates
  const allTopics = SEO_TOPIC_POOL.flatMap(pool =>
    pool.variations.map(variation => ({
      region: pool.region,
      title: variation,
      ctaType: pool.ctaType,
      keywords: pool.baseKeywords,
      slug: `guides/${pool.region}/${slugify(variation)}`,
    }))
  )

  const { data: existing } = await supabase
    .from('seo_pages')
    .select('slug')
    .in('slug', allTopics.map(t => t.slug))

  const existingSlugs = new Set(existing?.map(r => r.slug) || [])
  const pendingTopics = allTopics.filter(t => !existingSlugs.has(t.slug)).slice(0, count)

  if (pendingTopics.length === 0) {
    console.log('✅ All topics already published!')
    return
  }

  console.log(`📝 Found ${pendingTopics.length} topics to generate`)

  let created = 0
  let failed = 0
  const results: Array<{ topic: string; status: string; slug?: string }> = []

  for (const topic of pendingTopics) {
    process.stdout.write(`📄 Generating "${topic.title}"... `)
    
    try {
      const page = await generateSEOPage(gemini, topic)
      
      const { error } = await supabase.from('seo_pages').insert(page)
      
      if (error) {
        failed++
        console.log(`❌ ${error.message}`)
        results.push({ topic: topic.title, status: `Error: ${error.message}` })
      } else {
        created++
        console.log(`✅ ${page.word_count} words`)
        results.push({ topic: topic.title, status: 'Published', slug: page.slug })
      }
    } catch (error) {
      failed++
      console.log(`❌ ${(error as Error).message}`)
      results.push({ topic: topic.title, status: `Error: ${(error as Error).message}` })
    }

    // Rate limiting
    await new Promise(resolve => setTimeout(resolve, 1000))
  }

  // Update last run timestamp
  setLastRunDate(RUN_KEY, new Date())

  // Summary
  console.log('\n' + '='.repeat(60))
  console.log('📊 GENERATION SUMMARY')
  console.log('='.repeat(60))
  console.log(`✅ Created: ${created}`)
  console.log(`❌ Failed: ${failed}`)
  console.log(`📅 Next run: ${new Date(Date.now() + CONFIG.runIntervalDays * 24 * 60 * 60 * 1000).toLocaleDateString()}`)
  
  if (results.length > 0) {
    console.log('\n📋 RESULTS:')
    results.forEach(r => {
      console.log(`  ${r.status === 'Published' ? '✅' : '❌'} ${r.topic}`)
      if (r.slug) console.log(`     → ${r.slug}`)
    })
  }

  if (failed > 0) process.exitCode = 1
}

main().catch(error => {
  console.error('💥 Fatal error:', error)
  process.exitCode = 1
})

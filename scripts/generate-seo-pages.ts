// scripts/generate-seo-pages.ts
// Run: npx tsx scripts/generate-seo-pages.ts
// Generates SEO guide pages with Claude API and publishes to Supabase
// Replaces the broken Gemini automation

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

// ─── TOPICS TO GENERATE ──────────────────────────────────────
const TOPICS = [
  // UAE / DIFC
  { region: 'uae', slug: 'joint-venture-agreement-real-estate-uae',   topic: 'Joint Venture Agreement for Real Estate in UAE',            cta: 'docstack' },
  { region: 'uae', slug: 'vara-token-distribution-agreement-uae',     topic: 'VARA Token Distribution Agreement UAE',                    cta: 'brai'     },
  { region: 'uae', slug: 'nda-real-estate-investment-uae',            topic: 'NDA for Real Estate Investment in UAE',                    cta: 'docstack' },
  { region: 'uae', slug: 'share-purchase-agreement-uae',              topic: 'Share Purchase Agreement UAE — DIFC Legal Guide',          cta: 'docstack' },
  { region: 'uae', slug: 'vara-compliance-checklist',                 topic: 'VARA Compliance Checklist for Crypto Projects UAE 2025',   cta: 'brai'     },

  // EU
  { region: 'european-union', slug: 'mica-token-sale-agreement-template',         topic: 'MiCA Token Sale Agreement Template EU',                   cta: 'brai'     },
  { region: 'european-union', slug: 'mica-compliance-requirements-2025',          topic: 'MiCA Compliance Requirements for Token Issuers 2025',     cta: 'brai'     },
  { region: 'european-union', slug: 'eu-real-estate-jv-agreement',               topic: 'EU Joint Venture Agreement Real Estate Legal Guide',       cta: 'docstack' },
  { region: 'european-union', slug: 'gdpr-nda-template-europe',                  topic: 'GDPR-Compliant NDA Template for EU Businesses',           cta: 'docstack' },

  // USA
  { region: 'united-states', slug: 'operating-agreement-llc-real-estate',        topic: 'LLC Operating Agreement for Real Estate Investors',        cta: 'docstack' },
  { region: 'united-states', slug: 'capital-call-agreement-real-estate',         topic: 'Capital Call Agreement Real Estate: Complete US Guide',    cta: 'docstack' },
  { region: 'united-states', slug: 'joint-venture-agreement-real-estate-us',     topic: 'Real Estate Joint Venture Agreement Template USA',         cta: 'docstack' },
  { region: 'united-states', slug: 'sec-crypto-compliance-guide-2025',           topic: 'SEC Crypto Compliance Guide for Token Projects 2025',      cta: 'brai'     },
  { region: 'united-states', slug: 'reg-d-private-placement-memo',               topic: 'Regulation D Private Placement Memorandum Guide',          cta: 'docstack' },

  // UK
  { region: 'united-kingdom', slug: 'loi-commercial-real-estate-uk',             topic: 'Commercial Real Estate LOI Template UK',                   cta: 'docstack' },
  { region: 'united-kingdom', slug: 'fca-crypto-registration-guide',             topic: 'FCA Crypto Registration Guide UK 2025',                    cta: 'brai'     },
  { region: 'united-kingdom', slug: 'uk-real-estate-jv-agreement',               topic: 'UK Joint Venture Agreement Real Estate Legal Guide',       cta: 'docstack' },

  // Singapore
  { region: 'singapore', slug: 'capital-call-agreement-singapore',               topic: 'Capital Call Agreement Singapore: Legal Guide & Requirements', cta: 'docstack' },
  { region: 'singapore', slug: 'mas-crypto-license-requirements',                topic: 'MAS Crypto License Requirements Singapore 2025',           cta: 'brai'     },
  { region: 'singapore', slug: 'singapore-real-estate-investment-guide',         topic: 'Singapore Real Estate Investment Legal Guide for Foreigners', cta: 'docstack' },

  // Canada
  { region: 'canada', slug: 'joint-venture-agreement-real-estate-canada',        topic: 'Joint Venture Agreement Real Estate Canada Legal Guide',   cta: 'docstack' },
  { region: 'canada', slug: 'csa-crypto-compliance-canada',                      topic: 'CSA Crypto Compliance Requirements Canada 2025',           cta: 'brai'     },
]

// ─── PROMPT TEMPLATE ─────────────────────────────────────────
function buildPrompt(topic: string, region: string, cta: string): string {
  const regionLabels: Record<string, string> = {
    uae: 'United Arab Emirates (UAE / DIFC, governed by VARA)',
    'european-union': 'European Union (MiCA regulation, ESMA oversight)',
    'united-states': 'United States (SEC, CFTC, Delaware law)',
    'united-kingdom': 'United Kingdom (FCA regulated)',
    singapore: 'Singapore (MAS, Payment Services Act)',
    canada: 'Canada (CSA, FINTRAC)',
  }

  return `You are a senior legal content writer for BizLegal AI (bizlegal-ai.com), a platform offering AI-powered legal documents and compliance tools for international real estate and Web3 transactions.

Write a comprehensive SEO guide page on: "${topic}"
Jurisdiction: ${regionLabels[region] ?? region}
CTA product: ${cta} (docstack = contract templates $49, brai = compliance scan free, tracr = forensic report $99)

CRITICAL RULES:
- Write for lawyers, investors, and Web3 founders — professional tone, no fluff
- Include specific regulatory references (VARA Article numbers, MiCA provisions, SEC rules, etc.)
- No legal advice disclaimers in body (site-wide disclaimer exists)
- Minimum 800 words of substantive content
- Use HTML tags only: <h2>, <h3>, <p>, <ul>, <li>

OUTPUT FORMAT (exact, no markdown fences, no extra text):
TITLE: [SEO title, max 65 chars, include jurisdiction and year 2025]
META: [Meta description, max 155 chars, include primary keyword and benefit]
KEYWORDS: [comma-separated, 6-8 keywords]
CONTENT:
<h2>Introduction</h2>
<p>[2-3 sentence intro with primary keyword and jurisdiction]</p>
<h2>[Section 2 title]</h2>
<p>[section content]</p>
<ul><li>[point]</li><li>[point]</li></ul>
<h2>[Section 3 title]</h2>
<p>[section content]</p>
<h2>Key Legal Requirements</h2>
<p>[specific regulatory requirements with article/rule references]</p>
<h2>Practical Steps</h2>
<p>[actionable steps for the reader]</p>
<ul><li>[step 1]</li><li>[step 2]</li><li>[step 3]</li></ul>
<h2>Common Mistakes to Avoid</h2>
<p>[common pitfalls]</p>
<h2>Frequently Asked Questions</h2>
<h3>[FAQ question 1]</h3>
<p>[2-3 sentence answer]</p>
<h3>[FAQ question 2]</h3>
<p>[2-3 sentence answer]</p>
<h3>[FAQ question 3]</h3>
<p>[2-3 sentence answer]</p>`
}

// ─── PARSE CLAUDE RESPONSE ───────────────────────────────────
function parseResponse(text: string, topic: typeof TOPICS[0]) {
  const getField = (key: string) => {
    const m = text.match(new RegExp(`${key}:\\s*(.+?)(?=\\n[A-Z]+:|$)`, 's'))
    return m ? m[1].trim() : ''
  }

  const title = getField('TITLE') || topic.topic
  const meta  = getField('META') || `Complete guide to ${topic.topic}. Legal requirements, templates, and compliance.`
  const keywords = getField('KEYWORDS').split(',').map(k => k.trim()).filter(Boolean)

  const contentMatch = text.match(/CONTENT:\s*([\s\S]+)/)
  const content = contentMatch ? contentMatch[1].trim() : text

  return {
    slug: `${topic.region}/${topic.slug}`,
    title,
    meta,
    content,
    cta_type: topic.cta,
    page_type: 'guide',
    jurisdiction: topic.region,
    topic: topic.topic,
    keywords,
    published: true,
    created_at: new Date().toISOString(),
  }
}

// ─── MAIN ────────────────────────────────────────────────────
async function main() {
  const args = process.argv.slice(2)
  const batchSize = parseInt(args[0] ?? '5')
  const startFrom = parseInt(args[1] ?? '0')

  const batch = TOPICS.slice(startFrom, startFrom + batchSize)

  console.log(`\n🚀 BizLegal AI SEO Generator`)
  console.log(`📋 Generating ${batch.length} pages (${startFrom}–${startFrom + batch.length - 1} of ${TOPICS.length})\n`)

  let success = 0
  let failed = 0

  for (const [i, topic] of batch.entries()) {
    const slug = `${topic.region}/${topic.slug}`
    console.log(`[${i + 1}/${batch.length}] Generating: ${topic.topic}`)

    try {
      // Check if already exists
      const { data: existing } = await sb
        .from('seo_pages')
        .select('slug')
        .eq('slug', slug)
        .single()

      if (existing) {
        console.log(`  ⏭ Already exists — skipping`)
        continue
      }

      // Generate with Claude
      const response = await anthropic.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 2000,
        messages: [{
          role: 'user',
          content: buildPrompt(topic.topic, topic.region, topic.cta),
        }],
      })

      const text = response.content[0].type === 'text' ? response.content[0].text : ''
      const page = parseResponse(text, topic)

      // Insert to Supabase
      const { error } = await sb.from('seo_pages').insert(page)

      if (error) {
        console.log(`  ✗ Supabase error: ${error.message}`)
        failed++
      } else {
        console.log(`  ✓ Published: /guides/${slug}`)
        success++
      }

      // Rate limit — 1 second between calls
      await new Promise(r => setTimeout(r, 1000))

    } catch (err: any) {
      console.log(`  ✗ Error: ${err.message}`)
      failed++
    }
  }

  console.log(`\n✅ Done: ${success} published, ${failed} failed`)
  console.log(`📊 Total in DB: run 'npx tsx scripts/count-pages.ts' to check\n`)
}

main().catch(console.error)

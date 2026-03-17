// scripts/generate-seo-pages.ts
// npx tsx scripts/generate-seo-pages.ts [batchSize] [startFrom]
import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY! })
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

const TOPICS = [
  { region: 'uae',              slug: 'joint-venture-agreement-real-estate-uae',        topic: 'Joint Venture Agreement for Real Estate in UAE',             cta: 'docstack' },
  { region: 'uae',              slug: 'vara-token-distribution-agreement-uae',          topic: 'VARA Token Distribution Agreement UAE',                      cta: 'brai'     },
  { region: 'uae',              slug: 'nda-real-estate-investment-uae',                 topic: 'NDA for Real Estate Investment in UAE',                      cta: 'docstack' },
  { region: 'uae',              slug: 'vara-compliance-checklist-2025',                 topic: 'VARA Compliance Checklist for Crypto Projects UAE 2025',     cta: 'brai'     },
  { region: 'uae',              slug: 'share-purchase-agreement-uae',                   topic: 'Share Purchase Agreement UAE — DIFC Legal Guide',            cta: 'docstack' },
  { region: 'european-union',   slug: 'mica-token-sale-agreement-template',             topic: 'MiCA Token Sale Agreement Template EU',                      cta: 'brai'     },
  { region: 'european-union',   slug: 'mica-compliance-requirements-2025',              topic: 'MiCA Compliance Requirements for Token Issuers 2025',        cta: 'brai'     },
  { region: 'european-union',   slug: 'eu-real-estate-jv-agreement',                    topic: 'EU Joint Venture Agreement Real Estate Legal Guide',         cta: 'docstack' },
  { region: 'european-union',   slug: 'gdpr-nda-template-europe',                       topic: 'GDPR-Compliant NDA Template for EU Businesses',             cta: 'docstack' },
  { region: 'united-states',    slug: 'operating-agreement-llc-real-estate',            topic: 'LLC Operating Agreement for Real Estate Investors',          cta: 'docstack' },
  { region: 'united-states',    slug: 'capital-call-agreement-real-estate',             topic: 'Capital Call Agreement Real Estate: Complete US Guide',      cta: 'docstack' },
  { region: 'united-states',    slug: 'joint-venture-agreement-real-estate-us',         topic: 'Real Estate Joint Venture Agreement Template USA',           cta: 'docstack' },
  { region: 'united-states',    slug: 'sec-crypto-compliance-guide-2025',               topic: 'SEC Crypto Compliance Guide for Token Projects 2025',        cta: 'brai'     },
  { region: 'united-states',    slug: 'reg-d-private-placement-memo',                   topic: 'Regulation D Private Placement Memorandum Guide',            cta: 'docstack' },
  { region: 'united-kingdom',   slug: 'loi-commercial-real-estate-uk',                  topic: 'Commercial Real Estate LOI Template UK',                     cta: 'docstack' },
  { region: 'united-kingdom',   slug: 'fca-crypto-registration-guide-2025',             topic: 'FCA Crypto Registration Guide UK 2025',                      cta: 'brai'     },
  { region: 'united-kingdom',   slug: 'uk-real-estate-jv-agreement',                    topic: 'UK Joint Venture Agreement Real Estate Legal Guide',         cta: 'docstack' },
  { region: 'singapore',        slug: 'capital-call-agreement-singapore',               topic: 'Capital Call Agreement Singapore: Legal Guide',              cta: 'docstack' },
  { region: 'singapore',        slug: 'mas-crypto-license-requirements-2025',           topic: 'MAS Crypto License Requirements Singapore 2025',             cta: 'brai'     },
  { region: 'singapore',        slug: 'singapore-real-estate-investment-guide',         topic: 'Singapore Real Estate Investment Legal Guide for Foreigners', cta: 'docstack' },
  { region: 'canada',           slug: 'joint-venture-agreement-real-estate-canada',     topic: 'Joint Venture Agreement Real Estate Canada Legal Guide',     cta: 'docstack' },
  { region: 'canada',           slug: 'csa-crypto-compliance-canada-2025',              topic: 'CSA Crypto Compliance Requirements Canada 2025',             cta: 'brai'     },
]

function buildPrompt(topic: string, region: string): string {
  const regionLabels: Record<string,string> = {
    'uae': 'UAE / DIFC (VARA regulated)',
    'european-union': 'European Union (MiCA / ESMA)',
    'united-states': 'United States (SEC / CFTC / Delaware)',
    'united-kingdom': 'United Kingdom (FCA)',
    'singapore': 'Singapore (MAS / PS Act)',
    'canada': 'Canada (CSA / FINTRAC)',
  }
  return `You are a senior legal content writer for BizLegal AI. Write a professional SEO guide on: "${topic}" for ${regionLabels[region] ?? region}.

OUTPUT (no markdown fences):
TITLE: [max 65 chars]
META: [max 155 chars]
H1: [H1 heading]
KEYWORDS: [6-8 comma-separated keywords]
CONTENT:
<h2>Introduction</h2>
<p>[2-3 sentence intro with jurisdiction specifics]</p>
<h2>[Relevant section]</h2>
<p>[substantive content with regulatory references]</p>
<ul><li>[point]</li><li>[point]</li><li>[point]</li></ul>
<h2>Key Legal Requirements</h2>
<p>[specific requirements with article/rule references]</p>
<h2>Step-by-Step Process</h2>
<ul><li>[step 1]</li><li>[step 2]</li><li>[step 3]</li><li>[step 4]</li></ul>
<h2>Common Mistakes to Avoid</h2>
<p>[practical pitfalls]</p>
<h2>FAQ</h2>
<h3>[Question 1]</h3><p>[2-sentence answer]</p>
<h3>[Question 2]</h3><p>[2-sentence answer]</p>
<h3>[Question 3]</h3><p>[2-sentence answer]</p>`
}

async function main() {
  const batchSize = parseInt(process.argv[2] ?? '5')
  const startFrom = parseInt(process.argv[3] ?? '0')
  const batch = TOPICS.slice(startFrom, startFrom + batchSize)

  console.log(`\n🚀 BizLegal AI SEO Generator — ${batch.length} pages\n`)

  let ok = 0, skip = 0, fail = 0

  for (const [i, t] of batch.entries()) {
    const slug = `guides/${t.region}/${t.slug}`
    process.stdout.write(`[${i+1}/${batch.length}] ${t.topic.slice(0,50)}... `)

    // Skip if exists
    const { data: ex } = await sb.from('seo_pages').select('slug').eq('slug', slug).single()
    if (ex) { console.log('⏭ skip'); skip++; continue }

    try {
      const res = await anthropic.messages.create({
        model: 'claude-opus-4-5',
        max_tokens: 2000,
        messages: [{ role: 'user', content: buildPrompt(t.topic, t.region) }],
      })
      const text = res.content[0].type === 'text' ? res.content[0].text : ''

      const get = (key: string) => {
        const m = text.match(new RegExp(`${key}:\\s*(.+?)(?=\\n[A-Z]+:|$)`, 's'))
        return m ? m[1].trim() : ''
      }
      const contentMatch = text.match(/CONTENT:\s*([\s\S]+)/)

      const row = {
        slug,
        title: get('TITLE') || t.topic,
        meta: get('META'),
        meta_desc: get('META'),
        h1: get('H1') || t.topic,
        content: { html: contentMatch ? contentMatch[1].trim() : text },
        cta: t.cta,
        cta_type: t.cta,
        jurisdiction: t.region,
        topic: t.topic,
        keywords: get('KEYWORDS').split(',').map((k:string) => k.trim()).filter(Boolean),
        page_type: 'guide',
        published: true,
        deployed: true,
      }

      const { error } = await sb.from('seo_pages').insert(row)
      if (error) { console.log(`✗ ${error.message}`); fail++ }
      else { console.log('✓'); ok++ }

      await new Promise(r => setTimeout(r, 800))
    } catch(e: any) {
      console.log(`✗ ${e.message}`); fail++
    }
  }

  console.log(`\n✅ Done: ${ok} published · ${skip} skipped · ${fail} failed`)
  console.log(`Total topics available: ${TOPICS.length}`)
}

main().catch(console.error)

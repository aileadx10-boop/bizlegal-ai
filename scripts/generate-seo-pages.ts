// scripts/generate-seo-pages.ts
// 100% automated SEO content generation using Claude AI + Supabase
// Usage: npx tsx scripts/generate-seo-pages.ts [batchSize=10] [offset=0]

import Anthropic from '@anthropic-ai/sdk'
import { createClient } from '@supabase/supabase-js'

const ai = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
const sb = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_KEY!
)

// ─── TOPIC SEED LIST (150+ unique pages) ──────────────────────
// Each entry will produce one unique SEO guide page.
// Covers: UAE, EU, US, Singapore, UK, Canada
// Topics: real estate, crypto/DeFi, corporate, compliance, fintech

const TOPIC_SEEDS: {
  region: string
  slug: string
  topic: string
  cta_type: 'docstack' | 'brai' | 'tracr'
  keywords: string[]
}[] = [
  // ── UAE ──────────────────────────────────────────────────────
  { region: 'uae', slug: 'shareholders-agreement-uae', topic: 'corporate', cta_type: 'docstack', keywords: ['shareholders agreement UAE', 'equity agreement Dubai', 'share purchase DIFC'] },
  { region: 'uae', slug: 'founders-agreement-startup-uae', topic: 'corporate', cta_type: 'docstack', keywords: ['founders agreement UAE', 'co-founder contract Dubai', 'startup equity UAE'] },
  { region: 'uae', slug: 'term-sheet-venture-capital-uae', topic: 'investment', cta_type: 'docstack', keywords: ['term sheet UAE', 'VC investment UAE', 'venture capital DIFC'] },
  { region: 'uae', slug: 'convertible-note-agreement-uae', topic: 'investment', cta_type: 'docstack', keywords: ['convertible note UAE', 'SAFE agreement UAE', 'startup funding Dubai'] },
  { region: 'uae', slug: 'vara-compliance-guide-uae', topic: 'crypto', cta_type: 'brai', keywords: ['VARA compliance UAE', 'VARA license Dubai', 'virtual asset regulation UAE'] },
  { region: 'uae', slug: 'vara-mvl-license-guide-uae', topic: 'crypto', cta_type: 'brai', keywords: ['VARA MVL license', 'minimum viable license UAE', 'crypto license UAE 2024'] },
  { region: 'uae', slug: 'dfsa-fintech-license-uae', topic: 'fintech', cta_type: 'brai', keywords: ['DFSA license UAE', 'DIFC fintech license', 'fintech regulation UAE'] },
  { region: 'uae', slug: 'free-zone-company-formation-uae', topic: 'corporate', cta_type: 'docstack', keywords: ['free zone UAE', 'DIFC company setup', 'ADGM registration UAE'] },
  { region: 'uae', slug: 'commercial-lease-agreement-uae', topic: 'real-estate', cta_type: 'docstack', keywords: ['commercial lease UAE', 'office lease Dubai', 'RERA lease agreement'] },
  { region: 'uae', slug: 'escrow-agreement-real-estate-uae', topic: 'real-estate', cta_type: 'docstack', keywords: ['escrow agreement UAE', 'real estate escrow Dubai', 'RERA escrow UAE'] },
  { region: 'uae', slug: 'aml-kyc-policy-uae', topic: 'compliance', cta_type: 'brai', keywords: ['AML policy UAE', 'KYC compliance UAE', 'anti-money laundering UAE'] },
  { region: 'uae', slug: 'token-launch-legal-checklist-uae', topic: 'crypto', cta_type: 'brai', keywords: ['token launch UAE', 'ICO legal UAE', 'token offering VARA'] },
  { region: 'uae', slug: 'employment-contract-uae', topic: 'employment', cta_type: 'docstack', keywords: ['employment contract UAE', 'labor contract Dubai', 'work agreement UAE'] },
  { region: 'uae', slug: 'ip-assignment-agreement-uae', topic: 'ip', cta_type: 'docstack', keywords: ['IP assignment UAE', 'intellectual property transfer Dubai', 'patent assignment UAE'] },
  { region: 'uae', slug: 'crypto-wallet-tracing-uae', topic: 'forensics', cta_type: 'tracr', keywords: ['crypto tracing UAE', 'blockchain forensics Dubai', 'wallet investigation UAE'] },
  { region: 'uae', slug: 'defi-protocol-compliance-uae', topic: 'crypto', cta_type: 'brai', keywords: ['DeFi compliance UAE', 'decentralized finance VARA', 'DeFi regulation Dubai'] },
  { region: 'uae', slug: 'real-estate-jv-difc-law', topic: 'real-estate', cta_type: 'docstack', keywords: ['DIFC JV agreement', 'joint venture real estate DIFC', 'property JV Dubai'] },
  { region: 'uae', slug: 'service-agreement-uae', topic: 'corporate', cta_type: 'docstack', keywords: ['service agreement UAE', 'consultancy contract Dubai', 'professional services UAE'] },
  { region: 'uae', slug: 'investment-management-agreement-uae', topic: 'investment', cta_type: 'docstack', keywords: ['investment management UAE', 'asset management agreement Dubai', 'fund manager contract UAE'] },
  { region: 'uae', slug: 'nft-marketplace-legal-guide-uae', topic: 'crypto', cta_type: 'brai', keywords: ['NFT marketplace UAE', 'NFT regulation Dubai', 'digital art legal UAE'] },

  // ── EUROPEAN UNION ───────────────────────────────────────────
  { region: 'european-union', slug: 'mica-casp-license-guide-eu', topic: 'crypto', cta_type: 'brai', keywords: ['MiCA CASP license', 'crypto asset service provider EU', 'MiCA regulation 2024'] },
  { region: 'european-union', slug: 'mica-whitepaper-requirements-eu', topic: 'crypto', cta_type: 'docstack', keywords: ['MiCA whitepaper', 'crypto whitepaper EU', 'MiCA token offering'] },
  { region: 'european-union', slug: 'gdpr-compliance-startup-eu', topic: 'compliance', cta_type: 'brai', keywords: ['GDPR compliance startup', 'data protection EU', 'GDPR policy template'] },
  { region: 'european-union', slug: 'shareholders-agreement-eu', topic: 'corporate', cta_type: 'docstack', keywords: ['shareholders agreement EU', 'equity agreement Europe', 'share agreement Germany France'] },
  { region: 'european-union', slug: 'esma-token-classification-guide', topic: 'crypto', cta_type: 'brai', keywords: ['ESMA token classification', 'security token EU', 'e-money token MiCA'] },
  { region: 'european-union', slug: 'aml-6amld-compliance-eu', topic: 'compliance', cta_type: 'brai', keywords: ['6AMLD compliance', 'AML EU directive', 'anti-money laundering Europe'] },
  { region: 'european-union', slug: 'joint-venture-agreement-eu', topic: 'corporate', cta_type: 'docstack', keywords: ['joint venture EU', 'JV agreement Europe', 'partnership agreement EU law'] },
  { region: 'european-union', slug: 'commercial-real-estate-lease-eu', topic: 'real-estate', cta_type: 'docstack', keywords: ['commercial lease EU', 'office lease Europe', 'real estate contract EU'] },
  { region: 'european-union', slug: 'dora-fintech-compliance-eu', topic: 'fintech', cta_type: 'brai', keywords: ['DORA compliance', 'digital operational resilience EU', 'fintech regulation Europe'] },
  { region: 'european-union', slug: 'nda-investment-agreement-eu', topic: 'corporate', cta_type: 'docstack', keywords: ['NDA EU', 'non-disclosure agreement Europe', 'confidentiality agreement EU law'] },
  { region: 'european-union', slug: 'convertible-note-eu-startup', topic: 'investment', cta_type: 'docstack', keywords: ['convertible note EU', 'SAFE Europe', 'startup investment EU'] },
  { region: 'european-union', slug: 'defi-regulation-guide-eu', topic: 'crypto', cta_type: 'brai', keywords: ['DeFi regulation EU', 'decentralized finance MiCA', 'DeFi compliance Europe'] },
  { region: 'european-union', slug: 'fund-passport-aifmd-eu', topic: 'investment', cta_type: 'docstack', keywords: ['AIFMD passport EU', 'alternative investment fund EU', 'fund license Europe'] },
  { region: 'european-union', slug: 'employment-contract-eu', topic: 'employment', cta_type: 'docstack', keywords: ['employment contract EU', 'labor agreement Europe', 'work contract EU law'] },
  { region: 'european-union', slug: 'ip-protection-trademark-eu', topic: 'ip', cta_type: 'docstack', keywords: ['EU trademark', 'EUIPO registration', 'intellectual property Europe'] },
  { region: 'european-union', slug: 'stablecoin-emi-token-guide-eu', topic: 'crypto', cta_type: 'brai', keywords: ['stablecoin EU', 'e-money token MiCA', 'EMT regulation Europe'] },
  { region: 'european-union', slug: 'crypto-exchange-registration-eu', topic: 'crypto', cta_type: 'brai', keywords: ['crypto exchange EU', 'CASP registration MiCA', 'exchange license Europe'] },
  { region: 'european-union', slug: 'real-estate-investment-trust-eu', topic: 'real-estate', cta_type: 'docstack', keywords: ['REIT EU', 'real estate investment trust Europe', 'property fund EU'] },
  { region: 'european-union', slug: 'blockchain-forensics-eu', topic: 'forensics', cta_type: 'tracr', keywords: ['blockchain forensics EU', 'crypto tracing Europe', 'wallet investigation EU'] },
  { region: 'european-union', slug: 'term-sheet-vc-eu', topic: 'investment', cta_type: 'docstack', keywords: ['term sheet EU', 'VC investment Europe', 'venture capital agreement EU'] },

  // ── UNITED STATES ────────────────────────────────────────────
  { region: 'united-states', slug: 'reg-d-506b-offering-us', topic: 'investment', cta_type: 'docstack', keywords: ['Reg D 506b', 'private placement US', 'accredited investor offering'] },
  { region: 'united-states', slug: 'reg-d-506c-offering-us', topic: 'investment', cta_type: 'docstack', keywords: ['Reg D 506c', 'general solicitation SEC', 'accredited investor 506c'] },
  { region: 'united-states', slug: 'sec-howey-test-guide', topic: 'crypto', cta_type: 'brai', keywords: ['Howey test', 'SEC security token', 'is my token a security'] },
  { region: 'united-states', slug: 'delaware-llc-operating-agreement', topic: 'corporate', cta_type: 'docstack', keywords: ['Delaware LLC', 'operating agreement Delaware', 'single member LLC'] },
  { region: 'united-states', slug: 'private-placement-memorandum-us', topic: 'investment', cta_type: 'docstack', keywords: ['PPM US', 'private placement memorandum', 'offering memorandum SEC'] },
  { region: 'united-states', slug: 'safe-note-agreement-us', topic: 'investment', cta_type: 'docstack', keywords: ['SAFE note', 'Y Combinator SAFE', 'startup investment SAFE'] },
  { region: 'united-states', slug: 'sec-crypto-compliance-guide', topic: 'crypto', cta_type: 'brai', keywords: ['SEC crypto compliance', 'crypto regulation US', 'SEC digital assets'] },
  { region: 'united-states', slug: 'cftc-commodity-token-guide', topic: 'crypto', cta_type: 'brai', keywords: ['CFTC commodity token', 'crypto derivatives US', 'CFTC digital assets'] },
  { region: 'united-states', slug: 'nda-startup-california-us', topic: 'corporate', cta_type: 'docstack', keywords: ['NDA California', 'non-disclosure startup US', 'California NDA template'] },
  { region: 'united-states', slug: 'commercial-real-estate-loi-us', topic: 'real-estate', cta_type: 'docstack', keywords: ['LOI commercial real estate', 'letter of intent property US', 'commercial real estate LOI'] },
  { region: 'united-states', slug: 'shareholders-agreement-c-corp-us', topic: 'corporate', cta_type: 'docstack', keywords: ['shareholders agreement C-Corp', 'Delaware corporation equity', 'startup shareholders US'] },
  { region: 'united-states', slug: 'finra-broker-dealer-guide', topic: 'fintech', cta_type: 'brai', keywords: ['FINRA broker dealer', 'broker dealer registration US', 'securities dealer license'] },
  { region: 'united-states', slug: 'aml-bsa-compliance-us', topic: 'compliance', cta_type: 'brai', keywords: ['BSA compliance US', 'Bank Secrecy Act', 'AML program US fintech'] },
  { region: 'united-states', slug: 'fincen-msb-registration', topic: 'fintech', cta_type: 'brai', keywords: ['FinCEN MSB', 'money services business registration', 'MSB compliance US'] },
  { region: 'united-states', slug: 'crypto-wallet-forensics-us', topic: 'forensics', cta_type: 'tracr', keywords: ['crypto forensics US', 'blockchain investigation SEC', 'wallet tracing court US'] },
  { region: 'united-states', slug: 'employment-agreement-startup-us', topic: 'employment', cta_type: 'docstack', keywords: ['employment agreement startup US', 'offer letter US', 'at-will employment contract'] },
  { region: 'united-states', slug: 'ip-assignment-startup-us', topic: 'ip', cta_type: 'docstack', keywords: ['IP assignment startup', 'intellectual property agreement US', 'patent assignment startup'] },
  { region: 'united-states', slug: 'venture-debt-term-sheet-us', topic: 'investment', cta_type: 'docstack', keywords: ['venture debt US', 'debt financing startup', 'venture lending term sheet'] },
  { region: 'united-states', slug: 'real-estate-limited-partnership-us', topic: 'real-estate', cta_type: 'docstack', keywords: ['real estate limited partnership', 'LP agreement property US', 'real estate fund structure'] },
  { region: 'united-states', slug: 'token-sale-regulation-guide-us', topic: 'crypto', cta_type: 'brai', keywords: ['token sale US', 'ICO regulation US', 'token offering SEC'] },

  // ── SINGAPORE ────────────────────────────────────────────────
  { region: 'singapore', slug: 'mas-dpt-license-guide-sg', topic: 'crypto', cta_type: 'brai', keywords: ['MAS DPT license', 'digital payment token Singapore', 'crypto license MAS 2024'] },
  { region: 'singapore', slug: 'payment-services-act-guide-sg', topic: 'fintech', cta_type: 'brai', keywords: ['Payment Services Act Singapore', 'PSA license MAS', 'payment institution Singapore'] },
  { region: 'singapore', slug: 'shareholders-agreement-singapore', topic: 'corporate', cta_type: 'docstack', keywords: ['shareholders agreement Singapore', 'equity agreement SG', 'ACRA company Singapore'] },
  { region: 'singapore', slug: 'private-limited-company-sg', topic: 'corporate', cta_type: 'docstack', keywords: ['private limited company Singapore', 'Pte Ltd Singapore', 'company incorporation SG'] },
  { region: 'singapore', slug: 'nda-singapore-law', topic: 'corporate', cta_type: 'docstack', keywords: ['NDA Singapore', 'non-disclosure agreement Singapore law', 'confidentiality SG'] },
  { region: 'singapore', slug: 'joint-venture-agreement-singapore', topic: 'corporate', cta_type: 'docstack', keywords: ['joint venture Singapore', 'JV agreement SG', 'partnership Singapore law'] },
  { region: 'singapore', slug: 'real-estate-sale-purchase-sg', topic: 'real-estate', cta_type: 'docstack', keywords: ['sale purchase agreement Singapore', 'property SPA Singapore', 'HDB conveyancing'] },
  { region: 'singapore', slug: 'variable-capital-company-sg', topic: 'investment', cta_type: 'docstack', keywords: ['VCC Singapore', 'variable capital company MAS', 'fund structure Singapore'] },
  { region: 'singapore', slug: 'aml-compliance-mas-sg', topic: 'compliance', cta_type: 'brai', keywords: ['MAS AML compliance', 'anti-money laundering Singapore', 'MAS notice 626'] },
  { region: 'singapore', slug: 'employment-act-contract-sg', topic: 'employment', cta_type: 'docstack', keywords: ['employment act Singapore', 'work contract SG', 'Employment Act 2023'] },
  { region: 'singapore', slug: 'ip-protection-ipos-sg', topic: 'ip', cta_type: 'docstack', keywords: ['IPOS trademark Singapore', 'IP registration SG', 'patent Singapore IPOS'] },
  { region: 'singapore', slug: 'crypto-otc-trading-compliance-sg', topic: 'crypto', cta_type: 'brai', keywords: ['crypto OTC Singapore', 'digital token OTC MAS', 'over-the-counter crypto SG'] },
  { region: 'singapore', slug: 'token-offering-prospectus-sg', topic: 'crypto', cta_type: 'docstack', keywords: ['token offering Singapore', 'digital token prospectus MAS', 'STO Singapore'] },
  { region: 'singapore', slug: 'blockchain-forensics-singapore', topic: 'forensics', cta_type: 'tracr', keywords: ['blockchain forensics Singapore', 'crypto tracing MAS', 'wallet investigation SG'] },
  { region: 'singapore', slug: 'family-office-mas-singapore', topic: 'investment', cta_type: 'docstack', keywords: ['family office Singapore', 'MAS family office', 'Section 13O Singapore'] },
  { region: 'singapore', slug: 'commercial-lease-agreement-sg', topic: 'real-estate', cta_type: 'docstack', keywords: ['commercial lease Singapore', 'office lease SG', 'shop lease Singapore'] },
  { region: 'singapore', slug: 'convertible-note-startup-sg', topic: 'investment', cta_type: 'docstack', keywords: ['convertible note Singapore', 'startup SAFE SG', 'angel investment Singapore'] },
  { region: 'singapore', slug: 'franchise-agreement-singapore', topic: 'corporate', cta_type: 'docstack', keywords: ['franchise agreement Singapore', 'franchising SG law', 'franchise contract MAS'] },
  { region: 'singapore', slug: 'defi-protocol-mas-guide', topic: 'crypto', cta_type: 'brai', keywords: ['DeFi Singapore MAS', 'decentralized finance SG', 'DeFi regulation MAS 2024'] },
  { region: 'singapore', slug: 'nft-legal-guide-singapore', topic: 'crypto', cta_type: 'brai', keywords: ['NFT Singapore', 'NFT regulation MAS', 'non-fungible token SG'] },

  // ── UNITED KINGDOM ───────────────────────────────────────────
  { region: 'united-kingdom', slug: 'fca-cryptoasset-registration', topic: 'crypto', cta_type: 'brai', keywords: ['FCA cryptoasset registration', 'crypto AML registration UK', 'FCA crypto 2024'] },
  { region: 'united-kingdom', slug: 'fca-financial-promotion-crypto', topic: 'crypto', cta_type: 'brai', keywords: ['FCA financial promotion', 'crypto promotion UK', 'FCA marketing rules crypto'] },
  { region: 'united-kingdom', slug: 'shareholders-agreement-uk', topic: 'corporate', cta_type: 'docstack', keywords: ['shareholders agreement UK', 'equity agreement England', 'Companies Act shareholders UK'] },
  { region: 'united-kingdom', slug: 'articles-of-association-uk', topic: 'corporate', cta_type: 'docstack', keywords: ['articles of association UK', 'Companies House UK', 'limited company UK'] },
  { region: 'united-kingdom', slug: 'nda-uk-law', topic: 'corporate', cta_type: 'docstack', keywords: ['NDA UK', 'non-disclosure agreement England', 'confidentiality agreement UK law'] },
  { region: 'united-kingdom', slug: 'commercial-property-lease-uk', topic: 'real-estate', cta_type: 'docstack', keywords: ['commercial property lease UK', 'office lease England', 'RICS lease UK'] },
  { region: 'united-kingdom', slug: 'eis-seis-investment-agreement', topic: 'investment', cta_type: 'docstack', keywords: ['EIS investment UK', 'SEIS agreement UK', 'enterprise investment scheme'] },
  { region: 'united-kingdom', slug: 'aml-mlr-compliance-uk', topic: 'compliance', cta_type: 'brai', keywords: ['MLR compliance UK', 'Money Laundering Regulations UK', 'AML FCA UK'] },
  { region: 'united-kingdom', slug: 'employment-contract-uk', topic: 'employment', cta_type: 'docstack', keywords: ['employment contract UK', 'work agreement England', 'Employment Rights Act UK'] },
  { region: 'united-kingdom', slug: 'ip-trademark-uk', topic: 'ip', cta_type: 'docstack', keywords: ['UK trademark', 'UKIPO registration', 'trademark after Brexit UK'] },
  { region: 'united-kingdom', slug: 'convertible-loan-note-uk', topic: 'investment', cta_type: 'docstack', keywords: ['convertible loan note UK', 'CLN startup UK', 'convertible debt England'] },
  { region: 'united-kingdom', slug: 'seed-round-term-sheet-uk', topic: 'investment', cta_type: 'docstack', keywords: ['seed round UK', 'term sheet England', 'startup investment UK'] },
  { region: 'united-kingdom', slug: 'crypto-exchange-fca-uk', topic: 'crypto', cta_type: 'brai', keywords: ['crypto exchange FCA', 'UK crypto exchange registration', 'FCA digital asset firm'] },
  { region: 'united-kingdom', slug: 'blockchain-investigation-uk', topic: 'forensics', cta_type: 'tracr', keywords: ['blockchain investigation UK', 'crypto forensics FCA', 'wallet tracing UK court'] },
  { region: 'united-kingdom', slug: 'real-estate-jv-uk', topic: 'real-estate', cta_type: 'docstack', keywords: ['real estate JV UK', 'joint venture property England', 'property development JV UK'] },
  { region: 'united-kingdom', slug: 'service-level-agreement-uk', topic: 'corporate', cta_type: 'docstack', keywords: ['SLA UK', 'service level agreement England', 'IT services agreement UK'] },
  { region: 'united-kingdom', slug: 'defi-regulation-guide-uk', topic: 'crypto', cta_type: 'brai', keywords: ['DeFi UK regulation', 'decentralized finance FCA', 'DeFi compliance UK 2024'] },
  { region: 'united-kingdom', slug: 'vct-investment-agreement-uk', topic: 'investment', cta_type: 'docstack', keywords: ['VCT UK', 'venture capital trust', 'VCT investment agreement'] },
  { region: 'united-kingdom', slug: 'data-protection-gdpr-uk', topic: 'compliance', cta_type: 'brai', keywords: ['UK GDPR', 'data protection UK', 'ICO compliance UK GDPR'] },
  { region: 'united-kingdom', slug: 'nft-regulation-guide-uk', topic: 'crypto', cta_type: 'brai', keywords: ['NFT UK regulation', 'non-fungible token FCA', 'NFT legal guide UK'] },

  // ── CANADA ───────────────────────────────────────────────────
  { region: 'canada', slug: 'csa-crypto-dealer-guide', topic: 'crypto', cta_type: 'brai', keywords: ['CSA crypto dealer', 'crypto asset dealer Canada', 'OSC crypto registration'] },
  { region: 'canada', slug: 'fintrac-msb-registration-guide', topic: 'fintech', cta_type: 'brai', keywords: ['FINTRAC MSB Canada', 'money services business Canada', 'FINTRAC registration 2024'] },
  { region: 'canada', slug: 'shareholders-agreement-canada', topic: 'corporate', cta_type: 'docstack', keywords: ['shareholders agreement Canada', 'equity agreement Ontario', 'CBCA shareholders'] },
  { region: 'canada', slug: 'nda-ontario-law', topic: 'corporate', cta_type: 'docstack', keywords: ['NDA Ontario', 'non-disclosure agreement Canada', 'confidentiality agreement BC'] },
  { region: 'canada', slug: 'joint-venture-agreement-canada', topic: 'corporate', cta_type: 'docstack', keywords: ['joint venture Canada', 'JV agreement Ontario', 'partnership Canada law'] },
  { region: 'canada', slug: 'real-estate-purchase-agreement-bc', topic: 'real-estate', cta_type: 'docstack', keywords: ['real estate purchase BC', 'property agreement British Columbia', 'home purchase Canada'] },
  { region: 'canada', slug: 'limited-partnership-agreement-canada', topic: 'investment', cta_type: 'docstack', keywords: ['limited partnership Canada', 'LP agreement Ontario', 'fund LP Canada'] },
  { region: 'canada', slug: 'employment-agreement-canada', topic: 'employment', cta_type: 'docstack', keywords: ['employment agreement Canada', 'work contract Ontario', 'ESA employment Canada'] },
  { region: 'canada', slug: 'ip-trademark-cipo-canada', topic: 'ip', cta_type: 'docstack', keywords: ['Canada trademark CIPO', 'trademark registration Canada', 'IP protection Canada'] },
  { region: 'canada', slug: 'aml-fintrac-compliance-canada', topic: 'compliance', cta_type: 'brai', keywords: ['FINTRAC AML Canada', 'anti-money laundering Canada', 'AML compliance Ontario'] },
  { region: 'canada', slug: 'safe-note-canada', topic: 'investment', cta_type: 'docstack', keywords: ['SAFE note Canada', 'convertible note Ontario', 'startup investment Canada'] },
  { region: 'canada', slug: 'seed-round-term-sheet-canada', topic: 'investment', cta_type: 'docstack', keywords: ['term sheet Canada', 'seed round Ontario', 'VC investment Canada'] },
  { region: 'canada', slug: 'osc-exempt-market-dealer', topic: 'investment', cta_type: 'brai', keywords: ['OSC exempt market dealer', 'securities exemption Canada', 'exempt market Ontario'] },
  { region: 'canada', slug: 'bitcoin-etf-compliance-canada', topic: 'crypto', cta_type: 'brai', keywords: ['Bitcoin ETF Canada', 'crypto ETF OSC', 'Purpose Bitcoin ETF compliance'] },
  { region: 'canada', slug: 'blockchain-forensics-canada', topic: 'forensics', cta_type: 'tracr', keywords: ['blockchain forensics Canada', 'crypto tracing FINTRAC', 'wallet investigation Canada'] },
  { region: 'canada', slug: 'commercial-lease-canada', topic: 'real-estate', cta_type: 'docstack', keywords: ['commercial lease Canada', 'office lease Ontario', 'commercial tenancy Canada'] },
  { region: 'canada', slug: 'defi-regulation-guide-canada', topic: 'crypto', cta_type: 'brai', keywords: ['DeFi Canada', 'decentralized finance CSA', 'DeFi regulation Ontario 2024'] },
  { region: 'canada', slug: 'startup-incorporation-guide-canada', topic: 'corporate', cta_type: 'docstack', keywords: ['startup Canada incorporation', 'CBCA corporation', 'federal incorporation Canada'] },
  { region: 'canada', slug: 'nft-platform-legal-canada', topic: 'crypto', cta_type: 'brai', keywords: ['NFT platform Canada', 'NFT regulation OSC', 'digital art marketplace Canada'] },
  { region: 'canada', slug: 'private-placement-exempt-canada', topic: 'investment', cta_type: 'docstack', keywords: ['private placement Canada', 'accredited investor Canada', 'exempt distribution Ontario'] },
]

// ─── CONTENT GENERATOR ────────────────────────────────────────
async function generatePageContent(seed: typeof TOPIC_SEEDS[0]): Promise<{
  title: string
  meta: string
  content: string
}> {
  const regionLabel: Record<string, string> = {
    'uae': 'UAE / DIFC',
    'european-union': 'European Union (MiCA)',
    'united-states': 'United States (SEC/CFTC)',
    'singapore': 'Singapore (MAS)',
    'united-kingdom': 'United Kingdom (FCA)',
    'canada': 'Canada (CSA/FINTRAC)',
  }

  const topicLabel = seed.slug.replace(/-/g, ' ')
  const region = regionLabel[seed.region] ?? seed.region

  const prompt = `You are a legal content expert for BizLegal AI, writing authoritative SEO guides for legal professionals, startup founders, crypto projects, and real estate investors.

Write a comprehensive SEO guide page about: "${topicLabel}" for the jurisdiction: ${region}

Return ONLY valid JSON (no markdown, no code blocks, raw JSON only) with these exact fields:
{
  "title": "SEO page title — 60-70 characters including jurisdiction keyword",
  "meta": "Meta description — 150-160 characters, compelling and keyword-rich",
  "content": "HTML content string using ONLY these tags: <h2>, <h3>, <p>, <ul>, <li>. Minimum 900 words. Structure: (1) What is [topic] in ${region}? (2) Legal Requirements & Regulatory Framework (3) Key Clauses / Requirements (4) Step-by-Step Process (5) Common Mistakes to Avoid (6) FAQ (3-5 questions as h3 + p pairs). Use specific local regulators, laws, and requirements. Be authoritative and specific, not generic."
}

Keywords to naturally include: ${seed.keywords.join(', ')}
Tone: Professional, clear, practical. Written for founders and legal professionals, not a general audience.`

  const msg = await ai.messages.create({
    model: 'claude-sonnet-4-6',
    max_tokens: 4096,
    messages: [{ role: 'user', content: prompt }],
  })

  const raw = msg.content[0].type === 'text' ? msg.content[0].text.trim() : ''

  // Strip any markdown code fences if model adds them
  const cleaned = raw.replace(/^```json\s*/i, '').replace(/```\s*$/i, '').trim()

  let parsed: { title: string; meta: string; content: string }
  try {
    parsed = JSON.parse(cleaned)
  } catch {
    // Last resort: extract JSON object from the response
    const match = cleaned.match(/\{[\s\S]+\}/)
    if (!match) throw new Error(`Failed to parse JSON from Claude response: ${raw.slice(0, 200)}`)
    parsed = JSON.parse(match[0])
  }

  if (!parsed.title || !parsed.meta || !parsed.content) {
    throw new Error(`Missing required fields in response: ${JSON.stringify(Object.keys(parsed))}`)
  }

  return parsed
}

// ─── MAIN ──────────────────────────────────────────────────────
async function main() {
  const batchSize = parseInt(process.argv[2] ?? '10', 10)
  const offset = parseInt(process.argv[3] ?? '0', 10)

  console.log(`\n🚀 BizLegal AI — SEO Content Generator`)
  console.log(`   Batch size: ${batchSize} | Offset: ${offset}`)
  console.log(`   Total seeds available: ${TOPIC_SEEDS.length}\n`)

  // Fetch existing slugs to avoid duplicates
  const { data: existing, error: fetchErr } = await sb
    .from('seo_pages')
    .select('slug')

  if (fetchErr) {
    console.error('❌ Failed to fetch existing slugs:', fetchErr.message)
    process.exit(1)
  }

  const existingSlugs = new Set(existing?.map(r => r.slug) ?? [])
  console.log(`   Existing pages in DB: ${existingSlugs.size}`)

  // Determine pending seeds (not yet generated)
  const pending = TOPIC_SEEDS
    .filter(s => !existingSlugs.has(`${s.region}/${s.slug}`))
    .slice(offset, offset + batchSize)

  if (pending.length === 0) {
    console.log('✅ All seeds have been generated. No new pages needed.')
    return
  }

  console.log(`   Pending to generate: ${pending.length}\n`)

  let successCount = 0
  let failCount = 0

  for (let i = 0; i < pending.length; i++) {
    const seed = pending[i]
    const slug = `${seed.region}/${seed.slug}`
    const progress = `[${i + 1}/${pending.length}]`

    console.log(`${progress} Generating: ${slug}`)

    try {
      const generated = await generatePageContent(seed)

      const { error: insertErr } = await sb.from('seo_pages').insert({
        slug,
        title: generated.title,
        meta: generated.meta,
        content: generated.content,
        cta_type: seed.cta_type,
        jurisdiction: seed.region,
        topic: seed.topic,
        keywords: seed.keywords,
        published: true,
      })

      if (insertErr) throw new Error(insertErr.message)

      console.log(`  ✓ Saved — "${generated.title.slice(0, 60)}..."`)
      successCount++
    } catch (err) {
      console.error(`  ✗ Error: ${err instanceof Error ? err.message : String(err)}`)
      failCount++
    }

    // Respect rate limits: 2s between requests
    if (i < pending.length - 1) {
      await new Promise(r => setTimeout(r, 2000))
    }
  }

  console.log(`\n─────────────────────────────────────────`)
  console.log(`✅ Done — ${successCount} generated, ${failCount} failed`)
  console.log(`   Total pages now in DB: ${existingSlugs.size + successCount}`)
}

main().catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})

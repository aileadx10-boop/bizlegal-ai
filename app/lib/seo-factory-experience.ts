import type { SeoPageRecord } from '@/app/lib/seo-pages'
import type { CtaType } from '@/app/lib/site-content'

type Metric = {
  label: string
  value: string
}

type FeaturePanel = {
  eyebrow: string
  title: string
  body: string
}

type DiagramStep = {
  label: string
  title: string
  body: string
}

export type SeoFactoryExperience = {
  intro: string
  buyerLabel: string
  outcomeLabel: string
  keywordChips: string[]
  signalMetrics: Metric[]
  featurePanels: FeaturePanel[]
  diagramSteps: DiagramStep[]
}

const ctaProfiles: Record<CtaType, { outcome: string; buyer: string; nextAction: string }> = {
  docstack: {
    outcome: 'Template checkout path',
    buyer: 'Founders, deal teams, and counsel',
    nextAction: 'Push qualified buyers from research into a paid template flow with pricing and immediate execution context.',
  },
  brai: {
    outcome: 'Compliance operating path',
    buyer: 'Compliance leads, founders, and legal ops',
    nextAction: 'Move regulated operators into a BRAI workflow with gap analysis, policy mapping, and execution support.',
  },
  tracr: {
    outcome: 'Investigation escalation path',
    buyer: 'Investigations teams, disputes counsel, and asset-recovery operators',
    nextAction: 'Escalate high-risk matters into a premium tracing or investigation brief instead of leaving them in a research loop.',
  },
}

function stripHtml(input: string) {
  return input.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
}

function extractHeadings(html: string) {
  const headings = Array.from(html.matchAll(/<h[23][^>]*>(.*?)<\/h[23]>/gi))
    .map((match) => stripHtml(match[1]))
    .filter(Boolean)

  return headings.slice(0, 4)
}

function formatFreshness(updatedAt?: string) {
  if (!updatedAt) return 'Fresh'
  const updated = new Date(updatedAt)
  if (Number.isNaN(updated.getTime())) return 'Fresh'
  const days = Math.floor((Date.now() - updated.getTime()) / (1000 * 60 * 60 * 24))
  if (days <= 14) return 'Fresh'
  if (days <= 45) return 'Current'
  return 'Review soon'
}

export function buildSeoFactoryExperience(page: SeoPageRecord): SeoFactoryExperience {
  const profile = ctaProfiles[page.cta_type]
  const headings = extractHeadings(page.content)
  const fallbackKeywords = [page.topic || page.title, page.jurisdiction, page.cta_type]
  const keywordChips = Array.from(new Set([...page.keywords, ...fallbackKeywords])).filter(Boolean).slice(0, 5)
  const wordCount = page.word_count || stripHtml(page.content).split(/\s+/).filter(Boolean).length
  const leadingHeading = headings[0] || 'Practical legal overview'
  const middleHeading = headings[1] || 'Execution roadmap'

  return {
    intro: `This page behaves like a dynamic SEO asset for ${page.jurisdiction}, capturing commercial search demand around ${keywordChips[0]} and routing qualified visitors into ${profile.outcome.toLowerCase()}.`,
    buyerLabel: profile.buyer,
    outcomeLabel: profile.outcome,
    keywordChips,
    signalMetrics: [
      { label: 'Keyword cluster', value: String(keywordChips.length) },
      { label: 'Reading depth', value: `${page.reading_time} min` },
      { label: 'Content depth', value: `${wordCount} words` },
      { label: 'Freshness', value: formatFreshness(page.updated_at) },
    ],
    featurePanels: [
      {
        eyebrow: 'Intent capture',
        title: `${page.jurisdiction} demand mapped to a buyer journey`,
        body: `The page is built around commercial-intent search phrases like ${keywordChips.slice(0, 2).join(' and ')} so the visit starts with strong audience fit.`,
      },
      {
        eyebrow: 'Authority design',
        title: leadingHeading,
        body: 'Section structure, schema, and update metadata make the article read like an operating brief rather than a generic content page.',
      },
      {
        eyebrow: 'Conversion layer',
        title: profile.outcome,
        body: profile.nextAction,
      },
      {
        eyebrow: 'Trust layer',
        title: 'Security and legal boundaries stay visible',
        body: 'FAQ, disclaimer, privacy, and security routes stay connected to the page so buyers can validate the platform without losing momentum.',
      },
    ],
    diagramSteps: [
      {
        label: '01 Search',
        title: keywordChips[0] || page.title,
        body: `Search traffic lands on a jurisdiction-aware asset tuned for ${page.jurisdiction}.`,
      },
      {
        label: '02 Qualify',
        title: leadingHeading,
        body: 'The guide filters casual readers out and keeps serious buyers engaged with practical legal framing.',
      },
      {
        label: '03 Route',
        title: middleHeading,
        body: `${profile.buyer} are shown a matched product path instead of a dead-end article experience.`,
      },
      {
        label: '04 Convert',
        title: profile.outcome,
        body: profile.nextAction,
      },
    ],
  }
}
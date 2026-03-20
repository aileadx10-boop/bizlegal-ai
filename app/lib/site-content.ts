export const baseUrl = 'https://www.bizlegal-ai.com'
export const seoFactorySchedule = 'Monday, Wednesday, Friday'

export type CtaType = 'docstack' | 'brai' | 'tracr'

export type FeaturedGuide = {
  title: string
  href: string
  region: string
  ctaType: CtaType
  summary: string
}

export const productLinks = {
  docstack: 'https://docstack.bizlegal-ai.com',
  brai: 'https://brai.bizlegal-ai.com',
  tracr: 'https://tracr.bizlegal-ai.com',
} as const

export const navigationLinks = [
  { label: 'Products', href: '/#products' },
  { label: 'Intelligence Hub', href: '/posts' },
  { label: 'Security', href: '/security' },
  { label: 'FAQ', href: '/faq' },
] as const

export const trustMetrics = [
  { value: '10', label: 'Pages per SEO run' },
  { value: '3x', label: 'Publishing cadence each week' },
  { value: '8+', label: 'Jurisdictions in the hub' },
  { value: '60s', label: 'Fastest template turnaround' },
] as const

export const productCards = [
  {
    eyebrow: 'Revenue engine',
    name: 'DocStack',
    description:
      'Package buyer intent into premium legal templates for transactions, diligence, and deal execution.',
    points: [
      'Lawyer-grade templates tuned for cross-border deals and real estate operators.',
      'Fast conversion path from intelligence page to paid document checkout.',
      'Clear pricing and productized delivery for founder, investor, and counsel use cases.',
    ],
    href: productLinks.docstack,
    ctaLabel: 'Open DocStack',
  },
  {
    eyebrow: 'Compliance intelligence',
    name: 'BRAI',
    description:
      'Monitor regulatory pressure across VARA, MiCA, SEC, MAS, and adjacent frameworks without drowning in PDFs.',
    points: [
      'Route high-intent compliance traffic into scans, assessments, and paid advisory workflows.',
      'Turn each guide into an operational next step with industry-specific calls to action.',
      'Pair research pages with a premium SaaS narrative instead of a generic legal blog.',
    ],
    href: productLinks.brai,
    ctaLabel: 'Launch BRAI',
  },
  {
    eyebrow: 'Investigations',
    name: 'TRACR',
    description:
      'Position forensic investigations, wallet tracing, and litigation support as a premium service lane.',
    points: [
      'Designed for disputes, asset tracing, enforcement teams, and fraud response programs.',
      'Supports a court-ready deliverable story instead of a vague consulting promise.',
      'Creates a third monetization surface alongside templates and compliance workflows.',
    ],
    href: productLinks.tracr,
    ctaLabel: 'Explore TRACR',
  },
  {
    eyebrow: 'SEO factory',
    name: 'Intelligence Hub',
    description:
      'Publish 10 productized SEO pages three times a week and route every article into a commercial workflow.',
    points: [
      'Blog and posts feed designed as a premium intelligence product, not a content warehouse.',
      'Every page carries a matched CTA, schema, internal links, and conversion framing.',
      'Built to compound search demand into templates, scans, and investigation requests.',
    ],
    href: '/posts',
    ctaLabel: 'Browse Posts',
  },
] as const

export const workflowSteps = [
  {
    step: '01',
    title: 'Capture intent',
    body:
      'Search-ready legal pages target buyers looking for templates, regulatory guidance, and due diligence answers.',
  },
  {
    step: '02',
    title: 'Qualify with intelligence',
    body:
      'Every page turns research into a concrete next move with product context, timeline cues, and CTA alignment.',
  },
  {
    step: '03',
    title: 'Convert into product',
    body:
      'Visitors move from guide to paid template, compliance scan, or investigation brief without leaving the ecosystem.',
  },
  {
    step: '04',
    title: 'Compound weekly',
    body:
      'The SEO factory pushes 10 new pages on each scheduled run so the hub keeps expanding while the product story stays consistent.',
  },
] as const

export const insightStreams = [
  {
    title: 'Transactional playbooks',
    body:
      'High-intent template and contract guides mapped to paid DocStack journeys and rapid document delivery.',
  },
  {
    title: 'Regulatory briefings',
    body:
      'Jurisdiction-aware compliance intelligence that sets up BRAI as an always-on operating system.',
  },
  {
    title: 'Investigations and disputes',
    body:
      'Forensic analysis, tracing, and dispute-support narratives that give TRACR a premium service lane.',
  },
] as const

export const securityPillars = [
  {
    title: 'Secure-by-default delivery',
    body:
      'The site is structured around hardened headers, isolated server-side content access, and minimal client-side bloat.',
  },
  {
    title: 'Controlled publishing workflow',
    body:
      'SEO generation now uses a scheduled, idempotent batch process that only publishes missing pages in controlled runs.',
  },
  {
    title: 'Trust-first legal pages',
    body:
      'Privacy, terms, FAQ, security, and disclaimer pages are wired into the product shell so buyers can validate credibility fast.',
  },
  {
    title: 'Revenue with guardrails',
    body:
      'Every CTA is commercial, but the platform now clearly distinguishes templates, intelligence, and non-legal-advice boundaries.',
  },
] as const

export const faqItems = [
  {
    question: 'What does BizLegal AI actually sell?',
    answer:
      'BizLegal AI sells premium legal workflows: paid templates through DocStack, compliance intelligence through BRAI, and investigation-ready deliverables through TRACR.',
  },
  {
    question: 'How often does the SEO factory publish new pages?',
    answer:
      'The publishing workflow is configured for three weekly runs, each creating up to 10 missing SEO pages and pushing them into the intelligence hub.',
  },
  {
    question: 'Are the guides just blog posts?',
    answer:
      'No. Each guide is framed as a productized intelligence asset with matched calls to action, jurisdiction context, and a direct path into a paid workflow.',
  },
  {
    question: 'Is BizLegal AI a law firm?',
    answer:
      'No. The platform provides templates, workflow tooling, and legal intelligence. It does not replace licensed counsel for jurisdiction-specific advice.',
  },
  {
    question: 'How should teams use the platform?',
    answer:
      'Founders, investors, family offices, legal ops teams, and compliance leads can use the hub to research, qualify, and move into execution faster.',
  },
] as const

export const featuredGuides: FeaturedGuide[] = [
  {
    title: 'Share Purchase Agreement UAE',
    href: '/guides/uae/share-purchase-agreement-uae',
    region: 'UAE / DIFC',
    ctaType: 'docstack',
    summary:
      'Structure equity transfers with DIFC-aware drafting cues, diligence requirements, and clear buyer-side checkpoints.',
  },
  {
    title: 'SEC Regulation D Compliance 2025',
    href: '/guides/united-states/sec-regulation-d-compliance',
    region: 'United States',
    ctaType: 'brai',
    summary:
      'Turn regulatory search intent into a paid compliance workflow for capital raising and investor qualification.',
  },
  {
    title: 'MiCA CASP License Requirements',
    href: '/guides/european-union/mica-casp-license-requirements',
    region: 'European Union',
    ctaType: 'brai',
    summary:
      'Give operators and counsel a clean view of licensing stages, regulator expectations, and launch-readiness signals.',
  },
  {
    title: 'MAS DPT License Application',
    href: '/guides/singapore/mas-dpt-license-application',
    region: 'Singapore',
    ctaType: 'brai',
    summary:
      'Package the Singapore licensing journey into a polished research product with concrete operational next steps.',
  },
  {
    title: 'DAO Legal Wrapper Structures',
    href: '/guides/crypto/dao-legal-wrapper-structures',
    region: 'Web3 / Global',
    ctaType: 'docstack',
    summary:
      'Compare entity structures, governance implications, and investor expectations for token and DAO projects.',
  },
  {
    title: 'Cross-Border Real Estate Joint Venture',
    href: '/guides/global/cross-border-real-estate-jv',
    region: 'Global',
    ctaType: 'docstack',
    summary:
      'Bridge multi-jurisdiction deal structuring into a premium buying path for investors and operating partners.',
  },
] as const

export const legalLinks = [
  { label: 'Security', href: '/security' },
  { label: 'FAQ', href: '/faq' },
  { label: 'Privacy', href: '/privacy' },
  { label: 'Terms', href: '/terms' },
  { label: 'Disclaimer', href: '/disclaimer' },
] as const

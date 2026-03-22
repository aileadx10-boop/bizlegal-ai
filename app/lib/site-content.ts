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

export const founderProfile = {
  name: 'DOR INNOVATIONS',
  shortLabel: 'Commercial attorney | Entrepreneur | Digital asset regulatory intelligence',
  heroSummary: 'Founder of DOR INNOVATIONS. AI-assisted crypto risk analysis with UAE focus.',
  shortBio: [
    'Commercial lawyer and entrepreneur.',
    'Founder of DOR INNOVATIONS.',
    'AI-driven regulatory risk intelligence for digital asset ventures.',
  ],
  founderAbout:
    'Founder of BizLegal. Commercial attorney and entrepreneur operating at the intersection of law, innovation, and digital asset markets. Focused on structured regulatory risk intelligence for emerging financial technologies.',
} as const

export const companyProfile = {
  name: 'BizLegal',
  title: 'Boutique Regulatory Intelligence & AI-Driven Risk Analysis',
  summary:
    'BizLegal provides structured regulatory risk intelligence for digital asset ventures operating in complex jurisdictions.',
  detail:
    'Our work focuses on identifying regulatory exposure before it becomes structural liability, enabling founders to scale with clarity and reduced uncertainty.',
} as const

export const navigationLinks = [
  { label: 'About', href: '/about' },
  { label: 'Products', href: '/#products' },
  { label: 'Intelligence Hub', href: '/posts' },
  { label: 'Security', href: '/security' },
  { label: 'FAQ', href: '/faq' },
] as const

export const trustMetrics = [
  { value: 'UAE', label: 'Primary regulatory focus' },
  { value: 'VARA', label: 'Exposure analysis depth' },
  { value: 'ADGM', label: 'Comparative jurisdiction view' },
  { value: 'AI', label: 'Assisted risk intelligence' },
] as const

export const productCards = [
  {
    eyebrow: 'Commercial legal strategy',
    name: 'DocStack',
    description:
      'Commercial attorney-led templates for token launches, venture structuring, and cross-border digital asset execution.',
    points: [
      'Built for founders, operators, and counsel who need practical legal structure without law-firm drag.',
      'Turns regulatory and commercial pain into documentation that can actually be used in a live venture.',
      'Pairs founder clarity with fast, productized delivery for high-friction legal workflows.',
    ],
    href: productLinks.docstack,
    ctaLabel: 'Browse DocStack',
  },
  {
    eyebrow: 'Risk intelligence',
    name: 'BRAI',
    description:
      'AI-assisted regulatory exposure analysis for digital asset ventures navigating UAE, VARA, ADGM, MiCA, SEC, and adjacent frameworks.',
    points: [
      'Built to identify regulatory exposure before launch, fundraising, or market expansion.',
      'Gives founders a structured view of what matters, what is unclear, and where risk is accumulating.',
      'Designed as a premium legaltech instrument rather than a loose collection of compliance notes.',
    ],
    href: productLinks.brai,
    ctaLabel: 'Start BRAI Scan',
  },
  {
    eyebrow: 'Forensic support',
    name: 'TRACR',
    description:
      'Structured crypto risk analysis, forensic tracing, and investigation-ready reporting for high-stakes digital asset matters.',
    points: [
      'Useful when regulatory uncertainty collides with disputes, asset movement, or enforcement pressure.',
      'Supports a more credible escalation path than generic crypto consulting.',
      'Keeps the platform positioned for sophisticated founders, counsel, and recovery teams.',
    ],
    href: productLinks.tracr,
    ctaLabel: 'Explore TRACR',
  },
  {
    eyebrow: 'Intelligence hub',
    name: 'Intelligence Hub',
    description:
      'Founder notes, regulatory briefings, and dynamic research pages designed to reduce uncertainty before it becomes operational drag.',
    points: [
      'Built around high-intent questions digital asset ventures ask before launch or jurisdiction expansion.',
      'Connects research directly to BizLegal products instead of leaving users in a passive blog loop.',
      'Keeps SEO useful, premium, and commercially aligned with the rest of the platform.',
    ],
    href: '/posts',
    ctaLabel: 'Open Intelligence Hub',
  },
] as const

export const workflowSteps = [
  {
    step: '01',
    title: 'Identify exposure',
    body:
      'Start with the specific regulatory pressure facing the venture, not a vague request for generic compliance help.',
  },
  {
    step: '02',
    title: 'Map jurisdiction friction',
    body:
      'Compare UAE, VARA, ADGM, and cross-border pressure points before they harden into structural mistakes.',
  },
  {
    step: '03',
    title: 'Structure the response',
    body:
      'Route the matter into the right product path, whether that means risk analysis, documentation, or forensic support.',
  },
  {
    step: '04',
    title: 'Move with clarity',
    body:
      'Use a tighter decision framework so founders can move faster with less uncertainty and fewer preventable surprises.',
  },
] as const

export const insightStreams = [
  {
    title: 'UAE digital asset intelligence',
    body:
      'Founder-facing guidance on VARA, ADGM, DIFC, and the pressure points that matter before launch.',
  },
  {
    title: 'Cross-border regulatory analysis',
    body:
      'Structured comparisons across complex jurisdictions so expansion decisions are based on exposure, not assumption.',
  },
  {
    title: 'AI-assisted risk assessment',
    body:
      'A legaltech operating layer that helps founders see risk concentration earlier and act before liability compounds.',
  },
] as const

export const companyIntersections = [
  {
    title: 'Commercial legal strategy',
    body: 'Commercial structuring informed by founder reality, transaction pressure, and actual venture execution.',
  },
  {
    title: 'Cross-border regulatory analysis',
    body: 'Comparative exposure mapping across jurisdictions where digital asset ventures face conflicting rules and incentives.',
  },
  {
    title: 'Entrepreneurial execution',
    body: 'Advice shaped by speed, capital constraints, and the practical cost of waiting too long to resolve uncertainty.',
  },
  {
    title: 'AI-assisted risk assessment',
    body: 'A structured intelligence layer that accelerates analysis without collapsing nuance or judgment.',
  },
] as const

export const specializationAreas = [
  {
    title: 'UAE Crypto Regulatory Risk Intelligence',
    body: 'Primary focus on UAE digital asset ventures that need founder-grade clarity before launch, fundraising, or strategic expansion.',
  },
  {
    title: 'VARA & ADGM Exposure Analysis',
    body: 'Detailed attention to jurisdiction fit, licensing pressure, and where exposure is likely to emerge across UAE pathways.',
  },
] as const

export const painPoints = [
  {
    title: 'Regulatory uncertainty before launch',
    body: 'Founders often know there is risk but do not know where it is concentrated or which jurisdiction assumptions are wrong.',
  },
  {
    title: 'Confusion between VARA and ADGM routes',
    body: 'Digital asset ventures need a cleaner view of which UAE path actually fits the model before building around the wrong structure.',
  },
  {
    title: 'Cross-border expansion without a clear exposure map',
    body: 'Growth across jurisdictions creates overlapping obligations that can become structural liability if not analyzed early.',
  },
  {
    title: 'Slow legal work that does not match execution speed',
    body: 'BizLegal is designed to reduce friction, compress analysis time, and move founders toward a clearer next step.',
  },
] as const

export const seoFactoryFeatureCards = [
  {
    eyebrow: 'Autopilot publishing',
    title: '10 dynamic pages per run',
    body:
      'The factory only fills missing slugs, which keeps output controlled while the hub compounds every Monday, Wednesday, and Friday.',
  },
  {
    eyebrow: 'Conversion framing',
    title: 'Every page exits into a product lane',
    body:
      'Search traffic does not end at awareness. Each guide routes into DocStack, BRAI, or TRACR with a visible next action.',
  },
  {
    eyebrow: 'Structured authority',
    title: 'Features, schema, and trust surfaces included',
    body:
      'Dynamic guide pages expose keyword clusters, workflow visuals, FAQ schema, and trust links so they feel like premium product pages.',
  },
  {
    eyebrow: 'Operator controls',
    title: 'Claude-first, Gemini-ready pipeline',
    body:
      'The generator can stay on Claude for legal precision while keeping Gemini available for broader discovery or expansion campaigns.',
  },
] as const

export const seoFactoryFlow = [
  {
    step: 'Data layer',
    title: 'Topic set and jurisdiction map',
    body:
      'Topics, keywords, jurisdictions, and product destinations define the commercial intent before any draft is generated.',
  },
  {
    step: 'Generation',
    title: 'Model creates the first structured asset',
    body:
      'The prompt enforces title, meta, keywords, article sections, and FAQ output so every draft lands in the same premium shell.',
  },
  {
    step: 'Productization',
    title: 'Guide becomes a designed selling surface',
    body:
      'Each post inherits keyword chips, automation panels, workflow diagrams, and CTA alignment instead of publishing as plain text.',
  },
  {
    step: 'Revenue loop',
    title: 'Traffic flows into products and trust pages',
    body:
      'The experience keeps buyers inside one ecosystem where trust, product, and research reinforce each other.',
  },
] as const

export const providerChoices = [
  {
    name: 'Claude default',
    description:
      'Best fit for legal, compliance, and risk-heavy pages where disciplined structure, restraint, and premium tone matter most.',
  },
  {
    name: 'Gemini optional',
    description:
      'Useful for long-context expansion, broader discovery sweeps, and high-volume experiments when you want a second generation lane.',
  },
] as const

export const securityPillars = [
  {
    title: 'Secure-by-default delivery',
    body:
      'The platform pairs a premium frontend shell with hardened defaults, isolated content access, and minimal client-side bloat.',
  },
  {
    title: 'Controlled publishing workflow',
    body:
      'Publishing is structured, scheduled, and intentionally controlled so content growth does not dilute brand quality or legal clarity.',
  },
  {
    title: 'Trust-first legal pages',
    body:
      'Privacy, terms, FAQ, security, and disclaimer pages stay visible so serious buyers can validate credibility quickly.',
  },
  {
    title: 'Revenue with guardrails',
    body:
      'The platform is conversion-aware, but it still separates intelligence, legal products, and non-legal-advice boundaries clearly.',
  },
] as const

export const faqItems = [
  {
    question: 'What is BizLegal?',
    answer:
      'BizLegal is a boutique regulatory intelligence and AI-driven risk analysis practice focused on digital asset ventures operating in complex jurisdictions.',
  },
  {
    question: 'What is the founder background?',
    answer:
      'BizLegal is founded by DOR INNOVATIONS: a commercial attorney and entrepreneur operating at the intersection of law, innovation, and digital asset markets.',
  },
  {
    question: 'What is the primary specialization?',
    answer:
      'The core specialization is UAE crypto regulatory risk intelligence, with particular attention to VARA and ADGM exposure analysis.',
  },
  {
    question: 'What kind of problems does BizLegal help solve?',
    answer:
      'BizLegal helps founders reduce regulatory uncertainty before launch, fundraising, or expansion by identifying exposure before it becomes structural liability.',
  },
  {
    question: 'How should teams use the platform?',
    answer:
      'Founders, operators, funds, legal teams, and digital asset ventures can use BizLegal to move from uncertainty into a clearer decision path faster.',
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

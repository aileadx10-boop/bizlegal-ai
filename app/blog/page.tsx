import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Regulatory Intelligence Blog — VARA, MiCA, SEC Insights | DOR INNOVATIONS',
  description: 'Deep-dive regulatory intelligence from DOR INNOVATIONS. VARA compliance, MiCA enforcement, SEC digital asset updates, cross-border structuring insights for digital asset founders and attorneys.',
  keywords: 'VARA compliance blog, MiCA regulation 2025, digital asset regulatory news, DOR INNOVATIONS blog, crypto compliance insights, UAE digital asset law',
  alternates: { canonical: 'https://bizlegal-ai.com/blog' },
  openGraph: {
    title: 'Regulatory Intelligence Blog | DOR INNOVATIONS',
    description: 'VARA, MiCA, SEC, MAS regulatory intelligence. Published weekly for digital asset founders and attorneys.',
    url: 'https://bizlegal-ai.com/blog',
  },
}

const CATEGORIES = ['All', 'VARA', 'MiCA', 'SEC', 'DIFC', 'DocStack', 'BRAI', 'TRACR', 'Cross-Border']

const POSTS = [
  {
    slug: 'vara-mvl-license-guide-2025',
    tag: 'VARA',
    tagColor: '#fbbf24',
    title: 'VARA MVL License 2025: The Complete Application Guide for UAE Digital Asset Founders',
    excerpt: 'The VARA MVL (Virtual Asset Broker-Dealer) license is the primary route for operating a digital asset brokerage in Dubai. This guide covers every step — from entity formation to license issuance.',
    date: 'March 15, 2025',
    read: '8 min',
    featured: true,
  },
  {
    slug: 'mica-enforcement-2025',
    tag: 'MiCA',
    tagColor: 'var(--sky)',
    title: 'MiCA Enforcement Begins: What Every Token Issuer Must Do Before Q2 2025',
    excerpt: 'The EU\'s Markets in Crypto-Assets Regulation is now fully in force. Competent authorities are actively reviewing token issuances. Here\'s the immediate action list for every token issuer operating in or into the EU.',
    date: 'March 10, 2025',
    read: '6 min',
    featured: true,
  },
  {
    slug: 'brai-regulatory-intelligence',
    tag: 'BRAI',
    tagColor: 'var(--indigo)',
    title: 'How BRAI Identifies Regulatory Exposure Before It Crystallises Into Liability',
    excerpt: 'Traditional legal compliance is reactive. BRAI is proactive — scanning your venture structure against VARA, MiCA, SEC, and MAS simultaneously to surface exposure before it becomes a structural problem.',
    date: 'March 5, 2025',
    read: '5 min',
    featured: false,
  },
  {
    slug: 'howey-test-2025-token-analysis',
    tag: 'SEC',
    tagColor: 'var(--teal)',
    title: 'Howey Test 2025: Applying the SEC Framework to Your Token Structure',
    excerpt: 'The Howey Test remains the primary tool the SEC uses to determine whether a digital asset is a security. This analysis walks through the four-prong test applied to common token structures in 2025.',
    date: 'February 28, 2025',
    read: '7 min',
    featured: false,
  },
  {
    slug: 'difc-vs-adgm-digital-assets',
    tag: 'DIFC',
    tagColor: '#fbbf24',
    title: 'DIFC vs ADGM: Choosing the Right UAE Jurisdiction for Your Digital Asset Venture',
    excerpt: 'Both DIFC and ADGM offer world-class regulatory frameworks for digital assets in the UAE. The right choice depends on your business model, target markets, and regulatory preferences.',
    date: 'February 20, 2025',
    read: '6 min',
    featured: false,
  },
  {
    slug: 'docstack-vara-mica-contracts',
    tag: 'DocStack',
    tagColor: 'var(--sky)',
    title: 'Jurisdiction-Ready Contracts: How DocStack Auto-Applies VARA and MiCA Regulatory Context',
    excerpt: 'DocStack doesn\'t just generate documents — it applies the correct regulatory framework based on your jurisdiction and transaction type. Here\'s how the AI layer works.',
    date: 'February 15, 2025',
    read: '4 min',
    featured: false,
  },
  {
    slug: 'cross-border-digital-asset-structuring',
    tag: 'Cross-Border',
    tagColor: 'var(--teal)',
    title: 'Cross-Border Digital Asset Structuring: UAE → EU → US — One Intelligence Layer',
    excerpt: 'Operating a digital asset venture across multiple jurisdictions creates overlapping regulatory obligations. DOR INNOVATIONS maps the optimal compliance pathway across all six major jurisdictions simultaneously.',
    date: 'February 10, 2025',
    read: '9 min',
    featured: false,
  },
  {
    slug: 'tracr-blockchain-forensics-litigation',
    tag: 'TRACR',
    tagColor: 'var(--teal)',
    title: 'AI Blockchain Forensics for Litigation: How TRACR Produces Court-Ready Reports',
    excerpt: 'TRACR traces wallet transactions, maps fund flows across chains, and produces court-ready forensic PDF reports for digital asset disputes. Here\'s what\'s inside a TRACR investigation.',
    date: 'February 5, 2025',
    read: '6 min',
    featured: false,
  },
  {
    slug: 'vara-difc-comparison-2025',
    tag: 'VARA',
    tagColor: '#fbbf24',
    title: 'VARA vs DFSA in 2025: Which UAE Regulator for Your Digital Asset Business?',
    excerpt: 'VARA regulates Dubai mainland and most free zones. DFSA regulates DIFC. The choice has significant implications for your licensing pathway, capital requirements, and access to institutional markets.',
    date: 'January 30, 2025',
    read: '7 min',
    featured: false,
  },
  {
    slug: 'mas-dpt-license-singapore-2025',
    tag: 'Cross-Border',
    tagColor: 'var(--teal)',
    title: 'MAS DPT License Singapore 2025: The Full Application Breakdown',
    excerpt: 'The MAS Digital Payment Token services license is the gateway to operating a regulated crypto business in Singapore. This guide covers requirements, timeline, and key compliance obligations.',
    date: 'January 25, 2025',
    read: '8 min',
    featured: false,
  },
  {
    slug: 'mica-token-white-paper-requirements',
    tag: 'MiCA',
    tagColor: 'var(--sky)',
    title: 'MiCA Crypto-Asset White Paper: Mandatory Requirements and Common Mistakes',
    excerpt: 'Every token issuance in the EU requires a MiCA-compliant crypto-asset white paper. These are the mandatory disclosures, ESMA technical standards, and the most common compliance failures we see.',
    date: 'January 20, 2025',
    read: '7 min',
    featured: false,
  },
  {
    slug: 'defi-regulatory-risk-analysis',
    tag: 'SEC',
    tagColor: 'var(--teal)',
    title: 'DeFi Regulatory Risk in 2025: VARA, SEC, and MiCA\'s Approach to Decentralised Finance',
    excerpt: 'Decentralised finance is under increasing regulatory scrutiny across all major jurisdictions. This analysis maps the current DeFi regulatory posture of VARA, MiCA, SEC, and MAS.',
    date: 'January 15, 2025',
    read: '10 min',
    featured: false,
  },
]

const SOCIAL_LINKS = [
  { name: 'LinkedIn', url: 'https://www.linkedin.com/company/DorInnovations', color: '#0A66C2', icon: '💼' },
  { name: 'Substack', url: 'https://substack.com/@dorinnovations', color: '#FF6719', icon: '📨' },
  { name: 'X / Twitter', url: 'https://x.com/DorInnovations', color: '#fff', icon: '𝕏' },
]

export default function BlogPage() {
  const featured = POSTS.filter(p => p.featured)
  const rest = POSTS.filter(p => !p.featured)

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)' }}>

      {/* Nav */}
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)', position: 'sticky', top: 0, zIndex: 200 }}>
        <div className="container" style={{ padding: '16px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" className="nav-logo" style={{ marginRight: 'auto' }}>DOR<em>INNOVATIONS</em></Link>
          <Link href="/templates" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', fontFamily: 'Geist Mono, monospace' }}>Templates</Link>
          <Link href="/social-hub" style={{ fontSize: '12px', color: 'var(--muted)', textDecoration: 'none', fontFamily: 'Geist Mono, monospace' }}>Social</Link>
          <a href="https://brai.bizlegal-ai.com" className="btn-ghost" style={{ fontSize: '12px' }}>Free Scan</a>
          <a href="https://docstack.bizlegal-ai.com" className="btn-primary" style={{ fontSize: '12px' }}>Templates →</a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '80px 24px 60px', maxWidth: '960px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(125,211,252,0.2)', background: 'rgba(125,211,252,0.05)', fontSize: '11px', fontFamily: 'Geist Mono, monospace', color: 'var(--sky)', marginBottom: '24px' }}>
          📝 Regulatory Intelligence · Published Weekly
        </div>
        <h1 style={{ fontFamily: 'Gloock, serif', fontSize: 'clamp(36px, 5vw, 56px)', color: 'var(--white)', lineHeight: 1.1, marginBottom: '20px', letterSpacing: '-0.02em' }}>
          DOR INNOVATIONS Blog —<br /><em style={{ fontStyle: 'italic', color: 'var(--sky)' }}>Regulatory Intelligence, Weekly</em>
        </h1>
        <p style={{ fontSize: '16px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '600px', margin: '0 auto 32px' }}>
          VARA, MiCA, SEC, MAS analysis. Cross-border structuring. AI compliance tools. Written by a commercial attorney with 20+ years of digital asset regulatory practice.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          {SOCIAL_LINKS.map(s => (
            <a key={s.name} href={s.url} target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '8px 16px', borderRadius: '8px', border: '1px solid rgba(125,211,252,0.12)', background: 'rgba(7,9,26,0.6)', fontSize: '12px', fontFamily: 'Geist Mono, monospace', color: 'var(--muted)', textDecoration: 'none', transition: 'all 0.2s' }}>
              <span>{s.icon}</span>{s.name}
            </a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: '960px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Category Filter */}
        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginBottom: '48px' }}>
          {CATEGORIES.map((c, i) => (
            <div key={c} style={{ padding: '6px 14px', borderRadius: '100px', border: '1px solid rgba(125,211,252,0.12)', background: i === 0 ? 'rgba(125,211,252,0.1)' : 'rgba(7,9,26,0.5)', fontSize: '11px', fontFamily: 'Geist Mono, monospace', color: i === 0 ? 'var(--sky)' : 'var(--muted)', cursor: 'pointer' }}>
              {c}
            </div>
          ))}
        </div>

        {/* Featured Posts */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '48px' }}>
          {featured.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} style={{ textDecoration: 'none', display: 'block', padding: '36px', borderRadius: '20px', border: `1px solid ${post.tagColor}22`, background: 'rgba(7,9,26,0.7)', transition: 'all 0.3s' }} className="blog-featured-card">
              <div style={{ display: 'inline-block', padding: '3px 10px', borderRadius: '6px', fontSize: '10px', fontFamily: 'Geist Mono, monospace', fontWeight: 700, color: post.tagColor, background: `${post.tagColor}15`, border: `1px solid ${post.tagColor}30`, marginBottom: '16px' }}>{post.tag}</div>
              <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: 'var(--white)', lineHeight: 1.3, marginBottom: '14px' }}>{post.title}</h2>
              <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75, marginBottom: '20px' }}>{post.excerpt}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '11px', color: 'var(--dim)', fontFamily: 'Geist Mono, monospace' }}>{post.date} · {post.read} read</span>
                <span style={{ fontSize: '12px', color: post.tagColor, fontFamily: 'Geist Mono, monospace', fontWeight: 700 }}>Read →</span>
              </div>
            </Link>
          ))}
        </div>

        {/* All Posts Grid */}
        <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: 'var(--white)', marginBottom: '24px' }}>All Articles</h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '48px' }}>
          {rest.map(post => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card" style={{ textDecoration: 'none' }}>
              <div className="blog-tag" style={{ background: `${post.tagColor}15`, color: post.tagColor, borderColor: `${post.tagColor}25` }}>{post.tag}</div>
              <h3 className="blog-title">{post.title}</h3>
              <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.65, marginBottom: '12px' }}>{post.excerpt.slice(0, 100)}…</p>
              <div className="blog-meta">{post.date} · {post.read} read</div>
            </Link>
          ))}
        </div>

        {/* Subscribe strip */}
        <div style={{ padding: '48px', borderRadius: '20px', background: 'radial-gradient(ellipse at 50% 0%, rgba(125,211,252,0.07) 0%, rgba(7,9,26,0.9) 60%)', border: '1px solid rgba(125,211,252,0.12)', textAlign: 'center' }}>
          <h3 style={{ fontFamily: 'Gloock, serif', fontSize: '26px', color: 'var(--white)', marginBottom: '10px' }}>
            Never miss an update
          </h3>
          <p style={{ fontSize: '14px', color: 'var(--muted)', marginBottom: '24px', lineHeight: 1.75 }}>
            Regulatory intelligence published 5× per week across all platforms. Subscribe free on Substack.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://substack.com/@dorinnovations" target="_blank" rel="noreferrer" className="lx-btn-p" style={{ background: 'rgba(255,103,25,0.12)', borderColor: 'rgba(255,103,25,0.3)', color: '#FF6719' }}>Subscribe on Substack →</a>
            <a href="https://www.linkedin.com/company/DorInnovations" target="_blank" rel="noreferrer" className="lx-btn-g">Follow on LinkedIn</a>
          </div>
        </div>
      </div>
    </div>
  )
}

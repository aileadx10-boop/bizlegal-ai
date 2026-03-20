import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About DOR INNOVATIONS — Regulatory Risk Intelligence for Digital Asset Ventures',
  description: 'DOR INNOVATIONS: boutique AI-driven regulatory risk intelligence. Commercial attorney & entrepreneur with UAE/DIFC focus. VARA, MiCA, SEC cross-border regulatory analysis.',
}

const TIMELINE = [
  { year: '2019', event: 'Founded as a boutique commercial legal practice advising digital asset ventures and cross-border investment structures across UAE, EU, and US markets.' },
  { year: '2021', event: 'Scaled to $100M+ in transactions advised. First internal AI regulatory intelligence tools developed to speed up VARA, MiCA, and SEC exposure analysis.' },
  { year: '2023', event: 'Launched DocStack — jurisdiction-specific legal templates built by a practising commercial attorney for digital asset and cross-border deal structures.' },
  { year: '2024', event: 'BRAI (Blockchain Regulatory AI) launched — real-time VARA, MiCA, SEC, MAS scanning. TRACR forensic platform enters beta for litigation support.' },
  { year: '2025', event: 'DOR INNOVATIONS — unified regulatory intelligence hub. One AI-powered layer for digital asset regulatory risk across 6 jurisdictions. UAE / DIFC primary focus.' },
]

const VALUES = [
  { icon: '🇦🇪', title: 'UAE / DIFC First', desc: 'Primary focus on VARA, DFSA, and DIFC regulatory frameworks — the most dynamic digital asset jurisdiction in the world.' },
  { icon: '⚙️', title: 'Proactive Intelligence', desc: 'We identify regulatory exposure before it becomes structural liability — not after. Precision, not reaction.' },
  { icon: '🔒', title: 'Confidentiality by Design', desc: 'Contract text and venture details are never stored or shared. Data encrypted end-to-end. Always.' },
  { icon: '🌍', title: 'Cross-Border Precision', desc: 'UAE → EU → US → Singapore → UK → Canada. Multi-jurisdiction analysis without the multi-firm overhead.' },
  { icon: '⚡', title: 'AI + Attorney Depth', desc: 'Claude AI provides the speed. Commercial attorney experience provides the regulatory depth. You get both.' },
  { icon: '🤝', title: 'Founder-Aligned', desc: 'Built by an entrepreneur who understands the cost of regulatory uncertainty. Flat fees. No billing surprises.' },
]

const CAPABILITIES = [
  {
    icon: '🔍',
    title: 'Regulatory Risk Mapping',
    desc: 'Structured analysis of your digital asset venture structure against VARA, MiCA, SEC, MAS, FCA, and CSA simultaneously. Exposure identified before launch.',
    tags: ['VARA', 'MiCA', 'SEC', 'MAS'],
  },
  {
    icon: '📄',
    title: 'Jurisdiction-Ready Documentation',
    desc: 'Commercial attorney-drafted contract templates with regulatory context built in. Token agreements, JV structures, capital call — DIFC-ready.',
    tags: ['DocStack', 'DOCX', 'PDF'],
  },
  {
    icon: '⛓️',
    title: 'Forensic Investigation',
    desc: 'AI-powered wallet tracing, fund flow analysis, and court-ready forensic reports for digital asset litigation and regulatory proceedings.',
    tags: ['TRACR', 'Forensics', 'Court-Ready'],
  },
  {
    icon: '📊',
    title: 'Cross-Border Analysis',
    desc: 'Multi-jurisdiction regulatory comparison. Identify the optimal structure for your digital asset venture across UAE, EU, US, UK, Singapore, and Canada.',
    tags: ['Multi-jurisdiction', 'Structuring'],
  },
]

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingTop: '36px' }}>
      {/* Nav */}
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)' }}>
        <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'Geist Mono, monospace' }}>← DOR INNOVATIONS</Link>
        </div>
      </div>

      {/* Hero */}
      <div className="section" style={{ paddingTop: '80px', paddingBottom: '60px', textAlign: 'center' }}>
        <div className="container">
          <div className="hero-badge" style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <span className="bdot" />&nbsp;DOR INNOVATIONS
          </div>
          <h1 className="sh" style={{ marginBottom: '20px', maxWidth: '760px', margin: '0 auto 20px' }}>
            Regulatory Risk Intelligence<br />
            <em>Engineered for Precision</em>
          </h1>
          <p className="sdesc" style={{ margin: '0 auto', maxWidth: '640px' }}>
            DOR INNOVATIONS provides structured regulatory risk intelligence for digital asset ventures operating in complex jurisdictions. We operate at the intersection of commercial legal strategy, cross-border regulatory analysis, entrepreneurial execution, and AI-assisted risk assessment.
          </p>
        </div>
      </div>

      {/* Founder Card */}
      <div className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '56px', alignItems: 'center',
            padding: '48px', borderRadius: '24px',
            border: '1px solid rgba(125,211,252,0.15)',
            background: 'rgba(7,9,26,0.7)',
            position: 'relative', overflow: 'hidden',
          }}>
            <div style={{
              position: 'absolute', top: '-100px', right: '-100px',
              width: '400px', height: '400px', borderRadius: '50%',
              background: 'radial-gradient(ellipse, rgba(125,211,252,0.06) 0%, transparent 70%)',
              pointerEvents: 'none',
            }} />
            {/* Founder Identity Block */}
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '140px', height: '140px', borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(125,211,252,0.15), rgba(94,234,212,0.15))',
                border: '1px solid rgba(125,211,252,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '56px', marginBottom: '20px',
              }}>⚖️</div>
              <div style={{ marginBottom: '12px' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '4px' }}>Founder</div>
                <div style={{ fontFamily: 'Gloock, serif', fontSize: '20px', color: 'var(--white)', lineHeight: 1.2 }}>DOR INNOVATIONS</div>
              </div>
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {['Commercial Attorney', 'Entrepreneur', 'UAE Focus', 'LLB + LLM'].map(b => (
                  <span key={b} style={{
                    padding: '3px 10px', borderRadius: '100px', fontSize: '10px',
                    border: '1px solid rgba(125,211,252,0.2)', color: 'var(--sky)',
                    fontFamily: 'Geist Mono, monospace',
                  }}>{b}</span>
                ))}
              </div>
              <div style={{ marginTop: '20px', padding: '12px 16px', borderRadius: '10px', border: '1px solid rgba(94,234,212,0.15)', background: 'rgba(94,234,212,0.05)' }}>
                <div style={{ fontSize: '10px', color: 'var(--teal)', fontFamily: 'Geist Mono, monospace', letterSpacing: '0.1em', marginBottom: '6px' }}>PRIMARY FOCUS</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                  {['🇦🇪 VARA', '🇪🇺 MiCA', '🇺🇸 SEC', '🇸🇬 MAS'].map(j => (
                    <span key={j} style={{ fontSize: '11px', color: 'var(--white)', fontFamily: 'Geist Mono, monospace' }}>{j}</span>
                  ))}
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div style={{ position: 'relative' }}>
              <p style={{ fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '12px' }}>Commercial Attorney · Entrepreneur · Digital Asset Regulatory Intelligence</p>
              <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '28px', color: 'var(--white)', marginBottom: '20px', lineHeight: 1.3 }}>
                AI-assisted crypto risk analysis.<br />UAE focus.
              </h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                Commercial attorney and entrepreneur. Founder of DOR INNOVATIONS — boutique regulatory intelligence & AI-driven risk analysis for digital asset ventures operating in complex jurisdictions.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '16px' }}>
                We operate at the intersection of commercial legal strategy, cross-border regulatory analysis, entrepreneurial execution, and AI-assisted risk assessment. Our work focuses on identifying regulatory exposure before it becomes structural liability — enabling founders to scale with clarity and reduced uncertainty.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '28px' }}>
                20+ years of legal practice. $100M+ in transactions advised. Primary focus: UAE / DIFC digital asset ventures, VARA licensing, and cross-border regulatory structuring.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                {[
                  { val: '$100M+', lbl: 'Transactions advised' },
                  { val: '20+', lbl: 'Years practice' },
                  { val: '6', lbl: 'Jurisdictions' },
                  { val: 'VARA', lbl: 'Primary focus' },
                ].map(({ val, lbl }) => (
                  <div key={lbl} style={{ padding: '12px 16px', borderRadius: '10px', border: '1px solid var(--border)', background: 'rgba(4,6,14,0.6)', textAlign: 'center' }}>
                    <div style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: 'var(--white)', lineHeight: 1 }}>{val}</div>
                    <div style={{ fontSize: '10px', color: 'var(--muted)', marginTop: '4px' }}>{lbl}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Company Bio */}
      <div className="section">
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="eyebrow"><span className="eline" /><span className="elabel">Company</span></div>
          <h2 className="sh" style={{ marginBottom: '32px' }}>DOR INNOVATIONS</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            {[
              { label: 'Mission', text: 'Provide structured regulatory risk intelligence for digital asset ventures — enabling founders to identify exposure before it becomes structural liability.' },
              { label: 'Positioning', text: 'Boutique Regulatory Intelligence & AI-Driven Risk Analysis. Operating at the intersection of commercial legal strategy and entrepreneurial execution.' },
              { label: 'Approach', text: 'Cross-border regulatory analysis with UAE / DIFC as primary focus. Proactive intelligence layer, not reactive compliance. Precision over volume.' },
              { label: 'Technology', text: 'Claude AI (Anthropic) for analysis speed. Commercial attorney depth for regulatory accuracy. DocStack, BRAI, and TRACR as delivery instruments.' },
            ].map(({ label, text }) => (
              <div key={label} style={{ padding: '24px', borderRadius: '16px', border: '1px solid rgba(125,211,252,0.08)', background: 'rgba(7,9,26,0.5)' }}>
                <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '10px', fontFamily: 'Geist Mono, monospace' }}>{label}</div>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75 }}>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Capabilities */}
      <div className="section">
        <div className="container">
          <div className="eyebrow"><span className="eline" /><span className="elabel">What We Do</span></div>
          <h2 className="sh" style={{ marginBottom: '48px' }}>Four precision <em>intelligence instruments</em></h2>
          <div className="ind-grid">
            {CAPABILITIES.map(c => (
              <div key={c.title} className="icard">
                <div className="iicon">{c.icon}</div>
                <div className="iname">{c.title}</div>
                <div className="idesc">{c.desc}</div>
                <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                  {c.tags.map(t => (
                    <span key={t} style={{ padding: '2px 8px', borderRadius: '100px', fontSize: '10px', fontFamily: 'Geist Mono, monospace', background: 'rgba(125,211,252,0.07)', border: '1px solid rgba(125,211,252,0.15)', color: 'var(--sky)' }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section">
        <div className="container">
          <div className="eyebrow"><span className="eline" /><span className="elabel">Principles</span></div>
          <h2 className="sh" style={{ marginBottom: '48px' }}>What we stand for</h2>
          <div className="ind-grid">
            {VALUES.map(v => (
              <div key={v.title} className="icard">
                <div className="iicon">{v.icon}</div>
                <div className="iname">{v.title}</div>
                <div className="idesc">{v.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Timeline */}
      <div className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="eyebrow"><span className="eline" /><span className="elabel">Journey</span></div>
          <h2 className="sh" style={{ marginBottom: '48px' }}>Built over years,<br />refined by <em>real regulatory practice</em></h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
            {TIMELINE.map((t, i) => (
              <div key={t.year} style={{ display: 'flex', gap: '24px', paddingBottom: '36px', position: 'relative' }}>
                {i < TIMELINE.length - 1 && (
                  <div style={{ position: 'absolute', left: '28px', top: '44px', bottom: 0, width: '1px', background: 'rgba(125,211,252,0.1)' }} />
                )}
                <div style={{
                  width: '56px', height: '56px', borderRadius: '12px', flexShrink: 0,
                  background: 'rgba(125,211,252,0.08)', border: '1px solid rgba(125,211,252,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Gloock, serif', fontSize: '13px', color: 'var(--sky)', fontWeight: 700,
                }}>
                  {t.year}
                </div>
                <div style={{ paddingTop: '14px' }}>
                  <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75 }}>{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="section">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to identify your <em>regulatory exposure?</em></h2>
            <p>Start with a free AI risk scan or access jurisdiction-ready legal documentation from $49.</p>
            <div className="cta-btns">
              <a href="https://brai.bizlegal-ai.com" className="btn-hero btn-hero-p">Free Regulatory Scan →</a>
              <Link href="/pricing" className="btn-hero btn-hero-g">View Pricing</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

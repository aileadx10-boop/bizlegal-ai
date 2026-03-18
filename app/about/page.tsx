import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About BizLegal AI — Legal Intelligence Built by Lawyers',
  description: 'Meet the team behind BizLegal AI. Qualified solicitors with 20+ years experience building AI-powered legal tools for the innovation economy.',
}

const TIMELINE = [
  { year: '2019', event: 'Founded as a boutique cross-border legal practice advising blockchain startups and real estate developers across UAE, EU, and US markets.' },
  { year: '2021', event: 'Scaled to cover $100M+ in transactions. First internal AI tools developed to speed up contract drafting and compliance screening.' },
  { year: '2023', event: 'Launched DocStack — the first AI-native legal template platform built by practising solicitors with jurisdiction-specific expertise.' },
  { year: '2024', event: 'BRAI (Blockchain Regulatory AI) launched with real-time VARA, MiCA, SEC, MAS scanning. TRACR forensic platform enters beta.' },
  { year: '2025', event: 'BizLegal AI hub launched — unifying all legal intelligence tools under one platform serving founders, funds, and enterprise across 6 jurisdictions.' },
]

const VALUES = [
  { icon: '⚖️', title: 'Lawyer-First', desc: 'Every product is built by practising solicitors, not just technologists. Legal accuracy is non-negotiable.' },
  { icon: '🔒', title: 'Privacy by Design', desc: 'Contract text is never stored. Data is encrypted end-to-end. We never sell your information.' },
  { icon: '🌍', title: 'Global Reach', desc: 'From Dubai to Delaware, Singapore to São Paulo — we cover the jurisdictions where innovation happens.' },
  { icon: '⚡', title: 'Speed Without Compromise', desc: 'AI gives you speed. Our legal review gives you confidence. You get both.' },
  { icon: '🤝', title: 'Founder-Aligned', desc: 'Flat fees, no billing surprises. Built by entrepreneurs who know what it\'s like to need legal help fast.' },
  { icon: '🧠', title: 'Always Learning', desc: 'Regulatory databases updated weekly. AI models continuously fine-tuned on new case law and guidance.' },
]

export default function AboutPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingTop: '36px' }}>
      {/* Nav */}
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)' }}>
        <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'Geist Mono, monospace' }}>← Home</Link>
        </div>
      </div>

      {/* Hero */}
      <div className="section" style={{ paddingTop: '80px', paddingBottom: '60px', textAlign: 'center' }}>
        <div className="container">
          <div className="hero-badge" style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <span className="bdot" />&nbsp;About BizLegal AI
          </div>
          <h1 className="sh" style={{ marginBottom: '20px', maxWidth: '720px', margin: '0 auto 20px' }}>
            Legal intelligence built<br />by <em>practising solicitors</em>
          </h1>
          <p className="sdesc" style={{ margin: '0 auto', maxWidth: '600px' }}>
            We are a team of qualified lawyers, engineers, and compliance specialists who believe that world-class legal protection should be accessible to every founder, fund, and enterprise — not just those who can afford $500/hour retainers.
          </p>
        </div>
      </div>

      {/* Founder Card */}
      <div className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={{
            display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '56px', alignItems: 'center',
            padding: '48px', borderRadius: '20px',
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
            <div style={{ position: 'relative' }}>
              <div style={{
                width: '160px', height: '160px', borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(125,211,252,0.2), rgba(94,234,212,0.2))',
                border: '1px solid rgba(125,211,252,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '64px', marginBottom: '20px',
              }}>⚖️</div>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                {['LLB', 'LLM', '20+ Years'].map(b => (
                  <span key={b} style={{
                    padding: '3px 10px', borderRadius: '100px', fontSize: '11px',
                    border: '1px solid rgba(125,211,252,0.2)', color: 'var(--sky)',
                    fontFamily: 'Geist Mono, monospace',
                  }}>{b}</span>
                ))}
              </div>
            </div>
            <div style={{ position: 'relative' }}>
              <p style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '8px' }}>Founder & Principal Solicitor</p>
              <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '32px', color: 'var(--white)', marginBottom: '16px' }}>BizLegal AI</h2>
              <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '20px' }}>
                A qualified solicitor with LLB + LLM and over 20 years of legal practice spanning $100M+ in transactions across blockchain, real estate, and cross-border corporate deals.
              </p>
              <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '24px' }}>
                After years of seeing founders overpay for basic legal documents and miss critical compliance requirements, BizLegal AI was built to solve both problems simultaneously — lawyer-quality legal intelligence at software prices, available 24/7.
              </p>
              <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--border)', background: 'rgba(4,6,14,0.6)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Gloock, serif', fontSize: '28px', color: 'var(--white)', lineHeight: 1 }}>$100M+</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Transactions advised</div>
                </div>
                <div style={{ padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--border)', background: 'rgba(4,6,14,0.6)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Gloock, serif', fontSize: '28px', color: 'var(--white)', lineHeight: 1 }}>20+</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Years practice</div>
                </div>
                <div style={{ padding: '12px 18px', borderRadius: '10px', border: '1px solid var(--border)', background: 'rgba(4,6,14,0.6)', textAlign: 'center' }}>
                  <div style={{ fontFamily: 'Gloock, serif', fontSize: '28px', color: 'var(--white)', lineHeight: 1 }}>6</div>
                  <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>Jurisdictions</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Values */}
      <div className="section">
        <div className="container">
          <div className="eyebrow"><span className="eline" /><span className="elabel">Our Values</span></div>
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
          <div className="eyebrow"><span className="eline" /><span className="elabel">Our Journey</span></div>
          <h2 className="sh" style={{ marginBottom: '48px' }}>Built over years,<br />refined by <em>real practice</em></h2>
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
            <h2>Ready to work with us?</h2>
            <p>Start with a free compliance scan or browse 150+ lawyer-drafted templates.</p>
            <div className="cta-btns">
              <Link href="/" className="btn-hero btn-hero-p">Start Free Scan</Link>
              <Link href="/pricing" className="btn-hero btn-hero-g">View Pricing</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

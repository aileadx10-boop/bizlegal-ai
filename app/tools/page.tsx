import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Free Legal AI Tools — DOR INNOVATIONS',
  description: 'Free AI-powered legal tools: SaaS Terms Risk Scanner, Freelancer Contract Fixer, Website Compliance Checker, Debt Collection Letter Generator.',
}

const TOOLS = [
  {
    slug: 'saas-risk-scanner',
    icon: '🔍',
    name: 'SaaS Terms Risk Scanner',
    desc: 'Paste any SaaS contract or terms of service. Get an instant risk score, red flags with severity ratings, negotiation points, and fix suggestions — powered by Claude AI.',
    tags: ['Contracts', 'SaaS', 'Risk Analysis'],
    color: 'sky',
    time: '~20 seconds',
    free: true,
  },
  {
    slug: 'contract-fixer',
    icon: '🛠️',
    name: 'Freelancer Contract Fixer',
    desc: 'Upload or paste your freelance contract. The AI identifies clauses that expose you to non-payment, scope creep, or IP loss — and rewrites them to protect you.',
    tags: ['Freelance', 'IP Rights', 'Payment'],
    color: 'teal',
    time: '~30 seconds',
    free: true,
  },
  {
    slug: 'website-compliance',
    icon: '🌐',
    name: 'AI Website Compliance Checker',
    desc: 'Enter any website URL. Instantly scan for GDPR, CCPA, ADA/WCAG, ePrivacy, and cookie law compliance gaps. Get a compliance score and actionable fix list.',
    tags: ['GDPR', 'CCPA', 'ADA', 'Cookies'],
    color: 'indigo',
    time: '~25 seconds',
    free: true,
  },
  {
    slug: 'debt-collection',
    icon: '📬',
    name: 'Debt Collection Letter Generator',
    desc: 'Generate professional, jurisdiction-compliant debt collection letters in seconds. From friendly first reminders to formal pre-litigation demands — in EN, PT, and ES.',
    tags: ['Debt Recovery', 'Multi-jurisdiction', 'Multi-language'],
    color: 'teal',
    time: '~15 seconds',
    free: true,
  },
]

const colorMap = {
  sky:    { border: 'rgba(125,211,252,0.2)', bg: 'rgba(125,211,252,0.05)', tag: 'rgba(125,211,252,0.12)', text: 'var(--sky)' },
  teal:   { border: 'rgba(94,234,212,0.2)',  bg: 'rgba(94,234,212,0.05)',  tag: 'rgba(94,234,212,0.12)',  text: 'var(--teal)' },
  indigo: { border: 'rgba(165,180,252,0.2)', bg: 'rgba(165,180,252,0.05)', tag: 'rgba(165,180,252,0.12)', text: 'var(--indigo)' },
}

export default function ToolsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingTop: '36px' }}>
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)' }}>
        <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'Geist Mono, monospace' }}>← Home</Link>
        </div>
      </div>

      {/* Hero */}
      <div className="section" style={{ paddingTop: '80px', paddingBottom: '60px', textAlign: 'center' }}>
        <div className="container">
          <div className="hero-badge" style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <span className="bdot" />&nbsp;Free AI Legal Tools
          </div>
          <h1 className="sh" style={{ marginBottom: '16px' }}>
            Lawyer-grade analysis.<br /><em>Instantly free.</em>
          </h1>
          <p className="sdesc" style={{ margin: '0 auto 16px' }}>
            Four AI-powered legal tools built by practising solicitors and powered by Claude AI. No signup required.
          </p>
          <p style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'Geist Mono, monospace' }}>
            Powered by Anthropic Claude Sonnet · Not legal advice · Fair use limits apply
          </p>
        </div>
      </div>

      {/* Tools Grid */}
      <div className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px' }}>
            {TOOLS.map(tool => {
              const c = colorMap[tool.color as keyof typeof colorMap]
              return (
                <Link key={tool.slug} href={`/tools/${tool.slug}`} style={{ textDecoration: 'none' }}>
                  <div style={{
                    borderRadius: '20px', padding: '36px',
                    border: `1px solid ${c.border}`,
                    background: c.bg,
                    transition: 'all 0.3s',
                    cursor: 'pointer', height: '100%',
                    display: 'flex', flexDirection: 'column', gap: '16px',
                    position: 'relative', overflow: 'hidden',
                  }}
                    className="tool-hub-card"
                  >
                    <div style={{ position: 'absolute', top: '-40px', right: '-40px', width: '200px', height: '200px', borderRadius: '50%', background: `radial-gradient(ellipse, ${c.bg} 0%, transparent 70%)`, pointerEvents: 'none' }} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      <span style={{ fontSize: '40px' }}>{tool.icon}</span>
                      <span style={{ padding: '4px 12px', borderRadius: '100px', fontSize: '10px', fontFamily: 'Geist Mono, monospace', fontWeight: 700, background: 'rgba(94,234,212,0.1)', border: '1px solid rgba(94,234,212,0.2)', color: 'var(--teal)', letterSpacing: '0.1em' }}>FREE</span>
                    </div>
                    <div>
                      <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '24px', color: 'var(--white)', marginBottom: '10px', lineHeight: 1.2 }}>{tool.name}</h2>
                      <p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: 1.75 }}>{tool.desc}</p>
                    </div>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                      {tool.tags.map(tag => (
                        <span key={tag} style={{ padding: '3px 10px', borderRadius: '100px', fontSize: '11px', fontFamily: 'Geist Mono, monospace', background: c.tag, color: c.text, border: `1px solid ${c.border}` }}>{tag}</span>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '16px', borderTop: `1px solid ${c.border}` }}>
                      <span style={{ fontSize: '12px', color: 'var(--dim)', fontFamily: 'Geist Mono, monospace' }}>⏱ {tool.time}</span>
                      <span style={{ fontSize: '13px', color: c.text, fontFamily: 'Geist Mono, monospace', fontWeight: 700 }}>Try Free →</span>
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="section">
        <div className="container">
          <div className="stats-strip">
            {[
              { val: '4', lbl: 'Free AI Tools' },
              { val: '~20s', lbl: 'Average Analysis Time' },
              { val: '0', lbl: 'Signup Required' },
              { val: '3', lbl: 'Languages (EN/PT/ES)' },
            ].map(s => (
              <div key={s.lbl} className="stat-cell">
                <div className="stat-val">{s.val}</div>
                <div className="stat-lbl">{s.lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Disclaimer + CTA */}
      <div className="section">
        <div className="container" style={{ maxWidth: '700px', textAlign: 'center' }}>
          <div style={{ padding: '20px 24px', borderRadius: '12px', border: '1px solid rgba(251,191,36,0.2)', background: 'rgba(251,191,36,0.04)', marginBottom: '40px' }}>
            <p style={{ fontSize: '13px', color: '#fbbf24', lineHeight: 1.7 }}>
              ⚠️ <strong>Disclaimer:</strong> These tools provide legal information and AI-assisted analysis. They do not constitute legal advice and do not create a solicitor-client relationship. For high-stakes matters, always engage qualified local counsel.
            </p>
          </div>
          <div className="cta-banner">
            <h2>Need something more <em>complex</em>?</h2>
            <p>Our full suite of lawyer-drafted templates and compliance scans is available from $49.</p>
            <div className="cta-btns">
              <Link href="/pricing" className="btn-hero btn-hero-p">View Pricing</Link>
              <Link href="/guides/uae/vara-token-issuance" className="btn-hero btn-hero-g">Browse Guides</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'DocStack — Digital Asset Legal Templates | DOR INNOVATIONS',
  description: 'DocStack by DOR INNOVATIONS: commercial attorney-drafted digital asset legal templates. VARA, MiCA, SEC jurisdiction-ready contracts. JV agreements, token agreements, NDAs, capital call. From $49.',
  keywords: 'digital asset legal templates, VARA token agreement, MiCA contract template, DocStack, crypto legal documents, digital asset JV agreement, UAE legal templates DIFC',
  alternates: { canonical: 'https://bizlegal-ai.com/docstack' },
  openGraph: {
    title: 'DocStack — Digital Asset Legal Templates | DOR INNOVATIONS',
    description: 'Commercial attorney-drafted contract templates. VARA, MiCA, SEC ready. DOCX + PDF instant download. From $49.',
    url: 'https://bizlegal-ai.com/docstack',
  },
}

const TEMPLATES = [
  { name: 'VARA Token Distribution Agreement', jurisdiction: 'UAE / DIFC', price: '$49', desc: 'VARA-compliant token distribution agreement for UAE digital asset ventures. Covers DFSA and DIFC regulatory requirements.' },
  { name: 'MiCA Token Sale Agreement', jurisdiction: 'EU', price: '$49', desc: 'MiCA-compliant token sale agreement including white paper obligations, cooling-off period, and EU investor protection requirements.' },
  { name: 'Digital Asset Joint Venture Agreement', jurisdiction: 'UAE / US / EU', price: '$69', desc: 'Cross-border JV agreement for digital asset ventures. Jurisdiction-specific regulatory compliance schedules included.' },
  { name: 'Capital Call Agreement', jurisdiction: 'UAE / US', price: '$49', desc: 'DIFC-ready capital call agreement for digital asset fund structures. Covers DFSA fund regulations and US Reg D requirements.' },
  { name: 'NDA — Digital Asset Ventures', jurisdiction: 'Multi-jurisdiction', price: '$29', desc: 'Mutual NDA covering IP, tokenomics, and proprietary blockchain technology. Jurisdiction-specific annexures.' },
  { name: 'LLC Operating Agreement', jurisdiction: 'United States', price: '$49', desc: 'Delaware or Wyoming LLC operating agreement for digital asset ventures with token equity provisions.' },
]

export default function DocStackPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingTop: '36px' }}>
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)' }}>
        <div className="container" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" className="nav-logo" style={{ marginRight: 'auto' }}>DOR<em>INNOVATIONS</em></Link>
          <a href="https://docstack.bizlegal-ai.com" className="btn-primary" style={{ fontSize: '12px' }}>Browse Templates →</a>
        </div>
      </div>

      <div style={{ padding: '90px 24px 70px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(125,211,252,0.2)', background: 'rgba(125,211,252,0.05)', fontSize: '11px', fontFamily: 'Geist Mono, monospace', color: 'var(--sky)', marginBottom: '28px' }}>
          📄 Regulatory Document Intelligence
        </div>
        <h1 style={{ fontFamily: 'Gloock, serif', fontSize: 'clamp(44px, 6vw, 72px)', color: 'var(--white)', lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.02em' }}>
          DocStack — Jurisdiction-Ready<br /><em style={{ fontStyle: 'italic', color: 'var(--sky)' }}>Legal Templates</em>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto 40px' }}>
          Commercial attorney-drafted digital asset contract templates. VARA, MiCA, SEC regulatory context auto-applied. DOCX + PDF in 60 seconds. From $49.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://docstack.bizlegal-ai.com" className="lx-btn-p" style={{ fontSize: '15px', padding: '16px 36px' }}>Browse All Templates →</a>
          <a href="https://brai.bizlegal-ai.com" className="lx-btn-g">Free Compliance Scan First</a>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Why DocStack */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', marginBottom: '60px', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', fontFamily: 'Geist Mono, monospace', marginBottom: '16px' }}>Why DocStack</div>
            <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '32px', color: 'var(--white)', marginBottom: '20px' }}>
              Commercial attorney depth.<br /><em style={{ fontStyle: 'italic', color: 'var(--sky)' }}>AI speed.</em>
            </h2>
            <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: 1.8, marginBottom: '20px' }}>
              Every DocStack template is drafted by a commercial attorney with 20+ years of practice across UAE, EU, and US jurisdictions — then refined with Claude AI for precision and speed.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Commercial attorney-drafted — not AI-only generated',
                'Jurisdiction-specific regulatory context applied',
                'Instant DOCX + PDF download',
                '7-day money-back guarantee',
                'Covers VARA, MiCA, SEC, FCA, MAS requirements',
              ].map(item => (
                <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--teal)', fontSize: '12px', flexShrink: 0 }}>✓</span>{item}
                </div>
              ))}
            </div>
          </div>
          <div style={{ padding: '32px', borderRadius: '16px', border: '1px solid rgba(125,211,252,0.1)', background: 'rgba(7,9,26,0.8)' }}>
            <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
              {[['$5k–$20k', 'Traditional firm'], ['$49', 'DocStack']].map(([price, label]) => (
                <div key={label} style={{ flex: 1, textAlign: 'center', padding: '16px', borderRadius: '10px', border: '1px solid rgba(125,211,252,0.08)', background: 'rgba(4,6,14,0.5)' }}>
                  <div style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: label === 'DocStack' ? 'var(--teal)' : 'var(--muted)', marginBottom: '4px' }}>{price}</div>
                  <div style={{ fontSize: '11px', color: 'var(--dim)' }}>{label}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: '13px', color: 'var(--muted)', textAlign: 'center', lineHeight: 1.65 }}>
              Same commercial attorney quality.<br />Fraction of the cost. Instant delivery.
            </div>
          </div>
        </div>

        {/* Templates */}
        <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '32px', color: 'var(--white)', marginBottom: '28px' }}>Featured Templates</h2>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '40px' }}>
          {TEMPLATES.map(t => (
            <div key={t.name} style={{ padding: '24px', borderRadius: '14px', border: '1px solid rgba(125,211,252,0.08)', background: 'rgba(7,9,26,0.6)', transition: 'all 0.2s' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
                <div style={{ fontSize: '10px', fontFamily: 'Geist Mono, monospace', color: 'var(--sky)', padding: '2px 8px', borderRadius: '4px', background: 'rgba(125,211,252,0.07)', border: '1px solid rgba(125,211,252,0.15)' }}>{t.jurisdiction}</div>
                <div style={{ fontFamily: 'Gloock, serif', fontSize: '18px', color: 'var(--teal)' }}>{t.price}</div>
              </div>
              <h3 style={{ fontFamily: 'Gloock, serif', fontSize: '15px', color: 'var(--white)', marginBottom: '8px', lineHeight: 1.3 }}>{t.name}</h3>
              <p style={{ fontSize: '12px', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{t.desc}</p>
            </div>
          ))}
        </div>

        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <a href="https://docstack.bizlegal-ai.com" className="lx-btn-p" style={{ fontSize: '14px', padding: '14px 36px' }}>Browse All Templates →</a>
        </div>

        {/* CTA */}
        <div style={{ padding: '48px', borderRadius: '20px', background: 'radial-gradient(ellipse at 50% 0%, rgba(125,211,252,0.07) 0%, rgba(7,9,26,0.9) 60%)', border: '1px solid rgba(125,211,252,0.12)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '28px', color: 'var(--white)', marginBottom: '12px' }}>
            Ready to draft your digital asset contract?
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '28px', lineHeight: 1.75 }}>
            Not sure which template you need? Run a free BRAI compliance scan first — it'll tell you exactly which documents your venture requires.
          </p>
          <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://docstack.bizlegal-ai.com" className="lx-btn-p">Browse Templates — From $49 →</a>
            <a href="https://brai.bizlegal-ai.com" className="lx-btn-g">Free Compliance Scan First</a>
          </div>
        </div>
      </div>
    </div>
  )
}

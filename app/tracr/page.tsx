import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'TRACR — AI Blockchain Forensic Investigation | DOR INNOVATIONS',
  description: 'TRACR by DOR INNOVATIONS: AI-powered blockchain forensic investigation. Wallet tracing, fund flow analysis, court-ready reports for digital asset litigation and regulatory proceedings. From $99.',
  keywords: 'blockchain forensic investigation, TRACR, AI crypto forensics, wallet tracing, digital asset litigation, blockchain fund flow analysis, court-ready blockchain report, crypto fraud investigation',
  alternates: { canonical: 'https://bizlegal-ai.com/tracr' },
  openGraph: {
    title: 'TRACR — AI Blockchain Forensic Investigation | DOR INNOVATIONS',
    description: 'AI-powered wallet tracing, fund flow analysis, court-ready blockchain forensic reports. From $99.',
    url: 'https://bizlegal-ai.com/tracr',
  },
}

export default function TRACRPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingTop: '36px' }}>
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)' }}>
        <div className="container" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" className="nav-logo" style={{ marginRight: 'auto' }}>DOR<em>INNOVATIONS</em></Link>
          <a href="https://tracr.bizlegal-ai.com" className="btn-primary" style={{ fontSize: '12px' }}>Join Waitlist →</a>
        </div>
      </div>

      <div style={{ padding: '90px 24px 70px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(94,234,212,0.2)', background: 'rgba(94,234,212,0.05)', fontSize: '11px', fontFamily: 'Geist Mono, monospace', color: 'var(--teal)', marginBottom: '28px' }}>
          🔬 Blockchain Forensic Intelligence · BETA
        </div>
        <h1 style={{ fontFamily: 'Gloock, serif', fontSize: 'clamp(44px, 6vw, 72px)', color: 'var(--white)', lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.02em' }}>
          TRACR — AI Forensic<br /><em style={{ fontStyle: 'italic', color: 'var(--teal)' }}>Investigation</em>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto 40px' }}>
          AI-powered blockchain forensic investigation. Wallet tracing, fund flow analysis, and court-ready reports for digital asset litigation, regulatory proceedings, and dispute resolution.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://tracr.bizlegal-ai.com" className="lx-btn-p" style={{ fontSize: '15px', padding: '16px 36px', background: 'rgba(94,234,212,0.1)', borderColor: 'rgba(94,234,212,0.3)', color: 'var(--teal)' }}>Join TRACR Waitlist →</a>
          <Link href="/blockchain-report" className="lx-btn-g">Free Blockchain Report First</Link>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* Use Cases */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', fontFamily: 'Geist Mono, monospace', marginBottom: '16px' }}>Use Cases</div>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '32px', color: 'var(--white)', marginBottom: '36px' }}>
            When you need TRACR
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            {[
              { icon: '⚖️', title: 'Litigation Support', desc: 'Court-ready blockchain forensic reports for digital asset disputes. Admissible in common law and civil law jurisdictions.' },
              { icon: '🔍', title: 'Fraud Investigation', desc: 'Trace misappropriated funds across wallets, exchanges, and chains. AI-powered pattern recognition for fraud documentation.' },
              { icon: '🏛️', title: 'Regulatory Proceedings', desc: 'Expert forensic documentation for VARA, SEC, FCA, MAS regulatory investigations and enforcement actions.' },
              { icon: '🤝', title: 'Dispute Resolution', desc: 'Pre-litigation forensic analysis for mediation and arbitration proceedings involving digital asset disputes.' },
              { icon: '📊', title: 'Asset Recovery', desc: 'Map fund flows to identify recoverable assets. Works across Ethereum, Bitcoin, BNB Chain, Solana, and 20+ chains.' },
              { icon: '🔒', title: 'AML Investigation', desc: 'Anti-money laundering investigation support — transaction history, counterparty analysis, risk scoring.' },
            ].map(u => (
              <div key={u.title} style={{ padding: '24px', borderRadius: '14px', border: '1px solid rgba(125,211,252,0.08)', background: 'rgba(7,9,26,0.6)' }}>
                <div style={{ fontSize: '24px', marginBottom: '12px' }}>{u.icon}</div>
                <h3 style={{ fontFamily: 'Gloock, serif', fontSize: '16px', color: 'var(--white)', marginBottom: '8px' }}>{u.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.65, margin: 0 }}>{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* What's included */}
        <div style={{ padding: '40px', borderRadius: '20px', border: '1px solid rgba(94,234,212,0.15)', background: 'rgba(94,234,212,0.03)', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '28px', color: 'var(--white)', marginBottom: '24px' }}>What TRACR Delivers</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              'Wallet address forensic analysis',
              'Multi-chain fund flow mapping',
              'Transaction timeline reconstruction',
              'Counterparty identification & risk scoring',
              'Exchange interaction mapping',
              'Court-ready PDF forensic report',
              'Expert witness summary',
              'Chain-of-custody documentation',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: 'var(--muted)' }}>
                <span style={{ color: 'var(--teal)', fontSize: '12px', flexShrink: 0 }}>✓</span>{item}
              </div>
            ))}
          </div>
        </div>

        {/* Pricing */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '48px' }}>
          {[
            { name: 'Basic Report', price: '$99', features: ['Single wallet analysis', 'Fund flow summary', 'PDF report', '48hr delivery'] },
            { name: 'Standard Report', price: '$299', features: ['Multi-wallet tracing', 'Full fund flow map', 'Expert summary', 'Court-ready format', '24hr delivery'], featured: true },
            { name: 'Expert Report', price: '$599', features: ['Complex multi-chain investigation', 'Full timeline reconstruction', 'Expert witness notes', 'Litigation-ready package', 'Priority delivery'] },
          ].map(p => (
            <div key={p.name} style={{ padding: '28px', borderRadius: '16px', border: p.featured ? '1px solid rgba(94,234,212,0.3)' : '1px solid rgba(125,211,252,0.08)', background: p.featured ? 'rgba(94,234,212,0.04)' : 'rgba(7,9,26,0.6)', textAlign: 'center' }}>
              <div style={{ fontFamily: 'Gloock, serif', fontSize: '15px', color: 'var(--white)', marginBottom: '4px' }}>{p.name}</div>
              <div style={{ fontFamily: 'Gloock, serif', fontSize: '32px', color: p.featured ? 'var(--teal)' : 'var(--white)', marginBottom: '16px' }}>{p.price}</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginBottom: '20px' }}>
                {p.features.map(f => (
                  <div key={f} style={{ fontSize: '12px', color: 'var(--muted)' }}>✓ {f}</div>
                ))}
              </div>
              <a href="https://tracr.bizlegal-ai.com" style={{ display: 'block', padding: '10px', borderRadius: '8px', fontSize: '12px', fontFamily: 'Geist Mono, monospace', fontWeight: 700, textDecoration: 'none', background: p.featured ? 'rgba(94,234,212,0.1)' : 'rgba(125,211,252,0.06)', color: p.featured ? 'var(--teal)' : 'var(--sky)', border: `1px solid ${p.featured ? 'rgba(94,234,212,0.25)' : 'rgba(125,211,252,0.15)'}` }}>
                Join Waitlist →
              </a>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ padding: '48px', borderRadius: '20px', background: 'radial-gradient(ellipse at 50% 0%, rgba(94,234,212,0.06) 0%, rgba(7,9,26,0.9) 60%)', border: '1px solid rgba(94,234,212,0.12)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '28px', color: 'var(--white)', marginBottom: '12px' }}>
            TRACR is in beta
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '28px', lineHeight: 1.75 }}>
            Join the waitlist for priority access. Early adopter pricing available for litigation firms and digital asset attorneys.
          </p>
          <a href="https://tracr.bizlegal-ai.com" style={{ display: 'inline-block', padding: '16px 40px', borderRadius: '10px', fontSize: '14px', fontFamily: 'Geist Mono, monospace', fontWeight: 700, background: 'rgba(94,234,212,0.1)', border: '1px solid rgba(94,234,212,0.3)', color: 'var(--teal)', textDecoration: 'none' }}>
            Join TRACR Waitlist →
          </a>
        </div>
      </div>
    </div>
  )
}

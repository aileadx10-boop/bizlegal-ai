'use client'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{ maxWidth: 1100, margin: '0 auto', padding: '100px 24px 80px', position: 'relative', zIndex: 1 }}>
      <div style={{ maxWidth: 720 }}>
        <div className="label-mono" style={{ marginBottom: 24 }}>
          Blockchain Forensic Intelligence
        </div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(36px, 6vw, 64px)', fontWeight: 700, color: 'var(--text-bright)', lineHeight: 1.08, marginBottom: 28 }}>
          48-Hour On-Chain Evidence<br />
          <span style={{ color: 'var(--amber)' }}>For Legal Proceedings</span>
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.75, color: 'var(--text)', maxWidth: 560, marginBottom: 40 }}>
          Attorney-ready, court-formatted forensic reports. No blockchain expertise required.
          Used by litigation teams for fraud investigations, asset recovery, and AML compliance.
        </p>
        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap', alignItems: 'center' }}>
          <a href="#analyze" className="btn-primary" style={{ fontSize: 15 }}>
            Analyze a Wallet Free →
          </a>
          <a href="/sample-report.pdf" className="btn-outline" target="_blank" rel="noopener" style={{ fontSize: 15 }}>
            View Sample Report
          </a>
        </div>
        <div style={{ marginTop: 40, display: 'flex', gap: 32, flexWrap: 'wrap' }}>
          {[['142', 'Wallets Analyzed'], ['8', 'Jurisdictions Served'], ['$99', 'vs $2,000+ Traditional']].map(([num, label]) => (
            <div key={label}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 22, color: 'var(--amber)', fontWeight: 500 }}>{num}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

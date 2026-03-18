import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'BRAI — AI Regulatory Risk Intelligence for Digital Assets | DOR INNOVATIONS',
  description: 'BRAI by DOR INNOVATIONS: AI-powered regulatory risk intelligence scanning VARA, MiCA, SEC, MAS simultaneously. Identify digital asset regulatory exposure before it becomes structural liability. Free scan.',
  keywords: 'BRAI regulatory intelligence, AI crypto compliance, VARA MiCA SEC compliance tool, digital asset regulatory scan, blockchain regulatory risk, DOR INNOVATIONS BRAI',
  alternates: { canonical: 'https://bizlegal-ai.com/brai' },
  openGraph: {
    title: 'BRAI — AI Regulatory Risk Intelligence | DOR INNOVATIONS',
    description: 'Scan your digital asset venture against VARA, MiCA, SEC, MAS simultaneously. Free AI regulatory risk intelligence.',
    url: 'https://bizlegal-ai.com/brai',
  },
}

export default function BRAIPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingTop: '36px' }}>
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)' }}>
        <div className="container" style={{ padding: '18px 24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" className="nav-logo" style={{ marginRight: 'auto' }}>DOR<em>INNOVATIONS</em></Link>
          <a href="https://brai.bizlegal-ai.com" className="btn-primary" style={{ fontSize: '12px' }}>Free Scan →</a>
        </div>
      </div>

      {/* Hero */}
      <div style={{ padding: '90px 24px 70px', maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '5px 14px', borderRadius: '100px', border: '1px solid rgba(165,180,252,0.25)', background: 'rgba(165,180,252,0.06)', fontSize: '11px', fontFamily: 'Geist Mono, monospace', color: 'var(--indigo)', marginBottom: '28px' }}>
          ⚡ AI Regulatory Intelligence
        </div>
        <h1 style={{ fontFamily: 'Gloock, serif', fontSize: 'clamp(44px, 6vw, 72px)', color: 'var(--white)', lineHeight: 1.05, marginBottom: '24px', letterSpacing: '-0.02em' }}>
          BRAI — Blockchain<br /><em style={{ fontStyle: 'italic', color: 'var(--indigo)' }}>Regulatory AI Intelligence</em>
        </h1>
        <p style={{ fontSize: '18px', color: 'var(--muted)', lineHeight: 1.8, maxWidth: '620px', margin: '0 auto 40px' }}>
          Scan your digital asset venture against VARA, MiCA, SEC, and MAS simultaneously. Identify regulatory exposure before it becomes structural liability. Free in under 60 seconds.
        </p>
        <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <a href="https://brai.bizlegal-ai.com" className="lx-btn-ind" style={{ fontSize: '15px', padding: '16px 36px' }}>Run Free Scan Now →</a>
          <a href="https://brai.bizlegal-ai.com" className="lx-btn-g">View Sample Report</a>
        </div>
      </div>

      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px 80px' }}>

        {/* How it works */}
        <div style={{ marginBottom: '60px' }}>
          <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', fontFamily: 'Geist Mono, monospace', marginBottom: '20px' }}>How BRAI Works</div>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '36px', color: 'var(--white)', marginBottom: '48px' }}>
            Three steps to regulatory<br /><em style={{ fontStyle: 'italic', color: 'var(--sky)' }}>clarity</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
            {[
              { n: '01', title: 'Submit Venture Structure', desc: 'Describe your token model, jurisdiction, and business activity. BRAI applies the DOR INNOVATIONS regulatory framework.' },
              { n: '02', title: 'AI Scans 4 Regulators', desc: 'VARA · MiCA · SEC · MAS — scanned simultaneously against your venture structure in under 60 seconds.' },
              { n: '03', title: 'Receive Risk Intelligence', desc: 'Exposure flags, regulatory pathway, jurisdiction comparison, and structured action plan — ready to act on.' },
            ].map(s => (
              <div key={s.n} style={{ padding: '32px', borderRadius: '16px', border: '1px solid rgba(125,211,252,0.08)', background: 'rgba(7,9,26,0.7)' }}>
                <div style={{ fontFamily: 'Geist Mono, monospace', fontSize: '28px', fontWeight: 700, color: 'rgba(125,211,252,0.15)', marginBottom: '16px' }}>{s.n}</div>
                <h3 style={{ fontFamily: 'Gloock, serif', fontSize: '18px', color: 'var(--white)', marginBottom: '10px' }}>{s.title}</h3>
                <p style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.7, margin: 0 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Jurisdictions */}
        <div style={{ marginBottom: '60px' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '32px', color: 'var(--white)', marginBottom: '28px' }}>6 Jurisdictions. <em style={{ fontStyle: 'italic', color: 'var(--sky)' }}>One scan.</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px' }}>
            {[
              { flag: '🇦🇪', name: 'UAE / DIFC', reg: 'VARA · DFSA', color: '#fbbf24' },
              { flag: '🇪🇺', name: 'European Union', reg: 'MiCA · ESMA', color: 'var(--sky)' },
              { flag: '🇺🇸', name: 'United States', reg: 'SEC · CFTC', color: 'var(--teal)' },
              { flag: '🇸🇬', name: 'Singapore', reg: 'MAS · PS Act', color: 'var(--indigo)' },
              { flag: '🇬🇧', name: 'United Kingdom', reg: 'FCA · Crypto', color: '#38bdf8' },
              { flag: '🇨🇦', name: 'Canada', reg: 'CSA · FINTRAC', color: '#fb7185' },
            ].map(j => (
              <div key={j.name} style={{ padding: '20px', borderRadius: '12px', border: '1px solid rgba(125,211,252,0.08)', background: 'rgba(7,9,26,0.6)', display: 'flex', gap: '12px', alignItems: 'center' }}>
                <span style={{ fontSize: '24px' }}>{j.flag}</span>
                <div>
                  <div style={{ fontSize: '14px', color: 'var(--white)', fontWeight: 600, marginBottom: '2px' }}>{j.name}</div>
                  <div style={{ fontSize: '11px', fontFamily: 'Geist Mono, monospace', color: 'var(--muted)' }}>{j.reg}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* What you get */}
        <div style={{ padding: '40px', borderRadius: '20px', border: '1px solid rgba(165,180,252,0.15)', background: 'rgba(165,180,252,0.04)', marginBottom: '40px' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '28px', color: 'var(--white)', marginBottom: '24px' }}>What You Get</h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {[
              'Multi-jurisdiction compliance status',
              'Howey Test analysis (US)',
              'VARA licensing pathway (UAE)',
              'MiCA token classification',
              'AML/KYC requirement flags',
              'Regulatory exposure risk score',
              'Jurisdiction comparison matrix',
              'Structured action plan',
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: '10px', alignItems: 'center', fontSize: '13px', color: 'var(--muted)' }}>
                <span style={{ color: 'var(--teal)', fontSize: '12px' }}>✓</span>{item}
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div style={{ padding: '60px', borderRadius: '20px', background: 'radial-gradient(ellipse at 50% 0%, rgba(165,180,252,0.08) 0%, rgba(7,9,26,0.9) 60%)', border: '1px solid rgba(165,180,252,0.15)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '32px', color: 'var(--white)', marginBottom: '12px' }}>
            Run your free BRAI scan
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '28px', lineHeight: 1.75 }}>
            No signup required. No credit card. Results in under 60 seconds.
          </p>
          <a href="https://brai.bizlegal-ai.com" className="lx-btn-ind" style={{ fontSize: '15px', padding: '16px 40px' }}>
            Start Free Scan →
          </a>
          <p style={{ fontSize: '11px', color: 'var(--dim)', marginTop: '16px', fontFamily: 'Geist Mono, monospace' }}>
            Powered by Claude AI · DOR INNOVATIONS commercial attorney depth
          </p>
        </div>
      </div>
    </div>
  )
}

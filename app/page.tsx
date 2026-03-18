import HeroSection   from '@/components/HeroSection'
import TrustBar      from '@/components/TrustBar'
import WalletAnalyzer from '@/components/WalletAnalyzer'
import PricingCards  from '@/components/PricingCards'
import OrderForm     from '@/components/OrderForm'
import { FileText, Search, Brain, Download, CheckCircle, Scale } from 'lucide-react'
import Link from 'next/link'

const HOW_IT_WORKS = [
  { icon: Search,      step: '01', title: 'Submit Wallet Address',    desc: 'Enter any Ethereum address. We fetch on-chain data from public blockchain records.' },
  { icon: Brain,       step: '02', title: 'AI Forensic Analysis',     desc: '4-stage Claude AI pipeline: pattern extraction → risk classification → legal framing → synthesis.' },
  { icon: FileText,    step: '03', title: 'Court-Ready PDF Generated', desc: '8-section report with cover page, risk score, findings, behavioral analysis, legal context.' },
  { icon: Download,    step: '04', title: 'Delivered in 24–48 Hours', desc: 'PDF emailed directly with unique Report ID (TR-YYYY-NNNNN) and download link.' },
]

const FAQ = [
  {
    q: 'What is a TRACR forensic report?',
    a: 'TRACR uses AI-powered blockchain analysis to trace wallet transactions, identify behavioral patterns, detect high-risk activity, and produce court-formatted PDF reports. Used by legal teams for fraud investigations, asset recovery, and AML compliance.',
  },
  {
    q: 'Is this report admissible in court?',
    a: 'TRACR reports document publicly available on-chain data with clear methodology. They serve as investigative intelligence and starting points for expert witness testimony. Consult qualified legal counsel regarding admissibility in your jurisdiction.',
  },
  {
    q: 'What blockchain networks do you support?',
    a: 'Currently: Ethereum, BNB Chain, Polygon, Arbitrum, and Optimism. Additional networks available on request for litigation packages.',
  },
  {
    q: 'What data sources do you use?',
    a: 'On-chain transaction data via Covalent API with Etherscan fallback. OFAC SDN list cross-referencing. AI heuristics for pattern analysis. All sources cited in the report methodology section.',
  },
  {
    q: 'Is this legal advice?',
    a: 'No. TRACR reports are for informational and professional reference only. All findings are risk indicators, not legal conclusions. Always consult qualified legal counsel before taking action.',
  },
]

export default function HomePage() {
  return (
    <main style={{ position: 'relative', zIndex: 1 }}>
      {/* Nav */}
      <nav style={{ position: 'sticky', top: 0, zIndex: 100, background: 'rgba(5,6,8,0.95)', backdropFilter: 'blur(12px)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: 60 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 20, letterSpacing: '0.1em', color: 'var(--text-bright)', fontWeight: 500 }}>
            TRA<span style={{ color: 'var(--amber)' }}>C</span>R
          </div>
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <Link href="/methodology" style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.1em', color: 'var(--muted)', textDecoration: 'none', padding: '8px 12px' }}>
              Methodology
            </Link>
            <a href="#pricing" className="btn-outline" style={{ padding: '8px 18px', fontSize: 13 }}>
              Pricing
            </a>
            <a href="#order" className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>
              Order Report
            </a>
          </div>
        </div>
      </nav>

      <HeroSection />
      <TrustBar />

      {/* How it works */}
      <section style={{ padding: '80px 24px', background: 'var(--surface)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <div className="label-mono" style={{ textAlign: 'center', marginBottom: 16 }}>Process</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: 'var(--text-bright)', textAlign: 'center', marginBottom: 48 }}>
            How TRACR Works
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 1, background: 'var(--border)' }}>
            {HOW_IT_WORKS.map(({ icon: Icon, step, title, desc }) => (
              <div key={step} style={{ background: 'var(--surface)', padding: '32px 24px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <Icon size={20} style={{ color: 'var(--amber)' }} />
                  <span style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--border-light)', letterSpacing: '0.15em' }}>{step}</span>
                </div>
                <h3 style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-bright)', marginBottom: 10, lineHeight: 1.4 }}>{title}</h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <WalletAnalyzer />
      <PricingCards />

      {/* Methodology teaser */}
      <section style={{ padding: '60px 24px', background: 'var(--deep)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: 'center' }}>
          <Scale size={28} style={{ color: 'var(--amber)', margin: '0 auto 16px' }} />
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(22px, 3vw, 32px)', fontWeight: 700, color: 'var(--text-bright)', marginBottom: 16 }}>
            Built for Legal Professionals
          </h2>
          <p style={{ color: 'var(--text)', lineHeight: 1.75, marginBottom: 24, maxWidth: 560, margin: '0 auto 24px' }}>
            Every TRACR report cites its data sources, explains its methodology, and uses cautious, evidence-based language appropriate for legal proceedings. We never assert criminality — only risk indicators.
          </p>
          <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap', marginBottom: 24 }}>
            {['OFAC SDN Cross-Referenced', 'Methodology Documented', 'Not Legal Advice', 'Attorney-Reviewed Format'].map(tag => (
              <span key={tag} style={{ display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', background: 'var(--surface)', border: '1px solid var(--border)', padding: '6px 12px' }}>
                <CheckCircle size={10} style={{ color: 'var(--amber)' }} /> {tag}
              </span>
            ))}
          </div>
          <Link href="/methodology" style={{ fontFamily: 'var(--mono)', fontSize: 12, color: 'var(--amber)', textDecoration: 'none', letterSpacing: '0.1em' }}>
            Read Full Methodology →
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section style={{ padding: '80px 24px', background: 'var(--black)', borderTop: '1px solid var(--border)' }}>
        <div style={{ maxWidth: 720, margin: '0 auto' }}>
          <div className="label-mono" style={{ textAlign: 'center', marginBottom: 16 }}>FAQ</div>
          <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 700, color: 'var(--text-bright)', textAlign: 'center', marginBottom: 40 }}>
            Common Questions
          </h2>
          {FAQ.map(({ q, a }) => (
            <details key={q} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
              <summary style={{ fontSize: 15, fontWeight: 600, color: 'var(--text-bright)', cursor: 'pointer', listStyle: 'none', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {q}
                <span style={{ color: 'var(--amber)', fontSize: 20, fontWeight: 300, flexShrink: 0, marginLeft: 16 }}>+</span>
              </summary>
              <p style={{ marginTop: 12, fontSize: 14, color: 'var(--muted)', lineHeight: 1.75 }}>{a}</p>
            </details>
          ))}
        </div>
      </section>

      <OrderForm />

      {/* Footer */}
      <footer style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)', padding: '40px 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 20 }}>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 18, letterSpacing: '0.1em', color: 'var(--text-bright)' }}>
            TRA<span style={{ color: 'var(--amber)' }}>C</span>R
          </div>
          <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
            {[['Methodology', '/methodology'], ['Pricing', '#pricing'], ['BizLegal AI', 'https://bizlegal-ai.com']].map(([label, href]) => (
              <a key={label} href={href} style={{ fontFamily: 'var(--mono)', fontSize: 11, color: 'var(--muted)', textDecoration: 'none', letterSpacing: '0.1em' }}>
                {label}
              </a>
            ))}
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 10, color: 'var(--muted)', textAlign: 'right' }}>
            © {new Date().getFullYear()} TRACR Intelligence<br />
            <span style={{ color: 'var(--border-light)' }}>Not legal advice</span>
          </div>
        </div>
      </footer>
    </main>
  )
}

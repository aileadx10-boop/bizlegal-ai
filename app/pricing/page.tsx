// app/pricing/page.tsx
// BizLegal AI — Pricing Page

import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Pricing — BizLegal AI | Legal Templates from $49',
  description: 'Transparent pricing for AI-powered legal templates, compliance scanning, and forensic investigation. DocStack from $49. BRAI free scan. TRACR $99/report.',
}

const DOCSTACK_FEATURES = [
  'Lawyer-drafted contract templates',
  'DOCX + PDF instant download',
  'JV, NDA, LOI, Capital Call, LLC Operating Agreement',
  '6 jurisdictions: UAE, EU, US, Singapore, UK, Canada',
  '7-day money-back guarantee',
  'AI clause customisation',
  'Inline legal explanations',
]

const BRAI_FREE = [
  '1 compliance scan per month',
  'VARA, MiCA, SEC, MAS coverage',
  'Basic risk flag report',
  'Jurisdiction comparison',
]

const BRAI_PRO = [
  'Everything in Free',
  'Unlimited compliance scans',
  'Full PDF compliance report',
  'Priority processing',
  'Webhook alerts for regulation changes',
  'Team access (3 seats)',
]

const TRACR_FEATURES = [
  'AI-powered wallet tracing',
  'On-chain forensic investigation',
  'Court-ready PDF report',
  'Exchange identification',
  'Fraud pattern detection',
  'Turnaround: 24–48 hours',
]

const FAQS = [
  {
    q: 'Are these templates legally binding?',
    a: 'Yes. All templates are drafted by a qualified solicitor with LLB + LLM and 20+ years of legal practice covering $100M+ in transactions. They are designed for use as-is or with minor customisation. We always recommend review by local counsel for high-value or complex deals.',
  },
  {
    q: 'Which jurisdictions are covered?',
    a: 'UAE / DIFC, European Union (MiCA), United States (SEC/CFTC), Singapore (MAS), United Kingdom (FCA), and Canada (CSA/FINTRAC). New jurisdictions are added regularly.',
  },
  {
    q: 'Can I get a refund?',
    a: 'DocStack templates come with a 7-day money-back guarantee. If you\'re not satisfied with the quality, contact us and we\'ll refund you, no questions asked.',
  },
  {
    q: 'How fast do I get my document?',
    a: 'DocStack generates DOCX + PDF in approximately 60 seconds after you complete the intake form. TRACR forensic reports are delivered within 24–48 hours.',
  },
  {
    q: 'Is my data secure?',
    a: 'All data is encrypted in transit and at rest. We use Supabase (Postgres) with row-level security. We never sell or share your data with third parties.',
  },
]

export default function PricingPage() {
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--text)', fontFamily: "'Geist Mono', monospace", minHeight: '100vh' }}>

      {/* NAV */}
      <nav>
        <div className="nav-wrap">
          <Link href="/" className="nav-logo">BizLegal<em>AI</em></Link>
          <div className="nav-menu">
            <Link href="/#guides" className="nav-link">Free Guides</Link>
            <Link href="/pricing" className="nav-link" style={{ color: 'var(--sky)' }}>Pricing</Link>
          </div>
          <div className="nav-right">
            <a href="https://docstack.bizlegal-ai.com" className="btn-primary">Get Templates</a>
          </div>
        </div>
      </nav>

      <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 40px 120px' }}>

        {/* HERO */}
        <div style={{ textAlign: 'center', marginBottom: '72px' }}>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            padding: '6px 18px', borderRadius: '100px',
            border: '1px solid rgba(125,211,252,0.22)', background: 'rgba(125,211,252,0.05)',
            fontSize: '11px', letterSpacing: '0.2em', textTransform: 'uppercase',
            color: 'var(--sky)', marginBottom: '28px',
          }}>
            Transparent Pricing · No Hidden Fees
          </div>
          <h1 style={{
            fontFamily: "'Gloock', serif",
            fontSize: 'clamp(42px, 6vw, 78px)',
            color: '#fff', lineHeight: 1.05,
            letterSpacing: '-0.02em', marginBottom: '18px',
          }}>
            Legal intelligence.<br /><em style={{ color: 'var(--sky)', fontStyle: 'italic' }}>Priced for builders.</em>
          </h1>
          <p style={{ fontSize: '17px', color: 'var(--muted)', maxWidth: '540px', margin: '0 auto', lineHeight: 1.75 }}>
            Lawyer-grade contracts, AI compliance scans, and forensic reports — at a fraction of traditional legal costs.
          </p>
        </div>

        {/* PRICING CARDS */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '16px', marginBottom: '80px' }}>

          {/* DocStack */}
          <div style={{
            borderRadius: '20px', padding: '36px', border: '1px solid rgba(125,211,252,0.25)',
            background: 'rgba(7,9,26,0.8)', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(125,211,252,0.3), transparent)' }} />
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--sky)', marginBottom: '12px', fontWeight: 700 }}>DocStack</div>
            <div style={{ fontFamily: "'Gloock', serif", fontSize: '48px', color: '#fff', lineHeight: 1, marginBottom: '4px' }}>$49</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '24px' }}>per document · instant download</div>
            <a href="https://docstack.bizlegal-ai.com" style={{
              display: 'block', textAlign: 'center', padding: '13px',
              borderRadius: '8px', background: 'rgba(125,211,252,0.1)',
              border: '1px solid rgba(125,211,252,0.45)', color: 'var(--sky)',
              fontFamily: "'Geist Mono', monospace", fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.05em', textDecoration: 'none', marginBottom: '28px',
              transition: 'all 0.2s',
            }}>
              Get Contract →
            </a>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              {DOCSTACK_FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '7px 0', fontSize: '12px', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--teal)', flexShrink: 0 }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          {/* BRAI */}
          <div style={{
            borderRadius: '20px', padding: '36px', border: '1px solid rgba(165,180,252,0.25)',
            background: 'rgba(7,9,26,0.8)', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(165,180,252,0.3), transparent)' }} />
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--indigo)', marginBottom: '12px', fontWeight: 700 }}>BRAI</div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', marginBottom: '4px' }}>
              <div style={{ fontFamily: "'Gloock', serif", fontSize: '48px', color: '#fff', lineHeight: 1 }}>Free</div>
              <div style={{ fontFamily: "'Gloock', serif", fontSize: '24px', color: 'var(--muted)', lineHeight: 1, marginBottom: '6px' }}>→ $49<span style={{ fontSize: '14px' }}>/mo</span></div>
            </div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '24px' }}>start free · upgrade for unlimited</div>
            <a href="https://brai.bizlegal-ai.com" style={{
              display: 'block', textAlign: 'center', padding: '13px',
              borderRadius: '8px', background: 'rgba(165,180,252,0.1)',
              border: '1px solid rgba(165,180,252,0.45)', color: 'var(--indigo)',
              fontFamily: "'Geist Mono', monospace", fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.05em', textDecoration: 'none', marginBottom: '28px',
            }}>
              Run Free Scan →
            </a>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--indigo)', marginBottom: '10px', fontWeight: 700 }}>Free includes</div>
              {BRAI_FREE.map(f => (
                <div key={f} style={{ display: 'flex', gap: '10px', padding: '5px 0', fontSize: '12px', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--teal)', flexShrink: 0 }}>✓</span>{f}
                </div>
              ))}
              <div style={{ fontSize: '10px', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--indigo)', margin: '16px 0 10px', fontWeight: 700 }}>Pro ($49/mo) adds</div>
              {BRAI_PRO.map(f => (
                <div key={f} style={{ display: 'flex', gap: '10px', padding: '5px 0', fontSize: '12px', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--sky)', flexShrink: 0 }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>

          {/* TRACR */}
          <div style={{
            borderRadius: '20px', padding: '36px', border: '1px solid rgba(94,234,212,0.25)',
            background: 'rgba(7,9,26,0.8)', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ position: 'absolute', top: 0, left: '20%', right: '20%', height: '1px', background: 'linear-gradient(90deg, transparent, rgba(94,234,212,0.3), transparent)' }} />
            <div style={{ fontSize: '10px', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--teal)', marginBottom: '12px', fontWeight: 700 }}>TRACR</div>
            <div style={{ fontFamily: "'Gloock', serif", fontSize: '48px', color: '#fff', lineHeight: 1, marginBottom: '4px' }}>$99</div>
            <div style={{ fontSize: '12px', color: 'var(--muted)', marginBottom: '24px' }}>per forensic report · 24–48h delivery</div>
            <a href="https://tracr.bizlegal-ai.com" style={{
              display: 'block', textAlign: 'center', padding: '13px',
              borderRadius: '8px', background: 'rgba(94,234,212,0.1)',
              border: '1px solid rgba(94,234,212,0.45)', color: 'var(--teal)',
              fontFamily: "'Geist Mono', monospace", fontSize: '13px', fontWeight: 700,
              letterSpacing: '0.05em', textDecoration: 'none', marginBottom: '28px',
            }}>
              Order Report →
            </a>
            <div style={{ borderTop: '1px solid var(--border)', paddingTop: '20px' }}>
              {TRACR_FEATURES.map(f => (
                <div key={f} style={{ display: 'flex', gap: '10px', padding: '7px 0', fontSize: '12px', color: 'var(--muted)' }}>
                  <span style={{ color: 'var(--teal)', flexShrink: 0 }}>✓</span>{f}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* COMPARISON TABLE */}
        <div style={{ marginBottom: '80px' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <h2 style={{ fontFamily: "'Gloock', serif", fontSize: 'clamp(28px,3.5vw,44px)', color: '#fff', marginBottom: '10px' }}>
              BizLegal AI vs. <em style={{ color: 'var(--sky)', fontStyle: 'italic' }}>Traditional Lawyers</em>
            </h2>
          </div>
          <div style={{ border: '1px solid var(--border2)', borderRadius: '16px', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', background: 'rgba(4,6,14,0.8)', borderBottom: '1px solid var(--border)' }}>
              {['Feature', 'Traditional', 'BizLegal AI'].map((h, i) => (
                <div key={h} style={{ padding: '16px 24px', fontSize: '11px', letterSpacing: '0.15em', textTransform: 'uppercase', color: i === 2 ? 'var(--sky)' : 'var(--muted)', fontWeight: 700, textAlign: i > 0 ? 'center' : 'left' }}>{h}</div>
              ))}
            </div>
            {[
              ['Contract template', '$3,000–$8,000', '$49'],
              ['Turnaround time', '2–4 weeks', '60 seconds'],
              ['Compliance scan', '$500+/hour', 'Free / $49/mo'],
              ['Forensic report', '$2,000+', '$99'],
              ['Jurisdiction coverage', '1 (their country)', '6 jurisdictions'],
              ['24/7 availability', '✗', '✓'],
              ['Instant download', '✗', '✓'],
              ['Money-back guarantee', '✗', '7-day'],
            ].map(([feature, trad, bizlegal], i) => (
              <div key={feature} style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr', borderBottom: i < 7 ? '1px solid rgba(125,211,252,0.04)' : 'none' }}>
                <div style={{ padding: '14px 24px', fontSize: '13px', color: 'var(--text)' }}>{feature}</div>
                <div style={{ padding: '14px 24px', fontSize: '13px', color: 'var(--dim)', textAlign: 'center' }}>{trad}</div>
                <div style={{ padding: '14px 24px', fontSize: '13px', color: 'var(--teal)', textAlign: 'center', fontWeight: 600 }}>{bizlegal}</div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{ fontFamily: "'Gloock', serif", fontSize: 'clamp(28px,3.5vw,44px)', color: '#fff', marginBottom: '40px', textAlign: 'center' }}>
            Pricing <em style={{ color: 'var(--sky)', fontStyle: 'italic' }}>FAQ</em>
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {FAQS.map(({ q, a }) => (
              <div key={q} style={{ padding: '24px 28px', border: '1px solid var(--border)', borderRadius: '12px', background: 'rgba(7,9,26,0.6)' }}>
                <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '10px' }}>{q}</div>
                <div style={{ fontSize: '13px', color: 'var(--muted)', lineHeight: 1.75 }}>{a}</div>
              </div>
            ))}
          </div>
        </div>

        {/* BOTTOM CTA */}
        <div style={{ textAlign: 'center', padding: '60px', border: '1px solid rgba(125,211,252,0.15)', borderRadius: '20px', background: 'rgba(7,9,26,0.8)' }}>
          <h2 style={{ fontFamily: "'Gloock', serif", fontSize: 'clamp(26px,3vw,40px)', color: '#fff', marginBottom: '12px' }}>
            Start with a free compliance scan
          </h2>
          <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '32px' }}>
            No credit card required. See your regulatory exposure in minutes.
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <a href="https://brai.bizlegal-ai.com" className="btn-hero btn-hero-p">Run Free Scan</a>
            <a href="https://docstack.bizlegal-ai.com" className="btn-hero btn-hero-g">Browse Templates — from $49</a>
          </div>
        </div>

      </div>

      <footer>
        <div className="container">
          <div className="foot-bottom" style={{ justifyContent: 'center', gap: '24px' }}>
            <Link href="/" className="fcol-a">Home</Link>
            <Link href="/pricing" className="fcol-a">Pricing</Link>
            <a href="https://docstack.bizlegal-ai.com" className="fcol-a">DocStack</a>
            <a href="https://brai.bizlegal-ai.com" className="fcol-a">BRAI</a>
            <a href="https://tracr.bizlegal-ai.com" className="fcol-a">TRACR</a>
            <Link href="/terms" className="fcol-a">Terms</Link>
            <Link href="/privacy" className="fcol-a">Privacy</Link>
          </div>
          <div style={{ textAlign: 'center', marginTop: '16px', fontSize: '11px', color: 'var(--dim)' }}>
            © 2025 BizLegal AI · Templates only — not legal advice
          </div>
        </div>
      </footer>
    </div>
  )
}

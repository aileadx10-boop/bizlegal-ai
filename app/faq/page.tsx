'use client'
import { useState } from 'react'
import Link from 'next/link'

const FAQS = [
  {
    cat: 'Products & Pricing',
    items: [
      { q: 'How much does BizLegal AI cost?', a: 'DocStack contract templates start from $49 per document — instant DOCX + PDF download. BRAI compliance scanning is free for your first scan, then $49/month for unlimited scans. TRACR forensic investigation reports are $99 each, delivered in 24–48 hours.' },
      { q: 'Is there a free trial?', a: 'Yes. BRAI offers a completely free first compliance scan — no credit card required. You can scan your protocol, whitepaper, or platform for VARA, MiCA, SEC, MAS, and FCA compliance instantly.' },
      { q: 'Do you offer refunds?', a: 'DocStack templates come with a 7-day satisfaction guarantee. If the template does not meet your legal need, contact us for a full refund. TRACR and BRAI subscriptions are non-refundable after use, but we will work with you to resolve any issues.' },
      { q: 'Can I use a template for multiple jurisdictions?', a: 'Some templates are jurisdiction-specific (e.g., UAE VARA registration agreement, EU MiCA whitepaper). Others are international. Each template listing clearly states its jurisdiction scope. Custom multi-jurisdiction bundles are available on request.' },
    ],
  },
  {
    cat: 'Legal Templates',
    items: [
      { q: 'Are the legal templates legally binding?', a: 'All templates are drafted by a qualified solicitor with LLB + LLM degrees and 20+ years of legal practice, covering over $100M in transactions. They are professional templates — not legal advice. For high-value or complex deals, you should review with qualified local counsel.' },
      { q: 'Which jurisdictions do you cover?', a: 'We cover UAE (VARA, DFSA, DIFC), European Union (MiCA, ESMA, GDPR), United States (SEC, CFTC, Delaware), Singapore (MAS, Payment Services Act), United Kingdom (FCA), and Canada (CSA, FINTRAC). New jurisdictions are added regularly.' },
      { q: 'What formats are the templates delivered in?', a: 'All DocStack templates are delivered as editable Microsoft Word (.docx) files and PDF copies. Word files allow full customisation. PDFs are suitable for signing via DocuSign, HelloSign, or any e-signature platform.' },
      { q: 'Can I customise the templates?', a: 'Absolutely. All templates include clearly marked [BRACKETED] fields for your specific details. The Word format allows full editing. You can also request custom drafting services starting from $499.' },
    ],
  },
  {
    cat: 'AI Tools',
    items: [
      { q: 'How does the SaaS Terms Risk Scanner work?', a: 'Paste any SaaS contract or terms of service into the tool. Our AI (Claude Sonnet) analyzes it for unfair clauses, missing protections, liability gaps, and payment risks. You receive a risk score (0–100), red flags with fix suggestions, and negotiation points — in under 30 seconds.' },
      { q: 'Is the Website Compliance Checker accurate?', a: 'The checker scans your website for GDPR, CCPA, ADA/WCAG, ePrivacy, and cookie law compliance. It provides a compliance score and actionable fixes. It is a screening tool — for full legal compliance sign-off, a legal review is recommended.' },
      { q: 'Can the Debt Collection Letter Generator work internationally?', a: 'Yes. Specify your jurisdiction when generating the letter. The AI adapts the legal language, deadlines, and escalation language to match local debt collection law (UK, US, UAE, EU, Singapore, Australia, etc.).' },
      { q: 'What AI model powers the tools?', a: 'All AI tools are powered by Anthropic\'s Claude Sonnet — one of the most capable and safety-aligned large language models available. Claude is used for its exceptional legal reasoning, nuance, and ability to parse complex contractual language.' },
    ],
  },
  {
    cat: 'Compliance & BRAI',
    items: [
      { q: 'What regulations does BRAI scan for?', a: 'BRAI currently scans for: UAE VARA (Virtual Assets Regulatory Authority), EU MiCA (Markets in Crypto-Assets), US SEC/CFTC guidance, Singapore MAS DPT frameworks, UK FCA cryptoasset registration, Canada CSA/FINTRAC, and FATF travel rule requirements.' },
      { q: 'How current is the compliance data?', a: 'Our regulatory database is updated weekly. BRAI Pro subscribers receive real-time alerts when regulations affecting their jurisdiction or asset class change. All scans include a "Regulation as of" timestamp.' },
      { q: 'What is a TRACR forensic report?', a: 'TRACR uses AI-powered blockchain forensic analysis to trace wallet transactions, identify counterparty risk, detect mixer/tumbler usage, and produce court-ready PDF reports. Used by legal teams in fraud cases, asset recovery, and due diligence.' },
    ],
  },
  {
    cat: 'Security & Privacy',
    items: [
      { q: 'Is my data secure?', a: 'Yes. Data is encrypted in transit (TLS 1.3) and at rest (AES-256). We do not store contract text submitted to our AI tools beyond the session. Lead email addresses are stored in Supabase with row-level security. We never sell your data.' },
      { q: 'Do you store contracts I submit for analysis?', a: 'No. Contract text submitted to the SaaS Risk Scanner, Contract Fixer, and other tools is processed in-memory and never persisted to any database. API requests go directly to Anthropic and are not logged by us.' },
      { q: 'Are you GDPR compliant?', a: 'Yes. BizLegal AI operates under GDPR as a data controller. You have the right to access, rectify, and erase your personal data. Our Privacy Policy outlines full data handling practices. Contact privacy@bizlegal-ai.com for data requests.' },
    ],
  },
]

export default function FAQPage() {
  const [open, setOpen] = useState<string | null>(null)

  function toggle(key: string) {
    setOpen(prev => prev === key ? null : key)
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingTop: '36px' }}>
      {/* Header */}
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)', padding: '0' }}>
        <div className="container" style={{ paddingTop: '24px', paddingBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'Geist Mono, monospace' }}>← Home</Link>
        </div>
      </div>

      {/* Hero */}
      <div className="section" style={{ paddingTop: '80px', paddingBottom: '48px' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <div className="hero-badge" style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <span className="bdot" />&nbsp;Frequently Asked Questions
          </div>
          <h1 className="sh" style={{ marginBottom: '16px' }}>
            Everything you need<br />to <em>know</em>
          </h1>
          <p className="sdesc" style={{ margin: '0 auto' }}>
            Answers to the most common questions about our legal tools, templates, compliance scanning, and privacy practices.
          </p>
        </div>
      </div>

      {/* FAQ Sections */}
      <div className="section" style={{ paddingTop: '0' }}>
        <div className="container" style={{ maxWidth: '800px' }}>
          {FAQS.map(cat => (
            <div key={cat.cat} style={{ marginBottom: '56px' }}>
              <div className="eyebrow" style={{ marginBottom: '24px' }}>
                <span className="eline" />
                <span className="elabel">{cat.cat}</span>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {cat.items.map((item, i) => {
                  const key = `${cat.cat}-${i}`
                  const isOpen = open === key
                  return (
                    <div
                      key={key}
                      style={{
                        borderRadius: '12px',
                        border: `1px solid ${isOpen ? 'rgba(125,211,252,0.25)' : 'rgba(125,211,252,0.08)'}`,
                        background: isOpen ? 'rgba(125,211,252,0.04)' : 'rgba(7,9,26,0.6)',
                        transition: 'all 0.2s',
                        overflow: 'hidden',
                      }}
                    >
                      <button
                        onClick={() => toggle(key)}
                        style={{
                          width: '100%', textAlign: 'left', padding: '18px 22px',
                          background: 'none', border: 'none', cursor: 'pointer',
                          display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '16px',
                        }}
                      >
                        <span style={{ fontSize: '15px', color: 'var(--white)', fontFamily: 'Geist Mono, monospace', fontWeight: 600, lineHeight: 1.4 }}>
                          {item.q}
                        </span>
                        <span style={{ color: 'var(--sky)', fontSize: '18px', flexShrink: 0, transform: isOpen ? 'rotate(45deg)' : 'none', transition: 'transform 0.2s' }}>+</span>
                      </button>
                      {isOpen && (
                        <div style={{ padding: '0 22px 20px', fontSize: '14px', color: 'var(--muted)', lineHeight: 1.8 }}>
                          {item.a}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          ))}

          {/* CTA */}
          <div className="cta-banner" style={{ marginTop: '48px' }}>
            <h2>Still have questions?</h2>
            <p>Our legal team responds within 24 hours on business days.</p>
            <div className="cta-btns">
              <a href="mailto:hello@bizlegal-ai.com" className="btn-hero btn-hero-p">Email Us</a>
              <Link href="/tools" className="btn-hero btn-hero-g">Try a Free Tool</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

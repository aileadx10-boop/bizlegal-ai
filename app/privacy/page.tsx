import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Privacy Policy — DOR INNOVATIONS',
  description: 'How DOR INNOVATIONS collects, uses, and protects your personal data. GDPR, CCPA, and LGPD compliant.',
}

const UPDATED = '18 March 2025'

export default function PrivacyPage() {
  const s = { marginBottom: '28px' }
  const h = { fontFamily: 'Gloock, serif', fontSize: '22px', color: 'var(--white)', marginBottom: '14px', marginTop: '40px' } as const
  const p = { fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9, marginBottom: '14px' } as const
  const li = { fontSize: '14px', color: 'var(--muted)', lineHeight: 1.9, marginBottom: '8px', paddingLeft: '8px' } as const

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingTop: '36px' }}>
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)' }}>
        <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'Geist Mono, monospace' }}>← Home</Link>
        </div>
      </div>

      <div className="section" style={{ paddingTop: '60px' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <div className="hero-badge" style={{ display: 'inline-flex', marginBottom: '20px' }}>
            <span className="bdot" />&nbsp;Legal Document
          </div>
          <h1 style={{ fontFamily: 'Gloock, serif', fontSize: 'clamp(32px,5vw,56px)', color: 'var(--white)', marginBottom: '10px', lineHeight: 1.1 }}>
            Privacy Policy
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--dim)', marginBottom: '48px', fontFamily: 'Geist Mono, monospace' }}>Last updated: {UPDATED}</p>

          <div style={s}>
            <p style={p}>DOR INNOVATIONS (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website at <strong style={{ color: 'var(--sky)' }}>bizlegal-ai.com</strong> and our legal intelligence tools.</p>
            <p style={p}>By using our services, you agree to the collection and use of information in accordance with this policy. This policy complies with the EU General Data Protection Regulation (GDPR), the California Consumer Privacy Act (CCPA), Brazil&apos;s LGPD, and applicable UK and UAE data protection laws.</p>
          </div>

          <h2 style={h}>1. Information We Collect</h2>
          <p style={p}><strong style={{ color: 'var(--text)' }}>Information you provide directly:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={li}><strong>Email address</strong> — when you sign up for newsletters, lead magnets, or product waitlists.</li>
            <li style={li}><strong>Contact details</strong> — name, company, and message when you contact us.</li>
            <li style={li}><strong>Payment information</strong> — processed by Stripe. We never store raw card numbers.</li>
          </ul>
          <p style={{ ...p, marginTop: '14px' }}><strong style={{ color: 'var(--text)' }}>Information collected automatically:</strong></p>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={li}>Usage data (pages visited, time spent, clicks) via privacy-respecting analytics.</li>
            <li style={li}>Device information (browser, OS, screen size) for technical support.</li>
            <li style={li}>IP address (truncated to /24 subnet for GDPR compliance).</li>
          </ul>
          <p style={{ ...p, marginTop: '14px' }}><strong style={{ color: 'var(--text)' }}>AI Tool submissions (important):</strong></p>
          <p style={p}>Contract text, website URLs, and other content submitted to our AI analysis tools (SaaS Risk Scanner, Contract Fixer, Website Compliance Checker, Debt Collection Generator) is <strong style={{ color: 'var(--teal)' }}>processed in-memory only and never stored</strong> in our databases. This data is sent to Anthropic&apos;s API for analysis and is subject to Anthropic&apos;s data processing agreement.</p>

          <h2 style={h}>2. How We Use Your Information</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={li}>To provide and improve our legal intelligence services.</li>
            <li style={li}>To send you product updates, compliance alerts, and legal guides (with consent).</li>
            <li style={li}>To process transactions and deliver purchased templates.</li>
            <li style={li}>To respond to customer support requests.</li>
            <li style={li}>To comply with legal obligations and enforce our terms.</li>
            <li style={li}>To analyze aggregate usage patterns and improve our AI tools.</li>
          </ul>

          <h2 style={h}>3. Legal Basis for Processing (GDPR)</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={li}><strong>Contract performance</strong> — processing necessary to deliver purchased services.</li>
            <li style={li}><strong>Legitimate interests</strong> — fraud prevention, product improvement, security.</li>
            <li style={li}><strong>Consent</strong> — marketing emails (withdrawable at any time via unsubscribe link).</li>
            <li style={li}><strong>Legal obligation</strong> — tax, financial reporting, and regulatory compliance.</li>
          </ul>

          <h2 style={h}>4. Data Sharing & Third Parties</h2>
          <p style={p}>We do not sell your personal data. We share data only with:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={li}><strong>Supabase</strong> (PostgreSQL database, EU region) — stores email addresses and usage metadata.</li>
            <li style={li}><strong>Anthropic</strong> — processes AI tool submissions under their enterprise DPA.</li>
            <li style={li}><strong>Stripe</strong> — payment processing. PCI-DSS Level 1 certified.</li>
            <li style={li}><strong>Vercel</strong> — hosting and edge delivery. EU data residency available.</li>
            <li style={li}><strong>Law enforcement</strong> — if required by valid legal process.</li>
          </ul>

          <h2 style={h}>5. Data Retention</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={li}>Email addresses: retained until you unsubscribe or request deletion.</li>
            <li style={li}>Purchase records: 7 years (tax/accounting requirement).</li>
            <li style={li}>AI tool submissions: not retained (in-memory processing only).</li>
            <li style={li}>Analytics data: 13 months rolling window.</li>
          </ul>

          <h2 style={h}>6. Your Rights</h2>
          <p style={p}>Depending on your jurisdiction, you have the right to:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={li}><strong>Access</strong> — request a copy of your personal data.</li>
            <li style={li}><strong>Rectification</strong> — correct inaccurate personal data.</li>
            <li style={li}><strong>Erasure</strong> — &quot;right to be forgotten&quot; (subject to legal retention requirements).</li>
            <li style={li}><strong>Portability</strong> — receive your data in a machine-readable format.</li>
            <li style={li}><strong>Objection</strong> — object to processing based on legitimate interests.</li>
            <li style={li}><strong>Withdraw consent</strong> — unsubscribe from marketing at any time.</li>
          </ul>
          <p style={p}>To exercise any right, email <strong style={{ color: 'var(--sky)' }}>privacy@bizlegal-ai.com</strong>. We respond within 30 days.</p>

          <h2 style={h}>7. Cookies</h2>
          <p style={p}>We use essential cookies for site functionality and optional analytics cookies (with consent). We do not use tracking or advertising cookies. You can manage cookie preferences via our Cookie banner or your browser settings.</p>

          <h2 style={h}>8. International Transfers</h2>
          <p style={p}>Your data may be processed in the US (Anthropic, Vercel) and EU (Supabase). US transfers are covered by Standard Contractual Clauses (SCCs). You can request copies of applicable data transfer mechanisms.</p>

          <h2 style={h}>9. Children&apos;s Privacy</h2>
          <p style={p}>Our services are not directed to children under 16. We do not knowingly collect personal data from children. If you believe a child has provided data, contact us immediately.</p>

          <h2 style={h}>10. Changes to This Policy</h2>
          <p style={p}>We may update this policy periodically. Material changes will be notified via email (if you are subscribed) and a prominent notice on this page. Continued use after 30 days constitutes acceptance.</p>

          <h2 style={h}>11. Contact</h2>
          <p style={p}>For privacy-related enquiries, data subject requests, or complaints:</p>
          <div style={{ padding: '20px 24px', borderRadius: '12px', border: '1px solid rgba(125,211,252,0.15)', background: 'rgba(7,9,26,0.6)', marginTop: '8px' }}>
            <p style={{ ...p, marginBottom: '6px' }}><strong style={{ color: 'var(--sky)' }}>Email:</strong> privacy@bizlegal-ai.com</p>
            <p style={{ ...p, marginBottom: '6px' }}><strong style={{ color: 'var(--sky)' }}>Website:</strong> bizlegal-ai.com</p>
            <p style={{ ...p, marginBottom: '0' }}>You also have the right to lodge a complaint with your local supervisory authority (ICO in the UK, CNIL in France, etc.).</p>
          </div>
        </div>
      </div>
    </div>
  )
}

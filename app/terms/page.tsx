import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Terms & Conditions — BizLegal AI',
  description: 'Terms and conditions for using BizLegal AI legal intelligence platform, tools, and templates.',
}

const UPDATED = '18 March 2025'

export default function TermsPage() {
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
            Terms &amp; Conditions
          </h1>
          <p style={{ fontSize: '13px', color: 'var(--dim)', marginBottom: '48px', fontFamily: 'Geist Mono, monospace' }}>Last updated: {UPDATED}</p>

          <p style={p}>Please read these Terms and Conditions carefully before using BizLegal AI (&quot;Platform&quot;, &quot;Service&quot;). By accessing or using our services, you agree to be bound by these terms. If you disagree with any part, do not use our services.</p>

          <h2 style={h}>1. Acceptance of Terms</h2>
          <p style={p}>By creating an account, purchasing a product, or using any free tool on bizlegal-ai.com, you represent that you are at least 18 years old, have the legal capacity to enter into contracts, and agree to these Terms and our Privacy Policy.</p>

          <h2 style={h}>2. Nature of Services — Not Legal Advice</h2>
          <p style={p}><strong style={{ color: '#f87171' }}>IMPORTANT: BizLegal AI provides legal information and AI-assisted legal tools. We do not provide legal advice. No solicitor-client relationship is formed by using our platform.</strong></p>
          <p style={p}>Our templates are drafted by qualified solicitors as general professional documents. They are not tailored to your specific circumstances. For high-value transactions, complex disputes, or jurisdictions outside our coverage, you should engage qualified local legal counsel.</p>
          <p style={p}>AI tool outputs (risk scores, compliance analyses, generated letters) are informational only and should not be relied upon as definitive legal opinion.</p>

          <h2 style={h}>3. Products and Licenses</h2>
          <p style={p}><strong style={{ color: 'var(--text)' }}>DocStack Templates:</strong> Upon purchase, you receive a non-exclusive, non-transferable license to use the template for one transaction or matter. You may modify the template for that purpose. Resale, redistribution, or use in template libraries is prohibited.</p>
          <p style={p}><strong style={{ color: 'var(--text)' }}>BRAI Compliance Scanning:</strong> Free tier includes one scan per month. Pro subscribers ($49/month) receive unlimited scans. Subscription auto-renews monthly. Cancel anytime from your dashboard.</p>
          <p style={p}><strong style={{ color: 'var(--text)' }}>TRACR Forensic Reports:</strong> Each report is a one-time purchase ($99). Delivery in 24–48 business hours. Reports are for the purchaser&apos;s use only and may not be shared publicly without consent.</p>
          <p style={p}><strong style={{ color: 'var(--text)' }}>Free AI Tools:</strong> SaaS Risk Scanner, Contract Fixer, Website Compliance Checker, and Debt Collection Generator are provided free of charge with fair use limits (10 uses/day per IP). We reserve the right to rate-limit or restrict access.</p>

          <h2 style={h}>4. Payment and Refunds</h2>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={li}>All prices are in USD unless otherwise stated. VAT/GST may apply based on your location.</li>
            <li style={li}>Payments are processed by Stripe. We do not store card details.</li>
            <li style={li}>DocStack templates: 7-day satisfaction guarantee. Email support@bizlegal-ai.com for refund requests.</li>
            <li style={li}>BRAI Pro subscriptions: Cancel before renewal to avoid charges. No partial refunds for unused periods.</li>
            <li style={li}>TRACR reports: Non-refundable after delivery begins (24-hour window after purchase).</li>
          </ul>

          <h2 style={h}>5. User Obligations</h2>
          <p style={p}>You agree not to:</p>
          <ul style={{ paddingLeft: '20px' }}>
            <li style={li}>Use our platform for illegal purposes, including money laundering, fraud, or facilitating unlawful activities.</li>
            <li style={li}>Attempt to reverse-engineer, scrape, or extract our AI models or proprietary content.</li>
            <li style={li}>Resell, sublicense, or redistribute our templates or tools without written consent.</li>
            <li style={li}>Submit malicious code, harmful content, or personal data of third parties without their consent to our AI tools.</li>
            <li style={li}>Circumvent rate limits, security measures, or access controls.</li>
            <li style={li}>Misrepresent your identity or create multiple free accounts to circumvent limits.</li>
          </ul>

          <h2 style={h}>6. Intellectual Property</h2>
          <p style={p}>All content on BizLegal AI — including template drafts, AI tool architecture, written guides, compliance databases, and branding — is owned by or licensed to BizLegal AI. You acquire no ownership rights by purchasing or using our services.</p>
          <p style={p}>Content you submit to our AI tools remains yours. You grant us a temporary, limited license to process it for the purpose of delivering the service.</p>

          <h2 style={h}>7. Limitation of Liability</h2>
          <p style={p}>TO THE MAXIMUM EXTENT PERMITTED BY LAW, BIZLEGAL AI SHALL NOT BE LIABLE FOR: (i) indirect, incidental, or consequential damages; (ii) loss of profits, data, or goodwill; (iii) reliance on AI tool outputs without independent legal review; (iv) third-party actions or regulatory decisions.</p>
          <p style={p}>Our aggregate liability for any claim arising from these terms is limited to the amount you paid to us in the 3 months preceding the claim, or $49, whichever is greater.</p>

          <h2 style={h}>8. Indemnification</h2>
          <p style={p}>You agree to indemnify and hold harmless BizLegal AI, its directors, solicitors, and contractors from any claims, damages, or expenses arising from your use of our services, violation of these terms, or infringement of third-party rights.</p>

          <h2 style={h}>9. Governing Law & Dispute Resolution</h2>
          <p style={p}>These terms are governed by the laws of England and Wales. For disputes involving consumers, mandatory local consumer protection laws of your country also apply. Disputes shall first be attempted through good-faith mediation. If unresolved, disputes under $10,000 may be referred to binding online arbitration.</p>

          <h2 style={h}>10. Changes to Terms</h2>
          <p style={p}>We may update these terms with 30 days&apos; notice via email or site notice. Continued use after the effective date constitutes acceptance. Material changes will always be clearly communicated.</p>

          <h2 style={h}>11. Contact</h2>
          <p style={p}>Legal queries: <strong style={{ color: 'var(--sky)' }}>legal@bizlegal-ai.com</strong> | Support: <strong style={{ color: 'var(--sky)' }}>support@bizlegal-ai.com</strong></p>
        </div>
      </div>
    </div>
  )
}

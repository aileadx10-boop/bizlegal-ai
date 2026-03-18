'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

// ─── DATA ──────────────────────────────────────────────────────
const GUIDES = [
  { region: 'UAE / DIFC', flag: '🇦🇪', items: [
    { title: 'VARA Token Distribution Agreement UAE', href: '/guides/uae/vara-token-distribution-agreement-uae' },
    { title: 'VARA Compliance Guide — MVL License UAE', href: '/guides/uae/vara-mvl-license-guide-uae' },
    { title: 'Joint Venture Agreement for Real Estate in UAE', href: '/guides/uae/joint-venture-agreement-real-estate-uae' },
  ]},
  { region: 'European Union', flag: '🇪🇺', items: [
    { title: 'MiCA Token Sale Agreement Template EU', href: '/guides/european-union/mica-token-sale-agreement-template' },
    { title: 'MiCA CASP License Guide', href: '/guides/european-union/mica-casp-license-guide-eu' },
  ]},
  { region: 'United States', flag: '🇺🇸', items: [
    { title: 'Reg D 506(b) Private Placement Guide', href: '/guides/united-states/reg-d-506b-offering-us' },
    { title: 'Real Estate LLC Operating Agreement Guide', href: '/guides/united-states/operating-agreement-llc-real-estate' },
  ]},
  { region: 'Singapore / MAS', flag: '🇸🇬', items: [
    { title: 'MAS DPT License Guide', href: '/guides/singapore/mas-dpt-license-guide-sg' },
  ]},
  { region: 'United Kingdom', flag: '🇬🇧', items: [
    { title: 'FCA Cryptoasset Registration Guide', href: '/guides/united-kingdom/fca-cryptoasset-registration' },
  ]},
]

async function captureLead(email: string, source: string) {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source, page: window.location.pathname }),
    })
  } catch { /* fail silently */ }
}

export default function HomePage() {
  const [heroEmail, setHeroEmail] = useState('')
  const [heroSent, setHeroSent] = useState(false)
  const [nlEmail, setNlEmail] = useState('')
  const [nlSent, setNlSent] = useState(false)

  const submitHero = useCallback(async () => {
    if (!heroEmail.includes('@')) return
    setHeroSent(true)
    await captureLead(heroEmail, 'hero')
  }, [heroEmail])

  const submitNl = useCallback(async () => {
    if (!nlEmail.includes('@')) return
    setNlSent(true)
    await captureLead(nlEmail, 'newsletter')
  }, [nlEmail])

  return (
    <div className="page-wrap">

      {/* ── NAV ── */}
      <nav>
        <div className="nav-wrap">
          <Link href="/" className="nav-logo">DOR<em>INNOVATIONS</em></Link>
          <div className="nav-menu">
            <div className="nav-dropdown">
              <button className="nav-link">Products ▾</button>
              <div className="nav-dropdown-menu">
                <a href="https://docstack.bizlegal-ai.com" className="nav-dd-item"><span className="nav-dd-icon">📄</span>DocStack — Templates</a>
                <a href="https://brai.bizlegal-ai.com" className="nav-dd-item"><span className="nav-dd-icon">⚡</span>BRAI — Compliance</a>
                <a href="https://tracr.bizlegal-ai.com" className="nav-dd-item"><span className="nav-dd-icon">🔬</span>TRACR — Forensics</a>
              </div>
            </div>
            <div className="nav-dropdown">
              <button className="nav-link">Tools ▾</button>
              <div className="nav-dropdown-menu">
                <Link href="/tools" className="nav-dd-item"><span className="nav-dd-icon">🔍</span>SaaS Risk Scanner</Link>
                <Link href="/tools/contract-fixer" className="nav-dd-item"><span className="nav-dd-icon">🛠️</span>Contract Fixer</Link>
                <Link href="/tools/website-compliance" className="nav-dd-item"><span className="nav-dd-icon">🌐</span>Website Compliance</Link>
                <Link href="/blockchain-report" className="nav-dd-item"><span className="nav-dd-icon">⛓️</span>Blockchain Report</Link>
              </div>
            </div>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/about" className="nav-link">About</Link>
          </div>
          <div className="nav-right">
            <a href="https://brai.bizlegal-ai.com" className="btn-ghost">Free Scan</a>
            <a href="https://docstack.bizlegal-ai.com" className="btn-primary">Get Templates →</a>
          </div>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="lx-hero">
        <div className="lx-hero-inner">
          <div className="lx-badge">
            <span className="lx-dot" />
            Commercial Attorney · UAE / DIFC Focus · AI-Assisted
          </div>
          <h1 className="lx-h1">
            Regulatory Risk<br />
            Intelligence —<br />
            <em>Engineered for Precision</em>
          </h1>
          <p className="lx-sub">
            DOR INNOVATIONS provides structured AI-driven regulatory risk intelligence
            for digital asset ventures. Identify exposure before it becomes structural liability.
            UAE · EU · US · UK · Singapore · Canada.
          </p>
          <div className="lx-ctas">
            <a href="https://brai.bizlegal-ai.com" className="lx-btn-p">Free Regulatory Scan →</a>
            <a href="https://docstack.bizlegal-ai.com" className="lx-btn-g">Legal Templates — From $49</a>
          </div>
          <div className="lx-proof">
            <span>⚖️ Commercial Attorney · 20+ Yrs</span>
            <span className="lx-sep">·</span>
            <span>🇦🇪 VARA · DFSA · DIFC</span>
            <span className="lx-sep">·</span>
            <span>$100M+ Transactions</span>
            <span className="lx-sep">·</span>
            <span>6 Jurisdictions</span>
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-stats">
            {[
              ['$100M+', 'Transactions Advised'],
              ['20+', 'Years Legal Practice'],
              ['6', 'Jurisdictions Covered'],
              ['VARA·MiCA·SEC', 'Regulators Analysed'],
            ].map(([v, l]) => (
              <div key={l} className="lx-stat">
                <div className="lx-stat-v">{v}</div>
                <div className="lx-stat-l">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-eyebrow">DOR INNOVATIONS Suite</div>
          <h2 className="lx-h2">
            Three precision instruments.<br /><em>One unified intelligence layer.</em>
          </h2>
          <div className="lx-prod-grid">
            <div className="lx-prod-card">
              <div className="lx-prod-badge lx-badge-sky">LIVE</div>
              <div className="lx-prod-icon">📄</div>
              <h3 className="lx-prod-name">DocStack</h3>
              <p className="lx-prod-desc">Commercial attorney-drafted contract templates. Digital asset JV, NDA, token agreements, capital call. DIFC-ready. DOCX + PDF instant download.</p>
              <div className="lx-prod-foot">
                <span className="lx-prod-price">From $49</span>
                <a href="https://docstack.bizlegal-ai.com" className="lx-prod-cta lx-cta-sky">Browse Templates →</a>
              </div>
            </div>
            <div className="lx-prod-card lx-prod-featured">
              <div className="lx-prod-badge lx-badge-ind">LIVE</div>
              <div className="lx-prod-icon">⚡</div>
              <h3 className="lx-prod-name">BRAI</h3>
              <p className="lx-prod-desc">AI-powered regulatory risk intelligence. Scans VARA, MiCA, SEC, MAS simultaneously. Identifies exposure before it becomes structural liability.</p>
              <div className="lx-prod-foot">
                <span className="lx-prod-price">Free + $49/mo</span>
                <a href="https://brai.bizlegal-ai.com" className="lx-prod-cta lx-cta-ind">Run Free Scan →</a>
              </div>
            </div>
            <div className="lx-prod-card">
              <div className="lx-prod-badge lx-badge-teal">BETA</div>
              <div className="lx-prod-icon">🔬</div>
              <h3 className="lx-prod-name">TRACR</h3>
              <p className="lx-prod-desc">AI forensic investigation for digital asset disputes. Wallet tracing, fund flow analysis, court-ready reports for litigation and regulatory proceedings.</p>
              <div className="lx-prod-foot">
                <span className="lx-prod-price">$99 / report</span>
                <a href="https://tracr.bizlegal-ai.com" className="lx-prod-cta lx-cta-teal">Join Waitlist →</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE: DOCSTACK ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-feat">
            <div className="lx-feat-content">
              <div className="lx-eyebrow">Regulatory Documentation</div>
              <h2 className="lx-h2">Jurisdiction-ready docs —<br /><em>engineered for precision</em></h2>
              <p className="lx-body">Commercial attorney-drafted, AI-refined. Select jurisdiction, enter deal structure, receive DOCX + PDF in 60 seconds. VARA, MiCA, SEC, FCA regulatory context auto-applied.</p>
              <div className="lx-steps">
                {[
                  ['01', 'Select Jurisdiction', 'UAE/DIFC, EU/MiCA, US/SEC, UK/FCA — regulatory context auto-applied'],
                  ['02', 'Enter Deal Structure', 'Token model, parties, amounts — Claude AI applies the correct regulatory framework'],
                  ['03', 'Download Instantly', 'DOCX + PDF in ~60 seconds. Commercial attorney quality. Ready for review.'],
                ].map(([n, h, d]) => (
                  <div key={n} className="lx-step">
                    <div className="lx-step-n">{n}</div>
                    <div><strong>{h}</strong><p>{d}</p></div>
                  </div>
                ))}
              </div>
              <a href="https://docstack.bizlegal-ai.com" className="lx-btn-p" style={{ marginTop: '28px', display: 'inline-block' }}>Browse All Templates →</a>
            </div>
            <div className="lx-feat-vis">
              <div className="lx-mock">
                <div className="lx-mock-bar">
                  <div className="lx-dot-r" /><div className="lx-dot-y" /><div className="lx-dot-g" />
                  <span>docstack — templates</span>
                </div>
                <div className="lx-mock-body">
                  {['Joint Venture Agreement', 'NDA — Real Estate', 'LOI Commercial', 'Capital Call Agreement', 'LLC Operating Agreement'].map(t => (
                    <div key={t} className="lx-mock-row">
                      <span>📄 {t}</span>
                      <span className="lx-tag lx-tag-sky">LIVE</span>
                    </div>
                  ))}
                  <div className="lx-mock-cta">⚡ DOCX + PDF in ~60 seconds</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURE: BRAI ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-feat lx-feat-rev">
            <div className="lx-feat-vis">
              <div className="lx-mock">
                <div className="lx-mock-bar">
                  <div className="lx-dot-r" /><div className="lx-dot-y" /><div className="lx-dot-g" />
                  <span>brai — compliance scan</span>
                </div>
                <div className="lx-mock-body">
                  <div className="lx-mock-row"><span>🇦🇪 VARA (UAE)</span><span className="lx-tag lx-tag-teal">✓ Compliant</span></div>
                  <div className="lx-mock-row"><span>🇪🇺 MiCA (EU)</span><span className="lx-tag lx-tag-ind">⚠ Review</span></div>
                  <div className="lx-mock-row"><span>🇺🇸 SEC (USA)</span><span className="lx-tag lx-tag-warn">✗ Action Req.</span></div>
                  <div className="lx-mock-row"><span>🇸🇬 MAS (SGP)</span><span className="lx-tag lx-tag-teal">✓ Compliant</span></div>
                  <div className="lx-mock-cta" style={{ color: 'var(--indigo)', borderColor: 'rgba(165,180,252,0.2)' }}>📊 12 Risk Flags · PDF Download</div>
                </div>
              </div>
            </div>
            <div className="lx-feat-content">
              <div className="lx-eyebrow">AI Regulatory Intelligence</div>
              <h2 className="lx-h2">Identify exposure <em>before</em> it becomes<br />structural liability</h2>
              <p className="lx-body">BRAI scans your digital asset venture against VARA, MiCA, SEC, and MAS simultaneously. Structured risk intelligence in under 60 seconds — not reactive compliance after the fact.</p>
              <div className="lx-checks">
                {['VARA (UAE/DIFC)', 'MiCA (EU)', 'SEC / CFTC (US)', 'MAS (Singapore)', 'FCA (UK)', 'CSA (Canada)'].map(j => (
                  <div key={j} className="lx-check"><span className="lx-check-icon">✓</span>{j}</div>
                ))}
              </div>
              <a href="https://brai.bizlegal-ai.com" className="lx-btn-ind" style={{ marginTop: '28px', display: 'inline-block' }}>Run Free Scan →</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FREE TOOLS ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-eyebrow">Free AI Legal Tools</div>
          <h2 className="lx-h2">Lawyer-grade analysis. <em>Instantly free.</em></h2>
          <div className="lx-tools-grid">
            {[
              { icon: '🔍', name: 'SaaS Terms Risk Scanner', desc: 'Paste any SaaS contract — risk score, red flags, and negotiation points instantly.', href: '/tools/saas-risk-scanner' },
              { icon: '🛠️', name: 'Contract Fixer', desc: 'Identifies weak clauses and rewrites them to protect your rights and payment.', href: '/tools/contract-fixer' },
              { icon: '🌐', name: 'Website Compliance', desc: 'GDPR, CCPA, ADA & cookie compliance scan for any URL. Instant scored report.', href: '/tools/website-compliance' },
              { icon: '⛓️', name: 'Blockchain Report', desc: 'AI regulatory analysis across 6 jurisdictions — VARA, MiCA, SEC, FCA, MAS, CSA.', href: '/blockchain-report' },
            ].map(t => (
              <Link key={t.href} href={t.href} className="lx-tool-card">
                <div className="lx-tool-icon">{t.icon}</div>
                <div className="lx-tool-name">{t.name}</div>
                <div className="lx-tool-desc">{t.desc}</div>
                <div className="lx-tool-cta">Try free →</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-eyebrow">Voices</div>
          <h2 className="lx-h2">Built for people <em>like you</em></h2>
          <div className="lx-testi-grid">
            {[
              { av: 'JB', quote: 'The VARA compliance report from BRAI gave us the roadmap to get our crypto licence in Dubai. Clear, actionable, fast — no law firm could deliver this at this speed.', name: 'James B.', role: 'FinTech Founder, UAE' },
              { av: 'SL', quote: 'DOR INNOVATIONS flagged our MiCA exposure before we launched. Saved us from a costly compliance mistake on the EU rollout. The AI precision is exceptional.', name: 'Sofia L.', role: 'Digital Asset Founder, Lisbon' },
              { av: 'MC', quote: 'Closed a $4M digital asset fund round in DIFC using the capital call agreement. Saved $12k in legal fees. The VARA structuring guidance was precise.', name: 'Maria C.', role: 'Fund Manager, Dubai' },
            ].map(t => (
              <div key={t.name} className="lx-tcard">
                <p className="lx-tquote">"{t.quote}"</p>
                <div className="lx-tauthor">
                  <div className="lx-tav">{t.av}</div>
                  <div>
                    <div className="lx-tname">{t.name}</div>
                    <div className="lx-trole">{t.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GUIDES ── */}
      <section className="lx-section" id="guides">
        <div className="container">
          <div className="lx-eyebrow">Free Legal Guides</div>
          <h2 className="lx-h2">Learn from the <em>platform</em></h2>
          <div className="lx-guides-grid">
            {GUIDES.map(group => (
              <div key={group.region} className="lx-guide-group">
                <div className="lx-guide-region">{group.flag} {group.region}</div>
                {group.items.map(item => (
                  <Link key={item.href} href={item.href} className="lx-guide-link">
                    <span>{item.title}</span>
                    <span className="lx-guide-arr">→</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LEAD CAPTURE ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-capture-box">
            <div className="lx-capture-content">
              <div className="lx-eyebrow">Free Resource</div>
              <h2 className="lx-h2" style={{ marginBottom: '12px' }}>
                UAE Digital Asset<br /><em>Regulatory Starter Kit</em>
              </h2>
              <p className="lx-body">46-point regulatory checklist + VARA licensing roadmap + MiCA token classification flowchart. Used by digital asset founders raising in UAE, EU & US.</p>
            </div>
            <div className="lx-capture-form">
              {!heroSent ? (
                <>
                  <input
                    type="email"
                    className="lx-input"
                    placeholder="your@email.com"
                    value={heroEmail}
                    onChange={e => setHeroEmail(e.target.value)}
                    onKeyDown={e => e.key === 'Enter' && submitHero()}
                  />
                  <button className="lx-btn-p" onClick={submitHero} style={{ width: '100%', textAlign: 'center' }}>
                    Send Free Kit →
                  </button>
                  <p className="lx-form-sub">No spam · Instant access · Unsubscribe anytime</p>
                </>
              ) : (
                <div className="lx-form-sent">✓ Kit on its way — check your inbox!</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-nl-box">
            <div className="lx-eyebrow" style={{ justifyContent: 'center' }}>Weekly Intelligence</div>
            <h2 className="lx-h2" style={{ textAlign: 'center' }}>Regulatory intelligence, <em>weekly</em></h2>
            <p className="lx-body" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 32px' }}>
              VARA updates, MiCA enforcement news, SEC actions, and cross-border digital asset regulatory intelligence from DOR INNOVATIONS.
            </p>
            {!nlSent ? (
              <div className="lx-nl-row">
                <input
                  type="email"
                  className="lx-input"
                  placeholder="your@email.com"
                  value={nlEmail}
                  onChange={e => setNlEmail(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && submitNl()}
                />
                <button className="lx-btn-p" onClick={submitNl}>Subscribe →</button>
              </div>
            ) : (
              <div className="lx-form-sent" style={{ textAlign: 'center' }}>✓ Subscribed! See you next week.</div>
            )}
            <p className="lx-form-sub" style={{ textAlign: 'center', marginTop: '12px' }}>Founders · Attorneys · Investors · No spam · Weekly max</p>
          </div>
        </div>
      </section>

      {/* ── CTA BANNER ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-cta-banner">
            <h2>Identify regulatory exposure <em>before</em><br />it becomes structural liability</h2>
            <p>DOR INNOVATIONS — boutique AI-driven regulatory risk intelligence for digital asset ventures.</p>
            <div className="lx-ctas">
              <a href="https://brai.bizlegal-ai.com" className="lx-btn-p">Run Free Regulatory Scan →</a>
              <a href="https://docstack.bizlegal-ai.com" className="lx-btn-g">Legal Templates from $49</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="lx-footer">
        <div className="container">
          <div className="lx-foot-top">
            <div>
              <div className="nav-logo" style={{ marginBottom: '12px', display: 'inline-block' }}>DOR<em>INNOVATIONS</em></div>
              <p className="lx-foot-desc">Boutique regulatory intelligence & AI-driven risk analysis for digital asset ventures. Commercial attorney · Entrepreneur · UAE / DIFC focus.</p>
              <div className="lx-foot-products">
                {[['DocStack', 'https://docstack.bizlegal-ai.com'], ['BRAI', 'https://brai.bizlegal-ai.com'], ['TRACR', 'https://tracr.bizlegal-ai.com']].map(([n, h]) => (
                  <a key={n} href={h} className="lx-foot-product">{n}</a>
                ))}
              </div>
            </div>
            <div className="lx-foot-cols">
              {[
                { title: 'Products', links: [['DocStack — Templates', 'https://docstack.bizlegal-ai.com'], ['BRAI — Compliance', 'https://brai.bizlegal-ai.com'], ['TRACR — Forensics', 'https://tracr.bizlegal-ai.com'], ['Pricing', '/pricing']] },
                { title: 'Resources', links: [['Free Guides', '/#guides'], ['Calculators', '/calculators'], ['FAQ', '/faq'], ['About', '/about']] },
                { title: 'Legal', links: [['Terms', '/terms'], ['Privacy', '/privacy'], ['Accessibility', '/accessibility']] },
              ].map(col => (
                <div key={col.title}>
                  <div className="lx-fcol-title">{col.title}</div>
                  {col.links.map(([label, href]) => (
                    <a key={label} href={href} className="lx-fcol-a">{label}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="lx-foot-bottom">
            <span>© 2025 DOR INNOVATIONS · Regulatory intelligence only — not legal advice</span>
            <div className="lx-foot-legal">
              <a href="/terms">Terms</a>
              <a href="/privacy">Privacy</a>
              <a href="/faq">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

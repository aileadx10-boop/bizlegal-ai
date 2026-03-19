'use client'

import { useState, useCallback } from 'react'
import Link from 'next/link'

const SOCIAL = [
  { name: 'LinkedIn', icon: '💼', url: 'https://www.linkedin.com/company/DorInnovations', color: '#0A66C2', followers: 'Follow' },
  { name: 'X / Twitter', icon: '𝕏', url: 'https://x.com/DorInnovations', color: '#fff', followers: 'Follow' },
  { name: 'Instagram', icon: '📸', url: 'https://www.instagram.com/dorinnovations/', color: '#E1306C', followers: 'Follow' },
  { name: 'YouTube', icon: '▶', url: 'https://www.youtube.com/@DorInnovations', color: '#FF0000', followers: 'Subscribe' },
  { name: 'Substack', icon: '📨', url: 'https://substack.com/@dorinnovations', color: '#FF6719', followers: 'Subscribe' },
  { name: 'Facebook', icon: 'f', url: 'https://www.facebook.com/DorInnovations/', color: '#1877F2', followers: 'Follow' },
  { name: 'Pinterest', icon: '𝐏', url: 'https://www.pinterest.com/DorInnovations/', color: '#E60023', followers: 'Follow' },
]

const AI_ENGINES = [
  { name: 'Claude', company: 'Anthropic', badge: '🟠', desc: 'Primary intelligence engine' },
  { name: 'Gemini', company: 'Google', badge: '🔵', desc: 'Multi-modal analysis' },
  { name: 'GPT-4', company: 'OpenAI', badge: '🟢', desc: 'Document reasoning' },
  { name: 'Mistral', company: 'Mistral AI', badge: '🟣', desc: 'EU compliance layer' },
]

const BLOG_POSTS = [
  { tag: 'VARA', title: 'VARA MVL License 2025: Complete Application Guide for UAE Digital Asset Founders', date: 'Mar 2025', read: '8 min', href: '/blog/vara-mvl-license-guide-2025' },
  { tag: 'MiCA', title: 'MiCA Enforcement Begins: What Every Token Issuer Must Do Now', date: 'Mar 2025', read: '6 min', href: '/blog/mica-enforcement-2025' },
  { tag: 'BRAI', title: 'How BRAI Identifies Regulatory Exposure Before It Crystallises', date: 'Feb 2025', read: '5 min', href: '/blog/brai-regulatory-intelligence' },
  { tag: 'SEC', title: 'Howey Test 2025: Applying the SEC Framework to Your Token Structure', date: 'Feb 2025', read: '7 min', href: '/blog/howey-test-2025-token-analysis' },
  { tag: 'DIFC', title: 'DIFC vs ADGM: Which UAE Jurisdiction for Your Digital Asset Venture?', date: 'Jan 2025', read: '6 min', href: '/blog/difc-vs-adgm-digital-assets' },
  { tag: 'DocStack', title: 'Jurisdiction-Ready Contracts: How DocStack Applies VARA/MiCA Automatically', date: 'Jan 2025', read: '4 min', href: '/blog/docstack-vara-mica-contracts' },
]

const TEMPLATE_FEATURES = [
  { icon: '🇦🇪', title: 'VARA / DIFC Templates', count: '12 templates', color: '#fbbf24' },
  { icon: '🇪🇺', title: 'MiCA / EU Templates', count: '8 templates', color: 'var(--sky)' },
  { icon: '🇺🇸', title: 'SEC / US Templates', count: '10 templates', color: 'var(--teal)' },
  { icon: '🇸🇬', title: 'MAS / Singapore', count: '6 templates', color: 'var(--indigo)' },
]

const GUIDES = [
  { region: 'UAE / DIFC', flag: '🇦🇪', items: [
    { title: 'VARA Token Distribution Agreement UAE', href: '/guides/uae/vara-token-distribution-agreement-uae' },
    { title: 'VARA Compliance Guide — MVL License UAE', href: '/guides/uae/vara-mvl-license-guide-uae' },
  ]},
  { region: 'European Union', flag: '🇪🇺', items: [
    { title: 'MiCA Token Sale Agreement Template EU', href: '/guides/european-union/mica-token-sale-agreement-template' },
    { title: 'MiCA CASP License Guide', href: '/guides/european-union/mica-casp-license-guide-eu' },
  ]},
  { region: 'United States', flag: '🇺🇸', items: [
    { title: 'Reg D 506(b) Private Placement Guide', href: '/guides/united-states/reg-d-506b-offering-us' },
  ]},
  { region: 'Singapore', flag: '🇸🇬', items: [
    { title: 'MAS DPT License Guide', href: '/guides/singapore/mas-dpt-license-guide-sg' },
  ]},
]

async function captureLead(email: string, source: string) {
  try {
    await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, source, page: window.location.pathname }) })
  } catch { /* silent */ }
}

export default function HomePage() {
  const [heroEmail, setHeroEmail] = useState('')
  const [heroSent, setHeroSent] = useState(false)
  const [nlEmail, setNlEmail] = useState('')
  const [nlSent, setNlSent] = useState(false)

  const submitHero = useCallback(async () => { if (!heroEmail.includes('@')) return; setHeroSent(true); await captureLead(heroEmail, 'hero') }, [heroEmail])
  const submitNl = useCallback(async () => { if (!nlEmail.includes('@')) return; setNlSent(true); await captureLead(nlEmail, 'newsletter') }, [nlEmail])

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
              <button className="nav-link">Resources ▾</button>
              <div className="nav-dropdown-menu">
                <Link href="/blog" className="nav-dd-item"><span className="nav-dd-icon">📝</span>Blog & Insights</Link>
                <Link href="/templates" className="nav-dd-item"><span className="nav-dd-icon">📋</span>Template Gallery</Link>
                <Link href="/tools" className="nav-dd-item"><span className="nav-dd-icon">🔍</span>Free AI Tools</Link>
                <Link href="/blockchain-report" className="nav-dd-item"><span className="nav-dd-icon">⛓️</span>Blockchain Report</Link>
              </div>
            </div>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/about" className="nav-link">About</Link>
          </div>
          <div className="nav-right" style={{ gap: '8px' }}>
            <div className="nav-social-strip">
              {[
                { icon: '𝕏', url: 'https://x.com/DorInnovations' },
                { icon: '💼', url: 'https://www.linkedin.com/company/DorInnovations' },
                { icon: '📸', url: 'https://www.instagram.com/dorinnovations/' },
              ].map(s => (
                <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="nav-social-icon">{s.icon}</a>
              ))}
            </div>
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
            Regulatory Risk<br />Intelligence —<br />
            <em>Engineered for Precision</em>
          </h1>
          <p className="lx-sub">
            DOR INNOVATIONS provides structured AI-driven regulatory risk intelligence for digital asset ventures. Identify exposure before it becomes structural liability. UAE · EU · US · UK · Singapore.
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

      {/* ── AI ENGINES ── */}
      <section className="lx-section" style={{ paddingTop: '48px', paddingBottom: '64px' }}>
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <div className="lx-eyebrow">Powered by Leading AI</div>
            <p style={{ fontSize: '13px', color: 'var(--muted)', fontFamily: 'Geist Mono, monospace' }}>DOR INNOVATIONS runs on the world's most advanced language models</p>
          </div>
          <div className="ai-engine-grid">
            {AI_ENGINES.map(ai => (
              <div key={ai.name} className="ai-engine-card">
                <span className="ai-engine-badge">{ai.badge}</span>
                <div>
                  <div className="ai-engine-name">{ai.name}</div>
                  <div className="ai-engine-company">{ai.company}</div>
                </div>
                <div className="ai-engine-desc">{ai.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="lx-section" style={{ paddingTop: '0', paddingBottom: '80px' }}>
        <div className="container">
          <div className="lx-stats">
            {[['$100M+','Transactions Advised'],['20+','Years Legal Practice'],['6','Jurisdictions Covered'],['VARA·MiCA·SEC','Regulators Analysed']].map(([v,l]) => (
              <div key={l} className="lx-stat"><div className="lx-stat-v">{v}</div><div className="lx-stat-l">{l}</div></div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FRASE.IO-STYLE FEATURE GRID ── */}
      <section className="lx-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '60px' }}>
            <div className="lx-eyebrow">Platform Capabilities</div>
            <h2 className="lx-h2" style={{ textAlign: 'center' }}>Everything you need — <em>in one place</em></h2>
            <p style={{ fontSize: '16px', color: 'var(--muted)', maxWidth: '560px', margin: '0 auto', lineHeight: 1.75 }}>Regulatory intelligence, legal templates, forensic investigation — unified across 6 jurisdictions.</p>
          </div>
          <div className="frase-grid">
            {[
              { icon: '⚡', title: 'AI Risk Scanning', desc: 'BRAI scans VARA, MiCA, SEC, MAS simultaneously. Get a structured risk report in 60 seconds.', cta: 'Try Free →', href: 'https://brai.bizlegal-ai.com', color: 'var(--indigo)' },
              { icon: '📄', title: 'Legal Templates', desc: 'Commercial attorney-drafted contracts. VARA, MiCA, SEC jurisdiction-ready. DOCX + PDF instant.', cta: 'Browse Templates →', href: 'https://docstack.bizlegal-ai.com', color: 'var(--sky)' },
              { icon: '🔬', title: 'Forensic Investigation', desc: 'TRACR AI traces wallets, maps fund flows, and produces court-ready blockchain forensic reports.', cta: 'Learn More →', href: '/tracr', color: 'var(--teal)' },
              { icon: '📝', title: 'Regulatory Guides', desc: 'Deep-dive guides on VARA, MiCA, SEC, FCA, MAS — written by a commercial attorney.', cta: 'Read Guides →', href: '/blog', color: '#fbbf24' },
              { icon: '🔍', title: 'Free AI Tools', desc: 'SaaS risk scanner, contract fixer, website compliance checker — no signup required.', cta: 'Use Free →', href: '/tools', color: 'var(--teal)' },
              { icon: '⛓️', title: 'Blockchain Reports', desc: '6-jurisdiction AI compliance analysis. Howey Test, token classification, license requirements.', cta: 'Get Report →', href: '/blockchain-report', color: 'var(--indigo)' },
              { icon: '🌍', title: 'Cross-Border Strategy', desc: 'UAE → EU → US → Singapore. One intelligence layer for your global digital asset venture.', cta: 'Learn More →', href: '/cross-border-compliance', color: 'var(--sky)' },
              { icon: '📊', title: 'Weekly Intelligence', desc: 'VARA, MiCA, SEC enforcement updates. Regulatory intelligence newsletter for founders.', cta: 'Subscribe →', href: 'https://substack.com/@dorinnovations', color: '#FF6719' },
            ].map(f => (
              <a key={f.title} href={f.href} className="frase-card" style={{ '--fc': f.color } as React.CSSProperties}>
                <div className="frase-icon">{f.icon}</div>
                <h3 className="frase-title">{f.title}</h3>
                <p className="frase-desc">{f.desc}</p>
                <div className="frase-cta" style={{ color: f.color }}>{f.cta}</div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRODUCTS ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-eyebrow">DOR INNOVATIONS Suite</div>
          <h2 className="lx-h2">Three precision instruments.<br /><em>One unified intelligence layer.</em></h2>
          <div className="lx-prod-grid">
            {[
              { badge: 'LIVE', badgeCls: 'lx-badge-sky', icon: '📄', name: 'DocStack', desc: 'Commercial attorney-drafted contract templates. Digital asset JV, NDA, token agreements, capital call. DIFC-ready. DOCX + PDF instant download.', price: 'From $49', ctaCls: 'lx-cta-sky', cta: 'Browse Templates →', href: 'https://docstack.bizlegal-ai.com' },
              { badge: 'LIVE', badgeCls: 'lx-badge-ind', icon: '⚡', name: 'BRAI', desc: 'AI-powered regulatory risk intelligence. Scans VARA, MiCA, SEC, MAS simultaneously. Identifies exposure before it becomes structural liability.', price: 'Free + $49/mo', ctaCls: 'lx-cta-ind', cta: 'Run Free Scan →', href: 'https://brai.bizlegal-ai.com', featured: true },
              { badge: 'BETA', badgeCls: 'lx-badge-teal', icon: '🔬', name: 'TRACR', desc: 'AI forensic investigation for digital asset disputes. Wallet tracing, fund flow analysis, court-ready reports for litigation and regulatory proceedings.', price: '$99 / report', ctaCls: 'lx-cta-teal', cta: 'Join Waitlist →', href: 'https://tracr.bizlegal-ai.com' },
            ].map(p => (
              <div key={p.name} className={`lx-prod-card${p.featured ? ' lx-prod-featured' : ''}`}>
                <div className={`lx-prod-badge ${p.badgeCls}`}>{p.badge}</div>
                <div className="lx-prod-icon">{p.icon}</div>
                <h3 className="lx-prod-name">{p.name}</h3>
                <p className="lx-prod-desc">{p.desc}</p>
                <div className="lx-prod-foot">
                  <span className="lx-prod-price">{p.price}</span>
                  <a href={p.href} className={`lx-prod-cta ${p.ctaCls}`}>{p.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEMPLATE GALLERY TEASER (Frase.io style) ── */}
      <section className="lx-section">
        <div className="container">
          <div className="tmpl-showcase">
            <div className="tmpl-content">
              <div className="lx-eyebrow">Template Library</div>
              <h2 className="lx-h2">38+ jurisdiction-ready<br /><em>legal templates</em></h2>
              <p className="lx-body">Commercial attorney-drafted contracts for every digital asset scenario. Select your jurisdiction — VARA, MiCA, SEC, FCA, MAS regulations auto-applied.</p>
              <div className="tmpl-jurisdictions">
                {TEMPLATE_FEATURES.map(t => (
                  <div key={t.title} className="tmpl-juri" style={{ '--tj': t.color } as React.CSSProperties}>
                    <span>{t.icon}</span>
                    <div>
                      <div className="tmpl-juri-name">{t.title}</div>
                      <div className="tmpl-juri-count">{t.count}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
                <Link href="/templates" className="lx-btn-p">Browse Template Gallery →</Link>
                <a href="https://docstack.bizlegal-ai.com" className="lx-btn-g">Generate Contract Now</a>
              </div>
            </div>
            <div className="tmpl-preview">
              <div className="lx-mock">
                <div className="lx-mock-bar">
                  <div className="lx-dot-r" /><div className="lx-dot-y" /><div className="lx-dot-g" />
                  <span>docstack — template library</span>
                </div>
                <div className="lx-mock-body">
                  {['🇦🇪 VARA Token Distribution Agreement','🇪🇺 MiCA Token Sale Agreement','🇺🇸 Reg D Private Placement','🇸🇬 MAS DPT Services Agreement','🌍 Cross-Border JV Agreement','📋 Capital Call Agreement'].map(t => (
                    <div key={t} className="lx-mock-row">
                      <span style={{ fontSize: '11px' }}>{t}</span>
                      <span className="lx-tag lx-tag-teal">$49</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── BLOG LATEST ── */}
      <section className="lx-section">
        <div className="container">
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <div className="lx-eyebrow">Regulatory Intelligence</div>
              <h2 className="lx-h2" style={{ marginBottom: 0 }}>Latest insights from <em>DOR INNOVATIONS</em></h2>
            </div>
            <Link href="/blog" className="lx-btn-g" style={{ flexShrink: 0 }}>View All →</Link>
          </div>
          <div className="blog-grid">
            {BLOG_POSTS.map(post => (
              <Link key={post.href} href={post.href} className="blog-card">
                <div className="blog-tag">{post.tag}</div>
                <h3 className="blog-title">{post.title}</h3>
                <div className="blog-meta">{post.date} · {post.read} read</div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL FOLLOW ── */}
      <section className="lx-section">
        <div className="container">
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            <div className="lx-eyebrow">Join the Community</div>
            <h2 className="lx-h2" style={{ textAlign: 'center' }}>Follow DOR INNOVATIONS —<br /><em>regulatory intelligence, daily</em></h2>
            <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto' }}>5 posts a week across all platforms. VARA updates, MiCA news, SEC enforcement, digital asset regulatory intelligence.</p>
          </div>
          <div className="social-follow-grid">
            {SOCIAL.map(s => (
              <a key={s.name} href={s.url} target="_blank" rel="noreferrer" className="social-follow-card">
                <span className="social-follow-icon" style={{ color: s.color === '#fff' ? 'var(--white)' : s.color }}>{s.icon}</span>
                <div className="social-follow-name">{s.name}</div>
                <div className="social-follow-btn">{s.followers} →</div>
              </a>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <Link href="/social-hub" className="lx-btn-g">View Content Calendar →</Link>
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
              { av:'JB', quote:'The VARA compliance report from BRAI gave us the roadmap to get our crypto licence in Dubai. Clear, actionable, fast — no law firm could deliver this at this speed.', name:'James B.', role:'FinTech Founder, UAE' },
              { av:'SL', quote:'DOR INNOVATIONS flagged our MiCA exposure before we launched. Saved us from a costly compliance mistake on the EU rollout. The AI precision is exceptional.', name:'Sofia L.', role:'Digital Asset Founder, Lisbon' },
              { av:'MC', quote:'Closed a $4M digital asset fund round in DIFC using the capital call agreement. Saved $12k in legal fees. The VARA structuring guidance was precise.', name:'Maria C.', role:'Fund Manager, Dubai' },
            ].map(t => (
              <div key={t.name} className="lx-tcard">
                <p className="lx-tquote">"{t.quote}"</p>
                <div className="lx-tauthor">
                  <div className="lx-tav">{t.av}</div>
                  <div><div className="lx-tname">{t.name}</div><div className="lx-trole">{t.role}</div></div>
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
                    <span>{item.title}</span><span className="lx-guide-arr">→</span>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NEWSLETTER ── */}
      <section className="lx-section">
        <div className="container">
          <div className="lx-nl-box">
            <div className="lx-eyebrow" style={{ justifyContent: 'center' }}>Weekly Intelligence</div>
            <h2 className="lx-h2" style={{ textAlign: 'center' }}>Regulatory intelligence, <em>weekly</em></h2>
            <p className="lx-body" style={{ textAlign: 'center', maxWidth: '480px', margin: '0 auto 32px' }}>VARA updates, MiCA enforcement news, SEC actions. Published on Substack — free to subscribe.</p>
            {!nlSent ? (
              <div className="lx-nl-row">
                <input type="email" className="lx-input" placeholder="your@email.com" value={nlEmail} onChange={e => setNlEmail(e.target.value)} onKeyDown={e => e.key === 'Enter' && submitNl()} />
                <button className="lx-btn-p" onClick={submitNl}>Subscribe →</button>
              </div>
            ) : (
              <div className="lx-form-sent" style={{ textAlign: 'center' }}>✓ Subscribed! See you next week.</div>
            )}
            <p className="lx-form-sub" style={{ textAlign: 'center', marginTop: '12px' }}>
              Also on <a href="https://substack.com/@dorinnovations" target="_blank" rel="noreferrer" style={{ color: '#FF6719', textDecoration: 'none' }}>Substack</a> ·
              <a href="https://www.linkedin.com/company/DorInnovations" target="_blank" rel="noreferrer" style={{ color: '#0A66C2', textDecoration: 'none', marginLeft: '4px' }}>LinkedIn</a> ·
              <a href="https://x.com/DorInnovations" target="_blank" rel="noreferrer" style={{ color: 'var(--muted)', textDecoration: 'none', marginLeft: '4px' }}>X</a>
            </p>
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
                {[['DocStack','https://docstack.bizlegal-ai.com'],['BRAI','https://brai.bizlegal-ai.com'],['TRACR','https://tracr.bizlegal-ai.com']].map(([n,h]) => (
                  <a key={n} href={h} className="lx-foot-product">{n}</a>
                ))}
              </div>
              <div className="foot-social-row">
                {[
                  { icon: '💼', url: 'https://www.linkedin.com/company/DorInnovations', label: 'LinkedIn' },
                  { icon: '𝕏', url: 'https://x.com/DorInnovations', label: 'X' },
                  { icon: '📸', url: 'https://www.instagram.com/dorinnovations/', label: 'Instagram' },
                  { icon: '▶', url: 'https://www.youtube.com/@DorInnovations', label: 'YouTube' },
                  { icon: '📨', url: 'https://substack.com/@dorinnovations', label: 'Substack' },
                  { icon: 'f', url: 'https://www.facebook.com/DorInnovations/', label: 'Facebook' },
                  { icon: '𝐏', url: 'https://www.pinterest.com/DorInnovations/', label: 'Pinterest' },
                ].map(s => (
                  <a key={s.url} href={s.url} target="_blank" rel="noreferrer" className="foot-social-icon" title={s.label}>{s.icon}</a>
                ))}
              </div>
            </div>
            <div className="lx-foot-cols">
              {[
                { title: 'Products', links: [['DocStack','https://docstack.bizlegal-ai.com'],['BRAI','https://brai.bizlegal-ai.com'],['TRACR','https://tracr.bizlegal-ai.com'],['Pricing','/pricing']] },
                { title: 'Resources', links: [['Blog & Insights','/blog'],['Template Gallery','/templates'],['Free Guides','/#guides'],['Social Hub','/social-hub']] },
                { title: 'Company', links: [['About','/about'],['FAQ','/faq'],['Terms','/terms'],['Privacy','/privacy']] },
              ].map(col => (
                <div key={col.title}>
                  <div className="lx-fcol-title">{col.title}</div>
                  {col.links.map(([label,href]) => (
                    <a key={label} href={href} className="lx-fcol-a">{label}</a>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="lx-foot-bottom">
            <span>© 2025 DOR INNOVATIONS · Regulatory intelligence only — not legal advice</span>
            <div className="lx-foot-legal">
              <a href="/terms">Terms</a><a href="/privacy">Privacy</a><a href="/faq">FAQ</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import Link from 'next/link'
import dynamic from 'next/dynamic'

const CryptoWidget = dynamic(() => import('../components/CryptoWidget'), { ssr: false })

// ─── DATA ─────────────────────────────────────────────────────
const GUIDES = [
  {
    region: 'UAE / DIFC',
    items: [
      { title: 'Joint Venture Agreement for Real Estate in UAE', href: '/guides/uae/joint-venture-agreement-real-estate-uae' },
      { title: 'VARA Token Distribution Agreement UAE', href: '/guides/uae/vara-token-distribution-agreement-uae' },
      { title: 'NDA for Real Estate Investment in UAE', href: '/guides/uae/nda-real-estate-investment-uae' },
      { title: 'VARA Compliance Guide — MVL License UAE', href: '/guides/uae/vara-mvl-license-guide-uae' },
    ],
  },
  {
    region: 'United States',
    items: [
      { title: 'Real Estate LLC Operating Agreement Guide', href: '/guides/united-states/operating-agreement-llc-real-estate' },
      { title: 'Capital Call Agreement Real Estate: US Legal Guide', href: '/guides/united-states/capital-call-agreement-real-estate' },
      { title: 'Real Estate Joint Venture Agreement Template', href: '/guides/united-states/joint-venture-agreement-real-estate-us' },
      { title: 'Reg D 506(b) Private Placement Guide', href: '/guides/united-states/reg-d-506b-offering-us' },
    ],
  },
  {
    region: 'European Union',
    items: [
      { title: 'MiCA Token Sale Agreement Template EU', href: '/guides/european-union/mica-token-sale-agreement-template' },
      { title: 'MiCA CASP License Guide', href: '/guides/european-union/mica-casp-license-guide-eu' },
    ],
  },
  {
    region: 'United Kingdom',
    items: [
      { title: 'Commercial Real Estate LOI Template UK', href: '/guides/united-kingdom/loi-commercial-real-estate-uk' },
      { title: 'FCA Cryptoasset Registration Guide', href: '/guides/united-kingdom/fca-cryptoasset-registration' },
    ],
  },
  {
    region: 'Singapore / MAS',
    items: [
      { title: 'Capital Call Agreement Singapore', href: '/guides/singapore/capital-call-agreement-singapore' },
      { title: 'MAS DPT License Guide', href: '/guides/singapore/mas-dpt-license-guide-sg' },
    ],
  },
  {
    region: 'Canada',
    items: [
      { title: 'Joint Venture Agreement Real Estate Canada', href: '/guides/canada/joint-venture-agreement-real-estate-canada' },
      { title: 'FINTRAC MSB Registration Guide', href: '/guides/canada/fintrac-msb-registration-guide' },
    ],
  },
]

const TABS = [
  { icon: '📄', label: 'Templates' },
  { icon: '⚡', label: 'BRAI' },
  { icon: '🔍', label: 'TRACR' },
  { icon: '🌍', label: 'Cross-Border' },
  { icon: '📚', label: 'Guides' },
  { icon: '✍️', label: 'eSign' },
  { icon: '🔄', label: 'CLM' },
  { icon: '📊', label: 'Reports' },
]

const ANNOUNCES = [
  '🇦🇪 DOR INNOVATIONS — AI-driven regulatory risk intelligence for digital asset ventures',
  '⚡ New: VARA MVL license guide for UAE crypto founders — read now →',
  '🌐 MiCA enforcement 2025 — is your token structure compliant? Free scan →',
  '📊 Trusted by digital asset founders across UAE, EU & US',
  '🔗 NEW: Free Digital Asset Regulatory Checklist — 30-second risk scan →',
  '💡 Identify regulatory exposure before it becomes structural liability — DOR INNOVATIONS',
]

// ─── LEAD CAPTURE ─────────────────────────────────────────────
async function captureLead(email: string, source: string, product?: string) {
  try {
    await fetch('/api/leads', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, source, page: window.location.pathname, product }),
    })
  } catch {
    // Fail silently — never block the UX
  }
}

// ─── WEBGL SHADER ─────────────────────────────────────────────
function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const script = document.createElement('script')
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    script.onload = () => {
      const THREE = (window as any).THREE
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: false })
      renderer.setPixelRatio(Math.min(devicePixelRatio, 2))
      renderer.setClearColor(new THREE.Color(0x04060e))
      const scene = new THREE.Scene()
      const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, -1)
      const uniforms = {
        resolution: { value: [innerWidth, innerHeight] },
        time: { value: 0 },
      }
      const geo = new THREE.BufferGeometry()
      geo.setAttribute('position', new THREE.BufferAttribute(
        new Float32Array([-1,-1,0, 1,-1,0, -1,1,0, 1,-1,0, -1,1,0, 1,1,0]), 3
      ))
      scene.add(new THREE.Mesh(geo, new THREE.RawShaderMaterial({
        vertexShader: `attribute vec3 position;void main(){gl_Position=vec4(position,1.0);}`,
        fragmentShader: `precision highp float;uniform vec2 resolution;uniform float time;
        void main(){
          vec2 p=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
          float d1=0.08/abs(p.y+sin((p.x+time*0.55)*1.1)*0.36);vec3 sky=vec3(0.28,0.72,1.0)*d1;
          float d2=0.055/abs(p.y+sin((p.x*0.8+time*0.85+1.4)*1.35)*0.26);vec3 teal=vec3(0.10,0.88,0.76)*d2;
          float d3=0.035/abs(p.y+sin((p.x*1.2-time*0.38+3.0)*0.88)*0.20);vec3 cyn=vec3(0.16,0.92,1.0)*d3;
          float d4=0.025/abs(p.y*1.5+sin((p.x*0.55+time*0.28+5.0)*0.65)*0.16);vec3 deep=vec3(0.04,0.52,0.58)*d4;
          float ab=length(p)*0.05;
          float rr=0.05/abs(p.y+sin((p.x*(1.0+ab)+time*0.55)*1.1)*0.36);
          float bb=0.05/abs(p.y+sin((p.x*(1.0-ab)+time*0.55)*1.1)*0.36);
          vec3 col=sky+teal+cyn+deep;col.r+=rr*0.10;col.b+=bb*0.18;
          col*=1.0-smoothstep(0.6,1.7,length(p));col*=1.3;
          gl_FragColor=vec4(col,1.0);}`,
        uniforms, side: THREE.DoubleSide,
      })))
      const resize = () => {
        renderer.setSize(innerWidth, innerHeight, false)
        uniforms.resolution.value = [innerWidth, innerHeight]
      }
      resize()
      window.addEventListener('resize', resize)
      let id: number
      const loop = () => { uniforms.time.value += 0.007; renderer.render(scene, camera); id = requestAnimationFrame(loop) }
      loop()
      return () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); renderer.dispose() }
    }
    document.head.appendChild(script)
  }, [])

  return <canvas ref={canvasRef} id="gl-canvas" />
}

// ─── MAIN PAGE ─────────────────────────────────────────────────
export default function HomePage() {
  const [activeTab, setActiveTab] = useState(0)
  const [stickyVisible, setStickyVisible] = useState(false)
  const [exitVisible, setExitVisible] = useState(false)
  const [exitEmail, setExitEmail] = useState('')
  const [exitSent, setExitSent] = useState(false)
  const [heroEmail, setHeroEmail] = useState('')
  const [heroSent, setHeroSent] = useState(false)
  const [nlEmail, setNlEmail] = useState('')
  const [nlSent, setNlSent] = useState(false)
  const [blockchainEmail, setBlockchainEmail] = useState('')
  const [blockchainEmailSent, setBlockchainEmailSent] = useState(false)
  const [barVisible, setBarVisible] = useState(true)
  const [announceIdx, setAnnounceIdx] = useState(0)
  const [lang, setLang] = useState<'EN'|'PT'|'ES'>('EN')
  const exitShown = useRef(false)

  // Rotate announcement bar messages
  useEffect(() => {
    const id = setInterval(() => setAnnounceIdx(i => (i + 1) % ANNOUNCES.length), 4000)
    return () => clearInterval(id)
  }, [])

  // Sticky bottom bar on scroll
  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 500) setStickyVisible(true) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Exit intent
  useEffect(() => {
    const onLeave = (e: MouseEvent) => {
      if (e.clientY < 10 && !exitShown.current && !sessionStorage.getItem('exitShown')) {
        exitShown.current = true
        setTimeout(() => setExitVisible(true), 400)
      }
    }
    document.addEventListener('mouseleave', onLeave)
    return () => document.removeEventListener('mouseleave', onLeave)
  }, [])

  const closeExit = useCallback(() => {
    setExitVisible(false)
    sessionStorage.setItem('exitShown', '1')
  }, [])

  const submitExitEmail = useCallback(async () => {
    if (!exitEmail.includes('@')) return
    setExitSent(true)
    await captureLead(exitEmail, 'exit_popup')
    setTimeout(closeExit, 2800)
  }, [exitEmail, closeExit])

  const submitHeroEmail = useCallback(async () => {
    if (!heroEmail.includes('@')) return
    setHeroSent(true)
    await captureLead(heroEmail, 'hero_form')
  }, [heroEmail])

  const submitNewsletter = useCallback(async () => {
    if (!nlEmail.includes('@')) return
    setNlSent(true)
    await captureLead(nlEmail, 'newsletter')
  }, [nlEmail])

  const submitBlockchainEmail = useCallback(async () => {
    if (!blockchainEmail.includes('@')) return
    setBlockchainEmailSent(true)
    await captureLead(blockchainEmail, 'blockchain_lead_magnet', 'blockchain_kit')
  }, [blockchainEmail])

  return (
    <>
      <WebGLBackground />
      <div className="veil" />

      {/* ── ANNOUNCEMENT BAR ── */}
      {barVisible && (
        <div className="announce-bar">
          <div className="announce-inner">
            <span className="announce-msg">{ANNOUNCES[announceIdx]}</span>
            <a href="https://docstack.bizlegal-ai.com" className="announce-cta">Get Started →</a>
            <button className="announce-close" onClick={() => setBarVisible(false)} aria-label="Close">×</button>
          </div>
        </div>
      )}

      {/* ── STICKY BOTTOM BAR ── */}
      <div className={`sticky-bar ${stickyVisible ? 'show' : ''}`}>
        <div className="sb-text">
          🇦🇪 <strong>DOR INNOVATIONS</strong> — Regulatory risk intelligence for digital asset ventures
        </div>
        <div className="sb-actions">
          <a href="https://brai.bizlegal-ai.com" className="btn-primary">Free Risk Scan →</a>
          <a href="https://docstack.bizlegal-ai.com" className="btn-ghost">Templates</a>
          <button className="sb-close" onClick={() => setStickyVisible(false)}>×</button>
        </div>
      </div>

      {/* ── EXIT INTENT POPUP ── */}
      <div className={`exit-ov ${exitVisible ? 'show' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeExit() }}>
        <div className="exit-box">
          <button className="exit-x" onClick={closeExit}>×</button>
          <div className="exit-badge">Wait — free resource inside</div>
          <h3>Get the Free <em>VARA Regulatory Checklist</em></h3>
          <p>UAE Digital Asset Compliance Checklist + VARA licensing roadmap. Used by founders raising in DIFC. Enter your email — sent instantly.</p>
          {!exitSent ? (
            <div className="exit-email-row">
              <input
                type="email"
                placeholder="your@email.com"
                value={exitEmail}
                onChange={(e) => setExitEmail(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && submitExitEmail()}
                autoFocus
              />
              <button className="btn-hero btn-hero-p" style={{ padding: '12px 20px', fontSize: '13px', whiteSpace: 'nowrap' }} onClick={submitExitEmail}>
                Send Free Checklist →
              </button>
            </div>
          ) : (
            <div className="exit-thanks" style={{ display: 'block', marginBottom: '12px' }}>✓ On its way! Your VARA checklist is in your inbox.</div>
          )}
          <a href="https://brai.bizlegal-ai.com" className="btn-hero btn-hero-g" style={{ width: '100%', display: 'block', textAlign: 'center' }}>
            Or run a free regulatory scan now →
          </a>
          <span className="exit-dismiss" onClick={closeExit}>
            No thanks, I'll risk regulatory exposure
          </span>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav>
        <div className="nav-wrap">
          <Link href="/" className="nav-logo">DOR<em>INNOVATIONS</em></Link>
          <div className="nav-menu">
            {/* Tools dropdown */}
            <div className="nav-dropdown">
              <button className="nav-link">Tools ▾</button>
              <div className="nav-dropdown-menu">
                <Link href="/tools" className="nav-dd-item"><span className="nav-dd-icon">🔍</span>SaaS Risk Scanner</Link>
                <Link href="/tools/contract-fixer" className="nav-dd-item"><span className="nav-dd-icon">🛠️</span>Contract Fixer</Link>
                <Link href="/tools/website-compliance" className="nav-dd-item"><span className="nav-dd-icon">🌐</span>Website Compliance</Link>
                <Link href="/tools/debt-collection" className="nav-dd-item"><span className="nav-dd-icon">📬</span>Debt Collection</Link>
                <Link href="/blockchain-report" className="nav-dd-item" style={{ borderTop: '1px solid var(--border)', marginTop: 4, paddingTop: 10 }}><span className="nav-dd-icon">⛓️</span>Blockchain Report <span style={{ fontSize: 9, background: 'rgba(165,180,252,0.15)', color: 'var(--indigo)', padding: '1px 5px', borderRadius: 3, marginLeft: 4 }}>NEW</span></Link>
              </div>
            </div>
            {/* Products dropdown */}
            <div className="nav-dropdown">
              <button className="nav-link">Products ▾</button>
              <div className="nav-dropdown-menu">
                <a href="https://docstack.bizlegal-ai.com" className="nav-dd-item"><span className="nav-dd-icon">📄</span>DocStack — Templates</a>
                <a href="https://brai.bizlegal-ai.com" className="nav-dd-item"><span className="nav-dd-icon">⚡</span>BRAI — Compliance</a>
                <a href="https://tracr.bizlegal-ai.com" className="nav-dd-item"><span className="nav-dd-icon">🔬</span>TRACR — Forensics</a>
              </div>
            </div>
            <Link href="/calculators" className="nav-link">Calculators</Link>
            <Link href="/pricing" className="nav-link">Pricing</Link>
            <Link href="/faq" className="nav-link">FAQ</Link>
            <Link href="/about" className="nav-link">About</Link>
          </div>
          <div className="nav-right">
            <div style={{ display: 'flex', gap: '4px', background: 'rgba(4,6,14,0.6)', border: '1px solid rgba(125,211,252,0.1)', borderRadius: '7px', padding: '3px' }}>
              {(['EN','PT','ES'] as const).map(l => (
                <button key={l} onClick={() => setLang(l as 'EN'|'PT'|'ES')} style={{
                  padding: '4px 8px', borderRadius: '4px', fontSize: '10px',
                  fontFamily: 'Geist Mono, monospace', fontWeight: 700, cursor: 'pointer', border: 'none',
                  background: lang === l ? 'rgba(125,211,252,0.15)' : 'transparent',
                  color: lang === l ? 'var(--sky)' : 'var(--muted)',
                }}>{l}</button>
              ))}
            </div>
            <a href="https://brai.bizlegal-ai.com" className="btn-ghost">Free Scan</a>
            <a href="https://docstack.bizlegal-ai.com" className="btn-primary">Get Templates →</a>
          </div>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-badge">
            <div className="bdot" />
            Commercial Attorney · Entrepreneur · Digital Asset Regulatory Intelligence
          </div>

          <h1 className="hero-h">
            Regulatory Risk<br />
            Intelligence —<br />
            <span className="hs">Engineered for Precision</span>
          </h1>

          <p className="hero-sub">
            <strong style={{color:'var(--sky)'}}>DOR INNOVATIONS</strong> provides structured AI-driven regulatory risk intelligence for digital asset ventures operating in complex jurisdictions. UAE / DIFC focus. Identify exposure before it becomes structural liability.
          </p>

          <div className="hero-ctas">
            <a href="https://brai.bizlegal-ai.com" className="btn-hero btn-hero-p">
              Free Regulatory Risk Scan →
            </a>
            <a href="https://docstack.bizlegal-ai.com" className="btn-hero btn-hero-g">
              Legal Templates — From $49
            </a>
          </div>

          {/* INLINE EMAIL CAPTURE */}
          <div className="hero-email-capture">
            {!heroSent ? (
              <>
                <div className="hec-label">🎁 Free: UAE Digital Asset Regulatory Checklist + VARA Compliance Roadmap — sent instantly</div>
                <div className="hec-row">
                  <input
                    type="email"
                    className="hec-input"
                    placeholder="Enter your email address"
                    value={heroEmail}
                    onChange={(e) => setHeroEmail(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && submitHeroEmail()}
                  />
                  <button className="hec-btn" onClick={submitHeroEmail}>
                    Send Me the Free Checklist →
                  </button>
                </div>
                <div className="hec-sub">No spam. Digital asset founders across 6 jurisdictions. Unsubscribe any time.</div>
              </>
            ) : (
              <div className="hec-thanks">✓ On its way — your UAE Digital Asset Regulatory Checklist is in your inbox!</div>
            )}
          </div>

          {/* CREDIBILITY ROW */}
          <div className="cred-row">
            <span>⚖️ Commercial Attorney · Entrepreneur</span>
            <span className="cred-sep">|</span>
            <span>🇦🇪 UAE / DIFC · VARA Focus</span>
            <span className="cred-sep">|</span>
            <span>✓ $100M+ in transactions advised</span>
            <span className="cred-sep">|</span>
            <span>✓ VARA · MiCA · SEC · MAS</span>
          </div>

          {/* PRICE ANCHOR — DOR INNOVATIONS vs Traditional Firm */}
          <div className="price-anchor">
            <div className="pa-left">
              <div className="pa-label-bad">Traditional Law Firm</div>
              <div className="pa-price-dim">$5k–$20k+</div>
              <div className="pa-sub-dim">Weeks of back-and-forth</div>
            </div>
            <div className="pa-vs"><span>vs</span></div>
            <div className="pa-right">
              <div className="pa-label-good">DOR INNOVATIONS</div>
              <div className="pa-price-bright">From $49</div>
              <div className="pa-sub-good">AI-precision · same regulatory depth</div>
            </div>
          </div>

          {/* PRODUCT TABS */}
          <div className="hero-tabs">
            {TABS.map((tab, i) => (
              <div key={tab.label} className={`htab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>
                <span className="hi">{tab.icon}</span>
                {tab.label}
              </div>
            ))}
          </div>

          {/* SOCIAL PROOF */}
          <div className="sp-counter">
            <div className="sp-avs">
              {['DK','SL','AR','+'].map((av, i) => (
                <div key={i} className="sp-av">{av}</div>
              ))}
            </div>
            <span><strong>Digital asset founders</strong> across UAE · EU · US · UK</span>
          </div>

          {/* TRUST BADGES */}
          <div className="trust-badges">
            {['🔒 SSL Secured','🇦🇪 VARA / DIFC Focus','⚡ AI-Powered Analysis','✅ Commercial Attorney','🌍 6 Jurisdictions','🏛️ $100M+ Transactions','🧠 20+ Yrs Practice','🤖 Claude AI Powered'].map(b => (
              <div key={b} className="tbadge">{b}</div>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <section className="section">
          <div className="container">
            <div className="stats-strip">
              {[['$100M+','Transactions Advised'],['20+','Years Legal Practice'],['6','Jurisdictions Covered'],['VARA·MiCA·SEC','Regulators Analysed']].map(([val,lbl]) => (
                <div key={lbl} className="stat-cell">
                  <div className="stat-val">{val}</div>
                  <div className="stat-lbl">{lbl}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── DOCSTACK FEATURE ── */}
        <section className="section">
          <div className="container">
            <div className="feat-grid">
              <div>
                <div className="eyebrow"><div className="eline" /><span className="elabel">Regulatory Document Intelligence</span></div>
                <h2 className="sh">Jurisdiction-ready docs —<br /><em>engineered for precision</em></h2>
                <p className="sdesc">Commercial attorney-drafted, AI-refined. Digital asset ventures need precision documentation. Fill a short form, get jurisdiction-ready DOCX + PDF in 60 seconds.</p>
                <div className="feat-steps">
                  {[
                    ['01','Select Jurisdiction','UAE/DIFC, EU/MiCA, US/SEC, UK/FCA — regulatory context auto-applied'],
                    ['02','Enter Deal Structure','Token model, parties, amounts — Claude AI applies the correct regulatory framework'],
                    ['03','Download Instantly','DOCX + PDF in ~60 seconds. Commercial attorney quality. Ready for review.'],
                  ].map(([n,h,p]) => (
                    <div key={n} className="fstep">
                      <div className="fn">{n}</div>
                      <div className="fb"><h4>{h}</h4><p>{p}</p></div>
                    </div>
                  ))}
                </div>
                <div className="feat-tags">
                  {['JV Agreement','NDA','LOI','Capital Call','LLC Operating Agreement'].map(t => (
                    <div key={t} className="ftag"><div className="dot" />{t}</div>
                  ))}
                </div>
                <div style={{ marginTop: '28px' }}>
                  <a href="https://docstack.bizlegal-ai.com" className="btn-hero btn-hero-p" style={{ fontSize: '13px', padding: '13px 28px' }}>
                    Browse All Templates →
                  </a>
                </div>
              </div>
              <div className="feat-vis">
                <div className="mock-win">
                  <div className="mock-bar">
                    <div className="mdot" style={{background:'#ff5f57'}} />
                    <div className="mdot" style={{background:'#febc2e'}} />
                    <div className="mdot" style={{background:'#28c840'}} />
                  </div>
                  <div className="mock-body">
                    <div style={{fontSize:'10px',color:'var(--muted)',marginBottom:'12px',letterSpacing:'0.1em'}}>DOCSTACK — SELECT TEMPLATE</div>
                    {['Joint Venture Agreement','NDA — Real Estate','LOI Commercial','Capital Call Agreement','LLC Operating Agreement'].map(t => (
                      <div key={t} className="mock-row">{`📄 ${t}`}<span className="tag tg-teal">LIVE</span></div>
                    ))}
                    <div className="mock-cta" style={{background:'rgba(125,211,252,0.07)',borderColor:'rgba(125,211,252,0.2)',color:'var(--sky)'}}>
                      ⚡ Generate DOCX + PDF in ~60 seconds
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── DOCUMENT PREVIEW ── */}
        <section className="section" id="preview">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Document Preview</span></div>
            <h2 className="sh">See what you get — <em>before</em> you buy</h2>
            <p className="sdesc" style={{marginBottom:'40px'}}>Every template follows institutional legal contract structure. Here's a sample output.</p>
            <div className="doc-preview-grid">
              <div className="doc-window">
                <div className="doc-bar">
                  <div className="mdot" style={{background:'#ff5f57'}} />
                  <div className="mdot" style={{background:'#febc2e'}} />
                  <div className="mdot" style={{background:'#28c840'}} />
                  <span className="doc-title">joint-venture-agreement.docx</span>
                </div>
                <div className="doc-body">
                  <div className="doc-heading">JOINT VENTURE AGREEMENT</div>
                  <div className="doc-sub">Dated: [DATE] · Jurisdiction: [JURISDICTION]</div>
                  <div className="doc-section-title">SECTION 1 — DEFINITIONS</div>
                  <div className="doc-section-body">"Joint Venture" means the joint enterprise established pursuant to this Agreement between the Parties for the purpose of [PROJECT DESCRIPTION]...</div>
                  <div className="doc-section-title">SECTION 4 — REPRESENTATIONS & WARRANTIES</div>
                  <div className="doc-section-body">Each Party represents and warrants that: (a) it has full legal capacity and authority to enter into this Agreement; (b) this Agreement constitutes a valid and binding obligation...</div>
                  <div className="doc-section-title">SECTION 6 — PROFIT DISTRIBUTION</div>
                  <div className="doc-section-body">Net Profits shall be distributed between the Parties in the proportions set out in Schedule 1, subject to the maintenance of agreed Reserve Funds...</div>
                  <div className="doc-cta">⚡ Generated in 60 seconds from your deal details</div>
                </div>
              </div>
              <div>
                <div style={{marginBottom:'28px'}}>
                  <div style={{fontSize:'13px',color:'var(--muted)',marginBottom:'16px'}}>Output formats:</div>
                  {[
                    ['📄','DOCX','Fully editable in Word or Google Docs'],
                    ['📋','PDF','Formatted for signing or sharing'],
                    ['✏️','Editable clauses','Inline AI clause editor'],
                  ].map(([icon,label,sub]) => (
                    <div key={label} className="format-row">
                      <span style={{fontSize:'18px'}}>{icon}</span>
                      <div>
                        <div className="format-label">{label}</div>
                        <div className="format-sub">{sub}</div>
                      </div>
                      <span className="format-check">✓</span>
                    </div>
                  ))}
                </div>
                <div className="lawyer-cred">
                  <div className="cred-label">Drafted by</div>
                  <div className="cred-name">20 years legal practice</div>
                  <div className="cred-detail">$100M+ in transactions · 6 jurisdictions · LLB + LLM</div>
                </div>
                <a href="https://docstack.bizlegal-ai.com" className="btn-hero btn-hero-p" style={{width:'100%',display:'block',textAlign:'center',fontSize:'15px'}}>
                  Generate My Contract — $49 →
                </a>
                <div style={{fontSize:'11px',color:'var(--muted)',textAlign:'center',marginTop:'10px'}}>
                  Takes 90 seconds · Download instantly · 7-day money-back
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BRAI FEATURE ── */}
        <section className="section">
          <div className="container">
            <div className="feat-grid" style={{direction:'rtl'}}>
              <div style={{direction:'ltr'}}>
                <div className="eyebrow"><div className="eline" /><span className="elabel">AI Regulatory Risk Intelligence</span></div>
                <h2 className="sh">Identify exposure <em>before</em> it becomes structural liability</h2>
                <p className="sdesc">BRAI scans your digital asset venture against VARA, MiCA, SEC, and MAS simultaneously. The DOR INNOVATIONS approach: structured risk intelligence, not reactive compliance.</p>
                <div className="feat-steps">
                  {[
                    ['01','Submit Venture Structure','Token model, jurisdiction, business activity — DOR framework applied'],
                    ['02','AI Scans 4 Regulators','VARA · MiCA · SEC · MAS — simultaneously in under 60 seconds'],
                    ['03','Receive Risk Intelligence','Exposure flags, regulatory pathway, jurisdiction comparison, action plan'],
                  ].map(([n,h,p]) => (
                    <div key={n} className="fstep">
                      <div className="fn">{n}</div>
                      <div className="fb"><h4>{h}</h4><p>{p}</p></div>
                    </div>
                  ))}
                </div>
                <div style={{ marginTop: '28px', display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <a href="https://brai.bizlegal-ai.com" className="btn-hero btn-hero-p" style={{ fontSize: '13px', padding: '13px 28px', color: 'var(--indigo)', borderColor: 'rgba(165,180,252,0.5)', background: 'rgba(165,180,252,0.08)' }}>
                    Run Free Scan →
                  </a>
                </div>
              </div>
              <div style={{direction:'ltr'}} className="feat-vis">
                <div className="mock-win">
                  <div className="mock-bar">
                    <div className="mdot" style={{background:'#ff5f57'}} />
                    <div className="mdot" style={{background:'#febc2e'}} />
                    <div className="mdot" style={{background:'#28c840'}} />
                  </div>
                  <div className="mock-body">
                    <div style={{fontSize:'10px',color:'var(--muted)',marginBottom:'12px',letterSpacing:'0.1em'}}>BRAI — COMPLIANCE SCAN</div>
                    <div className="mock-row">🇦🇪 VARA (UAE)<span className="tag tg-teal">✓ Compliant</span></div>
                    <div className="mock-row">🇪🇺 MiCA (EU)<span className="tag tg-ind">⚠ Review</span></div>
                    <div className="mock-row">🇺🇸 SEC (USA)<span className="tag tg-warn">✗ Action Req.</span></div>
                    <div className="mock-row">🇸🇬 MAS (SGP)<span className="tag tg-teal">✓ Compliant</span></div>
                    <div className="mock-cta" style={{background:'rgba(165,180,252,0.07)',borderColor:'rgba(165,180,252,0.2)',color:'var(--indigo)'}}>
                      📊 Full Report — 12 Risk Flags · PDF Download
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section className="section">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">DOR INNOVATIONS Suite</span></div>
            <h2 className="sh" style={{marginBottom:'12px'}}>Regulatory Intelligence,<br /><em>engineered end-to-end</em></h2>
            <p className="sdesc" style={{marginBottom:'36px'}}>Three precision instruments. One unified intelligence layer for digital asset ventures.</p>
            <div className="prod-grid">
              <div className="pcard">
                <span className="ptag pt-sky">LIVE</span>
                <div className="pname">DocStack</div>
                <p className="pdesc">Commercial attorney-drafted contract templates. Digital asset JV, NDA, token agreements, capital call. Jurisdiction-specific. DOCX + PDF instant download.</p>
                <div className="pfoot">
                  <span className="pprice">From $49</span>
                  <a href="https://docstack.bizlegal-ai.com" className="pcta pc-sky">Browse Templates →</a>
                </div>
              </div>
              <div className="pcard">
                <span className="ptag pt-ind">LIVE</span>
                <div className="pname">BRAI</div>
                <p className="pdesc">AI-powered regulatory risk intelligence. Scans VARA, MiCA, SEC, MAS simultaneously. Identifies exposure before it becomes structural liability. Free scan.</p>
                <div className="pfoot">
                  <span className="pprice">Free + $49/mo</span>
                  <a href="https://brai.bizlegal-ai.com" className="pcta pc-ind">Run Free Scan →</a>
                </div>
              </div>
              <div className="pcard">
                <span className="ptag pt-teal">BETA</span>
                <div className="pname">TRACR</div>
                <p className="pdesc">AI forensic investigation for digital asset disputes. Wallet tracing, fund flow analysis, court-ready reports for litigation and regulatory proceedings.</p>
                <div className="pfoot">
                  <span className="pprice">$99 / report</span>
                  <a href="https://tracr.bizlegal-ai.com" className="pcta pc-teal">Join Waitlist →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── LIVE CRYPTO MARKETS ── */}
        <section className="section" id="crypto">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Digital Asset Markets</span></div>
            <h2 className="sh" style={{ marginBottom: '12px' }}>Live Markets. <em>Real-time Regulatory Context.</em></h2>
            <p className="sdesc" style={{ marginBottom: '32px' }}>
              Market intelligence for digital asset ventures — real-time prices, regulatory exposure context, and compliance signals
            </p>
            <CryptoWidget />
          </div>
        </section>

        {/* ── BLOCKCHAIN REPORT CTA ── */}
        <section className="section" id="blockchain-report">
          <div className="container">
            <div className="blockchain-report-banner">
              <div className="brb-left">
                <div className="eyebrow" style={{ marginBottom: '12px' }}>
                  <div className="eline" /><span className="elabel" style={{ color: 'var(--indigo)' }}>NEW — Tier 1 AI Report</span>
                </div>
                <h2 className="sh" style={{ marginBottom: '12px' }}>
                  Free Blockchain<br /><em>Regulatory Report</em>
                </h2>
                <p className="sdesc" style={{ marginBottom: '20px' }}>
                  Enter your project details. Get instant analysis across VARA, MiCA, SEC, FCA, MAS & CSA —
                  Howey Test, token classification, required licenses, risk flags, and compliance roadmap.
                </p>
                <div className="brb-features">
                  {[
                    ['🇦🇪', 'UAE VARA — Virtual Asset License'],
                    ['🇪🇺', 'EU MiCA — Token Classification'],
                    ['🇺🇸', 'US SEC — Howey Test Analysis'],
                    ['🇬🇧', 'UK FCA — Crypto Registration'],
                    ['🇸🇬', 'Singapore MAS — DPT License'],
                    ['🇨🇦', 'Canada CSA — Compliance Path'],
                  ].map(([flag, label]) => (
                    <div key={String(label)} className="brb-feature">
                      <span>{flag}</span>
                      <span style={{ fontSize: 12, color: 'var(--muted)' }}>{label}</span>
                    </div>
                  ))}
                </div>
                <div style={{ display: 'flex', gap: 12, marginTop: 24, flexWrap: 'wrap' }}>
                  <Link href="/blockchain-report" className="btn-hero btn-hero-p" style={{ fontSize: 14, padding: '13px 28px', background: 'rgba(165,180,252,0.12)', borderColor: 'rgba(165,180,252,0.4)', color: 'var(--indigo)' }}>
                    Get Free Preview Report →
                  </Link>
                  <Link href="/blockchain-report" className="btn-hero btn-hero-g" style={{ fontSize: 14, padding: '13px 28px' }}>
                    Full Tier 1 Report — $99
                  </Link>
                </div>
              </div>
              <div className="brb-right">
                <div className="mock-win">
                  <div className="mock-bar">
                    <div className="mdot" style={{ background: '#ff5f57' }} />
                    <div className="mdot" style={{ background: '#febc2e' }} />
                    <div className="mdot" style={{ background: '#28c840' }} />
                    <span style={{ fontSize: 10, color: 'var(--muted)', marginLeft: 8 }}>blockchain-report.pdf</span>
                  </div>
                  <div className="mock-body">
                    <div style={{ fontSize: 10, color: 'var(--muted)', marginBottom: 14, letterSpacing: '0.1em' }}>BLOCKCHAIN COMPLIANCE REPORT</div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
                      <div>
                        <div style={{ fontSize: 13, color: '#fff', fontWeight: 600 }}>MetaSwap Protocol</div>
                        <div style={{ fontSize: 10, color: 'var(--muted)' }}>MSP Token · Ethereum</div>
                      </div>
                      <div style={{ textAlign: 'center' }}>
                        <div style={{ fontSize: 20, fontWeight: 700, color: '#f59e0b', fontFamily: 'Geist Mono, monospace' }}>67</div>
                        <div style={{ fontSize: 9, color: 'var(--muted)' }}>RISK SCORE</div>
                      </div>
                    </div>
                    <div className="mock-row">🇦🇪 UAE VARA<span className="tag tg-ind">⚠ License Req.</span></div>
                    <div className="mock-row">🇪🇺 EU MiCA<span className="tag tg-teal">✓ ARToken</span></div>
                    <div className="mock-row">🇺🇸 SEC Howey<span className="tag tg-warn">✗ Review</span></div>
                    <div className="mock-row">🇬🇧 FCA<span className="tag tg-teal">✓ Registered</span></div>
                    <div className="mock-cta" style={{ background: 'rgba(165,180,252,0.07)', borderColor: 'rgba(165,180,252,0.2)', color: 'var(--indigo)' }}>
                      📋 6 jurisdictions · Risk matrix · Action plan
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BLOCKCHAIN LEAD MAGNET ── */}
        <section className="section">
          <div className="container">
            <div className="blockchain-lead-magnet">
              <div className="blm-icon">⛓️</div>
              <div className="blm-content">
                <div className="eyebrow" style={{ marginBottom: 10 }}><div className="eline" /><span className="elabel">Free DOR INNOVATIONS Starter Kit</span></div>
                <h3 style={{ fontSize: 22, color: '#fff', marginBottom: 8, lineHeight: 1.3 }}>
                  UAE Digital Asset Regulatory Checklist
                </h3>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7, marginBottom: 16, maxWidth: 480 }}>
                  46-point regulatory checklist used by digital asset founders launching in UAE / DIFC across VARA, MiCA, SEC & MAS jurisdictions.
                </p>
                <div className="blm-items">
                  {[
                    '✓ VARA MVL license requirements (UAE)',
                    '✓ MiCA token classification flowchart',
                    '✓ SEC Howey Test self-assessment',
                    '✓ FCA cryptoasset registration steps',
                    '✓ DeFi regulatory risk matrix',
                    '✓ Token distribution legal template',
                  ].map(item => (
                    <span key={item} className="blm-item">{item}</span>
                  ))}
                </div>
              </div>
              <div className="blm-form">
                {!blockchainEmailSent ? (
                  <>
                    <div style={{ fontSize: 14, color: '#fff', fontWeight: 600, marginBottom: 12, textAlign: 'center' }}>
                      Download Free — Instant Access
                    </div>
                    <input
                      type="email"
                      className="hec-input"
                      placeholder="your@email.com"
                      value={blockchainEmail}
                      onChange={e => setBlockchainEmail(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && submitBlockchainEmail()}
                      style={{ width: '100%', marginBottom: 10 }}
                    />
                    <button className="hec-btn" onClick={submitBlockchainEmail} style={{ width: '100%', textAlign: 'center' }}>
                      Get Free Blockchain Kit →
                    </button>
                    <div style={{ fontSize: 11, color: 'var(--dim)', textAlign: 'center', marginTop: 8 }}>
                      No spam. Used by 200+ Web3 founders.
                    </div>
                  </>
                ) : (
                  <div style={{ textAlign: 'center' }}>
                    <div style={{ fontSize: 28, marginBottom: 10 }}>✓</div>
                    <div style={{ color: 'var(--teal)', fontSize: 14, fontWeight: 600 }}>Kit on its way!</div>
                    <div style={{ color: 'var(--muted)', fontSize: 12, marginTop: 6 }}>Check your inbox for the blockchain compliance checklist.</div>
                    <Link href="/blockchain-report" style={{ display: 'inline-block', marginTop: 14, fontSize: 13, color: 'var(--indigo)', textDecoration: 'none' }}>
                      Run your free compliance report →
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ── */}
        <section className="section">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Why DOR INNOVATIONS</span></div>
            <h2 className="sh" style={{marginBottom:'32px'}}>Traditional Firm vs. <em>Regulatory Intelligence</em></h2>
            <div className="ww-grid">
              <div className="ww-card ww-before">
                <div className="ww-title">Traditional Law Firm</div>
                {['$5,000–$20,000+ per engagement','3–6 week turnaround','Generalist, not digital-asset specific','No AI-powered risk scanning','No multi-jurisdiction comparison','Reactive: fixes problems after they occur'].map(item => (
                  <div key={item} className="ww-item"><span className="ico-no">✕</span>{item}</div>
                ))}
              </div>
              <div className="ww-card ww-after">
                <div className="ww-title">DOR INNOVATIONS</div>
                {['From $49 — instant delivery','Under 60 seconds to jurisdiction-ready draft','Commercial attorney + digital asset specialist','VARA · MiCA · SEC · MAS AI scan included','6 jurisdictions, one intelligence layer','Proactive: identifies exposure before it crystallises'].map(item => (
                  <div key={item} className="ww-item"><span className="ico-yes">✓</span>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── FREE AI TOOLS ── */}
        <section className="section">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Free AI Legal Tools</span></div>
            <h2 className="sh" style={{ marginBottom: '12px' }}>Lawyer-grade analysis. <em>Instantly free.</em></h2>
            <p className="sdesc" style={{ marginBottom: '40px' }}>4 AI tools powered by Claude Sonnet. No signup. No credit card. Results in under 30 seconds.</p>
            <div className="tools-section-grid">
              {[
                { icon: '🔍', name: 'SaaS Terms Risk Scanner', desc: 'Paste any SaaS contract — get risk score, red flags, and negotiation points instantly.', href: '/tools/saas-risk-scanner', color: 'var(--sky)' },
                { icon: '🛠️', name: 'Freelancer Contract Fixer', desc: 'Identifies weak clauses and rewrites them to protect your rights and payment.', href: '/tools/contract-fixer', color: 'var(--teal)' },
                { icon: '🌐', name: 'Website Compliance Checker', desc: 'GDPR, CCPA, ADA & cookie compliance scan for any URL. Instant scored report.', href: '/tools/website-compliance', color: 'var(--indigo)' },
                { icon: '📬', name: 'Debt Collection Letter', desc: 'Professional, jurisdiction-compliant debt letters generated in EN, PT & ES.', href: '/tools/debt-collection', color: 'var(--teal)' },
              ].map(t => (
                <Link key={t.href} href={t.href} className="tool-mini-card">
                  <div className="tool-mini-icon">{t.icon}</div>
                  <div className="tool-mini-name">{t.name}</div>
                  <div className="tool-mini-desc">{t.desc}</div>
                  <div className="tool-mini-cta" style={{ color: t.color }}>Try free →</div>
                </Link>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '28px', display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
              <Link href="/tools" className="btn-primary">View All 4 AI Tools →</Link>
              <Link href="/calculators" className="btn-ghost">Legal Calculators</Link>
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="section">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Who It&apos;s For</span></div>
            <h2 className="sh" style={{marginBottom:'32px'}}>Built for <em>your industry</em></h2>
            <div className="ind-grid">
              {[
                {icon:'🏗️',name:'Digital Asset Founders',desc:'VARA, MiCA, SEC compliance intelligence for token launches, DeFi, and digital asset ventures.',link:'https://brai.bizlegal-ai.com',cta:'Free risk scan →'},
                {icon:'🇦🇪',name:'UAE / DIFC Ventures',desc:'Specialist VARA regulatory intelligence. MVL, MPI, and MSC license pathway analysis.',link:'/guides/uae/vara-mvl-license-guide-uae',cta:'Read VARA guide →'},
                {icon:'🏦',name:'Investment Funds',desc:'Cross-border fund structuring, capital call agreements, cross-border regulatory analysis.',link:'https://docstack.bizlegal-ai.com',cta:'View templates →'},
                {icon:'⚖️',name:'Commercial Attorneys',desc:'TRACR forensic reports for litigation. AI-powered wallet tracing and fraud documentation.',link:'https://tracr.bizlegal-ai.com',cta:'Order report →'},
                {icon:'🌐',name:'Cross-Border Operators',desc:'Multi-jurisdiction regulatory structuring. UAE-EU-US parallel analysis.',link:'/#guides',cta:'Free guides →'},
                {icon:'🏢',name:'Enterprise',desc:'Custom regulatory intelligence bundles, white-label compliance reports, legal workflow automation.',link:'/pricing',cta:'Contact us →'},
              ].map(({icon,name,desc,link,cta}) => (
                <div key={name} className="icard">
                  <div className="iicon">{icon}</div>
                  <div className="iname">{name}</div>
                  <p className="idesc">{desc}</p>
                  <a href={link} className="ilink">{cta}</a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── TESTIMONIALS ── */}
        <section className="section">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Voices</span></div>
            <h2 className="sh" style={{marginBottom:'32px'}}>Built for people <em>like you</em></h2>
            <div className="testi-grid">
              {[
                {av:'JB',quote:'The VARA compliance report from BRAI gave us the roadmap to get our crypto licence in Dubai. Clear, actionable, fast — no law firm could deliver this at this speed.',hl:'VARA compliance',name:'James B.',role:'FinTech Founder, UAE'},
                {av:'SL',quote:'DOR INNOVATIONS flagged our MiCA exposure before we launched. Saved us from a costly compliance mistake on the EU rollout. The AI precision is exceptional.',hl:'MiCA exposure',name:'Sofia L.',role:'Digital Asset Founder, Lisbon'},
                {av:'AR',quote:'As a commercial attorney myself, I\'m impressed. The regulatory depth matches what I\'d produce — at a fraction of the time and cost. I use it for client screening.',hl:'fraction',name:'Avi R.',role:'Commercial Attorney, Tel Aviv'},
                {av:'MC',quote:'Closed a $4M digital asset fund round in DIFC using the capital call agreement. Saved $12k in legal fees. The VARA structuring guidance was precise.',hl:'$12k',name:'Maria C.',role:'Fund Manager, Dubai'},
                {av:'DK',quote:'The token distribution agreement template was jurisdiction-ready for UAE. We had our VARA structure in 60 seconds. Extraordinary intelligence layer.',hl:'jurisdiction-ready',name:'David K.',role:'Crypto Founder, Dubai'},
                {av:'PT',quote:'Used TRACR for a forensic investigation. The court-ready PDF was exactly what our litigation team needed — wallet tracing mapped perfectly.',hl:'court-ready PDF',name:'Priya T.',role:'Senior Solicitor, London'},
              ].map(({av,quote,hl,name,role}) => (
                <div key={name} className="tcard">
                  <p className="tquote">"{quote.split(hl).map((part, i, arr) => i < arr.length - 1 ? [part, <em key={i}>{hl}</em>] : part)}"</p>
                  <div className="tauthor">
                    <div className="tav">{av}</div>
                    <div><div className="tname">{name}</div><div className="trole">{role}</div></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICING PREVIEW ── */}
        <section className="section">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Pricing</span></div>
            <h2 className="sh" style={{marginBottom:'12px'}}>Transparent <em>pricing</em></h2>
            <p className="sdesc" style={{marginBottom:'44px'}}>One-time documents or monthly plans. No hidden fees.</p>
            <div className="pricing-grid">
              {[
                { name:'DocStack', price:'$49', unit:'/document', color:'var(--sky)', href:'https://docstack.bizlegal-ai.com', cta:'Get Contract →', tag:'Contract templates' },
                { name:'BRAI', price:'Free', unit:'→ $49/mo', color:'var(--indigo)', href:'https://brai.bizlegal-ai.com', cta:'Free Scan →', tag:'Compliance scanning', featured: true },
                { name:'TRACR', price:'$99', unit:'/report', color:'var(--teal)', href:'https://tracr.bizlegal-ai.com', cta:'Order Report →', tag:'Forensic investigation' },
              ].map(p => (
                <div key={p.name} className={`pricing-card ${p.featured ? 'pricing-featured' : ''}`} style={{ '--pc': p.color } as any}>
                  <div className="pc-tag">{p.tag}</div>
                  <div className="pc-name">{p.name}</div>
                  <div className="pc-price">
                    <span className="pc-amount">{p.price}</span>
                    <span className="pc-unit">{p.unit}</span>
                  </div>
                  <a href={p.href} className="pc-btn" style={{ color: p.color, borderColor: p.color }}>
                    {p.cta}
                  </a>
                </div>
              ))}
            </div>
            <div style={{ textAlign: 'center', marginTop: '28px' }}>
              <Link href="/pricing" style={{ fontSize: '13px', color: 'var(--sky)', letterSpacing: '0.05em' }}>
                View full pricing comparison →
              </Link>
            </div>
          </div>
        </section>

        {/* ── LEAD MAGNET ── */}
        <section className="section">
          <div className="container">
            <div className="lead-magnet">
              <div className="lm-content">
                <div className="eyebrow" style={{ marginBottom: '12px' }}><div className="eline" /><span className="elabel">Free Resource</span></div>
                <h2 className="sh" style={{ marginBottom: '12px' }}>The DOR INNOVATIONS<br /><em>Regulatory Starter Kit</em></h2>
                <p className="sdesc" style={{ marginBottom: '8px' }}>Used by digital asset founders raising in UAE, EU & US:</p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '16px', marginBottom: '28px' }}>
                  {[
                    '✓ UAE Digital Asset Regulatory Checklist (46-point)',
                    '✓ VARA licensing roadmap (MVL, MPI, MSC)',
                    '✓ MiCA token classification flowchart',
                    '✓ SEC Howey Test self-assessment guide',
                  ].map(item => (
                    <div key={item} style={{ fontSize: '13px', color: 'var(--muted)' }}>{item}</div>
                  ))}
                </div>
              </div>
              <div className="lm-form">
                <div className="lm-form-inner">
                  <div style={{ fontSize: '14px', color: '#fff', fontWeight: 600, marginBottom: '16px', textAlign: 'center' }}>
                    Download Free — Instant Access
                  </div>
                  {!heroSent ? (
                    <>
                      <input
                        type="email"
                        className="hec-input"
                        placeholder="Your email address"
                        value={heroEmail}
                        onChange={(e) => setHeroEmail(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && submitHeroEmail()}
                        style={{ width: '100%', marginBottom: '12px' }}
                      />
                      <button className="hec-btn" onClick={submitHeroEmail} style={{ width: '100%', textAlign: 'center' }}>
                        Send Me the Free Kit →
                      </button>
                      <div style={{ fontSize: '11px', color: 'var(--dim)', textAlign: 'center', marginTop: '10px' }}>
                        No spam. Unsubscribe anytime.
                      </div>
                    </>
                  ) : (
                    <div className="hec-thanks" style={{ textAlign: 'center' }}>✓ Kit on its way — check your inbox!</div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── GUIDES ── */}
        <section className="section" id="guides">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Free Legal Guides</span></div>
            <h2 className="sh" style={{marginBottom:'36px'}}>Learn from the <em>platform</em></h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'48px'}}>
              {[GUIDES.slice(0,3), GUIDES.slice(3)].map((col, ci) => (
                <div key={ci}>
                  {col.map(group => (
                    <div key={group.region} className="guide-group">
                      <div className="guide-region">{group.region}</div>
                      {group.items.map(item => (
                        <Link key={item.href} href={item.href} className="guide-link">
                          <span className="guide-title">{item.title}</span>
                          <span className="guide-arrow">→</span>
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── NEWSLETTER ── */}
        <section className="section">
          <div className="container">
            <div className="newsletter-section">
              <div style={{ textAlign: 'center', marginBottom: '32px' }}>
                <div className="eyebrow" style={{ justifyContent: 'center', marginBottom: '12px' }}><div className="eline" /><span className="elabel">Stay Ahead</span><div className="eline" /></div>
                <h2 className="sh" style={{ marginBottom: '10px' }}>Regulatory intelligence, <em>weekly</em></h2>
                <p style={{ fontSize: '14px', color: 'var(--muted)', maxWidth: '480px', margin: '0 auto', lineHeight: 1.75 }}>
                  VARA updates, MiCA enforcement news, SEC enforcement actions, and regulatory intelligence from DOR INNOVATIONS — for digital asset founders, attorneys, and investors.
                </p>
              </div>
              <div style={{ display: 'flex', gap: '10px', maxWidth: '480px', margin: '0 auto', flexWrap: 'wrap' }}>
                {!nlSent ? (
                  <>
                    <input
                      type="email"
                      className="hec-input"
                      placeholder="your@email.com"
                      value={nlEmail}
                      onChange={(e) => setNlEmail(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && submitNewsletter()}
                      style={{ flex: 1 }}
                    />
                    <button className="hec-btn" onClick={submitNewsletter} style={{ whiteSpace: 'nowrap' }}>Subscribe →</button>
                  </>
                ) : (
                  <div className="hec-thanks" style={{ width: '100%', textAlign: 'center' }}>✓ Subscribed! See you next week.</div>
                )}
              </div>
              <div style={{ textAlign: 'center', marginTop: '12px', fontSize: '11px', color: 'var(--dim)' }}>
                Digital asset founders · attorneys · investors · No spam · Weekly max
              </div>
            </div>
          </div>
        </section>

        {/* ── CTA BANNER ── */}
        <section className="section">
          <div className="container">
            <div className="cta-banner">
              <h2>Identify regulatory exposure <em>before</em> it becomes structural liability</h2>
              <p>DOR INNOVATIONS — boutique AI-driven regulatory risk intelligence for digital asset ventures. UAE / DIFC focus.</p>
              <div className="cta-btns">
                <a href="https://brai.bizlegal-ai.com" className="btn-hero btn-hero-p">Run Free Regulatory Scan →</a>
                <a href="https://docstack.bizlegal-ai.com" className="btn-hero btn-hero-g">Legal Templates from $49</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="container">
            <div className="foot-top">
              <div>
                <div className="flogo">DOR<em>INNOVATIONS</em></div>
                <p className="foot-brand-desc">Boutique regulatory intelligence & AI-driven risk analysis for digital asset ventures. Commercial attorney · Entrepreneur · UAE / DIFC focus.</p>
                <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                  {[['DocStack','https://docstack.bizlegal-ai.com','var(--sky)'],['BRAI','https://brai.bizlegal-ai.com','var(--indigo)'],['TRACR','https://tracr.bizlegal-ai.com','var(--teal)']].map(([name,href,color]) => (
                    <a key={name} href={href} style={{fontSize:'11px',color}}>{name}</a>
                  ))}
                </div>
              </div>
              <div className="foot-cols">
                {[
                  {title:'Products',links:[['DocStack — Templates','https://docstack.bizlegal-ai.com'],['BRAI — Compliance','https://brai.bizlegal-ai.com'],['TRACR — Forensics','https://tracr.bizlegal-ai.com'],['Pricing','/pricing']]},
                  {title:'Free AI Tools',links:[['SaaS Risk Scanner','/tools/saas-risk-scanner'],['Contract Fixer','/tools/contract-fixer'],['Website Compliance','/tools/website-compliance'],['Debt Collection','/tools/debt-collection'],['All Tools','/tools']]},
                  {title:'Resources',links:[['Free Guides','/#guides'],['Calculators','/calculators'],['FAQ','/faq'],['Newsletter','/#newsletter']]},
                  {title:'Company',links:[['About Us','/about'],['Contact','mailto:hello@bizlegal-ai.com'],['Accessibility','/accessibility']]},
                  {title:'Legal',links:[['Terms & Conditions','/terms'],['Privacy Policy','/privacy'],['Accessibility','/accessibility']]},
                ].map(col => (
                  <div key={col.title}>
                    <div className="fcol-title">{col.title}</div>
                    {col.links.map(([label,href]) => (
                      <a key={label} href={href} className="fcol-a">{label}</a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div className="foot-bottom">
              <span className="foot-copy">© 2025 DOR INNOVATIONS · Regulatory intelligence only — not legal advice · Commercial attorney · Entrepreneur · AI-assisted risk analysis</span>
              <div className="foot-legal">
                <a href="/terms">Terms</a>
                <a href="/privacy">Privacy</a>
                <a href="/accessibility">Accessibility</a>
                <a href="/faq">FAQ</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

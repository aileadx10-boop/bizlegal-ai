'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

// ─── DATA ─────────────────────────────────────────────────────
const GUIDES = [
  {
    region: 'UAE / DIFC',
    items: [
      { title: 'Joint Venture Agreement for Real Estate in UAE', href: '/guides/uae/joint-venture-agreement-real-estate-uae' },
      { title: 'VARA Token Distribution Agreement UAE', href: '/guides/uae/vara-token-distribution-agreement-uae' },
      { title: 'NDA for Real Estate Investment in UAE', href: '/guides/uae/nda-real-estate-investment-uae' },
    ],
  },
  {
    region: 'United States',
    items: [
      { title: 'Real Estate LLC Operating Agreement Guide', href: '/guides/united-states/operating-agreement-llc-real-estate' },
      { title: 'Capital Call Agreement Real Estate: US Legal Guide', href: '/guides/united-states/capital-call-agreement-real-estate' },
      { title: 'Real Estate Joint Venture Agreement Template', href: '/guides/united-states/joint-venture-agreement-real-estate-us' },
    ],
  },
  {
    region: 'European Union',
    items: [
      { title: 'MiCA Token Sale Agreement Template EU', href: '/guides/european-union/mica-token-sale-agreement-template' },
    ],
  },
  {
    region: 'United Kingdom',
    items: [
      { title: 'Commercial Real Estate LOI Template UK', href: '/guides/united-kingdom/loi-commercial-real-estate-uk' },
    ],
  },
  {
    region: 'Singapore / MAS',
    items: [
      { title: 'Capital Call Agreement Singapore', href: '/guides/singapore/capital-call-agreement-singapore' },
    ],
  },
  {
    region: 'Canada',
    items: [
      { title: 'Joint Venture Agreement Real Estate Canada', href: '/guides/canada/joint-venture-agreement-real-estate-canada' },
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

// ─── WEBGL SHADER ─────────────────────────────────────────────
function WebGLBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    // Lazy load Three.js
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
        uniforms,
        side: THREE.DoubleSide,
      })))

      const resize = () => {
        renderer.setSize(innerWidth, innerHeight, false)
        uniforms.resolution.value = [innerWidth, innerHeight]
      }
      resize()
      window.addEventListener('resize', resize)

      let id: number
      const loop = () => {
        uniforms.time.value += 0.007
        renderer.render(scene, camera)
        id = requestAnimationFrame(loop)
      }
      loop()

      return () => {
        cancelAnimationFrame(id)
        window.removeEventListener('resize', resize)
        renderer.dispose()
      }
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
  const [emailSent, setEmailSent] = useState(false)
  const exitShown = useRef(false)

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 400) setStickyVisible(true) }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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

  const closeExit = () => {
    setExitVisible(false)
    sessionStorage.setItem('exitShown', '1')
  }

  const submitEmail = () => {
    if (!exitEmail.includes('@')) return
    setEmailSent(true)
    setTimeout(closeExit, 2500)
  }

  return (
    <>
      <WebGLBackground />
      <div className="veil" />

      {/* ── STICKY BAR ── */}
      <div className={`sticky-bar ${stickyVisible ? 'show' : ''}`}>
        <div className="sb-text">
          ⚡ <strong>500+ lawyers</strong> use BizLegal AI — Lawyer-drafted templates from $49
        </div>
        <div className="sb-actions">
          <a href="https://docstack.bizlegal-ai.com" className="btn-primary">Get Templates →</a>
          <a href="https://brai.bizlegal-ai.com" className="btn-ghost">Free Scan</a>
          <button className="sb-close" onClick={() => setStickyVisible(false)}>×</button>
        </div>
      </div>

      {/* ── EXIT POPUP ── */}
      <div className={`exit-ov ${exitVisible ? 'show' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeExit() }}>
        <div className="exit-box">
          <button className="exit-x" onClick={closeExit}>×</button>
          <div className="exit-badge">Before you go</div>
          <h3>Get the JV Agreement <em>checklist free</em></h3>
          <p>The framework behind $10M+ deals in UAE, US, and EU. Enter your email and we'll send it instantly.</p>
          {!emailSent ? (
            <div className="exit-email-row">
              <input
                type="email"
                placeholder="your@email.com"
                value={exitEmail}
                onChange={(e) => setExitEmail(e.target.value)}
              />
              <button className="btn-hero btn-hero-p" style={{ padding: '12px 20px', fontSize: '13px', whiteSpace: 'nowrap' }} onClick={submitEmail}>
                Get Free →
              </button>
            </div>
          ) : (
            <div className="exit-thanks" style={{ display: 'block', marginBottom: '12px' }}>✓ Sent! Check your inbox.</div>
          )}
          <button className="btn-hero btn-hero-g" style={{ width: '100%' }} onClick={closeExit}>
            Or run a free compliance scan
          </button>
          <span className="exit-dismiss" onClick={closeExit}>
            No thanks, I prefer paying full lawyer rates
          </span>
        </div>
      </div>

      {/* ── NAV ── */}
      <nav>
        <div className="nav-wrap">
          <a href="/" className="nav-logo">BizLegal<em>AI</em></a>
          <div className="nav-menu">
            {['Products', 'Solutions', 'Resources', 'Company'].map(item => (
              <button key={item} className="nav-link">{item}</button>
            ))}
            <a href="/pricing" className="nav-link">Pricing</a>
          </div>
          <div className="nav-right">
            <button className="btn-ghost">Log In</button>
            <a href="https://docstack.bizlegal-ai.com" className="btn-primary">Get Templates</a>
          </div>
        </div>
      </nav>

      <div style={{ position: 'relative', zIndex: 10 }}>

        {/* ── HERO ── */}
        <div className="hero">
          <div className="hero-badge">
            <div className="bdot" />
            Legal First · AI-Powered · Multi-Jurisdiction
          </div>

          <h1 className="hero-h">
            Generate Lawyer-Grade<br />
            Contracts in<br />
            <span className="hs">60 Seconds</span>
          </h1>

          <p className="hero-sub">
            AI legal templates for real estate, Web3 and global deals.
            Download DOCX + PDF instantly. Built on 20 years of legal practice.
          </p>

          <div className="hero-ctas">
            <a href="https://docstack.bizlegal-ai.com" className="btn-hero btn-hero-p">
              Generate Contract — $49
            </a>
            <a href="#preview" className="btn-hero btn-hero-g">
              Preview Template
            </a>
          </div>

          {/* CREDIBILITY ROW */}
          <div className="cred-row">
            <span>✓ Trusted in 11+ jurisdictions</span>
            <span className="cred-sep">|</span>
            <span>✓ 1,200+ contracts generated</span>
            <span className="cred-sep">|</span>
            <span>✓ $2M+ legal fees saved</span>
          </div>

          {/* PRICE ANCHOR */}
          <div className="price-anchor">
            <div className="pa-left">
              <div className="pa-label-bad">Traditional lawyer</div>
              <div className="pa-price-dim">$3–8k</div>
              <div className="pa-sub-dim">2–3 weeks turnaround</div>
            </div>
            <div className="pa-vs"><span>vs</span></div>
            <div className="pa-right">
              <div className="pa-label-good">BizLegal AI</div>
              <div className="pa-price-bright">$49</div>
              <div className="pa-sub-good">60 seconds · instant download</div>
            </div>
          </div>

          {/* PRODUCT TABS */}
          <div className="hero-tabs">
            {TABS.map((tab, i) => (
              <div
                key={tab.label}
                className={`htab ${activeTab === i ? 'active' : ''}`}
                onClick={() => setActiveTab(i)}
              >
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
            <span><strong>500+</strong> lawyers & investors · 11 countries</span>
          </div>

          {/* TRUST BADGES */}
          <div className="trust-badges">
            {['🔒 SSL Secured','⚖️ Lawyer-Drafted','⚡ Instant Download','✅ 7-Day Money-Back','🌍 6 Jurisdictions'].map(b => (
              <div key={b} className="tbadge">{b}</div>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <section className="section">
          <div className="container">
            <div className="stats-strip">
              {[['8','Templates'],['6','Jurisdictions'],['$49','Starting price'],['$2k+','Saved vs lawyer']].map(([val,lbl]) => (
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
                <div className="eyebrow"><div className="eline" /><span className="elabel">Document Studio</span></div>
                <h2 className="sh">Templates that <em>do the work</em> for you</h2>
                <p className="sdesc">Lawyer-drafted, AI-refined. Fill a short form, get signed-ready DOCX + PDF in 60 seconds.</p>
                <div className="feat-steps">
                  {[
                    ['01','Choose Document','8 institutional real estate templates — JV, NDA, LOI, Capital Call and more'],
                    ['02','Fill Deal Details','Party names, amounts, dates — Claude handles the legal language'],
                    ['03','Download Instantly','DOCX + PDF in ~60 seconds. Attorney-quality. Review before signing.'],
                  ].map(([n,h,p]) => (
                    <div key={n} className="fstep">
                      <div className="fn">{n}</div>
                      <div className="fb"><h4>{h}</h4><p>{p}</p></div>
                    </div>
                  ))}
                </div>
                <div className="feat-tags">
                  {['JV Agreement','NDA','LOI','Capital Call'].map(t => (
                    <div key={t} className="ftag"><div className="dot" />{t}</div>
                  ))}
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
                <div className="eyebrow"><div className="eline" /><span className="elabel">Compliance Studio</span></div>
                <h2 className="sh">Is your project <em>compliant?</em></h2>
                <p className="sdesc">BRAI scans your Web3 project against VARA, MiCA, SEC, and MAS in real time.</p>
                <div className="feat-steps">
                  {[
                    ['01','Submit Project','Enter your token model, jurisdiction, and structure'],
                    ['02','AI Scans 4 Regulators','VARA · MiCA · SEC · MAS — simultaneously in seconds'],
                    ['03','Get Compliance Report','Risk flags, required actions, jurisdiction comparison'],
                  ].map(([n,h,p]) => (
                    <div key={n} className="fstep">
                      <div className="fn">{n}</div>
                      <div className="fb"><h4>{h}</h4><p>{p}</p></div>
                    </div>
                  ))}
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
                      📊 Full Report — 12 Risk Flags Identified
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
            <div className="eyebrow"><div className="eline" /><span className="elabel">Products</span></div>
            <h2 className="sh" style={{marginBottom:'36px'}}>All-in-One <em>Legal Platform</em></h2>
            <div className="prod-grid">
              <div className="pcard">
                <span className="ptag pt-sky">LIVE</span>
                <div className="pname">DocStack</div>
                <p className="pdesc">8 lawyer-drafted real estate templates. JV, NDA, LOI, Capital Call. DOCX + PDF, instant download.</p>
                <div className="pfoot">
                  <span className="pprice">From $49</span>
                  <a href="https://docstack.bizlegal-ai.com" className="pcta pc-sky">Browse →</a>
                </div>
              </div>
              <div className="pcard">
                <span className="ptag pt-ind">BETA</span>
                <div className="pname">BRAI</div>
                <p className="pdesc">Blockchain Regulatory Intelligence. Real-time compliance for VARA, MiCA, SEC, MAS projects.</p>
                <div className="pfoot">
                  <span className="pprice">Subscription</span>
                  <a href="https://brai.bizlegal-ai.com" className="pcta pc-ind">Free scan →</a>
                </div>
              </div>
              <div className="pcard">
                <span className="ptag pt-teal">SOON</span>
                <div className="pname">TRACR</div>
                <p className="pdesc">AI forensic investigation. Wallet tracing, fraud analysis, court-ready reports for lawyers.</p>
                <div className="pfoot">
                  <span className="pprice">$99 / report</span>
                  <a href="https://tracr.bizlegal-ai.com" className="pcta pc-teal">Waitlist →</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── BEFORE / AFTER ── */}
        <section className="section">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Why BizLegal AI</span></div>
            <h2 className="sh" style={{marginBottom:'32px'}}>Before vs. <em>After</em></h2>
            <div className="ww-grid">
              <div className="ww-card ww-before">
                <div className="ww-title">Without BizLegal AI</div>
                {['$3,000–$8,000 per contract','2–4 week turnaround','Manual compliance research','Separate tools per jurisdiction','No forensic investigation option'].map(item => (
                  <div key={item} className="ww-item"><span className="ico-no">✕</span>{item}</div>
                ))}
              </div>
              <div className="ww-card ww-after">
                <div className="ww-title">With BizLegal AI</div>
                {['From $49 — instant download','60 seconds to signed-ready draft','Auto VARA / MiCA / SEC / MAS scan','6 jurisdictions in one platform','TRACR forensic reports $99'].map(item => (
                  <div key={item} className="ww-item"><span className="ico-yes">✓</span>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── INDUSTRIES ── */}
        <section className="section">
          <div className="container">
            <div className="eyebrow"><div className="eline" /><span className="elabel">Who It's For</span></div>
            <h2 className="sh" style={{marginBottom:'32px'}}>Built for <em>your industry</em></h2>
            <div className="ind-grid">
              {[
                {icon:'🏗️',name:'Real Estate',desc:'JV agreements, LOIs, capital call documents — US, UAE, EU and more.',link:'https://docstack.bizlegal-ai.com',cta:'View templates →'},
                {icon:'⛓️',name:'Web3 / Crypto',desc:'BRAI compliance for token projects, DeFi, NFT platforms across jurisdictions.',link:'https://brai.bizlegal-ai.com',cta:'Run free scan →'},
                {icon:'🏦',name:'Financial Services',desc:'Cross-border investment documents, fund agreements, compliance reports.',link:'#',cta:'Learn more →'},
                {icon:'⚖️',name:'Law Firms',desc:'TRACR forensic reports for litigation. AI wallet tracing and fraud documentation.',link:'https://tracr.bizlegal-ai.com',cta:'Order report →'},
                {icon:'🌐',name:'Cross-Border',desc:'Israel–Portugal–UAE–EU multi-jurisdiction structuring. Unique expertise.',link:'#',cta:'Learn more →'},
                {icon:'🏢',name:'Enterprise',desc:'Custom compliance bundles, white-label reports, legal workflow automation.',link:'#',cta:'Contact us →'},
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
                {av:'DK',quote:'The JV agreement template saved us weeks of back-and-forth with outside counsel. Downloaded, filled in, signed — done.',hl:'weeks',name:'David K.',role:'Real Estate Investor, Dubai'},
                {av:'SL',quote:'BRAI flagged our MiCA exposure before we launched. Saved us from a costly compliance mistake on the EU rollout.',hl:'MiCA exposure',name:'Sofia L.',role:'Web3 Founder, Lisbon'},
                {av:'AR',quote:'As a lawyer myself, I\'m impressed. The drafting quality matches what I\'d produce — at a fraction of the time.',hl:'a fraction',name:'Avi R.',role:'Corporate Attorney, Tel Aviv'},
              ].map(({av,quote,hl,name,role}) => (
                <div key={name} className="tcard">
                  <p className="tquote">"{quote.replace(hl, `<em>${hl}</em>`)}"</p>
                  <div className="tauthor">
                    <div className="tav">{av}</div>
                    <div><div className="tname">{name}</div><div className="trole">{role}</div></div>
                  </div>
                </div>
              ))}
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

        {/* ── CTA BANNER ── */}
        <section className="section">
          <div className="container">
            <div className="cta-banner">
              <h2>Ready for a <em>Legal First</em> platform?</h2>
              <p>Get your first template today. Lawyer-drafted. AI-refined. Instant download.</p>
              <div className="cta-btns">
                <a href="https://docstack.bizlegal-ai.com" className="btn-hero btn-hero-p">Browse Templates from $49</a>
                <a href="https://brai.bizlegal-ai.com" className="btn-hero btn-hero-g">Run Free Compliance Scan</a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer>
          <div className="container">
            <div className="foot-top">
              <div>
                <div className="flogo">BizLegal<em>AI</em></div>
                <p className="foot-brand-desc">Legal-first platform for global real estate, Web3 compliance, and cross-border investment. Built by a lawyer. Powered by AI.</p>
                <div style={{display:'flex',gap:'10px',flexWrap:'wrap'}}>
                  {[['DocStack','https://docstack.bizlegal-ai.com','var(--sky)'],['BRAI','https://brai.bizlegal-ai.com','var(--indigo)'],['TRACR','https://tracr.bizlegal-ai.com','var(--teal)']].map(([name,href,color]) => (
                    <a key={name} href={href} style={{fontSize:'11px',color}}>{name}</a>
                  ))}
                </div>
              </div>
              <div className="foot-cols">
                {[
                  {title:'Products',links:[['DocStack','https://docstack.bizlegal-ai.com'],['BRAI','https://brai.bizlegal-ai.com'],['TRACR','https://tracr.bizlegal-ai.com'],['Pricing','/pricing']]},
                  {title:'Solutions',links:[['Real Estate','#'],['Web3 / Crypto','#'],['Law Firms','#'],['Cross-Border','#']]},
                  {title:'Resources',links:[['Free Guides','#guides'],['FAQ','/faq'],['Blog','#']]},
                  {title:'Company',links:[['About Us','/about'],['Contact','/contact'],['Partners','#']]},
                  {title:'Legal',links:[['Terms','/terms'],['Privacy','/privacy'],['Disclaimer','/disclaimer']]},
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
              <span className="foot-copy">© 2025 BizLegal AI · Templates only — not legal advice</span>
              <div className="foot-legal">
                <a href="/terms">Terms</a>
                <a href="/privacy">Privacy</a>
                <a href="/disclaimer">Disclaimer</a>
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

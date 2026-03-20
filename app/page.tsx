'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const GUIDES = [
  { region: 'UAE / DIFC', items: [
    { title: 'Joint Venture Agreement for Real Estate in UAE', href: '/guides/uae/joint-venture-agreement-real-estate-uae' },
    { title: 'VARA Token Distribution Agreement UAE', href: '/guides/uae/vara-token-distribution-agreement-uae' },
    { title: 'NDA for Real Estate Investment in UAE', href: '/guides/uae/nda-real-estate-investment-uae' },
    { title: 'VARA Crypto Compliance UAE 2025', href: '/guides/uae/vara-crypto-compliance-2025' },
  ]},
  { region: 'United States', items: [
    { title: 'LLC Operating Agreement for Real Estate', href: '/guides/united-states/operating-agreement-llc-real-estate' },
    { title: 'Capital Call Agreement Real Estate', href: '/guides/united-states/capital-call-agreement-real-estate' },
    { title: 'Joint Venture Agreement Real Estate US', href: '/guides/united-states/joint-venture-agreement-real-estate-us' },
    { title: 'Tenancy in Common (TIC) Legal Guide', href: '/guides/usa/tenancy-in-common-tic-guide' },
  ]},
  { region: 'European Union', items: [
    { title: 'MiCA Token Sale Agreement Template', href: '/guides/european-union/mica-token-sale-agreement-template' },
  ]},
  { region: 'United Kingdom', items: [
    { title: 'Commercial Real Estate LOI Template UK', href: '/guides/united-kingdom/loi-commercial-real-estate-uk' },
  ]},
  { region: 'Singapore / MAS', items: [
    { title: 'Capital Call Agreement Singapore', href: '/guides/singapore/capital-call-agreement-singapore' },
  ]},
  { region: 'Canada', items: [
    { title: 'Joint Venture Agreement Real Estate Canada', href: '/guides/canada/joint-venture-agreement-real-estate-canada' },
  ]},
  { region: 'Portugal', items: [
    { title: 'Golden Visa Property Investment Guide', href: '/guides/portugal/golden-visa-property-investment' },
  ]},
  { region: 'Global / Web3', items: [
    { title: 'Real Estate DAO Governance Legal Guide', href: '/guides/crypto/real-estate-dao-governance-legal-guide' },
    { title: 'Family Office Real Estate Governance', href: '/guides/global/family-office-real-estate-governance' },
  ]},
]

const FEATURE_CHIPS = [
  { icon: '📄', label: 'Review', desc: 'Redline & analyse' },
  { icon: '✍️', label: 'Draft', desc: 'Generate contracts' },
  { icon: '🔍', label: 'Comply', desc: 'Multi-jurisdiction' },
  { icon: '🔗', label: 'Trace', desc: 'Blockchain forensics' },
  { icon: '⚖️', label: 'Advise', desc: 'AI legal intel' },
]

function WebGLBackground() {
  const ref = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const s = document.createElement('script')
    s.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js'
    s.onload = () => {
      const T = (window as any).THREE
      const r = new T.WebGLRenderer({ canvas: ref.current, antialias: false })
      r.setPixelRatio(Math.min(devicePixelRatio, 2))
      r.setClearColor(new T.Color(0x050508))
      const scene = new T.Scene(), cam = new T.OrthographicCamera(-1,1,1,-1,0,-1)
      const u = { resolution: { value: [innerWidth,innerHeight] }, time: { value: 0 } }
      const geo = new T.BufferGeometry()
      geo.setAttribute('position', new T.BufferAttribute(new Float32Array([-1,-1,0,1,-1,0,-1,1,0,1,-1,0,-1,1,0,1,1,0]),3))
      scene.add(new T.Mesh(geo, new T.RawShaderMaterial({
        vertexShader: `attribute vec3 position;void main(){gl_Position=vec4(position,1.0);}`,
        fragmentShader: `precision highp float;uniform vec2 resolution;uniform float time;
        void main(){
          vec2 p=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
          float d1=0.06/abs(p.y+sin((p.x+time*0.45)*1.0)*0.28);vec3 sky=vec3(0.22,0.68,1.0)*d1;
          float d2=0.04/abs(p.y+sin((p.x*0.7+time*0.72+1.4)*1.2)*0.20);vec3 teal=vec3(0.08,0.82,0.72)*d2;
          float d3=0.025/abs(p.y+sin((p.x*1.1-time*0.32+2.8)*0.8)*0.16);vec3 ind=vec3(0.52,0.60,1.0)*d3;
          vec3 col=sky+teal+ind;col*=1.0-smoothstep(0.5,1.6,length(p));col*=1.1;
          gl_FragColor=vec4(col,1.0);}`,
        uniforms: u, side: T.DoubleSide,
      })))
      const resize = () => { r.setSize(innerWidth,innerHeight,false); u.resolution.value=[innerWidth,innerHeight] }
      resize(); window.addEventListener('resize',resize)
      let id: number
      const loop = () => { u.time.value+=0.006; r.render(scene,cam); id=requestAnimationFrame(loop) }
      loop()
      return () => { cancelAnimationFrame(id); window.removeEventListener('resize',resize); r.dispose() }
    }
    document.head.appendChild(s)
  }, [])
  return <canvas ref={ref} style={{position:'fixed',inset:0,zIndex:0,opacity:0.65,pointerEvents:'none'}}/>
}

function ProductMockup() {
  return (
    <div style={{position:'relative',width:'100%',maxWidth:960,margin:'52px auto 0',zIndex:10}}>
      {/* Ambient glow */}
      <div style={{position:'absolute',inset:'-60px',background:'radial-gradient(ellipse 65% 55% at 50% 50%,rgba(56,189,248,0.10) 0%,rgba(94,234,212,0.05) 45%,transparent 70%)',filter:'blur(24px)',zIndex:0,pointerEvents:'none'}}/>

      {/* Browser window */}
      <div style={{
        position:'relative',zIndex:1,
        border:'1px solid rgba(125,211,252,0.18)',
        borderRadius:16,overflow:'hidden',
        background:'rgba(5,6,12,0.96)',
        backdropFilter:'blur(20px)',
        boxShadow:'0 0 0 1px rgba(255,255,255,0.03),0 50px 140px rgba(0,0,0,0.85),0 0 80px rgba(56,189,248,0.07)',
        transform:'perspective(1200px) rotateX(2.5deg)',
        transformOrigin:'top center',
      }}>
        {/* Titlebar */}
        <div style={{height:44,background:'rgba(3,4,10,0.95)',borderBottom:'1px solid rgba(125,211,252,0.07)',display:'flex',alignItems:'center',padding:'0 18px',gap:14}}>
          <div style={{display:'flex',gap:6,flexShrink:0}}>
            <div style={{width:11,height:11,borderRadius:'50%',background:'#ff5f57'}}/>
            <div style={{width:11,height:11,borderRadius:'50%',background:'#ffbd2e'}}/>
            <div style={{width:11,height:11,borderRadius:'50%',background:'#28c840'}}/>
          </div>
          <div style={{flex:1,height:26,background:'rgba(255,255,255,0.03)',borderRadius:6,border:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',padding:'0 12px',fontSize:10,color:'rgba(255,255,255,0.25)',fontFamily:'Geist Mono,monospace',letterSpacing:'0.03em'}}>
            docstack.bizlegal-ai.com/generate
          </div>
          <div style={{display:'flex',alignItems:'center',gap:5,fontSize:9,color:'#5eead4',fontFamily:'Geist Mono,monospace',letterSpacing:'0.12em',flexShrink:0}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#5eead4',boxShadow:'0 0 6px #5eead4',animation:'pulse 2s infinite'}}/>
            AI ACTIVE
          </div>
        </div>

        {/* Two-panel body */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 280px',minHeight:340}}>

          {/* LEFT: Document panel */}
          <div style={{borderRight:'1px solid rgba(125,211,252,0.06)',padding:'22px 28px',overflow:'hidden'}}>
            {/* Tabs */}
            <div style={{display:'flex',gap:6,marginBottom:20}}>
              {['JV Agreement.docx','NDA_UAE.docx','Capital Call.docx'].map((tab,i)=>(
                <div key={tab} style={{padding:'4px 12px',borderRadius:6,fontSize:10,fontFamily:'Geist Mono,monospace',cursor:'pointer',
                  background:i===0?'rgba(125,211,252,0.08)':'transparent',
                  border:i===0?'1px solid rgba(125,211,252,0.22)':'1px solid rgba(255,255,255,0.04)',
                  color:i===0?'#7dd3fc':'rgba(255,255,255,0.22)',
                }}>
                  {tab}
                </div>
              ))}
            </div>

            {/* Doc content */}
            <div style={{fontFamily:'IBM Plex Serif,serif',fontSize:11}}>
              <div style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.82)',marginBottom:14,textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:12}}>
                JOINT VENTURE AGREEMENT
                <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',fontFamily:'Geist Mono,monospace',marginTop:4,letterSpacing:'0.08em'}}>UAE / DIFC · Effective 1 Jan 2025</div>
              </div>

              <div style={{marginBottom:14}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',color:'#7dd3fc',marginBottom:5}}>1. CONFIDENTIALITY, PROPRIETARY RIGHTS</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.32)',lineHeight:1.75}}>
                  Each party ("Receiving Party") understands that the other party has disclosed or may disclose business, technical or financial information relating to the Disclosing Party's business (hereinafter referred to as "Proprietary Information")...
                </div>
              </div>

              <div style={{marginBottom:14}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',color:'#f59e0b',marginBottom:5,display:'inline-flex',alignItems:'center',gap:6}}>
                  2. RESTRICTIONS AND RESPONSIBILITIES
                  <span style={{fontSize:8,padding:'1px 6px',borderRadius:3,background:'rgba(245,158,11,0.12)',border:'1px solid rgba(245,158,11,0.3)',color:'#f59e0b'}}>AI FLAG</span>
                </div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.52)',lineHeight:1.75,borderLeft:'2px solid rgba(245,158,11,0.28)',paddingLeft:10,background:'rgba(245,158,11,0.03)',borderRadius:'0 4px 4px 0',padding:'8px 10px 8px 12px'}}>
                  Customer will not, directly or indirectly: reverse engineer, decompile, disassemble or otherwise attempt to discover source code, object code or underlying structure of the Services...
                </div>
              </div>

              <div>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',color:'#5eead4',marginBottom:5}}>3. VARA COMPLIANCE — UAE 2025</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.32)',lineHeight:1.75}}>
                  In accordance with VARA regulatory framework, all token distributions shall be subject to prior approval. Company maintains full MAS and DIFC regulatory compliance...
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: AI suggestions panel */}
          <div style={{padding:'18px 16px',background:'rgba(3,4,10,0.45)'}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.25)',marginBottom:14,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span>AI Analysis</span>
              <span style={{padding:'2px 8px',borderRadius:100,background:'rgba(125,211,252,0.1)',border:'1px solid rgba(125,211,252,0.2)',color:'#7dd3fc',fontSize:9}}>26</span>
            </div>

            {[
              {icon:'⚠️', color:'#f59e0b', title:'VARA Gap', desc:'Clause 2.1 missing MAS notification requirement', active:true},
              {icon:'🔍', color:'#a5b4fc', title:'Ambiguous Term', desc:'Define "material breach" in §4.3'},
              {icon:'✅', color:'#5eead4', title:'NDA Valid', desc:'Meets DIFC Law No. 5 of 2018'},
              {icon:'⚖️', color:'#7dd3fc', title:'IP Assignment', desc:'Review clause 5.2 for clarity'},
            ].map((item,i)=>(
              <div key={i} style={{
                display:'flex',gap:10,padding:'10px',borderRadius:8,marginBottom:6,cursor:'pointer',
                background:item.active?'rgba(245,158,11,0.05)':'rgba(255,255,255,0.015)',
                border:item.active?'1px solid rgba(245,158,11,0.20)':'1px solid rgba(255,255,255,0.04)',
                transition:'all 0.2s',
              }}>
                <span style={{fontSize:14,flexShrink:0}}>{item.icon}</span>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:item.color,marginBottom:2,letterSpacing:'0.04em'}}>{item.title}</div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,0.3)',lineHeight:1.5}}>{item.desc}</div>
                </div>
              </div>
            ))}

            <div style={{marginTop:14,padding:'11px 14px',borderRadius:8,background:'linear-gradient(135deg,rgba(125,211,252,0.08),rgba(94,234,212,0.04))',border:'1px solid rgba(125,211,252,0.18)',textAlign:'center',cursor:'pointer'}}>
              <div style={{fontSize:10,fontWeight:700,color:'#7dd3fc',letterSpacing:'0.1em'}}>GENERATE FINAL DOCX</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,0.28)',marginTop:3}}>Ready · 3 issues to resolve</div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom reflection glow */}
      <div style={{position:'absolute',bottom:-24,left:'15%',right:'15%',height:50,background:'rgba(56,189,248,0.06)',filter:'blur(18px)',borderRadius:'50%',zIndex:0,pointerEvents:'none'}}/>
    </div>
  )
}

export default function Home() {
  const [sticky, setSticky] = useState(false)
  const [exit, setExit] = useState(false)
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const exitShown = useRef(false)

  useEffect(() => {
    window.addEventListener('scroll', () => { if(window.scrollY > 400) setSticky(true) })
    document.addEventListener('mouseleave', e => {
      if(e.clientY < 10 && !exitShown.current && !sessionStorage.getItem('ex')) {
        exitShown.current = true; setTimeout(() => setExit(true), 400)
      }
    })
  }, [])

  const closeExit = () => { setExit(false); sessionStorage.setItem('ex','1') }

  return (
    <>
      <WebGLBackground/>

      {/* Veil overlay */}
      <div style={{position:'fixed',inset:0,zIndex:1,pointerEvents:'none',background:'radial-gradient(ellipse 100% 60% at 50% -10%,rgba(5,6,12,0) 0%,rgba(5,6,12,0.55) 75%),linear-gradient(to bottom,rgba(5,6,12,0) 0%,rgba(5,6,12,0.70) 100%)'}}/>

      {/* STICKY BAR */}
      {sticky && (
        <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:300,background:'rgba(3,4,10,0.96)',backdropFilter:'blur(24px)',borderTop:'1px solid rgba(125,211,252,0.12)',padding:'12px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16,transform:'translateY(0)',transition:'transform 0.4s cubic-bezier(0.16,1,0.3,1)'}}>
          <span style={{fontSize:13,color:'#cce0ff'}}>Legal Intelligence Platform — <strong style={{color:'#7dd3fc'}}>Contracts, Compliance & Forensics</strong> from $49</span>
          <div style={{display:'flex',gap:10}}>
            <a href="https://docstack.bizlegal-ai.com" style={{padding:'8px 18px',borderRadius:7,background:'rgba(125,211,252,0.1)',border:'1px solid rgba(125,211,252,0.4)',color:'#7dd3fc',fontFamily:'Geist Mono,monospace',fontSize:11,fontWeight:700,textDecoration:'none',letterSpacing:'0.06em'}}>Get Templates</a>
            <button onClick={()=>setSticky(false)} style={{background:'none',border:'none',color:'#3a5570',cursor:'pointer',fontSize:20,lineHeight:1}}>×</button>
          </div>
        </div>
      )}

      {/* EXIT POPUP */}
      {exit && (
        <div onClick={e=>{if(e.target===e.currentTarget)closeExit()}} style={{position:'fixed',inset:0,zIndex:500,background:'rgba(3,4,10,0.90)',backdropFilter:'blur(14px)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'rgba(6,7,16,0.99)',border:'1px solid rgba(125,211,252,0.18)',borderRadius:20,padding:52,maxWidth:480,width:'90%',textAlign:'center',position:'relative',boxShadow:'0 0 100px rgba(125,211,252,0.10)'}}>
            <button onClick={closeExit} style={{position:'absolute',top:16,right:20,background:'none',border:'none',color:'#3a5570',cursor:'pointer',fontSize:22}}>×</button>
            <div style={{display:'inline-block',fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color:'#5eead4',border:'1px solid rgba(94,234,212,0.22)',background:'rgba(94,234,212,0.05)',padding:'4px 14px',borderRadius:100,marginBottom:20}}>Before you go</div>
            <h3 style={{fontFamily:'Gloock,serif',fontSize:32,color:'#fff',marginBottom:12,lineHeight:1.15}}>Get the JV Agreement <em style={{color:'#7dd3fc',fontStyle:'italic'}}>checklist free</em></h3>
            <p style={{fontSize:14,color:'#8aaac8',lineHeight:1.75,marginBottom:22}}>The framework behind $10M+ deals in UAE, US, and EU. Enter your email and we'll send it instantly.</p>
            {!sent ? (
              <div style={{display:'flex',gap:8,marginBottom:12}}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{flex:1,padding:'12px 14px',borderRadius:8,border:'1px solid rgba(125,211,252,0.12)',background:'rgba(3,4,10,0.8)',color:'#fff',fontSize:13,fontFamily:'Geist Mono,monospace',outline:'none'}}/>
                <button onClick={()=>{if(email.includes('@')){setSent(true);setTimeout(closeExit,2500)}}} style={{padding:'12px 20px',borderRadius:8,background:'rgba(125,211,252,0.1)',border:'1px solid rgba(125,211,252,0.45)',color:'#7dd3fc',fontFamily:'Geist Mono,monospace',fontSize:13,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>Get Free →</button>
              </div>
            ) : (
              <div style={{padding:10,background:'rgba(94,234,212,0.06)',border:'1px solid rgba(94,234,212,0.18)',borderRadius:8,fontSize:12,color:'#5eead4',marginBottom:12}}>Sent! Check your inbox.</div>
            )}
            <span onClick={closeExit} style={{fontSize:11,color:'#3a5570',cursor:'pointer',display:'block',marginTop:12}}>No thanks, I prefer paying full lawyer rates</span>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:200,background:'rgba(3,4,10,0.72)',backdropFilter:'blur(28px)',borderBottom:'1px solid rgba(125,211,252,0.07)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 32px',height:66,display:'flex',alignItems:'center',gap:32}}>
          <Link href="/" style={{fontFamily:'Gloock,serif',fontSize:19,color:'#fff',textDecoration:'none',flexShrink:0,letterSpacing:'-0.01em'}}>
            BizLegal<em style={{color:'#38bdf8',fontStyle:'italic'}}>AI</em>
          </Link>
          <div style={{display:'flex',gap:2,flex:1}}>
            {['Guides','DocStack','BRAI','TRACR','Pricing'].map(item => (
              <a key={item}
                href={item==='DocStack'?'https://docstack.bizlegal-ai.com':item==='BRAI'?'https://brai.bizlegal-ai.com':item==='TRACR'?'https://tracr.bizlegal-ai.com':'#'}
                style={{padding:'7px 13px',borderRadius:6,fontSize:12,color:'rgba(255,255,255,0.45)',textDecoration:'none',fontFamily:'Geist Mono,monospace',letterSpacing:'0.04em',transition:'color 0.2s'}}>
                {item}
              </a>
            ))}
          </div>
          <a href="https://docstack.bizlegal-ai.com" style={{padding:'8px 20px',borderRadius:7,background:'rgba(56,189,248,0.09)',border:'1px solid rgba(56,189,248,0.35)',color:'#38bdf8',fontFamily:'Geist Mono,monospace',fontSize:11,fontWeight:700,textDecoration:'none',letterSpacing:'0.07em',transition:'all 0.2s'}}>
            Get Templates
          </a>
        </div>
      </nav>

      <div style={{position:'relative',zIndex:10}}>

        {/* ── HERO ── */}
        <div style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',textAlign:'center',padding:'80px 32px 0',paddingBottom:0}}>

          {/* Badge */}
          <div style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 18px',borderRadius:100,border:'1px solid rgba(56,189,248,0.20)',background:'rgba(56,189,248,0.04)',fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:'#38bdf8',marginBottom:28,backdropFilter:'blur(8px)'}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#5eead4',boxShadow:'0 0 8px #5eead4'}}/>
            Legal First · AI-Powered · Multi-Jurisdiction
          </div>

          {/* Headline */}
          <h1 style={{fontFamily:'Gloock,serif',fontSize:'clamp(48px,8.5vw,108px)',lineHeight:1.0,letterSpacing:'-0.025em',marginBottom:20,color:'#ffffff',maxWidth:900}}>
            The dark ages of<br/>
            contract drudgery are{' '}
            <em style={{color:'#38bdf8',fontStyle:'italic',textShadow:'0 0 80px rgba(56,189,248,0.45)'}}>behind us</em>
          </h1>

          {/* Subtitle */}
          <p style={{maxWidth:560,fontSize:17,color:'rgba(255,255,255,0.48)',lineHeight:1.75,marginBottom:32,fontFamily:'Geist Mono,monospace',letterSpacing:'-0.01em'}}>
            BizLegal AI streamlines the drafting, redlining, and review of contracts — built by a lawyer, powered by AI.
          </p>

          {/* CTA row */}
          <div style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',marginBottom:20}}>
            <a href="https://docstack.bizlegal-ai.com" style={{padding:'14px 32px',borderRadius:8,fontSize:13,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace',background:'rgba(56,189,248,0.10)',border:'1px solid rgba(56,189,248,0.45)',color:'#38bdf8',textDecoration:'none',boxShadow:'0 0 40px rgba(56,189,248,0.08)'}}>
              Generate Contract — $49
            </a>
            <a href="#preview" style={{padding:'14px 32px',borderRadius:8,fontSize:13,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace',background:'transparent',border:'1px solid rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.40)',textDecoration:'none'}}>
              Preview Template
            </a>
          </div>

          {/* Price anchor small */}
          <div style={{display:'flex',alignItems:'center',gap:14,marginBottom:16,fontSize:12,color:'rgba(255,255,255,0.28)',fontFamily:'Geist Mono,monospace'}}>
            <span style={{textDecoration:'line-through',color:'rgba(248,113,113,0.5)'}}>$3–8k traditional lawyer</span>
            <span style={{color:'rgba(255,255,255,0.15)'}}>vs</span>
            <span style={{color:'#5eead4',fontWeight:700}}>$49 · 60 seconds</span>
          </div>

          {/* PRODUCT MOCKUP */}
          <ProductMockup/>

          {/* Feature chips */}
          <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center',gap:10,marginTop:56,marginBottom:80,padding:'0 20px'}}>
            {FEATURE_CHIPS.map(chip=>(
              <div key={chip.label} style={{display:'flex',flexDirection:'column',alignItems:'center',gap:6,padding:'16px 22px',borderRadius:12,border:'1px solid rgba(125,211,252,0.08)',background:'rgba(5,6,12,0.6)',backdropFilter:'blur(12px)',minWidth:88,cursor:'pointer',transition:'all 0.2s'}}>
                <span style={{fontSize:22}}>{chip.icon}</span>
                <span style={{fontSize:12,fontWeight:700,color:'rgba(255,255,255,0.72)',fontFamily:'Geist Mono,monospace',letterSpacing:'0.04em'}}>{chip.label}</span>
                <span style={{fontSize:10,color:'rgba(255,255,255,0.28)',fontFamily:'Geist Mono,monospace'}}>{chip.desc}</span>
              </div>
            ))}
          </div>
        </div>

        {/* ── STATS ── */}
        <section style={{padding:'80px 0',borderTop:'1px solid rgba(125,211,252,0.05)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,background:'rgba(125,211,252,0.06)',border:'1px solid rgba(125,211,252,0.08)',borderRadius:16,overflow:'hidden'}}>
              {[['8','Templates'],['6','Jurisdictions'],['$49','Starting price'],['$2k+','Saved vs lawyer']].map(([v,l])=>(
                <div key={l} style={{background:'rgba(5,6,12,0.80)',padding:30,textAlign:'center'}}>
                  <div style={{fontFamily:'Gloock,serif',fontSize:46,color:'#fff',lineHeight:1,marginBottom:7,textShadow:'0 0 40px rgba(56,189,248,0.18)'}}>{v}</div>
                  <div style={{fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section style={{padding:'80px 0',borderTop:'1px solid rgba(125,211,252,0.05)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:28,height:1,background:'rgba(125,211,252,0.3)'}}/>
              <span style={{fontSize:11,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace'}}>Legal Intelligence Stack</span>
            </div>
            <h2 style={{fontFamily:'Gloock,serif',fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:44,letterSpacing:'-0.02em'}}>
              Three tools, one <em style={{color:'#38bdf8',fontStyle:'italic'}}>platform</em>
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
              {[
                {tag:'LIVE',color:'#38bdf8',name:'DocStack',desc:'8 lawyer-drafted real estate templates. JV, NDA, LOI, Capital Call. DOCX + PDF instant download.',price:'From $49',cta:'Browse →',href:'https://docstack.bizlegal-ai.com'},
                {tag:'BETA',color:'#a5b4fc',name:'BRAI',desc:'Blockchain Regulatory Intelligence. Real-time compliance scanning for VARA, MiCA, SEC, MAS.',price:'Subscription',cta:'Free scan →',href:'https://brai.bizlegal-ai.com'},
                {tag:'SOON',color:'#5eead4',name:'TRACR',desc:'AI forensic investigation. Wallet tracing, fraud analysis, court-ready reports for lawyers.',price:'$99 / report',cta:'Waitlist →',href:'https://tracr.bizlegal-ai.com'},
              ].map(p=>(
                <div key={p.name} style={{borderRadius:16,padding:32,border:'1px solid rgba(125,211,252,0.08)',background:'rgba(6,7,16,0.75)',backdropFilter:'blur(20px)',position:'relative',overflow:'hidden',transition:'all 0.3s'}}>
                  <div style={{position:'absolute',top:0,left:'20%',right:'20%',height:1,background:`linear-gradient(90deg,transparent,${p.color}22,transparent)`}}/>
                  <span style={{fontSize:9,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',padding:'3px 10px',borderRadius:100,border:`1px solid ${p.color}44`,background:`${p.color}0e`,color:p.color,display:'inline-block',marginBottom:18}}>{p.tag}</span>
                  <div style={{fontFamily:'Gloock,serif',fontSize:32,color:'#fff',marginBottom:12,letterSpacing:'-0.02em'}}>{p.name}</div>
                  <p style={{fontSize:13,color:'rgba(255,255,255,0.42)',lineHeight:1.8,marginBottom:24}}>{p.desc}</p>
                  <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontSize:11,color:'rgba(255,255,255,0.22)',fontFamily:'Geist Mono,monospace'}}>{p.price}</span>
                    <a href={p.href} style={{fontSize:12,fontWeight:700,color:p.color,textDecoration:'none',fontFamily:'Geist Mono,monospace',letterSpacing:'0.04em'}}>{p.cta}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{padding:'80px 0',borderTop:'1px solid rgba(125,211,252,0.05)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:28,height:1,background:'rgba(125,211,252,0.3)'}}/>
              <span style={{fontSize:11,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace'}}>How it works</span>
            </div>
            <h2 style={{fontFamily:'Gloock,serif',fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:48,letterSpacing:'-0.02em'}}>
              Lawyer-grade documents in <em style={{color:'#38bdf8',fontStyle:'italic'}}>3 steps</em>
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
              {[
                {n:'01',title:'Select your template',desc:'Choose from 8 jurisdictions: UAE/DIFC, US, EU, UK, Singapore, Canada, Portugal, Web3/DAO.'},
                {n:'02',title:'AI customises it',desc:'Our AI, trained on 20 years of legal practice, fills clauses, flags risks, and adapts to your deal.'},
                {n:'03',title:'Download in seconds',desc:'Receive a DOCX + PDF instantly. Court-ready, lawyer-drafted, compliance-checked.'},
              ].map(s=>(
                <div key={s.n} style={{borderRadius:14,padding:'28px 28px 28px 28px',border:'1px solid rgba(125,211,252,0.07)',background:'rgba(5,6,12,0.65)',position:'relative',overflow:'hidden'}}>
                  <div style={{fontFamily:'Gloock,serif',fontSize:52,color:'rgba(56,189,248,0.06)',lineHeight:1,marginBottom:16,letterSpacing:'-0.04em',userSelect:'none'}}>{s.n}</div>
                  <div style={{fontSize:16,fontWeight:700,color:'rgba(255,255,255,0.85)',marginBottom:10,fontFamily:'Gloock,serif'}}>{s.title}</div>
                  <p style={{fontSize:13,color:'rgba(255,255,255,0.38)',lineHeight:1.75}}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICE COMPARE ── */}
        <section style={{padding:'80px 0',borderTop:'1px solid rgba(125,211,252,0.05)'}}>
          <div style={{maxWidth:900,margin:'0 auto',padding:'0 40px'}}>
            <div style={{textAlign:'center',marginBottom:48}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:14}}>
                <div style={{width:28,height:1,background:'rgba(125,211,252,0.3)'}}/>
                <span style={{fontSize:11,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace'}}>Compare</span>
                <div style={{width:28,height:1,background:'rgba(125,211,252,0.3)'}}/>
              </div>
              <h2 style={{fontFamily:'Gloock,serif',fontSize:'clamp(30px,4vw,50px)',color:'#fff',letterSpacing:'-0.02em'}}>
                Stop paying <em style={{color:'#f87171',fontStyle:'italic'}}>lawyer rates</em>
              </h2>
            </div>

            <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',border:'1px solid rgba(125,211,252,0.10)',borderRadius:16,overflow:'hidden',background:'rgba(6,7,16,0.7)'}}>
              <div style={{padding:'32px 32px',background:'rgba(248,113,113,0.03)',borderRight:'1px solid rgba(125,211,252,0.06)'}}>
                <div style={{fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',color:'#f87171',marginBottom:10,fontFamily:'Geist Mono,monospace'}}>Traditional lawyer</div>
                <div style={{fontFamily:'Gloock,serif',fontSize:42,color:'rgba(255,255,255,0.28)',lineHeight:1,marginBottom:6}}>$3–8k</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.30)',fontFamily:'Geist Mono,monospace'}}>2–3 weeks turnaround</div>
                <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:8}}>
                  {['Slow drafting cycles','Opaque billing','Limited jurisdictions','No instant edits'].map(x=>(
                    <div key={x} style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'rgba(255,255,255,0.28)'}}>
                      <span style={{color:'#f87171',fontSize:12}}>×</span>{x}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{padding:'32px 24px',background:'rgba(5,6,12,0.8)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{fontSize:14,color:'rgba(255,255,255,0.10)',fontFamily:'Geist Mono,monospace',letterSpacing:'0.08em'}}>vs</span>
              </div>
              <div style={{padding:'32px 32px',background:'rgba(56,189,248,0.02)',borderLeft:'1px solid rgba(56,189,248,0.10)'}}>
                <div style={{fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',color:'#5eead4',marginBottom:10,fontFamily:'Geist Mono,monospace'}}>BizLegal AI</div>
                <div style={{fontFamily:'Gloock,serif',fontSize:42,color:'#fff',lineHeight:1,marginBottom:6}}>$49</div>
                <div style={{fontSize:11,color:'#5eead4',fontFamily:'Geist Mono,monospace'}}>60 seconds · instant download</div>
                <div style={{marginTop:20,display:'flex',flexDirection:'column',gap:8}}>
                  {['Instant generation','Transparent flat fee','6 jurisdictions covered','Edit & re-download anytime'].map(x=>(
                    <div key={x} style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'rgba(255,255,255,0.65)'}}>
                      <span style={{color:'#5eead4',fontSize:12}}>✓</span>{x}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEO GUIDES ── */}
        <section id="guides" style={{padding:'80px 0',borderTop:'1px solid rgba(125,211,252,0.05)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:28,height:1,background:'rgba(125,211,252,0.3)'}}/>
              <span style={{fontSize:11,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.35)',fontFamily:'Geist Mono,monospace'}}>Free Legal Intelligence</span>
            </div>
            <h2 style={{fontFamily:'Gloock,serif',fontSize:'clamp(30px,4vw,50px)',color:'#fff',marginBottom:44,letterSpacing:'-0.02em'}}>
              Expert guides across <em style={{color:'#38bdf8',fontStyle:'italic'}}>all jurisdictions</em>
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:52}}>
              {[GUIDES.slice(0,4), GUIDES.slice(4)].map((col,ci)=>(
                <div key={ci}>
                  {col.map(group=>(
                    <div key={group.region} style={{marginBottom:30}}>
                      <div style={{fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(94,234,212,0.60)',marginBottom:10,fontFamily:'Geist Mono,monospace'}}>{group.region}</div>
                      {group.items.map(item=>(
                        <Link key={item.href} href={item.href} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 12px',borderRadius:8,border:'1px solid transparent',textDecoration:'none',marginBottom:4,color:'rgba(255,255,255,0.42)',transition:'all 0.15s'}}>
                          <span style={{fontSize:13,fontFamily:'Geist Mono,monospace'}}>{item.title}</span>
                          <span style={{color:'rgba(255,255,255,0.18)',flexShrink:0,marginLeft:12}}>→</span>
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
        <section style={{padding:'80px 0',borderTop:'1px solid rgba(125,211,252,0.05)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{borderRadius:20,padding:'68px 56px',background:'rgba(6,7,16,0.80)',border:'1px solid rgba(125,211,252,0.12)',textAlign:'center',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:-100,left:'50%',transform:'translateX(-50%)',width:700,height:320,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(56,189,248,0.06) 0%,transparent 65%)',pointerEvents:'none'}}/>
              <div style={{display:'inline-block',fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color:'#5eead4',border:'1px solid rgba(94,234,212,0.20)',background:'rgba(94,234,212,0.05)',padding:'4px 14px',borderRadius:100,marginBottom:20,position:'relative'}}>Start today</div>
              <h2 style={{fontFamily:'Gloock,serif',fontSize:'clamp(28px,3.5vw,48px)',color:'#fff',marginBottom:14,letterSpacing:'-0.02em',position:'relative'}}>
                Generate your first contract <em style={{color:'#38bdf8',fontStyle:'italic'}}>in 60 seconds</em>
              </h2>
              <p style={{fontSize:15,color:'rgba(255,255,255,0.38)',marginBottom:34,position:'relative',fontFamily:'Geist Mono,monospace'}}>Trusted by founders, investors, and legal teams across 6 jurisdictions.</p>
              <div style={{display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap',position:'relative'}}>
                <a href="https://docstack.bizlegal-ai.com" style={{padding:'15px 36px',borderRadius:8,fontSize:13,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace',background:'rgba(56,189,248,0.10)',border:'1px solid rgba(56,189,248,0.45)',color:'#38bdf8',textDecoration:'none'}}>
                  Browse Templates →
                </a>
                <a href="https://brai.bizlegal-ai.com" style={{padding:'15px 36px',borderRadius:8,fontSize:13,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace',background:'transparent',border:'1px solid rgba(255,255,255,0.08)',color:'rgba(255,255,255,0.40)',textDecoration:'none'}}>
                  Free Compliance Scan
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{background:'rgba(3,4,10,0.94)',borderTop:'1px solid rgba(125,211,252,0.06)',padding:'60px 0 28px'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:40,marginBottom:52}}>
              <div style={{maxWidth:240}}>
                <div style={{fontFamily:'Gloock,serif',fontSize:19,color:'#fff',marginBottom:12,letterSpacing:'-0.01em'}}>BizLegal<em style={{color:'#38bdf8',fontStyle:'italic'}}>AI</em></div>
                <p style={{fontSize:12,color:'rgba(255,255,255,0.32)',lineHeight:1.75,fontFamily:'Geist Mono,monospace'}}>Legal intelligence platform for global real estate, Web3 compliance, and cross-border investment.</p>
              </div>
              <div style={{display:'flex',gap:48,flexWrap:'wrap'}}>
                {[
                  {title:'Products',links:[['DocStack','https://docstack.bizlegal-ai.com'],['BRAI','https://brai.bizlegal-ai.com'],['TRACR','https://tracr.bizlegal-ai.com']]},
                  {title:'Jurisdictions',links:[['UAE / DIFC','/guides/uae/joint-venture-agreement-real-estate-uae'],['United States','/guides/united-states/operating-agreement-llc-real-estate'],['European Union','/guides/european-union/mica-token-sale-agreement-template'],['Singapore','/guides/singapore/capital-call-agreement-singapore']]},
                  {title:'Legal',links:[['Terms','/terms'],['Privacy','/privacy'],['Disclaimer','/disclaimer']]},
                ].map(col=>(
                  <div key={col.title}>
                    <div style={{fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color:'#38bdf8',marginBottom:14,fontWeight:700,fontFamily:'Geist Mono,monospace'}}>{col.title}</div>
                    {col.links.map(([label,href])=>(
                      <a key={label} href={href} style={{display:'block',fontSize:12,color:'rgba(255,255,255,0.30)',padding:'3px 0',textDecoration:'none',fontFamily:'Geist Mono,monospace',transition:'color 0.2s'}}>{label}</a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div style={{borderTop:'1px solid rgba(125,211,252,0.05)',paddingTop:22,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
              <span style={{fontSize:10,color:'rgba(255,255,255,0.18)',fontFamily:'Geist Mono,monospace',letterSpacing:'0.06em'}}>© 2025 BizLegal AI · Templates only — not legal advice</span>
              <div style={{display:'flex',gap:18}}>
                {['Terms','Privacy','Disclaimer'].map(l=>(
                  <a key={l} href={`/${l.toLowerCase()}`} style={{fontSize:10,color:'rgba(255,255,255,0.18)',textDecoration:'none',fontFamily:'Geist Mono,monospace'}}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

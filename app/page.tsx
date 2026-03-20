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

const MOCKUP_CHIPS = [
  { icon: '📄', label: 'Review', desc: 'Redline contracts and catch risks', color: '#ef4444' },
  { icon: '✍️', label: 'Draft', desc: 'Draft from scratch or past precedents', color: '#3b82f6' },
  { icon: '🔍', label: 'Ask', desc: 'Accurate answers with citations', color: '#8b5cf6' },
  { icon: '📊', label: 'Benchmarks', desc: 'Compare contracts to standards', color: '#f59e0b' },
  { icon: '🤖', label: 'Associate', desc: 'Multi-step document workflows', color: '#6366f1', isNew: true },
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
      r.setClearColor(new T.Color(0x03040a))
      const scene = new T.Scene(), cam = new T.OrthographicCamera(-1,1,1,-1,0,-1)
      const u = { resolution: { value: [innerWidth,innerHeight] }, time: { value: 0 } }
      const geo = new T.BufferGeometry()
      geo.setAttribute('position', new T.BufferAttribute(new Float32Array([-1,-1,0,1,-1,0,-1,1,0,1,-1,0,-1,1,0,1,1,0]),3))
      scene.add(new T.Mesh(geo, new T.RawShaderMaterial({
        vertexShader: `attribute vec3 position;void main(){gl_Position=vec4(position,1.0);}`,
        fragmentShader: `precision highp float;uniform vec2 resolution;uniform float time;
        void main(){
          vec2 p=(gl_FragCoord.xy*2.0-resolution)/min(resolution.x,resolution.y);
          float d1=0.05/abs(p.y+sin((p.x+time*0.35)*0.9)*0.22);vec3 ind=vec3(0.38,0.40,1.0)*d1;
          float d2=0.03/abs(p.y+sin((p.x*0.6+time*0.55+1.2)*1.1)*0.18);vec3 sky=vec3(0.14,0.56,0.95)*d2;
          float d3=0.018/abs(p.y+sin((p.x*0.9-time*0.28+2.5)*0.7)*0.13);vec3 teal=vec3(0.24,0.94,0.84)*d3;
          vec3 col=ind+sky+teal;col*=1.0-smoothstep(0.4,1.4,length(p));col*=0.85;
          gl_FragColor=vec4(col,1.0);}`,
        uniforms: u, side: T.DoubleSide,
      })))
      const resize = () => { r.setSize(innerWidth,innerHeight,false); u.resolution.value=[innerWidth,innerHeight] }
      resize(); window.addEventListener('resize',resize)
      let id: number
      const loop = () => { u.time.value+=0.005; r.render(scene,cam); id=requestAnimationFrame(loop) }
      loop()
      return () => { cancelAnimationFrame(id); window.removeEventListener('resize',resize); r.dispose() }
    }
    document.head.appendChild(s)
  }, [])
  return <canvas ref={ref} style={{position:'fixed',inset:0,zIndex:0,opacity:0.55,pointerEvents:'none'}}/>
}

function ProductMockup() {
  return (
    <div style={{position:'relative',width:'100%',maxWidth:1020,margin:'64px auto 0',zIndex:10}}>

      {/* Deep glow layer */}
      <div style={{position:'absolute',inset:'-80px',background:'radial-gradient(ellipse 75% 60% at 50% 50%,rgba(99,102,241,0.14) 0%,rgba(56,189,248,0.06) 45%,transparent 70%)',filter:'blur(48px)',zIndex:0,pointerEvents:'none'}}/>

      {/* Shadow depth card */}
      <div style={{position:'absolute',top:28,left:-12,right:-12,bottom:-28,borderRadius:22,background:'rgba(8,9,22,0.55)',border:'1px solid rgba(99,102,241,0.07)',backdropFilter:'blur(12px)',zIndex:0}}/>

      {/* Main window */}
      <div style={{
        position:'relative',zIndex:1,
        border:'1px solid rgba(255,255,255,0.08)',
        borderRadius:18,overflow:'hidden',
        background:'rgba(7,8,19,0.98)',
        backdropFilter:'blur(24px)',
        boxShadow:'0 0 0 1px rgba(255,255,255,0.03),0 60px 180px rgba(0,0,0,0.90),0 0 120px rgba(99,102,241,0.07)',
        transform:'perspective(1400px) rotateX(2deg)',
        transformOrigin:'top center',
      }}>

        {/* Title bar */}
        <div style={{height:46,background:'rgba(5,6,15,0.99)',borderBottom:'1px solid rgba(255,255,255,0.05)',display:'flex',alignItems:'center',padding:'0 20px',gap:16}}>
          <div style={{display:'flex',gap:7,flexShrink:0}}>
            <div style={{width:12,height:12,borderRadius:'50%',background:'#ff5f57'}}/>
            <div style={{width:12,height:12,borderRadius:'50%',background:'#ffbd2e'}}/>
            <div style={{width:12,height:12,borderRadius:'50%',background:'#28c840'}}/>
          </div>
          <div style={{flex:1,height:28,background:'rgba(255,255,255,0.035)',borderRadius:7,border:'1px solid rgba(255,255,255,0.06)',display:'flex',alignItems:'center',padding:'0 14px',fontSize:10,color:'rgba(255,255,255,0.22)',fontFamily:'Geist Mono,monospace',letterSpacing:'0.03em'}}>
            app.bizlegal-ai.com/review
          </div>
          <div style={{display:'flex',alignItems:'center',gap:6,fontSize:9,color:'#5eead4',fontFamily:'Geist Mono,monospace',letterSpacing:'0.14em',flexShrink:0}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#5eead4',boxShadow:'0 0 8px #5eead4',animation:'pulse 2s infinite'}}/>
            AI ACTIVE
          </div>
        </div>

        {/* Two-panel body */}
        <div style={{display:'grid',gridTemplateColumns:'1fr 290px',minHeight:360}}>

          {/* LEFT: Document panel */}
          <div style={{borderRight:'1px solid rgba(255,255,255,0.045)',padding:'24px 30px',overflow:'hidden'}}>
            <div style={{display:'flex',gap:5,marginBottom:22}}>
              {['JV Agreement.docx','NDA_UAE.docx','Capital Call.docx'].map((tab,i)=>(
                <div key={tab} style={{padding:'5px 13px',borderRadius:7,fontSize:10,fontFamily:'Geist Mono,monospace',cursor:'pointer',
                  background:i===0?'rgba(99,102,241,0.12)':'transparent',
                  border:i===0?'1px solid rgba(99,102,241,0.32)':'1px solid rgba(255,255,255,0.04)',
                  color:i===0?'#a5b4fc':'rgba(255,255,255,0.22)',
                }}>
                  {tab}
                </div>
              ))}
            </div>

            <div style={{fontFamily:'IBM Plex Serif,serif',fontSize:11}}>
              <div style={{fontSize:13,fontWeight:600,color:'rgba(255,255,255,0.85)',marginBottom:16,textAlign:'center',borderBottom:'1px solid rgba(255,255,255,0.05)',paddingBottom:14}}>
                JOINT VENTURE AGREEMENT
                <div style={{fontSize:9,color:'rgba(255,255,255,0.28)',fontFamily:'Geist Mono,monospace',marginTop:4,letterSpacing:'0.08em'}}>UAE / DIFC · Effective 1 Jan 2025</div>
              </div>

              <div style={{marginBottom:14}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',color:'#7dd3fc',marginBottom:6}}>1. CONFIDENTIALITY, PROPRIETARY RIGHTS</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.30)',lineHeight:1.8}}>
                  Each party ("Receiving Party") understands that the other party has disclosed or may disclose business, technical or financial information relating to the Disclosing Party's business (hereinafter referred to as "Proprietary Information")...
                </div>
              </div>

              <div style={{marginBottom:14}}>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',color:'#f59e0b',marginBottom:6,display:'inline-flex',alignItems:'center',gap:6}}>
                  2. RESTRICTIONS AND RESPONSIBILITIES
                  <span style={{fontSize:8,padding:'1px 6px',borderRadius:3,background:'rgba(245,158,11,0.12)',border:'1px solid rgba(245,158,11,0.30)',color:'#f59e0b'}}>AI FLAG</span>
                </div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.50)',lineHeight:1.8,borderLeft:'2px solid rgba(245,158,11,0.35)',paddingLeft:12,background:'rgba(245,158,11,0.025)',borderRadius:'0 5px 5px 0',padding:'9px 12px'}}>
                  Customer will not, directly or indirectly: reverse engineer, decompile, disassemble or otherwise attempt to discover source code, object code or underlying structure of the Services...
                </div>
              </div>

              <div>
                <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.14em',color:'#5eead4',marginBottom:6}}>3. VARA COMPLIANCE — UAE 2025</div>
                <div style={{fontSize:10,color:'rgba(255,255,255,0.30)',lineHeight:1.8}}>
                  In accordance with VARA regulatory framework, all token distributions shall be subject to prior approval. Company maintains full MAS and DIFC regulatory compliance...
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: AI suggestions panel */}
          <div style={{padding:'20px 17px',background:'rgba(4,5,14,0.55)'}}>
            <div style={{fontSize:9,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',color:'rgba(255,255,255,0.22)',marginBottom:16,display:'flex',alignItems:'center',justifyContent:'space-between'}}>
              <span>AI Analysis</span>
              <span style={{padding:'2px 8px',borderRadius:100,background:'rgba(99,102,241,0.14)',border:'1px solid rgba(99,102,241,0.28)',color:'#818cf8',fontSize:9}}>26</span>
            </div>

            {[
              {icon:'⚠️', color:'#f59e0b', title:'VARA Gap', desc:'Clause 2.1 missing MAS notification requirement', active:true},
              {icon:'🔍', color:'#818cf8', title:'Ambiguous Term', desc:'Define "material breach" in §4.3'},
              {icon:'✅', color:'#5eead4', title:'NDA Valid', desc:'Meets DIFC Law No. 5 of 2018'},
              {icon:'⚖️', color:'#7dd3fc', title:'IP Assignment', desc:'Review clause 5.2 for clarity'},
            ].map((item,i)=>(
              <div key={i} style={{
                display:'flex',gap:10,padding:'10px 12px',borderRadius:9,marginBottom:6,cursor:'pointer',
                background:item.active?'rgba(245,158,11,0.05)':'rgba(255,255,255,0.018)',
                border:item.active?'1px solid rgba(245,158,11,0.22)':'1px solid rgba(255,255,255,0.04)',
              }}>
                <span style={{fontSize:14,flexShrink:0}}>{item.icon}</span>
                <div>
                  <div style={{fontSize:10,fontWeight:700,color:item.color,marginBottom:2,letterSpacing:'0.04em'}}>{item.title}</div>
                  <div style={{fontSize:9,color:'rgba(255,255,255,0.28)',lineHeight:1.55}}>{item.desc}</div>
                </div>
              </div>
            ))}

            <div style={{marginTop:14,padding:'12px 14px',borderRadius:9,background:'linear-gradient(135deg,rgba(99,102,241,0.10),rgba(56,189,248,0.05))',border:'1px solid rgba(99,102,241,0.22)',textAlign:'center',cursor:'pointer'}}>
              <div style={{fontSize:10,fontWeight:700,color:'#818cf8',letterSpacing:'0.10em'}}>GENERATE FINAL DOCX</div>
              <div style={{fontSize:9,color:'rgba(255,255,255,0.26)',marginTop:3}}>Ready · 3 issues to resolve</div>
            </div>
          </div>
        </div>

        {/* ── BOTTOM CHIPS BAR (Spellbook-style) ── */}
        <div style={{borderTop:'1px solid rgba(255,255,255,0.05)',padding:'14px 20px',display:'flex',gap:6,background:'rgba(5,6,15,0.97)',overflowX:'auto'}}>
          {MOCKUP_CHIPS.map((chip,i)=>(
            <div key={i} style={{
              display:'flex',alignItems:'center',gap:10,
              padding:'10px 16px',borderRadius:11,
              border:'1px solid rgba(255,255,255,0.06)',
              background:'rgba(255,255,255,0.025)',
              cursor:'pointer',flexShrink:0,
              transition:'all 0.18s',
            }}>
              <div style={{
                width:34,height:34,borderRadius:9,
                background:`${chip.color}18`,
                border:`1px solid ${chip.color}30`,
                display:'flex',alignItems:'center',justifyContent:'center',
                fontSize:17,flexShrink:0,
              }}>
                {chip.icon}
              </div>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:6,marginBottom:1}}>
                  <span style={{fontSize:11,fontWeight:700,color:'rgba(255,255,255,0.82)',fontFamily:'Geist Mono,monospace'}}>{chip.label}</span>
                  {chip.isNew && <span style={{fontSize:8,padding:'1px 5px',borderRadius:3,background:'rgba(99,102,241,0.22)',border:'1px solid rgba(99,102,241,0.40)',color:'#a5b4fc',letterSpacing:'0.06em'}}>NEW</span>}
                </div>
                <span style={{fontSize:9,color:'rgba(255,255,255,0.28)',fontFamily:'Geist Mono,monospace'}}>{chip.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Floor reflection */}
      <div style={{position:'absolute',bottom:-36,left:'18%',right:'18%',height:70,background:'rgba(99,102,241,0.05)',filter:'blur(24px)',borderRadius:'50%',zIndex:0,pointerEvents:'none'}}/>
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

      {/* Grid texture overlay */}
      <div style={{position:'fixed',inset:0,zIndex:1,pointerEvents:'none',backgroundImage:'linear-gradient(rgba(255,255,255,0.022) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.022) 1px,transparent 1px)',backgroundSize:'72px 72px',maskImage:'radial-gradient(ellipse 80% 80% at 50% 50%,black 40%,transparent 100%)'}}/>

      {/* Veil */}
      <div style={{position:'fixed',inset:0,zIndex:2,pointerEvents:'none',background:'radial-gradient(ellipse 100% 55% at 50% -5%,rgba(3,4,10,0) 0%,rgba(3,4,10,0.50) 70%),linear-gradient(to bottom,rgba(3,4,10,0) 0%,rgba(3,4,10,0.65) 100%)'}}/>

      {/* STICKY BAR */}
      {sticky && (
        <div style={{position:'fixed',bottom:0,left:0,right:0,zIndex:300,background:'rgba(3,4,12,0.97)',backdropFilter:'blur(28px)',borderTop:'1px solid rgba(99,102,241,0.12)',padding:'13px 32px',display:'flex',alignItems:'center',justifyContent:'space-between',gap:16}}>
          <span style={{fontSize:13,color:'#c7d2fe'}}>Legal Intelligence Platform — <strong style={{color:'#818cf8'}}>Contracts, Compliance & Forensics</strong> from $49</span>
          <div style={{display:'flex',gap:10}}>
            <a href="https://docstack.bizlegal-ai.com" style={{padding:'8px 20px',borderRadius:7,background:'rgba(99,102,241,0.10)',border:'1px solid rgba(99,102,241,0.40)',color:'#818cf8',fontFamily:'Geist Mono,monospace',fontSize:11,fontWeight:700,textDecoration:'none',letterSpacing:'0.06em'}}>Get Templates</a>
            <button onClick={()=>setSticky(false)} style={{background:'none',border:'none',color:'#3a4060',cursor:'pointer',fontSize:20,lineHeight:1}}>×</button>
          </div>
        </div>
      )}

      {/* EXIT POPUP */}
      {exit && (
        <div onClick={e=>{if(e.target===e.currentTarget)closeExit()}} style={{position:'fixed',inset:0,zIndex:500,background:'rgba(3,4,10,0.92)',backdropFilter:'blur(16px)',display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{background:'rgba(6,7,18,0.99)',border:'1px solid rgba(99,102,241,0.18)',borderRadius:22,padding:54,maxWidth:480,width:'90%',textAlign:'center',position:'relative',boxShadow:'0 0 120px rgba(99,102,241,0.12)'}}>
            <button onClick={closeExit} style={{position:'absolute',top:18,right:22,background:'none',border:'none',color:'#3a4060',cursor:'pointer',fontSize:22}}>×</button>
            <div style={{display:'inline-block',fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color:'#5eead4',border:'1px solid rgba(94,234,212,0.22)',background:'rgba(94,234,212,0.05)',padding:'4px 14px',borderRadius:100,marginBottom:20}}>Before you go</div>
            <h3 style={{fontFamily:'Gloock,serif',fontSize:32,color:'#fff',marginBottom:12,lineHeight:1.15}}>Get the JV Agreement <em style={{color:'#818cf8',fontStyle:'italic'}}>checklist free</em></h3>
            <p style={{fontSize:14,color:'#8a9ac8',lineHeight:1.75,marginBottom:22}}>The framework behind $10M+ deals in UAE, US, and EU. Enter your email and we'll send it instantly.</p>
            {!sent ? (
              <div style={{display:'flex',gap:8,marginBottom:12}}>
                <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com" style={{flex:1,padding:'12px 14px',borderRadius:8,border:'1px solid rgba(99,102,241,0.18)',background:'rgba(3,4,10,0.8)',color:'#fff',fontSize:13,fontFamily:'Geist Mono,monospace',outline:'none'}}/>
                <button onClick={()=>{if(email.includes('@')){setSent(true);setTimeout(closeExit,2500)}}} style={{padding:'12px 20px',borderRadius:8,background:'rgba(99,102,241,0.12)',border:'1px solid rgba(99,102,241,0.45)',color:'#818cf8',fontFamily:'Geist Mono,monospace',fontSize:13,fontWeight:700,cursor:'pointer',whiteSpace:'nowrap'}}>Get Free →</button>
              </div>
            ) : (
              <div style={{padding:10,background:'rgba(94,234,212,0.06)',border:'1px solid rgba(94,234,212,0.18)',borderRadius:8,fontSize:12,color:'#5eead4',marginBottom:12}}>Sent! Check your inbox.</div>
            )}
            <span onClick={closeExit} style={{fontSize:11,color:'#3a4060',cursor:'pointer',display:'block',marginTop:12}}>No thanks, I prefer paying full lawyer rates</span>
          </div>
        </div>
      )}

      {/* NAV */}
      <nav style={{position:'sticky',top:0,zIndex:200,background:'rgba(3,4,12,0.75)',backdropFilter:'blur(32px)',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
        <div style={{maxWidth:1200,margin:'0 auto',padding:'0 32px',height:66,display:'flex',alignItems:'center',gap:32}}>
          <Link href="/" style={{fontFamily:'Gloock,serif',fontSize:19,color:'#fff',textDecoration:'none',flexShrink:0,letterSpacing:'-0.01em',display:'flex',alignItems:'center',gap:2}}>
            BizLegal<em style={{color:'#818cf8',fontStyle:'italic'}}>AI</em>
          </Link>
          <div style={{display:'flex',gap:2,flex:1}}>
            {['Guides','DocStack','BRAI','TRACR','Pricing'].map(item => (
              <a key={item}
                href={item==='DocStack'?'https://docstack.bizlegal-ai.com':item==='BRAI'?'https://brai.bizlegal-ai.com':item==='TRACR'?'https://tracr.bizlegal-ai.com':'#'}
                style={{padding:'7px 13px',borderRadius:7,fontSize:12,color:'rgba(255,255,255,0.40)',textDecoration:'none',fontFamily:'Geist Mono,monospace',letterSpacing:'0.04em',transition:'color 0.2s'}}>
                {item}
              </a>
            ))}
          </div>
          <a href="https://docstack.bizlegal-ai.com" style={{padding:'8px 20px',borderRadius:8,background:'rgba(99,102,241,0.10)',border:'1px solid rgba(99,102,241,0.38)',color:'#a5b4fc',fontFamily:'Geist Mono,monospace',fontSize:11,fontWeight:700,textDecoration:'none',letterSpacing:'0.07em',transition:'all 0.2s'}}>
            Get Templates
          </a>
        </div>
      </nav>

      <div style={{position:'relative',zIndex:10}}>

        {/* ── HERO ── */}
        <section style={{minHeight:'100vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'flex-start',textAlign:'center',padding:'88px 32px 0'}}>

          {/* Badge */}
          <div className="hero-badge" style={{display:'inline-flex',alignItems:'center',gap:8,padding:'6px 20px',borderRadius:100,border:'1px solid rgba(99,102,241,0.24)',background:'rgba(99,102,241,0.06)',fontSize:11,letterSpacing:'0.18em',textTransform:'uppercase',color:'#a5b4fc',marginBottom:30,backdropFilter:'blur(8px)'}}>
            <div style={{width:6,height:6,borderRadius:'50%',background:'#5eead4',boxShadow:'0 0 8px #5eead4'}}/>
            Legal First · AI-Powered · Multi-Jurisdiction
          </div>

          {/* Headline */}
          <h1 className="hero-h1" style={{fontFamily:'Gloock,serif',fontSize:'clamp(50px,8.8vw,112px)',lineHeight:1.0,letterSpacing:'-0.028em',marginBottom:22,color:'#ffffff',maxWidth:960}}>
            The dark ages of<br/>
            contract drudgery are{' '}
            <em style={{
              color:'transparent',
              fontStyle:'italic',
              backgroundImage:'linear-gradient(135deg,#818cf8 0%,#38bdf8 50%,#5eead4 100%)',
              WebkitBackgroundClip:'text',
              backgroundClip:'text',
              filter:'drop-shadow(0 0 60px rgba(99,102,241,0.35))',
            }}>behind us</em>
          </h1>

          {/* Subtitle */}
          <p className="hero-sub" style={{maxWidth:540,fontSize:17,color:'rgba(255,255,255,0.44)',lineHeight:1.75,marginBottom:34,fontFamily:'Geist Mono,monospace',letterSpacing:'-0.01em'}}>
            BizLegal AI streamlines the drafting, redlining, and review of contracts — built by a lawyer, powered by AI.
          </p>

          {/* CTA row */}
          <div className="hero-ctas" style={{display:'flex',gap:12,flexWrap:'wrap',justifyContent:'center',marginBottom:18}}>
            <a href="https://docstack.bizlegal-ai.com" style={{
              padding:'15px 34px',borderRadius:9,fontSize:13,fontWeight:700,letterSpacing:'0.08em',
              textTransform:'uppercase',fontFamily:'Geist Mono,monospace',
              background:'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(56,189,248,0.10))',
              border:'1px solid rgba(99,102,241,0.48)',color:'#c7d2fe',textDecoration:'none',
              boxShadow:'0 0 50px rgba(99,102,241,0.12),inset 0 1px 0 rgba(255,255,255,0.05)',
              transition:'all 0.2s',
            }}>
              Generate Contract — $49
            </a>
            <a href="#preview" style={{
              padding:'15px 34px',borderRadius:9,fontSize:13,fontWeight:700,letterSpacing:'0.08em',
              textTransform:'uppercase',fontFamily:'Geist Mono,monospace',
              background:'transparent',border:'1px solid rgba(255,255,255,0.07)',
              color:'rgba(255,255,255,0.36)',textDecoration:'none',transition:'all 0.2s',
            }}>
              Preview Template
            </a>
          </div>

          {/* Price anchor */}
          <div className="hero-price" style={{display:'flex',alignItems:'center',gap:14,marginBottom:14,fontSize:12,color:'rgba(255,255,255,0.26)',fontFamily:'Geist Mono,monospace'}}>
            <span style={{textDecoration:'line-through',color:'rgba(248,113,113,0.45)'}}>$3–8k traditional lawyer</span>
            <span style={{color:'rgba(255,255,255,0.12)'}}>vs</span>
            <span style={{color:'#5eead4',fontWeight:700}}>$49 · 60 seconds</span>
          </div>

          {/* PRODUCT MOCKUP */}
          <div className="hero-mockup" style={{width:'100%'}}>
            <ProductMockup/>
          </div>
        </section>

        {/* ── STATS ── */}
        <section style={{padding:'100px 0 80px',borderTop:'1px solid rgba(255,255,255,0.04)',marginTop:80}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:1,background:'rgba(99,102,241,0.06)',border:'1px solid rgba(99,102,241,0.08)',borderRadius:18,overflow:'hidden'}}>
              {[['8','Templates'],['6','Jurisdictions'],['$49','Starting price'],['$2k+','Saved vs lawyer']].map(([v,l])=>(
                <div key={l} style={{background:'rgba(5,6,14,0.85)',padding:32,textAlign:'center'}}>
                  <div style={{fontFamily:'Gloock,serif',fontSize:50,lineHeight:1,marginBottom:8,backgroundImage:'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.70) 100%)',WebkitBackgroundClip:'text',backgroundClip:'text',color:'transparent'}}>{v}</div>
                  <div style={{fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(255,255,255,0.32)'}}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRODUCTS ── */}
        <section style={{padding:'80px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:28,height:1,background:'rgba(99,102,241,0.45)'}}/>
              <span style={{fontSize:11,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.30)',fontFamily:'Geist Mono,monospace'}}>Legal Intelligence Stack</span>
            </div>
            <h2 style={{fontFamily:'Gloock,serif',fontSize:'clamp(30px,4vw,52px)',color:'#fff',marginBottom:46,letterSpacing:'-0.02em'}}>
              Three tools, one <em style={{color:'transparent',fontStyle:'italic',backgroundImage:'linear-gradient(135deg,#818cf8,#38bdf8)',WebkitBackgroundClip:'text',backgroundClip:'text'}}>platform</em>
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
              {[
                {tag:'LIVE',color:'#818cf8',grad:'rgba(99,102,241,0.08)',name:'DocStack',desc:'8 lawyer-drafted real estate templates. JV, NDA, LOI, Capital Call. DOCX + PDF instant download.',price:'From $49',cta:'Browse →',href:'https://docstack.bizlegal-ai.com'},
                {tag:'BETA',color:'#38bdf8',grad:'rgba(56,189,248,0.06)',name:'BRAI',desc:'Blockchain Regulatory Intelligence. Real-time compliance scanning for VARA, MiCA, SEC, MAS.',price:'Subscription',cta:'Free scan →',href:'https://brai.bizlegal-ai.com'},
                {tag:'SOON',color:'#5eead4',grad:'rgba(94,234,212,0.05)',name:'TRACR',desc:'AI forensic investigation. Wallet tracing, fraud analysis, court-ready reports for lawyers.',price:'$99 / report',cta:'Waitlist →',href:'https://tracr.bizlegal-ai.com'},
              ].map(p=>(
                <div key={p.name} style={{borderRadius:18,padding:34,border:'1px solid rgba(255,255,255,0.06)',background:`rgba(6,7,18,0.80)`,backdropFilter:'blur(20px)',position:'relative',overflow:'hidden',transition:'all 0.3s'}}>
                  <div style={{position:'absolute',top:0,left:'15%',right:'15%',height:1,background:`linear-gradient(90deg,transparent,${p.color}30,transparent)`}}/>
                  <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,background:`radial-gradient(ellipse 60% 40% at 50% 0%,${p.grad},transparent)`,pointerEvents:'none'}}/>
                  <span style={{position:'relative',fontSize:9,fontWeight:700,letterSpacing:'0.18em',textTransform:'uppercase',padding:'3px 10px',borderRadius:100,border:`1px solid ${p.color}44`,background:`${p.color}10`,color:p.color,display:'inline-block',marginBottom:20}}>{p.tag}</span>
                  <div style={{position:'relative',fontFamily:'Gloock,serif',fontSize:34,color:'#fff',marginBottom:12,letterSpacing:'-0.02em'}}>{p.name}</div>
                  <p style={{position:'relative',fontSize:13,color:'rgba(255,255,255,0.40)',lineHeight:1.8,marginBottom:26}}>{p.desc}</p>
                  <div style={{position:'relative',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                    <span style={{fontSize:11,color:'rgba(255,255,255,0.20)',fontFamily:'Geist Mono,monospace'}}>{p.price}</span>
                    <a href={p.href} style={{fontSize:12,fontWeight:700,color:p.color,textDecoration:'none',fontFamily:'Geist Mono,monospace',letterSpacing:'0.04em'}}>{p.cta}</a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── HOW IT WORKS ── */}
        <section style={{padding:'80px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:28,height:1,background:'rgba(99,102,241,0.45)'}}/>
              <span style={{fontSize:11,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.30)',fontFamily:'Geist Mono,monospace'}}>How it works</span>
            </div>
            <h2 style={{fontFamily:'Gloock,serif',fontSize:'clamp(30px,4vw,52px)',color:'#fff',marginBottom:50,letterSpacing:'-0.02em'}}>
              Lawyer-grade documents in <em style={{color:'transparent',fontStyle:'italic',backgroundImage:'linear-gradient(135deg,#818cf8,#38bdf8)',WebkitBackgroundClip:'text',backgroundClip:'text'}}>3 steps</em>
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:14}}>
              {[
                {n:'01',title:'Select your template',desc:'Choose from 8 jurisdictions: UAE/DIFC, US, EU, UK, Singapore, Canada, Portugal, Web3/DAO.'},
                {n:'02',title:'AI customises it',desc:'Our AI, trained on 20 years of legal practice, fills clauses, flags risks, and adapts to your deal.'},
                {n:'03',title:'Download in seconds',desc:'Receive a DOCX + PDF instantly. Court-ready, lawyer-drafted, compliance-checked.'},
              ].map(s=>(
                <div key={s.n} style={{borderRadius:16,padding:'30px 30px',border:'1px solid rgba(255,255,255,0.05)',background:'rgba(5,6,15,0.70)',position:'relative',overflow:'hidden'}}>
                  <div style={{position:'absolute',top:0,right:0,width:160,height:160,background:'radial-gradient(circle,rgba(99,102,241,0.04) 0%,transparent 70%)',pointerEvents:'none'}}/>
                  <div style={{fontFamily:'Gloock,serif',fontSize:56,color:'rgba(99,102,241,0.08)',lineHeight:1,marginBottom:18,letterSpacing:'-0.04em',userSelect:'none'}}>{s.n}</div>
                  <div style={{fontSize:17,fontWeight:700,color:'rgba(255,255,255,0.85)',marginBottom:10,fontFamily:'Gloock,serif'}}>{s.title}</div>
                  <p style={{fontSize:13,color:'rgba(255,255,255,0.36)',lineHeight:1.8}}>{s.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── PRICE COMPARE ── */}
        <section style={{padding:'80px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{maxWidth:900,margin:'0 auto',padding:'0 40px'}}>
            <div style={{textAlign:'center',marginBottom:50}}>
              <div style={{display:'flex',alignItems:'center',justifyContent:'center',gap:12,marginBottom:14}}>
                <div style={{width:28,height:1,background:'rgba(99,102,241,0.45)'}}/>
                <span style={{fontSize:11,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.30)',fontFamily:'Geist Mono,monospace'}}>Compare</span>
                <div style={{width:28,height:1,background:'rgba(99,102,241,0.45)'}}/>
              </div>
              <h2 style={{fontFamily:'Gloock,serif',fontSize:'clamp(30px,4vw,52px)',color:'#fff',letterSpacing:'-0.02em'}}>
                Stop paying <em style={{color:'#f87171',fontStyle:'italic'}}>lawyer rates</em>
              </h2>
            </div>
            <div style={{display:'grid',gridTemplateColumns:'1fr auto 1fr',border:'1px solid rgba(255,255,255,0.06)',borderRadius:18,overflow:'hidden',background:'rgba(6,7,18,0.75)'}}>
              <div style={{padding:'34px 34px',background:'rgba(248,113,113,0.025)',borderRight:'1px solid rgba(255,255,255,0.04)'}}>
                <div style={{fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',color:'#f87171',marginBottom:10,fontFamily:'Geist Mono,monospace'}}>Traditional lawyer</div>
                <div style={{fontFamily:'Gloock,serif',fontSize:46,color:'rgba(255,255,255,0.25)',lineHeight:1,marginBottom:6}}>$3–8k</div>
                <div style={{fontSize:11,color:'rgba(255,255,255,0.28)',fontFamily:'Geist Mono,monospace'}}>2–3 weeks turnaround</div>
                <div style={{marginTop:22,display:'flex',flexDirection:'column',gap:9}}>
                  {['Slow drafting cycles','Opaque billing','Limited jurisdictions','No instant edits'].map(x=>(
                    <div key={x} style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'rgba(255,255,255,0.26)'}}>
                      <span style={{color:'#f87171',fontSize:13}}>×</span>{x}
                    </div>
                  ))}
                </div>
              </div>
              <div style={{padding:'34px 26px',background:'rgba(5,6,14,0.85)',display:'flex',alignItems:'center',justifyContent:'center'}}>
                <span style={{fontSize:13,color:'rgba(255,255,255,0.08)',fontFamily:'Geist Mono,monospace',letterSpacing:'0.08em'}}>vs</span>
              </div>
              <div style={{padding:'34px 34px',background:'rgba(99,102,241,0.02)',borderLeft:'1px solid rgba(99,102,241,0.08)'}}>
                <div style={{fontSize:10,letterSpacing:'0.18em',textTransform:'uppercase',color:'#818cf8',marginBottom:10,fontFamily:'Geist Mono,monospace'}}>BizLegal AI</div>
                <div style={{fontFamily:'Gloock,serif',fontSize:46,color:'#fff',lineHeight:1,marginBottom:6}}>$49</div>
                <div style={{fontSize:11,color:'#5eead4',fontFamily:'Geist Mono,monospace'}}>60 seconds · instant download</div>
                <div style={{marginTop:22,display:'flex',flexDirection:'column',gap:9}}>
                  {['Instant generation','Transparent flat fee','6 jurisdictions covered','Edit & re-download anytime'].map(x=>(
                    <div key={x} style={{display:'flex',alignItems:'center',gap:8,fontSize:12,color:'rgba(255,255,255,0.65)'}}>
                      <span style={{color:'#5eead4',fontSize:13}}>✓</span>{x}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── SEO GUIDES ── */}
        <section id="guides" style={{padding:'80px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'flex',alignItems:'center',gap:12,marginBottom:14}}>
              <div style={{width:28,height:1,background:'rgba(99,102,241,0.45)'}}/>
              <span style={{fontSize:11,letterSpacing:'0.28em',textTransform:'uppercase',color:'rgba(255,255,255,0.30)',fontFamily:'Geist Mono,monospace'}}>Free Legal Intelligence</span>
            </div>
            <h2 style={{fontFamily:'Gloock,serif',fontSize:'clamp(30px,4vw,52px)',color:'#fff',marginBottom:46,letterSpacing:'-0.02em'}}>
              Expert guides across <em style={{color:'transparent',fontStyle:'italic',backgroundImage:'linear-gradient(135deg,#818cf8,#38bdf8)',WebkitBackgroundClip:'text',backgroundClip:'text'}}>all jurisdictions</em>
            </h2>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:54}}>
              {[GUIDES.slice(0,4), GUIDES.slice(4)].map((col,ci)=>(
                <div key={ci}>
                  {col.map(group=>(
                    <div key={group.region} style={{marginBottom:32}}>
                      <div style={{fontSize:10,letterSpacing:'0.22em',textTransform:'uppercase',color:'rgba(129,140,248,0.70)',marginBottom:10,fontFamily:'Geist Mono,monospace'}}>{group.region}</div>
                      {group.items.map(item=>(
                        <Link key={item.href} href={item.href} style={{display:'flex',alignItems:'center',justifyContent:'space-between',padding:'11px 14px',borderRadius:9,border:'1px solid transparent',textDecoration:'none',marginBottom:4,color:'rgba(255,255,255,0.40)',transition:'all 0.15s'}}>
                          <span style={{fontSize:13,fontFamily:'Geist Mono,monospace'}}>{item.title}</span>
                          <span style={{color:'rgba(255,255,255,0.16)',flexShrink:0,marginLeft:12}}>→</span>
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
        <section style={{padding:'80px 0',borderTop:'1px solid rgba(255,255,255,0.04)'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{borderRadius:22,padding:'72px 60px',background:'rgba(6,7,18,0.85)',border:'1px solid rgba(99,102,241,0.12)',textAlign:'center',position:'relative',overflow:'hidden'}}>
              <div style={{position:'absolute',top:-120,left:'50%',transform:'translateX(-50%)',width:800,height:380,borderRadius:'50%',background:'radial-gradient(ellipse,rgba(99,102,241,0.08) 0%,transparent 65%)',pointerEvents:'none'}}/>
              <div style={{position:'absolute',top:0,left:0,right:0,bottom:0,backgroundImage:'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)',backgroundSize:'48px 48px',pointerEvents:'none'}}/>
              <div style={{position:'relative',display:'inline-block',fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color:'#5eead4',border:'1px solid rgba(94,234,212,0.22)',background:'rgba(94,234,212,0.05)',padding:'4px 14px',borderRadius:100,marginBottom:22}}>Start today</div>
              <h2 style={{position:'relative',fontFamily:'Gloock,serif',fontSize:'clamp(28px,3.5vw,50px)',color:'#fff',marginBottom:14,letterSpacing:'-0.02em'}}>
                Generate your first contract <em style={{color:'transparent',fontStyle:'italic',backgroundImage:'linear-gradient(135deg,#818cf8,#38bdf8)',WebkitBackgroundClip:'text',backgroundClip:'text'}}>in 60 seconds</em>
              </h2>
              <p style={{position:'relative',fontSize:15,color:'rgba(255,255,255,0.36)',marginBottom:36,fontFamily:'Geist Mono,monospace'}}>Trusted by founders, investors, and legal teams across 6 jurisdictions.</p>
              <div style={{position:'relative',display:'flex',gap:14,justifyContent:'center',flexWrap:'wrap'}}>
                <a href="https://docstack.bizlegal-ai.com" style={{padding:'16px 38px',borderRadius:9,fontSize:13,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace',background:'linear-gradient(135deg,rgba(99,102,241,0.18),rgba(56,189,248,0.10))',border:'1px solid rgba(99,102,241,0.48)',color:'#c7d2fe',textDecoration:'none',boxShadow:'0 0 50px rgba(99,102,241,0.12)'}}>
                  Browse Templates →
                </a>
                <a href="https://brai.bizlegal-ai.com" style={{padding:'16px 38px',borderRadius:9,fontSize:13,fontWeight:700,letterSpacing:'0.08em',textTransform:'uppercase',fontFamily:'Geist Mono,monospace',background:'transparent',border:'1px solid rgba(255,255,255,0.07)',color:'rgba(255,255,255,0.36)',textDecoration:'none'}}>
                  Free Compliance Scan
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* ── FOOTER ── */}
        <footer style={{background:'rgba(3,4,12,0.96)',borderTop:'1px solid rgba(255,255,255,0.04)',padding:'64px 0 30px'}}>
          <div style={{maxWidth:1200,margin:'0 auto',padding:'0 40px'}}>
            <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:40,marginBottom:54}}>
              <div style={{maxWidth:240}}>
                <div style={{fontFamily:'Gloock,serif',fontSize:20,color:'#fff',marginBottom:12,letterSpacing:'-0.01em'}}>BizLegal<em style={{color:'#818cf8',fontStyle:'italic'}}>AI</em></div>
                <p style={{fontSize:12,color:'rgba(255,255,255,0.28)',lineHeight:1.8,fontFamily:'Geist Mono,monospace'}}>Legal intelligence platform for global real estate, Web3 compliance, and cross-border investment.</p>
              </div>
              <div style={{display:'flex',gap:52,flexWrap:'wrap'}}>
                {[
                  {title:'Products',links:[['DocStack','https://docstack.bizlegal-ai.com'],['BRAI','https://brai.bizlegal-ai.com'],['TRACR','https://tracr.bizlegal-ai.com']]},
                  {title:'Jurisdictions',links:[['UAE / DIFC','/guides/uae/joint-venture-agreement-real-estate-uae'],['United States','/guides/united-states/operating-agreement-llc-real-estate'],['European Union','/guides/european-union/mica-token-sale-agreement-template'],['Singapore','/guides/singapore/capital-call-agreement-singapore']]},
                  {title:'Legal',links:[['Terms','/terms'],['Privacy','/privacy'],['Disclaimer','/disclaimer']]},
                ].map(col=>(
                  <div key={col.title}>
                    <div style={{fontSize:9,letterSpacing:'0.22em',textTransform:'uppercase',color:'#818cf8',marginBottom:14,fontWeight:700,fontFamily:'Geist Mono,monospace'}}>{col.title}</div>
                    {col.links.map(([label,href])=>(
                      <a key={label} href={href} style={{display:'block',fontSize:12,color:'rgba(255,255,255,0.26)',padding:'3px 0',textDecoration:'none',fontFamily:'Geist Mono,monospace',transition:'color 0.2s'}}>{label}</a>
                    ))}
                  </div>
                ))}
              </div>
            </div>
            <div style={{borderTop:'1px solid rgba(255,255,255,0.04)',paddingTop:24,display:'flex',justifyContent:'space-between',flexWrap:'wrap',gap:12}}>
              <span style={{fontSize:10,color:'rgba(255,255,255,0.16)',fontFamily:'Geist Mono,monospace',letterSpacing:'0.06em'}}>© 2025 BizLegal AI · Templates only — not legal advice</span>
              <div style={{display:'flex',gap:18}}>
                {['Terms','Privacy','Disclaimer'].map(l=>(
                  <a key={l} href={`/${l.toLowerCase()}`} style={{fontSize:10,color:'rgba(255,255,255,0.16)',textDecoration:'none',fontFamily:'Geist Mono,monospace'}}>{l}</a>
                ))}
              </div>
            </div>
          </div>
        </footer>

      </div>
    </>
  )
}

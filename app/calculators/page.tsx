'use client'
import { useState } from 'react'
import Link from 'next/link'

// ─── Legal Fee Calculator ───────────────────────────────────────────────────

function LegalFeeCalc() {
  const [type, setType] = useState('contract')
  const [value, setValue] = useState('')
  const [jurisdiction, setJurisdiction] = useState('uk')
  const [result, setResult] = useState<{ biz: number; trad: number; saving: number } | null>(null)

  const rates: Record<string, Record<string, number>> = {
    contract:   { uk: 0.015, us: 0.018, uae: 0.014, eu: 0.013, sg: 0.016 },
    compliance: { uk: 0.012, us: 0.015, uae: 0.011, eu: 0.012, sg: 0.013 },
    nda:        { uk: 0.008, us: 0.009, uae: 0.007, eu: 0.008, sg: 0.009 },
    jv:         { uk: 0.022, us: 0.025, uae: 0.02,  eu: 0.021, sg: 0.023 },
  }

  const bizFlat: Record<string, number> = { contract: 49, compliance: 49, nda: 49, jv: 49 }

  function calc() {
    const v = parseFloat(value)
    if (!v || v <= 0) return
    const rate = rates[type]?.[jurisdiction] ?? 0.015
    const trad = Math.max(v * rate, 500)
    const biz = bizFlat[type] ?? 49
    setResult({ biz, trad, saving: trad - biz })
  }

  return (
    <div style={{ padding: '32px', borderRadius: '16px', border: '1px solid rgba(125,211,252,0.15)', background: 'rgba(7,9,26,0.7)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '28px' }}>💰</span>
        <div>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: 'var(--white)', marginBottom: '2px' }}>Legal Fee Calculator</h2>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Compare DOR INNOVATIONS vs traditional law firm costs</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontFamily: 'Geist Mono, monospace' }}>Document Type</label>
          <select value={type} onChange={e => setType(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'rgba(4,6,14,0.7)', color: 'var(--text)', fontSize: '13px', fontFamily: 'Geist Mono, monospace', outline: 'none' }}>
            <option value="contract">Commercial Contract</option>
            <option value="compliance">Compliance Review</option>
            <option value="nda">NDA</option>
            <option value="jv">Joint Venture Agreement</option>
          </select>
        </div>
        <div>
          <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontFamily: 'Geist Mono, monospace' }}>Jurisdiction</label>
          <select value={jurisdiction} onChange={e => setJurisdiction(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'rgba(4,6,14,0.7)', color: 'var(--text)', fontSize: '13px', fontFamily: 'Geist Mono, monospace', outline: 'none' }}>
            <option value="uk">United Kingdom</option>
            <option value="us">United States</option>
            <option value="uae">UAE / DIFC</option>
            <option value="eu">European Union</option>
            <option value="sg">Singapore</option>
          </select>
        </div>
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontFamily: 'Geist Mono, monospace' }}>Transaction / Contract Value (USD)</label>
        <input type="number" value={value} onChange={e => setValue(e.target.value)} placeholder="e.g. 500000" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'rgba(4,6,14,0.7)', color: 'var(--white)', fontSize: '14px', fontFamily: 'Geist Mono, monospace', outline: 'none' }} />
      </div>
      <button onClick={calc} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13px', justifyContent: 'center' }}>Calculate Savings →</button>
      {result && (
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[
            { label: 'Traditional Lawyer', val: `$${result.trad.toLocaleString()}`, color: '#f87171' },
            { label: 'DOR INNOVATIONS', val: `$${result.biz}`, color: 'var(--teal)' },
            { label: 'Your Saving', val: `$${result.saving.toLocaleString()}`, color: 'var(--sky)' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px', borderRadius: '10px', border: `1px solid ${s.color}25`, background: `${s.color}06` }}>
              <div style={{ fontFamily: 'Gloock, serif', fontSize: '24px', color: s.color, marginBottom: '4px' }}>{s.val}</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── Contract Value Calculator ──────────────────────────────────────────────

function ContractValueCalc() {
  const [rate, setRate] = useState('')
  const [unit, setUnit] = useState('hour')
  const [duration, setDuration] = useState('')
  const [durUnit, setDurUnit] = useState('month')
  const [result, setResult] = useState<{ total: number; monthly: number; daily: number } | null>(null)

  function calc() {
    const r = parseFloat(rate)
    const d = parseFloat(duration)
    if (!r || !d || r <= 0 || d <= 0) return
    const hoursPerUnit: Record<string, number> = { hour: 1, day: 8, week: 40, month: 160 }
    const daysPerUnit: Record<string, number> = { day: 1, week: 5, month: 22, year: 260 }
    const hourlyRate = r / (hoursPerUnit[unit] ?? 1)
    const totalHours = d * daysPerUnit[durUnit] * 8
    const total = hourlyRate * totalHours
    setResult({ total, monthly: total / (d * daysPerUnit[durUnit] / 22), daily: hourlyRate * 8 })
  }

  return (
    <div style={{ padding: '32px', borderRadius: '16px', border: '1px solid rgba(94,234,212,0.15)', background: 'rgba(7,9,26,0.7)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '28px' }}>📋</span>
        <div>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: 'var(--white)', marginBottom: '2px' }}>Contract Value Calculator</h2>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Estimate total contract value from rate + duration</p>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '12px', marginBottom: '12px' }}>
        <div>
          <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontFamily: 'Geist Mono, monospace' }}>Your Rate (USD)</label>
          <input type="number" value={rate} onChange={e => setRate(e.target.value)} placeholder="150" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'rgba(4,6,14,0.7)', color: 'var(--white)', fontSize: '14px', fontFamily: 'Geist Mono, monospace', outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontFamily: 'Geist Mono, monospace' }}>Per</label>
          <select value={unit} onChange={e => setUnit(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'rgba(4,6,14,0.7)', color: 'var(--text)', fontSize: '13px', fontFamily: 'Geist Mono, monospace', outline: 'none', height: '42px' }}>
            <option value="hour">Hour</option>
            <option value="day">Day</option>
            <option value="week">Week</option>
            <option value="month">Month</option>
          </select>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px', gap: '12px', marginBottom: '16px' }}>
        <div>
          <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontFamily: 'Geist Mono, monospace' }}>Contract Duration</label>
          <input type="number" value={duration} onChange={e => setDuration(e.target.value)} placeholder="3" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'rgba(4,6,14,0.7)', color: 'var(--white)', fontSize: '14px', fontFamily: 'Geist Mono, monospace', outline: 'none' }} />
        </div>
        <div>
          <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontFamily: 'Geist Mono, monospace' }}>Unit</label>
          <select value={durUnit} onChange={e => setDurUnit(e.target.value)} style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'rgba(4,6,14,0.7)', color: 'var(--text)', fontSize: '13px', fontFamily: 'Geist Mono, monospace', outline: 'none', height: '42px' }}>
            <option value="day">Days</option>
            <option value="week">Weeks</option>
            <option value="month">Months</option>
            <option value="year">Years</option>
          </select>
        </div>
      </div>
      <button onClick={calc} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13px', borderColor: 'rgba(94,234,212,0.45)', color: 'var(--teal)' }}>Calculate Value →</button>
      {result && (
        <div style={{ marginTop: '20px', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          {[
            { label: 'Total Value', val: `$${Math.round(result.total).toLocaleString()}`, color: 'var(--sky)' },
            { label: 'Monthly', val: `$${Math.round(result.monthly).toLocaleString()}`, color: 'var(--teal)' },
            { label: 'Daily Rate', val: `$${Math.round(result.daily).toLocaleString()}`, color: 'var(--indigo)' },
          ].map(s => (
            <div key={s.label} style={{ textAlign: 'center', padding: '16px', borderRadius: '10px', border: `1px solid ${s.color}25`, background: `${s.color}06` }}>
              <div style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: s.color, marginBottom: '4px' }}>{s.val}</div>
              <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

// ─── ROI Calculator ─────────────────────────────────────────────────────────

function ROICalc() {
  const [docs, setDocs] = useState('')
  const [scans, setScans] = useState('')
  const [result, setResult] = useState<{ saved: number; cost: number; roi: number } | null>(null)

  function calc() {
    const d = parseInt(docs) || 0
    const s = parseInt(scans) || 0
    const tradCost = d * 800 + s * 1200
    const bizCost = d * 49 + (s > 0 ? 49 : 0)
    const saved = tradCost - bizCost
    const roi = bizCost > 0 ? ((saved / bizCost) * 100) : 0
    setResult({ saved, cost: bizCost, roi })
  }

  return (
    <div style={{ padding: '32px', borderRadius: '16px', border: '1px solid rgba(165,180,252,0.15)', background: 'rgba(7,9,26,0.7)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '28px' }}>📈</span>
        <div>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: 'var(--white)', marginBottom: '2px' }}>ROI Calculator</h2>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Calculate your legal cost savings with DOR INNOVATIONS</p>
        </div>
      </div>
      <div style={{ marginBottom: '12px' }}>
        <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontFamily: 'Geist Mono, monospace' }}>Number of contracts / templates per year</label>
        <input type="number" value={docs} onChange={e => setDocs(e.target.value)} placeholder="12" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'rgba(4,6,14,0.7)', color: 'var(--white)', fontSize: '14px', fontFamily: 'Geist Mono, monospace', outline: 'none' }} />
      </div>
      <div style={{ marginBottom: '16px' }}>
        <label style={{ fontSize: '12px', color: 'var(--muted)', display: 'block', marginBottom: '6px', fontFamily: 'Geist Mono, monospace' }}>Number of compliance scans per year</label>
        <input type="number" value={scans} onChange={e => setScans(e.target.value)} placeholder="4" style={{ width: '100%', padding: '11px 14px', borderRadius: '8px', border: '1px solid var(--border2)', background: 'rgba(4,6,14,0.7)', color: 'var(--white)', fontSize: '14px', fontFamily: 'Geist Mono, monospace', outline: 'none' }} />
      </div>
      <button onClick={calc} className="btn-primary" style={{ width: '100%', padding: '12px', fontSize: '13px', borderColor: 'rgba(165,180,252,0.45)', color: 'var(--indigo)' }}>Calculate ROI →</button>
      {result && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px', marginBottom: '14px' }}>
            {[
              { label: 'Traditional Cost', val: `$${result.cost + result.saved}`, color: '#f87171' },
              { label: 'BizLegal Cost', val: `$${result.cost}`, color: 'var(--teal)' },
              { label: 'ROI', val: `${Math.round(result.roi)}%`, color: 'var(--sky)' },
            ].map(s => (
              <div key={s.label} style={{ textAlign: 'center', padding: '16px', borderRadius: '10px', border: `1px solid ${s.color}25`, background: `${s.color}06` }}>
                <div style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: s.color, marginBottom: '4px' }}>{s.val}</div>
                <div style={{ fontSize: '10px', color: 'var(--muted)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{s.label}</div>
              </div>
            ))}
          </div>
          <div style={{ padding: '14px', borderRadius: '10px', background: 'rgba(94,234,212,0.05)', border: '1px solid rgba(94,234,212,0.15)', textAlign: 'center' }}>
            <span style={{ fontFamily: 'Gloock, serif', fontSize: '20px', color: 'var(--teal)' }}>You save ${result.saved.toLocaleString()}/year</span>
          </div>
        </div>
      )}
    </div>
  )
}

// ─── NDA Risk Scorer ────────────────────────────────────────────────────────

function NDAScorer() {
  const questions = [
    { q: 'Does the NDA have a clear definition of "Confidential Information"?', w: 15 },
    { q: 'Is there a specific duration / expiry date?', w: 15 },
    { q: 'Are there exceptions (e.g. publicly known info, prior knowledge)?', w: 15 },
    { q: 'Does it specify what happens to data upon termination?', w: 15 },
    { q: 'Is the jurisdiction and governing law specified?', w: 10 },
    { q: 'Does it include non-solicitation clauses?', w: 10 },
    { q: 'Are remedies for breach clearly stated (injunctive relief)?', w: 10 },
    { q: 'Is it signed by all parties with dated signatures?', w: 10 },
  ]
  const [answers, setAnswers] = useState<Record<number, boolean>>({})

  const score = questions.reduce((acc, q, i) => acc + (answers[i] ? q.w : 0), 0)
  const level = score >= 80 ? 'STRONG' : score >= 60 ? 'ADEQUATE' : score >= 40 ? 'WEAK' : 'CRITICAL'
  const color = score >= 80 ? 'var(--teal)' : score >= 60 ? 'var(--sky)' : score >= 40 ? '#fbbf24' : '#f87171'

  return (
    <div style={{ padding: '32px', borderRadius: '16px', border: '1px solid rgba(125,211,252,0.15)', background: 'rgba(7,9,26,0.7)' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '24px' }}>
        <span style={{ fontSize: '28px' }}>🔐</span>
        <div>
          <h2 style={{ fontFamily: 'Gloock, serif', fontSize: '22px', color: 'var(--white)', marginBottom: '2px' }}>NDA Strength Scorer</h2>
          <p style={{ fontSize: '12px', color: 'var(--muted)' }}>Quickly score your NDA against best practice checklist</p>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '20px' }}>
        {questions.map((q, i) => (
          <label key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', cursor: 'pointer', padding: '12px 14px', borderRadius: '8px', border: `1px solid ${answers[i] ? 'rgba(94,234,212,0.2)' : 'rgba(125,211,252,0.06)'}`, background: answers[i] ? 'rgba(94,234,212,0.04)' : 'rgba(4,6,14,0.4)', transition: 'all 0.15s' }}>
            <input type="checkbox" checked={!!answers[i]} onChange={e => setAnswers(a => ({ ...a, [i]: e.target.checked }))} style={{ width: '16px', height: '16px', marginTop: '2px', accentColor: 'var(--teal)', flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: answers[i] ? 'var(--text)' : 'var(--muted)', lineHeight: 1.55 }}>{q.q}</span>
            <span style={{ marginLeft: 'auto', fontSize: '11px', color: 'var(--dim)', flexShrink: 0 }}>+{q.w}pts</span>
          </label>
        ))}
      </div>
      <div style={{ padding: '20px', borderRadius: '12px', border: `1px solid ${color}30`, background: `${color}06`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <div style={{ fontFamily: 'Gloock, serif', fontSize: '48px', color, lineHeight: 1 }}>{score}</div>
          <div style={{ fontSize: '11px', color: 'var(--muted)', marginTop: '4px' }}>/ 100 points</div>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ padding: '6px 16px', borderRadius: '100px', fontSize: '13px', fontWeight: 700, fontFamily: 'Geist Mono, monospace', color, border: `1px solid ${color}40`, background: `${color}10`, marginBottom: '8px' }}>{level}</div>
          <div style={{ fontSize: '12px', color: 'var(--muted)' }}>
            {score < 60 ? 'Consider upgrading with DocStack' : 'Good protection in place'}
          </div>
        </div>
      </div>
      {score < 80 && (
        <div style={{ marginTop: '12px', textAlign: 'center' }}>
          <Link href="/pricing" style={{ fontSize: '13px', color: 'var(--sky)', fontFamily: 'Geist Mono, monospace' }}>Get a lawyer-drafted NDA template →</Link>
        </div>
      )}
    </div>
  )
}

// ─── Page ───────────────────────────────────────────────────────────────────

export default function CalculatorsPage() {
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg)', color: 'var(--text)', paddingTop: '36px' }}>
      <div style={{ background: 'rgba(7,9,26,0.95)', borderBottom: '1px solid rgba(125,211,252,0.08)' }}>
        <div className="container" style={{ paddingTop: '20px', paddingBottom: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
          <Link href="/" style={{ color: 'var(--muted)', fontSize: '13px', fontFamily: 'Geist Mono, monospace' }}>← Home</Link>
        </div>
      </div>

      <div className="section" style={{ paddingTop: '80px', paddingBottom: '48px', textAlign: 'center' }}>
        <div className="container">
          <div className="hero-badge" style={{ display: 'inline-flex', marginBottom: '24px' }}>
            <span className="bdot" />&nbsp;Free Legal Calculators
          </div>
          <h1 className="sh" style={{ marginBottom: '16px' }}>Legal <em>Calculators</em></h1>
          <p className="sdesc" style={{ margin: '0 auto' }}>Instant calculations for legal fees, contract values, compliance ROI, and NDA strength. No signup required.</p>
        </div>
      </div>

      <div className="section" style={{ paddingTop: '0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <LegalFeeCalc />
            <ContractValueCalc />
            <ROICalc />
            <NDAScorer />
          </div>
        </div>
      </div>
    </div>
  )
}

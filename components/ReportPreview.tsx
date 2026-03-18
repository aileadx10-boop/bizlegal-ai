'use client'
import { AlertOctagon, AlertTriangle, Info, Lock } from 'lucide-react'

interface Flag {
  severity: string
  title: string
  description: string
}

interface AnalysisResult {
  riskScore: number
  riskLevel: string
  preview: string
  flags: Flag[]
  flagCount: number
  metrics: { totalTransactions: number; uniqueCounterparties: number }
  fullReportAvailable: boolean
}

const severityIcon = (s: string) => {
  if (s === 'critical') return <AlertOctagon size={14} style={{ color: '#c0392b', flexShrink: 0 }} />
  if (s === 'high')     return <AlertTriangle size={14} style={{ color: '#e67e22', flexShrink: 0 }} />
  return                       <Info size={14} style={{ color: '#f39c12', flexShrink: 0 }} />
}

const riskGradient: Record<string, string> = {
  Critical: 'linear-gradient(135deg, rgba(192,57,43,0.12), rgba(192,57,43,0.04))',
  High:     'linear-gradient(135deg, rgba(230,126,34,0.12), rgba(230,126,34,0.04))',
  Moderate: 'linear-gradient(135deg, rgba(243,156,18,0.10), rgba(243,156,18,0.03))',
  Low:      'linear-gradient(135deg, rgba(30,132,73,0.10),  rgba(30,132,73,0.03))',
}
const riskBorder: Record<string, string> = {
  Critical: '#c0392b', High: '#e67e22', Moderate: '#f39c12', Low: '#1e8449',
}

export default function ReportPreview({ result, wallet }: { result: AnalysisResult; wallet: string }) {
  const border = riskBorder[result.riskLevel] || '#d4a843'
  const bg     = riskGradient[result.riskLevel] || riskGradient.High

  function scrollToOrder() {
    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <div style={{ marginTop: 32, border: `1px solid ${border}`, background: bg, padding: 28 }}>
      {/* Risk score header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <div className="label-mono" style={{ marginBottom: 6 }}>Risk Assessment Preview</div>
          <div style={{ fontFamily: 'var(--serif)', fontSize: 32, fontWeight: 700, color: border, lineHeight: 1 }}>
            {result.riskScore}<span style={{ fontSize: 14, fontFamily: 'var(--mono)', color: 'var(--muted)', marginLeft: 6 }}>/100</span>
          </div>
          <div style={{ fontFamily: 'var(--mono)', fontSize: 12, color: border, marginTop: 4, letterSpacing: '0.1em' }}>
            {result.riskLevel} Risk
          </div>
        </div>
        <div style={{ display: 'flex', gap: 24 }}>
          {[
            [result.metrics.totalTransactions, 'Transactions'],
            [result.metrics.uniqueCounterparties, 'Counterparties'],
          ].map(([val, label]) => (
            <div key={String(label)}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 18, color: 'var(--text-bright)' }}>{val}</div>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)', marginTop: 2 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview text */}
      <p style={{ fontSize: 14, lineHeight: 1.75, color: 'var(--text)', marginBottom: 20, background: 'rgba(0,0,0,0.2)', padding: '14px 16px', borderLeft: `3px solid ${border}` }}>
        {result.preview}
      </p>

      {/* Visible flags */}
      {result.flags.map((f, i) => (
        <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', marginBottom: 12, background: 'rgba(0,0,0,0.15)', padding: '12px 14px' }}>
          {severityIcon(f.severity)}
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-bright)', marginBottom: 3 }}>{f.title}</div>
            <div style={{ fontSize: 12, color: 'var(--text)', lineHeight: 1.6 }}>{f.description}</div>
          </div>
        </div>
      ))}

      {/* Blurred remaining flags */}
      {result.flagCount > result.flags.length && (
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <div style={{ filter: 'blur(4px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.5 }}>
            {Array.from({ length: Math.min(result.flagCount - result.flags.length, 3) }).map((_, i) => (
              <div key={i} style={{ background: 'rgba(0,0,0,0.15)', padding: '12px 14px', marginBottom: 8, display: 'flex', gap: 10 }}>
                <AlertTriangle size={14} style={{ color: '#e67e22', flexShrink: 0 }} />
                <div>
                  <div style={{ height: 12, background: 'var(--border-light)', borderRadius: 2, width: '60%', marginBottom: 6 }} />
                  <div style={{ height: 10, background: 'var(--border)', borderRadius: 2, width: '90%' }} />
                </div>
              </div>
            ))}
          </div>
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: 6 }}>
            <Lock size={18} style={{ color: 'var(--amber)' }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)' }}>
              {result.flagCount - result.flags.length} More Findings in Full Report
            </span>
          </div>
        </div>
      )}

      {/* CTA */}
      <button onClick={scrollToOrder} className="btn-primary" style={{ width: '100%', marginTop: 8 }}>
        Get Full Court-Ready Report — From $149 →
      </button>
      <p style={{ marginTop: 10, fontSize: 11, color: 'var(--muted)', textAlign: 'center' }}>
        8-section PDF · Behavioral analysis · Legal framing · 24–48hr delivery
      </p>
    </div>
  )
}

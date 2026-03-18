'use client'
import { useState } from 'react'
import { Search, AlertTriangle, ChevronRight, Lock } from 'lucide-react'
import ReportPreview from './ReportPreview'

interface AnalysisResult {
  riskScore: number
  riskLevel: string
  preview: string
  flags: { severity: string; title: string; description: string }[]
  flagCount: number
  metrics: { totalTransactions: number; uniqueCounterparties: number }
  fullReportAvailable: boolean
}

const NETWORKS = [
  { value: 'ethereum', label: 'Ethereum' },
  { value: 'bnb',      label: 'BNB Chain' },
  { value: 'polygon',  label: 'Polygon' },
  { value: 'arbitrum', label: 'Arbitrum' },
  { value: 'optimism', label: 'Optimism' },
]

export default function WalletAnalyzer() {
  const [wallet,  setWallet]  = useState('')
  const [network, setNetwork] = useState('ethereum')
  const [email,   setEmail]   = useState('')
  const [loading, setLoading] = useState(false)
  const [result,  setResult]  = useState<AnalysisResult | null>(null)
  const [error,   setError]   = useState('')

  async function handleAnalyze(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setResult(null)

    if (!wallet.trim()) { setError('Please enter a wallet address.'); return }
    if (!/^0x[a-fA-F0-9]{40}$/.test(wallet.trim())) {
      setError('Invalid wallet address. Must be a 42-character Ethereum address (0x…).')
      return
    }

    setLoading(true)
    try {
      const res  = await fetch('/api/analyze', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ wallet: wallet.trim(), network, email: email.trim() || undefined }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Analysis failed')
      setResult(data)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Analysis failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="analyze" style={{ background: 'var(--deep)', borderTop: '1px solid var(--border)', padding: '80px 24px' }}>
      <div style={{ maxWidth: 720, margin: '0 auto' }}>
        <div className="label-mono" style={{ marginBottom: 16, textAlign: 'center' }}>Free Wallet Risk Snapshot</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 4vw, 38px)', fontWeight: 700, color: 'var(--text-bright)', textAlign: 'center', marginBottom: 12 }}>
          Instant Risk Assessment
        </h2>
        <p style={{ color: 'var(--muted)', textAlign: 'center', marginBottom: 40, lineHeight: 1.7 }}>
          Enter any Ethereum wallet address for a free risk preview. Full court-ready report available for $149.
        </p>

        <form onSubmit={handleAnalyze} noValidate>
          {/* Wallet input */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
              Wallet Address *
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="text"
                value={wallet}
                onChange={e => { setWallet(e.target.value); setError('') }}
                placeholder="0x..."
                aria-label="Ethereum wallet address"
                aria-describedby={error ? 'wallet-error' : undefined}
                style={{
                  width: '100%',
                  background: 'var(--surface)',
                  border: `1px solid ${error ? 'var(--danger)' : 'var(--border)'}`,
                  color: 'var(--text-bright)',
                  padding: '14px 14px 14px 44px',
                  fontFamily: 'var(--mono)',
                  fontSize: 13,
                  outline: 'none',
                }}
              />
              <Search size={16} style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: 'var(--muted)' }} />
            </div>
            {error && (
              <p id="wallet-error" role="alert" style={{ marginTop: 6, fontSize: 12, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 6 }}>
                <AlertTriangle size={12} /> {error}
              </p>
            )}
          </div>

          {/* Network + Email */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 20 }}>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                Network
              </label>
              <select
                value={network}
                onChange={e => setNetwork(e.target.value)}
                aria-label="Blockchain network"
                style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', padding: '13px 14px', fontFamily: 'var(--sans)', fontSize: 13, outline: 'none', cursor: 'pointer' }}
              >
                {NETWORKS.map(n => <option key={n.value} value={n.value}>{n.label}</option>)}
              </select>
            </div>
            <div>
              <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 8 }}>
                Email (optional)
              </label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="For full report updates"
                aria-label="Email address (optional)"
                style={{ width: '100%', background: 'var(--surface)', border: '1px solid var(--border)', color: 'var(--text)', padding: '13px 14px', fontFamily: 'var(--sans)', fontSize: 13, outline: 'none' }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" disabled={loading} style={{ width: '100%', fontSize: 15 }}>
            {loading ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <span style={{ width: 16, height: 16, border: '2px solid rgba(0,0,0,0.3)', borderTopColor: 'var(--black)', borderRadius: '50%', animation: 'spin 0.8s linear infinite', display: 'inline-block' }} />
                Analyzing On-Chain Data…
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                Run Free Risk Analysis <ChevronRight size={16} />
              </span>
            )}
          </button>
        </form>

        {/* Skeleton loader */}
        {loading && (
          <div style={{ marginTop: 32 }}>
            {[80, 140, 60].map((h, i) => (
              <div key={i} className="skeleton" style={{ height: h, marginBottom: 12, borderRadius: 2 }} />
            ))}
          </div>
        )}

        {/* Results */}
        {result && !loading && <ReportPreview result={result} wallet={wallet} />}

        <p style={{ marginTop: 20, fontSize: 11, color: 'var(--muted)', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <Lock size={11} /> Free analysis covers risk score + 2 flags. Full report includes 8 sections, all findings, court-ready PDF.
        </p>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </section>
  )
}

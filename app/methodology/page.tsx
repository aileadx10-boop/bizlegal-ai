import Link from 'next/link'
import { Shield, Database, Brain, AlertTriangle } from 'lucide-react'

export const metadata = {
  title: 'Methodology — TRACR Forensic Intelligence',
  description: 'How TRACR generates blockchain forensic reports: data sources, risk scoring, AI pipeline, and limitations.',
}

const RISK_WEIGHTS = [
  { flag: 'Interaction with flagged address (OFAC/known risky)',  weight: 40, severity: 'Critical' },
  { flag: 'Rapid transaction bursts (>30 tx/day)',                weight: 30, severity: 'High' },
  { flag: 'New wallet + high activity (<30 days, >50 tx)',        weight: 25, severity: 'High' },
  { flag: 'Extremely high transaction volume (>500 tx)',          weight: 20, severity: 'High' },
  { flag: 'Large value movement (>10 ETH single transaction)',    weight: 20, severity: 'Medium' },
  { flag: 'Moderate transaction bursting (>15 tx/day)',           weight: 15, severity: 'Medium' },
  { flag: 'High counterparty diversity (>100 unique, >200 tx)',   weight: 15, severity: 'Medium' },
]

export default function MethodologyPage() {
  return (
    <main style={{ background: 'var(--black)', minHeight: '100vh' }}>
      <nav style={{ background: 'var(--deep)', borderBottom: '1px solid var(--border)', padding: '0 24px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', height: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: 'var(--mono)', fontSize: 20, letterSpacing: '0.1em', color: 'var(--text-bright)', textDecoration: 'none', fontWeight: 500 }}>
            TRA<span style={{ color: 'var(--amber)' }}>C</span>R
          </Link>
          <Link href="/#order" className="btn-primary" style={{ padding: '8px 18px', fontSize: 13 }}>
            Order Report
          </Link>
        </div>
      </nav>

      <div style={{ maxWidth: 800, margin: '0 auto', padding: '60px 24px 80px' }}>
        <div className="label-mono" style={{ marginBottom: 16 }}>Methodology</div>
        <h1 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(28px, 4vw, 46px)', fontWeight: 700, color: 'var(--text-bright)', marginBottom: 16, lineHeight: 1.1 }}>
          How TRACR Works
        </h1>
        <p style={{ fontSize: 16, color: 'var(--text)', lineHeight: 1.8, marginBottom: 48, maxWidth: 580 }}>
          Attorneys and compliance officers reviewing TRACR reports should understand our data sources, analytical methods, and the boundaries of our findings.
        </p>

        {/* Data Sources */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Database size={20} style={{ color: 'var(--amber)' }} />
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, color: 'var(--text-bright)' }}>Data Sources</h2>
          </div>
          {[
            { name: 'Covalent API', desc: 'Primary source for multi-chain transaction history. Covers Ethereum, BNB Chain, Polygon, Arbitrum, Optimism, and other EVM-compatible networks. Transaction data is sourced directly from public blockchain records.' },
            { name: 'Etherscan API', desc: 'Fallback data source for Ethereum mainnet transaction history when primary source is unavailable. Public blockchain data.' },
            { name: 'OFAC SDN List', desc: 'U.S. Office of Foreign Assets Control Specially Designated Nationals list. Cross-referenced against wallet addresses involved in analyzed transactions to identify sanctioned entities.' },
            { name: 'On-Chain Heuristics', desc: 'Proprietary behavioral pattern analysis derived from transaction timing, volume, counterparty relationships, and value distributions. These are statistical indicators, not definitive classifications.' },
          ].map(({ name, desc }) => (
            <div key={name} style={{ borderBottom: '1px solid var(--border)', padding: '20px 0' }}>
              <div style={{ fontFamily: 'var(--mono)', fontSize: 12, letterSpacing: '0.1em', color: 'var(--amber)', marginBottom: 6 }}>{name}</div>
              <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75 }}>{desc}</p>
            </div>
          ))}
        </section>

        {/* Risk Scoring */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Shield size={20} style={{ color: 'var(--amber)' }} />
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, color: 'var(--text-bright)' }}>Risk Scoring</h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75, marginBottom: 24 }}>
            Risk scores range from 0–100 and are calculated by summing weighted heuristic flags. Scores are capped at 100. Classification: Low (0–24), Moderate (25–49), High (50–74), Critical (75–100).
          </p>
          <div style={{ background: 'var(--surface)', border: '1px solid var(--border)', overflow: 'hidden' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', background: 'var(--deep)', padding: '12px 20px', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', gap: 16 }}>
              <span>Risk Indicator</span><span>Weight</span><span>Severity</span>
            </div>
            {RISK_WEIGHTS.map(({ flag, weight, severity }) => (
              <div key={flag} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', padding: '14px 20px', borderTop: '1px solid var(--border)', gap: 16, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>{flag}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 13, color: 'var(--amber)' }}>+{weight}</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: 10, letterSpacing: '0.1em', color: severity === 'Critical' ? 'var(--danger)' : severity === 'High' ? '#e67e22' : '#f39c12' }}>
                  {severity.toUpperCase()}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* AI Pipeline */}
        <section style={{ marginBottom: 56 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 20 }}>
            <Brain size={20} style={{ color: 'var(--amber)' }} />
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 24, fontWeight: 700, color: 'var(--text-bright)' }}>AI Analysis Pipeline</h2>
          </div>
          <p style={{ fontSize: 14, color: 'var(--text)', lineHeight: 1.75, marginBottom: 20 }}>
            TRACR uses a 4-stage AI pipeline powered by Anthropic&apos;s Claude AI. Each stage builds on the previous, ensuring the legal framing reflects the behavioral evidence.
          </p>
          {[
            { stage: 'Stage 1', name: 'Pattern Extraction', desc: 'Transaction timing, flow patterns, counterparty relationships, and data anomalies are extracted from on-chain records.' },
            { stage: 'Stage 2', name: 'Risk Classification',  desc: 'Extracted patterns are cross-referenced with computed heuristic flags to produce AML/KYC risk assessments.' },
            { stage: 'Stage 3', name: 'Legal Framing',       desc: 'Technical findings are translated into language suitable for attorneys, judges, and compliance professionals.' },
            { stage: 'Stage 4', name: 'Final Synthesis',     desc: 'All stages are synthesized into an 8-section court-formatted report with consistent, defensible professional language.' },
          ].map(({ stage, name, desc }) => (
            <div key={stage} style={{ display: 'flex', gap: 16, marginBottom: 20, borderLeft: '2px solid var(--border)', paddingLeft: 20 }}>
              <div style={{ minWidth: 64 }}>
                <div style={{ fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--amber)', marginBottom: 2 }}>{stage}</div>
              </div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-bright)', marginBottom: 4 }}>{name}</div>
                <p style={{ fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>{desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* Limitations */}
        <section style={{ background: 'rgba(192,57,43,0.06)', border: '1px solid rgba(192,57,43,0.2)', padding: '28px 24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
            <AlertTriangle size={18} style={{ color: 'var(--danger)' }} />
            <h2 style={{ fontFamily: 'var(--serif)', fontSize: 22, fontWeight: 700, color: 'var(--text-bright)' }}>Important Limitations</h2>
          </div>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            {[
              'TRACR reports do not constitute legal advice and should not be relied upon as such.',
              'All findings are risk indicators only. No report asserts criminal activity.',
              'On-chain data represents a point-in-time snapshot and may not reflect complete transaction history.',
              'AI-generated analysis may contain errors or misinterpretations. Human review is always required.',
              'OFAC cross-referencing covers addresses in TRACR\'s database; it is not a comprehensive sanctions screen.',
              'Risk scores are heuristic estimates. Low scores do not guarantee absence of illicit activity.',
              'This methodology does not cover off-chain transactions, fiat conversions, or cross-chain hops without bridge detection.',
            ].map((item, i) => (
              <li key={i} style={{ fontSize: 13, color: 'var(--text)', lineHeight: 1.75, marginBottom: 10, paddingLeft: 16, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 0, color: 'var(--danger)' }}>·</span>
                {item}
              </li>
            ))}
          </ul>
          <p style={{ marginTop: 16, fontSize: 13, color: 'var(--muted)', lineHeight: 1.7 }}>
            <strong style={{ color: 'var(--text)' }}>Always consult qualified legal counsel</strong> before taking any action based on a TRACR report.
          </p>
        </section>

        <div style={{ marginTop: 40, textAlign: 'center' }}>
          <Link href="/#order" className="btn-primary">
            Order a Forensic Report →
          </Link>
        </div>
      </div>
    </main>
  )
}

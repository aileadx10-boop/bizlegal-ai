'use client'
import { Shield, FileText, Clock, Scale } from 'lucide-react'

const signals = [
  { icon: Shield,   label: 'OFAC SDN Cross-Referenced' },
  { icon: FileText, label: 'Court-Ready PDF Format' },
  { icon: Clock,    label: '24–48 Hour Delivery' },
  { icon: Scale,    label: 'Built by Licensed Attorneys' },
]

export default function TrustBar() {
  return (
    <div style={{ borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)', padding: '18px 0', background: 'var(--deep)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '0 24px', display: 'flex', gap: 40, flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center' }}>
        {signals.map(({ icon: Icon, label }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Icon size={16} style={{ color: 'var(--amber)', flexShrink: 0 }} />
            <span style={{ fontFamily: 'var(--mono)', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--muted)' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

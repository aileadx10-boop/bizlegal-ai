'use client'
import { Check, Zap, Shield, Scale } from 'lucide-react'

const tiers = [
  {
    key:   'standard',
    name:  'Standard Report',
    price: '$149',
    badge: null,
    icon:  Shield,
    desc:  'Full forensic analysis for legal proceedings',
    features: [
      '8-section court-ready PDF',
      'AI behavioral analysis',
      'Risk score (0–100)',
      'All risk flags & findings',
      'Legal compliance context',
      'Methodology documentation',
      '48-hour delivery',
    ],
    cta: 'Order Standard Report',
  },
  {
    key:   'priority',
    name:  'Priority Report',
    price: '$249',
    badge: 'Most Popular',
    icon:  Zap,
    desc:  'Same full report delivered in 24 hours',
    features: [
      'Everything in Standard',
      '24-hour priority delivery',
      'Priority support',
      'Delivery confirmation email',
    ],
    cta: 'Order Priority Report',
  },
  {
    key:   'litigation',
    name:  'Litigation Package',
    price: 'From $500',
    badge: 'Law Firms',
    icon:  Scale,
    desc:  'For active litigation and high-value investigations',
    features: [
      'Everything in Priority',
      'Narrative legal summary',
      'Affidavit-ready language',
      'Analyst review call (30min)',
      'Multi-wallet analysis',
      'Expert witness support',
    ],
    cta: 'Request Litigation Package',
  },
]

export default function PricingCards({ onSelect }: { onSelect?: (tier: string) => void }) {
  return (
    <section id="pricing" style={{ padding: '80px 24px', background: 'var(--black)' }}>
      <div style={{ maxWidth: 1100, margin: '0 auto' }}>
        <div className="label-mono" style={{ textAlign: 'center', marginBottom: 16 }}>Pricing</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(26px, 4vw, 40px)', fontWeight: 700, color: 'var(--text-bright)', textAlign: 'center', marginBottom: 48 }}>
          Forensic Intelligence at Legal Scale
        </h2>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 1, background: 'var(--border)' }}>
          {tiers.map(tier => {
            const Icon = tier.icon
            const isFeatured = tier.key === 'priority'
            return (
              <div
                key={tier.key}
                style={{
                  background: isFeatured ? 'var(--deep)' : 'var(--surface)',
                  padding: '36px 28px',
                  position: 'relative',
                  borderTop: isFeatured ? '2px solid var(--amber)' : '2px solid transparent',
                }}
              >
                {tier.badge && (
                  <div style={{ position: 'absolute', top: -12, left: 28, background: 'var(--amber)', color: 'var(--black)', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', padding: '3px 10px', fontWeight: 600 }}>
                    {tier.badge}
                  </div>
                )}

                <Icon size={20} style={{ color: 'var(--amber)', marginBottom: 16 }} />
                <div className="label-mono" style={{ marginBottom: 6, color: 'var(--muted)' }}>{tier.name}</div>
                <div style={{ fontFamily: 'var(--serif)', fontSize: 36, fontWeight: 700, color: 'var(--text-bright)', marginBottom: 8 }}>{tier.price}</div>
                <p style={{ fontSize: 13, color: 'var(--muted)', marginBottom: 28, lineHeight: 1.6 }}>{tier.desc}</p>

                <ul style={{ listStyle: 'none', padding: 0, marginBottom: 32 }}>
                  {tier.features.map(f => (
                    <li key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, fontSize: 13, color: 'var(--text)', lineHeight: 1.5 }}>
                      <Check size={14} style={{ color: 'var(--amber)', flexShrink: 0, marginTop: 2 }} />
                      {f}
                    </li>
                  ))}
                </ul>

                <button
                  className={isFeatured ? 'btn-primary' : 'btn-outline'}
                  onClick={() => {
                    onSelect?.(tier.key)
                    document.getElementById('order')?.scrollIntoView({ behavior: 'smooth' })
                  }}
                  style={{ width: '100%' }}
                >
                  {tier.cta}
                </button>
              </div>
            )
          })}
        </div>

        <p style={{ marginTop: 24, fontSize: 12, color: 'var(--muted)', textAlign: 'center' }}>
          Not legal advice. Reports for informational and professional reference only. Consult qualified legal counsel.
        </p>
      </div>
    </section>
  )
}

'use client'
import { useState } from 'react'
import { AlertTriangle, CreditCard } from 'lucide-react'

const TIERS = [
  { key: 'standard',  label: 'Standard Report — $149 (48hr)' },
  { key: 'priority',  label: 'Priority Report — $249 (24hr)' },
  { key: 'litigation', label: 'Litigation Package — From $500' },
]

const ROLES = [
  'Attorney / Solicitor',
  'Paralegal',
  'Compliance Officer',
  'Law Enforcement',
  'Fraud Investigator',
  'Individual / Self-representing',
  'Other',
]

export default function OrderForm({ defaultTier = 'standard' }: { defaultTier?: string }) {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', role: '',
    wallet: '', network: 'ethereum', context: '', tier: defaultTier,
  })
  const [errors,     setErrors]     = useState<Record<string, string>>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitErr,  setSubmitErr]  = useState('')

  function set(k: string, v: string) {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => { const n = { ...e }; delete n[k]; return n })
  }

  function validate(): boolean {
    const e: Record<string, string> = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.email.trim() || !form.email.includes('@')) e.email = 'Valid email required'
    if (!form.wallet.trim()) e.wallet = 'Required'
    else if (!/^0x[a-fA-F0-9]{40}$/.test(form.wallet.trim())) e.wallet = 'Invalid wallet address (0x… 42 chars)'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  async function handleSubmit(ev: React.FormEvent) {
    ev.preventDefault()
    setSubmitErr('')
    if (!validate()) return

    setSubmitting(true)
    try {
      const res  = await fetch('/api/create-order', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ ...form, wallet: form.wallet.trim() }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Order failed')
      window.location.href = data.url   // redirect to Stripe
    } catch (err: unknown) {
      setSubmitErr(err instanceof Error ? err.message : 'Order failed. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const field = (label: string, key: string, type = 'text', placeholder = '') => (
    <div>
      <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>
        {label} {['firstName', 'email', 'wallet'].includes(key) && <span style={{ color: 'var(--danger)' }}>*</span>}
      </label>
      <input
        type={type}
        value={(form as Record<string, string>)[key]}
        onChange={e => set(key, e.target.value)}
        placeholder={placeholder}
        aria-label={label}
        aria-describedby={errors[key] ? `${key}-error` : undefined}
        style={{
          width: '100%',
          background: 'var(--deep)',
          border: `1px solid ${errors[key] ? 'var(--danger)' : 'var(--border)'}`,
          color: 'var(--text-bright)',
          padding: '13px 14px',
          fontFamily: key === 'wallet' ? 'var(--mono)' : 'var(--sans)',
          fontSize: 13,
          outline: 'none',
        }}
      />
      {errors[key] && (
        <p id={`${key}-error`} role="alert" style={{ marginTop: 4, fontSize: 11, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 4 }}>
          <AlertTriangle size={11} /> {errors[key]}
        </p>
      )}
    </div>
  )

  return (
    <section id="order" style={{ padding: '80px 24px', background: 'var(--deep)', borderTop: '1px solid var(--border)' }}>
      <div style={{ maxWidth: 620, margin: '0 auto' }}>
        <div className="label-mono" style={{ textAlign: 'center', marginBottom: 16 }}>Order Report</div>
        <h2 style={{ fontFamily: 'var(--serif)', fontSize: 'clamp(24px, 4vw, 36px)', fontWeight: 700, color: 'var(--text-bright)', textAlign: 'center', marginBottom: 40 }}>
          Commission Your Forensic Report
        </h2>

        <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Tier */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>
              Report Tier
            </label>
            <select
              value={form.tier}
              onChange={e => set('tier', e.target.value)}
              aria-label="Report tier"
              style={{ width: '100%', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '13px 14px', fontFamily: 'var(--sans)', fontSize: 13, outline: 'none', cursor: 'pointer' }}
            >
              {TIERS.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
            </select>
          </div>

          {/* Name row */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {field('First Name', 'firstName', 'text', 'Jane')}
            {field('Last Name', 'lastName', 'text', 'Smith')}
          </div>

          {field('Email Address', 'email', 'email', 'jane@lawfirm.com')}

          {/* Role */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>
              Your Role
            </label>
            <select
              value={form.role}
              onChange={e => set('role', e.target.value)}
              aria-label="Professional role"
              style={{ width: '100%', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '13px 14px', fontFamily: 'var(--sans)', fontSize: 13, outline: 'none', cursor: 'pointer' }}
            >
              <option value="">Select your role…</option>
              {ROLES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {field('Wallet Address to Investigate', 'wallet', 'text', '0x...')}

          {/* Network */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>
              Network
            </label>
            <select
              value={form.network}
              onChange={e => set('network', e.target.value)}
              aria-label="Blockchain network"
              style={{ width: '100%', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '13px 14px', fontFamily: 'var(--sans)', fontSize: 13, outline: 'none', cursor: 'pointer' }}
            >
              {[['ethereum','Ethereum'],['bnb','BNB Chain'],['polygon','Polygon'],['arbitrum','Arbitrum'],['optimism','Optimism']].map(([v,l]) => (
                <option key={v} value={v}>{l}</option>
              ))}
            </select>
          </div>

          {/* Case context */}
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--mono)', fontSize: 9, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', marginBottom: 6 }}>
              Case Context <span style={{ color: 'var(--border-light)' }}>(optional)</span>
            </label>
            <textarea
              value={form.context}
              onChange={e => set('context', e.target.value)}
              placeholder="Brief description of the case or investigation context…"
              rows={3}
              aria-label="Case context"
              style={{ width: '100%', background: 'var(--deep)', border: '1px solid var(--border)', color: 'var(--text)', padding: '13px 14px', fontFamily: 'var(--sans)', fontSize: 13, outline: 'none', resize: 'vertical' }}
            />
          </div>

          {submitErr && (
            <p role="alert" style={{ fontSize: 12, color: 'var(--danger)', display: 'flex', alignItems: 'center', gap: 6 }}>
              <AlertTriangle size={12} /> {submitErr}
            </p>
          )}

          <button type="submit" className="btn-primary" disabled={submitting} style={{ fontSize: 15 }}>
            {submitting ? 'Redirecting to Payment…' : (
              <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <CreditCard size={16} /> Proceed to Secure Payment →
              </span>
            )}
          </button>
          <p style={{ fontSize: 11, color: 'var(--muted)', textAlign: 'center', lineHeight: 1.6 }}>
            Secure payment via Stripe. Report delivered by email in 24–48 hours.<br />
            This order is not legal advice. All findings are risk indicators only.
          </p>
        </form>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'

export function LeadCapture() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')
    // Simulate API call
    setTimeout(() => {
      setStatus('success')
      setEmail('')
    }, 1500)
  }

  return (
    <section className="section-shell lead-capture-section">
      <div className="container lead-capture-grid">
        <div className="lead-capture-content">
          <span className="eyebrow">Exclusive Access</span>
          <h2>Join the inner circle of legal tech.</h2>
          <p>
            Get early access to our premium templates, compliance workflows, and industry reports before they launch publicly.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="lead-capture-form">
          <div className="input-group">
            <input
              type="email"
              placeholder="Enter your work email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              disabled={status === 'loading' || status === 'success'}
              className="email-input"
            />
            <button
              type="submit"
              className="button button-primary"
              disabled={status === 'loading' || status === 'success'}
            >
              {status === 'loading' ? 'Joining...' : status === 'success' ? 'Welcome Inside' : 'Get Access'}
            </button>
          </div>
          {status === 'success' && (
            <p className="success-message">You're on the list. Watch your inbox.</p>
          )}
          <p className="micro-copy">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </form>
      </div>
    </section>
  )
}

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
          <span className="eyebrow">Founder updates</span>
          <h2>Get regulatory intelligence before uncertainty compounds.</h2>
          <p>
            Receive founder notes, UAE regulatory briefings, and product updates across BRAI, DocStack,
            TRACR, and the intelligence hub.
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
              {status === 'loading'
                ? 'Submitting...'
                : status === 'success'
                  ? 'Request Received'
                  : 'Request Access'}
            </button>
          </div>
          {status === 'success' && (
            <p className="success-message">Request received. Watch your inbox.</p>
          )}
          <p className="micro-copy">
            Work email only. No noise, no spam, and no sharing of your details.
          </p>
        </form>
      </div>
    </section>
  )
}

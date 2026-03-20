import Link from 'next/link'
import { founderProfile, productLinks, workflowSteps } from '@/app/lib/site-content'

const heroSignals = [
  'UAE focus',
  'VARA and ADGM exposure analysis',
  'Commercial attorney depth',
] as const

const founderMetrics = [
  { label: 'Founder', value: founderProfile.name },
  { label: 'Primary focus', value: 'UAE, VARA, ADGM' },
  { label: 'Operating model', value: 'AI-assisted risk analysis' },
  { label: 'Outcome', value: 'Clarity before launch' },
] as const

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">{founderProfile.shortLabel}</span>
          <h1>Structured regulatory risk intelligence for digital asset ventures.</h1>
          <p>
            {founderProfile.heroSummary} BizLegal provides a premium legaltech interface for founders,
            operators, and digital asset teams that need structured visibility into regulatory exposure
            before launch, fundraising, or jurisdiction expansion.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={productLinks.brai}>
              Start BRAI Scan
            </a>
            <Link className="button button-secondary" href="/about">
              Read Founder Profile
            </Link>
            <Link className="button button-ghost" href="/posts">
              Open Intelligence Hub
            </Link>
          </div>
          <div className="hero-proof">
            {heroSignals.map((signal) => (
              <span key={signal}>{signal}</span>
            ))}
          </div>
        </div>
        <div className="hero-panel">
          <div className="showcase-toolbar">
            <div>
              <span className="mini-label">Founder profile</span>
              <strong>BizLegal by DOR INNOVATIONS</strong>
            </div>
            <span className="badge">Founder-led intelligence</span>
          </div>
          <div className="showcase-grid">
            <div className="showcase-main">
              <div className="metric-board">
                {founderMetrics.map((metric) => (
                  <div key={metric.label} className="metric-card">
                    <span>{metric.label}</span>
                    <strong>{metric.value}</strong>
                  </div>
                ))}
              </div>
              <div className="timeline-panel">
                {workflowSteps.map((item) => (
                  <div key={item.step} className="timeline-step">
                    <span>{item.step}</span>
                    <strong>{item.title}</strong>
                    <p>{item.body}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="showcase-side">
              <div className="mini-card">
                <span>Founder note</span>
                <strong>{founderProfile.shortBio[0]}</strong>
                <p>{founderProfile.shortBio[1]}</p>
              </div>
              <div className="mini-card">
                <span>Operating thesis</span>
                <strong>Identify exposure before it becomes structural liability.</strong>
                <p>Structured intelligence for digital asset ventures moving through complex jurisdictions.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

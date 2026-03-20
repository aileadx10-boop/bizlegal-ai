import Link from 'next/link'
import { insightStreams, productLinks, workflowSteps } from '@/app/lib/site-content'

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Automatic SEO for legal revenue systems</span>
          <h1>Build a premium legal intelligence SaaS that publishes, qualifies, and converts on autopilot.</h1>
          <p>
            BizLegal AI turns search demand into paid templates, compliance workflows, and investigation
            briefs with a luxury product shell, a visible trust layer, and a Claude-first SEO engine that
            is ready for Gemini expansion when volume matters more than restraint.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={productLinks.docstack}>
              Launch DocStack
            </a>
            <Link className="button button-secondary" href="/posts">
              Open Auto-SEO Hub
            </Link>
            <Link className="button button-ghost" href="/security">
              Review Trust Pages
            </Link>
          </div>
          <div className="hero-proof">
            <span>10 pages per SEO run</span>
            <span>3x weekly publishing cadence</span>
            <span>Claude default, Gemini optional</span>
          </div>
        </div>
        <div className="hero-panel">
          <div className="showcase-toolbar">
            <div>
              <span className="mini-label">Command center</span>
              <strong>Auto-SEO Operating Layer</strong>
            </div>
            <span className="badge">Conversion system live</span>
          </div>
          <div className="showcase-grid">
            <div className="showcase-main">
              <div className="metric-board">
                <div className="metric-card">
                  <span>Revenue path</span>
                  <strong>Guide to product to checkout</strong>
                </div>
                <div className="metric-card">
                  <span>Generation core</span>
                  <strong>Claude default, Gemini optional</strong>
                </div>
                <div className="metric-card">
                  <span>Primary buyers</span>
                  <strong>Founders, investors, counsel</strong>
                </div>
                <div className="metric-card">
                  <span>Core surfaces</span>
                  <strong>Templates, scans, investigations</strong>
                </div>
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
              {insightStreams.map((stream) => (
                <div key={stream.title} className="mini-card">
                  <span>{stream.title}</span>
                  <strong>{stream.body}</strong>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
import Link from 'next/link'
import {
  insightStreams,
  productLinks,
  workflowSteps,
} from '@/app/lib/site-content'

export function HeroSection() {
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <span className="eyebrow">Luxury legal intelligence designed to convert</span>
          <h1>Turn legal research, compliance, and documents into one premium revenue machine.</h1>
          <p>
            BizLegal AI packages high-intent legal workflows into a polished SaaS experience for
            founders, investors, family offices, legal ops teams, and cross-border counsel.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href={productLinks.docstack}>
              Launch DocStack
            </a>
            <Link className="button button-secondary" href="/posts">
              Open Intelligence Hub
            </Link>
            <Link className="button button-ghost" href="/security">
              Review Trust Pages
            </Link>
          </div>
          <div className="hero-proof">
            <span>10 pages per SEO run</span>
            <span>3x weekly publishing cadence</span>
            <span>Productized paths into DocStack, BRAI, and TRACR</span>
          </div>
        </div>
        <div className="hero-panel">
          <div className="showcase-toolbar">
            <div>
              <span className="mini-label">Command center</span>
              <strong>BizLegal AI Operating Layer</strong>
            </div>
            <span className="badge">Live conversion system</span>
          </div>
          <div className="showcase-grid">
            <div className="showcase-main">
              <div className="metric-board">
                <div className="metric-card">
                  <span>Revenue path</span>
                  <strong>Guide to product to checkout</strong>
                </div>
                <div className="metric-card">
                  <span>Publishing loop</span>
                  <strong>Mon / Wed / Fri</strong>
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
